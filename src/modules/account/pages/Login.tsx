import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import RoleSelector from "../../../components/auth/RoleSelector";
import { authService } from "../services/authService";
import "../styles/Login.css";

const Login = () => {
  const [role, setRole] = useState("Super Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const result = await authService.login({ email, password, role });

    setIsLoading(false);

    if (result.success) {
      navigate("/verify-otp", { state: { email: result.email || email, role: role } });
    } else {
      setErrorMessage(result.message || "Authentication failed.");
    }
  };

  return (
    <AuthLayout>
      <div className="login-card">
        <h1>Welcome back</h1>
        <p>Sign in to your EV Lane account</p>

        {errorMessage && (
          <div 
            className="form-error-banner" 
            style={{ color: "#ef4444", marginBottom: "16px", fontSize: "14px", fontWeight: 500 }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <span className="section-label">SIGN IN AS</span>
          <RoleSelector selectedRole={role} onChange={setRole} />

          <label htmlFor="auth-email">Email address</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          <div className="password-header">
            <label htmlFor="auth-password">Password</label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <input
            id="auth-password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          <div className="login-options">
            <label className="checkbox-label" htmlFor="auth-remember">
              <input
                id="auth-remember"
                name="rememberMe"
                type="checkbox"
                className="custom-checkbox"
              />
              Remember me for 30 days
            </label>
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Sign In "} &rarr;
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;