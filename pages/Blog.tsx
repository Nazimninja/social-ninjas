import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Clock, Calendar } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';
import { POSTS } from '../data/blogPosts';

const Blog: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO
        title="Blog & Insights | Social Ninja's"
        description="Read deep-dive performance marketing guides, AI automation strategies, and paid ads case studies."
      />

      <AuroraBackground className="pt-36 pb-20 border-b border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            INSIGHTS & CASE STUDIES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer">
            Performance Marketing <br />
            <span className="text-[#1F4B99]">Case Studies & AI Playbooks.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Data-driven guides on paid media optimization, AI sales automation, and scaling unit economics.
          </p>
        </div>
      </AuroraBackground>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post, i) => (
            <SpotlightCard key={i} className="p-6 bg-[#0e121d] border border-neutral-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 bg-[#1F4B99]/15 text-[#4281f5] border border-[#1F4B99]/30 rounded-full">
                  {post.category || 'Growth Playbook'}
                </span>
                <h3 className="text-base font-bold text-white leading-snug line-clamp-2">{post.title}</h3>
                <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-mono">{post.readTime || '5 min read'}</span>
                <Link to={`/blog/${post.id}`} className="text-xs font-bold text-[#4281f5] hover:underline flex items-center gap-1">
                  Read Guide <ArrowRight size={14} />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
