import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Sparkles, LogOut, ChevronDown, UserCheck, Shield, GraduationCap, CheckCheck, ExternalLink, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import EmptyState from './EmptyState';
import GlobalSearch from './GlobalSearch';

export default function RoleNavbar({ onToggleMobileSidebar, isMobileSidebarOpen }) {
  const { user, logout, notifications, getUserNotifications, markAsRead, markAllAsRead, login } = useApp();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

  const userNotifications = getUserNotifications();
  const unreadCount = userNotifications.filter(n => n.unread).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNotificationClick = (notif) => {
    if (notif.unread) {
      markAsRead(notif.id);
    }
    // Navigate based on notification content if appropriate
    setShowNotifications(false);
    if (user?.role === 'student') {
      if (notif.title.includes('Task') || notif.title.includes('Submission') || notif.title.includes('Changes')) {
        navigate('/intern/tasks');
      } else if (notif.title.includes('Feedback')) {
        navigate('/intern/feedback');
      } else if (notif.title.includes('Project')) {
        navigate('/intern/projects');
      } else {
        navigate('/intern/notifications');
      }
    } else if (user?.role === 'mentor') {
      if (notif.title.includes('Submission') || notif.title.includes('Resubmission')) {
        navigate('/mentor/submissions');
      } else {
        navigate('/mentor/dashboard');
      }
    }
  };

  if (!user) return null;

  return (
    <header className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Mobile Sidebar Hamburger Toggle */}
        <button 
          className="mobile-toggle-btn icon-btn"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation drawer"
        >
          {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Brand Section */}
        <div className="navbar-brand" onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : user.role === 'mentor' ? '/mentor/dashboard' : '/intern/dashboard')}>
          <div className="brand-icon-wrapper">
            <Sparkles size={20} />
          </div>
          <div>
            <span>Intern</span>
            <span style={{ color: '#8B7CF6' }}>Hub</span>
          </div>
        </div>
      </div>

      {/* Global Search */}
      <GlobalSearch />

      {/* Actions & Profile */}
      <div className="navbar-actions">
        {/* Notifications Popover Toggle */}
        <div className="icon-btn-wrapper" style={{ position: 'relative' }}>
          <button 
            className="icon-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-dot" />}
          </button>

          {showNotifications && (
            <div 
              className="soft-card animate-fade-in" 
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '320px',
                maxWidth: '90vw',
                padding: '16px',
                zIndex: 100,
                boxShadow: 'var(--shadow-dropdown)',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-secondary)'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #E5E2F0', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#29283A', margin: 0 }}>Notifications</h4>
                  {unreadCount > 0 ? (
                    <span className="badge badge-in-progress" style={{ backgroundColor: '#EEECFA', color: '#6D61D9', fontSize: '0.72rem', padding: '2px 8px' }}>
                      {unreadCount} Unread
                    </span>
                  ) : (
                    <span className="badge badge-completed" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                      All Read ✓
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead} 
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      fontSize: '0.75rem', 
                      color: '#8B7CF6', 
                      cursor: 'pointer', 
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px' 
                    }}
                  >
                    <CheckCheck size={14} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              {/* Scrollable Notifications List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                {userNotifications.length === 0 ? (
                  <EmptyState 
                    icon={<Bell size={28} style={{ color: '#8B7CF6' }} />}
                    title="No Notifications"
                    description="You're all caught up! No notifications for your account."
                  />
                ) : (
                  userNotifications.map(n => (
                    <div 
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        backgroundColor: n.unread ? '#EEECFA' : '#F7F6FC',
                        borderLeft: n.unread ? '4px solid #8B7CF6' : '4px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: n.unread ? 800 : 600, color: '#29283A' }}>
                          {n.title}
                        </div>
                        {n.unread && (
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B7CF6', flexShrink: 0, marginTop: '4px' }} />
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '3px', lineHeight: 1.35 }}>
                        {n.desc}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: '#9A98A8', marginTop: '6px' }}>
                        {n.time}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Dropdown Footer Link */}
              <div style={{ marginTop: '12px', borderTop: '1px solid #E5E2F0', paddingTop: '10px', textAlign: 'center' }}>
                <button 
                  onClick={() => {
                    setShowNotifications(false);
                    navigate(user.role === 'student' ? '/intern/notifications' : user.role === 'mentor' ? '/mentor/announcements' : '/admin/announcements');
                  }}
                  style={{ background: 'none', border: 'none', fontSize: '0.78125rem', color: '#8B7CF6', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>View All Portal Notifications</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge */}
        <div 
          className="user-profile-badge" 
          onClick={() => navigate(user.role === 'admin' ? '/admin/profile' : user.role === 'mentor' ? '/mentor/profile' : '/intern/profile')}
        >
          <div className="avatar">{user.avatar || 'US'}</div>
          <div className="user-info hide-mobile">
            <span className="user-name">{user.name}</span>
            <span className="user-role-label" style={{ textTransform: 'capitalize' }}>
              {user.role} Account
            </span>
          </div>
        </div>

        {/* Sign Out Button */}
        <button className="btn btn-outline btn-sm" onClick={handleLogout} style={{ color: '#E88989', borderColor: '#F5C6C6' }}>
          <LogOut size={15} />
          <span className="hide-mobile">Sign Out</span>
        </button>
      </div>
    </header>
  );
}

