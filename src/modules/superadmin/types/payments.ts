export interface PaymentTransactionItem {
  id: string;
  transactionId: string;
  sessionCode: string;
  customerName: string;
  vendorName: string;
  amount: number;
  taxAmount: number;
  paymentMethod: "UPI" | "Credit Card" | "Wallet" | "Net Banking" | "Debit Card" | string;
  status: "Success" | "Failed" | "Pending";
  timestamp: string;
}

export interface SettlementItem {
  id: string;
  vendorName: string;
  dateRangeText: string;
  amount: number;
  status: "Processing" | "Pending";
}

export interface PaymentSummaryMetrics {
  totalRevenue: string;
  revenueTrendGrowth: string;
  totalSessionsCount: string;
  sessionsTrendGrowth: string;
  activeVendorsPayout: string;
  successRatePercentage: string;
  failuresTodayCount: number;
}

export interface PaymentModulePayload {
  summary: PaymentSummaryMetrics;
  revenueChartTimeline: { month: string; amount: number }[];
  transactions: PaymentTransactionItem[];
  settlements: SettlementItem[];
}