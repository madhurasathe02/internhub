import React, { useState } from 'react';
import { 
  MessageSquare, 
  Award, 
  CheckCircle2, 
  Plus, 
  Star, 
  Users, 
  Search, 
  Eye, 
  Edit3, 
  ShieldCheck, 
  Send,
  Sparkles,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MentorFeedback() {
  const { 
    submissions = [], 
    teacherFeedbacks = [], 
    studentsList = [], 
    user, 
    submitDirectMentorFeedback,
    reviewSubmission
  } = useApp();

  const [activeTab, setActiveTab] = useState('issued'); // 'issued' | 'received'
  const [searchTerm, setSearchTerm] = useState('');

  // New Feedback Modal state
  const [isNewFeedbackModalOpen, setIsNewFeedbackModalOpen] = useState(false);
  const [targetStudent, setTargetStudent] = useState(studentsList[0]?.name || 'Alex Johnson');
  const [targetTaskTitle, setTargetTaskTitle] = useState('Full Stack Web Architecture & State Sync');
  const [targetProjectTitle, setTargetProjectTitle] = useState('Cloud-Native SaaS Dashboard');
  const [targetGrade, setTargetGrade] = useState('95');
  const [targetStatus, setTargetStatus] = useState('Approved');
  const [targetFeedback, setTargetFeedback] = useState('');

  // Selected Issued Feedback for Edit/View Modal
  const [selectedSubForEdit, setSelectedSubForEdit] = useState(null);
  const [editGrade, setEditGrade] = useState('95');
  const [editNotes, setEditNotes] = useState('');

  const currentMentorName = user?.name || 'Dr. Sarah Jenkins';

  // Filter feedback issued to interns
  const filteredSubmissions = submissions.filter(sub => {
    const term = searchTerm.toLowerCase();
    return (
      sub.studentName.toLowerCase().includes(term) ||
      sub.taskTitle.toLowerCase().includes(term) ||
      sub.projectTitle.toLowerCase().includes(term) ||
      (sub.feedback && sub.feedback.toLowerCase().includes(term))
    );
  });

  // Filter feedback received from students for this mentor
  const receivedTeacherFeedbacks = teacherFeedbacks.filter(tf => 
    !tf.mentorName || tf.mentorName.toLowerCase() === currentMentorName.toLowerCase() || currentMentorName.includes(tf.mentorName)
  );

  // Calculate Average Rating
  const avgRating = receivedTeacherFeedbacks.length > 0
    ? (receivedTeacherFeedbacks.reduce((acc, f) => acc + (f.rating || 5), 0) / receivedTeacherFeedbacks.length).toFixed(1)
    : '5.0';

  const handleCreateFeedback = (e) => {
    e.preventDefault();
    if (!targetFeedback.trim()) return;

    submitDirectMentorFeedback({
      studentName: targetStudent,
      taskTitle: targetTaskTitle,
      projectTitle: targetProjectTitle,
      grade: targetGrade,
      status: targetStatus,
      feedback: targetFeedback
    });

    setIsNewFeedbackModalOpen(false);
    setTargetFeedback('');
  };

  const handleSaveEditFeedback = () => {
    if (!selectedSubForEdit) return;
    reviewSubmission(
      selectedSubForEdit.id, 
      selectedSubForEdit.status === 'Changes Requested' ? 'Changes Requested' : 'Completed',
      editNotes, 
      editGrade
    );
    setSelectedSubForEdit(null);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Feedback & Review Management
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Issue constructive feedback to interns, review task grades, and inspect feedback received from students.
          </p>
        </div>

        {activeTab === 'issued' && (
          <button className="btn btn-primary" onClick={() => setIsNewFeedbackModalOpen(true)}>
            <Plus size={16} />
            <span>Give Feedback to Intern</span>
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', borderBottom: '2px solid #E5E2F0', gap: '16px' }}>
        <button
          onClick={() => setActiveTab('issued')}
          style={{
            padding: '12px 20px',
            border: 'none',
            background: 'none',
            fontSize: '0.9375rem',
            fontWeight: 700,
            cursor: 'pointer',
            color: activeTab === 'issued' ? '#6D61D9' : '#77758A',
            borderBottom: activeTab === 'issued' ? '3px solid #8B7CF6' : '3px solid transparent',
            marginBottom: '-2px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <MessageSquare size={18} />
          <span>Issued Student Feedback ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('received')}
          style={{
            padding: '12px 20px',
            border: 'none',
            background: 'none',
            fontSize: '0.9375rem',
            fontWeight: 700,
            cursor: 'pointer',
            color: activeTab === 'received' ? '#6D61D9' : '#77758A',
            borderBottom: activeTab === 'received' ? '3px solid #8B7CF6' : '3px solid transparent',
            marginBottom: '-2px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Star size={18} />
          <span>Received Student Reviews for Mentor ({receivedTeacherFeedbacks.length})</span>
        </button>
      </div>

      {/* TAB 1: ISSUED STUDENT FEEDBACK */}
      {activeTab === 'issued' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: '360px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#77758A' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by intern name, task or comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px', height: '40px', fontSize: '0.875rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredSubmissions.length === 0 ? (
              <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2F0', textAlign: 'center', color: '#77758A', fontSize: '0.875rem' }}>
                No feedback reviews match your search.
              </div>
            ) : (
              filteredSubmissions.map(sub => (
                <div 
                  key={sub.id} 
                  className="card soft-card-hover" 
                  onClick={() => {
                    setSelectedSubForEdit(sub);
                    setEditGrade(sub.grade || '95');
                    setEditNotes(sub.feedback || '');
                  }}
                  style={{ 
                    padding: '20px 24px', 
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    borderLeft: sub.status === 'Changes Requested' ? '4px solid #E88989' : '4px solid #8B7CF6'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span className="badge badge-completed" style={{ fontSize: '0.78125rem' }}>
                          👤 {sub.studentName}
                        </span>
                        <span style={{ fontSize: '0.78125rem', color: '#77758A' }}>Project: {sub.projectTitle}</span>
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#29283A', margin: 0 }}>{sub.taskTitle}</h3>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <span className="badge badge-in-progress" style={{ backgroundColor: '#EEECFA', color: '#6D61D9', fontSize: '0.8125rem', fontWeight: 800 }}>
                        Grade: {sub.grade || 95}/100
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#77758A' }}>Status: {sub.status}</span>
                    </div>
                  </div>

                  {sub.feedback ? (
                    <div style={{ backgroundColor: sub.status === 'Changes Requested' ? '#FBE7E8' : '#F7F6FC', padding: '12px 16px', borderRadius: '10px', marginTop: '12px', borderLeft: sub.status === 'Changes Requested' ? '3px solid #E88989' : '3px solid #8B7CF6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: sub.status === 'Changes Requested' ? '#B96A70' : '#6D61D9', marginBottom: '4px' }}>
                          ISSUED MENTOR COMMENTS:
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#29283A', margin: 0, lineHeight: 1.4 }}>{sub.feedback}</p>
                      </div>

                      <div style={{ fontSize: '0.75rem', color: '#8B7CF6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Edit3 size={14} />
                        <span>Click to Modify</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.8125rem', color: '#77758A', fontStyle: 'italic', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>No feedback notes written yet for this deliverable.</span>
                      <span style={{ fontSize: '0.75rem', color: '#8B7CF6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Plus size={14} />
                        <span>Add Feedback</span>
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: RECEIVED STUDENT REVIEWS FOR TEACHER */}
      {activeTab === 'received' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Summary Score Banner */}
          <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #EEECFA 0%, #FFFFFF 100%)', borderLeft: '6px solid #8B7CF6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.78125rem', fontWeight: 800, color: '#6D61D9', uppercase: 'true' }}>
                  TEACHER & MENTOR RATING SCORE
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#29283A' }}>
                    {avgRating}
                  </span>
                  <div>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={18} fill={s <= Math.round(Number(avgRating)) ? '#8B7CF6' : 'none'} style={{ color: '#8B7CF6' }} />
                      ))}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
                      Based on {receivedTeacherFeedbacks.length} student reviews
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '10px 16px', borderRadius: '10px', border: '1px solid #E5E2F0', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#77758A', fontWeight: 700 }}>Technical Guidance</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#6D61D9' }}>4.9 ⭐</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '10px 16px', borderRadius: '10px', border: '1px solid #E5E2F0', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#77758A', fontWeight: 700 }}>Responsiveness</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#6D61D9' }}>5.0 ⭐</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '10px 16px', borderRadius: '10px', border: '1px solid #E5E2F0', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#77758A', fontWeight: 700 }}>Support</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#6D61D9' }}>4.8 ⭐</div>
                </div>
              </div>
            </div>
          </div>

          {/* List of Student Reviews */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {receivedTeacherFeedbacks.length === 0 ? (
              <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2F0', textAlign: 'center', color: '#77758A', fontSize: '0.875rem' }}>
                No student reviews received yet for this supervisor profile.
              </div>
            ) : (
              receivedTeacherFeedbacks.map(tf => (
                <div key={tf.id} className="card soft-card-hover" style={{ padding: '20px 24px', borderLeft: '4px solid #8B7CF6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="avatar" style={{ width: '28px', height: '28px', fontSize: '0.72rem', backgroundColor: '#8B7CF6' }}>
                          {tf.studentAvatar || 'ST'}
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#29283A' }}>
                          {tf.anonymous ? 'Anonymous Student' : tf.studentName}
                        </span>
                        <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', backgroundColor: '#EEECFA', color: '#6D61D9', fontWeight: 700 }}>
                          {tf.category}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>
                        Submitted {tf.submittedAt}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#EEECFA', padding: '6px 12px', borderRadius: '8px' }}>
                      <Star size={16} fill="#8B7CF6" style={{ color: '#8B7CF6' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#29283A' }}>{tf.rating}.0 / 5.0</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#29283A', lineHeight: 1.5, margin: '10px 0 0' }}>
                    "{tf.comment}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal: Issue New Feedback to Student */}
      {isNewFeedbackModalOpen && (
        <div className="modal-overlay animate-fade-in" onClick={() => setIsNewFeedbackModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Give Feedback to Intern / Student</h3>
              <button className="modal-close" onClick={() => setIsNewFeedbackModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Select Student / Intern</label>
                <select
                  className="form-select"
                  value={targetStudent}
                  onChange={(e) => setTargetStudent(e.target.value)}
                >
                  {studentsList.length > 0 ? (
                    studentsList.map(s => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.internshipJoined || 'Full Stack Web Development'})
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Alex Johnson">Alex Johnson</option>
                      <option value="Liam Chen">Liam Chen</option>
                      <option value="Maya Patel">Maya Patel</option>
                    </>
                  )}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Task Deliverable Title</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={targetTaskTitle}
                    onChange={(e) => setTargetTaskTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Project Title</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={targetProjectTitle}
                    onChange={(e) => setTargetProjectTitle(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Grade / Score (Out of 100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="form-input"
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Submission Status</label>
                  <select
                    className="form-select"
                    value={targetStatus}
                    onChange={(e) => setTargetStatus(e.target.value)}
                  >
                    <option value="Approved">Approved / Completed</option>
                    <option value="Changes Requested">Changes Requested (Revision Required)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mentor Constructive Feedback Notes</label>
                <textarea
                  className="form-textarea"
                  rows="3"
                  required
                  placeholder="Provide detailed feedback on code quality, design, and areas of improvement..."
                  value={targetFeedback}
                  onChange={(e) => setTargetFeedback(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsNewFeedbackModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={16} />
                  <span>Issue Feedback</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Modify / View Selected Issued Feedback */}
      {selectedSubForEdit && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedSubForEdit(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Modify Issued Feedback & Grade</h3>
              <button className="modal-close" onClick={() => setSelectedSubForEdit(null)}>✕</button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8125rem', color: '#77758A' }}>Intern: <strong style={{ color: '#29283A' }}>{selectedSubForEdit.studentName}</strong></div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#6D61D9', marginTop: '4px' }}>{selectedSubForEdit.taskTitle}</div>
              <div style={{ fontSize: '0.8125rem', color: '#77758A' }}>Project: {selectedSubForEdit.projectTitle}</div>
            </div>

            <div className="form-group">
              <label className="form-label">Grade Score (Out of 100)</label>
              <input 
                type="number"
                className="form-input" 
                value={editGrade}
                onChange={(e) => setEditGrade(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Update Mentor Feedback Notes</label>
              <textarea 
                className="form-textarea" 
                rows="4"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedSubForEdit(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveEditFeedback}>
                <CheckCircle2 size={16} />
                <span>Save Feedback Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
