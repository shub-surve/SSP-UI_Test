import { useState } from 'react';
import { 
  getDb, 
  saveDb, 
  updateLead, 
  createClassroom, 
  updateClassroom, 
  createModule, 
  updateModule, 
  createLecture, 
  updateTestimonialStatus, 
  addTestimonial 
} from '../db';
import * as Icons from '../components/Icons';

export default function AdminDashboard() {
  const [db, setDb] = useState(getDb());
  const [activeTab, setActiveTab] = useState('leads'); // leads, classrooms, modules, testimonials
  
  // Selected items for editing
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingClassroom, setEditingClassroom] = useState(null);
  const [creatingClassroom, setCreatingClassroom] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [creatingModule, setCreatingModule] = useState(false);
  const [addingLectureToModule, setAddingLectureToModule] = useState(null);

  // Filter states
  const [leadStatusFilter, setLeadStatusFilter] = useState('');
  const [leadModuleFilter, setLeadModuleFilter] = useState('');
  
  // Form states
  const [classroomForm, setClassroomForm] = useState({ name: '', description: '', subject: '', level: '', language: '', status: 'active', visibility: 'public' });
  const [moduleForm, setModuleForm] = useState({ title: '', shortDesc: '', longDesc: '', outcomes: '', tags: '', level: 'Beginner', language: 'English', duration: '', prerequisites: '', assignedClassrooms: [], assignedInstructors: [], visibility: 'draft' });
  const [lectureForm, setLectureForm] = useState({ title: '', description: '', agenda: '', format: 'live', dateTime: '', duration: '60 Mins', capacity: '25' });
  const [testimonialForm, setTestimonialForm] = useState({ author: '', role: '', text: '', instructorId: '', moduleId: '', status: 'approved' });
  const [showAddTestimonialModal, setShowAddTestimonialModal] = useState(false);

  // Sync DB Helper
  const refreshDb = () => {
    setDb(getDb());
  };

  // Lead status updates
  const handleUpdateLeadStatus = (leadId, newStatus, notes, assignedOwner) => {
    updateLead(leadId, { status: newStatus, notes, assignedOwner });
    refreshDb();
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(getDb().leads.find(l => l.id === leadId));
    }
  };

  // Classroom actions
  const handleSaveClassroom = (e) => {
    e.preventDefault();
    if (editingClassroom) {
      updateClassroom(editingClassroom.id, classroomForm);
      setEditingClassroom(null);
    } else {
      createClassroom(classroomForm);
      setCreatingClassroom(false);
    }
    setClassroomForm({ name: '', description: '', subject: '', level: '', language: '', status: 'active', visibility: 'public' });
    refreshDb();
  };

  const handleEditClassroomClick = (classroom) => {
    setEditingClassroom(classroom);
    setClassroomForm({
      name: classroom.name,
      description: classroom.description,
      subject: classroom.subject,
      level: classroom.level,
      language: classroom.language,
      status: classroom.status,
      visibility: classroom.visibility
    });
    setCreatingClassroom(true);
  };

  // Module actions
  const handleSaveModule = (e) => {
    e.preventDefault();
    if (editingModule) {
      updateModule(editingModule.id, moduleForm);
      setEditingModule(null);
    } else {
      createModule(moduleForm);
      setCreatingModule(false);
    }
    setModuleForm({ title: '', shortDesc: '', longDesc: '', outcomes: '', tags: '', level: 'Beginner', language: 'English', duration: '', prerequisites: '', assignedClassrooms: [], assignedInstructors: [], visibility: 'draft' });
    refreshDb();
  };

  const handleEditModuleClick = (mod) => {
    setEditingModule(mod);
    setModuleForm({
      title: mod.title,
      shortDesc: mod.shortDesc,
      longDesc: mod.longDesc,
      outcomes: Array.isArray(mod.outcomes) ? mod.outcomes.join('\n') : mod.outcomes,
      tags: Array.isArray(mod.tags) ? mod.tags.join(', ') : mod.tags,
      level: mod.level,
      language: mod.language,
      duration: mod.duration,
      prerequisites: mod.prerequisites || '',
      assignedClassrooms: mod.assignedClassrooms || [],
      assignedInstructors: mod.assignedInstructors || [],
      visibility: mod.visibility
    });
    setCreatingModule(true);
  };

  const handleCheckboxChange = (field, val) => {
    setModuleForm(prev => {
      const arr = prev[field];
      if (arr.includes(val)) {
        return { ...prev, [field]: arr.filter(v => v !== val) };
      } else {
        return { ...prev, [field]: [...arr, val] };
      }
    });
  };

  // Lecture actions
  const handleSaveLecture = (e) => {
    e.preventDefault();
    createLecture({
      ...lectureForm,
      moduleId: addingLectureToModule.id,
      instructorId: addingLectureToModule.assignedInstructors[0] || 'priya-kapoor'
    });
    setAddingLectureToModule(null);
    setLectureForm({ title: '', description: '', agenda: '', format: 'live', dateTime: '', duration: '60 Mins', capacity: '25' });
    refreshDb();
  };

  // Testimonials
  const handleSaveTestimonial = (e) => {
    e.preventDefault();
    addTestimonial(testimonialForm);
    setShowAddTestimonialModal(false);
    setTestimonialForm({ author: '', role: '', text: '', instructorId: '', moduleId: '', status: 'approved' });
    refreshDb();
  };

  // Permissions Settings Toggle (Instructor view lead settings)
  const toggleLeadVisibilitySetting = () => {
    const updatedDb = { ...db, leadsVisibleToInstructors: !db.leadsVisibleToInstructors };
    saveDb(updatedDb);
    setDb(updatedDb);
  };

  // Compute metrics
  const totalLeads = db.leads.length;
  const newLeads = db.leads.filter(l => l.status === 'new').length;
  const contactedLeads = db.leads.filter(l => l.status === 'contacted').length;
  const interestedLeads = db.leads.filter(l => l.status === 'interested').length;
  const convertedLeads = db.leads.filter(l => l.status === 'converted').length;
  const activeInstructors = db.instructors.filter(i => i.status === 'active').length;
  const totalModules = db.modules.length;

  return (
    <div className="admin-dashboard-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="brand-dot"></span>
          <h2>SSP admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-link ${activeTab === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            <Icons.Star size={18} />
            <span>Overview Metrics</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            <Icons.Users size={18} />
            <span>Lead Pipelines</span>
            {newLeads > 0 && <span className="badge-alert">{newLeads}</span>}
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'classrooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('classrooms')}
          >
            <Icons.BookOpen size={18} />
            <span>Classroom Hub</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => setActiveTab('modules')}
          >
            <Icons.Calendar size={18} />
            <span>Modules & Lectures</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            <Icons.Award size={18} />
            <span>Testimonial Mgmt</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Icons.Lock size={18} />
            <span>Access Control</span>
          </button>
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="admin-main">
        
        {/* HEADER BAR */}
        <header className="admin-header-bar">
          <h3>Admin Control Center</h3>
          <div className="admin-user-profile">
            <span className="profile-initials">AD</span>
            <span>Platform Owner</span>
          </div>
        </header>

        {/* WORKSPACE AREA */}
        <div className="admin-workspace-content">
          
          {/* TAB: METRICS */}
          {activeTab === 'metrics' && (
            <div className="admin-tab-pane">
              <div className="dashboard-stats-grid">
                <div className="stat-card glass-card">
                  <h4>Total Leads Logged</h4>
                  <div className="stat-value">{totalLeads}</div>
                  <p className="stat-sub font-green">New registration conversions</p>
                </div>
                <div className="stat-card glass-card">
                  <h4>Pending Action (New)</h4>
                  <div className="stat-value text-blue">{newLeads}</div>
                  <p className="stat-sub">Leads awaiting counselor callback</p>
                </div>
                <div className="stat-card glass-card">
                  <h4>Converted Enrollments</h4>
                  <div className="stat-value text-green">{convertedLeads}</div>
                  <p className="stat-sub">Paid learning pipelines ready</p>
                </div>
                <div className="stat-card glass-card">
                  <h4>Active Instructors</h4>
                  <div className="stat-value">{activeInstructors}</div>
                  <p className="stat-sub">Assigned scope contribution</p>
                </div>
              </div>

              {/* Conversion Pipeline Visualizer */}
              <div className="dashboard-row mt-4">
                <div className="dashboard-panel glass-card flex-1">
                  <h3>Lead Status Pipeline</h3>
                  <div className="pipeline-bars-container">
                    {[
                      { status: 'new', label: 'New Lead Queue', count: newLeads, color: '#2563EB' },
                      { status: 'contacted', label: 'Contacted', count: contactedLeads, color: '#F59E0B' },
                      { status: 'interested', label: 'Interested', count: interestedLeads, color: '#10B981' },
                      { status: 'converted', label: 'Converted Students', count: convertedLeads, color: '#059669' },
                      { status: 'not-interested', label: 'Not Interested', count: db.leads.filter(l => l.status === 'not-interested').length, color: '#EF4444' }
                    ].map((step, idx) => {
                      const pct = totalLeads > 0 ? (step.count / totalLeads) * 100 : 0;
                      return (
                        <div className="pipeline-row" key={idx}>
                          <div className="pipeline-label">
                            <strong>{step.label}</strong>
                            <span>{step.count} ({Math.round(pct)}%)</span>
                          </div>
                          <div className="pipeline-bar-bg">
                            <div className="pipeline-bar-fill" style={{ width: `${pct}%`, backgroundColor: step.color }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="dashboard-panel glass-card w-350">
                  <h3>Academic Scope Summary</h3>
                  <div className="academic-list-summary">
                    <div className="summary-item">
                      <span>Total Classrooms</span>
                      <strong>{db.classrooms.length}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Total Syllabus Modules</span>
                      <strong>{totalModules}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Draft Modules</span>
                      <strong>{db.modules.filter(m => m.visibility === 'draft').length}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Scheduled Lectures</span>
                      <strong>{db.lectures.length}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: LEADS PIPELINE */}
          {activeTab === 'leads' && (
            <div className="admin-tab-pane">
              <div className="leads-layout-split">
                
                {/* Leads List Table */}
                <div className="panel-table-container flex-1 glass-card">
                  <div className="panel-header">
                    <h3>Registered Lead Inquiries</h3>
                    
                    <div className="table-filters">
                      <select value={leadStatusFilter} onChange={(e) => setLeadStatusFilter(e.target.value)}>
                        <option value="">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="interested">Interested</option>
                        <option value="converted">Converted</option>
                        <option value="not-interested">Not Interested</option>
                      </select>
                      
                      <select value={leadModuleFilter} onChange={(e) => setLeadModuleFilter(e.target.value)}>
                        <option value="">All Modules</option>
                        {db.modules.map(m => (
                          <option key={m.id} value={m.id}>{m.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Interested In</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {db.leads
                        .filter(l => {
                          const matchesStatus = leadStatusFilter === '' || l.status === leadStatusFilter;
                          const matchesModule = leadModuleFilter === '' || l.moduleId === leadModuleFilter;
                          return matchesStatus && matchesModule;
                        })
                        .map(lead => {
                          const targetMod = db.modules.find(m => m.id === lead.moduleId);
                          return (
                            <tr key={lead.id} className={lead.status === 'new' ? 'row-unread' : ''}>
                              <td>{new Date(lead.createdDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</td>
                              <td>
                                <strong>{lead.name}</strong>
                                <span className="subtext">{lead.occupation}</span>
                              </td>
                              <td>{lead.mobile}</td>
                              <td>{lead.email}</td>
                              <td>{targetMod ? targetMod.title.substring(0, 25) + '...' : 'General Site Inquiry'}</td>
                              <td>
                                <span className={`status-badge badge-${lead.status}`}>
                                  {lead.status}
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-secondary" onClick={() => setSelectedLead(lead)}>
                                  Manage Details
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      }
                      {db.leads.length === 0 && (
                        <tr>
                          <td colSpan="7" className="center">No lead submissions recorded yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Lead Detail Panel (Right Sidebar) */}
                {selectedLead && (
                  <div className="lead-detail-panel glass-card w-400">
                    <div className="panel-header border-bottom">
                      <h3>Inquiry Inspector</h3>
                      <button className="btn-close" onClick={() => setSelectedLead(null)}>✕</button>
                    </div>
                    
                    <div className="lead-detail-body">
                      <div className="meta-group">
                        <label>Student Name</label>
                        <p className="large-text">{selectedLead.name}</p>
                        <span>{selectedLead.occupation}</span>
                      </div>

                      <div className="contact-details-grid">
                        <div>
                          <label>Phone / Mobile</label>
                          <p>{selectedLead.mobile}</p>
                        </div>
                        <div>
                          <label>Email Address</label>
                          <p>{selectedLead.email}</p>
                        </div>
                      </div>

                      <hr className="divider" />

                      <div className="meta-group">
                        <label>Source Page Metadata</label>
                        <p className="code-text">{selectedLead.sourcePage}</p>
                      </div>

                      {/* Lead status modifier forms */}
                      <div className="form-group mt-3">
                        <label htmlFor="lead-pipeline-status">Current Status</label>
                        <select 
                          id="lead-pipeline-status"
                          value={selectedLead.status}
                          onChange={(e) => handleUpdateLeadStatus(selectedLead.id, e.target.value, selectedLead.notes, selectedLead.assignedOwner)}
                        >
                          <option value="new">New Submission</option>
                          <option value="contacted">Contacted / Callback Completed</option>
                          <option value="interested">Interested / Follow-up Batch</option>
                          <option value="converted">Converted Enrollment</option>
                          <option value="not-interested">Not Interested</option>
                          <option value="duplicate">Duplicate Entry</option>
                          <option value="invalid">Invalid Details</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="lead-assignee">Assigned Counselor</label>
                        <input 
                          type="text" 
                          id="lead-assignee"
                          placeholder="e.g. Counselor Vikram"
                          value={selectedLead.assignedOwner}
                          onChange={(e) => handleUpdateLeadStatus(selectedLead.id, selectedLead.status, selectedLead.notes, e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lead-internal-notes">Interaction Notes</label>
                        <textarea 
                          id="lead-internal-notes"
                          rows="4"
                          placeholder="Log discussion notes, next steps or preferred batch timings..."
                          value={selectedLead.notes}
                          onChange={(e) => handleUpdateLeadStatus(selectedLead.id, selectedLead.status, e.target.value, selectedLead.assignedOwner)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: CLASSROOM HUB */}
          {activeTab === 'classrooms' && (
            <div className="admin-tab-pane">
              <div className="pane-action-bar">
                <h3>Academic Containers (Classrooms)</h3>
                {!creatingClassroom && (
                  <button className="btn btn-primary" onClick={() => {
                    setEditingClassroom(null);
                    setClassroomForm({ name: '', description: '', subject: '', level: '', language: '', status: 'active', visibility: 'public' });
                    setCreatingClassroom(true);
                  }}>
                    <Icons.Plus size={16} className="icon-mr" /> Create New Classroom
                  </button>
                )}
              </div>

              <div className="classroom-editor-split">
                {/* Classroom Creation Panel */}
                {creatingClassroom && (
                  <div className="classroom-form-panel glass-card w-400">
                    <h3>{editingClassroom ? 'Edit Classroom' : 'Create New Classroom'}</h3>
                    
                    <form onSubmit={handleSaveClassroom}>
                      <div className="form-group">
                        <label htmlFor="class-name">Classroom Name</label>
                        <input 
                          type="text" 
                          id="class-name" 
                          placeholder="e.g. Career Readiness Cohort" 
                          required 
                          value={classroomForm.name}
                          onChange={(e) => setClassroomForm({ ...classroomForm, name: e.target.value })}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="class-desc">Description</label>
                        <textarea 
                          id="class-desc" 
                          rows="3" 
                          placeholder="Describe the structural cohort target..."
                          required
                          value={classroomForm.description}
                          onChange={(e) => setClassroomForm({ ...classroomForm, description: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="class-subject">Subject/Category</label>
                          <input 
                            type="text" 
                            id="class-subject" 
                            placeholder="e.g. Career Prep" 
                            required
                            value={classroomForm.subject}
                            onChange={(e) => setClassroomForm({ ...classroomForm, subject: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="class-level">Target Level</label>
                          <input 
                            type="text" 
                            id="class-level" 
                            placeholder="e.g. Advanced" 
                            required
                            value={classroomForm.level}
                            onChange={(e) => setClassroomForm({ ...classroomForm, level: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="class-lang">Medium Language</label>
                          <input 
                            type="text" 
                            id="class-lang" 
                            placeholder="e.g. Data Analytics" 
                            required
                            value={classroomForm.language}
                            onChange={(e) => setClassroomForm({ ...classroomForm, language: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="class-status">Status</label>
                          <select 
                            id="class-status"
                            value={classroomForm.status}
                            onChange={(e) => setClassroomForm({ ...classroomForm, status: e.target.value })}
                          >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </div>

                      <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => setCreatingClassroom(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save Classroom
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Classrooms Grid List */}
                <div className="classrooms-list-grid flex-1">
                  {db.classrooms.map(c => (
                    <div className={`classroom-panel-card glass-card ${c.status === 'archived' ? 'archived' : ''}`} key={c.id}>
                      <div className="card-header border-bottom">
                        <div>
                          <span className={`status-badge badge-${c.status}`}>{c.status}</span>
                          <h4>{c.name}</h4>
                        </div>
                        <button className="btn btn-sm btn-secondary" onClick={() => handleEditClassroomClick(c)}>
                          <Icons.Edit size={14} />
                        </button>
                      </div>
                      
                      <div className="card-body">
                        <p>{c.description}</p>
                        
                        <div className="meta-items-flex">
                          <span>Subject: <strong>{c.subject}</strong></span>
                          <span>Level: <strong>{c.level}</strong></span>
                        </div>
                        
                        <div className="assigned-scopes">
                          <h5>Assigned Modules ({c.assignedModules.length}):</h5>
                          {c.assignedModules.length > 0 ? (
                            <div className="pills-flex">
                              {c.assignedModules.map(modId => (
                                <span className="assigned-pill" key={modId}>
                                  {db.modules.find(m => m.id === modId)?.title || modId}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="no-assignments">No learning modules assigned to this classroom yet.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MODULES & LECTURES CREATOR */}
          {activeTab === 'modules' && (
            <div className="admin-tab-pane">
              <div className="pane-action-bar">
                <h3>Syllabus Modules & Live Schedules</h3>
                {!creatingModule && !addingLectureToModule && (
                  <button className="btn btn-primary" onClick={() => {
                    setEditingModule(null);
                    setModuleForm({ title: '', shortDesc: '', longDesc: '', outcomes: '', tags: '', level: 'Beginner', language: 'English', duration: '', prerequisites: '', assignedClassrooms: [], assignedInstructors: [], visibility: 'draft' });
                    setCreatingModule(true);
                  }}>
                    <Icons.Plus size={16} className="icon-mr" /> Design New Module
                  </button>
                )}
              </div>

              {/* View layout */}
              <div className="modules-layout-grid">
                
                {/* Panel to Create/Edit Modules */}
                {creatingModule && (
                  <div className="module-creation-panel glass-card">
                    <h3>{editingModule ? 'Edit Academic Module' : 'Design New Academic Module'}</h3>
                    <form onSubmit={handleSaveModule} className="module-admin-form">
                      
                      <div className="form-group">
                        <label htmlFor="mod-title">Module Title</label>
                        <input 
                          type="text" 
                          id="mod-title" 
                          placeholder="e.g. SQL Analytics Foundation" 
                          required
                          value={moduleForm.title}
                          onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group flex-2">
                          <label htmlFor="mod-short-desc">Short Description (For listings card)</label>
                          <input 
                            type="text" 
                            id="mod-short-desc" 
                            placeholder="Brief 1-sentence value hook..." 
                            required
                            value={moduleForm.shortDesc}
                            onChange={(e) => setModuleForm({ ...moduleForm, shortDesc: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="mod-visibility">Visibility Status</label>
                          <select 
                            id="mod-visibility"
                            value={moduleForm.visibility}
                            onChange={(e) => setModuleForm({ ...moduleForm, visibility: e.target.value })}
                          >
                            <option value="draft">Draft (Admin Only)</option>
                            <option value="review">Under Contributor Review</option>
                            <option value="published">Published (Public Discovery)</option>
                            <option value="hidden">Hidden</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="mod-long-desc">Long Description (Detailed overview)</label>
                        <textarea 
                          id="mod-long-desc" 
                          rows="4" 
                          placeholder="Provide detailed breakdown on what this module is about..."
                          required
                          value={moduleForm.longDesc}
                          onChange={(e) => setModuleForm({ ...moduleForm, longDesc: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="mod-outcomes">Learning Outcomes (One per line)</label>
                          <textarea 
                            id="mod-outcomes" 
                            rows="4" 
                            placeholder="Outcome 1&#10;Outcome 2&#10;Outcome 3"
                            value={moduleForm.outcomes}
                            onChange={(e) => setModuleForm({ ...moduleForm, outcomes: e.target.value })}
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="mod-prereqs">Prerequisites / Requirements</label>
                          <textarea 
                            id="mod-prereqs" 
                            rows="4" 
                            placeholder="e.g. Basic conversational speed..."
                            value={moduleForm.prerequisites}
                            onChange={(e) => setModuleForm({ ...moduleForm, prerequisites: e.target.value })}
                          ></textarea>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="mod-tags">Expertise Tags (Comma separated)</label>
                          <input 
                            type="text" 
                            id="mod-tags" 
                            placeholder="e.g. SQL, Python, Machine Learning" 
                            value={moduleForm.tags}
                            onChange={(e) => setModuleForm({ ...moduleForm, tags: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="mod-level">Level</label>
                          <select 
                            id="mod-level"
                            value={moduleForm.level}
                            onChange={(e) => setModuleForm({ ...moduleForm, level: e.target.value })}
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="All Levels">All Levels</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="mod-duration">Duration Description</label>
                          <input 
                            type="text" 
                            id="mod-duration" 
                            placeholder="e.g. 3 Weeks (6 sessions)" 
                            required
                            value={moduleForm.duration}
                            onChange={(e) => setModuleForm({ ...moduleForm, duration: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Map Classrooms & Instructors */}
                      <div className="form-row mt-3 border-top pt-3">
                        <div className="form-group flex-1">
                          <label>Assign to Classroom(s):</label>
                          <div className="checkboxes-list">
                            {db.classrooms.map(c => (
                              <label key={c.id} className="checkbox-label">
                                <input 
                                  type="checkbox" 
                                  checked={moduleForm.assignedClassrooms.includes(c.id)}
                                  onChange={() => handleCheckboxChange('assignedClassrooms', c.id)}
                                />
                                <span>{c.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="form-group flex-1">
                          <label>Assign Instructor(s):</label>
                          <div className="checkboxes-list">
                            {db.instructors.map(inst => (
                              <label key={inst.id} className="checkbox-label">
                                <input 
                                  type="checkbox" 
                                  checked={moduleForm.assignedInstructors.includes(inst.id)}
                                  onChange={() => handleCheckboxChange('assignedInstructors', inst.id)}
                                />
                                <span>{inst.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="modal-actions border-top pt-3 mt-3">
                        <button type="button" className="btn btn-secondary" onClick={() => setCreatingModule(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save Academic Module
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Panel to Add Lecture Shell */}
                {addingLectureToModule && (
                  <div className="lecture-creation-panel glass-card w-500">
                    <h3>Create Lecture Shell under:</h3>
                    <p className="module-title-banner">{addingLectureToModule.title}</p>
                    
                    <form onSubmit={handleSaveLecture}>
                      <div className="form-group">
                        <label htmlFor="lect-title">Lecture Title</label>
                        <input 
                          type="text" 
                          id="lect-title" 
                          placeholder="e.g. STAR Storytelling Strategy Mock" 
                          required
                          value={lectureForm.title}
                          onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lect-desc">Description</label>
                        <textarea 
                          id="lect-desc" 
                          rows="2" 
                          placeholder="Brief expectations from the lecture session..."
                          required
                          value={lectureForm.description}
                          onChange={(e) => setLectureForm({ ...lectureForm, description: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="lect-agenda">Agenda / Bullet Checklist</label>
                        <textarea 
                          id="lect-agenda" 
                          rows="4" 
                          placeholder="1. Icebreaker&#10;2. Sample study&#10;3. Practice mocks"
                          value={lectureForm.agenda}
                          onChange={(e) => setLectureForm({ ...lectureForm, agenda: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="lect-format">Session Format</label>
                          <select 
                            id="lect-format"
                            value={lectureForm.format}
                            onChange={(e) => setLectureForm({ ...lectureForm, format: e.target.value })}
                          >
                            <option value="live">Live Streaming</option>
                            <option value="recorded">Recorded Playback</option>
                            <option value="hybrid">Hybrid</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="lect-duration">Duration</label>
                          <input 
                            type="text" 
                            id="lect-duration" 
                            placeholder="e.g. 90 Mins"
                            value={lectureForm.duration}
                            onChange={(e) => setLectureForm({ ...lectureForm, duration: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="lect-cap">Capacity</label>
                          <input 
                            type="number" 
                            id="lect-cap" 
                            placeholder="25"
                            value={lectureForm.capacity}
                            onChange={(e) => setLectureForm({ ...lectureForm, capacity: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="lect-date">Scheduled Date & Time</label>
                        <input 
                          type="datetime-local" 
                          id="lect-date" 
                          required
                          value={lectureForm.dateTime}
                          onChange={(e) => setLectureForm({ ...lectureForm, dateTime: e.target.value })}
                        />
                      </div>

                      <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => setAddingLectureToModule(null)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Publish Lecture Shell
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Modules & Sub-Lectures Listing */}
                <div className="admin-modules-list flex-1">
                  {db.modules.map(m => {
                    const linkedLectures = db.lectures.filter(l => l.moduleId === m.id);
                    return (
                      <div className="module-item-block glass-card" key={m.id}>
                        <div className="module-block-header border-bottom">
                          <div>
                            <span className={`status-badge badge-${m.visibility}`}>{m.visibility}</span>
                            <h4>{m.title}</h4>
                            <p className="subtext">{m.duration} | Taught by: {m.assignedInstructors.map(id => db.instructors.find(i => i.id === id)?.name).join(', ') || 'Unassigned'}</p>
                          </div>
                          <div className="actions">
                            <button className="btn btn-sm btn-secondary" onClick={() => handleEditModuleClick(m)}>
                              Edit Module Details
                            </button>
                            <button className="btn btn-sm btn-primary" onClick={() => setAddingLectureToModule(m)}>
                              <Icons.Plus size={14} className="icon-mr" /> Add Lecture
                            </button>
                          </div>
                        </div>

                        <div className="module-block-lectures">
                          <h5>Session Shells ({linkedLectures.length}):</h5>
                          {linkedLectures.length > 0 ? (
                            <div className="lectures-mini-table">
                              {linkedLectures.map((l, idx) => (
                                <div className="lecture-mini-row" key={l.id}>
                                  <span className="idx">Session {idx + 1}</span>
                                  <span className="title"><strong>{l.title}</strong></span>
                                  <span className="format-tag">{l.format}</span>
                                  <span className="date">{new Date(l.dateTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="no-items text-muted font-italic">No sessions drafted under this module shell. Add a lecture to populate schedules.</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          )}

          {/* TAB: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="admin-tab-pane">
              <div className="pane-action-bar">
                <h3>Student Testimonials Hub</h3>
                <button className="btn btn-primary" onClick={() => setShowAddTestimonialModal(true)}>
                  <Icons.Plus size={16} className="icon-mr" /> Add Manual Testimonial
                </button>
              </div>

              {/* Testimonials List */}
              <div className="panel-table-container glass-card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Author</th>
                      <th>Credentials / Role</th>
                      <th>Content Quotes</th>
                      <th>Associated Instructor</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db.testimonials.map(t => {
                      const inst = db.instructors.find(i => i.id === t.instructorId);
                      return (
                        <tr key={t.id}>
                          <td><strong>{t.author}</strong></td>
                          <td>{t.role}</td>
                          <td><p className="quote-snippet">"{t.text}"</p></td>
                          <td>{inst ? inst.name : 'General Platform'}</td>
                          <td>
                            <span className={`status-badge badge-${t.status}`}>
                              {t.status}
                            </span>
                          </td>
                          <td>
                            <div className="actions-flex">
                              {t.status !== 'approved' && (
                                <button className="btn btn-xs btn-green" onClick={() => {
                                  updateTestimonialStatus(t.id, 'approved');
                                  refreshDb();
                                }}>
                                  Approve
                                </button>
                              )}
                              {t.status !== 'hidden' && (
                                <button className="btn btn-xs btn-secondary" onClick={() => {
                                  updateTestimonialStatus(t.id, 'hidden');
                                  refreshDb();
                                }}>
                                  Hide
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Add testimonial modal */}
              {showAddTestimonialModal && (
                <div className="modal-backdrop">
                  <div className="modal-content glass-card w-500">
                    <button className="modal-close" onClick={() => setShowAddTestimonialModal(false)}>✕</button>
                    <h3>Add Manual Testimonial</h3>
                    
                    <form onSubmit={handleSaveTestimonial}>
                      <div className="form-group">
                        <label htmlFor="t-author">Author Name</label>
                        <input 
                          type="text" 
                          id="t-author" 
                          placeholder="e.g. Sneha Patel" 
                          required
                          value={testimonialForm.author}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="t-role">Role / Tagline</label>
                        <input 
                          type="text" 
                          id="t-role" 
                          placeholder="e.g. Software Engineer at Infosys" 
                          required
                          value={testimonialForm.role}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="t-instructor">Associate to Instructor</label>
                        <select 
                          id="t-instructor"
                          value={testimonialForm.instructorId}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, instructorId: e.target.value })}
                          required
                        >
                          <option value="">Select Instructor</option>
                          {db.instructors.map(i => (
                            <option key={i.id} value={i.id}>{i.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="t-module">Associate to Module</label>
                        <select 
                          id="t-module"
                          value={testimonialForm.moduleId}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, moduleId: e.target.value })}
                          required
                        >
                          <option value="">Select Module</option>
                          {db.modules.map(m => (
                            <option key={m.id} value={m.id}>{m.title}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="t-quote">Review Quote Text</label>
                        <textarea 
                          id="t-quote" 
                          rows="4" 
                          placeholder="Write the recommendation here..."
                          required
                          value={testimonialForm.text}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowAddTestimonialModal(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save Testimonial
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: ACCESS CONTROL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="admin-tab-pane">
              <div className="dashboard-panel glass-card max-600">
                <h3>Governance & Access Matrix</h3>
                <p className="subtitle">Configure role permissions and administrative guidelines for module contributions.</p>
                
                <hr className="divider" />
                
                <div className="settings-controls-block">
                  <div className="setting-toggle-row">
                    <div className="setting-label">
                      <strong>Instructor Lead Visibility</strong>
                      <p>If enabled, instructors can view incoming student leads corresponding to their assigned modules. Disabling restricts leads to Administrator console only.</p>
                    </div>
                    <button 
                      className={`btn btn-toggle ${db.leadsVisibleToInstructors ? 'on' : 'off'}`}
                      onClick={toggleLeadVisibilitySetting}
                    >
                      {db.leadsVisibleToInstructors ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>

                  <hr className="divider" />

                  <div className="permissions-matrix-preview">
                    <h4>Active Platform Permissions Matrix</h4>
                    <table className="matrix-table mt-2">
                      <thead>
                        <tr>
                          <th>Role Scope</th>
                          <th>Create Classrooms</th>
                          <th>Design Modules</th>
                          <th>Publish Public Pages</th>
                          <th>Edit Lecture Agendas</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Public Student</strong></td>
                          <td className="no">✕</td>
                          <td className="no">✕</td>
                          <td className="no">✕</td>
                          <td className="no">✕</td>
                        </tr>
                        <tr>
                          <td><strong>Instructor Profile</strong></td>
                          <td className="no">✕</td>
                          <td className="yes">✓ (Draft only)</td>
                          <td className="no">✕ (Requires admin)</td>
                          <td className="yes">✓ (Assigned only)</td>
                        </tr>
                        <tr>
                          <td><strong>Platform Admin</strong></td>
                          <td className="yes">✓ Full</td>
                          <td className="yes">✓ Full</td>
                          <td className="yes">✓ Full</td>
                          <td className="yes">✓ Full</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
