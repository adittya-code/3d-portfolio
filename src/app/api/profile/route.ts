import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateAdminRequest } from '@/lib/auth';

export async function GET() {
  try {
    let profile = await prisma.profile.findFirst();
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          name: 'Aditya Kumar Maurya',
          title: 'C++ Developer | Full Stack Developer | Problem Solver',
        },
      });
    }
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = authenticateAdminRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    let profile = await prisma.profile.findFirst();

    if (profile) {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: {
          name: data.name,
          title: data.title,
          shortIntro: data.shortIntro,
          biography: data.biography,
          aboutHeading: data.aboutHeading || 'About Me',
          aboutSubtitle: data.aboutSubtitle || 'Computer Science student focused on programming, web development, and continuous learning.',
          email: data.email,
          phone: data.phone,
          location: data.location,
          avatarUrl: data.avatarUrl,
          yearsExperience: Number(data.yearsExperience) || 0,
          projectsCompleted: Number(data.projectsCompleted) || 0,
          techMastered: Number(data.techMastered) || 0,
        },
      });
    } else {
      profile = await prisma.profile.create({ data });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
