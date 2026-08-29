'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
  isActive?: boolean;
}

interface EducationSectionProps {
  heading?: string;
  subtitle?: string;
  education?: EducationItem[];
}

export default function EducationSection({
  heading = 'Education',
  subtitle = 'B.Tech in Computer Science and Engineering at Lovely Professional University.',
  education = [],
}: EducationSectionProps) {
  const activeEducation = education.filter((edu) => edu.isActive !== false);

  return (
    <section id="education" className="py-24 bg-dark-900/60 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono text-cyber-cyan uppercase tracking-widest mb-2 flex items-center justify-center space-x-2">
            <GraduationCap className="w-4 h-4 text-cyber-cyan" />
            <span>// {heading}</span>
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {heading}
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {activeEducation.map((edu, idx) => (
            <motion.div
              key={edu.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-dark-950/80 border border-white/10 hover:border-cyber-cyan/40 p-8 rounded-3xl backdrop-blur-xl shadow-glass transition-all duration-300 relative group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex items-center space-x-1 text-xs font-mono text-slate-400 bg-dark-900 px-3 py-1 rounded-full border border-white/5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
              </div>

              <h4 className="text-xl font-display font-bold text-white">{edu.degree}</h4>
              <p className="text-cyber-cyan text-sm font-mono mt-1">{edu.field}</p>
              <p className="text-slate-300 text-xs font-medium mt-2">{edu.institution}</p>

              {edu.gpa && (
                <div className="inline-flex items-center space-x-1.5 mt-3 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <Award className="w-3.5 h-3.5" />
                  <span>GPA: {edu.gpa}</span>
                </div>
              )}

              {edu.description && (
                <p className="text-slate-400 text-xs sm:text-sm mt-4 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
