import { MetadataRoute } from 'next'

import { blogPosts } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zavi.ai';

  // Static routes with strategic priority assignments for GEO/AEO
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/demo', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog posts — higher frequency for SEO freshness signals
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    ...staticUrls,
    ...blogUrls,
  ];
}