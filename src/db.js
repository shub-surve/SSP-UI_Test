const LOCAL_STORAGE_KEY = 'ssplive_db';

const defaultInstructors = [
  {
    id: 'priya-kapoor',
    name: 'Priya Kapoor',
    slug: 'priya-kapoor',
    title: 'Communication & Spoken English Coach',
    bio: 'Priya Kapoor has over 10 years of experience helping corporate professionals and university students break language barriers. Her practical, dialogue-first coaching method focuses on building real-world fluency and eliminating public speaking anxiety.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300',
    tags: ['Spoken English', 'Business Communication', 'Public Speaking'],
    experience: '10+ Years',
    credentials: [
      'M.A. in English Literature - Delhi University',
      'CELTA Certified ESL Trainer - Cambridge',
      'Former Corporate Communication Head at Global Tech'
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
    title: 'Interview & Personality Development Mentor',
    bio: 'Dr. Ananya Rao is an organizational psychologist and interview strategy coach. She helps job seekers master mock interviews, build professional executive presence, and craft answers that resonate with recruiters. She has trained over 5,000 students for placements.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
    tags: ['Interview Prep', 'Personality Grooming', 'Career Mentorship'],
    experience: '12 Years',
    credentials: [
      'Ph.D. in Organizational Behavior - TISS',
      'Certified Executive Coach - ICF',
      'Author of "The Interview Blueprint"'
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
    title: 'Math & Competitive Exam Instructor',
    bio: 'Rahul Mehta specializes in simplifying complex quantitative aptitude and analytical reasoning concepts. A twice CAT 99.8 percentiler, his shortcuts and mental math techniques have helped students clear top banking, government, and MBA entrance exams.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    tags: ['Quantitative Aptitude', 'Logical Reasoning', 'CAT/Bank Exams'],
    experience: '8 Years',
    credentials: [
      'B.Tech - IIT Bombay (Class of 2016)',
      'CAT 99.83%er (Quant 99.9%)',
      'Ex-Senior Faculty at National Test Prep Institute'
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
    id: 'spoken-english-foundation',
    name: 'Spoken English Foundation',
    description: 'Designed to build basic vocabulary, grammar accuracy, and speech confidence. Perfect for beginners and intermediate speakers who feel stuck.',
    subject: 'Communication',
    level: 'Beginner to Intermediate',
    language: 'English, Hindi',
    status: 'active',
    assignedModules: ['spoken-english-basics', 'interview-confidence'],
    assignedInstructors: ['priya-kapoor', 'ananya-rao'],
    visibility: 'public'
  },
  {
    id: 'career-readiness',
    name: 'Career Readiness Program',
    description: 'A comprehensive cohort designed to prepare final-year college students and early-career seekers for job placements and corporate entry.',
    subject: 'Career Development',
    level: 'Intermediate to Advanced',
    language: 'English',
    status: 'active',
    assignedModules: ['resume-comms', 'interview-confidence'],
    assignedInstructors: ['ananya-rao', 'priya-kapoor'],
    visibility: 'public'
  },
  {
    id: 'competitive-math',
    name: 'Competitive Exam Quantitative Prep',
    description: 'Deep dives into math fundamentals, shortcuts, and time-saving techniques required for major entrance examinations.',
    subject: 'Mathematics',
    level: 'All Levels',
    language: 'English, Hindi',
    status: 'active',
    assignedModules: ['quant-percentages'],
    assignedInstructors: ['rahul-mehta'],
    visibility: 'public'
  }
];

const defaultModules = [
  {
    id: 'spoken-english-basics',
    title: 'Spoken English Basics & Fluency',
    slug: 'spoken-english-basics',
    shortDesc: 'Master daily conversations, sentence structures, and eliminate the fear of speaking in public.',
    longDesc: 'This module is designed to build a strong speaking habit from scratch. We skip dry grammar drills and focus on situational learning, role-plays, vocabulary expanding prompts, and real-time correction. By the end of this module, you will speak English without translating sentences in your head.',
    outcomes: [
      'Speak fluently in day-to-day scenarios like meetings, calls, and travel',
      'Overcome Stage Fear and anxiety associated with speaking in English',
      'Correct common grammatical mistakes in subject-verb agreement',
      'Learn 150+ new vocabulary words and phrases for conversational use'
    ],
    tags: ['English', 'Fluency', 'Public Speaking'],
    level: 'Beginner',
    language: 'English & Hindi',
    duration: '4 Weeks (8 Live Sessions)',
    prerequisites: 'Basic reading comprehension of English',
    assignedClassrooms: ['spoken-english-foundation'],
    assignedInstructors: ['priya-kapoor'],
    visibility: 'published'
  },
  {
    id: 'interview-confidence',
    title: 'Interview Confidence & Executive Presence',
    slug: 'interview-confidence',
    shortDesc: 'A mock-intensive masterclass to conquer HR rounds, behavioral interviews, and group discussions.',
    longDesc: 'An expert-guided module focused entirely on helping you showcase your true capabilities to recruiters. Through mock interviews, voice pitch adjustments, and structured answer templates (STAR methodology), you will learn how to handle difficult questions, negotiate salaries, and project professional posture and confidence.',
    outcomes: [
      'Master the "Introduce Yourself" pitch to capture recruiter attention',
      'Structure behavioral answers using the STAR (Situation, Task, Action, Result) model',
      'Participate actively and lead group discussions in placement processes',
      'Analyze and optimize your body language, tone, and professional posture'
    ],
    tags: ['Interview Prep', 'Placement', 'Confidence'],
    level: 'Advanced',
    language: 'English',
    duration: '3 Weeks (6 Live Sessions)',
    prerequisites: 'Resume completed; basic spoken proficiency',
    assignedClassrooms: ['spoken-english-foundation', 'career-readiness'],
    assignedInstructors: ['ananya-rao', 'priya-kapoor'],
    visibility: 'published'
  },
  {
    id: 'resume-comms',
    title: 'Resume Crafting & Professional Emailing',
    slug: 'resume-comms',
    shortDesc: 'Build an ATS-friendly resume and write high-response emails for jobs and cold networking.',
    longDesc: 'Learn the exact strategies to pass corporate applicant tracking systems (ATS) and make recruiter-friendly cover letters. Additionally, master the art of writing emails for job applications, LinkedIn cold networking, and day-to-day office reporting.',
    outcomes: [
      'Create a standard 1-page ATS-optimized resume using industry frameworks',
      'Draft highly professional emails for project updates, leaves, and requests',
      'Write effective cold outreach messages on LinkedIn that get replies',
      'Learn to format files and folders for clean academic/professional submission'
    ],
    tags: ['Resume Writing', 'ATS Optimization', 'Office Comms'],
    level: 'Intermediate',
    language: 'English',
    duration: '2 Weeks (4 Sessions)',
    prerequisites: 'None',
    assignedClassrooms: ['career-readiness'],
    assignedInstructors: ['ananya-rao'],
    visibility: 'published'
  },
  {
    id: 'quant-percentages',
    title: 'Quantitative Aptitude: Percentages & Ratios',
    slug: 'quant-percentages',
    shortDesc: 'Master percentages, averages, and ratio-proportions with speed-boosting shortcuts.',
    longDesc: 'Percentages and Ratios form the core arithmetic base for almost all competitive examinations (CAT, Bank PO, SSC CGL). This module teaches you conceptual clarity and equips you with Vedic math tricks, fraction-to-percentage tables, and shortcuts that help you solve math questions in under 30 seconds without calculators.',
    outcomes: [
      'Perform rapid percentages and division calculations mentally',
      'Solve Profit & Loss, Simple/Compound Interest, and Mixture equations instantly',
      'Apply ratio-proportion shortcuts to word problems across all topics',
      'Develop speed and accuracy hacks for exams under tight time limits'
    ],
    tags: ['Mathematics', 'Arithmetic', 'Quant Shortcuts'],
    level: 'All Levels',
    language: 'English & Hindi',
    duration: '3 Weeks (6 Sessions)',
    prerequisites: 'Basic calculations (multiplication & division tables)',
    assignedClassrooms: ['competitive-math'],
    assignedInstructors: ['rahul-mehta'],
    visibility: 'published'
  }
];

const defaultLectures = [
  // Spoken English Basics
  {
    id: 'seb-l1',
    moduleId: 'spoken-english-basics',
    title: 'Breaking the Silence: Overcoming the Speaking Block',
    description: 'Icebreaking session where students perform simple visual description exercises and practice voice projection.',
    agenda: '1. Introduction and warmups\n2. The psychology of language fear\n3. Structured speaking exercises (1-min chats)\n4. Peer interaction guidance',
    instructorId: 'priya-kapoor',
    format: 'live',
    dateTime: '2026-06-01T18:00',
    duration: '60 Mins',
    capacity: 25,
    resources: [
      { name: 'Introduction Handout (PDF)', url: '#' },
      { name: 'Weekly Spoken Log Worksheet', url: '#' }
    ],
    status: 'scheduled'
  },
  {
    id: 'seb-l2',
    moduleId: 'spoken-english-basics',
    title: 'Situational Conversations & Basic Etiquette',
    description: 'Learn vocabulary and standard phrases for introduce/greet templates and shopping or travel scenarios.',
    agenda: '1. Greeting formulas (formal vs informal)\n2. Dialogue scripting in pairs\n3. Live feedback on pronunciation\n4. Vocabulary checklist review',
    instructorId: 'priya-kapoor',
    format: 'live',
    dateTime: '2026-06-04T18:00',
    duration: '60 Mins',
    capacity: 25,
    resources: [
      { name: 'Greeting Scripts (PDF)', url: '#' },
      { name: 'Vocabulary builder sheet', url: '#' }
    ],
    status: 'scheduled'
  },
  // Interview Confidence
  {
    id: 'ic-l1',
    moduleId: 'interview-confidence',
    title: 'The Perfect Pitch: "Tell Me About Yourself"',
    description: 'Learn the exact 90-second formula to highlight your education, skills, and goals without sound rehearsed.',
    agenda: '1. Why recruiters ask this question\n2. The Present-Past-Future structural framework\n3. Reviewing sample pitches\n4. Live student pitch and spot review',
    instructorId: 'ananya-rao',
    format: 'live',
    dateTime: '2026-06-02T19:30',
    duration: '90 Mins',
    capacity: 20,
    resources: [
      { name: 'Elevator Pitch Templates', url: '#' },
      { name: 'Pitch checklist & scorecard', url: '#' }
    ],
    status: 'scheduled'
  },
  {
    id: 'ic-l2',
    moduleId: 'interview-confidence',
    title: 'Tackling Behavioral Questions (STAR Method)',
    description: 'Structuring answers around conflict, leadership, failures, and pressure using situational storytelling.',
    agenda: '1. Understanding the STAR framework\n2. How to map college projects to STAR answers\n3. Common traps in "Strengths & Weaknesses"\n4. Student mock simulation',
    instructorId: 'ananya-rao',
    format: 'live',
    dateTime: '2026-06-05T19:30',
    duration: '90 Mins',
    capacity: 20,
    resources: [
      { name: 'STAR Framework Worksheet', url: '#' },
      { name: '50 Common HR Questions Bank', url: '#' }
    ],
    status: 'scheduled'
  },
  // Quant
  {
    id: 'qp-l1',
    moduleId: 'quant-percentages',
    title: 'Arithmetic Hacks: Fraction-to-Percentage Tables',
    description: 'Memorize critical fractional equivalents and apply them to solve compound percentages instantly.',
    agenda: '1. The percentage formula revisited\n2. Fraction table mastercharts (1/2 to 1/25)\n3. Ratio conversion techniques\n4. 20 mental calculation tests',
    instructorId: 'rahul-mehta',
    format: 'live',
    dateTime: '2026-06-03T17:00',
    duration: '75 Mins',
    capacity: 40,
    resources: [
      { name: 'Quant Fraction Cheat Sheet', url: '#' },
      { name: 'Practice Worksheet - Fractions', url: '#' }
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
    moduleId: 'interview-confidence',
    instructorId: 'ananya-rao',
    sourcePage: '/masterclass/interview-confidence',
    status: 'new',
    notes: 'Registered via Masterclass page. Looking to prepare for campus placements in September.',
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
    moduleId: 'spoken-english-basics',
    instructorId: 'priya-kapoor',
    sourcePage: '/instructor/priya-kapoor',
    status: 'contacted',
    notes: 'Called on 25th May. Expressed interest in weekend batches. Needs improvement for presentation calls.',
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
    moduleId: 'quant-percentages',
    instructorId: 'rahul-mehta',
    sourcePage: '/',
    status: 'interested',
    notes: 'Parent registered on behalf of the student. Preparing for banking exams. Scheduled follow-up in June.',
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
    text: 'Priya Kapoor\'s spoken English module completely transformed my confidence. I was always terrified of corporate calls, but her live conversation practice sessions helped me speak naturally without stumbling.',
    instructorId: 'priya-kapoor',
    moduleId: 'spoken-english-basics',
    status: 'approved'
  },
  {
    id: 'test-2',
    author: 'Vikram Aditya',
    role: 'MBA Candidate at IMI Delhi',
    text: 'Dr. Ananya Rao\'s placement masterclass is gold. The STAR technique she taught during the mock interview rounds helped me crack my consulting interview with absolute clarity. Highest recommendation!',
    instructorId: 'ananya-rao',
    moduleId: 'interview-confidence',
    status: 'approved'
  },
  {
    id: 'test-3',
    author: 'Karan Singhal',
    role: 'SBI PO Aspirant',
    text: 'Rahul Sir\'s fraction-to-percentage tables and division tricks saved my life during the banking exam quant section. I could solve arithmetic questions in under 20 seconds!',
    instructorId: 'rahul-mehta',
    moduleId: 'quant-percentages',
    status: 'approved'
  }
];

// Database operations
export function getDb() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    const freshDb = {
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
  return JSON.parse(data);
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
