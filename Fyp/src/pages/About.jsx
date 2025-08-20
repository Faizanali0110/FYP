import React from 'react';
import Header from '../Components/Header';

// About page uses Unsplash images without API keys via source.unsplash.com
// You can replace the URLs below with your own images at any time.
export function About() {
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
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Who we are</p>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                  Building an AI-powered IDE for better code
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  We help developers catch bugs earlier, generate reliable tests, and ship with confidence.
                  Our mission is to make high-quality software accessible to every team.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-[rgb(var(--secondary))] to-[rgb(var(--primary))] opacity-25 blur-2xl"></div>
                <UnsplashImage
                  query="team,programming,ai"
                  width={900}
                  height={600}
                  alt="Team collaborating"
                  className="relative z-10 w-full h-[320px] md:h-[420px] object-cover rounded-2xl border border-app bg-card shadow-xl ring-1 ring-app"
                  sig={1}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[rgb(var(--secondary))] to-[rgb(var(--primary))] text-transparent bg-clip-text">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <ValueCard title="Developer-first" description="Delightful UX and actionable insights built for day-to-day workflows."/>
              <ValueCard title="Trustworthy AI" description="Transparent suggestions with confidence scores and rationale."/>
              <ValueCard title="Performance" description="Fast analysis, low overhead, and seamless integrations."/>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <UnsplashImage
                query="code,refactor,testing"
                width={800}
                height={600}
                alt="Code and testing"
                className="w-full h-64 md:h-80 object-cover rounded-2xl border border-app bg-card shadow ring-1 ring-app"
                sig={2}
              />
              <div>
                <h3 className="text-2xl font-bold mb-3">Our Story</h3>
                <p className="text-muted-foreground">
                  Born from the pain of flaky tests and late-cycle regressions, we set out to
                  combine AI with static and dynamic analysis to surface issues before they ship.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ValueCard({ title, description }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-app hover:-translate-y-1 hover:shadow-lg transition duration-300 ring-1 ring-app">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default About;
