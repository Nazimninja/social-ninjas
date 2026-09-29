import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Target, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Layers, 
  Quote, 
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import { caseStudies } from '../data/caseStudies';

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const study = caseStudies.find(s => s.slug === id || s.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!study) {
    return (
      <div className="min-h-screen bg-[#0c0c0e] flex flex-col items-center justify-center text-white px-6">
        <h2 className="text-3xl font-display font-bold mb-4">Case Study Not Found</h2>
        <p className="text-neutral-400 mb-8 max-w-md text-center">
          The case study you are looking for does not exist or has been relocated.
        </p>
        <Link 
          to="/case-studies"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121215] border border-white/10 text-white font-medium hover:border-[#38bdf8] transition-colors"
        >
          <ArrowLeft size={16} /> Back to All Case Studies
        </Link>
      </div>
    );
  }

  // Calculate next study for pagination
  const currentIndex = caseStudies.findIndex(s => s.id === study.id);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `How We Scaled ${study.client}: ${study.mainMetric} ${study.metricLabel}`,
    "description": `Detailed case study on how Social Ninja's engineered growth for ${study.client} (${study.industry || study.category}) using ${study.servicesUsed?.join(', ') || 'performance marketing'}.`,
    "image": study.image,
    "author": {
      "@type": "Organization",
      "name": "Social Ninja's",
      "url": "https://socialninjas.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Social Ninja's",
      "logo": {
        "@type": "ImageObject",
        "url": "https://socialninjas.in/logo.png"
      }
    },
    "datePublished": study.publishedAt || "2026-03-12",
    "dateModified": study.updatedAt || "2026-09-29",
    "mainEntityOfPage": `https://socialninjas.in/case-studies/${study.slug}`
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#0c0c0e] text-white">
      <SEO 
        title={`How We Scaled ${study.client}: ${study.mainMetric} ${study.metricLabel} | Social Ninja's`} 
        description={`In-depth case study: How Social Ninja's helped ${study.client} achieve ${study.mainMetric} ${study.metricLabel}. Read the background, core bottlenecks, tactical playbook, and verified results.`}
        image={study.image}
        keywords={`${study.client} case study, ${study.category} growth, ${study.industry || ''}, ROI proof, performance marketing case study India`}
      />

      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} 
      />

      {/* Main Container constrained to 1140px discipline */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link 
            to="/case-studies" 
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-[#38bdf8] transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to All Case Studies
          </Link>
        </div>

        {/* Header Hero Section */}
        <div className="border-b border-white/10 pb-12 mb-12">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[#38bdf8] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20">
              {study.category}
            </span>
            {study.industry && (
              <span className="text-neutral-400 text-xs font-medium px-3 py-1 rounded-full bg-[#121215] border border-white/10">
                {study.industry}
              </span>
            )}
            {study.location && (
              <span className="inline-flex items-center gap-1 text-neutral-400 text-xs px-3 py-1 rounded-full bg-[#121215] border border-white/10">
                <MapPin size={12} className="text-[#38bdf8]" /> {study.location}
              </span>
            )}
            {study.timeline && (
              <span className="inline-flex items-center gap-1 text-neutral-400 text-xs px-3 py-1 rounded-full bg-[#121215] border border-white/10">
                <Calendar size={12} className="text-neutral-400" /> {study.timeline}
              </span>
            )}
          </div>

          {/* Primary H1 Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
            How We Scaled {study.client}: <span className="text-[#38bdf8]">{study.mainMetric}</span> {study.metricLabel}
          </h1>

          {/* Subtitle / Executive Summary */}
          <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-3xl mb-8">
            A comprehensive growth engineering breakdown: How our performance and automation systems eliminated acquisition bottlenecks and unlocked predictable profit margins for {study.client}.
          </p>

          {/* Services Deployed Pills */}
          {study.servicesUsed && study.servicesUsed.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mr-2 flex items-center gap-1.5">
                <Layers size={13} className="text-[#38bdf8]" /> Services Used:
              </span>
              {study.servicesUsed.map((service, i) => (
                <span 
                  key={i} 
                  className="text-xs font-medium text-neutral-300 bg-[#121215] border border-white/10 px-3.5 py-1.5 rounded-lg"
                >
                  {service}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Primary Metrics Highlight Grid */}
        <div className="mb-16">
          <div className="bg-[#121215] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            {/* Background Radial Glow */}
            <div 
              className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Primary Anchor Metric */}
              <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                <span className="text-[11px] font-bold text-[#38bdf8] uppercase tracking-widest block mb-1">
                  Primary Outcome Metric
                </span>
                <p className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                  {study.mainMetric}
                </p>
                <p className="text-base text-neutral-400 font-medium mt-2">
                  {study.metricLabel}
                </p>
              </div>

              {/* Secondary Supporting Metrics */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
                {study.secondaryMetrics.map((metric, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {metric.value}
                    </p>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Asset */}
        <div className="mb-20 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
          <img 
            src={study.image} 
            alt={`${study.client} Case Study Breakdown`} 
            className="w-full aspect-video md:aspect-[21/9] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-80" />
        </div>

        {/* Long-Form Deep Dive Content (Constrained to 800px Focused Reading Container) */}
        <div className="max-w-[800px] mx-auto space-y-16">
          
          {/* Section 1: Client Background */}
          {study.clientBackground && (
            <section className="space-y-4">
              <div className="flex items-center gap-2.5 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
                <Briefcase size={16} /> 01. Client Background & Baseline
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Who Is {study.client}?
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
                {study.clientBackground}
              </p>
            </section>
          )}

          {/* Section 2: The Core Challenge / Bottleneck */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Target size={16} /> 02. The Core Bottlenecks
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The Strategic Obstacle
            </h2>
            <div className="p-6 rounded-xl bg-[#121215] border border-white/10 text-neutral-300 leading-relaxed text-base sm:text-lg">
              {study.challenge}
            </div>
          </section>

          {/* Section 3: The Growth Engineering Playbook (What We Did) */}
          <section className="space-y-6">
            <div className="flex items-center gap-2.5 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
              <Zap size={16} /> 03. The Growth Engineering Playbook
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Tactical Execution & Architecture
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              We eliminated fragmented ad experiments and deployed our structured growth architecture designed for scalable customer acquisition.
            </p>

            {study.whatWeDid && (
              <div className="space-y-4 pt-2">
                {study.whatWeDid.map((tactic, idx) => (
                  <SpotlightCard 
                    key={idx}
                    className="p-6 bg-[#121215] border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 text-xs font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-2.5 py-1 rounded">
                        {tactic.step}
                      </span>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white">
                          {tactic.title}
                        </h3>
                        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                          {tactic.description}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            )}
          </section>

          {/* Section 4: Quantitative Results & Impact Breakdown */}
          {study.detailedResults && (
            <section className="space-y-6">
              <div className="flex items-center gap-2.5 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
                <TrendingUp size={16} /> 04. Quantitative Impact
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Before vs. After Performance Data
              </h2>
              <p className="text-neutral-400 text-base leading-relaxed">
                Measured over verified client ad accounts, Google Analytics 4, and CRM revenue reporting.
              </p>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121215]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-neutral-400">Key Metric</th>
                      <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-neutral-400">Before Social Ninja's</th>
                      <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-neutral-400">After Social Ninja's</th>
                      <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">Net Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {study.detailedResults.map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-4 px-5 font-semibold text-white">{row.metric}</td>
                        <td className="py-4 px-5 text-neutral-400">{row.before}</td>
                        <td className="py-4 px-5 font-bold text-white">{row.after}</td>
                        <td className="py-4 px-5 font-bold text-[#38bdf8]">{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Section 5: Key Strategic Takeaways */}
          {study.keyTakeaways && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Key Strategic Takeaways for Growth Leaders
              </h2>
              <div className="space-y-3">
                {study.keyTakeaways.map((takeaway, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#121215] border border-white/10">
                    <CheckCircle2 size={18} className="text-[#38bdf8] flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                      {takeaway}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 6: Verified Client Testimonial */}
          {study.testimonial && (
            <section className="pt-4">
              <div className="p-8 rounded-2xl bg-[#121215] border border-white/10 relative overflow-hidden">
                <Quote size={40} className="text-[#38bdf8]/15 absolute top-6 right-6 pointer-events-none" />
                
                <p className="text-base sm:text-lg text-neutral-200 italic leading-relaxed mb-6 relative z-10">
                  "{study.testimonial.text}"
                </p>

                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <img 
                    src={study.testimonial.image} 
                    alt={study.testimonial.author} 
                    className="w-12 h-12 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="font-bold text-white text-base">
                      {study.testimonial.author}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {study.testimonial.role}
                    </p>
                  </div>
                  <div className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#38bdf8]">
                    <ShieldCheck size={14} /> Verified Client
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section 7: Next Case Study Pagination */}
          <div className="border-t border-white/10 pt-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-[#121215] border border-white/10">
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                  Next Case Study
                </span>
                <p className="text-lg font-bold text-white">
                  {nextStudy.client} — {nextStudy.mainMetric} {nextStudy.metricLabel}
                </p>
              </div>
              <Link 
                to={`/case-studies/${nextStudy.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 hover:bg-[#38bdf8]/20 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Read Case Study <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Section 8: Conversion Bridge & Primary CTA */}
          <div className="pt-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#121215] via-[#101116] to-[#0c0c0e] border border-[#38bdf8]/30 text-center space-y-6 relative overflow-hidden shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
                Replicate These Results
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Ready to Engineer Predictable Growth for Your Brand?
              </h3>

              <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Whether you need full-funnel media buying, AI appointment setting, or custom creative pipelines, our team audits your bottlenecks and deploys proven systems.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                {study.relatedService && (
                  <Link 
                    to={study.relatedService.path}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#121215] border border-white/10 hover:border-[#38bdf8] text-white text-sm font-bold transition-all w-full sm:w-auto"
                  >
                    Explore {study.relatedService.name} <ChevronRight size={16} />
                  </Link>
                )}
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#38bdf8] hover:bg-[#0284c7] text-[#0c0c0e] text-sm font-bold transition-all shadow-lg shadow-[#38bdf8]/20 w-full sm:w-auto"
                >
                  Book Strategy Audit Call <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CaseStudyDetail;
