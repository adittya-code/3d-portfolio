import { prisma } from '@/lib/prisma';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ContactSection from '@/components/sections/ContactSection';

export const revalidate = 0; // Ensure live data updates from CMS

export default async function HomePage() {
  // Fetch initial content from database
  let profile = await prisma.profile.findFirst().catch(() => null);
  let hero = await prisma.hero.findFirst().catch(() => null);
  let skills = await prisma.skill.findMany({ orderBy: { displayOrder: 'asc' } }).catch(() => []);
  let projects = await prisma.project.findMany({ orderBy: { displayOrder: 'asc' } }).catch(() => []);
  let experience = await prisma.experience.findMany({ orderBy: { displayOrder: 'asc' } }).catch(() => []);
  let education = await prisma.education.findMany({ orderBy: { displayOrder: 'asc' } }).catch(() => []);
  let achievements = await prisma.achievement.findMany({ orderBy: { displayOrder: 'asc' } }).catch(() => []);
  let services = await prisma.service.findMany({ orderBy: { displayOrder: 'asc' } }).catch(() => []);
  let resume = await prisma.resume.findFirst().catch(() => null);
  let settings = await prisma.siteSettings.findFirst().catch(() => null);

  return (
    <main className="min-h-screen bg-dark-950 text-slate-100 font-sans selection:bg-cyber-cyan selection:text-dark-950">
      {/* Navigation Header */}
      <Navbar
        siteName={profile?.name || settings?.siteName || 'Aditya Kumar Maurya'}
        subTitle={profile?.title || 'C++ Developer | Full Stack Developer'}
      />

      {/* 1. Hero Section */}
      <HeroSection
        data={hero || undefined}
        profileData={profile || undefined}
        siteSettings={settings || undefined}
      />

      {/* 2. About Me Section */}
      <AboutSection data={profile || undefined} />

      {/* 3. Skills */}
      <SkillsSection
        heading={settings?.skillsHeading}
        subtitle={settings?.skillsSubtitle}
        skills={skills}
      />

      {/* 4. Projects */}
      <ProjectsSection
        heading={settings?.projectsHeading}
        subtitle={settings?.projectsSubtitle}
        projects={projects}
      />

      {/* 5. Experience */}
      <ExperienceSection
        heading={settings?.experienceHeading}
        subtitle={settings?.experienceSubtitle}
        experiences={experience}
      />

      {/* 6. Education */}
      <EducationSection
        heading={settings?.educationHeading}
        subtitle={settings?.educationSubtitle}
        education={education}
      />

      {/* 7. Achievements & Certifications */}
      <AchievementsSection
        heading={settings?.achievementsHeading}
        subtitle={settings?.achievementsSubtitle}
        achievements={achievements}
      />

      {/* 8. Services Offered */}
      <ServicesSection
        heading={settings?.servicesHeading}
        subtitle={settings?.servicesSubtitle}
        services={services}
      />

      {/* 9. Resume */}
      <ResumeSection
        heading={settings?.resumeHeading}
        subtitle={settings?.resumeSubtitle}
        data={resume || undefined}
      />

      {/* 10. Contact Channel */}
      <ContactSection
        heading={settings?.contactHeading}
        subtitle={settings?.contactSubtitle}
        contactEmail={profile?.email || settings?.contactEmail}
        location={profile?.location}
        phone={profile?.phone}
      />

      {/* 11. Footer */}
      <Footer
        siteName={profile?.name || settings?.siteName}
        footerName={settings?.footerName || profile?.name}
        footerDescription={settings?.footerDescription || profile?.title}
        footerText={settings?.footerText}
        githubUrl={settings?.githubUrl}
        linkedinUrl={settings?.linkedinUrl}
        twitterUrl={settings?.twitterUrl}
        contactEmail={profile?.email || settings?.contactEmail}
      />
    </main>
  );
}
