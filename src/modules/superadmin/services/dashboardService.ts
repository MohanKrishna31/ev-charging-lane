import type { DashboardMetricsPayload } from "../types/dashboard";

export const dashboardService = {
  fetchCoreState: async (): Promise<DashboardMetricsPayload> => {
    return {
      summaryCards: {
        totalVendors: { value: 6, subtext: "2 pending KYC", growth: "+1 this month", trendDirection: "up" },
        totalStations: { value: 108, subtext: "94 online", growth: "+4 this week", trendDirection: "up" },
        activeChargers: { value: 342, subtext: "of 421 total", growth: "-3 faulted", trendDirection: "down" },
        liveSessions: { value: 47, subtext: "across 5 vendors", growth: "+12 vs avg", trendDirection: "up" },
        revenueToday: { value: "₹1.84L", subtext: "812 sessions", growth: "+18% vs yesterday", trendDirection: "up" },
        revenueMtd: { value: "₹24.8L", subtext: "June 2026", growth: "+16% vs May", trendDirection: "up" }
      },
      revenueTrend: [
        { month: "Jan", amount: 1.1 },
        { month: "Feb", amount: 1.3 },
        { month: "Mar", amount: 1.5 },
        { month: "Apr", amount: 1.8 },
        { month: "May", amount: 2.1 },
        { month: "Jun", amount: 2.4 },
        { month: "Jul", amount: 2.6 },
        { month: "Aug", amount: 2.9 },
        { month: "Sep", amount: 3.2 },
        { month: "Oct", amount: 3.5 },
        { month: "Nov", amount: 3.9 },
        { month: "Dec", amount: 4.4 }
      ],
      connectorAllocation: [
        { name: "CCS2", percentage: 42, hexColor: "#24cb71" },
        { name: "Type 2", percentage: 28, hexColor: "#00b0ff" },
        { name: "CHAdeMO", percentage: 14, hexColor: "#ffca28" },
        { name: "AC Fast", percentage: 10, hexColor: "#874fff" },
        { name: "DC Fast", percentage: 6, hexColor: "#ef5350" }
      ],
      sessionSplits: [
        { day: "Mon", completed: 400, active: 130, failed: 12 },
        { day: "Tue", completed: 421, active: 168, failed: 11 },
        { day: "Wed", completed: 410, active: 140, failed: 15 },
        { day: "Thu", completed: 460, active: 180, failed: 10 },
        { day: "Fri", completed: 490, active: 220, failed: 14 },
        { day: "Sat", completed: 560, active: 260, failed: 18 },
        { day: "Sun", completed: 530, active: 230, failed: 13 }
      ],
      utilizationTimeline: [
        { time: "06:00", rate: 10 }, { time: "08:00", rate: 45 },
        { time: "10:00", rate: 70 }, { time: "12:00", rate: 55 },
        { time: "14:00", rate: 60 }, { time: "16:00", rate: 80 },
        { time: "18:00", rate: 85 }, { time: "20:00", rate: 50 },
        { time: "22:00", rate: 25 }
      ],
      liveStations: [
        { id: "1", name: "MG Road Fast Charge Hub", location: "MG Road, Bengaluru", vendor: "GreenCharge India", chargers: { available: 5, charging: 2, offline: 1 }, status: "Available" },
        { id: "2", name: "BKC EV Plaza", location: "BKC, Mumbai", vendor: "ChargePoint Networks", chargers: { available: 3, charging: 8, offline: 1 }, status: "Charging" },
        { id: "3", name: "Cyber Hub Station", location: "Cyber Hub, Gurgaon", vendor: "EcoVolt Solutions", chargers: { available: 0, charging: 0, offline: 6 }, status: "Offline" },
        { id: "4", name: "Connaught Place Hub", location: "CP, New Delhi", vendor: "ChargePoint Networks", chargers: { available: 4, charging: 5, offline: 1 }, status: "Charging" },
        { id: "5", name: "Koregaon Park Fast Charge", location: "Koregaon Park, Pune", vendor: "Zap Electric", chargers: { available: 4, charging: 0, offline: 0 }, status: "Available" },
        { id: "6", name: "Hitech City Hub", location: "Hitech City, Hyderabad", vendor: "NexGen Charge", chargers: { available: 0, charging: 0, offline: 6 }, status: "Maintenance" }
      ],
      /* Injected custom notification profiles matching exact live application triggers */
      recentAlerts: [
        { id: "a1", type: "Fault", title: "Charger Fault Detected", message: "Bay 4 at MG Road Hub reported a CAN bus communication error.", timestamp: "2 min ago" },
        { id: "a2", type: "Registration", title: "New Vendor Onboarding", message: "Voltaic Energy filed platform access authorization documentation.", timestamp: "15 min ago" },
        { id: "a3", type: "Offline", title: "Station Went Offline", message: "Cyber Hub Station is unreachable. Last heartbeat log failed.", timestamp: "28 min ago" },
        { id: "a4", type: "Completion", title: "Charging Session Finished", message: "Session #8812 closed at BKC EV Plaza. Discharged 42.4 kWh cleanly.", timestamp: "1 hr ago" },
        { id: "a5", type: "Failure", title: "Gateway Payment Failure", message: "Transaction failed for User ID #4492 via current billing routes.", timestamp: "2 hr ago" }
      ]
    };
  }
};