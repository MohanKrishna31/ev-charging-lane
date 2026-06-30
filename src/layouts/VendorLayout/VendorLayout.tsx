import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./VendorLayout.css";

interface VendorLayoutProps {
  children?: React.ReactNode;
}

const VendorLayout: React.FC<VendorLayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div
      className={`vendor-layout ${isDarkMode ? "dark-theme" : "light-theme"}`}
    >
      <Sidebar
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="vendor-main-content">
        <Header />
        <main className="vendor-page-content">{children}</main>
      </div>
    </div>
  );
};

export default VendorLayout;
