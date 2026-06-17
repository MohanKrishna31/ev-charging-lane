import type { SessionsModulePayload } from "../types/sessions";

export const sessionService = {
  fetchSessionsState: async (): Promise<SessionsModulePayload> => {
    return {
      summary: {
        activeCount: 3,
        completedTodayCount: 2,
        failedTodayCount: 1,
        totalEnergyDispensed: "147.5 kWh"
      },
      items: [
        {
          id: "1",
          sessionCode: "SES001",
          timestamp: "10:24 AM",
          customerName: "Amit Bose",
          vehicleModel: "Tata Nexon EV",
          stationName: "MG Road Fast Charge Hub",
          bayDetails: "Bay 2 – DC Fast",
          energyDispensed: "18.4 kWh",
          durationMinutes: 38,
          currentCost: 460,
          status: "Active",
          chargePercentage: 72
        },
        {
          id: "2",
          sessionCode: "SES002",
          timestamp: "10:05 AM",
          customerName: "Divya Nair",
          vehicleModel: "MG ZS EV",
          stationName: "BKC EV Plaza",
          bayDetails: "Bay 1 – DC Ultra",
          energyDispensed: "42.1 kWh",
          durationMinutes: 57,
          currentCost: 1052,
          status: "Active",
          chargePercentage: 84
        },
        {
          id: "3",
          sessionCode: "SES003",
          timestamp: "09:50 AM",
          customerName: "Rohan Gupta",
          vehicleModel: "Hyundai Kona",
          stationName: "Connaught Place Hub",
          bayDetails: "Bay 2 – DC Fast",
          energyDispensed: "28.6 kWh",
          durationMinutes: 72,
          currentCost: 715,
          status: "Active",
          chargePercentage: 45
        },
        {
          id: "4",
          sessionCode: "SES004",
          timestamp: "09:30 AM",
          customerName: "Meena Krishnan",
          vehicleModel: "Tata Tigor EV",
          stationName: "Salt Lake EV Point",
          bayDetails: "Bay 1 – DC Fast",
          energyDispensed: "35.2 kWh",
          durationMinutes: 92,
          currentCost: 880,
          status: "Completed"
        },
        {
          id: "5",
          sessionCode: "SES005",
          timestamp: "09:15 AM",
          customerName: "Suresh Pillai",
          vehicleModel: "Ola S1 Pro",
          stationName: "Anna Nagar Station",
          bayDetails: "Bay 3 – AC Fast",
          energyDispensed: "12.8 kWh",
          durationMinutes: 110,
          currentCost: 320,
          status: "Completed"
        },
        {
          id: "6",
          sessionCode: "SES006",
          timestamp: "08:45 AM",
          customerName: "Kavitha Reddy",
          vehicleModel: "Bajaj Chetak",
          stationName: "Koregaon Park Fast Charge",
          bayDetails: "Bay 2 – AC",
          energyDispensed: "8.4 kWh",
          durationMinutes: 45,
          currentCost: 210,
          status: "Failed"
        }
      ]
    };
  }
};