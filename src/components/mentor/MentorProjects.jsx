import React, { useState } from 'react';
import { FolderKanban, Plus, Building, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../StatusBadge';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';

export default function MentorProjects() {
  const { projects, assignProjectToStudent, studentsList } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('Apex Systems Inc.');
  const [desc, setDesc] = useState('');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title) return;
    assignProjectToStudent({ title, company, description: desc });
    setTitle('');
    setDesc('');
    setShowModal(false);
  };

  const filteredProjects = projects.filter(proj => {
    const matchesSearch = (proj.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (proj.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || proj.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Mentor Projects Management
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Create and assign industry technical projects to your assigned interns.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="card filter-toolbar">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search projects by title or description..." 
          style={{ maxWidth: '340px' }}
        />

        <div className="filter-controls">
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
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState 
          icon={<FolderKanban size={40} style={{ color: '#8B7CF6' }} />}
          title="No Projects Found"
          description="No projects match your current search query or status filter."
        />
      ) : (
        <div className="dashboard-grid-2">
          {filteredProjects.map(proj => (
            <div key={proj.id} className="card soft-card-hover">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-in-progress" style={{ backgroundColor: '#EEECFA', color: '#6D61D9' }}>
                  <Building size={12} />
                  {proj.company}
                </span>
                <StatusBadge status={proj.status} />
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#29283A', marginBottom: '8px' }}>{proj.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#77758A', lineHeight: 1.5, marginBottom: '16px' }}>{proj.description}</p>

              <div style={{ borderTop: '1px solid #E5E2F0', paddingTop: '12px', fontSize: '0.8125rem', color: '#77758A' }}>
                <div>Supervisor: <strong style={{ color: '#29283A' }}>{proj.mentor}</strong></div>
                <div>Deadline: <strong style={{ color: '#29283A' }}>{proj.deadline}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create Internship Project</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input type="text" className="form-input" required value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Company / Partner</label>
                <input type="text" className="form-input" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" rows="3" value={desc} onChange={e => setDesc(e.target.value)} />
              </div>
              <div className="btn-group-responsive" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
