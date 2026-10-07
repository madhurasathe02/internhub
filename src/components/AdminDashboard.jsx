import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  BarChart2, 
  UserPlus, 
  Search, 
  SlidersHorizontal,
  CheckCircle2,
  Shield,
  Download
} from 'lucide-react';
import { MOCK_STATS } from '../mockData';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState('All');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('student');

  const [users, setUsers] = useState([
    { id: 1, name: 'Saloni Honrao', email: 'saloni.honrao@university.edu', role: 'student', company: 'Apex Systems Inc.', status: 'Active' },
    { id: 2, name: 'Dr. Sarah Jenkins', email: 's.jenkins@internhub.edu', role: 'mentor', company: 'CS Dept Head', status: 'Active' },
    { id: 3, name: 'Maya Patel', email: 'm.patel@univ.edu', role: 'student', company: 'FinTech Dynamics', status: 'Active' },
    { id: 4, name: 'Elena Rostova', email: 'elena@fintechdyn.com', role: 'mentor', company: 'FinTech Lead', status: 'Active' },
    { id: 5, name: 'Prof. Marcus Vance', email: 'm.vance@internhub.edu', role: 'admin', company: 'Academic Director', status: 'Active' },
  ]);

  const filteredUsers = roleFilter === 'All' ? users : users.filter(u => u.role === roleFilter.toLowerCase());

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    setUsers([...users, {
      id: Date.now(),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      company: 'General Assignment',
      status: 'Active'
    }]);
    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserModal(false);
  };

  const getAdminCardRoute = (type) => {
    switch (type) {
      case 'students': return '/admin/students';
      case 'mentors': return '/admin/mentors';
      case 'completion': return '/admin/internships';
      case 'submissions': return '/admin/tasks';
      default: return '/admin/students';
    }
  };

  const cardStyles = [
    { bg: 'rgba(240, 236, 255, 0.75)', iconBg: '#E5DCFF', color: '#6C47FF' },
    { bg: 'rgba(230, 245, 255, 0.75)', iconBg: '#D6F0FF', color: '#3B82F6' },
    { bg: 'rgba(230, 250, 240, 0.75)', iconBg: '#D1FAE5', color: '#10B981' },
    { bg: 'rgba(255, 235, 245, 0.75)', iconBg: '#FFE0EC', color: '#EC4899' },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Admin Hero Header */}
      <div className="hero-banner" style={{ marginBottom: 0 }}>
        <div className="hero-banner-accent" />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge badge-in-progress" style={{ backgroundColor: '#FFFFFF', color: '#6D61D9', marginBottom: '10px' }}>
              <Shield size={14} style={{ color: '#8B7CF6' }} />
              <span>Institutional Administrator</span>
            </div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#29283A', margin: '4px 0 8px' }}>
              Platform Overview & Governance
            </h1>
            <p style={{ color: '#77758A', fontSize: '0.9375rem' }}>
              Manage internship batches, company partnerships, and system users.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={() => alert('Exporting PDF Report...')}>
              <Download size={16} />
              <span>Export Audit PDF</span>
            </button>
            <button className="btn btn-primary" onClick={() => setShowAddUserModal(true)}>
              <UserPlus size={16} />
              <span>Add System User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards (Soft Pastel Glass Style) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px' }}>
        {MOCK_STATS.admin.map((stat, idx) => {
          const styleConfig = cardStyles[idx % cardStyles.length];
          return (
            <div 
              key={idx} 
              onClick={() => navigate(getAdminCardRoute(stat.type))}
              style={{
                background: styleConfig.bg,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '22px',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(108, 71, 255, 0.06)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease'
              }}
              className="soft-card-hover"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '14px', backgroundColor: styleConfig.iconBg, color: styleConfig.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {stat.type === 'students' && <Users size={20} />}
                  {stat.type === 'mentors' && <Building2 size={20} />}
                  {stat.type === 'completion' && <BarChart2 size={20} />}
                  {stat.type === 'submissions' && <CheckCircle2 size={20} />}
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E1B3A', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E1B3A', marginTop: '6px' }}>{stat.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#79759B', marginTop: '2px' }}>{stat.change}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: styleConfig.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                  →
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Program Analytics & Department Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Department Progress Distribution</h3>
            <span style={{ fontSize: '0.8125rem', color: '#8B7CF6', fontWeight: 600 }}>Cohort 2026</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: '#29283A' }}>Computer Science & AI</span>
                <span style={{ fontWeight: 700, color: '#8B7CF6' }}>96% Completion</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#EEECFA', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '96%', height: '100%', backgroundColor: '#8B7CF6', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: '#29283A' }}>Software Engineering & Systems</span>
                <span style={{ fontWeight: 700, color: '#7CA9F8' }}>88% Completion</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#E2F0FC', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '88%', height: '100%', backgroundColor: '#7CA9F8', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: '#29283A' }}>Data Science & Analytics</span>
                <span style={{ fontWeight: 700, color: '#E9A6C7' }}>92% Completion</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#FDF0F6', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', backgroundColor: '#E9A6C7', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Partner Organizations Summary */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Top Industry Partners</h3>
            <span style={{ fontSize: '0.8125rem', color: '#77758A' }}>34 Total</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '10px', backgroundColor: '#F7F6FC' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#29283A', fontSize: '0.9375rem' }}>Apex Systems Inc.</div>
                <div style={{ fontSize: '0.75rem', color: '#77758A' }}>Full Stack & Cloud Architecture</div>
              </div>
              <span className="badge badge-completed">18 Students</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '10px', backgroundColor: '#F7F6FC' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#29283A', fontSize: '0.9375rem' }}>Neural Labs</div>
                <div style={{ fontSize: '0.75rem', color: '#77758A' }}>AI & ML Research</div>
              </div>
              <span className="badge badge-completed">12 Students</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '10px', backgroundColor: '#F7F6FC' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#29283A', fontSize: '0.9375rem' }}>FinTech Dynamics</div>
                <div style={{ fontSize: '0.75rem', color: '#77758A' }}>Financial Microservices</div>
              </div>
              <span className="badge badge-completed">15 Students</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Directory Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">User Directory & Permissions</h3>
            <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
              Filter by account roles across students, mentors, and administrators.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Student', 'Mentor', 'Admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: roleFilter === r ? '1px solid #8B7CF6' : '1px solid #E5E2F0',
                  backgroundColor: roleFilter === r ? '#EEECFA' : '#FFFFFF',
                  color: roleFilter === r ? '#6D61D9' : '#77758A',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Organization / Department</th>
                <th>Account Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 700, color: '#29283A' }}>{u.name}</td>
                  <td style={{ color: '#77758A' }}>{u.email}</td>
                  <td>
                    <span style={{ 
                      textTransform: 'capitalize', 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      padding: '4px 10px', 
                      borderRadius: '999px',
                      backgroundColor: u.role === 'admin' ? '#FBE7E8' : u.role === 'mentor' ? '#E2F0FC' : '#EEECFA',
                      color: u.role === 'admin' ? '#B96A70' : u.role === 'mentor' ? '#5688B5' : '#6D61D9'
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ color: '#77758A' }}>{u.company}</td>
                  <td>
                    <span className="badge badge-completed">{u.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowAddUserModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New User Account</h3>
              <button className="modal-close" onClick={() => setShowAddUserModal(false)}>✕</button>
            </div>

            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. David Miller" 
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="david.miller@univ.edu" 
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Assign System Role</label>
                <select 
                  className="form-select"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                >
                  <option value="student">Student Intern</option>
                  <option value="mentor">Academic / Industry Mentor</option>
                  <option value="admin">System Administrator</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowAddUserModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
