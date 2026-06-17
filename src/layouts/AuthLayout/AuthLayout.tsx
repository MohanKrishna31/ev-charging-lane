import type { ReactNode } from "react";
import AuthHero from "./AuthHero";
import "./AuthLayout.css";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="auth-layout">
      <AuthHero />
      <div className="auth-content">{children}</div>
    </div>
  );
};

export default AuthLayout;
