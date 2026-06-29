import React, { useState, useMemo } from "react";
import type { Charger } from "../types/chargers";
import { chargers as chargersData } from "../services/chargers";
import  OperatorLayout  from "../../../layouts/OperatorLayout/OperatorLayout";
import "../Styles/Chargers.css";

import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Check,
  CheckCircle,
  CircleX,
  Clock,
  Search,
  WifiOff,
  Zap,
} from "lucide-react";




const badgeIconProps = { size: 12, strokeWidth: 2.5 } as const;

const statusIcons: Record<Charger["status"], LucideIcon> = {
  Available: CheckCircle,
  Charging: Zap,
  Faulted: AlertTriangle,
  Offline: CircleX,
};

// ----------------------------------------------------------------------
// Main Dashboard Component
// ----------------------------------------------------------------------

/**
 * Chargers Component
 * Displays a dashboard of all chargers with their statuses, power ratings, and session progress.
 */
const Chargers: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Charger["status"] | "">(
    "",
  );
  const [chargersList] = useState<Charger[]>(chargersData);

  // Calculate the summary counts based on the current chargers list
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

  // Filter the chargers based on search input and selected status
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

  // Helper to dynamically render the correct status icon component
  const getStatusIcon = (status: Charger["status"]) => {
    const Icon = statusIcons[status];
    return <Icon {...badgeIconProps} />;
  };

  return (
    <OperatorLayout pageTitle="Chargers">
      <div className="chargers-page">
        {/* Header Section */}
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

        {/* Summary KPI Cards */}
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
              <span className="summary-label-icon available">
                <Check {...badgeIconProps} />
              </span>
              Available
            </div>
            <div className="charger-summary-count">{summary.available}</div>
          </div>
          <div
            className={`charger-summary-card charging ${selectedStatus === "Charging" ? "selected" : ""}`}
            onClick={() =>
              setSelectedStatus((prev) =>
                prev === "Charging" ? "" : "Charging",
              )
            }
          >
            <div className="charger-summary-label">
              <span className="summary-label-icon charging">
                <Zap {...badgeIconProps} />
              </span>
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
              <span className="summary-label-icon faulted">
                <AlertTriangle {...badgeIconProps} />
              </span>
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
              <span className="summary-label-icon offline">
                <WifiOff size={12} strokeWidth={2.25} />
              </span>
              Offline
            </div>
            <div className="charger-summary-count">{summary.offline}</div>
          </div>
        </div>

        {/* Toolbar & Search */}
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

        {/* Main Content Area */}
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

              {/* Display Active Session Progress for Charging Chargers */}
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

              {/* Display Error Message for Faulted Chargers */}
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
    </OperatorLayout>
  );
};

export default Chargers;
