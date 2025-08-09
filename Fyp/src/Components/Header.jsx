import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-[#0F172A] text-white shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-transparent bg-clip-text">
            AI-IDE
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className={`hover:text-[#22D3EE] transition-colors ${location.pathname === '/' ? 'text-[#22D3EE]' : ''}`}>
              Home
            </Link>
            <Link to="/features" className={`hover:text-[#22D3EE] transition-colors ${location.pathname === '/features' ? 'text-[#22D3EE]' : ''}`}>
              Features
            </Link>
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className={`hover:text-[#22D3EE] transition-colors ${location.pathname === '/login' ? 'text-[#22D3EE]' : ''}`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-[#6366F1] hover:bg-[#4F46E5] px-4 py-2 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? (
              <span className="text-2xl">&#x2715;</span>
            ) : (
              <span className="text-2xl">&#9776;</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1E293B] px-4 py-4 space-y-4">
          <Link to="/" className="block hover:text-[#22D3EE] transition-colors">Home</Link>
          <Link to="/features" className="block hover:text-[#22D3EE] transition-colors">Features</Link>
          <div className="pt-4 border-t border-gray-700">
            <Link to="/login" className="block hover:text-[#22D3EE] transition-colors mb-3">Login</Link>
            <Link to="/signup" className="block bg-[#6366F1] hover:bg-[#4F46E5] px-4 py-2 rounded-lg text-center transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
