import React, { useState } from 'react';
import { Settings, Save, Shield } from 'lucide-react';
import ChangePasswordCard from '../ChangePasswordCard';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#29283A', margin: 0 }}>
          System Settings & Platform Governance
        </h1>
        <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
          Configure system parameters, administrator password security, and academic policies.
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Institutional Configuration</h3>
          {saved && <span style={{ color: '#4F9D69', fontWeight: 600, fontSize: '0.8125rem' }}>✓ Settings saved successfully</span>}
        </div>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Academic Institution Name</label>
            <input type="text" className="form-input" defaultValue="Tech Institute of Science & Engineering" />
          </div>

          <div className="form-group">
            <label className="form-label">Default Minimum Passing Grade (%)</label>
            <input type="number" className="form-input" defaultValue="75" />
          </div>

          <div className="form-group">
            <label className="form-label">Maximum Days Allowed for Mentor Review</label>
            <input type="number" className="form-input" defaultValue="3" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      </div>

      {/* Change Password Option */}
      <ChangePasswordCard 
        title="Change Admin Password" 
        subtitle="Update the administrator credential password for Madhura Sathe"
      />
    </div>
  );
}

