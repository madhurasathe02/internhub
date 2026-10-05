import React, { useState } from 'react';
import { Users, UserPlus, Search, GraduationCap, Star, Award, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';

export default function AdminStudents() {
  const { studentsList, addStudent, evaluations } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('Apex Systems');
  const [mentor, setMentor] = useState('Dr. Sarah Jenkins');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInternship, setSelectedInternship] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    addStudent({ name, email, company, mentor });
    setName('');
    setEmail('');
    setShowModal(false);
  };

  const getEvaluationForStudent = (studentId, studentName) => {
    return evaluations.find(e => e.studentId === studentId || e.studentName.toLowerCase() === (studentName || '').toLowerCase());
  };

  // Filter students based on search query, internship, and status
  const filteredStudents = studentsList.filter(st => {
    const matchesSearch = (st.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (st.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInternship = selectedInternship === 'All' || st.internshipJoined === selectedInternship || st.company === selectedInternship;
    const matchesStatus = selectedStatus === 'All' || st.status === selectedStatus;
    return matchesSearch && matchesInternship && matchesStatus;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Student Interns Management
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Manage registered students, assigned mentors, and internship performance evaluations.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <UserPlus size={16} />
          <span>Add New Student</span>
        </button>
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
            placeholder="Search by student name or email..." 
            style={{ maxWidth: '340px' }}
          />

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#77758A', fontSize: '0.84rem', fontWeight: 600 }}>
              <Filter size={14} />
              <span>Filters:</span>
            </div>

            <select 
              className="form-input" 
              value={selectedInternship}
              onChange={e => setSelectedInternship(e.target.value)}
              style={{ width: 'auto', minWidth: '160px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
            >
              <option value="All">All Internship Tracks</option>
              <option value="Full Stack Web Development">Full Stack Web Development</option>
              <option value="AI & Machine Learning Engineering">AI & Machine Learning Engineering</option>
              <option value="FinTech Microservices Architecture">FinTech Microservices Architecture</option>
            </select>

            <select 
              className="form-input" 
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              style={{ width: 'auto', minWidth: '130px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Table / Empty state */}
        {filteredStudents.length === 0 ? (
          <EmptyState 
            icon={<Users size={36} style={{ color: '#8B7CF6' }} />}
            title="No Students Found"
            description="No student records match your active search terms or filter selection."
          />
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Email Address</th>
                  <th>Assigned Mentor</th>
                  <th>Organization</th>
                  <th>Evaluation Summary</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(st => {
                  const evalData = getEvaluationForStudent(st.id, st.name);
                  return (
                    <tr key={st.id}>
                      <td style={{ fontWeight: 700, color: '#29283A' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <GraduationCap size={16} style={{ color: '#8B7CF6' }} />
                          <span>{st.name}</span>
                        </div>
                      </td>
                      <td style={{ color: '#77758A' }}>{st.email}</td>
                      <td style={{ color: '#29283A', fontWeight: 600 }}>{st.mentor}</td>
                      <td style={{ color: '#77758A' }}>{st.company}</td>
                      <td>
                        {evalData ? (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EEECFA', color: '#6D61D9', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78125rem', fontWeight: 800 }}>
                            <Star size={13} fill="#8B7CF6" style={{ color: '#8B7CF6' }} />
                            <span>{evalData.overallScore} / 5.0 ⭐</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.78125rem', color: '#77758A', fontStyle: 'italic' }}>Pending Evaluation</span>
                        )}
                      </td>
                      <td>
                        <span className="badge badge-completed">{st.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Student Intern</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" required value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Academic Email</label>
                <input type="email" className="form-input" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Assigned Company / Partner</label>
                <input type="text" className="form-input" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


