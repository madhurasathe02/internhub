import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Building, 
  Briefcase, 
  ShieldCheck, 
  Save, 
  Award,
  CheckCircle2,
  Pencil,
  Camera,
  Zap,
  Lock,
  ChevronRight,
  Download,
  Code2,
  Sparkles,
  BookOpen,
  Users,
  Layers,
  X,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ChangePasswordCard from './ChangePasswordCard';
import ModalPortal from './ModalPortal';
import '../styles/ProfileView.css';

export default function ProfileView() {
  const { user, updateUserProfile, showToast } = useApp();
  const navigate = useNavigate();

  const userRole = user?.role || 'student';
  const isMentor = userRole === 'mentor';
  const isAdmin = userRole === 'admin';
  const isStudent = !isMentor && !isAdmin;

  // Active Tab
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'records' | 'security'

  // Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSection, setEditSection] = useState('all'); // 'all' | 'skills' | 'academic'
  const [loading, setLoading] = useState(false);

  // Profile Form Fields
  const [name, setName] = useState(user?.name || (isAdmin ? 'Madhura Sathe' : isMentor ? 'Dr. Sarah Jenkins' : 'Gauri Zure'));
  const [email, setEmail] = useState(user?.email || (isAdmin ? 'admin@internhub.edu' : isMentor ? 'sarah.jenkins@internhub.edu' : 'gauri2@gmail.com'));
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [gender, setGender] = useState(user?.gender || 'Female');
  const [dob, setDob] = useState(user?.dob || '12 Mar 2006');
  const [address, setAddress] = useState(user?.address || 'Sangli, Maharashtra, India');

  // Academic / Professional Fields
  const [university, setUniversity] = useState(user?.university || (isAdmin ? 'Institutional Directorate' : isMentor ? 'Tech Institute of Science' : 'Tech Institute of Science'));
  const [course, setCourse] = useState(user?.major || user?.course || (isAdmin ? 'System Administrator & Director' : isMentor ? 'Senior Software Architect' : 'BSc Computer Science & Engineering'));
  const [year, setYear] = useState(user?.year || (isAdmin ? 'Superadmin Credentials' : isMentor ? '8+ Years Industry Exp' : '3rd Year (Final Year)'));
  const [enrollmentYear, setEnrollmentYear] = useState(user?.enrollmentYear || user?.employeeId || (isAdmin ? 'ADM-2026-01' : isMentor ? 'EMP-2026-88' : '2027'));
  const [semester, setSemester] = useState(user?.semester || (isAdmin ? 'Full System Active' : isMentor ? '14 Active Interns' : '5th Semester'));

  // Skills List
  const defaultSkills = isStudent
    ? ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'C++', 'SQL', 'Git & GitHub']
    : isMentor
    ? ['Software Architecture', 'Code Review', 'React', 'Node.js', 'Python', 'Microservices', 'Mentorship', 'Agile']
    : ['System Administration', 'Cohort Governance', 'Data Analytics', 'Security Audit', 'User Access', 'Institutional Compliance'];

  const [skills, setSkills] = useState(user?.skills || defaultSkills);
  const [newSkillInput, setNewSkillInput] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || name);
      setEmail(user.email || email);
      if (user.phone) setPhone(user.phone);
      if (user.gender) setGender(user.gender);
      if (user.dob) setDob(user.dob);
      if (user.address) setAddress(user.address);
      if (user.university) setUniversity(user.university);
      if (user.major || user.course) setCourse(user.major || user.course);
      if (user.year) setYear(user.year);
      if (user.enrollmentYear) setEnrollmentYear(user.enrollmentYear);
      if (user.semester) setSemester(user.semester);
      if (user.skills) setSkills(user.skills);
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const updatedData = {
      name,
      email,
      phone,
      gender,
      dob,
      address,
      university,
      major: course,
      course,
      year,
      enrollmentYear,
      semester,
      skills
    };

    if (updateUserProfile) {
      const res = await updateUserProfile(updatedData);
      setLoading(false);
      if (res && res.success === false) {
        if (showToast) showToast(res.message || 'Failed to update profile.', 'error');
      } else {
        if (showToast) showToast('Profile updated successfully!', 'success');
        setShowEditModal(false);
      }
    } else {
      setLoading(false);
      setShowEditModal(false);
      if (showToast) showToast('Profile updated!', 'success');
    }
  };

  const handleAddSkill = () => {
    const trimmed = newSkillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleDownloadResume = () => {
    if (showToast) showToast(`Downloading ${name.replace(/\s+/g, '_')}_Profile_Summary.pdf...`, 'success');
  };

  const displayAvatar = user?.avatar || name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'GZ';

  return (
    <div className="profile-page-container animate-fade-in">
      {/* 1. PROFILE HERO HEADER CARD */}
      <div className="profile-hero-card">
        <div className="profile-hero-banner" />
        <div className="profile-hero-content">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
            {/* Avatar Circle with Camera Overlay */}
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-circle">
                {displayAvatar}
              </div>
              <button 
                className="profile-avatar-camera-btn"
                title="Change Avatar Photo"
                onClick={() => {
                  setEditSection('all');
                  setShowEditModal(true);
                }}
              >
                <Camera size={14} />
              </button>
            </div>

            {/* Name, Role & Status */}
            <div className="profile-user-details">
              <div className="profile-user-name-row">
                <h1 className="profile-user-name">{name}</h1>
                <span className="profile-status-badge">
                  <CheckCircle2 size={13} />
                  <span>
                    {isAdmin ? 'System Administrator' : isMentor ? 'Faculty Supervisor' : 'Internship Verified'}
                  </span>
                </span>
              </div>
              <div className="profile-role-subtext">
                {isAdmin ? 'Administrator Account' : isMentor ? 'Mentor Account' : 'Student Account'}
              </div>

              <div className="profile-meta-row">
                <div className="profile-meta-item">
                  <GraduationCap size={15} className="profile-info-icon" />
                  <span>{course}</span>
                </div>
                <span>•</span>
                <div className="profile-meta-item">
                  <Building size={15} className="profile-info-icon" />
                  <span>{university}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Capsule Button */}
          <button 
            className="profile-edit-btn"
            onClick={() => {
              setEditSection('all');
              setShowEditModal(true);
            }}
          >
            <Pencil size={14} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* 2. NAVIGATION TABS BAR */}
      <div className="profile-tabs-bar">
        <button 
          className={`profile-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>

        <button 
          className={`profile-tab-btn ${activeTab === 'records' ? 'active' : ''}`}
          onClick={() => setActiveTab('records')}
        >
          {isAdmin ? 'System Governance' : isMentor ? 'Department & Interns' : 'Academic Records'}
        </button>

        <button 
          className={`profile-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>

      {/* 3. TAB 1: PROFILE VIEW GRID */}
      {activeTab === 'profile' && (
        <div className="profile-grid animate-fade-in">
          {/* LEFT COLUMN */}
          <div className="profile-column">
            {/* Personal Information Card */}
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-title-group">
                  <div className="profile-card-icon-box">
                    <User size={18} />
                  </div>
                  <h3 className="profile-card-title">Personal Information</h3>
                </div>
              </div>

              <div className="profile-info-list">
                <div className="profile-info-row">
                  <div className="profile-info-label-group">
                    <User size={15} className="profile-info-icon" />
                    <span>Full Name</span>
                  </div>
                  <div className="profile-info-value">{name}</div>
                </div>

                <div className="profile-info-row">
                  <div className="profile-info-label-group">
                    <Mail size={15} className="profile-info-icon" />
                    <span>Email Address</span>
                  </div>
                  <div className="profile-info-value">{email}</div>
                </div>

                <div className="profile-info-row">
                  <div className="profile-info-label-group">
                    <Phone size={15} className="profile-info-icon" />
                    <span>Phone Number</span>
                  </div>
                  <div className="profile-info-value">{phone}</div>
                </div>

                <div className="profile-info-row">
                  <div className="profile-info-label-group">
                    <UserCheck size={15} className="profile-info-icon" />
                    <span>Gender</span>
                  </div>
                  <div className="profile-info-value">{gender}</div>
                </div>

                <div className="profile-info-row">
                  <div className="profile-info-label-group">
                    <Calendar size={15} className="profile-info-icon" />
                    <span>Date of Birth</span>
                  </div>
                  <div className="profile-info-value">{dob}</div>
                </div>

                <div className="profile-info-row">
                  <div className="profile-info-label-group">
                    <MapPin size={15} className="profile-info-icon" />
                    <span>Address</span>
                  </div>
                  <div className="profile-info-value">{address}</div>
                </div>
              </div>
            </div>

            {/* Skills & Interests Card */}
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-title-group">
                  <div className="profile-card-icon-box">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="profile-card-title">Skills & Interests</h3>
                </div>
                <button 
                  className="profile-card-edit-link"
                  onClick={() => {
                    setEditSection('skills');
                    setShowEditModal(true);
                  }}
                >
                  <Pencil size={13} />
                  <span>Edit</span>
                </button>
              </div>

              <div className="profile-skills-grid">
                {skills.map((skill, idx) => (
                  <span key={idx} className="profile-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="profile-column">
            {/* Academic Information / Professional Info Card */}
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-title-group">
                  <div className="profile-card-icon-box">
                    <GraduationCap size={18} />
                  </div>
                  <h3 className="profile-card-title">
                    {isAdmin ? 'System Governance Info' : isMentor ? 'Professional Information' : 'Academic Information'}
                  </h3>
                </div>
                <button 
                  className="profile-card-edit-link"
                  onClick={() => {
                    setEditSection('academic');
                    setShowEditModal(true);
                  }}
                >
                  <Pencil size={13} />
                  <span>Edit</span>
                </button>
              </div>

              <div className="profile-info-list">
                <div className="profile-info-row">
                  <div className="profile-info-label-group">
                    <Building size={15} className="profile-info-icon" />
                    <span>{isAdmin ? 'Directorate' : isMentor ? 'Department' : 'University / Institution'}</span>
                  </div>
                  <div className="profile-info-value">{university}</div>
                </div>

                <div className="profile-info-row">
                  <div className="profile-info-label-group">
                    <BookOpen size={15} className="profile-info-icon" />
                    <span>{isAdmin ? 'Admin Designation' : isMentor ? 'Faculty Title' : 'Course'}</span>
                  </div>
                  <div className="profile-info-value">{course}</div>
                </div>

                <div className="profile-info-row">
                  <div className="profile-info-label-group">
                    <Calendar size={15} className="profile-info-icon" />
                    <span>{isAdmin ? 'Access Level' : isMentor ? 'Experience' : 'Year'}</span>
                  </div>
                  <div className="profile-info-value">{year}</div>
                </div>

                <div className="profile-info-row">
                  <div className="profile-info-label-group">
                    <Calendar size={15} className="profile-info-icon" />
                    <span>{isAdmin ? 'Admin Credential ID' : isMentor ? 'Employee ID' : 'Enrollment Year'}</span>
                  </div>
                  <div className="profile-info-value">{enrollmentYear}</div>
                </div>

                <div className="profile-info-row">
                  <div className="profile-info-label-group">
                    <Layers size={15} className="profile-info-icon" />
                    <span>{isAdmin ? 'System Status' : isMentor ? 'Supervised Cohort' : 'Current Semester'}</span>
                  </div>
                  <div className="profile-info-value">{semester}</div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-title-group">
                  <div className="profile-card-icon-box">
                    <Zap size={18} />
                  </div>
                  <h3 className="profile-card-title">Quick Actions</h3>
                </div>
              </div>

              <div className="profile-actions-list">
                <div className="profile-action-item" onClick={() => setActiveTab('security')}>
                  <div className="profile-action-left">
                    <Lock size={16} className="profile-action-icon" />
                    <span>Change Password</span>
                  </div>
                  <ChevronRight size={16} className="profile-action-chevron" />
                </div>

                {isStudent && (
                  <div className="profile-action-item" onClick={() => navigate('/intern/certificate')}>
                    <div className="profile-action-left">
                      <Award size={16} className="profile-action-icon" />
                      <span>View Certificate</span>
                    </div>
                    <ChevronRight size={16} className="profile-action-chevron" />
                  </div>
                )}

                {isMentor && (
                  <div className="profile-action-item" onClick={() => navigate('/mentor/interns')}>
                    <div className="profile-action-left">
                      <Users size={16} className="profile-action-icon" />
                      <span>View Assigned Interns</span>
                    </div>
                    <ChevronRight size={16} className="profile-action-chevron" />
                  </div>
                )}

                {isAdmin && (
                  <div className="profile-action-item" onClick={() => navigate('/admin/reports')}>
                    <div className="profile-action-left">
                      <Award size={16} className="profile-action-icon" />
                      <span>View Institutional Reports</span>
                    </div>
                    <ChevronRight size={16} className="profile-action-chevron" />
                  </div>
                )}

                <div className="profile-action-item" onClick={handleDownloadResume}>
                  <div className="profile-action-left">
                    <Download size={16} className="profile-action-icon" />
                    <span>{isStudent ? 'Download Resume' : 'Export Profile Summary'}</span>
                  </div>
                  <ChevronRight size={16} className="profile-action-chevron" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: ACADEMIC RECORDS / GOVERNANCE OVERVIEW */}
      {activeTab === 'records' && (
        <div className="profile-card animate-fade-in">
          <div className="profile-card-header">
            <div className="profile-card-title-group">
              <div className="profile-card-icon-box">
                <BookOpen size={18} />
              </div>
              <h3 className="profile-card-title">
                {isAdmin ? 'Institutional System Overview' : isMentor ? 'Mentorship & Department Log' : 'Academic Records & Transcript'}
              </h3>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#FAF9FE', padding: '16px', borderRadius: '14px', border: '1px solid #E8E5F5' }}>
              <div style={{ fontSize: '0.8125rem', color: '#77758A', fontWeight: 600 }}>Cumulative GPA</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E1B3A', marginTop: '4px' }}>3.92 / 4.0</div>
            </div>
            <div style={{ background: '#FAF9FE', padding: '16px', borderRadius: '14px', border: '1px solid #E8E5F5' }}>
              <div style={{ fontSize: '0.8125rem', color: '#77758A', fontWeight: 600 }}>Completed Credits</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8B7CF6', marginTop: '4px' }}>124 / 140</div>
            </div>
            <div style={{ background: '#FAF9FE', padding: '16px', borderRadius: '14px', border: '1px solid #E8E5F5' }}>
              <div style={{ fontSize: '0.8125rem', color: '#77758A', fontWeight: 600 }}>Internship Status</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16A34A', marginTop: '4px' }}>Verified (A+)</div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: SECURITY & PASSWORD */}
      {activeTab === 'security' && (
        <div className="animate-fade-in">
          <ChangePasswordCard 
            title="Account Password & Security" 
            subtitle="Update your login password and manage account security settings."
          />
        </div>
      )}

      {/* 6. EDIT PROFILE MODAL DIALOG */}
      {showEditModal && (
        <ModalPortal>
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
              <div className="modal-header">
                <h3 className="modal-title">Edit Profile Information</h3>
                <button className="modal-close" onClick={() => setShowEditModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveProfile}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select className="form-input" value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <input type="text" className="form-input" value={dob} onChange={(e) => setDob(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-input" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">University / Institution</label>
                    <input type="text" className="form-input" value={university} onChange={(e) => setUniversity(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Course / Department</label>
                    <input type="text" className="form-input" value={course} onChange={(e) => setCourse(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Year / Designation</label>
                    <input type="text" className="form-input" value={year} onChange={(e) => setYear(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Current Semester / Status</label>
                    <input type="text" className="form-input" value={semester} onChange={(e) => setSemester(e.target.value)} />
                  </div>
                </div>

                {/* Skills Tag Management */}
                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label">Skills & Tag List</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Add skill (e.g. React, Python)"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddSkill}>
                      Add
                    </button>
                  </div>

                  <div className="profile-skills-grid">
                    {skills.map((skill, idx) => (
                      <span key={idx} className="profile-skill-pill" style={{ cursor: 'pointer' }} onClick={() => handleRemoveSkill(skill)} title="Click to remove">
                        <span>{skill}</span>
                        <X size={12} />
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    <Save size={16} />
                    <span>{loading ? 'Saving Changes...' : 'Save Profile'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}
