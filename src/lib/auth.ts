import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-super-secret-key-2026';
const TOKEN_COOKIE_NAME = 'admin_token';

export interface TokenPayload {
  userId: string;
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function setAdminAuthCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: TOKEN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export function removeAdminAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: TOKEN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
}

export function getAdminAuthToken(): string | null {
  const cookieStore = cookies();
  const cookie = cookieStore.get(TOKEN_COOKIE_NAME);
  return cookie ? cookie.value : null;
}

export function authenticateAdminRequest(request: NextRequest): TokenPayload | null {
  const cookieToken = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
  const headerAuth = request.headers.get('authorization');
  const bearerToken = headerAuth?.startsWith('Bearer ') ? headerAuth.substring(7) : null;

  const token = cookieToken || bearerToken;
  if (!token) return null;

  return verifyToken(token);
}
