"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';

const EventsSection = () => {
  const events = [
    {
      title: "BUIDL3 Cohort #1",
      description: "Builders shipped real Ethereum products in a high-intensity 3-week sprint.",
      image: "/events/event1.png",
      link: "https://lu.ma/build3-1",
      date: "Aug 2024"
    },
    {
      title: "Ethereum India Meetup",
      description: "Connecting the next generation of Indian developers with global ecosystem leaders.",
      image: "/events/event2.png",
      link: "https://lu.ma/eth-india",
      date: "July 2024"
    },
    {
      title: "Onchain Summer Sprint",
      description: "A focused week of buidling on Base and Optimism L2 stacks.",
      image: "/events/event3.png",
      link: "https://lu.ma/onchain-summer",
      date: "June 2024"
    }
  ];

  return (
    <section id="events" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">
            Previous <span className="gradient-text">Events</span>
          </h2>
          <p className="text-xl text-white/50 font-bold italic">
            "Real builders. Real products. Real momentum."
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card overflow-hidden border-white/5 hover:border-primary/30 transition-all flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-xs font-black uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1.5 rounded-xl bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest">
                    Luma
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-black mb-4 tracking-tight uppercase group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 flex-1">
                  {event.description}
                </p>
                
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all group/btn"
                >
                  View Event 
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
