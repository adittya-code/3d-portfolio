'use client';

import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Shield } from 'lucide-react';

interface FooterProps {
  siteName?: string;
  footerName?: string;
  footerDescription?: string;
  footerText?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  contactEmail?: string;
}

export default function Footer({
  siteName,
  footerName = 'Aditya Kumar Maurya',
  footerDescription = 'C++ Developer | Full Stack Developer | Problem Solver',
  footerText = '© 2026 Aditya Kumar. All rights reserved.',
  githubUrl = 'https://github.com',
  linkedinUrl = 'https://linkedin.com',
  twitterUrl = '',
  contactEmail = 'aditya@example.com',
}: FooterProps) {
  const nameToDisplay = footerName || siteName || 'Aditya Kumar Maurya';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-950 border-t border-white/10 relative overflow-hidden">
      {/* Glow background pill */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyber-cyan/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <h3 className="font-display font-bold text-xl text-white tracking-wide">{nameToDisplay}</h3>
            {footerDescription && (
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                {footerDescription}
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all shadow-glass"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all shadow-glass"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {twitterUrl && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all shadow-glass"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="w-10 h-10 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all shadow-glass"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{footerText}</p>

          <div className="flex items-center space-x-6">
            <Link href="/admin/login" className="hover:text-cyber-cyan flex items-center space-x-1.5 transition-colors">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10 hover:border-cyber-cyan/40 text-slate-300 hover:text-white transition-all"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
