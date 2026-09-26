import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/placeholder';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const isPlaceholder = endpoint.includes('placeholder');

    if (isPlaceholder) {
      setTimeout(() => {
        setStatus('success');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#38BDF8', '#A78BFA', '#34D399', '#93C5FD'],
        });
      }, 700);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#38BDF8', '#A78BFA', '#34D399', '#93C5FD'],
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg('Failed to send transmission. Please use direct email.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please email directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#151F30] p-8 sm:p-12 rounded-3xl border border-[#263449] text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-[#0B1220] border border-[#263449] text-[#34D399] flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-display font-bold text-2xl text-white">
          Transmission Received!
        </h3>
        <p className="font-sans text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out, {formData.name}. I have received your message and will respond promptly via <span className="text-[#38BDF8] font-semibold">{formData.email}</span>.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setFormData({ name: '', email: '', subject: '', message: '' });
          }}
          data-cursor="Reset"
          className="mt-4 px-6 py-2.5 rounded-xl font-mono text-xs bg-[#0B1220] hover:bg-[#1A2238] border border-[#263449] text-slate-300 hover:text-white font-semibold transition-all shadow-sm cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#151F30] p-6 sm:p-10 rounded-3xl border border-[#263449] space-y-5 shadow-xl">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs text-slate-300 block font-semibold">
            Your Name <span className="text-[#38BDF8]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#263449] text-sm text-white placeholder-slate-500 focus:outline-none focus:bg-[#0B1220] focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all font-sans"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs text-slate-300 block font-semibold">
            Your Email <span className="text-[#38BDF8]">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@company.com"
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#263449] text-sm text-white placeholder-slate-500 focus:outline-none focus:bg-[#0B1220] focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all font-sans"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label className="font-mono text-xs text-slate-300 block font-semibold">
          Topic / Role
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Data Analyst Opportunity / Project Collaboration"
          className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#263449] text-sm text-white placeholder-slate-500 focus:outline-none focus:bg-[#0B1220] focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all font-sans"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="font-mono text-xs text-slate-300 block font-semibold">
          Message <span className="text-[#38BDF8]">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Share project details or organizational requirements..."
          className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#263449] text-sm text-white placeholder-slate-500 focus:outline-none focus:bg-[#0B1220] focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all font-sans resize-none"
        />
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-xs font-mono text-rose-300">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        data-cursor="Send"
        className="w-full py-4 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B1220] bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#A78BFA] hover:opacity-95 shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#0B1220]" />
            <span>Transmitting Data...</span>
          </>
        ) : (
          <>
            <span>Submit Message</span>
            <Send className="w-4 h-4 text-[#0B1220]" />
          </>
        )}
      </button>
    </form>
  );
}
