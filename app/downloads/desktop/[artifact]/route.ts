import {
  DESKTOP_BUILD_ARTIFACTS,
  isDesktopArtifactSlug,
} from '@/lib/desktopBuilds';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

async function fetchArtifact(
  request: Request,
  artifact: string,
  method: 'GET' | 'HEAD'
) {
  if (!isDesktopArtifactSlug(artifact)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const build = DESKTOP_BUILD_ARTIFACTS[artifact];
  const range = request.headers.get('range');

  const upstream = await fetch(build.sourceUrl, {
    method,
    headers: range ? { Range: range } : undefined,
    cache: 'no-store',
  });

  if (!upstream.ok) {
    return NextResponse.json(
      { error: 'Unable to fetch desktop build right now.' },
      { status: 502 }
    );
  }

  const headers = new Headers();
  headers.set(
    'Content-Type',
    upstream.headers.get('content-type') || build.contentType
  );
  headers.set(
    'Content-Disposition',
    `attachment; filename="${build.fileName}"`
  );
  headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');

  [
    'accept-ranges',
    'content-length',
    'content-range',
    'etag',
    'last-modified',
  ].forEach((headerName) => {
    const value = upstream.headers.get(headerName);
    if (value) headers.set(headerName, value);
  });

  return new Response(method === 'HEAD' ? null : upstream.body, {
    status: upstream.status,
    headers,
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ artifact: string }> }
) {
  const { artifact } = await params;
  return fetchArtifact(request, artifact, 'GET');
}

export async function HEAD(
  request: Request,
  { params }: { params: Promise<{ artifact: string }> }
) {
  const { artifact } = await params;
  return fetchArtifact(request, artifact, 'HEAD');
}
