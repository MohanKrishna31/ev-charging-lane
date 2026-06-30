import React, { useEffect, useState } from "react";
import { MapPin, Zap, Activity, TrendingUp } from "lucide-react";
import { fetchDashboardData } from "../services/dashboard";
import type { DashboardData } from "../types/dashboard";
import "../styles/Dashboard.css";

const RevenueChart: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const dataPoints = [
    { x: 0, y: 56, month: "Jan", rev: "11.5L" },
    { x: 20, y: 52, month: "Feb", rev: "12.5L" },
    { x: 40, y: 42, month: "Mar", rev: "15.0L" },
    { x: 60, y: 27, month: "Apr", rev: "18.9L" },
    { x: 80, y: 14, month: "May", rev: "22.5L" },
    { x: 100, y: 4, month: "Jun", rev: "25.0L" },
  ];

  return (
    <div className="chart-card" style={{ flex: 1.2 }}>
      <h3 className="chart-title">Revenue Trend</h3>
      <div style={{ position: "relative", height: "260px", width: "100%" }}>
        {/* Y-axis labels */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#64748b",
            fontSize: "0.75rem",
          }}
        >
          <span>₹26L</span>
          <span>₹20L</span>
          <span>₹13L</span>
          <span>₹7L</span>
          <span>₹0L</span>
        </div>

        {/* Chart area */}
        <div
          style={{
            position: "absolute",
            left: "44px",
            right: 0,
            top: "8px",
            bottom: "24px",
            borderBottom: "1px solid #334155",
          }}
        >
          {/* Grid lines */}
          <div
            className="chart-grid-line"
            style={{
              position: "absolute",
              top: "25%",
              left: 0,
              right: 0,
              borderTop: "1px dashed #334155",
            }}
          ></div>
          <div
            className="chart-grid-line"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              borderTop: "1px dashed #334155",
            }}
          ></div>
          <div
            className="chart-grid-line"
            style={{
              position: "absolute",
              top: "75%",
              left: 0,
              right: 0,
              borderTop: "1px dashed #334155",
            }}
          ></div>

          <div
            className="chart-grid-line"
            style={{
              position: "absolute",
              left: "20%",
              top: 0,
              bottom: 0,
              borderLeft: "1px dashed #334155",
            }}
          ></div>
          <div
            className="chart-grid-line"
            style={{
              position: "absolute",
              left: "40%",
              top: 0,
              bottom: 0,
              borderLeft: "1px dashed #334155",
            }}
          ></div>
          <div
            className="chart-grid-line"
            style={{
              position: "absolute",
              left: "60%",
              top: 0,
              bottom: 0,
              borderLeft: "1px dashed #334155",
            }}
          ></div>
          <div
            className="chart-grid-line"
            style={{
              position: "absolute",
              left: "80%",
              top: 0,
              bottom: 0,
              borderLeft: "1px dashed #334155",
            }}
          ></div>
          <div
            className="chart-grid-line"
            style={{
              position: "absolute",
              left: "100%",
              top: 0,
              bottom: 0,
              borderLeft: "1px dashed #334155",
            }}
          ></div>

          {/* SVG Line and Fill */}
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="revenue-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points="0,100 0,56 20,52 40,42 60,27 80,14 100,4 100,100"
              fill="url(#revenue-gradient)"
            />
            <polyline
              points="0,56 20,52 40,42 60,27 80,14 100,4"
              fill="none"
              stroke="#059669"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Hover Interactions */}
            {dataPoints.map((pt, i) => (
              <g key={i}>
                <rect
                  x={pt.x > 0 ? pt.x - 10 : 0}
                  y="0"
                  width={pt.x === 0 || pt.x === 100 ? 10 : 20}
                  height="100"
                  fill="transparent"
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                  style={{ cursor: "pointer" }}
                />
              </g>
            ))}
          </svg>

          {/* HTML Hover Guide Elements */}
          {hoverIndex !== null && (
            <>
              {/* Vertical Guide Line */}
              <div
                style={{
                  position: "absolute",
                  left: `${dataPoints[hoverIndex].x}%`,
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  backgroundColor: "#475569",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />

              {/* Circle Marker */}
              <div
                style={{
                  position: "absolute",
                  left: `${dataPoints[hoverIndex].x}%`,
                  top: `${dataPoints[hoverIndex].y}%`,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: "2px solid #059669",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  zIndex: 3,
                }}
              />

              {/* Tooltip Box */}
              <div
                style={{
                  position: "absolute",
                  left: `${dataPoints[hoverIndex].x}%`,
                  top: `${dataPoints[hoverIndex].y}%`,
                  transform: `translate(${dataPoints[hoverIndex].x > 60 ? "-115%" : "16px"}, -50%)`,
                  backgroundColor: "#0d1520",
                  border: "1px solid #1e293b",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontFamily: "Inter, sans-serif",
                  zIndex: 10,
                  pointerEvents: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                  minWidth: "125px",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: "#94a3b8",
                    marginBottom: "4px",
                  }}
                >
                  {dataPoints[hoverIndex].month}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span style={{ color: "#94a3b8" }}>Revenue:</span>
                  <span style={{ color: "#10b981", fontWeight: 600 }}>
                    ₹{dataPoints[hoverIndex].rev}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* X-axis labels */}
        <div
          style={{
            position: "absolute",
            left: "44px",
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "space-between",
            color: "#64748b",
            fontSize: "0.75rem",
          }}
        >
          {dataPoints.map((pt, i) => (
            <span
              key={i}
              style={{
                width: "30px",
                textAlign: "center",
                marginLeft: "-15px",
              }}
            >
              {pt.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SessionChart: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const data = [
    { day: "Mon", completed: 370, failed: 10 },
    { day: "Tue", completed: 421, failed: 11 },
    { day: "Wed", completed: 380, failed: 10 },
    { day: "Thu", completed: 450, failed: 10 },
    { day: "Fri", completed: 490, failed: 10 },
    { day: "Sat", completed: 620, failed: 10 },
    { day: "Sun", completed: 570, failed: 10 },
  ];
  const maxVal = 800;

  return (
    <div className="chart-card" style={{ flex: 1 }}>
      <h3 className="chart-title">Session Analytics</h3>
      <div style={{ position: "relative", height: "260px", width: "100%" }}>
        {/* Y-axis labels */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#9ca3af",
            fontSize: "0.75rem",
          }}
        >
          <span>800</span>
          <span>600</span>
          <span>400</span>
          <span>200</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div
          style={{
            position: "absolute",
            left: "32px",
            right: 0,
            top: "8px",
            bottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: "1px solid #334155",
            paddingBottom: "1px",
          }}
        >
          {/* Grid lines */}
          <div
            className="chart-grid-line"
            style={{
              position: "absolute",
              top: "25%",
              left: 0,
              right: 0,
              borderTop: "1px dashed #334155",
              zIndex: 0,
            }}
          ></div>
          <div
            className="chart-grid-line"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              borderTop: "1px dashed #334155",
              zIndex: 0,
            }}
          ></div>
          <div
            className="chart-grid-line"
            style={{
              position: "absolute",
              top: "75%",
              left: 0,
              right: 0,
              borderTop: "1px dashed #334155",
              zIndex: 0,
            }}
          ></div>

          {/* Bars */}
          {data.map((item, i) => {
            return (
              <div
                key={i}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  width: "8%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  gap: "4px",
                  zIndex: hoverIndex === i ? 20 : 1,
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                {hoverIndex === i && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      top: 0,
                      left: "-40%",
                      right: "-40%",
                      backgroundColor: "rgba(215, 215, 215, 0.85)",
                      zIndex: -1,
                      borderRadius: "4px 4px 0 0",
                    }}
                  ></div>
                )}

                <div
                  style={{
                    width: "45%",
                    height: `${(item.completed / maxVal) * 100}%`,
                    backgroundColor: "#16a34a",
                    borderRadius: "2px 2px 0 0",
                  }}
                ></div>
                <div
                  style={{
                    width: "45%",
                    height: `${Math.max((item.failed / maxVal) * 100, 1.5)}%`,
                    backgroundColor: "#ef4444",
                    borderRadius: "2px 2px 0 0",
                  }}
                ></div>

                {hoverIndex === i && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "40%",
                      left: "140%",
                      backgroundColor: "#0f172a",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                      color: "white",
                      fontSize: "11px",
                      zIndex: 10,
                      minWidth: "110px",
                      pointerEvents: "none",
                      border: "1px solid #1e293b",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: "6px",
                        fontSize: "12px",
                      }}
                    >
                      {item.day}
                    </div>
                    <div style={{ color: "#24cb71", margin: "3px 0" }}>
                      Completed: {item.completed}
                    </div>
                    <div style={{ color: "#ef4444", margin: "3px 0" }}>
                      Failed: {item.failed}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div
          style={{
            position: "absolute",
            left: "32px",
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "space-between",
            color: "#9ca3af",
            fontSize: "0.75rem",
            padding: "0 1%",
          }}
        >
          {data.map((item, i) => (
            <span key={i} style={{ width: "8%", textAlign: "center" }}>
              {item.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboardData().then(setData);
  }, []);

  if (!data)
    return <div className="dashboard-loading">Loading Dashboard...</div>;

  const { stats } = data;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">{data.title}</h1>
        <p className="dashboard-date">{data.date}</p>
      </div>

      <div className="dashboard-stats-grid">
        {/* Card 1 */}
        <div className="vendor-stat-card">
          <div className="stat-header">
            <div
              className="stat-icon"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                color: "#60a5fa",
              }}
            >
              <MapPin size={18} />
            </div>
            <span className="stat-badge" style={{ color: "#34d399" }}>
              +2 this month
            </span>
          </div>
          <p className="stat-value">{stats.totalStations}</p>
          <p className="stat-label">Total Stations</p>
          <p className="stat-subtext">{stats.activeStations} active</p>
        </div>

        {/* Card 2 */}
        <div className="vendor-stat-card">
          <div className="stat-header">
            <div
              className="stat-icon"
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.1)",
                color: "#fbbf24",
              }}
            >
              <Zap size={18} />
            </div>
          </div>
          <p className="stat-value">{stats.activeChargers}</p>
          <p className="stat-label">Active Chargers</p>
          <p className="stat-subtext">of {stats.totalChargers} total</p>
        </div>

        {/* Card 3 */}
        <div className="vendor-stat-card">
          <div className="stat-header">
            <div
              className="stat-icon"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "#34d399",
              }}
            >
              <Activity size={18} />
            </div>
            <span className="stat-badge" style={{ color: "#34d399" }}>
              +3 vs avg
            </span>
          </div>
          <p className="stat-value">{stats.ongoingSessions}</p>
          <p className="stat-label">Ongoing Sessions</p>
          <p className="stat-subtext">right now</p>
        </div>

        {/* Card 4 */}
        <div className="vendor-stat-card">
          <div className="stat-header">
            <div
              className="stat-icon"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "#34d399",
              }}
            >
              <TrendingUp size={18} />
            </div>
            <span className="stat-badge" style={{ color: "#34d399" }}>
              +12%
            </span>
          </div>
          <p className="stat-value">₹{stats.revenueToday.toLocaleString()}</p>
          <p className="stat-label">Revenue Today</p>
          <p className="stat-subtext">194 sessions</p>
        </div>

        {/* Card 5 */}
        <div className="vendor-stat-card">
          <div className="stat-header">
            <div
              className="stat-icon"
              style={{
                backgroundColor: "rgba(168, 85, 247, 0.1)",
                color: "#c084fc",
              }}
            >
              <TrendingUp size={18} />
            </div>
            <span className="stat-badge" style={{ color: "#34d399" }}>
              +{stats.revenueMtdTrend}% vs May
            </span>
          </div>
          <p className="stat-value">₹{stats.revenueMtd}</p>
          <p className="stat-label">Revenue MTD</p>
          <p className="stat-subtext">Jun 2026</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <RevenueChart />
        <SessionChart />
      </div>
    </div>
  );
};

export default Dashboard;
