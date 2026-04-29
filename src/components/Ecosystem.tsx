"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, MessageCircle, Compass, Ticket, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const Ecosystem = () => {
    const partners = [
        "CryptoMondays India",
        "Cypherpunk Events",
        "Devcon Mumbai",
        "Ethereum Foundation",
        "BUIDL3 Foundation",
        "Web3 Bharat"
    ];

    return (
        <section id="ecosystem" className="py-24">
            <div className="container mx-auto px-6">
                <div className="glass-card p-12 overflow-hidden relative border-primary/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]"></div>
                    
                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">Our Ecosystem</h2>
                            <p className="text-white/60 font-bold">Built with the Ethereum community</p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-12">
                            <p className="text-sm font-black uppercase tracking-[0.3em] text-white/30">Supported by:</p>
                            <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
                                <div className="text-xl md:text-3xl font-black tracking-tight text-center hover:text-primary transition-all cursor-default flex items-center gap-3">
                                    Cypherpunk.space
                                </div>
                                <div className="text-xl md:text-2xl font-black tracking-tight text-center hover:text-primary transition-all cursor-default flex items-center gap-3">
                                    CryptoMondays 🇮🇳 India
                                </div>
                                <div className="text-xl md:text-2xl font-black tracking-tight text-center hover:text-secondary transition-all cursor-default flex items-center gap-3">
                                    Cypherpunk. India 🇮🇳
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Devcon Special Section */}
                <div className="mt-12 glass-card p-8 md:p-12 border-secondary/30 relative overflow-hidden group">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/30 transition-colors"></div>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase animate-pulse">
                                <AlertCircle className="w-4 h-4" /> Priority Access
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                                BUIDL3 AT <span className="text-secondary">Devcon Mumbai</span>
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Devcon is the ultimate gathering for the Ethereum ecosystem. We provide merit-based support for tickets and housing to selected BUIDL3 participants. 
                                <span className="block mt-4 font-bold text-white">Limited availability. Merit-based selection only.</span>
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link 
                                    href="/apply"
                                    className="bg-secondary text-black px-8 py-4 rounded-xl font-black text-lg hover:bg-secondary/90 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                                >
                                    Register Interest for Devcon
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/3 grid grid-cols-1 gap-4 w-full">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                                    <Ticket className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <div className="font-bold">Ticket Support</div>
                                    <div className="text-xs text-white/40">For top contributors</div>
                                </div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <div className="font-bold">Buidler Housing</div>
                                    <div className="text-xs text-white/40">Exclusive villa access</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                    <div className="glass-card p-10 flex flex-col gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                            <MessageCircle className="w-7 h-7 text-secondary" />
                        </div>
                        <h3 className="text-2xl font-bold">Community Access</h3>
                        <p className="text-white/60 leading-relaxed">
                            Once accepted, you gain access to our private Telegram group where we coordinate all activities, share exclusive alpha, and connect with mentors.
                        </p>
                        <a href="https://t.me/buidlweek" target="_blank" className="text-secondary font-bold hover:underline flex items-center gap-2">
                            Join Public Channel <MessageCircle className="w-4 h-4" />
                        </a>
                    </div>
                    
                    <div className="glass-card p-10 flex flex-col gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <ShieldCheck className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold">Credibility & Trust</h3>
                        <p className="text-white/60 leading-relaxed">
                            Backed by CryptoMondays and Cypherpunk Events, BUIDL3 is a recognized name in the global buidler ecosystem.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-4 py-1.5 rounded-full bg-white/5 text-xs font-bold border border-white/10">VERIFIED PROGRAM</div>
                            <div className="px-4 py-1.5 rounded-full bg-white/5 text-xs font-bold border border-white/10">DEVCON RECOGNIZED</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ecosystem;
