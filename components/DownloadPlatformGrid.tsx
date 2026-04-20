'use client';

import { analytics } from '@/lib/analytics';
import { handlePlatformDownloadFlow } from '@/lib/clientDownloadFlow';

type Platform = 'iOS' | 'Android' | 'macOS' | 'Windows' | 'Linux';

export interface PlatformCard {
  name: Platform;
  icon: JSX.Element;
  req: string;
  cta: string;
  href: string;
}

export default function DownloadPlatformGrid({
  platforms,
}: {
  platforms: PlatformCard[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
      {platforms.map((platform) => (
        <button
          key={platform.name}
          type="button"
          onClick={() => {
            analytics.track('download_click', {
              platform: platform.name,
              source: 'download_page_grid',
            });

            handlePlatformDownloadFlow(platform.name, {
              fallbackHref: platform.href,
            });
          }}
          className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all text-center flex flex-col items-center"
        >
          <div className="text-gray-700 group-hover:text-blue-600 transition-colors mb-3">
            {platform.icon}
          </div>
          <h2 className="text-lg font-bold text-[#0a0a0a] mb-1">
            {platform.name}
          </h2>
          <p className="text-xs text-gray-400 mb-4">{platform.req}</p>
          <span className="mt-auto w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#0a0a0a] text-white group-hover:bg-blue-600 transition-colors">
            {platform.cta}
          </span>
        </button>
      ))}
    </div>
  );
}
