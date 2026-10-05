import React, { useState } from 'react';
import { Bell, CheckCheck, CheckCircle2, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EmptyState from '../EmptyState';

export default function InternNotifications() {
  const { getUserNotifications, markAsRead, markAllAsRead } = useApp();
  const [filterState, setFilterState] = useState('All');

  const userNotifications = getUserNotifications();
  const unreadCount = userNotifications.filter(n => n.unread).length;

  const filteredNotifications = userNotifications.filter(n => {
    if (filterState === 'Unread') return n.unread;
    if (filterState === 'Read') return !n.unread;
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Notifications & Activity Alerts
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Real-time updates regarding task assignments, submission approvals, and mentor feedback.
          </p>
        </div>

        {unreadCount > 0 && (
          <button className="btn btn-secondary btn-sm" onClick={markAllAsRead}>
            <CheckCheck size={16} />
            <span>Mark All As Read</span>
          </button>
        )}
      </div>

      {/* Notification Filters */}
      <div className="card" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#77758A', fontSize: '0.84rem', fontWeight: 600 }}>
          <Filter size={14} />
          <span>Filter:</span>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Unread', 'Read'].map(st => (
            <button
              key={st}
              onClick={() => setFilterState(st)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: filterState === st ? '1px solid #8B7CF6' : '1px solid #E5E2F0',
                backgroundColor: filterState === st ? '#EEECFA' : '#FFFFFF',
                color: filterState === st ? '#6D61D9' : '#77758A',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {st} {st === 'Unread' && unreadCount > 0 ? `(${unreadCount})` : ''}
            </button>
          ))}
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <EmptyState 
          icon={<Bell size={40} style={{ color: '#8B7CF6' }} />}
          title="No Notifications Found"
          description={`There are no notifications matching the filter "${filterState}".`}
          actionLabel={filterState !== 'All' ? "Show All Notifications" : null}
          onAction={filterState !== 'All' ? () => setFilterState('All') : null}
        />
      ) : (
        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredNotifications.map(n => (
              <div 
                key={n.id}
                onClick={() => n.unread && markAsRead(n.id)}
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  backgroundColor: n.unread ? '#EEECFA' : '#F7F6FC',
                  borderLeft: n.unread ? '4px solid #8B7CF6' : '4px solid #DDD8F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  cursor: n.unread ? 'pointer' : 'default',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: n.unread ? 800 : 700, color: '#29283A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{n.title}</span>
                    {n.unread && (
                      <span className="badge badge-in-progress" style={{ backgroundColor: '#8B7CF6', color: '#FFFFFF', fontSize: '0.68rem', padding: '2px 6px' }}>
                        NEW
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#77758A', marginTop: '4px', lineHeight: 1.4 }}>{n.desc}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#8B7CF6', fontWeight: 600 }}>{n.time}</span>
                  {n.unread && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                      style={{ background: 'none', border: 'none', fontSize: '0.75rem', color: '#6D61D9', cursor: 'pointer', fontWeight: 700 }}
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
