import React, { useState } from 'react';
import Header from '../Components/Header';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate your backend/email service here
    setSent(true);
  };

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
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Get in touch</p>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                  We'd love to hear from you
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Questions, feedback, or partnership ideas? Send us a message and we'll get back shortly.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-[rgb(var(--secondary))] to-[rgb(var(--primary))] opacity-25 blur-2xl"></div>
                <UnsplashImage
                  query="contact,chat,workspace"
                  width={900}
                  height={600}
                  alt="Contact illustration"
                  className="relative z-10 w-full h-[320px] md:h-[420px] object-cover rounded-2xl border border-app bg-card shadow-xl ring-1 ring-app"
                  sig={4}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="p-6 md:p-8 rounded-2xl bg-card border border-app ring-1 ring-app">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message sent!</h3>
                    <p className="text-muted-foreground">Thanks for reaching out. We'll reply soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-input border border-app rounded-lg p-3 focus:outline-none focus:ring-2 ring-app"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-input border border-app rounded-lg p-3 focus:outline-none focus:ring-2 ring-app"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full bg-input border border-app rounded-lg p-3 focus:outline-none focus:ring-2 ring-app"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        className="w-full bg-input border border-app rounded-lg p-3 focus:outline-none focus:ring-2 ring-app"
                      />
                    </div>
                    <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-full hover:opacity-90">
                      Send Message
                    </button>
                  </form>
                )}
              </div>
              <div className="space-y-6">
                <UnsplashImage
                  query="office,team,tech"
                  width={800}
                  height={600}
                  alt="Our workspace"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl border border-app bg-card shadow ring-1 ring-app"
                  sig={5}
                />
                <div className="p-6 rounded-2xl bg-card border border-app ring-1 ring-app">
                  <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
                  <p className="text-muted-foreground">Email: hello@example.com</p>
                  <p className="text-muted-foreground">Location: Silicon Valley, CA</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Contact;
