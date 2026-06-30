import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCheck,
  CheckCircle2,
  MapPinOff,
  UserPlus,
  Wallet,
  Zap,
} from "lucide-react";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  subscribeNotifications,
} from "../services/notifications";
import type {
  NotificationFilter,
  NotificationIcon,
  NotificationItem,
} from "../types/notifications";
import "../styles/Notifications.css";

const filterOptions: { id: NotificationFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "high", label: "High Severity" },
];

const NotificationIconMap: Record<
  NotificationIcon,
  React.ComponentType<{ size?: number }>
> = {
  "charger-fault": Zap,
  "station-offline": MapPinOff,
  "payment-failure": Wallet,
  "vendor-registration": UserPlus,
  "session-completed": CheckCircle2,
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    fetchNotifications(),
  );
  const [activeFilter, setActiveFilter] =
    useState<NotificationFilter>("all");

  useEffect(() => {
    return subscribeNotifications(() => {
      setNotifications([...fetchNotifications()]);
    });
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "unread") return !notification.read;
    if (activeFilter === "high") return notification.severity === "high";
    return true;
  });

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.read) {
      markNotificationRead(notification.id);
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header-row">
        <div className="notifications-title-stack">
          <div className="notifications-title-line">
            <h2>Notifications</h2>
            {unreadCount > 0 && (
              <span className="notifications-count-badge">{unreadCount}</span>
            )}
          </div>
          <p>Real-time alerts and system notifications</p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            className="notifications-mark-all-btn"
            onClick={handleMarkAllRead}
          >
            <CheckCheck size={16} />
            Mark all read
          </button>
        )}
      </div>

      <div className="notifications-filter-tabs">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`notifications-filter-btn ${
              activeFilter === filter.id ? "active" : ""
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="notifications-list">
        {filteredNotifications.map((notification) => {
          const Icon = NotificationIconMap[notification.icon];

          return (
            <article
              key={notification.id}
              className={`notification-card severity-${notification.severity} ${
                notification.read ? "read" : "unread"
              }`}
              onClick={() => handleNotificationClick(notification)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleNotificationClick(notification);
                }
              }}
            >
              <div className="notification-accent-bar" />

              <div
                className={`notification-icon-wrap severity-${notification.severity}`}
              >
                <Icon size={18} />
              </div>

              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.description}</p>
                <span className="notification-timestamp">
                  {notification.timestamp}
                </span>
              </div>

              <div className="notification-meta">
                <span
                  className={`notification-severity-tag severity-${notification.severity}`}
                >
                  {notification.severity}
                </span>
                {!notification.read && (
                  <span className="notification-unread-dot" />
                )}
              </div>
            </article>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="notifications-empty-state">
            <AlertTriangle size={20} />
            <p>No notifications match this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
