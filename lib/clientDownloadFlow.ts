import {
  DESKTOP_BUILD_ARTIFACTS,
  DESKTOP_PLATFORM_PAGES,
} from '@/lib/desktopBuilds';
import type { DetectedPlatform } from '@/lib/platform';

const APP_STORE_URL =
  'https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802';
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.pingpros.keyboard';

function detectMacArtifact() {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (gl && 'getExtension' in gl && 'getParameter' in gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension(
        'WEBGL_debug_renderer_info'
      );

      if (debugInfo) {
        const renderer = String(
          (gl as WebGLRenderingContext).getParameter(
            debugInfo.UNMASKED_RENDERER_WEBGL
          ) || ''
        ).toLowerCase();

        if (renderer.includes('apple')) {
          return 'macos-apple-silicon' as const;
        }

        if (
          renderer.includes('intel') ||
          renderer.includes('amd') ||
          renderer.includes('radeon') ||
          renderer.includes('nvidia')
        ) {
          return 'macos-intel' as const;
        }
      }
    }
  } catch {
    // Fall back to the default build below.
  }

  return 'macos-apple-silicon' as const;
}

function startHiddenDownload(url: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = '';
  link.rel = 'noopener';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  window.setTimeout(() => {
    link.remove();
  }, 5_000);
}

function startDesktopFlow(platform: 'macOS' | 'Windows' | 'Linux') {
  if (platform === 'macOS') {
    const artifact = DESKTOP_BUILD_ARTIFACTS[detectMacArtifact()];
    startHiddenDownload(artifact.internalPath);
    window.setTimeout(() => {
      window.location.assign(`${DESKTOP_PLATFORM_PAGES.macos}?installing=1`);
    }, 900);
    return;
  }

  if (platform === 'Windows') {
    startHiddenDownload(
      DESKTOP_BUILD_ARTIFACTS['windows-installer'].internalPath
    );
    window.setTimeout(() => {
      window.location.assign(`${DESKTOP_PLATFORM_PAGES.windows}?installing=1`);
    }, 900);
    return;
  }

  startHiddenDownload(DESKTOP_BUILD_ARTIFACTS['linux-deb'].internalPath);
  window.setTimeout(() => {
    window.location.assign(`${DESKTOP_PLATFORM_PAGES.linux}?installing=1`);
  }, 900);
}

export function handlePlatformDownloadFlow(
  platform: DetectedPlatform,
  options: {
    onBeforeNavigate?: () => void;
    fallbackHref?: string;
  } = {}
) {
  options.onBeforeNavigate?.();

  if (platform === 'macOS' || platform === 'Windows' || platform === 'Linux') {
    startDesktopFlow(platform);
    return;
  }

  if (platform === 'iOS') {
    window.open(APP_STORE_URL, '_blank', 'noopener,noreferrer');
    return;
  }

  if (platform === 'Android') {
    window.open(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
    return;
  }

  window.location.assign(options.fallbackHref || '/download');
}
