"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import TicketTimer from './TicketTimer';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/hero-bg.png')" }}
            />
            {/* Dark overlay to keep text readable */}
            <div className="absolute inset-0 bg-black/80" />
            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90" />

            {/* Existing glow blobs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex flex-col items-center gap-1 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-primary mb-10">
                            <div className="flex items-center gap-2 font-black tracking-[0.3em] text-sm uppercase">
                                <Sparkles className="w-4 h-4" />
                                BUIDL3
                            </div>
                            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                Ethereum Builder Pipeline for Devcon
                            </div>
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] drop-shadow-2xl uppercase">
                            Ship on <span className="gradient-text">Ethereum.</span> <br />
                            <span className="text-white/90">Earn your place</span> <br />
                            <span className="text-white/70">at Devcon.</span>
                        </h1>
                        
                        <div className="max-w-3xl mx-auto mb-12 space-y-6">
                            <p className="text-xl md:text-2xl text-white font-bold tracking-tight">
                                From 1,000+ developers → 20 high-signal builders → live onchain projects
                            </p>
                            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
                                Pre-Devcon sprints, university activations, and a final Ethereum hacker house producing real GitHub output for the ecosystem.
                            </p>
                        </div>

                        <div className="mt-4 w-full flex justify-center mb-12">
                            <TicketTimer targetDate="2026-05-12T15:00:00Z" />
                        </div>
                        
                        <div className="flex flex-col items-center gap-8">
                            <div className="text-primary font-black tracking-widest uppercase text-sm">
                                Apply. Get selected. Ship onchain.
                            </div>
                            
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
                                <Link 
                                    href="/apply"
                                    className="group relative bg-white text-black px-12 py-6 rounded-2xl font-black text-2xl hover:bg-white/90 transition-all flex items-center gap-3 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                                >
                                    <span className="relative z-10">Apply Now</span>
                                    <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </Link>
                                
                                <a 
                                    href="https://t.me/build3"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-10 py-6 rounded-2xl font-bold text-xl border border-white/10 hover:bg-white/5 transition-all flex items-center gap-3"
                                >
                                    Join Telegram
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2"
            >
                <div className="w-1 h-2 bg-primary rounded-full"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
