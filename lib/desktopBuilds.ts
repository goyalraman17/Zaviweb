export const DESKTOP_RELEASE_VERSION = '1.10.0';

export const DESKTOP_RELEASE_BASE_URL =
  'https://storage.googleapis.com/zavi-releases';

export type DesktopArtifactSlug =
  | 'macos-apple-silicon'
  | 'macos-intel'
  | 'windows-installer'
  | 'linux-appimage'
  | 'linux-deb';

export type DesktopPlatformSlug = 'macos' | 'windows' | 'linux';

interface DesktopArtifact {
  fileName: string;
  contentType: string;
  platform: DesktopPlatformSlug;
  internalPath: string;
  sourceUrl: string;
}

export const DESKTOP_BUILD_ARTIFACTS: Record<
  DesktopArtifactSlug,
  DesktopArtifact
> = {
  'macos-apple-silicon': {
    fileName: `Zavi_${DESKTOP_RELEASE_VERSION}_aarch64.dmg`,
    contentType: 'application/x-apple-diskimage',
    platform: 'macos',
    internalPath: '/downloads/desktop/macos-apple-silicon',
    sourceUrl: `${DESKTOP_RELEASE_BASE_URL}/Zavi_${DESKTOP_RELEASE_VERSION}_aarch64.dmg`,
  },
  'macos-intel': {
    fileName: `Zavi_${DESKTOP_RELEASE_VERSION}_x64.dmg`,
    contentType: 'application/x-apple-diskimage',
    platform: 'macos',
    internalPath: '/downloads/desktop/macos-intel',
    sourceUrl: `${DESKTOP_RELEASE_BASE_URL}/Zavi_${DESKTOP_RELEASE_VERSION}_x64.dmg`,
  },
  'windows-installer': {
    fileName: `Zavi_${DESKTOP_RELEASE_VERSION}_x64-setup.exe`,
    contentType: 'application/x-msdownload',
    platform: 'windows',
    internalPath: '/downloads/desktop/windows-installer',
    sourceUrl: `${DESKTOP_RELEASE_BASE_URL}/Zavi_${DESKTOP_RELEASE_VERSION}_x64-setup.exe`,
  },
  'linux-appimage': {
    fileName: `Zavi_${DESKTOP_RELEASE_VERSION}_amd64.AppImage`,
    contentType: 'application/octet-stream',
    platform: 'linux',
    internalPath: '/downloads/desktop/linux-appimage',
    sourceUrl: `${DESKTOP_RELEASE_BASE_URL}/Zavi_${DESKTOP_RELEASE_VERSION}_amd64.AppImage`,
  },
  'linux-deb': {
    fileName: `Zavi_${DESKTOP_RELEASE_VERSION}_amd64.deb`,
    contentType: 'application/vnd.debian.binary-package',
    platform: 'linux',
    internalPath: '/downloads/desktop/linux-deb',
    sourceUrl: `${DESKTOP_RELEASE_BASE_URL}/Zavi_${DESKTOP_RELEASE_VERSION}_amd64.deb`,
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
