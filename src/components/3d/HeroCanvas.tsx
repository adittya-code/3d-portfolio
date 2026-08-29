'use client';

import React from 'react';

interface SkillItem {
  name: string;
  category: string;
  color: string;
  svg: React.ReactNode;
}

const skillsList: SkillItem[] = [
  {
    name: 'C++',
    category: 'Systems & WebGL',
    color: '#00599C',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M22.062 10.612H20.17v-1.89h-1.423v1.89h-1.89v1.424h1.89v1.89h1.423v-1.89h1.892v-1.424zm-6.284 0h-1.89v-1.89H12.46v1.89h-1.89v1.424h1.89v1.89h1.423v-1.89h1.892v-1.424zM1.938 12.023l8.718 5.034v-2.88L5.27 11.16l5.385-3.11V5.168L1.938 10.2v1.823z" fill="#00599C" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    category: 'Frontend & Logic',
    color: '#F7DF1E',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="#F7DF1E" rx="4" />
        <path d="M6.4 17.5c.6.9 1.4 1.5 2.6 1.5 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.2-1.9-1.7l-.6-.3c-1.8-.7-3-1.6-3-3.6 0-2 1.6-3.5 4.1-3.5 1.8 0 3 .6 3.8 1.9l-1.9 1.2c-.4-.7-1-1.1-1.9-1.1-1 0-1.6.5-1.6 1.1 0 .8.5 1.1 1.7 1.6l.6.3c2.1.9 3.3 1.8 3.3 3.8 0 2.3-1.8 3.6-4.4 3.6-2.3 0-3.8-.9-4.6-2.5l2-1.2zm8.6.3c.5.8 1.1 1.3 2.1 1.3 1 0 1.5-.4 1.5-1.7v-8.6h2.6v8.7c0 2.7-1.6 3.9-3.9 3.9-2.1 0-3.3-1-4-2.4l1.7-1.2z" fill="#000000" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Typed Systems',
    color: '#3178C6',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="#3178C6" rx="4" />
        <path d="M12.5 18h2.3v-7.3h2.7V8.8h-7.7v1.9h2.7V18zm-5.7-.3c.7.9 1.6 1.4 2.8 1.4 1.2 0 1.9-.6 1.9-1.4 0-.9-.7-1.3-2-1.8l-.7-.3c-1.9-.8-3.1-1.7-3.1-3.8 0-2.1 1.7-3.7 4.3-3.7 1.9 0 3.2.7 4.1 2l-2 1.3c-.5-.7-1.1-1.1-2.1-1.1-1.1 0-1.7.5-1.7 1.2 0 .8.5 1.2 1.8 1.7l.7.3c2.2 1 3.5 1.9 3.5 4 0 2.4-1.9 3.8-4.7 3.8-2.5 0-4.1-1-4.9-2.7l2.1-1.3z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'React',
    category: 'UI Architecture',
    color: '#61DAFB',
    svg: (
      <svg className="w-8 h-8 animate-spin-slow" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    category: 'Full-Stack React',
    color: '#FFFFFF',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#000" />
        <path d="M18.804 19.825l-7.2-9.45v9.45H9.6V7.2h2.25l7.155 9.405V7.2h2v12.625h-2.201z" fill="#FFF" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Backend & APIs',
    color: '#339933',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7.7v11.6L12 25l10-5.7V7.7L12 2zm0 2.5l7.5 4.3v8.6L12 21.7l-7.5-4.3V8.8L12 4.5z" fill="#339933" />
        <path d="M12 7.5L6.5 10.7v6.4L12 20.3l5.5-3.2v-6.4L12 7.5z" fill="#339933" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'Three.js',
    category: 'WebGL & 3D Graphics',
    color: '#00F3FF',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 3.2l6.5 3.6-6.5 3.6-6.5-3.6L12 5.2zm-7.5 5.1l6.5 3.6v7.3l-6.5-3.6v-7.3zm15 7.3l-6.5 3.6v-7.3l6.5-3.6v7.3z" fill="#00F3FF" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'Utility Styling',
    color: '#06B6D4',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4" />
      </svg>
    ),
  },
  {
    name: 'HTML5',
    category: 'Semantic Markup',
    color: '#E34F26',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24">
        <path d="M1.5 0h21l-1.91 21.563L11.97 24 2.418 21.563z" fill="#E34F26" />
        <path d="M12 2.187v19.578l7.712-2.125L21.05 2.188z" fill="#EF652A" />
        <path d="M12 9.422H7.94l-.27-3.031H12V3.844H4.99l.79 9.078H12zM12 16.924l-3.342-.906-.213-2.391H5.914l.42 4.719L12 19.672z" fill="#FFF" />
      </svg>
    ),
  },
  {
    name: 'CSS3',
    category: 'Modern Styling',
    color: '#1572B6',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24">
        <path d="M1.5 0h21l-1.91 21.563L11.97 24 2.418 21.563z" fill="#1572B6" />
        <path d="M12 2.187v19.578l7.712-2.125L21.05 2.188z" fill="#33A9DC" />
        <path d="M12 9.422H7.94l-.27-3.031H12V3.844H4.99l.79 9.078H12zM12 16.924l-3.342-.906-.213-2.391H5.914l.42 4.719L12 19.672z" fill="#FFF" />
      </svg>
    ),
  },
  {
    name: 'Git',
    category: 'Version Control',
    color: '#F05032',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l3.24 3.24a2.585 2.585 0 013.25 3.262l3.12 3.12a2.583 2.583 0 012.87 2.87l2.358 2.358c.604-.604.604-1.582 0-2.188z" fill="#F05032" />
        <circle cx="12" cy="12" r="3" fill="#F05032" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    category: 'CI/CD & DevOps',
    color: '#F8FAFC',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#F8FAFC">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'AI & Data Processing',
    color: '#3776AB',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24">
        <path d="M11.87 0c-5.7 0-5.33 2.47-5.33 2.47v2.57h5.43v.78H4.42S0 5.3 0 11.02c0 5.73 3.86 5.52 3.86 5.52h2.3v-3.24s-.12-3.87 3.82-3.87h6.56s3.68.06 3.68-3.56c0-3.62-3.24-3.87-3.24-3.87H14.7V2.55s.3-2.55-2.83-2.55zm-2.9 1.67a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1z" fill="#3776AB" />
        <path d="M12.13 24c5.7 0 5.33-2.47 5.33-2.47v-2.57h-5.43v-.78h7.55s4.42.02 4.42-5.7c0-5.73-3.86-5.52-3.86-5.52h-2.3v3.24s.12 3.87-3.82 3.87H7.56s-3.68-.06-3.68 3.56c0 3.62 3.24 3.87 3.24 3.87h2.28v-1.92s-.3 2.55 2.83 2.55zm2.9-1.67a1.05 1.05 0 110-2.1 1.05 1.05 0 010 2.1z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    name: 'SQL',
    category: 'Relational Databases',
    color: '#4169E1',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3zm0 16c-4.42 0-8-1.34-8-3v-2.5c1.86 1.15 4.77 1.8 8 1.8s6.14-.65 8-1.8V17c0 1.66-3.58 3-8 3zm0-5c-4.42 0-8-1.34-8-3v-2.5c1.86 1.15 4.77 1.8 8 1.8s6.14-.65 8-1.8V12c0 1.66-3.58 3-8 3z" fill="#4169E1" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    category: 'NoSQL Databases',
    color: '#47A248',
    svg: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12.44 2.13c-.23-.23-.65-.23-.88 0-1.36 1.36-7.56 8.08-7.56 13.06 0 4.6 3.63 8.31 8 8.31s8-3.71 8-8.31c0-4.98-6.2-11.7-7.56-13.06zm-.44 19.37c-3.31 0-6-2.69-6-6 0-3.38 4.2-8.54 6-10.42 1.8 1.88 6 5.04 6 10.42 0 3.31-2.69 6-6 6z" fill="#47A248" />
      </svg>
    ),
  },
];

export default function HeroCanvas() {
  // Divide skills into 2 staggered columns for dynamic vertical marquee flow
  const column1 = [...skillsList.slice(0, 8), ...skillsList.slice(0, 8)];
  const column2 = [...skillsList.slice(7), ...skillsList.slice(7)];

  return (
    <div className="relative w-full h-[550px] lg:h-[700px] overflow-hidden flex items-center justify-center rounded-3xl bg-slate-950/40 border border-slate-900/60 p-4 lg:p-6 backdrop-blur-xl">
      
      {/* Background Neon Ambient Glow Gradients */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Overlay Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Top & Bottom Fade Out Gradient Mask */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />

      {/* 2-COLUMN STAGGERED VERTICAL MARQUEE SHOWCASE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full h-full max-w-xl mx-auto overflow-hidden">
        
        {/* COLUMN 1 — Bottom to Top Animation (28s duration) */}
        <div className="flex flex-col gap-4 animate-vertical-marquee-fast hover:[animation-play-state:paused]">
          {column1.map((item, index) => (
            <div
              key={`col1-${index}`}
              className="group relative flex items-center gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-slate-900/90 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                {item.svg}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                  {item.name}
                </span>
                <span className="text-xs text-slate-400 font-medium truncate">
                  {item.category}
                </span>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_#00f3ff] transition-all" />
            </div>
          ))}
        </div>

        {/* COLUMN 2 — Bottom to Top Animation (34s duration - Staggered speed) */}
        <div className="hidden sm:flex flex-col gap-4 animate-vertical-marquee-slow hover:[animation-play-state:paused]">
          {column2.map((item, index) => (
            <div
              key={`col2-${index}`}
              className="group relative flex items-center gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-slate-900/90 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 group-hover:border-purple-500/40 transition-colors">
                {item.svg}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                  {item.name}
                </span>
                <span className="text-xs text-slate-400 font-medium truncate">
                  {item.category}
                </span>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-purple-500/40 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_#a855f7] transition-all" />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
