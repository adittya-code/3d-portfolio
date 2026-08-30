import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database cleanup and seeding...');

  // 1. Admin Security Check & Creation
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecretKey2026!';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Portfolio Admin',
      },
    });
    console.log(`✅ Admin account initialized for email: ${adminEmail}`);
  } else {
    console.log(`ℹ️ Admin account ready: ${adminEmail}`);
  }

  // Clear existing fake items to ensure fresh realistic data
  await prisma.profile.deleteMany();
  await prisma.hero.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.service.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.siteSettings.deleteMany();

  // 2. Profile Initial Data
  await prisma.profile.create({
    data: {
      name: 'Aditya Kumar Maurya',
      title: 'C++ Developer | Full Stack Developer | Problem Solver',
      shortIntro: 'I build efficient software and modern web applications with a focus on clean code, problem solving, and continuous learning.',
      biography: 'I am a passionate software developer with a strong interest in C++ programming and full-stack web development. I enjoy solving problems, building efficient applications, and learning new technologies through practical projects.',
      aboutHeading: 'About Me',
      aboutSubtitle: 'Computer Science student focused on programming, web development, and continuous learning.',
      email: 'aditya@example.com',
      phone: '',
      location: 'Punjab, India',
      avatarUrl: '/uploads/img.webp',
      yearsExperience: 0,
      projectsCompleted: 2,
      techMastered: 8,
    },
  });
  console.log('✅ Realistic Profile initialized');

  // 3. Hero Initial Data
  await prisma.hero.create({
    data: {
      badgeText: 'Open to work & opportunities',
      title: 'Aditya Kumar Maurya',
      subtitle: 'C++ Developer | Full Stack Developer | Problem Solver',
      description: 'I build efficient software and modern web applications with a focus on clean code, problem solving, and continuous learning.',
      ctaPrimaryText: 'Explore My Work',
      ctaPrimaryUrl: '#projects',
      ctaSecondaryText: 'Get In Touch',
      ctaSecondaryUrl: '#contact',
      availability: 'Open to opportunities',
    },
  });
  console.log('✅ Realistic Hero initialized');

  // 4. Skills Initial Data
  const skills = [
    { name: 'C++', category: 'Languages', proficiency: 85, icon: 'Cpu', description: 'Object-oriented programming, STL, algorithms, problem solving', displayOrder: 1, isActive: true },
    { name: 'JavaScript (ES6+)', category: 'Languages', proficiency: 80, icon: 'FileCode', description: 'Async execution, DOM manipulation, web APIs, ES6+ syntax', displayOrder: 2, isActive: true },
    { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 85, icon: 'Palette', description: 'Responsive layouts, Flexbox, CSS Grid, modern web styling', displayOrder: 3, isActive: true },
    { name: 'React', category: 'Frontend', proficiency: 80, icon: 'Layers', description: 'Component state management, hooks, interactive UI components', displayOrder: 4, isActive: true },
    { name: 'Firebase / Firestore', category: 'Backend', proficiency: 75, icon: 'Database', description: 'Google authentication, real-time Firestore database integration', displayOrder: 5, isActive: true },
    { name: 'Fetch API & REST', category: 'Backend', proficiency: 80, icon: 'Server', description: 'Asynchronous HTTP data fetching, REST API integration', displayOrder: 6, isActive: true },
    { name: 'Git & GitHub', category: 'Tools', proficiency: 85, icon: 'GitBranch', description: 'Version control, open-source workflow, pull requests', displayOrder: 7, isActive: true },
  ];
  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log('✅ Realistic Skills initialized');

  // 5. Projects Initial Data
  const projects = [
    {
      title: 'Habit Tracker',
      shortDescription: 'A beautiful, private daily habit tracker web app built with React + Firebase. Track habits every day, navigate between months, and sync data across devices.',
      description: 'A comprehensive daily habit tracking application. Key features include Google Login authentication, Firebase Firestore cloud database, habit creation, editing, and deletion, monthly navigation calendar, progress tracking bar, streak counter, cross-device synchronization, and an installable responsive UI.',
      technologies: 'React, Firebase, Firestore, JavaScript, CSS',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      imageUrl: '/uploads/habit.webp',
      isFeatured: true,
      isActive: true,
      displayOrder: 1,
    },
    {
      title: 'Currency Converter',
      shortDescription: 'A responsive currency converter that uses live exchange rates and country flags to provide real-time currency conversion.',
      description: 'A real-time foreign exchange converter. Features live currency exchange rates fetched via API, country flag indicators for selected currencies, support for multiple currency pairings with USD to INR as default, and a responsive mobile-friendly layout.',
      technologies: 'HTML, CSS, JavaScript, Fetch API',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      imageUrl: '/uploads/currency.webp',
      isFeatured: true,
      isActive: true,
      displayOrder: 2,
    },
  ];
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log('✅ Realistic Projects initialized');

  // 6. Experience Initial Data
  const experiences = [
    {
      company: 'GirlScript Foundation',
      position: 'Open Source Contributor',
      location: 'Remote',
      startDate: 'May 2026',
      endDate: 'September 15, 2026',
      current: false,
      description: 'Selected as an Open Source Contributor for GirlScript Summer of Code 2026. Contributed to open-source repositories through frontend features, UI improvements, accessibility, animations, and usability enhancements.',
      responsibilities: JSON.stringify([
        'Successfully merged 9 pull requests across 2 open-source repositories (leadorbit and easemotion-css).',
        'Implemented frontend features, responsive layouts, accessibility improvements, and CSS animations.',
        'Collaborated with project maintainers and community contributors during GSSoC 2026.'
      ]),
      technologies: 'JavaScript, CSS, React, HTML, Git, GitHub',
      logoUrl: '',
      displayOrder: 1,
      isActive: true,
    },
    {
      company: 'Times of India',
      position: 'Participant / Contributor',
      location: 'India',
      startDate: 'May 2026',
      endDate: 'July 2026',
      current: false,
      description: 'Participated in an environmental awareness community development project, engaging with students and encouraging awareness and participation in environmental activities.',
      responsibilities: JSON.stringify([
        'Engaged with student communities to spread awareness about environmental protection.',
        'Participated in community development initiatives and sustainability campaigns.'
      ]),
      technologies: 'Community Engagement, Environmental Awareness',
      logoUrl: '',
      displayOrder: 2,
      isActive: true,
    },
  ];
  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log('✅ Realistic Experience initialized');

  // 7. Education Initial Data
  await prisma.education.create({
    data: {
      institution: 'Lovely Professional University',
      degree: 'B.Tech',
      field: 'Computer Science and Engineering',
      startDate: '2023',
      endDate: '2027',
      current: true,
      gpa: '',
      description: 'Pursuing Bachelor of Technology in Computer Science and Engineering with a focus on programming in C++, data structures, algorithms, and web application development.',
      logoUrl: '',
      displayOrder: 1,
      isActive: true,
    },
  });
  console.log('✅ Realistic Education initialized');

  // 8. Achievement Initial Data
  const achievements = [
    {
      title: 'GirlScript Summer of Code (GSSoC) 2026',
      organization: 'GirlScript Foundation',
      date: '2026',
      description: 'Selected as an Open Source Contributor for GSSoC 2026, contributing merged pull requests across leadorbit and easemotion-css repositories.',
      certificateUrl: '',
      credentialId: '',
      credentialUrl: '',
      displayOrder: 1,
      isActive: true,
    },
    {
      title: 'Environmental Awareness (Community Development Project)',
      organization: 'Times of India',
      date: '2026',
      description: 'Participated in an environmental awareness community development project organized by Times of India.',
      certificateUrl: '',
      credentialId: '',
      credentialUrl: '',
      displayOrder: 2,
      isActive: true,
    },
  ];
  for (const ach of achievements) {
    await prisma.achievement.create({ data: ach });
  }
  console.log('✅ Realistic Achievements initialized');

  // 9. Service Initial Data
  const services = [
    {
      title: 'Frontend Development',
      description: 'Building responsive and interactive web interfaces using HTML, CSS, JavaScript, and React.',
      icon: 'Layers',
      features: 'Responsive Layouts, React Components, Clean Code, Interactive UI',
      displayOrder: 1,
      isActive: true,
    },
    {
      title: 'API & Backend Integration',
      description: 'Integrating APIs and backend services to connect web applications with dynamic data and functionality.',
      icon: 'Server',
      features: 'REST API Integration, Firebase Firestore Sync, Asynchronous Data Fetching',
      displayOrder: 2,
      isActive: true,
    },
  ];
  for (const service of services) {
    await prisma.service.create({ data: service });
  }
  console.log('✅ Realistic Services initialized');

  // 10. Resume Initial Data
  await prisma.resume.create({
    data: {
      title: 'Aditya Kumar Maurya – Web Developer Resume',
      fileUrl: '/uploads/Aditya_Kumar_Resume.pdf',
      fileName: 'Aditya_Kumar_Resume.pdf',
      fileSize: '1.2 MB',
    },
  });
  console.log('✅ Realistic Resume initialized');

  // 11. SiteSettings Initial Data
  await prisma.siteSettings.create({
    data: {
      siteName: 'Aditya Kumar Maurya',
      seoTitle: 'Aditya Kumar Maurya - C++ & Full Stack Developer',
      seoDescription: 'Portfolio of Aditya Kumar Maurya, C++ Developer, Full Stack Developer, and Problem Solver.',
      seoKeywords: 'Aditya Kumar Maurya, C++ Developer, Full Stack Developer, React, JavaScript, Firebase, Next.js',
      primaryAccent: '#00f3ff',
      secondaryAccent: '#8b5cf6',
      contactEmail: 'aditya@example.com',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      twitterUrl: '',
      footerName: 'Aditya Kumar Maurya',
      footerDescription: 'C++ Developer | Full Stack Developer | Problem Solver',
      footerText: '© 2026 Aditya Kumar. All rights reserved.',
      skillsHeading: 'Skills & Technologies',
      skillsSubtitle: 'Technologies and tools I use to build practical web applications and solve programming problems.',
      projectsHeading: 'My Projects',
      projectsSubtitle: 'A collection of web applications and practical projects built using modern technologies.',
      experienceHeading: 'Experience & Contributions',
      experienceSubtitle: 'My open-source contributions, community projects, and practical development experience.',
      educationHeading: 'Education',
      educationSubtitle: 'B.Tech in Computer Science and Engineering at Lovely Professional University.',
      achievementsHeading: 'Achievements & Certifications',
      achievementsSubtitle: 'A record of my open-source contributions, community participation, and certifications.',
      servicesHeading: 'Services',
      servicesSubtitle: 'Web development services focused on building responsive, functional, and user-friendly applications.',
      resumeHeading: 'Resume',
      resumeSubtitle: 'View or download my latest resume for more details about my education, skills, projects, and experience.',
      contactHeading: 'Get In Touch',
      contactSubtitle: 'Have a question, project idea, or opportunity? Feel free to reach out.',
    },
  });
  console.log('✅ Realistic Site Settings initialized');

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
