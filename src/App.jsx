import { useState } from 'react';
import RoleSwitcher from './components/RoleSwitcher';
import PublicSite from './views/PublicSite';
import AdminDashboard from './views/AdminDashboard';
import InstructorDashboard from './views/InstructorDashboard';

export default function App() {
  // Sandbox role tracking state: 'public', 'admin', 'instructor:priya-kapoor', etc.
  const [role, setRole] = useState('public');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  return (
    <div className="ssp-app-root">
      {/* Floating Sandbox Utility switcher bar */}
      <RoleSwitcher currentRole={role} onChangeRole={handleRoleChange} />

      {/* Main View Router */}
      <div className="ssp-view-viewport">
        {role === 'public' && (
          <PublicSite />
        )}

        {role === 'admin' && (
          <AdminDashboard />
        )}

        {role.startsWith('instructor:') && (() => {
          const instructorId = role.split(':')[1];
          return (
            <InstructorDashboard instructorId={instructorId} key={instructorId} />
          );
        })()}
      </div>
    </div>
  );
}
