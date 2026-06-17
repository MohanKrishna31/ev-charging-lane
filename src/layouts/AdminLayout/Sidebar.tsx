import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Users, Zap, MapPin, 
  Activity, CreditCard, FileText, Bell, Settings, Moon, Sun, LogOut, ChevronLeft, ChevronRight 
} from "lucide-react";
import "./Sidebar.css";

interface SidebarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  user: {
    name: string;
    role: string;
    initials: string;
  };
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar = ({ isDarkMode, toggleTheme, user, isCollapsed, onToggleCollapse }: SidebarProps) => {
  const navigate = useNavigate();

  const [liveUnreadCount, setLiveUnreadCount] = useState<number>(() => {
    const cachedBadgeCount = localStorage.getItem("evlane_unread_badge_volume");
    return cachedBadgeCount !== null ? parseInt(cachedBadgeCount, 10) : 3;
  });

  useEffect(() => {
    const handleGlobalBadgeSync = (event: Event) => {
      const customEvent = event as CustomEvent<{ unreadCount: number }>;
      if (customEvent.detail && typeof customEvent.detail.unreadCount === "number") {
        const nextVolume = customEvent.detail.unreadCount;
        setLiveUnreadCount(nextVolume);
        localStorage.setItem("evlane_unread_badge_volume", nextVolume.toString());
      }
    };

    window.addEventListener("evlane-badge-sync", handleGlobalBadgeSync);
    return () => {
      window.removeEventListener("evlane-badge-sync", handleGlobalBadgeSync);
    };
  }, []);

  const navigationMatrix = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Vendors", path: "/admin/vendors", icon: <Users size={18} /> },
    { label: "Stations", path: "/admin/stations", icon: <MapPin size={18} /> },
    { label: "Chargers", path: "/admin/chargers", icon: <Zap size={18} /> },
    { label: "Sessions", path: "/admin/sessions", icon: <Activity size={18} /> },
    { label: "Payments", path: "/admin/payments", icon: <CreditCard size={18} /> },
    { label: "Users", path: "/admin/users", icon: <Users size={18} /> },
    { label: "Reports", path: "/admin/reports", icon: <FileText size={18} /> },
    { label: "Notifications", path: "/admin/notifications", icon: <Bell size={18} />, countBadge: liveUnreadCount },
    { label: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
  ];

  const handleTermination = () => {
    sessionStorage.removeItem("ev_lane_session");
    localStorage.removeItem("evlane_unread_badge_volume"); 
    navigate("/");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-brand">
        <div className="brand-logo-section">
          <div className="brand-icon-wrapper">
            <Zap size={18} fill="currentColor" />
          </div>
          <span>EV Lane</span>
        </div>
      </div>


      <button 
        type="button" 
        className="sidebar-collapse-trigger" 
        onClick={onToggleCollapse}
        aria-label={isCollapsed ? "Expand Navigation Panel" : "Collapse Navigation Panel"}
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>


      <nav className="sidebar-nav no-scrollbar">
        {navigationMatrix.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => isActive ? "nav-link-block active" : "nav-link-block"}
          >
            {item.icon}
            <span>{item.label}</span>

            {item.countBadge !== undefined && item.countBadge > 0 && (
              <span className="nav-link-badge">{item.countBadge}</span>
            )}
          </NavLink>
        ))}
      </nav>


      <div className="sidebar-footer">
        <div className="sidebar-user-section">
          <div className="sidebar-user-avatar">{user.initials}</div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user.name}</span>
            <span className="sidebar-user-role">{user.role}</span>
          </div>
        </div>

        <button type="button" className="sidebar-action-btn" onClick={toggleTheme}>
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button type="button" className="sidebar-action-btn" onClick={handleTermination}>
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 