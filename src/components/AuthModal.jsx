import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const { loginWithCredentials, registerAccount } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registerRole, setRegisterRole] = useState('student');
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingMsg, setPendingMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setPendingMsg('');

    if (isLogin) {
      const res = await loginWithCredentials(email, password);
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess(res.user.role, res.user.email, res.user.name);
        onClose();
      } else {
        if (res.reason === 'pending') {
          setPendingMsg(res.message);
        } else {
          setErrorMsg(res.message || 'Invalid email or password.');
        }
      }
    } else {
      const res = await registerAccount({ name, email, password, role: registerRole });
      if (res.success) {
        setPendingMsg(res.message);
        setIsLogin(true);
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="brand-icon-wrapper" style={{ width: '30px', height: '30px' }}>
              <Sparkles size={16} />
            </div>
            <h3 className="modal-title">{isLogin ? 'Sign In to InternHub' : 'Create Account'}</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {pendingMsg && (
          <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#FFFBEB', border: '1px solid #FCD34D', color: '#B45309', fontSize: '0.8125rem', marginBottom: '14px', lineHeight: 1.4 }}>
            <Clock size={16} style={{ display: 'inline', marginRight: '6px' }} />
            <strong>Approval Pending: </strong> {pendingMsg}
          </div>
        )}

        {errorMsg && (
          <div style={{ padding: '10px 12px', borderRadius: '10px', backgroundColor: '#FEE2E2', color: '#DC2626', fontSize: '0.8125rem', marginBottom: '14px', fontWeight: 600 }}>
            <AlertCircle size={15} style={{ display: 'inline', marginRight: '6px' }} />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Academic / Institutional Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="email@internhub.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Register Account As</label>
              <select
                className="form-input"
                value={registerRole}
                onChange={(e) => setRegisterRole(e.target.value)}
                style={{ borderRadius: '10px', height: '40px', fontWeight: 600 }}
              >
                <option value="student">Student / Intern (Mentor Approval)</option>
                <option value="mentor">Faculty / Industry Mentor (Admin Approval)</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
            <span>{isLogin ? 'Sign In to Workspace' : 'Submit Registration'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid #E5E2F0', paddingTop: '16px' }}>
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg('');
              setPendingMsg('');
            }}
            style={{ background: 'none', border: 'none', fontSize: '0.8125rem', color: '#8B7CF6', fontWeight: 600, cursor: 'pointer' }}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already registered? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

