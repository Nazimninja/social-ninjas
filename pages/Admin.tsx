import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, Trash2, Save, X, Lock, Mail, Phone, Globe, Building, Calendar as CalendarIcon, 
  Check, Shield, Activity, Dumbbell, Sparkles, User, Search, Filter, 
  Edit3, Clock, ChevronLeft, ChevronRight, UserPlus, FileText, CheckCircle2, 
  AlertCircle, PlusCircle, Share2, Video, Eye, Users, Layers, ExternalLink,
  Flame, CheckSquare, Copy, RefreshCw, Send, CheckCircle, ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';
import { supabase } from './supabase';
import { getApiUrl } from '../services/api';

// ── Design Tokens & Palettes ─────────────────────────────────────────
const C = {
  bg: '#07090e',
  surface: '#0d1322',
  surfaceHi: '#131b30',
  surfaceCard: '#0f172a',
  border: '#1e293b',
  borderHi: '#334155',
  steel: '#37649B',
  blue: '#5B8FD4',
  blueLight: '#8CB4DC',
  white: '#EDF2FA',
  muted: '#64748b',
  dim: '#475569',
  green: '#22c55e',
  red: '#ef4444',
  amber: '#f59e0b',
  pink: '#ec4899',
  purple: '#a855f7',
  teal: '#14b8a6',
  orange: '#f97316'
};

const PROFILES = [
  { id: 'socialninja', label: 'Social Ninjas', color: '#f97316', tag: 'Agency' },
  { id: 'nazim_ninja', label: 'Nazim Ninja', color: '#38bdf8', tag: 'Personal' },
  { id: '9thgear_', label: '9th Gear', color: '#fbbf24', tag: 'Supercars' },
  { id: 'vicevault.gg', label: 'Vice Vault', color: '#f43f5e', tag: 'Gaming/GTA' },
];

const ROLES: Record<string, { label: string, color: string, tabs: string[] }> = {
  founder: { label: 'Founder & CEO', color: '#a855f7', tabs: ['tasks', 'crm', 'clients', 'fit', 'publish', 'scripts', 'queue', 'monitor', 'calendar', 'blogs', 'team'] },
  content: { label: 'Content Lead', color: '#38bdf8', tabs: ['tasks', 'publish', 'scripts', 'queue', 'blogs', 'calendar'] },
  sales: { label: 'Growth & Sales', color: '#22c55e', tabs: ['tasks', 'crm', 'clients', 'calendar'] },
  client: { label: 'Account Manager', color: '#fbbf24', tabs: ['tasks', 'clients', 'fit', 'calendar'] },
};

const ALL_TABS = [
  { id: 'tasks', label: 'Daily Ops', icon: CheckSquare, badge: 'Daily' },
  { id: 'crm', label: 'Inbound Leads', icon: Mail, badge: 'Pipeline' },
  { id: 'clients', label: 'Client Workspaces', icon: Building, badge: 'Studio' },
  { id: 'fit', label: 'Fit Ninja Members', icon: Dumbbell, badge: 'SaaS' },
  { id: 'publish', label: 'Multi-Publisher', icon: Share2, badge: 'Social' },
  { id: 'scripts', label: 'Script Vault', icon: FileText, badge: 'Content' },
  { id: 'queue', label: 'Media Queue', icon: Video, badge: 'Drive' },
  { id: 'monitor', label: 'Radar Monitor', icon: Eye, badge: 'Web' },
  { id: 'calendar', label: 'Master Calendar', icon: CalendarIcon, badge: 'Schedule' },
  { id: 'blogs', label: 'SEO Blog Studio', icon: Edit3, badge: 'Articles' },
  { id: 'team', label: 'Team & Roles', icon: Users, badge: 'Access' },
];

const TASK_TEMPLATE = [
  { id: 'sn_ig', block: 'morning', label: 'Post Reel — Social Ninjas', brand: 'socialninja', tab: 'publish' },
  { id: 'nn_ig', block: 'morning', label: 'Post Reel — Nazim Ninja', brand: 'nazim_ninja', tab: 'publish' },
  { id: '9g_ig', block: 'morning', label: 'Post Reel — 9th Gear', brand: '9thgear_', tab: 'publish' },
  { id: 'vv_ig', block: 'morning', label: 'Post Reel — Vice Vault', brand: 'vicevault.gg', tab: 'publish' },
  { id: 'li_post', block: 'morning', label: 'Post Thought Leadership — LinkedIn', brand: 'nazim_ninja', tab: 'publish' },
  { id: 'dms', block: 'morning', label: 'Inbox Zero: Reply all DMs across 4 brands', brand: null, tab: null },
  { id: 'li_cmts', block: 'engage', label: '5 High-Value LinkedIn Comments on ICP founders', brand: null, tab: null },
  { id: 'ig_cmts', block: 'engage', label: '10 Instagram interactions on trending target reels', brand: null, tab: null },
  { id: 'comp', block: 'engage', label: 'Audit & engage on 3 competitor accounts', brand: null, tab: null },
  { id: 'cold', block: 'outreach', label: '5 Personalized Cold DMs for Agency Retainer', brand: 'socialninja', tab: 'crm' },
  { id: 'fu', block: 'outreach', label: 'Execute all scheduled follow-ups in CRM', brand: null, tab: 'crm' },
  { id: 'film', block: 'content', label: 'Film batch: 2 Short-form reels', brand: null, tab: null },
  { id: 'drive', block: 'content', label: 'Upload raw footage to Video Queue Drive', brand: null, tab: 'queue' },
];

const BLOCK_META: Record<string, { label: string, time: string, color: string, icon: string }> = {
  morning: { label: 'Morning Launch', time: '30 min', color: '#38bdf8', icon: '⚡' },
  engage: { label: 'Social Engagement', time: '20 min', color: '#22c55e', icon: '💬' },
  outreach: { label: 'Growth Outreach', time: '15 min', color: '#f59e0b', icon: '🎯' },
  content: { label: 'Production Engine', time: '45 min', color: '#a855f7', icon: '🎬' },
};

const XPROMO = [
  { label: 'Social Ninjas → Nazim Ninja', sub: "'Our founder @nazim_ninja built this automation system'", color: '#f97316' },
  { label: 'Nazim Ninja → Social Ninjas', sub: "'My agency @socialninja.s scales brands to $100k/mo'", color: '#38bdf8' },
  { label: '9th Gear → Vice Vault', sub: "'Real life version of this GTA 6 hypercar 👀 @vicevault.gg'", color: '#fbbf24' },
  { label: 'Vice Vault → 9th Gear', sub: "'GTA fans — this exists in Bangalore IRL @9thgear_'", color: '#f43f5e' },
];

const LEAD_STATUS_CONFIG: Record<string, { label: string, color: string, bg: string, border: string }> = {
  'NEW LEAD': { label: 'New Lead', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  'CONTACTED': { label: 'Contacted', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  'DEMO SCHEDULED': { label: 'Demo Scheduled', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  'PROPOSAL SENT': { label: 'Proposal Sent', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  'WON': { label: 'Won 🎉', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  'LOST': { label: 'Lost', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
};

const pc = (id: string) => PROFILES.find(p => p.id === id)?.color || '#38bdf8';
const pl = (id: string) => PROFILES.find(p => p.id === id)?.label || id;
const todayKey = () => new Date().toDateString();
const fmtDate = (d?: string | null) => d ? new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : '—';
const fmtTime = (d?: string | null) => d ? new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
const doy = () => Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);

export const Admin: React.FC = () => {
  // ── Tab & Global States ─────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<string>('tasks');
  const [userRole, setUserRole] = useState<string>('founder');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // ── Database Resource Datasets ───────────────────────────────────────
  const [leads, setLeads] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [fitClients, setFitClients] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [scripts, setScripts] = useState<any[]>([]);
  const [queueItems, setQueueItems] = useState<any[]>([]);
  const [mentions, setMentions] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  // ── Modal & Form States ──────────────────────────────────────────────
  const [showAddLead, setShowAddLead] = useState<boolean>(false);
  const [showAddClient, setShowAddClient] = useState<boolean>(false);
  const [showAddMember, setShowAddMember] = useState<boolean>(false);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [viewFitClientDetails, setViewFitClientDetails] = useState<any>(null);
  const [manageFitStatus, setManageFitStatus] = useState<any>(null);
  const [newFitStatus, setNewFitStatus] = useState<string>('free');
  const [viewClientHist, setViewClientHist] = useState<any>(null);
  const [clientHistData, setClientHistData] = useState<any[]>([]);
  const [openScriptId, setOpenScriptId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // ── Quick Scheduling State ───────────────────────────────────────────
  const [scheduleTargetType, setScheduleTargetType] = useState<'lead' | 'client'>('lead');
  const [scheduleTargetId, setScheduleTargetId] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [scheduleNotes, setScheduleNotes] = useState<string>('');

  // ── Daily Checklist Task State ──────────────────────────────────────
  const taskKey = `nazim_os_done_${todayKey()}`;
  const [doneTasks, setDoneTasks] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(taskKey) || '[]'); } catch { return []; }
  });

  const toggleTask = (id: string) => {
    const next = doneTasks.includes(id) ? doneTasks.filter(x => x !== id) : [...doneTasks, id];
    setDoneTasks(next);
    try { localStorage.setItem(taskKey, JSON.stringify(next)); } catch {}
  };

  // ── Blog Editor State ────────────────────────────────────────────────
  const [isEditingBlog, setIsEditingBlog] = useState<boolean>(false);
  const [currentBlog, setCurrentBlog] = useState({ id: '', title: '', content: '', excerpt: '', author: "Social Ninja's Team", category: 'Insights' });

  // ── Publisher State ──────────────────────────────────────────────────
  const [pubProfile, setPubProfile] = useState<string>('socialninja');
  const [pubPlatform, setPubPlatform] = useState<string>('instagram');
  const [pubTopic, setPubTopic] = useState<string>('');
  const [pubSchedMode, setPubSchedMode] = useState<boolean>(false);
  const [pubSchedDate, setPubSchedDate] = useState<string>('');
  const [pubSchedTime, setPubSchedTime] = useState<string>('09:00');
  const [pubStatus, setPubStatus] = useState<string | null>(null);

  // ── Master Loader ────────────────────────────────────────────────────
  const loadAllData = useCallback(async () => {
    setRefreshing(true);
    try {
      const [
        leadsRes, clientsRes, fitRes, postsRes, scriptsRes, queueRes, mentionsRes, teamRes, blogsRes
      ] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('content_studio_clients').select('*').order('created_at', { ascending: false }),
        fetch(getApiUrl('/api/fit-clients')).then(r => r.json()).catch(() => []),
        supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('scripts').select('*').order('created_at', { ascending: false }),
        supabase.from('scheduled_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('mentions').select('*').eq('dismissed', false).order('created_at', { ascending: false }),
        supabase.from('team_members').select('*').order('created_at', { ascending: false }),
        fetch(getApiUrl('/api/data?resource=blogs')).then(r => r.json()).catch(() => [])
      ]);

      if (leadsRes.data) setLeads(leadsRes.data);
      if (clientsRes.data) setClients(clientsRes.data);
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

  // ── Action Handlers ──────────────────────────────────────────────────
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

  const handleSaveClient = async (clientForm: any) => {
    setLoading(true);
    const payload = {
      ...clientForm,
      active: clientForm.active !== false,
      join_date: clientForm.join_date || new Date().toISOString()
    };
    if (clientForm.id) {
      await supabase.from('content_studio_clients').update(payload).eq('id', clientForm.id);
    } else {
      await supabase.from('content_studio_clients').insert([payload]);
    }
    setShowAddClient(false);
    await loadAllData();
  };

  const handleToggleClient = async (id: string, currentActive: boolean) => {
    await supabase.from('content_studio_clients').update({ active: !currentActive }).eq('id', id);
    setClients(prev => prev.map(c => c.id === id ? { ...c, active: !currentActive } : c));
  };

  const handleViewClientHistory = async (client: any) => {
    setViewClientHist(client);
    try {
      const res = await fetch(getApiUrl(`/api/data?resource=history&clientId=${client.id}`));
      const data = await res.json();
      setClientHistData(Array.isArray(data) ? data : []);
    } catch {
      setClientHistData([]);
    }
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
    if (!scheduleTargetId) return alert('Select a lead or client to schedule');
    if (scheduleTargetType === 'lead') {
      await supabase.from('leads').update({
        next_follow_up: scheduleDate,
        follow_up_notes: scheduleNotes || 'Scheduled from Master Calendar'
      }).eq('id', scheduleTargetId);
    } else {
      await supabase.from('content_studio_clients').update({
        next_follow_up: scheduleDate,
        notes: scheduleNotes || 'Scheduled client review from Master Calendar'
      }).eq('id', scheduleTargetId);
    }
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
    setPubStatus('done');
    setPubTopic('');
    setPubSchedDate('');
    setTimeout(() => setPubStatus(null), 3000);
    await loadAllData();
  };

  // ── Computed Metrics & Filters ───────────────────────────────────────
  const totalTasks = TASK_TEMPLATE.length;
  const completedTasksCount = doneTasks.filter(id => TASK_TEMPLATE.some(t => t.id === id)).length;
  const taskProgressPct = Math.round((completedTasksCount / totalTasks) * 100);

  const todayStr = new Date().toISOString().split('T')[0];
  const followupsToday = [
    ...leads.filter(l => (l.next_follow_up || l.nextFollowUp || '').startsWith(todayStr)),
    ...clients.filter(c => (c.next_follow_up || c.nextFollowUp || '').startsWith(todayStr))
  ];

  const wonLeadsCount = leads.filter(l => (l.status || '').toUpperCase() === 'WON').length;
  const activeClientsCount = clients.filter(c => c.active !== false).length;
  const premiumFitCount = fitClients.filter(f => f.plan_status === 'premium').length;

  const currentXpromo = XPROMO[doy() % 4];
  const allowedTabs = ROLES[userRole]?.tabs || ROLES.founder.tabs;
  const visibleTabs = ALL_TABS.filter(t => allowedTabs.includes(t.id));

  // Global search filtering
  const filteredLeads = leads.filter(l => 
    (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.company || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClients = clients.filter(c =>
    (c.brand_name || c.brandName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.niche || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFitClients = fitClients.filter(f =>
    (f.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (f.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (f.assessment_data?.goal || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-brand-primary/30 antialiased pb-20">
      <SEO title="Nazim OS 3.0 | Executive Agency Command Deck" description="Master Management Dashboard" />

      {/* ── TOP COCKPIT BAR ───────────────────────────────────────────── */}
      <header className="border-b border-slate-800/80 bg-[#0c101b]/95 backdrop-blur-xl sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Operating Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-brand-primary to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-primary/20 border border-white/10">
              🥷
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-wide text-white flex items-center gap-2">
                <span>NAZIM OS</span>
                <span className="text-[10px] bg-gradient-to-r from-brand-primary/20 to-purple-500/20 text-brand-primary border border-brand-primary/30 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">
                  v3.0 PRO
                </span>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Enterprise Growth & Operations Deck</p>
            </div>
          </div>

          {/* Global Fuzzy Search */}
          <div className="hidden md:flex items-center flex-1 max-w-sm relative">
            <Search size={14} className="absolute left-3 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search leads, brands, fit users, posts..."
              className="w-full bg-[#121929] border border-slate-800 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary transition-colors"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-2.5 text-slate-500 hover:text-white">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Master Action Triggers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <CalendarIcon size={14} /> <span className="hidden sm:inline">+ Schedule</span>
            </button>

            <button
              onClick={() => setShowAddLead(true)}
              className="bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 border border-sky-500/30 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <UserPlus size={14} /> <span className="hidden sm:inline">+ Lead</span>
            </button>

            <button
              onClick={() => setShowAddClient(true)}
              className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus size={14} /> <span className="hidden sm:inline">+ Client</span>
            </button>

            <button
              onClick={loadAllData}
              disabled={refreshing}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors text-xs"
              title="Refresh All Database Streams"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin text-brand-primary' : ''} />
            </button>
          </div>
        </div>
      </header>

      {/* ── METRICS DASHBOARD CARDS ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Leads Stat Card */}
          <div 
            onClick={() => setActiveTab('crm')}
            className="cursor-pointer bg-gradient-to-br from-[#0e1628] to-[#0a101d] border border-slate-800/90 hover:border-sky-500/50 p-4 rounded-2xl transition-all shadow-lg hover:shadow-sky-500/5 group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider group-hover:text-sky-400 transition-colors">Inbound Leads</span>
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Mail size={16} />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">{leads.length}</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {wonLeadsCount} Won
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Active pipeline prospects</p>
          </div>

          {/* Client Workspaces Stat Card */}
          <div 
            onClick={() => setActiveTab('clients')}
            className="cursor-pointer bg-gradient-to-br from-[#0e1628] to-[#0a101d] border border-slate-800/90 hover:border-emerald-500/50 p-4 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/5 group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider group-hover:text-emerald-400 transition-colors">Client Brands</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Building size={16} />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">{clients.length}</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {activeClientsCount} Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Content Studio Workspaces</p>
          </div>

          {/* Fit Ninja Stat Card */}
          <div 
            onClick={() => setActiveTab('fit')}
            className="cursor-pointer bg-gradient-to-br from-[#0e1628] to-[#0a101d] border border-slate-800/90 hover:border-amber-500/50 p-4 rounded-2xl transition-all shadow-lg hover:shadow-amber-500/5 group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider group-hover:text-amber-400 transition-colors">Fit Ninja Users</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Dumbbell size={16} />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">{fitClients.length}</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {premiumFitCount} Pro
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Personal Training SaaS</p>
          </div>

          {/* Follow-up & Agenda Stat Card */}
          <div 
            onClick={() => setActiveTab('calendar')}
            className="cursor-pointer bg-gradient-to-br from-[#0e1628] to-[#0a101d] border border-slate-800/90 hover:border-purple-500/50 p-4 rounded-2xl transition-all shadow-lg hover:shadow-purple-500/5 group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider group-hover:text-purple-400 transition-colors">Today's Agenda</span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Clock size={16} />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">{followupsToday.length}</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Action Req.
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Follow-ups & calls today</p>
          </div>

        </div>
      </div>

      {/* ── HORIZONTAL NAVIGATION TABS ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-[#0b101c] border border-slate-800/90 rounded-2xl p-1.5 flex gap-1.5 overflow-x-auto shadow-xl scrollbar-none">
          {visibleTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-primary to-orange-500 text-white shadow-lg shadow-brand-primary/20 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{tab.label}</span>
                {tab.id === 'crm' && leads.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {leads.length}
                  </span>
                )}
                {tab.id === 'fit' && fitClients.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {fitClients.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN CONTENT WORKSPACE ────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* 1. DAILY OPS & CHECKLIST */}
        {activeTab === 'tasks' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Daily Progress Card */}
              <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight">
                      {completedTasksCount}/{totalTasks} Core Operations Completed
                    </h2>
                    <p className="text-xs text-slate-400">
                      {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className={`text-2xl font-black ${taskProgressPct === 100 ? 'text-emerald-400' : taskProgressPct > 50 ? 'text-sky-400' : 'text-amber-400'}`}>
                    {taskProgressPct}%
                  </div>
                </div>

                <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-brand-primary via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${taskProgressPct}%` }}
                  />
                </div>
                {taskProgressPct === 100 && (
                  <div className="mt-3 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> All operations complete for today. Ready for scale.
                  </div>
                )}
              </div>

              {/* Task Checklist Blocks */}
              {(['morning', 'engage', 'outreach', 'content'] as const).map(block => {
                const meta = BLOCK_META[block];
                const blockTasks = TASK_TEMPLATE.filter(t => t.block === block);
                const blockDoneCount = blockTasks.filter(t => doneTasks.includes(t.id)).length;

                return (
                  <div key={block} className="bg-[#0e1424] border border-slate-800/80 rounded-2xl p-5 shadow-lg space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{meta.icon}</span>
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-200" style={{ color: meta.color }}>
                          {meta.label}
                        </h3>
                        <span className="text-[11px] text-slate-500 font-medium">· {meta.time}</span>
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
                                ? 'bg-slate-900/60 border-emerald-500/20 opacity-60'
                                : 'bg-[#121929] border-slate-800/80 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${
                                isDone ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-700 bg-slate-800 text-transparent'
                              }`}>
                                ✓
                              </div>
                              <span className={`text-xs font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                {t.label}
                              </span>
                              {t.brand && (
                                <span 
                                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                                  style={{ backgroundColor: `${pc(t.brand)}15`, color: pc(t.brand), borderColor: `${pc(t.brand)}30` }}
                                >
                                  {pl(t.brand)}
                                </span>
                              )}
                            </div>

                            {t.tab && !isDone && (
                              <button
                                onClick={e => { e.stopPropagation(); setActiveTab(t.tab!); }}
                                className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-sky-500/10 px-2 py-1 rounded-lg border border-sky-500/20"
                              >
                                Go →
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
              <div className="bg-[#0e1424] border border-orange-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">🔥 Active Cross-Promo Angle</div>
                <div className="text-sm font-bold text-white mb-2">{currentXpromo.label}</div>
                <div className="text-xs text-slate-300 italic mb-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  {currentXpromo.sub}
                </div>
                <p className="text-[11px] text-slate-400">Rule: Every 4th reel must mention a sister brand to compound network reach.</p>
              </div>

              {/* Algorithm Quick Notes */}
              <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Activity size={14} className="text-sky-400" /> Platform Algorithm Directives
                </h3>
                <div className="space-y-2.5 text-xs text-slate-400">
                  <div className="flex gap-2 items-start"><span className="text-sm">📸</span><span>IG Reels: Best reach when posted in first 90m of waking.</span></div>
                  <div className="flex gap-2 items-start"><span className="text-sm">💬</span><span>Engage on 5 comments within 60 mins of publishing.</span></div>
                  <div className="flex gap-2 items-start"><span className="text-sm">💼</span><span>LinkedIn: Drop genuine comment on target CMOs before posting.</span></div>
                  <div className="flex gap-2 items-start"><span className="text-sm">▶️</span><span>YT Shorts: 3–5 high-hook videos weekly per profile.</span></div>
                </div>
              </div>

              {/* 4 Brand Network Stack */}
              <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">4-Brand Ecosystem</h3>
                <div className="grid gap-2">
                  {PROFILES.map(pr => (
                    <div key={pr.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pr.color }}></div>
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
          <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Mail size={18} className="text-sky-400" /> Inbound Lead Pipeline
                </h2>
                <p className="text-xs text-slate-400">Track, qualify, and convert agency client inquiries</p>
              </div>
              <button
                onClick={() => setShowAddLead(true)}
                className="bg-brand-primary hover:opacity-90 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md"
              >
                <Plus size={15} /> + Add Lead
              </button>
            </div>

            {/* Pipeline Stage Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {Object.keys(LEAD_STATUS_CONFIG).map(st => {
                const conf = LEAD_STATUS_CONFIG[st];
                const count = leads.filter(l => (l.status || '').toUpperCase() === st).length;
                return (
                  <div key={st} className={`p-3 rounded-xl border text-center ${conf.bg} ${conf.border}`}>
                    <div className={`text-xl font-black ${conf.color}`}>{count}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{conf.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Leads Table List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pr-4">Prospect</th>
                    <th className="pb-3 pr-4">Company & Source</th>
                    <th className="pb-3 pr-4">Pipeline Status</th>
                    <th className="pb-3 pr-4">Next Follow-Up</th>
                    <th className="pb-3 pr-4">Received</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
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
                        <tr key={lead.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-3.5 pr-4">
                            <div className="font-bold text-white text-sm">{lead.name || 'Anonymous'}</div>
                            <div className="text-slate-400 text-[11px]">{lead.email} · {lead.phone || 'No phone'}</div>
                          </td>
                          <td className="py-3.5 pr-4">
                            <div className="font-semibold text-slate-200">{lead.company || lead.website || 'Direct Client'}</div>
                            <div className="text-[11px] text-slate-500">{lead.source || 'Website'}</div>
                          </td>
                          <td className="py-3.5 pr-4">
                            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border uppercase ${conf.bg} ${conf.color} ${conf.border}`}>
                              {conf.label}
                            </span>
                          </td>
                          <td className="py-3.5 pr-4">
                            {lead.next_follow_up ? (
                              <div className="text-amber-400 font-bold">
                                📅 {fmtDate(lead.next_follow_up)}
                                <div className="text-[10px] text-slate-500 font-normal truncate max-w-[140px]">{lead.follow_up_notes || 'Scheduled call'}</div>
                              </div>
                            ) : (
                              <span className="text-slate-600 italic">Not scheduled</span>
                            )}
                          </td>
                          <td className="py-3.5 pr-4 text-slate-400">
                            {fmtDate(lead.created_at)}
                          </td>
                          <td className="py-3.5 text-right">
                            <div className="flex gap-1.5 justify-end">
                              <button
                                onClick={() => {
                                  setScheduleTargetType('lead');
                                  setScheduleTargetId(lead.id);
                                  setShowScheduleModal(true);
                                }}
                                className="p-1.5 bg-purple-500/10 hover:bg-purple-600 text-purple-300 hover:text-white rounded-lg transition-colors text-xs font-bold"
                                title="Schedule Call"
                              >
                                <CalendarIcon size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white rounded-lg transition-colors text-xs"
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

        {/* 3. CLIENT WORKSPACES */}
        {activeTab === 'clients' && (
          <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Building size={18} className="text-emerald-400" /> Content Studio Client Workspaces
                </h2>
                <p className="text-xs text-slate-400">Manage client brand voices, retainers, and content generation histories</p>
              </div>
              <button
                onClick={() => setShowAddClient(true)}
                className="bg-emerald-600 hover:opacity-90 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md"
              >
                <Plus size={15} /> + Add Client Workspace
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClients.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-500 italic">
                  No client workspaces found. Click "+ Add Client Workspace" to set up a brand.
                </div>
              ) : (
                filteredClients.map(client => (
                  <div 
                    key={client.id}
                    className={`bg-[#121929] border rounded-2xl p-5 space-y-4 transition-all ${
                      client.active !== false ? 'border-slate-800/90 hover:border-emerald-500/40' : 'border-rose-500/30 opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-extrabold text-white text-base">{client.brand_name || client.brandName}</h3>
                        <p className="text-xs text-slate-400">{client.niche || 'General Business'}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        client.active !== false ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        {client.active !== false ? 'Active' : 'Suspended'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div><span className="text-slate-500">Plan:</span> <span className="font-semibold text-brand-primary">{client.plan_name || client.planName || 'Growth Plan'}</span></div>
                      <div><span className="text-slate-500">Email:</span> {client.email || '—'}</div>
                      <div><span className="text-slate-500">Target:</span> {client.target_audience || client.targetAudience || '—'}</div>
                      <div><span className="text-slate-500">Tone:</span> {client.tone_of_voice || client.toneOfVoice || 'Authoritative & Inspiring'}</div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => handleViewClientHistory(client)}
                        className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-sky-500/10 px-2.5 py-1.5 rounded-lg border border-sky-500/20"
                      >
                        <FileText size={13} /> View History
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleClient(client.id, client.active !== false)}
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors ${
                            client.active !== false ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-600 hover:text-white'
                          }`}
                        >
                          {client.active !== false ? 'Suspend' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 4. FIT NINJA MEMBERS (SAAS APP INTEGRATION) */}
        {activeTab === 'fit' && (
          <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Dumbbell size={18} className="text-amber-400" /> Fit Ninja Member Accounts & Nutrition Engine
                </h2>
                <p className="text-xs text-slate-400">Live synchronized database from fit.socialninjas.in</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Total: {fitClients.length}</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {premiumFitCount} Paid Subscribers
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pr-4">User</th>
                    <th className="pb-3 pr-4">Fitness Goal</th>
                    <th className="pb-3 pr-4">Plan Status</th>
                    <th className="pb-3 pr-4">Daily Targets</th>
                    <th className="pb-3 pr-4">Joined</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {filteredFitClients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 italic">
                        No Fit Ninja profiles found.
                      </td>
                    </tr>
                  ) : (
                    filteredFitClients.map(fit => (
                      <tr key={fit.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-3.5 pr-4">
                          <div className="font-bold text-white text-sm">{fit.name || 'Anonymous User'}</div>
                          <div className="text-slate-400 text-[11px]">{fit.email}</div>
                        </td>
                        <td className="py-3.5 pr-4 font-semibold text-slate-300 capitalize">
                          {fit.assessment_data?.goal?.replace('_', ' ') || 'General Fitness'}
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase border ${
                            fit.plan_status === 'premium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                            {fit.plan_status || 'free'}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 text-slate-300">
                          {fit.generated_plan ? (
                            <span className="font-bold text-emerald-400">{fit.generated_plan.kcal} kcal · {fit.generated_plan.protein}g protein</span>
                          ) : (
                            <span className="text-slate-600 italic">Not generated</span>
                          )}
                        </td>
                        <td className="py-3.5 pr-4 text-slate-400">
                          {fit.created_at ? new Date(fit.created_at).toLocaleDateString('en-IN') : '—'}
                        </td>
                        <td className="py-3.5 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button
                              onClick={() => setViewFitClientDetails(fit)}
                              className="bg-sky-500/10 hover:bg-sky-600 text-sky-400 hover:text-white px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => {
                                setManageFitStatus(fit);
                                setNewFitStatus(fit.plan_status || 'free');
                              }}
                              className="bg-amber-500/10 hover:bg-amber-600 text-amber-400 hover:text-white px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
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
            <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-5">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Share2 size={18} className="text-brand-primary" /> Multi-Brand Fast Publisher
              </h2>

              {/* Brand Selector */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Select Brand Profile</label>
                <div className="grid grid-cols-2 gap-2">
                  {PROFILES.map(pr => (
                    <button
                      key={pr.id}
                      onClick={() => setPubProfile(pr.id)}
                      className={`p-3 rounded-xl border text-left font-bold text-xs flex items-center gap-2.5 transition-all ${
                        pubProfile === pr.id
                          ? 'border-white bg-slate-800 text-white shadow-md'
                          : 'border-slate-800 bg-[#121929] text-slate-400 hover:border-slate-700'
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
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Destination Platform</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'instagram', label: 'Instagram Reels', icon: '📸', ready: true },
                    { id: 'youtube', label: 'YouTube Shorts', icon: '▶️', ready: true },
                    { id: 'both', label: 'IG + YT Sync', icon: '📡', ready: true },
                    { id: 'linkedin', label: 'LinkedIn Post', icon: '💼', ready: true },
                  ].map(pl => (
                    <button
                      key={pl.id}
                      onClick={() => setPubPlatform(pl.id)}
                      className={`p-3 rounded-xl border text-left font-bold text-xs flex items-center gap-2.5 transition-all ${
                        pubPlatform === pl.id
                          ? 'border-sky-500 bg-sky-500/10 text-white'
                          : 'border-slate-800 bg-[#121929] text-slate-400 hover:border-slate-700'
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
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Content Angle / Topic Prompt</label>
                <textarea
                  value={pubTopic}
                  onChange={e => setPubTopic(e.target.value)}
                  rows={3}
                  placeholder="e.g. How top UAE real estate agencies automate 500 leads/day using AI"
                  className="w-full bg-[#121929] border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary"
                />
              </div>

              {/* Schedule Mode Switcher */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">📅 Schedule for Future Slot</div>
                  <div className="text-[10px] text-slate-400">Post automatically at optimal engagement hour</div>
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
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">DATE</label>
                    <input
                      type="date"
                      value={pubSchedDate}
                      onChange={e => setPubSchedDate(e.target.value)}
                      className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">TIME</label>
                    <input
                      type="time"
                      value={pubSchedTime}
                      onChange={e => setPubSchedTime(e.target.value)}
                      className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handlePublishPost}
                className="w-full bg-gradient-to-r from-brand-primary to-orange-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:opacity-95 transition-opacity text-xs"
              >
                {pubStatus === 'posting' ? '⏳ Dispatching...' : pubStatus === 'done' ? '✅ Logged to Queue!' : pubSchedMode ? '📅 Schedule Post Entry' : '📡 Dispatch to Publisher'}
              </button>
            </div>

            {/* Live Feed of Output Logs */}
            <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3">
                Live Production Feed ({posts.length} Posts)
              </h3>
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {posts.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-10 text-center">No recent post dispatch logs found.</p>
                ) : (
                  posts.map(p => (
                    <div key={p.id} className="p-3.5 rounded-xl bg-[#121929] border border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pc(p.profile) }}></div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{pl(p.profile)}</span>
                            <span className="text-[10px] text-slate-400 capitalize">→ {p.platform}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{p.file_name || p.yt_title}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{fmtDate(p.created_at)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 6. SCRIPT VAULT */}
        {activeTab === 'scripts' && (
          <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <FileText size={18} className="text-purple-400" /> Automated Video Script Vault
                </h2>
                <p className="text-xs text-slate-400">Pre-hooked scripts and captions for YouTube Shorts & Instagram Reels</p>
              </div>
              <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/20">
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
                  <div key={sc.id} className="bg-[#121929] border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border" style={{ backgroundColor: `${pc(sc.profile)}15`, color: pc(sc.profile), borderColor: `${pc(sc.profile)}30` }}>
                          {pl(sc.profile)}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">{sc.status || 'Ready'}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm">{sc.topic}</h3>
                      <p className="text-xs text-sky-400 font-semibold">🎬 {sc.yt_title}</p>
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                        <span className="text-amber-400 font-bold">🪝 Hook: </span>{sc.hook}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
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
                      <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-2 max-h-60 overflow-y-auto">
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
          <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Video size={18} className="text-pink-400" /> Media & Video Production Queue
              </h2>
              <p className="text-xs text-slate-400">Raw and finished video assets ready for multi-platform delivery</p>
            </div>

            <div className="grid gap-3">
              {queueItems.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-12 text-center">No videos queued. Drop reels in your Drive folders to populate.</p>
              ) : (
                queueItems.map(item => (
                  <div key={item.id} className="p-4 rounded-xl bg-[#121929] border border-slate-800 flex items-center justify-between gap-4">
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

        {/* 8. RADAR MONITOR */}
        {activeTab === 'monitor' && (
          <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
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
                  <div key={m.id} className="p-5 rounded-2xl bg-[#121929] border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 uppercase">{m.platform || 'Web'}</span>
                        <span className="text-[10px] font-semibold text-slate-400">{m.keyword}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{fmtDate(m.created_at)}</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">{m.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{m.body}</p>

                    {m.suggested_reply && (
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-sky-300">
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

        {/* 9. MASTER AGENCY CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <CalendarIcon size={18} className="text-purple-400" /> Master Agency Work Calendar
                </h2>
                <p className="text-xs text-slate-400">Integrated schedule of lead demos, client review check-ins, and scheduled content</p>
              </div>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="bg-purple-600 hover:opacity-90 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Plus size={14} /> + Schedule Event
              </button>
            </div>

            {/* Upcoming Agenda Feed */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Scheduled Actions & Pipeline Calls</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  ...leads.filter(l => l.next_follow_up).map(l => ({ type: 'Lead', name: l.name, sub: l.company || l.email, date: l.next_follow_up, notes: l.follow_up_notes })),
                  ...clients.filter(c => c.next_follow_up).map(c => ({ type: 'Client', name: c.brand_name || c.brandName, sub: c.niche || c.email, date: c.next_follow_up, notes: c.notes })),
                  ...queueItems.filter(q => q.scheduled_for).map(q => ({ type: 'Post', name: pl(q.profile), sub: q.topic || q.file_name, date: q.scheduled_for, notes: q.platform }))
                ].length === 0 ? (
                  <p className="col-span-full py-10 text-center text-slate-500 italic">No calendar follow-ups or posts scheduled.</p>
                ) : (
                  [
                    ...leads.filter(l => l.next_follow_up).map(l => ({ type: 'Lead Follow-up', name: l.name, sub: l.company || l.email, date: l.next_follow_up, notes: l.follow_up_notes, color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' })),
                    ...clients.filter(c => c.next_follow_up).map(c => ({ type: 'Client Check-in', name: c.brand_name || c.brandName, sub: c.niche || c.email, date: c.next_follow_up, notes: c.notes, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' })),
                    ...queueItems.filter(q => q.scheduled_for).map(q => ({ type: 'Content Slot', name: pl(q.profile), sub: q.topic || q.file_name, date: q.scheduled_for, notes: q.platform, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' }))
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#121929] border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${item.color}`}>
                          {item.type}
                        </span>
                        <span className="text-xs font-bold text-amber-400">📅 {fmtDate(item.date)}</span>
                      </div>
                      <div className="font-bold text-white text-sm">{item.name}</div>
                      <p className="text-xs text-slate-400">{item.sub}</p>
                      {item.notes && <p className="text-[11px] text-slate-500 italic bg-slate-900/60 p-2 rounded-lg">{item.notes}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 10. SEO BLOG STUDIO */}
        {activeTab === 'blogs' && (
          <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Edit3 size={18} className="text-brand-primary" /> SEO Insights & Article Studio
                </h2>
                <p className="text-xs text-slate-400">Publish high-ranking marketing guides and case studies directly to socialninjas.in/blog</p>
              </div>
              <button
                onClick={() => {
                  setCurrentBlog({ id: '', title: '', content: '', excerpt: '', author: "Social Ninja's Team", category: 'Insights' });
                  setIsEditingBlog(true);
                }}
                className="bg-brand-primary hover:opacity-90 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Plus size={14} /> + New Article
              </button>
            </div>

            {isEditingBlog ? (
              <div className="space-y-4 bg-[#121929] border border-slate-800 p-5 rounded-2xl">
                <input
                  type="text"
                  placeholder="Article Headline"
                  value={currentBlog.title}
                  onChange={e => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                  className="w-full bg-[#0b101c] border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-primary"
                />
                <textarea
                  placeholder="Short excerpt summary for cards..."
                  value={currentBlog.excerpt}
                  onChange={e => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                  rows={2}
                  className="w-full bg-[#0b101c] border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-primary"
                />
                <textarea
                  placeholder="Full Markdown Content Body (# Heading, ## Section, bullet points, CTA links)..."
                  value={currentBlog.content}
                  onChange={e => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                  rows={10}
                  className="w-full bg-[#0b101c] border border-slate-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-brand-primary"
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
                    className="px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-bold"
                  >
                    Save & Publish Article
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-3">
                {blogs.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-12 text-center">No articles found.</p>
                ) : (
                  blogs.map(blog => (
                    <div key={blog.id} className="p-4 rounded-xl bg-[#121929] border border-slate-800 flex items-center justify-between gap-4">
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

        {/* 11. TEAM & ROLES */}
        {activeTab === 'team' && (
          <div className="bg-[#0e1424] border border-slate-800/90 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Users size={18} className="text-purple-400" /> Agency Team Members & Security Privileges
                </h2>
                <p className="text-xs text-slate-400">Configure role-based access control and dashboard permissions</p>
              </div>
              <button
                onClick={() => setShowAddMember(true)}
                className="bg-purple-600 hover:opacity-90 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Plus size={14} /> + Add Team Member
              </button>
            </div>

            {/* Role privilege matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(ROLES).map(([key, roleInfo]) => (
                <div key={key} className="p-4 rounded-xl bg-[#121929] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: roleInfo.color }}>{roleInfo.label}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">{roleInfo.tabs.length} Tabs</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {roleInfo.tabs.map(tb => (
                      <span key={tb} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {tb}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Team Roster */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              {teamMembers.length === 0 ? (
                <p className="col-span-full py-8 text-center text-slate-500 italic">No external team members added yet.</p>
              ) : (
                teamMembers.map(m => (
                  <div key={m.id} className="p-4 rounded-xl bg-[#121929] border border-slate-800 flex items-center justify-between">
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus size={16} className="text-sky-400" /> Add Inbound Prospect Lead
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
                <input name="name" placeholder="Full Name *" required className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                <input name="email" type="email" placeholder="Email *" required className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input name="phone" placeholder="Phone Number" className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                <input name="company" placeholder="Company / Brand" className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input name="source" placeholder="Source (e.g. IG DM, LinkedIn)" className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                <select name="status" className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                  {Object.keys(LEAD_STATUS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">NEXT FOLLOW-UP</label>
                  <input name="next_follow_up" type="date" className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">FOLLOW-UP NOTE</label>
                  <input name="follow_up_notes" placeholder="Call agenda..." className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2 text-xs text-white" />
                </div>
              </div>
              <textarea name="message" placeholder="Client inquiry details & notes..." rows={3} className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowAddLead(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CLIENT WORKSPACE MODAL */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building size={16} className="text-emerald-400" /> Create Client Workspace
              </h3>
              <button onClick={() => setShowAddClient(false)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <form onSubmit={e => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              handleSaveClient({
                brand_name: fd.get('brand_name'),
                niche: fd.get('niche'),
                email: fd.get('email'),
                phone: fd.get('phone'),
                plan_name: fd.get('plan_name'),
                tone_of_voice: fd.get('tone_of_voice'),
                target_audience: fd.get('target_audience'),
                call_to_action: fd.get('call_to_action'),
                active: true
              });
            }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input name="brand_name" placeholder="Brand Name *" required className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                <input name="niche" placeholder="Niche (e.g. Luxury Fashion) *" required className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input name="email" type="email" placeholder="Billing Email" className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                <input name="phone" placeholder="Contact Phone" className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input name="plan_name" placeholder="Plan (e.g. Growth Retainer)" className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                <input name="call_to_action" placeholder="Default CTA (e.g. Book Demo)" className="bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <textarea name="tone_of_voice" placeholder="Brand Voice & Personality Guidelines..." rows={2} className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              <textarea name="target_audience" placeholder="Ideal Customer Profile / Target Audience..." rows={2} className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowAddClient(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">Create Workspace</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK SCHEDULE MODAL */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CalendarIcon size={16} className="text-purple-400" /> Schedule Agency Event / Call
              </h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Target Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setScheduleTargetType('lead'); setScheduleTargetId(''); }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${scheduleTargetType === 'lead' ? 'bg-sky-500/20 border-sky-500 text-sky-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                  >
                    Inbound Lead
                  </button>
                  <button
                    onClick={() => { setScheduleTargetType('client'); setScheduleTargetId(''); }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${scheduleTargetType === 'client' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                  >
                    Client Workspace
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Select Prospect / Brand</label>
                <select
                  value={scheduleTargetId}
                  onChange={e => setScheduleTargetId(e.target.value)}
                  className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="">-- Choose target --</option>
                  {scheduleTargetType === 'lead' ? (
                    leads.map(l => <option key={l.id} value={l.id}>{l.name} ({l.company || l.email})</option>)
                  ) : (
                    clients.map(c => <option key={c.id} value={c.id}>{c.brand_name || c.brandName}</option>)
                  )}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={e => setScheduleDate(e.target.value)}
                  className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Agenda / Notes</label>
                <textarea
                  value={scheduleNotes}
                  onChange={e => setScheduleNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Discovery demo call to close retainer"
                  className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button onClick={() => setShowScheduleModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">Cancel</button>
                <button onClick={handleScheduleSubmit} className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold">Schedule Event</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FIT NINJA MANAGE MODAL */}
      {manageFitStatus && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Dumbbell size={16} className="text-amber-400" /> Manage Member Status
              </h3>
              <button onClick={() => setManageFitStatus(null)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Subscription Tier</label>
              <select
                value={newFitStatus}
                onChange={e => setNewFitStatus(e.target.value)}
                className="w-full bg-[#121929] border border-slate-800 rounded-xl p-3 text-xs text-white"
              >
                <option value="premium">Premium (Full Unlimited Access)</option>
                <option value="free">Free (Onboarding Only)</option>
                <option value="suspended">Suspended</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button onClick={() => setManageFitStatus(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">Cancel</button>
              <button onClick={handleSaveFitStatus} className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold">Save Status</button>
            </div>
          </div>
        </div>
      )}

      {/* FIT NINJA FULL DETAILS MODAL */}
      {viewFitClientDetails && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Dumbbell size={18} className="text-amber-400" /> {viewFitClientDetails.name || 'Anonymous User'}
              </h3>
              <button onClick={() => setViewFitClientDetails(null)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-[#121929] p-4 rounded-xl border border-slate-800">
              <div><span className="text-slate-500">Email:</span> <b className="text-white">{viewFitClientDetails.email}</b></div>
              <div><span className="text-slate-500">Goal:</span> <b className="text-white capitalize">{viewFitClientDetails.assessment_data?.goal || 'General Fitness'}</b></div>
              <div><span className="text-slate-500">Calories:</span> <b className="text-emerald-400">{viewFitClientDetails.generated_plan?.kcal || '—'} kcal</b></div>
              <div><span className="text-slate-500">Protein:</span> <b className="text-amber-400">{viewFitClientDetails.generated_plan?.protein || '—'}g</b></div>
              <div><span className="text-slate-500">Carbs:</span> <b className="text-sky-400">{viewFitClientDetails.generated_plan?.carbs || '—'}g</b></div>
              <div><span className="text-slate-500">Fats:</span> <b className="text-rose-400">{viewFitClientDetails.generated_plan?.fats || '—'}g</b></div>
            </div>
            {viewFitClientDetails.assessment_data && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Onboarding Assessment Responses</h4>
                <div className="bg-[#121929] p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 max-h-60 overflow-y-auto whitespace-pre-wrap">
                  {JSON.stringify(viewFitClientDetails.assessment_data, null, 2)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CLIENT GENERATION HISTORY MODAL */}
      {viewClientHist && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText size={18} className="text-sky-400" /> {viewClientHist.brand_name || viewClientHist.brandName} · Generated Posts History
              </h3>
              <button onClick={() => setViewClientHist(null)} className="text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              {clientHistData.length === 0 ? (
                <div className="text-slate-500 italic text-center py-8">No historical content logs recorded for this client.</div>
              ) : (
                clientHistData.map((h: any, idx: number) => (
                  <div key={idx} className="bg-[#121929] p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-white text-xs flex justify-between">
                      <span>Week {h.week || idx + 1}</span>
                      <span className="text-slate-400 font-normal">{h.date}</span>
                    </div>
                    <div className="text-slate-300 font-mono text-[11px] bg-[#0b101c] p-3 rounded-lg max-h-48 overflow-y-auto whitespace-pre-wrap">
                      {JSON.stringify(h.posts || h, null, 2)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADD TEAM MEMBER MODAL */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1424] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
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
              <input name="name" placeholder="Member Name *" required className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              <input name="email" type="email" placeholder="Email Address *" required className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              <select name="role" className="w-full bg-[#121929] border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                {Object.entries(ROLES).map(([k, r]) => <option key={k} value={k}>{r.label}</option>)}
              </select>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowAddMember(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
