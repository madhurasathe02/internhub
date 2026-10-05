import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileCheck2, 
  MessageSquare, 
  Award, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  Search,
  Clock,
  CheckSquare,
  Activity,
  FolderKanban
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../StatusBadge';
import { getMentorAnalytics, getSystemActivities } from '../../utils/analyticsHelper';

export default function MentorOverview() {
  const navigate = useNavigate();
  const appState = useApp();
  const { user, submissions, reviewSubmission, evaluations = [], certificates = [], projects = [] } = appState;

  const mentorName = user?.name || 'Dr. Sarah Jenkins';
  const analytics = getMentorAnalytics(appState, mentorName);
  const recentActivities = getSystemActivities(appState, 'mentor', mentorName);

  const {
    myInternsCount,
    myInternsList,
    activeProjectsCount,
    pendingTasksCount,
    submissionsToReviewCount,
    approvedSubmissionsCount,
    evaluationsCompletedCount,
    submissionBreakdown
  } = analytics;

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewScore, setReviewScore] = useState('95');
  const [reviewNotes, setReviewNotes] = useState('');
  const [internSearchTerm, setInternSearchTerm] = useState('');

  const handleReviewAction = (subId, newStatus) => {
    reviewSubmission(subId, newStatus, reviewNotes || (newStatus === 'Completed' ? 'Great execution!' : 'Please fix issues noted.'), reviewScore);
    setSelectedSubmission(null);
    setReviewNotes('');
  };

  const filteredInterns = myInternsList.filter(s => 
    s.name.toLowerCase().includes(internSearchTerm.toLowerCase()) ||
    (s.internshipJoined && s.internshipJoined.toLowerCase().includes(internSearchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Mentor Hero Banner */}
      <div className="hero-banner" style={{ marginBottom: 0 }}>
        <div className="hero-banner-accent" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="badge badge-in-progress" style={{ backgroundColor: '#FFFFFF', color: '#6D61D9', marginBottom: '10px' }}>
            <Users size={14} style={{ color: '#8B7CF6' }} />
            <span>Faculty & Supervisor Portal</span>
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#29283A', margin: '4px 0 8px' }}>
            {mentorName} — Mentor Dashboard
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem' }}>
            Department: <strong style={{ color: '#29283A' }}>{user?.department || 'Computer Science & AI Lab'}</strong> | Assigned Interns: {myInternsCount}
          </p>
        </div>
      </div>

      {/* 6 Summary Cards Grid (Mentor Scoped) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {/* 1. My Interns */}
        <div className="stat-card">
          <div className="stat-icon lavender">
            <Users size={20} />
          </div>
          <div>
            <div className="stat-value">{myInternsCount}</div>
            <div className="stat-label">My Interns</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>Assigned cohort</div>
          </div>
        </div>

        {/* 2. Active Projects */}
        <div className="stat-card">
          <div className="stat-icon blue">
            <FolderKanban size={20} />
          </div>
          <div>
            <div className="stat-value">{activeProjectsCount}</div>
            <div className="stat-label">Active Projects</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>Supervised projects</div>
          </div>
        </div>

        {/* 3. Pending Tasks */}
        <div className="stat-card">
          <div className="stat-icon pink">
            <Clock size={20} />
          </div>
          <div>
            <div className="stat-value">{pendingTasksCount}</div>
            <div className="stat-label">Pending Tasks</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>In progress</div>
          </div>
        </div>

        {/* 4. Submissions to Review */}
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/mentor/feedback')}>
          <div className="stat-icon pink">
            <FileCheck2 size={20} />
          </div>
          <div>
            <div className="stat-value">{submissionsToReviewCount}</div>
            <div className="stat-label">Submissions to Review</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>Needs evaluation</div>
          </div>
        </div>

        {/* 5. Approved Submissions */}
        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="stat-value">{approvedSubmissionsCount}</div>
            <div className="stat-label">Approved Submissions</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>Accepted deliverables</div>
          </div>
        </div>

        {/* 6. Evaluations Completed */}
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/mentor/feedback')}>
          <div className="stat-icon lavender">
            <Award size={20} />
          </div>
          <div>
            <div className="stat-value">{evaluationsCompletedCount}</div>
            <div className="stat-label">Evaluations Completed</div>
            <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>Student performance</div>
          </div>
        </div>
      </div>

      {/* Submission Review Overview & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Submission Review Overview */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Submission Review Overview</h3>
              <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
                Review status for deliverables from your interns (Click cards to open Feedback Center)
              </p>
            </div>
            <FileCheck2 size={18} style={{ color: '#8B7CF6' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div 
              style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7', cursor: 'pointer' }}
              onClick={() => navigate('/mentor/feedback')}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase' }}>Submitted</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#B45309', margin: '4px 0' }}>{submissionBreakdown.submitted}</div>
              <div style={{ fontSize: '0.75rem', color: '#D97706' }}>Awaiting initial review</div>
            </div>

            <div 
              style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', cursor: 'pointer' }}
              onClick={() => navigate('/mentor/feedback')}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>Under Review</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1D4ED8', margin: '4px 0' }}>{submissionBreakdown.underReview}</div>
              <div style={{ fontSize: '0.75rem', color: '#2563EB' }}>Active evaluation</div>
            </div>

            <div 
              style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#F0FDF4', border: '1px solid #DCFCE7', cursor: 'pointer' }}
              onClick={() => navigate('/mentor/feedback')}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase' }}>Approved</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#15803D', margin: '4px 0' }}>{submissionBreakdown.approved}</div>
              <div style={{ fontSize: '0.75rem', color: '#16A34A' }}>Verified & accepted</div>
            </div>

            <div 
              style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', cursor: 'pointer' }}
              onClick={() => navigate('/mentor/feedback')}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase' }}>Changes Requested</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#B91C1C', margin: '4px 0' }}>{submissionBreakdown.changesRequested}</div>
              <div style={{ fontSize: '0.75rem', color: '#DC2626' }}>Revision feedback sent</div>
            </div>
          </div>
        </div>

        {/* Mentor Recent Activity */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Mentor Recent Activity</h3>
              <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
                Actions related only to you and your assigned interns
              </p>
            </div>
            <Activity size={18} style={{ color: '#8B7CF6' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivities.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#77758A', fontSize: '0.875rem' }}>
                No recent activities for your interns yet.
              </div>
            ) : (
              recentActivities.slice(0, 5).map(act => (
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

      {/* "My Interns" Summary Section with Search */}
      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 className="card-title">My Assigned Interns Summary</h3>
            <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
              Track project progress, evaluation status, and certificate readiness
            </p>
          </div>

          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#77758A' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search my interns..." 
              value={internSearchTerm}
              onChange={(e) => setInternSearchTerm(e.target.value)}
              style={{ paddingLeft: '34px', fontSize: '0.8125rem', height: '36px' }}
            />
          </div>
        </div>

        {filteredInterns.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#77758A', fontSize: '0.875rem' }}>
            No interns assigned yet.
          </div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Intern Name</th>
                  <th>Assigned Project</th>
                  <th>Project Status</th>
                  <th>Evaluation Status</th>
                  <th>Certificate Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInterns.map((st) => {
                  const assignedProj = projects.find(p => p.mentor === mentorName) || projects[0];
                  const evalRecord = evaluations.find(e => e.studentId === st.id || e.studentName === st.name);
                  const certRecord = certificates.find(c => c.internId === st.id || c.internName === st.name);

                  return (
                    <tr key={st.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem', backgroundColor: '#8B7CF6' }}>
                            {st.name.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#29283A' }}>{st.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#77758A' }}>{st.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#29283A', fontSize: '0.875rem' }}>
                          {assignedProj ? assignedProj.title : 'Cloud-Native SaaS'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#77758A' }}>
                          {st.internshipJoined || 'Full Stack Web Development'}
                        </div>
                      </td>
                      <td>
                        <StatusBadge status={assignedProj ? assignedProj.status : 'In Progress'} />
                      </td>
                      <td>
                        {evalRecord && evalRecord.submitted ? (
                          <span className="badge badge-completed">
                            Completed ({evalRecord.overallScore}/5.0)
                          </span>
                        ) : (
                          <span className="badge badge-pending">
                            Pending Evaluation
                          </span>
                        )}
                      </td>
                      <td>
                        {certRecord ? (
                          <StatusBadge status={certRecord.status === 'issued' ? 'Issued' : certRecord.status === 'pending' ? 'Pending Review' : 'Not Eligible'} />
                        ) : (
                          <span className="badge badge-pending">Not Issued</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Submissions Table for Evaluation */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Pending Student Submissions & Deliverables</h3>
            <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
              Inspect GitHub repository links, files, and validate milestone criteria.
            </p>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#77758A', fontSize: '0.875rem' }}>
            No submissions to review.
          </div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Task & Project</th>
                  <th>Submitted Date</th>
                  <th>Attachment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem', backgroundColor: '#8B7CF6' }}>
                          {sub.studentAvatar}
                        </div>
                        <div style={{ fontWeight: 700, color: '#29283A' }}>{sub.studentName}</div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#29283A' }}>{sub.taskTitle}</div>
                      <div style={{ fontSize: '0.75rem', color: '#77758A' }}>{sub.projectTitle}</div>
                    </td>
                    <td style={{ color: '#77758A', fontSize: '0.8125rem' }}>{sub.submittedAt}</td>
                    <td style={{ fontSize: '0.8125rem', color: '#6D61D9' }}>{sub.fileAttached}</td>
                    <td>
                      <StatusBadge status={sub.status} />
                    </td>
                    <td>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedSubmission(sub)}
                      >
                        <Eye size={14} />
                        <span>Evaluate</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Evaluation Modal */}
      {selectedSubmission && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedSubmission(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Evaluate Student Submission</h3>
              <button className="modal-close" onClick={() => setSelectedSubmission(null)}>✕</button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8125rem', color: '#77758A' }}>Student: <strong style={{ color: '#29283A' }}>{selectedSubmission.studentName}</strong></div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#6D61D9', marginTop: '4px' }}>{selectedSubmission.taskTitle}</div>
              <div style={{ fontSize: '0.8125rem', color: '#77758A' }}>Project: {selectedSubmission.projectTitle}</div>
            </div>

            <div style={{ backgroundColor: '#F7F6FC', padding: '12px 16px', borderRadius: '10px', marginBottom: '18px', border: '1px solid #E5E2F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#77758A', textTransform: 'uppercase', marginBottom: '4px' }}>
                Student Submission Notes:
              </div>
              <p style={{ fontSize: '0.875rem', color: '#29283A', lineHeight: 1.4 }}>
                {selectedSubmission.notes}
              </p>
              <div style={{ marginTop: '10px' }}>
                <a 
                  href={selectedSubmission.submissionUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#8B7CF6', fontWeight: 600 }}
                >
                  <ExternalLink size={14} />
                  <span>Inspect Code Repository</span>
                </a>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Grade / Score (Out of 100)</label>
              <input 
                type="number" 
                className="form-input" 
                value={reviewScore}
                onChange={(e) => setReviewScore(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mentor Review Feedback & Comments</label>
              <textarea 
                className="form-textarea" 
                rows="3"
                placeholder="Write constructive guidance for the intern..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button 
                className="btn btn-danger"
                onClick={() => handleReviewAction(selectedSubmission.id, 'Changes Requested')}
              >
                <XCircle size={16} />
                <span>Request Changes</span>
              </button>

              <button 
                className="btn btn-primary"
                onClick={() => handleReviewAction(selectedSubmission.id, 'Completed')}
              >
                <CheckCircle2 size={16} />
                <span>Approve Submission</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
