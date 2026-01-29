
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

            <article className="min-h-screen pt-32 pb-20 relative bg-brand-dark">

                {/* Progress Bar (Optional - could implement scroll watcher) */}

                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    {/* Navigation */}
                    <Link to="/blog" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12 group">
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-brand-dark transition-all">
                            <ArrowLeft size={16} />
                        </div>
                        <span className="text-sm font-medium tracking-wide uppercase">Back to Feed</span>
                    </Link>

                    {/* New Header Design */}
                    <header className="max-w-5xl mx-auto text-center space-y-8 mb-20">
                        <div className="flex items-center justify-center gap-4 text-sm font-bold tracking-widest uppercase text-brand-primary">
                            <span>{post.category}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                            <span className="text-neutral-400">{post.readTime}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tighter leading-[1.1]">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-4 pt-4">
                            {/* Author */}
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pr-6 pl-2 py-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="text-left leading-tight">
                                    <p className="text-sm font-bold text-white">{post.author.name}</p>
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Social Ninja's Team</p>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="hidden md:flex items-center gap-2 text-neutral-400 text-sm font-medium px-6 py-4 bg-white/5 border border-white/10 rounded-full">
                                <Calendar size={16} />
                                <span>{post.publishedAt}</span>
                            </div>
                        </div>
                    </header>

                    {/* Cinema Mode Image */}
                    <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden mb-24 relative shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-50"></div>
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1400px] mx-auto">
                        {/* Sidebar (Share & TOC) */}
                        <div className="hidden lg:block lg:col-span-2 relative">
                            <div className="sticky top-40 space-y-8">
                                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest text-center">Share</p>
                                <div className="flex flex-col gap-4 items-center">
                                    <button onClick={() => navigator.clipboard.writeText(shareUrl)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all">
                                        <Linkedin size={20} />
                                    </button>
                                    <button onClick={() => navigator.clipboard.writeText(shareUrl)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all">
                                        <Twitter size={20} />
                                    </button>
                                    <button onClick={() => navigator.clipboard.writeText(shareUrl)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content - Wider and more readable */}
                        <div className="lg:col-span-8">
                            <div className="prose prose-invert prose-xl max-w-none 
                  prose-p:leading-relaxed prose-p:text-neutral-300
                  prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                  prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:text-brand-primary
                  prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-bold
                  prose-ul:list-none prose-ul:space-y-2 prose-ul:pl-0
                  prose-li:pl-6 prose-li:relative prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-3 prose-li:before:w-2 prose-li:before:h-2 prose-li:before:bg-brand-primary prose-li:before:rounded-full
                  prose-blockquote:border-none prose-blockquote:bg-white/5 prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:text-xl prose-blockquote:font-display prose-blockquote:not-italic prose-blockquote:text-white
                  prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12
                ">
                                <Markdown>{post.content}</Markdown>
                            </div>

                            {/* Footer Tags */}
                            <div className="mt-20 pt-10 border-t border-white/10">
                                <div className="flex flex-wrap gap-3">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-sm font-medium text-neutral-300 transition-colors cursor-default">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Empty right col for balance */}
                        <div className="hidden lg:block lg:col-span-2"></div>
                    </div>

                    {/* CTA Section */}
                    <div className="max-w-5xl mx-auto mt-32 mb-12">
                        <div className="relative rounded-[2.5rem] overflow-hidden bg-brand-primary">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10 px-6 py-20 text-center space-y-8">
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-white max-w-2xl mx-auto leading-tight">
                                    Ready to apply these insights to your business?
                                </h2>
                                <p className="text-white/80 text-lg max-w-xl mx-auto">
                                    Stop guessing. Start scaling with data-driven AI systems.
                                </p>
                                <Link to="/contact">
                                    <Button className="bg-white text-brand-dark hover:bg-brand-dark hover:text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-brand-dark/20">
                                        Book Your Strategy Call
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </article>
        </>
    );
};

export default BlogPost;
