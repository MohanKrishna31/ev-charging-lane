import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="forgot-card">
        <h2>Reset password</h2>
        <p>Enter your email to receive a reset link</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <label>Email address</label>
          <input type="email" placeholder="you@example.com" required />
          <button type="submit" className="send-btn">
            Send Reset Link
          </button>
        </form>

        <button className="back-btn" onClick={() => navigate("/")}>
          &larr; Back to login
        </button>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
