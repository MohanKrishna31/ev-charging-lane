import type { PaymentModulePayload } from "../types/payments";

export const paymentService = {
  fetchPaymentsState: async (): Promise<PaymentModulePayload> => {
    return {
      summary: {
        totalRevenue: "₹1,84,200",
        revenueTrendGrowth: "+18%",
        totalSessionsCount: "24,80,000",
        sessionsTrendGrowth: "+16%",
        activeVendorsPayout: "₹3,24,800",
        successRatePercentage: "98.4%",
        failuresTodayCount: 6
      },
      revenueChartTimeline: [
        { month: "Jan", amount: 12.4 },
        { month: "Feb", amount: 13.0 },
        { month: "Mar", amount: 14.2 },
        { month: "Apr", amount: 17.8 },
        { month: "May", amount: 19.5 },
        { month: "Jun", amount: 21.2 }
      ],
      transactions: [
        {
          id: "TXN1",
          transactionId: "TXN8821",
          sessionCode: "SES004",
          customerName: "Meena Krishnan",
          vendorName: "EcoVolt Solutions",
          amount: 1038,
          taxAmount: 158,
          paymentMethod: "UPI",
          status: "Success",
          timestamp: "09 Jun 2026, 11:02 AM"
        },
        {
          id: "TXN2",
          transactionId: "TXN8820",
          sessionCode: "SES005",
          customerName: "Suresh Pillai",
          vendorName: "GreenCharge India",
          amount: 378,
          taxAmount: 58,
          paymentMethod: "Credit Card",
          status: "Success",
          timestamp: "09 Jun 2026, 11:05 AM"
        },
        {
          id: "TXN3",
          transactionId: "TXN8819",
          sessionCode: "SES006",
          customerName: "Kavitha Reddy",
          vendorName: "Zap Electric",
          amount: 0,
          taxAmount: 0,
          paymentMethod: "Wallet",
          status: "Failed",
          timestamp: "09 Jun 2026, 09:30 AM"
        },
        {
          id: "TXN4",
          transactionId: "TXN8818",
          sessionCode: "SES007",
          customerName: "Priya Das",
          vendorName: "ChargePoint Networks",
          amount: 1463,
          taxAmount: 223,
          paymentMethod: "Net Banking",
          status: "Success",
          timestamp: "08 Jun 2026, 08:15 AM"
        },
        {
          id: "TXN5",
          transactionId: "TXN8817",
          sessionCode: "SES008",
          customerName: "Karan Malhotra",
          vendorName: "GreenCharge India",
          amount: 661,
          taxAmount: 101,
          paymentMethod: "Debit Card",
          status: "Success",
          timestamp: "08 Jun 2026, 07:40 AM"
        },
        {
          id: "TXN6",
          transactionId: "TXN8816",
          sessionCode: "SES009",
          customerName: "Ananya Singh",
          vendorName: "NexGen Charge",
          amount: 850,
          taxAmount: 130,
          paymentMethod: "UPI",
          status: "Pending",
          timestamp: "08 Jun 2026, 11:45 PM"
        }
      ],
      settlements: [
        {
          id: "SET1",
          vendorName: "GreenCharge India",
          dateRangeText: "Jun 1-7, 2026",
          amount: 124400,
          status: "Processing"
        },
        {
          id: "SET2",
          vendorName: "ChargePoint Networks",
          dateRangeText: "Jun 1-7, 2026",
          amount: 98200,
          status: "Pending"
        },
        {
          id: "SET3",
          vendorName: "EcoVolt Solutions",
          dateRangeText: "Jun 1-7, 2026",
          amount: 62800,
          status: "Pending"
        },
        {
          id: "SET4",
          vendorName: "NexGen Charge",
          dateRangeText: "Jun 1-7, 2026",
          amount: 39400,
          status: "Pending"
        }
      ]
    };
  }
};