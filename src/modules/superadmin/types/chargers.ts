export interface LiveChargerItem {
  id: string;
  chargerCode: string;
  bayName: string;
  powerOutput: string;
  connectorType: "CCS2" | "Type 2" | "CHACeMO" | "AC" | string;
  status: "Available" | "Charging" | "Faulted" | "Offline";
  timeText: string;
  totalSessionsCount: number;
  activeSessionPercentage?: number;
  errorMessageBanner?: string;
}

export interface ChargerSummaryMetrics {
  totalAcrossNetwork: number;
  availableCount: number;
  chargingCount: number;
  faultedCount: number;
  offlineCount: number;
}

export interface ChargerModulePayload {
  summary: ChargerSummaryMetrics;
  items: LiveChargerItem[];
}