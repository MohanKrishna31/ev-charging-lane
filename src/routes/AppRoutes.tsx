import { Routes, Route } from "react-router-dom";
import Login from "../modules/account/pages/Login";
import ForgotPassword from "../modules/account/pages/ForgotPassword";
import VerifyOTP from "../modules/account/pages/VerifyOTP";
import ResetPassword from "../modules/account/pages/ResetPassword";
import Dashboard from "../modules/superadmin/pages/Dashboard";
import Vendors from "../modules/superadmin/pages/Vendors";
import Stations from "../modules/superadmin/pages/Stations";
import Chargers from "../modules/superadmin/pages/Chargers";
import Sessions from "../modules/superadmin/pages/Sessions";
import Payments from "../modules/superadmin/pages/Payments";
import Users from "../modules/superadmin/pages/Users";
import Reports from "../modules/superadmin/pages/Reports";
import Notifications from "../modules/superadmin/pages/Notifications";
import Settings from "../modules/superadmin/pages/Settings";


import LiveSessions from "../modules/operator/pages/LiveSessions";
import OperatorStations from "../modules/operator/pages/Stations";
import OperatorChargers from "../modules/operator/pages/Chargers";
import Alerts from "../modules/operator/pages/Alerts";  
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Super Admin Workspace Paths */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      
      {/* Vendors Management Platform Links */}
      <Route path="/admin/vendors" element={<Vendors />} />
      <Route path="/admin/vendors/add/step1" element={<Vendors />} />
      <Route path="/admin/vendors/add/step2" element={<Vendors />} />
      <Route path="/admin/vendors/add/step3" element={<Vendors />} />
      <Route path="/admin/vendors/view/:vendorId" element={<Vendors />} />

      {/* Stations Module Registries */}
      <Route path="/admin/stations" element={<Stations />} />
      <Route path="/admin/stations/add" element={<Stations />} />

      {/* Chargers Module Registries */} 
      <Route path="/admin/chargers" element={<Chargers />} />
      <Route path="/admin/chargers/add" element={<Chargers />} />

      {/* Sessions Module Registries */}
      <Route path="/admin/sessions" element={<Sessions />} />

      {/* Payments Module Registries */}
      <Route path="/admin/payments" element={<Payments />} />

      {/* Users Module Registries */}
      <Route path="/admin/users" element={<Users />} />

      {/* Reports Module Registries */}
      <Route path="/admin/reports" element={<Reports />} />

      {/* Notifications Module Registries */}
      <Route path="/admin/notifications" element={<Notifications />} />

      {/* Settings Module Registries */}
      <Route path="/admin/settings" element={<Settings />} />

      
      {/* Operator Dashboard Module Registries */}
      <Route path="/operator/livesessions" element={<LiveSessions />} />

      {/* Operator Stations Module Registries */}
      <Route path="/operator/stations" element={<OperatorStations />} />

      {/* Operator Chargers Module Registries */}
      <Route path="/operator/chargers" element={<OperatorChargers />} />

      {/* Operator Alerts Module Registries */}
      <Route path="/operator/alerts" element={<Alerts />} />
    </Routes>
  );
};

export default AppRoutes;