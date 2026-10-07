import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileCheck2, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  ExternalLink,
  Award,
  Sparkles,
  Filter
} from 'lucide-react';
import { MOCK_MENTOR, MOCK_STATS, MOCK_SUBMISSIONS } from '../mockData';
import StatusBadge from './StatusBadge';

export default function MentorDashboard() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewScore, setReviewScore] = useState('95');
  const [reviewNotes, setReviewNotes] = useState('');

  const handleAction = (subId, newStatus) => {
    setSubmissions(submissions.map(s => s.id === subId ? { ...s, status: newStatus } : s));
    setSelectedSubmission(null);
    setReviewNotes('');
  };

  const getMentorCardRoute = (type) => {
    switch (type) {
      case 'interns': return '/mentor/interns';
      case 'reviews': return '/mentor/submissions';
      case 'feedback': return '/mentor/feedback';
      case 'speed': return '/mentor/certificates';
      default: return '/mentor/interns';
    }
  };

  const cardStyles = [
    { bg: 'rgba(240, 236, 255, 0.75)', iconBg: '#E5DCFF', color: '#6C47FF' },
    { bg: 'rgba(230, 245, 255, 0.75)', iconBg: '#D6F0FF', color: '#3B82F6' },
    { bg: 'rgba(255, 235, 245, 0.75)', iconBg: '#FFE0EC', color: '#EC4899' },
    { bg: 'rgba(230, 250, 240, 0.75)', iconBg: '#D1FAE5', color: '#10B981' },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Mentor Hero Banner */}
      <div className="hero-banner" style={{ marginBottom: 0 }}>
        <div className="hero-banner-accent" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="badge badge-in-progress" style={{ backgroundColor: '#FFFFFF', color: '#6D61D9', marginBottom: '10px' }}>
            <Users size={14} style={{ color: '#8B7CF6' }} />
            <span>Faculty & Mentor Portal</span>
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#29283A', margin: '4px 0 8px' }}>
            {MOCK_MENTOR.name} — Academic Supervisor Overview
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem' }}>
            Department: <strong style={{ color: '#29283A' }}>{MOCK_MENTOR.department}</strong> | Active Cohort: 14 Interns
          </p>
        </div>
      </div>

      {/* Mentor Metrics Grid (Soft Pastel Glass Style) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px' }}>
        {MOCK_STATS.mentor.map((stat, idx) => {
          const styleConfig = cardStyles[idx % cardStyles.length];
          return (
            <div 
              key={idx} 
              onClick={() => navigate(getMentorCardRoute(stat.type))}
              style={{
                background: styleConfig.bg,
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
                <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: styleConfig.iconBg, color: styleConfig.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {stat.type === 'interns' && <Users size={20} />}
                  {stat.type === 'reviews' && <FileCheck2 size={20} />}
                  {stat.type === 'feedback' && <MessageSquare size={20} />}
                  {stat.type === 'speed' && <Award size={20} />}
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>{stat.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>{stat.change}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: styleConfig.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                  →
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submissions Pending Review Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Pending Student Submissions</h3>
            <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
              Inspect student code repositories, files, and validate project milestones.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} style={{ color: '#77758A' }} />
            <span style={{ fontSize: '0.8125rem', color: '#77758A', fontWeight: 600 }}>Filter by Status</span>
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Task & Project</th>
                <th>Submitted</th>
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
                      <div>
                        <div style={{ fontWeight: 700, color: '#29283A' }}>{sub.studentName}</div>
                      </div>
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
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspection & Grading Modal */}
      {selectedSubmission && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedSubmission(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Evaluate Submission</h3>
              <button className="modal-close" onClick={() => setSelectedSubmission(null)}>✕</button>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.8125rem', color: '#77758A' }}>Student:</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#29283A' }}>{selectedSubmission.studentName}</div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.8125rem', color: '#77758A' }}>Deliverable Title:</div>
              <div style={{ fontWeight: 600, color: '#6D61D9' }}>{selectedSubmission.taskTitle}</div>
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
                  <span>View Repository Code (GitHub)</span>
                </a>
              </div>
            </div>

            {/* Evaluation Form */}
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
              <label className="form-label">Mentor Feedback Comments</label>
              <textarea 
                className="form-textarea" 
                rows="3"
                placeholder="Provide constructive feedback for the student..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button 
                className="btn btn-danger"
                onClick={() => handleAction(selectedSubmission.id, 'Changes Requested')}
              >
                <XCircle size={16} />
                <span>Request Changes</span>
              </button>

              <button 
                className="btn btn-primary"
                onClick={() => handleAction(selectedSubmission.id, 'Completed')}
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
