import React, { useState } from 'react';
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { supabase } from '../config/supabase';
import { Link, useNavigate } from 'react-router-dom';
import file from '../assets/file.svg';

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [, setIsAnimated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          }
        }
      });
      
      if (error) throw error;
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError(error.message || 'Error signing up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/login`,
          skipBrowserRedirect: false,
        }
      });

      if (error) throw error;
      
      // Google OAuth will handle the redirect automatically
      // No need to set success state here as the page will redirect
      
    } catch (error) {
      console.error('Google Sign up error:', error);
      setError(error.message || 'Error signing up with Google');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-app text-app flex items-center justify-center ">
        <div className="bg-card p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-app mb-2">Success!</h2>
          <p className="text-muted-foreground mb-6">Please check your email to confirm your account.</p>
          <Link 
            to="/login" 
            className="inline-flex items-center text-secondary hover:opacity-90 font-medium"
          >
            Go to Login <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-app text-app grid lg:grid-cols-2">
        {/* Left gradient welcome panel */}
        <div className="relative hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--secondary))] to-[rgb(var(--primary))]" />
          <div className="relative z-10 flex flex-col justify-between w-full p-12">
            <div className="flex items-center gap-3">
              <img src={file} alt="Logo" className="w-12 h-12" />
              <span className="text-2xl font-semibold text-white">Unit &Integration Copilot</span>
            </div>
            <div className="mx-auto text-center max-w-md">
              <h2 className="text-white text-3xl font-bold mb-2">Welcome to</h2>
              <p className="text-white/80">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="flex items-center justify-between text-xs text-white/80">
              <span>CREATED HERE</span>
              <span>DESIGNED HERE</span>
            </div>
          </div>
          {/* Soft decorative blobs */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-56 opacity-30">
            <div className="absolute right-0 top-1/4 h-48 w-48 rounded-full bg-white/30 blur-2xl" />
            <div className="absolute right-10 top-1/2 h-24 w-24 rounded-full bg-white/20 blur-xl" />
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-app">Create your account</h1>
            </div>

            <form onSubmit={handleSignUp} className="space-y-5">
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 mb-4 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-app focus:outline-none focus:border-[rgb(var(--secondary))] text-app placeholder-gray-500"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-app focus:outline-none focus:border-[rgb(var(--secondary))] text-app placeholder-gray-500"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-app focus:outline-none focus:border-[rgb(var(--secondary))] text-app placeholder-gray-500"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-app focus:outline-none focus:border-[rgb(var(--secondary))] text-app placeholder-gray-500"
                  required
                />
              </div>

              <div className="flex items-start gap-3 text-sm">
                <input id="terms" type="checkbox" className="mt-1 h-4 w-4 rounded border-app bg-input text-primary focus:ring-2 ring-app" required />
                <label htmlFor="terms" className="text-muted-foreground">
                  By Signing Up I Agree with <a className="text-secondary hover:opacity-90" href="#">Terms & Conditions</a>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-full transition duration-200 hover:opacity-90 focus:outline-none focus:ring-2 ring-app"
                >
                  {loading ? 'Creating...' : 'Sign Up'}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAnimated(true);
                    setTimeout(() => navigate('/login'), 300);
                  }}
                  className="flex-1 border border-app text-muted-foreground py-3 px-4 rounded-full hover:bg-muted transition"
                >
                  Sign In
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-app"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-app text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <button
                onClick={handleGoogleSignUp}
                disabled={loading}
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-input border border-app rounded-lg py-3 px-4 text-app font-medium hover:bg-muted transition"
              >
                <FaGoogle className="h-5 w-5 text-secondary" />
                Sign up with Google
              </button>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-secondary hover:opacity-90 font-medium" onClick={(e) => {
                  e.preventDefault();
                  setIsAnimated(true);
                  setTimeout(() => navigate('/login'), 300);
                }}>
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
