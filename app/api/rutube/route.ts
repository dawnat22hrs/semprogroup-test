import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    const { data } = await axios.get<{ duration?: number }>(
      `https://rutube.ru/api/video/${id}/`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
    );
    return NextResponse.json({ duration: data.duration ?? null });
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}
