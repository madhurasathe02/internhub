import React from 'react';
import { Star, Award, CheckCircle2, UserCheck, MessageSquare } from 'lucide-react';

export default function EvaluationCard({ evaluation }) {
  if (!evaluation) return null;

  const ratings = evaluation.ratings || {
    technicalSkills: 5,
    communication: 4,
    problemSolving: 5,
    teamwork: 5,
    taskCompletion: 5,
    professionalism: 5
  };

  const categories = [
    { key: 'technicalSkills', label: 'Technical Skills', val: ratings.technicalSkills, icon: '💻' },
    { key: 'communication', label: 'Communication', val: ratings.communication, icon: '💬' },
    { key: 'problemSolving', label: 'Problem Solving', val: ratings.problemSolving, icon: '🧩' },
    { key: 'teamwork', label: 'Teamwork', val: ratings.teamwork, icon: '🤝' },
    { key: 'taskCompletion', label: 'Task Completion', val: ratings.taskCompletion, icon: '✅' },
    { key: 'professionalism', label: 'Professionalism', val: ratings.professionalism, icon: '👔' },
  ];

  const overallScore = evaluation.overallScore || 4.8;

  return (
    <div className="card soft-card-hover" style={{ padding: '24px', borderLeft: '4px solid #8B7CF6' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', borderBottom: '1px solid #E5E2F0', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-completed">
              <CheckCircle2 size={12} />
              Evaluated Performance Report
            </span>
            <span style={{ fontSize: '0.78125rem', color: '#77758A' }}>
              Date: {evaluation.evaluatedAt || 'Sep 25, 2026'}
            </span>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#29283A', margin: '4px 0 2px' }}>
            {evaluation.studentName || 'Saloni Honrao'}
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#77758A' }}>
            Track: <strong style={{ color: '#29283A' }}>{evaluation.internshipTrack || 'Full Stack Web Development'}</strong> | Supervisor: {evaluation.mentorName || 'Dr. Sarah Jenkins'}
          </p>
        </div>

        {/* Overall Score Badge */}
        <div style={{ 
          backgroundColor: '#EEECFA', 
          border: '1px solid #DDD8F2', 
          padding: '12px 18px', 
          borderRadius: '14px', 
          textAlign: 'right' 
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6D61D9', textTransform: 'uppercase' }}>
            OVERALL SCORE:
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#29283A' }}>
            {overallScore} / 5.0 ⭐
          </div>
          <div style={{ fontSize: '0.72rem', color: '#4F9D69', fontWeight: 700 }}>
            Grade: A+ (Outstanding)
          </div>
        </div>
      </div>

      {/* Ratings Grid */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#77758A', textTransform: 'uppercase', marginBottom: '12px' }}>
          SKILL CATEGORIES EVALUATION:
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          {categories.map(cat => (
            <div key={cat.key} style={{ backgroundColor: '#F7F6FC', padding: '10px 14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#29283A' }}>
                <span style={{ marginRight: '6px' }}>{cat.icon}</span>
                {cat.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#6D61D9', marginRight: '4px' }}>{cat.val}</span>
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={12} fill={s <= cat.val ? '#8B7CF6' : 'none'} style={{ color: '#8B7CF6' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Written Feedback Notes */}
      {evaluation.overallFeedback && (
        <div style={{ backgroundColor: '#EEECFA', padding: '14px 16px', borderRadius: '12px', borderLeft: '4px solid #8B7CF6' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6D61D9', uppercase: 'true', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MessageSquare size={14} />
            SUPERVISOR WRITTEN FEEDBACK & RECOMMENDATIONS:
          </div>
          <p style={{ fontSize: '0.875rem', color: '#29283A', lineHeight: 1.5 }}>
            "{evaluation.overallFeedback}"
          </p>
        </div>
      )}
    </div>
  );
}
