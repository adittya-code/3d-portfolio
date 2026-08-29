import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateAdminRequest } from '@/lib/auth';

export async function GET() {
  try {
    const items = await prisma.education.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = authenticateAdminRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const item = await prisma.education.create({
      data: {
        institution: data.institution,
        degree: data.degree,
        field: data.field,
        startDate: data.startDate,
        endDate: data.endDate || '',
        current: Boolean(data.current),
        gpa: data.gpa || '',
        description: data.description || '',
        logoUrl: data.logoUrl || '',
        displayOrder: Number(data.displayOrder) || 0,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 });
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
      return NextResponse.json({ error: 'Education ID required' }, { status: 400 });
    }

    const updated = await prisma.education.update({
      where: { id },
      data: {
        ...updateData,
        displayOrder: updateData.displayOrder !== undefined ? Number(updateData.displayOrder) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 });
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
      return NextResponse.json({ error: 'Education ID required' }, { status: 400 });
    }

    await prisma.education.delete({ where: { id } });
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete education' }, { status: 500 });
  }
}
