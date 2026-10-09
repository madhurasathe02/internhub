import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  User as UserIcon,
  Briefcase,
  Loader2,
  AlertCircle,
  Clock,
  ShieldCheck,
  GraduationCap,
  UserCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthPage({ initialMode = 'login' }) {
  const { user, loginWithCredentials, registerAccount, resetPassword } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [pendingNotice, setPendingNotice] = useState('');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [registerRole, setRegisterRole] = useState('student'); // 'student' | 'mentor' (Admin prohibited)

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  // If already logged in, redirect automatically
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'mentor') {
        navigate('/mentor/dashboard', { replace: true });
      } else {
        navigate('/intern/dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setPendingNotice('');
    setLoading(true);

    try {
      const result = await loginWithCredentials(email, password);
      setLoading(false);

      if (result.success) {
        if (result.user.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else if (result.user.role === 'mentor') {
          navigate('/mentor/dashboard', { replace: true });
        } else {
          navigate('/intern/dashboard', { replace: true });
        }
      } else {
        if (result.reason === 'pending') {
          setPendingNotice(result.message);
        } else {
          setErrorMsg(result.message || 'Invalid email or password.');
        }
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Authentication failed.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setPendingNotice('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter matching passwords.');
      return;
    }

    setLoading(true);

    try {
      const res = await registerAccount({
        name,
        email,
        password,
        role: registerRole
      });
      setLoading(false);

      if (res.success) {
        if (res.pending) {
          setPendingNotice(res.message);
          setIsLogin(true);
          setPassword('');
          setConfirmPassword('');
        } else {
          const targetRole = res.user?.role || registerRole;
          if (targetRole === 'admin') {
            navigate('/admin/dashboard', { replace: true });
          } else if (targetRole === 'mentor') {
            navigate('/mentor/dashboard', { replace: true });
          } else {
            navigate('/intern/dashboard', { replace: true });
          }
        }
      } else {
        setErrorMsg(res.message);
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Registration encountered an issue.');
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setErrorMsg('Please enter your email address in the field above first.');
      return;
    }
    setErrorMsg('');
    setSuccessMsg('');
    setResetLoading(true);

    const res = await resetPassword(email);
    setResetLoading(false);

    if (res.success) {
      setSuccessMsg(res.message);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="animate-fade-in" style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-app)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px 14px',
      position: 'relative'
    }}>
      {/* Background soft glow blobs */}
      <div className="hero-bg-blobs" style={{ top: '-50px', right: '-50px' }} />
      <div className="hero-bg-blob-2" style={{ bottom: '-50px', left: '-50px' }} />

      {/* Main Unified Auth Card Container */}
      <div className="card soft-card" style={{
        maxWidth: '460px',
        width: '100%',
        padding: '28px 24px',
        boxShadow: 'var(--shadow-hover)',
        borderRadius: '24px',
        position: 'relative',
        zIndex: 5,
        border: '1px solid var(--border-secondary)'
      }}>
        {/* Back Link */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => navigate('/')}
            className="btn btn-outline btn-sm"
            style={{ gap: '6px' }}
          >
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Brand Logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="navbar-brand" style={{ justifyContent: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div className="brand-icon-wrapper" style={{ width: '42px', height: '42px' }}>
              <Sparkles size={24} />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              <span>Intern</span>
              <span style={{ color: '#8B7CF6' }}>Hub</span>
            </div>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#29283A', marginTop: '16px', marginBottom: '4px' }}>
            {isLogin ? 'Sign In to Workspace' : 'Create Your Account'}
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#77758A' }}>
            {isLogin
              ? 'Enter your account credentials to access your dashboard'
              : 'Register your details to request access from your supervisor'}
          </p>
        </div>

        {/* Notifications & Banners */}
        {successMsg && (
          <div style={{
            padding: '12px 14px',
            borderRadius: '12px',
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            color: '#16A34A',
            fontSize: '0.8125rem',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
            <div style={{ lineHeight: 1.4, fontWeight: 600 }}>{successMsg}</div>
          </div>
        )}

        {pendingNotice && (
          <div style={{
            padding: '14px',
            borderRadius: '14px',
            backgroundColor: '#FFFBEB',
            border: '1px solid #FCD34D',
            color: '#B45309',
            fontSize: '0.84rem',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <Clock size={20} style={{ flexShrink: 0, marginTop: '2px', color: '#D97706' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '2px' }}>Account Approval Pending ⏳</div>
              <div style={{ lineHeight: 1.4 }}>{pendingNotice}</div>
            </div>
          </div>
        )}

        {errorMsg && (
          <div style={{
            padding: '12px 14px',
            borderRadius: '12px',
            backgroundColor: '#FEE2E2',
            border: '1px solid #FCA5A5',
            color: '#DC2626',
            fontSize: '0.8125rem',
            marginBottom: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            fontWeight: 600
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
            {isLogin && errorMsg.includes('Incorrect password') && (
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={resetLoading}
                style={{
                  alignSelf: 'flex-start',
                  background: 'none',
                  border: 'none',
                  color: '#DC2626',
                  textDecoration: 'underline',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {resetLoading ? 'Sending reset link...' : 'Forgot your password? Send reset link'}
              </button>
            )}
          </div>
        )}

        {/* SINGLE LOGIN FORM */}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#77758A' }} />
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@internhub.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '36px' }}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={resetLoading}
                  style={{ background: 'none', border: 'none', fontSize: '0.75rem', color: '#8B7CF6', fontWeight: 600, cursor: 'pointer' }}
                >
                  {resetLoading ? 'Sending link...' : 'Forgot password?'}
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#77758A' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '36px', paddingRight: '38px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#77758A',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: '100%', marginTop: '8px', opacity: loading ? 0.7 : 1 }}
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
              {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <ArrowRight size={18} />}
            </button>
          </form>
        ) : (
          /* SINGLE REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#77758A' }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Saloni Honrao"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: '36px' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#77758A' }} />
                <input
                  type="email"
                  className="form-input"
                  placeholder="e.g. saloni.honrao@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '36px' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password (Min. 6 characters)</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#77758A' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '36px', paddingRight: '38px' }}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#77758A',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password (Re-enter Password)</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#77758A' }} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Re-enter password to confirm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    paddingLeft: '36px',
                    paddingRight: '38px',
                    borderColor: confirmPassword && password ? (password === confirmPassword ? '#22C55E' : '#EF4444') : undefined
                  }}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#77758A',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title={showConfirmPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirmPassword && password && password !== confirmPassword && (
                <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', fontWeight: 600 }}>
                  ⚠️ Passwords do not match
                </div>
              )}
              {confirmPassword && password && password === confirmPassword && (
                <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: '4px', fontWeight: 600 }}>
                  ✓ Passwords match!
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Register Account As</label>
              <select
                className="form-input"
                value={registerRole}
                onChange={(e) => setRegisterRole(e.target.value)}
                style={{ borderRadius: '10px', height: '42px', fontWeight: 600, color: '#29283A' }}
              >
                <option value="student">🎓 Student / Intern</option>
                <option value="mentor">👨‍🏫 Faculty / Industry Mentor</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: '100%', marginTop: '8px', opacity: loading ? 0.7 : 1 }}
            >
              <span>{loading ? 'Submitting Registration...' : 'Register Account'}</span>
              {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <ArrowRight size={18} />}
            </button>
          </form>
        )}

        {/* TOGGLE LOGIN / REGISTER */}
        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E5E2F0' }}>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg('');
              setPendingNotice('');
              setSuccessMsg('');
            }}
            style={{ background: 'none', border: 'none', fontSize: '0.84rem', color: '#8B7CF6', fontWeight: 700, cursor: 'pointer' }}
          >
            {isLogin ? "Don't have an account yet? Register here" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}


