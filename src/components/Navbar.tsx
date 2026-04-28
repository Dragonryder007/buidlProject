"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Program', href: '#program' },
        { name: 'Ecosystem', href: '#ecosystem' },
        { name: 'Process', href: '#process' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
            }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-black tracking-tighter">
                    BUIDL3
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:flex-row items-center gap-8">
                    {navLinks.map((link, idx) => (
                        <Link 
                            key={link.name} 
                            href={link.href}
                            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                            style={{ order: idx }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link 
                        href="/apply"
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 neon-glow-purple"
                        style={{ order: navLinks.length }}
                    >
                        Apply Now
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-white/5 p-6 flex flex-col gap-6"
                    style={{ flexDirection: 'column' }}
                >
                    {navLinks.map((link, idx) => (
                        <Link 
                            key={link.name} 
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-medium text-white/70 hover:text-white"
                            style={{ order: idx }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link 
                        href="/apply"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-primary text-white text-center py-4 rounded-xl font-bold"
                        style={{ order: navLinks.length }}
                    >
                        Apply Now
                    </Link>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
