import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  return (
    <AuthLayout>
      <div className="reset-card">
        <h1>Create new password</h1>
        <p>Enter a new password for your account</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <label>New Password</label>
          <input type="password" placeholder="••••••••" required />

          <label>Confirm Password</label>
          <input type="password" placeholder="••••••••" required />

          <button type="submit" className="reset-btn">
            Reset Password
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
