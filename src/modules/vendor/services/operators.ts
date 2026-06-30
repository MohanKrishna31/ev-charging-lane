import type { OperatorData } from '../types/operators';

export const fetchOperators = (): OperatorData[] => {
  return [
    { id: "1", initials: "RK", name: "Rajesh Kumar", email: "rajesh@evlane.io", role: "Super Admin", vendor: "—", lastLogin: "09 Jun 2026, 10:30 AM", status: "Active" },
    { id: "2", initials: "AM", name: "Arjun Mehta", email: "arjun@greencharge.in", role: "Vendor Admin", vendor: "GreenCharge India", lastLogin: "09 Jun 2026, 09:15 AM", status: "Active" },
    { id: "3", initials: "PS", name: "Priya Sharma", email: "priya@ecovolt.co", role: "Vendor Admin", vendor: "EcoVolt Solutions", lastLogin: "09 Jun 2026, 08:45 AM", status: "Active" },
    { id: "4", initials: "DN", name: "Deepak Nair", email: "deepak@evlane.io", role: "Station Operator", vendor: "ChargePoint Networks", lastLogin: "09 Jun 2026, 11:00 AM", status: "Active" },
    { id: "5", initials: "SJ", name: "Sunita Joshi", email: "sunita@evlane.io", role: "Finance Manager", vendor: "—", lastLogin: "08 Jun 2026, 05:30 PM", status: "Active" },
    { id: "6", initials: "AK", name: "Amir Khan", email: "amir@powerupev.com", role: "Vendor Admin", vendor: "PowerUp EV", lastLogin: "07 Jun 2026, 02:10 PM", status: "Inactive" },
    { id: "7", initials: "PV", name: "Pooja Verma", email: "pooja@evlane.io", role: "Support Agent", vendor: "—", lastLogin: "09 Jun 2026, 10:55 AM", status: "Active" }
  ];
};
