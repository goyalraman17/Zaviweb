import { MetadataRoute } from 'next'

import { blogPosts } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zavi.ai'; // Replace with your actual domain

  // Add your static routes here
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/demo',
    '/privacy',
    '/terms',
    '/blog',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: route === '' ? 1.0 : (route === '/blog' ? 0.9 : 0.8),
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.7,
  }));

  return [
    ...staticUrls,
    ...blogUrls,
  ];
}