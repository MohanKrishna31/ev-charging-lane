export interface Session {
  id: string;
  customer: string;
  vehicle: string;
  station: string;
  stationFull?: string;
  energy: string;
  duration?: string;
  cost: string;
  status: "Active" | "Completed" | "Failed";
}
