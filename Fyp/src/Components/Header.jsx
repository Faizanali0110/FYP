import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import logo from "../assets/file.svg";
export default function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-card border-b border-app sticky top-0 z-40 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="AI-IDE logo" className="w-30 h-30" />
              <span className="text-xl font-bold bg-gradient-to-r from-[rgb(var(--secondary))] to-[rgb(var(--primary))] text-transparent bg-clip-text">
                AI-IDE
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-app transition-colors"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-sm text-muted-foreground hover:text-app transition-colors"
            >
              Features
            </Link>
            <Link
              to="/about"
              className="text-sm text-muted-foreground hover:text-app transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm text-muted-foreground hover:text-app transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-app bg-input hover:bg-muted transition-colors"
            >
              {darkMode ? (
                <FaSun className="w-4 h-4 text-app" />
              ) : (
                <FaMoon className="w-4 h-4 text-app" />
              )}
            </button>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-app bg-input hover:bg-muted transition-colors"
            >
              {darkMode ? (
                <FaSun className="w-4 h-4 text-app" />
              ) : (
                <FaMoon className="w-4 h-4 text-app" />
              )}
            </button>
            <button
              aria-label="Toggle mobile menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-lg border border-app bg-input hover:bg-muted transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-app"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-app bg-card">
          <nav className="px-4 py-3 space-y-1">
            <Link
              to="/"
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-app hover:bg-muted"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-app hover:bg-muted"
            >
              Features
            </Link>
            <Link
              to="/about"
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-app hover:bg-muted"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-app hover:bg-muted"
            >
              Contact
            </Link>
            <div className="pt-2">
              <Link
                to="/login"
                className="block text-center rounded-lg px-3 py-2 bg-primary text-primary-foreground hover:opacity-90"
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
