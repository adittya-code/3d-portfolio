import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateAdminRequest } from '@/lib/auth';

export async function GET() {
  try {
    let hero = await prisma.hero.findFirst();
    if (!hero) {
      hero = await prisma.hero.create({ data: {} });
    }
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hero' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = authenticateAdminRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    let hero = await prisma.hero.findFirst();

    if (hero) {
      hero = await prisma.hero.update({
        where: { id: hero.id },
        data: {
          badgeText: data.badgeText,
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          ctaPrimaryText: data.ctaPrimaryText,
          ctaPrimaryUrl: data.ctaPrimaryUrl,
          ctaSecondaryText: data.ctaSecondaryText,
          ctaSecondaryUrl: data.ctaSecondaryUrl,
          availability: data.availability,
        },
      });
    } else {
      hero = await prisma.hero.create({ data });
    }

    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hero' }, { status: 500 });
  }
}
