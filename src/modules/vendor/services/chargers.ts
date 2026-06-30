import type { Charger } from "../types/chargers";

const chargersData: Charger[] = [
  {
    id: "CHR001",
    name: "Bay 1 - DC Fast",
    status: "Available",
    power: 150,
    connectorType: "CCS2",
    lastUsed: "2 min ago",
    totalSessions: 48,
  },
  {
    id: "CHR002",
    name: "Bay 2 - DC Fast",
    status: "Charging",
    power: 150,
    connectorType: "CCS2",
    lastUsed: "Active",
    totalSessions: 52,
    activeSessionProgress: 72,
  },
  {
    id: "CHR003",
    name: "Bay 3 - AC Fast",
    status: "Available",
    power: 22,
    connectorType: "Type 2",
    lastUsed: "15 min ago",
    totalSessions: 31,
  },
  {
    id: "CHR004",
    name: "Bay 4 - CHAdeMO",
    status: "Faulted",
    power: 50,
    connectorType: "CHAdeMO",
    lastUsed: "3 hrs ago",
    totalSessions: 27,
    error: "CAN bus communication error detected",
  },
  {
    id: "CHR005",
    name: "Bay 1 - DC Ultra",
    status: "Charging",
    power: 300,
    connectorType: "CCS2",
    lastUsed: "Active",
    totalSessions: 61,
    activeSessionProgress: 72,
  },
  {
    id: "CHR006",
    name: "Bay 2 - DC Ultra",
    status: "Charging",
    power: 300,
    connectorType: "CCS2",
    lastUsed: "Active",
    totalSessions: 59,
    activeSessionProgress: 72,
  },
  {
    id: "CHR007",
    name: "Bay 1 - AC",
    status: "Available",
    power: 7.4,
    connectorType: "Type 2",
    lastUsed: "1 hr ago",
    totalSessions: 19,
  },
  {
    id: "CHR008",
    name: "Bay 2 - DC Fast",
    status: "Charging",
    power: 50,
    connectorType: "CCS2",
    lastUsed: "Active",
    totalSessions: 44,
    activeSessionProgress: 72,
  },
];

export const chargerService = {
  getChargers: (): Charger[] => {
    return chargersData;
  },
};
