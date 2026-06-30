import React from 'react';
import { LayoutDashboard, MapPin, Zap, Activity, CreditCard, Users, BarChart, Battery, ShieldCheck, Moon, Sun, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  isDarkMode?: boolean;
  toggleTheme?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/vendor/dashboard' },
  { id: 'stations', label: 'Stations', icon: MapPin, path: '/vendor/stations' },
  { id: 'chargers', label: 'Chargers', icon: Zap, path: '/vendor/chargers' },
  { id: 'sessions', label: 'Sessions', icon: Activity, path: '/vendor/sessions' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: '/vendor/payments' },
  { id: 'operators', label: 'Operators', icon: Users, path: '/vendor/operators' },
  { id: 'reports', label: 'Reports', icon: BarChart, path: '/vendor/reports' }
];

const Sidebar: React.FC<SidebarProps> = ({ isDarkMode = true, toggleTheme, isCollapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("ev_lane_session");
    navigate("/");
  };

  return (
    <aside className={`vendor-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {onToggleCollapse && (
        <button className="sidebar-collapse-btn" onClick={onToggleCollapse}>
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      )}

      <div className="sidebar-logo-container">
        <div className="sidebar-logo-icon">
          <Battery size={20} color="#24cb71" />
        </div>
        <div className="sidebar-logo-text">
          <span className="vendor-brand">EV Lane</span>
          <span className="vendor-subtitle">Admin Platform</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.id} 
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            <ShieldCheck size={18} color="#24cb71" />
          </div>
          <div className="user-info-header">
             <span className="user-name-header" style={{color: 'white', fontWeight: 600}}>Arjun Mehta</span>
             <span className="user-role-header" style={{color: '#9ca3af'}}>Vendor Admin</span>
          </div>
        </div>
        <div className="sidebar-footer-actions">
          {toggleTheme && (
            <button className="footer-btn" onClick={toggleTheme}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          )}
          <button className="footer-btn sign-out-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
