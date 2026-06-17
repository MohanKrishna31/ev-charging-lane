import { useEffect, useState } from "react";
import { Search, Plus, X, Edit2, RotateCw, Power, Shield } from "lucide-react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { userService } from "../services/userService";
import type { UserManagementItem, UserRoleVariant, NewUserFormPayload } from "../types/users";
import "../styles/Users.css";

const InitialFormPayload: NewUserFormPayload = {
  fullName: "",
  email: "",
  role: "Super Admin",
  vendorName: "—",
  temporaryPassword: ""
};

const Users = () => {
  const [usersList, setUsersList] = useState<UserManagementItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("All");
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formState, setFormState] = useState<NewUserFormPayload>(InitialFormPayload);

  useEffect(() => {
    userService.fetchUsersState().then((data) => setUsersList(data));
  }, []);

  const getRoleCountLabel = (roleName: string) => {
    if (roleName === "All") return usersList.length;
    return usersList.filter((u) => vulateRoleClassString(u.role) === vulateRoleClassString(roleName)).length;
  };

  function vulateRoleClassString(role: string): string {
    return role.toLowerCase().replace(" ", "");
  }

  const handleCreateNewUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const simulatedAccount: UserManagementItem = {
      id: `USR00${usersList.length + 1}`,
      fullName: formState.fullName || "New Platform Administrator",
      email: formState.email || "user@evlane.io",
      role: formState.role,
      vendorName: formState.role.includes("Vendor") || formState.role.includes("Operator") ? formState.vendorName : "—",
      lastLogin: "—",
      status: "Active"
    };

    setUsersList((prev) => [...prev, simulatedAccount]);
    setFormState(InitialFormPayload);
    setIsCreateModalOpen(false);
  };

  const handlePowerSuspendToggle = (userId: string) => {
    setUsersList((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
      )
    );
  };

  const filteredUsers = usersList.filter((user) => {
    const matchesRole = selectedRoleFilter === "All" || vulateRoleClassString(user.role) === vulateRoleClassString(selectedRoleFilter);
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesRole && matchesSearch;
  });

  const uniqueRoleFilterPills = ["All", "Super Admin", "Vendor Admin", "Station Operator", "Finance Manager", "Support Agent"];

  return (
    <AdminLayout pageTitle="Users">
      <div className="users-workspace-view">
        

        <div className="users-master-header-row">
          <div className="users-title-stack">
            <h2>User Management</h2>
            <p>{usersList.length} users across all operational network roles</p>
          </div>
          <button 
            type="button" 
            className="users-add-action-green-btn"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Add User</span>
          </button>
        </div>


        <div className="users-operations-ribbon-bar">
          <div className="users-role-filters-flex-row">
            {uniqueRoleFilterPills.map((role) => {
              const isActive = selectedRoleFilter === role;
              return (
                <button
                  key={role}
                  type="button"
                  className={`user-filter-pill-trigger-btn ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedRoleFilter(role)}
                >
                  <span>{role}</span>
                  <span>({getRoleCountLabel(role)})</span>
                </button>
              );
            })}
          </div>

          <div className="users-search-input-frame-box">
            <Search size={15} className="users-lens-icon-positional" />
            <input 
              type="text" 
              className="users-search-control-input-field"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>


        <div className="users-table-scroller-panel no-scrollbar">
          <table className="users-html-data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Vendor</th>
                <th>Last Login</th>
                <th>Status</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                    No system staff personnel accounts match the designated query addresses.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const initialTokens = user.fullName.split(" ").map(n => n[0]).join("").toUpperCase();
                  return (
                    <tr key={user.id}>
                      <td>
                        <div className="users-stacked-identity-block">
                          <div className="users-avatar-circle-shield">{initialTokens}</div>
                          <div className="users-meta-text-lines-stack">
                            <span className="username-primary-line">{user.fullName}</span>
                            <span className="email-secondary-line">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`user-role-capsule-badge ${vulateRoleClassString(user.role)}`}>
                          <Shield size={11} strokeWidth={2.5} />
                          <span>{user.role}</span>
                        </span>
                      </td>
                      <td>
                        <span className="username-primary-line" style={{ fontWeight: 500, opacity: user.vendorName === "—" ? 0.5 : 1 }}>
                          {user.vendorName}
                        </span>
                      </td>
                      <td><span className="email-secondary-line" style={{ fontSize: "13px" }}>{user.lastLogin}</span></td>
                      <td>
                        <span className={`user-status-inline-row-dot-flex ${user.status.toLowerCase()}`}>
                          <span className="status-micro-dot">●</span>
                          <span>{user.status}</span>
                        </span>
                      </td>
                      <td>
                        <div className="user-row-actions-flex-cell-group">
                          <button type="button" className="user-row-action-icon-trigger-btn edit" aria-label="Modify Profile Fields"><Edit2 size={13} /></button>
                          

                          <button type="button" className="user-row-action-icon-trigger-btn edit" aria-label="Reset Password Credentials"><RotateCw size={13} /></button>
                          
                          <button 
                            type="button" 
                            className="user-row-action-icon-trigger-btn suspend" 
                            aria-label="Toggle Power Access State"
                            onClick={() => handlePowerSuspendToggle(user.id)}
                          >
                            <Power size={13} style={{ color: user.status === "Inactive" ? "#24cb71" : "" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>


        {isCreateModalOpen && (
          <div className="users-modal-overlay-backdrop-shield" onClick={() => setIsCreateModalOpen(false)}>
            <div className="user-creation-modal-panel-box" onClick={(e) => e.stopPropagation()}>
              
              <div className="modal-header-headline-row">
                <h3>Create New User</h3>
                <button type="button" className="modal-close-cross-btn" onClick={() => setIsCreateModalOpen(false)}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateNewUserSubmit}>
                <div className="modal-body-form-fields-container">
                  
                  <div className="modal-form-grid-split-row">
                    <div className="modal-form-input-block-stack">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        className="modal-form-text-input-field" 
                        required 
                        placeholder="Full Name"
                        value={formState.fullName}
                        onChange={(e) => setFormState(p => ({ ...p, fullName: e.target.value }))}
                      />
                    </div>
                    <div className="modal-form-input-block-stack">
                      <label>Email</label>
                      <input 
                        type="email" 
                        className="modal-form-text-input-field" 
                        required 
                        placeholder="user@evlane.io"
                        value={formState.email}
                        onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="modal-form-grid-split-row">
                    <div className="modal-form-input-block-stack">
                      <label>Role</label>
                      <select 
                        className="modal-form-dropdown-select-control"
                        value={formState.role}
                        onChange={(e) => setFormState(p => ({ ...p, role: e.target.value as UserRoleVariant }))}
                      >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Vendor Admin">Vendor Admin</option>
                        <option value="Station Operator">Station Operator</option>
                        <option value="Finance Manager">Finance Manager</option>
                        <option value="Support Agent">Support Admin</option>
                      </select>
                    </div>

                    <div className="modal-form-input-block-stack">
                      <label>Vendor</label>
                      <select 
                        className="modal-form-dropdown-select-control"
                        disabled={formState.role === "Super Admin" || formState.role === "Finance Manager" || formState.role === "Support Agent"}
                        value={formState.vendorName}
                        onChange={(e) => setFormState(p => ({ ...p, vendorName: e.target.value }))}
                      >
                        <option value="—">—</option>
                        <option value="GreenCharge India">GreenCharge India</option>
                        <option value="EcoVolt Solutions">EcoVolt Solutions</option>
                        <option value="ChargePoint Networks">ChargePoint Networks</option>
                        <option value="PowerUp EV">PowerUp EV</option>
                      </select>
                    </div>
                  </div>

                  <div className="modal-form-input-block-stack full-width-span">
                    <label>Temporary Password</label>
                    <input 
                      type="text" 
                      className="modal-form-text-input-field" 
                      placeholder="Min 8 characters"
                      value={formState.temporaryPassword}
                      onChange={(e) => setFormState(p => ({ ...p, temporaryPassword: e.target.value }))}
                    />
                  </div>

                </div>

                <div className="modal-footer-action-buttons-line">
                  <button 
                    type="button" 
                    className="cancel-neutral-trigger-btn" 
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-primary-green-btn">
                    Create User
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Users;