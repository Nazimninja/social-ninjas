
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, Share2, Linkedin, Twitter, Facebook } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import Button from '../components/Button';
import NotFound from './NotFound';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <NotFound />;
    }

    // Calculate read time if not provided, or use the one from data
    // Using the one from data for now.

    const shareUrl = window.location.href;

    return (
        <>
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.coverImage}
                type="article"
                article={{
                    publishedTime: post.publishedAt,
                    modifiedTime: post.publishedAt,
                    section: post.category,
                    tags: post.tags,
                    author: post.author.name
                }}
            />

            <article className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-primary/5 to-transparent pointer-events-none"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Back Link */}
                    <Link to="/blog" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Blog</span>
                    </Link>

                    {/* Header */}
                    <header className="space-y-6 mb-12">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
                            <span className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-neutral-400">
                                <Calendar size={14} />
                                <span>{post.publishedAt}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-neutral-400">
                                <Clock size={14} />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                                    <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{post.author.name}</p>
                                    <p className="text-xs text-neutral-400">Social Ninja's Team</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="p-2 h-auto text-neutral-400 hover:text-white rounded-full border-white/10" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                                    <Share2 size={16} />
                                </Button>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:list-disc prose-ul:pl-6
            prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:bg-white/5 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:italic
            prose-img:rounded-xl prose-img:shadow-lg
          ">
                        <Markdown>{post.content}</Markdown>
                    </div>

                    {/* Footer Tags */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs text-neutral-300 transition-colors cursor-default">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border border-white/10 text-center space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                                Ready to Scale with AI Automation?
                            </h2>
                            <p className="text-neutral-400 max-w-lg mx-auto mb-8">
                                Book a free strategy call to discuss how we can implement these systems in your business.
                            </p>
                            <Link to="/contact">
                                <Button variant="primary" className="px-8 py-3 text-sm font-bold">
                                    Book Your Strategy Call
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

export default BlogPost;
