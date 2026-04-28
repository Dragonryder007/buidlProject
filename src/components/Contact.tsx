import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter">
          📩 <span className="gradient-text">CONTACT</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Email */}
          <a 
            href="mailto:contact@buidl3.week" 
            className="glass-card p-8 group hover:border-primary/50 transition-all transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-white/50 text-sm">contact@buidl3.week</p>
          </a>

          {/* Telegram */}
          <a 
            href="https://t.me/build3"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-8 group hover:border-accent/50 transition-all transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg width="1em" height="1em" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.985 18.543c.302.213.69.267 1.038.136.347-.133.602-.429.678-.788.815-3.829 2.791-13.52 3.533-17.002a.732.732 0 0 0-.244-.71.75.75 0 0 0-.747-.132C18.313 1.502 6.207 6.044 1.258 7.875a.775.775 0 0 0-.508.749c.012.332.235.62.556.716 2.22.664 5.132 1.587 5.132 1.587S7.8 15.038 8.51 17.13c.089.262.294.469.565.54.27.07.559-.004.76-.194l2.903-2.74s3.349 2.455 5.248 3.808ZM7.663 10.408 9.237 15.6l.35-3.288L19.135 3.7a.26.26 0 0 0 .031-.353.266.266 0 0 0-.352-.06l-11.15 7.121Z" fill="#fff"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Telegram</h3>
            <p className="text-white/50 text-sm">Join our Telegram</p>
          </a>
        </div>

        <div className="mt-16 p-8 glass-card border-dashed border-white/10">
          <p className="text-white/40 italic">
            "Buidling something for Devcon? Let's chat and see how we can help you scale."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
