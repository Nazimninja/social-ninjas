import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'

// ── Design tokens ─────────────────────────────────────────────
const C = {
  bg:       '#0A1628',
  surface:  '#111E35',
  surfaceHi:'#172743',
  border:   '#1E3355',
  borderHi: '#2A4A7A',
  steel:    '#37649B',
  blue:     '#5B8FD4',
  blueLight:'#8CB4DC',
  white:    '#EDF2FA',
  muted:    '#5A7599',
  dim:      '#3A5070',
  green:    '#27C98A',
  red:      '#E05454',
  amber:    '#F5A623',
  pink:     '#FF3D9A',
  purple:   '#9B5CF6',
  teal:     '#00C9B1',
}

const PROFILES = [
  { id:'socialninja',  label:'Social Ninjas', color:C.steel  },
  { id:'nazim_ninja',  label:'Nazim Ninja',   color:C.blue   },
  { id:'9thgear_',     label:'9th Gear',       color:C.amber  },
  { id:'vicevault.gg', label:'Vice Vault',     color:C.pink   },
]

const ROLES = {
  founder: { label:'Founder',         color:C.purple, tabs:['tasks','publish','scripts','queue','crm','clients','monitor','calendar','team'] },
  content: { label:'Content Manager', color:C.blue,   tabs:['tasks','publish','scripts','queue','calendar'] },
  sales:   { label:'Sales',           color:C.green,  tabs:['tasks','crm','calendar'] },
  client:  { label:'Client Manager',  color:C.amber,  tabs:['tasks','clients','calendar'] },
}

const ALL_TABS = [
  { id:'tasks',    label:'Tasks',    icon:'✅' },
  { id:'publish',  label:'Publisher',icon:'📡' },
  { id:'scripts',  label:'Scripts',  icon:'📝' },
  { id:'queue',    label:'Queue',    icon:'🎬' },
  { id:'crm',      label:'Leads',    icon:'💼' },
  { id:'clients',  label:'Clients',  icon:'🏢' },
  { id:'monitor',  label:'Monitor',  icon:'👁'  },
  { id:'calendar', label:'Calendar', icon:'📅' },
  { id:'team',     label:'Team',     icon:'👥' },
]

const TASK_TEMPLATE = [
  {id:'sn_ig',    block:'morning',  label:'Post Reel — Social Ninjas',   brand:'socialninja',  tab:'publish'},
  {id:'nn_ig',    block:'morning',  label:'Post Reel — Nazim Ninja',     brand:'nazim_ninja',  tab:'publish'},
  {id:'9g_ig',    block:'morning',  label:'Post Reel — 9th Gear',        brand:'9thgear_',     tab:'publish'},
  {id:'vv_ig',    block:'morning',  label:'Post Reel — Vice Vault',      brand:'vicevault.gg', tab:'publish'},
  {id:'li_post',  block:'morning',  label:'Post on LinkedIn',            brand:'nazim_ninja',  tab:'publish'},
  {id:'dms',      block:'morning',  label:'Reply all DMs — all accounts',brand:null,           tab:null},
  {id:'li_cmts',  block:'engage',   label:'5 LinkedIn comments',         brand:null,           tab:null},
  {id:'ig_cmts',  block:'engage',   label:'5 Instagram comments',        brand:null,           tab:null},
  {id:'comp',     block:'engage',   label:'3 competitor comments',       brand:null,           tab:null},
  {id:'cold',     block:'outreach', label:'3 cold DMs — Social Ninjas',  brand:'socialninja',  tab:'crm'},
  {id:'fu',       block:'outreach', label:'Follow up open leads',        brand:null,           tab:'crm'},
  {id:'film',     block:'content',  label:'Film 1 video',                brand:null,           tab:null},
  {id:'drive',    block:'content',  label:'Drop video in Drive folder',  brand:null,           tab:'queue'},
]

const BLOCK_META = {
  morning: {label:'Morning',    time:'30 min', color:C.blue},
  engage:  {label:'Engagement', time:'20 min', color:C.green},
  outreach:{label:'Outreach',   time:'15 min', color:C.amber},
  content: {label:'Content',    time:'varies', color:C.purple},
}

const XPROMO = [
  {label:'Social Ninjas → Nazim Ninja', sub:"'Our founder @nazim_ninja built this system'",          color:C.steel},
  {label:'Nazim Ninja → Social Ninjas', sub:"'My agency @socialninja.s handles this for brands'",    color:C.blue},
  {label:'9th Gear → Vice Vault',       sub:"'Real life version of this GTA 6 car 👀 @vicevault.gg'",color:C.amber},
  {label:'Vice Vault → 9th Gear',       sub:"'GTA fans — this exists IRL. @9thgear_ Bangalore'",     color:C.pink},
]

// ── Helpers ───────────────────────────────────────────────────
const pc = id => PROFILES.find(p=>p.id===id)?.color || C.steel
const pl = id => PROFILES.find(p=>p.id===id)?.label || id
const todayKey = () => new Date().toDateString()
const dayName = () => new Date().toLocaleDateString('en',{weekday:'long'})
const doy = () => Math.floor((new Date()-new Date(new Date().getFullYear(),0,0))/86400000)
const fmtDate = d => d ? new Date(d).toLocaleDateString('en',{month:'short',day:'numeric'}) : '—'
const fmtTime = d => d ? new Date(d).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : ''

// ── UI Components ─────────────────────────────────────────────
const Card = ({children, style={}}) => (
  <div style={{background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:18, ...style}}>
    {children}
  </div>
)

const Btn = ({children, onClick, color=C.steel, small, full, ghost, disabled, style={}}) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: ghost ? 'transparent' : disabled ? C.surfaceHi : color,
    color: ghost ? color : disabled ? C.muted : '#fff',
    border: ghost ? `1px solid ${color}55` : 'none',
    borderRadius: 8,
    padding: small ? '5px 12px' : '9px 18px',
    fontSize: small ? 12 : 13,
    fontWeight: 700,
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: full ? '100%' : 'auto',
    opacity: disabled ? 0.5 : 1,
    transition: 'opacity .15s, background .15s',
    letterSpacing: 0.2,
    ...style
  }}>{children}</button>
)

const Badge = ({children, color}) => (
  <span style={{
    background:`${color}20`, color, border:`1px solid ${color}40`,
    borderRadius:6, padding:'2px 8px', fontSize:11, fontWeight:700, letterSpacing:0.4, whiteSpace:'nowrap'
  }}>{children}</span>
)

const StatusBadge = ({s}) => {
  const map = {
    'New':C.blue, 'Draft Ready':C.amber, 'Sent':C.green, 'Replied':C.muted,
    'ready':C.green, 'filmed':C.amber, 'posted':C.muted,
    'Ready':C.green, 'Posted':C.muted, 'Scheduled':C.purple,
    'NEW LEAD':C.blue, 'DEMO SCHEDULED':C.amber, 'WON':C.green, 'LOST':C.red,
    'active':C.green, 'suspended':C.amber,
  }
  return <Badge color={map[s]||C.muted}>{s}</Badge>
}

const Inp = ({value, onChange, placeholder, multiline, rows=3, type='text', style={}}) => {
  const base = {
    background:C.surfaceHi, border:`1px solid ${C.border}`, borderRadius:8,
    color:C.white, padding:'9px 13px', fontSize:13, width:'100%',
    boxSizing:'border-box', outline:'none', resize:'vertical', fontFamily:'inherit',
    colorScheme:'dark', ...style
  }
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={base}/>
    : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base}/>
}

const Sel = ({value, onChange, children, style={}}) => (
  <select value={value} onChange={onChange} style={{
    background:C.surfaceHi, border:`1px solid ${C.border}`, borderRadius:8,
    color:C.white, padding:'9px 13px', fontSize:13, outline:'none', cursor:'pointer',
    width:'100%', ...style
  }}>{children}</select>
)

const Label = ({children}) => (
  <div style={{fontSize:11, color:C.muted, fontWeight:700, letterSpacing:0.8, marginBottom:6}}>{children}</div>
)

const Divider = () => <div style={{borderTop:`1px solid ${C.border}`, margin:'14px 0'}}/>

const Empty = ({icon='📭', text}) => (
  <div style={{textAlign:'center', padding:'48px 24px', color:C.muted}}>
    <div style={{fontSize:32, marginBottom:10}}>{icon}</div>
    <div style={{fontSize:14}}>{text}</div>
  </div>
)

const Spinner = () => (
  <div style={{textAlign:'center', padding:40, color:C.muted, fontSize:13}}>Loading...</div>
)

// ── TASKS ─────────────────────────────────────────────────────
function Tasks({setTab}) {
  const key = `done_${todayKey()}`
  const [done, setDone] = useState(() => { try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []} })

  const toggle = id => {
    const next = done.includes(id) ? done.filter(x=>x!==id) : [...done,id]
    setDone(next)
    try{localStorage.setItem(key,JSON.stringify(next))}catch{}
  }

  const total = TASK_TEMPLATE.length
  const comp = done.filter(id=>TASK_TEMPLATE.find(t=>t.id===id)).length
  const pct = Math.round((comp/total)*100)
  const xp = XPROMO[doy()%4]

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 280px', gap:20}}>
      <div>
        <Card style={{marginBottom:16}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
            <div>
              <div style={{fontSize:20, fontWeight:800, color:C.white}}>{comp}/{total} tasks</div>
              <div style={{fontSize:12, color:C.muted}}>{dayName()} · {new Date().toLocaleDateString('en',{month:'long',day:'numeric',year:'numeric'})}</div>
            </div>
            <div style={{fontSize:28, fontWeight:900, color:pct===100?C.green:pct>60?C.blue:C.amber}}>{pct}%</div>
          </div>
          <div style={{background:C.surfaceHi, borderRadius:99, height:6, overflow:'hidden'}}>
            <div style={{background:`linear-gradient(90deg,${C.steel},${C.blue})`, width:`${pct}%`, height:'100%', borderRadius:99, transition:'width .4s'}}/>
          </div>
          {pct===100 && <div style={{marginTop:10, fontSize:13, color:C.green, fontWeight:700}}>🎉 All done. Go build.</div>}
        </Card>

        {['morning','engage','outreach','content'].map(block => {
          const meta = BLOCK_META[block]
          const tasks = TASK_TEMPLATE.filter(t=>t.block===block)
          const bd = tasks.filter(t=>done.includes(t.id)).length
          return (
            <div key={block} style={{marginBottom:16}}>
              <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
                <div style={{width:3, height:18, background:meta.color, borderRadius:99}}/>
                <span style={{fontSize:12, fontWeight:700, color:meta.color, letterSpacing:0.6}}>{meta.label.toUpperCase()}</span>
                <span style={{fontSize:11, color:C.dim}}>· {meta.time}</span>
                <span style={{marginLeft:'auto', fontSize:12, color:bd===tasks.length?C.green:C.muted, fontWeight:700}}>{bd}/{tasks.length}</span>
              </div>
              <div style={{display:'grid', gap:6}}>
                {tasks.map(t => {
                  const isDone = done.includes(t.id)
                  return (
                    <div key={t.id} onClick={()=>toggle(t.id)} style={{
                      background:isDone?C.surfaceHi:C.surface,
                      border:`1px solid ${isDone?C.green+'33':C.border}`,
                      borderRadius:10, padding:'11px 14px', cursor:'pointer',
                      display:'flex', alignItems:'center', gap:12,
                      opacity:isDone?0.6:1, transition:'all .15s'
                    }}>
                      <div style={{
                        width:20, height:20, borderRadius:5, flexShrink:0,
                        background:isDone?C.green:C.surfaceHi,
                        border:`2px solid ${isDone?C.green:C.border}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        color:'#fff', fontSize:12, transition:'all .15s'
                      }}>{isDone?'✓':''}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13, fontWeight:600, color:isDone?C.muted:C.white, textDecoration:isDone?'line-through':'none', display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
                          {t.label}
                          {t.brand && <Badge color={pc(t.brand)}>{pl(t.brand)}</Badge>}
                        </div>
                      </div>
                      {t.tab && !isDone && (
                        <Btn small ghost color={C.steel} onClick={e=>{e.stopPropagation();setTab(t.tab)}}>Go →</Btn>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        <Card style={{border:`1px solid ${xp.color}33`}}>
          <Label>TODAY'S CROSS-PROMO</Label>
          <div style={{fontSize:13, fontWeight:700, color:C.white, marginBottom:4}}>{xp.label}</div>
          <div style={{fontSize:12, color:C.muted, lineHeight:1.6, marginBottom:10}}>{xp.sub}</div>
          <div style={{background:C.surfaceHi, borderRadius:8, padding:'8px 10px', fontSize:11, color:C.blue}}>Every 4th post → cross-promote another brand</div>
        </Card>

        <Card>
          <Label>ALGORITHM NOTES</Label>
          {[
            {e:'📸',t:'Post IG Reels in first 2h of waking'},
            {e:'💬',t:'Comment within 60 min of posting'},
            {e:'🔗',t:'LinkedIn: comment before you post'},
            {e:'▶️',t:'YT Shorts: 3–5/week minimum per channel'},
            {e:'💼',t:'LinkedIn daily = fastest B2B lead growth'},
          ].map((tip,i)=>(
            <div key={i} style={{display:'flex', gap:8, marginBottom:8, fontSize:12, color:C.muted, lineHeight:1.5}}>
              <span>{tip.e}</span><span>{tip.t}</span>
            </div>
          ))}
        </Card>

        <Card>
          <Label>XPROMO ROTATION</Label>
          {XPROMO.map((x,i)=>(
            <div key={i} style={{display:'flex', gap:8, alignItems:'flex-start', marginBottom:8}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:x.color,marginTop:4,flexShrink:0}}/>
              <div style={{fontSize:12, color:i===doy()%4?C.white:C.muted, fontWeight:i===doy()%4?700:400}}>{x.label}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}

// ── PUBLISHER ─────────────────────────────────────────────────
function Publisher() {
  const [profile,setProfile]=useState('socialninja')
  const [platform,setPlatform]=useState('instagram')
  const [topic,setTopic]=useState('')
  const [schedMode,setSchedMode]=useState(false)
  const [schedDate,setSchedDate]=useState('')
  const [schedTime,setSchedTime]=useState('09:00')
  const [status,setStatus]=useState(null)
  const [log,setLog]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    supabase.from('posts').select('*').order('created_at',{ascending:false}).limit(10)
      .then(({data})=>{ if(data) setLog(data); setLoading(false) })
  },[])

  const fire = async () => {
    if(!topic.trim()){setStatus('error');return}
    setStatus('posting')
    const entry = {
      profile, platform, file_name:'pending...', caption:'',
      yt_title:'', status:schedMode?'scheduled':'published',
      scheduled_for: schedMode && schedDate ? new Date(`${schedDate}T${schedTime}`).toISOString() : null
    }
    const {data} = await supabase.from('posts').insert([entry]).select()
    setStatus('done')
    if(data) setLog(prev=>[data[0],...prev])
    setTopic(''); setSchedDate(''); setSchedTime('09:00'); setScheduleMode&&setSchedMode(false)
    setTimeout(()=>setStatus(null),3000)
  }

  const p = PROFILES.find(x=>x.id===profile)

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        <Card>
          <Label>PROFILE</Label>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {PROFILES.map(pr=>(
              <button key={pr.id} onClick={()=>setProfile(pr.id)} style={{
                background:profile===pr.id?pr.color:C.surfaceHi,
                border:`1px solid ${pr.color}44`, borderRadius:8,
                color:profile===pr.id?'#fff':C.muted,
                padding:'7px 14px', fontSize:12, fontWeight:700, cursor:'pointer', transition:'all .15s'
              }}>{pr.label}</button>
            ))}
          </div>
        </Card>

        <Card>
          <Label>PLATFORM</Label>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
            {[
              {id:'instagram',label:'Instagram',icon:'📸',ready:true},
              {id:'youtube',  label:'YouTube',  icon:'▶️', ready:true},
              {id:'both',     label:'IG + YT',  icon:'📡', ready:true},
              {id:'linkedin', label:'LinkedIn', icon:'💼', ready:false},
            ].map(pl=>(
              <button key={pl.id} onClick={()=>pl.ready&&setPlatform(pl.id)} style={{
                background:platform===pl.id?C.steel:C.surfaceHi,
                border:`1px solid ${platform===pl.id?C.steel:C.border}`,
                borderRadius:10, padding:'10px 12px',
                color:platform===pl.id?'#fff':pl.ready?C.muted:C.dim,
                fontSize:12, fontWeight:700, cursor:pl.ready?'pointer':'not-allowed',
                transition:'all .15s', textAlign:'left', position:'relative'
              }}>
                <div style={{fontSize:16,marginBottom:2}}>{pl.icon}</div>
                <div>{pl.label}</div>
                {!pl.ready&&<div style={{position:'absolute',top:5,right:6,fontSize:9,color:C.amber,fontWeight:700,background:C.amber+'22',borderRadius:4,padding:'1px 5px'}}>SOON</div>}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <Label>TOPIC</Label>
          <Inp value={topic} onChange={e=>setTopic(e.target.value)} multiline rows={3}
            placeholder="e.g. how luxury brands in UAE are cutting agency costs using AI"
            style={{marginBottom:10}}
          />
          <div style={{background:C.surfaceHi,borderRadius:8,padding:'8px 12px',fontSize:12,color:C.muted}}>
            <span style={{color:C.blue}}>Command: </span>
            <span style={{color:C.white}}>post on {pl(profile).toLowerCase()} {platform==='both'?'instagram and youtube':platform}{topic?` about ${topic}`:''}</span>
          </div>
        </Card>

        <Card style={{border:`1px solid ${schedMode?C.purple+'55':C.border}`}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:schedMode?14:0}}>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:C.white}}>📅 Schedule for later</div>
              <div style={{fontSize:11,color:C.muted}}>Post at a specific date and time</div>
            </div>
            <button onClick={()=>setSchedMode(!schedMode)} style={{
              width:42,height:22,borderRadius:99,background:schedMode?C.purple:C.surfaceHi,
              border:`1px solid ${schedMode?C.purple:C.border}`,cursor:'pointer',position:'relative',transition:'all .2s'
            }}>
              <div style={{width:16,height:16,borderRadius:'50%',background:'#fff',position:'absolute',top:3,left:schedMode?23:3,transition:'left .2s'}}/>
            </button>
          </div>
          {schedMode&&(
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div><Label>DATE</Label><Inp type="date" value={schedDate} onChange={e=>setSchedDate(e.target.value)}/></div>
              <div><Label>TIME</Label><Inp type="time" value={schedTime} onChange={e=>setSchedTime(e.target.value)}/></div>
              {schedDate&&<div style={{gridColumn:'1/-1',fontSize:12,color:C.purple}}>
                Scheduled: {new Date(`${schedDate}T${schedTime}`).toLocaleString('en',{weekday:'long',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'})}
              </div>}
            </div>
          )}
        </Card>

        <Btn onClick={fire} full
          color={status==='posting'?C.muted:status==='done'?C.green:status==='error'?C.red:schedMode?C.purple:p?.color||C.steel}
        >
          {status==='posting'?'⏳ Publishing...'
            :status==='done'?schedMode?'📅 Scheduled!':'✅ Published!'
            :status==='error'?'⚠️ Add a topic'
            :schedMode?`📅 Schedule — ${schedDate||'pick a date'} ${schedTime}`
            :'📡 Publish Now'}
        </Btn>
      </div>

      <Card>
        <Label>PUBLISH LOG</Label>
        {loading ? <Spinner/> : log.length===0 ? <Empty text="No posts yet."/> : log.map((l,i)=>(
          <div key={l.id||i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:i<log.length-1?`1px solid ${C.border}`:'none'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:l.status==='published'?C.green:l.status==='scheduled'?C.purple:C.muted,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,color:C.white,fontWeight:600,display:'flex',gap:6,alignItems:'center'}}>
                {pl(l.profile)} → {l.platform}
                {l.status==='scheduled'&&<Badge color={C.purple}>Scheduled</Badge>}
              </div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{l.file_name} · {fmtDate(l.created_at)} {fmtTime(l.created_at)}</div>
            </div>
          </div>
        ))}
        <div style={{marginTop:16,background:C.teal+'11',border:`1px solid ${C.teal}33`,borderRadius:8,padding:'10px 14px'}}>
          <div style={{fontSize:11,fontWeight:700,color:C.teal,marginBottom:3}}>💼 LinkedIn — Coming Next</div>
          <div style={{fontSize:11,color:C.muted}}>Being added to the n8n publisher workflow.</div>
        </div>
      </Card>
    </div>
  )
}

// ── SCRIPTS ───────────────────────────────────────────────────
function Scripts() {
  const [scripts,setScripts]=useState([])
  const [loading,setLoading]=useState(true)
  const [open,setOpen]=useState(null)
  const [copied,setCopied]=useState(null)

  useEffect(()=>{
    supabase.from('scripts').select('*').order('created_at',{ascending:false})
      .then(({data})=>{ if(data) setScripts(data); setLoading(false) })
  },[])

  const mark = async (id,status) => {
    await supabase.from('scripts').update({status}).eq('id',id)
    setScripts(s=>s.map(x=>x.id===id?{...x,status}:x))
  }
  const copy = (text,id) => { navigator.clipboard.writeText(text).catch(()=>{}); setCopied(id); setTimeout(()=>setCopied(null),2000) }

  if(loading) return <Spinner/>
  if(scripts.length===0) return <Empty icon="📝" text="No scripts yet. Flow 3 runs every Sunday at 8AM and drops scripts here automatically."/>

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:14}}>
      {scripts.map(s=>(
        <Card key={s.id}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
            <Badge color={pc(s.profile)}>{pl(s.profile)}</Badge>
            <StatusBadge s={s.status}/>
          </div>
          <div style={{fontSize:14,fontWeight:700,color:C.white,marginBottom:3}}>{s.topic}</div>
          <div style={{fontSize:12,color:C.blue,marginBottom:10}}>🎬 {s.yt_title}</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.5}}><span style={{color:C.blueLight}}>🪝 </span>{s.hook}</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <Btn small ghost color={C.steel} onClick={()=>setOpen(open===s.id?null:s.id)}>{open===s.id?'Hide':'View Script'}</Btn>
            <Btn small ghost color={C.muted} onClick={()=>copy(s.caption,`c${s.id}`)}>{copied===`c${s.id}`?'✅ Copied!':'Copy Caption'}</Btn>
            {s.status==='ready'&&<Btn small color={C.amber} onClick={()=>mark(s.id,'filmed')}>Mark Filmed</Btn>}
            {s.status==='filmed'&&<Btn small color={C.green} onClick={()=>mark(s.id,'posted')}>Mark Posted</Btn>}
          </div>
          {open===s.id&&(
            <div style={{marginTop:14,borderTop:`1px solid ${C.border}`,paddingTop:14}}>
              {[['🪝 Hook',s.hook],['Section 1',s.section1],['Section 2',s.section2],['Section 3',s.section3],['CTA',s.cta]].map(([l,t])=>t&&(
                <div key={l} style={{marginBottom:10}}>
                  <div style={{fontSize:10,color:C.muted,fontWeight:700,marginBottom:3}}>{l}</div>
                  <div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{t}</div>
                </div>
              ))}
              {s.caption&&<>
                <Divider/>
                <div style={{fontSize:10,color:C.muted,fontWeight:700,marginBottom:6}}>INSTAGRAM CAPTION</div>
                <div style={{background:C.surfaceHi,borderRadius:8,padding:10,fontSize:12,color:C.blueLight,lineHeight:1.7,whiteSpace:'pre-wrap'}}>{s.caption}</div>
                <Btn small ghost color={C.steel} style={{marginTop:8}} onClick={()=>copy(s.caption,`c2${s.id}`)}>{copied===`c2${s.id}`?'✅ Copied!':'Copy Caption'}</Btn>
              </>}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

// ── QUEUE ─────────────────────────────────────────────────────
function Queue() {
  const [items,setItems]=useState([])
  const [loading,setLoading]=useState(true)
  const [posting,setPosting]=useState(null)
  const [showSched,setShowSched]=useState(null)
  const [schedDate,setSchedDate]=useState('')
  const [schedTime,setSchedTime]=useState('09:00')

  useEffect(()=>{
    supabase.from('scheduled_posts').select('*').order('created_at',{ascending:false})
      .then(({data})=>{ if(data) setItems(data); setLoading(false) })
  },[])

  const postNow = async id => {
    setPosting(id)
    await supabase.from('scheduled_posts').update({status:'Posted'}).eq('id',id)
    setItems(q=>q.map(x=>x.id===id?{...x,status:'Posted'}:x))
    setPosting(null)
  }

  const saveSchedule = async id => {
    if(!schedDate) return
    const scheduled_for = new Date(`${schedDate}T${schedTime}`).toISOString()
    await supabase.from('scheduled_posts').update({scheduled_for,status:'Scheduled'}).eq('id',id)
    setItems(q=>q.map(x=>x.id===id?{...x,scheduled_for,status:'Scheduled'}:x))
    setShowSched(null)
  }

  if(loading) return <Spinner/>
  if(items.length===0) return <Empty icon="🎬" text="No videos in queue. Drop files in your Drive folders and they'll appear here."/>

  return (
    <div style={{display:'grid',gap:10}}>
      {items.map(item=>(
        <Card key={item.id} style={{display:'flex',alignItems:'center',gap:14}}>
          <div style={{width:42,height:42,borderRadius:10,background:pc(item.profile)+'22',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>
            {item.platform==='youtube'?'▶️':'📸'}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:C.white}}>{item.file_name||item.topic}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:3,display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
              <Badge color={pc(item.profile)}>{pl(item.profile)}</Badge>
              <span style={{textTransform:'capitalize'}}>{item.platform}</span>
              {item.scheduled_for&&<span>📅 {fmtDate(item.scheduled_for)} {fmtTime(item.scheduled_for)}</span>}
            </div>
          </div>
          <StatusBadge s={item.status}/>
          <div style={{display:'flex',gap:8}}>
            {item.status!=='Posted'&&<>
              <Btn small color={C.steel} onClick={()=>postNow(item.id)}>{posting===item.id?'Posting...':'Post Now'}</Btn>
              <Btn small ghost color={C.purple} onClick={()=>setShowSched(showSched===item.id?null:item.id)}>Schedule</Btn>
            </>}
          </div>
          {showSched===item.id&&(
            <div style={{width:'100%',marginTop:12,display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:8,alignItems:'end'}}>
              <div><Label>DATE</Label><Inp type="date" value={schedDate} onChange={e=>setSchedDate(e.target.value)}/></div>
              <div><Label>TIME</Label><Inp type="time" value={schedTime} onChange={e=>setSchedTime(e.target.value)}/></div>
              <Btn color={C.green} onClick={()=>saveSchedule(item.id)}>Save</Btn>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

// ── CRM / LEADS ───────────────────────────────────────────────
function CRM() {
  const [leads,setLeads]=useState([])
  const [loading,setLoading]=useState(true)
  const [modal,setModal]=useState(null)
  const [showForm,setShowForm]=useState(false)
  const [saving,setSaving]=useState(false)
  const [form,setForm]=useState({name:'',email:'',phone:'',company:'',source:'',message:'',status:'NEW LEAD',notes:''})

  const load = useCallback(()=>{
    supabase.from('leads').select('*').order('created_at',{ascending:false})
      .then(({data})=>{ if(data) setLeads(data); setLoading(false) })
  },[])

  useEffect(()=>{ load() },[load])

  const save = async () => {
    if(!form.name||!form.email) return
    setSaving(true)
    const {data} = await supabase.from('leads').insert([{...form,created_at:new Date().toISOString()}]).select()
    if(data) setLeads(prev=>[data[0],...prev])
    setForm({name:'',email:'',phone:'',company:'',source:'',message:'',status:'NEW LEAD',notes:''})
    setShowForm(false); setSaving(false)
  }

  const updateStatus = async (id,status) => {
    await supabase.from('leads').update({status}).eq('id',id)
    setLeads(l=>l.map(x=>x.id===id?{...x,status}:x))
  }

  const statuses = ['NEW LEAD','DEMO SCHEDULED','WON','LOST']
  const statusColor = {'NEW LEAD':C.blue,'DEMO SCHEDULED':C.amber,'WON':C.green,'LOST':C.red}

  if(loading) return <Spinner/>

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div style={{display:'flex',gap:20}}>
          {statuses.map(s=>(
            <div key={s} style={{textAlign:'center'}}>
              <div style={{fontSize:20,fontWeight:800,color:statusColor[s]}}>{leads.filter(l=>l.status===s).length}</div>
              <div style={{fontSize:10,color:C.muted}}>{s}</div>
            </div>
          ))}
        </div>
        <Btn color={C.steel} onClick={()=>setShowForm(!showForm)}>+ Add Lead</Btn>
      </div>

      {showForm&&(
        <Card style={{marginBottom:14}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
            <div><Label>NAME</Label><Inp value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Full name"/></div>
            <div><Label>EMAIL</Label><Inp value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="Email"/></div>
            <div><Label>PHONE</Label><Inp value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="Phone"/></div>
            <div><Label>COMPANY</Label><Inp value={form.company} onChange={e=>setForm(p=>({...p,company:e.target.value}))} placeholder="Company"/></div>
            <div><Label>SOURCE</Label><Inp value={form.source} onChange={e=>setForm(p=>({...p,source:e.target.value}))} placeholder="Instagram DM, LinkedIn, Referral..."/></div>
            <div><Label>STATUS</Label>
              <Sel value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))}>
                {statuses.map(s=><option key={s}>{s}</option>)}
              </Sel>
            </div>
          </div>
          <div style={{marginBottom:10}}><Label>MESSAGE / NOTES</Label><Inp value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} multiline placeholder="What are they looking for?"/></div>
          <Btn color={C.green} onClick={save} disabled={saving}>{saving?'Saving...':'Save Lead'}</Btn>
        </Card>
      )}

      <div style={{display:'grid',gap:10}}>
        {leads.map(lead=>(
          <Card key={lead.id} style={{cursor:'pointer'}} onClick={()=>setModal(modal===lead.id?null:lead.id)}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:38,height:38,borderRadius:'50%',background:C.steel,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:'#fff',fontSize:15,flexShrink:0}}>
                {(lead.name||'?').charAt(0).toUpperCase()}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.white}}>{lead.name}</div>
                <div style={{fontSize:11,color:C.muted,marginTop:2}}>{lead.company} · {lead.source} · {fmtDate(lead.created_at)}</div>
              </div>
              <StatusBadge s={lead.status}/>
              {lead.next_follow_up&&(
                <div style={{fontSize:11,color:C.amber,textAlign:'right'}}>
                  <div>Follow up</div>
                  <div style={{fontWeight:700}}>{fmtDate(lead.next_follow_up)}</div>
                </div>
              )}
            </div>
            {modal===lead.id&&(
              <div style={{marginTop:12,borderTop:`1px solid ${C.border}`,paddingTop:12}} onClick={e=>e.stopPropagation()}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
                  <div style={{fontSize:12,color:C.muted}}>📧 {lead.email}</div>
                  <div style={{fontSize:12,color:C.muted}}>📱 {lead.phone}</div>
                </div>
                {lead.message&&<div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.5}}>💬 {lead.message}</div>}
                {lead.notes&&<div style={{fontSize:12,color:C.muted,marginBottom:12,background:C.surfaceHi,borderRadius:8,padding:10}}>{lead.notes}</div>}
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  <Label>UPDATE STATUS:</Label>
                  {statuses.map(s=>(
                    <Btn key={s} small color={statusColor[s]} ghost={lead.status!==s} onClick={()=>updateStatus(lead.id,s)}>{s}</Btn>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
        {leads.length===0&&<Empty icon="💼" text="No leads yet. Add your first lead above."/>}
      </div>
    </div>
  )
}

// ── CLIENTS ───────────────────────────────────────────────────
function Clients() {
  const [clients,setClients]=useState([])
  const [loading,setLoading]=useState(true)
  const [open,setOpen]=useState(null)
  const [showForm,setShowForm]=useState(false)
  const [form,setForm]=useState({brand_name:'',niche:'',email:'',phone:'',plan_name:'',payment_status:'pending',tone_of_voice:'',target_audience:'',active:true})

  useEffect(()=>{
    supabase.from('content_studio_clients').select('*').order('join_date',{ascending:false})
      .then(({data})=>{ if(data) setClients(data); setLoading(false) })
  },[])

  const save = async () => {
    if(!form.brand_name) return
    const {data} = await supabase.from('content_studio_clients').insert([{...form,join_date:new Date().toISOString()}]).select()
    if(data) setClients(prev=>[data[0],...prev])
    setForm({brand_name:'',niche:'',email:'',phone:'',plan_name:'',payment_status:'pending',tone_of_voice:'',target_audience:'',active:true})
    setShowForm(false)
  }

  const toggle = async (id,active) => {
    await supabase.from('content_studio_clients').update({active:!active}).eq('id',id)
    setClients(c=>c.map(x=>x.id===id?{...x,active:!active}:x))
  }

  if(loading) return <Spinner/>

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div style={{display:'flex',gap:20}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:20,fontWeight:800,color:C.green}}>{clients.filter(c=>c.active).length}</div>
            <div style={{fontSize:10,color:C.muted}}>ACTIVE</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:20,fontWeight:800,color:C.amber}}>{clients.filter(c=>!c.active).length}</div>
            <div style={{fontSize:10,color:C.muted}}>INACTIVE</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:20,fontWeight:800,color:C.white}}>{clients.length}</div>
            <div style={{fontSize:10,color:C.muted}}>TOTAL</div>
          </div>
        </div>
        <Btn color={C.steel} onClick={()=>setShowForm(!showForm)}>+ Add Client</Btn>
      </div>

      {showForm&&(
        <Card style={{marginBottom:14}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
            <div><Label>BRAND NAME</Label><Inp value={form.brand_name} onChange={e=>setForm(p=>({...p,brand_name:e.target.value}))} placeholder="Brand name"/></div>
            <div><Label>NICHE</Label><Inp value={form.niche} onChange={e=>setForm(p=>({...p,niche:e.target.value}))} placeholder="e.g. Luxury fashion"/></div>
            <div><Label>EMAIL</Label><Inp value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="Email"/></div>
            <div><Label>PHONE</Label><Inp value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="Phone"/></div>
            <div><Label>PLAN</Label><Inp value={form.plan_name} onChange={e=>setForm(p=>({...p,plan_name:e.target.value}))} placeholder="e.g. Premium Retainer"/></div>
            <div><Label>PAYMENT STATUS</Label>
              <Sel value={form.payment_status} onChange={e=>setForm(p=>({...p,payment_status:e.target.value}))}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </Sel>
            </div>
          </div>
          <div style={{marginBottom:10}}><Label>BRAND VOICE / TONE</Label><Inp value={form.tone_of_voice} onChange={e=>setForm(p=>({...p,tone_of_voice:e.target.value}))} placeholder="Premium, aspirational, no fluff..."/></div>
          <div style={{marginBottom:10}}><Label>TARGET AUDIENCE</Label><Inp value={form.target_audience} onChange={e=>setForm(p=>({...p,target_audience:e.target.value}))} placeholder="Luxury brand CMOs in India and UAE..."/></div>
          <Btn color={C.green} onClick={save}>Save Client</Btn>
        </Card>
      )}

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:12}}>
        {clients.map(c=>(
          <Card key={c.id} style={{border:`1px solid ${c.active?C.green+'33':C.border}`}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:C.white}}>{c.brand_name}</div>
                <div style={{fontSize:11,color:C.muted}}>{c.niche}</div>
              </div>
              <Badge color={c.active?C.green:C.amber}>{c.active?'Active':'Inactive'}</Badge>
            </div>
            {c.plan_name&&<div style={{fontSize:12,color:C.blue,marginBottom:6}}>📦 {c.plan_name}</div>}
            {c.email&&<div style={{fontSize:11,color:C.muted,marginBottom:3}}>📧 {c.email}</div>}
            {c.phone&&<div style={{fontSize:11,color:C.muted,marginBottom:8}}>📱 {c.phone}</div>}
            <button onClick={()=>setOpen(open===c.id?null:c.id)} style={{background:'none',border:'none',color:C.steel,fontSize:12,cursor:'pointer',fontWeight:700,marginRight:10}}>
              {open===c.id?'Hide details':'View details'}
            </button>
            <button onClick={()=>toggle(c.id,c.active)} style={{background:'none',border:'none',color:c.active?C.amber:C.green,fontSize:12,cursor:'pointer',fontWeight:700}}>
              {c.active?'Suspend':'Reactivate'}
            </button>
            {open===c.id&&(
              <div style={{marginTop:12,borderTop:`1px solid ${C.border}`,paddingTop:12}}>
                {c.tone_of_voice&&<div style={{fontSize:12,color:C.muted,marginBottom:6}}><strong style={{color:C.blueLight}}>Voice:</strong> {c.tone_of_voice}</div>}
                {c.target_audience&&<div style={{fontSize:12,color:C.muted,marginBottom:6}}><strong style={{color:C.blueLight}}>Audience:</strong> {c.target_audience}</div>}
                {c.payment_status&&<Badge color={c.payment_status==='active'?C.green:c.payment_status==='overdue'?C.red:C.amber}>{c.payment_status}</Badge>}
              </div>
            )}
          </Card>
        ))}
        {clients.length===0&&<Empty icon="🏢" text="No clients yet."/>}
      </div>
    </div>
  )
}

// ── MONITOR ───────────────────────────────────────────────────
function Monitor() {
  const [mentions,setMentions]=useState([])
  const [loading,setLoading]=useState(true)
  const [copied,setCopied]=useState(null)

  useEffect(()=>{
    supabase.from('mentions').select('*').eq('dismissed',false).order('created_at',{ascending:false})
      .then(({data})=>{ if(data) setMentions(data); setLoading(false) })
  },[])

  const dismiss = async id => {
    await supabase.from('mentions').update({dismissed:true}).eq('id',id)
    setMentions(m=>m.filter(x=>x.id!==id))
  }
  const copy = (text,id) => { navigator.clipboard.writeText(text).catch(()=>{}); setCopied(id); setTimeout(()=>setCopied(null),2000) }

  if(loading) return <Spinner/>
  if(mentions.length===0) return <Empty icon="👁" text="No new mentions. Flow 5 checks Reddit every 4 hours."/>

  return (
    <div style={{display:'grid',gap:12}}>
      {mentions.map(m=>(
        <Card key={m.id}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
            <div style={{display:'flex',gap:8}}><Badge color={C.steel}>{m.platform}</Badge><Badge color={C.muted}>{m.keyword}</Badge></div>
            <span style={{fontSize:11,color:C.muted}}>{fmtDate(m.created_at)}</span>
          </div>
          <div style={{fontSize:13,fontWeight:700,color:C.white,marginBottom:6}}>{m.title}</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.5}}>{m.body}</div>
          {m.suggested_reply&&(
            <div style={{background:C.surfaceHi,borderRadius:8,padding:10,marginBottom:12}}>
              <div style={{fontSize:10,color:C.blue,fontWeight:700,marginBottom:4}}>SUGGESTED REPLY</div>
              <div style={{fontSize:12,color:C.white,lineHeight:1.6}}>{m.suggested_reply}</div>
            </div>
          )}
          <div style={{display:'flex',gap:8}}>
            <Btn small ghost color={C.steel} onClick={()=>copy(m.suggested_reply,m.id)}>{copied===m.id?'✅ Copied!':'Copy Reply'}</Btn>
            {m.url&&<Btn small ghost color={C.muted} onClick={()=>window.open(m.url,'_blank')}>View Post</Btn>}
            <Btn small ghost color={C.red} onClick={()=>dismiss(m.id)}>Dismiss</Btn>
          </div>
        </Card>
      ))}
    </div>
  )
}

// ── CALENDAR ──────────────────────────────────────────────────
function Calendar() {
  const todayD = new Date()
  const [month,setMonth]=useState(todayD.getMonth())
  const [year,setYear]=useState(todayD.getFullYear())
  const [posts,setPosts]=useState([])
  const [scheduled,setScheduled]=useState([])
  const [showAdd,setShowAdd]=useState(false)
  const [newPost,setNewPost]=useState({profile:'socialninja',platform:'instagram',topic:'',scheduled_for:''})

  useEffect(()=>{
    supabase.from('posts').select('profile,platform,created_at').then(({data})=>{ if(data) setPosts(data) })
    supabase.from('scheduled_posts').select('*').eq('status','Scheduled').then(({data})=>{ if(data) setScheduled(data) })
  },[])

  const addScheduled = async () => {
    if(!newPost.topic||!newPost.scheduled_for) return
    const {data} = await supabase.from('scheduled_posts').insert([{...newPost,status:'Scheduled'}]).select()
    if(data) setScheduled(prev=>[...prev,data[0]])
    setNewPost({profile:'socialninja',platform:'instagram',topic:'',scheduled_for:''})
    setShowAdd(false)
  }

  const getEventsOn = d => {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    const postEvents = posts.filter(p=>p.created_at?.startsWith(dateStr)).map(p=>({label:`${pl(p.profile).split(' ')[0]} ${p.platform==='youtube'?'YT':'IG'}`,color:pc(p.profile)}))
    const schedEvents = scheduled.filter(s=>s.scheduled_for?.startsWith(dateStr)).map(s=>({label:`📅 ${pl(s.profile).split(' ')[0]}`,color:C.purple}))
    return [...postEvents,...schedEvents]
  }

  const daysInMonth = new Date(year,month+1,0).getDate()
  const firstDay = new Date(year,month,1).getDay()
  const days = [...Array(firstDay).fill(null),...Array(daysInMonth).fill(0).map((_,i)=>i+1)]
  const monthStr = new Date(year,month).toLocaleString('default',{month:'long',year:'numeric'})

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 260px',gap:20}}>
      <div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <Btn small ghost color={C.steel} onClick={()=>{if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1)}}>← Prev</Btn>
          <div style={{fontSize:16,fontWeight:800,color:C.white}}>{monthStr}</div>
          <Btn small ghost color={C.steel} onClick={()=>{if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1)}}>Next →</Btn>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3,marginBottom:6}}>
          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=><div key={d} style={{textAlign:'center',fontSize:11,color:C.muted,fontWeight:700,padding:'3px 0'}}>{d}</div>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3}}>
          {days.map((d,i)=>{
            const isToday=d===todayD.getDate()&&month===todayD.getMonth()&&year===todayD.getFullYear()
            const events=d?getEventsOn(d):[]
            return (
              <div key={i} style={{
                background:d?(isToday?C.steel+'33':C.surface):'transparent',
                border:isToday?`1px solid ${C.steel}`:d?`1px solid ${C.border}`:'none',
                borderRadius:8,padding:'5px',minHeight:64
              }}>
                {d&&<>
                  <div style={{fontSize:11,fontWeight:isToday?800:600,color:isToday?C.blue:C.muted,marginBottom:2}}>{d}</div>
                  {events.slice(0,3).map((e,j)=>(
                    <div key={j} style={{background:e.color+'28',borderRadius:3,padding:'1px 4px',fontSize:9,color:e.color,marginBottom:1,fontWeight:700,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.label}</div>
                  ))}
                  {events.length>3&&<div style={{fontSize:9,color:C.muted}}>+{events.length-3}</div>}
                </>}
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <Label>SCHEDULED</Label>
          <Btn small color={C.steel} onClick={()=>setShowAdd(!showAdd)}>+ Add</Btn>
        </div>
        {showAdd&&(
          <Card style={{marginBottom:12}}>
            <div style={{marginBottom:8}}><Label>PROFILE</Label><Sel value={newPost.profile} onChange={e=>setNewPost(p=>({...p,profile:e.target.value}))}>
              {PROFILES.map(pr=><option key={pr.id} value={pr.id}>{pr.label}</option>)}
            </Sel></div>
            <div style={{marginBottom:8}}><Label>PLATFORM</Label><Sel value={newPost.platform} onChange={e=>setNewPost(p=>({...p,platform:e.target.value}))}>
              <option value="instagram">Instagram</option><option value="youtube">YouTube</option>
            </Sel></div>
            <div style={{marginBottom:8}}><Label>TOPIC</Label><Inp value={newPost.topic} onChange={e=>setNewPost(p=>({...p,topic:e.target.value}))} placeholder="Topic"/></div>
            <div style={{marginBottom:10}}><Label>DATE & TIME</Label><Inp type="datetime-local" value={newPost.scheduled_for} onChange={e=>setNewPost(p=>({...p,scheduled_for:e.target.value}))}/></div>
            <Btn color={C.green} full onClick={addScheduled}>Schedule</Btn>
          </Card>
        )}
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {scheduled.sort((a,b)=>new Date(a.scheduled_for)-new Date(b.scheduled_for)).map(s=>(
            <div key={s.id} style={{background:C.surface,border:`1px solid ${pc(s.profile)}33`,borderRadius:8,padding:'10px 12px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <Badge color={pc(s.profile)}>{pl(s.profile).split(' ')[0]}</Badge>
                <span style={{fontSize:10,color:C.muted}}>{fmtDate(s.scheduled_for)}</span>
              </div>
              <div style={{fontSize:12,color:C.white,fontWeight:600,marginBottom:2}}>{s.topic}</div>
              <div style={{fontSize:11,color:C.muted,textTransform:'capitalize'}}>{s.platform} · {fmtTime(s.scheduled_for)}</div>
            </div>
          ))}
          {scheduled.length===0&&<div style={{fontSize:12,color:C.muted}}>No scheduled posts.</div>}
        </div>
      </div>
    </div>
  )
}

// ── TEAM ──────────────────────────────────────────────────────
function Team() {
  const [members,setMembers]=useState([])
  const [loading,setLoading]=useState(true)
  const [showForm,setShowForm]=useState(false)
  const [form,setForm]=useState({name:'',email:'',role:'content'})

  useEffect(()=>{
    supabase.from('team_members').select('*').order('created_at',{ascending:false})
      .then(({data})=>{ if(data) setMembers(data); setLoading(false) })
  },[])

  const save = async () => {
    if(!form.name||!form.email) return
    const {data} = await supabase.from('team_members').insert([form]).select()
    if(data) setMembers(prev=>[data[0],...prev])
    setForm({name:'',email:'',role:'content'}); setShowForm(false)
  }

  const toggle = async (id,active) => {
    await supabase.from('team_members').update({active:!active}).eq('id',id)
    setMembers(m=>m.map(x=>x.id===id?{...x,active:!active}:x))
  }

  if(loading) return <Spinner/>

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div style={{fontSize:13,color:C.muted}}>
          {members.filter(m=>m.active).length} active member{members.filter(m=>m.active).length!==1?'s':''}
        </div>
        <Btn color={C.steel} onClick={()=>setShowForm(!showForm)}>+ Add Member</Btn>
      </div>

      {showForm&&(
        <Card style={{marginBottom:14}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:10}}>
            <div><Label>NAME</Label><Inp value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Name"/></div>
            <div><Label>EMAIL</Label><Inp value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="Email"/></div>
            <div><Label>ROLE</Label><Sel value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))}>
              {Object.entries(ROLES).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            </Sel></div>
          </div>
          <Btn color={C.green} onClick={save}>Add Member</Btn>
        </Card>
      )}

      {/* Role access map */}
      <Card style={{marginBottom:16}}>
        <Label>ROLE ACCESS MAP</Label>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10}}>
          {Object.entries(ROLES).map(([k,v])=>(
            <div key={k} style={{background:C.surfaceHi,borderRadius:8,padding:12}}>
              <div style={{marginBottom:8}}><Badge color={v.color}>{v.label}</Badge></div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                {v.tabs.map(t=>(
                  <span key={t} style={{fontSize:10,color:C.muted,background:C.border+'55',borderRadius:4,padding:'2px 6px'}}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12}}>
        {members.map(m=>(
          <Card key={m.id} style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:ROLES[m.role]?.color||C.steel,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:'#fff',fontSize:16,flexShrink:0}}>
              {m.name.charAt(0).toUpperCase()}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:C.white}}>{m.name}</div>
              <div style={{fontSize:11,color:C.muted}}>{m.email}</div>
              <div style={{marginTop:4}}><Badge color={ROLES[m.role]?.color||C.muted}>{ROLES[m.role]?.label||m.role}</Badge></div>
            </div>
            <button onClick={()=>toggle(m.id,m.active)} style={{background:'none',border:'none',color:m.active?C.amber:C.green,fontSize:11,cursor:'pointer',fontWeight:700}}>
              {m.active?'Suspend':'Restore'}
            </button>
          </Card>
        ))}
        {members.length===0&&<Empty icon="👥" text="No team members yet. Just you for now."/>}
      </div>
    </div>
  )
}

// ── APP SHELL ─────────────────────────────────────────────────
const Admin = () => {
  const [tab,setTab]=useState('tasks')
  const [role]=useState('founder') // Future: auth-based role selection
  const allowedTabs = ROLES[role]?.tabs || ROLES.founder.tabs
  const visibleTabs = ALL_TABS.filter(t=>allowedTabs.includes(t.id))

  // Task progress for header
  const key = `done_${todayKey()}`
  const [done,setDoneCount]=useState(()=>{ try{return JSON.parse(localStorage.getItem(key)||'[]').length}catch{return 0} })
  const total = TASK_TEMPLATE.length
  const pct = Math.round((done/total)*100)

  return (
    <div style={{minHeight:'100vh', background:C.bg, color:C.white}}>
      {/* Header */}
      <div style={{background:C.surface, borderBottom:`1px solid ${C.border}`, height:56, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 22px', position:'sticky', top:0, zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{fontSize:18}}>🥷</div>
          <div>
            <div style={{fontSize:14,fontWeight:800,color:C.white,letterSpacing:-0.3}}>Nazim OS</div>
            <div style={{fontSize:9,color:C.muted,letterSpacing:1.5}}>COMMAND CENTER</div>
          </div>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:16}}>
          {/* Progress */}
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{fontSize:11,color:C.muted}}>{done}/{total}</div>
            <div style={{width:72,height:4,background:C.surfaceHi,borderRadius:99,overflow:'hidden'}}>
              <div style={{background:`linear-gradient(90deg,${C.steel},${C.blue})`,width:`${pct}%`,height:'100%',borderRadius:99}}/>
            </div>
            <div style={{fontSize:11,fontWeight:700,color:pct===100?C.green:C.muted}}>{pct}%</div>
          </div>
          {/* Brand dots */}
          <div style={{display:'flex',gap:5,alignItems:'center'}}>
            {PROFILES.map(p=><div key={p.id} style={{width:6,height:6,borderRadius:'50%',background:p.color}} title={p.label}/>)}
          </div>
          {/* Live indicator */}
          <div style={{display:'flex',alignItems:'center',gap:4}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:C.green}}/>
            <div style={{fontSize:11,color:C.green,fontWeight:700}}>Live</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{background:C.surface, borderBottom:`1px solid ${C.border}`, display:'flex', gap:2, padding:'0 22px', overflowX:'auto'}}>
        {visibleTabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            background:'none', border:'none',
            borderBottom:tab===t.id?`2px solid ${C.blue}`:'2px solid transparent',
            color:tab===t.id?C.white:C.muted,
            padding:'12px 14px', fontSize:12, fontWeight:700, cursor:'pointer',
            transition:'color .15s', display:'flex', alignItems:'center', gap:5, whiteSpace:'nowrap'
          }}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{padding:'20px 22px', maxWidth:1300, margin:'0 auto'}}>
        {tab==='tasks'    && <Tasks setTab={setTab}/>}
        {tab==='publish'  && <Publisher/>}
        {tab==='scripts'  && <Scripts/>}
        {tab==='queue'    && <Queue/>}
        {tab==='crm'      && <CRM/>}
        {tab==='clients'  && <Clients/>}
        {tab==='monitor'  && <Monitor/>}
        {tab==='calendar' && <Calendar/>}
        {tab==='team'     && <Team/>}
      </div>
    </div>
  )
}

export default Admin;
