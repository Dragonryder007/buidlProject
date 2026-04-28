"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Unlock, Terminal, ShieldCheck, Code2, Github, Timer, Rocket, Presentation, Users, Coins } from 'lucide-react';

const WhoShouldApply = () => {
    return (
        <section id="who" className="py-32 relative bg-black">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-20">
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-7xl md:text-9xl font-black mb-6 tracking-tighter uppercase gradient-text inline-block"
                        >
                            Apply
                        </motion.h2>
                        <p className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-8">
                            Not for everyone.
                        </p>
                        <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-2xl">
                            BUIDL3 selects the top 5% of builders willing to ship on Ethereum during Devcon.
                        </p>
                    </div>

                    {/* Pillars */}
                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {[
                            { title: "No learning.", desc: "This is not a course." },
                            { title: "No spectators.", desc: "This is not a conference." },
                            { title: "Only builders.", desc: "This is a pipeline." }
                        ].map((item, i) => (
                            <div key={i} className="border-l-2 border-primary pl-6 py-2">
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">{item.title}</h3>
                                <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Split Sections */}
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Minimum Bar */}
                        <div className="space-y-10">
                            <div className="flex items-center gap-4">
                                <Terminal className="w-8 h-8 text-secondary" />
                                <h3 className="text-3xl font-black uppercase tracking-tighter">Minimum Bar</h3>
                            </div>
                            
                            <ul className="space-y-6">
                                {[
                                    { icon: Timer, text: "1+ year building" },
                                    { icon: Code2, text: "Solidity / Rust basics" },
                                    { icon: Github, text: "Active GitHub (real commits)" },
                                    { icon: ShieldCheck, text: "Full-time commitment" }
                                ].map((item, i) => (
                                    <motion.li 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4 text-white/80"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <item.icon className="w-5 h-5 text-secondary" />
                                        </div>
                                        <span className="text-xl font-bold tracking-tight">{item.text}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* If Selected */}
                        <div className="space-y-10">
                            <div className="flex items-center gap-4">
                                <Unlock className="w-8 h-8 text-primary" />
                                <h3 className="text-3xl font-black uppercase tracking-tighter">If Selected</h3>
                            </div>

                            <div className="glass-card p-8 border-primary/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                                <p className="text-primary font-black uppercase tracking-widest text-sm mb-8">You enter the pipeline:</p>
                                
                                <ul className="space-y-6">
                                    {[
                                        { icon: Rocket, text: "Build & deploy on Ethereum" },
                                        { icon: Users, text: "Make it to the top 20" },
                                        { icon: Coins, text: "Join a private Devcon builder dinner" },
                                        { icon: Presentation, text: "Showcase what you shipped" },
                                        { icon: ShieldCheck, text: "Get ecosystem exposure + funding pathways" }
                                    ].map((item, i) => (
                                        <motion.li 
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-4 text-white/70"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                                            <span className="text-sm font-medium leading-relaxed">{item.text}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoShouldApply;
