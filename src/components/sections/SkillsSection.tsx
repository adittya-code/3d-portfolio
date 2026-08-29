'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Box, Server, Wrench, Layers, Terminal, Sparkles } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  description?: string;
  isActive?: boolean;
}

interface SkillsSectionProps {
  heading?: string;
  subtitle?: string;
  skills?: SkillItem[];
}

export default function SkillsSection({
  heading = 'Skills & Technologies',
  subtitle = 'Technologies and tools I use to build practical web applications and solve programming problems.',
  skills = [],
}: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Tools'];

  const filteredSkills = skills.filter((skill) => {
    if (skill.isActive === false) return false;
    if (activeCategory === 'All') return true;
    return skill.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Languages': return Cpu;
      case 'Frontend': return Box;
      case 'Backend': return Server;
      case 'Tools': return Wrench;
      default: return Layers;
    }
  };

  return (
    <section id="skills" className="py-24 bg-dark-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono text-cyber-cyan uppercase tracking-widest mb-2 flex items-center justify-center space-x-2">
            <Code2 className="w-4 h-4 text-cyber-cyan" />
            <span>// {heading}</span>
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {heading}
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-medium font-mono transition-all duration-200 ${
                  isActive
                    ? 'bg-cyber-cyan text-dark-950 shadow-glow-cyan font-bold'
                    : 'bg-dark-900 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            const CatIcon = getCategoryIcon(skill.category);
            return (
              <motion.div
                key={skill.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-dark-900/60 border border-white/10 hover:border-cyber-cyan/40 p-6 rounded-2xl backdrop-blur-md transition-all duration-300 shadow-glass hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-950 border border-white/10 flex items-center justify-center text-cyber-cyan group-hover:border-cyber-cyan/50 group-hover:bg-cyber-cyan/10 transition-all">
                      <CatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base group-hover:text-cyber-cyan transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{skill.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyber-cyan bg-cyber-cyan/10 px-2.5 py-1 rounded-lg">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-dark-950 rounded-full overflow-hidden mb-3 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple rounded-full"
                  />
                </div>

                {skill.description && (
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
