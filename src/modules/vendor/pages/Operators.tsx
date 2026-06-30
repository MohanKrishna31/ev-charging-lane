import React, { useState } from "react";
import { Search, Plus, Edit2, RefreshCw, Power, Shield, X } from "lucide-react";
import { fetchOperators } from "../services/operators";
import "../styles/Operators.css";

const Operators: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const operators = fetchOperators();

  const roleCounts = operators.reduce(
    (acc, op) => {
      acc[op.role] = (acc[op.role] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const tabs = [
    { id: "All", label: "All" },
    {
      id: "Super Admin",
      label: `Super Admin (${roleCounts["Super Admin"] || 0})`,
    },
    {
      id: "Vendor Admin",
      label: `Vendor Admin (${roleCounts["Vendor Admin"] || 0})`,
    },
    {
      id: "Station Operator",
      label: `Station Operator (${roleCounts["Station Operator"] || 0})`,
    },
    {
      id: "Finance Manager",
      label: `Finance Manager (${roleCounts["Finance Manager"] || 0})`,
    },
    {
      id: "Support Agent",
      label: `Support Agent (${roleCounts["Support Agent"] || 0})`,
    },
  ];

  const filteredOperators = operators.filter((op) => {
    const matchesTab = activeTab === "All" || op.role === activeTab;
    const matchesSearch =
      op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getRoleClass = (role: string) => {
    return role.toLowerCase().replace(" ", "-");
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "#9333ea",
      "#2563eb",
      "#059669",
      "#d97706",
      "#db2777",
      "#0284c7",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="operators-container">
      <div className="operators-header-row">
        <div className="operators-title-stack">
          <h2>User Management</h2>
          <p>{operators.length} users across all roles</p>
        </div>
        <button
          className="add-user-btn"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="operators-filter-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`operator-tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="operators-search-bar">
        <Search size={18} className="operators-search-icon" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="operators-table-container">
        <table className="operators-table">
          <thead>
            <tr>
              <th>USER</th>
              <th>ROLE</th>
              <th>VENDOR</th>
              <th>LAST LOGIN</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredOperators.map((op) => (
              <tr key={op.id}>
                <td>
                  <div className="user-info-cell">
                    <div
                      className="vendor-user-avatar"
                      style={{ 
                        color: getAvatarColor(op.name),
                        backgroundColor: `${getAvatarColor(op.name)}20`
                      }}
                    >
                      {op.initials}
                    </div>
                    <div className="user-details">
                      <span className="user-name">{op.name}</span>
                      <span className="user-email">{op.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={`role-pill ${getRoleClass(op.role)}`}>
                    <Shield size={12} /> {op.role}
                  </div>
                </td>
                <td className="vendor-cell">{op.vendor}</td>
                <td className="date-cell">{op.lastLogin}</td>
                <td>
                  <div
                    className={`status-indicator ${op.status.toLowerCase()}`}
                  >
                    <span
                      className={`status-dot ${op.status.toLowerCase()}`}
                    ></span>
                    <span className={`status-text ${op.status.toLowerCase()}`}>
                      {op.status}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-icon-btn" title="Edit">
                      <Edit2 size={15} />
                    </button>
                    <button className="action-icon-btn" title="Reset Password">
                      <RefreshCw size={15} />
                    </button>
                    <button
                      className={`action-icon-btn ${op.status === "Active" ? "danger" : "success"}`}
                      title="Toggle Status"
                    >
                      <Power size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddUserModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New User</h3>
              <button
                className="close-modal-btn"
                onClick={() => setIsAddUserModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Rajesh Kumar" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="user@evlane.io" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Role</label>
                  <select>
                    <option>Super Admin</option>
                    <option>Vendor Admin</option>
                    <option>Station Operator</option>
                    <option>Finance Manager</option>
                    <option>Support Agent</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Vendor</label>
                  <select>
                    <option>—</option>
                    <option>ChargePoint Networks</option>
                    <option>GreenCharge India</option>
                    <option>EcoVolt Solutions</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Temporary Password</label>
                <input type="password" placeholder="Min 8 characters" />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setIsAddUserModalOpen(false)}
              >
                Cancel
              </button>
              <button className="add-user-btn">Create User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operators;
