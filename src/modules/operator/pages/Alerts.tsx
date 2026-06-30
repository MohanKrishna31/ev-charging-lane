import React, { useMemo, useState } from "react";
import "../Styles/Alerts.css";
import OperatorLayout from "../../../layouts/OperatorLayout/OperatorLayout";
import type { Alert } from "../types/alerts";
import { alerts as alertsData } from "../services/alerts";

import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Check,
  CheckCheck,
  User,
  Wallet,
  WifiOff,
  Zap,
} from "lucide-react";

// ----------------------------------------------------------------------
// Types & Mock Data
// ----------------------------------------------------------------------

const iconProps = { size: 18, strokeWidth: 2.5 } as const;

const alertIcons: Record<Alert["icon"], LucideIcon> = {
  bolt: Zap,
  offline: WifiOff,
  wallet: Wallet,
  user: User,
  check: Check,
};

const Alerts: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "unread" | "high">("all");
  const [alertsList, setAlertsList] = useState<Alert[]>(alertsData);

  const filteredAlerts = useMemo(
    () =>
      alertsList.filter((alert) => {
        if (filter === "unread") return !alert.read;
        if (filter === "high") return alert.priority === "high";
        return true;
      }),
    [alertsList, filter],
  );

  const unreadCount = useMemo(
    () => alertsList.filter((alert) => !alert.read).length,
    [alertsList],
  );

  const markAllRead = () => {
    setAlertsList((prev) => prev.map((alert) => ({ ...alert, read: true })));
  };

  // NEW FUNCTION: mark only the clicked alert as read
  const markOneRead = (clickedId: string | number) => {
    setAlertsList((prev) =>
      prev.map((alert) =>
        alert.id === clickedId ? { ...alert, read: true } : alert
      )
    );
  };

  const getAlertIcon = (icon: Alert["icon"]) => {
    const Icon = alertIcons[icon];
    return Icon ? <Icon {...iconProps} /> : null;
  };

  return (
    <OperatorLayout pageTitle="Alerts">
      <div className="alerts-page">
        <div className="alerts-header">
          <div className="alerts-title-row">
            <div className="alerts-title-left">
              <h1>Notifications</h1>
              <span className="alerts-count-badge">{unreadCount}</span>
            </div>
            <button
              className="alerts-mark-read-btn"
              type="button"
              onClick={markAllRead}
            >
              <CheckCheck
                size={16}
                strokeWidth={2.5}
                className="mark-read-icon"
              />
              Mark all read
            </button>
          </div>
          <p className="alerts-subtitle">
            Real-time alerts and system notifications
          </p>
        </div>

        <div className="alerts-filter-row">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={filter === "unread" ? "active" : ""}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>
          <button
            type="button"
            className={filter === "high" ? "active" : ""}
            onClick={() => setFilter("high")}
          >
            High Severity
          </button>
        </div>

        <div className="alerts-list">
          {filteredAlerts.length === 0 ? (
            <div className="alerts-empty-state">
              <Bell size={28} strokeWidth={2} />
              <p>No notifications match your filter</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`alert-card ${alert.read ? "read" : "unread"} ${alert.priority}`}
                onClick={() => markOneRead(alert.id)} // <-- NEW CLICK HANDLER
              >
                <div
                  className={`alert-card-icon-wrap ${alert.priority} icon-${alert.icon}`}
                >
                  <span className="alert-card-icon">
                    {getAlertIcon(alert.icon)}
                  </span>
                </div>
                <div className="alert-card-main">
                  <div className="alert-card-title-row">
                    <h3>{alert.title}</h3>
                    <span className={`alert-pill ${alert.priority}`}>
                      {alert.priority}
                    </span>
                  </div>
                  <p>{alert.message}</p>
                  <span className="alert-card-time">{alert.timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </OperatorLayout>
  );
};

export default Alerts;
