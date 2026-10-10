import React from 'react';
import { Award, ShieldCheck, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CertificateView({ certificate, onDownload = null }) {
  if (!certificate) return null;

  const handlePrint = () => {
    if (onDownload) {
      onDownload();
    } else {
      window.print();
    }
  };

  const skillsList = Array.isArray(certificate.skills) 
    ? certificate.skills 
    : ['React.js', 'Node.js', 'REST API', 'JavaScript', 'System Architecture'];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Printable Certificate Frame */}
      <div 
        id="printable-certificate"
        className="certificate-container"
        style={{
          width: '100%',
          maxWidth: '840px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '12px solid #EEECFA',
          outline: '2px solid #8B7CF6',
          padding: '40px 48px',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(139, 124, 246, 0.12)',
          color: '#29283A',
          boxSizing: 'border-box',
          backgroundImage: 'radial-gradient(#8B7CF6 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
          backgroundColor: '#FAFAFD'
        }}
      >
        {/* Decorative Corner Accents */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', borderTop: '3px solid #8B7CF6', borderLeft: '3px solid #8B7CF6', width: '32px', height: '32px' }} />
        <div style={{ position: 'absolute', top: '16px', right: '16px', borderTop: '3px solid #8B7CF6', borderRight: '3px solid #8B7CF6', width: '32px', height: '32px' }} />
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', borderBottom: '3px solid #8B7CF6', borderLeft: '3px solid #8B7CF6', width: '32px', height: '32px' }} />
        <div style={{ position: 'absolute', bottom: '16px', right: '16px', borderBottom: '3px solid #8B7CF6', borderRight: '3px solid #8B7CF6', width: '32px', height: '32px' }} />

        {/* Certificate Inner Card */}
        <div className="certificate-inner" style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #DDD8F2',
          borderRadius: '12px',
          padding: '36px 40px',
          textAlign: 'center',
          boxShadow: 'inset 0 0 20px rgba(139, 124, 246, 0.03)'
        }}>

          {/* Top Emblem & Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#EEECFA',
              border: '2px solid #8B7CF6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8B7CF6',
              marginBottom: '4px'
            }}>
              <Award size={32} />
            </div>

            <div style={{ fontSize: '1rem', fontWeight: 900, color: '#6D61D9', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              INTERNHUB ACADEMIC PORTAL
            </div>
            
            <h1 className="cert-header-title" style={{ 
              fontSize: '2rem', 
              fontWeight: 800, 
              color: '#29283A', 
              margin: '6px 0 0',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.02em' 
            }}>
              Certificate of Internship Completion
            </h1>

            <div style={{ width: '120px', height: '3px', backgroundColor: '#8B7CF6', borderRadius: '2px', margin: '8px 0 16px' }} />
          </div>

          {/* Presentation Sub-header */}
          <p style={{ fontSize: '0.9375rem', color: '#77758A', fontStyle: 'italic', margin: '0 0 12px' }}>
            This official certificate is proudly presented to
          </p>

          {/* Recipient Name */}
          <div className="cert-recipient-name" style={{ 
            fontSize: '2.25rem', 
            fontWeight: 800, 
            color: '#6D61D9', 
            fontFamily: 'Georgia, serif',
            margin: '0 0 16px',
            borderBottom: '2px dashed #DDD8F2',
            display: 'inline-block',
            paddingBottom: '6px',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}>
            {certificate.internName || 'Saloni Honrao'}
          </div>

          {/* Course & Organization statement */}
          <p style={{ fontSize: '0.9375rem', color: '#555368', margin: '0 0 20px', lineHeight: 1.6 }}>
            for successfully completing the industry-accredited technical internship program in
            <br />
            <strong style={{ fontSize: '1.15rem', color: '#29283A', fontWeight: 800 }}>{certificate.internshipTitle || 'Full Stack Web Development'}</strong>
            <br />
            at <span style={{ fontWeight: 700, color: '#6D61D9' }}>{certificate.company || 'Apex Systems Inc.'}</span>
          </p>

          {/* Detailed Project & Technical Specifications Box */}
          <div style={{
            backgroundColor: '#F7F6FC',
            border: '1px solid #E5E2F0',
            borderRadius: '10px',
            padding: '16px 20px',
            margin: '0 0 28px',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#77758A', textTransform: 'uppercase' }}>DELIVERABLE PROJECT</span>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#29283A' }}>{certificate.projectName || 'Cloud-Native SaaS Dashboard'}</div>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#77758A', textTransform: 'uppercase' }}>PROGRAM DURATION</span>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#29283A' }}>
                {certificate.startDate || 'Jun 01, 2026'} – {certificate.endDate || 'Nov 30, 2026'}
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#77758A', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                KEY COMPETENCIES & TECHNOLOGIES
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skillsList.map((skill, i) => (
                  <span key={i} style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    backgroundColor: '#EEECFA', 
                    color: '#6D61D9', 
                    padding: '2px 8px', 
                    borderRadius: '6px',
                    border: '1px solid #DDD8F2' 
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dual Signatures & Verification Stamp */}
          <div className="cert-sign-grid" style={{ 
            display: 'flex', 
            justify: 'space-between', 
            alignItems: 'flex-end', 
            flexWrap: 'wrap', 
            gap: '24px',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #E5E2F0'
          }}>
            {/* Signature 1: Mentor */}
            <div style={{ textAlign: 'center', width: '200px' }}>
              <div style={{ 
                fontFamily: 'Cursive, Georgia, serif', 
                fontSize: '1.25rem', 
                fontWeight: 700, 
                color: '#6D61D9', 
                fontStyle: 'italic',
                marginBottom: '4px',
                borderBottom: '1px solid #29283A',
                paddingBottom: '4px'
              }}>
                {certificate.mentorName || 'Dr. Sarah Jenkins'}
              </div>
              <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#29283A' }}>
                {certificate.mentorName || 'Dr. Sarah Jenkins'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#77758A' }}>
                Senior Technical Mentor
              </div>
            </div>

            {/* Middle Stamp emblem */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '4px',
              backgroundColor: '#EEECFA',
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid #DDD8F2'
            }}>
              <ShieldCheck size={24} style={{ color: '#4F9D69' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#4F9D69', letterSpacing: '0.05em' }}>VERIFIED & ISSUED</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6D61D9' }}>{certificate.id || 'INH-2026-0001'}</span>
            </div>

            {/* Signature 2: Admin */}
            <div style={{ textAlign: 'center', width: '200px' }}>
              <div style={{ 
                fontFamily: 'Cursive, Georgia, serif', 
                fontSize: '1.25rem', 
                fontWeight: 700, 
                color: '#6D61D9', 
                fontStyle: 'italic',
                marginBottom: '4px',
                borderBottom: '1px solid #29283A',
                paddingBottom: '4px'
              }}>
                {certificate.adminSignatory || 'Prof. Marcus Vance'}
              </div>
              <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#29283A' }}>
                {certificate.adminSignatory || 'Prof. Marcus Vance'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#77758A' }}>
                Institutional Director
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div style={{ 
            marginTop: '24px', 
            fontSize: '0.72rem', 
            color: '#77758A', 
            display: 'flex', 
            justify: 'space-between',
            alignItems: 'center' 
          }}>
            <span>Certificate ID: <strong>{certificate.id || 'INH-2026-0001'}</strong></span>
            <span>Issued Date: <strong>{certificate.issueDate || 'Sep 25, 2026'}</strong></span>
          </div>
        </div>
      </div>

      {/* Action Buttons Toolbar (Hidden on browser print) */}
      <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button 
          className="btn btn-primary"
          onClick={handlePrint}
          style={{ gap: '8px', padding: '10px 24px', fontSize: '0.9375rem', fontWeight: 700 }}
        >
          <Printer size={18} />
          <span>Print / Download Certificate</span>
        </button>
      </div>
    </div>
  );
}
