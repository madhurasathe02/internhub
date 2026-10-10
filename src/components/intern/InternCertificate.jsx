import React, { useState } from 'react';
import { Award, ShieldCheck, Clock, Download, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import CertificateView from '../CertificateView';
import EmptyState from '../EmptyState';

export default function InternCertificate() {
  const { user, getCertificateForStudent, evaluations } = useApp();
  const [showModal, setShowModal] = useState(false);

  const cert = getCertificateForStudent(user?.id, user?.name);
  const evalData = evaluations.find(e => e.studentId === user?.id || e.studentName.toLowerCase() === (user?.name || '').toLowerCase());

  // Determine effective status
  let status = cert?.status || 'not_eligible';

  // If no certificate record but evaluation exists, it's eligible to be recommended
  if (status === 'not_eligible' && evalData) {
    status = 'not_eligible'; // Pending mentor recommendation
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
          My Official Internship Certificate
        </h1>
        <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
          View, verify, and download your accredited certificate of internship completion.
        </p>
      </div>

      {/* Case 1: Certificate Issued */}
      {status === 'issued' && cert ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Status Alert Banner */}
          <div className="card" style={{ 
            backgroundColor: '#E4F5EA', 
            borderLeft: '4px solid #4F9D69',
            padding: '20px 24px',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F9D69' }}>
                <ShieldCheck size={26} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
                  Certificate Verified & Officially Issued!
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#555368', margin: '2px 0 0' }}>
                  Certificate ID: <strong style={{ color: '#29283A' }}>{cert.id}</strong> | Issued on: {cert.issueDate || 'Sep 25, 2026'}
                </p>
              </div>
            </div>

            <div className="btn-group-responsive">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowModal(true)}
                style={{ gap: '6px' }}
              >
                <ExternalLink size={16} />
                <span>View Fullscreen</span>
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => window.print()}
                style={{ gap: '6px' }}
              >
                <Download size={16} />
                <span>Download / Print</span>
              </button>
            </div>
          </div>

          {/* Certificate Embed */}
          <div className="card" style={{ padding: '20px 14px', backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
            <CertificateView certificate={cert} />
          </div>
        </div>
      ) : status === 'pending' && cert ? (
        /* Case 2: Pending Verification */
        <div className="card" style={{ 
          backgroundColor: '#FFF3D9', 
          borderLeft: '4px solid #B98532',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B98532' }}>
              <Clock size={28} />
            </div>
            <div>
              <span className="badge badge-pending" style={{ marginBottom: '6px' }}>
                Status: Pending Admin Verification
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
                Certificate Recommended by Mentor
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#77758A', marginTop: '4px' }}>
                Supervisor <strong>{cert.mentorName}</strong> has submitted your certificate recommendation. The administration is currently verifying your project deliverables and digital signatures.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #FCE2A6', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '0.84rem' }}>
            <div><strong>Internship Track:</strong> {cert.internshipTitle}</div>
            <div><strong>Deliverable Project:</strong> {cert.projectName}</div>
            <div><strong>Mentor Supervisor:</strong> {cert.mentorName}</div>
          </div>
        </div>
      ) : (
        /* Case 3: Not Eligible / Workflow Incomplete */
        <EmptyState 
          icon={<Award size={48} style={{ color: '#8B7CF6' }} />}
          title="Certificate Not Yet Eligible"
          description="Your certificate will become available after your internship project completion and mentor evaluation."
        />
      )}

      {/* Fullscreen Certificate Modal */}
      {showModal && cert && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '95%' }}>
            <div className="modal-header">
              <h3 className="modal-title">Official Certificate Preview</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={{ padding: '20px 0' }}>
              <CertificateView certificate={cert} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
