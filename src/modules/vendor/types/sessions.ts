export interface ChargingSessionItem {
  id: string;
  sessionCode: string;
  timestamp: string;
  customerName: string;
  vehicleModel: string;
  stationName: string;
  bayDetails: string;
  energyDispensed: string;
  durationMinutes: number;
  currentCost: number;
  status: "Active" | "Completed" | "Failed";
  chargePercentage?: number;
}

export interface SessionSummaryMetrics {
  activeCount: number;
  completedTodayCount: number;
  failedTodayCount: number;
  totalEnergyDispensed: string;
}

export interface SessionsModulePayload {
  summary: SessionSummaryMetrics;
  items: ChargingSessionItem[];
}