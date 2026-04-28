import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'applications.json');

async function getApplications() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveApplications(applications: any[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(applications, null, 2));
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate data
    if (!data.email) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const applications = await getApplications();
    
    const newApplication = {
      ...data,
      id: data.id || Date.now(),
      status: data.status || 'Applied',
      createdAt: data.createdAt || new Date().toISOString(),
    };

    // Prevent duplicates by ID if it's already there (e.g. from localStorage sync)
    const exists = applications.find((a: any) => a.id === newApplication.id);
    if (!exists) {
        applications.push(newApplication);
        await saveApplications(applications);
    }

    return NextResponse.json({ success: true, data: newApplication });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const applications = await getApplications();
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json([]);
  }
}
