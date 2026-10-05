import React, { useState } from 'react';
import { Users, GraduationCap, FolderKanban, Plus, Award, Star, CheckCircle2, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EvaluationModal from '../EvaluationModal';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';

export default function MentorInterns() {
  const { studentsList, projects, assignProjectToStudent, evaluations } = useApp();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');

  // Evaluation modal state
  const [selectedStudentForEval, setSelectedStudentForEval] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [selectedEvalFilter, setSelectedEvalFilter] = useState('All');

  const handleAssign = (e) => {
    e.preventDefault();
    if (!projectTitle) return;
    assignProjectToStudent({
      title: projectTitle,
      description,
      company: selectedStudent?.company || 'Apex Systems Inc.',
      mentor: 'Dr. Sarah Jenkins'
    });
    setProjectTitle('');
    setDescription('');
    setShowAssignModal(false);
  };

  const getInternEvaluation = (studentId, studentName) => {
    return evaluations.find(e => e.studentId === studentId || e.studentName.toLowerCase() === (studentName || '').toLowerCase());
  };

  const filteredInterns = studentsList.filter(st => {
    const matchesSearch = (st.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (st.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrack = selectedTrack === 'All' || st.internshipJoined === selectedTrack;
    
    const evalData = getInternEvaluation(st.id, st.name);
    const matchesEval = selectedEvalFilter === 'All' || 
                        (selectedEvalFilter === 'Evaluated' && evalData) ||
                        (selectedEvalFilter === 'Pending' && !evalData);

    return matchesSearch && matchesTrack && matchesEval;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            My Assigned Interns
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Supervise students, evaluate performance ratings, assign technical projects, and track milestone deliverables.
          </p>
        </div>
      </div>

      <div className="card">
        {/* Search & Filter Toolbar */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justify: 'space-between',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid #E5E2F0' 
        }}>
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search by intern name or email..." 
            style={{ maxWidth: '340px' }}
          />

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#77758A', fontSize: '0.84rem', fontWeight: 600 }}>
              <Filter size={14} />
              <span>Filters:</span>
            </div>

            <select 
              className="form-input" 
              value={selectedTrack}
              onChange={e => setSelectedTrack(e.target.value)}
              style={{ width: 'auto', minWidth: '160px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
            >
              <option value="All">All Internship Tracks</option>
              <option value="Full Stack Web Development">Full Stack Web Development</option>
              <option value="AI & Machine Learning Engineering">AI & Machine Learning Engineering</option>
              <option value="FinTech Microservices Architecture">FinTech Microservices Architecture</option>
            </select>

            <select 
              className="form-input" 
              value={selectedEvalFilter}
              onChange={e => setSelectedEvalFilter(e.target.value)}
              style={{ width: 'auto', minWidth: '150px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
            >
              <option value="All">All Evaluation Statuses</option>
              <option value="Evaluated">Evaluated</option>
              <option value="Pending">Pending Evaluation</option>
            </select>
          </div>
        </div>

        {filteredInterns.length === 0 ? (
          <EmptyState 
            icon={<GraduationCap size={40} style={{ color: '#8B7CF6' }} />}
            title="No Interns Found"
            description="No intern records match your active search term or filter parameters."
          />
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Intern Name</th>
                  <th>Academic Email</th>
                  <th>Enrolled Track</th>
                  <th>Partner Company</th>
                  <th>Evaluation Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInterns.map(st => {
                  const evalData = getInternEvaluation(st.id, st.name);
                  return (
                    <tr key={st.id}>
                      <td style={{ fontWeight: 700, color: '#29283A' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <GraduationCap size={16} style={{ color: '#8B7CF6' }} />
                          <span>{st.name}</span>
                        </div>
                      </td>
                      <td style={{ color: '#77758A' }}>{st.email}</td>
                      <td style={{ color: '#6D61D9', fontWeight: 600 }}>{st.internshipJoined}</td>
                      <td style={{ color: '#77758A' }}>{st.company}</td>
                      <td>
                        {evalData ? (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EEECFA', color: '#6D61D9', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78125rem', fontWeight: 700 }}>
                            <Star size={13} fill="#8B7CF6" style={{ color: '#8B7CF6' }} />
                            <span>{evalData.overallScore} / 5.0 (Evaluated)</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.78125rem', color: '#77758A', fontStyle: 'italic' }}>Pending Evaluation</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <button 
                            className="btn btn-primary btn-sm"
                            style={{ backgroundColor: evalData ? '#6D61D9' : '#8B7CF6' }}
                            onClick={() => setSelectedStudentForEval(st)}
                          >
                            <Award size={14} />
                            <span>{evalData ? 'Edit Evaluation' : 'Evaluate Intern'}</span>
                          </button>

                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => { setSelectedStudent(st); setShowAssignModal(true); }}
                          >
                            <Plus size={14} />
                            <span>Assign Project</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assign Project Modal */}
      {showAssignModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowAssignModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Assign Project to {selectedStudent?.name}</h3>
              <button className="modal-close" onClick={() => setShowAssignModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAssign}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input type="text" className="form-input" required placeholder="e.g. Microservices API Portal" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Project Description & Objectives</label>
                <textarea className="form-textarea" rows="3" placeholder="Specify project scope and deliverables..." value={description} onChange={e => setDescription(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowAssignModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Assign Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Evaluation Modal */}
      <EvaluationModal 
        isOpen={!!selectedStudentForEval}
        onClose={() => setSelectedStudentForEval(null)}
        student={selectedStudentForEval}
        existingEvaluation={selectedStudentForEval ? getInternEvaluation(selectedStudentForEval.id, selectedStudentForEval.name) : null}
      />
    </div>
  );
}

