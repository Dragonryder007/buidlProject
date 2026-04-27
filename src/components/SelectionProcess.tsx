"use client";

import React from 'react';
import { motion } from 'framer-motion';

const SelectionProcess = () => {
    const steps = [
        {
            num: '01',
            title: 'Digital Application',
            desc: 'Submit your GitHub, portfolio, and proof of building. We screen for technical competence and genuine interest.'
        },
        {
            num: '02',
            title: 'Technical Review',
            desc: 'Our board of core contributors reviews your code samples and project history to verify your "Builder Score".'
        },
        {
            num: '03',
            title: 'The Interview',
            desc: 'A quick 15-minute technical sync to understand your goals for BUILD3 WEEK and align on expectations.'
        },
        {
            num: '04',
            title: 'Golden Ticket',
            desc: 'Selected builders receive their acceptance and gain access to the exclusive BUILD3 WEEK communication channels.'
        }
    ];

    return (
        <section id="process" className="py-24 bg-white/[0.02] relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10 hidden lg:block"></div>
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Selection <span className="text-primary">Process</span></h2>
                    <p className="text-white/50 max-w-2xl mx-auto">
                        We maintain a high bar to ensure the best experience for all participants.
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-12">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center group"
                        >
                            <div className="w-16 h-16 rounded-full bg-background border-2 border-primary mx-auto mb-8 flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(147,51,234,0.2)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all">
                                {step.num}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SelectionProcess;
