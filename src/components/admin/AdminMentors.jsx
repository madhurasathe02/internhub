import React, { useState } from 'react';
import { UserCheck, UserPlus, Building2, Filter, Clock, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';

export default function AdminMentors() {
  const { mentorsList, addMentor, approveMentorAccount, rejectMentorAccount } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Computer Science');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const pendingMentors = mentorsList.filter(m => m.status === 'Pending Approval');
  const activeMentors = mentorsList.filter(m => m.status !== 'Pending Approval');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    addMentor({ name, email, department });
    setName('');
    setEmail('');
    setShowModal(false);
  };

  const filteredMentors = activeMentors.filter(m => {
    const matchesSearch = (m.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (m.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || (m.department || '').toLowerCase().includes(selectedDept.toLowerCase());
    return matchesSearch && matchesDept;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
            Faculty & Industry Mentors Management
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Approve mentor account registrations, manage academic supervisors, and corporate mentors.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <UserPlus size={16} />
          <span>Add New Mentor</span>
        </button>
      </div>

      {/* PENDING MENTOR REGISTRATIONS FOR ADMIN APPROVAL */}
      {pendingMentors.length > 0 && (
        <div className="card" style={{ border: '2px solid #FCD34D', backgroundColor: '#FFFDF5' }}>
          <div className="card-header" style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#D97706' }}>
                <Clock size={20} />
              </div>
              <div>
                <h3 className="card-title" style={{ color: '#B45309' }}>
                  Pending Mentor Approval Requests ({pendingMentors.length})
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#D97706', marginTop: '2px' }}>
                  Faculty or Industry Supervisors awaiting Admin approval before gaining login access.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingMentors.map(m => (
              <div 
                key={m.id} 
                className="btn-responsive-row"
                style={{
                  padding: '14px 16px',
                  borderRadius: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #FDE68A',
                  boxShadow: '0 2px 6px rgba(217, 119, 6, 0.06)',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: '1 1 240px' }}>
                  <div className="avatar" style={{ backgroundColor: '#6D61D9', width: '38px', height: '38px', fontWeight: 700, flexShrink: 0 }}>
                    {m.avatar || m.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 800, color: '#29283A', fontSize: '0.95rem' }}>{m.name}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#77758A', wordBreak: 'break-word' }}>
                      {m.email} • <span style={{ color: '#29283A', fontWeight: 600 }}>{m.department || 'Computer Science'}</span> ({m.title || 'Faculty Supervisor'})
                    </div>
                  </div>
                </div>

                <div className="btn-group-responsive">
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ borderColor: '#FCA5A5', color: '#DC2626' }}
                    onClick={() => rejectMentorAccount(m.id)}
                  >
                    <XCircle size={14} />
                    <span>Reject</span>
                  </button>

                  <button
                    className="btn btn-primary btn-sm"
                    style={{ backgroundColor: '#16A34A', borderColor: '#16A34A' }}
                    onClick={() => approveMentorAccount(m.id)}
                  >
                    <CheckCircle2 size={14} />
                    <span>Approve <span className="hide-mobile">Mentor Account</span></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        {/* Search & Filter Toolbar */}
        <div className="filter-toolbar">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search by mentor name or email..." 
          />

          <div className="filter-controls">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#77758A', fontSize: '0.84rem', fontWeight: 600 }}>
              <Filter size={14} />
              <span>Department:</span>
            </div>

            <select 
              className="form-input" 
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              style={{ width: 'auto', minWidth: '160px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
            >
              <option value="All">All Departments</option>
              <option value="Computer Science">Computer Science & AI</option>
              <option value="Software Systems">Software Systems</option>
              <option value="FinTech">FinTech Labs</option>
            </select>
          </div>
        </div>

        {filteredMentors.length === 0 ? (
          <EmptyState 
            icon={<UserCheck size={36} style={{ color: '#7CA9F8' }} />}
            title="No Mentors Found"
            description="No mentor records match your active search terms or department selection."
          />
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Mentor Name</th>
                  <th>Email Address</th>
                  <th>Department / Organization</th>
                  <th>Title</th>
                  <th>Assigned Interns</th>
                </tr>
              </thead>
              <tbody>
                {filteredMentors.map(m => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 700, color: '#29283A' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <UserCheck size={16} style={{ color: '#7CA9F8' }} />
                        <span>{m.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#77758A' }}>{m.email}</td>
                    <td style={{ color: '#29283A', fontWeight: 600 }}>{m.department}</td>
                    <td style={{ color: '#77758A' }}>{m.title}</td>
                    <td>
                      <span className="badge badge-completed">{m.assignedCount} Interns</span>
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
              <h3 className="modal-title">Register New Mentor</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" required value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Institutional Email</label>
                <input type="email" className="form-input" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input type="text" className="form-input" value={department} onChange={e => setDepartment(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Mentor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

