import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { 
  Download as DownloadIcon, 
  CreditCard as CardIcon, 
  ArrowUpRight as ArrowIcon, 
  Percent, 
  RefreshCw, 
  Search,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { paymentService } from "../services/paymentService";
import type { PaymentTransactionItem, SettlementItem, PaymentSummaryMetrics } from "../types/payments";
import "../styles/Payments.css";

const Payments = () => {
  const [summary, setSummary] = useState<PaymentSummaryMetrics | null>(null);
  const [chartData, setChartData] = useState<{ month: string; amount: number }[]>([]);
  const [transactionsList, setTransactionsList] = useState<PaymentTransactionItem[]>([]);
  const [settlementsList, setSettlementsList] = useState<SettlementItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Tab coordinator switch flag: "Transactions" vs "Settlements"
  const [activeTabMode, setActiveTabMode] = useState<"Transactions" | "Settlements">("Transactions");

  useEffect(() => {
    paymentService.fetchPaymentsState().then((data) => {
      setSummary(data.summary);
      setChartData(data.revenueChartTimeline);
      setTransactionsList(data.transactions);
      setSettlementsList(data.settlements);
    });
  }, []);

  const filteredTransactions = transactionsList.filter((tx) => {
    return (
      tx.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sessionCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // FIXED: Status icons now map to exact semantic vector representations matching layout parameters
  const getTransactionStatusIcon = (status: string) => {
    switch (status) {
      case "Success": 
        return <CheckCircle2 size={13} style={{ color: "#24cb71" }} />;
      case "Failed": 
        return <XCircle size={13} style={{ color: "#ef5350" }} />;
      case "Pending":
      default: 
        return <Clock size={13} style={{ color: "#ff9100" }} />;
    }
  };

  return (
    <AdminLayout pageTitle="Payments">
      <div className="payments-workspace-view">
        

        <div className="payments-master-header-row">
          <div className="payments-title-stack">
            <h2>Payment Management</h2>
            <p>Transactions, settlements and revenue overview overview logs</p>
          </div>
          <button type="button" className="payments-export-action-btn">
            <DownloadIcon size={14} />
            <span>Export</span>
          </button>
        </div>


        {summary && (
          <div className="payments-financial-ribbon-grid">
            <div className="payment-kpi-card-node">
              <div className="payment-kpi-card-top-line">
                <div className="kpi-icon-frame-shield"><CardIcon size={16} /></div>
                <span className="kpi-micro-growth-tag positive">↑ {summary.revenueTrendGrowth}</span>
              </div>
              <h3>{summary.totalRevenue}</h3>
              <p>812 transactions total</p>
            </div>

            <div className="payment-kpi-card-node">
              <div className="payment-kpi-card-top-line">
                <div className="kpi-icon-frame-shield"><ArrowIcon size={16} /></div>
                <span className="kpi-micro-growth-tag positive">↑ {summary.sessionsTrendGrowth}</span>
              </div>
              <h3>{summary.totalSessionsCount}</h3>
              <p>7,640 active sessions total</p>
            </div>

            <div className="payment-kpi-card-node">
              <div className="payment-kpi-card-top-line">
                <div className="kpi-icon-frame-shield"><RefreshCw size={16} /></div>
              </div>
              <h3>{summary.activeVendorsPayout}</h3>
              <p>14 active vendors payouts</p>
            </div>

            <div className="payment-kpi-card-node">
              <div className="payment-kpi-card-top-line">
                <div className="kpi-icon-frame-shield"><Percent size={16} /></div>
                <span className="kpi-micro-growth-tag negative">↓ {summary.failuresTodayCount} drop</span>
              </div>
              <h3>{summary.successRatePercentage}</h3>
              <p>{summary.failuresTodayCount} active faults today</p>
            </div>
          </div>
        )}


        <div className="payment-chart-full-backplane-container">
          <h4>Revenue Trend</h4>
          <div className="payments-chart-viewport-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="paymentRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#24cb71" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#24cb71" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--dash-chart-grid, #22384c)" opacity={0.5} />
                <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}L`} />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#24cb71" strokeWidth={2.5} fillOpacity={1} fill="url(#paymentRevenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div className="payments-operational-filter-strip-row">
          
          <div className="payments-tab-pill-box-frame">
            <button 
              type="button" 
              className={`payments-pill-trigger-btn ${activeTabMode === "Transactions" ? "active" : ""}`}
              onClick={() => setActiveTabMode("Transactions")}
            >
              Transactions
            </button>
            <button 
              type="button" 
              className={`payments-pill-trigger-btn ${activeTabMode === "Settlements" ? "active" : ""}`}
              onClick={() => setActiveTabMode("Settlements")}
            >
              Settlements
            </button>
          </div>

          {activeTabMode === "Transactions" && (
            <div className="payments-search-input-box-positional-frame">
              <Search size={15} />
              <input 
                type="text" 
                className="payments-search-control-input-field"
                placeholder="Search by transaction ID, customer, vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>


        {activeTabMode === "Transactions" && (
          <div className="payments-table-scroller-chassis no-scrollbar">
            <table className="payments-html-master-table">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Customer</th>
                  <th>Vendor</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <div className="payments-stacked-lines-cell">
                        <span className="top-bold-txt">{tx.transactionId}</span>
                        <span className="bottom-mute-txt">{tx.sessionCode}</span>
                      </div>
                    </td>
                    <td><span className="top-bold-txt" style={{ fontWeight: 500 }}>{tx.customerName}</span></td>
                    <td><span className="bottom-mute-txt" style={{ fontSize: "13.5px" }}>{tx.vendorName}</span></td>
                    <td>
                      <div className="payments-stacked-lines-cell">
                        <span className="top-bold-txt">₹{tx.amount}</span>
                        {tx.taxAmount > 0 && <span className="bottom-mute-txt">Tax: ₹{tx.taxAmount}</span>}
                      </div>
                    </td>
                    <td><span className="payments-method-token-chip">{tx.paymentMethod}</span></td>
                    <td>
                      <span className={`payments-semantic-status-text-row ${tx.status.toLowerCase()}`}>
                        {getTransactionStatusIcon(tx.status)}
                        <span style={{ marginLeft: "6px" }}>{tx.status}</span>
                      </span>
                    </td>
                    <td><span className="bottom-mute-txt">{tx.timestamp}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {activeTabMode === "Settlements" && (
          <div className="payments-settlements-vertical-list-stack">
            {settlementsList.map((set) => (
              <div key={set.id} className="settlement-row-node-item">
                <div className="settlement-node-left-identity-stack">
                  <span className="vendor-headline-title">{set.vendorName}</span>
                  <span className="date-range-caption-line">{set.dateRangeText}</span>
                </div>

                <div className="settlement-node-right-finance-triggers-flex">
                  <div className="payments-stacked-lines-cell" style={{ alignItems: "flex-end" }}>
                    <span className="settlement-payout-bold-numeric-digit">₹{set.amount.toLocaleString("en-IN")}</span>
                    <span className={`settlement-inline-pill-badge ${set.status.toLowerCase()}`}>
                      {set.status}
                    </span>
                  </div>
                  <button type="button" className="settlement-green-action-arrow-trigger-btn">
                    <span>Settle</span>
                    <ArrowIcon size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Payments;