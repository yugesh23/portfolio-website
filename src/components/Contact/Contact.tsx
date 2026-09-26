import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILE } from '../../data/profile';
import { ContactForm } from './ContactForm';
import { Marquee } from './Marquee';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Youtube,
  MessageCircle,
  FileText,
  ArrowUp,
  Sparkles,
} from 'lucide-react';
import { ScrollHeader } from '../UI/ScrollHeader';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            delay: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative pt-24 pb-12 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800/80 space-y-16 z-20"
    >
      {/* Header */}
      <ScrollHeader
        badge="Initiate Connection"
        title="Let's turn data into business decisions."
        subtitle="Open to full-time Data Analyst and Business Analyst opportunities. Reach out to discuss strategic analytics, automated dashboards, or database pipelines."
      />

      {/* Main Grid: Direct Connect Badges + Light Form */}
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Communication Channels */}
        <div ref={leftColRef} className="lg:col-span-5 space-y-6">
          <div className="bg-[#151F30] p-6 sm:p-8 rounded-3xl border border-[#263449] space-y-6 shadow-xl">
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span>Direct Communication Channels</span>
            </h3>

            <div className="space-y-3.5">
              {/* Email */}
              <a
                href={`mailto:${PROFILE.email}`}
                data-cursor="Email"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] hover:border-[#38BDF8]/50 hover:-translate-y-0.5 transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#151F30] text-[#38BDF8] border border-[#263449] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block uppercase font-medium">
                    Primary Email
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-white group-hover:text-[#38BDF8] font-semibold">
                    {PROFILE.email}
                  </span>
                </div>
              </a>

              {/* Phone / WhatsApp */}
              <a
                href={PROFILE.social.whatsapp || `https://wa.me/917396352627`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="WhatsApp"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] hover:border-[#38BDF8]/50 hover:-translate-y-0.5 transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#151F30] text-[#34D399] border border-[#263449] group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block uppercase font-medium">
                    Direct Phone / WhatsApp
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-white group-hover:text-[#38BDF8] font-semibold">
                    {PROFILE.phone}
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0B1220] border border-[#263449]">
                <div className="p-3 rounded-xl bg-[#151F30] text-[#A78BFA] border border-[#263449]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block uppercase font-medium">
                    Location & Education
                  </span>
                  <span className="font-sans text-xs sm:text-sm text-slate-300 font-medium">
                    {PROFILE.college}
                  </span>
                </div>
              </div>
            </div>

            {/* Social & Resume CTAs */}
            <div className="pt-4 border-t border-[#263449] flex flex-wrap gap-2.5">
              <a
                href={PROFILE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LinkedIn"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] hover:border-[#38BDF8]/50 text-xs font-mono text-slate-300 hover:text-[#38BDF8] font-semibold transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4 text-[#38BDF8]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PROFILE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GitHub"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] hover:border-[#38BDF8]/50 text-xs font-mono text-slate-300 hover:text-white font-semibold transition-all shadow-sm"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>GitHub</span>
              </a>

              {PROFILE.social.youtube && (
                <a
                  href={PROFILE.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="YouTube"
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] hover:border-[#A78BFA]/50 text-xs font-mono text-slate-300 hover:text-white font-semibold transition-all shadow-sm"
                >
                  <Youtube className="w-4 h-4 text-[#A78BFA]" />
                  <span>YouTube</span>
                </a>
              )}

              <a
                href="/assets/Yugesh_Resume_main.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Download"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#38BDF8]/20 to-[#A78BFA]/20 hover:from-[#38BDF8]/30 hover:to-[#A78BFA]/30 border border-[#38BDF8]/50 text-xs font-mono text-[#38BDF8] hover:text-white font-bold transition-all shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Resume PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div ref={rightColRef} className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>

      {/* Skills Marquee */}
      <div className="pt-8">
        <Marquee />
      </div>

      {/* Footer Strip */}
      <footer className="pt-12 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 border-t border-[#263449]/70">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#38BDF8] to-[#A78BFA] flex items-center justify-center font-bold text-[#0B1220] text-[10px] shadow-sm">
            YS
          </div>
          <span>© {new Date().getFullYear()} Hari Sai Yugesh • Data Analyst. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Engineered with React, Three.js, GSAP & Tailwind</span>
          <button
            onClick={scrollToTop}
            data-cursor="Top"
            className="p-2 rounded-lg bg-[#151F30] hover:bg-[#1A2238] border border-[#263449] text-slate-400 hover:text-white transition-colors shadow-sm cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </section>
  );
}
