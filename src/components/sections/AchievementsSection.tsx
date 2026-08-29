'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Calendar } from 'lucide-react';

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  certificateUrl?: string;
  credentialId?: string;
  credentialUrl?: string;
  isActive?: boolean;
}

interface AchievementsSectionProps {
  heading?: string;
  subtitle?: string;
  achievements?: AchievementItem[];
}

export default function AchievementsSection({
  heading = 'Achievements & Certifications',
  subtitle = 'A record of my open-source contributions, community participation, and certifications.',
  achievements = [],
}: AchievementsSectionProps) {
  const activeAchievements = achievements.filter((ach) => ach.isActive !== false);

  return (
    <section id="achievements" className="py-24 bg-dark-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono text-cyber-cyan uppercase tracking-widest mb-2 flex items-center justify-center space-x-2">
            <Award className="w-4 h-4 text-cyber-cyan" />
            <span>// {heading}</span>
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {heading}
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeAchievements.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-dark-900/70 border border-white/10 hover:border-cyber-cyan/40 p-6 rounded-3xl backdrop-blur-xl shadow-glass transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-lg">{item.title}</h4>
                      <span className="text-xs text-cyber-cyan font-mono">{item.organization}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-dark-950 px-2.5 py-1 rounded-md border border-white/5 flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
                {item.credentialId ? (
                  <span className="text-[11px] font-mono text-slate-400">
                    ID: <span className="text-white">{item.credentialId}</span>
                  </span>
                ) : <span />}

                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-mono text-cyber-cyan hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
