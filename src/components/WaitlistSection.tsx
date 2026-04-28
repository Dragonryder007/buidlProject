"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setStatus('loading');
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Store email in console as requested
      console.log('Waitlist Signup:', email);
      
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="waitlist" className="py-32 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-16 relative overflow-hidden border-white/5 shadow-2xl"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black mb-6 uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Waitlist Open
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase leading-none">
                NOT READY TO <span className="gradient-text">SHIP</span> YET?
              </h2>
              <p className="text-xl text-white/80 font-bold mb-6 italic">
                Stay in the loop — but don’t stay idle.
              </p>
              
              <div className="space-y-4 mb-8">
                <p className="text-white/60">
                  Join the <span className="text-white font-bold">BUIDL3</span> waitlist to get early access to:
                </p>
                <ul className="space-y-3">
                  {[
                    'Upcoming cohorts',
                    'Live build sprints',
                    'Ethereum L2 ecosystem opportunities',
                    'Private builder channels'
                  ].map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-6 border-t border-white/5">
                <p className="text-sm font-black uppercase tracking-tighter text-white/40 leading-relaxed">
                  This is not a newsletter. <br />
                  <span className="text-white/60">This is your entry into the builder pipeline.</span>
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
              <div className="mb-8 text-center lg:text-left">
                <p className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">Priority Access</p>
                <p className="text-white/80">Enter your email to get priority access.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    required
                    disabled={status === 'success'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-primary outline-none transition-all placeholder:text-white/20 disabled:opacity-50"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 overflow-hidden group shadow-lg ${
                    status === 'success' 
                      ? 'bg-green-500 text-white shadow-green-500/20' 
                      : 'bg-primary text-white hover:bg-primary/90 shadow-primary/20 active:scale-[0.98]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {status === 'loading' ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Loader2 className="w-6 h-6 animate-spin" />
                      </motion.div>
                    ) : status === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-6 h-6" />
                        Subscribed
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        Join Waitlist
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-center mt-6 space-y-4"
                  >
                    <div>
                      <p className="text-green-400 font-black text-2xl uppercase tracking-tighter">You're in.</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Next step:</p>
                      <p className="text-white/80 text-sm font-medium">
                        Watch your inbox + join Telegram (link coming).
                      </p>
                    </div>
                    <p className="text-primary/60 text-xs font-bold italic">
                      Builders who move fast get priority access
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
