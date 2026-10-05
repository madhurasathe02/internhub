import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  CheckSquare, 
  Clock, 
  Award, 
  ArrowUpRight, 
  Plus,
  MessageSquare,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { MOCK_USER, MOCK_STATS, MOCK_PROJECTS, MOCK_TASKS } from '../mockData';
import StatusBadge from './StatusBadge';

export default function StudentDashboard({ onNavigateToTasks, onNavigateToProjects, onOpenSubmitModal }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [taskFilter, setTaskFilter] = useState('All');

  const getFilteredTasks = () => {
    if (taskFilter === 'All') return tasks;
    return tasks.filter(t => t.status === taskFilter);
  };

  const getStatIcon = (type) => {
    switch (type) {
      case 'projects': return <FolderKanban size={22} />;
      case 'tasks': return <CheckSquare size={22} />;
      case 'hours': return <Clock size={22} />;
      case 'grade': return <Award size={22} />;
      default: return <Sparkles size={22} />;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Welcome Banner */}
      <div className="hero-banner" style={{ marginBottom: 0 }}>
        <div className="hero-banner-accent" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="badge badge-in-progress" style={{ backgroundColor: '#FFFFFF', color: '#6D61D9', marginBottom: '10px' }}>
                🎓 Student Workspace
              </div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#29283A', margin: '4px 0 8px' }}>
                Welcome back, {MOCK_USER.name}!
              </h1>
              <p style={{ color: '#77758A', fontSize: '0.9375rem' }}>
                Current Track: <strong style={{ color: '#29283A' }}>{MOCK_USER.currentInternship}</strong>
              </p>
            </div>

            <button className="btn btn-primary" onClick={onOpenSubmitModal}>
              <Plus size={16} />
              <span>Submit New Work</span>
            </button>
          </div>

          {/* Progress Bar Container */}
          <div style={{ marginTop: '20px', backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E5E2F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
              <span style={{ fontWeight: 700, color: '#29283A' }}>Overall Internship Progress</span>
              <span style={{ fontWeight: 700, color: '#8B7CF6' }}>78% Completed</span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: '#EEECFA', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg, #8B7CF6 0%, #7CA9F8 100%)', borderRadius: '999px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {MOCK_STATS.student.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className={`stat-icon ${stat.color}`}>
              {getStatIcon(stat.type)}
            </div>
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#77758A', marginTop: '4px' }}>{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid: Projects + Feedback */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Active Projects Widget */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Active Internship Projects</h3>
            <button className="btn btn-outline btn-sm" onClick={onNavigateToProjects}>
              <span>View All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {MOCK_PROJECTS.slice(0, 2).map((proj) => (
              <div 
                key={proj.id}
                style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: '1px solid #E5E2F0',
                  backgroundColor: '#FFFFFF',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#29283A' }}>{proj.title}</div>
                    <div style={{ fontSize: '0.78125rem', color: '#77758A' }}>{proj.company} • Supervisor: {proj.mentor}</div>
                  </div>
                  <StatusBadge status={proj.status} />
                </div>

                <p style={{ fontSize: '0.8125rem', color: '#77758A', margin: '8px 0 12px', lineHeight: 1.4 }}>
                  {proj.description}
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {proj.tags.map((tag, i) => (
                    <span key={i} style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', backgroundColor: '#EEECFA', color: '#6D61D9', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#77758A' }}>
                  <span>Tasks Done: {proj.completedTasks} / {proj.tasksCount}</span>
                  <span>Due: {proj.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentor Feedback & Reviews Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Mentor Feedback</h3>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/intern/feedback')}>
              <span>View All & Rate Mentor</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div 
              className="card soft-card-hover"
              onClick={() => navigate('/intern/feedback')}
              style={{ padding: '14px 16px', borderRadius: '12px', backgroundColor: '#EEECFA', borderLeft: '4px solid #8B7CF6', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#29283A' }}>Dr. Sarah Jenkins</span>
                <span style={{ fontSize: '0.75rem', color: '#77758A' }}>2 hours ago</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#29283A', lineHeight: 1.5 }}>
                "Great work on the soft color palette integration! The subtle shadows and lavender accents adhere cleanly to the design specification."
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: '#6D61D9', fontWeight: 600 }}>
                  Task: Implement Soft Lavender & Pastel Theme Tokens
                </span>
                <span style={{ fontSize: '0.72rem', color: '#8B7CF6', fontWeight: 700 }}>Click to inspect →</span>
              </div>
            </div>

            <div 
              className="card soft-card-hover"
              onClick={() => navigate('/intern/feedback')}
              style={{ padding: '14px 16px', borderRadius: '12px', backgroundColor: '#FBE7E8', borderLeft: '4px solid #E88989', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#29283A' }}>Prof. Marcus Vance</span>
                <span style={{ fontSize: '0.75rem', color: '#77758A' }}>Yesterday</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#B96A70', lineHeight: 1.5 }}>
                "Please update the total logged hours label to use dark slate #29283A for higher contrast."
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: '#B96A70', fontWeight: 600 }}>
                  Task: Export Monthly Internship Timesheet PDF
                </span>
                <span style={{ fontSize: '0.72rem', color: '#B96A70', fontWeight: 700 }}>Click to inspect →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Kanban / List Quick Widget */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Assigned Tasks & Deliverables</h3>
            <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
              Filter by status to view pending, completed, or under review items.
            </p>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={onNavigateToTasks}>
            <span>View Task Board</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {['All', 'In Progress', 'Under Review', 'Completed', 'Pending', 'Changes Requested'].map((statusOption) => (
            <button
              key={statusOption}
              onClick={() => setTaskFilter(statusOption)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: taskFilter === statusOption ? '1px solid #8B7CF6' : '1px solid #E5E2F0',
                backgroundColor: taskFilter === statusOption ? '#EEECFA' : '#FFFFFF',
                color: taskFilter === statusOption ? '#6D61D9' : '#77758A',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {statusOption}
            </button>
          ))}
        </div>

        {/* Task List Table */}
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Project</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredTasks().map((task) => (
                <tr key={task.id}>
                  <td style={{ fontWeight: 700, color: '#29283A' }}>{task.title}</td>
                  <td style={{ color: '#77758A' }}>{task.project}</td>
                  <td style={{ color: '#77758A' }}>{task.dueDate}</td>
                  <td>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 600, 
                      padding: '2px 8px', 
                      borderRadius: '4px',
                      backgroundColor: task.priority === 'High' ? '#FBE7E8' : '#EEECFA',
                      color: task.priority === 'High' ? '#B96A70' : '#6D61D9'
                    }}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={task.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
