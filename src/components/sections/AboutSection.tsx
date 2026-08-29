'use client';

import { motion } from 'framer-motion';
import { User, MapPin, Mail, Phone, Award, Code, Cpu, ShieldCheck } from 'lucide-react';

interface AboutSectionProps {
  data?: {
    name?: string;
    title?: string;
    shortIntro?: string;
    biography?: string;
    aboutHeading?: string;
    aboutSubtitle?: string;
    email?: string;
    phone?: string;
    location?: string;
    avatarUrl?: string;
    yearsExperience?: number;
    projectsCompleted?: number;
    techMastered?: number;
  };
}

export default function AboutSection({ data }: AboutSectionProps) {
  const name = data?.name || 'Aditya Kumar Maurya';
  const title = data?.title || 'C++ Developer | Full Stack Developer | Problem Solver';
  const heading = data?.aboutHeading || 'About Me';
  const subtitle = data?.aboutSubtitle || 'Computer Science student focused on programming, web development, and continuous learning.';
  const biography = data?.biography || 'I am a passionate software developer with a strong interest in C++ programming and full-stack web development. I enjoy solving problems, building efficient applications, and learning new technologies through practical projects.';
  const email = data?.email || 'aditya@example.com';
  const location = data?.location || 'Punjab, India';
  const avatarUrl = data?.avatarUrl || '/uploads/profile-avatar.jpg';

  const stats = [
    { icon: Award, label: 'Years Experience', value: `${data?.yearsExperience ?? 0}+` },
    { icon: Code, label: 'Completed Projects', value: `${data?.projectsCompleted ?? 2}+` },
    { icon: Cpu, label: 'Technologies', value: `${data?.techMastered ?? 8}+` },
    { icon: ShieldCheck, label: 'Code Quality', value: '100%' },
  ];

  return (
    <section id="about" className="py-24 bg-dark-900/60 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono text-cyber-cyan uppercase tracking-widest mb-2 flex items-center justify-center space-x-2">
            <User className="w-4 h-4 text-cyber-cyan" />
            <span>// {heading}</span>
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {heading}
          </h3>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Avatar & Photo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple opacity-40 blur-xl group-hover:opacity-75 transition duration-500" />
              
              <div className="relative rounded-3xl bg-dark-950 border border-white/10 p-4 shadow-glass">
                <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-dark-900 relative">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-dark-850 text-slate-500">
                      <User className="w-20 h-20 text-cyber-cyan mb-2" />
                      <span className="text-xs font-mono text-slate-400">{name}</span>
                    </div>
                  )}
                  
                  {/* Glass Card Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-dark-950/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <h4 className="font-display font-bold text-white text-base">{name}</h4>
                    <p className="text-xs font-mono text-cyan-400">{title}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Biography & Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="bg-dark-950/80 border border-white/10 p-6 rounded-2xl backdrop-blur-md space-y-4">
              <h4 className="text-xl font-display font-bold text-white flex items-center space-x-2">
                <span>Developer Biography</span>
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {biography}
              </p>
            </div>

            {/* Quick Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-dark-950/60 border border-white/10 p-4 rounded-xl flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Location</div>
                  <div className="text-xs font-medium text-white">{location}</div>
                </div>
              </div>

              <div className="bg-dark-950/60 border border-white/10 p-4 rounded-xl flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 flex items-center justify-center text-cyber-purple">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Email</div>
                  <div className="text-xs font-medium text-white truncate max-w-[180px]">{email}</div>
                </div>
              </div>
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-dark-950/80 border border-white/10 p-4 rounded-xl text-center">
                  <stat.icon className="w-5 h-5 text-cyber-cyan mx-auto mb-2" />
                  <div className="text-xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-[11px] font-sans text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
