import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import { authService } from "../services/authService";
import "../styles/VerifyOTP.css";

interface LocationState {
  email?: string;
  role?: string;
}

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const displayEmail = state?.email || "your registered email";
  const assumedRole = state?.role || "Super Admin";

  const [otpInputs, setOtpInputs] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!state?.email) {
      navigate("/");
    }
  }, [state, navigate]);

  const handleInputChange = (index: number, val: string) => {
    if (/^[0-9]?$/.test(val)) {
      const nextOtp = [...otpInputs];
      nextOtp[index] = val;
      setOtpInputs(nextOtp);

      if (val && index < 5) {
        const nextField = document.getElementById(`otp-digit-${index + 1}`);
        nextField?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpInputs[index] && index > 0) {
      const prevField = document.getElementById(`otp-digit-${index - 1}`);
      prevField?.focus();
    }
  };

  const executeVerification = async () => {
    setLocalError("");
    const baselineCodeCombined = otpInputs.join("");

    if (baselineCodeCombined.length !== 6) {
      setLocalError("Please enter the complete 6-digit verification security token.");
      return;
    }

    setIsVerifying(true);

    const result = await authService.verifyOtpCode({
      email: displayEmail,
      role: assumedRole,
      otp: baselineCodeCombined,
    });

    if (result.success && result.token && result.user) {
      sessionStorage.setItem("ev_lane_auth_token", result.token);
      sessionStorage.setItem("ev_lane_session", JSON.stringify(result.user));
      navigate("/admin/dashboard");
    } else {
      setIsVerifying(false);
      setLocalError(result.message || "Invalid code validation failure entry record.");
    }
  };

  return (
    <AuthLayout>
      <div className="otp-card">
        <div className="shield-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>

        <h1>Two-factor authentication</h1>
        <p className="otp-subtitle">
          Enter the 6-digit code sent to{" "}
          <span className="highlight-email">{displayEmail}</span>
        </p>

        {localError && (
          <div 
            className="form-error-banner" 
            style={{ color: "#ef4444", marginBottom: "16px", fontSize: "14px", fontWeight: 500 }}
          >
            {localError}
          </div>
        )}

        <div className="otp-container">
          {otpInputs.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-digit-${idx}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              disabled={isVerifying}
              required
            />
          ))}
        </div>

        <button
          type="button"
          className="verify-btn"
          onClick={executeVerification}
          disabled={isVerifying}
        >
          {isVerifying ? "Processing..." : "Verify & Sign In"}
        </button>

        <p className="otp-disclaimer">
          Note: Use **123456** as your simulated 2FA validation token code to test successful login transitions.
        </p>

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/")}
          disabled={isVerifying}
        >
          &larr; Back to login
        </button>
      </div>
    </AuthLayout>
  );
};

export default VerifyOTP;