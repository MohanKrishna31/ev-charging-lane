export type NotificationSeverity = "high" | "medium" | "low";

export type NotificationIcon =
  | "charger-fault"
  | "station-offline"
  | "payment-failure"
  | "vendor-registration"
  | "session-completed";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: NotificationSeverity;
  icon: NotificationIcon;
  read: boolean;
}

export type NotificationFilter = "all" | "unread" | "high";
