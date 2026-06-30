import React, { useEffect, useState } from "react";
import { Bell, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getUnreadCount,
  subscribeNotifications,
} from "../../modules/vendor/services/notifications";
import "./Header.css";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(getUnreadCount());
  const pathName = location.pathname.split("/")[2] || "dashboard";
  const pageTitle = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  useEffect(() => {
    return subscribeNotifications(() => {
      setUnreadCount(getUnreadCount());
    });
  }, []);

  return (
    <header className="vendor-header">
      <div className="header-title">{pageTitle}</div>
      <div className="header-actions">
        <button
          type="button"
          className="notification-btn"
          aria-label="Notifications"
          onClick={() => navigate("/vendor/notifications")}
        >
          <Bell size={20} />
          {unreadCount > 0 && <span className="notification-badge"></span>}
        </button>
        <div className="header-divider"></div>
        <div className="user-profile-header">
          <div className="user-avatar-header" style={{backgroundColor: 'rgba(36, 203, 113, 0.12)', border: '1px solid rgba(36, 203, 113, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#24cb71'}}>
            <ShieldCheck size={16} />
          </div>
          <div className="user-info-header">
            <span className="user-name-header">Arjun Mehta</span>
            <span className="user-role-header">Vendor Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
