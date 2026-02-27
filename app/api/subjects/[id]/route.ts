import { NextResponse } from 'next/server';
import { db } from '@/lib/supabase';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  try {
    const deleted = db.deleteSubject(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete subject';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
