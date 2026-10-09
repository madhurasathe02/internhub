import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
  Briefcase,
  X,
  Check
} from 'lucide-react';
import LandingNavbar from './LandingNavbar';
import SplashScreen from './SplashScreen';
import ModalPortal from './ModalPortal';
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

const FEATURES_DATA = [
  {
    id: 'internship-management',
    title: 'Internship Management',
    shortDesc: 'Manage internship information, mentors, partner organizations, program dates, and active statuses.',
    icon: Briefcase,
    badge: 'Core Administrative Module',
    fullDesc: 'Streamline the complete lifecycle of academic and industrial internship programs. Easily organize student cohorts, link faculty supervisors, set start and end dates, and track overall cohort progress from day one to completion.',
    keyCapabilities: [
      'Track active, upcoming, and completed internship batches',
      'Assign dedicated faculty mentors and industry supervisors',
      'Manage company partner details and MOU documentation',
      'Automate internship status updates and batch metrics'
    ],
    roles: ['Admin', 'Mentor', 'Student'],
    recommendedRole: 'admin',
    previewBadge: 'Batch & Program Controls',
    sampleDataType: 'Active Internship Batches & Tracks',
    sampleData: [
      { id: '1', title: 'Full Stack Web Development', subtitle: 'Partner: Apex Systems Inc.', detail: 'Supervisor: Dr. Sarah Jenkins • 18 Active Interns • 6 Months Track', badge: 'Active Track', tagColor: '#8B7CF6' },
      { id: '2', title: 'AI & Machine Learning Engineering', subtitle: 'Partner: Neural Labs', detail: 'Supervisor: Prof. Marcus Vance • 12 Active Interns • 4 Months Track', badge: 'Active Track', tagColor: '#7CA9F8' },
      { id: '3', title: 'FinTech Microservices Architecture', subtitle: 'Partner: FinTech Dynamics', detail: 'Supervisor: Elena Rostova • 15 Active Interns • 6 Months Track', badge: 'Active Track', tagColor: '#E9A6C7' }
    ]
  },
  {
    id: 'project-management',
    title: 'Project Management',
    shortDesc: 'Create, assign, and manage technical internship projects with clear specifications and tags.',
    icon: FolderKanban,
    badge: 'Technical Collaboration',
    fullDesc: 'Structure real-world technical assignments into manageable projects. Define tech stacks, milestone criteria, difficulty levels, and attach comprehensive guides for students to execute.',
    keyCapabilities: [
      'Create project templates with technology tag filters',
      'Set target milestone deadlines and deliverable goals',
      'Assign individual or team-based projects to interns',
      'Monitor completion percentages across active project modules'
    ],
    roles: ['Mentor', 'Admin', 'Student'],
    recommendedRole: 'mentor',
    previewBadge: 'Project Workspace',
    sampleDataType: 'Assigned Technical Projects & Specifications',
    sampleData: [
      { id: '1', title: 'Cloud-Native SaaS Dashboard', subtitle: 'Assigned to: Saloni Honrao', detail: 'Tech Stack: React, Node.js, REST API, UI Design • Due Nov 30, 2026', badge: '85% Progress', tagColor: '#8B7CF6' },
      { id: '2', title: 'LLM Fine-Tuning & Code Reviewer', subtitle: 'Assigned to: Liam Chen', detail: 'Tech Stack: Python, PyTorch, FastAPI, HuggingFace • Due Nov 30, 2026', badge: '60% Progress', tagColor: '#7CA9F8' },
      { id: '3', title: 'Payment Gateway Integration', subtitle: 'Assigned to: Maya Patel', detail: 'Tech Stack: Microservices, OAuth2, Go, Docker • Due Nov 15, 2026', badge: '40% Progress', tagColor: '#E9A6C7' }
    ]
  },
  {
    id: 'task-management',
    title: 'Task Management',
    shortDesc: 'Assign tasks, set due dates, specify priorities, and track milestone statuses in real time.',
    icon: CheckSquare,
    badge: 'Day-to-Day Operations',
    fullDesc: 'Break project milestones into granular daily or weekly tasks. Keep interns focused with clear priority flags, countdown timers, and interactive task status updates.',
    keyCapabilities: [
      'Set task priority tags (High, Medium, Low)',
      'Real-time status transitions (Pending, In Progress, Submitted, Done)',
      'Calendar deadline synchronization and overdue alerts',
      'Attach instructions, sample code, and guide documentation'
    ],
    roles: ['Student', 'Mentor', 'Admin'],
    recommendedRole: 'student',
    previewBadge: 'Milestone Tracker',
    sampleDataType: 'Specific Milestone Tasks & Assignments',
    sampleData: [
      { id: '1', title: 'Build User Authentication API & JWT Middleware', subtitle: 'Intern: Saloni Honrao • Priority: High', detail: 'Project: Cloud SaaS Dashboard • Deadline: Oct 12, 2026', badge: 'Submitted', tagColor: '#8B7CF6' },
      { id: '2', title: 'Fine-tune Llama 3 8B on Code Review Dataset', subtitle: 'Intern: Liam Chen • Priority: High', detail: 'Project: LLM Code Reviewer • Deadline: Oct 18, 2026', badge: 'In Progress', tagColor: '#7CA9F8' },
      { id: '3', title: 'Design Interactive Task Management Board', subtitle: 'Intern: Saloni Honrao • Priority: Medium', detail: 'Project: Cloud SaaS Dashboard • Deadline: Oct 22, 2026', badge: 'Pending', tagColor: '#E9A6C7' },
      { id: '4', title: 'Implement Stripe Webhooks & Log Verification', subtitle: 'Intern: Maya Patel • Priority: High', detail: 'Project: FinTech Payment Gateway • Deadline: Oct 25, 2026', badge: 'In Progress', tagColor: '#7CA9F8' }
    ]
  },
  {
    id: 'submission-management',
    title: 'Submission Management',
    shortDesc: 'Students can submit completed work, attach files, and link live code repositories for evaluation.',
    icon: UploadCloud,
    badge: 'Deliverable Verification',
    fullDesc: 'Empower interns to submit their completed code and project assets cleanly. Supports live GitHub/GitLab URL links, hosted preview URLs, write-ups, and file attachments.',
    keyCapabilities: [
      'Direct GitHub repository & live demo URL submissions',
      'Attach documentation files and implementation screenshots',
      'Submission timestamping and version history tracking',
      'Instant notification to mentors upon new work submission'
    ],
    roles: ['Student', 'Mentor'],
    recommendedRole: 'student',
    previewBadge: 'Submission Portal',
    sampleDataType: 'Deliverable Work Submissions & Code Links',
    sampleData: [
      { id: '1', title: 'Cloud SaaS Dashboard Module 1 PR', subtitle: 'Student: Saloni Honrao • Repository: github.com/salonih/saas-dashboard', detail: 'Submitted: Sep 24, 2026 • 2 Files attached, 1 Demo link', badge: 'Under Review', tagColor: '#8B7CF6' },
      { id: '2', title: 'LLM Code Review Script Benchmark', subtitle: 'Student: Liam Chen • Repository: github.com/liamchen/llm-reviewer', detail: 'Submitted: Sep 20, 2026 • Evaluated Score: 86 / 100', badge: 'Approved', tagColor: '#7CA9F8' },
      { id: '3', title: 'OAuth2 Token Verification Service', subtitle: 'Student: Maya Patel • Repository: github.com/mayap/fintech-auth', detail: 'Submitted: Sep 18, 2026 • Mentor commentary provided', badge: 'Revision Needed', tagColor: '#E9A6C7' }
    ]
  },
  {
    id: 'mentor-feedback',
    title: 'Mentor Feedback',
    shortDesc: 'Mentors can review submissions, assign grades out of 100, and provide constructive feedback.',
    icon: MessageSquare,
    badge: 'Academic Evaluation',
    fullDesc: 'Bridge the communication gap between supervisors and interns. Mentors can grade code submissions out of 100, provide inline revision feedback, and approve milestones in one click.',
    keyCapabilities: [
      'Numerical score grading out of 100 with color badge indicators',
      'Constructive reviewer commentary & revision requests',
      'One-click milestone approval and grade recording',
      'Transparent feedback history accessible to interns'
    ],
    roles: ['Mentor', 'Student'],
    recommendedRole: 'mentor',
    previewBadge: 'Evaluation & Review',
    sampleDataType: 'Supervisor Grade Evaluations & Written Reviews',
    sampleData: [
      { id: '1', title: 'Saloni Honrao — Score: 96 / 100', subtitle: 'Evaluator: Dr. Sarah Jenkins (Senior Software Architect)', detail: '"Extraordinary technical proficiency in full-stack architecture, clean code practices, and rapid problem solving."', badge: 'Grade A+', tagColor: '#8B7CF6' },
      { id: '2', title: 'Liam Chen — Score: 86 / 100', subtitle: 'Evaluator: Prof. Marcus Vance (Academic Director)', detail: '"Great analytical mindset and enthusiasm for machine learning model optimization."', badge: 'Grade A', tagColor: '#7CA9F8' },
      { id: '3', title: 'Maya Patel — Score: 82 / 100', subtitle: 'Evaluator: Elena Rostova (Principal Engineer)', detail: '"Solid microservice design. Needs slight improvement in error handling & unit test coverage."', badge: 'Grade B+', tagColor: '#E9A6C7' }
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    shortDesc: 'Keep students and mentors updated about new tasks, submission approvals, deadlines, and alerts.',
    icon: Bell,
    badge: 'Real-Time Communication',
    fullDesc: 'Stay informed on important updates with centralized notifications. Automatically alerts users about upcoming deadlines, newly assigned projects, mentor evaluations, and system announcements.',
    keyCapabilities: [
      'Instant alert delivery for task assignments and grade releases',
      'Categorized unread feeds with priority indicators',
      'Global institutional announcements from administrators',
      'Interactive quick-action links to inspect relevant items'
    ],
    roles: ['All Users'],
    recommendedRole: 'student',
    previewBadge: 'Alert Center',
    sampleDataType: 'Recent Notifications & System Broadcasts',
    sampleData: [
      { id: '1', title: 'Mid-Term Internship Progress Review 📌', subtitle: 'Target: All Interns & Mentors • Date: Sep 24, 2026', detail: 'All interns are requested to complete pending milestone task submissions before Oct 05 for mid-term reviews.', badge: 'Important Alert', tagColor: '#8B7CF6' },
      { id: '2', title: 'New Task Submission Received 📥', subtitle: 'Target: Dr. Sarah Jenkins • Date: Sep 24, 2026', detail: 'Saloni Honrao submitted "Build User Authentication API & JWT Middleware" for evaluation.', badge: 'Review Needed', tagColor: '#7CA9F8' },
      { id: '3', title: 'GitHub Code Review Standard Guidelines 📜', subtitle: 'Target: All Students • Date: Sep 20, 2026', detail: 'Please ensure all pull requests contain proper docstrings and unit test cases before submitting.', badge: 'Announcement', tagColor: '#E9A6C7' }
    ]
  },
  {
    id: 'user-management',
    title: 'User Management',
    shortDesc: 'Administrators can oversee student cohorts, faculty mentors, and system security permissions.',
    icon: Users,
    badge: 'Security & Access Control',
    fullDesc: 'Complete institutional governance over user accounts. Admins can create student profiles, assign faculty mentors, manage access credentials, and monitor platform engagement.',
    keyCapabilities: [
      'Role-based access controls for Students, Mentors, and Admins',
      'Bulk cohort onboarding and profile updates',
      'Mentor-to-Student mapping and supervisor re-assignment',
      'Account status toggles and security audit permissions'
    ],
    roles: ['Admin'],
    recommendedRole: 'admin',
    previewBadge: 'User Directory',
    sampleDataType: 'Registered System Users & Account Roles',
    sampleData: [
      { id: '1', title: 'Saloni Honrao (Student)', subtitle: 'Apex Systems Inc. • Mentor: Dr. Sarah Jenkins', detail: 'Major: Computer Science & Engineering • Status: Active Account', badge: 'Active Student', tagColor: '#8B7CF6' },
      { id: '2', title: 'Dr. Sarah Jenkins (Mentor)', subtitle: 'Senior Software Architect • CS & AI Dept', detail: '14 Assigned Student Interns • Status: Active Account', badge: 'Active Mentor', tagColor: '#7CA9F8' },
      { id: '3', title: 'Madhura Sathe (Admin)', subtitle: 'Institutional Director • Full System Governance', detail: 'Superadmin Credentials & Permissions • Status: Active Account', badge: 'System Admin', tagColor: '#E9A6C7' },
      { id: '4', title: 'Rohan Sharma (Student)', subtitle: 'Apex Systems Inc. • Mentor: Dr. Sarah Jenkins', detail: 'Pending Approval by Faculty Mentor', badge: 'Pending Approval', tagColor: '#E9A6C7' }
    ]
  },
  {
    id: 'reports-analytics',
    title: 'Reports & Analytics',
    shortDesc: 'View useful information and visual charts about internships, completion rates, and progress.',
    icon: BarChart3,
    badge: 'Performance Insights',
    fullDesc: 'Turn internship activity into visual intelligence. Generates visual charts on milestone completion rates, grade distributions, active cohort performance, and verifiable completion certificates.',
    keyCapabilities: [
      'Visual performance breakdown & task completion charts',
      'Digital certificate generation with verification credentials',
      'Exportable cohort summary logs for academic credit',
      'Individual intern progress radar and mentor workload metrics'
    ],
    roles: ['Admin', 'Mentor'],
    recommendedRole: 'admin',
    previewBadge: 'Analytics Dashboard',
    sampleDataType: 'Cohort Analytics Metrics & Completion Insights',
    sampleData: [
      { id: '1', title: 'Cohort Milestone Completion Rate', subtitle: '45 out of 52 active interns currently on track', detail: '87.4% average task completion rate across active internship programs', badge: '87.4% Complete', tagColor: '#8B7CF6' },
      { id: '2', title: 'Verified Projects Delivered', subtitle: '28 Technical Projects Completed', detail: 'All deliverables verified with live code repositories and demo links', badge: '28 Delivered', tagColor: '#7CA9F8' },
      { id: '3', title: 'Average Mentor Grade Rating', subtitle: 'Evaluated across 12 Faculty Mentors', detail: 'Average student score: 88.5 / 100 (Grade A equivalent across tracks)', badge: '88.5 Score', tagColor: '#E9A6C7' },
      { id: '4', title: 'Digital Completion Certificates Issued', subtitle: 'Verified with cryptographic credentials', detail: '14 verifiable completion certificates issued for the current cohort', badge: '14 Issued', tagColor: '#8B7CF6' }
    ]
  }
];

export default function LandingPage({ onLogin, onRegister }) {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(null);
  const [modalTab, setModalTab] = useState('data');

  const handleOpenFeatureModal = (idx) => {
    setActiveFeatureIndex(idx);
    setModalTab('data');
  };

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeFeatureIndex === null) return;
      if (e.key === 'Escape') {
        setActiveFeatureIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveFeatureIndex((prev) => (prev < FEATURES_DATA.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setActiveFeatureIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFeatureIndex]);

  const selectedFeature = activeFeatureIndex !== null ? FEATURES_DATA[activeFeatureIndex] : null;

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
            InternHub simplifies the complete internship workflow by bringing important tools into one organized platform. Click any feature card to view specific tasks and module details.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES_DATA.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div 
                key={feat.id} 
                className="feature-card"
                onClick={() => handleOpenFeatureModal(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenFeatureModal(idx);
                  }
                }}
                aria-label={`View details for ${feat.title}`}
              >
                <div>
                  <div className="feature-icon-wrapper">
                    <IconComponent size={22} />
                  </div>
                  <h3 className="feature-card-title">{feat.title}</h3>
                  <p className="feature-card-desc">
                    {feat.shortDesc}
                  </p>
                </div>
                <div className="feature-explore-link">
                  <span>Learn more</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURE DETAIL INTERACTIVE MODAL */}
      {selectedFeature && (
        <ModalPortal>
          <div 
            className="feature-modal-overlay"
            onClick={() => setActiveFeatureIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feature-modal-title"
          >
            <div 
              className="feature-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="feature-modal-header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="feature-modal-icon-badge-row">
                    <div className="feature-modal-icon-box">
                      {React.createElement(selectedFeature.icon, { size: 28 })}
                    </div>
                    <div>
                      <span className="section-badge" style={{ marginBottom: '4px', fontSize: '0.75rem' }}>
                        {selectedFeature.badge}
                      </span>
                      <h2 id="feature-modal-title" className="feature-modal-title">
                        {selectedFeature.title}
                      </h2>
                    </div>
                  </div>
                </div>

                <button 
                  className="feature-modal-close-btn"
                  onClick={() => setActiveFeatureIndex(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Sub-Header Tabs */}
              <div className="feature-modal-tab-row">
                <button 
                  className={`feature-modal-tab ${modalTab === 'data' ? 'active' : ''}`}
                  onClick={() => setModalTab('data')}
                >
                  <span>Live Tasks & Data ({selectedFeature.sampleData ? selectedFeature.sampleData.length : 0})</span>
                </button>
                <button 
                  className={`feature-modal-tab ${modalTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setModalTab('overview')}
                >
                  <span>Overview & Capabilities</span>
                </button>
              </div>

              {/* TAB 1: LIVE TASKS / DATA PREVIEW */}
              {modalTab === 'data' && (
                <div className="feature-modal-tab-content animate-fade-in">
                  <div className="feature-modal-section-title">
                    {selectedFeature.sampleDataType || 'Specific Module Items'}
                  </div>

                  <div className="feature-sample-items-list">
                    {selectedFeature.sampleData && selectedFeature.sampleData.map((item) => (
                      <div key={item.id} className="feature-sample-item-card">
                        <div className="feature-sample-item-top">
                          <h4 className="feature-sample-item-title">{item.title}</h4>
                          <span 
                            className="feature-sample-item-badge" 
                            style={{ 
                              backgroundColor: item.tagColor ? `${item.tagColor}18` : '#E6E3FA', 
                              color: item.tagColor || 'var(--primary)',
                              border: `1px solid ${item.tagColor ? `${item.tagColor}40` : 'var(--border-secondary)'}`
                            }}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <div className="feature-sample-item-subtitle">{item.subtitle}</div>
                        <div className="feature-sample-item-detail">{item.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: OVERVIEW & CAPABILITIES */}
              {modalTab === 'overview' && (
                <div className="feature-modal-tab-content animate-fade-in">
                  <p className="feature-modal-desc">
                    {selectedFeature.fullDesc}
                  </p>

                  <div className="feature-modal-section-title">Key Capabilities</div>
                  <div className="feature-modal-capabilities-list">
                    {selectedFeature.keyCapabilities.map((cap, i) => (
                      <div key={i} className="feature-modal-capability-item">
                        <Check size={16} className="feature-modal-capability-icon" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  <div className="feature-modal-section-title">Supported Roles</div>
                  <div className="feature-modal-roles-row">
                    {selectedFeature.roles.map((role, i) => (
                      <span key={i} className="feature-role-tag">
                        <CheckCircle2 size={13} style={{ color: 'var(--primary)' }} />
                        <span>{role}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="feature-modal-footer">
                <div className="feature-modal-nav-btns">
                  <button 
                    className="btn btn-secondary btn-sm"
                    disabled={activeFeatureIndex === 0}
                    onClick={() => handleOpenFeatureModal(Math.max(0, activeFeatureIndex - 1))}
                    style={{ opacity: activeFeatureIndex === 0 ? 0.5 : 1 }}
                  >
                    <ChevronLeft size={16} />
                    <span>Prev</span>
                  </button>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, padding: '0 4px' }}>
                    {activeFeatureIndex + 1} / {FEATURES_DATA.length}
                  </span>
                  <button 
                    className="btn btn-secondary btn-sm"
                    disabled={activeFeatureIndex === FEATURES_DATA.length - 1}
                    onClick={() => handleOpenFeatureModal(Math.min(FEATURES_DATA.length - 1, activeFeatureIndex + 1))}
                    style={{ opacity: activeFeatureIndex === FEATURES_DATA.length - 1 ? 0.5 : 1 }}
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    const roleToUse = selectedFeature.recommendedRole;
                    setActiveFeatureIndex(null);
                    handleLoginClick(roleToUse);
                  }}
                >
                  <span>Log In to Manage</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}

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
