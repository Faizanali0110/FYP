import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

export function DashboardHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    // Add logout logic here
  };

  return (
    <header className="bg-[#1E293B] border-b border-gray-700">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-transparent bg-clip-text">
            AI-IDE
          </span>
        </Link>

        {/* Navigation */}
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

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
          >
            <FaUserCircle className="w-8 h-8" />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1E293B] border border-gray-700 rounded-lg shadow-lg py-1">
              <a
                href="/dashboard/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#0F172A] hover:text-white"
              >
                <FaCog className="w-4 h-4 mr-2" />
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#0F172A] hover:text-white"
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
          ? 'text-[#22D3EE]'
          : 'text-gray-300 hover:text-white hover:bg-[#0F172A]'
      }`}
    >
      {children}
    </a>
  );
}

export default DashboardHeader;
