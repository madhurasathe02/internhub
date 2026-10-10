import React, { useState } from 'react';
import { Briefcase, Plus, Calendar, Building, Users, Filter, CheckCircle2, XCircle, Sparkles, Send, Clock, UserCheck, Maximize2, Minimize2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';

export default function MentorInternships() {
  const { 
    internships = [], 
    addInternship, 
    user, 
    enrollmentRequests = [], 
    approveEnrollmentRequest, 
    rejectEnrollmentRequest 
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Form State for New Internship
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [duration, setDuration] = useState('6 Months (Oct 2026 - Mar 2027)');
  const [description, setDescription] = useState('');
  const [totalInterns, setTotalInterns] = useState('15');

  const filteredInternships = internships.filter(program => {
    const matchesSearch = (program.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (program.organization || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || program.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingRequests = enrollmentRequests.filter(r => r.status === 'Pending');

  const handleCreateInternship = (e) => {
    e.preventDefault();
    if (!title.trim() || !organization.trim()) return;

    addInternship({
      title,
      organization,
      duration,
      description,
      totalInterns: Number(totalInterns) || 15,
      mentor: user?.name || 'Dr. Sarah Jenkins'
    });

    setTitle('');
    setOrganization('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Mentor Internship Management & Approvals
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Publish new internship tracks and review student enrollment requests.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          <span>Create New Internship Track</span>
        </button>
      </div>

      {/* Pending Student Enrollment Requests Section */}
      <div className="card" style={{ padding: '20px 24px', borderLeft: '4px solid #8B7CF6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#29283A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} style={{ color: '#8B7CF6' }} />
              <span>Pending Student Enrollment Requests ({pendingRequests.length})</span>
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
              Review and decide whether to approve or decline student enrollment requests for your internship tracks.
            </p>
          </div>

          <span className="badge badge-in-progress" style={{ backgroundColor: '#EEECFA', color: '#6D61D9', fontWeight: 800 }}>
            {pendingRequests.length} Pending
          </span>
        </div>

        {pendingRequests.length === 0 ? (
          <div style={{ padding: '16px', backgroundColor: '#F7F6FC', borderRadius: '10px', color: '#77758A', fontSize: '0.875rem', textAlign: 'center' }}>
            No pending enrollment requests at this time.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingRequests.map(req => (
              <div 
                key={req.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  flexWrap: 'wrap', 
                  gap: '12px',
                  padding: '14px 18px', 
                  borderRadius: '12px', 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E2F0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="avatar" style={{ width: '38px', height: '38px', fontSize: '0.8125rem', backgroundColor: '#8B7CF6' }}>
                    {req.studentAvatar || 'ST'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#29283A' }}>
                      {req.studentName}
                    </div>
                    <div style={{ fontSize: '0.78125rem', color: '#77758A' }}>
                      Requested Track: <strong style={{ color: '#6D61D9' }}>{req.internshipTitle}</strong> ({req.organization})
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#77758A', marginTop: '2px' }}>
                      Requested: {req.requestedAt} • Email: {req.studentEmail}
                    </div>
                  </div>
                </div>

                <div className="btn-responsive-row">
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => rejectEnrollmentRequest(req.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <XCircle size={14} />
                    <span>Decline Request</span>
                  </button>

                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => approveEnrollmentRequest(req.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <CheckCircle2 size={14} />
                    <span>Approve Enrollment</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="card filter-toolbar">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search internship tracks or partner companies..." 
          style={{ maxWidth: '360px' }}
        />

        <div className="filter-controls">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#77758A', fontSize: '0.84rem', fontWeight: 600 }}>
            <Filter size={14} />
            <span>Filter Status:</span>
          </div>

          <select 
            className="form-input" 
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            style={{ width: 'auto', minWidth: '140px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Internship Cards Grid */}
      {filteredInternships.length === 0 ? (
        <EmptyState 
          icon={<Briefcase size={40} style={{ color: '#8B7CF6' }} />}
          title="No Internship Tracks Found"
          description="No programs match your search query or status filter."
        />
      ) : (
        <div className="dashboard-grid-2">
          {filteredInternships.map(program => (
            <div key={program.id} className="card soft-card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-in-progress" style={{ backgroundColor: '#EEECFA', color: '#6D61D9' }}>
                    <Building size={12} />
                    {program.organization}
                  </span>
                  <span className="badge badge-completed">{program.status || 'Active'}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#29283A', marginBottom: '8px' }}>
                  {program.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: '#77758A', lineHeight: 1.5, marginBottom: '16px' }}>
                  {program.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #E5E2F0', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.8125rem', color: '#77758A' }}>Supervisor: <strong style={{ color: '#29283A' }}>{program.mentor}</strong></div>
                <div style={{ fontSize: '0.8125rem', color: '#77758A' }}>Duration: <strong style={{ color: '#29283A' }}>{program.duration}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#8B7CF6', fontWeight: 700 }}>Available Capacity: {program.totalInterns || 15} Spots</span>
                  {program.joined && (
                    <span style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 700, backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '6px' }}>
                      Enrolled Interns Active
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Create Internship Track */}
      {showModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowModal(false)}>
          <div className={`modal-content ${isFullScreen ? 'modal-fullscreen' : ''}`} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Internship Program Track</h3>
              <div className="modal-header-actions">
                <button 
                  type="button" 
                  className="modal-action-btn" 
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  title={isFullScreen ? "Exit Fullscreen View" : "Open Fullscreen View"}
                >
                  {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
              </div>
            </div>

            <form onSubmit={handleCreateInternship} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Internship Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required
                  placeholder="e.g. Cloud SaaS & Microservices Architecture" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Partner Organization / Company</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required
                  placeholder="e.g. Apex Systems Inc. / Neural Labs" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Program Duration</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required
                    placeholder="e.g. 6 Months (Oct 2026 - Mar 2027)" 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Student Capacity</label>
                  <input 
                    type="number" 
                    min="1"
                    className="form-input" 
                    required
                    placeholder="15" 
                    value={totalInterns}
                    onChange={(e) => setTotalInterns(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Track Description & Objectives</label>
                <textarea 
                  className="form-textarea" 
                  rows="3"
                  required
                  placeholder="Describe the skills taught, real-world deliverables, and partner company mentorship expectations..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="btn-group-responsive" style={{ justifyContent: 'flex-end', marginTop: '16px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  <Send size={16} />
                  <span>Publish Track</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
