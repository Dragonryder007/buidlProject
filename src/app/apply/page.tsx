"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send, CheckCircle2, Loader2, ExternalLink, Github, Linkedin, Globe, Sparkles } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { trackEvent } from '@/utils/analytics';

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  githubUrl: z.string().url('Invalid GitHub URL').includes('github.com', { message: 'Must be a GitHub URL' }),
  linkedinUrl: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  portfolioUrl: z.string().url('Invalid Portfolio URL').optional().or(z.literal('')),
  experienceLevel: z.enum(['Junior', 'Intermediate', 'Senior', 'Elite']),
  userRole: z.enum(['Freelance Developer', 'University Student', 'Alumni', 'Startup Founder', 'Independent Builder', 'Other']),
  interests: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  builtInWeb3: z.enum(['Yes', 'No']),
  web3Context: z.string().min(20, 'Please provide a more detailed answer (min 20 chars)'),
  whyJoin: z.string().min(50, 'Please provide a more detailed answer (min 50 chars)'),
  weeklyCommitment: z.enum(['< 5 hours', '5–10 hours', '10–20 hours', '20+ hours']),
  fullCommitment: z.enum(['Yes', 'No']),
  hackerHouseInterest: z.enum(['Yes', 'No', 'Maybe']),
  seriousBuilderEssay: z.string().min(100, 'Please provide a more substantial answer (min 100 chars)'),
  devconInterest: z.string().default('No'),
  ticketSupport: z.string().default('No'),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

const steps = [
  { id: 1, title: 'Basic Info', fields: ['fullName', 'email', 'phone'] },
  { id: 2, title: 'Builder Profile', fields: ['experienceLevel', 'userRole', 'interests'] },
  { id: 3, title: 'Proof of Work', fields: ['githubUrl', 'linkedinUrl', 'portfolioUrl'] },
  { id: 4, title: 'Web3 & Intent', fields: ['builtInWeb3', 'web3Context', 'whyJoin'] },
  { id: 5, title: 'Commitment', fields: ['weeklyCommitment', 'fullCommitment', 'hackerHouseInterest', 'seriousBuilderEssay'] },
  { id: 6, title: 'Devcon', fields: ['devconInterest', 'ticketSupport'] },
];

const ApplyPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange'
  });

  // Auto-save and Restore
  useEffect(() => {
    const savedData = localStorage.getItem('build3_form_draft');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      Object.keys(parsed).forEach((key) => {
        setValue(key as any, parsed[key]);
      });
    }
  }, [setValue]);

  const formData = watch();
  useEffect(() => {
    localStorage.setItem('build3_form_draft', JSON.stringify(formData));
  }, [formData]);

  const nextStep = async () => {
    const fields = steps[currentStep - 1].fields as any[];
    const isValid = await trigger(fields);
    if (isValid) {
      trackEvent('form_step_complete', { step: currentStep });
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        github: data.githubUrl,
        linkedin: data.linkedinUrl || "",
        portfolio: data.portfolioUrl || "",
        experienceLevel: data.experienceLevel,
        userRole: data.userRole,
        interests: data.interests,
        builtInWeb3: data.builtInWeb3,
        web3Context: data.web3Context,
        whySelectYou: data.whyJoin,
        weeklyCommitment: data.weeklyCommitment,
        fullCommitment: data.fullCommitment,
        hackerHouseInterest: data.hackerHouseInterest,
        seriousBuilderEssay: data.seriousBuilderEssay,
        devconInterest: data.devconInterest,
        ticketSupport: data.ticketSupport,
        status: 'Pending'
      };
      
      await axios.post('http://localhost:5000/api/applications', payload);
      trackEvent('form_submit_success');
      localStorage.removeItem('build3_form_draft');
      setIsSuccess(true);
      
      setTimeout(() => {
        window.location.href = 'https://t.me/your_group_link';
      }, 2000);
      
    } catch (err: any) {
      console.error('Submission error:', err);

      // Always save to localStorage as fallback (works even when backend is offline)
      const fallbackPayload = {
        id: Date.now(),
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        gitHub: data.githubUrl,
        linkedinUrl: data.linkedinUrl || "",
        portfolioUrl: data.portfolioUrl || "",
        experienceLevel: data.experienceLevel,
        userRole: data.userRole,
        interests: data.interests,
        builtInWeb3: data.builtInWeb3,
        web3Context: data.web3Context,
        whySelectYou: data.whyJoin,
        weeklyCommitment: data.weeklyCommitment,
        fullCommitment: data.fullCommitment,
        hackerHouseInterest: data.hackerHouseInterest,
        seriousBuilderEssay: data.seriousBuilderEssay,
        devconInterest: data.devconInterest,
        ticketSupport: data.ticketSupport,
        status: 'Applied',
        createdAt: new Date().toISOString()
      };

      const localApps = JSON.parse(localStorage.getItem('build3_applications') || '[]');
      localApps.push(fallbackPayload);
      localStorage.setItem('build3_applications', JSON.stringify(localApps));

      trackEvent('form_submit_fallback_success');
      localStorage.removeItem('build3_form_draft');
      setIsSuccess(true);

      setTimeout(() => {
        window.location.href = 'https://t.me/your_group_link';
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 max-w-lg w-full text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-4xl font-black mb-4">You're in! 🎉</h2>
          <p className="text-white/60 mb-8 text-lg">
            Final step: Join the private builder community to continue your journey.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="https://t.me/your_group_link"
              onClick={() => trackEvent('telegram_join_click')}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Join Telegram Group <ExternalLink className="w-5 h-5" />
            </Link>
            <p className="text-xs text-white/30 pt-4 border-t border-white/5">
              Redirecting automatically in 2 seconds...<br/>
              If redirect fails, contact: <span className="text-white/50">+91XXXXXXXXXX</span>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.05),transparent_40%)]">
      <Navbar />
      <div className="container mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 text-primary font-bold mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="tracking-widest uppercase text-sm">Application Portal</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              BUILD<span className="text-primary">3</span> <span className="gradient-text">WEEK</span>
            </h1>
            
            {/* Progress Bar */}
            <div className="mt-12">
              <div className="flex justify-between text-sm mb-4">
                <span className="text-white/50 font-bold">Step {currentStep} of {steps.length}</span>
                <span className="text-primary font-black">{Math.round((currentStep / steps.length) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                />
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 md:p-12 border-white/10"
              >
                <h3 className="text-2xl font-black mb-8 pb-4 border-b border-white/5">{steps[currentStep - 1].title}</h3>
                
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/50 ml-1">Full Name</label>
                      <input 
                        {...register('fullName')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-all placeholder:text-white/10"
                        placeholder="e.g. Satoshi Nakamoto"
                      />
                      {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/50 ml-1">Email Address</label>
                        <input 
                          {...register('email')}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-all placeholder:text-white/10"
                          placeholder="satoshi@bitcoin.org"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/50 ml-1">Phone Number</label>
                        <input 
                          {...register('phone')}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-all placeholder:text-white/10"
                          placeholder="+1 234 567 890"
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/50 ml-1">Experience Level</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['Junior', 'Intermediate', 'Senior', 'Elite'].map((level) => (
                            <label key={level} className={`cursor-pointer group relative`}>
                              <input 
                                type="radio" 
                                value={level} 
                                {...register('experienceLevel')} 
                                className="peer sr-only"
                              />
                              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 transition-all">
                                <div className="font-black text-lg mb-1">{level}</div>
                                <div className="text-xs text-white/40">
                                  {level === 'Junior' && '1-2 years exp'}
                                  {level === 'Intermediate' && '3-5 years exp'}
                                  {level === 'Senior' && '5+ years exp'}
                                  {level === 'Elite' && 'Founder / Core Contributor'}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.experienceLevel && <p className="text-red-400 text-xs mt-1">{errors.experienceLevel.message}</p>}
                      </div>

                      <div className="space-y-2 pt-6">
                        <label className="text-sm font-bold text-white/50 ml-1">What best describes you?</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {[
                            'Freelance Developer', 
                            'University Student', 
                            'Alumni', 
                            'Startup Founder', 
                            'Independent Builder', 
                            'Other'
                          ].map((role) => (
                            <label key={role} className="cursor-pointer group">
                              <input 
                                type="radio" 
                                value={role} 
                                {...register('userRole')} 
                                className="peer sr-only"
                              />
                              <div className="p-4 h-full rounded-xl bg-white/5 border border-white/10 peer-checked:border-secondary peer-checked:bg-secondary/10 transition-all flex items-center justify-center text-center">
                                <span className="font-bold text-sm">{role}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.userRole && <p className="text-red-400 text-xs mt-1">{errors.userRole.message}</p>}
                      </div>

                      <div className="space-y-2 pt-6 border-t border-white/5 mt-6">
                        <label className="text-sm font-bold text-white/50 ml-1">Which areas are you interested in?</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {[
                            'DeFi', 
                            'AI + Web3', 
                            'Infra / Protocol', 
                            'Consumer Apps', 
                            'Tooling / DevTools', 
                            'Other'
                          ].map((area) => (
                            <label key={area} className="cursor-pointer group">
                              <input 
                                type="checkbox" 
                                value={area} 
                                {...register('interests')} 
                                className="peer sr-only"
                              />
                              <div className="p-4 h-full rounded-xl bg-white/5 border border-white/10 peer-checked:border-accent peer-checked:bg-accent/10 transition-all flex items-center justify-center text-center relative overflow-hidden">
                                <span className="font-bold text-sm z-10">{area}</span>
                                <div className="absolute top-0 right-0 w-8 h-8 bg-accent/20 rounded-bl-xl opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                                  <CheckCircle2 className="w-4 h-4 text-accent" />
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.interests && <p className="text-red-400 text-xs mt-1">{errors.interests.message}</p>}
                      </div>
                    </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/50 ml-1 flex items-center gap-2">
                        <Github className="w-4 h-4" /> GitHub Profile URL
                      </label>
                      <input 
                        {...register('githubUrl')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-all placeholder:text-white/10"
                        placeholder="https://github.com/username"
                      />
                      {errors.githubUrl && <p className="text-red-400 text-xs mt-1">{errors.githubUrl.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/50 ml-1 flex items-center gap-2">
                        <Linkedin className="w-4 h-4" /> LinkedIn (Optional)
                      </label>
                      <input 
                        {...register('linkedinUrl')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-all placeholder:text-white/10"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/50 ml-1 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Portfolio / Projects
                      </label>
                      <input 
                        {...register('portfolioUrl')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-all placeholder:text-white/10"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-white/50 ml-1">Have you built in Web3 / Ethereum before?</label>
                      <div className="flex gap-4">
                        {['Yes', 'No'].map((option) => (
                          <label key={option} className="flex-1 cursor-pointer">
                            <input type="radio" value={option} {...register('builtInWeb3')} className="peer sr-only" />
                            <div className="py-4 text-center rounded-xl bg-white/5 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 transition-all font-bold">
                              {option}
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.builtInWeb3 && <p className="text-red-400 text-xs mt-1">{errors.builtInWeb3.message}</p>}
                    </div>

                    <AnimatePresence mode="wait">
                      {formData.builtInWeb3 && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <label className="text-sm font-bold text-white/50 ml-1">
                            {formData.builtInWeb3 === 'Yes' 
                              ? 'Describe your work (smart contracts, dApps, infra, etc.)' 
                              : 'Why are you interested in Ethereum now?'}
                          </label>
                          <textarea 
                            {...register('web3Context')}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-all resize-none placeholder:text-white/10"
                            placeholder={formData.builtInWeb3 === 'Yes' ? "e.g. Built a DeFi protocol on L2, deployed NFT contracts..." : "e.g. Interested in decentralized identity, moving from Web2 to Web3..."}
                          />
                          {errors.web3Context && <p className="text-red-400 text-xs mt-1">{errors.web3Context.message}</p>}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-2 pt-4 border-t border-white/5">
                      <label className="text-sm font-bold text-white/50 ml-1">Why should you be selected for BUILD3 WEEK?</label>
                      <textarea 
                        {...register('whyJoin')}
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-all resize-none placeholder:text-white/10"
                        placeholder="Tell us about your technical journey, the projects you've shipped, and what you hope to build..."
                      />
                      <div className="flex justify-between items-center mt-2">
                        {errors.whyJoin && <p className="text-red-400 text-xs">{errors.whyJoin.message}</p>}
                        <p className="text-xs text-white/20 ml-auto">Min. 50 characters</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-white/50 ml-1">How many hours can you commit per week?</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['< 5 hours', '5–10 hours', '10–20 hours', '20+ hours'].map((option) => (
                          <label key={option} className="cursor-pointer">
                            <input type="radio" value={option} {...register('weeklyCommitment')} className="peer sr-only" />
                            <div className="py-4 text-center rounded-xl bg-white/5 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 transition-all font-bold text-xs">
                              {option}
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.weeklyCommitment && <p className="text-red-400 text-xs mt-1">{errors.weeklyCommitment.message}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-sm font-bold text-white/50 ml-1">Are you willing to commit fully if selected?</label>
                        <div className="flex gap-4">
                          {['Yes', 'No'].map((option) => (
                            <label key={option} className="flex-1 cursor-pointer">
                              <input type="radio" value={option} {...register('fullCommitment')} className="peer sr-only" />
                              <div className="py-4 text-center rounded-xl bg-white/5 border border-white/10 peer-checked:border-secondary peer-checked:bg-secondary/10 transition-all font-bold">
                                {option}
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.fullCommitment && <p className="text-red-400 text-xs mt-1">{errors.fullCommitment.message}</p>}
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-bold text-white/50 ml-1 truncate">Open to attending Hacker House in person?</label>
                        <div className="flex gap-3">
                          {['Yes', 'No', 'Maybe'].map((option) => (
                            <label key={option} className="flex-1 cursor-pointer">
                              <input type="radio" value={option} {...register('hackerHouseInterest')} className="peer sr-only" />
                              <div className="py-4 text-center rounded-xl bg-white/5 border border-white/10 peer-checked:border-accent peer-checked:bg-accent/10 transition-all font-bold text-sm">
                                {option}
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.hackerHouseInterest && <p className="text-red-400 text-xs mt-1">{errors.hackerHouseInterest.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2 pt-6 border-t border-white/5">
                      <label className="text-sm font-bold text-white/50 ml-1">What makes you a serious builder?</label>
                      <textarea 
                        {...register('seriousBuilderEssay')}
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-all resize-none placeholder:text-white/10"
                        placeholder="Share your technical background, past shipping experience, and commitment to the ecosystem..."
                      />
                      <div className="flex justify-between items-center mt-2">
                        {errors.seriousBuilderEssay && <p className="text-red-400 text-xs">{errors.seriousBuilderEssay.message}</p>}
                        <p className="text-xs text-white/20 ml-auto">Min. 100 characters</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-white/50 ml-1">Are you interested in attending Devcon SEA?</label>
                      <div className="flex gap-4">
                        {['Yes', 'No'].map((option) => (
                          <label key={option} className="flex-1 cursor-pointer">
                            <input type="radio" value={option} {...register('devconInterest')} className="peer sr-only" />
                            <div className="py-4 text-center rounded-xl bg-white/5 border border-white/10 peer-checked:border-secondary peer-checked:bg-secondary/10 transition-all font-bold">
                              {option}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4 pt-4">
                      <label className="text-sm font-bold text-white/50 ml-1">Do you require ticket support/scholarship?</label>
                      <div className="flex gap-4">
                        {['Yes', 'No'].map((option) => (
                          <label key={option} className="flex-1 cursor-pointer">
                            <input type="radio" value={option} {...register('ticketSupport')} className="peer sr-only" />
                            <div className="py-4 text-center rounded-xl bg-white/5 border border-white/10 peer-checked:border-accent peer-checked:bg-accent/10 transition-all font-bold">
                              {option}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Final Note */}
                    <div className="mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden group">
                      <div className="absolute -right-12 -top-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 text-primary font-black mb-4 tracking-widest text-sm uppercase">
                          <Sparkles className="w-5 h-5" /> Final Note
                        </div>
                        <p className="text-white font-bold text-lg mb-3 leading-tight">
                          This is not a learning program.
                        </p>
                        <p className="text-white/60 text-sm leading-relaxed mb-4">
                          This is a builder pipeline aligned with Devcon and the Ethereum ecosystem. 
                          Only builders who show proof, intent, and commitment move forward.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </motion.div>
            )}
            
            <div className="flex flex-col md:flex-row gap-4">
              {currentStep > 1 && (
                <button 
                  type="button"
                  onClick={prevStep}
                  className="flex-1 bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" /> Previous Step
                </button>
              )}
              
              {currentStep < steps.length ? (
                <button 
                  type="button"
                  onClick={nextStep}
                  className="flex-[2] bg-white text-black py-5 rounded-2xl font-black text-xl hover:bg-white/90 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Next Step <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] bg-primary text-white py-5 rounded-2xl font-black text-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ApplyPage;
