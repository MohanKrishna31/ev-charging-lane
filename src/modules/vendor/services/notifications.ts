import type { NotificationItem } from "../types/notifications";

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Charger Fault Detected",
    description:
      "Bay 4 at MG Road Fast Charge Hub reported a CAN bus error.",
    timestamp: "2 min ago",
    severity: "high",
    icon: "charger-fault",
    read: false,
  },
  {
    id: "2",
    title: "Station Went Offline",
    description:
      "Indiranagar EV Hub lost connectivity. Last heartbeat 14 min ago.",
    timestamp: "14 min ago",
    severity: "high",
    icon: "station-offline",
    read: false,
  },
  {
    id: "3",
    title: "Payment Failure",
    description:
      "UPI transaction failed for session #SES-4821 at Koramangala Station.",
    timestamp: "28 min ago",
    severity: "medium",
    icon: "payment-failure",
    read: false,
  },
  {
    id: "4",
    title: "New Vendor Registration",
    description:
      "PowerGrid EV submitted onboarding documents for review.",
    timestamp: "1 hr ago",
    severity: "low",
    icon: "vendor-registration",
    read: true,
  },
  {
    id: "5",
    title: "Session Completed",
    description:
      "Session #SES-4819 completed — 42.6 kWh delivered at Whitefield Hub.",
    timestamp: "2 hr ago",
    severity: "low",
    icon: "session-completed",
    read: true,
  },
  {
    id: "6",
    title: "Station Offline Alert",
    description:
      "Cyber Hub Station (STN003) offline for 3+ hours. Maintenance required.",
    timestamp: "3 hrs ago",
    severity: "high",
    icon: "station-offline",
    read: true,
  },
];

let notifications = [...initialNotifications];
const listeners = new Set<() => void>();

const notify = () => {
  listeners.forEach((listener) => listener());
};

export const subscribeNotifications = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const fetchNotifications = (): NotificationItem[] => {
  return notifications;
};

export const getUnreadCount = (): number => {
  return notifications.filter((n) => !n.read).length;
};

export const markAllNotificationsRead = (): void => {
  notifications = notifications.map((n) => ({ ...n, read: true }));
  notify();
};

export const markNotificationRead = (id: string): void => {
  notifications = notifications.map((n) =>
    n.id === id ? { ...n, read: true } : n,
  );
  notify();
};
