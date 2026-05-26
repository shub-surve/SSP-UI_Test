import React from 'react';

export default function RoleSwitcher({ currentRole, onChangeRole }) {
  return (
    <div className="role-switcher-banner">
      <div className="role-switcher-container">
        <div className="role-switcher-brand">
          <span className="live-dot-pulse"></span>
          <strong>SSPlive</strong> Sandbox Mode
        </div>
        <div className="role-switcher-controls">
          <span className="role-label">Active Role:</span>
          <button 
            className={`role-btn ${currentRole === 'public' ? 'active' : ''}`}
            onClick={() => onChangeRole('public')}
          >
            Public Student
          </button>
          <button 
            className={`role-btn ${currentRole === 'admin' ? 'active' : ''}`}
            onClick={() => onChangeRole('admin')}
          >
            Platform Admin
          </button>
          <div className="role-dropdown-container">
            <button className={`role-btn dropdown-toggle ${currentRole.startsWith('instructor') ? 'active' : ''}`}>
              Instructor...
            </button>
            <div className="role-dropdown-menu">
              <button 
                className={`dropdown-item ${currentRole === 'instructor:priya-kapoor' ? 'active' : ''}`}
                onClick={() => onChangeRole('instructor:priya-kapoor')}
              >
                Priya Kapoor (Comms)
              </button>
              <button 
                className={`dropdown-item ${currentRole === 'instructor:ananya-rao' ? 'active' : ''}`}
                onClick={() => onChangeRole('instructor:ananya-rao')}
              >
                Dr. Ananya Rao (Career)
              </button>
              <button 
                className={`dropdown-item ${currentRole === 'instructor:rahul-mehta' ? 'active' : ''}`}
                onClick={() => onChangeRole('instructor:rahul-mehta')}
              >
                Rahul Mehta (Math)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
