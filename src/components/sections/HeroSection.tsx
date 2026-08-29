'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Terminal, Code2 } from 'lucide-react';

interface HeroSectionProps {
  data?: {
    badgeText?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    ctaPrimaryText?: string;
    ctaPrimaryUrl?: string;
    ctaSecondaryText?: string;
    ctaSecondaryUrl?: string;
    availability?: string;
  };
  profileData?: {
    name?: string;
    title?: string;
    yearsExperience?: number;
    projectsCompleted?: number;
    techMastered?: number;
  };
  siteSettings?: {
    githubUrl?: string;
    linkedinUrl?: string;
    contactEmail?: string;
  };
}

export default function HeroSection({ data, profileData, siteSettings }: HeroSectionProps) {
  const badgeText = data?.badgeText || 'Open to work & opportunities';
  const heroName = data?.title || profileData?.name || '';
  const subtitle = data?.subtitle || profileData?.title || 'C++ Developer | Full Stack Developer | Problem Solver';
  const description =
    data?.description ||
    'I build efficient software and modern web applications with a focus on clean code, problem solving, and continuous learning.';
  const ctaPrimaryText = data?.ctaPrimaryText || 'Explore My Work';
  const ctaPrimaryUrl = data?.ctaPrimaryUrl || '#projects';
  const ctaSecondaryText = data?.ctaSecondaryText || 'Get In Touch';
  const ctaSecondaryUrl = data?.ctaSecondaryUrl || '#contact';

  const yearsExp = profileData?.yearsExperience ?? 0;
  const projectsDone = profileData?.projectsCompleted ?? 2;
  const techMastered = profileData?.techMastered ?? 8;

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-80px)] w-full pt-28 pb-20 flex flex-col justify-center bg-[#030712] overflow-hidden"
    >
      {/* 1. Ambient Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-purple-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* 2. Cyber Grid Pattern & Radial Highlight Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030712]/70 to-[#030712] pointer-events-none" />

      {/* 3. FULL-SCREEN HERO CONTENT CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-8">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
            <span className="text-xs font-mono font-medium text-cyan-300 tracking-wide">
              {badgeText}
            </span>
          </div>
        </motion.div>

        {/* Hello World Greeting & Main Name Title */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="text-sm font-mono text-slate-400 uppercase tracking-widest flex items-center space-x-2"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Hello, World! I am</span>
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08]"
          >
            {heroName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
            className="pt-1"
          >
            <p className="text-xl sm:text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 font-semibold flex items-center space-x-2">
              <Code2 className="w-6 h-6 text-purple-400 inline shrink-0" />
              <span>{subtitle}</span>
            </p>
          </motion.div>
        </div>

        {/* Headline Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
          className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-3xl font-sans"
        >
          {description}
        </motion.p>

        {/* CTA Buttons Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.85, ease: 'easeOut' }}
          className="pt-2 flex flex-wrap gap-4 items-center"
        >
          <a
            href={ctaPrimaryUrl}
            className="px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-display font-bold text-base hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:scale-[1.02] transition-all flex items-center space-x-2.5"
          >
            <span>{ctaPrimaryText}</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="#resume"
            className="px-7 py-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white font-display font-semibold text-base hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center space-x-2.5 backdrop-blur-md shadow-lg"
          >
            <Download className="w-5 h-5 text-purple-400" />
            <span>Download Resume</span>
          </a>

          <a
            href={ctaSecondaryUrl}
            className="px-7 py-4 rounded-xl bg-transparent text-slate-300 hover:text-white text-base font-semibold transition-colors"
          >
            {ctaSecondaryText}
          </a>
        </motion.div>

        {/* Quick Metrics Bar & Social Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
          className="pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
        >
          {/* Statistics Column */}
          <div className="md:col-span-8 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <div className="text-3xl font-display font-extrabold text-white flex items-center">
                <span>{yearsExp}+</span>
                <Sparkles className="w-5 h-5 text-cyan-400 ml-1.5" />
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Years Experience</div>
            </div>

            <div>
              <div className="text-3xl font-display font-extrabold text-white">{projectsDone}+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Projects Built</div>
            </div>

            <div>
              <div className="text-3xl font-display font-extrabold text-white">{techMastered}+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Technologies</div>
            </div>
          </div>

          {/* Social Links Column */}
          <div className="md:col-span-4 flex items-center md:justify-end space-x-3">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider mr-1">
              Connect:
            </span>
            <a
              href={siteSettings?.githubUrl || 'https://github.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800 transition-all"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={siteSettings?.linkedinUrl || 'https://linkedin.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${siteSettings?.contactEmail || 'aditya.dev@example.com'}`}
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800 transition-all"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
