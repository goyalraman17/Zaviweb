
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';

export default function BlogListingPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Navigation />

            {/* Header */}
            <div className="bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
                        The Zavi Blog
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-500">
                        Insights on voice AI, productivity, and the future of work.
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group pointer-events-auto">
                            <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">


                                <div className="flex flex-1 flex-col justify-between p-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                                {post.category}
                                            </span>
                                            <span>{post.readTime}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="mt-3 text-base text-gray-600 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex items-center">
                                        <div className="flex-shrink-0">
                                            <span className="sr-only">{post.author}</span>
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 uppercase">
                                                {post.author.substring(0, 1)}
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                            <div className="flex space-x-1 text-sm text-gray-500">
                                                <time dateTime="2026-02-01">{post.date}</time>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Newsletter Section */}
            <div className="bg-white py-16 sm:py-24">
                <div className="relative sm:py-16">
                    <div aria-hidden="true" className="hidden sm:block">
                        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
                        <svg
                            className="absolute top-8 left-1/2 -ml-3"
                            width={404}
                            height={392}
                            fill="none"
                            viewBox="0 0 404 392"
                        >
                            <defs>
                                <pattern
                                    id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                                    x={0}
                                    y={0}
                                    width={20}
                                    height={20}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
                        </svg>
                    </div>
                    <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="relative overflow-hidden rounded-2xl bg-blue-600 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
                            <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                                <svg
                                    className="absolute inset-0 h-full w-full"
                                    preserveAspectRatio="xMidYMid slice"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 1463 360"
                                >
                                    <path
                                        className="text-blue-500 text-opacity-40"
                                        fill="currentColor"
                                        d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                                    />
                                    <path
                                        className="text-blue-700 text-opacity-40"
                                        fill="currentColor"
                                        d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                                    />
                                </svg>
                            </div>
                            <div className="relative">
                                <div className="sm:text-center">
                                    <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                                        Get productivity tips delivered.
                                    </h2>
                                    <p className="mt-6 mx-auto max-w-2xl text-lg text-blue-100">
                                        Join forward-thinking professionals reclaiming their time with voice AI.
                                    </p>
                                </div>
                                <form action="#" className="mt-12 sm:mx-auto sm:max-w-lg sm:flex">
                                    <div className="min-w-0 flex-1">
                                        <label htmlFor="cta-email" className="sr-only">
                                            Email address
                                        </label>
                                        <input
                                            id="cta-email"
                                            type="email"
                                            className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-3">
                                        <button
                                            type="submit"
                                            className="block w-full rounded-md border border-transparent px-5 py-3 bg-blue-500 text-base font-medium text-white shadow hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 sm:px-10"
                                        >
                                            Subscribe
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
