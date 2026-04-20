import {
  getLatestDesktopRelease,
  isDesktopArtifactSlug,
  resolveDesktopArtifact,
} from '@/lib/desktopBuilds';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

async function fetchArtifact(
  artifact: string,
  method: 'GET' | 'HEAD'
) {
  if (!isDesktopArtifactSlug(artifact)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const release = await getLatestDesktopRelease();
  const build = resolveDesktopArtifact(artifact, release.version);
  const status = method === 'HEAD' ? 308 : 307;

  return NextResponse.redirect(build.sourceUrl, status);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ artifact: string }> }
) {
  const { artifact } = await params;
  return fetchArtifact(artifact, 'GET');
}

export async function HEAD(
  _request: Request,
  { params }: { params: Promise<{ artifact: string }> }
) {
  const { artifact } = await params;
  return fetchArtifact(artifact, 'HEAD');
}
