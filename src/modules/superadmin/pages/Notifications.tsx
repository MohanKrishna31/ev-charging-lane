import { useEffect, useState } from "react";
import { Bell, ShieldAlert, AlertTriangle, UserPlus, CheckCircle2, CheckCheck } from "lucide-react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { notificationService } from "../services/notificationService";
import type { SystemNotificationItem } from "../types/notifications";
import "../styles/Notifications.css";

const Notifications = () => {
  const [alertsStream, setAlertsStream] = useState<SystemNotificationItem[]>([]);
  const [selectedPillTab, setSelectedPillTab] = useState<"All" | "Unread" | "High Severity">("All");

  const dispatchLiveBadgeSync = (updatedStream: SystemNotificationItem[]) => {
    const activeUnreadCount = updatedStream.filter((item) => item.isUnread).length;
    
    const badgeSyncEvent = new CustomEvent("evlane-badge-sync", {
      detail: { unreadCount: activeUnreadCount }
    });
    window.dispatchEvent(badgeSyncEvent);
  };

  useEffect(() => {
    notificationService.fetchNotificationsState().then((data) => {
      setAlertsStream(data);
      dispatchLiveBadgeSync(data);
    });
  }, []);

  const handleMarkAllAsReadAction = () => {
    const updated = notificationService.markAllNotificationsAsRead();
    setAlertsStream(updated);
    dispatchLiveBadgeSync(updated);
  };


  const handleIndividualItemDismissToggle = (alertId: string) => {
    const targetItem = alertsStream.find(a => a.id === alertId);
    if (!targetItem || !targetItem.isUnread) return; 

    const updated = notificationService.updateNotificationReadState(alertId, false);
    setAlertsStream(updated);
    dispatchLiveBadgeSync(updated);
  };

  const filteredAlerts = alertsStream.filter((item) => {
    if (selectedPillTab === "Unread") return item.isUnread;
    if (selectedPillTab === "High Severity") return item.severity === "high";
    return true;
  });

  const unreadAlertsCount = alertsStream.filter((item) => item.isUnread).length;

  const getCategoryVectorIcon = (category: string) => {
    switch (category) {
      case "Fault": return <ShieldAlert size={16} />;
      case "Offline": return <AlertTriangle size={16} />;
      case "Payment": return <AlertTriangle size={16} />;
      case "Registration": return <UserPlus size={16} />;
      case "Completion": return <CheckCircle2 size={16} />;
      default: return <Bell size={16} />;
    }
  };

  return (
    <AdminLayout pageTitle="Notifications">
      <div className="notifications-workspace-view">
        
        <div className="notifications-master-header-row">
          <div>
            <div className="notifications-title-stack-flex">
              <h2>Notifications</h2>
              {unreadAlertsCount > 0 && (
                <span className="notifications-headline-counter-badge">{unreadAlertsCount}</span>
              )}
            </div>
            <p className="notifications-subtext-label">Real-time alerts and system notifications hub</p>
          </div>
        </div>

        <div className="notifications-filter-navigation-pills-row">
          {(["All", "Unread", "High Severity"] as const).map((tabOpt) => {
            const isActive = selectedPillTab === tabOpt;
            return (
              <button
                key={tabOpt}
                type="button"
                className={`notification-filter-pill-btn ${isActive ? "active" : ""}`}
                onClick={() => setSelectedPillTab(tabOpt)}
              >
                {tabOpt}
              </button>
            );
          })}

          {unreadAlertsCount > 0 && (
            <button 
              type="button" 
              className="notifications-mark-read-action-link-btn"
              onClick={handleMarkAllAsReadAction}
            >
              <CheckCheck size={15} />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {filteredAlerts.length === 0 ? (
          <div className="notifications-empty-state-backplane">
            <Bell size={32} className="icon-bell-shield" />
            <p>No notifications match your filter</p>
          </div>
        ) : (
          <div className="notifications-vertical-stream-chassis">
            {filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`notification-alert-item-card ${alert.severity}-severity`}
                style={{ cursor: alert.isUnread ? "pointer" : "default" }}
                onClick={() => handleIndividualItemDismissToggle(alert.id)}
              >
                
                <div className="notification-icon-wrapper-frame">
                  {getCategoryVectorIcon(alert.category)}
                </div>

                <div className="notification-content-details-stack">
                  <h4>{alert.title}</h4>
                  <p>{alert.message}</p>
                  <span className="timestamp-caption">{alert.timestampText}</span>
                </div>

                <div className="notification-right-floating-meta-block">
                  <span className={`severity-pill-micro-tag ${alert.severity}`}>
                    {alert.severity}
                  </span>
                  {alert.isUnread && (
                    <span className="notification-unread-breathing-dot-marker"></span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Notifications;