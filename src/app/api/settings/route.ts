import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateAdminRequest } from '@/lib/auth';

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: {} });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = authenticateAdminRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    let settings = await prisma.siteSettings.findFirst();

    if (settings) {
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          siteName: data.siteName,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          seoKeywords: data.seoKeywords,
          primaryAccent: data.primaryAccent,
          secondaryAccent: data.secondaryAccent,
          contactEmail: data.contactEmail,
          githubUrl: data.githubUrl,
          linkedinUrl: data.linkedinUrl,
          twitterUrl: data.twitterUrl || '',
          footerName: data.footerName,
          footerDescription: data.footerDescription,
          footerText: data.footerText,
          skillsHeading: data.skillsHeading,
          skillsSubtitle: data.skillsSubtitle,
          projectsHeading: data.projectsHeading,
          projectsSubtitle: data.projectsSubtitle,
          experienceHeading: data.experienceHeading,
          experienceSubtitle: data.experienceSubtitle,
          educationHeading: data.educationHeading,
          educationSubtitle: data.educationSubtitle,
          achievementsHeading: data.achievementsHeading,
          achievementsSubtitle: data.achievementsSubtitle,
          servicesHeading: data.servicesHeading,
          servicesSubtitle: data.servicesSubtitle,
          resumeHeading: data.resumeHeading,
          resumeSubtitle: data.resumeSubtitle,
          contactHeading: data.contactHeading,
          contactSubtitle: data.contactSubtitle,
        },
      });
    } else {
      settings = await prisma.siteSettings.create({ data });
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}
