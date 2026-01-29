
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
    return (
        <>
            <SEO
                title="Blog | AI Automation & Performance Marketing Insights"
                description="Read the latest insights on AI automation, performance marketing, and business scaling strategies from Social Ninja's."
            />

            <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto space-y-20">
                    {/* Header */}
                    <ScrollReveal>
                        <div className="text-center space-y-6 max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
                                <span className="text-xs font-medium text-brand-primary tracking-wider uppercase">Knowledge Hub</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-tight">
                                Insights for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Growth</span>
                            </h1>

                            <p className="text-lg text-neutral-400 leading-relaxed">
                                Deep dives into AI automation, revenue systems, and modern marketing strategies.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <ScrollReveal key={post.id} delay={index * 100}>
                                <Link to={`/blog/${post.slug}`} className="group block h-full">
                                    <article className="relative h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300 flex flex-col">
                                        {/* Image */}
                                        <div className="relative h-60 overflow-hidden">
                                            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="px-3 py-1 bg-brand-dark/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={14} />
                                                    <span>{post.publishedAt}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={14} />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>

                                            <h2 className="text-xl font-display font-bold text-white mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>

                                            <p className="text-sm text-neutral-400 mb-6 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center overflow-hidden">
                                                        <User size={14} className="text-brand-primary" />
                                                    </div>
                                                    <span className="text-xs font-medium text-neutral-300">{post.author.name}</span>
                                                </div>
                                                <span className="text-brand-primary group-hover:translate-x-1 transition-transform duration-300">
                                                    <ArrowRight size={18} />
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Blog;
