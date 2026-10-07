import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  Briefcase, 
  FolderKanban, 
  Clock, 
  CheckCircle2, 
  Award, 
  Shield, 
  Download,
  FileCheck2,
  AlertTriangle,
  Megaphone,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAdminAnalytics, getSystemActivities } from '../../utils/analyticsHelper';

export default function AdminOverview() {
  const navigate = useNavigate();
  const appState = useApp();
  const { announcements = [] } = appState;

  // Live reactive calculations
  const analytics = getAdminAnalytics(appState);
  const recentActivities = getSystemActivities(appState, 'all');

  const {
    totalInterns,
    totalMentors,
    activeInternships,
    completedInternships,
    upcomingInternships,
    totalProjects,
    pendingSubmissions,
    certificatesIssued,
    pendingCertificates,
    submissionBreakdown
  } = analytics;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Admin Hero Header */}
      <div className="hero-banner" style={{ marginBottom: 0 }}>
        <div className="hero-banner-accent" />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge badge-in-progress" style={{ backgroundColor: '#FFFFFF', color: '#6D61D9', marginBottom: '10px' }}>
              <Shield size={14} style={{ color: '#8B7CF6' }} />
              <span>Institutional Administrator</span>
            </div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#29283A', margin: '4px 0 8px' }}>
              Admin Governance & Analytics Overview
            </h1>
            <p style={{ color: '#77758A', fontSize: '0.9375rem' }}>
              Real-time analytics for internship tracks, faculty supervisors, intern submissions, and official certification.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={() => alert('Exporting Official System Analytics Audit PDF...')}>
              <Download size={16} />
              <span>Export Audit PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7 Summary Cards Grid (Matching Soft Pastel Glass Card Style) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px' }}>
        {/* Card 1: Total Interns */}
        <div 
          onClick={() => navigate('/admin/students')}
          style={{
            background: 'rgba(240, 236, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
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
              <Users size={20} />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{totalInterns}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>Total Interns</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Active student cohort</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#6C47FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>

        {/* Card 2: Total Mentors */}
        <div 
          onClick={() => navigate('/admin/mentors')}
          style={{
            background: 'rgba(230, 245, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
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
              <UserCheck size={20} />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{totalMentors}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>Total Mentors</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Faculty & Industry</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>

        {/* Card 3: Active Internships */}
        <div 
          onClick={() => navigate('/admin/internships')}
          style={{
            background: 'rgba(230, 250, 240, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
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
              <Briefcase size={20} />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{activeInternships}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>Active Internships</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Ongoing tracks</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>

        {/* Card 4: Total Projects */}
        <div 
          onClick={() => navigate('/admin/projects')}
          style={{
            background: 'rgba(245, 238, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '22px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(139, 92, 246, 0.06)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}
          className="soft-card-hover"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: '#EDE5FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FolderKanban size={20} />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{totalProjects}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>Total Projects</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Industry assignments</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>

        {/* Card 5: Pending Submissions */}
        <div 
          onClick={() => navigate('/admin/tasks')}
          style={{
            background: 'rgba(255, 235, 245, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
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
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{pendingSubmissions}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>Pending Submissions</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Awaiting evaluation</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>

        {/* Card 6: Completed Internships */}
        <div 
          onClick={() => navigate('/admin/internships')}
          style={{
            background: 'rgba(230, 255, 250, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '22px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(20, 184, 166, 0.06)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, boxShadow 0.2s ease'
          }}
          className="soft-card-hover"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: '#CCFBF1', color: '#14B8A6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{completedInternships}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>Completed Internships</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Graduated cohorts</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#14B8A6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>

        {/* Card 7: Certificates Issued */}
        <div 
          onClick={() => navigate('/admin/certificates')}
          style={{
            background: 'rgba(255, 242, 235, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
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
              <Award size={20} />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{certificatesIssued}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>Certificates Issued</div>
            <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>Verified credentials</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              →
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid: Internship Overview & Submission Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Internship Overview */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Internship Track Overview</h3>
              <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
                Distribution across program execution states
              </p>
            </div>
            <TrendingUp size={18} style={{ color: '#8B7CF6' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
              <div 
                className="soft-card-hover" 
                onClick={() => navigate('/admin/internships')}
                style={{ padding: '14px', borderRadius: '16px', backgroundColor: 'rgba(240, 236, 255, 0.65)', border: '1px solid rgba(255, 255, 255, 0.9)', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#6C47FF' }}>{activeInternships}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#77758A', marginTop: '2px' }}>Active</div>
              </div>
              <div 
                className="soft-card-hover" 
                onClick={() => navigate('/admin/internships')}
                style={{ padding: '14px', borderRadius: '16px', backgroundColor: 'rgba(230, 250, 240, 0.65)', border: '1px solid rgba(255, 255, 255, 0.9)', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16A34A' }}>{completedInternships}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#15803D', marginTop: '2px' }}>Completed</div>
              </div>
              <div 
                className="soft-card-hover" 
                onClick={() => navigate('/admin/internships')}
                style={{ padding: '14px', borderRadius: '16px', backgroundColor: 'rgba(230, 245, 255, 0.65)', border: '1px solid rgba(255, 255, 255, 0.9)', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563EB' }}>{upcomingInternships}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1D4ED8', marginTop: '2px' }}>Upcoming</div>
              </div>
            </div>

            {/* Visual Progress Breakdown */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '8px', color: '#29283A', fontWeight: 600 }}>
                <span>Program Health Index</span>
                <span style={{ color: '#8B7CF6' }}>Active Ratio: {Math.round((activeInternships / (activeInternships + completedInternships + upcomingInternships || 1)) * 100)}%</span>
              </div>
              <div style={{ height: '12px', backgroundColor: '#EEECFA', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${(activeInternships / (activeInternships + completedInternships + upcomingInternships || 1)) * 100}%`, backgroundColor: '#8B7CF6', title: 'Active' }} />
                <div style={{ width: `${(completedInternships / (activeInternships + completedInternships + upcomingInternships || 1)) * 100}%`, backgroundColor: '#22C55E', title: 'Completed' }} />
                <div style={{ width: `${(upcomingInternships / (activeInternships + completedInternships + upcomingInternships || 1)) * 100}%`, backgroundColor: '#3B82F6', title: 'Upcoming' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Submission Overview */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Submission Review Breakdown</h3>
              <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
                Deliverable statuses across all active projects
              </p>
            </div>
            <FileCheck2 size={18} style={{ color: '#8B7CF6' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div 
              className="soft-card-hover" 
              onClick={() => navigate('/admin/tasks')}
              style={{ padding: '14px', borderRadius: '16px', backgroundColor: 'rgba(255, 242, 235, 0.75)', border: '1px solid rgba(255, 255, 255, 0.9)', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase' }}>Submitted</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#B45309', margin: '4px 0' }}>{submissionBreakdown.submitted}</div>
              <div style={{ fontSize: '0.75rem', color: '#D97706' }}>Awaiting initial review</div>
            </div>

            <div 
              className="soft-card-hover" 
              onClick={() => navigate('/admin/tasks')}
              style={{ padding: '14px', borderRadius: '16px', backgroundColor: 'rgba(230, 245, 255, 0.75)', border: '1px solid rgba(255, 255, 255, 0.9)', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>Under Review</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1D4ED8', margin: '4px 0' }}>{submissionBreakdown.underReview}</div>
              <div style={{ fontSize: '0.75rem', color: '#2563EB' }}>Mentor evaluation active</div>
            </div>

            <div 
              className="soft-card-hover" 
              onClick={() => navigate('/admin/tasks')}
              style={{ padding: '14px', borderRadius: '16px', backgroundColor: 'rgba(230, 250, 240, 0.75)', border: '1px solid rgba(255, 255, 255, 0.9)', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase' }}>Approved</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#15803D', margin: '4px 0' }}>{submissionBreakdown.approved}</div>
              <div style={{ fontSize: '0.75rem', color: '#16A34A' }}>Successfully verified</div>
            </div>

            <div 
              className="soft-card-hover" 
              onClick={() => navigate('/admin/tasks')}
              style={{ padding: '14px', borderRadius: '16px', backgroundColor: 'rgba(255, 235, 245, 0.75)', border: '1px solid rgba(255, 255, 255, 0.9)', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase' }}>Changes Requested</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#B91C1C', margin: '4px 0' }}>{submissionBreakdown.changesRequested}</div>
              <div style={{ fontSize: '0.75rem', color: '#DC2626' }}>Revision needed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Certificate Overview & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Certificate Overview */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Certificate Management Overview</h3>
              <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
                Official institutional verification status
              </p>
            </div>
            <Award size={18} style={{ color: '#8B7CF6' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div 
                className="soft-card-hover" 
                onClick={() => navigate('/admin/certificates')}
                style={{ padding: '18px', borderRadius: '18px', backgroundColor: 'rgba(255, 242, 235, 0.75)', border: '1px solid rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#B45309' }}>{pendingCertificates}</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#D97706' }}>Pending Verification</div>
                </div>
              </div>

              <div 
                className="soft-card-hover" 
                onClick={() => navigate('/admin/certificates')}
                style={{ padding: '18px', borderRadius: '18px', backgroundColor: 'rgba(230, 250, 240, 0.75)', border: '1px solid rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#15803D' }}>{certificatesIssued}</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#16A34A' }}>Official Certificates Issued</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#F7F6FC', border: '1px solid #E5E2F0', fontSize: '0.8125rem', color: '#77758A' }}>
              💡 Mentors evaluate interns after completion. Admin verifies and signs certificates before final issuing.
            </div>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">System Recent Activity</h3>
              <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
                Sorted by most recent platform actions
              </p>
            </div>
            <Activity size={18} style={{ color: '#8B7CF6' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivities.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#77758A', fontSize: '0.875rem' }}>
                No recent activity recorded yet.
              </div>
            ) : (
              recentActivities.slice(0, 5).map((act) => (
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
                    <div style={{ fontSize: '0.78125rem', color: '#77758A', marginTop: '2px' }}>
                      {act.description}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#8B7CF6', fontWeight: 600, marginTop: '4px' }}>
                      User: {act.user}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Institutional Announcements</h3>
          <Megaphone size={18} style={{ color: '#8B7CF6' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {announcements.map(ann => (
            <div key={ann.id} style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#F7F6FC', borderLeft: '4px solid #8B7CF6' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#29283A' }}>{ann.title}</div>
              <div style={{ fontSize: '0.8125rem', color: '#77758A', margin: '4px 0' }}>{ann.content}</div>
              <div style={{ fontSize: '0.75rem', color: '#8B7CF6', fontWeight: 600 }}>By: {ann.author} • {ann.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
