import React from 'react';
import { Link } from 'react-router-dom';
import { FaBug, FaCode, FaVial, FaChartLine } from 'react-icons/fa';
import Header from '../Components/Header';

export const Home = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-app text-app">
        {/* Hero Section */}
        <div className="relative overflow-hidden" id="home">
          {/* decorative glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-[rgb(var(--secondary))] to-[rgb(var(--primary))] opacity-30 blur-3xl"></div>
          <div className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-gradient-to-tr from-[rgb(var(--primary))] to-[rgb(var(--secondary))] opacity-30 blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: headline */}
              <div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">AI analysis for developers</p>
                <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.08] mb-6">
                  <span className="block">AI-Powered IDE</span>
                  <span className="block">for
                    <span className="relative inline-flex mx-2">
                      <span className="relative z-10">Smarter Testing</span>
                      <span aria-hidden className="absolute inset-x-0 bottom-1 top-1/2 -z-10 rounded-full bg-gradient-to-r from-[rgb(var(--secondary))] to-[rgb(var(--primary))] blur-sm"></span>
                    </span>
                  </span>
                  <span className="block">&amp; Code Analysis</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                  Detect faults, generate test cases, and improve code quality using AI-driven analysis — all in one powerful IDE.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/signup"
                    className="bg-primary hover:opacity-90 text-primary-foreground font-semibold py-3 px-6 rounded-full transition duration-300"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="border border-app bg-card hover:bg-muted text-app font-semibold py-3 px-6 rounded-full transition duration-300"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
              {/* Right: visual preview */}
              <div className="relative">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-[rgb(var(--secondary))] to-[rgb(var(--primary))] opacity-25 blur-2xl"></div>
                <div className="relative rounded-2xl border border-app bg-card shadow-xl ring-1 ring-app p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="h-3 w-3 rounded-full bg-secondary"></span>
                    <span className="h-3 w-3 rounded-full bg-primary"></span>
                    <span className="h-3 w-3 rounded-full bg-input"></span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-5/6 rounded bg-input"></div>
                    <div className="h-3 w-3/4 rounded bg-gradient-to-r from-[rgb(var(--secondary))] to-[rgb(var(--primary))]"></div>
                    <div className="h-3 w-4/5 rounded bg-input"></div>
                    <div className="h-3 w-2/3 rounded bg-input"></div>
                    <div className="h-3 w-11/12 rounded bg-input"></div>
                    <div className="h-3 w-1/2 rounded bg-input"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaBug className="h-8 w-8 text-secondary" />}
              title="Fault Prediction"
              description="Find bugs before they happen using advanced AI analysis"
            />
            <FeatureCard
              icon={<FaVial className="h-8 w-8 text-secondary" />}
              title="Test Case Generation"
              description="Instantly create unit and integration tests automatically"
            />
            <FeatureCard
              icon={<FaCode className="h-8 w-8 text-secondary" />}
              title="Code Smell Detection"
              description="Identify and fix maintainability issues early"
            />
            <FeatureCard
              icon={<FaChartLine className="h-8 w-8 text-secondary" />}
              title="Confidence Score"
              description="See how sure AI is about its predictions"
            />
          </div>
        </div>

      {/* How It Works */}
      <div id="about" className="bg-muted py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[rgb(var(--secondary))] to-[rgb(var(--primary))] text-transparent bg-clip-text">How It Works</h2>
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
      <footer id="contact" className="bg-app py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-app">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-app">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Social</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-app">GitHub</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-app">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-app pt-8 text-center">
            <p className="text-muted-foreground">© 2025 AI-Powered IDE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  
    </>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-2xl bg-card border border-app hover:-translate-y-1 hover:shadow-lg transition duration-300 ring-1 ring-app">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="text-center">
    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
      <span className="text-xl font-bold">{number}</span>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);
