'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, Phone, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  heading?: string;
  subtitle?: string;
  contactEmail?: string;
  location?: string;
  phone?: string;
}

export default function ContactSection({
  heading = 'Get In Touch',
  subtitle = 'Have a question, project idea, or opportunity? Feel free to reach out.',
  contactEmail = 'aditya@example.com',
  location = 'Punjab, India',
  phone = '',
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to submit message');

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-dark-900/60 relative overflow-hidden border-t border-white/5">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono text-cyber-cyan uppercase tracking-widest mb-2 flex items-center justify-center space-x-2">
            <Mail className="w-4 h-4 text-cyber-cyan" />
            <span>// {heading}</span>
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {heading}
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Info Side Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-dark-950/80 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-glass space-y-6">
              <h4 className="font-display font-bold text-white text-xl flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-cyber-cyan" />
                <span>Contact Details</span>
              </h4>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase block">Direct Email</span>
                    <a href={`mailto:${contactEmail}`} className="text-sm font-medium text-white hover:text-cyber-cyan transition-colors">
                      {contactEmail}
                    </a>
                  </div>
                </div>

                {location && (
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase block">Location</span>
                      <span className="text-sm font-medium text-white">{location}</span>
                    </div>
                  </div>
                )}

                {phone && (
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase block">Phone / Signal</span>
                      <span className="text-sm font-medium text-white">{phone}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="p-4 rounded-2xl bg-cyber-cyan/5 border border-cyber-cyan/20 text-xs text-slate-300">
                  ⚡ <strong className="text-white">Response Time:</strong> Messages submitted here are saved directly into the secure Admin Inbox. Typical turnaround is under 24 hours.
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-dark-950/80 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-xl shadow-glass">
              
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white">Message Delivered!</h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you for reaching out. Your message has been safely saved in the portfolio database and notified to the administrator.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-xs font-mono text-cyan-400 hover:text-white"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                        Your Name <span className="text-cyber-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-dark-900 border border-white/10 focus:border-cyber-cyan rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                        Your Email <span className="text-cyber-cyan">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-dark-900 border border-white/10 focus:border-cyber-cyan rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Inquiry / Full-time Role"
                      className="w-full bg-dark-900 border border-white/10 focus:border-cyber-cyan rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                      Message <span className="text-cyber-cyan">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project requirements or team details..."
                      className="w-full bg-dark-900 border border-white/10 focus:border-cyber-cyan rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-cyber-cyan text-dark-950 font-display font-semibold text-sm hover:bg-cyan-300 transition-all shadow-glow-cyan flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Transmitting message...</span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
