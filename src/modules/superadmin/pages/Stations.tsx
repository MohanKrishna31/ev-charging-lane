import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Plus, Eye, Edit2, Power, MapPin, CheckCircle2, Zap, WifiOff, Wrench } from "lucide-react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { stationService } from "../services/stationService";
import type { StationListItem, StationSummaryMetrics, NewStationFormState } from "../types/stations";
import "../styles/Stations.css";

const InitialStationFormPayload: NewStationFormState = {
  stationName: "", stationCode: "", contactNumber: "", workingHours: "", vendor: "GreenCharge India", 
  state: "Maharashtra", fullAddress: "", latitude: "19.0596", longitude: "72.8656", amenities: []
};

const Stations = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [stationsList, setStationsList] = useState<StationListItem[]>([]);
  const [metricsSummary, setMetricsSummary] = useState<StationSummaryMetrics | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [layoutToggleMode, setLayoutToggleMode] = useState<"Table" | "Grid">("Table");
  const [formState, setFormState] = useState<NewStationFormState>(InitialStationFormPayload);

  const [selectedStatusCardFilter, setSelectedStatusCardFilter] = useState<"All" | "Available" | "Charging" | "Offline" | "Maintenance">("All");

  const isCreateStationRoute = location.pathname.includes("stations/add");

  useEffect(() => {
    stationService.fetchStationsState().then((data) => {
      setStationsList(data.items);
      setMetricsSummary(data.summary);
    });
  }, []);

  const handleFieldMutation = (key: keyof NewStationFormState, val: string) => {
    setFormState(prev => ({ ...prev, [key]: val }));
  };

  const handleAmenitiesCheckboxToggle = (amenityName: string) => {
    setFormState(prev => {
      const isAlreadyChecked = prev.amenities.includes(amenityName);
      const updatedList = isAlreadyChecked 
        ? prev.amenities.filter(item => item !== amenityName)
        : [...prev.amenities, amenityName];
      return { ...prev, amenities: updatedList };
    });
  };

  const executeFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Transmitting finalized station entry package payload mapping to backend API:", formState);

    const simulatedRecord: StationListItem = {
      id: formState.stationCode || `STN00${stationsList.length + 1}`,
      stationCode: formState.stationCode || `STN00${stationsList.length + 1}`,
      name: formState.stationName || "Simulated EV Charging Plaza",
      location: formState.fullAddress || "BKC, Mumbai",
      vendor: formState.vendor,
      chargers: { total: 4, available: 4, busy: 0, offline: 0 },
      utilizationPercentage: 0,
      status: "Available"
    };

    setStationsList(prev => [simulatedRecord, ...prev]);
    setFormState(InitialStationFormPayload);
    navigate("/admin/stations");
  };

  const handleStatusCardClickToggle = (targetFilter: "Available" | "Charging" | "Offline" | "Maintenance") => {
    setSelectedStatusCardFilter(prev => prev === targetFilter ? "All" : targetFilter);
  };

  const filteredItems = stationsList.filter((station) => {
    const matchesCardFilter = selectedStatusCardFilter === "All" || station.status === selectedStatusCardFilter;
    const matchesSearchText = 
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCardFilter && matchesSearchText;
  });

  const getStatusIconSymbol = (status: string, size = 14) => {
    switch (status) {
      case "Available":
        return <CheckCircle2 size={size} />;
      case "Charging":
        return <Zap size={size} fill="currentColor" />;
      case "Offline":
        return <WifiOff size={size} />; 
      case "Maintenance":
        return <Wrench size={size} />;
      default:
        return <CheckCircle2 size={size} />;
    }
  };

  const targetAmenitiesList = [
    "Restrooms", "Café", "WiFi", "Covered Parking", "Security", "Waiting Area", "Convenience Store"
  ];

  return (
    <AdminLayout pageTitle="Stations">
      <div className="stations-workspace-view">
        

        <div className="stations-master-action-header-row">
          <div className="stations-headline-title-stack">
            {!isCreateStationRoute ? (
              <>
                <h2>Station Management</h2>
                <p>{metricsSummary?.totalAcrossNetwork || 0} stations across the network</p>
              </>
            ) : (
              <>
                <h2>Add New Station</h2>
                <div className="vendors-wizards-breadcrumb-navigation">
                  <span className="vendors-breadcrumb-link" onClick={() => navigate("/admin/stations")}>Stations</span>
                  <span>&rarr;</span>
                  <span>Add New Station</span>
                </div>
              </>
            )}
          </div>

          {!isCreateStationRoute && (
            <button 
              type="button" 
              className="stations-primary-trigger-green-btn"
              onClick={() => navigate("/admin/stations/add")}
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Add Station</span>
            </button>
          )}
        </div>


        {!isCreateStationRoute ? (
          <>

            {metricsSummary && (
              <div className="stations-metric-summary-ribbon-grid">
                <div 
                  className={`station-summary-status-card ${selectedStatusCardFilter === "Available" ? "active-focus-border" : ""}`}
                  onClick={() => handleStatusCardClickToggle("Available")}
                >
                  <div className="status-indicator-title-line available">
                    {getStatusIconSymbol("Available", 13)}
                    <span>Available</span>
                  </div>
                  <p className="summary-counter-value">{metricsSummary.availableCount}</p>
                </div>

                <div 
                  className={`station-summary-status-card ${selectedStatusCardFilter === "Charging" ? "active-focus-border" : ""}`}
                  onClick={() => handleStatusCardClickToggle("Charging")}
                >
                  <div className="status-indicator-title-line charging">
                    {getStatusIconSymbol("Charging", 13)}
                    <span>Charging</span>
                  </div>
                  <p className="summary-counter-value">{metricsSummary.chargingCount}</p>
                </div>

                <div 
                  className={`station-summary-status-card ${selectedStatusCardFilter === "Offline" ? "active-focus-border" : ""}`}
                  onClick={() => handleStatusCardClickToggle("Offline")}
                >
                  <div className="status-indicator-title-line offline">
                    {getStatusIconSymbol("Offline", 13)}
                    <span>Offline</span>
                  </div>
                  <p className="summary-counter-value">{metricsSummary.offlineCount}</p>
                </div>

                <div 
                  className={`station-summary-status-card ${selectedStatusCardFilter === "Maintenance" ? "active-focus-border" : ""}`}
                  onClick={() => handleStatusCardClickToggle("Maintenance")}
                >
                  <div className="status-indicator-title-line maintenance">
                    {getStatusIconSymbol("Maintenance", 13)}
                    <span>Maintenance</span>
                  </div>
                  <p className="summary-counter-value">{metricsSummary.maintenanceCount}</p>
                </div>
              </div>
            )}


            <div className="stations-filtering-controls-wrapper-bar">
              <div className="stations-input-search-lens-box-frame">
                <Search size={15} className="stations-lens-icon-positional" />
                <input 
                  type="text" 
                  className="stations-search-control-text-field"
                  placeholder={selectedStatusCardFilter === "All" ? "Search stations..." : `Search ${selectedStatusCardFilter.toLowerCase()} stations...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="stations-layout-view-toggle-tabs-box">
                <button type="button" className={`stations-view-toggle-pill-btn ${layoutToggleMode === "Table" ? "active" : ""}`} onClick={() => setLayoutToggleMode("Table")}>Table</button>
                <button type="button" className={`stations-view-toggle-pill-btn ${layoutToggleMode === "Grid" ? "active" : ""}`} onClick={() => setLayoutToggleMode("Grid")}>Grid</button>
              </div>
            </div>


            {layoutToggleMode === "Table" ? (
              <div className="stations-tabular-index-scroller no-scrollbar">
                <table className="stations-master-html-table">
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
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "var(--s-text-secondary)" }}>
                          No stations match selected filtering conditions.
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((station) => (
                        <tr key={station.id}>
                          <td>
                            <div className="station-table-identity-block">
                              <span className={`station-table-dot-bullet-indicator ${station.status.toLowerCase()}`}></span>
                              <div className="vendor-meta-stacked-lines">
                                <span className="vendor-table-primary-headline-text">{station.name}</span>
                                <span className="vendor-table-secondary-subtext-line">{station.location}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="vendor-table-primary-headline-text" style={{ fontWeight: 500 }}>{station.vendor}</span>
                          </td>
                          <td>
                            <div className="vendor-meta-stacked-lines">
                              <span className="vendor-table-primary-headline-text">{station.chargers.total} total</span>
                              <div className="station-inline-chargers-breakdown-row">
                                <span className="avail">{station.chargers.available} avail</span>
                                <span className="busy">{station.chargers.busy} busy</span>
                                {station.chargers.offline > 0 && <span className="offln">{station.chargers.offline} offline</span>}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="station-table-utilization-bar-cell-container">
                              <div className="station-micro-linear-progress-bar-track">
                                <div className="station-micro-linear-progress-bar-fill-indicator" style={{ width: `${station.utilizationPercentage}%` }}></div>
                              </div>
                              <span className="vendor-table-secondary-subtext-line" style={{ fontWeight: 600 }}>{station.utilizationPercentage}%</span>
                            </div>
                          </td>
                          <td>
                            <span className={`station-table-semantic-pill-status-box ${station.status.toLowerCase()}`}>
                              {getStatusIconSymbol(station.status, 11)}
                              <span style={{ marginLeft: "6px" }}>{station.status}</span>
                            </span>
                          </td>
                          <td>
                            <div className="vendor-row-actions-group-cell">
                              <button type="button" className="vendor-row-action-icon-trigger-btn edit" aria-label="Open Map Trace Detail View"><Eye size={14} /></button>
                              <button type="button" className="vendor-row-action-icon-trigger-btn edit" aria-label="Edit Properties"><Edit2 size={14} /></button>
                              <button type="button" className="vendor-row-action-icon-trigger-btn suspend" aria-label="Toggle Power Lifecycle"><Power size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="stations-operational-mesh-grid-wrapper">
                {filteredItems.length === 0 ? (
                  <div style={{ gridColumn: "span 3", textAlign: "center", padding: "32px", color: "var(--s-text-secondary)" }}>
                    No stations match selected filtering conditions.
                  </div>
                ) : (
                  filteredItems.map((station) => (
                    <div key={station.id} className="station-grid-card-item-box">
                      <div className="station-grid-card-header-line">
                        <span className={`station-code-pill-tag ${station.status.toLowerCase()}`}>
                          <span className="grid-header-micro-dot">●</span>
                          <span>{station.stationCode}</span>
                        </span>
                        <span className={`station-grid-status-txt ${station.status.toLowerCase()}`}>{station.status}</span>
                      </div>
                      <h3>{station.name}</h3>
                      <p className="grid-card-location-subtext">{station.location}</p>
                      <p className="grid-card-vendor-label-title">Vendor: <span>{station.vendor}</span></p>
                      
                      <div className="station-grid-card-counters-flex-row">
                        <div className="counter-block-node">
                          <span className="digit-bold" style={{ color: "#24cb71" }}>{station.chargers.available}</span>
                          <span className="label-sub">Available</span>
                        </div>
                        <div className="counter-block-node">
                          <span className="digit-bold" style={{ color: "#00b0ff" }}>{station.chargers.busy}</span>
                          <span className="label-sub">Charging</span>
                        </div>
                        <div className="counter-block-node">
                          <span className="digit-bold" style={{ color: "#ef5350" }}>{station.chargers.offline}</span>
                          <span className="label-sub">Offline</span>
                        </div>
                      </div>

                      <div className="grid-card-chart-bar-footer-row">
                        <div className="station-micro-linear-progress-bar-track" style={{ height: "4px" }}>
                          <div className="station-micro-linear-progress-bar-fill-indicator" style={{ width: `${station.utilizationPercentage}%` }}></div>
                        </div>
                        <span className="vendor-table-secondary-subtext-line" style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{station.utilizationPercentage}% busy</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        ) : (

          <div className="station-creation-form-card-panel">
            <h3>Station Details</h3>
            <form onSubmit={executeFormSubmission}>
              <div className="station-form-input-fields-split-grid">
                <div className="station-form-input-block-node">
                  <label>Station Name</label>
                  <input type="text" className="station-form-text-input-field" placeholder="e.g., BKC EV Plaza" value={formState.stationName} onChange={(e) => handleFieldMutation("stationName", e.target.value)} />
                </div>
                <div className="station-form-input-block-node">
                  <label>Station Code</label>
                  <input type="text" className="station-form-text-input-field" placeholder="e.g., STN009" value={formState.stationCode} onChange={(e) => handleFieldMutation("stationCode", e.target.value)} />
                </div>
                <div className="station-form-input-block-node">
                  <label>Contact Number</label>
                  <input type="text" className="station-form-text-input-field" placeholder="+91 98765 43210" value={formState.contactNumber} onChange={(e) => handleFieldMutation("contactNumber", e.target.value)} />
                </div>
                <div className="station-form-input-block-node">
                  <label>Working Hours</label>
                  <input type="text" className="station-form-text-input-field" placeholder="06:00 AM — 11:00 PM" value={formState.workingHours} onChange={(e) => handleFieldMutation("workingHours", e.target.value)} />
                </div>
                <div className="station-form-input-block-node">
                  <label>Vendor</label>
                  <select className="station-form-dropdown-select-control" value={formState.vendor} onChange={(e) => handleFieldMutation("vendor", e.target.value)}>
                    <option value="GreenCharge India">GreenCharge India</option>
                    <option value="ChargePoint Networks">ChargePoint Networks</option>
                    <option value="EcoVolt Solutions">EcoVolt Solutions</option>
                    <option value="Zap Electric">Zap Electric</option>
                  </select>
                </div>
                <div className="station-form-input-block-node">
                  <label>State</label>
                  <select className="station-form-dropdown-select-control" value={formState.state} onChange={(e) => handleFieldMutation("state", e.target.value)}>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Telangana">Telangana</option>
                  </select>
                </div>
                <div className="station-form-input-block-node full-width-span-row">
                  <label>Full Address</label>
                  <input type="text" className="station-form-text-input-field" placeholder="Street, area, city, pin" value={formState.fullAddress} onChange={(e) => handleFieldMutation("fullAddress", e.target.value)} />
                </div>
                <div className="station-form-input-block-node">
                  <label>Latitude</label>
                  <input type="text" className="station-form-text-input-field" placeholder="19.0596" value={formState.latitude} onChange={(e) => handleFieldMutation("latitude", e.target.value)} />
                </div>
                <div className="station-form-input-block-node">
                  <label>Longitude</label>
                  <input type="text" className="station-form-text-input-field" placeholder="72.8656" value={formState.longitude} onChange={(e) => handleFieldMutation("longitude", e.target.value)} />
                </div>
              </div>

              <div className="station-form-input-block-node full-width-span-row" style={{ marginBottom: "20px" }}>
                <label style={{ marginBottom: "6px", display: "block" }}>Pin Location on Map</label>
                <div className="station-form-interactive-map-integration-viewport">
                  <MapPin size={24} />
                  <p>Interactive map integration</p>
                  <p style={{ fontSize: "11px", opacity: 0.7 }}>Lat: {formState.latitude || "19.0596"}, Lng: {formState.longitude || "72.8656"}</p>
                </div>
              </div>

              <div className="station-form-input-block-node full-width-span-row">
                <label style={{ marginBottom: "8px", display: "block" }}>Amenities</label>
                <div className="station-form-amenities-checkbox-flex-matrix">
                  {targetAmenitiesList.map((amenity) => {
                    const isChecked = formState.amenities.includes(amenity);
                    return (
                      <label key={amenity} className="amenity-checkbox-custom-label-pill">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handleAmenitiesCheckboxToggle(amenity)}
                        />
                        <span>{amenity}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="station-form-footer-action-row-buttons-bar">
                <button 
                  type="button" 
                  className="cancel-trigger-neutral-btn"
                  onClick={() => navigate("/admin/stations")}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-trigger-primary-green-btn"
                >
                  Create Station
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Stations;