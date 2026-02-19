
import Navigation from '@/components/Navigation';
import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import type { Metadata } from 'next';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schemaData';

interface BlogPostProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        authors: [{ name: post.author }],
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
            siteName: 'Zavi AI',
            url: `https://zavi.ai/blog/${post.slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            creator: '@zavivoice',
        },
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
    };
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostProps) {
    const { slug } = await params;
    // Use non-null assertion or find check to get the post
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Calculate previous/next posts strictly for navigation
    const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

    // Generate structured data
    const articleSchema = generateArticleSchema(post);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://zavi.ai' },
        { name: 'Blog', url: 'https://zavi.ai/blog' },
        { name: post.title, url: `https://zavi.ai/blog/${post.slug}` },
    ]);

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Navigation />

            {/* Enhanced Article Schema */}
            <JsonLd data={articleSchema} />
            <JsonLd data={breadcrumbSchema} />

            {/* Progress Bar (Simulated) */}
            <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-100">
                <div className="h-full bg-blue-600 w-full origin-left scale-x-0 animate-progress" />
            </div>

            <article className="pt-32 pb-16 lg:pt-40 lg:pb-24" itemScope itemType="https://schema.org/Article">
                {/* Post Header */}
                <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                    {/* Breadcrumb Navigation */}
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center justify-center gap-2 text-sm text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <Link href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                                    <span itemProp="name">Home</span>
                                </Link>
                                <meta itemProp="position" content="1" />
                            </li>
                            <span className="text-gray-300">/</span>
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <Link href="/blog" itemProp="item" className="hover:text-blue-600 transition-colors">
                                    <span itemProp="name">Blog</span>
                                </Link>
                                <meta itemProp="position" content="2" />
                            </li>
                            <span className="text-gray-300">/</span>
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="text-gray-900 font-medium truncate max-w-[200px]">
                                <span itemProp="name">{post.title}</span>
                                <meta itemProp="position" content="3" />
                            </li>
                        </ol>
                    </nav>

                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-blue-700 uppercase bg-blue-50 rounded-full">
                            {post.category}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm font-medium text-gray-500">
                            {post.readTime}
                        </span>
                    </div>

                    <h1
                        className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-8 leading-tight"
                        itemProp="headline"
                    >
                        {post.title}
                    </h1>

                    {/* Article summary for AI extraction */}
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto" itemProp="description">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-center space-x-4" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                {post.author.substring(0, 1)}
                            </div>
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-gray-900" itemProp="name">{post.author}</p>
                            <p className="text-sm text-gray-500">
                                <time dateTime={post.date} itemProp="datePublished">{post.date}</time>
                            </p>
                        </div>
                    </div>

                    {/* Hidden publisher for schema */}
                    <div className="sr-only" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                        <span itemProp="name">Zavi AI</span>
                        <span itemProp="url">https://zavi.ai</span>
                    </div>
                </header>



                {/* Content */}
                <div
                    className="prose prose-lg md:prose-xl prose-slate mx-auto px-4 sm:px-6 lg:px-8 
            prose-headings:font-bold prose-headings:text-gray-900 
            prose-p:text-gray-600 prose-p:leading-relaxed 
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-lg
            marker:text-blue-500"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    itemProp="articleBody"
                />

                {/* Tags */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                                #{tag}
                            </Link>
                        ))}
                    </div>
                    <meta itemProp="keywords" content={post.tags.join(', ')} />
                </div>

                {/* Author Bio / Call to Action */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <div className="bg-blue-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Type less. Speak more.
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Join forward-thinking professionals saving 40+ hours a year with Zavi AI voice typing keyboard. Free to download.
                            </p>
                            <Link href="/#download" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Get Zavi for Free
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {(() => {
                    const related = blogPosts
                        .filter((p) => p.slug !== post.slug)
                        .map((p) => ({
                            ...p,
                            score: p.tags.filter((t) => post.tags.includes(t)).length +
                                (p.category === post.category ? 2 : 0),
                        }))
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 3);

                    return related.length > 0 ? (
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
                            <div className="grid sm:grid-cols-3 gap-6">
                                {related.map((rp) => (
                                    <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                                        <article className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all h-full">
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">{rp.category}</span>
                                            <h4 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors mt-3 mb-2 line-clamp-2">{rp.title}</h4>
                                            <p className="text-sm text-gray-500">{rp.readTime}</p>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : null;
                })()}

                {/* Newsletter Signup (Inline) */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 py-12 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Get productivity tips delivered</h3>
                        <p className="text-gray-600 text-sm mb-6">Join forward-thinking professionals reclaiming their time with voice AI.</p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                required
                            />
                            <button className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors text-sm">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </article>

            {/* Navigation Footer */}
            {(prevPost || nextPost) && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {prevPost ? (
                            <Link href={`/blog/${prevPost.slug}`} className="group block p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Previous Article</span>
                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 mt-2">{prevPost.title}</h4>
                            </Link>
                        ) : <div />}

                        {nextPost ? (
                            <Link href={`/blog/${nextPost.slug}`} className="group block p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all text-right">
                                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Next Article</span>
                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 mt-2">{nextPost.title}</h4>
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            )}
        </div>
    );
}
