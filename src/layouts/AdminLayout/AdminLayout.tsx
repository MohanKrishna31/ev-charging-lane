import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./AdminLayout.css";

interface AdminLayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageSubtitle?: string;
}

interface StoredUserProfile {
  name: string;
  role: string;
  initials: string;
}

const getInitialUserProfile = (): StoredUserProfile | null => {
  const token = sessionStorage.getItem("ev_lane_auth_token");
  const runtimeUserToken = sessionStorage.getItem("ev_lane_session");
  
  if (!token || !runtimeUserToken) {
    return null;
  }

  try {
    const parsedProfile = JSON.parse(runtimeUserToken);
    const segments = parsedProfile.name ? parsedProfile.name.split(" ") : ["Admin"];
    const computedInitials = segments.length > 1
      ? `${segments[0][0]}${segments[1][0]}`.toUpperCase()
      : `${segments[0][0]}`.toUpperCase();

    return {
      name: parsedProfile.name || "System Admin",
      role: parsedProfile.role || "Super Admin",
      initials: computedInitials,
    };
  } catch (err) {
    console.error("Error reading platform active session credentials:", err);
    return null;
  }
};

const AdminLayout = ({
  children,
  pageTitle,
  pageSubtitle,
}: AdminLayoutProps) => {
  const navigate = useNavigate();
  
  const [currentUser] = useState<StoredUserProfile | null>(() => getInitialUserProfile());
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedThemePreference = localStorage.getItem("ev_lane_theme");
    return savedThemePreference !== null ? savedThemePreference === "dark" : true;
  });
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      console.warn("[SECURITY] Unauthorized route access attempt blocked. Missing or corrupt auth token.");
      sessionStorage.clear();
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("ev_lane_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("ev_lane_theme", "light");
    }
  }, [isDarkMode]);

  if (!currentUser) {
    return null; 
  }

  return (
    <div className={`admin-layout ${isSidebarCollapsed ? "sidebar-minimized" : ""}`}>
      <Sidebar
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        user={currentUser}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="admin-main">
        <Header user={currentUser} title={pageTitle} subtitle={pageSubtitle} />
        <main className="admin-content no-scrollbar">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;