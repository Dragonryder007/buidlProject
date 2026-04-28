"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Users, Rocket, Presentation, Coins } from 'lucide-react';

const About = () => {
    const perks = [
        {
            icon: BookOpen,
            title: "Structured Learning",
            desc: "Master the core concepts of Ethereum, smart contracts, and Web3 infrastructure."
        },
        {
            icon: Code,
            title: "Guided Building",
            desc: "Get hands-on mentorship from senior engineers to architect your product correctly."
        },
        {
            icon: Users,
            title: "Team Formation",
            desc: "Find your co-founders and build high-performance squads with curated talent."
        },
        {
            icon: Rocket,
            title: "Live Product Dev",
            desc: "Move from idea to mainnet. We prioritize shipping real code over theoretical demos."
        },
        {
            icon: Presentation,
            title: "Demo Exposure",
            desc: "Present your work to the global Ethereum community and ecosystem leaders at Devcon."
        },
        {
            icon: Coins,
            title: "Funding Access",
            desc: "Fast-track your startup to grants, accelerators, and venture capital funding."
        }
    ];

    return (
        <section id="about" className="py-32 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">What <span className="gradient-text">You Get</span></h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-xl leading-relaxed">
                        A comprehensive ecosystem designed to take you from a curious developer to a successful Web3 founder.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {perks.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-10 hover:border-primary/50 transition-all group bg-white/[0.01]"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all group-hover:scale-110">
                                <item.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{item.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
