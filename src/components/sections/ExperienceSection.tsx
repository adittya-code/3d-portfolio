'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string;
  responsibilities?: string;
  technologies?: string;
  logoUrl?: string;
  isActive?: boolean;
}

interface ExperienceSectionProps {
  heading?: string;
  subtitle?: string;
  experiences?: ExperienceItem[];
}

export default function ExperienceSection({
  heading = 'Experience & Contributions',
  subtitle = 'My open-source contributions, community projects, and practical development experience.',
  experiences = [],
}: ExperienceSectionProps) {
  const activeExperiences = experiences.filter((exp) => exp.isActive !== false);

  return (
    <section id="experience" className="py-24 bg-dark-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono text-cyber-cyan uppercase tracking-widest mb-2 flex items-center justify-center space-x-2">
            <Briefcase className="w-4 h-4 text-cyber-cyan" />
            <span>// {heading}</span>
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {heading}
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-0.5 bg-gradient-to-b from-cyber-cyan via-cyber-blue to-cyber-purple -translate-x-1/2 opacity-30" />

          <div className="space-y-12">
            {activeExperiences.map((exp, idx) => {
              let respList: string[] = [];
              if (exp.responsibilities) {
                try {
                  respList = JSON.parse(exp.responsibilities);
                } catch (e) {
                  respList = exp.responsibilities.split('\n').filter(Boolean);
                }
              }

              const isEven = idx % 2 === 0;
              const dateDisplay = exp.current
                ? `${exp.startDate} - Present`
                : exp.endDate
                ? `${exp.startDate} - ${exp.endDate}`
                : exp.startDate;

              return (
                <motion.div
                  key={exp.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dark-950 border-2 border-cyber-cyan flex items-center justify-center z-20 shadow-glow-cyan">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <div className="bg-dark-900/80 border border-white/10 hover:border-cyber-cyan/40 p-6 rounded-2xl backdrop-blur-md shadow-glass transition-all duration-300">
                      
                      {/* Company & Role */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-cyber-cyan bg-cyber-cyan/10 px-3 py-1 rounded-full border border-cyber-cyan/20">
                          {exp.position}
                        </span>
                        <div className="flex items-center space-x-1 text-[11px] font-mono text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{dateDisplay}</span>
                        </div>
                      </div>

                      <h4 className="text-xl font-display font-bold text-white mt-1">{exp.company}</h4>

                      {exp.location && (
                        <div className="flex items-center space-x-1 text-xs text-slate-400 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{exp.location}</span>
                        </div>
                      )}

                      <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Responsibilities list */}
                      {respList.length > 0 && (
                        <div className="mt-4 space-y-2 pt-3 border-t border-white/5">
                          {respList.map((resp, rIdx) => (
                            <div key={rIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan mt-0.5 flex-shrink-0" />
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack */}
                      {exp.technologies && (
                        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                          {exp.technologies.split(',').map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-mono bg-dark-950 border border-white/10 text-slate-300 px-2.5 py-1 rounded-md"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
