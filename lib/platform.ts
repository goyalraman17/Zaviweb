export type DetectedPlatform =
  | 'iOS'
  | 'Android'
  | 'macOS'
  | 'Windows'
  | 'Linux'
  | 'Unknown';

interface PlatformDetectionInput {
  userAgent: string;
  maxTouchPoints?: number;
}

interface DownloadLabelOptions {
  fallback?: string;
  windowsLabel?: string;
}

export function detectPlatform({
  userAgent,
  maxTouchPoints = 0,
}: PlatformDetectionInput): DetectedPlatform {
  const ua = userAgent.toLowerCase();

  if (
    ua.includes('iphone') ||
    ua.includes('ipad') ||
    ua.includes('ipod') ||
    ua.includes('mobile') ||
    (ua.includes('mac') && maxTouchPoints > 1)
  ) {
    return 'iOS';
  }

  if (ua.includes('android')) return 'Android';
  if (ua.includes('mac')) return 'macOS';
  if (ua.includes('win')) return 'Windows';
  if (ua.includes('linux')) return 'Linux';

  return 'Unknown';
}

export function getDownloadLabel(
  platform: DetectedPlatform,
  options: DownloadLabelOptions = {}
): string {
  const {
    fallback = 'Download Zavi Free',
    windowsLabel = 'Download for Windows',
  } = options;

  if (platform === 'Windows') return windowsLabel;
  if (platform === 'iOS') return 'Get Zavi for iPhone';
  if (platform === 'Android') return 'Get Zavi for Android';
  if (platform === 'macOS') return 'Download for macOS';
  if (platform === 'Linux') return 'Download for Linux';

  return fallback;
}
