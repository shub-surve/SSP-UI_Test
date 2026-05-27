const LOCAL_STORAGE_KEY = 'ssplive_db';
const DATA_SEED_VERSION = 'data-science-2026-v1';

const defaultInstructors = [
  {
    id: 'priya-kapoor',
    name: 'Priya Kapoor',
    slug: 'priya-kapoor',
    title: 'Applied Data Analytics Mentor',
    bio: 'Priya Kapoor helps students turn messy spreadsheets, SQL tables, and business questions into clear analytical stories. Her workshops focus on practical dashboards, cohort analysis, and decision-ready reporting for product, marketing, and operations teams.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300',
    tags: ['SQL', 'Power BI', 'Business Analytics'],
    experience: '10+ Years',
    credentials: [
      'M.Sc. Data Analytics - Delhi University',
      'Microsoft Certified Power BI Data Analyst',
      'Former Senior Analytics Consultant at Global Tech'
    ],
    pricing: '₹1,499 / Module',
    social: {
      linkedin: 'https://linkedin.com/in/priyakapoor',
      instagram: 'https://instagram.com/priyaspeakseasy',
      whatsapp: 'https://wa.me/919876543210'
    },
    status: 'active'
  },
  {
    id: 'ananya-rao',
    name: 'Dr. Ananya Rao',
    slug: 'ananya-rao',
    title: 'Machine Learning & AI Projects Coach',
    bio: 'Dr. Ananya Rao guides learners through model building, evaluation, deployment thinking, and portfolio-quality machine learning projects. She specializes in making algorithms understandable through experiments, diagnostics, and real-world product use cases.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
    tags: ['Machine Learning', 'Python', 'Model Evaluation'],
    experience: '12 Years',
    credentials: [
      'Ph.D. in Computer Science - TISS',
      'TensorFlow Developer Certificate',
      'Author of "Machine Learning Casebooks"'
    ],
    pricing: '₹1,999 / Module',
    social: {
      linkedin: 'https://linkedin.com/in/ananyarao',
      instagram: 'https://instagram.com/ananyarao.mentor'
    },
    status: 'active'
  },
  {
    id: 'rahul-mehta',
    name: 'Rahul Mehta',
    slug: 'rahul-mehta',
    title: 'Python, Statistics & Data Engineering Instructor',
    bio: 'Rahul Mehta teaches the technical foundation behind data science: Python, statistics, data cleaning, feature engineering, and reproducible notebooks. His sessions are built around hands-on labs that move learners from concept to working code quickly.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    tags: ['Python', 'Statistics', 'Data Wrangling'],
    experience: '8 Years',
    credentials: [
      'B.Tech - IIT Bombay (Class of 2016)',
      'Former Data Engineer at a FinTech analytics team',
      'Kaggle Notebooks Expert'
    ],
    pricing: '₹1,299 / Module',
    social: {
      linkedin: 'https://linkedin.com/in/rahulmehtaqr',
      whatsapp: 'https://wa.me/919998887776'
    },
    status: 'active'
  }
];

const defaultClassrooms = [
  {
    id: 'analytics-foundation',
    name: 'Data Analytics Foundation',
    description: 'Designed to build core analytics confidence across spreadsheets, SQL, visualization, and business problem framing.',
    subject: 'Data Analytics',
    level: 'Beginner to Intermediate',
    language: 'English, Hindi',
    status: 'active',
    assignedModules: ['sql-analytics-foundation', 'power-bi-dashboard-lab'],
    assignedInstructors: ['priya-kapoor', 'rahul-mehta'],
    visibility: 'public'
  },
  {
    id: 'machine-learning-studio',
    name: 'Machine Learning Studio',
    description: 'A practical cohort for learners who want to build, evaluate, and explain machine learning models with real datasets.',
    subject: 'Machine Learning',
    level: 'Intermediate to Advanced',
    language: 'English',
    status: 'active',
    assignedModules: ['machine-learning-portfolio', 'python-statistics-bootcamp'],
    assignedInstructors: ['ananya-rao', 'rahul-mehta'],
    visibility: 'public'
  },
  {
    id: 'data-career-lab',
    name: 'Data Career Lab',
    description: 'Portfolio-first learning for analyst and junior data scientist roles, with capstones, storytelling, and interview-ready project reviews.',
    subject: 'Data Science Careers',
    level: 'All Levels',
    language: 'English, Hindi',
    status: 'active',
    assignedModules: ['eda-storytelling-capstone'],
    assignedInstructors: ['priya-kapoor', 'ananya-rao'],
    visibility: 'public'
  }
];

const defaultModules = [
  {
    id: 'sql-analytics-foundation',
    title: 'SQL Analytics Foundation',
    slug: 'sql-analytics-foundation',
    shortDesc: 'Query real business data, clean joins, build metrics, and answer product questions with confidence.',
    longDesc: 'This module builds the SQL muscle needed for analyst and data science roles. Learners practice filtering, joins, aggregations, window functions, funnel metrics, retention cohorts, and clean analytical thinking on realistic business datasets.',
    outcomes: [
      'Write clean SQL queries across joins, aggregations, and subqueries',
      'Use window functions for ranking, retention, and running totals',
      'Translate business questions into measurable analytical outputs',
      'Debug common data quality issues before presenting insights'
    ],
    tags: ['SQL', 'Analytics', 'Dashboards'],
    level: 'Beginner',
    language: 'English & Hindi',
    duration: '4 Weeks (8 Live Labs)',
    prerequisites: 'Basic computer literacy',
    assignedClassrooms: ['analytics-foundation'],
    assignedInstructors: ['priya-kapoor', 'rahul-mehta'],
    visibility: 'published'
  },
  {
    id: 'machine-learning-portfolio',
    title: 'Machine Learning Portfolio Sprint',
    slug: 'machine-learning-portfolio',
    shortDesc: 'Build two end-to-end ML projects with notebooks, metrics, model cards, and deployment-ready thinking.',
    longDesc: 'A project-first masterclass focused on supervised learning workflows. You will explore datasets, train baseline models, tune them responsibly, explain tradeoffs, and package results into portfolio-ready case studies that recruiters and hiring managers can inspect.',
    outcomes: [
      'Frame an ML problem and choose the right evaluation metric',
      'Train, validate, and compare baseline models in Python',
      'Explain model performance using confusion matrices and feature importance',
      'Publish a polished project brief with reproducible notebook structure'
    ],
    tags: ['Machine Learning', 'Python', 'Portfolio'],
    level: 'Advanced',
    language: 'English',
    duration: '3 Weeks (6 Live Labs)',
    prerequisites: 'Python basics and elementary statistics',
    assignedClassrooms: ['machine-learning-studio', 'data-career-lab'],
    assignedInstructors: ['ananya-rao', 'rahul-mehta'],
    visibility: 'published'
  },
  {
    id: 'power-bi-dashboard-lab',
    title: 'Power BI Dashboard Lab',
    slug: 'power-bi-dashboard-lab',
    shortDesc: 'Design executive dashboards with clean data models, DAX measures, and interactive storytelling.',
    longDesc: 'This lab teaches dashboard thinking from source data to stakeholder-ready reports. Learners model tables, write practical DAX, create useful slicers, and shape dashboards that make trends, exceptions, and decisions easy to understand.',
    outcomes: [
      'Clean and model data for dashboard performance',
      'Create DAX measures for KPIs, variance, and time intelligence',
      'Build dashboard pages that support scanning and drill-down',
      'Present an analytics story with clear recommendations'
    ],
    tags: ['Power BI', 'DAX', 'Visualization'],
    level: 'Intermediate',
    language: 'English',
    duration: '2 Weeks (4 Live Labs)',
    prerequisites: 'Basic spreadsheet familiarity',
    assignedClassrooms: ['analytics-foundation'],
    assignedInstructors: ['priya-kapoor'],
    visibility: 'published'
  },
  {
    id: 'python-statistics-bootcamp',
    title: 'Python Statistics Bootcamp',
    slug: 'python-statistics-bootcamp',
    shortDesc: 'Learn Python, pandas, probability, hypothesis testing, and experiment analysis through live notebooks.',
    longDesc: 'This bootcamp connects statistics with everyday data science workflows. You will clean datasets with pandas, visualize distributions, run hypothesis tests, interpret confidence intervals, and explain results without hiding behind formulas.',
    outcomes: [
      'Clean and reshape datasets with pandas',
      'Use descriptive statistics to spot patterns and anomalies',
      'Run hypothesis tests and explain confidence intervals',
      'Analyze A/B test results with practical decision rules'
    ],
    tags: ['Python', 'Statistics', 'pandas'],
    level: 'All Levels',
    language: 'English & Hindi',
    duration: '3 Weeks (6 Live Labs)',
    prerequisites: 'Basic math and willingness to code',
    assignedClassrooms: ['machine-learning-studio'],
    assignedInstructors: ['rahul-mehta'],
    visibility: 'published'
  },
  {
    id: 'eda-storytelling-capstone',
    title: 'EDA & Data Storytelling Capstone',
    slug: 'eda-storytelling-capstone',
    shortDesc: 'Turn raw datasets into insights, visuals, and a portfolio-ready case study for data roles.',
    longDesc: 'A guided capstone where learners define a question, explore a dataset, build visual evidence, and present a concise insight narrative. The focus is on clarity, responsible interpretation, and practical recommendations.',
    outcomes: [
      'Plan an exploratory analysis with a clear decision objective',
      'Create visual evidence using charts that answer specific questions',
      'Avoid common interpretation mistakes and misleading comparisons',
      'Package insights into a polished portfolio case study'
    ],
    tags: ['EDA', 'Storytelling', 'Portfolio'],
    level: 'Intermediate',
    language: 'English',
    duration: '2 Weeks (4 Live Labs)',
    prerequisites: 'Basic Python or spreadsheet analysis',
    assignedClassrooms: ['data-career-lab'],
    assignedInstructors: ['priya-kapoor', 'ananya-rao'],
    visibility: 'published'
  }
];

const defaultLectures = [
  // SQL Analytics Foundation
  {
    id: 'sql-l1',
    moduleId: 'sql-analytics-foundation',
    title: 'From Business Question to SQL Query',
    description: 'Map product questions to tables, metrics, filters, and clean query structure.',
    agenda: '1. Reading schemas and data dictionaries\n2. Filtering and grouping business events\n3. Metric definitions and data caveats\n4. Live query review',
    instructorId: 'priya-kapoor',
    format: 'live',
    dateTime: '2026-06-01T18:00',
    duration: '60 Mins',
    capacity: 25,
    resources: [
      { name: 'SQL Lab Dataset', url: '#' },
      { name: 'Metric Definition Checklist', url: '#' }
    ],
    status: 'scheduled'
  },
  {
    id: 'sql-l2',
    moduleId: 'sql-analytics-foundation',
    title: 'Joins, Funnels, and Cohorts',
    description: 'Practice joins and window functions through retention and conversion analysis.',
    agenda: '1. Inner, left, and anti joins\n2. Funnel conversion queries\n3. Cohort retention tables\n4. Debugging duplicate rows',
    instructorId: 'priya-kapoor',
    format: 'live',
    dateTime: '2026-06-04T18:00',
    duration: '60 Mins',
    capacity: 25,
    resources: [
      { name: 'Join Patterns Guide', url: '#' },
      { name: 'Cohort Query Workbook', url: '#' }
    ],
    status: 'scheduled'
  },
  // Machine Learning Portfolio
  {
    id: 'ml-l1',
    moduleId: 'machine-learning-portfolio',
    title: 'Problem Framing and Baseline Models',
    description: 'Choose the target, build a baseline, and define what good performance actually means.',
    agenda: '1. Classification vs regression framing\n2. Train/test split hygiene\n3. Baseline model setup\n4. Metric selection and first review',
    instructorId: 'ananya-rao',
    format: 'live',
    dateTime: '2026-06-02T19:30',
    duration: '90 Mins',
    capacity: 20,
    resources: [
      { name: 'ML Project Notebook Starter', url: '#' },
      { name: 'Model Evaluation Scorecard', url: '#' }
    ],
    status: 'scheduled'
  },
  {
    id: 'ml-l2',
    moduleId: 'machine-learning-portfolio',
    title: 'Model Diagnostics and Portfolio Packaging',
    description: 'Read model errors, compare alternatives, and write a portfolio-ready model card.',
    agenda: '1. Confusion matrix walkthrough\n2. Feature importance and bias checks\n3. Comparing model tradeoffs\n4. Project brief review',
    instructorId: 'ananya-rao',
    format: 'live',
    dateTime: '2026-06-05T19:30',
    duration: '90 Mins',
    capacity: 20,
    resources: [
      { name: 'Model Card Template', url: '#' },
      { name: 'Portfolio Review Rubric', url: '#' }
    ],
    status: 'scheduled'
  },
  // Python Statistics
  {
    id: 'py-l1',
    moduleId: 'python-statistics-bootcamp',
    title: 'Pandas Cleaning and Statistical Summaries',
    description: 'Clean missing values, reshape columns, and summarize distributions in a live notebook.',
    agenda: '1. Notebook workflow setup\n2. Missing value handling\n3. Groupby summaries and pivots\n4. Distribution checks',
    instructorId: 'rahul-mehta',
    format: 'live',
    dateTime: '2026-06-03T17:00',
    duration: '75 Mins',
    capacity: 40,
    resources: [
      { name: 'Pandas Practice Dataset', url: '#' },
      { name: 'Statistics Formula Sheet', url: '#' }
    ],
    status: 'scheduled'
  },
  {
    id: 'eda-l1',
    moduleId: 'eda-storytelling-capstone',
    title: 'Insight Sprint: From Raw Data to Story',
    description: 'Plan the capstone question, inspect the dataset, and create first-pass visual evidence.',
    agenda: '1. Choosing a decision objective\n2. Data profiling checklist\n3. Visual exploration patterns\n4. Insight narrative critique',
    instructorId: 'priya-kapoor',
    format: 'live',
    dateTime: '2026-06-06T18:30',
    duration: '90 Mins',
    capacity: 30,
    resources: [
      { name: 'EDA Planning Canvas', url: '#' },
      { name: 'Chart Selection Guide', url: '#' }
    ],
    status: 'scheduled'
  }
];

const defaultLeads = [
  {
    id: 'lead-1',
    name: 'Amit Sharma',
    mobile: '9812345678',
    email: 'amit.sharma99@gmail.com',
    occupation: 'Student (College Final Year)',
    moduleId: 'machine-learning-portfolio',
    instructorId: 'ananya-rao',
    sourcePage: '/masterclass/machine-learning-portfolio',
    status: 'new',
    notes: 'Registered via Masterclass page. Wants to build a machine learning portfolio before September placements.',
    assignedOwner: 'Counselor Aarti',
    createdDate: '2026-05-25T14:30:00Z',
    lastUpdatedDate: '2026-05-25T14:30:00Z'
  },
  {
    id: 'lead-2',
    name: 'Rohit Verma',
    mobile: '9922334455',
    email: 'rohitverma@yahoo.com',
    occupation: 'Working Professional',
    moduleId: 'sql-analytics-foundation',
    instructorId: 'priya-kapoor',
    sourcePage: '/instructor/priya-kapoor',
    status: 'contacted',
    notes: 'Called on 25th May. Expressed interest in weekend SQL and dashboard labs.',
    assignedOwner: 'Counselor Aarti',
    createdDate: '2026-05-24T11:15:00Z',
    lastUpdatedDate: '2026-05-25T16:00:00Z'
  },
  {
    id: 'lead-3',
    name: 'Srishti Sen',
    mobile: '8877665544',
    email: 'srishti.s@outlook.com',
    occupation: 'Student (Prep School)',
    moduleId: 'python-statistics-bootcamp',
    instructorId: 'rahul-mehta',
    sourcePage: '/',
    status: 'interested',
    notes: 'Parent registered on behalf of the student. Interested in Python basics before college projects.',
    assignedOwner: 'Counselor Vikram',
    createdDate: '2026-05-23T10:00:00Z',
    lastUpdatedDate: '2026-05-24T12:00:00Z'
  }
];

const defaultTestimonials = [
  {
    id: 'test-1',
    author: 'Sneha Patel',
    role: 'Software Engineer at Cognizant',
    text: 'Priya Kapoor\'s SQL analytics module made business data finally click. The live query reviews helped me catch mistakes and explain insights clearly.',
    instructorId: 'priya-kapoor',
    moduleId: 'sql-analytics-foundation',
    status: 'approved'
  },
  {
    id: 'test-2',
    author: 'Vikram Aditya',
    role: 'MBA Candidate at IMI Delhi',
    text: 'Dr. Ananya Rao\'s ML sprint gave me two portfolio projects I could actually defend. The model card feedback made my work feel professional.',
    instructorId: 'ananya-rao',
    moduleId: 'machine-learning-portfolio',
    status: 'approved'
  },
  {
    id: 'test-3',
    author: 'Karan Singhal',
    role: 'Junior Data Analyst',
    text: 'Rahul Sir\'s Python statistics lab helped me stop memorizing formulas and start interpreting tests with confidence.',
    instructorId: 'rahul-mehta',
    moduleId: 'python-statistics-bootcamp',
    status: 'approved'
  }
];

// Database operations
export function getDb() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    const freshDb = {
      seedVersion: DATA_SEED_VERSION,
      instructors: defaultInstructors,
      classrooms: defaultClassrooms,
      modules: defaultModules,
      lectures: defaultLectures,
      leads: defaultLeads,
      testimonials: defaultTestimonials,
      leadsVisibleToInstructors: true // Admin setting to permit instructor lead visibility
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(freshDb));
    return freshDb;
  }
  const parsedDb = JSON.parse(data);
  if (parsedDb.seedVersion !== DATA_SEED_VERSION) {
    const refreshedDb = {
      seedVersion: DATA_SEED_VERSION,
      instructors: defaultInstructors,
      classrooms: defaultClassrooms,
      modules: defaultModules,
      lectures: defaultLectures,
      leads: defaultLeads,
      testimonials: defaultTestimonials,
      leadsVisibleToInstructors: true
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(refreshedDb));
    return refreshedDb;
  }
  return parsedDb;
}

export function saveDb(db) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
}

// Add a public lead submission
export function addLead(leadSubmission) {
  const db = getDb();
  const newLead = {
    id: 'lead-' + Date.now(),
    name: leadSubmission.name,
    mobile: leadSubmission.mobile,
    email: leadSubmission.email,
    occupation: leadSubmission.occupation || 'Not Specified',
    moduleId: leadSubmission.moduleId || '',
    instructorId: leadSubmission.instructorId || '',
    sourcePage: leadSubmission.sourcePage || '/',
    status: 'new',
    notes: leadSubmission.notes || 'Registered through public form.',
    assignedOwner: 'Unassigned',
    createdDate: new Date().toISOString(),
    lastUpdatedDate: new Date().toISOString()
  };
  db.leads.unshift(newLead);
  saveDb(db);
  return newLead;
}

// Update lead details (Admin action)
export function updateLead(leadId, updates) {
  const db = getDb();
  db.leads = db.leads.map(lead => {
    if (lead.id === leadId) {
      return {
        ...lead,
        ...updates,
        lastUpdatedDate: new Date().toISOString()
      };
    }
    return lead;
  });
  saveDb(db);
}

// Create classroom
export function createClassroom(classroom) {
  const db = getDb();
  const newClassroom = {
    ...classroom,
    id: classroom.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    assignedModules: classroom.assignedModules || [],
    assignedInstructors: classroom.assignedInstructors || []
  };
  db.classrooms.push(newClassroom);
  saveDb(db);
  return newClassroom;
}

// Edit classroom
export function updateClassroom(classroomId, updates) {
  const db = getDb();
  db.classrooms = db.classrooms.map(c => {
    if (c.id === classroomId) {
      return { ...c, ...updates };
    }
    return c;
  });
  saveDb(db);
}

// Create/Design module
export function createModule(moduleData) {
  const db = getDb();
  const id = moduleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const newModule = {
    ...moduleData,
    id,
    slug: id,
    outcomes: Array.isArray(moduleData.outcomes) ? moduleData.outcomes : moduleData.outcomes.split('\n').filter(l => l.trim()),
    tags: Array.isArray(moduleData.tags) ? moduleData.tags : moduleData.tags.split(',').map(t => t.trim()),
    assignedClassrooms: moduleData.assignedClassrooms || [],
    assignedInstructors: moduleData.assignedInstructors || [],
    visibility: moduleData.visibility || 'draft'
  };
  db.modules.push(newModule);

  // Link module back to classrooms
  if (newModule.assignedClassrooms.length > 0) {
    db.classrooms = db.classrooms.map(c => {
      if (newModule.assignedClassrooms.includes(c.id)) {
        const modules = Array.from(new Set([...c.assignedModules, newModule.id]));
        return { ...c, assignedModules: modules };
      }
      return c;
    });
  }

  saveDb(db);
  return newModule;
}

// Update module details
export function updateModule(moduleId, updates) {
  const db = getDb();
  db.modules = db.modules.map(m => {
    if (m.id === moduleId) {
      const outcomes = typeof updates.outcomes === 'string' ? 
        updates.outcomes.split('\n').filter(l => l.trim()) : updates.outcomes;
      const tags = typeof updates.tags === 'string' ? 
        updates.tags.split(',').map(t => t.trim()) : updates.tags;
      return { ...m, ...updates, outcomes, tags };
    }
    return m;
  });

  // Re-sync classroom references
  if (updates.assignedClassrooms) {
    db.classrooms = db.classrooms.map(c => {
      // If classroom is selected, ensure module ID is included
      if (updates.assignedClassrooms.includes(c.id)) {
        if (!c.assignedModules.includes(moduleId)) {
          return { ...c, assignedModules: [...c.assignedModules, moduleId] };
        }
      } else {
        // Otherwise, remove it
        return { ...c, assignedModules: c.assignedModules.filter(id => id !== moduleId) };
      }
      return c;
    });
  }

  saveDb(db);
}

// Create/edit lecture shells
export function createLecture(lectureData) {
  const db = getDb();
  const newLecture = {
    ...lectureData,
    id: 'lect-' + Date.now(),
    capacity: parseInt(lectureData.capacity) || 30,
    resources: lectureData.resources || [],
    status: lectureData.status || 'scheduled'
  };
  db.lectures.push(newLecture);
  saveDb(db);
  return newLecture;
}

export function updateLecture(lectureId, updates) {
  const db = getDb();
  db.lectures = db.lectures.map(l => {
    if (l.id === lectureId) {
      return { ...l, ...updates };
    }
    return l;
  });
  saveDb(db);
}

// Update instructor details (Bio/Tags/Credentials)
export function updateInstructorProfile(instructorId, updates) {
  const db = getDb();
  db.instructors = db.instructors.map(inst => {
    if (inst.id === instructorId) {
      return { ...inst, ...updates };
    }
    return inst;
  });
  saveDb(db);
}

// Create Testimonial
export function addTestimonial(testimonial) {
  const db = getDb();
  const newTestimonial = {
    ...testimonial,
    id: 'test-' + Date.now(),
    status: testimonial.status || 'pending'
  };
  db.testimonials.push(newTestimonial);
  saveDb(db);
  return newTestimonial;
}

// Approve/Hide Testimonial
export function updateTestimonialStatus(testimonialId, status) {
  const db = getDb();
  db.testimonials = db.testimonials.map(t => {
    if (t.id === testimonialId) {
      return { ...t, status };
    }
    return t;
  });
  saveDb(db);
}
