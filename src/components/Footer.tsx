"use client";

import React from 'react';
import Link from 'next/link';
import { X, Github, Mail, ArrowUpRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="pt-24 pb-12 border-t border-white/5 bg-black">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <Link href="/" className="text-2xl font-black tracking-tighter mb-6 block">
                            BUILD<span className="text-primary">3</span> WEEK
                        </Link>
                        <p className="text-white/50 max-w-sm leading-relaxed mb-8">
                            Empowering the next generation of Web3 builders through intensive residency and execution-focused programs.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <X className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-white/50">
                            <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#program" className="hover:text-white transition-colors">Program</Link></li>
                            <li><Link href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</Link></li>
                            <li><Link href="/apply" className="hover:text-white transition-colors">Apply Now</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-white/50">
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">Code of Conduct <ArrowUpRight className="w-3 h-3" /></a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/30 text-sm">
                        © 2026 BUILD3 FOUNDATION. ALL RIGHTS RESERVED.
                    </p>
                    <p className="text-white/30 text-sm flex items-center gap-2">
                        Built with ❤️ for the <span className="text-primary font-bold">Ethereum Ecosystem</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
