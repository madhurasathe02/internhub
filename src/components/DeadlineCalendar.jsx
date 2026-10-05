import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  FolderKanban, 
  CheckSquare, 
  FileCheck2, 
  Clock, 
  AlertTriangle, 
  Eye, 
  CheckCircle2,
  X,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';

// Helper to parse date strings like "Sep 28, 2026", "Oct 02, 2026", "Today", "Yesterday"
const parseDateString = (dateStr) => {
  if (!dateStr) return null;
  const now = new Date(2026, 8, 25); // September 25, 2026 reference

  if (dateStr.toLowerCase().includes('today')) {
    return new Date(2026, 8, 25);
  }
  if (dateStr.toLowerCase().includes('yesterday')) {
    return new Date(2026, 8, 24);
  }

  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  return null;
};

export default function DeadlineCalendar({ onOpenSubmitModal }) {
  const { user, projects, tasks, submissions } = useApp();

  // Calendar State: Default to September 2026 (or October 2026)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026
  const [eventTypeFilter, setEventTypeFilter] = useState('All'); // 'All' | 'Projects' | 'Tasks' | 'Submissions'
  const [selectedEvent, setSelectedEvent] = useState(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed (8 = September)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Navigate Months
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Compile Calendar Events from Projects, Tasks, and Submissions
  const compileEvents = () => {
    const eventsList = [];

    // 1. Project Deadlines
    projects.forEach(p => {
      const parsedDate = parseDateString(p.deadline);
      if (parsedDate) {
        eventsList.push({
          id: `evt_proj_${p.id}`,
          title: `Project Due: ${p.title}`,
          rawTitle: p.title,
          type: 'project',
          date: parsedDate,
          dateString: p.deadline,
          company: p.company,
          mentor: p.mentor,
          description: p.description,
          status: p.status,
          progress: p.progress,
          color: 'lavender'
        });
      }
    });

    // 2. Task Deadlines
    tasks.forEach(t => {
      const parsedDate = parseDateString(t.dueDate);
      if (parsedDate) {
        eventsList.push({
          id: `evt_task_${t.id}`,
          title: `Task Due: ${t.title}`,
          rawTitle: t.title,
          type: 'task',
          date: parsedDate,
          dateString: t.dueDate,
          project: t.project,
          assignedTo: t.assignedTo,
          priority: t.priority,
          description: t.description,
          feedback: t.feedback,
          status: t.status,
          color: t.priority === 'High' ? 'pink' : 'blue'
        });
      }
    });

    // 3. Submissions
    submissions.forEach(s => {
      const parsedDate = parseDateString(s.submittedAt);
      if (parsedDate) {
        eventsList.push({
          id: `evt_sub_${s.id}`,
          title: `Submission: ${s.taskTitle}`,
          rawTitle: s.taskTitle,
          type: 'submission',
          date: parsedDate,
          dateString: s.submittedAt,
          studentName: s.studentName,
          project: s.projectTitle,
          notes: s.notes,
          fileAttached: s.fileAttached,
          submissionUrl: s.submissionUrl,
          status: s.status,
          grade: s.grade,
          feedback: s.feedback,
          color: s.status === 'Approved' || s.status === 'Completed' ? 'green' : s.status === 'Changes Requested' ? 'pink' : 'yellow'
        });
      }
    });

    return eventsList;
  };

  const allEvents = compileEvents();

  // Filter events by type
  const filteredEvents = allEvents.filter(evt => {
    if (eventTypeFilter === 'All') return true;
    if (eventTypeFilter === 'Projects') return evt.type === 'project';
    if (eventTypeFilter === 'Tasks') return evt.type === 'task';
    if (eventTypeFilter === 'Submissions') return evt.type === 'submission';
    return true;
  });

  // Calculate Calendar Grid Days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get events for a specific day cell
  const getEventsForDay = (dayNumber) => {
    return filteredEvents.filter(evt => {
      return (
        evt.date.getFullYear() === currentYear &&
        evt.date.getMonth() === currentMonth &&
        evt.date.getDate() === dayNumber
      );
    });
  };

  const isToday = (dayNumber) => {
    return currentYear === 2026 && currentMonth === 8 && dayNumber === 25;
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Calendar Header Controls */}
      <div className="card" style={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Month Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#EEECFA', color: '#8B7CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarIcon size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <span style={{ fontSize: '0.78125rem', color: '#77758A' }}>
                {filteredEvents.length} Scheduled Deadlines & Deliverables
              </span>
            </div>

            <div style={{ display: 'flex', gap: '4px', marginLeft: '12px' }}>
              <button className="icon-btn" onClick={handlePrevMonth} title="Previous Month">
                <ChevronLeft size={18} />
              </button>
              <button className="icon-btn" onClick={handleNextMonth} title="Next Month">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Event Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'All', label: 'All Events' },
              { id: 'Projects', label: 'Project Deadlines' },
              { id: 'Tasks', label: 'Task Deadlines' },
              { id: 'Submissions', label: 'Submissions' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setEventTypeFilter(tab.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: eventTypeFilter === tab.id ? '1px solid #8B7CF6' : '1px solid #E5E2F0',
                  backgroundColor: eventTypeFilter === tab.id ? '#EEECFA' : '#FFFFFF',
                  color: eventTypeFilter === tab.id ? '#6D61D9' : '#77758A',
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
      </div>

      {/* Responsive Calendar Grid */}
      <div className="card" style={{ padding: '20px', overflowX: 'auto' }}>
        {/* Days of Week Header */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: '8px', 
          textAlign: 'center', 
          marginBottom: '12px',
          fontWeight: 700,
          fontSize: '0.8125rem',
          color: '#77758A',
          minWidth: '600px'
        }}>
          {daysOfWeek.map(day => (
            <div key={day} style={{ padding: '6px 0' }}>{day}</div>
          ))}
        </div>

        {/* Days Grid Cells */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: '8px',
          minWidth: '600px'
        }}>
          {/* Empty Cells Before First Day */}
          {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
            <div 
              key={`empty_${idx}`} 
              style={{ 
                minHeight: '100px', 
                backgroundColor: '#F9F9FC', 
                borderRadius: '10px', 
                opacity: 0.5 
              }} 
            />
          ))}

          {/* Month Day Cells */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dayEvents = getEventsForDay(dayNum);
            const todayCell = isToday(dayNum);

            return (
              <div
                key={`day_${dayNum}`}
                style={{
                  minHeight: '100px',
                  backgroundColor: todayCell ? '#F4F2FC' : '#FFFFFF',
                  border: todayCell ? '2px solid #8B7CF6' : '1px solid #E5E2F0',
                  borderRadius: '12px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                {/* Day Number Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ 
                    fontSize: '0.8125rem', 
                    fontWeight: todayCell ? 800 : 700, 
                    color: todayCell ? '#6D61D9' : '#29283A',
                    backgroundColor: todayCell ? '#EEECFA' : 'transparent',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {dayNum}
                  </span>
                  {todayCell && (
                    <span style={{ fontSize: '0.65rem', color: '#8B7CF6', fontWeight: 800, textTransform: 'uppercase' }}>
                      Today
                    </span>
                  )}
                </div>

                {/* Event Items in Day Cell */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', maxHeight: '80px' }}>
                  {dayEvents.map(evt => {
                    let badgeBg = '#EEECFA';
                    let badgeColor = '#6D61D9';
                    if (evt.type === 'project') { badgeBg = '#EEECFA'; badgeColor = '#6D61D9'; }
                    else if (evt.type === 'task') { badgeBg = evt.color === 'pink' ? '#FBE7E8' : '#E2F0FC'; badgeColor = evt.color === 'pink' ? '#B96A70' : '#5688B5'; }
                    else if (evt.type === 'submission') { badgeBg = evt.color === 'green' ? '#E4F5EA' : evt.color === 'pink' ? '#FBE7E8' : '#FFF3D9'; badgeColor = evt.color === 'green' ? '#276A3C' : evt.color === 'pink' ? '#B96A70' : '#8A5D00'; }

                    return (
                      <div
                        key={evt.id}
                        onClick={() => setSelectedEvent(evt)}
                        style={{
                          backgroundColor: badgeBg,
                          color: badgeColor,
                          padding: '3px 6px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          transition: 'transform 0.15s ease'
                        }}
                        title={evt.title}
                      >
                        {evt.type === 'project' ? '📁 ' : evt.type === 'task' ? '📋 ' : '📬 '}
                        {evt.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Inspection Modal */}
      {selectedEvent && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '10px', 
                  backgroundColor: '#EEECFA', 
                  color: '#8B7CF6', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {selectedEvent.type === 'project' ? <FolderKanban size={18} /> : selectedEvent.type === 'task' ? <CheckSquare size={18} /> : <FileCheck2 size={18} />}
                </div>
                <h3 className="modal-title">{selectedEvent.title}</h3>
              </div>
              <button className="modal-close" onClick={() => setSelectedEvent(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge badge-in-progress" style={{ backgroundColor: '#EEECFA', color: '#6D61D9', textTransform: 'capitalize' }}>
                {selectedEvent.type === 'project' ? 'Project Deadline' : selectedEvent.type === 'task' ? 'Task Deadline' : 'Work Submission'}
              </span>
              <StatusBadge status={selectedEvent.status} />
            </div>

            <div style={{ backgroundColor: '#F7F6FC', padding: '16px', borderRadius: '12px', border: '1px solid #E5E2F0', marginBottom: '18px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#77758A', uppercase: 'true', marginBottom: '6px' }}>
                EVENT DETAILS:
              </div>
              <div style={{ fontSize: '0.875rem', color: '#29283A', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedEvent.company && <div>• Partner Company: <strong style={{ color: '#29283A' }}>{selectedEvent.company}</strong></div>}
                {selectedEvent.project && <div>• Target Project: <strong style={{ color: '#29283A' }}>{selectedEvent.project}</strong></div>}
                {selectedEvent.mentor && <div>• Supervisor Mentor: <strong style={{ color: '#29283A' }}>{selectedEvent.mentor}</strong></div>}
                {selectedEvent.assignedTo && <div>• Assigned Student: <strong style={{ color: '#29283A' }}>{selectedEvent.assignedTo}</strong></div>}
                {selectedEvent.dateString && <div>• Due / Scheduled Date: <strong style={{ color: '#8B7CF6' }}>{selectedEvent.dateString}</strong></div>}
                {selectedEvent.description && <div style={{ marginTop: '4px', fontSize: '0.8125rem', color: '#77758A' }}>{selectedEvent.description}</div>}
              </div>
            </div>

            {selectedEvent.notes && (
              <div style={{ backgroundColor: '#EEECFA', padding: '12px 14px', borderRadius: '10px', marginBottom: '18px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6D61D9', marginBottom: '4px' }}>SUBMISSION NOTES:</div>
                <p style={{ fontSize: '0.84rem', color: '#29283A' }}>{selectedEvent.notes}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setSelectedEvent(null)}>Close</button>
              {user?.role === 'student' && selectedEvent.type === 'task' && (
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedEvent(null);
                    if (onOpenSubmitModal) onOpenSubmitModal({ title: selectedEvent.rawTitle, project: selectedEvent.project });
                  }}
                >
                  <span>Submit Work for Task</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
