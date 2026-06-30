export type ReportTabOption = "Revenue Reports" | "Charging Usage" | "Vendor Reports" | "Station Performance" | "Settlements";

export interface ReportSummaryMetrics {
  stat1Label: string;
  stat1Value: string;
  stat1Sub: string;
  stat2Label: string;
  stat2Value: string;
  stat2Sub: string;
  stat3Label: string;
  stat3Value: string;
  stat3Sub: string;
  stat4Label: string;
  stat4Value: string;
  stat4Sub: string;
}

export interface VendorPerformanceRow {
  vendorName: string;
  revenue: number;
  sessions: number;
  avgPerSession: number;
  stations: number;
  uptime: number;
}

export interface StationPerformanceRow {
  stationName: string;
  revenue: number;
  sessions: number;
  avgPerSession: number;
  chargers: number;
  uptime: number;
}