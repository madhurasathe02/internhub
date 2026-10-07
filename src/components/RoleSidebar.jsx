import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Briefcase, 
  FolderKanban, 
  CheckSquare, 
  Megaphone, 
  BarChart3, 
  User, 
  Settings, 
  FileCheck2, 
  MessageSquare, 
  Send, 
  Bell, 
  LogOut,
  Sparkles,
  Award,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RoleSidebar({ mobileOpen, onCloseMobile }) {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  if (!user) return null;

  const role = user.role; // 'admin' | 'mentor' | 'student'

  // Admin Links
  const adminNav = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/admin/students', label: 'Students', icon: <Users size={18} /> },
    { path: '/admin/mentors', label: 'Mentors', icon: <UserCheck size={18} /> },
    { path: '/admin/internships', label: 'Internships', icon: <Briefcase size={18} /> },
    { path: '/admin/projects', label: 'Projects', icon: <FolderKanban size={18} /> },
    { path: '/admin/tasks', label: 'Tasks', icon: <CheckSquare size={18} /> },
    { path: '/admin/certificates', label: 'Certificates', icon: <Award size={18} /> },
    { path: '/admin/announcements', label: 'Announcements', icon: <Megaphone size={18} /> },
    { path: '/admin/reports', label: 'Reports', icon: <BarChart3 size={18} /> },
    { path: '/admin/profile', label: 'Profile', icon: <User size={18} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  // Mentor Links
  const mentorNav = [
    { path: '/mentor/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/mentor/internships', label: 'Internships', icon: <Briefcase size={18} /> },
    { path: '/mentor/interns', label: 'My Interns', icon: <Users size={18} /> },
    { path: '/mentor/projects', label: 'Projects', icon: <FolderKanban size={18} /> },
    { path: '/mentor/tasks', label: 'Tasks', icon: <CheckSquare size={18} /> },
    { path: '/mentor/submissions', label: 'Submissions', icon: <FileCheck2 size={18} /> },
    { path: '/mentor/feedback', label: 'Feedback / Review', icon: <MessageSquare size={18} /> },
    { path: '/mentor/certificates', label: 'Certificates', icon: <Award size={18} /> },
    { path: '/mentor/announcements', label: 'Announcements', icon: <Megaphone size={18} /> },
    { path: '/mentor/profile', label: 'Profile', icon: <User size={18} /> },
    { path: '/mentor/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  // Intern/Student Links
  const internNav = [
    { path: '/intern/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/intern/internship', label: 'My Internship', icon: <Briefcase size={18} /> },
    { path: '/intern/projects', label: 'My Projects', icon: <FolderKanban size={18} /> },
    { path: '/intern/tasks', label: 'My Tasks', icon: <CheckSquare size={18} /> },
    { path: '/intern/submit', label: 'Submit Work', icon: <Send size={18} /> },
    { path: '/intern/feedback', label: 'Feedback', icon: <MessageSquare size={18} /> },
    { path: '/intern/certificate', label: 'My Certificate', icon: <Award size={18} /> },
    { path: '/intern/notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { path: '/intern/profile', label: 'Profile', icon: <User size={18} /> },
    { path: '/intern/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  const currentNav = role === 'admin' ? adminNav : role === 'mentor' ? mentorNav : internNav;

  const handleLogout = () => {
    if (onCloseMobile) onCloseMobile();
    logout();
    navigate('/');
  };

  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div className="sidebar-label" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '6px', color: '#8C87B0', fontSize: '0.72rem', fontWeight: 800 }}>
              {role === 'admin' ? 'ADMIN WORKSPACE' : role === 'mentor' ? 'MENTOR WORKSPACE' : 'INTERN WORKSPACE'}
            </div>

            <button 
              className="icon-btn mobile-toggle-btn"
              onClick={onCloseMobile}
              style={{ width: '32px', height: '32px', border: 'none', background: 'rgba(238, 236, 250, 0.8)', color: '#6C47FF' }}
              aria-label="Close menu drawer"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="sidebar-nav">
            {currentNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                style={{ textDecoration: 'none', position: 'relative' }}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.label === 'Notifications' && (
                  <span 
                    style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      backgroundColor: '#EC4899', 
                      marginLeft: 'auto',
                      boxShadow: '0 0 8px rgba(236, 72, 153, 0.5)'
                    }} 
                  />
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Landing Page Option & Soft Pastel Leaf Decoration */}
        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <button 
            className="sidebar-item" 
            style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', color: '#79759B' }}
            onClick={() => { handleNavClick(); navigate('/'); }}
          >
            <Sparkles size={18} style={{ color: '#6C47FF' }} />
            <span>Landing Page</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

