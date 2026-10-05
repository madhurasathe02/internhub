import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { 
  MOCK_USER, 
  MOCK_MENTOR, 
  MOCK_STATS, 
  MOCK_PROJECTS, 
  MOCK_TASKS, 
  MOCK_SUBMISSIONS, 
  MOCK_NOTIFICATIONS 
} from '../mockData';

const AppContext = createContext();

const DEFAULT_INTERNSHIPS = [
  {
    id: 'intern_01',
    title: 'Full Stack Web Development',
    organization: 'Apex Systems Inc.',
    mentor: 'Dr. Sarah Jenkins',
    duration: '6 Months (Jun 2026 - Dec 2026)',
    status: 'Active',
    joined: true,
    description: 'Hands-on development of modern cloud SaaS portals, Web APIs, and UI systems.',
    totalInterns: 18,
  },
  {
    id: 'intern_02',
    title: 'AI & Machine Learning Engineering',
    organization: 'Neural Labs',
    mentor: 'Prof. Marcus Vance',
    duration: '4 Months (Jul 2026 - Nov 2026)',
    status: 'Active',
    joined: false,
    description: 'LLM fine-tuning, prompt engineering, and automated code review plugins.',
    totalInterns: 12,
  },
  {
    id: 'intern_03',
    title: 'FinTech Microservices Architecture',
    organization: 'FinTech Dynamics',
    mentor: 'Elena Rostova',
    duration: '6 Months (May 2026 - Nov 2026)',
    status: 'Active',
    joined: false,
    description: 'Secure payment gateway integrations, OAuth2 authentication, and API telemetry.',
    totalInterns: 15,
  }
];

const DEFAULT_ENROLLMENT_REQUESTS = [
  {
    id: 'req_01',
    studentId: 'usr_01',
    studentName: 'Alex Johnson',
    studentEmail: 'alex.johnson@university.edu',
    studentAvatar: 'AJ',
    internshipId: 'intern_01',
    internshipTitle: 'Full Stack Web Development',
    organization: 'Apex Systems Inc.',
    mentorName: 'Dr. Sarah Jenkins',
    status: 'Approved',
    requestedAt: 'Sep 24, 2026'
  },
  {
    id: 'req_02',
    studentId: 'usr_04',
    studentName: 'Liam Chen',
    studentEmail: 'l.chen@univ.edu',
    studentAvatar: 'LC',
    internshipId: 'intern_02',
    internshipTitle: 'AI & Machine Learning Engineering',
    organization: 'Neural Labs',
    mentorName: 'Prof. Marcus Vance',
    status: 'Pending',
    requestedAt: 'Sep 26, 2026'
  }
];

const DEFAULT_TEACHER_FEEDBACKS = [
  {
    id: 'tf_01',
    studentId: 'usr_01',
    studentName: 'Alex Johnson',
    studentAvatar: 'AJ',
    mentorId: 'usr_02',
    mentorName: 'Dr. Sarah Jenkins',
    rating: 5,
    clarityRating: 5,
    responsivenessRating: 5,
    supportRating: 5,
    comment: 'Dr. Jenkins provides exceptionally clear code reviews and timely guidance on architectural decisions!',
    submittedAt: 'Sep 24, 2026',
    category: 'Mentorship & Technical Support',
    anonymous: false
  },
  {
    id: 'tf_02',
    studentId: 'usr_04',
    studentName: 'Liam Chen',
    studentAvatar: 'LC',
    mentorId: 'usr_06',
    mentorName: 'Prof. Marcus Vance',
    rating: 5,
    clarityRating: 4,
    responsivenessRating: 5,
    supportRating: 4,
    comment: 'Prof. Vance gives great insights into ML optimization. Very responsive to questions during office hours.',
    submittedAt: 'Sep 21, 2026',
    category: 'Course & Project Guidance',
    anonymous: true
  }
];

const DEFAULT_EVALUATIONS = [
  {
    id: 'eval_01',
    studentId: 'usr_01',
    studentName: 'Alex Johnson',
    studentAvatar: 'AJ',
    mentorName: 'Dr. Sarah Jenkins',
    internshipTrack: 'Full Stack Web Development',
    evaluatedAt: 'Sep 24, 2026',
    submitted: true,
    ratings: {
      technicalSkills: 5,
      communication: 5,
      problemSolving: 5,
      teamwork: 4,
      taskCompletion: 5,
      professionalism: 5
    },
    overallScore: 4.8,
    gradeLabel: 'A+ (96%)',
    overallFeedback: 'Alex has shown extraordinary technical proficiency in full-stack architecture, clean code practices, and rapid problem solving. Consistently delivered deliverables ahead of deadlines.'
  },
  {
    id: 'eval_02',
    studentId: 'usr_04',
    studentName: 'Liam Chen',
    studentAvatar: 'LC',
    mentorName: 'Prof. Marcus Vance',
    internshipTrack: 'AI & Machine Learning Engineering',
    evaluatedAt: 'Sep 20, 2026',
    submitted: true,
    ratings: {
      technicalSkills: 4,
      communication: 4,
      problemSolving: 4,
      teamwork: 5,
      taskCompletion: 4,
      professionalism: 5
    },
    overallScore: 4.3,
    gradeLabel: 'A (86%)',
    overallFeedback: 'Great analytical mindset and enthusiasm for machine learning model optimization. Great teamwork skills.'
  }
];

const DEFAULT_CERTIFICATES = [
  {
    id: 'INH-2026-0001',
    internId: 'usr_01',
    internName: 'Alex Johnson',
    internAvatar: 'AJ',
    internshipTitle: 'Full Stack Web Development',
    projectName: 'Cloud-Native SaaS Dashboard',
    company: 'Apex Systems Inc.',
    mentorName: 'Dr. Sarah Jenkins',
    adminSignatory: 'Prof. Marcus Vance',
    startDate: 'Jun 01, 2026',
    endDate: 'Nov 30, 2026',
    completionDate: 'Sep 24, 2026',
    skills: ['React', 'Node.js', 'REST API', 'JavaScript', 'UI Design'],
    status: 'issued',
    issueDate: 'Sep 25, 2026'
  },
  {
    id: 'INH-2026-0002',
    internId: 'usr_04',
    internName: 'Liam Chen',
    internAvatar: 'LC',
    internshipTitle: 'AI & Machine Learning Engineering',
    projectName: 'LLM Fine-Tuning & Code Review Assistant',
    company: 'Neural Labs',
    mentorName: 'Prof. Marcus Vance',
    adminSignatory: 'Prof. Marcus Vance',
    startDate: 'Jul 01, 2026',
    endDate: 'Nov 30, 2026',
    completionDate: 'Sep 20, 2026',
    skills: ['Python', 'PyTorch', 'LLM Prompting', 'FastAPI'],
    status: 'pending',
    issueDate: null
  },
  {
    id: 'INH-2026-0003',
    internId: 'usr_03',
    internName: 'Maya Patel',
    internAvatar: 'MP',
    internshipTitle: 'FinTech Microservices Architecture',
    projectName: 'Payment Gateway Integration',
    company: 'FinTech Dynamics',
    mentorName: 'Elena Rostova',
    adminSignatory: 'Prof. Marcus Vance',
    startDate: 'May 15, 2026',
    endDate: 'Nov 15, 2026',
    completionDate: null,
    skills: ['Microservices', 'OAuth2', 'Go', 'Docker'],
    status: 'not_eligible',
    issueDate: null
  }
];

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 'ann_01',
    title: 'Mid-Term Internship Progress Review',
    author: 'Prof. Marcus Vance (Admin)',
    date: 'Sep 24, 2026',
    content: 'All interns are requested to complete pending milestone task submissions before Oct 05 for mid-term evaluations.',
    roleTarget: 'All'
  },
  {
    id: 'ann_02',
    title: 'GitHub Repository Submission Standard',
    author: 'Dr. Sarah Jenkins (Mentor)',
    date: 'Sep 20, 2026',
    content: 'Please ensure all pull requests contain proper docstrings and test cases before submitting links for grading.',
    roleTarget: 'Students'
  }
];

const DEFAULT_STUDENTS = [
  { id: 'usr_01', name: 'Alex Johnson', email: 'alex.johnson@university.edu', role: 'student', company: 'Apex Systems', status: 'Active', mentor: 'Dr. Sarah Jenkins', internshipJoined: 'Full Stack Web Development' },
  { id: 'usr_03', name: 'Maya Patel', email: 'm.patel@univ.edu', role: 'student', company: 'FinTech Dynamics', status: 'Active', mentor: 'Elena Rostova', internshipJoined: 'FinTech Microservices Architecture' },
  { id: 'usr_04', name: 'Liam Chen', email: 'l.chen@univ.edu', role: 'student', company: 'Neural Labs', status: 'Active', mentor: 'Prof. Marcus Vance', internshipJoined: 'AI & Machine Learning Engineering' },
  { id: 'usr_05', name: 'Sophia Taylor', email: 's.taylor@univ.edu', role: 'student', company: 'BioTech Innovators', status: 'Active', mentor: 'Dr. Sarah Jenkins', internshipJoined: 'Full Stack Web Development' },
  { id: 'usr_08', name: 'Madhura Sathe', email: 'm.sathe@univ.edu', role: 'student', company: 'Apex Systems', status: 'Active', mentor: 'Dr. Sarah Jenkins', internshipJoined: 'Full Stack Web Development' },
];

const DEFAULT_MENTORS = [
  { id: 'usr_02', name: 'Dr. Sarah Jenkins', email: 'sarah.jenkins@internhub.edu', role: 'mentor', department: 'Computer Science & AI', assignedCount: 14, title: 'Senior Software Architect' },
  { id: 'usr_06', name: 'Prof. Marcus Vance', email: 'm.vance@internhub.edu', role: 'mentor', department: 'Software Systems', assignedCount: 12, title: 'Academic Director' },
  { id: 'usr_07', name: 'Elena Rostova', email: 'elena@fintechdyn.com', role: 'mentor', department: 'FinTech Labs', assignedCount: 15, title: 'Principal Engineer' },
];

export const AppProvider = ({ children }) => {
  // Auth state
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('internhub_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Toast Feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Connected Workflow State with Session Storage persistence
  const [internships, setInternships] = useState(() => {
    const saved = sessionStorage.getItem('internhub_internships');
    return saved ? JSON.parse(saved) : DEFAULT_INTERNSHIPS;
  });

  const [projects, setProjects] = useState(() => {
    const saved = sessionStorage.getItem('internhub_projects');
    return saved ? JSON.parse(saved) : MOCK_PROJECTS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = sessionStorage.getItem('internhub_tasks');
    return saved ? JSON.parse(saved) : MOCK_TASKS;
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = sessionStorage.getItem('internhub_submissions');
    return saved ? JSON.parse(saved) : MOCK_SUBMISSIONS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = sessionStorage.getItem('internhub_notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const [evaluations, setEvaluations] = useState(() => {
    const saved = sessionStorage.getItem('internhub_evaluations');
    return saved ? JSON.parse(saved) : DEFAULT_EVALUATIONS;
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = sessionStorage.getItem('internhub_certificates');
    return saved ? JSON.parse(saved) : DEFAULT_CERTIFICATES;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = sessionStorage.getItem('internhub_announcements');
    return saved ? JSON.parse(saved) : DEFAULT_ANNOUNCEMENTS;
  });

  const [studentsList, setStudentsList] = useState(() => {
    const saved = sessionStorage.getItem('internhub_students');
    return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
  });

  const [mentorsList, setMentorsList] = useState(() => {
    const saved = sessionStorage.getItem('internhub_mentors');
    return saved ? JSON.parse(saved) : DEFAULT_MENTORS;
  });

  const [teacherFeedbacks, setTeacherFeedbacks] = useState(() => {
    const saved = sessionStorage.getItem('internhub_teacher_feedbacks');
    return saved ? JSON.parse(saved) : DEFAULT_TEACHER_FEEDBACKS;
  });

  const [enrollmentRequests, setEnrollmentRequests] = useState(() => {
    const saved = sessionStorage.getItem('internhub_enrollment_requests');
    return saved ? JSON.parse(saved) : DEFAULT_ENROLLMENT_REQUESTS;
  });

  // Real-time Firebase Firestore synchronization for Internships
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'internships'), (snapshot) => {
        if (!snapshot.empty) {
          const firebaseInternships = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setInternships(prev => {
            const merged = [...firebaseInternships];
            DEFAULT_INTERNSHIPS.forEach(def => {
              if (!merged.some(m => m.id === def.id || m.title.toLowerCase() === def.title.toLowerCase())) {
                merged.push(def);
              }
            });
            return merged;
          });
        }
      }, (error) => {
        console.warn('Firebase Firestore real-time snapshot notice:', error);
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore initialization notice:', err);
    }
  }, []);

  // Real-time Firebase Firestore synchronization for Enrollment Requests
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'enrollmentRequests'), (snapshot) => {
        if (!snapshot.empty) {
          const firebaseReqs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setEnrollmentRequests(prev => {
            const merged = [...firebaseReqs];
            DEFAULT_ENROLLMENT_REQUESTS.forEach(def => {
              if (!merged.some(m => m.id === def.id)) {
                merged.push(def);
              }
            });
            return merged;
          });
        }
      }, (error) => {
        console.warn('Firebase Firestore enrollmentRequests snapshot notice:', error);
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore initialization notice for enrollmentRequests:', err);
    }
  }, []);

  // Sync state changes to sessionStorage for session persistence
  useEffect(() => {
    if (user) sessionStorage.setItem('internhub_user', JSON.stringify(user));
    else sessionStorage.removeItem('internhub_user');
  }, [user]);

  useEffect(() => { sessionStorage.setItem('internhub_internships', JSON.stringify(internships)); }, [internships]);
  useEffect(() => { sessionStorage.setItem('internhub_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { sessionStorage.setItem('internhub_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { sessionStorage.setItem('internhub_submissions', JSON.stringify(submissions)); }, [submissions]);
  useEffect(() => { sessionStorage.setItem('internhub_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { sessionStorage.setItem('internhub_evaluations', JSON.stringify(evaluations)); }, [evaluations]);
  useEffect(() => { sessionStorage.setItem('internhub_certificates', JSON.stringify(certificates)); }, [certificates]);
  useEffect(() => { sessionStorage.setItem('internhub_teacher_feedbacks', JSON.stringify(teacherFeedbacks)); }, [teacherFeedbacks]);
  useEffect(() => { sessionStorage.setItem('internhub_announcements', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { sessionStorage.setItem('internhub_students', JSON.stringify(studentsList)); }, [studentsList]);
  useEffect(() => { sessionStorage.setItem('internhub_mentors', JSON.stringify(mentorsList)); }, [mentorsList]);

  // Login / Logout
  const login = (role, customEmail = null, customName = null) => {
    const normalizedRole = (typeof role === 'string' && ['student', 'mentor', 'admin'].includes(role)) ? role : 'student';
    let userData = null;
    if (normalizedRole === 'admin') {
      userData = {
        id: 'usr_admin',
        name: customName || 'Prof. Marcus Vance',
        email: customEmail || 'admin@internhub.edu',
        role: 'admin',
        title: 'Institutional Director',
        avatar: 'MV',
      };
    } else if (normalizedRole === 'mentor') {
      userData = {
        id: 'usr_mentor',
        name: customName || 'Dr. Sarah Jenkins',
        email: customEmail || 'sarah.jenkins@internhub.edu',
        role: 'mentor',
        title: 'Senior Software Architect & Supervisor',
        department: 'Computer Science & AI Lab',
        avatar: 'SJ',
      };
    } else {
      userData = {
        id: 'usr_01',
        name: customName || 'Alex Johnson',
        email: customEmail || 'alex.johnson@university.edu',
        role: 'student',
        title: 'Full Stack Web Intern',
        university: 'Tech Institute of Science',
        major: 'Computer Science & Engineering',
        avatar: 'AJ',
      };
    }
    setUser(userData);
    showToast(`Welcome back, ${userData.name}! Logged in as ${normalizedRole.toUpperCase()}.`, 'success');
    return userData;
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Firebase signOut notice:', e);
    }
    setUser(null);
    sessionStorage.removeItem('internhub_user');
    showToast('Signed out of session.', 'info');
  };

  // NOTIFICATION UTILITIES
  const getUserNotifications = () => {
    if (!user) return [];
    const normalizedRole = user.role === 'student' ? 'student' : user.role === 'mentor' ? 'mentor' : 'admin';
    return notifications.filter(n => {
      if (!n.targetRole || n.targetRole === 'all') return true;
      return n.targetRole === normalizedRole;
    });
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, unread: false } : n));
  };

  const markAllAsRead = () => {
    const userRole = user?.role === 'student' ? 'student' : user?.role === 'mentor' ? 'mentor' : 'admin';
    setNotifications(prev => prev.map(n => {
      const target = n.targetRole || 'all';
      if (target === 'all' || target === userRole) {
        return { ...n, unread: false };
      }
      return n;
    }));
    showToast('All notifications marked as read.', 'info');
  };

  // INTERNSHIP EVALUATION FUNCTION
  const submitEvaluation = (evalData) => {
    const studentId = evalData.studentId || 'usr_01';
    const existingIndex = evaluations.findIndex(e => e.studentId === studentId || e.studentName === evalData.studentName);

    const newEvaluation = {
      id: existingIndex >= 0 ? evaluations[existingIndex].id : `eval_${Date.now()}`,
      studentId: studentId,
      studentName: evalData.studentName,
      studentAvatar: evalData.studentAvatar || 'AJ',
      mentorName: user?.name || 'Dr. Sarah Jenkins',
      internshipTrack: evalData.internshipTrack || 'Full Stack Web Development',
      evaluatedAt: 'Sep 25, 2026',
      submitted: true,
      ratings: evalData.ratings,
      overallScore: evalData.overallScore,
      gradeLabel: evalData.overallScore >= 4.5 ? 'A+ (Outstanding)' : evalData.overallScore >= 4.0 ? 'A (Excellent)' : 'B (Satisfactory)',
      overallFeedback: evalData.overallFeedback
    };

    if (existingIndex >= 0) {
      setEvaluations(prev => prev.map((e, i) => i === existingIndex ? newEvaluation : e));
    } else {
      setEvaluations(prev => [newEvaluation, ...prev]);
    }

    // Generate Notification for Student
    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'Internship Evaluation Submitted ⭐',
        desc: `${user?.name || 'Mentor'} submitted your performance evaluation (Score: ${newEvaluation.overallScore}/5.0)`,
        time: 'Just now',
        unread: true,
        type: 'success',
        targetRole: 'student'
      },
      ...prev
    ]);

    showToast(`Evaluation for ${evalData.studentName} submitted! Overall Score: ${newEvaluation.overallScore}/5.0`, 'success');
  };

  const getEvaluationForStudent = (studentId) => {
    return evaluations.find(e => e.studentId === studentId || e.studentName.toLowerCase() === (user?.name || '').toLowerCase());
  };

  // CERTIFICATE MANAGEMENT FUNCTIONS
  const generateCertificateId = () => {
    const existingNums = certificates
      .map(c => {
        const match = c.id && c.id.match(/INH-2026-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(Boolean);
    const maxNum = existingNums.length > 0 ? Math.max(...existingNums) : 0;
    const nextNum = maxNum + 1;
    return `INH-2026-${String(nextNum).padStart(4, '0')}`;
  };

  const recommendCertificate = (studentId, studentName) => {
    const targetStudent = studentsList.find(s => s.id === studentId || s.name === studentName) || {
      id: studentId || 'usr_01',
      name: studentName || 'Alex Johnson',
      company: 'Apex Systems Inc.',
      mentor: user?.name || 'Dr. Sarah Jenkins',
      internshipJoined: 'Full Stack Web Development'
    };

    const existingCertIndex = certificates.findIndex(c => c.internId === targetStudent.id || c.internName.toLowerCase() === targetStudent.name.toLowerCase());

    const certId = existingCertIndex >= 0 && certificates[existingCertIndex].id ? certificates[existingCertIndex].id : generateCertificateId();

    const updatedCert = {
      id: certId,
      internId: targetStudent.id,
      internName: targetStudent.name,
      internAvatar: targetStudent.avatar || 'ST',
      internshipTitle: targetStudent.internshipJoined || 'Full Stack Web Development',
      projectName: projects[0]?.title || 'Cloud-Native SaaS Dashboard',
      company: targetStudent.company || 'Apex Systems Inc.',
      mentorName: targetStudent.mentor || user?.name || 'Dr. Sarah Jenkins',
      adminSignatory: 'Prof. Marcus Vance',
      startDate: 'Jun 01, 2026',
      endDate: 'Nov 30, 2026',
      completionDate: 'Sep 25, 2026',
      skills: ['React', 'JavaScript', 'Web Architecture', 'REST APIs'],
      status: 'pending', // Pending Verification
      issueDate: null
    };

    if (existingCertIndex >= 0) {
      setCertificates(prev => prev.map((c, idx) => idx === existingCertIndex ? { ...c, status: 'pending', id: certId } : c));
    } else {
      setCertificates(prev => [updatedCert, ...prev]);
    }

    // Notifications
    setNotifications(prev => [
      {
        id: `notif_${Date.now()}_admin`,
        title: 'Certificate Pending Verification 📜',
        desc: `${user?.name || 'Mentor'} recommended certificate for intern: "${targetStudent.name}"`,
        time: 'Just now',
        unread: true,
        type: 'info',
        targetRole: 'admin'
      },
      {
        id: `notif_${Date.now()}_student`,
        title: 'Certificate Recommended! 🎓',
        desc: `Your supervisor ${user?.name || 'Mentor'} recommended you for an Internship Completion Certificate. Pending Admin verification.`,
        time: 'Just now',
        unread: true,
        type: 'success',
        targetRole: 'student'
      },
      ...prev
    ]);

    showToast(`Certificate recommended for ${targetStudent.name}. Submitted to Admin for verification!`, 'success');
  };

  const verifyAndIssueCertificate = (certIdOrInternId) => {
    let targetCert = certificates.find(c => c.id === certIdOrInternId || c.internId === certIdOrInternId);

    const formattedDate = 'Sep 25, 2026';
    const finalId = targetCert?.id && targetCert.id.startsWith('INH-') ? targetCert.id : generateCertificateId();

    setCertificates(prev => prev.map(c => {
      if (c.id === certIdOrInternId || c.internId === certIdOrInternId || (targetCert && c.id === targetCert.id)) {
        return {
          ...c,
          id: finalId,
          status: 'issued',
          issueDate: formattedDate
        };
      }
      return c;
    }));

    const internName = targetCert ? targetCert.internName : 'Intern';

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'Certificate Issued & Verified! 🎓',
        desc: `Congratulations! Admin verified & issued your Internship Completion Certificate (${finalId}). Download it now!`,
        time: 'Just now',
        unread: true,
        type: 'success',
        targetRole: 'student'
      },
      ...prev
    ]);

    showToast(`Certificate ${finalId} officially verified and issued for ${internName}!`, 'success');
  };

  const getCertificateForStudent = (studentId, studentName) => {
    const currentName = user?.name || studentName || '';
    return certificates.find(c => 
      c.internId === studentId || 
      (currentName && c.internName.toLowerCase() === currentName.toLowerCase())
    );
  };

  // Connected Workflow Methods
  const assignProjectToStudent = (newProjectData) => {
    const createdProject = {
      id: `proj_${Date.now()}`,
      title: newProjectData.title,
      company: newProjectData.company || 'Apex Systems Inc.',
      mentor: newProjectData.mentor || user?.name || 'Dr. Sarah Jenkins',
      description: newProjectData.description || 'Assigned internship project assignment.',
      status: 'In Progress',
      deadline: newProjectData.deadline || 'Nov 30, 2026',
      progress: 0,
      tags: newProjectData.tags || ['React', 'Web Dev'],
      tasksCount: 1,
      completedTasks: 0,
    };

    setProjects(prev => [createdProject, ...prev]);

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'New Project Assigned 🚀',
        desc: `${user?.name || 'Mentor'} assigned project: "${createdProject.title}" for ${createdProject.company}`,
        time: 'Just now',
        unread: true,
        type: 'info',
        targetRole: 'student'
      },
      ...prev
    ]);

    showToast(`Project "${createdProject.title}" assigned successfully!`, 'success');
  };

  const createTask = (taskData) => {
    const newTask = {
      id: `task_${Date.now()}`,
      title: taskData.title,
      project: taskData.project || projects[0]?.title || 'Cloud-Native SaaS Dashboard',
      assignedTo: taskData.assignedTo || 'Alex Johnson',
      dueDate: taskData.dueDate || 'Oct 20, 2026',
      status: 'Pending',
      priority: taskData.priority || 'Medium',
      description: taskData.description || 'Task assigned by mentor.',
      feedback: '',
    };

    setTasks(prev => [newTask, ...prev]);

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'New Task Assigned 📋',
        desc: `${user?.name || 'Mentor'} assigned task: "${newTask.title}" for ${newTask.project}`,
        time: 'Just now',
        unread: true,
        type: 'info',
        targetRole: 'student'
      },
      ...prev
    ]);

    showToast(`Task "${newTask.title}" assigned to ${newTask.assignedTo}!`, 'success');
  };

  const sendTaskReminder = (taskTitle, studentName, dueDate) => {
    const newNotif = {
      id: `notif_${Date.now()}`,
      title: 'Task Deadline Approaching ⏰',
      desc: `Task "${taskTitle}" assigned to ${studentName || 'you'} is due soon (${dueDate}). Please submit work before deadline.`,
      time: 'Just now',
      unread: true,
      type: 'warning',
      targetRole: 'student'
    };

    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Deadline reminder sent to intern for "${taskTitle}"!`, 'warning');
  };

  const addSubmission = (submissionData) => {
    const targetTaskTitle = submissionData.taskTitle;
    const targetTask = tasks.find(t => t.title.toLowerCase() === targetTaskTitle.toLowerCase() || t.id === submissionData.taskId);
    
    const taskName = targetTask ? targetTask.title : targetTaskTitle;
    const projectTitle = submissionData.projectTitle || (targetTask ? targetTask.project : 'Cloud-Native SaaS Dashboard');

    const isResubmission = targetTask?.status === 'Changes Requested';
    const existingSubIndex = submissions.findIndex(s => s.taskTitle.toLowerCase() === taskName.toLowerCase());

    if (existingSubIndex >= 0) {
      setSubmissions(prev => prev.map((s, idx) => {
        if (idx === existingSubIndex) {
          return {
            ...s,
            status: 'Under Review',
            submittedAt: 'Just now (Updated)',
            submissionUrl: submissionData.repoUrl || s.submissionUrl,
            notes: submissionData.notes || s.notes,
            fileAttached: submissionData.fileName || s.fileAttached,
            feedback: '',
          };
        }
        return s;
      }));
    } else {
      const newSub = {
        id: `sub_${Date.now()}`,
        studentName: user?.name || 'Alex Johnson',
        studentAvatar: user?.avatar || 'AJ',
        taskTitle: taskName,
        projectTitle: projectTitle,
        submittedAt: 'Just now',
        status: 'Under Review',
        submissionUrl: submissionData.repoUrl || 'https://github.com/internhub/task-submission',
        notes: submissionData.notes || 'Task completed according to specification.',
        fileAttached: submissionData.fileName || 'deliverable_spec.pdf',
        feedback: '',
      };
      setSubmissions(prev => [newSub, ...prev]);
    }

    setTasks(prev => prev.map(t => 
      t.title.toLowerCase() === taskName.toLowerCase() || t.id === submissionData.taskId
        ? { ...t, status: 'Under Review', feedback: '' }
        : t
    ));

    const notifTitle = isResubmission ? 'Resubmission Received 🔄' : 'New Submission Received 📬';
    const notifDesc = isResubmission 
      ? `${user?.name || 'Alex Johnson'} resubmitted updated work for task "${taskName}"`
      : `${user?.name || 'Alex Johnson'} submitted work for task "${taskName}"`;

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: notifTitle,
        desc: notifDesc,
        time: 'Just now',
        unread: true,
        type: 'info',
        targetRole: 'mentor'
      },
      ...prev
    ]);

    showToast(`Work for "${taskName}" submitted! Status updated to Under Review.`, 'success');
  };

  const reviewSubmission = (subId, newStatus, feedbackNotes, gradeScore) => {
    const finalStatus = (newStatus === 'Completed' || newStatus === 'Approved') ? 'Approved' : 'Changes Requested';

    setSubmissions(prev => prev.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          status: finalStatus,
          feedback: feedbackNotes,
          grade: gradeScore || s.grade || 95,
        };
      }
      return s;
    }));

    const targetSub = submissions.find(s => s.id === subId);
    const taskName = targetSub ? targetSub.taskTitle : '';

    setTasks(prev => prev.map(t => {
      if (t.title.toLowerCase() === taskName.toLowerCase()) {
        return {
          ...t,
          status: finalStatus,
          feedback: feedbackNotes,
        };
      }
      return t;
    }));

    if (finalStatus === 'Approved' && targetSub) {
      setProjects(prev => prev.map(p => {
        if (p.title.toLowerCase() === targetSub.projectTitle.toLowerCase()) {
          const newCompleted = Math.min(p.tasksCount, (p.completedTasks || 0) + 1);
          const newProgress = Math.min(100, Math.round((newCompleted / (p.tasksCount || 1)) * 100));
          return {
            ...p,
            completedTasks: newCompleted,
            progress: newProgress,
            status: newProgress === 100 ? 'Completed' : p.status
          };
        }
        return p;
      }));
    }

    const isApproved = finalStatus === 'Approved';

    const eventNotifTitle = isApproved ? 'Submission Approved! 🎉' : 'Changes Requested ⚠️';
    const eventNotifDesc = isApproved 
      ? `Dr. Sarah Jenkins approved "${taskName}" with grade ${gradeScore || 95}%!`
      : `Dr. Sarah Jenkins requested changes on "${taskName}": ${feedbackNotes || 'Please revise deliverable.'}`;

    const feedbackNotif = {
      id: `notif_${Date.now() + 1}`,
      title: 'Mentor Feedback Received 💬',
      desc: `Supervisor provided feedback for "${taskName}": "${feedbackNotes || (isApproved ? 'Approved!' : 'Revision required')}"`,
      time: 'Just now',
      unread: true,
      type: isApproved ? 'success' : 'warning',
      targetRole: 'student'
    };

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: eventNotifTitle,
        desc: eventNotifDesc,
        time: 'Just now',
        unread: true,
        type: isApproved ? 'success' : 'warning',
        targetRole: 'student'
      },
      feedbackNotif,
      ...prev
    ]);

    if (isApproved) {
      showToast(`Submission "${taskName}" approved with grade ${gradeScore || 95}%!`, 'success');
    } else {
      showToast(`Changes requested for "${taskName}". Intern notified.`, 'warning');
    }
  };

  const createAnnouncement = (annData) => {
    const newAnn = {
      id: `ann_${Date.now()}`,
      title: annData.title,
      author: `${user?.name || 'Administrator'} (${user?.role === 'admin' ? 'Admin' : 'Mentor'})`,
      date: 'Today',
      content: annData.content,
      roleTarget: annData.roleTarget || 'All'
    };
    setAnnouncements(prev => [newAnn, ...prev]);

    const targetRoleTag = annData.roleTarget === 'Students' ? 'student' : annData.roleTarget === 'Mentors' ? 'mentor' : 'all';

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: `Important Announcement 📢: ${annData.title}`,
        desc: annData.content,
        time: 'Just now',
        unread: true,
        type: 'announcement',
        targetRole: targetRoleTag
      },
      ...prev
    ]);

    showToast('Announcement published and sent to users!', 'info');
  };

  const requestEnrollment = async (internshipId) => {
    const targetProgram = internships.find(i => i.id === internshipId);
    if (!targetProgram) return;

    const studentName = user?.name || 'Alex Johnson';
    const studentId = user?.id || 'usr_01';

    // Check if request already exists for this student & program
    const existing = enrollmentRequests.find(r => r.studentId === studentId && (r.internshipId === internshipId || r.internshipTitle === targetProgram.title));
    if (existing) {
      if (existing.status === 'Pending') {
        showToast('Enrollment request is currently pending mentor approval.', 'info');
        return;
      }
      if (existing.status === 'Approved') {
        showToast('You are already enrolled in this internship track!', 'success');
        return;
      }
    }

    const newRequestPayload = {
      studentId: studentId,
      studentName: studentName,
      studentEmail: user?.email || 'alex.johnson@university.edu',
      studentAvatar: user?.avatar || 'AJ',
      internshipId: targetProgram.id,
      internshipTitle: targetProgram.title,
      organization: targetProgram.organization,
      mentorName: targetProgram.mentor || 'Dr. Sarah Jenkins',
      status: 'Pending',
      requestedAt: 'Just now'
    };

    const tempReqId = `req_${Date.now()}`;
    const localReq = { id: tempReqId, ...newRequestPayload };

    setEnrollmentRequests(prev => [localReq, ...prev]);

    // Persist to Firebase Firestore
    try {
      const docRef = await addDoc(collection(db, 'enrollmentRequests'), newRequestPayload);
      setEnrollmentRequests(prev => prev.map(r => r.id === tempReqId ? { ...r, id: docRef.id } : r));
    } catch (err) {
      console.warn('Firestore addDoc error for enrollment request:', err);
    }

    // Trigger notification for mentor
    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'New Internship Enrollment Request 📩',
        desc: `${studentName} requested to join "${targetProgram.title}" at ${targetProgram.organization}. Mentor approval required.`,
        time: 'Just now',
        unread: true,
        type: 'info',
        targetRole: 'mentor'
      },
      ...prev
    ]);

    showToast(`Enrollment request submitted for "${targetProgram.title}"! Waiting for mentor approval.`, 'info');
  };

  const approveEnrollmentRequest = async (requestId) => {
    const targetReq = enrollmentRequests.find(r => r.id === requestId);
    if (!targetReq) return;

    setEnrollmentRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Approved' } : r));

    setInternships(prev => prev.map(i => (i.id === targetReq.internshipId || i.title === targetReq.internshipTitle) ? { ...i, joined: true } : i));

    try {
      if (requestId && !requestId.startsWith('req_')) {
        const reqRef = doc(db, 'enrollmentRequests', requestId);
        await updateDoc(reqRef, { status: 'Approved' });
      }
      if (targetReq.internshipId && !targetReq.internshipId.startsWith('intern_')) {
        const internRef = doc(db, 'internships', targetReq.internshipId);
        await updateDoc(internRef, { joined: true });
      }
    } catch (err) {
      console.warn('Firestore updateDoc error:', err);
    }

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'Enrollment Approved! 🎉',
        desc: `${user?.name || 'Mentor'} approved your enrollment in "${targetReq.internshipTitle}" at ${targetReq.organization}. Welcome aboard!`,
        time: 'Just now',
        unread: true,
        type: 'success',
        targetRole: 'student'
      },
      ...prev
    ]);

    showToast(`Approved enrollment request for ${targetReq.studentName}!`, 'success');
  };

  const rejectEnrollmentRequest = async (requestId) => {
    const targetReq = enrollmentRequests.find(r => r.id === requestId);
    if (!targetReq) return;

    setEnrollmentRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Rejected' } : r));

    try {
      if (requestId && !requestId.startsWith('req_')) {
        const reqRef = doc(db, 'enrollmentRequests', requestId);
        await updateDoc(reqRef, { status: 'Rejected' });
      }
    } catch (err) {
      console.warn('Firestore updateDoc error:', err);
    }

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'Enrollment Request Status Update ⚠️',
        desc: `${user?.name || 'Mentor'} declined enrollment for "${targetReq.internshipTitle}". Contact your supervisor for details.`,
        time: 'Just now',
        unread: true,
        type: 'warning',
        targetRole: 'student'
      },
      ...prev
    ]);

    showToast(`Declined enrollment request for ${targetReq.studentName}.`, 'warning');
  };

  const getStudentEnrollmentStatus = (internshipId) => {
    const studentId = user?.id || 'usr_01';
    const targetProgram = internships.find(i => i.id === internshipId);

    const targetReq = enrollmentRequests.find(r => 
      (r.studentId === studentId || r.studentName.toLowerCase() === (user?.name || '').toLowerCase()) && 
      (r.internshipId === internshipId || (targetProgram && r.internshipTitle === targetProgram.title))
    );

    if (targetReq) {
      return targetReq.status; // 'Pending' | 'Approved' | 'Rejected'
    }

    if (targetProgram && targetProgram.joined) {
      return 'Approved';
    }

    return 'None';
  };

  const joinInternship = async (internshipId) => {
    return requestEnrollment(internshipId);
  };

  const addInternship = async (internshipData) => {
    const newInternshipPayload = {
      title: internshipData.title,
      organization: internshipData.organization || 'Apex Systems Inc.',
      mentor: user?.name || internshipData.mentor || 'Dr. Sarah Jenkins',
      duration: internshipData.duration || '6 Months (Oct 2026 - Mar 2027)',
      status: 'Active',
      joined: false,
      isNew: true,
      createdAt: new Date().toISOString(),
      description: internshipData.description || 'Hands-on internship development track with partner organization.',
      totalInterns: Number(internshipData.totalInterns) || 15,
    };

    const tempId = `intern_${Date.now()}`;
    const localInternship = { id: tempId, ...newInternshipPayload };

    // Optimistic Local & Session Update
    setInternships(prev => [localInternship, ...prev]);

    // Persist to Firebase Firestore
    try {
      const docRef = await addDoc(collection(db, 'internships'), newInternshipPayload);
      setInternships(prev => prev.map(item => item.id === tempId ? { ...item, id: docRef.id } : item));
      console.log('Internship stored to Firebase Firestore with ID:', docRef.id);
    } catch (err) {
      console.warn('Firebase Firestore write notice (falling back to local session state):', err);
    }

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'New Internship Track Created! 🚀',
        desc: `${user?.name || 'Mentor'} posted a new internship program: "${newInternshipPayload.title}" at ${newInternshipPayload.organization}. Enroll now!`,
        time: 'Just now',
        unread: true,
        type: 'info',
        targetRole: 'student'
      },
      ...prev
    ]);

    showToast(`New Internship track "${newInternshipPayload.title}" stored to Firebase & created!`, 'success');
    return localInternship;
  };

  const addStudent = (studentData) => {
    setStudentsList(prev => [
      {
        id: `usr_${Date.now()}`,
        name: studentData.name,
        email: studentData.email,
        role: 'student',
        company: studentData.company || 'Apex Systems',
        status: 'Active',
        mentor: studentData.mentor || 'Dr. Sarah Jenkins',
        internshipJoined: studentData.internshipJoined || 'Full Stack Web Development'
      },
      ...prev
    ]);
    showToast(`Student ${studentData.name} registered.`, 'success');
  };

  const addMentor = (mentorData) => {
    setMentorsList(prev => [
      {
        id: `usr_${Date.now()}`,
        name: mentorData.name,
        email: mentorData.email,
        role: 'mentor',
        department: mentorData.department || 'Computer Science',
        assignedCount: 0,
        title: mentorData.title || 'Academic Supervisor'
      },
      ...prev
    ]);
    showToast(`Mentor ${mentorData.name} registered.`, 'success');
  };

  // STUDENT TO TEACHER/MENTOR FEEDBACK
  const submitStudentFeedbackToMentor = (feedbackData) => {
    const newFeedback = {
      id: `tf_${Date.now()}`,
      studentId: user?.id || 'usr_01',
      studentName: feedbackData.anonymous ? 'Anonymous Student' : (user?.name || 'Alex Johnson'),
      studentAvatar: feedbackData.anonymous ? 'AN' : (user?.avatar || 'AJ'),
      mentorId: feedbackData.mentorId || 'usr_02',
      mentorName: feedbackData.mentorName || 'Dr. Sarah Jenkins',
      rating: Number(feedbackData.rating) || 5,
      clarityRating: Number(feedbackData.clarityRating) || 5,
      responsivenessRating: Number(feedbackData.responsivenessRating) || 5,
      supportRating: Number(feedbackData.supportRating) || 5,
      comment: feedbackData.comment || 'Great mentorship experience!',
      submittedAt: 'Just now',
      category: feedbackData.category || 'Mentorship & Technical Support',
      anonymous: !!feedbackData.anonymous
    };

    setTeacherFeedbacks(prev => [newFeedback, ...prev]);

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'New Student Feedback Received 💬',
        desc: `${newFeedback.studentName} submitted mentorship feedback for ${newFeedback.mentorName} (${newFeedback.rating}/5.0 ⭐)`,
        time: 'Just now',
        unread: true,
        type: 'info',
        targetRole: 'mentor'
      },
      ...prev
    ]);

    showToast(`Feedback submitted for ${newFeedback.mentorName}! Thank you for your review.`, 'success');
  };

  // DIRECT MENTOR TO STUDENT FEEDBACK
  const submitDirectMentorFeedback = (feedbackData) => {
    const studentName = feedbackData.studentName || 'Alex Johnson';
    const taskTitle = feedbackData.taskTitle || 'Milestone Deliverable';
    const projectTitle = feedbackData.projectTitle || 'Cloud-Native SaaS Dashboard';
    const feedbackNotes = feedbackData.feedback || 'Great execution!';
    const gradeScore = Number(feedbackData.grade) || 95;

    const existingSubIndex = submissions.findIndex(s => s.studentName.toLowerCase() === studentName.toLowerCase() && s.taskTitle.toLowerCase() === taskTitle.toLowerCase());

    if (existingSubIndex >= 0) {
      setSubmissions(prev => prev.map((s, idx) => idx === existingSubIndex ? {
        ...s,
        feedback: feedbackNotes,
        grade: gradeScore,
        status: feedbackData.status || s.status || 'Approved'
      } : s));
    } else {
      const newSub = {
        id: `sub_${Date.now()}`,
        studentName: studentName,
        studentAvatar: studentName.split(' ').map(n=>n[0]).join(''),
        taskTitle: taskTitle,
        projectTitle: projectTitle,
        submittedAt: 'Just now',
        status: feedbackData.status || 'Approved',
        submissionUrl: 'https://github.com/internhub/deliverable',
        notes: 'Direct mentor feedback evaluation.',
        fileAttached: 'feedback_report.pdf',
        feedback: feedbackNotes,
        grade: gradeScore
      };
      setSubmissions(prev => [newSub, ...prev]);
    }

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: 'Mentor Feedback Received 💬',
        desc: `${user?.name || 'Mentor'} submitted feedback for "${taskTitle}": "${feedbackNotes}"`,
        time: 'Just now',
        unread: true,
        type: 'success',
        targetRole: 'student'
      },
      ...prev
    ]);

    showToast(`Feedback issued to ${studentName}!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        toast,
        showToast,
        hideToast,
        internships,
        joinInternship,
        addInternship,
        enrollmentRequests,
        requestEnrollment,
        approveEnrollmentRequest,
        rejectEnrollmentRequest,
        getStudentEnrollmentStatus,
        projects,
        assignProjectToStudent,
        tasks,
        createTask,
        sendTaskReminder,
        submissions,
        addSubmission,
        reviewSubmission,
        submitDirectMentorFeedback,
        evaluations,
        submitEvaluation,
        getEvaluationForStudent,
        certificates,
        recommendCertificate,
        verifyAndIssueCertificate,
        getCertificateForStudent,
        announcements,
        createAnnouncement,
        notifications,
        getUserNotifications,
        markAsRead,
        markAllAsRead,
        studentsList,
        addStudent,
        mentorsList,
        addMentor,
        teacherFeedbacks,
        submitStudentFeedbackToMentor,
        mockStats: MOCK_STATS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
