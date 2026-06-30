export interface DashboardStats {
  totalStations: number;
  activeStations: number;
  activeChargers: number;
  totalChargers: number;
  ongoingSessions: number;
  revenueToday: number;
  revenueMtd: string; // formatted string for Lakhs
  revenueMtdTrend: number;
}

export interface DashboardData {
  title: string;
  date: string;
  stats: DashboardStats;
}
