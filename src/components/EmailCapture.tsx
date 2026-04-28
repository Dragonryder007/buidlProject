"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      // Mock API call - in production this would point to your email collector endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store locally as well
      const waitlist = JSON.parse(localStorage.getItem('buidl_waitlist') || '[]');
      waitlist.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem('buidl_waitlist', JSON.stringify(waitlist));
      
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 container mx-auto px-6">
      <div className="glass-card p-12 md:p-16 relative overflow-hidden text-center border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            NOT READY TO <span className="gradient-text">APPLY</span> YET?
          </h2>
          <p className="text-white/60 mb-10 text-lg">
            Join the waitlist to receive updates about future BUIDL3 cohorts and exclusive ecosystem news.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-primary outline-none transition-all"
            />
            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-w-[160px] ${
                status === 'success' ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 
               status === 'success' ? <><CheckCircle className="w-5 h-5" /> Subscribed</> : 
               <><Send className="w-5 h-5" /> Get Updates</>}
            </button>
          </form>
          
          {status === 'success' && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 mt-4 font-bold"
            >
              You're on the list! We'll be in touch soon.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmailCapture;
