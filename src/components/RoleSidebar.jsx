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
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div className="sidebar-label" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', paddingLeft: 0 }}>
            {role === 'admin' ? '🛡️ Admin Workspace' : role === 'mentor' ? '👨‍🏫 Mentor Portal' : '🎓 Intern Workspace'}
          </div>

          <button 
            className="icon-btn mobile-toggle-btn"
            onClick={onCloseMobile}
            style={{ width: '32px', height: '32px', border: 'none', background: '#EEECFA', color: '#6D61D9' }}
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
              style={{ textDecoration: 'none' }}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div style={{ borderTop: '1px solid #E5E2F0', marginTop: '10px', paddingTop: '10px' }}>
            <button 
              className="sidebar-item" 
              style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', color: '#77758A' }}
              onClick={() => { handleNavClick(); navigate('/'); }}
            >
              <Sparkles size={18} />
              <span>Landing Page</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}

