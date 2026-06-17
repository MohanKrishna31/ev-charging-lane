export type AlertSeverityVariant = "high" | "medium" | "low";
export type AlertCategoryVariant = "Fault" | "Offline" | "Payment" | "Registration" | "Completion";

export interface SystemNotificationItem {
  id: string;
  title: string;
  message: string;
  timestampText: string;
  severity: AlertSeverityVariant;
  category: AlertCategoryVariant;
  isUnread: boolean;
}