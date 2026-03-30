import { MetadataRoute } from 'next';
import { statSync } from 'fs';
import { join } from 'path';

import { blogPosts } from '@/lib/blogData';
import { comparisons } from '@/lib/comparisonData';
import { languages } from '@/lib/languageData';
import { glossaryTerms } from '@/lib/glossaryData';
import { useCases } from '@/lib/useCaseData';
import { integrations } from '@/lib/integrationData';

export const dynamic = 'force-static';

const baseUrl = 'https://zavivoice.com';

function getFileModifiedDate(relativePath: string): Date {
  try {
    return statSync(join(process.cwd(), relativePath)).mtime;
  } catch {
    return new Date('2026-01-01');
  }
}

function parseMonthYear(value: string, fallbackPath: string): Date {
  const parsed = new Date(`1 ${value}`);
  return Number.isNaN(parsed.getTime())
    ? getFileModifiedDate(fallbackPath)
    : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes with strategic priority assignments for GEO/AEO
  const staticRoutes = [
    {
      path: '',
      source: 'app/page.tsx',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/about',
      source: 'app/about/page.tsx',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/contact',
      source: 'app/contact/page.tsx',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/demo',
      source: 'app/demo/page.tsx',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/privacy',
      source: 'app/privacy/page.tsx',
      priority: 0.4,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/terms',
      source: 'app/terms/page.tsx',
      priority: 0.4,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/blog',
      source: 'app/blog/page.tsx',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/compare',
      source: 'app/compare/page.tsx',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/integrations',
      source: 'app/integrations/page.tsx',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/languages',
      source: 'app/languages/page.tsx',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/glossary',
      source: 'app/glossary/page.tsx',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/changelog',
      source: 'app/changelog/page.tsx',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/pricing',
      source: 'app/pricing/page.tsx',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/download',
      source: 'app/download/page.tsx',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/download/ios',
      source: 'app/download/[platform]/page.tsx',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/download/android',
      source: 'app/download/[platform]/page.tsx',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/download/macos',
      source: 'app/download/[platform]/page.tsx',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/download/windows',
      source: 'app/download/[platform]/page.tsx',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/download/linux',
      source: 'app/download/[platform]/page.tsx',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/use-cases',
      source: 'app/use-cases/page.tsx',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/f6s',
      source: 'app/f6s/page.tsx',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/ef',
      source: 'app/ef/page.tsx',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: getFileModifiedDate(route.source),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog posts
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: parseMonthYear(post.date, 'lib/blogData.ts'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Blog categories
  const categories = Array.from(new Set(blogPosts.map((p) => p.category)));
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')}`,
    lastModified: getFileModifiedDate('lib/blogData.ts'),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Blog tags
  const tags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));
  const tagUrls = tags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${tag
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')}`,
    lastModified: getFileModifiedDate('lib/blogData.ts'),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  // Comparison pages — high-intent, high-value
  const comparisonUrls = comparisons.map((comp) => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: parseMonthYear(comp.lastUpdated, 'lib/comparisonData.ts'),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Language pages — programmatic SEO
  const languageUrls = languages.map((lang) => ({
    url: `${baseUrl}/languages/${lang.slug}`,
    lastModified: getFileModifiedDate('lib/languageData.ts'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Glossary terms
  const glossaryUrls = glossaryTerms.map((term) => ({
    url: `${baseUrl}/glossary/${term.slug}`,
    lastModified: getFileModifiedDate('lib/glossaryData.ts'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Use case pages — high-intent
  const useCaseUrls = useCases.map((uc) => ({
    url: `${baseUrl}/use-cases/${uc.slug}`,
    lastModified: getFileModifiedDate('lib/useCaseData.ts'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // App Integration pages (Superpowers)
  const integrationUrls = integrations.map((int) => ({
    url: `${baseUrl}/integrations/${int.slug}`,
    lastModified: getFileModifiedDate('lib/integrationData.ts'),
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
    ...integrationUrls,
  ];
}
