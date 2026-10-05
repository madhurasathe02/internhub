import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Sparkles,
  GraduationCap,
  UserCheck,
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  User as UserIcon,
  Briefcase,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';

export default function AuthPage({ initialMode = 'login' }) {
  const { user, login, addStudent, addMentor } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const getValidRole = (r) => (typeof r === 'string' && ['student', 'mentor', 'admin'].includes(r)) ? r : 'student';

  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  const initialRole = getValidRole(location.state?.role);
  const [selectedRole, setSelectedRole] = useState(initialRole); // 'student' | 'mentor' | 'admin'
  const [email, setEmail] = useState(() => {
    if (initialRole === 'admin') return 'admin@internhub.edu';
    if (initialRole === 'mentor') return 'sarah.jenkins@internhub.edu';
    return 'alex.johnson@university.edu';
  });
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('');

  // If already logged in, automatically redirect to role dashboard
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

  useEffect(() => {
    if (location.state?.role) {
      const valid = getValidRole(location.state.role);
      setSelectedRole(valid);
      if (valid === 'admin') setEmail('admin@internhub.edu');
      else if (valid === 'mentor') setEmail('sarah.jenkins@internhub.edu');
      else setEmail('alex.johnson@university.edu');
    }
  }, [location.state]);

  // Update email preset when role changes
  const handleRoleSelect = (role) => {
    const validRole = getValidRole(role);
    setSelectedRole(validRole);
    if (validRole === 'admin') setEmail('admin@internhub.edu');
    else if (validRole === 'mentor') setEmail('sarah.jenkins@internhub.edu');
    else setEmail('alex.johnson@university.edu');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const validRole = getValidRole(selectedRole);
    const userName = name || (validRole === 'student' ? 'Alex Johnson' : validRole === 'mentor' ? 'Dr. Sarah Jenkins' : 'Prof. Marcus Vance');
    const userEmail = email || `${validRole}@internhub.edu`;

    try {
      if (!isLogin) {
        // REGISTER USER IN FIREBASE AUTH & FIRESTORE
        let uid = `user_${Date.now()}`;
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, userEmail, password.length >= 6 ? password : 'password123');
          uid = userCredential.user.uid;
        } catch (authErr) {
          console.warn('Firebase Auth notice:', authErr.message);
          if (authErr.code === 'auth/email-already-in-use') {
            try {
              const loginCred = await signInWithEmailAndPassword(auth, userEmail, password.length >= 6 ? password : 'password123');
              uid = loginCred.user.uid;
            } catch (loginErr) {
              console.warn('Firebase Auth signin notice:', loginErr.message);
            }
          }
        }

        // Store User Profile Document in Firestore 'users' collection
        try {
          await setDoc(doc(db, 'users', uid), {
            uid,
            name: userName,
            email: userEmail,
            role: validRole,
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp()
          }, { merge: true });
        } catch (firestoreErr) {
          console.warn('Firestore user save notice:', firestoreErr.message);
        }

        // Update application state
        if (validRole === 'student') {
          addStudent({
            name: userName,
            email: userEmail,
            company: 'Apex Systems Inc.',
            mentor: 'Dr. Sarah Jenkins',
            internshipJoined: 'Full Stack Web Development'
          });
        } else if (validRole === 'mentor') {
          addMentor({
            name: userName,
            email: userEmail,
            department: 'Software Engineering',
            title: 'Faculty Supervisor'
          });
        }
      } else {
        // SIGN IN USER WITH FIREBASE AUTH & FIRESTORE
        let uid = `user_${Date.now()}`;

        try {
          const userCredential = await signInWithEmailAndPassword(auth, userEmail, password.length >= 6 ? password : 'password123');
          uid = userCredential.user.uid;

          // Update user last login timestamp & role in Firestore
          await setDoc(doc(db, 'users', uid), {
            uid,
            name: userName,
            email: userEmail,
            role: validRole,
            lastLoginAt: serverTimestamp()
          }, { merge: true });
        } catch (authErr) {
          console.warn('Firebase Auth login notice:', authErr.message);
          // Store attempt record in Firestore
          try {
            const docId = userEmail.replace(/[^a-zA-Z0-9]/g, '_');
            await setDoc(doc(db, 'users', docId), {
              email: userEmail,
              name: userName,
              role: validRole,
              lastLoginAt: serverTimestamp()
            }, { merge: true });
          } catch (fErr) {
            console.warn('Firestore login record notice:', fErr.message);
          }
        }
      }

      // Log in as the user's explicitly selected role
      const loggedInUser = login(validRole, userEmail, userName);

      // Automatically redirect based on user role
      if (loggedInUser.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (loggedInUser.role === 'mentor') {
        navigate('/mentor/dashboard', { replace: true });
      } else {
        navigate('/intern/dashboard', { replace: true });
      }
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMsg(err.message || 'Authentication process encountered an issue.');
    } finally {
      setLoading(false);
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
      padding: '20px 14px',
      position: 'relative'
    }}>
      {/* Background soft glow blobs */}
      <div className="hero-bg-blobs" style={{ top: '-50px', right: '-50px' }} />
      <div className="hero-bg-blob-2" style={{ bottom: '-50px', left: '-50px' }} />

      {/* Main Auth Card Container */}
      <div className="card soft-card" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '28px 20px',
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
            <span>Landing Page</span>
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#29283A', marginTop: '16px', marginBottom: '4px' }}>
            {isLogin ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#77758A' }}>
            {isLogin ? 'Select your role and sign in to access your workspace' : 'Join InternHub to manage internships & project tasks'}
          </p>
        </div>

        {/* 1. ROLE SELECTOR TABS */}
        <div style={{ marginBottom: '24px' }}>
          <label className="form-label" style={{ marginBottom: '10px', display: 'block', fontSize: '0.8125rem', color: '#29283A', fontWeight: 700 }}>
            SELECT YOUR ROLE:
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
            gap: '6px',
            backgroundColor: '#EEECFA',
            padding: '6px',
            borderRadius: '14px',
            border: '1px solid #DDD8F2'
          }}>
            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '10px 4px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: selectedRole === 'student' ? '#FFFFFF' : 'transparent',
                color: selectedRole === 'student' ? '#6D61D9' : '#77758A',
                boxShadow: selectedRole === 'student' ? '0 2px 8px rgba(109, 97, 217, 0.15)' : 'none',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <GraduationCap size={18} />
              <span>Intern / Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('mentor')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '10px 4px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: selectedRole === 'mentor' ? '#FFFFFF' : 'transparent',
                color: selectedRole === 'mentor' ? '#6D61D9' : '#77758A',
                boxShadow: selectedRole === 'mentor' ? '0 2px 8px rgba(109, 97, 217, 0.15)' : 'none',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <UserCheck size={18} />
              <span>Mentor</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '10px 4px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: selectedRole === 'admin' ? '#FFFFFF' : 'transparent',
                color: selectedRole === 'admin' ? '#6D61D9' : '#77758A',
                boxShadow: selectedRole === 'admin' ? '0 2px 8px rgba(109, 97, 217, 0.15)' : 'none',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Shield size={18} />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: '#FEE2E2', color: '#DC2626', fontSize: '0.8125rem', marginBottom: '16px', fontWeight: 600 }}>
              {errorMsg}
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder={selectedRole === 'student' ? 'Alex Johnson' : selectedRole === 'mentor' ? 'Dr. Sarah Jenkins' : 'Prof. Marcus Vance'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder={selectedRole === 'student' ? 'alex.johnson@university.edu' : selectedRole === 'mentor' ? 'sarah.jenkins@internhub.edu' : 'admin@internhub.edu'}
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

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', marginTop: '8px', opacity: loading ? 0.7 : 1 }}>
            <span>
              {loading
                ? 'Processing...'
                : (isLogin ? `Sign In as ${selectedRole === 'student' ? 'Student' : selectedRole === 'mentor' ? 'Mentor' : 'Admin'}` : 'Register & Enter Workspace')}
            </span>
            {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <ArrowRight size={18} />}
          </button>
        </form>

        {/* TOGGLE LOGIN / REGISTER */}
        <div style={{ textAlign: 'center', marginTop: '24px', borderTop: '1px solid #E5E2F0', paddingTop: '16px' }}>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'none', border: 'none', fontSize: '0.84rem', color: '#8B7CF6', fontWeight: 700, cursor: 'pointer' }}
          >
            {isLogin ? "Don't have an account? Sign up / Register" : 'Already registered? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

