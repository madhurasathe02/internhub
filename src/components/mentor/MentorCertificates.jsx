import React, { useState } from 'react';
import { Award, CheckCircle2, Star, Clock, Send, GraduationCap, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EmptyState from '../EmptyState';
import SearchBar from '../SearchBar';

export default function MentorCertificates() {
  const { studentsList, evaluations, certificates, recommendCertificate } = useApp();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const getInternEvaluation = (studentId, studentName) => {
    return evaluations.find(e => e.studentId === studentId || e.studentName.toLowerCase() === (studentName || '').toLowerCase());
  };

  const getInternCertificate = (studentId, studentName) => {
    return certificates.find(c => c.internId === studentId || c.internName.toLowerCase() === (studentName || '').toLowerCase());
  };

  const filteredStudents = studentsList.filter(st => {
    const matchesSearch = (st.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const certData = getInternCertificate(st.id, st.name);
    const certStatus = certData?.status || 'not_eligible';

    const matchesStatus = selectedStatus === 'All' || 
                          (selectedStatus === 'not_recommended' && certStatus === 'not_eligible') ||
                          (selectedStatus === 'pending' && certStatus === 'pending') ||
                          (selectedStatus === 'issued' && certStatus === 'issued');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
          Intern Certificate Eligibility & Recommendations
        </h1>
        <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
          Recommend qualified interns for official completion certificates after performance evaluation.
        </p>
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
            placeholder="Search by intern name..." 
            style={{ maxWidth: '340px' }}
          />

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#77758A', fontSize: '0.84rem', fontWeight: 600 }}>
              <Filter size={14} />
              <span>Certificate Status:</span>
            </div>

            <select 
              className="form-input" 
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              style={{ width: 'auto', minWidth: '170px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
            >
              <option value="All">All Statuses</option>
              <option value="not_recommended">Not Recommended</option>
              <option value="pending">Pending Verification</option>
              <option value="issued">Issued</option>
            </select>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <EmptyState 
            icon={<Award size={44} style={{ color: '#8B7CF6' }} />}
            title="No Interns Found"
            description="No assigned intern records match your search term or certificate status filter."
          />
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Intern Name</th>
                  <th>Enrolled Internship</th>
                  <th>Evaluation Status</th>
                  <th>Completion Status</th>
                  <th>Certificate Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(st => {
                  const evalData = getInternEvaluation(st.id, st.name);
                  const certData = getInternCertificate(st.id, st.name);

                  const isEvaluated = !!evalData;
                  const certStatus = certData?.status || 'not_eligible';

                  return (
                    <tr key={st.id}>
                      <td style={{ fontWeight: 700, color: '#29283A' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <GraduationCap size={16} style={{ color: '#8B7CF6' }} />
                          <span>{st.name}</span>
                        </div>
                      </td>
                      <td style={{ color: '#6D61D9', fontWeight: 600 }}>
                        {st.internshipJoined || 'Full Stack Web Development'}
                      </td>
                      <td>
                        {isEvaluated ? (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EEECFA', color: '#6D61D9', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78125rem', fontWeight: 700 }}>
                            <Star size={13} fill="#8B7CF6" style={{ color: '#8B7CF6' }} />
                            <span>{evalData.overallScore} / 5.0 (Evaluated)</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.78125rem', color: '#77758A', fontStyle: 'italic' }}>Evaluation Pending</span>
                        )}
                      </td>
                      <td>
                        <span className="badge badge-completed">Project Deliverable Completed</span>
                      </td>
                      <td>
                        {certStatus === 'issued' ? (
                          <span className="badge badge-completed" style={{ fontSize: '0.78125rem' }}>
                            <CheckCircle2 size={12} /> Issued ({certData.id})
                          </span>
                        ) : certStatus === 'pending' ? (
                          <span className="badge badge-pending" style={{ fontSize: '0.78125rem' }}>
                            <Clock size={12} /> Pending Admin Verification
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.78125rem', color: '#77758A', fontStyle: 'italic' }}>
                            Not Recommended
                          </span>
                        )}
                      </td>
                      <td>
                        {certStatus === 'issued' ? (
                          <span style={{ fontSize: '0.8125rem', color: '#4F9D69', fontWeight: 700 }}>Certificate Issued</span>
                        ) : certStatus === 'pending' ? (
                          <span style={{ fontSize: '0.8125rem', color: '#B98532', fontWeight: 700 }}>Awaiting Admin</span>
                        ) : (
                          <button 
                            className="btn btn-primary btn-sm"
                            disabled={!isEvaluated}
                            onClick={() => recommendCertificate(st.id, st.name)}
                            style={{ 
                              opacity: isEvaluated ? 1 : 0.6, 
                              cursor: isEvaluated ? 'pointer' : 'not-allowed',
                              gap: '6px'
                            }}
                            title={!isEvaluated ? 'Complete mentor evaluation first' : 'Recommend student for certificate'}
                          >
                            <Send size={14} />
                            <span>Recommend Certificate</span>
                          </button>
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
    </div>
  );
}
