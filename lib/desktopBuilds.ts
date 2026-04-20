export const DESKTOP_RELEASE_BASE_URL =
  'https://storage.googleapis.com/zavi-releases';

export const DESKTOP_RELEASE_FALLBACK_VERSION = '1.12.0';

export type DesktopArtifactSlug =
  | 'macos-apple-silicon'
  | 'macos-intel'
  | 'windows-installer'
  | 'linux-appimage'
  | 'linux-deb';

export type DesktopPlatformSlug = 'macos' | 'windows' | 'linux';

interface DesktopArtifactDefinition {
  fileTemplate: string;
  contentType: string;
  platform: DesktopPlatformSlug;
  internalPath: string;
}

export interface DesktopArtifact extends DesktopArtifactDefinition {
  fileName: string;
  sourceUrl: string;
}

export interface DesktopReleaseMeta {
  version: string;
  pubDate?: string;
}

export const DESKTOP_BUILD_ARTIFACTS: Record<
  DesktopArtifactSlug,
  DesktopArtifactDefinition
> = {
  'macos-apple-silicon': {
    fileTemplate: 'Zavi_{version}_aarch64.dmg',
    contentType: 'application/x-apple-diskimage',
    platform: 'macos',
    internalPath: '/downloads/desktop/macos-apple-silicon',
  },
  'macos-intel': {
    fileTemplate: 'Zavi_{version}_x64.dmg',
    contentType: 'application/x-apple-diskimage',
    platform: 'macos',
    internalPath: '/downloads/desktop/macos-intel',
  },
  'windows-installer': {
    fileTemplate: 'Zavi_{version}_x64-setup.exe',
    contentType: 'application/x-msdownload',
    platform: 'windows',
    internalPath: '/downloads/desktop/windows-installer',
  },
  'linux-appimage': {
    fileTemplate: 'Zavi_{version}_amd64.AppImage',
    contentType: 'application/octet-stream',
    platform: 'linux',
    internalPath: '/downloads/desktop/linux-appimage',
  },
  'linux-deb': {
    fileTemplate: 'Zavi_{version}_amd64.deb',
    contentType: 'application/vnd.debian.binary-package',
    platform: 'linux',
    internalPath: '/downloads/desktop/linux-deb',
  },
};

export const DESKTOP_PLATFORM_PAGES: Record<DesktopPlatformSlug, string> = {
  macos: '/download/macos',
  windows: '/download/windows',
  linux: '/download/linux',
};

export function isDesktopArtifactSlug(
  value: string
): value is DesktopArtifactSlug {
  return value in DESKTOP_BUILD_ARTIFACTS;
}

export function resolveDesktopArtifact(
  artifact: DesktopArtifactSlug,
  version = DESKTOP_RELEASE_FALLBACK_VERSION
): DesktopArtifact {
  const build = DESKTOP_BUILD_ARTIFACTS[artifact];
  const fileName = build.fileTemplate.replace('{version}', version);

  return {
    ...build,
    fileName,
    sourceUrl: `${DESKTOP_RELEASE_BASE_URL}/${fileName}`,
  };
}

export async function getLatestDesktopRelease(): Promise<DesktopReleaseMeta> {
  try {
    const response = await fetch(`${DESKTOP_RELEASE_BASE_URL}/latest.json`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`latest.json returned ${response.status}`);
    }

    const data = (await response.json()) as {
      version?: string;
      pub_date?: string;
    };

    return {
      version: data.version || DESKTOP_RELEASE_FALLBACK_VERSION,
      pubDate: data.pub_date,
    };
  } catch {
    return {
      version: DESKTOP_RELEASE_FALLBACK_VERSION,
    };
  }
}
