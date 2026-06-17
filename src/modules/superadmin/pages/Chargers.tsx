import { useEffect, useState } from "react";
import { Search, Plus, Zap, AlertTriangle, Clock, CheckCircle2, WifiOff } from "lucide-react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { chargerService } from "../services/chargerService";
import type { LiveChargerItem, ChargerSummaryMetrics } from "../types/chargers";
import "../styles/Chargers.css";

const Chargers = () => {
  const [chargersList, setChargersList] = useState<LiveChargerItem[]>([]);
  const [metricsSummary, setMetricsSummary] = useState<ChargerSummaryMetrics | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedStatusCardFilter, setSelectedStatusCardFilter] = useState<"All" | "Available" | "Charging" | "Faulted" | "Offline">("All");

  useEffect(() => {
    chargerService.fetchChargersState().then((data) => {
      setChargersList(data.items);
      setMetricsSummary(data.summary);
    });
  }, []);

  const handleStatusCardClickToggle = (targetFilter: "Available" | "Charging" | "Faulted" | "Offline") => {
    setSelectedStatusCardFilter(prev => prev === targetFilter ? "All" : targetFilter);
  };

  const filteredItems = chargersList.filter((item) => {
    const matchesCardFilter = selectedStatusCardFilter === "All" || item.status === selectedStatusCardFilter;
    const matchesSearchQuery = 
      item.bayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.chargerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.connectorType.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCardFilter && matchesSearchQuery;
  });

  const getStatusIconSymbol = (status: string, size = 14) => {
    switch (status) {
      case "Available":
        return <CheckCircle2 size={size} />;
      case "Charging":
        return <Zap size={size} fill="currentColor" />;
      case "Faulted":
        return <AlertTriangle size={size} />;
      case "Offline":
        return <WifiOff size={size} />;
      default:
        return <CheckCircle2 size={size} />;
    }
  };

  return (
    <AdminLayout pageTitle="Chargers">
      <div className="chargers-workspace-view">
        
        {/* Header Title Controls Row */}
        <div className="chargers-master-header-row">
          <div className="chargers-title-stack">
            <h2>Charger Management</h2>
            <p>{metricsSummary?.totalAcrossNetwork || 0} chargers across all stations</p>
          </div>
          <button type="button" className="chargers-add-action-green-btn">
            <Plus size={15} strokeWidth={2.5} />
            <span>Add Charger</span>
          </button>
        </div>


        {metricsSummary && (
          <div className="chargers-metric-toggles-ribbon-row">
            <div 
              className={`charger-status-toggle-card ${selectedStatusCardFilter === "Available" ? "active-focus-green-border" : ""}`}
              onClick={() => handleStatusCardClickToggle("Available")}
            >
              <div className="card-indicator-label-line available">
                {getStatusIconSymbol("Available", 13)}
                <span>Available</span>
              </div>
              <p className="card-counter-bold-digit">{metricsSummary.availableCount}</p>
            </div>

            <div 
              className={`charger-status-toggle-card ${selectedStatusCardFilter === "Charging" ? "active-focus-green-border" : ""}`}
              onClick={() => handleStatusCardClickToggle("Charging")}
            >
              <div className="card-indicator-label-line charging">
                {getStatusIconSymbol("Charging", 13)}
                <span>Charging</span>
              </div>
              <p className="card-counter-bold-digit">{metricsSummary.chargingCount}</p>
            </div>

            <div 
              className={`charger-status-toggle-card ${selectedStatusCardFilter === "Faulted" ? "active-focus-green-border" : ""}`}
              onClick={() => handleStatusCardClickToggle("Faulted")}
            >
              <div className="card-indicator-label-line faulted">
                {getStatusIconSymbol("Faulted", 13)}
                <span>Faulted</span>
              </div>
              <p className="card-counter-bold-digit">{metricsSummary.faultedCount}</p>
            </div>

            <div 
              className={`charger-status-toggle-card ${selectedStatusCardFilter === "Offline" ? "active-focus-green-border" : ""}`}
              onClick={() => handleStatusCardClickToggle("Offline")}
            >
              <div className="card-indicator-label-line offline">
                {getStatusIconSymbol("Offline", 13)}
                <span>Offline</span>
              </div>
              <p className="card-counter-bold-digit">{metricsSummary.offlineCount}</p>
            </div>
          </div>
        )}

        {/* Spanning Search Input Control */}
        <div className="chargers-search-ribbon-row">
          <div className="chargers-search-input-frame-box">
            <Search size={15} className="chargers-lens-icon-positional" />
            <input 
              type="text" 
              className="chargers-search-control-input-field"
              placeholder="Search chargers by name or connector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* LIVE HARDWARE GRID PANEL LAYER */}
        <div className="chargers-hardware-mesh-grid-wrapper">
          {filteredItems.length === 0 ? (
            <div style={{ gridColumn: "span 3", textAlign: "center", padding: "40px", color: "var(--c-text-secondary)" }}>
              No charger gun hardware bays match specified filter addresses.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="charger-hardware-card-node">
                
                <div className="hardware-card-top-identity-line">
                  <span className="charger-code-text">{item.chargerCode}</span>
                  <span className={`hardware-card-status-pill-badge ${item.status.toLowerCase()}`}>
                    {getStatusIconSymbol(item.status, 11)}
                    <span>{item.status}</span>
                  </span>
                </div>

                <h3>{item.bayName}</h3>

                <div className="hardware-card-core-specs-row">
                  <div className="hardware-card-icon-frame-shield">
                    <Zap size={16} fill={item.status === "Charging" ? "currentColor" : "none"} />
                  </div>
                  <div className="hardware-card-specs-meta-stack">
                    <span className="power-bold-output-label">{item.powerOutput}</span>
                    <span className={`connector-token-badge ${item.connectorType.toLowerCase().replace(" ", "")}`}>
                      {item.connectorType}
                    </span>
                  </div>
                </div>

                {item.status === "Charging" && item.activeSessionPercentage ? (
                  <div className="hardware-card-progress-bar-track-wrapper">
                    <div className="hardware-card-sessions-timestamp-line">
                      <span>Active session</span>
                      <span style={{ fontWeight: 600, color: "var(--c-text-primary)" }}>{item.activeSessionPercentage}%</span>
                    </div>
                    <div className="hardware-card-progress-bar-track">
                      <div className="hardware-card-progress-bar-fill" style={{ width: `${item.activeSessionPercentage}%` }}></div>
                    </div>
                  </div>
                ) : (
                  <div className="hardware-card-sessions-timestamp-line">
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Clock size={13} /> {item.timeText}
                    </span>
                    <span>{item.totalSessionsCount} sessions total</span>
                  </div>
                )}

                {item.errorMessageBanner && (
                  <div className="hardware-card-critical-error-banner-bubble">
                    <AlertTriangle size={14} />
                    <span>{item.errorMessageBanner}</span>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

      </div>
    </AdminLayout>
  );
};

export default Chargers;