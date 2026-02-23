import Navigation from '@/components/Navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schemaData';
import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

function getAllCategories(): string[] {
    const categories = new Set(blogPosts.map((p) => p.category));
    return Array.from(categories);
}

function getCategorySlug(category: string): string {
    return category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getCategoryFromSlug(slug: string): string | undefined {
    return getAllCategories().find((cat) => getCategorySlug(cat) === slug);
}

export async function generateStaticParams() {
    return getAllCategories().map((cat) => ({ category: getCategorySlug(cat) }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category: slug } = await params;
    const categoryName = getCategoryFromSlug(slug);
    if (!categoryName) return {};

    return {
        title: `${categoryName} — Voice AI Blog | Zavi AI`,
        description: `Read ${categoryName.toLowerCase()} articles about voice typing, AI dictation, and productivity from the Zavi AI blog.`,
        alternates: { canonical: `https://zavivoice.com/blog/category/${slug}` },
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: slug } = await params;
    const categoryName = getCategoryFromSlug(slug);
    if (!categoryName) notFound();

    const posts = blogPosts.filter((p) => p.category === categoryName);

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavivoice.com' },
        { name: 'Blog', url: 'https://zavivoice.com/blog' },
        { name: categoryName, url: `https://zavivoice.com/blog/category/${slug}` },
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
                        <span className="text-gray-900 font-medium">{categoryName}</span>
                    </nav>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryName}</h1>
                    <p className="text-gray-600 mb-12">{posts.length} article{posts.length !== 1 ? 's' : ''} in this category</p>

                    {/* Category Navigation */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        <Link href="/blog" className="px-4 py-2 rounded-full text-sm border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all">
                            All Posts
                        </Link>
                        {getAllCategories().map((cat) => (
                            <Link
                                key={cat}
                                href={`/blog/category/${getCategorySlug(cat)}`}
                                className={`px-4 py-2 rounded-full text-sm border transition-all ${cat === categoryName
                                    ? 'border-blue-600 bg-blue-600 text-white'
                                    : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                                    }`}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>

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
