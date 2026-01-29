
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User, TrendingUp } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
    const featuredPost = blogPosts[0];
    const recentPosts = blogPosts.slice(1);

    return (
        <>
            <SEO
                title="Blog | AI Automation & Performance Marketing Insights"
                description="Read the latest insights on AI automation, performance marketing, and business scaling strategies from Social Ninja's."
            />

            <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden bg-brand-dark">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="max-w-[1400px] mx-auto space-y-24">

                    {/* Header Section */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
                        <div className="space-y-4 max-w-2xl">
                            <h1 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter">
                                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Feed.</span>
                            </h1>
                            <p className="text-xl text-neutral-400 font-light max-w-lg">
                                Curated insights on AI, growth systems, and the future of digital performance.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-white uppercase tracking-widest">Follow us:</span>
                            {/* Make these functional or just visual for now */}
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-brand-primary/20 transition-all cursor-pointer">
                                <TrendingUp size={16} />
                            </div>
                        </div>
                    </header>

                    {/* Featured Post (Magazine Style Hero) */}
                    {featuredPost && (
                        <ScrollReveal>
                            <section className="relative group cursor-pointer">
                                <Link to={`/blog/${featuredPost.slug}`} className="block">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                        {/* Image Side */}
                                        <div className="lg:col-span-8 relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-3xl">
                                            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                                            <img
                                                src={featuredPost.coverImage}
                                                alt={featuredPost.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                            />
                                            <div className="absolute top-6 left-6 z-20">
                                                <span className="px-4 py-2 bg-white text-brand-dark font-bold text-xs uppercase tracking-wider rounded-none">
                                                    Featured Story
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div className="lg:col-span-4 space-y-6">
                                            <div className="flex items-center gap-4 text-xs font-medium text-brand-primary uppercase tracking-widest">
                                                <span>{featuredPost.category}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                                <span className="text-neutral-400">{featuredPost.readTime}</span>
                                            </div>

                                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-[1.1] group-hover:text-brand-primary transition-colors">
                                                {featuredPost.title}
                                            </h2>

                                            <p className="text-neutral-400 text-lg leading-relaxed line-clamp-3">
                                                {featuredPost.excerpt}
                                            </p>

                                            <div className="flex items-center gap-4 pt-4">
                                                <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                                                    <img src={featuredPost.author.image} alt={featuredPost.author.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white">{featuredPost.author.name}</p>
                                                    <p className="text-xs text-neutral-500">{featuredPost.publishedAt}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </section>
                        </ScrollReveal>
                    )}

                    {/* Recent Posts Grid */}
                    {recentPosts.length > 0 && (
                        <section>
                            <h3 className="text-2xl font-display font-bold text-white mb-10 flex items-center gap-4">
                                <span className="w-8 h-[2px] bg-brand-primary"></span>
                                Latest Articles
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                                {recentPosts.map((post, index) => (
                                    <ScrollReveal key={post.id} delay={index * 100}>
                                        <Link to={`/blog/${post.slug}`} className="group block space-y-6">
                                            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale-[20%] group-hover:grayscale-0"
                                                />
                                                <div className="absolute top-4 right-4">
                                                    <span className="px-3 py-1 bg-brand-dark/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium uppercase tracking-wider">
                                                    <span>{post.publishedAt}</span>
                                                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                                    <span>{post.readTime}</span>
                                                </div>

                                                <h4 className="text-2xl font-display font-bold text-white leading-tight group-hover:text-brand-primary transition-colors">
                                                    {post.title}
                                                </h4>

                                                <p className="text-neutral-400 text-sm line-clamp-2">
                                                    {post.excerpt}
                                                </p>

                                                <div className="pt-2 flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest group/btn">
                                                    Read Article
                                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Newsletter / CTA */}
                    <section className="py-20 border-t border-white/5">
                        <div className="bg-gradient-to-r from-brand-primary/10 to-brand-dark rounded-3xl p-10 md:p-20 text-center space-y-8 relative overflow-hidden border border-white/5 dashed-border">
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                                    Join the <span className="text-brand-primary">Inner Circle</span>
                                </h3>
                                <p className="text-neutral-400 text-lg mb-8">
                                    Get our latest breakdowns on AI automation and rapid scaling strategies delivered straight to your inbox. No fluff.
                                </p>

                                <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-primary transition-colors"
                                    />
                                    <Button variant="primary" className="rounded-full px-10 py-4 font-bold text-sm hover:scale-105 transition-transform">
                                        Subscribe
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </>
    );
};

export default Blog;
