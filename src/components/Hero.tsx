"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-bold mb-8">
                            <Sparkles className="w-4 h-4" />
                            <span>BUILDING AT DEVCON SEA</span>
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-tight drop-shadow-2xl">
                            BUILD<span className="text-primary">3</span> WEEK <br />
                            <span className="gradient-text">Build at Devcon</span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-white mb-4 max-w-2xl mx-auto leading-relaxed font-black drop-shadow-lg">
                            Apply. Get selected. Build.
                        </p>
                        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                            A high-signal builder pipeline for developers who want to build real products, collaborate with serious builders, and prove their skills.
                        </p>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <Link 
                                href="/apply"
                                className="group relative bg-white text-black px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/90 transition-all flex items-center gap-3 overflow-hidden"
                            >
                                <span className="relative z-10">Apply Now</span>
                                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Link>
                            
                            <Link 
                                href="#about"
                                className="px-10 py-5 rounded-2xl font-bold text-xl border border-white/10 hover:bg-white/5 transition-all"
                            >
                                Learn More
                            </Link>
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
