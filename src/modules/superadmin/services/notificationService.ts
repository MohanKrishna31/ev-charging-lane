import type { SystemNotificationItem } from "../types/notifications";

// Persistent internal in-memory data store array
let mockNotificationsCache: SystemNotificationItem[] = [
  {
    id: "NTF001",
    title: "Charger Fault Detected",
    message: "Bay 4 at MG Road Fast Charge Hub reported a CAN bus error.",
    timestampText: "2 min ago",
    severity: "high",
    category: "Fault",
    isUnread: true
  },
  {
    id: "NTF002",
    title: "Station Went Offline",
    message: "Hitech City Hub (STN006) is unreachable. Last ping 12 min ago.",
    timestampText: "12 min ago",
    severity: "high",
    category: "Offline",
    isUnread: true
  },
  {
    id: "NTF003",
    title: "Payment Failure",
    message: "Transaction TXN8819 failed for Kavitha Reddy – Wallet balance insufficient.",
    timestampText: "34 min ago",
    severity: "medium",
    category: "Payment",
    isUnread: true
  },
  {
    id: "NTF004",
    title: "New Vendor Registration",
    message: "SolarDrive Networks submitted a registration request. KYC pending review.",
    timestampText: "1 hr ago",
    severity: "low",
    category: "Registration",
    isUnread: false
  },
  {
    id: "NTF005",
    title: "Session Completed",
    message: "Session SES004 completed. Meena Krishnan charged 35.2 kWh.",
    timestampText: "1 hr ago",
    severity: "low",
    category: "Completion",
    isUnread: false
  },
  {
    id: "NTF006",
    title: "Station Offline Alert",
    message: "Cyber Hub Station (STN003) offline for 3+ hours. Maintenance required.",
    timestampText: "3 hrs ago",
    severity: "high",
    category: "Offline",
    isUnread: false
  }
];

export const notificationService = {
  fetchNotificationsState: async (): Promise<SystemNotificationItem[]> => {
    return [...mockNotificationsCache];
  },

  // Persists state modifications directly into the global data cache array
  updateNotificationReadState: (id: string, isUnread: boolean): SystemNotificationItem[] => {
    mockNotificationsCache = mockNotificationsCache.map((item) =>
      item.id === id ? { ...item, isUnread } : item
    );
    return [...mockNotificationsCache];
  },

  markAllNotificationsAsRead: (): SystemNotificationItem[] => {
    mockNotificationsCache = mockNotificationsCache.map((item) => ({ ...item, isUnread: false }));
    return [...mockNotificationsCache];
  }
};