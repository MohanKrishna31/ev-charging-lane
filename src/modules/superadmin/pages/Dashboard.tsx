import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend, CartesianGrid } from "recharts";
import { AlertCircle, ShieldAlert, Users, MapPin, Zap, Activity, TrendingUp, TrendingDown, DollarSign, RotateCw, UserPlus, CheckCircle2, Landmark } from "lucide-react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { dashboardService } from "../services/dashboardService";
import type { DashboardMetricsPayload, RevenueTrendTimeline } from "../types/dashboard";
import "../styles/Dashboard.css";

interface TooltipPayloadItem {
  name: string;
  value: number | string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const RechartsFixedTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip-box">
        {label && <p className="custom-recharts-tooltip-title">{label}</p>}
        {payload.map((item, idx) => {
          let trackingColorClass = "tooltip-txt-grey";
          
          if (item.name === "Revenue" || item.name === "Completed") {
            trackingColorClass = "tooltip-txt-green"; 
          } else if (item.name === "Active" || item.name === "Utilization Rate") {
            trackingColorClass = "tooltip-txt-blue";  
          } else if (item.name === "Failed") {
            trackingColorClass = "tooltip-txt-red";   
          }

          return (
            <p key={idx} className={`custom-recharts-tooltip-item ${trackingColorClass}`}>
              <span>{item.name}:</span>
              <strong>{item.name === "Revenue" ? `₹${item.value}L` : item.name === "Utilization Rate" ? `${item.value}%` : item.value}</strong>
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

const RenderCustomLegend = () => {
  return (
    <ul className="custom-chart-legend-row">
      <li className="custom-legend-item">
        <span className="legend-dot-indicator completed"></span>
        <span>Completed</span>
      </li>
      <li className="custom-legend-item">
        <span className="legend-dot-indicator active"></span>
        <span>Active</span>
      </li>
      <li className="custom-legend-item">
        <span className="legend-dot-indicator failed"></span>
        <span>Failed</span>
      </li>
    </ul>
  );
};

const computeInitialSessionUsername = (): string => {
  if (typeof window === "undefined") return "Mohan";
  const sessionToken = sessionStorage.getItem("ev_lane_session");
  if (sessionToken) {
    try {
      const parsedToken = JSON.parse(sessionToken);
      if (parsedToken.name) {
        return parsedToken.name.split(" ")[0];
      }
    } catch (err) {
      console.error("Profile session sync initializer read fault:", err);
    }
  }
  return "Mohan";
};

const computeCalendarDateString = (): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return new Date().toLocaleDateString('en-GB', options);
};

const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetricsPayload | null>(null);
  const [revenueTimelineRange, setRevenueTimelineRange] = useState("Last 6 months");
  const [durationSubtitle, setDurationSubtitle] = useState("January — June 2026");
  const [splicedRevenueTrend, setSplicedRevenueTrend] = useState<RevenueTrendTimeline[]>([]);
  
  const [adminUsername] = useState<string>(computeInitialSessionUsername);
  const [calendarTimestamp] = useState<string>(computeCalendarDateString);

  useEffect(() => {
    dashboardService.fetchCoreState().then((data) => {
      setMetrics(data);
      setSplicedRevenueTrend(data.revenueTrend.slice(0, 6));
    });
  }, []);

  const handleTimelineShift = (selectedOption: string) => {
    if (!metrics) return;
    setRevenueTimelineRange(selectedOption);

    if (selectedOption === "Last 7 days") {
      setDurationSubtitle("06 June — 12 June 2026");
      setSplicedRevenueTrend([
        { month: "06 Jun", amount: 0.15 },
        { month: "07 Jun", amount: 0.22 },
        { month: "08 Jun", amount: 0.19 },
        { month: "09 Jun", amount: 0.31 },
        { month: "10 Jun", amount: 0.28 },
        { month: "11 Jun", amount: 0.35 },
        { month: "12 Jun", amount: 0.42 }
      ]);
    } else if (selectedOption === "Last 30 days") {
      setDurationSubtitle("13 May — 12 June 2026");
      setSplicedRevenueTrend([
        { month: "Wk 1", amount: 0.6 },
        { month: "Wk 2", amount: 0.8 },
        { month: "Wk 3", amount: 1.1 },
        { month: "Wk 4", amount: 1.4 }
      ]);
    } else if (selectedOption === "Last 3 months") {
      setDurationSubtitle("March — June 2026");
      setSplicedRevenueTrend(metrics.revenueTrend.slice(2, 6));
    } else if (selectedOption === "Last 6 months") {
      setDurationSubtitle("January — June 2026");
      setSplicedRevenueTrend(metrics.revenueTrend.slice(0, 6));
    } else {
      setDurationSubtitle("January — December 2026");
      setSplicedRevenueTrend(metrics.revenueTrend);
    }
  };

  const triggerDataPayloadSync = () => {
    dashboardService.fetchCoreState().then((data) => setMetrics(data));
  };

  if (!metrics) {
    return (
      <AdminLayout pageTitle="Dashboard">
        <div>Loading System Components...</div>
      </AdminLayout>
    );
  }

  const summaryCardsArray = [
    { label: "Total Vendors", data: metrics.summaryCards.totalVendors, icon: <Users size={18} />, badgeClass: "vendors-badge" },
    { label: "Total Stations", data: metrics.summaryCards.totalStations, icon: <MapPin size={18} />, badgeClass: "stations-badge" },
    { label: "Active Chargers", data: metrics.summaryCards.activeChargers, icon: <Zap size={18} />, badgeClass: "chargers-badge" },
    { label: "Live Sessions", data: metrics.summaryCards.liveSessions, icon: <Activity size={18} />, badgeClass: "sessions-badge" },
    { label: "Revenue Today", data: metrics.summaryCards.revenueToday, icon: <DollarSign size={18} />, badgeClass: "revenue-today-badge" },
    { label: "Revenue MTD", data: metrics.summaryCards.revenueMtd, icon: <Landmark size={18} />, badgeClass: "revenue-mtd-badge" }
  ];

  return (
    <AdminLayout pageTitle="Dashboard">
      <div className="dashboard-grid-view">
        

        <div className="dashboard-content-heading-action-bar">
          <div className="dashboard-greetings-block-stack">
            <h2>Good morning, {adminUsername}</h2>
            <p>{calendarTimestamp} — Here's what's happening across the network</p>
          </div>
          <button 
            type="button" 
            className="dashboard-workspace-refresh-action-btn"
            onClick={triggerDataPayloadSync}
          >
            <RotateCw size={14} />
            <span>Refresh</span>
          </button>
        </div>


        <div className="metrics-ribbon-row">
          {summaryCardsArray.map((card, index) => (
            <div key={index} className="metric-data-card">
              <div className="metric-card-title-line">
                <div className="metric-card-title-left">
                  <div className={`metric-card-icon-container ${card.badgeClass}`}>{card.icon}</div>
                  <span>{card.label}</span>
                </div>
                <span className={`metric-growth-badge trend-${card.data.trendDirection}`}>
                  {card.data.trendDirection === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {card.data.growth}
                </span>
              </div>
              <div className="metric-card-value">{card.data.value}</div>
              <div className="metric-card-subtext">{card.data.subtext}</div>
            </div>
          ))}
        </div>


        <div className="analytics-chart-row">
          <div className="panel-wide-container">
            <div className="panel-headline-row">
              <div className="panel-title-group">
                <h2>Revenue Analytics</h2>
                <select 
                  className="panel-header-select"
                  value={revenueTimelineRange} 
                  onChange={(e) => handleTimelineShift(e.target.value)}
                >
                  <option value="Last 7 days">Last 7 days</option>
                  <option value="Last 30 days">Last 30 days</option>
                  <option value="Last 3 months">Last 3 months</option>
                  <option value="Last 6 months">Last 6 months</option>
                  <option value="Last 12 months">Last 12 months</option>
                </select>
              </div>
              <span>Insights across network</span>
            </div>
            
            <span className="panel-card-description-subtitle">{durationSubtitle}</span>

            <div className="chart-rendering-viewport">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={splicedRevenueTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="currentColor" className="area-stroke-color" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="currentColor" className="area-stroke-color" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  

                  <CartesianGrid strokeDasharray="3 3" stroke="var(--dash-chart-grid)" className="chart-grid-mesh-lines" />

                  <XAxis dataKey="month" stroke="currentColor" className="axis-text-color" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="amount" name="Revenue" stroke="currentColor" className="axis-text-color" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}L`} />
                  <Tooltip content={<RechartsFixedTooltip />} />
                  <Area type="monotone" dataKey="amount" name="Revenue" stroke="currentColor" className="area-stroke-color" strokeWidth={2} fillOpacity={1} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel-narrow-container">
            <div className="panel-headline-row">
              <h2>Connector Types</h2>
            </div>
            <span className="panel-card-description-subtitle">Distribution across network</span>
            
            <div className="donut-custom-layout-wrapper">
              <div className="donut-chart-left-frame">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={metrics.connectorAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="percentage"
                    >
                      {metrics.connectorAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.hexColor} />
                      ))}
                    </Pie>
                    <Tooltip content={<RechartsFixedTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="donut-legend-right-stack">
                {metrics.connectorAllocation.map((item, index) => (
                  <div key={index} className="donut-legend-row-item">
                    <div className="donut-legend-label-left">
                      <span className="legend-dot-indicator" style={{ backgroundColor: item.hexColor }}></span>
                      <span>{item.name}</span>
                    </div>
                    <span className="donut-legend-percentage-value">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Equal Width Cards */}
        <div className="analytics-chart-row">
          <div className="panel-equal-container">
            <div className="panel-headline-row">
              <h2>Charging Sessions</h2>
            </div>
            <span className="panel-card-description-subtitle">Weekly breakdown</span>
            <div className="chart-rendering-viewport">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.sessionSplits} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" stroke="currentColor" className="axis-text-color" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="currentColor" className="axis-text-color" fontSize={12} tickLine={false} axisLine={false} />


                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--dash-chart-grid)" className="chart-grid-mesh-lines" />
                  
                  <Tooltip content={<RechartsFixedTooltip />} />
                  <Legend content={<RenderCustomLegend />} verticalAlign="top" align="center" />
                  
                  <Bar dataKey="completed" name="Completed" fill="currentColor" className="bar-completed-color" barSize={16} />
                  <Bar dataKey="active" name="Active" fill="currentColor" className="bar-active-color" barSize={16} />
                  <Bar dataKey="failed" name="Failed" fill="currentColor" className="bar-failed-color" barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel-equal-container">
            <div className="panel-headline-row">
              <h2>Charger Utilization Today</h2>
            </div>
            <span className="panel-card-description-subtitle">Hourly average across all stations</span>
            <div className="chart-rendering-viewport">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics.utilizationTimeline} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey="time" stroke="currentColor" className="axis-text-color" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="currentColor" className="axis-text-color" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                  

                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--dash-chart-grid)" className="chart-grid-mesh-lines" />
                  
                  <Tooltip content={<RechartsFixedTooltip />} />
                  <Line type="monotone" dataKey="rate" name="Utilization Rate" stroke="currentColor" className="line-rate-color" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Row 3: Live Matrix and Alerts Splits */}
        <div className="analytics-chart-row">
          <div className="panel-wide-container">
            <div className="panel-headline-row">
              <h2>Live Station Status</h2>
              <Link to="/admin/stations" className="panel-view-all-link">View all &rarr;</Link>
            </div>
            <div className="data-table-scroller no-scrollbar">
              <table className="dashboard-custom-table">
                <thead>
                  <tr>
                    <th>Station</th>
                    <th>Vendor</th>
                    <th>Chargers</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.liveStations.map((station) => (
                    <tr key={station.id}>
                      <td>
                        <div className="table-primary-text">{station.name}</div>
                        <div className="table-sub-text">{station.location}</div>
                      </td>
                      <td>
                        <div className="table-primary-text">{station.vendor}</div>
                      </td>
                      <td>
                        <div className="table-charger-metrics-row-layout">
                          <span className="charger-inline-item avail">{station.chargers.available} avail</span>
                          <span className="charger-inline-item charg">{station.chargers.charging} charging</span>
                          {station.chargers.offline > 0 && (
                            <span className="charger-inline-item offln">{station.chargers.offline} offline</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`status-capsule-tag ${station.status.toLowerCase()}`}>
                          {station.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel-narrow-container">
            <div className="panel-headline-row">
              <h2>Recent Alerts</h2>
              <Link to="/admin/notifications" className="panel-view-all-link">View all &rarr;</Link>
            </div>
            <div className="realtime-alerts-stream">
              {metrics.recentAlerts.map((alert, index) => (
                <div key={alert.id} className="alert-stream-item">
                  <div className={`alert-icon-frame ${
                    alert.type === "Fault" ? "fault-state" : 
                    alert.type === "Offline" ? "offline-state" : 
                    alert.type === "Registration" ? "vendor-state" :
                    alert.type === "Completion" ? "completion-state" :
                    "failure-state"
                  }`}>
                    {alert.type === "Fault" && <ShieldAlert size={16} />}
                    {alert.type === "Offline" && <AlertCircle size={16} />}
                    {alert.type === "Failure" && <AlertCircle size={16} />}
                    {alert.type === "Registration" && <UserPlus size={16} />}
                    {alert.type === "Completion" && <CheckCircle2 size={16} />}
                  </div>

                  <div className="alert-item-meta">
                    <h4>{alert.title}</h4>
                    <p>{alert.message}</p>
                  </div>
                  <span className="alert-item-time">{alert.timestamp}</span>
                  {index < 2 && <span className="alert-unread-green-dot"></span>}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;