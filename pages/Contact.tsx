import React, { useEffect, useState } from 'react';
import { Mail, CheckCircle, Loader2, Phone, Globe, Building, User, AlertCircle, Instagram } from 'lucide-react';
import SEO from '../components/SEO';
import { submitToGoogleSheets } from '../services/googleSheets';

const CC = [
  {code:'+1',f:'????'},{code:'+44',f:'????'},{code:'+971',f:'????'},{code:'+91',f:'????'},
  {code:'+61',f:'????'},{code:'+49',f:'????'},{code:'+33',f:'????'},
];

function useReveal() {
  useEffect(()=>{
    const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('up');io.unobserve(x.target);}}),{threshold:.1});
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>io.observe(el));
    return()=>io.disconnect();
  },[]);
}

const Field=({label,name,type='text',placeholder,icon:Icon,form,errors,set}:{label:string,name:string,type?:string,placeholder?:string,icon?:any,form:any,errors:any,set:any})=>(
  <div style={{marginBottom:18}}>
    <label style={{display:'flex',alignItems:'center',gap:6,fontSize:11.5,fontWeight:500,color:'#adadad',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:7}}>
      {Icon&&<Icon size={12}/>}{label}
      {errors[name]&&<span style={{color:'var(--gold)',fontSize:10,marginLeft:'auto',fontWeight:500}}>{errors[name]}</span>}
    </label>
    <input type={type} value={(form as any)[name]} onChange={e=>set(name,e.target.value)} placeholder={placeholder}
      className="field" style={{borderColor:errors[name]?'rgba(232,184,109,0.5)':'',background:errors[name]?'rgba(232,184,109,0.06)':''}}/>
  </div>
);

const Contact: React.FC = () => {
  useReveal();
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({name:'',email:'',cc:'+1',phone:'',company:'',website:'',message:''});
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);

  const set=(k:string,v:string)=>{ setForm(p=>({...p,[k]:v})); setErrors(p=>({...p,[k]:''})); };

  const validate=(s:number)=>{
    const e:Record<string,string>={};
    if(s===1){ if(!form.name.trim())e.name='Required'; if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))e.email='Valid email required'; }
    if(s===2){ if(!form.website.trim())e.website='Required'; }
    if(s===3){ if(!form.phone.trim())e.phone='Required'; if(!form.message.trim())e.message='Required'; }
    setErrors(e); return Object.keys(e).length===0;
  };

  const next=()=>{ if(validate(step)) setStep(p=>Math.min(p+1,3)); };
  const back=()=>setStep(p=>Math.max(p-1,1));

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!validate(3))return;
    setLoading(true);
    try{
      await submitToGoogleSheets({...form, type: 'Leads', source:'contact-form'});
      setDone(true);
    }catch(err){ setErrors({message:'Something went wrong. Please try again.'}); }
    setLoading(false);
  };

  if(done) return (
    <div className="page-wrap" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      
      <div style={{textAlign:'center',padding:'48px 32px',maxWidth:520}}>
        <div style={{width:72,height:72,borderRadius:'50%',background:'rgba(52,211,153,0.12)',border:'1px solid rgba(52,211,153,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px',boxShadow:'0 0 32px rgba(52,211,153,0.2)'}}>
          <CheckCircle size={32} color="#34d399"/>
        </div>
        <h2 style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:36,fontWeight:400,letterSpacing:'-1px',color:'#141414',marginBottom:12}}>Message received.</h2>
        <p style={{fontSize:15,fontWeight:300,color:'#717171',lineHeight:1.7}}>We'll review your brief and get back within 24 hours with a tailored growth plan.</p>
      </div>
    </div>
  );

  return (
    <div className="page-wrap" style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      
      <SEO
        title="Contact Social Ninja's | Book Strategy Call"
        description="Initiate your growth audit. Book a strategy call with our team and see how we'd grow your business with AI-powered marketing."
        keywords="contact marketing agency, book strategy call, free marketing audit, digital marketing consultation, AI agency contact, growth audit India"
      />

      <div style={{maxWidth:1100,margin:'0 auto',padding:'120px 28px 88px',position:'relative',zIndex:1}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'start'}} className="hero-grid-cols">

          {/* LEFT */}
          <div>
            <div className="pill reveal">Get In Touch</div>
            <h1 className="reveal d1" style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:'clamp(36px,5vw,64px)',fontWeight:400,letterSpacing:'-1.5px',lineHeight:1.04,marginBottom:18,color:'#141414'}}>
              Let's build your<br/><em style={{background:'linear-gradient(135deg,#1F4B99,#2fcf8e)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>growth engine.</em>
            </h1>
            <p className="reveal d2" style={{fontSize:16,fontWeight:300,color:'#717171',lineHeight:1.72,marginBottom:48,maxWidth:420}}>Fill in the brief below. Within 24 hours, our team will send you a personalised growth audit with exactly where your biggest revenue opportunities are hiding.</p>

            <div className="reveal d3" style={{display:'flex',flexDirection:'column',gap:18}}>
              {[
                {icon:Mail,label:'Email',val:'info@socialninjas.in',href:'mailto:info@socialninjas.in'},
                {icon:Phone,label:'WhatsApp Support',val:'+91 81477 57479',href:'https://wa.me/918147757479'},
                {icon:Instagram,label:'Instagram',val:'@socialninja.s',href:'https://www.instagram.com/socialninja.s/'},
                {icon:Globe,label:'Website',val:'socialninjas.in',href:'https://socialninjas.in'},
              ].map(({icon:Ico,label,val,href})=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:14}}>
                  <div style={{width:44,height:44,borderRadius:13,background:'rgba(31,75,153,0.07)',border:'1px solid rgba(31,75,153,0.16)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <Ico size={18} color="#1F4B99" strokeWidth={1.5}/>
                  </div>
                  <div>
                    <div style={{fontSize:11,color:'#adadad',letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:2}}>{label}</div>
                    <div style={{fontSize:14,fontWeight:400,color:'#404040'}}>{val}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="reveal d4" style={{marginTop:48,display:'flex',gap:20}}>
              {[['150+','Brands'],['4.9?','Rating'],['24h','Response']].map(([n,l])=>(
                <div key={l} className="glass-card" style={{padding:'16px 20px',borderRadius:14,textAlign:'center',flex:1}}>
                  <div style={{fontFamily:"'DM Sans'",fontSize:22,fontWeight:600,color:'#141414',letterSpacing:'-0.5px',lineHeight:1}}>{n}</div>
                  <div style={{fontSize:10.5,color:'#adadad',marginTop:3,letterSpacing:'0.04em'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — multi-step form */}
          <div className="reveal-r d1">
            <div className="glass-card" style={{borderRadius:24,padding:0,overflow:'hidden'}}>
              {/* Step indicator */}
              <div style={{padding:'20px 28px',borderBottom:'1px solid #ededed',display:'flex',alignItems:'center',gap:8}}>
                {[1,2,3].map(s=>(
                  <React.Fragment key={s}>
                    <div style={{width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:500,transition:'all .3s',background:s<step?'rgba(52,211,153,0.15)':s===step?'rgba(31,75,153,0.15)':'#f5f5f5',border:`1px solid ${s<step?'rgba(52,211,153,0.3)':s===step?'rgba(31,75,153,0.3)':'#e0e0e0'}`,color:s<step?'#34d399':s===step?'#1F4B99':'#adadad',fontFamily:"'JetBrains Mono',monospace"}}>
                      {s<step?'?':s}
                    </div>
                    {s<3&&<div style={{flex:1,height:1,background:s<step?'rgba(52,211,153,0.3)':'#f0f0f0',transition:'background .4s'}}/>}
                  </React.Fragment>
                ))}
                <span style={{marginLeft:'auto',fontSize:11,color:'#adadad',fontFamily:"'JetBrains Mono'"}}>Step {step} of 3</span>
              </div>

              <form onSubmit={submit} style={{padding:28}}>
                {step===1&&(
                  <div>
                    <h3 style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:24,fontWeight:400,color:'#141414',marginBottom:6,letterSpacing:'-0.5px'}}>Who are you?</h3>
                    <p style={{fontSize:13,fontWeight:300,color:'#adadad',marginBottom:24}}>Tell us about yourself.</p>
                    <Field label="Full Name" name="name" placeholder="Jane Smith" icon={User} form={form} errors={errors} set={set}/>
                    <Field label="Work Email" name="email" type="email" placeholder="jane@company.com" icon={Mail} form={form} errors={errors} set={set}/>
                    <Field label="Company" name="company" placeholder="Acme Inc" icon={Building} form={form} errors={errors} set={set}/>
                  </div>
                )}
                {step===2&&(
                  <div>
                    <h3 style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:24,fontWeight:400,color:'#141414',marginBottom:6,letterSpacing:'-0.5px'}}>About your brand</h3>
                    <p style={{fontSize:13,fontWeight:300,color:'#adadad',marginBottom:24}}>Help us understand your current setup.</p>
                    <Field label="Website / Social Handle" name="website" placeholder="acme.com or @acme" icon={Globe} form={form} errors={errors} set={set}/>
                    <div style={{marginBottom:18}}>
                      <label style={{display:'block',fontSize:11.5,fontWeight:500,color:'#adadad',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:7}}>Monthly Ad Spend</label>
                      <select value={form.company} onChange={e=>set('company',e.target.value)} className="field" style={{appearance:'none',cursor:'pointer'}}>
                        <option value="">Select range...</option>
                        {['Under $1,000','$1,000–$5,000','$5,000–$20,000','$20,000–$50,000','$50,000+'].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                )}
                {step===3&&(
                  <div>
                    <h3 style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:24,fontWeight:400,color:'#141414',marginBottom:6,letterSpacing:'-0.5px'}}>Your biggest challenge</h3>
                    <p style={{fontSize:13,fontWeight:300,color:'#adadad',marginBottom:24}}>Be specific — this shapes our strategy.</p>
                    <div style={{marginBottom:18}}>
                      <label style={{display:'flex',alignItems:'center',gap:6,fontSize:11.5,fontWeight:500,color:'#adadad',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:7}}>
                        <Phone size={12}/>Phone
                        {errors.phone&&<span style={{color:'#e8b86d',fontSize:10,marginLeft:'auto'}}>{errors.phone}</span>}
                      </label>
                      <div style={{display:'flex',gap:8}}>
                        <select value={form.cc} onChange={e=>set('cc',e.target.value)} className="field" style={{width:90,flexShrink:0,appearance:'none',cursor:'pointer',padding:'13px 10px'}}>
                          {CC.map(c=><option key={c.code+c.f} value={c.code}>{c.f} {c.code}</option>)}
                        </select>
                        <input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="Your number" type="tel" className="field" style={{flex:1,borderColor:errors.phone?'rgba(232,184,109,0.5)':''}}/>
                      </div>
                    </div>
                    <div style={{marginBottom:18}}>
                      <label style={{display:'flex',alignItems:'center',gap:6,fontSize:11.5,fontWeight:500,color:'#adadad',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:7}}>
                        Your Bottleneck
                        {errors.message&&<span style={{color:'#e8b86d',fontSize:10,marginLeft:'auto'}}>{errors.message}</span>}
                      </label>
                      <textarea value={form.message} onChange={e=>set('message',e.target.value)} placeholder="What's holding your brand back? Be specific — our reply is more valuable when we understand your exact challenge." rows={4} className="field" style={{resize:'none',borderColor:errors.message?'rgba(232,184,109,0.5)':''}}/>
                    </div>
                  </div>
                )}

                <div style={{display:'flex',gap:10,marginTop:8}}>
                  {step>1&&<button type="button" onClick={back} className="btn-ghost" style={{fontSize:13.5,padding:'12px 20px'}}>? Back</button>}
                  {step<3
                    ?<button type="button" onClick={next} className="btn-primary" style={{flex:1,fontSize:14,padding:'13px'}}>Continue ?</button>
                    :<button type="submit" disabled={loading} className="btn-primary" style={{flex:1,fontSize:14,padding:'13px'}}>
                      {loading?<><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/>Sending...</>:'Send Message ?'}
                    </button>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @media(max-width:900px){.hero-grid-cols{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </div>
  );
};

export default Contact;
