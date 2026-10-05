import React, { useState } from 'react';
import { Search, Bell, Sparkles, UserCheck, Shield, GraduationCap, LogIn, ChevronDown } from 'lucide-react';
import { MOCK_USER, MOCK_NOTIFICATIONS } from '../mockData';
import GlobalSearch from './GlobalSearch';

export default function Navbar({ activeRole, setActiveRole, activeTab, setActiveTab, onOpenAuth }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="navbar">
      {/* Brand Section */}
      <div className="navbar-brand" onClick={() => setActiveTab('landing')}>
        <div className="brand-icon-wrapper">
          <Sparkles size={22} />
        </div>
        <div>
          <span>Intern</span>
          <span style={{ color: '#8B7CF6' }}>Hub</span>
        </div>
      </div>

      {/* Global Search */}
      <GlobalSearch />

      {/* Actions */}
      <div className="navbar-actions">
        {/* Notifications Popover Toggle */}
        <div className="icon-btn-wrapper">
          <button 
            className="icon-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-dot" />}
          </button>

          {showNotifications && (
            <div 
              className="soft-card animate-fade-in" 
              style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                width: '320px',
                padding: '16px',
                zIndex: 60,
                boxShadow: 'var(--shadow-dropdown)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '0.9375rem', color: '#29283A' }}>Notifications</h4>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead} 
                    style={{ background: 'none', border: 'none', fontSize: '0.75rem', color: '#8B7CF6', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Mark read
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '260px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div 
                    key={n.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      backgroundColor: n.unread ? '#EEECFA' : '#F7F6FC',
                      borderLeft: n.unread ? '3px solid #8B7CF6' : '3px solid transparent',
                    }}
                  >
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#29283A' }}>{n.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '2px' }}>{n.desc}</div>
                    <div style={{ fontSize: '0.7rem', color: '#9A98A8', marginTop: '4px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Auth / User Profile */}
        <div className="user-profile-badge" onClick={() => setActiveTab('profile')}>
          <div className="avatar">{MOCK_USER.avatar}</div>
          <div className="user-info">
            <span className="user-name">{MOCK_USER.name}</span>
            <span className="user-role-label" style={{ textTransform: 'capitalize' }}>
              {activeRole} Perspective
            </span>
          </div>
          <ChevronDown size={14} style={{ color: '#77758A', marginLeft: '4px' }} />
        </div>

        {/* Auth Sign In Modal Launcher */}
        <button className="btn btn-secondary btn-sm" onClick={onOpenAuth}>
          <LogIn size={15} />
          Sign In
        </button>
      </div>
    </header>
  );
}
