import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Plus, Eye, Edit2, Power, Trash2, Building2, UploadCloud, FileText } from "lucide-react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { vendorService } from "../services/vendorService";
import type { VendorListItem, NewVendorFormState } from "../types/vendors";
import "../styles/Vendors.css";

const InitialFormPayload: NewVendorFormState = {
  vendorName: "", legalCompanyName: "", emailAddress: "", phoneNumber: "", city: "", state: "", fullAddress: "",
  gstNumber: "", panNumber: "",
  bankName: "", accountNumber: "", ifscCode: "", accountType: "Savings", branchName: "", upiId: ""
};

const Vendors = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [vendorsList, setVendorsList] = useState<VendorListItem[]>([]);
  const [totalTextLabel, setTotalTextLabel] = useState("0 vendors registered");
  const [activeTabFilter, setActiveTabFilter] = useState("All");
  const [searchFilterQuery, setSearchFilterQuery] = useState("");
  const [formState, setFormState] = useState<NewVendorFormState>(InitialFormPayload);

  const isStep1Route = location.pathname.includes("vendors/add/step1");
  const isStep2Route = location.pathname.includes("vendors/add/step2");
  const isStep3Route = location.pathname.includes("vendors/add/step3");
  const isWizardActive = isStep1Route || isStep2Route || isStep3Route;

  const isProfileViewRoute = location.pathname.includes("vendors/view/");
  const [activeProfileTab, setActiveProfileTab] = useState<"info" | "kyc" | "bank" | "stations">("info");
  const [selectedVendorProfile, setSelectedVendorProfile] = useState<VendorListItem | null>(null);

  useEffect(() => {
    vendorService.fetchVendorsState().then((data) => {
      setVendorsList(data.items);
      setTotalTextLabel(data.totalRegisteredText);

      if (location.pathname.includes("vendors/view/")) {
        const parsedId = location.pathname.split("/").pop();
        const targetedRecord = data.items.find(item => item.id === parsedId);
        if (targetedRecord) {
          setSelectedVendorProfile(targetedRecord);
        }
      }
    });
  }, [location.pathname]);

  const handleFieldMutation = (key: keyof NewVendorFormState, val: string) => {
    setFormState(prev => ({ ...prev, [key]: val }));
  };

  const executeFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    
    const simulatedItem: VendorListItem = {
      id: `VND00${vendorsList.length + 1}`,
      companyName: formState.vendorName || formState.legalCompanyName || "Simulated Operator Hub",
      vendorCode: `VND00${vendorsList.length + 1}`,
      location: formState.city || "Mumbai",
      contactName: "Dynamic Executive",
      contactEmail: formState.emailAddress || "admin@operator.io",
      stationsCount: 0,
      activeStationsCount: 0,
      revenueMtd: "₹0.00",
      status: "Active"
    };

    setVendorsList(prev => [simulatedItem, ...prev]);
    setFormState(InitialFormPayload);
    navigate("/admin/vendors");
  };

  const filteredItems = vendorsList.filter((vendor) => {
    const matchesTab = activeTabFilter === "All" || vendor.status === activeTabFilter;
    const matchesSearch = 
      vendor.companyName.toLowerCase().includes(searchFilterQuery.toLowerCase()) ||
      vendor.vendorCode.toLowerCase().includes(searchFilterQuery.toLowerCase()) ||
      vendor.contactName.toLowerCase().includes(searchFilterQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <AdminLayout pageTitle="Vendors">
      <div className="vendors-module-view">
        
        <div className="vendors-header-actions-panel">
          <div className="vendors-title-block-group">
            {!isWizardActive && !isProfileViewRoute && (
              <>
                <h2>Vendor Management</h2>
                <p>{totalTextLabel}</p>
              </>
            )}
            {isWizardActive && (
              <>
                <h2>Add New Vendor</h2>
                <div className="vendors-wizards-breadcrumb-navigation">
                  <span className="vendors-breadcrumb-link" onClick={() => navigate("/admin/vendors")}>Vendors</span>
                  <span>&rarr;</span>
                  <span>Add New Vendor</span>
                </div>
              </>
            )}
            {isProfileViewRoute && selectedVendorProfile && (
              <>
                <h2>{selectedVendorProfile.companyName}</h2>
                <div className="vendors-wizards-breadcrumb-navigation">
                  <span className="vendors-breadcrumb-link" onClick={() => navigate("/admin/vendors")}>Vendors</span>
                  <span>&rarr;</span>
                  <span>{selectedVendorProfile.companyName}</span>
                </div>
              </>
            )}
          </div>

          {!isWizardActive && !isProfileViewRoute && (
            <button 
              type="button" 
              className="vendor-action-trigger-green-btn"
              onClick={() => navigate("/admin/vendors/add/step1")}
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Add Vendor</span>
            </button>
          )}
        </div>

        {!isWizardActive && !isProfileViewRoute && (
          <>
            <div className="vendors-search-filter-ribbon">
              <div className="vendors-search-bar-box-frame">
                <Search size={15} className="vendors-lens-icon-absolute" />
                <input 
                  type="text" 
                  className="vendors-search-control-input"
                  placeholder="Search vendors..."
                  value={searchFilterQuery}
                  onChange={(e) => setSearchFilterQuery(e.target.value)}
                />
              </div>

              <div className="vendors-status-filter-tabs-group">
                <button type="button" className={`vendor-tab-pill-trigger ${activeTabFilter === "All" ? "active" : ""}`} onClick={() => setActiveTabFilter("All")}>All</button>
                <button type="button" className={`vendor-tab-pill-trigger ${activeTabFilter === "Active" ? "active" : ""}`} onClick={() => setActiveTabFilter("Active")}>Active</button>
                <button type="button" className={`vendor-tab-pill-trigger ${activeTabFilter === "Suspended" ? "active" : ""}`} onClick={() => setActiveTabFilter("Suspended")}>Suspended</button>
                <button type="button" className={`vendor-tab-pill-trigger ${activeTabFilter === "Pending" ? "active" : ""}`} onClick={() => setActiveTabFilter("Pending")}>Pending</button>
              </div>
            </div>

            <div className="vendors-index-table-scroller no-scrollbar">
              <table className="vendors-master-table-element">
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Contact</th>
                    <th>Stations</th>
                    <th>Revenue</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>
                        <div className="vendor-table-profile-cell-block">
                          <div className="vendor-table-icon-avatar-shield">
                            <Building2 size={15} />
                          </div>
                          <div className="vendor-meta-stacked-lines">
                            <span className="vendor-table-primary-headline-text">{vendor.companyName}</span>
                            <span className="vendor-table-secondary-subtext-line">{vendor.vendorCode} &bull; {vendor.location}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="vendor-meta-stacked-lines">
                          <span className="vendor-table-primary-headline-text" style={{ fontWeight: 500 }}>{vendor.contactName}</span>
                          <a href={`mailto:${vendor.contactEmail}`} className="vendor-table-email-anchor-link">{vendor.contactEmail}</a>
                        </div>
                      </td>
                      <td>
                        <div className="vendor-meta-stacked-lines">
                          <span className="vendor-table-primary-headline-text">{vendor.stationsCount}</span>
                          <span className="vendor-table-secondary-subtext-line" style={{ color: "#24cb71", fontWeight: 500 }}>{vendor.activeStationsCount} active</span>
                        </div>
                      </td>
                      <td>
                        <div className="vendor-meta-stacked-lines">
                          <span className="vendor-table-primary-headline-text">{vendor.revenueMtd}</span>
                          <span className="vendor-table-secondary-subtext-line">MTD</span>
                        </div>
                      </td>
                      <td>
                        <span className={`vendor-table-semantic-badge ${vendor.status.toLowerCase()}`}>
                          {vendor.status}
                        </span>
                      </td>
                      <td>
                        <div className="vendor-row-actions-group-cell">
                          <button 
                            type="button" 
                            className="vendor-row-action-icon-trigger-btn edit" 
                            aria-label="View Vendor Profile Dashboard Layout"
                            onClick={() => navigate(`/admin/vendors/view/${vendor.id}`)}
                          >
                            <Eye size={14} />
                          </button>
                          <button type="button" className="vendor-row-action-icon-trigger-btn edit" aria-label="Edit Vendor Details"><Edit2 size={14} /></button>
                          <button type="button" className="vendor-row-action-icon-trigger-btn suspend" aria-label="Toggle Suspend State"><Power size={14} /></button>
                          <button type="button" className="vendor-row-action-icon-trigger-btn delete" aria-label="Purge Vendor Profile"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {isProfileViewRoute && selectedVendorProfile && (
          <>
            <div className="vendor-profile-identity-headline-row">
              <div className="vendor-profile-identity-left">
                <div className="vendor-profile-avatar-box-shield"><Building2 size={20} /></div>
                <div className="vendor-meta-stacked-lines">
                  <span className="vendor-table-primary-headline-text" style={{ fontSize: "18px" }}>{selectedVendorProfile.companyName}</span>
                  <span className="vendor-table-secondary-subtext-line">{selectedVendorProfile.vendorCode} &bull; {selectedVendorProfile.location}</span>
                </div>
              </div>
              <span className={`vendor-table-semantic-badge ${selectedVendorProfile.status.toLowerCase()}`}>
                {selectedVendorProfile.status}
              </span>
            </div>

            <div className="vendor-profile-summary-ribbon">
              <div className="vendor-profile-kpi-card">
                <h4>Total Stations</h4>
                <p className="kpi-value-text">{selectedVendorProfile.stationsCount}</p>
              </div>
              <div className="vendor-profile-kpi-card">
                <h4>Active Stations</h4>
                <p className="kpi-value-text">{selectedVendorProfile.activeStationsCount}</p>
              </div>
              <div className="vendor-profile-kpi-card">
                <h4>Revenue MTD</h4>
                <p className="kpi-value-text">{selectedVendorProfile.revenueMtd}</p>
              </div>
              <div className="vendor-profile-kpi-card">
                <h4>Phone Number</h4>
                <p className="kpi-value-text" style={{ fontSize: "16px", paddingTop: "4px" }}>+91 98765 43210</p>
              </div>
            </div>

            <div className="vendor-profile-sub-tabs-container-bar">
              <button type="button" className={`vendor-profile-tab-anchor-btn ${activeProfileTab === "info" ? "active" : ""}`} onClick={() => setActiveProfileTab("info")}>Company Info</button>
              <button type="button" className={`vendor-profile-tab-anchor-btn ${activeProfileTab === "kyc" ? "active" : ""}`} onClick={() => setActiveProfileTab("kyc")}>KYC Documents</button>
              <button type="button" className={`vendor-profile-tab-anchor-btn ${activeProfileTab === "bank" ? "active" : ""}`} onClick={() => setActiveProfileTab("bank")}>Bank Details</button>
              <button type="button" className={`vendor-profile-tab-anchor-btn ${activeProfileTab === "stations" ? "active" : ""}`} onClick={() => setActiveProfileTab("stations")}>Stations</button>
            </div>

            <div className="vendor-profile-tabs-workspace-card">
              {activeProfileTab === "info" && (
                <div className="vendor-profile-field-rows-grid">
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">Company Name</span>
                    <span className="field-value">{selectedVendorProfile.companyName}</span>
                  </div>
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">Contact Person</span>
                    <span className="field-value">{selectedVendorProfile.contactName}</span>
                  </div>
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">Email Address</span>
                    <span className="field-value">{selectedVendorProfile.contactEmail}</span>
                  </div>
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">Phone Number</span>
                    <span className="field-value">+91 98765 43210</span>
                  </div>
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">City</span>
                    <span className="field-value">{selectedVendorProfile.location}</span>
                  </div>
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">GST Number</span>
                    <span className="field-value">27AADCG1234M1Z5</span>
                  </div>
                </div>
              )}

              {activeProfileTab === "kyc" && (
                <div className="vendor-profile-kyc-documents-list-stack">
                  <div className="vendor-profile-kyc-document-row">
                    <div className="doc-left-meta">
                      <FileText size={18} style={{ color: "var(--v-text-secondary)" }} />
                      <div className="vendor-meta-stacked-lines">
                        <span className="doc-title-text">GST Certificate</span>
                        <span className="doc-date-subtext">Updated: 12 Jan 2026</span>
                      </div>
                    </div>
                    <span className="tab-inline-badge verified">Verified</span>
                  </div>

                  <div className="vendor-profile-kyc-document-row">
                    <div className="doc-left-meta">
                      <FileText size={18} style={{ color: "var(--v-text-secondary)" }} />
                      <div className="vendor-meta-stacked-lines">
                        <span className="doc-title-text">Business Registration</span>
                        <span className="doc-date-subtext">Updated: 12 Jan 2026</span>
                      </div>
                    </div>
                    <span className="tab-inline-badge verified">Verified</span>
                  </div>

                  <div className="vendor-profile-kyc-document-row">
                    <div className="doc-left-meta">
                      <FileText size={18} style={{ color: "var(--v-text-secondary)" }} />
                      <div className="vendor-meta-stacked-lines">
                        <span className="doc-title-text">Director ID Proof</span>
                        <span className="doc-date-subtext">Updated: &mdash;</span>
                      </div>
                    </div>
                    <span className="tab-inline-badge pending">Pending</span>
                  </div>

                  <div className="vendor-profile-kyc-document-row">
                    <div className="doc-left-meta">
                      <FileText size={18} style={{ color: "var(--v-text-secondary)" }} />
                      <div className="vendor-meta-stacked-lines">
                        <span className="doc-title-text">Address Proof</span>
                        <span className="doc-date-subtext">Updated: 12 Jan 2026</span>
                      </div>
                    </div>
                    <span className="tab-inline-badge verified">Verified</span>
                  </div>
                </div>
              )}

              {activeProfileTab === "bank" && (
                <div className="vendor-profile-field-rows-grid">
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">Bank Name</span>
                    <span className="field-value">HDFC Bank</span>
                  </div>
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">Account Number</span>
                    <span className="field-value">XXXX XXXX 4892</span>
                  </div>
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">IFSC Code</span>
                    <span className="field-value">HDFC0001234</span>
                  </div>
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">Account Type</span>
                    <span className="field-value">Current</span>
                  </div>
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">Branch</span>
                    <span className="field-value">Mumbai BKC</span>
                  </div>
                  <div className="vendor-profile-display-data-block">
                    <span className="field-label">UPI ID</span>
                    <span className="field-value">greencharge@hdfc</span>
                  </div>
                </div>
              )}

              {activeProfileTab === "stations" && (
                <div className="vendor-profile-stations-placeholder-text">
                  {selectedVendorProfile.stationsCount} stations &mdash; see Stations module for full list filtered by vendor.
                </div>
              )}
            </div>
          </>
        )}

        {isWizardActive && (
          <div className="vendor-wizard-form-master-panel">
            <div className="vendor-wizard-horizontal-stepper-header">
              <div className={`stepper-node-item ${isStep1Route ? "active" : "complete"}`}>
                <div className="stepper-node-circle" style={{ cursor: "pointer" }} onClick={() => navigate("/admin/vendors/add/step1")}>
                  {!isStep1Route ? "✓" : "1"}
                </div>
                <div className="stepper-node-text-stack">
                  <span className="stepper-node-label-title" style={{ cursor: "pointer" }} onClick={() => navigate("/admin/vendors/add/step1")}>
                    Company Details
                  </span>
                </div>
              </div>
              <div className="stepper-horizontal-divider-line"></div>
              
              <div className={`stepper-node-item ${isStep2Route ? "active" : isStep3Route ? "complete" : ""}`}>
                <div className="stepper-node-circle" style={{ cursor: isStep3Route || isStep2Route ? "pointer" : "default" }} onClick={() => (isStep3Route || isStep2Route) && navigate("/admin/vendors/add/step2")}>
                  {isStep3Route ? "✓" : "2"}
                </div>
                <div className="stepper-node-text-stack">
                  <span className="stepper-node-label-title" style={{ cursor: isStep3Route || isStep2Route ? "pointer" : "default" }} onClick={() => (isStep3Route || isStep2Route) && navigate("/admin/vendors/add/step2")}>
                    GST &amp; Documents
                  </span>
                </div>
              </div>
              <div className="stepper-horizontal-divider-line"></div>

              <div className={`stepper-node-item ${isStep3Route ? "active" : ""}`}>
                <div className="stepper-node-circle">3</div>
                <div className="stepper-node-text-stack">
                  <span className="stepper-node-label-title">Bank Details</span>
                </div>
              </div>
            </div>

            <form onSubmit={executeFormSubmission}>
              {isStep1Route && (
                <>
                  <h3>Company Details</h3>
                  <div className="vendor-form-input-grid-fields-wrapper">
                    <div className="vendor-input-block-container">
                      <label>Vendor Name</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="e.g., GreenCharge India" value={formState.vendorName} onChange={(e) => handleFieldMutation("vendorName", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container">
                      <label>Company Name</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="Legal entity name" value={formState.legalCompanyName} onChange={(e) => handleFieldMutation("legalCompanyName", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container">
                      <label>Email Address</label>
                      <input type="email" className="vendor-form-text-field-control" placeholder="contact@company.com" value={formState.emailAddress} onChange={(e) => handleFieldMutation("emailAddress", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container">
                      <label>Phone Number</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="+91 98765 43210" value={formState.phoneNumber} onChange={(e) => handleFieldMutation("phoneNumber", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container">
                      <label>City</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="Mumbai" value={formState.city} onChange={(e) => handleFieldMutation("city", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container">
                      <label>State</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="Maharashtra" value={formState.state} onChange={(e) => handleFieldMutation("state", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container span-two-columns-row">
                      <label>Full Address</label>
                      <textarea className="vendor-form-textarea-field-control" placeholder="Street, area, city, pin code" value={formState.fullAddress} onChange={(e) => handleFieldMutation("fullAddress", e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {isStep2Route && (
                <>
                  <h3>GST &amp; Documents</h3>
                  <div className="vendor-form-input-grid-fields-wrapper">
                    <div className="vendor-input-block-container">
                      <label>GST Number</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="27AADCG1234M1Z5" value={formState.gstNumber} onChange={(e) => handleFieldMutation("gstNumber", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container">
                      <label>PAN Number</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="AADCG1234M" value={formState.panNumber} onChange={(e) => handleFieldMutation("panNumber", e.target.value)} />
                    </div>
                  </div>

                  <div className="vendor-document-upload-drop-zone-block">
                    <div className="upload-zone-left-meta">
                      <UploadCloud size={16} />
                      <span>GST Certificate</span>
                    </div>
                    <span className="upload-zone-browse-trigger-action-link">Browse file</span>
                  </div>

                  <div className="vendor-document-upload-drop-zone-block">
                    <div className="upload-zone-left-meta">
                      <UploadCloud size={16} />
                      <span>Business Registration Certificate</span>
                    </div>
                    <span className="upload-zone-browse-trigger-action-link">Browse file</span>
                  </div>

                  <div className="vendor-document-upload-drop-zone-block">
                    <div className="upload-zone-left-meta">
                      <UploadCloud size={16} />
                      <span>Director ID Proof</span>
                    </div>
                    <span className="upload-zone-browse-trigger-action-link">Browse file</span>
                  </div>
                </>
              )}

              {isStep3Route && (
                <>
                  <h3>Bank Details</h3>
                  <div className="vendor-form-input-grid-fields-wrapper">
                    <div className="vendor-input-block-container">
                      <label>Bank Name</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="HDFC Bank" value={formState.bankName} onChange={(e) => handleFieldMutation("bankName", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container">
                      <label>Account Number</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="Current account number" value={formState.accountNumber} onChange={(e) => handleFieldMutation("accountNumber", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container">
                      <label>IFSC Code</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="HDFC0001234" value={formState.ifscCode} onChange={(e) => handleFieldMutation("ifscCode", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container">
                      <label>Account Type</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="Current / Savings" value={formState.accountType} onChange={(e) => handleFieldMutation("accountType", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container">
                      <label>Branch</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="Branch name" value={formState.branchName} onChange={(e) => handleFieldMutation("branchName", e.target.value)} />
                    </div>
                    <div className="vendor-input-block-container">
                      <label>UPI ID (Optional)</label>
                      <input type="text" className="vendor-form-text-field-control" placeholder="business@bank" value={formState.upiId} onChange={(e) => handleFieldMutation("upiId", e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              <div className="vendor-wizard-footer-action-button-bar">
                <button 
                  type="button" 
                  className="wizard-neutral-cancel-or-back-btn"
                  onClick={() => {
                    if (isStep1Route) {
                      navigate("/admin/vendors");
                    } else if (isStep2Route) {
                      navigate("/admin/vendors/add/step1");
                    } else {
                      navigate("/admin/vendors/add/step2");
                    }
                  }}
                >
                  {isStep1Route ? "Cancel" : "Back"}
                </button>

                {isStep3Route ? (
                  <button type="submit" className="wizard-primary-advance-or-submit-btn">
                    Create Vendor
                  </button>
                ) : (
                  <button 
                    type="button" 
                    className="wizard-primary-advance-or-submit-btn"
                    onClick={() => {
                      if (isStep1Route) navigate("/admin/vendors/add/step2");
                      if (isStep2Route) navigate("/admin/vendors/add/step3");
                    }}
                  >
                    Continue
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Vendors;