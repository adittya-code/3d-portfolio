import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateAdminRequest } from '@/lib/auth';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = authenticateAdminRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        category: data.category || 'Languages',
        proficiency: Number(data.proficiency) || 80,
        icon: data.icon || 'Code',
        description: data.description || '',
        displayOrder: Number(data.displayOrder) || 0,
        isFeatured: Boolean(data.isFeatured),
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = authenticateAdminRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: 'Skill ID required' }, { status: 400 });
    }

    const updated = await prisma.skill.update({
      where: { id },
      data: {
        ...updateData,
        proficiency: updateData.proficiency !== undefined ? Number(updateData.proficiency) : undefined,
        displayOrder: updateData.displayOrder !== undefined ? Number(updateData.displayOrder) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = authenticateAdminRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Skill ID required' }, { status: 400 });
    }

    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}
