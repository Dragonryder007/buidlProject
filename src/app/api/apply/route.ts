import { NextResponse } from 'next/server';

// This is a mock database. In production, you would use Prisma/Drizzle with SQL Server/Postgres.
let applications: any[] = [];

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate data
    if (!data.email || !data.github) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const newApplication = {
      id: Date.now(),
      ...data,
      status: 'Applied',
      createdAt: new Date().toISOString(),
    };

    // In production: await db.user.create({ data: newApplication })
    applications.push(newApplication);

    return NextResponse.json({ success: true, data: newApplication });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  // In production: const users = await db.user.findMany()
  return NextResponse.json(applications);
}
