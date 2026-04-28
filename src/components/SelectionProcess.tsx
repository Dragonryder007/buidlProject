"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap, Code2, Rocket, Search } from 'lucide-react';

const SelectionProcess = () => {
    const lookFor = [
        {
            icon: ShieldCheck,
            title: "Proof of work",
            desc: "Live projects, GitHub, smart contracts, shipped products"
        },
        {
            icon: Code2,
            title: "Technical depth",
            desc: "You can code, debug, and figure things out without hand-holding"
        },
        {
            icon: Zap,
            title: "Execution speed",
            desc: "You ship fast, iterate faster, and learn by doing"
        },
        {
            icon: Rocket,
            title: "Builder mindset",
            desc: "You take ownership, not instructions"
        },
        {
            icon: Search,
            title: "Web3 alignment",
            desc: "Curiosity or experience in Ethereum, crypto, or decentralized systems"
        }
    ];

    const rejected = [
        { title: "No proof of work", desc: "Empty GitHub or no projects to show" },
        { title: "Idea-only thinking", desc: "Focusing on theory without execution" },
        { title: "Passive mindset", desc: "Waiting to be told what to do" },
        { title: "Dependent learning", desc: "Waiting for guidance instead of building" }
    ];

    return (
        <section id="process" className="py-32 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-24">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase"
                    >
                        SELECTION
                    </motion.h2>
                    <p className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tight mb-4">
                        We select builders, not applicants.
                    </p>
                    <p className="text-white/40 text-lg font-bold italic">
                        If you don't build, you won't get in.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 mb-32">
                    {/* What we look for */}
                    <div className="space-y-10">
                        <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </span>
                            What we look for
                        </h3>
                        <div className="space-y-6">
                            {lookFor.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-6 border-white/5 flex gap-6 group hover:border-green-500/20 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-green-500/10 transition-colors">
                                        <item.icon className="w-6 h-6 text-white group-hover:text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black mb-1 uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* What gets you rejected */}
                    <div className="space-y-10">
                        <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </span>
                            What gets you rejected
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {rejected.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-8 border-white/5 hover:border-red-500/20 transition-all group"
                                >
                                    <h4 className="text-lg font-black mb-3 uppercase tracking-tight text-white/90 group-hover:text-red-400 transition-colors">{item.title}</h4>
                                    <p className="text-white/40 text-xs leading-relaxed italic">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                        
                        {/* Process Section Integrated */}
                        <div className="pt-12 mt-12 border-t border-white/5">
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Selection Process</h3>
                            <div className="space-y-4">
                                {[
                                    { step: '01', text: 'Apply with proof of work' },
                                    { step: '02', text: 'Technical & builder review' },
                                    { step: '03', text: 'Final shortlist into BUIDL3 pipeline' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <span className="text-primary font-black text-lg leading-none">{item.step}</span>
                                        <span className="text-white/80 font-bold tracking-tight">— {item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Acceptance Section */}
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-12 md:p-16 border-primary/20 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-primary/5 -z-10 blur-3xl rounded-full"></div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">Acceptance is limited.</h3>
                        <p className="text-white/60 mb-10 text-lg max-w-xl mx-auto">
                            Top builders move into the elite layers of our pipeline for maximum exposure and growth.
                        </p>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.2em]">
                            <span className="text-white/40">BUIDL3 SPRINT</span>
                            <ArrowRight className="w-4 h-4 text-primary" />
                            <span className="text-white/80">BUIDL3 HOUSE</span>
                            <ArrowRight className="w-4 h-4 text-primary" />
                            <span className="text-primary">Funding pathways</span>
                        </div>
                    </motion.div>

                    <div className="text-center mt-20">
                        <p className="text-2xl font-black text-white/20 uppercase tracking-widest leading-relaxed">
                            This is not a program for everyone. <br />
                            <span className="text-white">It’s a pipeline for people who build.</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SelectionProcess;
