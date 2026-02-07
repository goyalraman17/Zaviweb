
import Navigation from '@/components/Navigation';
import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import type { Metadata } from 'next';

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
            title: 'Post Not Found | Zavi AI',
        };
    }

    return {
        title: `${post.title} | Zavi AI Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
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

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Navigation />
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.title,
                    "description": post.excerpt,
                    "author": {
                        "@type": "Person",
                        "name": post.author
                    },
                    "datePublished": post.date, // Note: Schema prefers ISO, but this matches our data mock for now
                    "genre": post.category,
                    "keywords": post.tags.join(', '),
                    "publisher": {
                        "@type": "Organization",
                        "name": "Zavi AI",
                        "logo": "https://zavi.ai/zavi-logo.png"
                    }
                }}
            />

            {/* Progress Bar (Simulated) */}
            <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-100">
                <div className="h-full bg-blue-600 w-full origin-left scale-x-0 animate-progress" />
            </div>

            <article className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                {/* Post Header */}
                <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-blue-700 uppercase bg-blue-50 rounded-full">
                            {post.category}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm font-medium text-gray-500">
                            {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                {post.author.substring(0, 1)}
                            </div>
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-gray-900">{post.author}</p>
                            <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
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
                />

                {/* Tags */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors cursor-default">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Author Bio / Call to Action */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <div className="bg-blue-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Type less. Speak more.
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Join forward-thinking professionals saving 40+ hours a year with Zavi AI.
                            </p>
                            <Link href="/#download" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Get Zavi for Free
                            </Link>
                        </div>
                    </div>
                </div>

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
