import React, { useState } from 'react';
import { 
  CheckSquare, 
  UploadCloud, 
  Send, 
  AlertTriangle,
  Eye,
  Calendar as CalendarIcon,
  Sparkles,
  RefreshCw,
  LayoutGrid
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';
import DeadlineCalendar from './DeadlineCalendar';
import SearchBar from './SearchBar';

export default function TasksView({ onOpenSubmitModal }) {
  const { tasks, user, projects } = useApp();
  const [viewMode, setViewMode] = useState('board'); // 'board' | 'calendar'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [projectFilter, setProjectFilter] = useState('All');
  const [selectedTask, setSelectedTask] = useState(null);

  const projectOptions = Array.from(new Set(tasks.map(t => t.project).filter(Boolean)));

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = (t.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : t.status === statusFilter;
    const matchesProject = projectFilter === 'All' ? true : t.project === projectFilter;
    return matchesSearch && matchesStatus && matchesProject;
  });

  const handleOpenSubmissionForTask = (task) => {
    setSelectedTask(null);
    if (onOpenSubmitModal) {
      onOpenSubmitModal(task);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Tasks & Deliverables Board
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Track assigned milestones, open tasks, inspect mentor feedback, and submit work.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* View Toggle */}
          <div style={{ display: 'flex', backgroundColor: '#EEECFA', padding: '4px', borderRadius: '10px', border: '1px solid #DDD8F2' }}>
            <button
              onClick={() => setViewMode('board')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: viewMode === 'board' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'board' ? '#6D61D9' : '#77758A',
                fontWeight: 700,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LayoutGrid size={14} />
              <span>Board View</span>
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

          {user?.role === 'student' && (
            <button className="btn btn-primary" onClick={() => onOpenSubmitModal && onOpenSubmitModal()}>
              <UploadCloud size={16} />
              <span>Upload Work Submission</span>
            </button>
          )}
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <DeadlineCalendar onOpenSubmitModal={onOpenSubmitModal} />
      ) : (
        <>
          {/* Filter & Search Bar */}
          <div className="card" style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Search task name or details..." 
              style={{ maxWidth: '300px' }}
            />

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select 
                className="form-input" 
                value={projectFilter}
                onChange={e => setProjectFilter(e.target.value)}
                style={{ width: 'auto', minWidth: '150px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
              >
                <option value="All">All Projects</option>
                {projectOptions.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['All', 'In Progress', 'Under Review', 'Approved', 'Completed', 'Changes Requested'].map((st) => (
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
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Task Cards List or Empty State */}
          {filteredTasks.length === 0 ? (
            <EmptyState 
              icon={<CheckSquare size={40} style={{ color: '#8B7CF6' }} />}
              title="No Tasks Found"
              description={`There are currently no tasks matching the filter "${statusFilter}".`}
              actionLabel={statusFilter !== 'All' ? "Show All Tasks" : null}
              onAction={statusFilter !== 'All' ? () => setStatusFilter('All') : null}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="card soft-card-hover"
                  style={{ 
                    display: 'flex', 
                    justify: 'space-between', 
                    alignItems: 'center', 
                    flexWrap: 'wrap', 
                    gap: '16px',
                    padding: '20px 24px',
                    borderLeft: task.status === 'Changes Requested' ? '4px solid #E88989' : task.status === 'Approved' || task.status === 'Completed' ? '4px solid #4F9D69' : task.status === 'Under Review' ? '4px solid #8B7CF6' : '4px solid transparent'
                  }}
                >
                  <div style={{ flex: 1, minWidth: '280px', cursor: 'pointer' }} onClick={() => setSelectedTask(task)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8B7CF6', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {task.project}
                      </span>
                      <span style={{ color: '#E5E2F0' }}>•</span>
                      <span style={{ fontSize: '0.78125rem', color: '#77758A' }}>Due: {task.dueDate}</span>
                    </div>

                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#29283A', marginBottom: '6px' }}>
                      {task.title}
                    </h3>

                    <p style={{ fontSize: '0.84rem', color: '#77758A', lineHeight: 1.4 }}>
                      {task.description}
                    </p>

                    {task.feedback && (
                      <div style={{ 
                        marginTop: '10px', 
                        padding: '8px 12px', 
                        borderRadius: '8px', 
                        backgroundColor: task.status === 'Changes Requested' ? '#FBE7E8' : '#EEECFA',
                        fontSize: '0.78125rem',
                        color: task.status === 'Changes Requested' ? '#B96A70' : '#6D61D9',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <AlertTriangle size={14} />
                        <span>Mentor Note: {task.feedback}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <StatusBadge status={task.status} />

                    <button 
                      className="btn btn-secondary btn-sm" 
                      onClick={() => setSelectedTask(task)}
                    >
                      <Eye size={14} />
                      <span>Open Task</span>
                    </button>

                    {user?.role === 'student' && (
                      task.status === 'Changes Requested' ? (
                        <button className="btn btn-warning btn-sm" onClick={() => handleOpenSubmissionForTask(task)} style={{ backgroundColor: '#FFF3D9', color: '#8A5D00', border: '1px solid #FCE2A6' }}>
                          <RefreshCw size={14} />
                          <span>Resubmit Work</span>
                        </button>
                      ) : task.status === 'Approved' || task.status === 'Completed' ? (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4F9D69', backgroundColor: '#E4F5EA', padding: '4px 10px', borderRadius: '6px' }}>
                          Approved ✓
                        </span>
                      ) : (
                        <button className="btn btn-primary btn-sm" onClick={() => handleOpenSubmissionForTask(task)}>
                          <Send size={14} />
                          <span>{task.status === 'Under Review' ? 'Update Work' : 'Submit Work'}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Task Inspection & Detail Modal */}
      {selectedTask && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{selectedTask.title}</h3>
              <button className="modal-close" onClick={() => setSelectedTask(null)}>✕</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#8B7CF6' }}>
                {selectedTask.project}
              </span>
              <StatusBadge status={selectedTask.status} />
            </div>

            <div style={{ backgroundColor: '#F7F6FC', padding: '14px 16px', borderRadius: '12px', border: '1px solid #E5E2F0', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#77758A', uppercase: 'true', marginBottom: '6px' }}>
                TASK DETAILS & REQUIREMENTS:
              </div>
              <p style={{ fontSize: '0.875rem', color: '#29283A', lineHeight: 1.5 }}>
                {selectedTask.description}
              </p>
              <div style={{ marginTop: '10px', display: 'flex', gap: '16px', fontSize: '0.78125rem', color: '#77758A' }}>
                <div>Assigned To: <strong style={{ color: '#29283A' }}>{selectedTask.assignedTo}</strong></div>
                <div>Due Date: <strong style={{ color: '#29283A' }}>{selectedTask.dueDate}</strong></div>
                <div>Priority: <strong style={{ color: selectedTask.priority === 'High' ? '#B96A70' : '#29283A' }}>{selectedTask.priority}</strong></div>
              </div>
            </div>

            {selectedTask.feedback && (
              <div style={{
                backgroundColor: selectedTask.status === 'Changes Requested' ? '#FBE7E8' : '#EEECFA',
                padding: '12px 16px',
                borderRadius: '12px',
                marginBottom: '18px',
                borderLeft: selectedTask.status === 'Changes Requested' ? '4px solid #E88989' : '4px solid #8B7CF6'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: selectedTask.status === 'Changes Requested' ? '#B96A70' : '#6D61D9', marginBottom: '4px' }}>
                  SUPERVISOR FEEDBACK:
                </div>
                <p style={{ fontSize: '0.875rem', color: '#29283A' }}>
                  {selectedTask.feedback}
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button className="btn btn-outline" onClick={() => setSelectedTask(null)}>Close</button>
              {user?.role === 'student' && (
                <button 
                  className={selectedTask.status === 'Changes Requested' ? "btn btn-warning" : "btn btn-primary"}
                  onClick={() => handleOpenSubmissionForTask(selectedTask)}
                >
                  <Send size={15} />
                  <span>{selectedTask.status === 'Changes Requested' ? 'Resubmit Work' : 'Submit Work'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
