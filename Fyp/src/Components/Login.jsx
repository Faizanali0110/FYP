import React, { useState } from 'react';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { supabase } from '../config/supabase';
import { Link, useNavigate } from 'react-router-dom';
import Header from "./Header";

export function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAnimated, setIsAnimated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            
            if (error) throw error;
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            setError(error.message || 'Error logging in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/dashboard`
                }
            });

            if (error) throw error;
            
        } catch (error) {
            console.error('Google login error:', error);
            setError(error.message || 'Error logging in with Google');
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#0F172A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className={`bg-[#1E293B] p-8 rounded-xl shadow-2xl max-w-md w-full space-y-8 ${isAnimated ? 'animate-spin' : ''}`}>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-transparent bg-clip-text">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-gray-400">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                        {error && (
                            <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
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
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#6366F1] focus:ring-[#6366F1] border-gray-700 rounded bg-[#0F172A]"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-[#22D3EE] hover:text-[#6366F1]">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#6366F1] hover:bg-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366F1] transition-colors"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </div>
                            ) : 'Sign in'}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#1E293B] text-gray-400">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            type="button"
                            className="w-full flex items-center justify-center gap-3 bg-[#0F172A] border border-gray-700 rounded-lg py-3 px-4 text-white font-medium hover:bg-[#1E293B] transition-colors"
                        >
                            <FaGoogle className="h-5 w-5 text-[#22D3EE]" />
                            Sign in with Google
                        </button>

                        <p className="text-center text-sm text-gray-400 mt-6">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="font-medium text-[#22D3EE] hover:text-[#6366F1]"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsAnimated(true);
                                    setTimeout(() => navigate('/signup'), 600);
                                }}
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}