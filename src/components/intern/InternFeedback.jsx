import React, { useState } from 'react';
import { 
  MessageSquare, 
  Award, 
  CheckCircle2, 
  RefreshCw, 
  AlertTriangle, 
  Star, 
  Send, 
  User, 
  Sparkles, 
  Eye, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../StatusBadge';
import EmptyState from '../EmptyState';
import WorkSubmissionModal from '../WorkSubmissionModal';
import EvaluationCard from '../EvaluationCard';

export default function InternFeedback() {
  const { 
    submissions, 
    user, 
    getEvaluationForStudent, 
    teacherFeedbacks = [], 
    submitStudentFeedbackToMentor,
    mentorsList = []
  } = useApp();

  const [activeTab, setActiveTab] = useState('received'); // 'received' | 'give'
  const [selectedSubmissionForModal, setSelectedSubmissionForModal] = useState(null);
  const [selectedTaskForResubmit, setSelectedTaskForResubmit] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form state for Giving Feedback to Mentor/Teacher
  const [selectedMentor, setSelectedMentor] = useState(mentorsList[0]?.name || 'Dr. Sarah Jenkins');
  const [overallRating, setOverallRating] = useState(5);
  const [clarityRating, setClarityRating] = useState(5);
  const [responsivenessRating, setResponsivenessRating] = useState(5);
  const [supportRating, setSupportRating] = useState(5);
  const [feedbackCategory, setFeedbackCategory] = useState('Mentorship & Technical Support');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const studentEval = getEvaluationForStudent(user?.id);

  // Filter feedbacks given by current student
  const myGivenFeedbacks = teacherFeedbacks.filter(tf => 
    tf.studentId === user?.id || (user?.name && tf.studentName.toLowerCase() === user.name.toLowerCase())
  );

  const handleResubmitClick = (sub, e) => {
    if (e) e.stopPropagation();
    setSelectedTaskForResubmit({
      id: sub.id,
      title: sub.taskTitle,
      project: sub.projectTitle,
      status: sub.status,
      feedback: sub.feedback,
    });
    setIsSubmitModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!feedbackComment.trim()) return;

    const matchedMentor = mentorsList.find(m => m.name === selectedMentor);

    submitStudentFeedbackToMentor({
      mentorName: selectedMentor,
      mentorId: matchedMentor ? matchedMentor.id : 'usr_02',
      rating: overallRating,
      clarityRating,
      responsivenessRating,
      supportRating,
      category: feedbackCategory,
      comment: feedbackComment,
      anonymous: isAnonymous
    });

    // Reset Form
    setFeedbackComment('');
    setOverallRating(5);
    setClarityRating(5);
    setResponsivenessRating(5);
    setSupportRating(5);
  };

  const renderStarPicker = (val, setVal, label) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#29283A' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setVal(star)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              transition: 'transform 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Star
              size={22}
              fill={star <= val ? '#8B7CF6' : 'none'}
              style={{ color: star <= val ? '#8B7CF6' : '#C4C2D0' }}
            />
          </button>
        ))}
        <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#6D61D9', marginLeft: '6px' }}>
          {val}.0 / 5.0
        </span>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
          Feedback & Mentorship Center
        </h1>
        <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
          Inspect mentor deliverable reviews, performance evaluations, and submit feedback to your teachers & supervisors.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div style={{ display: 'flex', borderBottom: '2px solid #E5E2F0', gap: '16px' }}>
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
          <MessageSquare size={18} />
          <span>Received Mentor Feedback ({submissions.filter(s => s.feedback).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('give')}
          style={{
            padding: '12px 20px',
            border: 'none',
            background: 'none',
            fontSize: '0.9375rem',
            fontWeight: 700,
            cursor: 'pointer',
            color: activeTab === 'give' ? '#6D61D9' : '#77758A',
            borderBottom: activeTab === 'give' ? '3px solid #8B7CF6' : '3px solid transparent',
            marginBottom: '-2px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Send size={18} />
          <span>Give Feedback to Mentor / Teacher</span>
        </button>
      </div>

      {/* TAB 1: RECEIVED MENTOR FEEDBACK */}
      {activeTab === 'received' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Final Internship Evaluation Report Banner */}
          {studentEval ? (
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#29283A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} style={{ color: '#8B7CF6' }} />
                <span>Final Performance Evaluation Report</span>
              </h2>
              <EvaluationCard evaluation={studentEval} />
            </div>
          ) : (
            <div style={{ backgroundColor: '#EEECFA', padding: '16px 20px', borderRadius: '12px', borderLeft: '4px solid #8B7CF6', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Award size={24} style={{ color: '#8B7CF6' }} />
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#29283A' }}>
                  Internship Evaluation Pending
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#77758A' }}>
                  Your supervisor will record your overall skill ratings (Technical, Communication, Teamwork, etc.) upon completing your deliverables.
                </div>
              </div>
            </div>
          )}

          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#29283A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={18} style={{ color: '#8B7CF6' }} />
              <span>Task Deliverable Feedback Reviews</span>
            </h2>

            {submissions.length === 0 ? (
              <EmptyState 
                icon={<MessageSquare size={40} style={{ color: '#8B7CF6' }} />}
                title="No Deliverable Feedback Received Yet"
                description="You haven't received any task feedback yet. Complete and submit your assigned tasks to receive supervisor comments."
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {submissions.map(sub => (
                  <div 
                    key={sub.id} 
                    className="card soft-card-hover" 
                    onClick={() => setSelectedSubmissionForModal(sub)}
                    style={{ 
                      padding: '20px 24px',
                      cursor: 'pointer',
                      borderLeft: sub.status === 'Changes Requested' ? '4px solid #E88989' : sub.status === 'Approved' || sub.status === 'Completed' ? '4px solid #4F9D69' : '4px solid #8B7CF6',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <StatusBadge status={sub.status} />
                          <span style={{ fontSize: '0.78125rem', color: '#77758A' }}>Project: {sub.projectTitle}</span>
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#29283A' }}>{sub.taskTitle}</h3>
                      </div>

                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        <span className="badge badge-completed" style={{ fontSize: '0.8125rem', fontWeight: 800 }}>
                          Grade: {sub.grade || 95}/100
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#77758A' }}>{sub.submittedAt}</span>
                      </div>
                    </div>

                    {sub.feedback ? (
                      <div style={{ 
                        backgroundColor: sub.status === 'Changes Requested' ? '#FBE7E8' : '#EEECFA', 
                        padding: '12px 16px', 
                        borderRadius: '10px', 
                        marginTop: '12px', 
                        borderLeft: sub.status === 'Changes Requested' ? '3px solid #E88989' : '3px solid #8B7CF6',
                        display: 'flex',
                        justify: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: sub.status === 'Changes Requested' ? '#B96A70' : '#6D61D9', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {sub.status === 'Changes Requested' && <AlertTriangle size={14} />}
                            SUPERVISOR COMMENTS:
                          </div>
                          <p style={{ fontSize: '0.875rem', color: '#29283A', lineHeight: 1.4 }}>{sub.feedback}</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {sub.status === 'Changes Requested' && (
                            <button 
                              className="btn btn-warning btn-sm"
                              style={{ backgroundColor: '#FFF3D9', color: '#8A5D00', border: '1px solid #FCE2A6' }}
                              onClick={(e) => handleResubmitClick(sub, e)}
                            >
                              <RefreshCw size={14} />
                              <span>Resubmit Work</span>
                            </button>
                          )}
                          <span style={{ fontSize: '0.75rem', color: '#8B7CF6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Eye size={14} />
                            <span>Click for details</span>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.8125rem', color: '#77758A', fontStyle: 'italic', marginTop: '8px' }}>
                        Currently under mentor evaluation...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: GIVE FEEDBACK TO TEACHER / MENTOR */}
      {activeTab === 'give' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Feedback Form Card */}
          <div className="card" style={{ padding: '24px' }}>
            <div className="card-header" style={{ marginBottom: '20px' }}>
              <div>
                <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={20} style={{ color: '#8B7CF6' }} />
                  <span>Submit Feedback & Review for Mentor / Teacher</span>
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
                  Your feedback helps academic supervisors improve mentorship quality and course guidance.
                </p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Select Mentor / Supervisor</label>
                  <select 
                    className="form-select"
                    value={selectedMentor}
                    onChange={(e) => setSelectedMentor(e.target.value)}
                  >
                    {mentorsList.length > 0 ? (
                      mentorsList.map(m => (
                        <option key={m.id || m.name} value={m.name}>
                          {m.name} ({m.title || m.department || 'Supervisor'})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Senior Software Architect)</option>
                        <option value="Prof. Marcus Vance">Prof. Marcus Vance (Academic Director)</option>
                        <option value="Elena Rostova">Elena Rostova (Principal Engineer)</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Feedback Category</label>
                  <select
                    className="form-select"
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value)}
                  >
                    <option value="Mentorship & Technical Support">Mentorship & Technical Support</option>
                    <option value="Course & Project Guidance">Course & Project Guidance</option>
                    <option value="Communication & Accessibility">Communication & Accessibility</option>
                    <option value="General Supervision">General Supervision</option>
                  </select>
                </div>
              </div>

              {/* Multi-criteria Star Ratings */}
              <div style={{ backgroundColor: '#F7F6FC', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E5E2F0' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#6D61D9', uppercase: 'true', marginBottom: '14px' }}>
                  EVALUATION RATINGS (1 - 5 STARS):
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  {renderStarPicker(overallRating, setOverallRating, 'Overall Mentorship Experience')}
                  {renderStarPicker(clarityRating, setClarityRating, 'Technical Guidance & Code Clarity')}
                  {renderStarPicker(responsivenessRating, setResponsivenessRating, 'Responsiveness & Availability')}
                  {renderStarPicker(supportRating, setSupportRating, 'Support & Encouragement')}
                </div>
              </div>

              {/* Written Comments */}
              <div className="form-group">
                <label className="form-label">Detailed Comments & Feedback for Teacher</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  required
                  placeholder="Share constructive feedback regarding your mentor's guidance, code reviews, availability, or teaching style..."
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                />
              </div>

              {/* Anonymous Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', color: '#29283A', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#8B7CF6' }}
                  />
                  <span>Submit feedback anonymously (conceal student name from supervisor)</span>
                </label>

                <button type="submit" className="btn btn-primary">
                  <Send size={16} />
                  <span>Submit Feedback to Mentor</span>
                </button>
              </div>
            </form>
          </div>

          {/* Previous Submissions List */}
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#29283A', marginBottom: '14px' }}>
              Your Previously Submitted Mentor Reviews ({myGivenFeedbacks.length})
            </h3>

            {myGivenFeedbacks.length === 0 ? (
              <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2F0', textAlign: 'center', color: '#77758A', fontSize: '0.875rem' }}>
                You haven't submitted any feedback to teachers or mentors yet. Fill out the form above to leave your first review!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {myGivenFeedbacks.map(tf => (
                  <div key={tf.id} className="card" style={{ padding: '18px 20px', borderLeft: '4px solid #8B7CF6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#29283A' }}>
                            To: {tf.mentorName}
                          </span>
                          <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', backgroundColor: '#EEECFA', color: '#6D61D9', fontWeight: 700 }}>
                            {tf.category}
                          </span>
                          {tf.anonymous && (
                            <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', backgroundColor: '#F3F4F6', color: '#4B5563', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <ShieldCheck size={12} /> Anonymous
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '2px' }}>Submitted on {tf.submittedAt}</div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#EEECFA', padding: '4px 10px', borderRadius: '8px' }}>
                        <Star size={14} fill="#8B7CF6" style={{ color: '#8B7CF6' }} />
                        <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#29283A' }}>{tf.rating}.0 / 5.0</span>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.875rem', color: '#29283A', lineHeight: 1.5, margin: '8px 0 0' }}>
                      "{tf.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Task Feedback Detail Modal */}
      {selectedSubmissionForModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedSubmissionForModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Task Deliverable Feedback Detail</h3>
              <button className="modal-close" onClick={() => setSelectedSubmissionForModal(null)}>✕</button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <StatusBadge status={selectedSubmissionForModal.status} />
                <span style={{ fontSize: '0.8125rem', color: '#77758A' }}>Project: {selectedSubmissionForModal.projectTitle}</span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
                {selectedSubmissionForModal.taskTitle}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#F7F6FC', padding: '12px 14px', borderRadius: '10px', border: '1px solid #E5E2F0' }}>
                <div style={{ fontSize: '0.75rem', color: '#77758A', fontWeight: 600 }}>Assigned Grade</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#6D61D9' }}>
                  {selectedSubmissionForModal.grade || 95} / 100
                </div>
              </div>

              <div style={{ backgroundColor: '#F7F6FC', padding: '12px 14px', borderRadius: '10px', border: '1px solid #E5E2F0' }}>
                <div style={{ fontSize: '0.75rem', color: '#77758A', fontWeight: 600 }}>Submitted On</div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#29283A', marginTop: '2px' }}>
                  {selectedSubmissionForModal.submittedAt}
                </div>
              </div>
            </div>

            {selectedSubmissionForModal.feedback && (
              <div style={{ 
                backgroundColor: selectedSubmissionForModal.status === 'Changes Requested' ? '#FBE7E8' : '#EEECFA', 
                padding: '14px 16px', 
                borderRadius: '12px', 
                marginBottom: '16px', 
                borderLeft: selectedSubmissionForModal.status === 'Changes Requested' ? '4px solid #E88989' : '4px solid #8B7CF6' 
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: selectedSubmissionForModal.status === 'Changes Requested' ? '#B96A70' : '#6D61D9', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageSquare size={14} />
                  SUPERVISOR WRITTEN COMMENTS:
                </div>
                <p style={{ fontSize: '0.9rem', color: '#29283A', lineHeight: 1.5 }}>
                  "{selectedSubmissionForModal.feedback}"
                </p>
              </div>
            )}

            <div style={{ backgroundColor: '#F7F6FC', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #E5E2F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#77758A', textTransform: 'uppercase', marginBottom: '4px' }}>
                Your Submitted Notes:
              </div>
              <p style={{ fontSize: '0.84rem', color: '#29283A', lineHeight: 1.4 }}>
                {selectedSubmissionForModal.notes || 'No custom notes provided.'}
              </p>
              <div style={{ marginTop: '10px' }}>
                <a 
                  href={selectedSubmissionForModal.submissionUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#8B7CF6', fontWeight: 600 }}
                >
                  <ExternalLink size={14} />
                  <span>Inspect Code Repository ({selectedSubmissionForModal.submissionUrl})</span>
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {selectedSubmissionForModal.status === 'Changes Requested' && (
                <button 
                  className="btn btn-warning"
                  onClick={() => {
                    const sub = selectedSubmissionForModal;
                    setSelectedSubmissionForModal(null);
                    handleResubmitClick(sub);
                  }}
                >
                  <RefreshCw size={16} />
                  <span>Resubmit Deliverable</span>
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => setSelectedSubmissionForModal(null)}>
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resubmission Modal */}
      <WorkSubmissionModal 
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        targetTask={selectedTaskForResubmit}
      />
    </div>
  );
}
