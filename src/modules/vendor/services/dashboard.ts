import type { DashboardData } from '../types/dashboard';

export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulating an API call to fetch dashboard data
  return Promise.resolve({
    title: "GreenCharge India Dashboard",
    date: "Tuesday, 9 June 2026",
    stats: {
      totalStations: 24,
      activeStations: 21,
      activeChargers: 86,
      totalChargers: 112,
      ongoingSessions: 14,
      revenueToday: 47200,
      revenueMtd: "2.84L",
      revenueMtdTrend: 8,
    }
  });
};
