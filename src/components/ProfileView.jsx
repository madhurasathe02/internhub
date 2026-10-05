import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Building, 
  ShieldCheck, 
  Save, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { MOCK_USER } from '../mockData';

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState('general');
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [major, setMajor] = useState(MOCK_USER.major);
  const [university, setUniversity] = useState(MOCK_USER.university);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Profile Header Hero */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ 
          height: '120px', 
          background: 'linear-gradient(135deg, rgba(139, 124, 246, 0.8) 0%, rgba(124, 169, 248, 0.8) 100%)' 
        }} />
        <div style={{ padding: '0 32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginTop: '-40px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
            <div className="avatar" style={{ width: '80px', height: '80px', fontSize: '1.75rem', border: '4px solid #FFFFFF', boxShadow: 'var(--shadow-card)' }}>
              {MOCK_USER.avatar}
            </div>
            <div style={{ paddingBottom: '4px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#29283A', margin: 0 }}>{MOCK_USER.name}</h1>
              <p style={{ color: '#77758A', fontSize: '0.875rem' }}>{MOCK_USER.major} • {MOCK_USER.university}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-completed">
              <CheckCircle2 size={12} />
              Internship Verified
            </span>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('general')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-button)',
              border: 'none',
              backgroundColor: activeTab === 'general' ? '#EEECFA' : 'transparent',
              color: activeTab === 'general' ? '#6D61D9' : '#77758A',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Personal Information
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-button)',
              border: 'none',
              backgroundColor: activeTab === 'academic' ? '#EEECFA' : 'transparent',
              color: activeTab === 'academic' ? '#6D61D9' : '#77758A',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Academic Record & Transcript
          </button>
        </div>
      </div>

      {/* Main Profile Form */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Update Profile Details</h3>
          {savedSuccess && (
            <span style={{ fontSize: '0.8125rem', color: '#4F9D69', fontWeight: 600, backgroundColor: '#E4F5EA', padding: '4px 12px', borderRadius: '999px' }}>
              ✓ Saved changes successfully!
            </span>
          )}
        </div>

        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Academic Major / Specialization</label>
              <input 
                type="text" 
                className="form-input"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">University / Institution</label>
              <input 
                type="text" 
                className="form-input"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>Save Profile Updates</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
