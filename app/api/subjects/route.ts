import { NextResponse } from 'next/server';
import { db } from '@/lib/supabase';
import type { SubjectRow } from '@/lib/supabase';

export async function GET() {
  try {
    const data = db.getAllSubjects();
    return NextResponse.json(data as SubjectRow[]);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to load subjects';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { name, examDate, difficulty, hours } = body as Record<string, unknown>;

  if (!name || !examDate || !difficulty || hours === undefined) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const parsedHours = Number(hours);
  if (isNaN(parsedHours) || parsedHours < 0) {
    return NextResponse.json({ error: 'Hours must be a non-negative number' }, { status: 400 });
  }

  try {
    const data = db.insertSubject({
      name: String(name).trim(),
      exam_date: String(examDate),
      difficulty: String(difficulty),
      hours: parsedHours,
    });
    return NextResponse.json(data as SubjectRow, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to insert subject';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
