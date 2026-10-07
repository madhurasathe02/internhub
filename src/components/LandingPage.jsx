import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  UserCheck, 
  Shield, 
  FolderKanban, 
  CheckSquare, 
  UploadCloud, 
  MessageSquare, 
  Bell, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Layers, 
  ChevronRight,
  Briefcase
} from 'lucide-react';
import LandingNavbar from './LandingNavbar';
import SplashScreen from './SplashScreen';
import '../styles/LandingPage.css';

const navLinkStyle = {
  background: 'none',
  border: 'none',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: 0,
  textAlign: 'left',
  transition: 'color 0.2s ease',
};

export default function LandingPage({ onLogin, onRegister }) {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  const handleLoginClick = (role = 'student') => {
    const validRole = typeof role === 'string' ? role : 'student';
    if (onLogin) onLogin(validRole);
    else navigate('/login', { state: { role: validRole } });
  };

  const handleRegisterClick = (role = 'student') => {
    const validRole = typeof role === 'string' ? role : 'student';
    if (onRegister) onRegister(validRole);
    else navigate('/register', { state: { role: validRole } });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-container animate-fade-in">
      {/* 0. INTRO SPLASH SCREEN */}
      {showSplash && (
        <SplashScreen 
          onComplete={() => setShowSplash(false)} 
          autoDismiss={true} 
          duration={2500} 
        />
      )}

      {/* 1. NAVBAR WITH CENTERED LOGO & SPLASH BACKDROP */}
      <LandingNavbar 
        onGetStarted={() => handleRegisterClick('student')} 
        onLogin={() => handleLoginClick('student')} 
      />

      {/* 2. HERO SECTION WITH SPLASH VIDEO BACKGROUND & CENTERED SCREEN LOGO */}
      <section id="hero" className="video-hero-wrapper">
        {/* Background Video */}
        <video 
          className="hero-video-bg"
          src="/splash-video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
        />
        
        {/* Soft Contrast Overlay */}
        <div className="hero-video-overlay" />

        {/* Curved Wave Divider at Bottom of Hero (Matching Reference Design) */}
        <div className="hero-wave-divider">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path 
              d="M0 40C320 90 640 95 960 50C1120 28 1280 20 1440 40V100H0V40Z" 
              fill="var(--bg-app)" 
            />
          </svg>
        </div>
      </section>

      {/* 3. PLATFORM HIGHLIGHT SECTION */}
      <section className="landing-section">
        <div className="highlight-strip">
          <div className="highlight-item">
            <div className="highlight-icon-box">
              <Users size={22} />
            </div>
            <div>
              <div className="highlight-title">3 User Roles</div>
              <div className="highlight-sub">Student • Mentor • Admin</div>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon-box">
              <Layers size={22} />
            </div>
            <div>
              <div className="highlight-title">1 Connected Platform</div>
              <div className="highlight-sub">Unified Internship Workspace</div>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon-box">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="highlight-title">Complete Workflow</div>
              <div className="highlight-sub">Project → Task → Submission → Feedback</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="landing-section">
        <div className="section-header">
          <div className="section-badge">POWERFUL FEATURES</div>
          <h2 className="section-title">Everything You Need to Manage Internships</h2>
          <p className="section-desc">
            InternHub simplifies the complete internship workflow by bringing important tools into one organized platform.
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div>
              <div className="feature-icon-wrapper">
                <Briefcase size={22} />
              </div>
              <h3 className="feature-card-title">Internship Management</h3>
              <p className="feature-card-desc">
                Manage internship information, mentors, partner organizations, program dates, and active statuses.
              </p>
            </div>
            <div className="feature-explore-link">
              <span>Learn more</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div>
              <div className="feature-icon-wrapper">
                <FolderKanban size={22} />
              </div>
              <h3 className="feature-card-title">Project Management</h3>
              <p className="feature-card-desc">
                Create, assign, and manage technical internship projects with clear specifications and tags.
              </p>
            </div>
            <div className="feature-explore-link">
              <span>Learn more</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div>
              <div className="feature-icon-wrapper">
                <CheckSquare size={22} />
              </div>
              <h3 className="feature-card-title">Task Management</h3>
              <p className="feature-card-desc">
                Assign tasks, set due dates, specify priorities, and track milestone statuses in real time.
              </p>
            </div>
            <div className="feature-explore-link">
              <span>Learn more</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div>
              <div className="feature-icon-wrapper">
                <UploadCloud size={22} />
              </div>
              <h3 className="feature-card-title">Submission Management</h3>
              <p className="feature-card-desc">
                Students can submit completed work, attach files, and link live code repositories for evaluation.
              </p>
            </div>
            <div className="feature-explore-link">
              <span>Learn more</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Feature 5 */}
          <div className="feature-card">
            <div>
              <div className="feature-icon-wrapper">
                <MessageSquare size={22} />
              </div>
              <h3 className="feature-card-title">Mentor Feedback</h3>
              <p className="feature-card-desc">
                Mentors can review submissions, assign grades out of 100, and provide constructive feedback.
              </p>
            </div>
            <div className="feature-explore-link">
              <span>Learn more</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Feature 6 */}
          <div className="feature-card">
            <div>
              <div className="feature-icon-wrapper">
                <Bell size={22} />
              </div>
              <h3 className="feature-card-title">Notifications</h3>
              <p className="feature-card-desc">
                Keep students and mentors updated about new tasks, submission approvals, deadlines, and alerts.
              </p>
            </div>
            <div className="feature-explore-link">
              <span>Learn more</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Feature 7 */}
          <div className="feature-card">
            <div>
              <div className="feature-icon-wrapper">
                <Users size={22} />
              </div>
              <h3 className="feature-card-title">User Management</h3>
              <p className="feature-card-desc">
                Administrators can oversee student cohorts, faculty mentors, and system security permissions.
              </p>
            </div>
            <div className="feature-explore-link">
              <span>Learn more</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Feature 8 */}
          <div className="feature-card">
            <div>
              <div className="feature-icon-wrapper">
                <BarChart3 size={22} />
              </div>
              <h3 className="feature-card-title">Reports & Analytics</h3>
              <p className="feature-card-desc">
                View useful information and visual charts about internships, completion rates, and progress.
              </p>
            </div>
            <div className="feature-explore-link">
              <span>Learn more</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="landing-section">
        <div className="section-header">
          <div className="section-badge">STREAMLINED PROCESS</div>
          <h2 className="section-title">How InternHub Works</h2>
          <p className="section-desc">
            From internship assignment to final feedback, everything stays organized in one place.
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-step-card">
            <div className="timeline-number">01</div>
            <h3 className="timeline-title">Join Internship</h3>
            <p className="timeline-desc">
              Student gets internship placement details and mentor assignment.
            </p>
          </div>

          <div className="timeline-step-card">
            <div className="timeline-number">02</div>
            <h3 className="timeline-title">Get Projects & Tasks</h3>
            <p className="timeline-desc">
              Mentor assigns technical projects and milestone tasks.
            </p>
          </div>

          <div className="timeline-step-card">
            <div className="timeline-number">03</div>
            <h3 className="timeline-title">Complete & Submit</h3>
            <p className="timeline-desc">
              Student works on assigned tasks and submits completed work.
            </p>
          </div>

          <div className="timeline-step-card">
            <div className="timeline-number">04</div>
            <h3 className="timeline-title">Mentor Reviews</h3>
            <p className="timeline-desc">
              Mentor inspects the submission notes and repository links.
            </p>
          </div>

          <div className="timeline-step-card">
            <div className="timeline-number">05</div>
            <h3 className="timeline-title">Feedback & Approval</h3>
            <p className="timeline-desc">
              Student receives grade feedback and final milestone approval.
            </p>
          </div>
        </div>
      </section>

      {/* 6. USER ROLES SECTION */}
      <section id="user-roles" className="landing-section">
        <div className="section-header">
          <div className="section-badge">TAILORED WORKSPACES</div>
          <h2 className="section-title">One Platform. Three Powerful Roles.</h2>
          <p className="section-desc">
            Dedicated features designed specifically for students, academic supervisors, and institutional admins.
          </p>
        </div>

        <div className="user-roles-grid">
          {/* Student Role */}
          <div className="role-card">
            <div>
              <div className="role-card-header">
                <div className="role-icon-box student">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h3 className="role-title">STUDENT</h3>
                  <span style={{ fontSize: '0.8125rem', color: '#77758A' }}>Intern & Learner Workspace</span>
                </div>
              </div>

              <ul className="role-bullet-list">
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" />
                  <span>View internship details</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" />
                  <span>View assigned projects</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" />
                  <span>Manage tasks & deadlines</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" />
                  <span>Submit work & repos</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" />
                  <span>Receive mentor feedback</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" />
                  <span>View notifications</span>
                </li>
              </ul>
            </div>

            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => handleLoginClick('student')}>
              <span>Login as Student</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mentor Role */}
          <div className="role-card">
            <div>
              <div className="role-card-header">
                <div className="role-icon-box mentor">
                  <UserCheck size={28} />
                </div>
                <div>
                  <h3 className="role-title">MENTOR</h3>
                  <span style={{ fontSize: '0.8125rem', color: '#77758A' }}>Academic & Faculty Supervisor</span>
                </div>
              </div>

              <ul className="role-bullet-list">
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#7CA9F8' }} />
                  <span>Manage assigned interns</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#7CA9F8' }} />
                  <span>Assign projects</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#7CA9F8' }} />
                  <span>Assign tasks & priorities</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#7CA9F8' }} />
                  <span>Review student submissions</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#7CA9F8' }} />
                  <span>Provide grades & feedback</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#7CA9F8' }} />
                  <span>Create announcements</span>
                </li>
              </ul>
            </div>

            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => handleLoginClick('mentor')}>
              <span>Login as Mentor</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Admin Role */}
          <div className="role-card">
            <div>
              <div className="role-card-header">
                <div className="role-icon-box admin">
                  <Shield size={28} />
                </div>
                <div>
                  <h3 className="role-title">ADMIN</h3>
                  <span style={{ fontSize: '0.8125rem', color: '#77758A' }}>Institutional Director</span>
                </div>
              </div>

              <ul className="role-bullet-list">
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#E9A6C7' }} />
                  <span>Manage users & roles</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#E9A6C7' }} />
                  <span>Manage internship batches</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#E9A6C7' }} />
                  <span>Manage projects & orgs</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#E9A6C7' }} />
                  <span>Manage tasks</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#E9A6C7' }} />
                  <span>View completion reports</span>
                </li>
                <li className="role-bullet-item">
                  <CheckCircle2 size={16} className="role-bullet-icon" style={{ color: '#E9A6C7' }} />
                  <span>Manage platform data</span>
                </li>
              </ul>
            </div>

            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => handleLoginClick('admin')}>
              <span>Login as Admin</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. WHY INTERNHUB */}
      <section id="why-internhub" className="landing-section">
        <div className="section-header">
          <div className="section-badge">BENEFITS</div>
          <h2 className="section-title">Why InternHub?</h2>
          <p className="section-desc">
            Built specifically to streamline academic and professional internship workflows.
          </p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <h3 className="why-card-title">Organized</h3>
            <p className="why-card-desc">
              Keep all internship-related information, tasks, repos, and grades in one central place.
            </p>
          </div>

          <div className="why-card">
            <h3 className="why-card-title">Collaborative</h3>
            <p className="why-card-desc">
              Connect students and mentors through a structured, transparent feedback workflow.
            </p>
          </div>

          <div className="why-card">
            <h3 className="why-card-title">Simple</h3>
            <p className="why-card-desc">
              Make project and task management easier with soft visual cards and clean interfaces.
            </p>
          </div>

          <div className="why-card">
            <h3 className="why-card-title">Scalable</h3>
            <p className="why-card-desc">
              Designed to grow seamlessly with future features and optional Firebase backend integration.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="landing-section">
        <div className="cta-banner">
          <h2 className="cta-title">Ready to Simplify Your Internship Experience?</h2>
          <p className="cta-desc">
            Join students, mentors, and organizations using InternHub to streamline project collaboration and feedback.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => handleRegisterClick('student')}>
              <span>Get Started Now</span>
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => handleLoginClick('student')}>
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="navbar-brand">
              <div className="brand-icon-wrapper">
                <Sparkles size={20} />
              </div>
              <div>
                <span>Intern</span>
                <span style={{ color: '#8B7CF6' }}>Hub</span>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#77758A', maxWidth: '300px', marginTop: '8px', lineHeight: 1.6 }}>
              The soft, elegant, and intelligent internship management platform for students, faculty mentors, and organizations.
            </p>
          </div>

          <div>
            <div className="footer-col-title">Product</div>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('features')} style={navLinkStyle}>Features</button></li>
              <li><button onClick={() => scrollToSection('how-it-works')} style={navLinkStyle}>How It Works</button></li>
              <li><button onClick={() => scrollToSection('why-internhub')} style={navLinkStyle}>Why InternHub</button></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">User Roles</div>
            <ul className="footer-links">
              <li><button onClick={() => handleLoginClick('student')} style={navLinkStyle}>For Students</button></li>
              <li><button onClick={() => handleLoginClick('mentor')} style={navLinkStyle}>For Mentors</button></li>
              <li><button onClick={() => handleLoginClick('admin')} style={navLinkStyle}>For Administrators</button></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Company & Legal</div>
            <ul className="footer-links">
              <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
              <li><a href="#support" onClick={(e) => e.preventDefault()}>Help & Support</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} InternHub. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Built with Soft Lavender Design System</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
