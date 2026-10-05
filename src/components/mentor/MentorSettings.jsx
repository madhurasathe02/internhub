import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';

export default function MentorSettings() {
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
          Mentor Preferences & Notification Settings
        </h1>
        <p style={{ color: '#77758A', fontSize: '0.9375rem', marginTop: '4px' }}>
          Configure review notification alerts, office hour availability, and evaluation templates.
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Supervisor Preferences</h3>
          {saved && <span style={{ color: '#4F9D69', fontWeight: 600, fontSize: '0.8125rem' }}>✓ Preferences saved</span>}
        </div>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Supervisor Title</label>
            <input type="text" className="form-input" defaultValue="Senior Software Architect & Academic Supervisor" />
          </div>

          <div className="form-group">
            <label className="form-label">Weekly Virtual Office Hours</label>
            <input type="text" className="form-input" defaultValue="Tuesdays & Thursdays (2:00 PM - 4:00 PM EST)" />
          </div>

          <div className="form-group">
            <label className="form-label">Email Alert Frequency</label>
            <select className="form-select" defaultValue="instant">
              <option value="instant">Instant on every submission</option>
              <option value="daily">Daily digest</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>Save Mentor Preferences</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
