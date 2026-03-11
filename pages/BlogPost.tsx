import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/Button';

const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setBlog(data);
                }
            } catch (error) {
                console.error('Failed to fetch blog', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="pt-32 min-h-screen bg-[#020617] text-white flex justify-center">
                <div className="w-8 h-8 rounded-full border-t-2 border-brand-primary animate-spin"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="pt-32 min-h-screen bg-[#020617] text-white text-center">
                <SEO title="Blog Not Found | Social Ninja's" description="The requested intelligence has been redacted or does not exist." />
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">404: Intel Not Found</h1>
                <p className="text-neutral-400 mb-8">The requested transmission has been redacted or does not exist.</p>
                <Link to="/blog">
                    <Button>Return to Intercepts</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-[#020617] text-white">
            <SEO title={`${blog.title} | Social Ninja's Blog`} description={blog.excerpt} />

            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <Link to="/blog" className="inline-flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest hover:text-white transition-colors mb-12">
                    <ArrowLeft size={16} /> Back to Transmissions
                </Link>

                <h1 className="text-4xl md:text-6xl font-display font-black leading-tight mb-8">
                    {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 border-b border-white/10 pb-8 mb-12 text-sm">
                    <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest">
                        <Calendar size={16} className="text-brand-primary" />
                        {new Date(blog.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest">
                        <User size={16} className="text-brand-primary" />
                        {blog.author}
                    </div>
                </div>

                <div className="prose prose-invert prose-brand max-w-none">
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>
                
                <style>{`
                    .prose-brand blockquote {
                        border-left-color: #38bdf8;
                        background: rgba(56, 189, 248, 0.05);
                        padding: 1rem;
                        border-radius: 0 0.5rem 0.5rem 0;
                    }
                    .prose-brand h1, .prose-brand h2, .prose-brand h3 {
                        font-family: inherit;
                        font-weight: 900;
                    }
                    .prose-brand a {
                        color: #38bdf8;
                        text-decoration: none;
                        border-bottom: 1px dashed #38bdf8;
                    }
                    .prose-brand a:hover {
                        color: white;
                        border-bottom-style: solid;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default BlogPost;
