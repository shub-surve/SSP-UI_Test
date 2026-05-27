import { useState, useEffect } from 'react';
import { getDb, addLead } from '../db';
import * as Icons from '../components/Icons';

export default function PublicSite() {
  const [db, setDb] = useState(getDb());
  const [currentView, setCurrentView] = useState({ type: 'home', id: null });
  const [interestModal, setInterestModal] = useState({ open: false, moduleId: '', instructorId: '' });
  
  // Public directory search states
  const [instructorSearch, setInstructorSearch] = useState('');
  const [instructorSubjectFilter, setInstructorSubjectFilter] = useState('');
  
  // Masterclass search states
  const [masterclassSearch, setMasterclassSearch] = useState('');
  const [masterclassSubjectFilter, setMasterclassSubjectFilter] = useState('');
  const [masterclassLevelFilter, setMasterclassLevelFilter] = useState('');

  // Lead registration form states
  const [leadForm, setLeadForm] = useState({ name: '', email: '', mobile: '', occupation: '' });
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [activeProblem, setActiveProblem] = useState(0);
  const [activePath, setActivePath] = useState('analyst');

  // Sync DB updates
  useEffect(() => {
    const handleStorageChange = () => {
      setDb(getDb());
    };
    window.addEventListener('storage', handleStorageChange);
    // Poll occasionally in case edits happen in another role in the same window
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const openRegisterModal = (moduleId = '', instructorId = '') => {
    setInterestModal({ open: true, moduleId, instructorId });
    setLeadForm({ name: '', email: '', mobile: '', occupation: '' });
    setLeadSuccess(false);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.mobile) {
      alert('Please fill out all required fields.');
      return;
    }

    const sourcePath = currentView.type === 'home' ? '/' : `/${currentView.type}/${currentView.id || ''}`;
    
    addLead({
      name: leadForm.name,
      email: leadForm.email,
      mobile: leadForm.mobile,
      occupation: leadForm.occupation,
      moduleId: interestModal.moduleId,
      instructorId: interestModal.instructorId,
      sourcePage: sourcePath
    });

    setLeadSuccess(true);
    setTimeout(() => {
      setInterestModal({ open: false, moduleId: '', instructorId: '' });
      setLeadSuccess(false);
    }, 2500);
  };

  // Get active items
  const activeInstructors = db.instructors.filter(inst => inst.status === 'active');
  const publishedModules = db.modules.filter(m => m.visibility === 'published');
  
  const getInstructorForModule = (moduleObj) => {
    if (moduleObj.assignedInstructors && moduleObj.assignedInstructors.length > 0) {
      return db.instructors.find(i => i.id === moduleObj.assignedInstructors[0]);
    }
    return null;
  };

  // Views Router helper
  const navigateTo = (viewType, viewId = null) => {
    setCurrentView({ type: viewType, id: viewId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHomeSection = (sectionId) => {
    setCurrentView({ type: 'home', id: null });
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const learnerPaths = [
    {
      id: 'analyst',
      label: 'Data Analyst',
      outcome: 'SQL, dashboards, and business insight reports',
      moduleSlug: 'sql-analytics-foundation',
      bestFor: 'Beginners who want an analytics role',
      proof: 'Start with SQL, then create a stakeholder-ready dashboard.',
      steps: ['SQL Analytics Foundation', 'Power BI Dashboard Lab', 'EDA Capstone']
    },
    {
      id: 'scientist',
      label: 'ML Portfolio',
      outcome: 'Python, statistics, model evaluation, and projects',
      moduleSlug: 'machine-learning-portfolio',
      bestFor: 'Learners with Python basics',
      proof: 'Build model notebooks that show clear metrics and tradeoffs.',
      steps: ['Python Statistics Bootcamp', 'ML Portfolio Sprint', 'Model review']
    },
    {
      id: 'career',
      label: 'Project Proof',
      outcome: 'A clear capstone story recruiters can inspect',
      moduleSlug: 'eda-storytelling-capstone',
      bestFor: 'Students who need portfolio evidence',
      proof: 'Turn a raw dataset into a polished, decision-focused case study.',
      steps: ['EDA Planning', 'Visual Evidence', 'Portfolio Story']
    }
  ];

  const activeLearnerPath = learnerPaths.find(path => path.id === activePath) || learnerPaths[0];

  const renderTrustStrip = () => (
    <section className="trust-strip" aria-label="Why learners trust SSPlive">
      <div className="trust-item">
        <strong>No payment wall</strong>
        <span>See course details before registering interest.</span>
      </div>
      <div className="trust-item">
        <strong>Mentor-reviewed work</strong>
        <span>Live feedback on notebooks, dashboards, and projects.</span>
      </div>
      <div className="trust-item">
        <strong>Limited review seats</strong>
        <span>Capacity is capped so feedback stays personal.</span>
      </div>
      <div className="trust-item">
        <strong>Free roadmap</strong>
        <span>Register once to get a Data Science path checklist.</span>
      </div>
    </section>
  );

  const renderPathfinderSection = () => (
    <section className="pathfinder-section" id="tracks">
      <div className="container pathfinder-layout">
        <div className="pathfinder-copy">
          <span className="accent-label">START WITH THE RIGHT TRACK</span>
          <h2>Choose a goal. See the course path instantly.</h2>
          <p>
            Most learners do not need a giant bundle. Pick the outcome you want, then start with the smallest live course that proves progress.
          </p>
          <div className="psychology-cues">
            <span><Icons.CheckCircle size={15} /> Small first step</span>
            <span><Icons.CheckCircle size={15} /> Visible outcome</span>
            <span><Icons.CheckCircle size={15} /> Real mentor authority</span>
          </div>
        </div>

        <div className="pathfinder-panel">
          <div className="path-tabs" role="tablist" aria-label="Choose your Data Science goal">
            {learnerPaths.map(path => (
              <button
                type="button"
                key={path.id}
                className={`path-tab ${activePath === path.id ? 'active' : ''}`}
                onClick={() => setActivePath(path.id)}
                role="tab"
                aria-selected={activePath === path.id}
              >
                {path.label}
              </button>
            ))}
          </div>

          <div className="path-result">
            <div className="path-result-header">
              <span>Recommended path</span>
              <strong>{activeLearnerPath.label}</strong>
            </div>
            <h3>{activeLearnerPath.outcome}</h3>
            <p>{activeLearnerPath.proof}</p>
            <div className="path-steps">
              {activeLearnerPath.steps.map((step, idx) => (
                <div className="path-step" key={step}>
                  <span>{idx + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
            <div className="path-actions">
              <button className="btn btn-primary" onClick={() => navigateTo('masterclass', activeLearnerPath.moduleSlug)}>
                View Starting Course <Icons.ChevronRight className="icon-after" />
              </button>
              <button className="btn btn-secondary" onClick={() => openRegisterModal()}>
                Get Roadmap
              </button>
            </div>
            <p className="microcopy">Best for: {activeLearnerPath.bestFor}. No credit card required.</p>
          </div>
        </div>
      </div>
    </section>
  );

  const renderLearningFlowSection = () => (
    <section className="learning-flow-section" id="process">
      <div className="container">
        <div className="section-header center">
          <span className="accent-label">HOW LEARNING WORKS</span>
          <h2>A simple route from interest to portfolio proof</h2>
          <p className="subtitle">The flow is designed to reduce hesitation: understand the fit, join a live lab, build evidence, and get feedback.</p>
        </div>
        <div className="flow-grid">
          {[
            ['01', 'Pick a track', 'Choose Analyst, ML Portfolio, or Project Proof based on your goal.'],
            ['02', 'Join live labs', 'Attend guided sessions with datasets, notebooks, and dashboard exercises.'],
            ['03', 'Get review', 'Mentors review your logic, metrics, visuals, and project story.'],
            ['04', 'Show your work', 'Leave with outputs you can discuss in interviews or academic reviews.']
          ].map(([num, title, text]) => (
            <div className="flow-item" key={title}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Problem-Solution Interactive Section
  const renderProblemSolutionSection = () => {
    const comparisons = [
      {
        problem: "Students watch long videos but still cannot build a real project.",
        solution: "Every Data Science module is built around live labs, datasets, notebooks, and reviewable outputs.",
        badge: "Project-first",
        metric: "2 portfolio artifacts",
        proof: ["Live notebook walkthroughs", "Dataset-based assignments", "Mentor project critique"]
      },
      {
        problem: "Generic courses mix SQL, Python, ML, and dashboards without a clear learning path.",
        solution: "Focused skill tracks let learners choose the exact Data Science capability they need next.",
        badge: "Modular path",
        metric: "4 focused tracks",
        proof: ["SQL analytics", "Python statistics", "Power BI", "Machine learning"]
      },
      {
        problem: "Learners get stuck on errors, metrics, and messy data with nobody to debug with.",
        solution: "Live mentor checkpoints convert mistakes into teachable moments before frustration builds.",
        badge: "Guided debugging",
        metric: "Live Q&A in every lab",
        proof: ["Query reviews", "Model diagnostics", "Dashboard feedback"]
      },
      {
        problem: "Syllabi hide the real work, so students do not know what they will actually create.",
        solution: "Transparent course pages show outcomes, sessions, resources, mentors, and project value.",
        badge: "Transparent syllabus",
        metric: "30-sec interest flow",
        proof: ["Public schedules", "Visible learning outcomes", "No payment wall"]
      }
    ];
    const activeItem = comparisons[activeProblem];

    return (
      <section className="problem-solution-section">
        <div className="section-header center">
          <span className="accent-label">FIXING DATA SCIENCE LEARNING</span>
          <h2>Problems students actually face</h2>
          <p className="subtitle">Tap a challenge to see how the live Data Science classroom turns confusion into usable skills.</p>
        </div>
        
        <div className="problem-lab">
          <div className="problem-tabs" role="tablist" aria-label="Data Science learning problems">
            {comparisons.map((item, idx) => (
              <button
                type="button"
                className={`problem-tab ${activeProblem === idx ? 'active' : ''}`}
                key={item.badge}
                onClick={() => setActiveProblem(idx)}
                role="tab"
                aria-selected={activeProblem === idx}
              >
                <span className="tab-index">0{idx + 1}</span>
                <span>{item.badge}</span>
              </button>
            ))}
          </div>

          <div className="problem-focus-card">
            <div className="focus-topline">
              <span className="card-badge">{activeItem.badge}</span>
              <strong>{activeItem.metric}</strong>
            </div>
            <div className="comparison-split featured">
              <div className="side problem-side">
                <div className="side-header">
                  <span className="bullet problem-bullet">x</span>
                  <h4>The Problem</h4>
                </div>
                <p>{activeItem.problem}</p>
              </div>
              <div className="side-arrow">
                <Icons.ChevronRight className="arrow-icon" />
              </div>
              <div className="side solution-side">
                <div className="side-header">
                  <span className="bullet solution-bullet">ok</span>
                  <h4>SSPlive Solution</h4>
                </div>
                <p>{activeItem.solution}</p>
              </div>
            </div>
            <div className="proof-grid">
              {activeItem.proof.map((proofItem) => (
                <span key={proofItem}>
                  <Icons.CheckCircle size={16} />
                  {proofItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="comparison-grid compact">
          {comparisons.map((item, idx) => (
            <button className="comparison-card" key={item.badge} onClick={() => setActiveProblem(idx)} type="button">
              <div className="card-badge">{item.badge}</div>
              <div className="comparison-split">
                <div className="side problem-side">
                  <div className="side-header">
                    <span className="bullet problem-bullet">x</span>
                    <h4>The Problem</h4>
                  </div>
                  <p>{item.problem}</p>
                </div>
                <div className="side-arrow">
                  <Icons.ChevronRight className="arrow-icon" />
                </div>
                <div className="side solution-side">
                  <div className="side-header">
                    <span className="bullet solution-bullet">ok</span>
                    <h4>SSPlive Solution</h4>
                  </div>
                  <p>{item.solution}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="public-site-wrapper">
      {/* Header */}
      <header className="public-header">
        <div className="header-container">
          <div className="logo-brand" onClick={() => navigateTo('home')}>
            <span className="logo-ssp">SSP</span>
            <span className="logo-live">live<span className="pulse-dot"></span></span>
          </div>
          
          <nav className="header-nav">
            <button 
              className={`nav-link ${currentView.type === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              Home
            </button>
            <button
              className="nav-link"
              onClick={() => goHomeSection('tracks')}
            >
              Tracks
            </button>
            <button 
              className={`nav-link ${currentView.type === 'masterclasses' ? 'active' : ''}`}
              onClick={() => navigateTo('masterclasses')}
            >
              Courses
            </button>
            <button 
              className={`nav-link ${currentView.type === 'instructors' ? 'active' : ''}`}
              onClick={() => navigateTo('instructors')}
            >
              Mentors
            </button>
          </nav>

          <div className="header-actions">
            <button className="btn btn-primary" onClick={() => openRegisterModal()}>
              Get Roadmap
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="public-main-content">
        
        {/* VIEW: HOME */}
        {currentView.type === 'home' && (
          <>
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-background-decor"></div>
              <div className="hero-container">
                <div className="hero-content">
                  <div className="hero-badge">
                    <span className="pulse-dot"></span>
                    June 2026 live cohorts now open
                  </div>
                  <h1>Learn Data Science by building real projects live</h1>
                  <p className="hero-lead">
                    Pick a clear track, join mentor-led labs, and create SQL, Python, dashboard, and machine learning work you can actually show.
                  </p>
                  <div className="hero-ctas">
                    <button className="btn btn-primary btn-lg" onClick={() => goHomeSection('tracks')}>
                      Find My Track <Icons.ChevronRight className="icon-after" />
                    </button>
                    <button className="btn btn-secondary btn-lg" onClick={() => navigateTo('instructors')}>
                      Meet Mentors
                    </button>
                  </div>
                  <div className="hero-stats">
                    <div className="stat-item">
                      <h3>5</h3>
                      <p>Focused Courses</p>
                    </div>
                    <div className="stat-item">
                      <h3>15+</h3>
                      <p>Live Lab Sessions</p>
                    </div>
                    <div className="stat-item">
                      <h3>100%</h3>
                      <p>Portfolio Focused</p>
                    </div>
                  </div>
                </div>
                
                <div className="hero-image-pane">
                  <div className="glass-card hero-widget">
                    <div className="widget-header">
                      <span className="live-pill">MENTOR REVIEW</span>
                      <span className="widget-title">Your next lab</span>
                    </div>
                    <div className="widget-teacher">
                      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="Dr. Ananya" />
                      <div>
                        <h5>Dr. Ananya Rao</h5>
                        <p>ML Projects & Model Review</p>
                      </div>
                    </div>
                    <div className="widget-agenda">
                      <div className="agenda-item active">
                        <Icons.CheckCircle className="icon-green" />
                        <span>Build a baseline model on a real dataset</span>
                      </div>
                      <div className="agenda-item">
                        <Icons.Clock className="icon-blue" />
                        <span>Review metrics, errors, and next steps</span>
                      </div>
                    </div>
                    <button className="btn btn-primary btn-block" onClick={() => navigateTo('masterclass', 'machine-learning-portfolio')}>
                      View This Course
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {renderTrustStrip()}

            {renderPathfinderSection()}

            {renderLearningFlowSection()}

            {/* Problem-Solution Grid */}
            {renderProblemSolutionSection()}

            {/* Featured Masterclasses */}
            <section className="featured-section bg-light">
              <div className="container">
                <div className="section-header">
                  <div>
                    <span className="accent-label">POPULAR COURSES</span>
                    <h2>Start with one focused Data Science course</h2>
                  </div>
                  <button className="btn btn-secondary" onClick={() => navigateTo('masterclasses')}>
                    View All Courses <Icons.ChevronRight className="icon-after" />
                  </button>
                </div>

                <div className="cards-grid">
                  {publishedModules.slice(0, 3).map(m => {
                    const inst = getInstructorForModule(m);
                    return (
                      <div className="module-card glass-card" key={m.id}>
                        <div className="card-top">
                          <span className="tag-level">{m.level}</span>
                          <span className="tag-duration">{m.duration}</span>
                        </div>
                        <h3>{m.title}</h3>
                        <p className="card-desc">{m.shortDesc}</p>
                        
                        <div className="card-tags">
                          {m.tags.slice(0, 3).map((t, i) => (
                            <span className="tag-pill" key={i}>#{t}</span>
                          ))}
                        </div>

                        {inst && (
                          <div className="card-instructor">
                            <img src={inst.photo} alt={inst.name} />
                            <div>
                              <h4>{inst.name}</h4>
                              <p>{inst.title}</p>
                            </div>
                          </div>
                        )}

                        <div className="card-footer">
                          <button className="btn btn-secondary" onClick={() => navigateTo('masterclass', m.slug)}>
                            Course Details
                          </button>
                          <button className="btn btn-primary" onClick={() => openRegisterModal(m.id, inst?.id)}>
                            Join Waitlist
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Featured Instructors */}
            <section className="featured-section">
              <div className="container">
                <div className="section-header">
                  <div>
                    <span className="accent-label">MENTOR AUTHORITY</span>
                    <h2>Learn from people who review your work</h2>
                  </div>
                  <button className="btn btn-secondary" onClick={() => navigateTo('instructors')}>
                    Browse Mentors
                  </button>
                </div>

                <div className="instructors-strip">
                  {activeInstructors.map(inst => (
                    <div className="instructor-wide-card glass-card" key={inst.id}>
                      <div className="instructor-photo-container">
                        <img src={inst.photo} alt={inst.name} />
                      </div>
                      <div className="instructor-wide-details">
                        <div className="instructor-header-meta">
                          <span className="experience-tag">{inst.experience} Experience</span>
                        </div>
                        <h3>{inst.name}</h3>
                        <p className="inst-title">{inst.title}</p>
                        <p className="inst-bio-short">{inst.bio}</p>
                        
                        <div className="instructor-tags">
                          {inst.tags.map((tag, i) => (
                            <span className="tag-pill" key={i}>{tag}</span>
                          ))}
                        </div>

                        <div className="instructor-actions">
                          <button className="btn btn-secondary" onClick={() => navigateTo('instructor', inst.slug)}>
                            View Portfolio
                          </button>
                          <button className="btn btn-primary" onClick={() => openRegisterModal('', inst.id)}>
                            Ask for Guidance
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Student Outcomes & Testimonials */}
            <section className="testimonials-section bg-navy text-light">
              <div className="container">
                <div className="section-header center">
                  <span className="accent-label text-blue">SOCIAL PROOF</span>
                  <h2>Students trust work they can explain</h2>
                  <p className="subtitle text-muted">Real feedback from learners who completed live Data Science labs and mentor reviews.</p>
                </div>

                <div className="testimonials-grid">
                  {db.testimonials.filter(t => t.status === 'approved').slice(0, 3).map((test) => {
                    const inst = db.instructors.find(i => i.id === test.instructorId);
                    return (
                      <div className="testimonial-card glass-card dark" key={test.id}>
                        <div className="testimonial-stars">
                          {[...Array(5)].map((_, i) => (
                            <Icons.Star size={16} key={i} className="star-filled" fill="currentColor" />
                          ))}
                        </div>
                        <p className="testimonial-text">"{test.text}"</p>
                        <div className="testimonial-author">
                          <div>
                            <h4>{test.author}</h4>
                            <p className="author-role">{test.role}</p>
                          </div>
                          {inst && (
                            <span className="mentor-tag">Trained by {inst.name.split(' ')[0]}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* General Lead CTA Banner */}
            <section className="cta-banner-section">
              <div className="cta-banner-container">
                <h2>Ready to Build Your Data Portfolio?</h2>
                <p>Register your interest today and receive a Data Science learning path checklist plus immediate notification of our next live cohort schedule.</p>
                <button className="btn btn-primary btn-lg" onClick={() => openRegisterModal()}>
                  Get Free Data Science Checklist
                </button>
              </div>
            </section>
          </>
        )}

        {/* VIEW: INSTRUCTOR DIRECTORY */}
        {currentView.type === 'instructors' && (
          <section className="directory-section">
            <div className="container">
              <div className="directory-header">
                <h2>Browse Data Science Mentors</h2>
                <p>Search and filter to find mentors specialized in analytics, Python, dashboards, statistics, and machine learning.</p>
              </div>

              {/* Filters */}
              <div className="filter-bar glass-card">
                <div className="filter-item search">
                  <Icons.Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search by mentor name, skill, or credentials..." 
                    value={instructorSearch} 
                    onChange={(e) => setInstructorSearch(e.target.value)}
                  />
                </div>
                <div className="filter-item select">
                  <Icons.Filter size={16} className="filter-icon" />
                  <select 
                    value={instructorSubjectFilter} 
                    onChange={(e) => setInstructorSubjectFilter(e.target.value)}
                  >
                    <option value="">All Subjects/Expertise</option>
                    <option value="SQL">SQL Analytics</option>
                    <option value="Python">Python</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Power BI">Power BI</option>
                    <option value="Statistics">Statistics</option>
                  </select>
                </div>
              </div>

              {/* Results Grid */}
              <div className="cards-grid">
                {activeInstructors
                  .filter(inst => {
                    const matchesSearch = inst.name.toLowerCase().includes(instructorSearch.toLowerCase()) || 
                                          inst.title.toLowerCase().includes(instructorSearch.toLowerCase()) ||
                                          inst.bio.toLowerCase().includes(instructorSearch.toLowerCase());
                    const matchesSubject = instructorSubjectFilter === '' || inst.tags.some(t => t.includes(instructorSubjectFilter));
                    return matchesSearch && matchesSubject;
                  })
                  .map(inst => (
                    <div className="instructor-card glass-card" key={inst.id}>
                      <div className="inst-card-image">
                        <img src={inst.photo} alt={inst.name} />
                        <span className="experience-badge">{inst.experience} Exp</span>
                      </div>
                      <div className="inst-card-body">
                        <h3>{inst.name}</h3>
                        <p className="title">{inst.title}</p>
                        
                        <div className="inst-tags">
                          {inst.tags.map((tag, i) => (
                            <span className="tag-pill" key={i}>{tag}</span>
                          ))}
                        </div>

                        <ul className="inst-credentials-list">
                          {inst.credentials.slice(0, 2).map((c, i) => (
                            <li key={i}>
                              <Icons.Award size={14} className="credential-icon" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="inst-card-actions">
                          <button className="btn btn-secondary" onClick={() => navigateTo('instructor', inst.slug)}>
                            View Mentor Profile
                          </button>
                          <button className="btn btn-primary" onClick={() => openRegisterModal('', inst.id)}>
                            Ask for Guidance
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </section>
        )}

        {/* VIEW: INSTRUCTOR PORTFOLIO DETAIL */}
        {currentView.type === 'instructor' && (() => {
          const inst = activeInstructors.find(i => i.slug === currentView.id);
          if (!inst) return <div className="container error-view">Mentor profile not found.</div>;
          
          const instModules = publishedModules.filter(m => m.assignedInstructors.includes(inst.id));
          const instTestimonials = db.testimonials.filter(t => t.instructorId === inst.id && t.status === 'approved');

          return (
            <section className="portfolio-section">
              <div className="container">
                <button className="btn-back" onClick={() => navigateTo('instructors')}>
                  ← Back to Mentor Directory
                </button>

                <div className="portfolio-grid">
                  {/* Left Column - Card and Credentials */}
                  <div className="portfolio-sidebar">
                    <div className="portfolio-profile-card glass-card">
                      <img src={inst.photo} alt={inst.name} className="portfolio-photo" />
                      <h2>{inst.name}</h2>
                      <p className="title">{inst.title}</p>
                      
                      <div className="portfolio-stats">
                        <div>
                          <strong>{inst.experience}</strong>
                          <span>Experience</span>
                        </div>
                        <div>
                          <strong>{instModules.length}</strong>
                          <span>Courses</span>
                        </div>
                      </div>

                      <button className="btn btn-primary btn-block" onClick={() => openRegisterModal('', inst.id)}>
                        Ask {inst.name.split(' ')[0]} for Guidance
                      </button>

                      {/* Optional Pricing */}
                      {inst.pricing && (
                        <div className="pricing-tag">
                          <span>Starting Package:</span> <strong>{inst.pricing}</strong>
                        </div>
                      )}

                      {/* Social Links */}
                      {inst.social && (
                        <div className="social-links">
                          {inst.social.linkedin && (
                            <a href={inst.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                              LinkedIn
                            </a>
                          )}
                          {inst.social.instagram && (
                            <a href={inst.social.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
                              Instagram
                            </a>
                          )}
                          {inst.social.whatsapp && (
                            <a href={inst.social.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                              WhatsApp Chat
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="credentials-card glass-card">
                      <h3>Education & Credentials</h3>
                      <ul>
                        {inst.credentials.map((cred, i) => (
                          <li key={i}>
                            <Icons.Award size={16} className="cred-bullet" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Bio and Offerings */}
                  <div className="portfolio-main">
                    <div className="portfolio-bio-card glass-card">
                      <h3>About the Mentor</h3>
                      <p>{inst.bio}</p>
                      
                      <div className="expertise-tags-box">
                        <h4>Expertise Areas</h4>
                        <div className="tags-flex">
                          {inst.tags.map((tag, i) => (
                            <span className="tag-pill" key={i}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Instructor Courses */}
                    <div className="portfolio-offerings">
                      <h3>Live Courses Taught by {inst.name}</h3>
                      <div className="offerings-grid">
                        {instModules.map(m => (
                          <div className="offering-item glass-card" key={m.id}>
                            <div className="offering-meta">
                              <span className="level-badge">{m.level}</span>
                              <span className="dur">{m.duration}</span>
                            </div>
                            <h4>{m.title}</h4>
                            <p>{m.shortDesc}</p>
                            <div className="offering-actions">
                              <button className="btn btn-secondary" onClick={() => navigateTo('masterclass', m.slug)}>
                                Course Details
                              </button>
                              <button className="btn btn-primary" onClick={() => openRegisterModal(m.id, inst.id)}>
                                Join Waitlist
                              </button>
                            </div>
                          </div>
                        ))}
                        {instModules.length === 0 && (
                          <p className="no-items">No courses currently scheduled with this mentor.</p>
                        )}
                      </div>
                    </div>

                    {/* Curated Testimonials */}
                    {instTestimonials.length > 0 && (
                      <div className="portfolio-testimonials">
                        <h3>What Students Say</h3>
                        <div className="testimonials-list">
                          {instTestimonials.map(t => (
                            <div className="testimonial-bubble glass-card" key={t.id}>
                              <p>"{t.text}"</p>
                              <div className="author">
                                <strong>— {t.author}</strong>, <span className="role">{t.role}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* VIEW: COURSE DIRECTORY */}
        {currentView.type === 'masterclasses' && (
          <section className="directory-section">
            <div className="container">
              <div className="directory-header">
                <h2>Live Data Science Courses</h2>
                <p>Compare focused labs across SQL, Python, dashboards, statistics, and machine learning. Review outcomes, schedules, and mentors before you register interest.</p>
              </div>

              {/* Filters */}
              <div className="filter-bar glass-card">
                <div className="filter-item search">
                  <Icons.Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search by topic, skill, or tags..." 
                    value={masterclassSearch} 
                    onChange={(e) => setMasterclassSearch(e.target.value)}
                  />
                </div>
                <div className="filter-item select">
                  <Icons.Filter size={16} className="filter-icon" />
                  <select 
                    value={masterclassSubjectFilter} 
                    onChange={(e) => setMasterclassSubjectFilter(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    <option value="SQL">SQL Analytics</option>
                    <option value="Python">Python & Statistics</option>
                    <option value="Power BI">Power BI Dashboards</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Portfolio">Portfolio Projects</option>
                  </select>
                </div>
                <div className="filter-item select">
                  <Icons.Filter size={16} className="filter-icon" />
                  <select 
                    value={masterclassLevelFilter} 
                    onChange={(e) => setMasterclassLevelFilter(e.target.value)}
                  >
                    <option value="">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Results Grid */}
              <div className="cards-grid">
                {publishedModules
                  .filter(m => {
                    const matchesSearch = m.title.toLowerCase().includes(masterclassSearch.toLowerCase()) || 
                                          m.shortDesc.toLowerCase().includes(masterclassSearch.toLowerCase()) ||
                                          m.tags.some(t => t.toLowerCase().includes(masterclassSearch.toLowerCase()));
                    const matchesSubject = masterclassSubjectFilter === '' || 
                                           m.title.toLowerCase().includes(masterclassSubjectFilter.toLowerCase()) ||
                                           m.tags.some(t => t.toLowerCase().includes(masterclassSubjectFilter.toLowerCase()));
                    const matchesLevel = masterclassLevelFilter === '' || m.level === masterclassLevelFilter;
                    return matchesSearch && matchesSubject && matchesLevel;
                  })
                  .map(m => {
                    const inst = getInstructorForModule(m);
                    return (
                      <div className="module-card glass-card" key={m.id}>
                        <div className="card-top">
                          <span className="tag-level">{m.level}</span>
                          <span className="tag-duration">{m.duration}</span>
                        </div>
                        <h3>{m.title}</h3>
                        <p className="card-desc">{m.shortDesc}</p>
                        
                        <div className="card-tags">
                          {m.tags.map((t, i) => (
                            <span className="tag-pill" key={i}>#{t}</span>
                          ))}
                        </div>

                        {inst && (
                          <div className="card-instructor" onClick={() => navigateTo('instructor', inst.slug)}>
                            <img src={inst.photo} alt={inst.name} />
                            <div>
                              <h4>{inst.name}</h4>
                              <p>{inst.title}</p>
                            </div>
                          </div>
                        )}

                        <div className="card-footer">
                          <button className="btn btn-secondary" onClick={() => navigateTo('masterclass', m.slug)}>
                            Course Details
                          </button>
                          <button className="btn btn-primary" onClick={() => openRegisterModal(m.id, inst?.id)}>
                            Join Waitlist
                          </button>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </section>
        )}

        {/* VIEW: COURSE DETAIL */}
        {currentView.type === 'masterclass' && (() => {
          const moduleObj = publishedModules.find(m => m.slug === currentView.id);
          if (!moduleObj) return <div className="container error-view">Course not found.</div>;
          
          const inst = getInstructorForModule(moduleObj);
          
          // Fetch module lectures and testimonials
          const moduleLectures = db.lectures.filter(l => l.moduleId === moduleObj.id);
          const moduleTestimonials = db.testimonials.filter(t => t.moduleId === moduleObj.id && t.status === 'approved');

          return (
            <section className="masterclass-detail-section">
              <div className="container">
                <button className="btn-back" onClick={() => navigateTo('masterclasses')}>
                  ← Back to Course List
                </button>

                <div className="masterclass-detail-layout">
                  {/* Left Main column */}
                  <div className="masterclass-main">
                    <div className="detail-hero-box glass-card">
                      <div className="detail-meta">
                        <span className="level-badge">{moduleObj.level}</span>
                        <span className="duration-badge"><Icons.Clock size={14} className="icon-mr" />{moduleObj.duration}</span>
                        <span className="lang-badge">Language: {moduleObj.language}</span>
                      </div>
                      <h2>{moduleObj.title}</h2>
                      <p className="lead">{moduleObj.shortDesc}</p>
                      
                      <div className="detail-action-buttons mobile-only">
                        <button className="btn btn-primary btn-block" onClick={() => openRegisterModal(moduleObj.id, inst?.id)}>
                          Join Waitlist
                        </button>
                      </div>
                    </div>

                    <div className="detail-about-box glass-card">
                      <h3>Course Overview</h3>
                      <p>{moduleObj.longDesc}</p>
                      
                      {moduleObj.prerequisites && (
                        <div className="prereqs-box">
                          <strong>Prerequisites:</strong> {moduleObj.prerequisites}
                        </div>
                      )}
                    </div>

                    {/* Learning Outcomes */}
                    {moduleObj.outcomes && moduleObj.outcomes.length > 0 && (
                      <div className="outcomes-box glass-card">
                        <h3>What You Will Learn</h3>
                        <div className="outcomes-grid">
                          {moduleObj.outcomes.map((o, i) => (
                            <div className="outcome-item" key={i}>
                              <Icons.CheckCircle className="check-icon" />
                              <span>{o}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Syllabus / Lecture list */}
                    <div className="syllabus-box glass-card">
                      <h3>Lecture & Session Schedule</h3>
                      <p className="syllabus-intro">This course is composed of live sessions. Classroom materials are unlocked after an advisor confirms the right cohort fit.</p>
                      
                      <div className="syllabus-timeline">
                        {moduleLectures.map((l, idx) => (
                          <div className="timeline-item" key={l.id}>
                            <div className="timeline-badge">Session {idx + 1}</div>
                            <div className="timeline-content">
                              <div className="timeline-header">
                                <h4>{l.title}</h4>
                                <span className={`format-tag ${l.format}`}>{l.format.toUpperCase()}</span>
                              </div>
                              <p>{l.description}</p>
                              
                              {l.agenda && (
                                <div className="timeline-agenda">
                                  <strong>Agenda:</strong>
                                  <pre>{l.agenda}</pre>
                                </div>
                              )}

                              {/* Locked Resources Display */}
                              {l.resources && l.resources.length > 0 && (
                                <div className="locked-resources">
                                  <span className="resources-title">Classroom Resources:</span>
                                  <div className="resources-flex">
                                    {l.resources.map((res, rIdx) => (
                                      <div className="resource-pill-locked" key={rIdx} onClick={() => openRegisterModal(moduleObj.id, inst?.id)}>
                                        <Icons.Lock size={12} className="lock-icon" />
                                        <span>{res.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="timeline-footer">
                                <span><Icons.Calendar size={14} className="icon-mr" />{new Date(l.dateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                <span><Icons.Users size={14} className="icon-mr" />Capacity: {l.capacity} max</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {moduleLectures.length === 0 && (
                          <p className="no-items">Session schedules for this course are currently being drafted by the mentor. Join the waitlist to get notified once sessions go live.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right sidebar column */}
                  <div className="masterclass-sidebar">
                    {/* Sticky register box */}
                    <div className="sticky-register-box glass-card">
                      <div className="register-box-header">
                        <h3>Waitlist Open</h3>
                        <p className="price-lead">Free guidance call before payment</p>
                      </div>
                      
                      <ul className="perks-list">
                        <li>
                          <Icons.CheckCircle size={16} className="perk-icon" />
                          <span>1-on-1 course fit guidance</span>
                        </li>
                        <li>
                          <Icons.CheckCircle size={16} className="perk-icon" />
                          <span>Interactive live Q&A in class</span>
                        </li>
                        <li>
                          <Icons.CheckCircle size={16} className="perk-icon" />
                          <span>Project worksheets and study guides</span>
                        </li>
                      </ul>

                      <button className="btn btn-primary btn-block btn-lg" onClick={() => openRegisterModal(moduleObj.id, inst?.id)}>
                        Join Waitlist
                      </button>
                      <p className="register-disclaimer">Free counseling follow-up. No credit card required.</p>
                    </div>

                    {/* Instructor Preview card */}
                    {inst && (
                      <div className="sidebar-instructor-card glass-card">
                        <h3>Led by</h3>
                        <div className="instructor-brief">
                          <img src={inst.photo} alt={inst.name} />
                          <div>
                            <h4>{inst.name}</h4>
                            <p>{inst.title}</p>
                          </div>
                        </div>
                        <p className="bio-snippet">{inst.bio.substring(0, 120)}...</p>
                        <button className="btn btn-secondary btn-block btn-sm" onClick={() => navigateTo('instructor', inst.slug)}>
                          View Mentor Portfolio
                        </button>
                      </div>
                    )}

                    {/* Testimonials */}
                    {moduleTestimonials.length > 0 && (
                      <div className="sidebar-testimonials-box glass-card">
                        <h3>What Alumni Say</h3>
                        <div className="mini-testimonials">
                          {moduleTestimonials.map(t => (
                            <div className="mini-test-card" key={t.id}>
                              <p>"{t.text}"</p>
                              <span>— {t.author}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

      </main>

      {/* Footer */}
      <footer className="public-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>SSPlive</h3>
              <p>Live Data Science courses with mentor review, practical datasets, and portfolio-focused project work.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li onClick={() => navigateTo('home')}>Home</li>
                <li onClick={() => navigateTo('masterclasses')}>Courses</li>
                <li onClick={() => navigateTo('instructors')}>Mentors</li>
              </ul>
            </div>
            <div className="footer-admin-actions">
              <h4>Portals</h4>
              <p>For testing, use the floating Sandbox Switcher bar at the top to view admin and mentor screens.</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2026 SSPlive online platforms. All rights reserved.</p>
            <p className="disclaimer">Demo environment for Phase 1 review.</p>
          </div>
        </div>
      </footer>

      {/* REGISTER INTEREST MODAL */}
      {interestModal.open && (
        <div className="modal-backdrop">
          <div className="modal-content glass-card">
            <button className="modal-close" onClick={() => setInterestModal({ open: false, moduleId: '', instructorId: '' })}>
              <Icons.X size={20} />
            </button>

            {leadSuccess ? (
              <div className="lead-success-message">
                <Icons.CheckCircle size={48} className="success-icon" />
                <h3>Thank You!</h3>
                <p>Your interest has been logged successfully. An academic advisor will reach out to you via Mobile/WhatsApp within 24 hours.</p>
                <div className="success-pulse"></div>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit}>
                <h3>Get Your Data Science Roadmap</h3>
                <p className="modal-intro">Tell us where to send your roadmap and cohort updates. An advisor can help you choose the right first course.</p>
                
                {/* Auto captured tags indicator */}
                {(interestModal.moduleId || interestModal.instructorId) && (
                  <div className="modal-captured-tags">
                    <span className="captured-label">Selected interest:</span>
                    <div className="tags-flex">
                      {interestModal.moduleId && (
                        <span className="captured-tag">
                          Course: {db.modules.find(m => m.id === interestModal.moduleId)?.title || interestModal.moduleId}
                        </span>
                      )}
                      {interestModal.instructorId && (
                        <span className="captured-tag">
                          Mentor: {db.instructors.find(i => i.id === interestModal.instructorId)?.name || interestModal.instructorId}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="lead-name">Full Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="lead-name" 
                    placeholder="Enter your name" 
                    required 
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="lead-mobile">Mobile / WhatsApp Number <span className="required">*</span></label>
                    <input 
                      type="tel" 
                      id="lead-mobile" 
                      placeholder="e.g. +91 98765 43210" 
                      required 
                      value={leadForm.mobile}
                      onChange={(e) => setLeadForm({ ...leadForm, mobile: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lead-email">Email Address <span className="required">*</span></label>
                    <input 
                      type="email" 
                      id="lead-email" 
                      placeholder="e.g. name@domain.com" 
                      required 
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="lead-occupation">What is your current occupation?</label>
                  <select 
                    id="lead-occupation"
                    value={leadForm.occupation}
                    onChange={(e) => setLeadForm({ ...leadForm, occupation: e.target.value })}
                  >
                    <option value="">Select Occupation</option>
                    <option value="Student (Prep/School)">Student (Prep / School)</option>
                    <option value="Student (College/University)">Student (College / University)</option>
                    <option value="Job Seeker">Job Seeker</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Parent / Guardian">Parent / Guardian</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setInterestModal({ open: false, moduleId: '', instructorId: '' })}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Send My Roadmap <Icons.Send size={14} className="icon-after" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
