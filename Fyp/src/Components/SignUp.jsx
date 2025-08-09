import React, { useState } from 'react';
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { supabase } from '../config/supabase';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

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
  const [isAnimated, setIsAnimated] = useState(false);

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
      
      const { data, error } = await supabase.auth.signInWithOAuth({
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center ">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
          <p className="text-gray-600 mb-6">Please check your email to confirm your account.</p>
          <Link 
            to="/login" 
            className="inline-flex items-center text-blue-500 hover:text-blue-700 font-medium"
          >
            Go to Login <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>

    <Header/>
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`bg-[#1E293B] p-8 rounded-xl shadow-2xl max-w-md w-full ${isAnimated ? 'animate-spin' : ''}`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-transparent bg-clip-text mb-2">Create an account</h1>
          <p className="text-gray-400">Join us today and get started</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#0F172A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent text-white placeholder-gray-400"
              required
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#0F172A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent text-white placeholder-gray-400"
              required
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#0F172A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent text-white placeholder-gray-400"
              required
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#0F172A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent text-white placeholder-gray-400"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : 'Create Account'}
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-[#0F172A] border border-gray-700 rounded-lg py-3 px-4 text-white font-medium hover:bg-[#1E293B] transition duration-200"
          >
            <FaGoogle className="h-5 w-5 text-blue-500" />
            Sign up with Google
          </button>
          
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium" onClick={(e) => {
              e.preventDefault();
              setIsAnimated(true);
              setTimeout(() => navigate('/login'), 600);
            }}>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
}