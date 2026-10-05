/**
 * Reusable Analytics Helper Utilities for InternHub
 * Provides reactive calculations for Admin, Mentor, and Intern role dashboards.
 * All functions compute live statistics from the current React state.
 */

export function getAdminAnalytics(state) {
  const {
    studentsList = [],
    mentorsList = [],
    internships = [],
    projects = [],
    submissions = [],
    certificates = [],
    evaluations = []
  } = state || {};

  const totalInterns = studentsList.length;
  const totalMentors = mentorsList.length;
  const activeInternships = internships.filter(i => i.status === 'Active' || i.joined).length;
  const completedInternships = internships.filter(i => i.status === 'Completed').length;
  const upcomingInternships = internships.filter(i => i.status === 'Upcoming').length;
  const totalProjects = projects.length;

  const pendingSubmissions = submissions.filter(s => s.status === 'Under Review' || s.status === 'Pending').length;
  const approvedSubmissions = submissions.filter(s => s.status === 'Approved' || s.status === 'Completed').length;
  const changesRequested = submissions.filter(s => s.status === 'Changes Requested').length;
  const submittedOnly = submissions.filter(s => s.status === 'Submitted').length;

  const certificatesIssued = certificates.filter(c => c.status === 'issued').length;
  const pendingCertificates = certificates.filter(c => c.status === 'pending').length;
  const notEligibleCertificates = certificates.filter(c => c.status === 'not_eligible').length;

  const totalSubmissionsCount = submissions.length || 1;
  const submissionBreakdown = {
    submitted: submittedOnly,
    underReview: pendingSubmissions,
    approved: approvedSubmissions,
    changesRequested: changesRequested,
    total: submissions.length,
    approvedPct: Math.round((approvedSubmissions / totalSubmissionsCount) * 100) || 0,
    reviewPct: Math.round((pendingSubmissions / totalSubmissionsCount) * 100) || 0,
    changesPct: Math.round((changesRequested / totalSubmissionsCount) * 100) || 0,
    submittedPct: Math.round((submittedOnly / totalSubmissionsCount) * 100) || 0,
  };

  return {
    totalInterns,
    totalMentors,
    activeInternships,
    completedInternships,
    upcomingInternships,
    totalProjects,
    pendingSubmissions,
    certificatesIssued,
    pendingCertificates,
    notEligibleCertificates,
    submissionBreakdown,
    evaluationsCount: evaluations.length
  };
}

export function getMentorAnalytics(state, mentorName = 'Dr. Sarah Jenkins') {
  const {
    studentsList = [],
    projects = [],
    tasks = [],
    submissions = [],
    evaluations = [],
    certificates = []
  } = state || {};

  const cleanMentor = (mentorName || '').toLowerCase();

  // Scope: Only data belonging to this mentor and their assigned interns
  const myInterns = studentsList.filter(s => !s.mentor || s.mentor.toLowerCase() === cleanMentor);
  const myInternNames = myInterns.map(s => s.name.toLowerCase());

  const myProjects = projects.filter(p => !p.mentor || p.mentor.toLowerCase() === cleanMentor);

  const myTasks = tasks.filter(t => !t.assignedTo || myInternNames.length === 0 || myInternNames.includes(t.assignedTo.toLowerCase()));

  const mySubmissions = submissions.filter(s => !s.studentName || myInternNames.length === 0 || myInternNames.includes(s.studentName.toLowerCase()));

  const pendingSubmissions = mySubmissions.filter(s => s.status === 'Under Review' || s.status === 'Pending');
  const approvedSubmissions = mySubmissions.filter(s => s.status === 'Approved' || s.status === 'Completed');
  const changesRequested = mySubmissions.filter(s => s.status === 'Changes Requested');
  const submittedSubmissions = mySubmissions.filter(s => s.status === 'Submitted');

  const myEvaluations = evaluations.filter(e => !e.mentorName || e.mentorName.toLowerCase() === cleanMentor);

  const submissionBreakdown = {
    submitted: submittedSubmissions.length,
    underReview: pendingSubmissions.length,
    approved: approvedSubmissions.length,
    changesRequested: changesRequested.length,
    total: mySubmissions.length
  };

  return {
    myInternsCount: myInterns.length,
    myInternsList: myInterns,
    activeProjectsCount: myProjects.length,
    pendingTasksCount: myTasks.filter(t => t.status === 'In Progress' || t.status === 'Pending').length,
    submissionsToReviewCount: pendingSubmissions.length,
    approvedSubmissionsCount: approvedSubmissions.length,
    evaluationsCompletedCount: myEvaluations.length,
    submissionBreakdown
  };
}

export function getInternAnalytics(state, studentId = 'usr_01', studentName = 'Alex Johnson') {
  const {
    projects = [],
    tasks = [],
    submissions = [],
    evaluations = [],
    certificates = []
  } = state || {};

  const cleanName = (studentName || '').toLowerCase();

  const studentCert = certificates.find(c => 
    c.internId === studentId || 
    (c.internName && c.internName.toLowerCase() === cleanName)
  );

  const myProjectsCount = projects.length;
  const pendingTasksCount = tasks.filter(t => t.status === 'Pending' || t.status === 'In Progress').length;
  
  const mySubmissions = submissions.filter(s => !s.studentName || s.studentName.toLowerCase() === cleanName);
  const submittedTasksCount = mySubmissions.length;
  const approvedWorkCount = mySubmissions.filter(s => s.status === 'Approved' || s.status === 'Completed').length;
  const pendingReviewsCount = mySubmissions.filter(s => s.status === 'Under Review' || s.status === 'Pending').length;

  let certStatus = 'not_eligible';
  if (studentCert) {
    certStatus = studentCert.status;
  }

  return {
    myProjectsCount,
    pendingTasksCount,
    submittedTasksCount,
    approvedWorkCount,
    pendingReviewsCount,
    certStatus,
    studentCert
  };
}

export function getSystemActivities(state, roleScope = 'all', currentUserName = '') {
  const {
    notifications = [],
    submissions = [],
    evaluations = [],
    certificates = [],
    studentsList = []
  } = state || {};

  const activities = [];
  const cleanName = (currentUserName || '').toLowerCase();

  // 1. Convert notifications to activities
  notifications.forEach(n => {
    activities.push({
      id: `notif_act_${n.id}`,
      activity: n.title,
      description: n.desc,
      user: n.user || (n.targetRole === 'mentor' ? 'Student Intern' : n.targetRole === 'student' ? 'Faculty Supervisor' : 'System Admin'),
      time: n.time || 'Recent',
      type: n.type || 'info',
      rawTimestamp: n.id ? parseInt(String(n.id).replace(/\D/g, ''), 10) || Date.now() : Date.now()
    });
  });

  // 2. Convert submissions
  submissions.forEach(s => {
    let actTitle = `Task Submitted: "${s.taskTitle}"`;
    if (s.status === 'Approved' || s.status === 'Completed') {
      actTitle = `Submission Approved: "${s.taskTitle}"`;
    } else if (s.status === 'Changes Requested') {
      actTitle = `Changes Requested: "${s.taskTitle}"`;
    }

    activities.push({
      id: `sub_act_${s.id}`,
      activity: actTitle,
      description: `Project: ${s.projectTitle} • File: ${s.fileAttached || 'Repo Link'}`,
      user: s.studentName,
      time: s.submittedAt || 'Today',
      type: s.status === 'Approved' ? 'success' : s.status === 'Changes Requested' ? 'warning' : 'info',
      rawTimestamp: Date.now() - 3600000
    });
  });

  // 3. Convert evaluations
  evaluations.forEach(ev => {
    activities.push({
      id: `eval_act_${ev.id}`,
      activity: `Evaluation Completed (${ev.overallScore}/5.0)`,
      description: `Performance review submitted for ${ev.studentName}`,
      user: ev.mentorName,
      time: ev.evaluatedAt || 'Sep 24, 2026',
      type: 'success',
      rawTimestamp: Date.now() - 7200000
    });
  });

  // 4. Convert certificates
  certificates.forEach(c => {
    if (c.status === 'issued') {
      activities.push({
        id: `cert_act_${c.id}`,
        activity: `Certificate Issued: ${c.id}`,
        description: `Verified completion certificate generated for ${c.internName}`,
        user: c.adminSignatory || 'Admin Director',
        time: c.issueDate || 'Sep 25, 2026',
        type: 'success',
        rawTimestamp: Date.now() - 1800000
      });
    } else if (c.status === 'pending') {
      activities.push({
        id: `cert_act_pend_${c.id}`,
        activity: `Certificate Pending Verification`,
        description: `Recommended for ${c.internName} by ${c.mentorName}`,
        user: c.mentorName,
        time: 'Today',
        type: 'info',
        rawTimestamp: Date.now() - 5400000
      });
    }
  });

  // 5. Convert students joining
  studentsList.forEach(st => {
    activities.push({
      id: `student_act_${st.id}`,
      activity: `New Intern Joined Cohort`,
      description: `Enrolled in ${st.internshipJoined || 'Full Stack Track'} (${st.company || 'Partner Org'})`,
      user: st.name,
      time: 'Sep 2026',
      type: 'info',
      rawTimestamp: Date.now() - 86400000
    });
  });

  // Role filtering
  let filtered = activities;
  if (roleScope === 'mentor') {
    // Show activities related to this mentor or their students
    filtered = activities.filter(a => 
      !cleanName || 
      a.user.toLowerCase().includes(cleanName) || 
      a.description.toLowerCase().includes(cleanName) ||
      a.activity.toLowerCase().includes('submission') ||
      a.activity.toLowerCase().includes('evaluation')
    );
  } else if (roleScope === 'intern') {
    filtered = activities.filter(a => 
      !cleanName || 
      a.user.toLowerCase().includes(cleanName) || 
      a.description.toLowerCase().includes(cleanName)
    );
  }

  // Deduplicate by activity + user
  const seen = new Set();
  const unique = [];
  for (const item of filtered) {
    const key = `${item.activity}-${item.user}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  }

  // Sort most recent activity first
  unique.sort((a, b) => b.rawTimestamp - a.rawTimestamp);

  return unique.slice(0, 8);
}

export function getUpcomingDeadlines(state) {
  const { tasks = [], projects = [] } = state || {};
  const items = [];

  const parseDateToTime = (dateStr) => {
    if (!dateStr) return Date.now() + 10000000;
    const parsed = Date.parse(dateStr);
    return isNaN(parsed) ? Date.now() + 5000000 : parsed;
  };

  tasks.forEach(t => {
    items.push({
      id: t.id,
      title: t.title,
      type: 'Task Deliverable',
      project: t.project,
      deadline: t.dueDate || 'Oct 20, 2026',
      status: t.status,
      priority: t.priority || 'Medium',
      timestamp: parseDateToTime(t.dueDate)
    });
  });

  projects.forEach(p => {
    items.push({
      id: p.id,
      title: p.title,
      type: 'Project Milestone',
      project: p.company,
      deadline: p.deadline || 'Nov 30, 2026',
      status: p.status,
      priority: 'High',
      timestamp: parseDateToTime(p.deadline)
    });
  });

  // Sort closest upcoming deadline first
  items.sort((a, b) => a.timestamp - b.timestamp);

  return items.slice(0, 6);
}
