import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, ShieldCheck } from "lucide-react";
import "./OperatorHeader.css";

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <header className="operator-topbar">
      <button
        className="topbar-hamburger"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={20} strokeWidth={2} />
      </button>

      <span className="topbar-title">{title}</span>

      <div className="topbar-right">
        <div className="topbar-bell" title="Notifications" onClick={() => navigate("/operator/alerts")}>
          <Bell size={18} strokeWidth={2} />
          <span className="bell-badge" />
        </div>

        <div className="topbar-divider" />

        <div className="topbar-avatar" title="Verified Operator">
          <ShieldCheck size={18} strokeWidth={2.2} color="#fff" />
        </div>

        <div className="topbar-user">
          <span className="topbar-user-name">Deepak Nair</span>
          <span className="topbar-user-role">Station Operator</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
