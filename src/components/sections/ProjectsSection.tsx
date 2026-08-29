'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Github, ExternalLink, X, Code2, Sparkles } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  isActive?: boolean;
}

interface ProjectsSectionProps {
  heading?: string;
  subtitle?: string;
  projects?: ProjectItem[];
}

export default function ProjectsSection({
  heading = 'My Projects',
  subtitle = 'A collection of web applications and practical projects built using modern technologies.',
  projects = [],
}: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const activeProjects = projects.filter((p) => p.isActive !== false);

  return (
    <section id="projects" className="py-24 bg-dark-900/40 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono text-cyber-cyan uppercase tracking-widest mb-2 flex items-center justify-center space-x-2">
            <Box className="w-4 h-4 text-cyber-cyan" />
            <span>// {heading}</span>
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {heading}
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeProjects.map((project, idx) => {
            const techList = project.technologies.split(',').map((t) => t.trim()).filter(Boolean);
            return (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-dark-950/80 border border-white/10 hover:border-cyber-cyan/50 rounded-3xl overflow-hidden backdrop-blur-xl shadow-glass transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  {/* Image Viewport */}
                  <div className="w-full h-56 bg-dark-900 relative overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 bg-dark-850">
                        <Box className="w-12 h-12 text-cyber-cyan opacity-40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-80" />

                    {project.isFeatured && (
                      <div className="absolute top-4 right-4 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-[11px] font-mono px-3 py-1 rounded-full backdrop-blur-md flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured Project</span>
                      </div>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="p-6 space-y-3">
                    <h4 className="text-xl font-display font-bold text-white group-hover:text-cyber-cyan transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {techList.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono bg-dark-900 border border-white/10 text-slate-300 px-2.5 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {techList.length > 4 && (
                        <span className="text-[10px] font-mono bg-dark-900 border border-white/10 text-slate-400 px-2 py-1 rounded-md">
                          +{techList.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
                  <span className="text-xs font-mono text-cyber-cyan group-hover:underline flex items-center space-x-1">
                    <span>Inspect Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>

                  <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-dark-900 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
                        title="View Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-dark-900 border border-white/10 text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Detailed Project Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-dark-900 border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-glass p-6 sm:p-8 relative space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-dark-950 text-slate-400 hover:text-white border border-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Header */}
              <div className="w-full h-64 bg-dark-950 rounded-2xl overflow-hidden border border-white/10 relative">
                {selectedProject.imageUrl ? (
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <Box className="w-16 h-16 text-cyber-cyan" />
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed whitespace-pre-line">
                  {selectedProject.description || selectedProject.shortDescription}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.split(',').map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-dark-950 border border-white/10 text-xs font-mono text-cyber-cyan"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-cyber-cyan text-dark-950 font-display font-semibold text-sm hover:bg-cyan-300 transition-all flex items-center space-x-2 shadow-glow-cyan"
                  >
                    <span>Open Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-dark-950 border border-white/10 text-white font-display font-medium text-sm hover:bg-white/10 transition-all flex items-center space-x-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
