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

        {/* Brand Section - Matching Uploaded Photo Logo */}
        <div className="navbar-brand" onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : user.role === 'mentor' ? '/mentor/dashboard' : '/intern/dashboard')}>
          <div className="brand-icon-wrapper" style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #6C47FF 100%)', borderRadius: '14px', width: '42px', height: '42px', boxShadow: '0 6px 18px rgba(108, 71, 255, 0.35)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 7.5C8.88071 7.5 10 8.61929 10 10C10 11.3807 8.88071 12.5 7.5 12.5C6.11929 12.5 5 11.3807 5 10C5 8.61929 6.11929 7.5 7.5 7.5Z" fill="white" />
              <path d="M16.5 11.5C17.8807 11.5 19 12.6193 19 14C19 15.3807 17.8807 16.5 16.5 16.5C15.1193 16.5 14 15.3807 14 14C14 12.6193 15.1193 11.5 16.5 11.5Z" fill="white" />
              <path d="M9.5 10.5C10.5 11.8 13.5 13.8 14.5 14.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '1.4rem', fontWeight: 800 }}>
            <span style={{ color: '#1E1B3A' }}>Intern</span>
            <span style={{ color: '#6C47FF' }}>Hub</span>
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
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #E5E2F0', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E1B3A', margin: 0 }}>Notifications</h4>
                  {unreadCount > 0 ? (
                    <span className="badge badge-in-progress" style={{ backgroundColor: '#EEECFA', color: '#6C47FF', fontSize: '0.72rem', padding: '2px 8px' }}>
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
                      color: '#6C47FF', 
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
                    icon={<Bell size={28} style={{ color: '#6C47FF' }} />}
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
                        borderRadius: '12px',
                        backgroundColor: n.unread ? 'rgba(238, 236, 250, 0.8)' : 'rgba(247, 246, 252, 0.6)',
                        borderLeft: n.unread ? '4px solid #6C47FF' : '4px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: n.unread ? 800 : 600, color: '#1E1B3A' }}>
                          {n.title}
                        </div>
                        {n.unread && (
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6C47FF', flexShrink: 0, marginTop: '4px' }} />
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '3px', lineHeight: 1.35 }}>
                        {n.desc}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: '#A19DBE', marginTop: '6px' }}>
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
                  style={{ background: 'none', border: 'none', fontSize: '0.78125rem', color: '#6C47FF', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>View All Portal Notifications</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge - Matching Uploaded Screenshot */}
        <div 
          className="user-profile-badge" 
          onClick={() => navigate(user.role === 'admin' ? '/admin/profile' : user.role === 'mentor' ? '/mentor/profile' : '/intern/profile')}
        >
          <div className="avatar" style={{ background: 'linear-gradient(135deg, #A886FF 0%, #6C47FF 100%)', width: '38px', height: '38px', fontSize: '0.875rem', fontWeight: 800 }}>
            {user.avatar || 'SH'}
          </div>
          <div className="user-info hide-mobile" style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="user-name" style={{ color: '#1E1B3A', fontWeight: 700 }}>{user.name}</span>
              <ChevronDown size={14} style={{ color: '#79759B' }} />
            </div>
            <span className="user-role-label" style={{ textTransform: 'capitalize', color: '#79759B', fontSize: '0.72rem' }}>
              {user.role === 'student' ? 'Student' : user.role} Account
            </span>
          </div>
        </div>

        {/* Sign Out Button - Matching Uploaded Photo Pink Pill */}
        <button 
          className="btn btn-outline btn-sm" 
          onClick={handleLogout} 
          style={{ 
            color: '#EC4899', 
            borderColor: 'rgba(244, 114, 182, 0.35)',
            backgroundColor: 'rgba(253, 242, 248, 0.6)',
            borderRadius: '9999px',
            padding: '7px 16px',
            fontWeight: 700
          }}
        >
          <LogOut size={15} style={{ color: '#EC4899' }} />
          <span className="hide-mobile">Sign Out</span>
        </button>
      </div>
    </header>
  );
}

