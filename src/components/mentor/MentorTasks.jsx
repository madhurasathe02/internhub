import React, { useState } from 'react';
import { CheckSquare, Plus, BellRing, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../StatusBadge';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';

export default function MentorTasks() {
  const { tasks, createTask, sendTaskReminder, projects, studentsList } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('Alex Johnson');
  const [project, setProject] = useState(projects[0]?.title || 'Cloud-Native SaaS Dashboard');
  const [priority, setPriority] = useState('High');
  const [dueDate, setDueDate] = useState('Oct 25, 2026');
  const [description, setDescription] = useState('');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedIntern, setSelectedIntern] = useState('All');

  const projectOptions = Array.from(new Set(tasks.map(t => t.project).filter(Boolean)));
  const statusOptions = Array.from(new Set(tasks.map(t => t.status).filter(Boolean)));
  const internOptions = Array.from(new Set(tasks.map(t => t.assignedTo).filter(Boolean)));

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title) return;
    createTask({
      title,
      assignedTo,
      project,
      priority,
      dueDate,
      description
    });
    setTitle('');
    setDescription('');
    setShowModal(false);
  };

  const handleSendReminder = (task) => {
    sendTaskReminder(task.title, task.assignedTo, task.dueDate);
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = (t.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;
    const matchesProject = selectedProject === 'All' || t.project === selectedProject;
    const matchesIntern = selectedIntern === 'All' || t.assignedTo === selectedIntern;
    return matchesSearch && matchesStatus && matchesProject && matchesIntern;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Create & Assign Tasks
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Assign milestone tasks to interns with clear due dates, priorities, and deadline alerts.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          <span>Create New Task</span>
        </button>
      </div>

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
            placeholder="Search task name..." 
            style={{ maxWidth: '300px' }}
          />

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#77758A', fontSize: '0.84rem', fontWeight: 600 }}>
              <Filter size={14} />
              <span>Filters:</span>
            </div>

            <select 
              className="form-input" 
              value={selectedProject}
              onChange={e => setSelectedProject(e.target.value)}
              style={{ width: 'auto', minWidth: '150px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
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
              style={{ width: 'auto', minWidth: '140px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
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
            description="No milestone tasks match your search query or filter criteria."
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
                  <th>Action</th>
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
                    <td>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleSendReminder(t)}
                        title="Send deadline reminder notification to intern"
                      >
                        <BellRing size={14} />
                        <span>Remind Deadline</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Assign New Milestone Task</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input type="text" className="form-input" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Implement OAuth JWT Auth" />
              </div>
              <div className="form-group">
                <label className="form-label">Assign To Intern</label>
                <select className="form-select" value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
                  {studentsList.map(s => (
                    <option key={s.id} value={s.name}>{s.name} ({s.company})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Target Project</label>
                <select className="form-select" value={project} onChange={e => setProject(e.target.value)}>
                  {projects.map(p => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select className="form-select" value={priority} onChange={e => setPriority(e.target.value)}>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input type="text" className="form-input" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Task Description</label>
                <textarea className="form-textarea" rows="3" value={description} onChange={e => setDescription(e.target.value)} placeholder="Detailed requirements for the student..." />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Assign Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
