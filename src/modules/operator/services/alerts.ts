import type { Alert } from "../types/alerts";

export const alerts: Alert[] = [
  {
    id: "ALT001",
    title: "Charger Fault Detected",
    message: "Bay 4 at MG Road Fast Charge Hub reported a CAN bus error.",
    timestamp: "2 min ago",
    priority: "high",
    icon: "bolt",
    read: false,
  },
  {
    id: "ALT002",
    title: "Station Went Offline",
    message: "Hitech City Hub (STN006) is unreachable. Last ping 12 min ago.",
    timestamp: "12 min ago",
    priority: "high",
    icon: "offline", 
    read: false, 
  },
  {
    id: "ALT003",
    title: "Payment Failure",
    message: "Transaction TXN8819 failed for Kavitha Reddy – Wallet balance insufficient.",
    timestamp: "34 min ago",
    priority: "medium",
    icon: "wallet",
    read: false,
  },
  {
    id: "ALT004",
    title: "New Vendor Registration",
    message: "SolarDrive Networks submitted a registration request. KYC pending review.",
    timestamp: "1 hr ago",
    priority: "low",
    icon: "user",
    read: true,
  },
  {
    id: "ALT005",
    title: "Session Completed",
    message: "Session SES004 completed. Meena Krishnan charged 35.2 kWh.",
    timestamp: "1 hr ago",
    priority: "low",
    icon: "check",
    read: true,
  },
];
