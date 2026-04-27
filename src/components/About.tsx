"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code, Rocket, Users } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: Zap,
            title: "Execution First",
            desc: "Unlike typical hackathons that focus on demos, we prioritize real building and execution."
        },
        {
            icon: Code,
            title: "Technical Rigor",
            desc: "Deep dive into smart contracts, infrastructure, and scalable Web3 architecture."
        },
        {
            icon: Rocket,
            title: "Launchpad",
            desc: "We don't just build; we ship. Turn your ideas into production-ready startups."
        },
        {
            icon: Users,
            title: "Elite Network",
            desc: "Connect with the top 1% of builders, investors, and ecosystem leaders at Devcon."
        }
    ];

    return (
        <section id="about" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">What is <span className="text-primary">BUILD3 WEEK</span>?</h2>
                            <p className="text-white/60 text-lg mb-8 leading-relaxed">
                                BUILD3 WEEK is an intensive builder residency occurring during Devcon. It is designed for those who find traditional hackathons too shallow. 
                                We provide a high-pressure, high-output environment where the focus is on shipping real code that matters.
                            </p>
                            <p className="text-white/60 text-lg mb-8 leading-relaxed">
                                Our goal is to filter out the noise and create a concentrated pocket of talent that is obsessed with the future of the decentralized web.
                            </p>
                        </motion.div>
                    </div>
                    
                    <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
                        {features.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-8 hover:border-primary/30 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <item.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-white/50 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
