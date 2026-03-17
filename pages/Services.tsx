import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, BarChart3, ArrowRight, MessageSquare, CheckCircle2, Zap, Bot, TrendingUp, PenTool, Globe, Cpu } from 'lucide-react';
import SEO from '../components/SEO';

function useReveal() {
  useEffect(()=>{
    const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('up');io.unobserve(x.target);}}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>io.observe(el));
    return()=>io.disconnect();
  },[]);
}

const services = [
  {
    id: 'ai-automation',
    icon:'🤖', title:'AI & Automation', color:'#5ba4f5',
    desc:'Intelligent chatbots and automated workflows that handle lead qualification, follow-ups, and sales 24/7 — while your team focuses on closing.',
    features:['24/7 AI Sales Chatbots','Automated Lead Follow-ups','CRM Integration & Scoring','Workflow Optimisation','Custom AI Agent Build'],
    outcome:'14× faster lead response',
  },
  {
    id: 'performance-marketing',
    icon:'🚀', title:'Performance Marketing', color:'#818cf8',
    desc:'Data-driven paid campaigns on Meta & Google, enriched with AI insights and creative intelligence for maximum ROAS.',
    features:['Meta & Google Ad Campaigns','AI-Powered Audience Targeting','Creative Testing at Scale','Conversion Rate Optimisation','Weekly Performance Reports'],
    outcome:'Average 4.5× ROAS across clients',
  },
  {
    id: 'creative-studio',
    icon:'🎬', title:'Creative Studio', color:'#34d399',
    desc:'High-converting video content, designs and copy — all optimised by real performance data, not just gut feeling.',
    features:['UGC & Branded Video Production','Performance-Led Ad Creatives','Motion Graphics & Reels','Landing Page Design','Copy & Messaging Strategy'],
    outcome:'3× engagement lift vs generic content',
  },
  {
    id: 'social-media',
    icon:'📱', title:'Social Media Management', color:'#f59e0b',
    desc:'Full-service social media management that grows community, drives engagement, and converts followers into customers.',
    features:['Daily Content Strategy','Platform-Native Copywriting','Community Management','Hashtag & SEO Research','Monthly Analytics Reports'],
    outcome:'2× organic reach in 90 days',
  },
  {
    id: 'web-seo',
    icon:'🌐', title:'Web & SEO', color:'#ec4899',
    desc:'Conversion-optimised websites and data-driven SEO that turn visitors into leads — built for speed and performance.',
    features:['High-Converting Web Design','Technical SEO Audits','Content SEO Strategy','Page Speed Optimisation','Lead Gen Landing Pages'],
    outcome:'Top-3 ranking within 6 months',
  },
  {
    id: 'growth-consulting',
    icon:'📊', title:'Growth Consulting', color:'#a78bfa',
    desc:'Strategic advisory for founders who want to build systematic, scalable growth engines — not random marketing activities.',
    features:['Revenue Growth Audits','Funnel Architecture','Team Coaching & Upskilling','90-Day Sprint Planning','Board-Level Reporting'],
    outcome:'Average 40% revenue lift in Q1',
  },
];

const Services: React.FC = () => {
  useReveal();
  return (
    <div className="page-bg" style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div className="amb-1"/><div className="amb-2"/><div className="amb-3"/>
      <SEO title="Services | Social Ninja's" description="AI-first growth services — performance marketing, automation, creative studio, social media management." keywords="performance marketing, AI automation, social media management, creative studio"/>

      {/* HERO */}
      <div style={{position:'relative',paddingTop:140,paddingBottom:88,overflow:'hidden',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
        <div className="hero-grid"/>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 28px',position:'relative',zIndex:2,textAlign:'center'}}>
          <div className="eyebrow reveal" style={{justifyContent:'center'}}>What We Do</div>
          <h1 className="reveal d1" style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:'clamp(42px,6.5vw,84px)',fontWeight:400,letterSpacing:'-2px',lineHeight:1.02,marginBottom:20,color:'rgba(255,255,255,0.96)'}}>
            Not tactics. Not deliverables.<br/><em style={{background:'linear-gradient(135deg,#5ba4f5,#2fcf8e)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Revenue systems.</em>
          </h1>
          <p className="reveal d2" style={{fontSize:'clamp(15px,1.8vw,18px)',fontWeight:300,color:'rgba(255,255,255,0.5)',lineHeight:1.72,maxWidth:560,margin:'0 auto 40px'}}>
            Every engagement is structured around a single question: does this make our client more money? If yes — we scale it. If no — we cut it.
          </p>
          <div className="reveal d3" style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/contact"><button className="btn-primary" style={{fontSize:15,padding:'15px 30px'}}>Book Strategy Call</button></Link>
            <a href="https://contentstudio.socialninjas.in/"><button className="btn-ghost" style={{fontSize:15}}>Try AI Studio Free →</button></a>
          </div>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div style={{maxWidth:1100,margin:'0 auto',padding:'88px 28px',position:'relative',zIndex:1}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:14}} className="two-cols">
          {services.map((s,i)=>(
            <div key={i} className={`glass-card reveal d${(i%3)+1}`} style={{padding:36,borderRadius:24,cursor:'default'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:24,gap:12}}>
                <div style={{display:'flex',alignItems:'center',gap:14}}>
                  <div style={{width:52,height:52,borderRadius:15,background:`${s.color}12`,border:`1px solid ${s.color}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>{s.icon}</div>
                  <h3 style={{fontSize:20,fontWeight:500,color:'rgba(255,255,255,0.92)',letterSpacing:'-0.3px',fontFamily:"'DM Sans',sans-serif",lineHeight:1.2}}>{s.title}</h3>
                </div>
                <div style={{fontSize:10.5,padding:'4px 11px',borderRadius:50,background:`${s.color}10`,border:`1px solid ${s.color}20`,color:s.color,fontWeight:600,whiteSpace:'nowrap',flexShrink:0,letterSpacing:'0.02em'}}>{s.outcome}</div>
              </div>
              <p style={{fontSize:13.5,fontWeight:300,color:'rgba(255,255,255,0.5)',lineHeight:1.68,marginBottom:22}}>{s.desc}</p>
              <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:24}}>
                {s.features.map((f,j)=>(
                  <div key={j} style={{display:'flex',alignItems:'center',gap:9,fontSize:13,color:'rgba(255,255,255,0.6)',fontWeight:400}}>
                    <CheckCircle2 size={14} color={s.color} strokeWidth={2}/>{f}
                  </div>
                ))}
              </div>
              <Link to={`/services/${s.id}`} style={{textDecoration:'none'}}>
                <div style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:13,fontWeight:500,color:s.color}}>
                  Learn More <ArrowRight size={14}/>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <div style={{borderTop:'1px solid rgba(255,255,255,0.07)',padding:'88px 28px',background:'rgba(4,8,18,0.5)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:60}}>
            <div className="eyebrow reveal" style={{justifyContent:'center'}}>The Process</div>
            <h2 className="reveal d1" style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:'clamp(28px,4vw,48px)',fontWeight:400,letterSpacing:'-1px',color:'rgba(255,255,255,0.95)',lineHeight:1.1}}>From audit to <em>revenue</em> in 30 days.</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}} className="four-cols">
            {[
              {n:'01',t:'Discovery Call',d:'30-minute deep dive into your brand, goals, and current bottlenecks.'},
              {n:'02',t:'Growth Audit',d:'We audit your accounts, creatives, and funnels to find the leaks.'},
              {n:'03',t:'Strategy Build',d:'Custom 90-day growth sprint with clear KPIs and accountability.'},
              {n:'04',t:'Execute & Scale',d:'We deploy, test, and scale — with weekly reporting and iteration.'},
            ].map((p,i)=>(
              <div key={i} className={`glass-card reveal d${i+1}`} style={{padding:26,borderRadius:20}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:500,color:'rgba(91,164,245,0.25)',lineHeight:1,marginBottom:16,letterSpacing:'-1px'}}>{p.n}</div>
                <div style={{fontSize:15,fontWeight:500,color:'rgba(255,255,255,0.88)',marginBottom:8,fontFamily:"'DM Sans',sans-serif"}}>{p.t}</div>
                <div style={{fontSize:13,fontWeight:300,color:'rgba(255,255,255,0.45)',lineHeight:1.62}}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{maxWidth:1100,margin:'0 auto',padding:'88px 28px',position:'relative',zIndex:1}}>
        <div className="reveal" style={{background:'rgba(8,14,26,0.7)',backdropFilter:'blur(60px)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:28,padding:'80px 48px',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(91,164,245,0.32),transparent)'}}/>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:280,background:'radial-gradient(ellipse,rgba(91,164,245,0.08),transparent 70%)',pointerEvents:'none'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <h2 style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:'clamp(28px,4.5vw,52px)',fontWeight:400,letterSpacing:'-1.5px',lineHeight:1.06,marginBottom:14,color:'rgba(255,255,255,0.96)'}}>
              Let's build your <em style={{color:'#5ba4f5'}}>growth engine.</em>
            </h2>
            <p style={{fontSize:16,fontWeight:300,color:'rgba(255,255,255,0.48)',marginBottom:32}}>Book a free 30-minute strategy session. No pressure, no pitch — just clarity.</p>
            <Link to="/contact"><button className="btn-primary" style={{fontSize:15,padding:'15px 36px'}}>Book Free Strategy Call</button></Link>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){.two-cols,.four-cols{grid-template-columns:1fr!important;}} @media(max-width:640px){.two-cols,.four-cols{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
};

export default Services;
