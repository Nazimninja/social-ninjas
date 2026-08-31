import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, Trash2, X, Mail, Phone, Calendar as CalendarIcon, 
  Dumbbell, Sparkles, User, Search, Filter, 
  Edit3, Clock, UserPlus, FileText, CheckCircle2, 
  Share2, Video, Eye, Users, RefreshCw, Send, 
  CheckSquare, Copy, ArrowUpRight, Flame, Layers,
  TrendingUp, Compass, ChevronRight, Zap, Target, Bookmark, Star,
  ExternalLink, ArrowRight, ShieldCheck, Check
} from 'lucide-react';
import SEO from '../components/SEO';
import { supabase } from './supabase';
import { getApiUrl } from '../services/api';

// ── Multi-Brand Ecosystem Configuration ──────────────────────────────
const PROFILES = [
  { id: 'socialninja', label: 'Social Ninjas', color: '#f97316', tag: 'Agency HQ' },
  { id: 'nazim_ninja', label: 'Nazim Ninja', color: '#38bdf8', tag: 'Founder Channel' },
  { id: '9thgear_', label: '9th Gear', color: '#fbbf24', tag: 'Supercar Media' },
  { id: 'vicevault.gg', label: 'Vice Vault', color: '#f43f5e', tag: 'Gaming Hub' },
];

const ROLES: Record<string, { label: string, color: string, tabs: string[] }> = {
  founder: { label: 'Founder & CEO', color: '#c084fc', tabs: ['tasks', 'crm', 'blogs', 'fit', 'publish', 'scripts', 'queue', 'monitor', 'calendar', 'team'] },
  content: { label: 'Content Lead', color: '#38bdf8', tabs: ['tasks', 'blogs', 'publish', 'scripts', 'queue', 'calendar'] },
  sales: { label: 'Growth Lead', color: '#34d399', tabs: ['tasks', 'crm', 'calendar'] },
};

const ALL_TABS = [
  { id: 'tasks', label: 'Mission Control', icon: Zap },
  { id: 'crm', label: 'Inbound Leads', icon: Mail },
  { id: 'blogs', label: 'SEO Blog Studio', icon: Edit3 },
  { id: 'fit', label: 'Fit Ninja SaaS', icon: Dumbbell },
  { id: 'publish', label: 'Fast Publisher', icon: Share2 },
  { id: 'scripts', label: 'Viral Script Vault', icon: FileText },
  { id: 'queue', label: 'Video Production', icon: Video },
  { id: 'monitor', label: 'Brand Radar', icon: Eye },
  { id: 'calendar', label: 'Agency Calendar', icon: CalendarIcon },
  { id: 'team', label: 'Team & Access', icon: Users },
];

const TASK_TEMPLATE = [
  { id: 'sn_ig', block: 'morning', label: 'Deploy Reel: Social Ninjas Agency', brand: 'socialninja', tab: 'publish' },
  { id: 'nn_ig', block: 'morning', label: 'Deploy Reel: Nazim Ninja Personal', brand: 'nazim_ninja', tab: 'publish' },
  { id: '9g_ig', block: 'morning', label: 'Deploy Reel: 9th Gear Supercars', brand: '9thgear_', tab: 'publish' },
  { id: 'vv_ig', block: 'morning', label: 'Deploy Reel: Vice Vault Gaming', brand: 'vicevault.gg', tab: 'publish' },
  { id: 'li_post', block: 'morning', label: 'LinkedIn Founder Thought Leadership', brand: 'nazim_ninja', tab: 'publish' },
  { id: 'dms', block: 'morning', label: 'Inbox Zero: Resolve DMs across all 4 channels', brand: null, tab: null },
  { id: 'li_cmts', block: 'engage', label: '5 High-Value Comments on Target ICP Founders', brand: null, tab: null },
  { id: 'ig_cmts', block: 'engage', label: 'Engage on 10 High-Growth Niche Reels', brand: null, tab: null },
  { id: 'cold', block: 'outreach', label: 'Send 5 Hyper-Personalized Growth Inquiries', brand: 'socialninja', tab: 'crm' },
  { id: 'fu', block: 'outreach', label: 'Execute All Pending CRM Follow-Up Calls', brand: null, tab: 'crm' },
  { id: 'blog_write', block: 'content', label: 'Draft / Refine Weekly SEO Authority Article', brand: 'socialninja', tab: 'blogs' },
  { id: 'film', block: 'content', label: 'Film & Batch 2 Short-Form Video Assets', brand: null, tab: 'queue' },
];

const BLOCK_META: Record<string, { label: string, time: string, color: string, icon: string }> = {
  morning: { label: 'Morning Launch Protocol', time: '30m', color: 'text-sky-400', icon: '⚡' },
  engage: { label: 'Network Engagement', time: '20m', color: 'text-emerald-400', icon: '💬' },
  outreach: { label: 'Revenue & Lead Pipeline', time: '25m', color: 'text-amber-400', icon: '🎯' },
  content: { label: 'Media & SEO Engine', time: '45m', color: 'text-purple-400', icon: '🎬' },
};

const XPROMO = [
  { label: 'Social Ninjas ➔ Nazim Ninja', sub: "Tag @nazim_ninja in automation breakdowns as technical founder.", color: '#f97316' },
  { label: 'Nazim Ninja ➔ Social Ninjas', sub: "Reference @socialninja.s in bio/captions as scaling agency engine.", color: '#38bdf8' },
  { label: '9th Gear ➔ Vice Vault', sub: "Show real-life hypercars mirroring GTA 6 models @vicevault.gg.", color: '#fbbf24' },
  { label: 'Vice Vault ➔ 9th Gear', sub: "Direct gaming fans to IRL automotive content @9thgear_.", color: '#f43f5e' },
];

const LEAD_STATUS_CONFIG: Record<string, { label: string, color: string, bg: string, border: string }> = {
  'NEW LEAD': { label: 'New Inbound', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  'CONTACTED': { label: 'In Dialogue', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  'DEMO SCHEDULED': { label: 'Call Scheduled', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  'PROPOSAL SENT': { label: 'Proposal Sent', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  'WON': { label: 'Closed Deal 🎉', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  'LOST': { label: 'Nurture Later', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
};

const pc = (id: string) => PROFILES.find(p => p.id === id)?.color || '#38bdf8';
const pl = (id: string) => PROFILES.find(p => p.id === id)?.label || id;
const todayKey = () => new Date().toDateString();
const fmtDate = (d?: string | null) => d ? new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
const doy = () => Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);

export const Admin: React.FC = () => {
  // ── Navigation & Global States ──────────────────────────────────────
  const [activeTab, setActiveTab] = useState<string>('tasks');
  const [userRole, setUserRole] = useState<string>('founder');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // ── Database Data ───────────────────────────────────────────────────
  const [leads, setLeads] = useState<any[]>([]);
  const [fitClients, setFitClients] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [scripts, setScripts] = useState<any[]>([]);
  const [queueItems, setQueueItems] = useState<any[]>([]);
  const [mentions, setMentions] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  // ── Modals ──────────────────────────────────────────────────────────
  const [showAddLead, setShowAddLead] = useState<boolean>(false);
  const [showAddMember, setShowAddMember] = useState<boolean>(false);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [viewFitClientDetails, setViewFitClientDetails] = useState<any>(null);
  const [manageFitStatus, setManageFitStatus] = useState<any>(null);
  const [newFitStatus, setNewFitStatus] = useState<string>('free');
  const [openScriptId, setOpenScriptId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // ── Scheduler ───────────────────────────────────────────────────────
  const [scheduleLeadId, setScheduleLeadId] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [scheduleNotes, setScheduleNotes] = useState<string>('');

  // ── Daily Checklist State ───────────────────────────────────────────
  const taskKey = `nazim_os_done_${todayKey()}`;
  const [doneTasks, setDoneTasks] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(taskKey) || '[]'); } catch { return []; }
  });

  const toggleTask = (id: string) => {
    const next = doneTasks.includes(id) ? doneTasks.filter(x => x !== id) : [...doneTasks, id];
    setDoneTasks(next);
    try { localStorage.setItem(taskKey, JSON.stringify(next)); } catch {}
  };

  // ── Blog Editor State ───────────────────────────────────────────────
  const [isEditingBlog, setIsEditingBlog] = useState<boolean>(false);
  const [currentBlog, setCurrentBlog] = useState({ id: '', title: '', content: '', excerpt: '', author: "Social Ninja's Team", category: 'Growth Strategy' });

  // ── Publisher State ─────────────────────────────────────────────────
  const [pubProfile, setPubProfile] = useState<string>('nazim_ninja');
  const [pubPlatform, setPubPlatform] = useState<string>('linkedin_carousel');
  const [pubTopic, setPubTopic] = useState<string>('');
  const [pubSchedMode, setPubSchedMode] = useState<boolean>(false);
  const [pubSchedDate, setPubSchedDate] = useState<string>('');
  const [pubSchedTime, setPubSchedTime] = useState<string>('10:00');
  const [pubStatus, setPubStatus] = useState<string | null>(null);
  const [pubFilter, setPubFilter] = useState<string>('all');
  const [calFilter, setCalFilter] = useState<string>('all');
  const [calView, setCalView] = useState<'grid' | 'table'>('grid');

  // ── Master Loader ───────────────────────────────────────────────────
  const loadAllData = useCallback(async () => {
    setRefreshing(true);
    try {
      const [
        leadsRes, fitRes, postsRes, scriptsRes, queueRes, mentionsRes, teamRes, blogsRes
      ] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        fetch(getApiUrl('/api/fit-clients')).then(r => r.json()).catch(() => []),
        supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(100),
        supabase.from('scripts').select('*').order('created_at', { ascending: false }),
        supabase.from('scheduled_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('mentions').select('*').eq('dismissed', false).order('created_at', { ascending: false }),
        supabase.from('team_members').select('*').order('created_at', { ascending: false }),
        fetch(getApiUrl('/api/data?resource=blogs')).then(r => r.json()).catch(() => [])
      ]);

      if (leadsRes.data) setLeads(leadsRes.data);
      if (Array.isArray(fitRes)) setFitClients(fitRes);
      if (postsRes.data) setPosts(postsRes.data);
      if (scriptsRes.data) setScripts(scriptsRes.data);
      if (queueRes.data) setQueueItems(queueRes.data);
      if (mentionsRes.data) setMentions(mentionsRes.data);
      if (teamRes.data) setTeamMembers(teamRes.data);
      if (Array.isArray(blogsRes)) setBlogs(blogsRes);
    } catch (e) {
      console.error('Failed to load CRM data:', e);
    }
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // ── Action Handlers ─────────────────────────────────────────────────
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSaveLead = async (leadForm: any) => {
    setLoading(true);
    const payload = {
      ...leadForm,
      status: (leadForm.status || 'NEW LEAD').toUpperCase(),
      created_at: leadForm.created_at || new Date().toISOString()
    };
    if (leadForm.id) {
      await supabase.from('leads').update(payload).eq('id', leadForm.id);
    } else {
      await supabase.from('leads').insert([payload]);
    }
    setShowAddLead(false);
    await loadAllData();
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Delete this lead from pipeline?')) return;
    await supabase.from('leads').delete().eq('id', id);
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const handleSaveFitStatus = async () => {
    if (!manageFitStatus) return;
    try {
      const res = await fetch(getApiUrl('/api/fit-clients'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: manageFitStatus.id, plan_status: newFitStatus })
      });
      if (res.ok) {
        setManageFitStatus(null);
        await loadAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleScheduleSubmit = async () => {
    if (!scheduleLeadId) return alert('Select a lead to schedule');
    await supabase.from('leads').update({
      next_follow_up: scheduleDate,
      follow_up_notes: scheduleNotes || 'Scheduled Discovery Session'
    }).eq('id', scheduleLeadId);
    setShowScheduleModal(false);
    setScheduleNotes('');
    await loadAllData();
  };

  const handlePublishPost = async () => {
    if (!pubTopic.trim()) { setPubStatus('error'); return; }
    setPubStatus('posting');
    const entry = {
      profile: pubProfile,
      platform: pubPlatform,
      file_name: pubTopic.substring(0, 40) + '...',
      caption: '',
      yt_title: pubTopic,
      status: pubSchedMode ? 'Scheduled' : 'Published',
      scheduled_for: pubSchedMode && pubSchedDate ? new Date(`${pubSchedDate}T${pubSchedTime}`).toISOString() : null,
      created_at: new Date().toISOString()
    };
    await supabase.from('posts').insert([entry]);

    // Dispatch directly to Railway n8n publisher webhook for instant processing
    if (!pubSchedMode) {
      try {
        await fetch('https://n8n-production-29f31.up.railway.app/webhook/publisher', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profile: pubProfile,
            platform: pubPlatform,
            topic: pubTopic,
            source: 'crm_direct'
          })
        });
      } catch (err) {
        console.error('Direct webhook dispatch error:', err);
      }
    }

    setPubStatus('done');
    setPubTopic('');
    setPubSchedDate('');
    setTimeout(() => setPubStatus(null), 3000);
    await loadAllData();
  };

  // ── Computed Aggregates ─────────────────────────────────────────────
  const totalTasks = TASK_TEMPLATE.length;
  const completedTasksCount = doneTasks.filter(id => TASK_TEMPLATE.some(t => t.id === id)).length;
  const taskProgressPct = Math.round((completedTasksCount / totalTasks) * 100);

  const todayStr = new Date().toISOString().split('T')[0];
  const followupsToday = leads.filter(l => (l.next_follow_up || l.nextFollowUp || '').startsWith(todayStr));
  const wonLeadsCount = leads.filter(l => (l.status || '').toUpperCase() === 'WON').length;
  const premiumFitCount = fitClients.filter(f => f.plan_status === 'premium').length;

  const currentXpromo = XPROMO[doy() % 4];
  const allowedTabs = ROLES[userRole]?.tabs || ROLES.founder.tabs;
  const visibleTabs = ALL_TABS.filter(t => allowedTabs.includes(t.id));

  // Search filtering
  const filteredLeads = leads.filter(l => 
    (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.company || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFitClients = fitClients.filter(f =>
    (f.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (f.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (f.assessment_data?.goal || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBlogs = blogs.filter(b =>
    (b.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 font-sans selection:bg-brand-primary/30 antialiased pb-28">
      <SEO title="Social Ninja's | Agency Command Deck" description="Executive Operations Dashboard" />

      {/* ── TOP LUXURY EXECUTIVE HEADER ──────────────────────────────── */}
      <header className="border-b border-white/[0.08] bg-[#090d18]/90 backdrop-blur-2xl sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Real Social Ninja's Official Logo & Brand */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center p-1 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 shadow-lg">
              <img 
                src="/ninja-logo.png" 
                alt="Social Ninja's Logo" 
                className="w-8 h-8 object-contain drop-shadow-md"
              />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
                <span>Social<span className="text-brand-primary">Ninja's</span></span>
                <span className="text-[10px] font-bold text-slate-400 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-full">
                  COMMAND DECK
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-[10.5px] text-slate-400 font-medium">Enterprise Growth Engine · v3.2</p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center flex-1 max-w-sm relative">
            <Search size={14} className="absolute left-3.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search leads, fit users, blog articles..."
              className="w-full bg-[#101728] border border-white/[0.08] rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary transition-all shadow-inner"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-2.5 text-slate-500 hover:text-white">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Master Action Triggers */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <CalendarIcon size={14} /> <span className="hidden sm:inline">+ Schedule Call</span>
            </button>

            <button
              onClick={() => setShowAddLead(true)}
              className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <UserPlus size={14} /> <span className="hidden sm:inline">+ Add Lead</span>
            </button>

            <button
              onClick={() => {
                setCurrentBlog({ id: '', title: '', content: '', excerpt: '', author: "Social Ninja's Team", category: 'Growth Strategy' });
                setIsEditingBlog(true);
                setActiveTab('blogs');
              }}
              className="bg-gradient-to-r from-brand-primary to-orange-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-brand-primary/25 hover:opacity-95 transition-all active:scale-95"
            >
              <Edit3 size={14} /> <span className="hidden sm:inline">+ Draft Blog</span>
            </button>

            <button
              onClick={loadAllData}
              disabled={refreshing}
              className="p-2 text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl transition-all text-xs active:scale-95"
              title="Refresh All Database Streams"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin text-brand-primary' : ''} />
            </button>
          </div>
        </div>
      </header>

      {/* ── METRICS COCKPIT CARDS (CLEAN & MINIMALIST) ─────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Leads Card */}
          <div 
            onClick={() => setActiveTab('crm')}
            className="cursor-pointer bg-[#0b0f19] border border-white/[0.08] hover:border-white/[0.18] p-5 rounded-2xl transition-all shadow-lg group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">Inbound Growth Leads</span>
              <div className="w-7 h-7 rounded-lg bg-white/[0.05] text-slate-300 flex items-center justify-center border border-white/[0.08]">
                <Mail size={14} />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">{leads.length}</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                {wonLeadsCount} Closed
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Active pipeline prospects</p>
          </div>

          {/* Fit Ninja SaaS Card */}
          <div 
            onClick={() => setActiveTab('fit')}
            className="cursor-pointer bg-[#0b0f19] border border-white/[0.08] hover:border-white/[0.18] p-5 rounded-2xl transition-all shadow-lg group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">Fit Ninja Members</span>
              <div className="w-7 h-7 rounded-lg bg-white/[0.05] text-slate-300 flex items-center justify-center border border-white/[0.08]">
                <Dumbbell size={14} />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">{fitClients.length}</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                {premiumFitCount} Pro Active
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">SaaS workout & diet users</p>
          </div>

          {/* SEO Blog Card */}
          <div 
            onClick={() => setActiveTab('blogs')}
            className="cursor-pointer bg-[#0b0f19] border border-white/[0.08] hover:border-white/[0.18] p-5 rounded-2xl transition-all shadow-lg group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">SEO Knowledgebase</span>
              <div className="w-7 h-7 rounded-lg bg-white/[0.05] text-slate-300 flex items-center justify-center border border-white/[0.08]">
                <FileText size={14} />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">{blogs.length}</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                Live on Web
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">High-intent organic articles</p>
          </div>

          {/* Agenda Card */}
          <div 
            onClick={() => setActiveTab('calendar')}
            className="cursor-pointer bg-[#0b0f19] border border-white/[0.08] hover:border-white/[0.18] p-5 rounded-2xl transition-all shadow-lg group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">Today's Agenda</span>
              <div className="w-7 h-7 rounded-lg bg-white/[0.05] text-slate-300 flex items-center justify-center border border-white/[0.08]">
                <Clock size={14} />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">{followupsToday.length}</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                Action Today
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Scheduled discovery calls</p>
          </div>

        </div>
      </div>

      {/* ── SEAMLESS PILL NAVIGATION ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-[#0b0f19] border border-white/[0.08] rounded-2xl p-1.5 flex gap-1 overflow-x-auto shadow-xl scrollbar-none">
          {visibleTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-slate-800 text-white border border-white/[0.12] shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{tab.label}</span>
                {tab.id === 'crm' && leads.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-white/10 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {leads.length}
                  </span>
                )}
                {tab.id === 'fit' && fitClients.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-white/10 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {fitClients.length}
                  </span>
                )}
                {tab.id === 'blogs' && blogs.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-white/10 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {blogs.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── WORKSPACE PANELS ─────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* 1. MISSION CONTROL / DAILY OPS */}
        {activeTab === 'tasks' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Daily Progress Banner */}
              <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                      <span>{completedTasksCount}/{totalTasks} Daily Directives Executed</span>
                      {taskProgressPct === 100 && <span className="text-emerald-400 text-sm">🔥 100% COMPLETE</span>}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className={`text-2xl font-black ${taskProgressPct === 100 ? 'text-emerald-400' : taskProgressPct > 50 ? 'text-sky-400' : 'text-amber-400'}`}>
                    {taskProgressPct}%
                  </div>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden p-0.5 border border-white/[0.05]">
                  <div 
                    className="bg-gradient-to-r from-brand-primary via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${taskProgressPct}%` }}
                  />
                </div>
              </div>

              {/* Task Checklist Blocks */}
              {(['morning', 'engage', 'outreach', 'content'] as const).map(block => {
                const meta = BLOCK_META[block];
                const blockTasks = TASK_TEMPLATE.filter(t => t.block === block);
                const blockDoneCount = blockTasks.filter(t => doneTasks.includes(t.id)).length;

                return (
                  <div key={block} className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{meta.icon}</span>
                        <h3 className={`text-xs font-black uppercase tracking-wider ${meta.color}`}>
                          {meta.label}
                        </h3>
                        <span className="text-xs text-slate-400 font-medium">· {meta.time}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400">{blockDoneCount}/{blockTasks.length}</span>
                    </div>

                    <div className="grid gap-2">
                      {blockTasks.map(t => {
                        const isDone = doneTasks.includes(t.id);
                        return (
                          <div
                            key={t.id}
                            onClick={() => toggleTask(t.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isDone
                                ? 'bg-slate-900/40 border-emerald-500/20 opacity-50'
                                : 'bg-[#121929] border-white/[0.05] hover:border-white/[0.15]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold border transition-all ${
                                isDone ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-700 bg-slate-900 text-transparent'
                              }`}>
                                ✓
                              </div>
                              <span className={`text-xs font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                {t.label}
                              </span>
                              {t.brand && (
                                <span 
                                  className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border"
                                  style={{ backgroundColor: `${pc(t.brand)}15`, color: pc(t.brand), borderColor: `${pc(t.brand)}30` }}
                                >
                                  {pl(t.brand)}
                                </span>
                              )}
                            </div>

                            {t.tab && !isDone && (
                              <button
                                onClick={e => { e.stopPropagation(); setActiveTab(t.tab!); }}
                                className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-sky-500/10 px-2 py-1 rounded-lg border border-sky-500/20"
                              >
                                Launch →
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar Ops Insights */}
            <div className="space-y-6">
              
              {/* Today's Cross Promo Card */}
              <div className="bg-[#0e1424] border border-orange-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                <div className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2 flex items-center gap-1.5">
                  <Flame size={13} /> Active Synergy Angle
                </div>
                <div className="text-sm font-bold text-white mb-2">{currentXpromo.label}</div>
                <div className="text-xs text-slate-300 italic mb-4 bg-slate-900/80 p-3 rounded-xl border border-white/[0.06]">
                  {currentXpromo.sub}
                </div>
                <p className="text-xs text-slate-400">Rule: Maintain algorithmic cross-pollination across all 4 properties.</p>
              </div>

              {/* 4 Brand Network Stack */}
              <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-5 shadow-2xl space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">4-Brand Ecosystem</h3>
                <div className="grid gap-2">
                  {PROFILES.map(pr => (
                    <div key={pr.id} className="flex items-center justify-between p-3 rounded-xl bg-[#121929] border border-white/[0.05]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: pr.color }}></div>
                        <span className="text-xs font-bold text-white">{pr.label}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400">{pr.tag}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. INBOUND LEADS / CRM */}
        {activeTab === 'crm' && (
          <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Mail size={18} className="text-sky-400" /> Inbound Growth Pipeline
                </h2>
                <p className="text-xs text-slate-400">Track and qualify incoming agency client inquiries</p>
              </div>
              <button
                onClick={() => setShowAddLead(true)}
                className="bg-brand-primary hover:opacity-90 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-brand-primary/20"
              >
                <Plus size={15} /> + Add Lead
              </button>
            </div>

            {/* Pipeline Stage Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {Object.keys(LEAD_STATUS_CONFIG).map(st => {
                const conf = LEAD_STATUS_CONFIG[st];
                const count = leads.filter(l => (l.status || '').toUpperCase() === st).length;
                return (
                  <div key={st} className={`p-3.5 rounded-xl border text-center ${conf.bg} ${conf.border}`}>
                    <div className={`text-xl font-black ${conf.color}`}>{count}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{conf.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pr-4">Prospect</th>
                    <th className="pb-3 pr-4">Company & Source</th>
                    <th className="pb-3 pr-4">Pipeline Status</th>
                    <th className="pb-3 pr-4">Next Follow-Up</th>
                    <th className="pb-3 pr-4">Received</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 italic">
                        No leads found in pipeline. Click "+ Add Lead" to record a new prospect.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map(lead => {
                      const st = (lead.status || 'NEW LEAD').toUpperCase();
                      const conf = LEAD_STATUS_CONFIG[st] || LEAD_STATUS_CONFIG['NEW LEAD'];
                      return (
                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 pr-4">
                            <div className="font-bold text-white text-sm">{lead.name || 'Anonymous'}</div>
                            <div className="text-slate-400 text-[11px]">{lead.email} · {lead.phone || 'No phone'}</div>
                          </td>
                          <td className="py-4 pr-4">
                            <div className="font-semibold text-slate-200">{lead.company || lead.website || 'Direct Prospect'}</div>
                            <div className="text-[11px] text-slate-500">{lead.source || 'Website Inbound'}</div>
                          </td>
                          <td className="py-4 pr-4">
                            <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border uppercase ${conf.bg} ${conf.color} ${conf.border}`}>
                              {conf.label}
                            </span>
                          </td>
                          <td className="py-4 pr-4">
                            {lead.next_follow_up ? (
                              <div className="text-amber-400 font-bold">
                                📅 {fmtDate(lead.next_follow_up)}
                                <div className="text-[10px] text-slate-500 font-normal truncate max-w-[140px]">{lead.follow_up_notes || 'Scheduled call'}</div>
                              </div>
                            ) : (
                              <span className="text-slate-600 italic">Not scheduled</span>
                            )}
                          </td>
                          <td className="py-4 pr-4 text-slate-400">
                            {fmtDate(lead.created_at)}
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex gap-1.5 justify-end">
                              <button
                                onClick={() => {
                                  setScheduleLeadId(lead.id);
                                  setShowScheduleModal(true);
                                }}
                                className="p-2 bg-purple-500/10 hover:bg-purple-600 text-purple-300 hover:text-white rounded-lg transition-colors text-xs font-bold"
                                title="Schedule Call"
                              >
                                <CalendarIcon size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-2 bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white rounded-lg transition-colors text-xs"
                                title="Delete Lead"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. SEO BLOG STUDIO */}
        {activeTab === 'blogs' && (
          <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Edit3 size={18} className="text-brand-primary" /> SEO Insights & Article Studio
                </h2>
                <p className="text-xs text-slate-400">Publish high-ranking marketing guides and case studies directly to socialninjas.in/blog</p>
              </div>
              <button
                onClick={() => {
                  setCurrentBlog({ id: '', title: '', content: '', excerpt: '', author: "Social Ninja's Team", category: 'Growth Strategy' });
                  setIsEditingBlog(true);
                }}
                className="bg-brand-primary hover:opacity-90 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-brand-primary/20"
              >
                <Plus size={14} /> + New Article
              </button>
            </div>

            {isEditingBlog ? (
              <div className="space-y-4 bg-[#121929] border border-white/[0.08] p-5 rounded-2xl shadow-xl">
                <input
                  type="text"
                  placeholder="Article Headline (H1 Target Keyword)..."
                  value={currentBlog.title}
                  onChange={e => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                  className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-brand-primary"
                />
                <textarea
                  placeholder="Short excerpt summary for meta description and card views..."
                  value={currentBlog.excerpt}
                  onChange={e => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                  rows={2}
                  className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-primary"
                />
                <textarea
                  placeholder="Markdown Body (# Heading, ## Section, bullet points, CTA links)..."
                  value={currentBlog.content}
                  onChange={e => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                  rows={12}
                  className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3.5 text-xs font-mono text-white focus:outline-none focus:border-brand-primary"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setIsEditingBlog(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      await fetch(getApiUrl('/api/data?resource=blogs'), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(currentBlog)
                      });
                      setIsEditingBlog(false);
                      await loadAllData();
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-brand-primary to-orange-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-primary/20"
                  >
                    Save & Deploy Article
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-3">
                {filteredBlogs.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-12 text-center">No articles found.</p>
                ) : (
                  filteredBlogs.map(blog => (
                    <div key={blog.id} className="p-4 rounded-xl bg-[#121929] border border-white/[0.05] flex items-center justify-between gap-4 hover:border-white/[0.1] transition-all">
                      <div>
                        <h4 className="font-bold text-white text-sm">{blog.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{blog.excerpt}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setCurrentBlog(blog); setIsEditingBlog(true); }}
                          className="px-3 py-1.5 bg-sky-500/10 text-sky-400 hover:bg-sky-600 hover:text-white rounded-lg text-xs font-bold transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (!window.confirm('Delete blog post?')) return;
                            await fetch(getApiUrl(`/api/data?resource=blogs&id=${blog.id}`), { method: 'DELETE' });
                            await loadAllData();
                          }}
                          className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white rounded-lg text-xs transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* 4. FIT NINJA MEMBERS (SAAS HUB) */}
        {activeTab === 'fit' && (
          <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Dumbbell size={18} className="text-amber-400" /> Fit Ninja Member Accounts & Nutrition Engine
                </h2>
                <p className="text-xs text-slate-400">Live synchronized database from fit.socialninjas.in</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Total: {fitClients.length}</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                  {premiumFitCount} Paid Subscribers
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pr-4">Member</th>
                    <th className="pb-3 pr-4">Fitness Goal</th>
                    <th className="pb-3 pr-4">Plan Status</th>
                    <th className="pb-3 pr-4">Daily Targets</th>
                    <th className="pb-3 pr-4">Joined</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs">
                  {filteredFitClients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 italic">
                        No Fit Ninja profiles found.
                      </td>
                    </tr>
                  ) : (
                    filteredFitClients.map(fit => (
                      <tr key={fit.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 pr-4">
                          <div className="font-bold text-white text-sm">{fit.name || 'Anonymous User'}</div>
                          <div className="text-slate-400 text-[11px]">{fit.email}</div>
                        </td>
                        <td className="py-4 pr-4 font-semibold text-slate-300 capitalize">
                          {fit.assessment_data?.goal?.replace('_', ' ') || 'General Fitness'}
                        </td>
                        <td className="py-4 pr-4">
                          <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full uppercase border ${
                            fit.plan_status === 'premium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                            {fit.plan_status || 'free'}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-slate-300">
                          {fit.generated_plan ? (
                            <span className="font-bold text-emerald-400">{fit.generated_plan.kcal} kcal · {fit.generated_plan.protein}g protein</span>
                          ) : (
                            <span className="text-slate-600 italic">Not generated</span>
                          )}
                        </td>
                        <td className="py-4 pr-4 text-slate-400">
                          {fmtDate(fit.created_at)}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button
                              onClick={() => setViewFitClientDetails(fit)}
                              className="bg-sky-500/10 hover:bg-sky-600 text-sky-400 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => {
                                setManageFitStatus(fit);
                                setNewFitStatus(fit.plan_status || 'free');
                              }}
                              className="bg-amber-500/10 hover:bg-amber-600 text-amber-400 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                            >
                              Manage
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. MULTI-BRAND PUBLISHER */}
        {activeTab === 'publish' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-5">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Share2 size={18} className="text-brand-primary" /> Multi-Brand Fast Publisher
              </h2>

              {/* Brand Selector */}
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">Select Brand Channel</label>
                <div className="grid grid-cols-2 gap-2">
                  {PROFILES.map(pr => (
                    <button
                      key={pr.id}
                      onClick={() => {
                        setPubProfile(pr.id);
                        if ((pr.id === '9thgear_' || pr.id === 'vicevault.gg') && (pubPlatform === 'linkedin' || pubPlatform === 'linkedin_video' || pubPlatform === 'linkedin_article')) {
                          setPubPlatform('instagram');
                        }
                      }}
                      className={`p-3.5 rounded-xl border text-left font-bold text-xs flex items-center gap-2.5 transition-all ${
                        pubProfile === pr.id
                          ? 'border-white bg-slate-800 text-white shadow-lg'
                          : 'border-white/[0.06] bg-[#121929] text-slate-400 hover:border-white/[0.15]'
                      }`}
                    >
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: pr.color }}></div>
                      <span>{pr.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Selector */}
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">Distribution Platform</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'instagram', label: 'Instagram Reels', icon: '📸' },
                    { id: 'youtube', label: 'YouTube Shorts', icon: '▶️' },
                    { id: 'both', label: 'IG + YT Sync', icon: '📡' },
                    ...((pubProfile === 'socialninja' || pubProfile === 'nazim_ninja') ? [
                      { id: 'linkedin_carousel', label: 'LinkedIn Carousel', icon: '📑' },
                      { id: 'linkedin_article', label: 'LinkedIn Article', icon: '📝' },
                    ] : []),
                  ].map(pl => (
                    <button
                      key={pl.id}
                      onClick={() => setPubPlatform(pl.id)}
                      className={`p-3 rounded-xl border text-left font-bold text-xs flex items-center gap-2.5 transition-all ${
                        pubPlatform === pl.id
                          ? 'border-sky-500 bg-sky-500/10 text-white shadow-md shadow-sky-500/20'
                          : 'border-white/[0.06] bg-[#121929] text-slate-400 hover:border-white/[0.15]'
                      }`}
                    >
                      <span>{pl.icon}</span>
                      <span>{pl.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic / Prompt */}
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">Content Angle / Topic Prompt</label>
                <textarea
                  value={pubTopic}
                  onChange={e => setPubTopic(e.target.value)}
                  rows={3}
                  placeholder="e.g. How top agency founders automate outreach workflows using autonomous agents"
                  className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                />
              </div>

              {/* Schedule Mode Switcher */}
              <div className="p-3.5 rounded-xl bg-[#121929] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">📅 Future Slot Scheduling</div>
                  <div className="text-[10px] text-slate-400">Automatically sync with calendar queue</div>
                </div>
                <input
                  type="checkbox"
                  checked={pubSchedMode}
                  onChange={e => setPubSchedMode(e.target.checked)}
                  className="w-4 h-4 accent-brand-primary rounded"
                />
              </div>

              {pubSchedMode && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">DATE</label>
                    <input
                      type="date"
                      value={pubSchedDate}
                      onChange={e => setPubSchedDate(e.target.value)}
                      className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">TIME</label>
                    <input
                      type="time"
                      value={pubSchedTime}
                      onChange={e => setPubSchedTime(e.target.value)}
                      className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handlePublishPost}
                className="w-full bg-gradient-to-r from-brand-primary via-orange-500 to-amber-500 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-brand-primary/25 hover:opacity-95 transition-opacity text-xs"
              >
                {pubStatus === 'posting' ? '⏳ Dispatching...' : pubStatus === 'done' ? '✅ Logged to Queue!' : pubSchedMode ? '📅 Schedule Post Entry' : '📡 Dispatch to Publisher'}
              </button>
            </div>

            {/* Live Feed & Content Queue */}
            <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <h3 className="text-xs font-black text-white uppercase tracking-wider">
                  Content Distribution Feed ({posts.length})
                </h3>
                <div className="flex items-center gap-1 bg-[#070b14] p-1 rounded-xl border border-white/[0.06]">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'scheduled', label: `Scheduled (${posts.filter(p => p.status === 'Scheduled').length})` },
                    { id: 'published', label: `Published (${posts.filter(p => p.status === 'published' || p.status === 'Published').length})` }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setPubFilter(tab.id)}
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg transition-all ${
                        pubFilter === tab.id
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {posts.filter(p => {
                  if (pubFilter === 'scheduled') return p.status === 'Scheduled';
                  if (pubFilter === 'published') return p.status === 'published' || p.status === 'Published';
                  return true;
                }).length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-10 text-center">No posts found for this filter.</p>
                ) : (
                  posts.filter(p => {
                    if (pubFilter === 'scheduled') return p.status === 'Scheduled';
                    if (pubFilter === 'published') return p.status === 'published' || p.status === 'Published';
                    return true;
                  }).map(p => {
                    const isPub = p.status === 'published' || p.status === 'Published';
                    return (
                      <div key={p.id} className="p-3.5 rounded-xl bg-[#121929] border border-white/[0.05] flex items-center justify-between gap-3 hover:border-white/[0.12] transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: pc(p.profile) }}></div>
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-2">
                              <span>{pl(p.profile)}</span>
                              <span className="text-[10px] text-purple-300 font-mono bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                                {p.platform}
                              </span>
                              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase ${
                                isPub ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              }`}>
                                {isPub ? 'Published' : 'Scheduled'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-300 mt-1 font-semibold line-clamp-1">{p.yt_title || p.file_name}</p>
                            <p className="text-[10px] text-slate-500 font-mono">{p.file_name}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                            {p.scheduled_for ? `📅 ${new Date(p.scheduled_for).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}` : fmtDate(p.created_at)}
                          </span>
                          {!isPub && (
                            <button
                              onClick={async () => {
                                if (!window.confirm(`Publish "${p.file_name}" now?`)) return;
                                try {
                                  await fetch('https://n8n-production-29f31.up.railway.app/webhook/publisher', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      profile: p.profile || 'socialninja',
                                      platform: p.platform || 'linkedin_carousel',
                                      topic: p.yt_title,
                                      fileName: p.file_name,
                                      source: 'crm_fast_publisher_button'
                                    })
                                  });
                                  alert('🚀 Dispatched! Check your Telegram group in ~30s.');
                                  await loadAllData();
                                } catch (e) {
                                  alert('Error: ' + (e as Error).message);
                                }
                              }}
                              className="text-[9px] font-extrabold text-white bg-purple-600 hover:bg-purple-500 px-2 py-0.5 rounded shadow transition-all"
                            >
                              🚀 Now
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* 6. VIRAL SCRIPT VAULT */}
        {activeTab === 'scripts' && (
          <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <FileText size={18} className="text-purple-400" /> Viral Short-Form Video Script Vault
                </h2>
                <p className="text-xs text-slate-400">Pre-hooked scripts and captions for YouTube Shorts & Instagram Reels</p>
              </div>
              <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/30">
                {scripts.length} Scripts Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scripts.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-500 italic">
                  No scripts in vault. New automated scripts will populate automatically from research flows.
                </div>
              ) : (
                scripts.map(sc => (
                  <div key={sc.id} className="bg-[#121929] border border-white/[0.06] rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-white/[0.15] transition-all">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border" style={{ backgroundColor: `${pc(sc.profile)}15`, color: pc(sc.profile), borderColor: `${pc(sc.profile)}30` }}>
                          {pl(sc.profile)}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">{sc.status || 'Ready'}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm">{sc.topic}</h3>
                      <p className="text-xs text-sky-400 font-semibold">🎬 {sc.yt_title}</p>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.05] text-xs text-slate-300">
                        <span className="text-amber-400 font-bold">🪝 Hook: </span>{sc.hook}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                      <button
                        onClick={() => setOpenScriptId(openScriptId === sc.id ? null : sc.id)}
                        className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg"
                      >
                        {openScriptId === sc.id ? 'Hide' : 'Full Script'}
                      </button>
                      <button
                        onClick={() => copyToClipboard(sc.caption || sc.hook, sc.id)}
                        className="text-xs font-bold text-brand-primary hover:opacity-90 bg-brand-primary/10 px-3 py-1.5 rounded-lg border border-brand-primary/20"
                      >
                        {copiedText === sc.id ? '✅ Copied' : 'Copy Caption'}
                      </button>
                    </div>

                    {openScriptId === sc.id && (
                      <div className="mt-3 pt-3 border-t border-white/[0.06] text-xs text-slate-300 space-y-2 max-h-60 overflow-y-auto">
                        <div><strong className="text-slate-400">Section 1:</strong> {sc.section1 || '—'}</div>
                        <div><strong className="text-slate-400">Section 2:</strong> {sc.section2 || '—'}</div>
                        <div><strong className="text-slate-400">Section 3:</strong> {sc.section3 || '—'}</div>
                        <div><strong className="text-slate-400">CTA:</strong> {sc.cta || '—'}</div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 7. MEDIA QUEUE */}
        {activeTab === 'queue' && (
          <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="border-b border-white/[0.06] pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Video size={18} className="text-pink-400" /> Media & Video Production Queue
              </h2>
              <p className="text-xs text-slate-400">Raw and finished video assets ready for multi-platform delivery</p>
            </div>

            <div className="grid gap-3">
              {queueItems.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-12 text-center">No videos queued in pipeline.</p>
              ) : (
                queueItems.map(item => (
                  <div key={item.id} className="p-4 rounded-xl bg-[#121929] border border-white/[0.05] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg">
                        {item.platform === 'youtube' ? '▶️' : '📸'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{item.file_name || item.topic}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 flex gap-2">
                          <span style={{ color: pc(item.profile) }}>{pl(item.profile)}</span>
                          <span>·</span>
                          <span className="capitalize">{item.platform}</span>
                          {item.scheduled_for && <span>· 📅 {fmtDate(item.scheduled_for)}</span>}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                      {item.status || 'Pending'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 8. BRAND RADAR MONITOR */}
        {activeTab === 'monitor' && (
          <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="border-b border-white/[0.06] pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Eye size={18} className="text-teal-400" /> Brand Radar & Social Mentions
              </h2>
              <p className="text-xs text-slate-400">Automated listening stream for brand keywords and opportunities</p>
            </div>

            <div className="grid gap-4">
              {mentions.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-12 text-center">No active brand mentions. Radar scans Reddit and Twitter every 4 hours.</p>
              ) : (
                mentions.map(m => (
                  <div key={m.id} className="p-5 rounded-2xl bg-[#121929] border border-white/[0.05] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 uppercase">{m.platform || 'Web'}</span>
                        <span className="text-[10px] font-semibold text-slate-400">{m.keyword}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{fmtDate(m.created_at)}</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">{m.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{m.body}</p>

                    {m.suggested_reply && (
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.05] text-xs text-sky-300">
                        <strong className="text-sky-400 block mb-1">🤖 Suggested Reply:</strong>
                        {m.suggested_reply}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button onClick={() => copyToClipboard(m.suggested_reply || m.body, m.id)} className="text-xs font-bold text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded-lg">
                        {copiedText === m.id ? '✅ Copied' : 'Copy Reply'}
                      </button>
                      <button onClick={async () => {
                        await supabase.from('mentions').update({ dismissed: true }).eq('id', m.id);
                        setMentions(prev => prev.filter(x => x.id !== m.id));
                      }} className="text-xs font-bold text-slate-400 hover:text-rose-400 bg-slate-800 px-3 py-1.5 rounded-lg">
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 9. MASTER OPERATIONS CALENDAR & CONTENT PLAN */}
        {activeTab === 'calendar' && (
          <div className="bg-[#0b0f19] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/[0.06] pb-5 gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <CalendarIcon size={16} className="text-slate-400" /> September 2026 Content Plan
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Automated daily morning LinkedIn carousel slots and operations agenda</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Daily Auto-Trigger: 09:30 AM IST
                </span>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/10 px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus size={13} /> Schedule Event
                </button>
              </div>
            </div>

            {/* Filter & View Controls */}
            {(() => {
              const septPosts = posts
                .filter(p => p.file_name?.includes('Sep') || p.scheduled_for?.includes('2026-09'))
                .sort((a, b) => {
                  const getDay = (x: any) => {
                    const match = (x.file_name || '').match(/Sep(\d+)/i);
                    if (match) return parseInt(match[1], 10);
                    if (x.scheduled_for) return new Date(x.scheduled_for).getUTCDate();
                    return 99;
                  };
                  return getDay(a) - getDay(b);
                });

              const filtered = septPosts.filter(p => {
                const isPub = p.status === 'published' || p.status === 'Published';
                if (calFilter === 'scheduled') return !isPub;
                if (calFilter === 'published') return isPub;
                return true;
              });

              const pubCount = septPosts.filter(p => p.status === 'published' || p.status === 'Published').length;
              const schedCount = septPosts.filter(p => p.status === 'Scheduled').length;

              return (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#080b12] p-2 rounded-xl border border-white/[0.05]">
                    {/* Filter Pills */}
                    <div className="flex items-center gap-1">
                      {[
                        { id: 'all', label: `All September (${septPosts.length})` },
                        { id: 'scheduled', label: `Upcoming Queue (${schedCount})` },
                        { id: 'published', label: `Published (${pubCount})` }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setCalFilter(tab.id)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                            calFilter === tab.id
                              ? 'bg-slate-800 text-white border border-white/10 shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* View Switcher */}
                    <div className="flex items-center gap-1 bg-[#111625] p-1 rounded-lg border border-white/[0.06]">
                      <button
                        onClick={() => setCalView('grid')}
                        className={`text-xs font-medium px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                          calView === 'grid' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>▦</span> Grid View
                      </button>
                      <button
                        onClick={() => setCalView('table')}
                        className={`text-xs font-medium px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                          calView === 'table' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>☰</span> List View
                      </button>
                    </div>
                  </div>

                  {/* Grid View */}
                  {calView === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filtered.length === 0 ? (
                        <p className="col-span-full py-12 text-center text-slate-500 italic text-xs">No posts matching this filter.</p>
                      ) : (
                        filtered.map((p, idx) => {
                          const isPub = p.status === 'published' || p.status === 'Published';
                          const dayMatch = (p.file_name || '').match(/Sep(\d+)/i);
                          const dayNumber = dayMatch ? dayMatch[1] : (p.scheduled_for ? new Date(p.scheduled_for).getUTCDate() : (idx + 1));
                          const cleanTitle = p.yt_title || p.file_name?.replace(/^[0-9]+_[A-Za-z0-9]+_/, '').replace(/\.[^/.]+$/, '').replace(/_/g, ' ');

                          return (
                            <div key={p.id || idx} className="bg-[#101522] border border-white/[0.06] hover:border-white/[0.14] rounded-xl p-4 flex flex-col justify-between gap-3 transition-all">
                              <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold text-slate-200 bg-white/[0.06] border border-white/[0.08] px-2.5 py-1 rounded-md">
                                    Sep {String(dayNumber).padStart(2, '0')}
                                  </span>

                                  {isPub ? (
                                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Published
                                    </span>
                                  ) : (
                                    <span className="text-[11px] font-medium text-slate-400 bg-slate-800/80 border border-white/[0.06] px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Scheduled · 09:30 AM
                                    </span>
                                  )}
                                </div>

                                <h3 className="font-semibold text-white text-xs leading-relaxed line-clamp-2">
                                  {cleanTitle}
                                </h3>

                                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 bg-black/20 p-2 rounded-lg border border-white/[0.04]">
                                  <span className="text-slate-500">📄</span>
                                  <span className="truncate">{p.file_name}</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.05]">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pc(p.profile) }}></div>
                                  <span className="text-[11px] font-medium text-slate-400">{pl(p.profile)}</span>
                                </div>

                                {!isPub && (
                                  <button
                                    onClick={async () => {
                                      if (!window.confirm(`Publish "${p.file_name}" to LinkedIn right now?`)) return;
                                      try {
                                        await fetch('https://n8n-production-29f31.up.railway.app/webhook/publisher', {
                                          method: 'POST',
                                          headers: { 'Content-Type': 'application/json' },
                                          body: JSON.stringify({
                                            profile: p.profile || 'socialninja',
                                            platform: 'linkedin_carousel',
                                            topic: p.yt_title,
                                            fileName: p.file_name,
                                            source: 'crm_calendar_trigger'
                                          })
                                        });
                                        alert('🚀 Dispatched! Post will appear on LinkedIn in ~30s.');
                                        await loadAllData();
                                      } catch (e) {
                                        alert('Trigger error: ' + (e as Error).message);
                                      }
                                    }}
                                    className="text-[11px] font-medium text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/[0.2] px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5"
                                  >
                                    <span>🚀</span> Publish Now
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* Table View */}
                  {calView === 'table' && (
                    <div className="bg-[#101522] border border-white/[0.06] rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#0c101a] border-b border-white/[0.06] text-slate-400 text-[11px] font-semibold">
                          <tr>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Post Title & Angle</th>
                            <th className="py-3 px-4">PDF Document</th>
                            <th className="py-3 px-4">Channel</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                          {filtered.map((p, idx) => {
                            const isPub = p.status === 'published' || p.status === 'Published';
                            const dayMatch = (p.file_name || '').match(/Sep(\d+)/i);
                            const dayNumber = dayMatch ? dayMatch[1] : (p.scheduled_for ? new Date(p.scheduled_for).getUTCDate() : (idx + 1));
                            const cleanTitle = p.yt_title || p.file_name?.replace(/^[0-9]+_[A-Za-z0-9]+_/, '').replace(/\.[^/.]+$/, '').replace(/_/g, ' ');

                            return (
                              <tr key={p.id || idx} className="hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4 font-semibold text-slate-200 whitespace-nowrap">
                                  Sep {String(dayNumber).padStart(2, '0')}
                                </td>
                                <td className="py-3 px-4 font-medium text-white max-w-xs truncate">
                                  {cleanTitle}
                                </td>
                                <td className="py-3 px-4 text-slate-400 font-mono text-[11px] max-w-[180px] truncate">
                                  {p.file_name}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pc(p.profile) }}></span>
                                    {pl(p.profile)}
                                  </span>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  {isPub ? (
                                    <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                      Published
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-medium text-slate-400 bg-slate-800 border border-white/[0.06] px-2 py-0.5 rounded-full">
                                      Scheduled (09:30 AM)
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                  {!isPub && (
                                    <button
                                      onClick={async () => {
                                        if (!window.confirm(`Publish "${p.file_name}" to LinkedIn right now?`)) return;
                                        try {
                                          await fetch('https://n8n-production-29f31.up.railway.app/webhook/publisher', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                              profile: p.profile || 'socialninja',
                                              platform: 'linkedin_carousel',
                                              topic: p.yt_title,
                                              fileName: p.file_name,
                                              source: 'crm_calendar_trigger'
                                            })
                                          });
                                          alert('🚀 Dispatched to LinkedIn!');
                                          await loadAllData();
                                        } catch (e) {
                                          alert('Error: ' + (e as Error).message);
                                        }
                                      }}
                                      className="text-[11px] font-medium text-slate-300 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] px-2.5 py-1 rounded transition-colors"
                                    >
                                      Publish Now
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Upcoming Lead Pipeline Agenda */}
            <div className="space-y-3 pt-5 border-t border-white/[0.06]">
              <h3 className="text-xs font-semibold text-slate-400">Scheduled Inbound Discovery & Follow-ups</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {leads.filter(l => l.next_follow_up).length === 0 ? (
                  <p className="col-span-full py-6 text-center text-slate-500 italic text-xs">No pending client discovery calls scheduled.</p>
                ) : (
                  leads.filter(l => l.next_follow_up).map((l, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#101522] border border-white/[0.05] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-medium text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
                          Lead Discovery
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">{fmtDate(l.next_follow_up)}</span>
                      </div>
                      <div className="font-semibold text-white text-xs">{l.name}</div>
                      <p className="text-[11px] text-slate-400 truncate">{l.company || l.email}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 10. TEAM & ROLES */}
        {activeTab === 'team' && (
          <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Users size={18} className="text-purple-400" /> Team Permissions & Role Allocation
                </h2>
                <p className="text-xs text-slate-400">Manage internal operator privileges and security permissions</p>
              </div>
              <button
                onClick={() => setShowAddMember(true)}
                className="bg-purple-600 hover:opacity-90 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/20"
              >
                <Plus size={14} /> + Add Team Member
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(ROLES).map(([key, roleInfo]) => (
                <div key={key} className="p-4 rounded-xl bg-[#121929] border border-white/[0.05] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold" style={{ color: roleInfo.color }}>{roleInfo.label}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">{roleInfo.tabs.length} Modules</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {roleInfo.tabs.map(tb => (
                      <span key={tb} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {tb}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
              {teamMembers.length === 0 ? (
                <p className="col-span-full py-8 text-center text-slate-500 italic">No external operators registered.</p>
              ) : (
                teamMembers.map(m => (
                  <div key={m.id} className="p-4 rounded-xl bg-[#121929] border border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 font-extrabold flex items-center justify-center">
                        {(m.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">{m.name}</div>
                        <div className="text-[11px] text-slate-400">{m.email}</div>
                        <span className="text-[9px] font-bold text-purple-400 capitalize">{m.role || 'Member'}</span>
                      </div>
                    </div>
                    <button
                      onClick={async () => {
                        await supabase.from('team_members').update({ active: !m.active }).eq('id', m.id);
                        await loadAllData();
                      }}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${m.active !== false ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}
                    >
                      {m.active !== false ? 'Active' : 'Suspended'}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>

      {/* ── MODALS ───────────────────────────────────────────────────── */}

      {/* ADD LEAD MODAL */}
      {showAddLead && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-white/[0.1] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus size={16} className="text-sky-400" /> Record Inbound Prospect Lead
              </h3>
              <button onClick={() => setShowAddLead(false)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <form onSubmit={e => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              handleSaveLead({
                name: fd.get('name'),
                email: fd.get('email'),
                phone: fd.get('phone'),
                company: fd.get('company'),
                source: fd.get('source'),
                status: fd.get('status'),
                message: fd.get('message'),
                next_follow_up: fd.get('next_follow_up') || null,
                follow_up_notes: fd.get('follow_up_notes') || null
              });
            }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input name="name" placeholder="Contact Full Name *" required className="bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white" />
                <input name="email" type="email" placeholder="Business Email *" required className="bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input name="phone" placeholder="Phone Number" className="bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white" />
                <input name="company" placeholder="Company / Brand Website" className="bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input name="source" placeholder="Channel Source (IG DM, LinkedIn, Referral)" className="bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white" />
                <select name="status" className="bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white">
                  {Object.keys(LEAD_STATUS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 block mb-1">CALL DATE</label>
                  <input name="next_follow_up" type="date" className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 block mb-1">CALL AGENDA</label>
                  <input name="follow_up_notes" placeholder="Discovery agenda..." className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>
              <textarea name="message" placeholder="Prospect inquiry notes & scope..." rows={3} className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white" />
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowAddLead(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20">Save Prospect</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK SCHEDULE MODAL */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-white/[0.1] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CalendarIcon size={16} className="text-purple-400" /> Schedule Discovery Call
              </h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">Select Prospect</label>
                <select
                  value={scheduleLeadId}
                  onChange={e => setScheduleLeadId(e.target.value)}
                  className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white"
                >
                  <option value="">-- Choose target lead --</option>
                  {leads.map(l => <option key={l.id} value={l.id}>{l.name} ({l.company || l.email})</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={e => setScheduleDate(e.target.value)}
                  className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">Meeting Agenda</label>
                <textarea
                  value={scheduleNotes}
                  onChange={e => setScheduleNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. 15-minute qualification demo for organic growth engine"
                  className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button onClick={() => setShowScheduleModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">Cancel</button>
                <button onClick={handleScheduleSubmit} className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/20">Schedule Call</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FIT NINJA MANAGE MODAL */}
      {manageFitStatus && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-white/[0.1] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Dumbbell size={16} className="text-amber-400" /> Manage Member Access
              </h3>
              <button onClick={() => setManageFitStatus(null)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">Subscription Tier</label>
              <select
                value={newFitStatus}
                onChange={e => setNewFitStatus(e.target.value)}
                className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white"
              >
                <option value="premium">Premium (Full Unlimited Access)</option>
                <option value="free">Free (Onboarding Quiz Only)</option>
                <option value="suspended">Suspended</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button onClick={() => setManageFitStatus(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">Cancel</button>
              <button onClick={handleSaveFitStatus} className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-600/20">Save Status</button>
            </div>
          </div>
        </div>
      )}

      {/* FIT NINJA FULL DETAILS MODAL */}
      {viewFitClientDetails && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-white/[0.1] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Dumbbell size={18} className="text-amber-400" /> {viewFitClientDetails.name || 'Anonymous User'}
              </h3>
              <button onClick={() => setViewFitClientDetails(null)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-[#121929] p-4 rounded-xl border border-white/[0.06]">
              <div><span className="text-slate-400">Email:</span> <b className="text-white">{viewFitClientDetails.email}</b></div>
              <div><span className="text-slate-400">Goal:</span> <b className="text-white capitalize">{viewFitClientDetails.assessment_data?.goal || 'General Fitness'}</b></div>
              <div><span className="text-slate-400">Daily Energy:</span> <b className="text-emerald-400">{viewFitClientDetails.generated_plan?.kcal || '—'} kcal</b></div>
              <div><span className="text-slate-400">Protein Target:</span> <b className="text-amber-400">{viewFitClientDetails.generated_plan?.protein || '—'}g</b></div>
              <div><span className="text-slate-400">Carbohydrates:</span> <b className="text-sky-400">{viewFitClientDetails.generated_plan?.carbs || '—'}g</b></div>
              <div><span className="text-slate-400">Fats:</span> <b className="text-rose-400">{viewFitClientDetails.generated_plan?.fats || '—'}g</b></div>
            </div>
            {viewFitClientDetails.assessment_data && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Onboarding Assessment Responses</h4>
                <div className="bg-[#121929] p-4 rounded-xl border border-white/[0.06] font-mono text-[11px] text-slate-300 max-h-60 overflow-y-auto whitespace-pre-wrap">
                  {JSON.stringify(viewFitClientDetails.assessment_data, null, 2)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADD TEAM MEMBER MODAL */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-white/[0.1] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users size={16} className="text-purple-400" /> Add Team Member
              </h3>
              <button onClick={() => setShowAddMember(false)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <form onSubmit={async e => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              await supabase.from('team_members').insert([{
                name: fd.get('name'),
                email: fd.get('email'),
                role: fd.get('role'),
                active: true,
                created_at: new Date().toISOString()
              }]);
              setShowAddMember(false);
              await loadAllData();
            }} className="space-y-3">
              <input name="name" placeholder="Member Full Name *" required className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white" />
              <input name="email" type="email" placeholder="Email Address *" required className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white" />
              <select name="role" className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-3 text-xs text-white">
                {Object.entries(ROLES).map(([k, r]) => <option key={k} value={k}>{r.label}</option>)}
              </select>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowAddMember(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/20">Add Operator</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
