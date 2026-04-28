"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Cpu, Users } from 'lucide-react';

const Mission = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-white/[0.01]">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em]">
                            <Globe className="w-4 h-4" />
                            Our Mission
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">
                                Ethereum <span className="gradient-text">Talent</span> Infrastructure.
                            </h2>
                            
                            <p className="text-2xl md:text-4xl text-white/90 font-bold leading-tight tracking-tight">
                                BUIDL3 is an Ethereum builder pipeline designed to convert developers into onchain contributors before Devcon.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
                            <div className="space-y-4">
                                <p className="text-xl text-white/60 leading-relaxed">
                                    Through university activations, public build sprints, and a final hacker house, BUIDL3 produces real projects, GitHub activity, and high-signal builders for the Ethereum ecosystem.
                                </p>
                            </div>
                            
                            <div className="flex flex-col justify-center">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative group"
                                >
                                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all"></div>
                                    <p className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                                        This is not an event.
                                    </p>
                                    <p className="text-3xl font-black text-primary uppercase tracking-tight leading-none">
                                        This is Ethereum talent infrastructure in India. 🇮🇳
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
