import React, { useState } from 'react';
import { 
  FolderKanban, 
  Search, 
  Plus, 
  Calendar as CalendarIcon, 
  Building, 
  UserCheck, 
  CheckCircle2,
  ExternalLink,
  LayoutGrid
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';
import DeadlineCalendar from './DeadlineCalendar';

export default function ProjectsView({ onOpenSubmitModal }) {
  const { projects, user } = useApp();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'calendar'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Internship Projects Catalog
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Browse active industry assignments, technical specifications, and team deliverables.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* View Toggle */}
          <div style={{ display: 'flex', backgroundColor: '#EEECFA', padding: '4px', borderRadius: '10px', border: '1px solid #DDD8F2' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'grid' ? '#6D61D9' : '#77758A',
                fontWeight: 700,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LayoutGrid size={14} />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: viewMode === 'calendar' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'calendar' ? '#6D61D9' : '#77758A',
                fontWeight: 700,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <CalendarIcon size={14} />
              <span>Deadline Calendar</span>
            </button>
          </div>

          {user?.role === 'admin' && (
            <button className="btn btn-primary" onClick={() => alert('New Project creation form in Admin Portal!')}>
              <Plus size={16} />
              <span>Propose New Project</span>
            </button>
          )}
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <DeadlineCalendar onOpenSubmitModal={onOpenSubmitModal} />
      ) : (
        <>
          {/* Filter & Search Bar */}
          <div className="card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div className="navbar-search" style={{ width: '300px' }}>
                <Search className="navbar-search-icon" size={16} />
                <input 
                  type="text" 
                  placeholder="Search by title, company, tech stack..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['All', 'In Progress', 'Under Review', 'Completed', 'Pending'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '999px',
                      border: statusFilter === st ? '1px solid #8B7CF6' : '1px solid #E5E2F0',
                      backgroundColor: statusFilter === st ? '#EEECFA' : '#FFFFFF',
                      color: statusFilter === st ? '#6D61D9' : '#77758A',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Cards Grid or Empty State */}
          {filteredProjects.length === 0 ? (
            <EmptyState 
              icon={<FolderKanban size={40} style={{ color: '#8B7CF6' }} />}
              title="No Projects Found"
              description="There are currently no internship projects matching your search or status filter."
              actionLabel={searchQuery || statusFilter !== 'All' ? "Clear Filters" : null}
              onAction={() => { setSearchQuery(''); setStatusFilter('All'); }}
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {filteredProjects.map((proj) => (
                <div key={proj.id} className="card soft-card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <span className="badge badge-in-progress" style={{ backgroundColor: '#EEECFA', color: '#6D61D9' }}>
                        <Building size={12} />
                        {proj.company}
                      </span>
                      <StatusBadge status={proj.status} />
                    </div>

                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#29283A', marginBottom: '8px' }}>
                      {proj.title}
                    </h3>

                    <p style={{ fontSize: '0.875rem', color: '#77758A', lineHeight: 1.5, marginBottom: '16px' }}>
                      {proj.description}
                    </p>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {proj.tags.map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '6px', backgroundColor: '#F7F6FC', color: '#77758A', fontWeight: 600, border: '1px solid #E5E2F0' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #E5E2F0', paddingTop: '16px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
                      <span style={{ color: '#77758A' }}>Supervisor: <strong style={{ color: '#29283A' }}>{proj.mentor}</strong></span>
                      <span style={{ fontWeight: 700, color: '#8B7CF6' }}>{proj.progress}%</span>
                    </div>

                    <div style={{ height: '6px', backgroundColor: '#EEECFA', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}>
                      <div style={{ width: `${proj.progress}%`, height: '100%', backgroundColor: '#8B7CF6', borderRadius: '3px' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78125rem', color: '#77758A' }}>
                        <CalendarIcon size={14} />
                        <span>Due: {proj.deadline}</span>
                      </div>

                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedProject(proj)}
                      >
                        <span>Project Spec</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Project Spec Modal */}
      {selectedProject && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{selectedProject.title}</h3>
              <button className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <span className="badge badge-in-progress" style={{ backgroundColor: '#EEECFA', color: '#6D61D9', marginBottom: '8px' }}>
                {selectedProject.company}
              </span>
              <p style={{ fontSize: '0.9375rem', color: '#77758A', marginTop: '8px', lineHeight: 1.5 }}>
                {selectedProject.description}
              </p>
            </div>

            <div style={{ backgroundColor: '#F7F6FC', padding: '16px', borderRadius: '12px', border: '1px solid #E5E2F0', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#29283A', marginBottom: '8px' }}>Project Parameters</div>
              <div style={{ fontSize: '0.8125rem', color: '#77758A', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>• Academic Mentor: <strong style={{ color: '#29283A' }}>{selectedProject.mentor}</strong></div>
                <div>• Completion Target: <strong style={{ color: '#29283A' }}>{selectedProject.deadline}</strong></div>
                <div>• Total Milestone Tasks: <strong style={{ color: '#29283A' }}>{selectedProject.tasksCount} Tasks</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setSelectedProject(null)}>Close</button>
              {user?.role === 'student' && (
                <button className="btn btn-primary" onClick={() => { setSelectedProject(null); onOpenSubmitModal && onOpenSubmitModal({ project: selectedProject.title }); }}>
                  <span>Submit Work for Project</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
