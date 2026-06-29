export interface Station {
  id: string;
  name: string;
  location: string;
  vendor: string;
  chargers: {
    total: number;
    available: number;
    busy: number;
    offline: number;
  };
  utilization: number;
  status: "Available" | "Charging" | "Offline" | "Maintenance";
  code?: string;
  contactNumber?: string;
  workingHours?: string;
  state?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  amenities?: string[];
}
