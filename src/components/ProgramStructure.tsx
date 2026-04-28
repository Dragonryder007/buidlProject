"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Rocket, Coins, ChevronRight } from 'lucide-react';

const ProgramStructure = () => {
    const pipeline = [
        {
            title: 'Developers',
            desc: 'Individual contributors and solo hackers join the ecosystem.',
            icon: User,
            color: 'from-blue-500/20 to-cyan-500/20'
        },
        {
            title: 'Teams',
            desc: 'Form high-signal squads through guided collaboration.',
            icon: Users,
            color: 'from-cyan-500/20 to-teal-500/20'
        },
        {
            title: 'Startups',
            desc: 'Build real products with product-market fit in mind.',
            icon: Rocket,
            color: 'from-teal-500/20 to-purple-500/20'
        },
        {
            title: 'Funding',
            desc: 'Get exposure to grants and venture capital for launch.',
            icon: Coins,
            color: 'from-purple-500/20 to-pink-500/20'
        }
    ];

    return (
        <section id="program" className="py-32 bg-white/[0.02] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Built for <span className="gradient-text">Devcon</span></h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-xl leading-relaxed">
                        A program designed to identify and support high-potential builders through a structured pipeline.
                    </p>
                </div>

                <div className="relative">
                    {/* Background connector line for desktop */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0"></div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {pipeline.map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className={`glass-card p-10 h-full flex flex-col items-center text-center border-white/5 hover:border-primary/30 transition-all duration-500 bg-gradient-to-br ${step.color} hover:shadow-[0_0_40px_rgba(147,51,234,0.1)]`}>
                                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                                        <step.icon className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{step.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                    
                                    {i < pipeline.length - 1 && (
                                        <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-background border border-white/10 items-center justify-center">
                                            <ChevronRight className="w-4 h-4 text-white/30" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramStructure;
