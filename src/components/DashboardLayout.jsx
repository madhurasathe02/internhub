import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RoleNavbar from './RoleNavbar';
import RoleSidebar from './RoleSidebar';

export default function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(prev => !prev);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="app-container">
      <RoleNavbar 
        onToggleMobileSidebar={toggleMobileSidebar} 
        isMobileSidebarOpen={mobileSidebarOpen}
      />
      <div className="app-main-layout">
        <RoleSidebar 
          mobileOpen={mobileSidebarOpen} 
          onCloseMobile={closeMobileSidebar} 
        />
        {mobileSidebarOpen && (
          <div 
            className="sidebar-backdrop" 
            onClick={closeMobileSidebar} 
            aria-label="Close menu drawer"
          />
        )}
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

