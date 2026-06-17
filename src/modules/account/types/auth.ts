export interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

export interface OTPRequest {
  email: string;
  role: string;
  otp: string;
}

export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
}

export interface UserProfile {
  id: string;        
  name: string;      
  email: string;     
  role: string;      
  avatar?: string;   
}

export interface LoginResponse {
  success: boolean;
  email?: string;
  message?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  token?: string;
  user?: UserProfile;
  message?: string;
}


export interface ApiUserRecord {
  id: string;
  email: string;
  password: string; 
  role: string;
  name?: string;
  avatar?: string;
}