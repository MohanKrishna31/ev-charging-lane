import type { ReportSummaryMetrics, VendorPerformanceRow, StationPerformanceRow } from "../types/reports";

export const reportService = {
  getRevenueMetrics: (): ReportSummaryMetrics => ({
    stat1Label: "Total Revenue", stat1Value: "₹24,80,000", stat1Sub: "Total Revenue",
    stat2Label: "Total Sessions", stat2Value: "7,640", stat2Sub: "Total Sessions",
    stat3Label: "Avg Revenue/Session", stat3Value: "₹324.60", stat3Sub: "Avg Revenue/Session",
    stat4Label: "Growth vs Last Period", stat4Value: "+16.4%", stat4Sub: "Growth vs Last Period"
  }),

  getChargingUsageMetrics: (): ReportSummaryMetrics => ({
    stat1Label: "Total Sessions", stat1Value: "7,640", stat1Sub: "Total Sessions",
    stat2Label: "Energy Dispensed", stat2Value: "1,24,800 kWh", stat2Sub: "Energy Dispensed",
    stat3Label: "Avg Session Duration", stat3Value: "54 min", stat3Sub: "Avg Session Duration",
    stat4Label: "Peak Hour", stat4Value: "4-5 PM", stat4Sub: "Peak Hour"
  }),

  getBarChartTimeline: () => [
    { name: "Jan", Revenue: 11.4 },
    { name: "Feb", Revenue: 13.0 },
    { name: "Mar", Revenue: 14.2 },
    { name: "Apr", Revenue: 17.8 },
    { name: "May", Revenue: 21.5 },
    { name: "Jun", Revenue: 24.8 }
  ],

  getWeeklyUsageData: () => [
    { day: "Mon", Completed: 380, Active: 120, Failed: 12 },
    { day: "Tue", Completed: 410, Active: 150, Failed: 18 },
    { day: "Wed", Completed: 395, Active: 135, Failed: 14 },
    { day: "Thu", Completed: 440, Active: 180, Failed: 22 },
    { day: "Fri", Completed: 480, Active: 210, Failed: 16 },
    { day: "Sat", Completed: 560, Active: 260, Failed: 25 },
    { day: "Sun", Completed: 520, Active: 220, Failed: 19 }
  ],

  getVendorPerformance: (): VendorPerformanceRow[] => [
    { vendorName: "ChargePoint", revenue: 412800, sessions: 1240, avgPerSession: 333, stations: 25, uptime: 98.8 },
    { vendorName: "GreenCharge", revenue: 284500, sessions: 854, avgPerSession: 333, stations: 19, uptime: 97.8 },
    { vendorName: "EcoVolt", revenue: 196200, sessions: 589, avgPerSession: 333, stations: 23, uptime: 96.2 },
    { vendorName: "NexGen", revenue: 142600, sessions: 428, avgPerSession: 333, stations: 9, uptime: 96.0 },
    { vendorName: "Zap Electric", revenue: 67200, sessions: 202, avgPerSession: 333, stations: 18, uptime: 98.0 },
    { vendorName: "PowerUp", revenue: 98400, sessions: 295, avgPerSession: 334, stations: 25, uptime: 95.7 }
  ],

  getStationPerformance: (): StationPerformanceRow[] => [
    { stationName: "MG Road Fast Charge Hub", revenue: 384200, sessions: 1120, avgPerSession: 343, chargers: 8, uptime: 99.2 },
    { stationName: "BKC EV Plaza", revenue: 291500, sessions: 840, avgPerSession: 347, chargers: 12, uptime: 98.5 },
    { stationName: "Cyber Hub Station", revenue: 210200, sessions: 610, avgPerSession: 344, chargers: 6, uptime: 97.9 },
    { stationName: "Connaught Place Hub", revenue: 185600, sessions: 540, avgPerSession: 343, chargers: 10, uptime: 96.4 },
    { stationName: "Salt Lake EV Point", revenue: 142300, sessions: 415, avgPerSession: 342, chargers: 5, uptime: 98.1 }
  ]
};