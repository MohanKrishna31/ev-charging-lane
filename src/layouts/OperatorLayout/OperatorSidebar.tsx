import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Activity,
  Battery,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  MapPin,
  Moon,
  ShieldCheck,
  Sun,
  Zap,
} from "lucide-react";
import "./OperatorSidebar.css";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isDarkMode,
  onToggleDarkMode,
  isMobileOpen,
  onMobileClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (path: string) => {
    navigate(path);
    if (onMobileClose) onMobileClose();
  };

  React.useEffect(() => {
    const sidebarEl = document.querySelector(".operator-sidebar") as HTMLElement | null;
    if (!sidebarEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
    };

    sidebarEl.addEventListener("wheel", handleWheel);
    sidebarEl.addEventListener("touchmove", handleTouch);

    return () => {
      sidebarEl.removeEventListener("wheel", handleWheel);
      sidebarEl.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <aside
      className={`operator-sidebar ${isCollapsed ? "collapsed" : ""} ${isMobileOpen ? "mobile-open" : ""}`}
    >
      <button
        className="sidebar-toggle-btn"
        onClick={onToggleCollapse}
        aria-label="Toggle Sidebar"
      >
        {isCollapsed ? (
          <ChevronRight size={14} strokeWidth={2.5} />
        ) : (
          <ChevronLeft size={14} strokeWidth={2.5} />
        )}
      </button>

      <div className="sidebar-brand">
        <div className="brand-icon">
          <Battery size={22} strokeWidth={2.5} color="#22c55e" />
        </div>
        <div className="brand-text">
          <span className="brand-name">EV Lane</span>
          <span className="brand-sub">Admin Platform</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li
            className={isActive("/operator/livesessions") ? "active" : ""}
            onClick={() => handleNavClick("/operator/livesessions")}
          >
            <span className="nav-icon">
              <Activity size={16} strokeWidth={2} />
            </span>
            <span className="nav-text">Live Sessions</span>
          </li>
          <li
            className={isActive("/operator/stations") ? "active" : ""}
            onClick={() => handleNavClick("/operator/stations")}
          >
            <span className="nav-icon">
              <MapPin size={16} strokeWidth={2} />
            </span>
            <span className="nav-text">Stations</span>
          </li>
          <li
            className={isActive("/operator/chargers") ? "active" : ""}
            onClick={() => handleNavClick("/operator/chargers")}
          >
            <span className="nav-icon">
              <Zap size={16} strokeWidth={2} />
            </span>
            <span className="nav-text">Chargers</span>
          </li>
          <li
            className={isActive("/operator/alerts") ? "active" : ""}
            onClick={() => handleNavClick("/operator/alerts")}
          >
            <span className="nav-icon">
              <Bell size={16} strokeWidth={2} />
            </span>
            <span className="nav-text">Alerts</span>
            <span className="nav-badge">2</span>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">
            <ShieldCheck size={15} strokeWidth={2.2} color="#fff" />
          </div>
          <div className="user-info">
            <div className="user-info-name">Deepak Nair</div>
            <div className="user-info-role">Station Operator</div>
          </div>
        </div>
        <div className="sidebar-footer-link" onClick={onToggleDarkMode}>
          <span className="nav-icon">
            {isDarkMode ? (
              <Sun size={15} strokeWidth={2.5} />
            ) : (
              <Moon size={15} strokeWidth={2.5} />
            )}
          </span>
          <span className="footer-link-text">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </div>
        <div
          className="sidebar-footer-link sidebar-logout"
          onClick={() => navigate("/")}
        >
          <span className="nav-icon">
            <LogOut size={15} strokeWidth={2} />
          </span>
          <span className="footer-link-text">Sign Out</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
