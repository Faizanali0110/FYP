import React, { useState } from "react";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { supabase } from "../config/supabase";
import { Link, useNavigate } from "react-router-dom";
import file from "../assets/file.svg";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      setError(error.message || "Error logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          scopes: "profile email",
        },
      });
      if (error) throw error;

      // Note: The actual user data will be available after the OAuth redirect
      // The profile image will be handled in the Dashboard component
    } catch (error) {
      console.error("Google login error:", error);
      setError(error.message || "Error logging in with Google");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-app text-app grid lg:grid-cols-2">
        {/* Left gradient welcome panel */}
        <div className="relative hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--secondary))] to-[rgb(var(--primary))]" />
          <div className="relative z-10 flex flex-col justify-between w-full p-12">
            <div className="flex items-center gap-3">
              <img src={file} alt="Logo" className="w-12 h-12" />
              <span className="text-2xl font-semibold text-white">
                Unit &Integration Copilot
              </span>
            </div>
            <div className="mx-auto text-center max-w-md">
              <h2 className="text-white text-3xl font-bold mb-2">Welcome to</h2>
              <p className="text-white/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
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
              <h1 className="text-3xl font-bold text-app">
                Sign in to your account
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
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
                  <FaLock className="h-5 w-5 text-gray-400" />
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

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-full transition duration-200 hover:opacity-90 focus:outline-none focus:ring-2 ring-app"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAnimated(true);
                    setTimeout(() => navigate("/signup"), 300);
                  }}
                  className="flex-1 border border-app text-muted-foreground py-3 px-4 rounded-full hover:bg-muted transition"
                >
                  Sign Up
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-app"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-app text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-input border border-app rounded-lg py-3 px-4 text-app font-medium hover:bg-muted transition-colors"
              >
                <FaGoogle className="h-5 w-5 text-secondary" />
                Sign in with Google
              </button>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-secondary hover:opacity-90"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAnimated(true);
                    setTimeout(() => navigate("/signup"), 300);
                  }}
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
