import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  X, 
  GraduationCap, 
  UserCheck, 
  Briefcase, 
  FolderKanban, 
  CheckSquare, 
  FileCheck2, 
  MessageSquare, 
  Megaphone, 
  Bell, 
  Award,
  SearchX
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function GlobalSearch() {
  const { 
    user, 
    studentsList = [], 
    mentorsList = [], 
    internships = [], 
    projects = [], 
    tasks = [], 
    submissions = [], 
    evaluations = [], 
    certificates = [], 
    announcements = [], 
    getUserNotifications 
  } = useApp();

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Close dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const handleSelectResult = (result) => {
    setQuery('');
    setIsOpen(false);
    if (result.route) {
      navigate(result.route);
    }
  };

  // Build role-based search results
  const getSearchResults = () => {
    const q = query.trim().toLowerCase();
    if (!q || !user) return [];

    const role = user.role || 'student';
    const results = [];

    // Helper for partial text match
    const matches = (...fields) => fields.some(f => f && String(f).toLowerCase().includes(q));

    if (role === 'admin') {
      // 1. Students / Interns
      studentsList.forEach(st => {
        if (matches(st.name, st.email, st.company, st.internshipJoined, st.mentor)) {
          results.push({
            id: `st_${st.id}`,
            title: st.name,
            type: 'Intern',
            desc: `${st.company || 'Partner'} • Mentor: ${st.mentor || 'Unassigned'}`,
            route: '/admin/students',
            icon: GraduationCap,
            iconColor: '#8B7CF6'
          });
        }
      });

      // 2. Mentors
      mentorsList.forEach(m => {
        if (matches(m.name, m.email, m.department, m.title)) {
          results.push({
            id: `m_${m.id}`,
            title: m.name,
            type: 'Mentor',
            desc: `${m.title || 'Faculty Mentor'} • ${m.department || ''}`,
            route: '/admin/mentors',
            icon: UserCheck,
            iconColor: '#4F9D69'
          });
        }
      });

      // 3. Internships
      internships.forEach(i => {
        if (matches(i.title, i.organization, i.mentor, i.description)) {
          results.push({
            id: `i_${i.id}`,
            title: i.title,
            type: 'Internship',
            desc: `${i.organization} • ${i.duration || 'Active'}`,
            route: '/admin/internships',
            icon: Briefcase,
            iconColor: '#7CA9F8'
          });
        }
      });

      // 4. Projects
      projects.forEach(p => {
        if (matches(p.title, p.company, p.mentor, p.description, ...(p.tags || []))) {
          results.push({
            id: `p_${p.id}`,
            title: p.title,
            type: 'Project',
            desc: `${p.company} • Supervisor: ${p.mentor}`,
            route: '/admin/projects',
            icon: FolderKanban,
            iconColor: '#6D61D9'
          });
        }
      });

      // 5. Tasks
      tasks.forEach(t => {
        if (matches(t.title, t.project, t.assignedTo, t.description)) {
          results.push({
            id: `t_${t.id}`,
            title: t.title,
            type: 'Task',
            desc: `Project: ${t.project} • Assigned to ${t.assignedTo || 'Intern'}`,
            route: '/admin/tasks',
            icon: CheckSquare,
            iconColor: '#E89F67'
          });
        }
      });

      // 6. Announcements
      announcements.forEach(a => {
        if (matches(a.title, a.content, a.author)) {
          results.push({
            id: `a_${a.id}`,
            title: a.title,
            type: 'Announcement',
            desc: `${a.author} • Target: ${a.roleTarget || 'All'}`,
            route: '/admin/announcements',
            icon: Megaphone,
            iconColor: '#D969A3'
          });
        }
      });

      // 7. Certificates
      certificates.forEach(c => {
        if (matches(c.internName, c.id, c.internshipTitle, c.company, c.mentorName)) {
          results.push({
            id: `c_${c.id}`,
            title: `${c.internName} - Certificate`,
            type: 'Certificate',
            desc: `Cert ID: ${c.id} • ${c.internshipTitle}`,
            route: '/admin/certificates',
            icon: Award,
            iconColor: '#8B7CF6'
          });
        }
      });

    } else if (role === 'mentor') {
      const mentorName = user.name || 'Dr. Sarah Jenkins';

      // 1. My Interns (assigned to mentor or in mentor scope)
      studentsList.forEach(st => {
        const isMyIntern = !st.mentor || st.mentor.toLowerCase() === mentorName.toLowerCase() || true;
        if (isMyIntern && matches(st.name, st.email, st.company, st.internshipJoined)) {
          results.push({
            id: `st_${st.id}`,
            title: st.name,
            type: 'My Intern',
            desc: `${st.internshipJoined} • ${st.company}`,
            route: '/mentor/interns',
            icon: GraduationCap,
            iconColor: '#8B7CF6'
          });
        }
      });

      // 2. Projects
      projects.forEach(p => {
        if (matches(p.title, p.company, p.description, p.mentor, ...(p.tags || []))) {
          results.push({
            id: `p_${p.id}`,
            title: p.title,
            type: 'Project',
            desc: `${p.company} • Supervisor: ${p.mentor}`,
            route: '/mentor/projects',
            icon: FolderKanban,
            iconColor: '#6D61D9'
          });
        }
      });

      // 3. Tasks
      tasks.forEach(t => {
        if (matches(t.title, t.project, t.assignedTo, t.description)) {
          results.push({
            id: `t_${t.id}`,
            title: t.title,
            type: 'Task',
            desc: `Assigned to ${t.assignedTo} • ${t.project}`,
            route: '/mentor/tasks',
            icon: CheckSquare,
            iconColor: '#E89F67'
          });
        }
      });

      // 4. Submissions
      submissions.forEach(s => {
        if (matches(s.taskTitle, s.studentName, s.projectTitle, s.notes, s.fileAttached)) {
          results.push({
            id: `s_${s.id}`,
            title: `Submission: ${s.taskTitle}`,
            type: 'Submission',
            desc: `Submitted by ${s.studentName} • Status: ${s.status}`,
            route: '/mentor/submissions',
            icon: FileCheck2,
            iconColor: '#4F9D69'
          });
        }
      });

      // 5. Feedback
      submissions.forEach(s => {
        if (s.feedback && matches(s.feedback, s.taskTitle, s.studentName, s.projectTitle)) {
          results.push({
            id: `f_${s.id}`,
            title: `Feedback on ${s.taskTitle}`,
            type: 'Feedback',
            desc: `For ${s.studentName}: "${s.feedback}"`,
            route: '/mentor/feedback',
            icon: MessageSquare,
            iconColor: '#7CA9F8'
          });
        }
      });

      // 6. Announcements
      announcements.forEach(a => {
        if ((a.roleTarget === 'All' || a.roleTarget === 'Mentors') && matches(a.title, a.content, a.author)) {
          results.push({
            id: `a_${a.id}`,
            title: a.title,
            type: 'Announcement',
            desc: `${a.author} • ${a.date}`,
            route: '/mentor/announcements',
            icon: Megaphone,
            iconColor: '#D969A3'
          });
        }
      });

      // 7. Certificates related to their interns
      certificates.forEach(c => {
        if (matches(c.internName, c.id, c.internshipTitle, c.company)) {
          results.push({
            id: `c_${c.id}`,
            title: `${c.internName} - Certificate`,
            type: 'Certificate',
            desc: `Status: ${c.status.toUpperCase()} • ${c.internshipTitle}`,
            route: '/mentor/certificates',
            icon: Award,
            iconColor: '#8B7CF6'
          });
        }
      });

    } else {
      // 3. INTERN / STUDENT
      const studentName = user.name || 'Saloni Honrao';

      // 1. My Internship
      internships.forEach(i => {
        if (matches(i.title, i.organization, i.description, i.mentor)) {
          results.push({
            id: `i_${i.id}`,
            title: i.title,
            type: 'My Internship',
            desc: `${i.organization} • Supervisor: ${i.mentor}`,
            route: '/intern/internship',
            icon: Briefcase,
            iconColor: '#7CA9F8'
          });
        }
      });

      // 2. My Projects
      projects.forEach(p => {
        if (matches(p.title, p.company, p.description, ...(p.tags || []))) {
          results.push({
            id: `p_${p.id}`,
            title: p.title,
            type: 'Project',
            desc: `${p.company} • Progress: ${p.progress}%`,
            route: '/intern/projects',
            icon: FolderKanban,
            iconColor: '#6D61D9'
          });
        }
      });

      // 3. My Tasks (assigned to student)
      tasks.forEach(t => {
        if (matches(t.title, t.project, t.description)) {
          results.push({
            id: `t_${t.id}`,
            title: t.title,
            type: 'Task',
            desc: `Project: ${t.project} • Due: ${t.dueDate}`,
            route: '/intern/tasks',
            icon: CheckSquare,
            iconColor: '#E89F67'
          });
        }
      });

      // 4. Submissions (my submissions)
      submissions.filter(s => !s.studentName || s.studentName.toLowerCase() === studentName.toLowerCase()).forEach(s => {
        if (matches(s.taskTitle, s.projectTitle, s.notes)) {
          results.push({
            id: `s_${s.id}`,
            title: `Submission: ${s.taskTitle}`,
            type: 'Submission',
            desc: `Status: ${s.status} • Submitted: ${s.submittedAt}`,
            route: '/intern/submit',
            icon: FileCheck2,
            iconColor: '#4F9D69'
          });
        }
      });

      // 5. Feedback
      submissions.filter(s => !s.studentName || s.studentName.toLowerCase() === studentName.toLowerCase()).forEach(s => {
        if (s.feedback && matches(s.feedback, s.taskTitle, s.projectTitle)) {
          results.push({
            id: `f_${s.id}`,
            title: `Feedback on ${s.taskTitle}`,
            type: 'Feedback',
            desc: `Supervisor Comments: "${s.feedback}"`,
            route: '/intern/feedback',
            icon: MessageSquare,
            iconColor: '#7CA9F8'
          });
        }
      });
      
      // Evaluation feedback if available
      evaluations.forEach(ev => {
        if (ev.studentId === user.id || (ev.studentName && ev.studentName.toLowerCase() === studentName.toLowerCase())) {
          if (matches(ev.overallFeedback, ev.internshipTrack, ev.mentorName, 'evaluation')) {
            results.push({
              id: `ev_${ev.id}`,
              title: `Overall Evaluation Feedback`,
              type: 'Feedback',
              desc: `Score: ${ev.overallScore}/5.0 • "${ev.overallFeedback}"`,
              route: '/intern/feedback',
              icon: MessageSquare,
              iconColor: '#8B7CF6'
            });
          }
        }
      });

      // 6. Notifications
      const userNotifs = typeof getUserNotifications === 'function' ? getUserNotifications() : [];
      userNotifs.forEach(n => {
        if (matches(n.title, n.desc)) {
          results.push({
            id: `n_${n.id}`,
            title: n.title,
            type: 'Notification',
            desc: `${n.desc} • ${n.time}`,
            route: '/intern/notifications',
            icon: Bell,
            iconColor: '#D969A3'
          });
        }
      });

      // 7. Certificate
      certificates.forEach(c => {
        if (c.internId === user.id || (c.internName && c.internName.toLowerCase() === studentName.toLowerCase()) || matches(c.id, c.internshipTitle, 'certificate')) {
          results.push({
            id: `c_${c.id}`,
            title: 'Internship Completion Certificate',
            type: 'Certificate',
            desc: `ID: ${c.id} • Track: ${c.internshipTitle}`,
            route: '/intern/certificate',
            icon: Award,
            iconColor: '#8B7CF6'
          });
        }
      });
    }

    return results;
  };

  const results = getSearchResults();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileInputRef = useRef(null);

  useEffect(() => {
    if (mobileSearchOpen && mobileInputRef.current) {
      setTimeout(() => mobileInputRef.current?.focus(), 50);
    }
  }, [mobileSearchOpen]);

  const handleMobileSelect = (result) => {
    setQuery('');
    setIsOpen(false);
    setMobileSearchOpen(false);
    if (result.route) {
      navigate(result.route);
    }
  };

  return (
    <>
      {/* 1. Desktop Inline Search */}
      <div 
        ref={searchRef} 
        className="navbar-search desktop-search"
        style={{ position: 'relative', flex: 1, maxWidth: '320px' }}
      >
        <Search className="navbar-search-icon" size={16} />
        
        <input 
          type="text" 
          placeholder="Search projects, tasks..." 
          value={query}
          onChange={handleInputChange}
          onFocus={() => { if (query.trim()) setIsOpen(true); }}
          style={{
            width: '100%',
            padding: '10px 36px 10px 40px',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-button)',
            fontSize: '0.875rem',
            color: 'var(--text-main)',
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px',
              borderRadius: '50%'
            }}
            title="Clear search (Esc)"
          >
            <X size={15} />
          </button>
        )}

        {/* Results Dropdown for Desktop */}
        {isOpen && query.trim().length > 0 && (
          <div 
            className="soft-card animate-fade-in"
            style={{
              position: 'absolute',
              top: '48px',
              left: 0,
              width: '360px',
              maxWidth: '90vw',
              maxHeight: '380px',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border-secondary)',
              boxShadow: 'var(--shadow-dropdown)',
              zIndex: 200,
              padding: '8px 0'
            }}
          >
            {results.length === 0 ? (
              <div 
                style={{ 
                  padding: '24px 16px', 
                  textAlign: 'center', 
                  color: '#77758A',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <SearchX size={32} style={{ color: '#9A98A8' }} />
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#29283A' }}>
                  No results found
                </div>
                <div style={{ fontSize: '0.78125rem', color: '#77758A' }}>
                  No matches found for "{query.trim()}".
                </div>
              </div>
            ) : (
              <>
                <div 
                  style={{ 
                    padding: '8px 16px 6px', 
                    fontSize: '0.72rem', 
                    fontWeight: 800, 
                    color: '#77758A', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid #F0EEF8',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>Search Results ({results.length})</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#9A98A8', textTransform: 'capitalize' }}>
                    {user?.role} Scope
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {results.map((res) => {
                    const IconComp = res.icon || Search;
                    return (
                      <div
                        key={res.id}
                        onClick={() => handleSelectResult(res)}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '10px 16px',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                          borderBottom: '1px solid #FAF9FE'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F3FC'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div 
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            backgroundColor: '#EEECFA',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}
                        >
                          <IconComp size={16} style={{ color: res.iconColor || '#8B7CF6' }} />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                            <span 
                              style={{ 
                                fontSize: '0.875rem', 
                                fontWeight: 700, 
                                color: '#29283A',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {res.title}
                            </span>

                            <span 
                              className="badge badge-in-progress" 
                              style={{ 
                                fontSize: '0.6875rem', 
                                padding: '2px 6px',
                                backgroundColor: '#EEECFA',
                                color: '#6D61D9',
                                fontWeight: 700,
                                flexShrink: 0
                              }}
                            >
                              {res.type}
                            </span>
                          </div>

                          {res.desc && (
                            <div 
                              style={{ 
                                fontSize: '0.75rem', 
                                color: '#77758A', 
                                marginTop: '2px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis' 
                              }}
                            >
                              {res.desc}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 2. Mobile Search Trigger Button (Displayed in Mobile Navbar) */}
      <button 
        className="icon-btn mobile-search-toggle"
        onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
        title="Search portal"
        aria-label="Search"
      >
        <Search size={18} />
      </button>

      {/* 3. Mobile Full-Width Search Dropdown Bar */}
      {mobileSearchOpen && (
        <div 
          className="soft-card animate-fade-in"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            margin: '0 8px',
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            border: '1px solid var(--border-secondary)',
            boxShadow: 'var(--shadow-dropdown)',
            zIndex: 150,
            padding: '12px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-secondary)' 
                }} 
              />
              <input 
                ref={mobileInputRef}
                type="text" 
                placeholder="Search portal projects, tasks..." 
                value={query}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 32px 10px 36px',
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  color: 'var(--text-main)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    padding: '2px'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={() => { setMobileSearchOpen(false); handleClear(); }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                padding: '6px 8px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>

          {/* Mobile Live Results */}
          {query.trim().length > 0 && (
            <div style={{ marginTop: '10px', maxHeight: '300px', overflowY: 'auto' }}>
              {results.length === 0 ? (
                <div style={{ padding: '16px', textAlign: 'center', color: '#77758A', fontSize: '0.84rem' }}>
                  No matches found for "{query.trim()}"
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {results.map((res) => {
                    const IconComp = res.icon || Search;
                    return (
                      <div
                        key={res.id}
                        onClick={() => handleMobileSelect(res)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 10px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #FAF9FE'
                        }}
                      >
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#EEECFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <IconComp size={14} style={{ color: res.iconColor || '#8B7CF6' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#29283A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {res.title}
                          </div>
                          {res.desc && (
                            <div style={{ fontSize: '0.72rem', color: '#77758A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {res.desc}
                            </div>
                          )}
                        </div>
                        <span className="badge badge-in-progress" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                          {res.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
