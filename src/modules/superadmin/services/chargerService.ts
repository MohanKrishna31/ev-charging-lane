import type { ChargerModulePayload } from "../types/chargers";

export const chargerService = {
  fetchChargersState: async (): Promise<ChargerModulePayload> => {
    return {
      summary: {
        totalAcrossNetwork: 8,
        availableCount: 3,
        chargingCount: 4,
        faultedCount: 1,
        offlineCount: 0
      },
      items: [
        {
          id: "CHR001",
          chargerCode: "CHR001",
          bayName: "Bay 1 – DC Fast",
          powerOutput: "150 kW",
          connectorType: "CCS2",
          status: "Available",
          timeText: "2 min ago",
          totalSessionsCount: 48
        },
        {
          id: "CHR002",
          chargerCode: "CHR002",
          bayName: "Bay 2 – DC Fast",
          powerOutput: "150 kW",
          connectorType: "CCS2",
          status: "Charging",
          timeText: "Active",
          totalSessionsCount: 52,
          activeSessionPercentage: 72
        },
        {
          id: "CHR003",
          chargerCode: "CHR003",
          bayName: "Bay 3 – AC Fast",
          powerOutput: "22 kW",
          connectorType: "Type 2",
          status: "Available",
          timeText: "15 min ago",
          totalSessionsCount: 31
        },
        {
          id: "CHR004",
          chargerCode: "CHR004",
          bayName: "Bay 4 – CHAdeMO",
          powerOutput: "50 kW",
          connectorType: "CHAdeMO",
          status: "Faulted",
          timeText: "3 hrs ago",
          totalSessionsCount: 27,
          errorMessageBanner: "CAN bus communication error detected"
        },
        {
          id: "CHR005",
          chargerCode: "CHR005",
          bayName: "Bay 1 – DC Ultra",
          powerOutput: "300 kW",
          connectorType: "CCS2",
          status: "Charging",
          timeText: "Active",
          totalSessionsCount: 61,
          activeSessionPercentage: 72
        },
        {
          id: "CHR006",
          chargerCode: "CHR006",
          bayName: "Bay 2 – DC Ultra",
          powerOutput: "300 kW",
          connectorType: "CCS2",
          status: "Charging",
          timeText: "Active",
          totalSessionsCount: 59,
          activeSessionPercentage: 72
        },
        {
          id: "CHR007",
          chargerCode: "CHR007",
          bayName: "Bay 1 – AC",
          powerOutput: "7.4 kW",
          connectorType: "Type 2",
          status: "Available",
          timeText: "1 hr ago",
          totalSessionsCount: 19
        },
        {
          id: "CHR008",
          chargerCode: "CHR008",
          bayName: "Bay 2 – DC Fast",
          powerOutput: "50 kW",
          connectorType: "CCS2",
          status: "Charging",
          timeText: "Active",
          totalSessionsCount: 44,
          activeSessionPercentage: 72
        }
      ]
    };
  }
};