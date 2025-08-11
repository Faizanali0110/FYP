import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
 


export function DashboardHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="bg-card border-b border-app">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-[rgb(var(--secondary))] to-[rgb(var(--primary))] text-transparent bg-clip-text">
            AI-IDE
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/dashboard" active>
              Home
            </NavLink>
            <NavLink href="/dashboard/faculty">
              Faculty Prediction
            </NavLink>
            <NavLink href="/dashboard/tests">
              Test Generation
            </NavLink>
            <NavLink href="/dashboard/analysis">
              Code Analysis
            </NavLink>
          </nav>
          
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 text-app hover:opacity-80 focus:outline-none"
          >
            <FaUserCircle className="w-8 h-8" />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-app rounded-lg shadow-lg py-1">
              <a
                href="/dashboard/settings"
                className="flex items-center px-4 py-2 text-sm text-app hover:bg-muted"
              >
                <FaCog className="w-4 h-4 mr-2" />
                Settings
              </a>
              <button
                onClick={handleLogout}
                
                className="w-full flex items-center px-4 py-2 text-sm text-app hover:bg-muted"
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, active, children }) {
  return (
    <a
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? 'text-secondary'
          : 'text-muted-foreground hover:text-app hover:bg-muted'
      }`}
    >
      {children}
    </a>
  );
}

export default DashboardHeader;
