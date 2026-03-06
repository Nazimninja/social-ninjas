
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Target, Zap, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { caseStudies } from '../data/caseStudies';

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const study = caseStudies.find(s => s.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!study) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white px-6">
        <h2 className="text-3xl font-display font-bold mb-4">Case Study Not Found</h2>
        <p className="text-neutral-400 mb-8">The project you are looking for does not exist or has been moved.</p>
        <Link to="/case-studies">
            <Button variant="outline" icon={false} className="gap-2">
                <ArrowLeft size={16} /> Back to Portfolio
            </Button>
        </Link>
      </div>
    );
  }

  // Calculate next study for pagination
  const currentIndex = caseStudies.findIndex(s => s.id === study.id);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <div className="pt-24 pb-0 min-h-screen bg-brand-dark transition-colors duration-300">
      <SEO 
        title={`How We Scaled ${study.client}: A ${study.category} Success Story | Social Ninja's`} 
        description={`Deep dive into how we helped ${study.client} achieve ${study.mainMetric} ${study.metricLabel}. Read the challenge, our tactical solution, and the measurable business outcomes.`}
        image={study.image}
        keywords={`${study.client} case study, ${study.category} growth, marketing results, ROI proof, digital strategy example`}
      />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Link to="/case-studies" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
             <ArrowLeft size={16} /> Back to All Projects
        </Link>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-12 lg:mb-16">
            <div>
                <div className="flex items-center gap-4 mb-6">
                     <span className="text-brand-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                        {study.category}
                     </span>
                     <div className="h-px bg-white/10 flex-grow"></div>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
                    {study.client}
                </h1>
                <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag, i) => (
                        <span key={i} className="text-sm font-medium text-neutral-300 border border-white/10 px-4 py-1.5 rounded-full bg-white/5">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="lg:text-right">
                <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-lg ml-auto">
                    We partnered with <span className="text-white font-medium">{study.client}</span> to engineer a digital transformation that prioritized measurable ROI over vanity metrics.
                </p>
            </div>
        </div>

        {/* Hero Image Container */}
        <div className="relative mb-20">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-brand-primary/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <img 
                    src={study.image} 
                    alt={`${study.client} Case Study`} 
                    className="w-full aspect-video md:aspect-[21/9] object-cover"
                />
                
                {/* Desktop: Gradient Overlay */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            </div>
             
            {/* Stats Card - Responsive Layout: Stacked on mobile, Floating on Desktop */}
            <div className="relative mt-4 md:mt-0 md:absolute md:bottom-12 md:left-12 md:right-auto md:w-auto z-20">
                 <div className="bg-brand-surface md:bg-black/60 md:backdrop-blur-xl border border-white/10 md:border-white/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-16 items-start md:items-center shadow-xl">
                    <div className="w-full md:w-auto">
                        <p className="text-brand-primary text-xs md:text-sm font-bold uppercase tracking-widest mb-1">{study.metricLabel}</p>
                        <p className="text-5xl md:text-6xl font-display font-bold text-white md:text-brand-realWhite">{study.mainMetric}</p>
                    </div>
                    {/* Vertical Divider on Desktop / Horizontal on Mobile */}
                    <div className="h-px w-full md:w-px md:h-16 bg-white/10 md:bg-white/30"></div>
                    <div className="flex flex-wrap md:flex-nowrap gap-x-8 gap-y-4 w-full md:w-auto">
                        {study.secondaryMetrics.map((metric, i) => (
                             <div key={i} className="min-w-[100px]">
                                 <p className="text-2xl font-bold text-white md:text-brand-realWhite">{metric.value}</p>
                                 <p className="text-[10px] md:text-xs text-neutral-400 md:text-gray-400 font-bold uppercase tracking-widest mt-1">{metric.label}</p>
                             </div>
                        ))}
                    </div>
                 </div>
            </div>
        </div>

        {/* Deep Dive Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
             {/* Challenge */}
             <div className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 to-transparent hidden md:block"></div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-brand-surface border border-white/10 text-white">
                        <Target size={24} />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white">The Challenge</h3>
                </div>
                <p className="text-lg text-neutral-400 leading-relaxed">
                    {study.challenge}
                </p>
             </div>

             {/* Solution */}
             <div className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary/50 to-transparent hidden md:block"></div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-brand-surface border border-white/10 text-brand-primary">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white">The Solution</h3>
                </div>
                <p className="text-lg text-neutral-400 leading-relaxed">
                    {study.solution}
                </p>
             </div>
        </div>
      </div>

      {/* Results / Next CTA Bar */}
      <div className="border-t border-white/5 bg-brand-surface transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                <div>
                    <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest block mb-2">Next Case Study</span>
                    <h4 className="text-2xl md:text-3xl font-display font-bold text-white">{nextStudy.client}</h4>
                </div>
                <Link to={`/case-studies/${nextStudy.id}`}>
                    <Button variant="outline" className="group">
                        View Project <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>
         </div>
      </div>
      
      {/* Final CTA */}
      <div className="bg-brand-primary text-brand-dark py-16 md:py-20 text-center">
         <div className="max-w-3xl mx-auto px-6">
             <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to replicate these results?</h2>
             <p className="text-brand-dark/80 text-lg mb-8 max-w-xl mx-auto font-medium">
                 Your business has specific bottlenecks. We have specific solutions. Let's find the match.
             </p>
             <Link to="/contact">
                 <button className="bg-brand-dark text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full md:w-auto">
                     Book Your Strategy Call
                 </button>
             </Link>
         </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
