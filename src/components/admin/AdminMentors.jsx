import React, { useState } from 'react';
import { UserCheck, UserPlus, Building2, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';

export default function AdminMentors() {
  const { mentorsList, addMentor } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Computer Science');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    addMentor({ name, email, department });
    setName('');
    setEmail('');
    setShowModal(false);
  };

  const filteredMentors = mentorsList.filter(m => {
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
            Faculty & Industry Mentors Directory
          </h1>
          <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
            Manage academic supervisors and corporate internship mentors.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <UserPlus size={16} />
          <span>Add New Mentor</span>
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
            placeholder="Search by mentor name or email..." 
            style={{ maxWidth: '340px' }}
          />

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#77758A', fontSize: '0.84rem', fontWeight: 600 }}>
              <Filter size={14} />
              <span>Department:</span>
            </div>

            <select 
              className="form-input" 
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              style={{ width: 'auto', minWidth: '180px', height: '38px', padding: '0 12px', fontSize: '0.84rem', borderRadius: '10px' }}
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

