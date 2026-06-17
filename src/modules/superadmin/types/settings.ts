export type SettingsSubSection = "Pricing" | "Tax Config" | "Payment Gateway" | "Notifications" | "Permissions" | "Audit Logs";

export interface AuditTrailLogItem {
  id: string;
  type: "update" | "create" | "system" | "delete" | "action";
  message: string;
  user: string;
  timestampText: string;
}