import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateAdminRequest } from '@/lib/auth';

export async function GET() {
  try {
    let resume = await prisma.resume.findFirst();
    if (!resume) {
      resume = await prisma.resume.create({ data: {} });
    }
    return NextResponse.json(resume);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resume settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = authenticateAdminRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    let resume = await prisma.resume.findFirst();

    if (resume) {
      resume = await prisma.resume.update({
        where: { id: resume.id },
        data: {
          title: data.title,
          fileUrl: data.fileUrl,
          fileName: data.fileName,
          fileSize: data.fileSize,
        },
      });
    } else {
      resume = await prisma.resume.create({ data });
    }

    return NextResponse.json(resume);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 });
  }
}
