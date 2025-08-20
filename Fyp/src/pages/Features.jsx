import React from 'react';
import Header from '../Components/Header';
import { FaBug, FaCode, FaVial, FaChartLine, FaShieldAlt, FaRocket } from 'react-icons/fa';

export function Features() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-app text-app">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-[rgb(var(--secondary))] to-[rgb(var(--primary))] opacity-30 blur-3xl"></div>
          <div className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-gradient-to-tr from-[rgb(var(--primary))] to-[rgb(var(--secondary))] opacity-30 blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">What you get</p>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                  Powerful features for quality code
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  From fault prediction to test generation, our AI-powered IDE equips your team to ship faster and safer.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-[rgb(var(--secondary))] to-[rgb(var(--primary))] opacity-25 blur-2xl"></div>
                <UnsplashImage
                  query="dashboard,analytics,developer"
                  width={900}
                  height={600}
                  alt="Product features"
                  className="relative z-10 w-full h-[320px] md:h-[420px] object-cover rounded-2xl border border-app bg-card shadow-xl ring-1 ring-app"
                  sig={3}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <FeatureCard icon={<FaBug className="h-8 w-8 text-secondary" />} title="Fault Prediction" desc="Find bugs before they happen using advanced AI analysis." />
              <FeatureCard icon={<FaVial className="h-8 w-8 text-secondary" />} title="Test Generation" desc="Instantly generate unit and integration tests with best practices." />
              <FeatureCard icon={<FaCode className="h-8 w-8 text-secondary" />} title="Code Smell Detection" desc="Identify maintainability issues and get actionable fixes." />
              <FeatureCard icon={<FaChartLine className="h-8 w-8 text-secondary" />} title="Confidence Scores" desc="Understand how sure the AI is about each suggestion." />
              <FeatureCard icon={<FaShieldAlt className="h-8 w-8 text-secondary" />} title="Safe Refactors" desc="Apply refactors with safeguards and easy rollbacks." />
              <FeatureCard icon={<FaRocket className="h-8 w-8 text-secondary" />} title="Performance" desc="Low overhead analysis to keep your flow fast." />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to level up your testing?</h2>
            <p className="text-muted-foreground mb-6">Create an account to try the AI IDE with your own codebase.</p>
            <a href="/signup" className="inline-flex bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-full hover:opacity-90">Get Started</a>
          </div>
        </section>
      </main>
    </>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-app hover:-translate-y-1 hover:shadow-lg transition duration-300 ring-1 ring-app">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
}

export default Features;
