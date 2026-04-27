import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter">
          📩 <span className="gradient-text">CONTACT</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Email */}
          <a 
            href="mailto:contact@build3.week" 
            className="glass-card p-8 group hover:border-primary/50 transition-all transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-white/50 text-sm">contact@build3.week</p>
          </a>

          {/* Phone */}
          <a 
            href="tel:+91XXXXXXXXXX" 
            className="glass-card p-8 group hover:border-secondary/50 transition-all transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-white/50 text-sm">+91 XXXXXXXXXX</p>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/91XXXXXXXXXX" 
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-8 group hover:border-accent/50 transition-all transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
            <p className="text-white/50 text-sm">Instant Support</p>
          </a>
        </div>

        <div className="mt-16 p-8 glass-card border-dashed border-white/10">
          <p className="text-white/40 italic">
            "Building something for Devcon? Let's chat and see how we can help you scale."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
