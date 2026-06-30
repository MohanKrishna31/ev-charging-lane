import { useEffect, useState } from "react";
import {
  Search,
  RotateCw,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { sessionService } from "../services/sessions";
import type {
  ChargingSessionItem,
  SessionSummaryMetrics,
} from "../types/sessions";
import "../styles/Sessions.css";

const Sessions = () => {
  const [sessionsList, setSessionsList] = useState<ChargingSessionItem[]>([]);
  const [metricsSummary, setMetricsSummary] =
    useState<SessionSummaryMetrics | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeTabMode, setActiveTabMode] = useState<"All" | "Live">("All");

  const [selectedMonitorSession, setSelectedMonitorSession] =
    useState<ChargingSessionItem | null>(null);

  useEffect(() => {
    sessionService.fetchSessionsState().then((data) => {
      setSessionsList(data.items);
      setMetricsSummary(data.summary);
    });
  }, []);

  const triggerLiveReloadSync = () => {
    sessionService.fetchSessionsState().then((data) => {
      setSessionsList(data.items);
      setMetricsSummary(data.summary);
    });
  };

  // FIXED: Toggle condition structure handler for the side console panel
  const handleEyeIconClickToggle = (session: ChargingSessionItem) => {
    setSelectedMonitorSession((prev) =>
      prev?.id === session.id ? null : session,
    );
  };

  const filteredSessions = sessionsList.filter((session) => {
    const matchesTab = activeTabMode === "All" || session.status === "Active";
    const matchesSearch =
      session.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.stationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.sessionCode.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getTableStatusIconSymbol = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Activity size={13} className="session-active-breathing-pulse" />
        );
      case "Completed":
        return <CheckCircle2 size={13} />;
      case "Failed":
        return <AlertTriangle size={13} />;
      default:
        return null;
    }
  };

  const radialRadius = 40;
  const radialCircumference = 2 * Math.PI * radialRadius;
  const targetOffset = selectedMonitorSession?.chargePercentage
    ? radialCircumference -
      (selectedMonitorSession.chargePercentage / 100) * radialCircumference
    : 0;

  return (
    <div className="sessions-workspace-view">
      {/* Header Section */}
      <div className="sessions-master-header-row">
        <div className="sessions-title-stack">
          <h2>Charging Sessions</h2>
          <p>{metricsSummary?.activeCount || 0} active sessions right now</p>
        </div>
        <button
          type="button"
          className="sessions-refresh-neutral-btn"
          onClick={triggerLiveReloadSync}
        >
          <RotateCw size={14} />
          <span>Refresh</span>
        </button>
      </div>

      {metricsSummary && (
        <div className="sessions-analytics-summary-grid">
          <div className="session-metric-card-node">
            <span className="metric-label-tag">Active Now</span>
            <p className="metric-bold-counter-value active">
              {metricsSummary.activeCount}
            </p>
          </div>
          <div className="session-metric-card-node">
            <span className="metric-label-tag">Completed Today</span>
            <p className="metric-bold-counter-value completed">
              {metricsSummary.completedTodayCount}
            </p>
          </div>
          <div className="session-metric-card-node">
            <span className="metric-label-tag">Failed Today</span>
            <p className="metric-bold-counter-value failed">
              {metricsSummary.failedTodayCount}
            </p>
          </div>
          <div className="session-metric-card-node">
            <span className="metric-label-tag">Energy Dispensed</span>
            <p className="metric-bold-counter-value energy">
              {metricsSummary.totalEnergyDispensed}
            </p>
          </div>
        </div>
      )}

      <div className="sessions-control-operations-ribbon">
        <div className="sessions-toggle-pills-container-box">
          <button
            type="button"
            className={`session-view-pill-trigger-btn ${activeTabMode === "Live" ? "active-live" : ""}`}
            onClick={() => setActiveTabMode("Live")}
          >
            <span className="pill-status-pulse-dot"></span>
            <span>Live Sessions</span>
          </button>
          <button
            type="button"
            className={`session-view-pill-trigger-btn ${activeTabMode === "All" ? "active-all" : ""}`}
            onClick={() => setActiveTabMode("All")}
          >
            <span>All Sessions</span>
          </button>
        </div>

        <div className="sessions-search-input-frame-box">
          <Search size={15} className="sessions-lens-icon-positional" />
          <input
            type="text"
            className="sessions-search-control-input-field"
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="sessions-layout-split-screen-chassis">
        <div className="sessions-master-table-scroller-panel no-scrollbar">
          <table className="sessions-html-table-matrix">
            <thead>
              <tr>
                <th>Session</th>
                <th>Customer</th>
                <th>Station</th>
                <th>Energy</th>
                <th>Cost</th>
                <th>Status</th>
                <th style={{ width: "50px" }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    No real-time charging runs match specified telemetry
                    indices.
                  </td>
                </tr>
              ) : (
                filteredSessions.map((session) => {
                  const isCurrentlyMonitored =
                    selectedMonitorSession?.id === session.id;
                  return (
                    <tr key={session.id}>
                      <td>
                        <div className="session-code-bold-meta-stack">
                          <span className="primary-code-text">
                            {session.sessionCode}
                          </span>
                          <span className="secondary-time-text">
                            {session.timestamp}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="session-identity-meta-lines">
                          <span className="title-headline">
                            {session.customerName}
                          </span>
                          <span className="subtitle-caption">
                            {session.vehicleModel}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="session-identity-meta-lines">
                          <span className="title-headline">
                            {session.stationName}
                          </span>
                          <span className="subtitle-caption">
                            {session.bayDetails}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="session-identity-meta-lines">
                          <span
                            className="title-headline"
                            style={{ fontWeight: 600 }}
                          >
                            {session.energyDispensed}
                          </span>
                          <span className="subtitle-caption">
                            {session.durationMinutes} min
                          </span>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            fontWeight: 700,
                            color: "var(--text-primary)",
                          }}
                        >
                          ₹{session.currentCost}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`session-table-pill-status ${session.status.toLowerCase()}`}
                        >
                          {getTableStatusIconSymbol(session.status)}
                          <span style={{ marginLeft: "4px" }}>
                            {session.status}
                          </span>
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={`session-row-action-trigger-eye-btn ${isCurrentlyMonitored ? "active-monitored" : ""}`}
                          aria-label="Open Diagnostics Monitor Console Panel"
                          onClick={() => handleEyeIconClickToggle(session)}
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {selectedMonitorSession && (
          <div className="session-monitor-sidebar-panel">
            <div className="monitor-sidebar-header-line">
              <h3>Session Monitor</h3>
              <button
                type="button"
                className="close-trigger-txt-btn"
                onClick={() => setSelectedMonitorSession(null)}
              >
                Close
              </button>
            </div>

            <div className="monitor-radial-charging-progress-container">
              <div className="radial-svg-relative-frame">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radialRadius}
                    strokeWidth="6"
                    className="radial-track-rail-circle"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radialRadius}
                    strokeWidth="6"
                    className="radial-glowing-fill-circle"
                    strokeDasharray={radialCircumference}
                    strokeDashoffset={
                      selectedMonitorSession.status === "Active"
                        ? targetOffset
                        : 0
                    }
                  />
                </svg>
                <div className="radial-center-absolute-percentage-label">
                  <span className="digit-value">
                    {selectedMonitorSession.status === "Active"
                      ? `${selectedMonitorSession.chargePercentage}%`
                      : "—"}
                  </span>
                  <span className="sub-title">
                    {selectedMonitorSession.status === "Active"
                      ? "Charged"
                      : selectedMonitorSession.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="monitor-properties-specs-vertical-stack">
              <div className="monitor-spec-row-node">
                <span className="property-field-title-label">Customer</span>
                <span className="property-resolved-bold-value">
                  {selectedMonitorSession.customerName}
                </span>
              </div>
              <div className="monitor-spec-row-node">
                <span className="property-field-title-label">Vehicle</span>
                <span className="property-resolved-bold-value">
                  {selectedMonitorSession.vehicleModel}
                </span>
              </div>
              <div className="monitor-spec-row-node">
                <span className="property-field-title-label">Station</span>
                <span className="property-resolved-bold-value">
                  {selectedMonitorSession.stationName}
                </span>
              </div>
              <div className="monitor-spec-row-node">
                <span className="property-field-title-label">Charger</span>
                <span className="property-resolved-bold-value">
                  {selectedMonitorSession.bayDetails}
                </span>
              </div>
              <div className="monitor-spec-row-node">
                <span className="property-field-title-label">Start Time</span>
                <span className="property-resolved-bold-value">
                  {selectedMonitorSession.timestamp}
                </span>
              </div>
              <div className="monitor-spec-row-node">
                <span className="property-field-title-label">Duration</span>
                <span className="property-resolved-bold-value">
                  {selectedMonitorSession.durationMinutes} min
                </span>
              </div>
              <div className="monitor-spec-row-node">
                <span className="property-field-title-label">
                  Energy Dispensed
                </span>
                <span className="property-resolved-bold-value">
                  {selectedMonitorSession.energyDispensed}
                </span>
              </div>
              <div className="monitor-spec-row-node">
                <span className="property-field-title-label">Current Cost</span>
                <span
                  className="property-resolved-bold-value"
                  style={{ fontWeight: 700 }}
                >
                  ₹{selectedMonitorSession.currentCost}
                </span>
              </div>
            </div>

            <div className="monitor-panel-action-buttons-flex-row">
              {selectedMonitorSession.status === "Active" && (
                <button
                  type="button"
                  className="stop-session-danger-trigger-btn"
                >
                  Stop Session
                </button>
              )}
              <button type="button" className="contact-user-primary-steel-btn">
                Contact User
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
