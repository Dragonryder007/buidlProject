import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const res = NextResponse.json({ success: true });
    const isProd = process.env.NODE_ENV === 'production';
    const cookieParts = [`admin_auth=`, `Path=/`, `Max-Age=0`, `HttpOnly`, `SameSite=Lax`];
    if (isProd) cookieParts.push('Secure');
    res.headers.append('Set-Cookie', cookieParts.join('; '));
    return res;
  } catch (err) {
    console.error('/api/admin/logout error', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
