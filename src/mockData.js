export const MOCK_USER = {
  id: 'usr_01',
  name: 'Saloni Honrao',
  email: 'saloni.honrao@university.edu',
  role: 'student', // 'student' | 'mentor' | 'admin'
  avatar: 'SH',
  major: 'Computer Science & Engineering',
  university: 'Tech Institute of Science',
  gpa: '3.92 / 4.00',
  currentInternship: 'Full Stack Web Development - Apex Systems Inc.',
  progressPct: 78,
};

export const MOCK_MENTOR = {
  id: 'usr_02',
  name: 'Dr. Sarah Jenkins',
  title: 'Senior Software Architect & Academic Supervisor',
  department: 'Computer Science & AI Lab',
  email: 'sarah.jenkins@internhub.edu',
  assignedStudentsCount: 14,
  pendingReviewsCount: 5,
};

export const MOCK_STATS = {
  student: [
    { label: 'Active Projects', value: '2', change: '+1 this month', color: 'lavender', type: 'projects' },
    { label: 'Tasks Completed', value: '18 / 24', change: '75% Done', color: 'green', type: 'tasks' },
    { label: 'Hours Logged', value: '142h', change: 'Target: 160h', color: 'blue', type: 'hours' },
    { label: 'Overall Evaluation', value: 'A+ (96%)', change: 'Top 5%', color: 'pink', type: 'grade' },
  ],
  mentor: [
    { label: 'Interns Assigned', value: '14', change: 'Active cohort', color: 'lavender', type: 'interns' },
    { label: 'Pending Reviews', value: '5', change: 'Needs approval', color: 'pink', type: 'reviews' },
    { label: 'Feedback Provided', value: '52', change: 'This semester', color: 'green', type: 'feedback' },
    { label: 'Avg Review Time', value: '1.2 Days', change: 'Fast turnaround', color: 'blue', type: 'speed' },
  ],
  admin: [
    { label: 'Total Interns', value: '248', change: '34 partner orgs', color: 'lavender', type: 'students' },
    { label: 'Active Mentors', value: '38', change: 'Faculty & Industry', color: 'blue', type: 'mentors' },
    { label: 'Completion Rate', value: '94.6%', change: '+3.2% vs last batch', color: 'green', type: 'completion' },
    { label: 'Submissions Today', value: '42', change: 'Peak activity', color: 'pink', type: 'submissions' },
  ]
};

export const MOCK_PROJECTS = [
  {
    id: 'proj_01',
    title: 'Cloud-Native SaaS Dashboard',
    company: 'Apex Systems Inc.',
    mentor: 'Dr. Sarah Jenkins',
    description: 'Design and implement a responsive analytics portal using modern web frameworks with real-time telemetry visualizers.',
    status: 'In Progress',
    deadline: 'Oct 15, 2026',
    progress: 78,
    tags: ['React', 'CSS Modules', 'REST APIs', 'Vite'],
    tasksCount: 12,
    completedTasks: 9,
  },
  {
    id: 'proj_02',
    title: 'AI Code Assistant Plugin',
    company: 'Neural Labs',
    mentor: 'Prof. Marcus Vance',
    description: 'Build an open-source extension for automated code reviewing and docstring generation.',
    status: 'Under Review',
    deadline: 'Nov 02, 2026',
    progress: 90,
    tags: ['Python', 'TypeScript', 'LLM Prompting'],
    tasksCount: 8,
    completedTasks: 7,
  },
  {
    id: 'proj_03',
    title: 'Microservices Payment Gateway Integration',
    company: 'FinTech Dynamics',
    mentor: 'Elena Rostova',
    description: 'Integrate secure OAuth2 authentication flow and automated transaction logs for mobile banking API.',
    status: 'Completed',
    deadline: 'Sep 10, 2026',
    progress: 100,
    tags: ['Node.js', 'Docker', 'Security'],
    tasksCount: 15,
    completedTasks: 15,
  },
  {
    id: 'proj_04',
    title: 'Smart Health Monitoring IoT App',
    company: 'BioTech Innovators',
    mentor: 'Dr. Sarah Jenkins',
    description: 'Create an intuitive UI dashboard for tracking real-time vitals and sensor analytics.',
    status: 'Pending',
    deadline: 'Dec 01, 2026',
    progress: 15,
    tags: ['IoT', 'React', 'WebSockets'],
    tasksCount: 10,
    completedTasks: 2,
  },
];

export const MOCK_TASKS = [
  {
    id: 'task_01',
    title: 'Implement Soft Lavender & Pastel Theme Tokens',
    project: 'Cloud-Native SaaS Dashboard',
    assignedTo: 'Saloni Honrao',
    dueDate: 'Sep 28, 2026',
    status: 'Completed',
    priority: 'High',
    description: 'Update the global color variables to follow the InternHub soft lavender, soft blue, and dark slate color palette.',
    feedback: 'Excellent color harmony! Clean execution with soft shadows.',
  },
  {
    id: 'task_02',
    title: 'Build Interactive Mentor Review Drawer',
    project: 'Cloud-Native SaaS Dashboard',
    assignedTo: 'Saloni Honrao',
    dueDate: 'Oct 02, 2026',
    status: 'In Progress',
    priority: 'High',
    description: 'Allow mentors to inspect code diffs and submit feedback directly inside the dashboard drawer modal.',
  },
  {
    id: 'task_03',
    title: 'Integrate REST API Telemetry Graph',
    project: 'Cloud-Native SaaS Dashboard',
    assignedTo: 'Saloni Honrao',
    dueDate: 'Oct 08, 2026',
    status: 'Under Review',
    priority: 'Medium',
    description: 'Fetch server payload metrics and plot CPU/RAM memory usage with responsive SVG charts.',
  },
  {
    id: 'task_04',
    title: 'Auth Workflow & Session Storage',
    project: 'AI Code Assistant Plugin',
    assignedTo: 'Saloni Honrao',
    dueDate: 'Oct 12, 2026',
    status: 'Pending',
    priority: 'Medium',
    description: 'Implement JWT refresh token mechanism and local session validation.',
  },
  {
    id: 'task_05',
    title: 'Export Monthly Internship Timesheet PDF',
    project: 'Cloud-Native SaaS Dashboard',
    assignedTo: 'Saloni Honrao',
    dueDate: 'Sep 20, 2026',
    status: 'Changes Requested',
    priority: 'Low',
    description: 'Generate downloadable PDF report of weekly logged hours and task sign-offs.',
    feedback: 'Please format the total hours header to bold dark slate #29283A.',
  },
];

export const MOCK_SUBMISSIONS = [
  {
    id: 'sub_101',
    studentName: 'Saloni Honrao',
    studentAvatar: 'SH',
    taskTitle: 'Integrate REST API Telemetry Graph',
    projectTitle: 'Cloud-Native SaaS Dashboard',
    submittedAt: 'Today, 2:45 PM',
    status: 'Under Review',
    submissionUrl: 'https://github.com/internhub/telemetry-module',
    notes: 'Implemented SVG line charts with subtle hover animations and soft lavender tooltip boxes.',
    fileAttached: 'telemetry_spec_v2.pdf (1.2 MB)',
  },
  {
    id: 'sub_102',
    studentName: 'Maya Patel',
    studentAvatar: 'MP',
    taskTitle: 'Database Indexing Optimization',
    projectTitle: 'FinTech Dynamics Backend',
    submittedAt: 'Yesterday, 5:10 PM',
    status: 'Pending',
    submissionUrl: 'https://github.com/internhub/db-indexing',
    notes: 'Reduced query latency by 45% using composite indexing on user_sessions table.',
    fileAttached: 'query_benchmark.png (450 KB)',
  },
  {
    id: 'sub_103',
    studentName: 'Liam Chen',
    studentAvatar: 'LC',
    taskTitle: 'OAuth Security Audit',
    projectTitle: 'Neural Labs Extension',
    submittedAt: 'Sep 22, 2026',
    status: 'Changes Requested',
    submissionUrl: 'https://github.com/internhub/oauth-security',
    notes: 'Added state parameter validation to prevent CSRF attacks.',
    fileAttached: 'security_checklist.docx (820 KB)',
  },
  {
    id: 'sub_104',
    studentName: 'Sophia Taylor',
    studentAvatar: 'ST',
    taskTitle: 'Mobile Responsive Layouts',
    projectTitle: 'Smart Health Monitoring IoT',
    submittedAt: 'Sep 21, 2026',
    status: 'Completed',
    submissionUrl: 'https://github.com/internhub/health-mobile-ui',
    notes: 'Tested on iOS and Android viewports with 100% lighthouse accessibility score.',
    fileAttached: 'ui_screenshots.zip (3.8 MB)',
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif_01',
    title: 'Submission Approved! 🎉',
    desc: 'Dr. Sarah Jenkins approved "Implement Soft Lavender & Pastel Theme Tokens"',
    time: '10 min ago',
    unread: true,
    type: 'success',
    targetRole: 'student'
  },
  {
    id: 'notif_02',
    title: 'New Submission Received 📬',
    desc: 'Maya Patel submitted work for "Database Indexing Optimization"',
    time: '1 hour ago',
    unread: true,
    type: 'info',
    targetRole: 'mentor'
  },
  {
    id: 'notif_03',
    title: 'Changes Requested ⚠️',
    desc: 'Changes requested on "Export Monthly Internship Timesheet PDF": Please format total hours header.',
    time: 'Yesterday',
    unread: false,
    type: 'warning',
    targetRole: 'student'
  },
  {
    id: 'notif_04',
    title: 'Important Announcement 📢: Mid-Term Review',
    desc: 'All interns are requested to complete pending tasks before Oct 05 for mid-term evaluations.',
    time: '2 days ago',
    unread: true,
    type: 'announcement',
    targetRole: 'all'
  }
];
