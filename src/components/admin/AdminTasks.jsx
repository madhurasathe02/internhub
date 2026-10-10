import React, { useState } from 'react';
import { CheckSquare, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../StatusBadge';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';

export default function AdminTasks() {
  const { tasks } = useApp();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedIntern, setSelectedIntern] = useState('All');

  const projectOptions = Array.from(new Set(tasks.map(t => t.project).filter(Boolean)));
  const statusOptions = Array.from(new Set(tasks.map(t => t.status).filter(Boolean)));
  const internOptions = Array.from(new Set(tasks.map(t => t.assignedTo).filter(Boolean)));

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = (t.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = selectedProject === 'All' || t.project === selectedProject;
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;
    const matchesIntern = selectedIntern === 'All' || t.assignedTo === selectedIntern;
    return matchesSearch && matchesProject && matchesStatus && matchesIntern;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
          Tasks & Milestones (Admin Overview)
        </h1>
        <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
          Monitor assigned student deliverables and submission milestone statuses.
        </p>
      </div>

      <div className="card">
        {/* Search & Filter Toolbar */}
        <div className="filter-toolbar">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search tasks by name..." 
          />

          <div className="filter-controls">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#77758A', fontSize: '0.84rem', fontWeight: 600 }}>
              <Filter size={14} />
              <span>Filters:</span>
            </div>

            <select 
              className="form-input" 
              value={selectedProject}
              onChange={e => setSelectedProject(e.target.value)}
              style={{ width: 'auto', minWidth: '130px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
            >
              <option value="All">All Projects</option>
              {projectOptions.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <select 
              className="form-input" 
              value={selectedIntern}
              onChange={e => setSelectedIntern(e.target.value)}
              style={{ width: 'auto', minWidth: '130px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
            >
              <option value="All">All Interns</option>
              {internOptions.map(i => (
                <option key={i} value={i}>{i}</option>
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

        {filteredTasks.length === 0 ? (
          <EmptyState 
            icon={<CheckSquare size={40} style={{ color: '#8B7CF6' }} />}
            title="No Tasks Found"
            description="No task deliverables match your current search query or active filter selections."
          />
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Project</th>
                  <th>Assigned Intern</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map(t => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 700, color: '#29283A' }}>{t.title}</td>
                    <td style={{ color: '#77758A' }}>{t.project}</td>
                    <td style={{ color: '#29283A', fontWeight: 600 }}>{t.assignedTo}</td>
                    <td style={{ color: '#77758A' }}>{t.dueDate}</td>
                    <td>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 600, 
                        padding: '2px 8px', 
                        borderRadius: '4px',
                        backgroundColor: t.priority === 'High' ? '#FBE7E8' : '#EEECFA',
                        color: t.priority === 'High' ? '#B96A70' : '#6D61D9'
                      }}>
                        {t.priority}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={t.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

