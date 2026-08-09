import {
  DESKTOP_BUILD_ARTIFACTS,
  DESKTOP_PLATFORM_PAGES,
  MAC_LATEST_DOWNLOAD_URL,
  WINDOWS_STORE_URL,
} from '@/lib/desktopBuilds';
import type { DetectedPlatform } from '@/lib/platform';

const APP_STORE_URL =
  'https://apps.apple.com/in/app/zavi-ai-voice-typing-keyboard/id6759040802';
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.pingpros.keyboard';

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

function startDesktopFlow(platform: 'macOS' | 'Linux') {
  if (platform === 'macOS') {
    window.location.assign(MAC_LATEST_DOWNLOAD_URL);
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

  if (platform === 'Windows') {
    window.open(WINDOWS_STORE_URL, '_blank', 'noopener,noreferrer');
    return;
  }

  if (platform === 'macOS' || platform === 'Linux') {
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
