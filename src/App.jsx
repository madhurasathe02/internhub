import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Toast from './components/Toast';

// Admin Sub-pages
import AdminOverview from './components/admin/AdminOverview';
import AdminStudents from './components/admin/AdminStudents';
import AdminMentors from './components/admin/AdminMentors';
import AdminInternships from './components/admin/AdminInternships';
import AdminProjects from './components/admin/AdminProjects';
import AdminTasks from './components/admin/AdminTasks';
import AdminCertificates from './components/admin/AdminCertificates';
import AdminAnnouncements from './components/admin/AdminAnnouncements';
import AdminReports from './components/admin/AdminReports';
import AdminProfile from './components/admin/AdminProfile';
import AdminSettings from './components/admin/AdminSettings';

// Mentor Sub-pages
import MentorOverview from './components/mentor/MentorOverview';
import MentorInternships from './components/mentor/MentorInternships';
import MentorInterns from './components/mentor/MentorInterns';
import MentorProjects from './components/mentor/MentorProjects';
import MentorTasks from './components/mentor/MentorTasks';
import MentorSubmissions from './components/mentor/MentorSubmissions';
import MentorFeedback from './components/mentor/MentorFeedback';
import MentorCertificates from './components/mentor/MentorCertificates';
import MentorAnnouncements from './components/mentor/MentorAnnouncements';
import MentorProfile from './components/mentor/MentorProfile';
import MentorSettings from './components/mentor/MentorSettings';

// Intern / Student Sub-pages
import InternOverview from './components/intern/InternOverview';
import InternInternship from './components/intern/InternInternship';
import InternProjects from './components/intern/InternProjects';
import InternTasks from './components/intern/InternTasks';
import InternSubmitWork from './components/intern/InternSubmitWork';
import InternFeedback from './components/intern/InternFeedback';
import InternCertificate from './components/intern/InternCertificate';
import InternNotifications from './components/intern/InternNotifications';
import InternProfile from './components/intern/InternProfile';
import InternSettings from './components/intern/InternSettings';

import './App.css';

function AppContent() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        {/* 1. Landing Page - Always the FIRST page when visiting '/' */}
        <Route path="/" element={
          <LandingPage 
            onLogin={(role) => {
              const validRole = typeof role === 'string' ? role : 'student';
              navigate('/login', { state: { role: validRole } });
            }}
            onRegister={(role) => {
              const validRole = typeof role === 'string' ? role : 'student';
              navigate('/register', { state: { role: validRole } });
            }}
          />
        } />

        {/* 2 & 3. Dedicated Login / Register Pages */}
        <Route path="/login" element={<AuthPage initialMode="login" />} />
        <Route path="/register" element={<AuthPage initialMode="register" />} />

        {/* 4 & 5. Protected Admin Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminOverview />} />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route path="/admin/mentors" element={<AdminMentors />} />
            <Route path="/admin/internships" element={<AdminInternships />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/tasks" element={<AdminTasks />} />
            <Route path="/admin/certificates" element={<AdminCertificates />} />
            <Route path="/admin/announcements" element={<AdminAnnouncements />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* 4 & 6. Protected Mentor Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRoles={['mentor']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/mentor" element={<Navigate to="/mentor/dashboard" replace />} />
            <Route path="/mentor/dashboard" element={<MentorOverview />} />
            <Route path="/mentor/internships" element={<MentorInternships />} />
            <Route path="/mentor/interns" element={<MentorInterns />} />
            <Route path="/mentor/projects" element={<MentorProjects />} />
            <Route path="/mentor/tasks" element={<MentorTasks />} />
            <Route path="/mentor/submissions" element={<MentorSubmissions />} />
            <Route path="/mentor/feedback" element={<MentorFeedback />} />
            <Route path="/mentor/certificates" element={<MentorCertificates />} />
            <Route path="/mentor/announcements" element={<MentorAnnouncements />} />
            <Route path="/mentor/profile" element={<MentorProfile />} />
            <Route path="/mentor/settings" element={<MentorSettings />} />
          </Route>
        </Route>

        {/* 4 & 7. Protected Intern / Student Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/intern" element={<Navigate to="/intern/dashboard" replace />} />
            <Route path="/intern/dashboard" element={<InternOverview />} />
            <Route path="/intern/internship" element={<InternInternship />} />
            <Route path="/intern/projects" element={<InternProjects />} />
            <Route path="/intern/tasks" element={<InternTasks />} />
            <Route path="/intern/submit" element={<InternSubmitWork />} />
            <Route path="/intern/feedback" element={<InternFeedback />} />
            <Route path="/intern/certificate" element={<InternCertificate />} />
            <Route path="/intern/notifications" element={<InternNotifications />} />
            <Route path="/intern/profile" element={<InternProfile />} />
            <Route path="/intern/settings" element={<InternSettings />} />

            {/* Student Aliases */}
            <Route path="/student" element={<Navigate to="/intern/dashboard" replace />} />
            <Route path="/student/dashboard" element={<InternOverview />} />
            <Route path="/dashboard" element={<Navigate to="/intern/dashboard" replace />} />
          </Route>
        </Route>

        {/* Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Action Feedback Toast */}
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
