import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ChangePasswordCard({ title = "Change Account Password", subtitle = "Update your login password to maintain account security" }) {
  const { showToast } = useApp();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (pass) => {
    if (!pass) return { label: '', color: '', percent: 0 };
    if (pass.length < 6) return { label: 'Weak (min 6 chars)', color: '#DC2626', percent: 33 };
    if (pass.length < 10 || !/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) {
      return { label: 'Medium', color: '#D97706', percent: 66 };
    }
    return { label: 'Strong', color: '#16A34A', percent: 100 };
  };

  const strength = getPasswordStrength(newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!currentPassword) {
      setErrorMsg('Please enter your current password.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('New password and confirmation password do not match.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Your password has been changed successfully!');
      if (showToast) showToast('Password updated successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 400);
  };

  return (
    <div className="card" style={{ border: '1px solid #E5E2F0' }}>
      <div className="card-header" style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#EEECFA', color: '#6D61D9' }}>
            <Lock size={20} />
          </div>
          <div>
            <h3 className="card-title">{title}</h3>
            <p style={{ fontSize: '0.8125rem', color: '#77758A', marginTop: '2px' }}>
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div style={{
          padding: '12px 14px',
          borderRadius: '10px',
          backgroundColor: '#F0FDF4',
          border: '1px solid #BBF7D0',
          color: '#16A34A',
          fontSize: '0.84rem',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div style={{
          padding: '12px 14px',
          borderRadius: '10px',
          backgroundColor: '#FEE2E2',
          border: '1px solid #FCA5A5',
          color: '#DC2626',
          fontSize: '0.84rem',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 600
        }}>
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {/* Current Password */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Current Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showCurrent ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ paddingRight: '38px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#77758A',
                  cursor: 'pointer'
                }}
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">New Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showNew ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter new password (min 6 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ paddingRight: '38px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#77758A',
                  cursor: 'pointer'
                }}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {newPassword && (
              <div style={{ marginTop: '6px' }}>
                <div style={{ height: '4px', backgroundColor: '#E5E2F0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${strength.percent}%`, backgroundColor: strength.color, height: '100%', transition: 'all 0.3s ease' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: strength.color, fontWeight: 700, marginTop: '3px' }}>
                  Password strength: {strength.label}
                </div>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Confirm New Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'}
                className="form-input"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ paddingRight: '38px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#77758A',
                  cursor: 'pointer'
                }}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ gap: '8px' }}
          >
            <ShieldCheck size={16} />
            <span>{loading ? 'Updating Password...' : 'Update Password'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
