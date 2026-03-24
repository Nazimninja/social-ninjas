import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Zap, TrendingUp, Shield, Clock, BarChart3, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

function useReveal() {
  useEffect(()=>{
    const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('up');io.unobserve(x.target);}}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>io.observe(el));
    return()=>io.disconnect();
  },[]);
}

const GrowthSystems: React.FC = () => {
  useReveal();
  return (
    <div className="page-bg" style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div className="amb-1"/><div className="amb-2"/><div className="amb-3"/>
      <SEO title="Growth Systems | Social Ninja's" description="AI-powered growth systems that scale your business 24/7." keywords="AI growth systems, sales automation, lead generation automation"/>

      {/* HERO */}
      <div style={{position:'relative',paddingTop:140,paddingBottom:88,overflow:'hidden',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
        <div className="hero-grid"/>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 28px',position:'relative',zIndex:2}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center'}} className="hero-grid-cols">
            <div>
              <div className="eyebrow reveal">AI Growth Systems</div>
              <h1 className="reveal d1" style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:'clamp(40px,6vw,78px)',fontWeight:400,letterSpacing:'-2px',lineHeight:1.02,marginBottom:20,color:'rgba(255,255,255,0.96)'}}>
                Your competitor just booked a call<br/><em style={{background:'linear-gradient(135deg,#5ba4f5,#2fcf8e)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>while you were sleeping.</em>
              </h1>
              <p className="reveal d2" style={{fontSize:16,fontWeight:300,color:'rgba(255,255,255,0.5)',lineHeight:1.72,marginBottom:36,maxWidth:460}}>
                The average company takes 47 hours to respond to a new lead. Your AI agent responds in under 1 second — 24/7, 365 days a year — qualifying, nurturing, and booking calls while you focus on delivering.
              </p>
              <div className="reveal d3" style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <Link to="/contact"><button className="btn-primary" style={{fontSize:15,padding:'15px 30px'}}>Deploy AI Workforce <ArrowRight size={16}/></button></Link>
                <a href="/#/ai-products/content-studio"><button className="btn-ghost" style={{fontSize:15}}>Try Content Studio Free →</button></a>
              </div>
            </div>
            <div className="reveal-r d2">
              <div className="glass-card" style={{borderRadius:22,padding:28,animation:'float 9s ease-in-out infinite'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:22,paddingBottom:18,borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}><Bot size={20} color="#5ba4f5"/><span style={{fontWeight:500,color:'rgba(255,255,255,0.88)',fontSize:15}}>AI Sales Agent</span></div>
                  <div style={{display:'flex',alignItems:'center',gap:6}}><span style={{width:7,height:7,borderRadius:'50%',background:'#34d399',boxShadow:'0 0 8px #34d399'}}/><span style={{fontSize:11,color:'#34d399',fontWeight:600,letterSpacing:'0.04em'}}>LIVE</span></div>
                </div>
                {[['Leads Processed Today','142','rgba(255,255,255,0.72)'],['Meetings Booked','18','#5ba4f5'],['Avg Response Time','0.8s','#34d399'],['Conversion Rate','12.7%','#818cf8']].map(([l,v,c])=>(
                  <div key={l as string} style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'12px 14px',marginBottom:10}}>
                    <span style={{fontSize:13,fontWeight:300,color:'rgba(255,255,255,0.52)'}}>{l}</span>
                    <span style={{fontFamily:"'JetBrains Mono'",fontSize:14,fontWeight:500,color:c as string}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SYSTEMS */}
      <div style={{maxWidth:1100,margin:'0 auto',padding:'88px 28px',position:'relative',zIndex:1}}>
        <div className="eyebrow reveal" style={{justifyContent:'center'}}>Core Systems</div>
        <h2 className="reveal d1" style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:'clamp(28px,4vw,48px)',fontWeight:400,letterSpacing:'-1px',textAlign:'center',marginBottom:56,color:'rgba(255,255,255,0.95)',lineHeight:1.1}}>Four systems that <em>generate revenue</em> while you sleep.</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:14}} className="two-cols">
          {[
            {icon:'🤖',color:'#5ba4f5',title:'AI Lead Qualification',desc:'Intelligent chatbots pre-qualify every inbound lead using custom scoring logic — filtering out noise so your sales team only speaks to buyers.',feats:['24/7 automated qualification','Custom scoring criteria','CRM sync in real-time','Multi-channel deployment']},
            {icon:'📧',color:'#818cf8',title:'Automated Follow-Up Sequences',desc:'Hyper-personalised email and SMS sequences that nurture leads through the funnel with zero manual effort.',feats:['AI-personalised messaging','Behaviour-triggered sends','A/B optimisation built-in','Revenue attribution tracking']},
            {icon:'📅',color:'#34d399',title:'Auto-Booking Infrastructure',desc:'Remove the friction from your sales process. Qualified leads go directly from conversation to booked calendar — no back-and-forth.',feats:['Calendar API integration','Smart timezone detection','Reminder sequences','No-show prevention system']},
            {icon:'📊',color:'#f59e0b',title:'Revenue Intelligence Dashboard',desc:'Real-time visibility into your entire pipeline — from first touch to closed deal — with AI-generated weekly recommendations.',feats:['Full-funnel analytics','Attribution modelling','Weekly AI insights','Board-ready reports']},
          ].map((s,i)=>(
            <div key={i} className={`glass-card reveal d${(i%2)+1}`} style={{padding:34,borderRadius:22}}>
              <div style={{display:'flex',alignItems:'center',gap:13,marginBottom:18}}>
                <div style={{width:48,height:48,borderRadius:14,background:`${s.color}12`,border:`1px solid ${s.color}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{s.icon}</div>
                <h3 style={{fontSize:18,fontWeight:500,color:'rgba(255,255,255,0.92)',fontFamily:"'DM Sans',sans-serif",letterSpacing:'-0.3px',lineHeight:1.25}}>{s.title}</h3>
              </div>
              <p style={{fontSize:13.5,fontWeight:300,color:'rgba(255,255,255,0.48)',lineHeight:1.68,marginBottom:20}}>{s.desc}</p>
              {s.feats.map((f,j)=>(
                <div key={j} style={{display:'flex',alignItems:'center',gap:9,fontSize:12.5,color:'rgba(255,255,255,0.58)',marginBottom:7}}>
                  <CheckCircle2 size={13} color={s.color} strokeWidth={2}/>{f}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 28px 88px',position:'relative',zIndex:1}}>
        <div className="reveal" style={{background:'rgba(8,14,26,0.7)',backdropFilter:'blur(60px)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:28,padding:'80px 48px',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(91,164,245,0.32),transparent)'}}/>
          <h2 style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:'clamp(28px,4.5vw,52px)',fontWeight:400,letterSpacing:'-1.5px',lineHeight:1.06,marginBottom:14,color:'rgba(255,255,255,0.96)'}}>
            Ready to build your <em style={{color:'#5ba4f5'}}>AI workforce?</em>
          </h2>
          <p style={{fontSize:16,fontWeight:300,color:'rgba(255,255,255,0.48)',marginBottom:32}}>Book a free demo and see exactly how these systems would work for your business.</p>
          <Link to="/contact"><button className="btn-primary" style={{fontSize:15,padding:'15px 36px'}}>Book Free Demo</button></Link>
        </div>
      </div>

      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}} @media(max-width:900px){.hero-grid-cols,.two-cols{grid-template-columns:1fr!important;gap:28px!important;}} @media(max-width:640px){.hero-grid-cols,.two-cols{gap:22px!important;}}`}</style>
    </div>
  );
};

export default GrowthSystems;
