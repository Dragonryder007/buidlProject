"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Filter, Loader2, RefreshCw, Search, Calendar, ChevronDown, Phone, Mail, Github, Compass, Linkedin, Globe, ExternalLink, X, CheckCircle, XCircle, Clock, User, Tag, Zap, Home } from 'lucide-react';
import Link from 'next/link';

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  gitHub: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  experienceLevel: string;
  userRole: string;
  interests: string[];
  builtInWeb3: string;
  web3Context: string;
  whySelectYou: string;
  weeklyCommitment: string;
  fullCommitment: string;
  hackerHouseInterest: string;
  seriousBuidlerEssay: string;
  devconInterest?: string;
  ticketSupport?: string;
  status: string;
  createdAt: string;
}

const AdminPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('All');
  const [devconFilter, setDevconFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Application | null>(null);

  const fetchApplications = async () => {
    setRefreshing(true);
    try {
      // Try local API first
      const response = await axios.get('/api/apply');
      const apiApps = response.data;
      
      const localApps = JSON.parse(localStorage.getItem('buidl_applications') || '[]');
      const combined = [...apiApps, ...localApps.filter((la: any) => !apiApps.find((aa: any) => aa.id === la.id))];
      
      combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setApplications(combined);
    } catch (err) {
      console.error('Error fetching applications:', err);
      // Fallback to local storage only
      const localApps = JSON.parse(localStorage.getItem('buidl_applications') || '[]');
      setApplications(localApps.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = (id: number, status: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      // Use loose equality (==) to handle number/string ID mismatches from localStorage
      setApplications(apps => apps.map(app => app.id == id ? { ...app, status } : app));

      const localApps = JSON.parse(localStorage.getItem('buidl_applications') || '[]');
      const updatedLocal = localApps.map((a: any) => a.id == id ? { ...a, status } : a);
      localStorage.setItem('buidl_applications', JSON.stringify(updatedLocal));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesStatus = filter === 'All' || app.status === filter;
    const matchesDevcon = devconFilter === 'All' || app.devconInterest === devconFilter;
    const matchesSearch = (app.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                          (app.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (app.gitHub?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchesStatus && matchesDevcon && matchesSearch;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'Pending' || a.status === 'Applied').length,
    selected: applications.filter(a => a.status === 'Selected').length,
    shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
  };

  return (
    <main className="min-h-screen pt-12 pb-24 bg-background">
      <div className="container mx-auto px-6 mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
      </div>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 text-primary font-bold mb-3">
              <Shield className="w-6 h-6" />
              <span className="tracking-[0.2em] text-sm">SECURE ADMIN PANEL</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight">Applicant Pipeline</h1>
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-grow lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text"
                placeholder="Search by name, email or github..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={fetchApplications}
              disabled={refreshing}
              className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Applicants', value: stats.total, color: 'text-white' },
            { label: 'Applied', value: stats.pending, color: 'text-yellow-400' },
            { label: 'Shortlisted', value: stats.shortlisted, color: 'text-cyan-400' },
            { label: 'Selected', value: stats.selected, color: 'text-green-400' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 border-white/5 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-current opacity-20"></div>
              <div className="text-sm text-white/40 mb-1 font-bold uppercase tracking-wider">{stat.label}</div>
              <div className={`text-4xl font-black ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-white/40 text-xs font-black uppercase mr-2 tracking-widest">
            <Filter className="w-3 h-3" /> Filters
          </div>
          
          <div className="flex gap-2">
            {['All', 'Applied', 'Shortlisted', 'Selected', 'Rejected'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  filter === f ? 'bg-primary border-primary text-white' : 'bg-transparent border-white/10 text-white/50 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-white/10 mx-2 hidden md:block"></div>

          <div className="flex items-center gap-2">
            <span className="text-white/30 text-xs font-bold">Devcon:</span>
            <select 
              className="bg-transparent border-none text-xs font-bold text-white outline-none cursor-pointer"
              value={devconFilter}
              onChange={(e) => setDevconFilter(e.target.value)}
            >
              <option value="All" className="bg-black">All</option>
              <option value="Yes" className="bg-black">Interested</option>
              <option value="No" className="bg-black">Not Interested</option>
            </select>
          </div>
        </div>

        {/* Applicants Grid/Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <p className="text-white/30 font-bold tracking-widest animate-pulse">SYNCING DATA...</p>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-32 glass-card border-dashed border-white/10">
            <p className="text-white/40 text-xl font-bold">No matching records found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredApps.map((app) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={app.id} 
                  className={`glass-card border-white/5 overflow-hidden group hover:border-white/20 transition-all ${expandedId === app.id ? 'ring-1 ring-primary/50' : ''}`}
                >
                  <div className="p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                    <div className="flex-grow min-w-0" onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}>
                      <div className="flex flex-wrap items-center gap-3 mb-2 cursor-pointer">
                        <h3 className="text-xl font-bold truncate">{app.name}</h3>
                        <span className={`px-3 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${
                          app.status === 'Selected' ? 'bg-green-500/20 text-green-400' :
                          app.status === 'Shortlisted' ? 'bg-cyan-500/20 text-cyan-400' :
                          app.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {app.status}
                        </span>
                        {app.devconInterest === 'Yes' && (
                          <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                            <Compass className="w-3 h-3" /> Devcon Interested
                          </span>
                        )}
                        <ChevronDown className={`w-4 h-4 text-white/20 transition-transform ${expandedId === app.id ? 'rotate-180' : ''}`} />
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-xs text-white/50">
                        <div className="flex items-center gap-2 truncate">
                          <Mail className="w-3 h-3" /> {app.email || '—'}
                        </div>
                        <div className="flex items-center gap-2">
                          <Github className="w-3 h-3" /> 
                          {app.gitHub ? (
                            <a href={app.gitHub} target="_blank" className="hover:text-white underline">
                              {app.gitHub.replace('https://github.com/', '')}
                            </a>
                          ) : <span className="text-white/20">—</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" /> {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '—'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 lg:ml-auto" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedProfile(app); }}
                        className="px-4 py-2 rounded-lg text-xs font-bold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all"
                      >
                        View Profile
                      </button>
                      <button 
                        onClick={(e) => updateStatus(app.id, 'Shortlisted', e)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                          app.status === 'Shortlisted' ? 'bg-cyan-500 border-cyan-500 text-white' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500 hover:bg-cyan-500 hover:text-white'
                        }`}
                      >
                        Shortlist
                      </button>
                      <button 
                        onClick={(e) => updateStatus(app.id, 'Selected', e)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                          app.status === 'Selected' ? 'bg-green-500 border-green-500 text-white' : 'bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500 hover:text-white'
                        }`}
                      >
                        Select
                      </button>
                      <button 
                        onClick={(e) => updateStatus(app.id, 'Rejected', e)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                          app.status === 'Rejected' ? 'bg-red-500 border-red-500 text-white' : 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        Reject
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedId === app.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/5 bg-white/[0.02] p-6"
                      >
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {/* Profile Column */}
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Profile Details</h4>
                            <div className="space-y-3">
                              <div className="text-sm"><span className="text-white/30 font-bold mr-2">Role:</span> {app.userRole}</div>
                              <div className="text-sm"><span className="text-white/30 font-bold mr-2">Level:</span> {app.experienceLevel}</div>
                              <div className="flex flex-wrap gap-2 pt-1">
                                {app.interests?.map((interest, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold">
                                    {interest}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Commitment Column */}
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary">Commitment</h4>
                            <div className="space-y-3">
                              <div className="text-sm"><span className="text-white/30 font-bold mr-2">Availability:</span> {app.weeklyCommitment}</div>
                              <div className="text-sm"><span className="text-white/30 font-bold mr-2">Full Commit:</span> {app.fullCommitment}</div>
                              <div className="text-sm"><span className="text-white/30 font-bold mr-2">Hacker House:</span> {app.hackerHouseInterest}</div>
                            </div>
                          </div>

                          {/* Contact Column */}
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">Links</h4>
                            <div className="flex flex-col gap-2">
                              {app.linkedinUrl && (
                                <a href={app.linkedinUrl} target="_blank" className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors">
                                  <Linkedin className="w-3 h-3" /> LinkedIn Profile
                                </a>
                              )}
                              {app.portfolioUrl && (
                                <a href={app.portfolioUrl} target="_blank" className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors">
                                  <Globe className="w-3 h-3" /> Portfolio Website
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Essays */}
                        <div className="mt-8 grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Web3 Context ({app.builtInWeb3 === 'Yes' ? 'Experience' : 'Interest'})</h4>
                            <p className="text-sm text-white/70 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                              {app.web3Context}
                            </p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Serious Buidler Evaluation</h4>
                            <p className="text-sm text-white/70 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5 italic">
                              "{app.seriousBuidlerEssay}"
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 space-y-3">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Why Join?</h4>
                          <p className="text-sm text-white/70 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                            {app.whySelectYou}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Full Profile Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setSelectedProfile(null)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between z-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Applicant Profile</p>
                  <h2 className="text-2xl font-black">{selectedProfile.name || '—'}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                    selectedProfile.status === 'Selected' ? 'bg-green-500/20 text-green-400' :
                    selectedProfile.status === 'Shortlisted' ? 'bg-cyan-500/20 text-cyan-400' :
                    selectedProfile.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{selectedProfile.status}</span>
                  <button onClick={() => setSelectedProfile(null)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-8">

                {/* Contact Info */}
                <div className="glass-card p-6 space-y-4 border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Contact Information</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-white/30 shrink-0" />
                      <span>{selectedProfile.email || '—'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-white/30 shrink-0" />
                      <span>{selectedProfile.phone || '—'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Github className="w-4 h-4 text-white/30 shrink-0" />
                      {selectedProfile.gitHub ? (
                        <a href={selectedProfile.gitHub} target="_blank" className="text-primary hover:underline">{selectedProfile.gitHub}</a>
                      ) : <span>—</span>}
                    </div>
                    {selectedProfile.linkedinUrl && (
                      <div className="flex items-center gap-3 text-sm">
                        <Linkedin className="w-4 h-4 text-white/30 shrink-0" />
                        <a href={selectedProfile.linkedinUrl} target="_blank" className="text-primary hover:underline">{selectedProfile.linkedinUrl}</a>
                      </div>
                    )}
                    {selectedProfile.portfolioUrl && (
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="w-4 h-4 text-white/30 shrink-0" />
                        <a href={selectedProfile.portfolioUrl} target="_blank" className="text-primary hover:underline">{selectedProfile.portfolioUrl}</a>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-white/30 shrink-0" />
                      <span>Applied: {selectedProfile.createdAt ? new Date(selectedProfile.createdAt).toLocaleString() : '—'}</span>
                    </div>
                  </div>
                </div>

                {/* Buidler Profile */}
                <div className="glass-card p-6 space-y-4 border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-secondary">Buidler Profile</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/30 font-bold mb-1">Experience Level</p>
                      <p className="font-bold">{selectedProfile.experienceLevel || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/30 font-bold mb-1">Role / Background</p>
                      <p className="font-bold">{selectedProfile.userRole || '—'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 font-bold mb-2">Areas of Interest</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.interests?.length > 0
                        ? selectedProfile.interests.map((i, idx) => (
                            <span key={idx} className="px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-bold">{i}</span>
                          ))
                        : <span className="text-white/30 text-sm">—</span>
                      }
                    </div>
                  </div>
                </div>

                {/* Web3 Context */}
                <div className="glass-card p-6 space-y-4 border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-accent">Web3 & Ethereum</h3>
                  <div>
                    <p className="text-xs text-white/30 font-bold mb-1">Built in Web3 Before?</p>
                    <p className="font-bold">{selectedProfile.builtInWeb3 || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 font-bold mb-2">
                      {selectedProfile.builtInWeb3 === 'Yes' ? 'Describe Their Web3 Work' : 'Interest in Ethereum'}
                    </p>
                    <p className="text-sm text-white/80 bg-black/30 rounded-xl p-4 border border-white/5 leading-relaxed">
                      {selectedProfile.web3Context || '—'}
                    </p>
                  </div>
                </div>

                {/* Why Join */}
                <div className="glass-card p-6 space-y-4 border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Why BUIDL3 WEEK?</h3>
                  <p className="text-sm text-white/80 bg-black/30 rounded-xl p-4 border border-white/5 leading-relaxed">
                    {selectedProfile.whySelectYou || '—'}
                  </p>
                </div>

                {/* Commitment */}
                <div className="glass-card p-6 space-y-4 border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-secondary">Commitment</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <p className="text-[10px] text-white/30 font-bold uppercase mb-2">Weekly Hours</p>
                      <p className="font-black text-lg">{selectedProfile.weeklyCommitment || '—'}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <p className="text-[10px] text-white/30 font-bold uppercase mb-2">Full Commit</p>
                      <p className={`font-black text-lg ${selectedProfile.fullCommitment === 'Yes' ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedProfile.fullCommitment || '—'}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <p className="text-[10px] text-white/30 font-bold uppercase mb-2">Hacker House</p>
                      <p className={`font-black text-lg ${selectedProfile.hackerHouseInterest === 'Yes' ? 'text-green-400' : selectedProfile.hackerHouseInterest === 'Maybe' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {selectedProfile.hackerHouseInterest || '—'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Serious Buidler Essay */}
                <div className="glass-card p-6 space-y-4 border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-accent">⚡ Serious Buidler Evaluation</h3>
                  <p className="text-sm text-white/80 bg-black/30 rounded-xl p-4 border border-accent/10 leading-relaxed italic">
                    "{selectedProfile.seriousBuidlerEssay || '—'}"
                  </p>
                </div>

                {/* Devcon */}
                <div className="glass-card p-6 space-y-4 border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Devcon Mumbai</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/30 font-bold mb-1">Devcon Interest</p>
                      <p className={`font-bold ${selectedProfile.devconInterest === 'Yes' ? 'text-green-400' : 'text-white/60'}`}>
                        {selectedProfile.devconInterest || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/30 font-bold mb-1">Ticket Support Needed</p>
                      <p className="font-bold">{selectedProfile.ticketSupport || '—'}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pb-6">
                  <button onClick={(e) => { updateStatus(selectedProfile.id, 'Shortlisted', e); setSelectedProfile(p => p ? { ...p, status: 'Shortlisted' } : null); }}
                    className="flex-1 py-3 rounded-xl text-sm font-bold border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all">
                    Shortlist
                  </button>
                  <button onClick={(e) => { updateStatus(selectedProfile.id, 'Selected', e); setSelectedProfile(p => p ? { ...p, status: 'Selected' } : null); }}
                    className="flex-1 py-3 rounded-xl text-sm font-bold border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white transition-all">
                    Select
                  </button>
                  <button onClick={(e) => { updateStatus(selectedProfile.id, 'Rejected', e); setSelectedProfile(p => p ? { ...p, status: 'Rejected' } : null); }}
                    className="flex-1 py-3 rounded-xl text-sm font-bold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AdminPage;
