export interface Alert {
  id: string;
  title: string;
  message: string;
  priority: "high" | "medium" | "low";
  read: boolean;
  timestamp: string;
  icon: "bolt" | "offline" | "wallet" | "user" | "check";
}
