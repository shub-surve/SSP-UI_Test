import { useState, useEffect } from 'react';
import { getDb, updateInstructorProfile, updateLecture } from '../db';
import * as Icons from '../components/Icons';

export default function InstructorDashboard({ instructorId }) {
  const [db, setDb] = useState(getDb());
  const [activeTab, setActiveTab] = useState('profile'); // profile, classrooms, modules, lectures, leads
  
  // Active instructor data
  const instructor = db.instructors.find(i => i.id === instructorId);

  // Form states
  const [profileForm, setProfileForm] = useState({ title: '', bio: '', experience: '', pricing: '', tags: '', credentials: '', linkedin: '', instagram: '', whatsapp: '' });
  const [editingLecture, setEditingLecture] = useState(null);
  const [lectureForm, setLectureForm] = useState({ description: '', agenda: '', teachingNotes: '', newResourceName: '', newResourceUrl: '' });

  // Status flags
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load profile values on instructor change or initial load
  useEffect(() => {
    if (instructor) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfileForm({
        title: instructor.title,
        bio: instructor.bio,
        experience: instructor.experience,
        pricing: instructor.pricing || '',
        tags: instructor.tags.join(', '),
        credentials: instructor.credentials.join('\n'),
        linkedin: instructor.social?.linkedin || '',
        instagram: instructor.social?.instagram || '',
        whatsapp: instructor.social?.whatsapp || ''
      });
    }
  }, [instructor, instructorId, db]);

  // Sync DB Helper
  const refreshDb = () => {
    setDb(getDb());
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateInstructorProfile(instructorId, {
      title: profileForm.title,
      bio: profileForm.bio,
      experience: profileForm.experience,
      pricing: profileForm.pricing,
      tags: profileForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      credentials: profileForm.credentials.split('\n').filter(Boolean),
      social: {
        linkedin: profileForm.linkedin,
        instagram: profileForm.instagram,
        whatsapp: profileForm.whatsapp
      }
    });
    setSaveSuccess(true);
    refreshDb();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Edit Lecture Content & Resources
  const handleEditLectureClick = (lecture) => {
    setEditingLecture(lecture);
    setLectureForm({
      description: lecture.description,
      agenda: lecture.agenda || '',
      teachingNotes: lecture.teachingNotes || '',
      newResourceName: '',
      newResourceUrl: ''
    });
  };

  const handleSaveLectureEdits = (e) => {
    e.preventDefault();
    const updatedResources = [...(editingLecture.resources || [])];
    if (lectureForm.newResourceName && lectureForm.newResourceUrl) {
      updatedResources.push({
        name: lectureForm.newResourceName,
        url: lectureForm.newResourceUrl
      });
    }

    updateLecture(editingLecture.id, {
      description: lectureForm.description,
      agenda: lectureForm.agenda,
      teachingNotes: lectureForm.teachingNotes,
      resources: updatedResources
    });

    setEditingLecture(null);
    refreshDb();
  };

  const handleRemoveResource = (lectureObj, indexToRemove) => {
    const updatedResources = lectureObj.resources.filter((_, idx) => idx !== indexToRemove);
    updateLecture(lectureObj.id, { resources: updatedResources });
    setEditingLecture(prev => ({ ...prev, resources: updatedResources }));
    refreshDb();
  };

  // Scoped assignments
  if (!instructor) {
    return <div className="instructor-error">Instructor account not found in database.</div>;
  }

  const assignedClassrooms = db.classrooms.filter(c => c.assignedInstructors.includes(instructorId));
  const assignedModules = db.modules.filter(m => m.assignedInstructors.includes(instructorId));
  const assignedLectures = db.lectures.filter(l => l.instructorId === instructorId);
  
  // Filter leads relating strictly to this instructor's modules
  const assignedModuleIds = assignedModules.map(m => m.id);
  const instructorLeads = db.leads.filter(l => assignedModuleIds.includes(l.moduleId));

  return (
    <div className="admin-dashboard-wrapper">
      {/* Instructor Sidebar */}
      <aside className="admin-sidebar instructor-theme">
        <div className="sidebar-brand">
          <div className="instructor-badge-avatar">
            <img src={instructor.photo} alt={instructor.name} />
          </div>
          <h2>{instructor.name.split(' ')[0]} Hub</h2>
          <span className="instructor-title-sub">Contributor View</span>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`sidebar-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <Icons.User size={18} />
            <span>My Profile Portfolio</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'classrooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('classrooms')}
          >
            <Icons.BookOpen size={18} />
            <span>My Classrooms</span>
            <span className="badge-count">{assignedClassrooms.length}</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => setActiveTab('modules')}
          >
            <Icons.Calendar size={18} />
            <span>Assigned Modules</span>
            <span className="badge-count">{assignedModules.length}</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'lectures' ? 'active' : ''}`}
            onClick={() => setActiveTab('lectures')}
          >
            <Icons.Clock size={18} />
            <span>My Lectures</span>
            <span className="badge-count">{assignedLectures.length}</span>
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            <Icons.Users size={18} />
            <span>My Leads</span>
            {db.leadsVisibleToInstructors && instructorLeads.length > 0 && (
              <span className="badge-alert">{instructorLeads.filter(l => l.status === 'new').length}</span>
            )}
          </button>
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="admin-main">
        <header className="admin-header-bar">
          <h3>Contributor Panel &mdash; {instructor.name}</h3>
          <div className="instructor-header-meta">
            <span className="live-status-pill"><span className="pulse-dot"></span>Active Session</span>
          </div>
        </header>

        <div className="admin-workspace-content">
          
          {/* TAB: PROFILE PORTFOLIO EDIT */}
          {activeTab === 'profile' && (
            <div className="admin-tab-pane max-800">
              <div className="dashboard-panel glass-card">
                <div className="panel-header border-bottom">
                  <h3>Edit Public Portfolio Page</h3>
                  <p className="subtitle">Changes saved here will propagate instantly to your public profile portfolio (/instructor/{instructor.slug}).</p>
                </div>

                <form onSubmit={handleProfileSave} className="instructor-profile-form mt-3">
                  {saveSuccess && (
                    <div className="alert alert-success">
                      ✓ Profile details saved and updated successfully.
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="inst-title">Professional Title / Headline</label>
                    <input 
                      type="text" 
                      id="inst-title" 
                      required 
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="inst-exp">Total Experience (Years)</label>
                      <input 
                        type="text" 
                        id="inst-exp" 
                        required 
                        value={profileForm.experience}
                        onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inst-price">Starting Module Price (Optional)</label>
                      <input 
                        type="text" 
                        id="inst-price" 
                        placeholder="e.g. ₹1,499 / Module"
                        value={profileForm.pricing}
                        onChange={(e) => setProfileForm({ ...profileForm, pricing: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inst-bio">Biography (About Me)</label>
                    <textarea 
                      id="inst-bio" 
                      rows="6" 
                      required
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inst-tags">Expertise tags (Comma separated)</label>
                    <input 
                      type="text" 
                      id="inst-tags" 
                      required
                      value={profileForm.tags}
                      onChange={(e) => setProfileForm({ ...profileForm, tags: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inst-creds">Degrees & Certifications (One per line)</label>
                    <textarea 
                      id="inst-creds" 
                      rows="4" 
                      required
                      placeholder="e.g. M.Sc. Data Science - Delhi University"
                      value={profileForm.credentials}
                      onChange={(e) => setProfileForm({ ...profileForm, credentials: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-header mt-4">
                    <h4>Social & Contact Links</h4>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="inst-li">LinkedIn Profile URL</label>
                      <input 
                        type="url" 
                        id="inst-li" 
                        placeholder="https://linkedin.com/..."
                        value={profileForm.linkedin}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inst-ig">Instagram Profile URL</label>
                      <input 
                        type="url" 
                        id="inst-ig" 
                        placeholder="https://instagram.com/..."
                        value={profileForm.instagram}
                        onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inst-wa">WhatsApp Contact API</label>
                      <input 
                        type="url" 
                        id="inst-wa" 
                        placeholder="https://wa.me/..."
                        value={profileForm.whatsapp}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-actions mt-4">
                    <button type="submit" className="btn btn-primary">
                      Update Portfolio Page
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB: MY CLASSROOMS (READ ONLY) */}
          {activeTab === 'classrooms' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h3>My Assigned Classrooms</h3>
                <p className="subtitle">These are the administrative learning containers and student cohorts you have been assigned to cover.</p>
              </div>

              <div className="classrooms-list-grid mt-3">
                {assignedClassrooms.map(c => (
                  <div className="classroom-panel-card glass-card" key={c.id}>
                    <div className="card-header border-bottom">
                      <h4>{c.name}</h4>
                      <span className="classroom-subject-tag">{c.subject}</span>
                    </div>
                    <div className="card-body">
                      <p>{c.description}</p>
                      <div className="meta-items-flex">
                        <span>Medium: <strong>{c.language}</strong></span>
                        <span>Level: <strong>{c.level}</strong></span>
                      </div>
                      
                      <div className="assigned-scopes">
                        <h5>Assigned Modules:</h5>
                        <div className="pills-flex">
                          {c.assignedModules
                            .filter(mId => assignedModuleIds.includes(mId))
                            .map(mId => (
                              <span className="assigned-pill highlight" key={mId}>
                                {db.modules.find(m => m.id === mId)?.title || mId}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {assignedClassrooms.length === 0 && (
                  <p className="no-items">You are not currently assigned to teach in any classrooms.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB: ASSIGNED MODULES */}
          {activeTab === 'modules' && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <h3>Assigned Syllabus Modules</h3>
                <p className="subtitle">Academic outlines you teach. You can suggest module descriptions, outcomes, and view sub-lectures.</p>
              </div>

              <div className="modules-list-container mt-3">
                {assignedModules.map(m => {
                  const moduleLectures = db.lectures.filter(l => l.moduleId === m.id);
                  return (
                    <div className="module-item-block glass-card" key={m.id}>
                      <div className="module-block-header border-bottom">
                        <div>
                          <span className={`status-badge badge-${m.visibility}`}>{m.visibility}</span>
                          <h4>{m.title}</h4>
                          <p className="subtext">{m.duration} | Target: {m.level}</p>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="info-section">
                          <h5>Module Short Summary</h5>
                          <p>{m.shortDesc}</p>
                        </div>
                        <div className="info-section">
                          <h5>Detailed Description</h5>
                          <p>{m.longDesc}</p>
                        </div>

                        <div className="module-block-lectures mt-3">
                          <h5>Drafted Session Shells ({moduleLectures.length})</h5>
                          <table className="mini-lectures-table mt-1">
                            <thead>
                              <tr>
                                <th>Session</th>
                                <th>Lecture Title</th>
                                <th>Format</th>
                                <th>Date / Time</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {moduleLectures.map((l, idx) => (
                                <tr key={l.id}>
                                  <td>Session {idx + 1}</td>
                                  <td><strong>{l.title}</strong></td>
                                  <td><span className="format-tag">{l.format}</span></td>
                                  <td>{new Date(l.dateTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</td>
                                  <td>
                                    <button className="btn btn-xs btn-secondary" onClick={() => {
                                      handleEditLectureClick(l);
                                      setActiveTab('lectures');
                                    }}>
                                      Edit Content & Resource
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {assignedModules.length === 0 && (
                  <p className="no-items">You are not currently assigned to any module syllabi.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB: MY LECTURES (EDIT AGENDAS & UPLOAD RESOURCES) */}
          {activeTab === 'lectures' && (
            <div className="admin-tab-pane">
              <div className="leads-layout-split">
                
                {/* Lectures List */}
                <div className="panel-table-container flex-1 glass-card">
                  <div className="panel-header">
                    <h3>My Live & Scheduled Lectures</h3>
                    <p className="subtitle">Select a session shell below to write agendas, class notes, and upload student files.</p>
                  </div>
                  
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Module</th>
                        <th>Lecture Session</th>
                        <th>Format</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedLectures.map(l => {
                        const mObj = db.modules.find(mod => mod.id === l.moduleId);
                        return (
                          <tr key={l.id} className={editingLecture && editingLecture.id === l.id ? 'row-editing' : ''}>
                            <td>{mObj ? mObj.title.substring(0, 20) + '...' : l.moduleId}</td>
                            <td>
                              <strong>{l.title}</strong>
                              <span className="subtext">{l.resources?.length || 0} files uploaded</span>
                            </td>
                            <td><span className="format-tag">{l.format}</span></td>
                            <td>{new Date(l.dateTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</td>
                            <td><span className={`status-badge badge-${l.status}`}>{l.status}</span></td>
                            <td>
                              <button className="btn btn-sm btn-secondary" onClick={() => handleEditLectureClick(l)}>
                                Edit Session
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {assignedLectures.length === 0 && (
                        <tr>
                          <td colSpan="6" className="center">No lecture shells assigned to your schedule yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Lecture Content Editor */}
                {editingLecture && (
                  <div className="lead-detail-panel glass-card w-450">
                    <div className="panel-header border-bottom">
                      <div>
                        <h3>Syllabus Session Editor</h3>
                        <span className="lecture-title-tag">{editingLecture.title}</span>
                      </div>
                      <button className="btn-close" onClick={() => setEditingLecture(null)}>✕</button>
                    </div>

                    <form onSubmit={handleSaveLectureEdits} className="lead-detail-body">
                      
                      <div className="form-group">
                        <label htmlFor="lect-ed-desc">Lecture Description</label>
                        <textarea 
                          id="lect-ed-desc"
                          rows="2"
                          required
                          value={lectureForm.description}
                          onChange={(e) => setLectureForm({ ...lectureForm, description: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="lect-ed-agenda">Session Lecture Agenda (One item per line)</label>
                        <textarea 
                          id="lect-ed-agenda"
                          rows="4"
                          placeholder="e.g. 1. Introduction&#10;2. STAR methodology drills"
                          value={lectureForm.agenda}
                          onChange={(e) => setLectureForm({ ...lectureForm, agenda: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="lect-ed-notes">Instructor Private Teaching Notes</label>
                        <textarea 
                          id="lect-ed-notes"
                          rows="3"
                          placeholder="Internal guidance notes (visible only to you and admins)..."
                          value={lectureForm.teachingNotes}
                          onChange={(e) => setLectureForm({ ...lectureForm, teachingNotes: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="resource-management-box mt-3 border-top pt-3">
                        <h4>Classroom Resource Files</h4>
                        
                        {/* List existing resources */}
                        {editingLecture.resources && editingLecture.resources.length > 0 ? (
                          <div className="resources-list-edit-mode">
                            {editingLecture.resources.map((res, rIdx) => (
                              <div className="resource-edit-row" key={rIdx}>
                                <span>{res.name}</span>
                                <button 
                                  type="button" 
                                  className="btn-remove-res"
                                  onClick={() => handleRemoveResource(editingLecture, rIdx)}
                                >
                                  Delete File
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="no-items text-muted font-italic text-sm">No handouts attached to this lecture yet.</p>
                        )}

                        {/* Add new mock resource */}
                        <div className="add-resource-subform mt-2 border-top pt-2">
                          <label className="text-sm font-semibold">Upload Handout Worksheet / PDF:</label>
                          <div className="form-row mt-1">
                            <input 
                              type="text" 
                              placeholder="Resource Title (e.g. STAR Slides)"
                              value={lectureForm.newResourceName}
                              onChange={(e) => setLectureForm({ ...lectureForm, newResourceName: e.target.value })}
                            />
                            <input 
                              type="text" 
                              placeholder="Mock URL (e.g. slides.pdf)"
                              value={lectureForm.newResourceUrl}
                              onChange={(e) => setLectureForm({ ...lectureForm, newResourceUrl: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="modal-actions border-top pt-3 mt-3">
                        <button type="button" className="btn btn-secondary" onClick={() => setEditingLecture(null)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save Lecture Changes
                        </button>
                      </div>

                    </form>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: MY LEADS (PERMISSION SCIENTIFICALLY CHECKED) */}
          {activeTab === 'leads' && (
            <div className="admin-tab-pane">
              
              {!db.leadsVisibleToInstructors ? (
                <div className="access-denied-panel glass-card">
                  <Icons.ShieldAlert size={48} className="text-red" />
                  <h3>Lead Access Restricted</h3>
                  <p>Incoming student leads are set to Administrator view only. The platform administrator has disabled instructor lead visibility settings for this cohort.</p>
                  <p className="hint text-muted">To test this permission, toggle the **"Instructor Lead Visibility"** button inside the **Access Control** tab under the **Platform Admin** role.</p>
                </div>
              ) : (
                <div className="panel-table-container glass-card">
                  <div className="panel-header">
                    <h3>My Course Leads</h3>
                    <p className="subtitle">Students registering interest specifically for modules you are assigned to teach.</p>
                  </div>

                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date Registered</th>
                        <th>Student Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Target Module</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instructorLeads.map(lead => {
                        const targetMod = db.modules.find(m => m.id === lead.moduleId);
                        return (
                          <tr key={lead.id}>
                            <td>{new Date(lead.createdDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</td>
                            <td>
                              <strong>{lead.name}</strong>
                              <span className="subtext">{lead.occupation}</span>
                            </td>
                            <td>{lead.mobile}</td>
                            <td>{lead.email}</td>
                            <td>{targetMod ? targetMod.title : lead.moduleId}</td>
                            <td>
                              <span className={`status-badge badge-${lead.status}`}>
                                {lead.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                      {instructorLeads.length === 0 && (
                        <tr>
                          <td colSpan="6" className="center">No inquiries logged for your modules yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
