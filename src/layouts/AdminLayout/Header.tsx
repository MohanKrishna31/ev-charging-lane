import { useState, useEffect, useRef } from "react";
import { Bell, ShieldAlert, AlertTriangle, UserPlus, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notificationService } from "../../modules/superadmin/services/notificationService";
import type { SystemNotificationItem } from "../../modules/superadmin/types/notifications";
import "./Header.css";

interface HeaderProps {
  user: {
    name: string;
    role: string;
    initials: string;
  };
  title: string;
  subtitle?: string;
}

const Header = ({ user, title, subtitle }: HeaderProps) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [unreadCount, setUnreadCount] = useState(3);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [previewAlerts, setPreviewAlerts] = useState<SystemNotificationItem[]>([]);

  const executeLiveBadgeSync = (updatedList: SystemNotificationItem[]) => {
    const currentUnread = updatedList.filter(item => item.isUnread).length;
    setUnreadCount(currentUnread);
    setPreviewAlerts(updatedList);

    const badgeSyncEvent = new CustomEvent("evlane-badge-sync", {
      detail: { unreadCount: currentUnread }
    });
    window.dispatchEvent(badgeSyncEvent);
  };

  useEffect(() => {
    notificationService.fetchNotificationsState().then((data: SystemNotificationItem[]) => {
      setPreviewAlerts(data);
      setUnreadCount(data.filter(item => item.isUnread).length);
    });
  }, []);

  useEffect(() => {
    const handleGlobalBadgeSync = (event: Event) => {
      const customEvent = event as CustomEvent<{ unreadCount: number }>;
      if (customEvent.detail && typeof customEvent.detail.unreadCount === "number") {
        setUnreadCount(customEvent.detail.unreadCount);
        notificationService.fetchNotificationsState().then((data: SystemNotificationItem[]) => {
          setPreviewAlerts(data);
        });
      }
    };

    window.addEventListener("evlane-badge-sync", handleGlobalBadgeSync);
    
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("evlane-badge-sync", handleGlobalBadgeSync);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDropdownItemClick = (e: React.MouseEvent, alertId: string) => {
    e.stopPropagation();
    const updatedDataState = notificationService.updateNotificationReadState(alertId, false);
    executeLiveBadgeSync(updatedDataState);
  };

  const getCategoryVectorIcon = (category: string) => {
    switch (category) {
      case "Fault": return <ShieldAlert size={14} className="icon-fault-red" />;
      case "Offline": case "Payment": return <AlertTriangle size={14} className="icon-warn-yellow" />;
      case "Registration": return <UserPlus size={14} className="icon-reg-blue" />;
      case "Completion": return <CheckCircle2 size={14} className="icon-complete-green" />;
      default: return <Bell size={14} />;
    }
  };

  return (
    <header className="admin-global-header" ref={dropdownRef}>
      <div className="header-left-title-group">
        <h1 className="header-primary-page-title">{title}</h1>
        {subtitle && <p className="header-secondary-page-subtitle">{subtitle}</p>}
      </div>

      <div className="header-right-utilities-panel">
        <button 
          type="button" 
          className={`header-icon-notification-trigger ${dropdownOpen ? "dropdown-active" : ""}`} 
          aria-label="System Notifications"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Bell size={20} />
          {unreadCount > 0 && <span className="header-notification-pulse-dot"></span>}
        </button>

        {dropdownOpen && (
          <div className="header-notifications-dropdown-card">
            <div className="dropdown-header-strip">
              <span>Recent Alerts</span>
              <button 
                type="button" 
                className="view-all-link-txt"
                onClick={() => { setDropdownOpen(false); navigate("/admin/notifications"); }}
              >
                View all
              </button>
            </div>

            <div className="dropdown-alerts-scrollable-stack no-scrollbar">
              {previewAlerts.length === 0 ? (
                <div className="dropdown-empty-placeholder">No recent alerts recorded</div>
              ) : (
                previewAlerts.slice(0, 4).map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`dropdown-alert-row-item ${alert.isUnread ? "unread-alert" : ""}`}
                    onClick={(e) => handleDropdownItemClick(e, alert.id)}
                  >
                    <div className="alert-icon-chassis-wrapper">
                      {getCategoryVectorIcon(alert.category)}
                    </div>
                    <div className="alert-text-lines-stack">
                      <div className="title-row">
                        <span className="alert-title-txt">{alert.title}</span>
                        {alert.isUnread && <span className="unread-pulse-marker-dot" />}
                      </div>
                      <p className="alert-desc-msg">{alert.message}</p>
                      <span className="alert-time-caption">{alert.timestampText}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="header-user-badge-profile">
          <div className="header-profile-meta-stack">
            <span className="header-profile-display-name">{user.name}</span>
            <span className="header-profile-display-role">{user.role}</span>
          </div>
          <div className="header-profile-avatar-wrapper">{user.initials}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;