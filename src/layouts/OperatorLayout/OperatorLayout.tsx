import React, { useState } from "react";
import Sidebar from "./OperatorSidebar";
import Header from "./OperatorHeader";
import "./OperatorLayout.css";

interface OperatorLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const OperatorLayout: React.FC<OperatorLayoutProps> = ({ children, pageTitle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("operatorTheme") === "dark";
  });

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("operatorTheme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <div className={`operator-dashboard-root dashboard ${isDarkMode ? "dark-mode" : ""}`}>
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)} 
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />
      
      <main className={`main-content ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <Header 
          title={pageTitle} 
          onMenuClick={() => setIsMobileOpen(true)} 
        />
        {children}
      </main>
    </div>
  );
};

export default OperatorLayout;
