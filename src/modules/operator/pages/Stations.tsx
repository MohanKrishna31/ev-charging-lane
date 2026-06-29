import React, { useMemo, useState } from "react";
import type { Station } from "../types/stations";
import { stations as stationsData } from "../services/stations";
import  OperatorLayout  from "../../../layouts/OperatorLayout/OperatorLayout";

import "../Styles/Stations.css";

import type { LucideIcon } from "lucide-react";

import {
  Eye,
  MapPin,
  Pencil,
  Power,
  Search,
  Check,
  Wifi,
  Zap,
  WifiOff,
  Wrench,
} from "lucide-react";





// ----------------------------------------------------------------------
// Helper Components
// ----------------------------------------------------------------------

interface StationStatusProps { 
  status: Station["status"]; 
}

const statusIcons: Record<Station["status"], LucideIcon> = {
  Available: Wifi,
  Charging: Zap,
  Offline: WifiOff,
  Maintenance: Wrench,
};

/**
 * StationStatus Component
 * Displays the current operational status of the station with an appropriate icon.
 */
const StationStatus: React.FC<StationStatusProps> = ({ status }) => {
  const Icon = statusIcons[status];
  const iconStyle = { marginRight: 6, flexShrink: 0 } as const;

  return (
    <span className={`station-status ${status.toLowerCase()}`}>
      <Icon
        size={14}
        strokeWidth={2.5}
        style={iconStyle}
        fill={status === "Charging" ? "currentColor" : "none"}
      />
      {status}
    </span>
  );
};

// ----------------------------------------------------------------------
// Modal Components (Add / Edit / Detail)
// ----------------------------------------------------------------------

const AMENITIES_LIST = [
  "Restrooms",
  "Café",
  "WiFi",
  "Covered Parking",
  "Security",
  "Waiting Area",
  "Convenience Store",
];

const VENDORS_LIST = [
  "GreenCharge India",
  "ChargePoint Networks",
  "EcoVolt Solutions",
];

const STATES_LIST = [
  "Maharashtra",
  "Karnataka",
  "Delhi",
  "Gujarat",
  "Tamil Nadu",
];

interface AddStationProps {
  onClose: () => void;
  onAdd: (station: Omit<Station, "id">) => void;
}

/**
 * AddStation Component
 * Form to add a new station to the network.
 */
const AddStation: React.FC<AddStationProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    contactNumber: "",
    workingHours: "",
    vendor: "GreenCharge India",
    state: "Maharashtra",
    address: "",
    latitude: "19.0596",
    longitude: "72.8656",
    amenities: [] as string[],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => {
      const isSelected = prev.amenities.includes(amenity);
      const updated = isSelected
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      location: formData.address || "Unknown Location",
      vendor: formData.vendor,
      chargers: { total: 6, available: 6, busy: 0, offline: 0 },
      utilization: 0,
      status: "Available",
      code: formData.code,
      contactNumber: formData.contactNumber,
      workingHours: formData.workingHours,
      state: formData.state,
      address: formData.address,
      latitude: parseFloat(formData.latitude) || 19.0596,
      longitude: parseFloat(formData.longitude) || 72.8656,
      amenities: formData.amenities,
    });
  };

  return (
    <div className="station-form-page-container">
      {/* Breadcrumbs Navigation */}
      <div className="stations-breadcrumbs-container">
        <div className="stations-breadcrumbs">
          <span className="breadcrumb-link" onClick={onClose}>
            Stations
          </span>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-active">Add New Station</span>
        </div>
      </div>

      {/* Main card with Station Details */}
      <div className="station-details-card">
        <div className="station-details-card-header">
          <h2>Station Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="station-details-form">
          <div className="form-grid-2col">
            <div className="form-group-new">
              <label htmlFor="name">Station Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., BKC EV Plaza"
                required
              />
            </div>
            <div className="form-group-new">
              <label htmlFor="code">Station Code</label>
              <input
                id="code"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g., STN009"
              />
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group-new">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                id="contactNumber"
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="form-group-new">
              <label htmlFor="workingHours">Working Hours</label>
              <input
                id="workingHours"
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                placeholder="06:00 AM - 11:00 PM"
              />
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group-new">
              <label htmlFor="vendor">Vendor</label>
              <select
                id="vendor"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
              >
                {VENDORS_LIST.map((vendor) => (
                  <option key={vendor} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group-new">
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                {STATES_LIST.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group-new full-width">
            <label htmlFor="address">Full Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street, area, city, pin"
              rows={3}
              required
            />
          </div>

          <div className="form-grid-2col">
            <div className="form-group-new">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="19.0596"
              />
            </div>
            <div className="form-group-new">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="72.8656"
              />
            </div>
          </div>

          <div className="form-group-new full-width">
            <label>Pin Location on Map</label>
            <div className="map-placeholder-card">
              <div className="map-grid-bg" />
              <div className="map-pin-container">
                <MapPin className="map-pin-icon" strokeWidth={2} />
                <div className="map-pin-title">Interactive map integration</div>
                <div className="map-pin-coords">
                  Lat: {formData.latitude || "19.0596"}, Lng:{" "}
                  {formData.longitude || "72.8656"}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group-new full-width">
            <label>Amenities</label>
            <div className="amenities-container">
              {AMENITIES_LIST.map((amenity) => {
                const isChecked = formData.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    className={`amenity-chip-btn ${isChecked ? "checked" : ""}`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    <span className="amenity-checkbox-box">
                      {isChecked && <Check strokeWidth={3} />}
                    </span>
                    <span className="amenity-label-text">{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-actions-new">
            <button type="button" className="btn-cancel-new" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-create-new">
              Create Station
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EditStationProps {
  station: Station;
  onClose: () => void;
  onSave: (station: Station) => void;
}

/**
 * EditStation Component
 * Form to modify details of an existing station.
 */
const EditStation: React.FC<EditStationProps> = ({
  station,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Station>(station);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("chargers.")) {
      const chargerKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        chargers: {
          ...prev.chargers,
          [chargerKey]: parseInt(value, 10) || 0,
        },
      }));
    } else if (name === "utilization") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Station</h2>
          <button className="modal-close" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Station Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter station name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vendor">Vendor *</label>
            <input
              id="vendor"
              type="text"
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              placeholder="Enter vendor name"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="chargers-total">Total Chargers *</label>
              <input
                id="chargers-total"
                type="number"
                name="chargers.total"
                value={formData.chargers.total}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="chargers-available">Available</label>
              <input
                id="chargers-available"
                type="number"
                name="chargers.available"
                value={formData.chargers.available}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="chargers-busy">Busy</label>
              <input
                id="chargers-busy"
                type="number"
                name="chargers.busy"
                value={formData.chargers.busy}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="chargers-offline">Offline</label>
              <input
                id="chargers-offline"
                type="number"
                name="chargers.offline"
                value={formData.chargers.offline}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="utilization">Utilization %</label>
              <input
                id="utilization"
                type="number"
                name="utilization"
                value={formData.utilization}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Available">Available</option>
                <option value="Charging">Charging</option>
                <option value="Offline">Offline</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface StationDetailProps {
  station: Station;
  onClose: () => void;
}

/**
 * StationDetail Component
 * Modal dialog to view detailed station telemetry and information.
 */
const StationDetail: React.FC<StationDetailProps> = ({ station, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content modal-detail"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Station Details</h2>
          <button className="modal-close" onClick={onClose} type="button">
            ✕
          </button>
        </div>
        <div className="station-detail-content">
          <div className="detail-section">
            <h3 className="detail-title">Basic Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Station Name</span>
                <span className="detail-value">{station.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location</span>
                <span className="detail-value">{station.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Vendor</span>
                <span className="detail-value">{station.vendor}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className="detail-value">
                  <StationStatus status={station.status} />
                </span>
              </div>
            </div>
          </div>
          <div className="detail-section">
            <h3 className="detail-title">Charger Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Total Chargers</span>
                <span className="detail-value">{station.chargers.total}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Available</span>
                <span className="detail-value text-success">
                  {station.chargers.available}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Busy</span>
                <span className="detail-value text-info">
                  {station.chargers.busy}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Offline</span>
                <span className="detail-value text-danger">
                  {station.chargers.offline}
                </span>
              </div>
            </div>
            <div className="detail-chart">
              <div className="chart-title">Utilization</div>
              <div className="utilization-bar large">
                <div
                  className="utilization-fill"
                  style={{ width: `${station.utilization}%` }}
                />
              </div>
              <div className="utilization-text">{station.utilization}%</div>
            </div>
          </div>
          <div className="detail-section">
            <h3 className="detail-title">Summary</h3>
            <div className="summary-stats">
              <div className="stat-box">
                <div className="stat-value">{station.chargers.available}</div>
                <div className="stat-label">Ready to Use</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{station.chargers.busy}</div>
                <div className="stat-label">Currently Charging</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{station.chargers.offline}</div>
                <div className="stat-label">Not Available</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{station.utilization}%</div>
                <div className="stat-label">Utilization Rate</div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Main Dashboard Component
// ----------------------------------------------------------------------

/**
 * Stations Component
 * The main dashboard page for managing all charging stations.
 */
const Stations: React.FC = () => {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [stations, setStations] = useState<Station[]>(stationsData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [detailStation, setDetailStation] = useState<Station | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Station["status"] | "">(
    "",
  );

  const filteredStations = useMemo(
    () =>
      stations.filter((station) => {
        const query = search.toLowerCase();
        const matchesSearch =
          !query ||
          station.name.toLowerCase().includes(query) ||
          station.location.toLowerCase().includes(query) ||
          station.vendor.toLowerCase().includes(query) ||
          station.status.toLowerCase().includes(query);
        const matchesStatus = selectedStatus
          ? station.status === selectedStatus
          : true;
        return matchesSearch && matchesStatus;
      }),
    [search, stations, selectedStatus],
  );

  const summary = useMemo(
    () => ({
      available: stations.filter((station) => station.status === "Available")
        .length,
      charging: stations.filter((station) => station.status === "Charging")
        .length,
      offline: stations.filter((station) => station.status === "Offline")
        .length,
      maintenance: stations.filter(
        (station) => station.status === "Maintenance",
      ).length,
    }),
    [stations],
  );

  // Render the add station overlay if opened
  if (showAddModal) {
    return (
      <OperatorLayout pageTitle="Stations Dashboard">
        <div className="stations-page">
          <AddStation
            onClose={() => setShowAddModal(false)}
            onAdd={(newStation) => {
              const id = `ST${String(stations.length + 1).padStart(3, "0")}`;
              setStations([...stations, { id, ...newStation }]);
              setShowAddModal(false);
            }}
          />
        </div>
      </OperatorLayout>
    );
  }

  return (
    <OperatorLayout pageTitle="Stations">
      <div className="stations-page">
        {/* Header Section */}
        <div className="stations-header">
          <div className="stations-heading">
            <h1 className="stations-title">Station Management</h1>
            <p className="stations-subtitle">
              {stations.length} stations across the network
            </p>
          </div>

          <div className="stations-actions">
            <button
              className="add-station-btn"
              type="button"
              onClick={() => setShowAddModal(true)}
            >
              <span className="btn-plus">+</span>
              <span className="btn-text">
                <span>Add</span>
                <span>Station</span>
              </span>
            </button>
          </div>
        </div>

        {/* Summary KPI Cards */}
        <div className="station-summary-grid">
          <div
            className={`station-summary-card available ${selectedStatus === "Available" ? "selected" : ""}`}
            onClick={() =>
              setSelectedStatus((prev) =>
                prev === "Available" ? "" : "Available",
              )
            }
          >
            <div className="station-summary-label">
              <span className="summary-dot" /> Available
            </div>
            <div className="station-summary-count">{summary.available}</div>
          </div>
          <div
            className={`station-summary-card charging ${selectedStatus === "Charging" ? "selected" : ""}`}
            onClick={() =>
              setSelectedStatus((prev) =>
                prev === "Charging" ? "" : "Charging",
              )
            }
          >
            <div className="station-summary-label">
              <span className="summary-dot" /> Charging
            </div>
            <div className="station-summary-count">{summary.charging}</div>
          </div>
          <div
            className={`station-summary-card offline ${selectedStatus === "Offline" ? "selected" : ""}`}
            onClick={() =>
              setSelectedStatus((prev) => (prev === "Offline" ? "" : "Offline"))
            }
          >
            <div className="station-summary-label">
              <span className="summary-dot" /> Offline
            </div>
            <div className="station-summary-count">{summary.offline}</div>
          </div>
          <div
            className={`station-summary-card maintenance ${selectedStatus === "Maintenance" ? "selected" : ""}`}
            onClick={() =>
              setSelectedStatus((prev) =>
                prev === "Maintenance" ? "" : "Maintenance",
              )
            }
          >
            <div className="station-summary-label">
              <span className="summary-dot" /> Maintenance
            </div>
            <div className="station-summary-count">{summary.maintenance}</div>
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className="stations-toolbar">
          <div className="stations-search">
            <Search size={18} strokeWidth={2} />
            <input
              type="search"
              placeholder="Search stations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="view-toggle">
            <button
              type="button"
              className={viewMode === "table" ? "active" : ""}
              onClick={() => setViewMode("table")}
            >
              Table
            </button>
            <button
              type="button"
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </button>
          </div>
        </div>

        {/* Main Content Area (Table or Grid View) */}
        {viewMode === "table" ? (
          <div className="station-table-card">
            <table className="station-table">
              <thead>
                <tr>
                  <th>Station</th>
                  <th>Vendor</th>
                  <th>Chargers</th>
                  <th>Utilization</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStations.map((station) => (
                  <tr key={station.id}>
                    <td>
                      <div className="station-title-with-dot">
                        <span
                          className={`status-dot-indicator ${station.status.toLowerCase()}`}
                        />
                        <div className="station-name">
                          <span className="station-title">{station.name}</span>
                          <span className="station-location">
                            <MapPin
                              size={11}
                              strokeWidth={2.5}
                              style={{
                                marginRight: 4,
                                display: "inline-block",
                                verticalAlign: "middle",
                              }}
                            />
                            {station.location}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="station-vendor">{station.vendor}</span>
                    </td>
                    <td>
                      <div className="station-chargers">
                        <strong className="chargers-total-count">
                          {station.chargers.total} total
                        </strong>
                        <div className="chargers-summary-colored">
                          <span className="avail-count">
                            {station.chargers.available} avail
                          </span>
                          <span className="busy-count">
                            {station.chargers.busy} busy
                          </span>
                          {station.chargers.offline > 0 && (
                            <span className="offline-count">
                              {station.chargers.offline} offline
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="station-utilization-row">
                        <div className="utilization-bar-wrapper">
                          <div className="utilization-bar">
                            <div
                              className={`utilization-fill ${station.status.toLowerCase()}`}
                              style={{ width: `${station.utilization}%` }}
                            />
                          </div>
                        </div>
                        <span className="utilization-percent">
                          {station.utilization}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <StationStatus status={station.status} />
                    </td>
                    <td>
                      <div className="station-action-icons-row">
                        <button
                          className="action-icon-btn eye-btn"
                          type="button"
                          title="View"
                          onClick={() => setDetailStation(station)}
                        >
                          <Eye size={18} strokeWidth={2} />
                        </button>
                        <button
                          className="action-icon-btn edit-btn"
                          type="button"
                          title="Edit"
                          onClick={() => setEditingStation(station)}
                        >
                          <Pencil size={18} strokeWidth={2} />
                        </button>
                        <button
                          className="action-icon-btn power-btn"
                          type="button"
                          title="Disable"
                        >
                          <Power size={18} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="station-grid">
            {filteredStations.map((station) => (
              <div className="station-card" key={station.id}>
                <div className="station-card-top">
                  <div className="station-card-id-row">
                    <span
                      className={`status-dot-indicator ${station.status.toLowerCase()}`}
                    />
                    <span className="station-card-id">
                      {station.id.replace("ST0", "STN00")}
                    </span>
                  </div>
                  <StationStatus status={station.status} />
                </div>
                <h3 className="station-card-name">{station.name}</h3>
                <p className="station-card-location">
                  <MapPin size={12} strokeWidth={2} />
                  {station.location}
                </p>
                <p className="station-card-vendor">{station.vendor}</p>
                <div className="station-card-stats">
                  <div className="stat-col">
                    <span className="stat-col-value avail">
                      {station.chargers.available}
                    </span>
                    <span className="stat-col-label">Available</span>
                  </div>
                  <div className="stat-col">
                    <span className="stat-col-value charging">
                      {station.chargers.busy}
                    </span>
                    <span className="stat-col-label">Charging</span>
                  </div>
                  <div className="stat-col">
                    <span className="stat-col-value offline">
                      {station.chargers.offline}
                    </span>
                    <span className="stat-col-label">Offline</span>
                  </div>
                </div>
                <div className="station-card-utilization">
                  <div className="card-util-bar">
                    <div
                      className={`card-util-fill ${station.status.toLowerCase()}`}
                      style={{ width: `${station.utilization}%` }}
                    />
                  </div>
                  <span className="card-util-percent">
                    {station.utilization}% busy
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Render Edit/Detail Overlays */}
        {editingStation && (
          <EditStation
            station={editingStation}
            onClose={() => setEditingStation(null)}
            onSave={(updatedStation) => {
              setStations(
                stations.map((s) =>
                  s.id === updatedStation.id ? updatedStation : s,
                ),
              );
              setEditingStation(null);
            }}
          />
        )}

        {detailStation && (
          <StationDetail
            station={detailStation}
            onClose={() => setDetailStation(null)}
          />
        )}
      </div>
    </OperatorLayout>
  );
};

export default Stations;
