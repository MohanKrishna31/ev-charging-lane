export interface Charger {
  id: string;
  name: string;
  connectorType: string;
  status: "Available" | "Charging" | "Faulted" | "Offline";
  power: number;
  activeSessionProgress?: number;
  error?: string;
  lastUsed?: string;
  totalSessions?: number;
}
