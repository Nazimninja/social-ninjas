
import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const MOCK_POSTS = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        likes: "1.2k",
        comments: "45",
        link: "https://www.instagram.com/socialninja.s/"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1633114128174-2a8db881e57e?q=80&w=1000&auto=format&fit=crop",
        likes: "856",
        comments: "23",
        link: "https://www.instagram.com/socialninja.s/"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=1000&auto=format&fit=crop",
        likes: "2.1k",
        comments: "89",
        link: "https://www.instagram.com/socialninja.s/"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1664575600850-c4b712e6e2bf?q=80&w=1000&auto=format&fit=crop",
        likes: "1.5k",
        comments: "56",
        link: "https://www.instagram.com/socialninja.s/"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        likes: "943",
        comments: "34",
        link: "https://www.instagram.com/socialninja.s/"
    }
];

const InstagramFeed: React.FC = () => {
    return (
        <section className="py-20 bg-brand-dark border-t border-white/5 relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto px-6">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-brand-primary">
                                <Instagram size={20} />
                                <span className="text-xs font-bold tracking-widest uppercase">@socialninja.s</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
                                Latest from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]">Gram</span>
                            </h2>
                        </div>

                        <a
                            href="https://www.instagram.com/socialninja.s/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider hover:text-brand-primary transition-colors"
                        >
                            Follow Us
                            <ExternalLink size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {MOCK_POSTS.map((post, index) => (
                        <ScrollReveal key={post.id} delay={index * 100}>
                            <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block aspect-square rounded-2xl overflow-hidden bg-white/5"
                            >
                                {/* Image */}
                                <img
                                    src={post.image}
                                    alt="Instagram Post"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <div className="flex items-center gap-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-2">
                                            <Heart size={20} className="fill-white" />
                                            <span className="font-bold">{post.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageCircle size={20} className="fill-white" />
                                            <span className="font-bold">{post.comments}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Corner Icon */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                                    <Instagram size={20} className="text-white drop-shadow-lg" />
                                </div>
                            </a>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramFeed;
