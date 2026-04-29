import { NextResponse } from 'next/server';
import crypto from 'crypto';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change_this_secret';
const MAX_AGE = 8 * 3600; // 8 hours

function signPayload(payload: string) {
  return crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('hex');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body || {};

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Missing credentials' }, { status: 400 });
    }

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const payload = JSON.stringify({ user: username, iat: Date.now(), exp: Date.now() + MAX_AGE * 1000 });
    const sig = signPayload(payload);
    const token = `${Buffer.from(payload).toString('base64')}.${sig}`;

    const res = NextResponse.json({ success: true });
    // Don't set Secure on localhost/dev (browsers may ignore Secure cookies on non-HTTPS)
    const isProd = process.env.NODE_ENV === 'production';
    const cookieParts = [`admin_auth=${token}`, 'HttpOnly', `Path=/`, `Max-Age=${MAX_AGE}`, 'SameSite=Lax'];
    if (isProd) cookieParts.push('Secure');
    res.headers.append('Set-Cookie', cookieParts.join('; '));
    return res;
  } catch (err) {
    console.error('/api/admin/login error', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
