import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { Download, BarChart3, Zap, Users, Award, FileText } from "lucide-react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { reportService } from "../services/reportService";
import type { ReportTabOption } from "../types/reports";
import "../styles/Reports.css";


interface ChartPayloadEntry {
  value: number | string;
  dataKey: string;
  name: string;
  payload: {
    name: string;
    Revenue: number;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: ChartPayloadEntry[];
  label?: string;
}


const CurrencyChartTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip-box" style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        padding: "8px 12px",
        borderRadius: "6px"
      }}>
        <p className="custom-recharts-tooltip-title" style={{ margin: "0 0 4px 0", fontSize: "12px", fontWeight: 600 }}>{label}</p>
        <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#24cb71" }}>
          Revenue: ₹{payload[0].value}L
        </p>
      </div>
    );
  }
  return null;
};

const Reports = () => {
  const [activeTab, setActiveTab] = useState<ReportTabOption>("Revenue Reports");
  

  const [timeline, setTimeline] = useState("Last 30 days");
  const [selectedVendor, setSelectedVendor] = useState("All Vendors");
  const [selectedStation, setSelectedStation] = useState("All Stations");


  const summary = activeTab === "Charging Usage" 
    ? reportService.getChargingUsageMetrics() 
    : reportService.getRevenueMetrics();


    const rawVendorData = reportService.getVendorPerformance();
  const filteredVendors = rawVendorData.filter(v => 
    selectedVendor === "All Vendors" || v.vendorName.toLowerCase().includes(selectedVendor.split(" ")[0].toLowerCase())
  );

  const rawStationData = reportService.getStationPerformance();
  const filteredStations = rawStationData.filter(s => 
    selectedStation === "All Stations" || s.stationName === selectedStation
  );


  const HORIZONTAL_BAR_THICKNESS = 32;

  const tabsList: ReportTabOption[] = ["Revenue Reports", "Charging Usage", "Vendor Reports", "Station Performance", "Settlements"];

  return (
    <AdminLayout pageTitle="Reports">
      <div className="reports-workspace-view">
        

        <div className="reports-master-header-row">
          <div className="reports-title-stack">
            <h2>Reports & Analytics</h2>
            <p>Insights across the entire EV lane charging network</p>
          </div>
          <div className="reports-export-actions-flex-bar">
            <button type="button" className="reports-download-trigger-neutral-btn"><Download size={13} /><span>PDF</span></button>
            <button type="button" className="reports-download-trigger-neutral-btn"><Download size={13} /><span>Excel</span></button>
            <button type="button" className="reports-download-trigger-neutral-btn"><Download size={13} /><span>CSV</span></button>
          </div>
        </div>


        <div className="reports-navigation-tabs-pill-row">
          {tabsList.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                className={`reports-tab-pill-btn ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "Revenue Reports" && <BarChart3 size={14} />}
                {tab === "Charging Usage" && <Zap size={14} />}
                {tab === "Vendor Reports" && <Users size={14} />}
                {tab === "Station Performance" && <Award size={14} />}
                {tab === "Settlements" && <FileText size={14} />}
                <span>{tab}</span>
              </button>
            );
          })}
        </div>


        <div className="reports-dropdown-filters-bar-row">
          <select className="reports-filter-dropdown-control" value={timeline} onChange={(e) => setTimeline(e.target.value)}>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 3 months">Last 3 months</option>
            <option value="Last 12 months">Last 12 months</option>
          </select>

          <select className="reports-filter-dropdown-control" value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
            <option value="All Vendors">All Vendors</option>
            <option value="GreenCharge India">GreenCharge India</option>
            <option value="EcoVolt Solutions">EcoVolt Solutions</option>
            <option value="ChargePoint Networks">ChargePoint Networks</option>
          </select>

          <select className="reports-filter-dropdown-control" value={selectedStation} onChange={(e) => setSelectedStation(e.target.value)}>
            <option value="All Stations">All Stations</option>
            <option value="MG Road Fast Charge Hub">MG Road Fast Charge Hub</option>
            <option value="BKC EV Plaza">BKC EV Plaza</option>
          </select>
        </div>


        <div className="reports-kpi-summary-strip-grid">
          <div className="reports-kpi-card-box">
            <h3>{summary.stat1Value}</h3>
            <p>{summary.stat1Label}</p>
          </div>
          <div className="reports-kpi-card-box">
            <h3>{summary.stat2Value}</h3>
            <p>{summary.stat2Label}</p>
          </div>
          <div className="reports-kpi-card-box">
            <h3>{summary.stat3Value}</h3>
            <p>{summary.stat3Label}</p>
          </div>
          <div className="reports-kpi-card-box">
            <h3>{summary.stat4Value}</h3>
            <p>{summary.stat4Label}</p>
          </div>
        </div>


        {(activeTab === "Revenue Reports" || activeTab === "Settlements") && (
          <div className="reports-chart-backplane-panel">
            <h4>Revenue Over Time</h4>
            <div className="reports-canvas-viewport">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportService.getBarChartTimeline()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--dash-chart-grid, #22384c)" opacity={0.4} />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}L`} />
                  <Tooltip content={<CurrencyChartTooltip />} cursor={{ fill: "rgba(143, 165, 188, 0.05)" }} />
                  <Bar dataKey="Revenue" fill="#15803d" radius={[4, 4, 0, 0]} barSize={56} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "Charging Usage" && (
          <div className="reports-chart-backplane-panel">
            <h4>Sessions by Day of Week</h4>
            <div className="reports-canvas-viewport">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportService.getWeeklyUsageData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--dash-chart-grid, #22384c)" opacity={0.4} />
                  <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: "rgba(143, 165, 188, 0.05)" }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  <Bar dataKey="Completed" name="Completed" fill="#15803d" radius={[2, 2, 0, 0]} barSize={18} />
                  <Bar dataKey="Active" name="Active" fill="#00b0ff" radius={[2, 2, 0, 0]} barSize={18} />
                  <Bar dataKey="Failed" name="Failed" fill="#ef5350" radius={[2, 2, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}


        {activeTab === "Vendor Reports" && (
          <div className="reports-workspace-view">
            <div className="reports-chart-backplane-panel">
              <h4>Vendor Performance Comparison</h4>
              <div className="reports-canvas-viewport" style={{ height: `${filteredVendors.length * 55 + 60}px` }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredVendors} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--dash-chart-grid, #22384c)" opacity={0.4} />
                    <XAxis type="number" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis dataKey="vendorName" type="category" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Bar dataKey="revenue" name="Revenue (₹)" fill="#15803d" radius={[0, 4, 4, 0]} barSize={HORIZONTAL_BAR_THICKNESS} />
                    <Bar dataKey="sessions" name="Sessions" fill="#00b0ff" radius={[0, 4, 4, 0]} barSize={HORIZONTAL_BAR_THICKNESS} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="reports-index-table-panel-scroller no-scrollbar">
              <table className="reports-html-data-matrix-table">
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Revenue</th>
                    <th>Sessions</th>
                    <th>Avg/Session</th>
                    <th>Stations</th>
                    <th>Uptime</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendors.map((v, i) => (
                    <tr key={i}>
                      <td><span className="reports-table-text-headline">{v.vendorName}</span></td>
                      <td><span className="reports-table-text-headline">₹{v.revenue.toLocaleString("en-IN")}</span></td>
                      <td><span className="reports-table-text-headline" style={{ fontWeight: 500 }}>{v.sessions}</span></td>
                      <td><span style={{ opacity: 0.85 }}>₹{v.avgPerSession}</span></td>
                      <td><span style={{ opacity: 0.85 }}>{v.stations}</span></td>
                      <td><span className="reports-table-green-bold-txt">{v.uptime}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {activeTab === "Station Performance" && (
          <div className="reports-workspace-view">
            <div className="reports-chart-backplane-panel">
              <h4>Station Operational Metrics Analysis</h4>
              <div className="reports-canvas-viewport" style={{ height: `${filteredStations.length * 55 + 60}px` }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredStations} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--dash-chart-grid, #22384c)" opacity={0.4} />
                    <XAxis type="number" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis dataKey="stationName" type="category" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} width={120} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Bar dataKey="revenue" name="Revenue (₹)" fill="#15803d" radius={[0, 4, 4, 0]} barSize={HORIZONTAL_BAR_THICKNESS} />
                    <Bar dataKey="sessions" name="Sessions" fill="#00b0ff" radius={[0, 4, 4, 0]} barSize={HORIZONTAL_BAR_THICKNESS} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="reports-index-table-panel-scroller no-scrollbar">
              <table className="reports-html-data-matrix-table">
                <thead>
                  <tr>
                    <th>Station Name</th>
                    <th>Revenue</th>
                    <th>Sessions</th>
                    <th>Avg/Session</th>
                    <th>Total Chargers</th>
                    <th>Uptime</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStations.map((s, i) => (
                    <tr key={i}>
                      <td><span className="reports-table-text-headline">{s.stationName}</span></td>
                      <td><span className="reports-table-text-headline">₹{s.revenue.toLocaleString("en-IN")}</span></td>
                      <td><span className="reports-table-text-headline" style={{ fontWeight: 500 }}>{s.sessions}</span></td>
                      <td><span style={{ opacity: 0.85 }}>₹{s.avgPerSession}</span></td>
                      <td><span style={{ opacity: 0.85 }}>{s.chargers} guns</span></td>
                      <td><span className="reports-table-green-bold-txt">{s.uptime}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Reports;