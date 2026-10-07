import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  CheckSquare, 
  Clock, 
  Award, 
  Plus, 
  MessageSquare, 
  ChevronRight,
  Calendar as CalendarIcon,
  FileCheck2,
  AlertCircle,
  Activity,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../StatusBadge';
import DeadlineCalendar from '../DeadlineCalendar';
import { getInternAnalytics, getUpcomingDeadlines, getSystemActivities } from '../../utils/analyticsHelper';

export default function InternOverview() {
  const appState = useApp();
  const { user, projects, tasks, internships, submissions } = appState;
  const navigate = useNavigate();

  const [showCalendarWidget, setShowCalendarWidget] = useState(false);

  const studentId = user?.id || 'usr_01';
  const studentName = user?.name || 'Saloni Honrao';

  const analytics = getInternAnalytics(appState, studentId, studentName);
  const upcomingDeadlines = getUpcomingDeadlines(appState);
  const myActivities = getSystemActivities(appState, 'intern', studentName);

  const {
    myProjectsCount,
    pendingTasksCount,
    submittedTasksCount,
    approvedWorkCount,
    pendingReviewsCount,
    certStatus,
    studentCert
  } = analytics;

  const joinedInternship = internships.find(i => i.joined) || internships[0];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. HERO WELCOME CARD - Translucent Frosted Glass with 3D Laptop Illustration */}
      <div 
        className="soft-card" 
        style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          padding: '32px 36px',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          boxShadow: '0 10px 30px rgba(120, 110, 180, 0.08)'
        }}
      >
        {/* Soft Background Radial Wave Aura */}
        <div 
          style={{ 
            position: 'absolute', 
            right: '-30px', 
            top: '-30px', 
            width: '380px', 
            height: '380px', 
            background: 'radial-gradient(circle, rgba(155, 123, 255, 0.18) 0%, rgba(124, 169, 248, 0.12) 50%, transparent 75%)', 
            borderRadius: '50%', 
            pointerEvents: 'none',
            filter: 'blur(30px)'
          }} 
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Top Bar inside Hero */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '6px 16px', 
                borderRadius: '9999px', 
                backgroundColor: 'rgba(255, 255, 255, 0.85)', 
                color: '#6C47FF', 
                fontSize: '0.8125rem', 
                fontWeight: 700,
                border: '1px solid rgba(220, 215, 245, 0.8)',
                boxShadow: '0 2px 8px rgba(108, 71, 255, 0.08)'
              }}
            >
              <span>🎓</span>
              <span>Student Workspace</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowCalendarWidget(!showCalendarWidget)}
                style={{
                  background: 'rgba(255, 255, 255, 0.75)',
                  color: '#6C47FF',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  borderRadius: '9999px',
                  padding: '9px 20px',
                  fontWeight: 700
                }}
              >
                <CalendarIcon size={16} />
                <span>{showCalendarWidget ? 'Hide Calendar' : 'Deadline Calendar'}</span>
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/intern/submit')}
                style={{
                  background: 'linear-gradient(135deg, #8C65F7 0%, #6B42EE 100%)',
                  borderRadius: '9999px',
                  padding: '9px 22px',
                  fontWeight: 700,
                  boxShadow: '0 6px 20px rgba(108, 71, 255, 0.35)'
                }}
              >
                <Plus size={16} />
                <span>Submit Work</span>
              </button>
            </div>
          </div>

          {/* Hero Content Grid (Text + 3D Laptop Illustration) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1E1B3A', margin: '4px 0 8px', letterSpacing: '-0.03em' }}>
                Welcome back, <span style={{ color: '#6C47FF' }}>{studentName}!</span>
              </h1>
              <p style={{ color: '#79759B', fontSize: '0.95rem', fontWeight: 600 }}>
                Active Internship Track: <strong style={{ color: '#1E1B3A' }}>{joinedInternship ? joinedInternship.title : (user?.internshipTrack || 'Full Stack Web Development')}</strong>
              </p>
            </div>

            {/* 3D Laptop & Desk Visual (Matching Uploaded Screenshot) */}
            <div className="hide-mobile" style={{ position: 'relative', width: '220px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="200" height="110" viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Desk Base */}
                <ellipse cx="100" cy="98" rx="85" ry="10" fill="rgba(108, 71, 255, 0.08)" />
                {/* Laptop Base */}
                <rect x="40" y="80" width="120" height="10" rx="5" fill="#6C47FF" opacity="0.8" />
                <path d="M30 90 L170 90 L160 95 L40 95 Z" fill="#9B7BFF" opacity="0.9" />
                {/* Laptop Screen Frame */}
                <rect x="52" y="25" width="96" height="58" rx="8" fill="#1E1B3A" />
                <rect x="56" y="29" width="88" height="50" rx="5" fill="url(#laptopScreenGrad)" />
                {/* Screen Code Icon */}
                <path d="M88 48 L80 54 L88 60" stroke="#9B7BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M112 48 L120 54 L112 60" stroke="#9B7BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M103 45 L97 63" stroke="#6C47FF" strokeWidth="3" strokeLinecap="round" />
                {/* Potted Plant */}
                <rect x="156" y="65" width="16" height="22" rx="4" fill="#6C47FF" opacity="0.7" />
                <circle cx="160" cy="58" r="8" fill="#10B981" opacity="0.8" />
                <circle cx="168" cy="54" r="9" fill="#34D399" opacity="0.9" />
                <circle cx="164" cy="48" r="7" fill="#059669" />
                <defs>
                  <linearGradient id="laptopScreenGrad" x1="56" y1="29" x2="144" y2="79" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E2EAFF" />
                    <stop offset="1" stopColor="#EAE2FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Progress Bar Container - Matching Uploaded Screenshot */}
          <div 
            style={{ 
              marginTop: '24px', 
              backgroundColor: 'rgba(255, 255, 255, 0.65)', 
              padding: '18px 24px', 
              borderRadius: '20px', 
              border: '1px solid rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
              <span style={{ fontWeight: 700, color: '#1E1B3A' }}>Overall Internship Milestone Progress</span>
              <span style={{ fontWeight: 800, color: '#6C47FF' }}>
                {Math.round((approvedWorkCount / (tasks.length || 1)) * 100)}% Completed
              </span>
            </div>
            <div style={{ width: '100%', height: '12px', backgroundColor: 'rgba(220, 226, 248, 0.7)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${Math.max(10, Math.round((approvedWorkCount / (tasks.length || 1)) * 100))}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #6C47FF 0%, #A886FF 100%)', 
                  borderRadius: '9999px',
                  transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. 5 SUMMARY METRIC CARDS GRID (Exact 5-card row from uploaded photo) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px' }}>
        {/* Card 1: My Projects */}
        <div 
          onClick={() => navigate('/intern/projects')}
          style={{
            background: 'rgba(240, 236, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            borderRadius: '22px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(108, 71, 255, 0.06)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}
          className="soft-card-hover"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: '#E5DCFF', color: '#6C47FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FolderKanban size={20} />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{myProjectsCount || 4}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>My Projects</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Assigned tasks</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#6C47FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>

        {/* Card 2: Pending Tasks */}
        <div 
          onClick={() => navigate('/intern/tasks')}
          style={{
            background: 'rgba(255, 235, 245, 0.75)',
            backdropFilter: 'blur(20px)',
            borderRadius: '22px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(236, 72, 153, 0.06)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}
          className="soft-card-hover"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: '#FFE0EC', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{pendingTasksCount || 2}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>Pending Tasks</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Requires action</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>

        {/* Card 3: Submitted Tasks */}
        <div 
          onClick={() => navigate('/intern/submit')}
          style={{
            background: 'rgba(230, 245, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            borderRadius: '22px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.06)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}
          className="soft-card-hover"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: '#D6F0FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck2 size={20} />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{submittedTasksCount || 0}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>Submitted Tasks</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Total submitted</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>

        {/* Card 4: Approved Work */}
        <div 
          onClick={() => navigate('/intern/feedback')}
          style={{
            background: 'rgba(230, 250, 240, 0.75)',
            backdropFilter: 'blur(20px)',
            borderRadius: '22px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.06)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}
          className="soft-card-hover"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: '#D1FAE5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{approvedWorkCount || 0}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>Approved Work</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Passed evaluation</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>

        {/* Card 5: Pending Reviews */}
        <div 
          onClick={() => navigate('/intern/feedback')}
          style={{
            background: 'rgba(255, 242, 235, 0.75)',
            backdropFilter: 'blur(20px)',
            borderRadius: '22px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(249, 115, 22, 0.06)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}
          className="soft-card-hover"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: '#FFEDD5', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{pendingReviewsCount || 0}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>Pending Reviews</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Under supervisor review</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>
      </div>

      {/* 3. CERTIFICATE STATUS PILL CARD (Bottom left card matching uploaded photo) */}
      <div 
        onClick={() => navigate('/intern/certificate')}
        style={{
          background: 'rgba(240, 236, 255, 0.75)',
          backdropFilter: 'blur(20px)',
          borderRadius: '22px',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          padding: '14px 20px',
          width: 'max-content',
          maxWidth: '300px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(108, 71, 255, 0.06)'
        }}
        className="soft-card-hover"
      >
        <div style={{ width: '40px', height: '40px', borderRadius: '14px', backgroundColor: '#E5DCFF', color: '#6C47FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Award size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E1B3A' }}>
            {certStatus === 'issued' ? 'Issued' : certStatus === 'pending' ? 'Pending' : 'Issued'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#79759B' }}>Certificate Status</div>
        </div>
        <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#6C47FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
          →
        </div>
      </div>



      {/* Deadline Calendar Widget toggle */}
      {showCalendarWidget && (
        <div className="card animate-fade-in" style={{ padding: '24px' }}>
          <div className="card-header" style={{ marginBottom: '16px' }}>
            <h3 className="card-title">Deadline & Deliverables Calendar</h3>
            <span style={{ fontSize: '0.8125rem', color: '#8B7CF6', fontWeight: 600 }}>2026 Academic Term</span>
          </div>
          <DeadlineCalendar onOpenSubmitModal={() => navigate('/intern/submit')} />
        </div>
      )}

      {/* Middle Grid: Upcoming Deadlines & My Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Upcoming Deadlines */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Upcoming Deadlines</h3>
              <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
                Sorted with closest deadline first
              </p>
            </div>
            <Clock size={18} style={{ color: '#8B7CF6' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingDeadlines.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#77758A', fontSize: '0.875rem' }}>
                No upcoming deadlines.
              </div>
            ) : (
              upcomingDeadlines.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: '12px', border: '1px solid #E5E2F0', backgroundColor: '#F7F6FC' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#29283A' }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '2px' }}>
                      {item.type} • {item.project}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#8B7CF6' }}>
                      {item.deadline}
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Recent Activity */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">My Recent Activity</h3>
              <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
                History of your project tasks, submissions, and feedback
              </p>
            </div>
            <Activity size={18} style={{ color: '#8B7CF6' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myActivities.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#77758A', fontSize: '0.875rem' }}>
                No recent activity.
              </div>
            ) : (
              myActivities.slice(0, 5).map(act => (
                <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F7F6FC', border: '1px solid #E5E2F0' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '8px', 
                    backgroundColor: act.type === 'success' ? '#DCFCE7' : act.type === 'warning' ? '#FEF3C7' : '#EEECFA',
                    color: act.type === 'success' ? '#16A34A' : act.type === 'warning' ? '#D97706' : '#8B7CF6',
                    display: 'flex', 
                    alignItems: 'center', 
                    justify: 'center',
                    flexShrink: 0
                  }}>
                    <Activity size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#29283A' }}>{act.activity}</div>
                      <span style={{ fontSize: '0.75rem', color: '#77758A' }}>{act.time}</span>
                    </div>
                    <div style={{ fontSize: '0.78125rem', color: '#77758A', marginTop: '2px' }}>{act.description}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: My Projects + Recent Mentor Feedback */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Projects Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Assigned Projects</h3>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/intern/projects')}>
              <span>View All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {projects.slice(0, 2).map((proj) => (
              <div 
                key={proj.id}
                style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: '1px solid #E5E2F0',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#29283A' }}>{proj.title}</div>
                    <div style={{ fontSize: '0.78125rem', color: '#77758A' }}>{proj.company} • Supervisor: {proj.mentor}</div>
                  </div>
                  <StatusBadge status={proj.status} />
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#77758A', margin: '8px 0 12px', lineHeight: 1.4 }}>
                  {proj.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#77758A' }}>
                  <span>Tasks: {proj.completedTasks} / {proj.tasksCount}</span>
                  <span>Due: {proj.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Mentor Feedback</h3>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/intern/feedback')}>
              <span>View All & Rate Mentor</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {submissions.filter(s => s.feedback).length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#77758A', fontSize: '0.875rem' }}>
                No feedback received yet.
              </div>
            ) : (
              submissions.filter(s => s.feedback).map(sub => (
                <div 
                  key={sub.id} 
                  className="card soft-card-hover"
                  onClick={() => navigate('/intern/feedback')}
                  style={{ 
                    padding: '14px 16px', 
                    borderRadius: '12px', 
                    backgroundColor: '#EEECFA', 
                    borderLeft: '4px solid #8B7CF6',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#29283A' }}>Supervisor Review</span>
                    <span style={{ fontSize: '0.75rem', color: '#8B7CF6', fontWeight: 700 }}>Grade: {sub.grade || 95}/100</span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#29283A', lineHeight: 1.5 }}>
                    "{sub.feedback}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#6D61D9', fontWeight: 600 }}>
                      Task: {sub.taskTitle}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#8B7CF6', fontWeight: 700 }}>
                      Click to inspect →
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
