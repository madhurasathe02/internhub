import React, { useState } from 'react';
import { Briefcase, Building, CheckCircle2, UserCheck, Calendar, Sparkles, Filter, Search, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';

export default function InternInternship() {
  const { internships = [], requestEnrollment, getStudentEnrollmentStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('All'); // 'All' | 'Enrolled' | 'Available'

  const filteredInternships = internships.filter(program => {
    const matchesSearch = (program.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (program.organization || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (program.mentor || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const status = getStudentEnrollmentStatus(program.id);
    if (filterTab === 'Enrolled') return matchesSearch && status === 'Approved';
    if (filterTab === 'Available') return matchesSearch && status !== 'Approved';
    return matchesSearch;
  });

  const enrolledCount = internships.filter(i => getStudentEnrollmentStatus(i.id) === 'Approved').length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Student Internship Placement & Programs Catalog
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Explore active industry internship tracks added by mentors, partner companies, and manage your enrollment requests.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search by track title, organization, or supervisor..." 
          style={{ maxWidth: '360px' }}
        />

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'All', label: `All Programs (${internships.length})` },
            { id: 'Available', label: `Available Tracks (${internships.length - enrolledCount})` },
            { id: 'Enrolled', label: `My Enrolled (${enrolledCount})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: filterTab === tab.id ? '1px solid #8B7CF6' : '1px solid #E5E2F0',
                backgroundColor: filterTab === tab.id ? '#EEECFA' : '#FFFFFF',
                color: filterTab === tab.id ? '#6D61D9' : '#77758A',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Internship Cards List */}
      {filteredInternships.length === 0 ? (
        <EmptyState 
          icon={<Briefcase size={40} style={{ color: '#8B7CF6' }} />}
          title="No Internship Programs Found"
          description="There are currently no internship tracks matching your search or filter."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredInternships.map(program => {
            const reqStatus = getStudentEnrollmentStatus(program.id);

            return (
              <div key={program.id} className="card soft-card-hover" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span className="badge badge-in-progress" style={{ backgroundColor: '#EEECFA', color: '#6D61D9' }}>
                        <Building size={14} />
                        {program.organization}
                      </span>

                      {reqStatus === 'Approved' ? (
                        <span className="badge badge-completed" style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}>
                          <CheckCircle2 size={12} />
                          Active Enrolled Track
                        </span>
                      ) : reqStatus === 'Pending' ? (
                        <span className="badge badge-in-progress" style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}>
                          ⏳ Request Pending Mentor Approval
                        </span>
                      ) : reqStatus === 'Rejected' ? (
                        <span className="badge badge-in-progress" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}>
                          ⚠️ Request Declined
                        </span>
                      ) : (
                        <span className="badge badge-in-progress" style={{ backgroundColor: '#FFF3D9', color: '#D97706' }}>
                          <Sparkles size={12} />
                          Available for Enrollment
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#29283A', marginBottom: '8px' }}>
                      {program.title}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: '#77758A', lineHeight: 1.5, maxWidth: '680px' }}>
                      {program.description}
                    </p>

                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '16px', fontSize: '0.84rem', color: '#77758A' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <UserCheck size={16} style={{ color: '#8B7CF6' }} />
                        <span>Supervisor: <strong style={{ color: '#29283A' }}>{program.mentor}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={16} style={{ color: '#8B7CF6' }} />
                        <span>Duration: <strong style={{ color: '#29283A' }}>{program.duration}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Briefcase size={16} style={{ color: '#8B7CF6' }} />
                        <span>Capacity: <strong style={{ color: '#29283A' }}>{program.totalInterns || 18} Students</strong></span>
                      </div>
                    </div>
                  </div>

                  {reqStatus === 'Approved' ? (
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.8125rem', color: '#15803D', fontWeight: 700, backgroundColor: '#DCFCE7', padding: '8px 16px', borderRadius: '999px', display: 'inline-block' }}>
                        ✓ Currently Enrolled
                      </span>
                    </div>
                  ) : reqStatus === 'Pending' ? (
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.8125rem', color: '#B45309', fontWeight: 700, backgroundColor: '#FEF3C7', padding: '8px 16px', borderRadius: '999px', display: 'inline-block' }}>
                        ⏳ Pending Mentor Review
                      </span>
                    </div>
                  ) : (
                    <button 
                      className="btn btn-primary" 
                      onClick={() => requestEnrollment(program.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
                    >
                      <span>Request to Join</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
