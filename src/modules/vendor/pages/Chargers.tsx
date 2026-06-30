import React, { useState, useMemo } from "react";
import type { Charger } from "../types/chargers";
import {
  AlertTriangle,
  XCircle,
  Clock,
  Search,
  WifiOff,
  Wifi,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { chargerService } from "../services/chargers";
import "../styles/Chargers.css";

const badgeIconProps = { size: 12, strokeWidth: 2.5 } as const;

const statusIcons: Record<Charger["status"], LucideIcon> = {
  Available: Wifi,
  Charging: Zap,
  Faulted: AlertTriangle,
  Offline: XCircle,
};

const Chargers: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Charger["status"] | "">(
    "",
  );
  const [chargersList] = useState<Charger[]>(() => chargerService.getChargers());

  const summary = useMemo(() => {
    return chargersList.reduce(
      (acc, charger) => {
        if (charger.status === "Available") acc.available += 1;
        else if (charger.status === "Charging") acc.charging += 1;
        else if (charger.status === "Faulted") acc.faulted += 1;
        else if (charger.status === "Offline") acc.offline += 1;
        return acc;
      },
      { available: 0, charging: 0, faulted: 0, offline: 0 },
    );
  }, [chargersList]);

  const filteredChargers = useMemo(() => {
    const q = search.toLowerCase();
    return chargersList.filter((charger) => {
      const matchesSearch =
        charger.id.toLowerCase().includes(q) ||
        charger.name.toLowerCase().includes(q) ||
        charger.connectorType.toLowerCase().includes(q);
      const matchesStatus = selectedStatus
        ? charger.status === selectedStatus
        : true;
      return matchesSearch && matchesStatus;
    });
  }, [chargersList, search, selectedStatus]);

  const getStatusIcon = (status: Charger["status"]) => {
    const Icon = statusIcons[status];
    return <Icon {...badgeIconProps} />;
  };

  return (
    <div className="chargers-page">
      <div className="chargers-header">
        <div className="chargers-heading">
          <h1 className="chargers-title">Charger Management</h1>
          <p className="chargers-subtitle">
            {chargersList.length} chargers across all stations
          </p>
        </div>
        <div className="chargers-actions">
          <button className="add-charger-btn" type="button">
            <span className="btn-plus">+</span>
            <span className="btn-text">
              <span>Add</span>
              <span>Charger</span>
            </span>
          </button>
        </div>
      </div>

      <div className="charger-summary-grid">
        <div
          className={`charger-summary-card available ${selectedStatus === "Available" ? "selected" : ""}`}
          onClick={() =>
            setSelectedStatus((prev) =>
              prev === "Available" ? "" : "Available",
            )
          }
        >
          <div className="charger-summary-label">
            <Wifi {...badgeIconProps} />
            Available
          </div>
          <div className="charger-summary-count">{summary.available}</div>
        </div>
        <div
          className={`charger-summary-card charging ${selectedStatus === "Charging" ? "selected" : ""}`}
          onClick={() =>
            setSelectedStatus((prev) => (prev === "Charging" ? "" : "Charging"))
          }
        >
          <div className="charger-summary-label">
            <Zap {...badgeIconProps} />
            Charging
          </div>
          <div className="charger-summary-count">{summary.charging}</div>
        </div>
        <div
          className={`charger-summary-card faulted ${selectedStatus === "Faulted" ? "selected" : ""}`}
          onClick={() =>
            setSelectedStatus((prev) => (prev === "Faulted" ? "" : "Faulted"))
          }
        >
          <div className="charger-summary-label">
            <AlertTriangle {...badgeIconProps} />
            Faulted
          </div>
          <div className="charger-summary-count">{summary.faulted}</div>
        </div>
        <div
          className={`charger-summary-card offline ${selectedStatus === "Offline" ? "selected" : ""}`}
          onClick={() =>
            setSelectedStatus((prev) => (prev === "Offline" ? "" : "Offline"))
          }
        >
          <div className="charger-summary-label">
            <WifiOff size={12} strokeWidth={2.25} />
            Offline
          </div>
          <div className="charger-summary-count">{summary.offline}</div>
        </div>
      </div>

      <div className="chargers-toolbar">
        <div className="chargers-search">
          <Search size={18} strokeWidth={2} />
          <input
            type="search"
            placeholder="Search chargers by name or connector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="charger-grid">
        {filteredChargers.map((charger) => (
          <div className="charger-card" key={charger.id}>
            <div className="charger-card-top">
              <div className="charger-card-id-row">
                <span className="charger-card-id">{charger.id}</span>
              </div>
              <span
                className={`charger-card-status-badge ${charger.status.toLowerCase()}`}
              >
                {getStatusIcon(charger.status)}
                {charger.status}
              </span>
            </div>

            <h3 className="charger-card-name">{charger.name}</h3>

            <div className="charger-card-spec">
              <div
                className={`spec-icon-circle ${charger.status === "Charging" ? "charging-active" : ""}`}
              >
                <Zap size={16} strokeWidth={2} />
              </div>
              <span className="spec-power">{charger.power} kW</span>
              <span
                className={`spec-connector ${charger.connectorType.toLowerCase().replace(" ", "-")}`}
              >
                {charger.connectorType}
              </span>
            </div>

            {charger.status === "Charging" &&
              typeof charger.activeSessionProgress === "number" && (
                <div className="charger-active-session">
                  <span className="active-session-label">Active session</span>
                  <div className="active-session-progress-row">
                    <div className="active-session-progress-bar">
                      <div
                        className="active-session-progress-fill"
                        style={{ width: `${charger.activeSessionProgress}%` }}
                      />
                    </div>
                    <span className="active-session-progress-percent">
                      {charger.activeSessionProgress}%
                    </span>
                  </div>
                </div>
              )}

            {charger.status === "Faulted" && charger.error && (
              <div className="charger-card-warning">
                <div className="warning-icon">
                  <AlertTriangle {...badgeIconProps} />
                </div>
                <span className="warning-text">{charger.error}</span>
              </div>
            )}

            <div className="charger-card-footer">
              <span className="footer-last-used">
                <Clock {...badgeIconProps} />
                {charger.lastUsed}
              </span>
              <span className="footer-sessions">
                {charger.totalSessions} sessions total
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chargers;
