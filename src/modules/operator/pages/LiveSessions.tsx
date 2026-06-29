import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";

import type { Session } from "../types/liveSessions";
import { sessions } from "../services/liveSessions";

import "../Styles/LiveSessions.css";

import  OperatorLayout  from "../../../layouts/OperatorLayout/OperatorLayout";

// Icons
import {
  RefreshCw,
  Activity,
  Check,
  CircleX, 
  Clock,
  Eye,
  Search,
} from "lucide-react";

// --- Constants ---

export const SESSION_TIMES: Record<string, string> = {
  SE5801: "10:24 AM",
  SE5802: "10:05 AM",
  SE5803: "09:50 AM",
  SE5804: "09:30 AM",
  SE5805: "09:15 AM",
  SE5806: "08:45 AM",
};

export const SESSION_BAYS: Record<string, string> = {
  SE5801: "Bay 2 – DC Fast",
  SE5802: "Bay 1 – DC Ultra",
  SE5803: "Bay 2 – DC Fast",
  SE5804: "Bay 1 – DC Fast",
  SE5805: "Bay 3 – AC Fast",
  SE5806: "Bay 2 – AC",
};

const SESSION_CHARGE: Record<string, number> = {
  SE5801: 72,
  SE5802: 91,
  SE5803: 61,
  SE5804: 100,
  SE5805: 100,
  SE5806: 18,
};

const statusIcons: Record<Session["status"], LucideIcon> = {
  Active: Activity,
  Completed: Check,
  Failed: CircleX,
};

type FilterTab = "live" | "all";

// --- Metrics Component ---

interface MetricsProps {
  active: number;
  completed: number;
  failed: number;
  energy: string;
}

const Metrics: React.FC<MetricsProps> = ({
  active,
  completed,
  failed,
  energy,
}) => {
  return (
    <div className="metrics">
      <div className="metric-card">
        <div className="metric-value active">{active}</div>
        <div className="metric-label">Active Now</div>
      </div>
      <div className="metric-card">
        <div className="metric-value completed">{completed}</div>
        <div className="metric-label">Completed Today</div>
      </div>
      <div className="metric-card">
        <div className="metric-value failed">{failed}</div>
        <div className="metric-label">Failed Today</div>
      </div>
      <div className="metric-card">
        <div className="metric-value amber">{energy}</div>
        <div className="metric-label">Energy Dispensed</div>
      </div>
    </div>
  );
};

// --- Session Monitor Component ---

const CircleProgress: React.FC<{ pct: number; status: string }> = ({
  pct,
  status,
}) => {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const fillColor =
    status === "Active"
      ? "#3b82f6"
      : status === "Completed"
        ? "#22c55e"
        : "#ef4444";

  const trackColor =
    status === "Active"
      ? "var(--donut-track)"
      : status === "Completed"
        ? "rgba(34, 197, 94, 0.15)"
        : "rgba(239, 68, 68, 0.15)";

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke={trackColor}
        strokeWidth="10"
      />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke={fillColor}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 60 60)"
      />
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fontSize="22"
        fill="var(--text-primary)"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        style={{ transition: "fill 0.25s ease" }}
      >
        {pct}%
      </text>
      <text
        x="60"
        y="71"
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-secondary)"
        fontFamily="Inter, sans-serif"
        fontWeight="400"
        style={{ transition: "fill 0.25s ease" }}
      >
        Charged
      </text>
    </svg>
  );
};

interface SessionMonitorProps {
  session: Session;
  sessionTime: string;
  sessionBay: string;
  onClose: () => void;
}

const SessionMonitor: React.FC<SessionMonitorProps> = ({
  session,
  sessionTime,
  sessionBay,
  onClose,
}) => {
  const pct = SESSION_CHARGE[session.id] ?? 50;
  const StatusIcon = statusIcons[session.status];

  const badgeClass =
    session.status === "Active"
      ? "sm-status-badge sm-status-active"
      : session.status === "Completed"
        ? "sm-status-badge sm-status-completed"
        : "sm-status-badge sm-status-failed";

  const rows: { label: string; value: string }[] = [
    { label: "Customer", value: session.customer },
    { label: "Vehicle", value: session.vehicle },
    { label: "Station", value: session.stationFull ?? session.station },
    { label: "Charger", value: sessionBay },
    { label: "Start Time", value: sessionTime },
    { label: "Duration", value: session.duration ?? "—" },
    { label: "Energy Dispensed", value: session.energy },
    { label: "Current Cost", value: session.cost },
  ];

  return (
    <div className="session-monitor">
      <div className="sm-header">
        <span className="sm-title">Session Monitor</span>
        <button className="sm-close-btn" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="sm-chart-area">
        <CircleProgress pct={pct} status={session.status} />
      </div>

      <div className="sm-badge-row">
        <span className={badgeClass}>
          <StatusIcon size={11} strokeWidth={2.5} />
          {session.status}
        </span>
      </div>

      <div className="sm-info-section">
        {rows.map((r) => (
          <div className="sm-info-row" key={r.label}>
            <span className="sm-info-label">{r.label}</span>
            <span className="sm-info-value">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="sm-actions">
        <button className="sm-btn-stop">Stop Session</button>
        <button className="sm-btn-contact">Contact User</button>
      </div>
    </div>
  );
};

// --- Session Table Component ---

interface SessionTableProps {
  sessions: Session[];
  selectedId: string | null;
  onSelectSession: (s: Session) => void;
  monitorPanel?: React.ReactNode;
}

const SessionTable: React.FC<SessionTableProps> = ({
  sessions,
  selectedId,
  onSelectSession,
  monitorPanel,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>("live");
  const [search, setSearch] = useState("");

  const filtered = sessions.filter((s) => {
    const matchTab = activeTab === "all" || s.status === "Active";
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      s.id.toLowerCase().includes(q) ||
      s.customer.toLowerCase().includes(q) ||
      s.station.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const badgeClass = (status: string) => {
    if (status === "Active") return "status-badge badge-active";
    if (status === "Completed") return "status-badge badge-completed";
    return "status-badge badge-failed";
  };

  const renderStatusIcon = (status: Session["status"]) => {
    const Icon = statusIcons[status];
    return <Icon size={10} strokeWidth={2.5} />;
  };

  return (
    <div
      className={`session-container-grid ${monitorPanel ? "has-monitor" : ""}`}
    >
      <div className="session-toolbar-card">
        <div className="toolbar-inner">
          <div className="filter-tabs">
            <button
              id="tab-live"
              className={`tab-btn ${activeTab === "live" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("live")}
            >
              <span className="filter-dot" />
              Live Sessions
            </button>
            <button
              id="tab-all"
              className={`tab-btn ${activeTab === "all" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Sessions
            </button>
          </div>

          <div className="search-wrapper">
            <Search className="search-icon" size={14} strokeWidth={2} />
            <input
              id="session-search"
              className="search-input"
              type="text"
              placeholder="Search sessions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="session-table-card">
        <div className="session-table-area">
          <table className="session-table">
            <thead>
              <tr>
                <th>SESSION</th>
                <th>CUSTOMER</th>
                <th>STATION</th>
                <th>ENERGY</th>
                <th>COST</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className={selectedId === s.id ? "row-selected" : ""}
                  onClick={() => onSelectSession(s)}
                >
                  <td>
                    <div className="session-id">{s.id}</div>
                    <div className="session-time">
                      <Clock size={11} strokeWidth={2} />
                      {SESSION_TIMES[s.id] ?? "—"}
                    </div>
                  </td>

                  <td>
                    <div className="customer-name">{s.customer}</div>
                    <div className="customer-vehicle">{s.vehicle}</div>
                  </td>

                  <td>
                    <div className="station-name">{s.station}</div>
                    <div className="station-bay">
                      {SESSION_BAYS[s.id] ?? ""}
                    </div>
                  </td>

                  <td>
                    <div className="energy-kwh">{s.energy}</div>
                    {s.duration && (
                      <div className="energy-duration">{s.duration}</div>
                    )}
                  </td>

                  <td>
                    <span className="cost-value">{s.cost}</span>
                  </td>

                  <td>
                    <span className={badgeClass(s.status)}>
                      {renderStatusIcon(s.status)}
                      {s.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className={`action-eye-btn ${selectedId === s.id ? "eye-active" : ""}`}
                      title="View session details"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSession(s);
                      }}
                    >
                      <Eye size={16} strokeWidth={2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {monitorPanel && (
        <div className="session-monitor-card">{monitorPanel}</div>
      )}
    </div>
  );
};

// --- Dashboard Component ---

const Dashboard: React.FC = () => {
  const active = sessions.filter((s) => s.status === "Active").length;
  const completed = sessions.filter((s) => s.status === "Completed").length;
  const failed = sessions.filter((s) => s.status === "Failed").length;
  const energy = "147.5 kWh";

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const handleSelectSession = (s: Session) => {
    setSelectedSession((prev) => (prev?.id === s.id ? null : s));
  };

  return (
    <OperatorLayout pageTitle="Live Sessions">
      <div className="page-body">
        <div className="page-header">
          <div className="page-header-left">
            <h1>Charging Sessions</h1>
            <p>
              <span className="active-dot" />
              {active} active sessions right now
            </p>
          </div>
          <button className="refresh-btn">
            <RefreshCw size={14} strokeWidth={2} />
            Refresh
          </button>
        </div>

        <Metrics
          active={active}
          completed={completed}
          failed={failed}
          energy={energy}
        />

        <SessionTable
          sessions={sessions}
          selectedId={selectedSession?.id ?? null}
          onSelectSession={handleSelectSession}
          monitorPanel={
            selectedSession ? (
              <SessionMonitor
                session={selectedSession}
                sessionTime={SESSION_TIMES[selectedSession.id] ?? "—"}
                sessionBay={SESSION_BAYS[selectedSession.id] ?? "—"}
                onClose={() => setSelectedSession(null)}
              />
            ) : undefined
          }
        />
      </div>
    </OperatorLayout>
  );
};

export default Dashboard;
