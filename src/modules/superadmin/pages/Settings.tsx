import { useState } from "react";
import { DollarSign, Percent, ShieldCheck, BellRing, History, HelpCircle, ChevronUp, ChevronDown } from "lucide-react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import type { SettingsSubSection, AuditTrailLogItem } from "../types/settings";
import "../styles/Settings.css";

const MockAuditTrailDataset: AuditTrailLogItem[] = [
  { id: "LOG1", type: "update", message: "Updated pricing plan for CCS2 chargers", user: "Rajesh Kumar", timestampText: "09 Jun 2026, 10:45 AM" },
  { id: "LOG2", type: "create", message: "Added new station: Koregaon Park Station", user: "Arjun Mehta", timestampText: "09 Jun 2026, 09:30 AM" },
  { id: "LOG3", type: "system", message: "Scheduled settlement processed for EcoVolt Solutions", user: "System", timestampText: "09 Jun 2026, 06:00 AM" },
  { id: "LOG4", type: "delete", message: "Suspended user account: Amir Khan", user: "Priya Sharma", timestampText: "08 Jun 2026, 05:15 PM" },
  { id: "LOG5", type: "update", message: "Updated GST rate from 18% to 18.5%", user: "Rajesh Kumar", timestampText: "08 Jun 2026, 03:00 PM" },
  { id: "LOG6", type: "action", message: "Stopped session SES014 manually", user: "Deepak Nair", timestampText: "08 Jun 2026, 02:20 PM" }
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState<SettingsSubSection>("Pricing");


  const [defaultRate, setDefaultRate] = useState(25);
  const [peakRate, setPeakRate] = useState(32);
  const [offPeakRate, setOffPeakRate] = useState(18);
  const [gstRate, setGstRate] = useState(18);
  const [cgstRate, setCgstRate] = useState(9);
  const [sgstRate, setSgstRate] = useState(9);
  const [tdsRate, setTdsRate] = useState(2);

  // Connector sub-fields states
  const [ccs2Rate, setCcs2Rate] = useState(25);
  const [type2Rate, setType2Rate] = useState(18);
  const [chademoRate, setChademorate] = useState(22);
  const [ultraRate, setUltraRate] = useState(32);

  return (
    <AdminLayout pageTitle="Settings">
      <div className="settings-workspace-view">
        
        <div className="settings-title-stack">
          <h2>Platform Settings</h2>
          <p>Configure pricing, taxes, integrations, and system preferences</p>
        </div>

        <div className="settings-split-layout-chassis">
          
          <div className="settings-vertical-sub-sidebar">
            <button type="button" className={`settings-sidebar-pill-btn ${activeSection === "Pricing" ? "active" : ""}`} onClick={() => setActiveSection("Pricing")}><DollarSign size={14} /><span>Pricing</span></button>
            <button type="button" className={`settings-sidebar-pill-btn ${activeSection === "Tax Config" ? "active" : ""}`} onClick={() => setActiveSection("Tax Config")}><Percent size={14} /><span>Tax Config</span></button>
            <button type="button" className={`settings-sidebar-pill-btn ${activeSection === "Payment Gateway" ? "active" : ""}`} onClick={() => setActiveSection("Payment Gateway")}><HelpCircle size={14} /><span>Payment Gateway</span></button>
            <button type="button" className={`settings-sidebar-pill-btn ${activeSection === "Notifications" ? "active" : ""}`} onClick={() => setActiveSection("Notifications")}><BellRing size={14} /><span>Notifications</span></button>
            <button type="button" className={`settings-sidebar-pill-btn ${activeSection === "Permissions" ? "active" : ""}`} onClick={() => setActiveSection("Permissions")}><ShieldCheck size={14} /><span>Permissions</span></button>
            <button type="button" className={`settings-sidebar-pill-btn ${activeSection === "Audit Logs" ? "active" : ""}`} onClick={() => setActiveSection("Audit Logs")}><History size={14} /><span>Audit Logs</span></button>
          </div>

          <div className="settings-primary-content-panel-card">
            

            {activeSection === "Pricing" && (
              <form onSubmit={(e) => e.preventDefault()}>
                <h3>Pricing Configuration</h3>
                <div className="settings-form-block-stack-vertical">
                  
                  <div className="settings-form-row-grid-split">
                    <div className="settings-input-labeled-node">
                      <label>Default Rate (₹/kWh)</label>
                      <div className="settings-custom-spinner-container">
                        <input type="text" className="settings-primitive-text-input" value={defaultRate} readOnly />
                        <div className="spinner-arrow-triggers">
                          <button type="button" onClick={() => setDefaultRate(p => p + 1)} aria-label="Increment"><ChevronUp size={12} /></button>
                          <button type="button" onClick={() => setDefaultRate(p => Math.max(0, p - 1))} aria-label="Decrement"><ChevronDown size={12} /></button>
                        </div>
                      </div>
                    </div>
                    <div className="settings-input-labeled-node">
                      <label>Peak Rate (₹/kWh)</label>
                      <div className="settings-custom-spinner-container">
                        <input type="text" className="settings-primitive-text-input" value={peakRate} readOnly />
                        <div className="spinner-arrow-triggers">
                          <button type="button" onClick={() => setPeakRate(p => p + 1)} aria-label="Increment"><ChevronUp size={12} /></button>
                          <button type="button" onClick={() => setPeakRate(p => Math.max(0, p - 1))} aria-label="Decrement"><ChevronDown size={12} /></button>
                        </div>
                      </div>
                    </div>
                    <div className="settings-input-labeled-node">
                      <label>Off-Peak Rate (₹/kWh)</label>
                      <div className="settings-custom-spinner-container">
                        <input type="text" className="settings-primitive-text-input" value={offPeakRate} readOnly />
                        <div className="spinner-arrow-triggers">
                          <button type="button" onClick={() => setOffPeakRate(p => p + 1)} aria-label="Increment"><ChevronUp size={12} /></button>
                          <button type="button" onClick={() => setOffPeakRate(p => Math.max(0, p - 1))} aria-label="Decrement"><ChevronDown size={12} /></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="settings-input-labeled-node">
                    <label>Peak Hours</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input type="text" className="settings-primitive-text-input" style={{ width: "100px", textAlign: "center" }} defaultValue="09:00" />
                      <span style={{ color: "var(--text-secondary)" }}>to</span>
                      <input type="text" className="settings-primitive-text-input" style={{ width: "100px", textAlign: "center" }} defaultValue="19:00" />
                    </div>
                  </div>

                  <div className="settings-input-labeled-node">
                    <label style={{ marginBottom: "4px", display: "block" }}>Connector-specific Rates</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                      
                      <div className="settings-connector-row-wrapper-strip">
                        <span>CCS2 (DC Fast)</span>
                        <div className="settings-connector-inline-input-cap">
                          <span>₹</span>
                          <div className="settings-custom-spinner-container mini-spinner">
                            <input type="text" value={ccs2Rate} readOnly />
                            <div className="spinner-arrow-triggers">
                              <button type="button" onClick={() => setCcs2Rate(p => p + 1)}><ChevronUp size={10} /></button>
                              <button type="button" onClick={() => setCcs2Rate(p => Math.max(0, p - 1))}><ChevronDown size={10} /></button>
                            </div>
                          </div>
                          <span>/kWh</span>
                        </div>
                      </div>

                      <div className="settings-connector-row-wrapper-strip">
                        <span>Type 2 (AC)</span>
                        <div className="settings-connector-inline-input-cap">
                          <span>₹</span>
                          <div className="settings-custom-spinner-container mini-spinner">
                            <input type="text" value={type2Rate} readOnly />
                            <div className="spinner-arrow-triggers">
                              <button type="button" onClick={() => setType2Rate(p => p + 1)}><ChevronUp size={10} /></button>
                              <button type="button" onClick={() => setType2Rate(p => Math.max(0, p - 1))}><ChevronDown size={10} /></button>
                            </div>
                          </div>
                          <span>/kWh</span>
                        </div>
                      </div>

                      <div className="settings-connector-row-wrapper-strip">
                        <span>CHAdeMO</span>
                        <div className="settings-connector-inline-input-cap">
                          <span>₹</span>
                          <div className="settings-custom-spinner-container mini-spinner">
                            <input type="text" value={chademoRate} readOnly />
                            <div className="spinner-arrow-triggers">
                              <button type="button" onClick={() => setChademorate(p => p + 1)}><ChevronUp size={10} /></button>
                              <button type="button" onClick={() => setChademorate(p => Math.max(0, p - 1))}><ChevronDown size={10} /></button>
                            </div>
                          </div>
                          <span>/kWh</span>
                        </div>
                      </div>

                      <div className="settings-connector-row-wrapper-strip">
                        <span>DC Ultra Fast (≥150 kW)</span>
                        <div className="settings-connector-inline-input-cap">
                          <span>₹</span>
                          <div className="settings-custom-spinner-container mini-spinner">
                            <input type="text" value={ultraRate} readOnly />
                            <div className="spinner-arrow-triggers">
                              <button type="button" onClick={() => setUltraRate(p => p + 1)}><ChevronUp size={10} /></button>
                              <button type="button" onClick={() => setUltraRate(p => Math.max(0, p - 1))}><ChevronDown size={10} /></button>
                            </div>
                          </div>
                          <span>/kWh</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="settings-form-submit-line-row">
                    <button type="submit" className="settings-submit-green-action-btn">Save Changes</button>
                  </div>
                </div>
              </form>
            )}


            {activeSection === "Tax Config" && (
              <form onSubmit={(e) => e.preventDefault()}>
                <h3>Tax Configuration</h3>
                <div className="settings-form-block-stack-vertical">
                  <div className="settings-form-row-grid-split two-columns">
                    <div className="settings-input-labeled-node">
                      <label>GST Rate (%)</label>
                      <div className="settings-custom-spinner-container">
                        <input type="text" className="settings-primitive-text-input" value={gstRate} readOnly />
                        <div className="spinner-arrow-triggers">
                          <button type="button" onClick={() => setGstRate(p => p + 1)}><ChevronUp size={12} /></button>
                          <button type="button" onClick={() => setGstRate(p => Math.max(0, p - 1))}><ChevronDown size={12} /></button>
                        </div>
                      </div>
                    </div>
                    <div className="settings-input-labeled-node">
                      <label>CGST Rate (%)</label>
                      <div className="settings-custom-spinner-container">
                        <input type="text" className="settings-primitive-text-input" value={cgstRate} readOnly />
                        <div className="spinner-arrow-triggers">
                          <button type="button" onClick={() => setCgstRate(p => p + 1)}><ChevronUp size={12} /></button>
                          <button type="button" onClick={() => setCgstRate(p => Math.max(0, p - 1))}><ChevronDown size={12} /></button>
                        </div>
                      </div>
                    </div>
                    <div className="settings-input-labeled-node">
                      <label>SGST Rate (%)</label>
                      <div className="settings-custom-spinner-container">
                        <input type="text" className="settings-primitive-text-input" value={sgstRate} readOnly />
                        <div className="spinner-arrow-triggers">
                          <button type="button" onClick={() => setSgstRate(p => p + 1)}><ChevronUp size={12} /></button>
                          <button type="button" onClick={() => setSgstRate(p => Math.max(0, p - 1))}><ChevronDown size={12} /></button>
                        </div>
                      </div>
                    </div>
                    <div className="settings-input-labeled-node">
                      <label>TDS Rate (%)</label>
                      <div className="settings-custom-spinner-container">
                        <input type="text" className="settings-primitive-text-input" value={tdsRate} readOnly />
                        <div className="spinner-arrow-triggers">
                          <button type="button" onClick={() => setTdsRate(p => p + 1)}><ChevronUp size={12} /></button>
                          <button type="button" onClick={() => setTdsRate(p => Math.max(0, p - 1))}><ChevronDown size={12} /></button>
                        </div>
                      </div>
                    </div>
                    <div className="settings-input-labeled-node full-width-span">
                      <label>HSN Code for EV Charging</label>
                      <input type="text" className="settings-primitive-text-input" defaultValue="998598" />
                    </div>
                  </div>
                  <div className="settings-form-submit-line-row">
                    <button type="submit" className="settings-submit-green-action-btn">Save Tax Config</button>
                  </div>
                </div>
              </form>
            )}


            {activeSection === "Payment Gateway" && (
              <form onSubmit={(e) => e.preventDefault()}>
                <h3>Payment Gateway</h3>
                <div className="settings-gateway-cards-stack-vertical">
                  <div className="settings-gateway-node-strip active-node">
                    <div className="gateway-left-identity-stack">
                      <span className="name-headline">Razorpay</span>
                      <span className="caption-label">Active gateway terminal integration</span>
                    </div>
                    <div className="gateway-right-controls-flex-strip">
                      <span className="gateway-pill-status-chip active">Active</span>
                      <button type="button" className="gateway-configure-txt-trigger-btn">Configure</button>
                    </div>
                  </div>

                  <div className="settings-gateway-node-strip">
                    <div className="gateway-left-identity-stack">
                      <span className="name-headline">PayU</span>
                      <span className="caption-label">Backup merchant tunnel pool configuration</span>
                    </div>
                    <div className="gateway-right-controls-flex-strip">
                      <span className="gateway-pill-status-chip inactive">Inactive</span>
                      <button type="button" className="gateway-configure-txt-trigger-btn">Configure</button>
                    </div>
                  </div>

                  <div className="settings-gateway-node-strip">
                    <div className="gateway-left-identity-stack">
                      <span className="name-headline">Cashfree</span>
                      <span className="caption-label">Backup system gateway ledger router</span>
                    </div>
                    <div className="gateway-right-controls-flex-strip">
                      <span className="gateway-pill-status-chip inactive">Inactive</span>
                      <button type="button" className="gateway-configure-txt-trigger-btn">Configure</button>
                    </div>
                  </div>
                </div>

                <div className="settings-form-block-stack-vertical">
                  <div className="settings-form-row-grid-split two-columns">
                    <div className="settings-input-labeled-node">
                      <label>API Key</label>
                      <input type="password" className="settings-primitive-text-input" defaultValue="••••••••••••••••••••••••" />
                    </div>
                    <div className="settings-input-labeled-node">
                      <label>Secret Key</label>
                      <input type="password" className="settings-primitive-text-input" defaultValue="••••••••••••••••••••••••" />
                    </div>
                  </div>
                  <div className="settings-form-submit-line-row">
                    <button type="submit" className="settings-submit-green-action-btn">Save Gateway Config</button>
                  </div>
                </div>
              </form>
            )}


            {activeSection === "Notifications" && (
              <form onSubmit={(e) => e.preventDefault()}>
                <h3>Notification Preferences</h3>
                <div className="settings-notification-lines-vertical-list">
                  
                  <div className="notification-preference-row-node">
                    <div className="notification-pref-meta-info-block">
                      <h4>Station Offline Alert</h4>
                      <p>Notify when a station goes offline for more than 5 minutes</p>
                    </div>
                    <div className="notification-pref-checkboxes-channels-flex">
                      <div className="pref-checkbox-labeled-capsule"><span>Email</span><input type="checkbox" defaultChecked /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>SMS</span><input type="checkbox" defaultChecked /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>Push</span><input type="checkbox" defaultChecked /></div>
                    </div>
                  </div>

                  <div className="notification-preference-row-node">
                    <div className="notification-pref-meta-info-block">
                      <h4>Charger Fault</h4>
                      <p>Alert on hardware or communication faults</p>
                    </div>
                    <div className="notification-pref-checkboxes-channels-flex">
                      <div className="pref-checkbox-labeled-capsule"><span>Email</span><input type="checkbox" defaultChecked /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>SMS</span><input type="checkbox" /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>Push</span><input type="checkbox" defaultChecked /></div>
                    </div>
                  </div>

                  <div className="notification-preference-row-node">
                    <div className="notification-pref-meta-info-block">
                      <h4>Payment Failure</h4>
                      <p>Alert when a transaction fails</p>
                    </div>
                    <div className="notification-pref-checkboxes-channels-flex">
                      <div className="pref-checkbox-labeled-capsule"><span>Email</span><input type="checkbox" defaultChecked /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>SMS</span><input type="checkbox" defaultChecked /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>Push</span><input type="checkbox" /></div>
                    </div>
                  </div>

                  <div className="notification-preference-row-node">
                    <div className="notification-pref-meta-info-block">
                      <h4>New Vendor Registration</h4>
                      <p>Notify super admin on new vendor signup</p>
                    </div>
                    <div className="notification-pref-checkboxes-channels-flex">
                      <div className="pref-checkbox-labeled-capsule"><span>Email</span><input type="checkbox" defaultChecked /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>SMS</span><input type="checkbox" /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>Push</span><input type="checkbox" defaultChecked /></div>
                    </div>
                  </div>

                  <div className="notification-preference-row-node">
                    <div className="notification-pref-meta-info-block">
                      <h4>Session Completion</h4>
                      <p>Summary after each session completes</p>
                    </div>
                    <div className="notification-pref-checkboxes-channels-flex">
                      <div className="pref-checkbox-labeled-capsule"><span>Email</span><input type="checkbox" /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>SMS</span><input type="checkbox" /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>Push</span><input type="checkbox" /></div>
                    </div>
                  </div>

                  <div className="notification-preference-row-node">
                    <div className="notification-pref-meta-info-block">
                      <h4>Low Settlement Balance</h4>
                      <p>Alert when vendor settlement balance is below threshold</p>
                    </div>
                    <div className="notification-pref-checkboxes-channels-flex">
                      <div className="pref-checkbox-labeled-capsule"><span>Email</span><input type="checkbox" defaultChecked /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>SMS</span><input type="checkbox" defaultChecked /></div>
                      <div className="pref-checkbox-labeled-capsule"><span>Push</span><input type="checkbox" /></div>
                    </div>
                  </div>

                </div>
                <div className="settings-form-submit-line-row">
                  <button type="submit" className="settings-submit-green-action-btn">Save Preferences</button>
                </div>
              </form>
            )}


            {activeSection === "Permissions" && (
              <div>
                <h3>Role-Based Access Control</h3>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "-12px 0 20px 0" }}>Configure permissions for each role</p>
                <div style={{ overflowX: "auto", width: "100%" }}>
                  <table className="settings-rbac-html-table">
                    <thead>
                      <tr>
                        <th>Permission</th>
                        <th style={{ textAlign: "center" }}>Super Admin</th>
                        <th style={{ textAlign: "center" }}>Vendor Admin</th>
                        <th style={{ textAlign: "center" }}>Operator</th>
                        <th style={{ textAlign: "center" }}>Finance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span className="rbac-permission-name-title">Manage Vendors</span></td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                      </tr>
                      <tr>
                        <td><span className="rbac-permission-name-title">Manage Stations</span></td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                      </tr>
                      <tr>
                        <td><span className="rbac-permission-name-title">Manage Chargers</span></td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                      </tr>
                      <tr>
                        <td><span className="rbac-permission-name-title">View Sessions</span></td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                      </tr>
                      <tr>
                        <td><span className="rbac-permission-name-title">Stop Sessions</span></td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                      </tr>
                      <tr>
                        <td><span className="rbac-permission-name-title">View Payments</span></td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                      </tr>
                      <tr>
                        <td><span className="rbac-permission-name-title">Process Settlements</span></td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                      </tr>
                      <tr>
                        <td><span className="rbac-permission-name-title">Manage Users</span></td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                      </tr>
                      <tr>
                        <td><span className="rbac-permission-name-title">View Reports</span></td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                      </tr>
                      <tr>
                        <td><span className="rbac-permission-name-title">System Settings</span></td>
                        <td style={{ textAlign: "center", color: "#24cb71" }}>✓</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                        <td style={{ textAlign: "center", opacity: 0.25 }}>—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* AUDIT TRAIL LOGS */}
            {activeSection === "Audit Logs" && (
              <div>
                <h3>Audit Trail</h3>
                <div className="settings-audit-trails-vertical-scroller-box">
                  {MockAuditTrailDataset.map((log) => (
                    <div key={log.id} className="audit-log-item-card-row">
                      <span className={`audit-badge-type-micro-tag ${log.type}`}>
                        {log.type}
                      </span>
                      <div className="audit-log-text-meta-stack">
                        <span className="log-headline-msg">{log.message}</span>
                        <span className="log-caption-user-date">
                          {log.user} • {log.timestampText}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default Settings;