"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Utensils, Unlock, Mic2, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

const BuilderDinner = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-black">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Content Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-black uppercase tracking-[0.2em]">
                                <Utensils className="w-4 h-4" />
                                Exclusive Access
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">
                                Private <span className="gradient-text">Builder</span> <br />
                                Dinner.
                            </h2>

                            <p className="text-2xl font-black text-white/40 uppercase tracking-tight">
                                Curated. Invite-only. High-signal.
                            </p>

                            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                                <p>
                                    During Devcon Mumbai 2026, selected <span className="text-white font-bold tracking-tight">BUIDL3</span> builders get access to a private dinner experience inside the Jio World Convention ecosystem (NMACC district).
                                </p>
                                <p className="italic font-medium border-l-2 border-primary pl-6">
                                    An intimate, closed-room setting designed for real conversations—not networking noise.
                                </p>
                            </div>

                            <div className="pt-6">
                                <a 
                                    href="https://maps.app.goo.gl/7CLMfE4SMLkiyWwE9?g_st=iw" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 text-secondary font-black uppercase tracking-widest text-sm hover:gap-5 transition-all group"
                                >
                                    <MapPin className="w-5 h-5" />
                                    View on Map (NMACC District)
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                                </a>
                            </div>
                        </motion.div>

                        {/* Grid Side */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Sparkles,
                                    title: "What this unlocks",
                                    items: [
                                        "Sit with serious builders & founders",
                                        "Discuss what you've built—onchain",
                                        "Exchange ideas & feedback",
                                        "Build long-term relationships"
                                    ]
                                },
                                {
                                    icon: Unlock,
                                    title: "Access",
                                    desc: "Only top builders from the pipeline are invited based on:",
                                    items: ["Execution", "Shipped projects", "Signal, not hype"]
                                },
                                {
                                    icon: Mic2,
                                    title: "Builder Showcase",
                                    desc: "Get the opportunity to:",
                                    items: ["Present work in intimate setting", "Explain architecture & decisions", "Direct feedback from experts"]
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Ecosystem Exposure",
                                    desc: "While not a pitch event, create opportunities to:",
                                    items: ["Connect with grant ecosystems", "Explore funding pathways", "Get in front of the right people"]
                                }
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-8 border-white/5 hover:border-primary/20 transition-all group"
                                >
                                    <card.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-xl font-black mb-4 uppercase tracking-tight">{card.title}</h3>
                                    {card.desc && <p className="text-white/40 text-xs font-bold uppercase mb-4 tracking-widest">{card.desc}</p>}
                                    <ul className="space-y-2">
                                        {card.items.map((item, j) => (
                                            <li key={j} className="text-xs text-white/60 flex items-start gap-2">
                                                <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Closing Line */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-32 text-center pt-24 border-t border-white/5"
                    >
                        <p className="text-2xl md:text-4xl font-black text-white/20 uppercase tracking-[0.1em] leading-tight">
                            No panels. No noise. <br />
                            <span className="text-white">Just builders, code, and real conversations.</span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BuilderDinner;
