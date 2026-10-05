import React, { useState } from 'react';
import { Briefcase, Plus, Calendar, Building, Users, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';

export default function AdminInternships() {
  const { internships, addInternship } = useApp();
  const [showModal, setShowModal] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Form State
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [duration, setDuration] = useState('6 Months (Oct 2026 - Mar 2027)');
  const [description, setDescription] = useState('');

  const filteredInternships = internships.filter(program => {
    const matchesSearch = (program.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (program.organization || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || program.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTrack = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addInternship({
      title,
      organization: organization || 'Apex Systems Inc.',
      duration,
      description: description || 'Institutional internship track program.',
      mentor: 'Prof. Marcus Vance'
    });

    setTitle('');
    setOrganization('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Internship Programs & Cohorts
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Manage active institutional internship programs and partner company tracks.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          <span>Create Internship Track</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search internship tracks or partner companies..." 
          style={{ maxWidth: '360px' }}
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
            style={{ width: 'auto', minWidth: '140px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredInternships.length === 0 ? (
        <EmptyState 
          icon={<Briefcase size={40} style={{ color: '#8B7CF6' }} />}
          title="No Internship Tracks Found"
          description="No programs match your search term or status filter."
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredInternships.map(program => (
            <div key={program.id} className="card soft-card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-in-progress" style={{ backgroundColor: '#EEECFA', color: '#6D61D9' }}>
                    <Building size={12} />
                    {program.organization}
                  </span>
                  <span className="badge badge-completed">{program.status}</span>
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
                <div style={{ fontSize: '0.8125rem', color: '#8B7CF6', fontWeight: 700 }}>Enrolled Interns: {program.totalInterns} Students</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Internship Track</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateTrack} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Program Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required
                  placeholder="e.g. Cloud Security Engineering Track" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Partner Organization</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required
                  placeholder="e.g. Apex Systems Inc." 
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Program Duration</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Program Description</label>
                <textarea 
                  className="form-textarea" 
                  rows="3"
                  placeholder="Describe program goals and syllabus..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Track</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

