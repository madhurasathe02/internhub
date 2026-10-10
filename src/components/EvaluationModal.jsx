import React, { useState, useEffect } from 'react';
import { Star, Award, CheckCircle2, X, Sparkles, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function EvaluationModal({ isOpen, onClose, student = null, existingEvaluation = null }) {
  const { submitEvaluation } = useApp();

  const [ratings, setRatings] = useState({
    technicalSkills: 5,
    communication: 4,
    problemSolving: 5,
    teamwork: 5,
    taskCompletion: 5,
    professionalism: 5
  });

  const [feedback, setFeedback] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (existingEvaluation) {
      setRatings(existingEvaluation.ratings || {
        technicalSkills: 5,
        communication: 4,
        problemSolving: 5,
        teamwork: 5,
        taskCompletion: 5,
        professionalism: 5
      });
      setFeedback(existingEvaluation.overallFeedback || '');
    } else {
      setRatings({
        technicalSkills: 5,
        communication: 4,
        problemSolving: 5,
        teamwork: 5,
        taskCompletion: 5,
        professionalism: 5
      });
      setFeedback('');
    }
  }, [existingEvaluation, student, isOpen]);

  if (!isOpen || !student) return null;

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const calculateAverage = () => {
    const values = Object.values(ratings);
    const sum = values.reduce((acc, val) => acc + val, 0);
    return (sum / values.length).toFixed(1);
  };

  const avgScore = calculateAverage();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitEvaluation({
      studentId: student.id || 'usr_01',
      studentName: student.name,
      studentAvatar: student.avatar || 'AJ',
      internshipTrack: student.internshipJoined || 'Full Stack Web Development',
      ratings,
      overallScore: parseFloat(avgScore),
      overallFeedback: feedback || 'Demonstrated outstanding technical proficiency and team collaboration throughout the internship.'
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
    }, 1200);
  };

  const categories = [
    { key: 'technicalSkills', label: 'Technical Skills & Code Quality', icon: '💻' },
    { key: 'communication', label: 'Communication & Responsiveness', icon: '💬' },
    { key: 'problemSolving', label: 'Problem Solving & Critical Thinking', icon: '🧩' },
    { key: 'teamwork', label: 'Teamwork & Collaboration', icon: '🤝' },
    { key: 'taskCompletion', label: 'Task Completion & Timeliness', icon: '✅' },
    { key: 'professionalism', label: 'Professionalism & Work Ethic', icon: '👔' },
  ];

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#EEECFA', color: '#8B7CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={20} />
            </div>
            <div>
              <h3 className="modal-title">Internship Performance Evaluation</h3>
              <div style={{ fontSize: '0.78125rem', color: '#77758A' }}>Student: <strong>{student.name}</strong></div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {submittedSuccess ? (
          <div style={{ textAlign: 'center', padding: '36px 0' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              backgroundColor: '#E4F5EA', 
              color: '#4F9D69', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 16px' 
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#29283A', marginBottom: '6px' }}>Evaluation Submitted!</h3>
            <p style={{ fontSize: '0.875rem', color: '#77758A' }}>
              Overall Score: <strong>{avgScore} / 5.0 ⭐</strong>. The student has been notified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Live Rating Score Banner */}
            <div style={{
              backgroundColor: '#EEECFA',
              border: '1px solid #DDD8F2',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6D61D9', textTransform: 'uppercase' }}>OVERALL EVALUATION SCORE:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#29283A' }}>{avgScore} / 5.0 Stars</div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    size={20} 
                    fill={star <= Math.round(avgScore) ? '#8B7CF6' : 'none'} 
                    style={{ color: '#8B7CF6' }} 
                  />
                ))}
              </div>
            </div>

            {/* Rating Categories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
              {categories.map(cat => (
                <div key={cat.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7F6FC', padding: '10px 14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#29283A' }}>
                    <span style={{ marginRight: '6px' }}>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </div>

                  {/* 1-5 Rating Pills */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleRatingChange(cat.key, val)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: ratings[cat.key] === val ? '1px solid #8B7CF6' : '1px solid #E5E2F0',
                          backgroundColor: ratings[cat.key] === val ? '#8B7CF6' : '#FFFFFF',
                          color: ratings[cat.key] === val ? '#FFFFFF' : '#77758A',
                          fontSize: '0.78125rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Written Feedback Textarea */}
            <div className="form-group">
              <label className="form-label">Overall Mentor Feedback & Growth Guidance</label>
              <textarea 
                className="form-textarea"
                rows="3"
                placeholder="Summarize the intern's strengths, key achievements, and areas for professional growth..."
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                required
              />
            </div>

            <div className="btn-group-responsive" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <span>Submit Evaluation</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
