import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

function getAllTags(): string[] {
    const tags = new Set(blogPosts.flatMap((p) => p.tags));
    return Array.from(tags).sort();
}

function getTagSlug(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getTagFromSlug(slug: string): string | undefined {
    return getAllTags().find((tag) => getTagSlug(tag) === slug);
}

export async function generateStaticParams() {
    return getAllTags().map((tag) => ({ tag: getTagSlug(tag) }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
    const { tag: slug } = await params;
    const tagName = getTagFromSlug(slug);
    if (!tagName) return {};

    return {
        title: `${tagName} Articles — Voice AI Blog | Zavi AI`,
        description: `Read articles about ${tagName.toLowerCase()} from the Zavi AI blog. Tips, guides, and comparisons for voice typing and AI dictation.`,
        alternates: { canonical: `https://zavivoice.com/blog/tag/${slug}` },
    };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag: slug } = await params;
    const tagName = getTagFromSlug(slug);
    if (!tagName) notFound();

    const posts = blogPosts.filter((p) => p.tags.includes(tagName));

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavivoice.com' },
        { name: 'Blog', url: 'https://zavivoice.com/blog' },
        { name: `#${tagName}`, url: `https://zavivoice.com/blog/tag/${slug}` },
    ]);

    return (
        <>
            <Navigation />
            <JsonLd data={breadcrumbSchema} />

            <main className="min-h-screen bg-white pt-28 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">#{tagName}</span>
                    </nav>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        <span className="text-blue-600">#</span>{tagName}
                    </h1>
                    <p className="text-gray-600 mb-12">{posts.length} article{posts.length !== 1 ? 's' : ''} tagged with &ldquo;{tagName}&rdquo;</p>

                    {/* Posts */}
                    <div className="space-y-8">
                        {posts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                                <article className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">{post.category}</span>
                                        <span className="text-sm text-gray-400">{post.readTime}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{post.title}</h2>
                                    <p className="text-gray-600 mb-3">{post.excerpt}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {post.tags.map((tag) => (
                                            <Link
                                                key={tag}
                                                href={`/blog/tag/${getTagSlug(tag)}`}
                                                className={`text-xs px-2 py-1 rounded-full transition-all ${tag === tagName
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                                                    }`}
                                            >
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <span>{post.author}</span>
                                        <span>·</span>
                                        <span>{post.date}</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
