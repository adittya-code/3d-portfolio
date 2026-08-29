import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateAdminRequest } from '@/lib/auth';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = authenticateAdminRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const project = await prisma.project.create({
      data: {
        title: data.title,
        shortDescription: data.shortDescription,
        description: data.description,
        technologies: data.technologies || '',
        githubUrl: data.githubUrl || '',
        liveUrl: data.liveUrl || '',
        imageUrl: data.imageUrl || '/uploads/project-placeholder.jpg',
        isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : true,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
        displayOrder: Number(data.displayOrder) || 0,
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
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
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...updateData,
        displayOrder: updateData.displayOrder !== undefined ? Number(updateData.displayOrder) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
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
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
