import { MetadataRoute } from 'next'

import { blogPosts } from '@/lib/blogData';
import { comparisons } from '@/lib/comparisonData';
import { languages } from '@/lib/languageData';
import { glossaryTerms } from '@/lib/glossaryData';
import { useCases } from '@/lib/useCaseData';

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
    { path: '/compare', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/languages', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/glossary', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/changelog', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/download', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/use-cases', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog posts
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Blog categories
  const categories = Array.from(new Set(blogPosts.map((p) => p.category)));
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Blog tags
  const tags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));
  const tagUrls = tags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  // Comparison pages — high-intent, high-value
  const comparisonUrls = comparisons.map((comp) => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Language pages — programmatic SEO
  const languageUrls = languages.map((lang) => ({
    url: `${baseUrl}/languages/${lang.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Glossary terms
  const glossaryUrls = glossaryTerms.map((term) => ({
    url: `${baseUrl}/glossary/${term.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Use case pages — high-intent
  const useCaseUrls = useCases.map((uc) => ({
    url: `${baseUrl}/use-cases/${uc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    ...staticUrls,
    ...blogUrls,
    ...categoryUrls,
    ...tagUrls,
    ...comparisonUrls,
    ...languageUrls,
    ...glossaryUrls,
    ...useCaseUrls,
  ];
}