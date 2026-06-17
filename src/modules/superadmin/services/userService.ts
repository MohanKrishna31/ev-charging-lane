import type { UserManagementItem } from "../types/users";

export const userService = {
  fetchUsersState: async (): Promise<UserManagementItem[]> => {
    return [
      {
        id: "USR001",
        fullName: "Rajesh Kumar",
        email: "rajesh@evlane.io",
        role: "Super Admin",
        vendorName: "—",
        lastLogin: "09 Jun 2026, 10:30 AM",
        status: "Active"
      },
      {
        id: "USR002",
        fullName: "Arjun Mehta",
        email: "arjun@greencharge.in",
        role: "Vendor Admin",
        vendorName: "GreenCharge India",
        lastLogin: "09 Jun 2026, 09:15 AM",
        status: "Active"
      },
      {
        id: "USR003",
        fullName: "Priya Sharma",
        email: "priya@ecovolt.co",
        role: "Vendor Admin",
        vendorName: "EcoVolt Solutions",
        lastLogin: "09 Jun 2026, 08:45 AM",
        status: "Active"
      },
      {
        id: "USR004",
        fullName: "Deepak Nair",
        email: "deepak@evlane.io",
        role: "Station Operator",
        vendorName: "ChargePoint Networks",
        lastLogin: "09 Jun 2026, 11:00 AM",
        status: "Active"
      },
      {
        id: "USR005",
        fullName: "Sunita Joshi",
        email: "sunita@evlane.io",
        role: "Finance Manager",
        vendorName: "—",
        lastLogin: "08 Jun 2026, 05:30 PM",
        status: "Active"
      },
      {
        id: "USR006",
        fullName: "Amir Khan",
        email: "amir@powerupev.com",
        role: "Vendor Admin",
        vendorName: "PowerUp EV",
        lastLogin: "07 Jun 2026, 02:10 PM",
        status: "Inactive"
      },
      {
        id: "USR007",
        fullName: "Pooja Verma",
        email: "pooja@evlane.io",
        role: "Support Agent",
        vendorName: "—",
        lastLogin: "09 Jun 2026, 10:55 AM",
        status: "Active"
      }
    ];
  }
};