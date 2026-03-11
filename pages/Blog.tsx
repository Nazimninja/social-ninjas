import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            setBlogs(data);
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-[#020617] text-white">
            <SEO title="Blog | Social Ninja's" description="Insights on AI, Automation, and Modern Growth Strategies." />

            {/* --- HERO SECTION --- */}
            <div className="relative z-10 pt-20 pb-20 border-b border-brand-primary/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/20 mb-8 mx-auto">
                            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse shadow-[0_0_10px_#38bdf8]"></div>
                            <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">Intelligence Feed</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-white">NINJA</span> LOG
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
                            Transmission logs covering AI systems, scalable infrastructure, and the death of traditional marketing.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- BLOG GRID --- */}
            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                {blogs.length === 0 ? (
                    <div className="text-center py-20 border border-white/5 rounded-3xl bg-[#050A1F]/50 backdrop-blur-sm">
                        <p className="text-neutral-500 text-lg uppercase tracking-widest font-bold">No Transmissions Found.</p>
                        <p className="text-neutral-600 mt-2 text-sm">System is waiting for new intel.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map(blog => (
                            <Link to={`/blog/${blog.id}`} key={blog.id} className="group flex flex-col h-full bg-[#050A1F]/50 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50 transition-all duration-500 rounded-3xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]">
                                
                                {/* Placeholder Image block simulating an abstract tech aesthetic */}
                                <div className="h-48 bg-black/60 relative overflow-hidden flex items-center justify-center group-hover:bg-brand-primary/5 transition-colors duration-500">
                                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary via-transparent to-transparent"></div>
                                    <span className="text-brand-primary/30 font-display font-black text-6xl tracking-tighter uppercase relative z-10 group-hover:text-brand-primary/50 transition-colors duration-500 group-hover:scale-110 transform">
                                        NINJA
                                    </span>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex gap-4 text-xs font-bold text-brand-primary uppercase tracking-widest mb-4">
                                        <div className="flex items-center gap-1"><Calendar size={14} /> {new Date(blog.date).toLocaleDateString()}</div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                                        {blog.title}
                                    </h3>
                                    
                                    <p className="text-neutral-400 text-sm mb-8 flex-grow line-clamp-3">
                                        {blog.excerpt}
                                    </p>
                                    
                                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                                        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-widest font-bold">
                                            <User size={14} /> {blog.author}
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-all">
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
