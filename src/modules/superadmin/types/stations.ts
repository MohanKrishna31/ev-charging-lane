export interface StationChargerBreakdown {
  total: number;
  available: number;
  busy: number;
  offline: number;
}

export interface StationListItem {
  id: string;
  stationCode: string;
  name: string;
  location: string;
  vendor: string;
  chargers: StationChargerBreakdown;
  utilizationPercentage: number;
  status: "Available" | "Charging" | "Offline" | "Maintenance";
}

export interface StationSummaryMetrics {
  totalAcrossNetwork: number;
  availableCount: number;
  chargingCount: number;
  offlineCount: number;
  maintenanceCount: number;
}

export interface StationModulePayload {
  summary: StationSummaryMetrics;
  items: StationListItem[];
}

export interface NewStationFormState {
  stationName: string;
  stationCode: string;
  contactNumber: string;
  workingHours: string;
  vendor: string;
  state: string;
  fullAddress: string;
  latitude: string;
  longitude: string;
  amenities: string[];
}