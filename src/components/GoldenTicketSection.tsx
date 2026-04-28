"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const GoldenTicketSection = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] pointer-events-none"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-primary/50 via-white/10 to-secondary/50 overflow-hidden group">
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative bg-black/90 backdrop-blur-3xl rounded-[2.5rem] p-12 md:p-20 text-center">
                            {/* Icon/Badge */}
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                                className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)]"
                            >
                                <Ticket className="w-12 h-12 text-primary" strokeWidth={1.5} />
                            </motion.div>

                            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic">
                                Golden <span className="gradient-text">Ticket</span>
                            </h2>
                            
                            <p className="text-xl md:text-2xl text-primary font-black uppercase tracking-[0.4em] mb-12">
                                You’re in. Now prove it.
                            </p>

                            <div className="space-y-6 mb-16 text-left max-w-xl mx-auto">
                                {[
                                    "access to private coordination channels",
                                    "entry into the BUIDL3 build pipeline",
                                    "direct connection with other high-signal builders"
                                ].map((item, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                        className="flex items-start gap-4 group/item"
                                    >
                                        <div className="mt-1.5 w-5 h-5 rounded-full border border-primary/50 flex items-center justify-center group-hover/item:bg-primary transition-colors duration-300">
                                            <CheckCircle2 className="w-3 h-3 text-primary group-hover/item:text-black transition-colors" />
                                        </div>
                                        <span className="text-lg md:text-xl text-white/80 font-medium group-hover/item:text-white transition-colors">
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="space-y-2 mb-16">
                                <p className="text-white font-black text-2xl uppercase tracking-tight">
                                    This is not a badge.
                                </p>
                                <p className="text-white/40 font-black text-2xl uppercase tracking-tight italic">
                                    This is a commitment to ship.
                                </p>
                            </div>

                            <Link 
                                href="/apply"
                                className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-2xl font-black text-xl hover:bg-primary hover:text-white transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)] group/btn"
                            >
                                Apply Now 
                                <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GoldenTicketSection;
