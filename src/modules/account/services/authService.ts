import type { LoginRequest, OTPRequest, LoginResponse, VerifyOtpResponse, ApiUserRecord } from "../types/auth";

const MOCK_API_URL = "https://6a294b7af59cb8f65f1cda32.mockapi.io/api/login/users";

const simulatedOtpCache: { [email: string]: { code: string; expiry: number } } = {};

export const authService = {
  
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await fetch(MOCK_API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        return { success: false, message: "MockAPI database connection is offline." };
      }

      const users: ApiUserRecord[] = await response.json();

      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === data.email.toLowerCase() && 
               u.role.toLowerCase() === data.role.toLowerCase()
      );

      if (!matchedUser || matchedUser.password !== data.password) {
        return { success: false, message: "Invalid email, password, or role combination." };
      }

      const generatedCode = "123456"; 
      simulatedOtpCache[matchedUser.email.toLowerCase()] = {
        code: generatedCode,
        expiry: Date.now() + 10 * 60 * 1000 
      };

      console.log(`[MOCK TELEMETRY] simulated 2FA OTP for ${matchedUser.email}: ${generatedCode}`);

      return {
        success: true,
        email: matchedUser.email,
        message: "Two-factor verification OTP has been generated."
      };
    } catch (error) {
      console.error("Mock Login Error:", error);
      return { success: false, message: "Failed to resolve connection to mock endpoints layer." };
    }
  },


  verifyOtpCode: async (data: OTPRequest): Promise<VerifyOtpResponse> => {
    try {
      const targetEmail = data.email.toLowerCase();
      const cachedOtp = simulatedOtpCache[targetEmail];

      if (!cachedOtp || cachedOtp.code !== data.otp || Date.now() > cachedOtp.expiry) {
        return { success: false, message: "Verification failed. Code may be invalid or expired." };
      }

      const response = await fetch(MOCK_API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        return { success: false, message: "Verification tracking handoff failure." };
      }

      const users: ApiUserRecord[] = await response.json();
      const userRecord = users.find(
        (u) => u.email.toLowerCase() === targetEmail && 
               u.role.toLowerCase() === data.role.toLowerCase()
      );

      if (!userRecord) {
        return { success: false, message: "Identity data mismatch. Session failed." };
      }

      delete simulatedOtpCache[targetEmail];

      const simulatedJwtToken = `mock_bearer_token_id_${userRecord.id}_role_${userRecord.role.replace(/\s+/g, '')}`;

      return {
        success: true,
        token: simulatedJwtToken,
        user: {
          id: userRecord.id,
          name: userRecord.name || "System Admin",
          email: userRecord.email,
          role: userRecord.role,
          avatar: userRecord.avatar
        }
      };
    } catch (error) {
      console.error("Mock OTP Verification Error:", error);
      return { success: false, message: "Network error during validation handoff mapping cycles." };
    }
  }
};