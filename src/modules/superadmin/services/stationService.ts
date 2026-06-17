import type { StationModulePayload } from "../types/stations";

export const stationService = {
  fetchStationsState: async (): Promise<StationModulePayload> => {
    return {
      summary: {
        totalAcrossNetwork: 8,
        availableCount: 3,
        chargingCount: 3,
        offlineCount: 1,
        maintenanceCount: 1
      },
      items: [
        {
          id: "STN001",
          stationCode: "STN001",
          name: "MG Road Fast Charge Hub",
          location: "MG Road, Bengaluru",
          vendor: "GreenCharge India",
          chargers: { total: 8, available: 5, busy: 2, offline: 1 },
          utilizationPercentage: 25,
          status: "Available"
        },
        {
          id: "STN002",
          stationCode: "STN002",
          name: "BKC EV Plaza",
          location: "BKC, Mumbai",
          vendor: "ChargePoint Networks",
          chargers: { total: 12, available: 3, busy: 8, offline: 1 },
          utilizationPercentage: 67,
          status: "Charging"
        },
        {
          id: "STN003",
          stationCode: "STN003",
          name: "Cyber Hub Station",
          location: "Cyber Hub, Gurgaon",
          vendor: "EcoVolt Solutions",
          chargers: { total: 6, available: 0, busy: 0, offline: 6 },
          utilizationPercentage: 0,
          status: "Offline"
        },
        {
          id: "STN004",
          stationCode: "STN004",
          name: "Connaught Place Hub",
          location: "CP, New Delhi",
          vendor: "ChargePoint Networks",
          chargers: { total: 10, available: 4, busy: 5, offline: 1 },
          utilizationPercentage: 50,
          status: "Charging"
        },
        {
          id: "STN005",
          stationCode: "STN005",
          name: "Koregaon Park Fast Charge",
          location: "Koregaon Park, Pune",
          vendor: "Zap Electric",
          chargers: { total: 4, available: 4, busy: 0, offline: 0 },
          utilizationPercentage: 0,
          status: "Available"
        },
        {
          id: "STN006",
          stationCode: "STN006",
          name: "Hitech City Hub",
          location: "Hitech City, Hyderabad",
          vendor: "NexGen Charge",
          chargers: { total: 6, available: 0, busy: 0, offline: 6 },
          utilizationPercentage: 0,
          status: "Maintenance"
        },
        {
          id: "STN007",
          stationCode: "STN007",
          name: "Salt Lake EV Point",
          location: "Salt Lake, Kolkata",
          vendor: "EcoVolt Solutions",
          chargers: { total: 5, available: 3, busy: 2, offline: 0 },
          utilizationPercentage: 40,
          status: "Charging"
        },
        {
          id: "STN008",
          stationCode: "STN008",
          name: "Anna Nagar Station",
          location: "Anna Nagar, Chennai",
          vendor: "GreenCharge India",
          chargers: { total: 7, available: 6, busy: 1, offline: 0 },
          utilizationPercentage: 14,
          status: "Available"
        }
      ]
    };
  }
};