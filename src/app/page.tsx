import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import About from '@/components/About';
import ProgramStructure from '@/components/ProgramStructure';
import GoldenTicketSection from '@/components/GoldenTicketSection';
import EventsSection from '@/components/EventsSection';
import WhoShouldApply from '@/components/WhoShouldApply';
import SelectionProcess from '@/components/SelectionProcess';
import Ecosystem from '@/components/Ecosystem';
import BuilderDinner from '@/components/BuilderDinner';
import Contact from '@/components/Contact';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Mission />
      <About />
      <ProgramStructure />      
      <GoldenTicketSection />
      <EventsSection />
      <WhoShouldApply />
      <Ecosystem />
      <SelectionProcess />      
      <BuilderDinner />
      
      {/* Final CTA Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="glass-card p-12 md:p-24 overflow-hidden relative border-primary/30 text-center">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">
              READY TO BUIDL3 THE <br />
              <span className="gradient-text">NEXT BIG THING?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Join the elite buidlers at Devcon Mumbai. Applications are reviewed on a rolling basis. 
              Don't miss your chance to be part of the pipeline.
            </p>
            <Link 
              href="/apply"
              className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-2xl font-black text-2xl hover:bg-white/90 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Apply Now <ArrowRight className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </section>
      
      <WaitlistSection />
      <Contact />
      
      <Footer />
    </main>
  );
}
