import React from 'react';
import { Link } from 'react-router-dom';
import { FaBug, FaCode, FaVial, FaChartLine } from 'react-icons/fa';

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-transparent bg-clip-text">
              AI-Powered IDE for Smarter Testing & Code Analysis
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Detect faults, generate test cases, and improve code quality using AI-driven analysis — all in one powerful IDE.
            </p>
            <Link
              to="/signup"
              className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FaBug className="h-8 w-8 text-[#22D3EE]" />}
            title="Fault Prediction"
            description="Find bugs before they happen using advanced AI analysis"
          />
          <FeatureCard
            icon={<FaVial className="h-8 w-8 text-[#22D3EE]" />}
            title="Test Case Generation"
            description="Instantly create unit and integration tests automatically"
          />
          <FeatureCard
            icon={<FaCode className="h-8 w-8 text-[#22D3EE]" />}
            title="Code Smell Detection"
            description="Identify and fix maintainability issues early"
          />
          <FeatureCard
            icon={<FaChartLine className="h-8 w-8 text-[#22D3EE]" />}
            title="Confidence Score"
            description="See how sure AI is about its predictions"
          />
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-[#1E293B] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Upload Project"
              description="Upload or select your project folder to begin analysis"
            />
            <StepCard
              number="2"
              title="AI Analysis"
              description="Our AI scans and analyzes your codebase"
            />
            <StepCard
              number="3"
              title="Get Results"
              description="Receive predictions and generated test cases"
            />
            <StepCard
              number="4"
              title="Improve Code"
              description="Apply suggestions and export improved code"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0F172A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Social</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">GitHub</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© 2025 AI-Powered IDE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-lg bg-[#1E293B] transform hover:scale-105 transition duration-300">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="text-center">
    <div className="w-12 h-12 rounded-full bg-[#6366F1] flex items-center justify-center mx-auto mb-4">
      <span className="text-xl font-bold">{number}</span>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);
