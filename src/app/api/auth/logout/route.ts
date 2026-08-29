import { NextResponse } from 'next/server';
import { removeAdminAuthCookie } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  removeAdminAuthCookie(response);
  return response;
}
