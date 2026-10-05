import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';

export default function InternSettings() {
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
          Student Account & Preferences
        </h1>
        <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
          Configure notification preferences and workspace display settings.
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Student Preferences</h3>
          {saved && <span style={{ color: '#4F9D69', fontWeight: 600, fontSize: '0.8125rem' }}>✓ Preferences saved</span>}
        </div>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Email Notification Alerts</label>
            <select className="form-select" defaultValue="instant">
              <option value="instant">Notify on task assignments & feedback</option>
              <option value="weekly">Weekly digest</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
