import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import AuroraBackground from '../components/AuroraBackground';
import SpotlightCard from '../components/SpotlightCard';
import { POSTS } from '../data/blogPosts';

const categoryColors: Record<string, string> = {
  'AI & Automation': '#4281f5',
  'Performance Marketing': '#3ba213',
  'Content Strategy': '#a855f7',
  'Social Media': '#f59e0b',
  'SEO': '#06b6d4',
  'Growth': '#3ba213',
};

const Blog: React.FC = () => {
  const featured = POSTS[0];
  const rest = POSTS.slice(1);

  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO
        title="Blog & Insights | Social Ninja's"
        description="Read deep-dive performance marketing guides, AI automation strategies, and paid ads case studies."
      />

      {/* HERO */}
      <AuroraBackground className="pt-36 pb-20 border-b border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            INSIGHTS & CASE STUDIES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer">
            Performance Marketing <br />
            <span className="text-[#1F4B99]">Playbooks & AI Guides.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Data-driven guides on paid media optimization, AI sales automation, and scaling unit economics — from the team building real growth systems.
          </p>
        </div>
      </AuroraBackground>

      {/* FEATURED POST */}
      {featured && (
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold text-[#4281f5] uppercase tracking-widest mb-6">Featured Post</div>
          <Link to={`/blog/${featured.id}`} className="block group">
            <SpotlightCard className="p-8 sm:p-10 bg-[#0e121d] border border-neutral-800 space-y-5 hover:border-[#1F4B99]/40 transition-colors duration-300">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <span
                  className="text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border"
                  style={{
                    background: `${categoryColors[featured.category] || '#4281f5'}18`,
                    color: categoryColors[featured.category] || '#4281f5',
                    borderColor: `${categoryColors[featured.category] || '#4281f5'}30`,
                  }}
                >
                  {featured.category || 'Growth Playbook'}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono">
                  <Clock size={11} /> {featured.readTime || '5 min read'}
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight group-hover:text-[#4281f5] transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl">{featured.excerpt}</p>
              <div className="flex items-center gap-2 text-sm font-bold text-[#4281f5] pt-2">
                Read Full Guide <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </SpotlightCard>
          </Link>
        </section>
      )}

      {/* ALL POSTS GRID */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-8">All Articles</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => {
            const catColor = categoryColors[post.category] || '#4281f5';
            return (
              <Link to={`/blog/${post.id}`} key={i} className="block group">
                <SpotlightCard className="p-6 bg-[#0e121d] border border-neutral-800 flex flex-col justify-between space-y-4 h-full hover:border-neutral-700 transition-colors duration-300">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border"
                        style={{
                          background: `${catColor}15`,
                          color: catColor,
                          borderColor: `${catColor}28`,
                        }}
                      >
                        {post.category || 'Growth Playbook'}
                      </span>
                      <span className="text-[10px] text-neutral-600 font-mono">{post.readTime || '5 min'}</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-[#4281f5] transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  </div>
                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-neutral-600">{post.date || 'Recent'}</span>
                    <span className="text-xs font-bold text-[#4281f5] flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Read Guide <ArrowRight size={13} />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 max-w-4xl mx-auto px-4 text-center">
        <SpotlightCard className="p-10 sm:p-14 bg-gradient-to-br from-[#0e121d] via-[#121826] to-[#0e121d] border border-neutral-800 space-y-6">
          <div className="text-xs font-bold text-[#3ba213] uppercase tracking-widest">Work With Us</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Want These Results for <span className="text-[#1F4B99]">Your Business?</span>
          </h2>
          <p className="text-sm text-neutral-400 max-w-lg mx-auto">
            Book a free 30-minute growth strategy session. We audit your revenue funnel and outline an action plan in the first call.
          </p>
          <Link to="/contact">
            <button className="mt-2 px-8 py-3.5 bg-[#1F4B99] hover:bg-[#2558b5] text-white font-bold text-sm rounded-xl transition-colors duration-200">
              Book Free Strategy Call →
            </button>
          </Link>
        </SpotlightCard>
      </section>
    </div>
  );
};

export default Blog;
