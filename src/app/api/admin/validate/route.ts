import { NextResponse } from 'next/server';
import crypto from 'crypto';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change_this_secret';

function verifyToken(token: string) {
  try {
    const [b64, sig] = token.split('.');
    if (!b64 || !sig) return false;
    const payload = Buffer.from(b64, 'base64').toString('utf8');
    const expected = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('hex');
    if (expected !== sig) return false;
    const obj = JSON.parse(payload);
    if (!obj.exp || typeof obj.exp !== 'number') return false;
    if (obj.exp <= Date.now()) return false;
    return true;
  } catch (err) {
    return false;
  }
}

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get('cookie') || '';
    const match = cookie.split('; ').find((c) => c.startsWith('admin_auth='));
    if (!match) return NextResponse.json({ ok: false }, { status: 401 });
    // extract full value after first '=' (cookie values may contain '=' padding)
    const token = match.substring(match.indexOf('=') + 1);
    if (!token || !verifyToken(token)) return NextResponse.json({ ok: false }, { status: 401 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('/api/admin/validate error', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
