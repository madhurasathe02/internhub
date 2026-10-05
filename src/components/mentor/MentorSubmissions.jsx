import React, { useState } from 'react';
import { FileCheck2, Eye, ExternalLink, CheckCircle2, XCircle, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../StatusBadge';
import EmptyState from '../EmptyState';
import SearchBar from '../SearchBar';

export default function MentorSubmissions() {
  const { submissions, reviewSubmission } = useApp();
  const [selectedSub, setSelectedSub] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [grade, setGrade] = useState('95');
  const [notes, setNotes] = useState('');

  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = (s.studentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.taskTitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.projectTitle || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (subId, newStatus) => {
    reviewSubmission(
      subId, 
      newStatus, 
      notes || (newStatus === 'Approved' || newStatus === 'Completed' ? 'Great execution! Approved.' : 'Please revise based on feedback notes.'), 
      grade
    );
    setSelectedSub(null);
    setNotes('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
          Student Deliverable Submissions
        </h1>
        <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
          Inspect GitHub repositories, review student notes, and evaluate task milestone completions.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search by intern name, task, or project..." 
          style={{ maxWidth: '340px' }}
        />

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Filter size={16} style={{ color: '#77758A', marginRight: '4px' }} />
          {['All', 'Under Review', 'Approved', 'Changes Requested', 'Pending'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: statusFilter === st ? '1px solid #8B7CF6' : '1px solid #E5E2F0',
                backgroundColor: statusFilter === st ? '#EEECFA' : '#FFFFFF',
                color: statusFilter === st ? '#6D61D9' : '#77758A',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table or Empty State */}
      {filteredSubmissions.length === 0 ? (
        <EmptyState 
          icon={<FileCheck2 size={40} style={{ color: '#8B7CF6' }} />}
          title="No Submissions Found"
          description={`There are currently no student work submissions matching the filter "${statusFilter}".`}
          actionLabel={statusFilter !== 'All' ? "Show All Submissions" : null}
          onAction={statusFilter !== 'All' ? () => setStatusFilter('All') : null}
        />
      ) : (
        <div className="card">
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Intern Name</th>
                  <th>Task Title</th>
                  <th>Project</th>
                  <th>Submission Time</th>
                  <th>Attachment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map(sub => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: 700, color: '#29283A' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar" style={{ width: '30px', height: '30px', fontSize: '0.75rem', backgroundColor: '#8B7CF6' }}>
                          {sub.studentAvatar || 'AJ'}
                        </div>
                        <span>{sub.studentName}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600, color: '#29283A' }}>{sub.taskTitle}</td>
                    <td style={{ color: '#77758A' }}>{sub.projectTitle}</td>
                    <td style={{ color: '#77758A', fontSize: '0.8125rem' }}>{sub.submittedAt}</td>
                    <td style={{ color: '#6D61D9', fontSize: '0.8125rem' }}>{sub.fileAttached}</td>
                    <td>
                      <StatusBadge status={sub.status} />
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedSub(sub); setNotes(sub.feedback || ''); setGrade(sub.grade || '95'); }}>
                        <Eye size={14} />
                        <span>Evaluate</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Evaluation Modal */}
      {selectedSub && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedSub(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Evaluate Student Submission</h3>
              <button className="modal-close" onClick={() => setSelectedSub(null)}>✕</button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8125rem', color: '#77758A' }}>Student: <strong style={{ color: '#29283A' }}>{selectedSub.studentName}</strong></div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#6D61D9', marginTop: '4px' }}>{selectedSub.taskTitle}</div>
              <div style={{ fontSize: '0.8125rem', color: '#77758A' }}>Project: {selectedSub.projectTitle}</div>
            </div>

            <div style={{ backgroundColor: '#F7F6FC', padding: '14px 16px', borderRadius: '12px', marginBottom: '16px', border: '1px solid #E5E2F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#77758A', textTransform: 'uppercase', marginBottom: '4px' }}>
                STUDENT SUBMISSION NOTES:
              </div>
              <p style={{ fontSize: '0.875rem', color: '#29283A', lineHeight: 1.4 }}>{selectedSub.notes}</p>
              <div style={{ marginTop: '10px' }}>
                <a 
                  href={selectedSub.submissionUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#8B7CF6', fontWeight: 600 }}
                >
                  <ExternalLink size={14} />
                  <span>View Code Repository (GitHub)</span>
                </a>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Grade / Score (Out of 100)</label>
              <input type="number" className="form-input" value={grade} onChange={e => setGrade(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Mentor Evaluation & Feedback Comments</label>
              <textarea 
                className="form-textarea" 
                rows="3" 
                value={notes} 
                onChange={e => setNotes(e.target.value)} 
                placeholder="Provide constructive feedback for the intern..." 
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button 
                className="btn btn-danger" 
                onClick={() => handleAction(selectedSub.id, 'Changes Requested')}
              >
                <XCircle size={16} />
                <span>Request Changes</span>
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleAction(selectedSub.id, 'Approved')}
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
