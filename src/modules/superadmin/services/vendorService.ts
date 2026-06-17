import type { VendorModulePayload } from "../types/vendors";

export const vendorService = {
  fetchVendorsState: async (): Promise<VendorModulePayload> => {
    return {
      totalRegisteredText: "6 vendors registered on the platform",
      items: [
        {
          id: "VND001",
          companyName: "GreenCharge India",
          vendorCode: "VND001",
          location: "Mumbai",
          contactName: "Arjun Mehta",
          contactEmail: "arjun@greencharge.in",
          stationsCount: 24,
          activeStationsCount: 21,
          revenueMtd: "₹2,84,500",
          status: "Active"
        },
        {
          id: "VND002",
          companyName: "EcoVolt Solutions",
          vendorCode: "VND002",
          location: "Bengaluru",
          contactName: "Priya Sharma",
          contactEmail: "priya@ecovolt.co",
          stationsCount: 18,
          activeStationsCount: 16,
          revenueMtd: "₹1,96,200",
          status: "Active"
          },
          {
          id: "VND003",
          companyName: "Voltaic Energy Hubs",
          vendorCode: "VND003",
          location: "Hyderabad",
          contactName: "Sanjay Dutt",
          contactEmail: "sanjay@voltaic.net",
          stationsCount: 0,
          activeStationsCount: 0,
          revenueMtd: "₹0.00",
          status: "Pending" 
        },
        {
          id: "VND004",
          companyName: "ChargePoint Networks",
          vendorCode: "VND004",
          location: "Delhi",
          contactName: "Rahul Verma",
          contactEmail: "rahul@chargepoint.co.in",
          stationsCount: 31,
          activeStationsCount: 28,
          revenueMtd: "₹4,12,800",
          status: "Active"
        },
        {
          id: "VND005",
          companyName: "PowerUp EV",
          vendorCode: "VND005",
          location: "Ahmedabad",
          contactName: "Sneha Patel",
          contactEmail: "sneha@powerupev.com",
          stationsCount: 12,
          activeStationsCount: 9,
          revenueMtd: "₹98,400",
          status: "Suspended"
        },
        {
          id: "VND006",
          companyName: "NexGen Charge",
          vendorCode: "VND006",
          location: "Koregaon Pune",
          contactName: "Anita Rao",
          contactEmail: "anita@nexgencharge.io",
          stationsCount: 15,
          activeStationsCount: 12,
          revenueMtd: "₹1,42,600",
          status: "Pending" 
        }
      ]
    };
  }
};