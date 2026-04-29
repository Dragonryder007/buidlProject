"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, ArrowLeft, Loader2, Github, Linkedin, Twitter, MessageSquare, MapPin, Briefcase, Code, Terminal, Zap, Clock, Users, Building, GraduationCap, UserCircle, Home } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    socialLink: '',
    role: '',
    bestProject: '',
    secondProject: '',
    builtInWeb3: '',
    web3Work: '',
    web3Interest: '',
    whyJoin: '',
    planToBuild: '',
    interests: [] as string[],
    weeklyCommitment: '',
    fullCommitment: '',
    hackerHouseInterest: '',
    seriousBuidlerEssay: '',
    telegram: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
        try {
      const payload = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        gitHub: formData.github,
        linkedinUrl: formData.socialLink,
        userRole: formData.role,
        web3Context: formData.builtInWeb3 === 'Yes' ? formData.web3Work : formData.web3Interest,
        whySelectYou: formData.whyJoin,
        interests: formData.interests,
        weeklyCommitment: formData.weeklyCommitment,
        fullCommitment: formData.fullCommitment,
        hackerHouseInterest: formData.hackerHouseInterest,
        seriousBuidlerEssay: formData.seriousBuidlerEssay,
        telegram: formData.telegram,
        planToBuild: formData.planToBuild,
        bestProject: formData.bestProject,
        secondProject: formData.secondProject,
        builtInWeb3: formData.builtInWeb3,
        status: 'Applied',
        createdAt: new Date().toISOString()
      };

            // 1. Save to Local API
            const res = await axios.post('/api/apply', payload);
            if (!res.data || !res.data.success) {
                throw new Error(res.data?.message || 'Submission failed');
            }

            // 2. Save to localStorage (as backup for the dashboard)
            const existing = JSON.parse(localStorage.getItem('buidl_applications') || '[]');
            localStorage.setItem('buidl_applications', JSON.stringify([payload, ...existing]));

            setSubmitted(true);
    } catch (err) {
            console.error('Submission failed:', err);
            setError((err as any)?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInterestChange = (interest: string) => {
    const updated = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: updated });
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-6 pt-12">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-8"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>
        </div>
        <div className="container mx-auto px-6 pt-12 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center max-w-xl w-full border-primary/20"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase italic">Application Sent!</h2>
            <p className="text-white/60 mb-8 text-lg">
              Thanks for applying for BUIDL3 @ Devcon Mumbai. We'll review your profile and get back to you soon.
            </p>
            
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 text-left">
                <p className="text-primary font-black text-sm uppercase tracking-widest mb-4">👉 NEXT STEP: JOIN TELEGRAM</p>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                    All communication happens in our private builder group. Join now to stay in the pipeline.
                </p>
                <a 
                    href="https://t.me/buidl_coordination" 
                    target="_blank"
                    className="block w-full bg-[#24A1DE] text-white py-3 rounded-xl font-bold text-center hover:opacity-90 transition-all"
                >
                    Join Private Telegram Group
                </a>
            </div>

            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="container mx-auto px-6 pt-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest mb-12"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter uppercase italic leading-none">
              Apply for <span className="gradient-text">BUIDL3</span>
            </h1>
            <p className="text-white/40 text-xl font-bold uppercase tracking-[0.2em]">
              Build at Devcon Mumbai
            </p>
          </motion.div>

          {/* Warning Section */}
                    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-[2rem] p-8 mb-12"
          >
            <h3 className="text-red-400 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                ⚠️ Before you apply
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
                This is a curated builder pipeline aligned with the global Ethereum ecosystem and Devcon.
            </p>
            <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> We accept only serious developers</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> Every application is reviewed manually</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> Low-effort or incomplete applications will be rejected</li>
            </ul>
          </motion.div>

                    {error && (
                        <div className="glass-card p-6 border-red-400/20 bg-red-500/5 mb-8">
                            <p className="text-red-300 font-black uppercase tracking-widest text-sm">Submission Error</p>
                            <p className="text-white/70 text-sm mt-2">{error}</p>
                        </div>
                    )}

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Section 1: Basic Information */}
            <section className="glass-card p-8 md:p-12 border-white/5">
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <UserCircle className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">Basic Information</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                        <input required name="name" value={formData.name} onChange={handleChange} placeholder="Vitalik Buterin" className="form-input" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="vitalik@ethereum.org" className="form-input" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Phone / WhatsApp Number</label>
                        <input required name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="form-input" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Current Location (City, Country)</label>
                        <input required name="location" value={formData.location} onChange={handleChange} placeholder="Mumbai, India" className="form-input" />
                    </div>
                </div>
            </section>

            {/* Section 2: Builder Profile */}
            <section className="glass-card p-8 md:p-12 border-white/5">
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <Github className="w-6 h-6 text-secondary" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">Builder Profile</h3>
                </div>
                <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">GitHub Profile (REQUIRED)</label>
                        <input required name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/vbuterin" className="form-input border-secondary/30 focus:border-secondary" />
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1 italic">👉 Applications without GitHub will not be considered</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">LinkedIn or Twitter (X)</label>
                        <input name="socialLink" value={formData.socialLink} onChange={handleChange} placeholder="https://linkedin.com/in/vitalik" className="form-input" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">What best describes you?</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['Freelance Developer', 'University Student', 'Alumni', 'Startup Founder', 'Independent Builder', 'Other'].map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role })}
                                    className={`p-4 rounded-xl border text-xs font-bold transition-all ${
                                        formData.role === role ? 'bg-secondary border-secondary text-black' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                                    }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Proof of Work */}
            <section className="glass-card p-8 md:p-12 border-white/5">
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <Terminal className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">Proof of Work (Mandatory)</h3>
                </div>
                <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Share your best project (REQUIRED)</label>
                        <textarea 
                            required 
                            name="bestProject" 
                            value={formData.bestProject} 
                            onChange={handleChange} 
                            rows={5}
                            placeholder="What you built, your role, tech stack, and live link..." 
                            className="form-input resize-none" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Second project (Optional but recommended)</label>
                        <textarea 
                            name="secondProject" 
                            value={formData.secondProject} 
                            onChange={handleChange} 
                            rows={3}
                            placeholder="Another proof of execution..." 
                            className="form-input resize-none" 
                        />
                    </div>
                </div>
            </section>

            {/* Section 4: Web3 Context */}
            <section className="glass-card p-8 md:p-12 border-white/5">
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <Zap className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">Web3 & Ethereum Context</h3>
                </div>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Have you built in Web3 / Ethereum before?</label>
                        <div className="flex gap-4">
                            {['Yes', 'No'].map((choice) => (
                                <button
                                    key={choice}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, builtInWeb3: choice })}
                                    className={`flex-1 py-4 rounded-xl border text-sm font-black transition-all ${
                                        formData.builtInWeb3 === choice ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                                    }`}
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                    </div>
                    {formData.builtInWeb3 === 'Yes' && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Describe your work (smart contracts, dApps, infra, etc.)</label>
                            <textarea required name="web3Work" value={formData.web3Work} onChange={handleChange} rows={4} className="form-input resize-none" />
                        </div>
                    )}
                    {formData.builtInWeb3 === 'No' && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Why are you interested in Ethereum now?</label>
                            <textarea required name="web3Interest" value={formData.web3Interest} onChange={handleChange} rows={4} className="form-input resize-none" />
                        </div>
                    )}
                </div>
            </section>

            {/* Section 5: Build Intent */}
            <section className="glass-card p-8 md:p-12 border-white/5">
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <Code className="w-6 h-6 text-secondary" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">Build Intent</h3>
                </div>
                <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Why do you want to join BUIDL3?</label>
                        <textarea required name="whyJoin" value={formData.whyJoin} onChange={handleChange} rows={4} className="form-input resize-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">What do you plan to build during BUIDL3 (Devcon cycle)?</label>
                        <textarea required name="planToBuild" value={formData.planToBuild} onChange={handleChange} rows={5} placeholder="Be specific. Vague ideas will be rejected." className="form-input resize-none border-secondary/30 focus:border-secondary" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Which areas are you interested in?</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['DeFi', 'AI + Web3', 'Infra / Protocol', 'Consumer Apps', 'Tooling / DevTools', 'Other'].map((area) => (
                                <button
                                    key={area}
                                    type="button"
                                    onClick={() => handleInterestChange(area)}
                                    className={`p-4 rounded-xl border text-xs font-bold transition-all ${
                                        formData.interests.includes(area) ? 'bg-secondary border-secondary text-black' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                                    }`}
                                >
                                    {area}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6: Commitment */}
            <section className="glass-card p-8 md:p-12 border-white/5">
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <Clock className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">Commitment</h3>
                </div>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">How many hours can you commit per week?</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['< 5 hours', '5–10 hours', '10–20 hours', '20+ hours'].map((hours) => (
                                <button
                                    key={hours}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, weeklyCommitment: hours })}
                                    className={`p-4 rounded-xl border text-[10px] font-black transition-all ${
                                        formData.weeklyCommitment === hours ? 'bg-accent border-accent text-black' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                                    }`}
                                >
                                    {hours}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Are you willing to commit fully if selected?</label>
                        <div className="flex gap-4">
                            {['Yes', 'No'].map((choice) => (
                                <button
                                    key={choice}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, fullCommitment: choice })}
                                    className={`flex-1 py-4 rounded-xl border text-sm font-black transition-all ${
                                        formData.fullCommitment === choice ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                                    }`}
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">If selected for the final stage (Hacker House), are you open to attending in person?</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['Yes', 'No', 'Maybe'].map((choice) => (
                                <button
                                    key={choice}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, hackerHouseInterest: choice })}
                                    className={`flex-1 py-4 rounded-xl border text-sm font-black transition-all ${
                                        formData.hackerHouseInterest === choice ? 'bg-secondary border-secondary text-black' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                                    }`}
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 7: Final Filter */}
            <section className="glass-card p-8 md:p-12 border-primary/30 bg-primary/5">
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                    <Terminal className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-black uppercase tracking-tighter italic">Final Filter (Critical)</h3>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">What makes you a serious builder?</label>
                    <textarea 
                        required 
                        name="seriousBuidlerEssay" 
                        value={formData.seriousBuidlerEssay} 
                        onChange={handleChange} 
                        rows={6}
                        placeholder="This is a key evaluation question." 
                        className="form-input border-primary/30 focus:border-primary bg-black/40" 
                    />
                </div>
            </section>

            {/* Section 8: Community Access */}
            <section className="glass-card p-8 md:p-12 border-white/5">
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">Community Access</h3>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Telegram Username (REQUIRED)</label>
                    <input required name="telegram" value={formData.telegram} onChange={handleChange} placeholder="@username" className="form-input" />
                </div>
            </section>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-8 rounded-3xl font-black text-3xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              {loading ? (
                <>
                  Syncing Pipeline...
                  <Loader2 className="w-8 h-8 animate-spin" />
                </>
              ) : (
                <>
                  Submit Application
                  <Send className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Final Note */}
          <div className="mt-12 text-center space-y-4">
            <p className="text-white/30 text-xs font-black uppercase tracking-[0.3em] italic">
                ⚡ Final Note
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xl mx-auto">
                This is not a learning program. This is a builder pipeline aligned with Devcon and the Ethereum ecosystem.
                Only builders who show proof, intent, and commitment move forward.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 1rem;
            padding: 1rem 1.25rem;
            color: white;
            font-size: 0.875rem;
            outline: none;
            transition: all 0.3s ease;
        }
        .form-input:focus {
            border-color: var(--color-primary);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.1);
        }
      `}</style>
    </main>
  );
}
