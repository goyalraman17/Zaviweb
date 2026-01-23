import { MetadataRoute } from 'next'

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
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // If you have dynamic routes (e.g., from a CMS), you would fetch them and add them to the sitemap here.
  // For example:
  // const blogPosts = await fetch('...').then(res => res.json());
  // const blogUrls = blogPosts.map(post => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.6,
  // }));

  return [
    ...staticUrls,
    // ...blogUrls,
  ];
}