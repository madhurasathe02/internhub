import React, { useState } from 'react';
import { BarChart3, Download, Award, CheckCircle2, Star, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EvaluationCard from '../EvaluationCard';

export default function AdminReports() {
  const { evaluations } = useApp();
  const [selectedEvalForView, setSelectedEvalForView] = useState(null);

  const totalEvals = evaluations.length;
  const avgCohortScore = totalEvals > 0 
    ? (evaluations.reduce((acc, e) => acc + (e.overallScore || 0), 0) / totalEvals).toFixed(2)
    : '4.55';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Program Completion & Evaluation Summaries
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Comprehensive student performance ratings, supervisor reviews, and institutional compliance records.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => alert('Generating full cohort evaluation summary export...')}>
          <Download size={16} />
          <span>Export Analytics Summary</span>
        </button>
      </div>

      {/* Analytics KPI Grid */}
      <div className="stat-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="card stat-card-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#8B7CF6' }}>
            <Award size={20} />
            <h3 className="card-title" style={{ margin: 0, fontSize: '0.875rem' }}>Evaluations Completed</h3>
          </div>
          <div className="metric-number" style={{ fontSize: '2.25rem', fontWeight: 800, color: '#6D61D9' }}>{totalEvals} Students</div>
          <p style={{ fontSize: '0.84rem', color: '#77758A', marginTop: '4px' }}>Supervisor ratings recorded in active session.</p>
        </div>

        <div className="card stat-card-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#4F9D69' }}>
            <Star size={20} fill="#4F9D69" />
            <h3 className="card-title" style={{ margin: 0, fontSize: '0.875rem' }}>Cohort Mean Score</h3>
          </div>
          <div className="metric-number" style={{ fontSize: '2.25rem', fontWeight: 800, color: '#4F9D69' }}>{avgCohortScore} / 5.0</div>
          <p style={{ fontSize: '0.84rem', color: '#77758A', marginTop: '4px' }}>Average score across all 6 skill categories.</p>
        </div>

        <div className="card stat-card-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#7CA9F8' }}>
            <CheckCircle2 size={20} />
            <h3 className="card-title" style={{ margin: 0, fontSize: '0.875rem' }}>Submission Compliance</h3>
          </div>
          <div className="metric-number" style={{ fontSize: '2.25rem', fontWeight: 800, color: '#7CA9F8' }}>96.5%</div>
          <p style={{ fontSize: '0.84rem', color: '#77758A', marginTop: '4px' }}>Evaluated deliverables on-time completion rate.</p>
        </div>
      </div>

      {/* Internship Evaluation Summaries Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 className="card-title" style={{ margin: 0 }}>Internship Evaluation Summaries</h3>
            <p style={{ fontSize: '0.8125rem', color: '#77758A', margin: '2px 0 0' }}>Overview of student skill ratings and supervisor written feedback.</p>
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student Intern</th>
                <th>Internship Track</th>
                <th>Supervisor Mentor</th>
                <th>Overall Rating</th>
                <th>Grade Classification</th>
                <th>Date Evaluated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map(ev => (
                <tr key={ev.id}>
                  <td style={{ fontWeight: 700, color: '#29283A' }}>{ev.studentName}</td>
                  <td style={{ color: '#6D61D9', fontWeight: 600 }}>{ev.internshipTrack}</td>
                  <td style={{ color: '#77758A' }}>{ev.mentorName}</td>
                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EEECFA', color: '#6D61D9', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8125rem', fontWeight: 800 }}>
                      <Star size={13} fill="#8B7CF6" style={{ color: '#8B7CF6' }} />
                      <span>{ev.overallScore} / 5.0</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-completed" style={{ fontSize: '0.78125rem' }}>
                      {ev.gradeLabel || 'A+ (Outstanding)'}
                    </span>
                  </td>
                  <td style={{ color: '#77758A', fontSize: '0.8125rem' }}>{ev.evaluatedAt}</td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedEvalForView(ev)}
                    >
                      <Eye size={14} />
                      <span>View Report</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to view full Evaluation Card for selected intern */}
      {selectedEvalForView && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedEvalForView(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Evaluation Report: {selectedEvalForView.studentName}</h3>
              <button className="modal-close" onClick={() => setSelectedEvalForView(null)}>✕</button>
            </div>
            <div style={{ marginTop: '12px' }}>
              <EvaluationCard evaluation={selectedEvalForView} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

