export interface MetricCardItem {
  value: number | string;
  subtext: string;
  growth: string;
  trendDirection: "up" | "down";
}

export interface SummaryCardsMatrix {
  totalVendors: MetricCardItem;
  totalStations: MetricCardItem;
  activeChargers: MetricCardItem;
  liveSessions: MetricCardItem;
  revenueToday: MetricCardItem;
  revenueMtd: MetricCardItem;
}

export interface RevenueTrendTimeline {
  month: string;
  amount: number;
}

export interface ConnectorAllocationItem {
  name: string;
  percentage: number;
  hexColor: string;
}

export interface SessionSplitTimeline {
  day: string;
  completed: number;
  active: number;
  failed: number;
}

export interface UtilizationTimelineItem {
  time: string;
  rate: number;
}

export interface TableChargerCount {
  available: number;
  charging: number;
  offline: number;
}

export interface LiveStationItem {
  id: string;
  name: string;
  location: string;
  vendor: string;
  chargers: TableChargerCount;
  status: "Available" | "Charging" | "Offline" | "Maintenance";
}

export interface RealtimeAlertItem {
  id: string;
  type: "Fault" | "Offline" | "Failure" | "Registration" | "Completion";
  title: string;
  message: string;
  timestamp: string;
}

export interface DashboardMetricsPayload {
  summaryCards: SummaryCardsMatrix;
  revenueTrend: RevenueTrendTimeline[];
  connectorAllocation: ConnectorAllocationItem[];
  sessionSplits: SessionSplitTimeline[];
  utilizationTimeline: UtilizationTimelineItem[];
  liveStations: LiveStationItem[];
  recentAlerts: RealtimeAlertItem[];
}