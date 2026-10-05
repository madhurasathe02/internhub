import React, { useState } from 'react';
import { Award, ShieldCheck, Clock, CheckCircle2, Eye, FileCheck, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import CertificateView from '../CertificateView';
import EmptyState from '../EmptyState';
import SearchBar from '../SearchBar';

export default function AdminCertificates() {
  const { certificates, verifyAndIssueCertificate, evaluations } = useApp();
  const [selectedCertForPreview, setSelectedCertForPreview] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const pendingCount = certificates.filter(c => c.status === 'pending').length;
  const issuedCount = certificates.filter(c => c.status === 'issued').length;

  const getEvaluationStatus = (internId, internName) => {
    const ev = evaluations.find(e => e.studentId === internId || e.studentName.toLowerCase() === (internName || '').toLowerCase());
    return ev ? `${ev.overallScore} / 5.0 ⭐` : 'Evaluated';
  };

  const filteredCertificates = certificates.filter(c => {
    const matchesSearch = (c.internName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.id || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Certificate Verification & Issuance Management
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Verify mentor certificate recommendations and issue official accredited credentials.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#8B7CF6' }}>
            <Award size={20} />
            <h3 className="card-title" style={{ margin: 0, fontSize: '0.875rem' }}>Total Certificates Record</h3>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#6D61D9' }}>{certificates.length} Total</div>
          <p style={{ fontSize: '0.84rem', color: '#77758A', marginTop: '4px' }}>Registered intern certificate profiles.</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#B98532' }}>
            <Clock size={20} />
            <h3 className="card-title" style={{ margin: 0, fontSize: '0.875rem' }}>Pending Verification</h3>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#B98532' }}>{pendingCount} Pending</div>
          <p style={{ fontSize: '0.84rem', color: '#77758A', marginTop: '4px' }}>Awaiting admin signature and verification.</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#4F9D69' }}>
            <ShieldCheck size={20} />
            <h3 className="card-title" style={{ margin: 0, fontSize: '0.875rem' }}>Issued Credentials</h3>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#4F9D69' }}>{issuedCount} Issued</div>
          <p style={{ fontSize: '0.84rem', color: '#77758A', marginTop: '4px' }}>Verified & available for student download.</p>
        </div>
      </div>

      {/* Certificates Management Table */}
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
            placeholder="Search by intern name or certificate ID..." 
            style={{ maxWidth: '340px' }}
          />

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#77758A', fontSize: '0.84rem', fontWeight: 600 }}>
              <Filter size={14} />
              <span>Status:</span>
            </div>

            <select 
              className="form-input" 
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              style={{ width: 'auto', minWidth: '160px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
            >
              <option value="All">All Statuses</option>
              <option value="pending">Pending Verification</option>
              <option value="issued">Issued</option>
              <option value="not_eligible">Not Eligible</option>
            </select>
          </div>
        </div>

        {filteredCertificates.length === 0 ? (
          <EmptyState 
            icon={<Award size={44} style={{ color: '#8B7CF6' }} />}
            title="No Certificate Records Found"
            description="There are no intern certificate records matching your search query or status filter."
          />
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Intern</th>
                  <th>Internship Track</th>
                  <th>Deliverable Project</th>
                  <th>Mentor Supervisor</th>
                  <th>Completion Date</th>
                  <th>Evaluation Status</th>
                  <th>Certificate Status</th>
                  <th>Certificate ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map(cert => (
                  <tr key={cert.id || cert.internId}>
                    <td style={{ fontWeight: 700, color: '#29283A' }}>{cert.internName}</td>
                    <td style={{ color: '#6D61D9', fontWeight: 600 }}>{cert.internshipTitle}</td>
                    <td style={{ color: '#77758A' }}>{cert.projectName}</td>
                    <td style={{ color: '#77758A' }}>{cert.mentorName}</td>
                    <td style={{ color: '#77758A', fontSize: '0.8125rem' }}>{cert.completionDate || 'Sep 25, 2026'}</td>
                    <td>
                      <span className="badge badge-completed" style={{ fontSize: '0.78125rem' }}>
                        {getEvaluationStatus(cert.internId, cert.internName)}
                      </span>
                    </td>
                    <td>
                      {cert.status === 'issued' ? (
                        <span className="badge badge-completed" style={{ fontSize: '0.78125rem' }}>
                          <CheckCircle2 size={12} /> Issued
                        </span>
                      ) : cert.status === 'pending' ? (
                        <span className="badge badge-pending" style={{ fontSize: '0.78125rem' }}>
                          <Clock size={12} /> Pending Verification
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.78125rem', color: '#77758A', fontStyle: 'italic' }}>
                          Not Eligible
                        </span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#6D61D9' }}>
                        {cert.id || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {cert.status === 'pending' && (
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => verifyAndIssueCertificate(cert.id || cert.internId)}
                            style={{ gap: '6px' }}
                          >
                            <FileCheck size={14} />
                            <span>Verify & Issue Certificate</span>
                          </button>
                        )}

                        {cert.status === 'issued' && (
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => setSelectedCertForPreview(cert)}
                            style={{ gap: '6px' }}
                          >
                            <Eye size={14} />
                            <span>View Certificate</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin Certificate Preview Modal */}
      {selectedCertForPreview && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedCertForPreview(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '880px', width: '95%' }}>
            <div className="modal-header">
              <h3 className="modal-title">Certificate Record: {selectedCertForPreview.internName}</h3>
              <button className="modal-close" onClick={() => setSelectedCertForPreview(null)}>✕</button>
            </div>
            <div style={{ padding: '20px 0' }}>
              <CertificateView certificate={selectedCertForPreview} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
