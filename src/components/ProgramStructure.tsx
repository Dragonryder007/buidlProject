"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, FastForward, Home } from 'lucide-react';

const ProgramStructure = () => {
    const layers = [
        {
            id: 'UNI',
            title: 'BUIDL UNI',
            level: 'Level 1: Entry',
            icon: GraduationCap,
            desc: 'For students and newcomers. Learn the fundamentals of Web3 development and smart contract security.',
            color: 'from-blue-500/20 to-cyan-500/20',
            accent: 'text-cyan-400'
        },
        {
            id: 'DEV',
            title: 'BUIDL DEV',
            level: 'Level 2: Intermediate',
            icon: Code2,
            desc: 'For developers moving beyond basics. Focus on building production-ready dApps and protocols.',
            color: 'from-cyan-500/20 to-teal-500/20',
            accent: 'text-teal-400'
        },
        {
            id: 'SPRINT',
            title: 'BUIDL SPRINT',
            level: 'Level 3: Advanced',
            icon: FastForward,
            desc: 'High-intensity building phase. Rapid prototyping and feature execution for existing projects.',
            color: 'from-teal-500/20 to-purple-500/20',
            accent: 'text-purple-400'
        },
        {
            id: 'HOUSE',
            title: 'BUIDL HACKER HOUSE',
            level: 'Level 4: Elite',
            icon: Home,
            desc: 'The inner circle. Live and build with top mentors and founders in an exclusive residency.',
            color: 'from-purple-500/20 to-pink-500/20',
            accent: 'text-pink-400'
        }
    ];

    return (
        <section id="program" className="py-24 bg-white/[0.02]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Program <span className="gradient-text">Structure</span></h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-lg">
                        Our four-stage pipeline is designed to transform enthusiastic developers into elite Web3 architects.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {layers.map((layer, i) => (
                        <motion.div
                            key={layer.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${layer.color} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            <div className="relative glass-card p-8 h-full flex flex-col border-white/5 hover:border-white/20 transition-all duration-500">
                                <div className="mb-8">
                                    <layer.icon className={`w-12 h-12 ${layer.accent}`} />
                                </div>
                                <div className={`text-xs font-bold uppercase tracking-widest ${layer.accent} mb-2`}>
                                    {layer.level}
                                </div>
                                <h3 className="text-2xl font-black mb-4">{layer.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow">
                                    {layer.desc}
                                </p>
                                <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-sm font-bold text-white/80 group-hover:text-white transition-colors cursor-default">
                                    Progress to Next Layer
                                    <div className="w-8 h-0.5 bg-current rounded-full"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramStructure;
