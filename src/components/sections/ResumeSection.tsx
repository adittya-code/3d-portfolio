'use client';

import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle2, ExternalLink, Eye } from 'lucide-react';

export interface ResumeData {
  title?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  updatedAt?: string | Date;
}

export interface ResumeData {
  title?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  updatedAt?: string | Date;
}

interface ResumeSectionProps {
  heading?: string;
  subtitle?: string;
  data?: ResumeData;
}

export default function ResumeSection({
  heading = 'Resume',
  subtitle = 'View or download my latest resume for more details about my education, skills, projects, and experience.',
  data,
}: ResumeSectionProps) {
  const fileUrl = data?.fileUrl || '/uploads/Aditya_Kumar_Resume.pdf';
  const fileName = data?.fileName || 'Aditya_Kumar_Resume.pdf';
  const fileSize = data?.fileSize || '1.2 MB';
  const title = data?.title || 'Aditya Kumar Maurya – Web Developer Resume';

  return (
    <section id="resume" className="py-24 bg-dark-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono text-cyber-cyan uppercase tracking-widest mb-2 flex items-center justify-center space-x-2">
            <FileText className="w-4 h-4 text-cyber-cyan" />
            <span>// {heading}</span>
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {heading}
          </h3>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-dark-900/80 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-xl shadow-glass">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple flex-shrink-0">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-display font-bold text-white">{title}</h4>
                <p className="text-xs font-mono text-cyan-400 mt-1">
                  PDF Document • {fileSize}
                </p>
                <div className="flex items-center space-x-2 text-xs text-slate-400 mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Latest Developer Resume</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none px-6 py-3.5 rounded-xl bg-dark-950 border border-white/10 hover:border-white/30 text-white font-display font-medium text-sm flex items-center justify-center space-x-2 transition-all"
              >
                <Eye className="w-4 h-4 text-cyber-cyan" />
                <span>View PDF</span>
              </a>

              <a
                href={fileUrl}
                download={fileName}
                className="flex-1 md:flex-none px-6 py-3.5 rounded-xl bg-cyber-cyan text-dark-950 font-display font-semibold text-sm hover:bg-cyan-300 transition-all flex items-center justify-center space-x-2 shadow-glow-cyan"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
