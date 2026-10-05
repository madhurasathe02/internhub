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
  const studentName = user?.name || 'Alex Johnson';

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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Welcome Banner */}
      <div className="hero-banner" style={{ marginBottom: 0 }}>
        <div className="hero-banner-accent" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="badge badge-in-progress" style={{ backgroundColor: '#FFFFFF', color: '#6D61D9', marginBottom: '10px' }}>
                🎓 Student Workspace
              </div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#29283A', margin: '4px 0 8px' }}>
                Welcome back, {studentName}!
              </h1>
              <p style={{ color: '#77758A', fontSize: '0.9375rem' }}>
                Active Internship Track: <strong style={{ color: '#29283A' }}>{joinedInternship?.title} ({joinedInternship?.organization})</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowCalendarWidget(!showCalendarWidget)}
              >
                <CalendarIcon size={16} />
                <span>{showCalendarWidget ? 'Hide Calendar' : 'Deadline Calendar'}</span>
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/intern/submit')}>
                <Plus size={16} />
                <span>Submit Work</span>
              </button>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div style={{ marginTop: '20px', backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E5E2F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
              <span style={{ fontWeight: 700, color: '#29283A' }}>Overall Internship Milestone Progress</span>
              <span style={{ fontWeight: 700, color: '#8B7CF6' }}>
                {Math.round((approvedWorkCount / (tasks.length || 1)) * 100)}% Completed
              </span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: '#EEECFA', borderRadius: '999px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${Math.max(15, Math.round((approvedWorkCount / (tasks.length || 1)) * 100))}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #8B7CF6 0%, #7CA9F8 100%)', 
                  borderRadius: '999px',
                  transition: 'width 0.4s ease'
                }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6 Summary Cards Grid (Intern Scoped) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {/* 1. My Projects */}
        <div className="stat-card">
          <div className="stat-icon lavender">
            <FolderKanban size={20} />
          </div>
          <div>
            <div className="stat-value">{myProjectsCount}</div>
            <div className="stat-label">My Projects</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>Assigned tracks</div>
          </div>
        </div>

        {/* 2. Pending Tasks */}
        <div className="stat-card">
          <div className="stat-icon pink">
            <Clock size={20} />
          </div>
          <div>
            <div className="stat-value">{pendingTasksCount}</div>
            <div className="stat-label">Pending Tasks</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>Requires action</div>
          </div>
        </div>

        {/* 3. Submitted Tasks */}
        <div className="stat-card">
          <div className="stat-icon blue">
            <FileCheck2 size={20} />
          </div>
          <div>
            <div className="stat-value">{submittedTasksCount}</div>
            <div className="stat-label">Submitted Tasks</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>Total submitted</div>
          </div>
        </div>

        {/* 4. Approved Work */}
        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="stat-value">{approvedWorkCount}</div>
            <div className="stat-label">Approved Work</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>Passed evaluation</div>
          </div>
        </div>

        {/* 5. Pending Reviews */}
        <div className="stat-card">
          <div className="stat-icon pink">
            <Clock size={20} />
          </div>
          <div>
            <div className="stat-value">{pendingReviewsCount}</div>
            <div className="stat-label">Pending Reviews</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>Under supervisor review</div>
          </div>
        </div>

        {/* 6. Certificate Status */}
        <div className="stat-card">
          <div className="stat-icon lavender">
            <Award size={20} />
          </div>
          <div>
            <div className="stat-value" style={{ fontSize: '1.1rem', textTransform: 'capitalize' }}>
              {certStatus === 'issued' ? 'Issued' : certStatus === 'pending' ? 'Pending' : 'Ineligible'}
            </div>
            <div className="stat-label">Certificate Status</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>Credential state</div>
          </div>
        </div>
      </div>

      {/* Certificate Status Card Section */}
      <div className="card" style={{ background: certStatus === 'issued' ? 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)' : '#FFFFFF', borderLeft: `6px solid ${certStatus === 'issued' ? '#16A34A' : certStatus === 'pending' ? '#D97706' : '#8B7CF6'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              backgroundColor: certStatus === 'issued' ? '#DCFCE7' : certStatus === 'pending' ? '#FEF3C7' : '#EEECFA',
              color: certStatus === 'issued' ? '#16A34A' : certStatus === 'pending' ? '#D97706' : '#8B7CF6',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Award size={26} />
            </div>

            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
                Certificate Readiness & Status
              </h3>
              <p style={{ color: '#77758A', fontSize: '0.875rem', marginTop: '4px' }}>
                {certStatus === 'issued'
                  ? 'Your official Internship Completion Certificate has been verified and issued.'
                  : certStatus === 'pending'
                  ? 'Your certificate is waiting for admin verification.'
                  : 'Complete your internship and evaluation to become eligible.'}
              </p>
            </div>
          </div>

          <button 
            className="btn btn-primary"
            onClick={() => navigate('/intern/certificate')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>View Certificate</span>
            <ArrowRight size={16} />
          </button>
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
