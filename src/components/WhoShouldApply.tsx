"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, UserCheck, Terminal, Cpu, Globe } from 'lucide-react';

const WhoShouldApply = () => {
    const criteria = [
        {
            icon: Terminal,
            title: "Passionate Builders",
            desc: "You live in the terminal and dream in code. You are obsessed with building stuff that works."
        },
        {
            icon: Cpu,
            title: "Protocol Nerds",
            desc: "You care about decentralization, cryptography, and the deep technical stack of Web3."
        },
        {
            icon: Globe,
            title: "Ecosystem Contributors",
            desc: "You want to contribute to the growth of the decentralized ecosystem and build public goods."
        },
        {
            icon: UserCheck,
            title: "Execution Oriented",
            desc: "You value shipping over talking. You have a portfolio of projects that demonstrate your skills."
        }
    ];

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <h2 className="text-4xl font-bold mb-8">Who Should <br /><span className="text-secondary">Apply?</span></h2>
                        <p className="text-white/60 text-lg mb-8 leading-relaxed">
                            BUILD3 WEEK is not for everyone. We are looking for the top 5% of talent who are ready to commit their time and energy to building the future.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Minimum 1 year dev experience",
                                "Basic understanding of Rust/Solidity",
                                "Active GitHub contributor",
                                "Available for the full duration"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/80">
                                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
                        {criteria.map((item, i) => (
                            <div key={i} className="glass-card p-8 border-white/5 hover:border-secondary/20 transition-all">
                                <item.icon className="w-10 h-10 text-secondary mb-6" />
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoShouldApply;
