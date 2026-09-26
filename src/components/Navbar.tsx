import React, { useState, useEffect } from 'react';
import { PROFILE } from '../data/profile';
import { FileText, ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Overview', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills & Stack', href: '#skills' },
  { name: 'Simulator', href: '#simulator' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Honors', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Section spy detection
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3 sm:py-4">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-5 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-[#151F30]/90 backdrop-blur-xl shadow-xl shadow-black/40 border border-[#263449]'
            : 'bg-[#151F30]/75 backdrop-blur-md border border-[#263449]/70 shadow-lg shadow-black/20'
        }`}
      >
        {/* Brand Monogram */}
        <a
          href="#hero"
          data-cursor="Home"
          className="flex items-center gap-3 group focus:outline-none rounded-xl"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#38BDF8] to-[#A78BFA] p-[1px] shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0B1220] rounded-[11px] flex items-center justify-center font-display font-black text-xs tracking-wider text-[#38BDF8]">
              YS
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-wide text-white group-hover:text-[#38BDF8] transition-colors">
              {PROFILE.name}
            </span>
            <span className="font-mono text-[10px] text-[#38BDF8] font-semibold tracking-wider uppercase">
              Data Analyst
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Section Spy */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0B1220]/80 p-1.5 rounded-full border border-[#263449] backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                data-cursor="Navigate"
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-200 font-medium ${
                  isActive
                    ? 'text-[#38BDF8] font-bold bg-[#151F30] shadow-sm border border-[#263449]'
                    : 'text-slate-400 hover:text-white hover:bg-[#151F30]/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/assets/Yugesh_Resume_main.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Download"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-[#38BDF8] bg-[#0B1220] hover:bg-[#151F30] border border-[#263449] transition-all font-semibold shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Resume</span>
          </a>

          <a
            href="#contact"
            data-cursor="Connect"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-sans font-semibold text-[#0B1220] bg-gradient-to-r from-[#38BDF8] to-[#A78BFA] hover:opacity-95 shadow-md shadow-[#38BDF8]/20 transition-all hover:scale-105 active:scale-95"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-[#0B1220] border border-[#263449] text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-5 rounded-2xl bg-[#151F30]/95 backdrop-blur-2xl border border-[#263449] shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-[#38BDF8] hover:bg-[#0B1220] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#263449] flex flex-col gap-2">
            <a
              href="/assets/Yugesh_Resume_main.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0B1220] border border-[#263449] text-slate-200 text-xs font-mono font-semibold hover:text-[#38BDF8]"
            >
              <FileText className="w-4 h-4 text-[#38BDF8]" />
              <span>Download Resume</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#A78BFA] text-[#0B1220] text-xs font-sans font-semibold shadow-md"
            >
              <span>Contact Directly</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
