import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  FileCheck2, 
  Users, 
  BarChart3, 
  User, 
  Settings, 
  Home,
  HelpCircle,
  LogOut
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, activeRole }) {
  const getNavItems = () => {
    const common = [
      { id: 'landing', label: 'Home Page', icon: <Home size={18} /> },
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
      { id: 'projects', label: 'Projects Catalog', icon: <FolderKanban size={18} /> },
      { id: 'tasks', label: 'Tasks & Milestones', icon: <CheckSquare size={18} /> },
    ];

    if (activeRole === 'student') {
      return [
        ...common,
        { id: 'profile', label: 'My Profile & CV', icon: <User size={18} /> },
      ];
    } else if (activeRole === 'mentor') {
      return [
        ...common,
        { id: 'submissions', label: 'Review Submissions', icon: <FileCheck2 size={18} /> },
        { id: 'students', label: 'Assigned Interns', icon: <Users size={18} /> },
      ];
    } else {
      // Admin
      return [
        ...common,
        { id: 'users', label: 'User Directory', icon: <Users size={18} /> },
        { id: 'analytics', label: 'Program Analytics', icon: <BarChart3 size={18} /> },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-label">Navigation</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-label" style={{ marginTop: '24px' }}>Account & System</div>
        <nav className="sidebar-nav">
          <button
            className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>Profile & Account</span>
          </button>
          <button
            className={`sidebar-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>Preferences</span>
          </button>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-item" style={{ width: '100%', border: 'none', background: 'transparent' }}>
          <HelpCircle size={18} />
          <span>Support & Guide</span>
        </button>
        <button 
          className="sidebar-item" 
          style={{ width: '100%', border: 'none', background: 'transparent', color: '#E88989' }}
          onClick={() => setActiveTab('landing')}
        >
          <LogOut size={18} />
          <span>Exit Workspace</span>
        </button>
      </div>
    </aside>
  );
}
