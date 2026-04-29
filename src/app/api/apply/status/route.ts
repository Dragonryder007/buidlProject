import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';

const DATA_FILE = path.join(process.cwd(), 'data', 'applications.json');
const USE_JSON_STORAGE = (process.env.USE_JSON_STORAGE === 'true') || (process.env.NODE_ENV !== 'production');

let pool: mysql.Pool | null = null;
if (!USE_JSON_STORAGE) {
  const DB_HOST = process.env.DB_HOST;
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_NAME = process.env.DB_NAME;
  const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
  pool = (global as any).__mysql_pool || null;
  if (!pool) {
    pool = mysql.createPool({ host: DB_HOST, user: DB_USER, password: DB_PASSWORD, database: DB_NAME, port: DB_PORT, waitForConnections: true, connectionLimit: 10, namedPlaceholders: true });
    (global as any).__mysql_pool = pool;
  }
}

async function readFileApps() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
}

async function writeFileApps(apps: any[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(apps, null, 2));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body || {};
    if (!id || !status) return NextResponse.json({ success: false, message: 'Missing id or status' }, { status: 400 });

    if (USE_JSON_STORAGE) {
      const apps = await readFileApps();
      const idx = apps.findIndex((a: any) => String(a.id) === String(id));
      if (idx === -1) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
      apps[idx].status = status;
      await writeFileApps(apps);
      return NextResponse.json({ success: true, data: apps[idx] });
    }

    // MySQL path
    if (!pool) return NextResponse.json({ success: false, message: 'DB not configured' }, { status: 500 });
    await pool.execute('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
    const [rows] = await pool.query('SELECT id, payload, status, created_at FROM applications WHERE id = ?', [id]);
    const r = (rows as any[])[0];
    const app = r ? { id: r.id, ...(typeof r.payload === 'string' ? JSON.parse(r.payload) : r.payload), status: r.status, createdAt: r.created_at } : null;
    return NextResponse.json({ success: true, data: app });
  } catch (err) {
    console.error('/api/apply/status error', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
