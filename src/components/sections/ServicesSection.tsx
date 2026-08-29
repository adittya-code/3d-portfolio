'use client';

import { motion } from 'framer-motion';
import { Box, Layers, Cpu, Server, CheckCircle2, ArrowRight } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string;
  isActive?: boolean;
}

interface ServicesSectionProps {
  heading?: string;
  subtitle?: string;
  services?: ServiceItem[];
}

export default function ServicesSection({
  heading = 'Services',
  subtitle = 'Web development services focused on building responsive, functional, and user-friendly applications.',
  services = [],
}: ServicesSectionProps) {
  const activeServices = services.filter((s) => s.isActive !== false);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Box': return Box;
      case 'Layers': return Layers;
      case 'Cpu': return Cpu;
      case 'Server': return Server;
      default: return Box;
    }
  };

  return (
    <section id="services" className="py-24 bg-dark-900/60 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono text-cyber-cyan uppercase tracking-widest mb-2 flex items-center justify-center space-x-2">
            <Cpu className="w-4 h-4 text-cyber-cyan" />
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
          {activeServices.map((service, idx) => {
            const IconComponent = getIcon(service.icon);
            const featureList = service.features ? service.features.split(',').map((f) => f.trim()) : [];

            return (
              <motion.div
                key={service.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-dark-950/80 border border-white/10 hover:border-cyber-cyan/40 p-8 rounded-3xl backdrop-blur-xl shadow-glass transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h4 className="text-2xl font-display font-bold text-white group-hover:text-cyber-cyan transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature bullet items */}
                  {featureList.length > 0 && (
                    <div className="mt-6 space-y-2.5 pt-4 border-t border-white/5">
                      {featureList.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-2 text-xs text-slate-300 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-cyber-cyan flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <a
                    href="#contact"
                    className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-cyber-cyan hover:text-cyan-300 transition-colors"
                  >
                    <span>Request Service Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
