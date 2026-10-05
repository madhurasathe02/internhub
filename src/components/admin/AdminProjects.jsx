import React, { useState } from 'react';
import { FolderKanban, Plus, Building, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../StatusBadge';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';

export default function AdminProjects() {
  const { projects } = useApp();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Dynamic filter options
  const mentorOptions = Array.from(new Set(projects.map(p => p.mentor).filter(Boolean)));
  const companyOptions = Array.from(new Set(projects.map(p => p.company).filter(Boolean)));
  const statusOptions = Array.from(new Set(projects.map(p => p.status).filter(Boolean)));

  const filteredProjects = projects.filter(proj => {
    const matchesSearch = (proj.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (proj.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMentor = selectedMentor === 'All' || proj.mentor === selectedMentor;
    const matchesCompany = selectedCompany === 'All' || proj.company === selectedCompany;
    const matchesStatus = selectedStatus === 'All' || proj.status === selectedStatus;
    return matchesSearch && matchesMentor && matchesCompany && matchesStatus;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Projects Catalog (Admin Overview)
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            System-wide registry of technical projects assigned to student cohorts.
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search by project name or description..." 
          style={{ maxWidth: '320px' }}
        />

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#77758A', fontSize: '0.84rem', fontWeight: 600 }}>
            <Filter size={14} />
            <span>Filters:</span>
          </div>

          <select 
            className="form-input" 
            value={selectedMentor}
            onChange={e => setSelectedMentor(e.target.value)}
            style={{ width: 'auto', minWidth: '150px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
          >
            <option value="All">All Mentors</option>
            {mentorOptions.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select 
            className="form-input" 
            value={selectedCompany}
            onChange={e => setSelectedCompany(e.target.value)}
            style={{ width: 'auto', minWidth: '150px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
          >
            <option value="All">All Companies</option>
            {companyOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select 
            className="form-input" 
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            style={{ width: 'auto', minWidth: '130px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
          >
            <option value="All">All Statuses</option>
            {statusOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState 
          icon={<FolderKanban size={40} style={{ color: '#8B7CF6' }} />}
          title="No Projects Found"
          description="No projects match your current search terms or filter selection."
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
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
    </div>
  );
}

