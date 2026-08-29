import type { Metadata } from 'next';
import './globals.css';

import { prisma } from '@/lib/prisma';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findFirst().catch(() => null);
  const profile = await prisma.profile.findFirst().catch(() => null);

  const title =
    settings?.seoTitle ||
    `${profile?.name || 'Aditya Kumar Maurya'} | ${profile?.title || 'C++ Developer & Full Stack Developer'}`;
  const description =
    settings?.seoDescription ||
    profile?.shortIntro ||
    'Portfolio of Aditya Kumar Maurya. Specializing in C++, web development, and software engineering.';

  return {
    title,
    description,
    keywords: ['C++ Developer', 'Full Stack Developer', 'Software Engineer', 'Aditya Kumar Maurya'],
    authors: [{ name: profile?.name || 'Aditya Kumar Maurya' }],
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark-950 text-slate-100 min-h-screen antialiased selection:bg-cyber-cyan selection:text-dark-950">
        {children}
      </body>
    </html>
  );
}
