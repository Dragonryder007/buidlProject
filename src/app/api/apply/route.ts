import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';

// Use JSON storage locally by default. Set USE_JSON_STORAGE=false in production/hosted env to use MySQL.
const USE_JSON_STORAGE = (process.env.USE_JSON_STORAGE === 'true') || (process.env.NODE_ENV !== 'production');

// JSON file storage
const DATA_FILE = path.join(process.cwd(), 'data', 'applications.json');

async function getApplicationsFromFile() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
}

async function saveApplicationsToFile(applications: any[]) {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(applications, null, 2));
  } catch (err) {
    throw err;
  }
}

if (USE_JSON_STORAGE) {
  console.log('API /api/apply — using JSON storage (local dev)');
}

// MySQL setup (only used when USE_JSON_STORAGE is false)
let pool: mysql.Pool | null = null;
if (!USE_JSON_STORAGE) {
  const DB_HOST = process.env.DB_HOST;
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_NAME = process.env.DB_NAME;
  const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    console.warn('Database environment variables are not fully set. /api/apply may fail until configured.');
  }

  pool = (global as any).__mysql_pool || null;
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: true,
    });
    (global as any).__mysql_pool = pool;
  }
}

async function ensureTable() {
  if (!pool) return;
  const createSQL = `
    CREATE TABLE IF NOT EXISTS applications (
      id BIGINT PRIMARY KEY,
      payload JSON NOT NULL,
      status VARCHAR(50) DEFAULT 'Applied',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `;
  await pool.query(createSQL);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data || !data.email) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const id = data.id || Date.now();
    const status = data.status || 'Applied';
    const createdAt = data.createdAt || new Date().toISOString();

    if (USE_JSON_STORAGE) {
      const applications = await getApplicationsFromFile();
      const exists = applications.find((a: any) => a.id === id);
      const newApplication = { ...data, id, status, createdAt };
      if (!exists) {
        applications.push(newApplication);
        await saveApplicationsToFile(applications);
      }
      return NextResponse.json({ success: true, data: newApplication });
    }

    // MySQL path
    await ensureTable();
    const insertSQL = `INSERT INTO applications (id, payload, status, created_at) VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE payload = VALUES(payload), status = VALUES(status), created_at = VALUES(created_at)`;

    await pool!.execute(insertSQL, [id, JSON.stringify(data), status, new Date(createdAt)]);

    return NextResponse.json({ success: true, data: { ...data, id, status, createdAt } });
  } catch (error) {
    console.error('API Error (POST):', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (USE_JSON_STORAGE) {
      const applications = await getApplicationsFromFile();
      return NextResponse.json(applications);
    }

    await ensureTable();
    const [rows] = await pool!.query('SELECT id, payload, status, created_at FROM applications ORDER BY created_at DESC');

    const apps = (rows as any[]).map((r) => ({
      id: r.id,
      ...((typeof r.payload === 'string') ? JSON.parse(r.payload) : r.payload),
      status: r.status,
      createdAt: r.created_at,
    }));

    return NextResponse.json(apps);
  } catch (error) {
    console.error('API Error (GET):', error);
    return NextResponse.json([]);
  }
}
