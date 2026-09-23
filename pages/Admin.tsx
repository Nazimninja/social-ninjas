import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, Trash2, X, Mail, Phone, Calendar as CalendarIcon, 
  Dumbbell, Sparkles, User, Search, Filter, 
  Edit3, Clock, UserPlus, FileText, CheckCircle2, 
  Share2, Video, Eye, Users, RefreshCw, Send, 
  CheckSquare, Copy, ArrowUpRight, Flame, Layers,
  TrendingUp, Compass, ChevronRight, Zap, Target, Bookmark, Star,
  ExternalLink, ArrowRight, ShieldCheck, Check, ChevronDown, MessageSquare, AlertCircle, Info, Globe, Instagram, List, Activity
} from 'lucide-react';
import SEO from '../components/SEO';
import { supabase } from './supabase';
import { getApiUrl } from '../services/api';

// ── Multi-Brand Ecosystem Configuration ──────────────────────────────
const PROFILES = [
  { id: 'nazim_ninja', label: 'Nazim Ninja', color: '#38bdf8', tag: 'Personal Founder' },
  { id: 'socialninja', label: 'Social Ninjas', color: '#f97316', tag: 'Agency HQ' },
  { id: '9thgear_', label: '9th Gear', color: '#fbbf24', tag: 'Supercar Media' },
  { id: 'vicevault.gg', label: 'Vice Vault', color: '#f43f5e', tag: 'Gaming Hub' },
];

const ROLES: Record<string, { label: string, color: string, tabs: string[] }> = {
  founder: { label: 'Founder & CEO', color: '#c084fc', tabs: ['tasks', 'crm', 'fit', 'publish', 'scripts', 'calendar', 'meetings', 'monitor', 'team'] },
  content: { label: 'Content Lead', color: '#38bdf8', tabs: ['tasks', 'publish', 'scripts', 'calendar'] },
  sales: { label: 'Growth Lead', color: '#34d399', tabs: ['tasks', 'crm', 'meetings'] },
};

const ALL_TABS = [
  { id: 'tasks', label: 'Mission Control', icon: Zap },
  { id: 'crm', label: 'Inbound Leads', icon: Mail },
  { id: 'fit', label: 'Fit Ninja SaaS', icon: Dumbbell },
  { id: 'publish', label: 'Fast Publisher', icon: Share2 },
  { id: 'scripts', label: 'Viral Script Vault', icon: FileText },
  { id: 'calendar', label: 'Content Calendar', icon: CalendarIcon },
  { id: 'meetings', label: 'Meetings & Calls', icon: Clock },
  { id: 'monitor', label: 'Brand Radar', icon: Eye },
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

const BLOCK_META: Record<string, { label: string, time: string, color: string, icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  morning: { label: 'Morning Launch Protocol', time: '30m', color: 'text-sky-400', icon: Zap },
  engage: { label: 'Network Engagement', time: '20m', color: 'text-emerald-400', icon: MessageSquare },
  outreach: { label: 'Revenue & Lead Pipeline', time: '25m', color: 'text-amber-400', icon: Target },
  content: { label: 'Media & SEO Engine', time: '45m', color: 'text-purple-400', icon: Video },
};

const XPROMO = [
  { label: 'Social Ninjas ➔ Nazim Ninja', sub: "Tag @nazim_ninja in automation breakdowns as technical founder.", color: '#f97316' },
  { label: 'Nazim Ninja ➔ Social Ninjas', sub: "Reference @socialninja.s in bio/captions as scaling agency engine.", color: '#38bdf8' },
  { label: '9th Gear ➔ Vice Vault', sub: "Show real-life hypercars mirroring GTA 6 models @vicevault.gg.", color: '#fbbf24' },
  { label: 'Vice Vault ➔ 9th Gear', sub: "Direct gaming fans to IRL automotive content @9thgear_.", color: '#f43f5e' },
];

export interface PipelineStageConfig {
  id: string;
  label: string;
  color: string;
  bg: string;
  border: string;
}

export const PIPELINE_STAGES: PipelineStageConfig[] = [
  { id: 'New Inbound', label: 'New Inbound', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  { id: 'In Dialogue', label: 'In Dialogue', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  { id: 'Call Scheduled', label: 'Call Scheduled', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { id: 'Proposal Sent', label: 'Proposal Sent', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { id: 'Closed Deal', label: 'Closed Deal', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { id: 'Nurture Later', label: 'Nurture Later', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
  { id: 'Lost', label: 'Lost', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
];

export const normalizeLeadStatus = (rawStatus?: string | null): string => {
  if (!rawStatus) return 'New Inbound';
  const s = rawStatus.trim().toLowerCase();
  if (s === 'new lead' || s === 'new inbound' || s === 'new' || s === 'inbound') return 'New Inbound';
  if (s === 'in dialogue' || s === 'contacted' || s === 'dialogue') return 'In Dialogue';
  if (s === 'call scheduled' || s === 'demo scheduled' || s === 'call' || s === 'meeting') return 'Call Scheduled';
  if (s === 'proposal sent' || s === 'proposal') return 'Proposal Sent';
  if (s === 'closed deal' || s === 'won' || s === 'closed' || s === 'closed deal 🎉' || s === 'paid pro member') return 'Closed Deal';
  if (s === 'nurture later' || s === 'nurture') return 'Nurture Later';
  if (s === 'lost') return 'Lost';
  return rawStatus;
};

const LEAD_STATUS_CONFIG: Record<string, { label: string, color: string, bg: string, border: string }> = {
  'New Inbound': { label: 'New Inbound', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  'In Dialogue': { label: 'In Dialogue', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  'Call Scheduled': { label: 'Call Scheduled', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  'Proposal Sent': { label: 'Proposal Sent', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  'Closed Deal': { label: 'Closed Deal', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  'Nurture Later': { label: 'Nurture Later', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
  'Lost': { label: 'Lost', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
  
  // Legacy mappings for backwards compatibility
  'NEW LEAD': { label: 'New Inbound', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  'CONTACTED': { label: 'In Dialogue', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  'DEMO SCHEDULED': { label: 'Call Scheduled', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  'PROPOSAL SENT': { label: 'Proposal Sent', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  'WON': { label: 'Closed Deal', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  'PAID PRO MEMBER': { label: 'Closed Deal', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  'LOST': { label: 'Nurture Later', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
};

export interface ParsedLeadNotes {
  icpScore: string | null;
  signal: string | null;
  reasoning: string | null;
  suggestedOpener: string | null;
  activityLog: string[];
  rawRemaining: string | null;
}

export const parseLeadNotes = (notesText?: string | null): ParsedLeadNotes => {
  if (!notesText) {
    return { icpScore: null, signal: null, reasoning: null, suggestedOpener: null, activityLog: [], rawRemaining: null };
  }
  const icpMatch = notesText.match(/\[ICP Score:\s*([^\]]+)\]/i);
  const icpScore = icpMatch ? icpMatch[1].trim() : null;
  const signalMatch = notesText.match(/\[Signal:\s*([^\]]+)\]/i);
  const signal = signalMatch ? signalMatch[1].trim() : null;
  let suggestedOpener: string | null = null;
  // Strict parser: strictly captures ONLY the prospect DM message, stopping at any internal metadata
  const openerMatch = notesText.match(/Suggested Opener:\s*([\s\S]+?)(?=\n\s*(?:\[ICP Score|Reasoning:|Suggested Opener:|\[Outreach|\[Message|\[Activity|$)|\s*$)/i);
  if (openerMatch) {
    let clean = openerMatch[1].trim();
    clean = clean.split(/\n\s*\[ICP Score/i)[0].trim();
    clean = clean.split(/\n\s*Reasoning:/i)[0].trim();
    clean = clean.split(/\n\s*Suggested Opener:/i)[0].trim();
    suggestedOpener = clean;
  }
  let reasoning: string | null = null;
  const reasoningMatch = notesText.match(/Reasoning:\s*([\s\S]+?)(?=\n\s*(?:Suggested Opener:|\[ICP Score|\[Outreach|\[Message|\[Activity|$))/i);
  if (reasoningMatch) reasoning = reasoningMatch[1].trim();
  
  // Extract outreach / message history logs
  const activityMatches = notesText.match(/\[(?:Outreach|Message|Activity)[^\]]+\](?:\s*:\s*"[^"]*"|[^\n]+)?/gi) || [];

  let rawRemaining: string | null = null;
  if (!icpScore && !signal && !suggestedOpener && !reasoning && activityMatches.length === 0) rawRemaining = notesText;
  return { icpScore, signal, reasoning, suggestedOpener, activityLog: activityMatches, rawRemaining };
};

const pc = (id: string) => PROFILES.find(p => p.id === id || p.label === id || p.id.toLowerCase() === id?.toLowerCase() || p.label.toLowerCase() === id?.toLowerCase())?.color || '#38bdf8';
const pl = (id: string) => PROFILES.find(p => p.id === id || p.label === id || p.id.toLowerCase() === id?.toLowerCase() || p.label.toLowerCase() === id?.toLowerCase())?.label || id;
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
  const [fitFilter, setFitFilter] = useState<'all' | 'paid' | 'unpaid' | 'active' | 'inactive'>('all');
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

  // ── Lead Detail & Pipeline States ───────────────────────────────────
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [editedOpener, setEditedOpener] = useState<string>('');
  const [copiedOpener, setCopiedOpener] = useState<boolean>(false);
  const [savedOpenerFeedback, setSavedOpenerFeedback] = useState<boolean>(false);
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<string | null>(null);
  const [leadFollowUpFilter, setLeadFollowUpFilter] = useState<'all' | 'scheduled' | 'overdue'>('all');
  const [detailFollowUpDate, setDetailFollowUpDate] = useState<string>('');
  const [detailFollowUpNotes, setDetailFollowUpNotes] = useState<string>('');
  const [saveLeadStatusFeedback, setSaveLeadStatusFeedback] = useState<'saving' | 'saved' | 'error' | null>(null);
  const [logChannel, setLogChannel] = useState<string>('instagram');
  const [logMessageText, setLogMessageText] = useState<string>('');

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
  const [scriptFilter, setScriptFilter] = useState<string>('all');
  const [calFilter, setCalFilter] = useState<string>('all');
  const [calView, setCalView] = useState<'grid' | 'table'>('grid');

  // ── Master Loader ───────────────────────────────────────────────────
  const loadAllData = useCallback(async () => {
    setRefreshing(true);
    try {
      // 1. Parallel fetch with resilient direct Supabase fallbacks
      const [
        leadsRes, fitRes, postsRes, scriptsRes, queueRes, mentionsRes, teamRes, blogsRes
      ] = await Promise.all([
        fetch(getApiUrl('/api/data?resource=leads')).then(r => r.ok ? r.json() : null).catch(() => null),
        fetch(getApiUrl('/api/fit-clients')).then(r => r.ok ? r.json() : null).catch(() => null),
        supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(100),
        fetch(getApiUrl('/api/data?resource=scripts')).then(r => r.ok ? r.json() : null).catch(() => null),
        supabase.from('scheduled_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('mentions').select('*').eq('dismissed', false).order('created_at', { ascending: false }),
        supabase.from('team_members').select('*').order('created_at', { ascending: false }),
        fetch(getApiUrl('/api/data?resource=blogs')).then(r => r.ok ? r.json() : null).catch(() => null)
      ]);

      // Leads: API or direct Supabase fallback
      let rawLeads: any[] = [];
      if (Array.isArray(leadsRes)) {
        rawLeads = leadsRes;
      } else if (Array.isArray(leadsRes?.data)) {
        rawLeads = leadsRes.data;
      }

      if (rawLeads.length === 0) {
        try {
          const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
          if (Array.isArray(data) && data.length > 0) rawLeads = data;
        } catch (_) {}
      }

      if (Array.isArray(rawLeads)) {
        // Smart deduplication: group by website or clean email or company name
        const dedupedMap = new Map<string, any>();
        for (const l of rawLeads) {
          const key = (l.website || (l.email && !l.email.includes('@instagram.lead') && !l.email.includes('@reddit.lead') ? l.email : '') || l.name || l.id).toLowerCase().trim();
          if (!dedupedMap.has(key)) {
            dedupedMap.set(key, { ...l });
          } else {
            const existing = dedupedMap.get(key);
            const exStatus = normalizeLeadStatus(existing.status);
            const currStatus = normalizeLeadStatus(l.status);
            
            // Prefer touched/progressed status over 'New Inbound'
            if (exStatus === 'New Inbound' && currStatus !== 'New Inbound') {
              existing.status = l.status;
            }
            if (!existing.next_follow_up && l.next_follow_up) {
              existing.next_follow_up = l.next_follow_up;
              existing.follow_up_notes = l.follow_up_notes;
            }
            if (l.notes && (!existing.notes || !existing.notes.includes(l.notes))) {
              existing.notes = existing.notes ? `${existing.notes}\n\n${l.notes}` : l.notes;
            }
          }
        }
        setLeads(Array.from(dedupedMap.values()));
      }

      // Fit Ninja Members: API or direct Supabase fallback
      let rawFit: any[] = [];
      if (Array.isArray(fitRes)) {
        rawFit = fitRes;
      } else {
        try {
          const { data } = await supabase.from('content_studio_clients').select('*').order('created_at', { ascending: false });
          if (Array.isArray(data)) rawFit = data;
        } catch (_) {}
      }
      setFitClients(rawFit);
      if (postsRes.data) setPosts(postsRes.data);
      
      const rawScripts = Array.isArray(scriptsRes) ? scriptsRes : (scriptsRes?.data || []);
      if (Array.isArray(rawScripts)) {
        // Filter only real content scripts, excluding Fit Ninja internal app sync data
        setScripts(rawScripts.filter((s: any) => !s.profile?.startsWith('fitninja_') && (s.hook || s.topic)));
      }
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
    try {
      await fetch(getApiUrl('/api/data?resource=leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (_) {
      if (leadForm.id) {
        await supabase.from('leads').update(payload).eq('id', leadForm.id);
      } else {
        await supabase.from('leads').insert([payload]);
      }
    }
    setShowAddLead(false);
    await loadAllData();
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Delete this lead from pipeline?')) return;
    try {
      await fetch(getApiUrl(`/api/data?resource=leads&id=${id}`), { method: 'DELETE' });
    } catch (_) {
      await supabase.from('leads').delete().eq('id', id);
    }
    setLeads(prev => prev.filter(l => l.id !== id));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(null);
    }
  };

  const handleOpenLeadDetail = (lead: any) => {
    setSelectedLead(lead);
    const parsed = parseLeadNotes(lead.notes);
    setEditedOpener(parsed.suggestedOpener || '');
    setCopiedOpener(false);
    setSavedOpenerFeedback(false);
    setDetailFollowUpDate(lead.next_follow_up ? lead.next_follow_up.split('T')[0] : '');
    setDetailFollowUpNotes(lead.follow_up_notes || '');
  };

  // ── Centralized Robust Lead Update Helper ────────────────────────────
  const updateLeadData = async (leadId: string, partialUpdates: Record<string, any>): Promise<boolean> => {
    // 1. Optimistic UI update
    setLeads(prev => {
      const target = prev.find(l => l.id === leadId);
      return prev.map(l => {
        const isMatch = l.id === leadId || 
          (target?.website && l.website && target.website.toLowerCase() === l.website.toLowerCase()) ||
          (target?.name && l.name && target.name.toLowerCase() === l.name.toLowerCase());
        return isMatch ? { ...l, ...partialUpdates } : l;
      });
    });
    setSelectedLead((prev: any) => prev && (prev.id === leadId || (prev.website && prev.website === selectedLead?.website)) ? { ...prev, ...partialUpdates } : prev);
    setSaveLeadStatusFeedback('saving');

    try {
      // 2. Call backend /api/data with PATCH (runs with service_role key to bypass Supabase RLS)
      const res = await fetch(getApiUrl(`/api/data?resource=leads&id=${leadId}`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, ...partialUpdates })
      });

      if (!res.ok) {
        // Fallback to POST with _action update
        const postRes = await fetch(getApiUrl('/api/data?resource=leads'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: leadId, _action: 'update', ...partialUpdates })
        });
        if (!postRes.ok) {
          throw new Error(`API update returned ${postRes.status}`);
        }
      }

      setSaveLeadStatusFeedback('saved');
      setTimeout(() => setSaveLeadStatusFeedback(null), 2500);
      return true;
    } catch (err) {
      console.warn('Backend API update failed, trying fallback:', err);
      try {
        const postRes = await fetch(getApiUrl('/api/data?resource=leads'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: leadId, _action: 'update', ...partialUpdates })
        });
        if (postRes.ok) {
          setSaveLeadStatusFeedback('saved');
          setTimeout(() => setSaveLeadStatusFeedback(null), 2500);
          return true;
        }
        await supabase.from('leads').update(partialUpdates).eq('id', leadId);
        setSaveLeadStatusFeedback('saved');
        setTimeout(() => setSaveLeadStatusFeedback(null), 2500);
        return true;
      } catch (sbErr) {
        console.error('All lead update attempts failed:', sbErr);
        setSaveLeadStatusFeedback('error');
        setTimeout(() => setSaveLeadStatusFeedback(null), 3500);
        return false;
      }
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: string, e?: React.MouseEvent | React.ChangeEvent) => {
    if (e) e.stopPropagation();
    await updateLeadData(leadId, { status: newStatus });
  };

  const handleUpdateLeadFollowUp = async (leadId: string, date: string | null, notes: string | null) => {
    await updateLeadData(leadId, {
      next_follow_up: date,
      follow_up_notes: notes
    });
  };

  const handleCopyOpener = () => {
    if (!editedOpener) return;
    navigator.clipboard.writeText(editedOpener).catch(() => {});
    setCopiedOpener(true);
    setTimeout(() => setCopiedOpener(false), 2200);
  };

  const handleSaveOpener = async (leadId: string) => {
    if (!selectedLead) return;
    const currentNotes = selectedLead.notes || '';
    let newNotes = currentNotes;
    if (/Suggested Opener:\s*[\s\S]+?(?=\n\s*(?:\[ICP Score|Reasoning:|Suggested Opener:|\[Outreach|\[Message|\[Activity|$)|\s*$)/i.test(currentNotes)) {
      newNotes = currentNotes.replace(/Suggested Opener:\s*[\s\S]+?(?=\n\s*(?:\[ICP Score|Reasoning:|Suggested Opener:|\[Outreach|\[Message|\[Activity|$)|\s*$)/i, `Suggested Opener:\n${editedOpener}`);
    } else {
      newNotes = currentNotes ? `${currentNotes}\n\nSuggested Opener:\n${editedOpener}` : `Suggested Opener:\n${editedOpener}`;
    }

    const ok = await updateLeadData(leadId, { notes: newNotes });
    if (ok) {
      setSavedOpenerFeedback(true);
      setTimeout(() => setSavedOpenerFeedback(false), 2000);
    }
  };

  const handleLogSentMessage = async (leadId: string) => {
    if (!selectedLead) return;
    const msg = (logMessageText || editedOpener || '').trim();
    if (!msg) {
      alert('Please enter message text or use the suggested opener.');
      return;
    }

    const timestamp = new Date().toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const channelLabels: Record<string, string> = {
      instagram: 'Instagram DM',
      whatsapp: 'WhatsApp',
      email: 'Email',
      phone: 'Phone Call',
      linkedin: 'LinkedIn DM'
    };
    const channelLabel = channelLabels[logChannel] || logChannel;
    const logEntry = `[Outreach · ${channelLabel} · ${timestamp}]: "${msg}"`;

    const currentNotes = selectedLead.notes || '';
    const newNotes = currentNotes ? `${currentNotes}\n\n${logEntry}` : logEntry;

    const currentStatus = normalizeLeadStatus(selectedLead.status);
    const updatedStatus = currentStatus === 'New Inbound' ? 'In Dialogue' : selectedLead.status;

    await updateLeadData(leadId, {
      notes: newNotes,
      status: updatedStatus
    });

    setLogMessageText('');
    setSavedOpenerFeedback(true);
    setTimeout(() => setSavedOpenerFeedback(false), 2500);
  };

  const handleSendAndProgress = async (leadId: string) => {
    if (!selectedLead) return;
    const msg = editedOpener.trim();
    const timestamp = new Date().toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const logEntry = msg
      ? `[Outreach · Sent DM · ${timestamp}]: "${msg}"`
      : `[Outreach · Contacted · ${timestamp}]`;

    const currentNotes = selectedLead.notes || '';
    const newNotes = currentNotes ? `${currentNotes}\n\n${logEntry}` : logEntry;

    await updateLeadData(leadId, {
      status: 'In Dialogue',
      notes: newNotes
    });
  };

  const handleSaveDetailFollowUp = async (leadId: string) => {
    const ok = await updateLeadData(leadId, {
      next_follow_up: detailFollowUpDate || null,
      follow_up_notes: detailFollowUpNotes || null
    });
    if (ok) {
      alert('Follow-up scheduled successfully!');
    }
  };

  const handleDeleteScript = async (id: string, topic?: string) => {
    if (!window.confirm(`Delete script "${topic || 'this script'}" after use?`)) return;
    try {
      await fetch(getApiUrl(`/api/data?resource=scripts&id=${id}`), { method: 'DELETE' }).catch(() => {});
      await supabase.from('scripts').delete().eq('id', id);
      setScripts(prev => prev.filter(s => s.id !== id));
    } catch (e) {
      console.error('Failed to delete script:', e);
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
    if (!scheduleLeadId) return alert('Select a lead to schedule');
    await updateLeadData(scheduleLeadId, {
      next_follow_up: scheduleDate,
      follow_up_notes: scheduleNotes || 'Scheduled Discovery Session'
    });
    setShowScheduleModal(false);
    setScheduleNotes('');
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
  const wonLeadsCount = leads.filter(l => normalizeLeadStatus(l.status) === 'Closed Deal').length;
  const premiumFitCount = fitClients.filter(f => f.plan_status === 'premium').length;
  const unpaidFitCount = fitClients.filter(f => f.plan_status !== 'premium').length;
  const activeFitCount = fitClients.filter(f => f.is_active === true).length;
  const inactiveFitCount = fitClients.length - activeFitCount;

  const currentXpromo = XPROMO[doy() % 4];
  const allowedTabs = ROLES[userRole]?.tabs || ROLES.founder.tabs;
  const visibleTabs = ALL_TABS.filter(t => allowedTabs.includes(t.id));

  // Search, Stage & Follow-up filtering for Leads
  const filteredLeads = leads.filter(l => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (l.name || '').toLowerCase().includes(term) ||
      (l.email || '').toLowerCase().includes(term) ||
      (l.company || '').toLowerCase().includes(term) ||
      (l.message || '').toLowerCase().includes(term) ||
      (l.source || '').toLowerCase().includes(term);

    const matchesStage = selectedPipelineStage ? normalizeLeadStatus(l.status) === selectedPipelineStage : true;

    let matchesFollowUp = true;
    if (leadFollowUpFilter === 'scheduled') {
      matchesFollowUp = !!l.next_follow_up;
    } else if (leadFollowUpFilter === 'overdue') {
      matchesFollowUp = !!l.next_follow_up && new Date(l.next_follow_up) < new Date(new Date().setHours(0,0,0,0));
    }

    return matchesSearch && matchesStage && matchesFollowUp;
  });

  const filteredFitClients = fitClients.filter(f => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (f.name || '').toLowerCase().includes(term) ||
      (f.email || '').toLowerCase().includes(term) ||
      (f.assessment_data?.goal || '').toLowerCase().includes(term) ||
      (f.physiological?.goal || '').toLowerCase().includes(term);
    if (!matchesSearch) return false;

    if (fitFilter === 'paid') return f.plan_status === 'premium';
    if (fitFilter === 'unpaid') return f.plan_status !== 'premium';
    if (fitFilter === 'active') return f.is_active === true;
    if (fitFilter === 'inactive') return f.is_active !== true;
    return true;
  });

  const filteredBlogs = blogs.filter(b =>
    (b.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div data-lenis-prevent="true" className="min-h-screen bg-[#06080e] text-slate-100 font-sans selection:bg-brand-primary/30 antialiased pb-28">
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

          {/* September Content Plan Card */}
          <div 
            onClick={() => setActiveTab('calendar')}
            className="cursor-pointer bg-[#0b0f19] border border-white/[0.08] hover:border-white/[0.18] p-5 rounded-2xl transition-all shadow-lg group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">September Content Plan</span>
              <div className="w-7 h-7 rounded-lg bg-white/[0.05] text-slate-300 flex items-center justify-center border border-white/[0.08]">
                <CalendarIcon size={14} />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">{posts.filter(p => p.status === 'Scheduled').length}</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {posts.filter(p => p.status === 'published' || p.status === 'Published').length} Published
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">LinkedIn carousel slots queued</p>
          </div>

          {/* Meetings & Calls Card */}
          <div 
            onClick={() => setActiveTab('meetings')}
            className="cursor-pointer bg-[#0b0f19] border border-white/[0.08] hover:border-white/[0.18] p-5 rounded-2xl transition-all shadow-lg group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">Meetings & Calls</span>
              <div className="w-7 h-7 rounded-lg bg-white/[0.05] text-slate-300 flex items-center justify-center border border-white/[0.08]">
                <Clock size={14} />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">{leads.filter(l => l.next_follow_up).length}</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {followupsToday.length} Today
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Discovery calls & follow-ups</p>
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
                {tab.id === 'meetings' && leads.filter(l => l.next_follow_up).length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-white/10 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {leads.filter(l => l.next_follow_up).length}
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
                      {taskProgressPct === 100 && <span className="text-emerald-400 text-sm font-bold flex items-center gap-1"><CheckCircle2 size={15} /> 100% COMPLETE</span>}
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
                const BlockIcon = meta.icon;

                return (
                  <div key={block} className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                      <div className="flex items-center gap-2">
                        <BlockIcon size={16} className={meta.color} />
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
                                <Check size={12} strokeWidth={3} />
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
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {PIPELINE_STAGES.map(stage => {
                const count = leads.filter(l => normalizeLeadStatus(l.status) === stage.id).length;
                const isSelected = selectedPipelineStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setSelectedPipelineStage(isSelected ? null : stage.id)}
                    className={`p-3.5 rounded-xl border text-center transition-all duration-200 cursor-pointer ${stage.bg} ${stage.border} ${
                      isSelected ? 'ring-2 ring-white/50 scale-[1.02] shadow-lg' : 'hover:opacity-90 hover:scale-[1.01]'
                    }`}
                    title={`Filter by ${stage.label}`}
                  >
                    <div className={`text-xl font-black ${stage.color}`}>{count}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 tracking-wider">{stage.label}</div>
                    {isSelected && <div className="text-[8px] text-white font-semibold mt-1">● Active Filter</div>}
                  </button>
                );
              })}
            </div>

            {/* Sub-header Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#121929] border border-white/[0.05] rounded-xl p-3 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-400 font-medium">Filter by Follow-up:</span>
                <button
                  type="button"
                  onClick={() => setLeadFollowUpFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    leadFollowUpFilter === 'all' ? 'bg-sky-500 text-white shadow-sm' : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  All ({leads.length})
                </button>
                <button
                  type="button"
                  onClick={() => setLeadFollowUpFilter('scheduled')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    leadFollowUpFilter === 'scheduled' ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  📅 Scheduled ({leads.filter(l => l.next_follow_up).length})
                </button>
                <button
                  type="button"
                  onClick={() => setLeadFollowUpFilter('overdue')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    leadFollowUpFilter === 'overdue' ? 'bg-rose-600 text-white shadow-sm' : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  ⚠️ Overdue ({leads.filter(l => l.next_follow_up && new Date(l.next_follow_up) < new Date(new Date().setHours(0,0,0,0))).length})
                </button>
              </div>

              {selectedPipelineStage && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px]">Filtered by stage: <b className="text-white">{selectedPipelineStage}</b></span>
                  <button
                    type="button"
                    onClick={() => setSelectedPipelineStage(null)}
                    className="text-[10px] font-extrabold text-slate-400 hover:text-rose-400 underline cursor-pointer"
                  >
                    Clear stage filter
                  </button>
                </div>
              )}
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
                        {leads.length === 0
                          ? 'No leads found in pipeline. Click "+ Add Lead" to record a new prospect.'
                          : 'No leads match the active filters.'}
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map(lead => {
                      const currentStatus = normalizeLeadStatus(lead.status);
                      const conf = LEAD_STATUS_CONFIG[currentStatus] || LEAD_STATUS_CONFIG['New Inbound'];
                      const parsed = parseLeadNotes(lead.notes);
                      const isPlaceholderEmail = (lead.email || '').includes('@instagram.lead') || (lead.email || '').includes('@reddit.lead');

                      return (
                        <tr
                          key={lead.id}
                          onClick={() => handleOpenLeadDetail(lead)}
                          className="hover:bg-white/[0.04] cursor-pointer transition-colors group"
                          title="Click to view prospect details & suggested opener"
                        >
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-2">
                              <div className="font-bold text-white text-sm group-hover:text-sky-300 transition-colors">
                                {lead.name || 'Anonymous'}
                              </div>
                              {parsed.icpScore && (
                                <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                  ICP {parsed.icpScore}
                                </span>
                              )}
                            </div>
                            <div className="text-slate-400 text-[11px] mt-0.5 flex items-center gap-1.5 flex-wrap">
                              <span>{lead.email}</span>
                              {isPlaceholderEmail && (
                                <span className="text-[9px] text-slate-500 italic">(system placeholder)</span>
                              )}
                              {lead.phone && <span>· {lead.phone}</span>}
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            <div className="font-semibold text-slate-200">{lead.company || lead.website || 'Direct Prospect'}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <span className="capitalize">{lead.source || 'Website Inbound'}</span>
                              {lead.website && (
                                <a
                                  href={lead.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  className="text-sky-400 hover:text-sky-300 inline-flex items-center ml-1"
                                  title="Open profile link"
                                >
                                  <ExternalLink size={11} />
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-4 pr-4" onClick={e => e.stopPropagation()}>
                            <div className="relative inline-block">
                              <select
                                value={currentStatus}
                                onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value, e)}
                                className={`appearance-none cursor-pointer pl-3 pr-7 py-1 text-[10px] font-extrabold rounded-full border uppercase tracking-wider transition-all focus:outline-none focus:ring-1 focus:ring-white/30 shadow-sm ${conf.bg} ${conf.color} ${conf.border}`}
                              >
                                {PIPELINE_STAGES.map(stage => (
                                  <option key={stage.id} value={stage.id} className="bg-[#0e1424] text-white py-1">
                                    {stage.label}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown size={11} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${conf.color} opacity-75`} />
                            </div>
                          </td>
                          <td className="py-4 pr-4" onClick={e => e.stopPropagation()}>
                            {lead.next_follow_up ? (
<div className="flex items-center gap-1.5 flex-wrap">
                                <div className="text-amber-400 font-bold text-xs flex items-center gap-1">
                                  <CalendarIcon size={12} className="shrink-0" />
                                  <span>{fmtDate(lead.next_follow_up)}</span>
                                  {lead.follow_up_notes && (
                                    <div className="text-[10px] text-slate-400 font-normal truncate max-w-[140px]" title={lead.follow_up_notes}>
                                      {lead.follow_up_notes}
                                    </div>
                                  )}
                                </div>
                                {new Date(lead.next_follow_up) < new Date(new Date().setHours(0,0,0,0)) && (
                                  <span className="px-1.5 py-0.5 text-[8px] font-black uppercase rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                    Overdue
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-600 italic text-xs">Not scheduled</span>
                            )}
                          </td>
                          <td className="py-4 pr-4 text-slate-400 text-xs">
                            {fmtDate(lead.created_at)}
                          </td>
                          <td className="py-4 text-right" onClick={e => e.stopPropagation()}>
                            <div className="flex gap-1.5 justify-end items-center">
                              <button
                                onClick={() => handleOpenLeadDetail(lead)}
                                className="p-2 bg-sky-500/10 hover:bg-sky-600 text-sky-400 hover:text-white rounded-lg transition-colors text-xs font-bold cursor-pointer"
                                title="View Lead Details & Opener"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  setScheduleLeadId(lead.id);
                                  setShowScheduleModal(true);
                                }}
                                className="p-2 bg-purple-500/10 hover:bg-purple-600 text-purple-300 hover:text-white rounded-lg transition-colors text-xs font-bold cursor-pointer"
                                title="Schedule Call"
                              >
                                <CalendarIcon size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-2 bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white rounded-lg transition-colors text-xs cursor-pointer"
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

        {/* 3. FIT NINJA MEMBERS (SAAS HUB) */}
        {activeTab === 'fit' && (
          <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Dumbbell size={18} className="text-amber-400" /> Fit Ninja Member Accounts & Nutrition Engine
                </h2>
                <p className="text-xs text-slate-400">Live synchronized database from fit.socialninjas.in</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400">Total: {fitClients.length}</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                  {premiumFitCount} PRO PASS Active
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                  {activeFitCount} Actively Using
                </span>
              </div>
            </div>

            {/* Interactive Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <button
                onClick={() => setFitFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  fitFilter === 'all'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08]'
                }`}
              >
                All Members ({fitClients.length})
              </button>
              <button
                onClick={() => setFitFilter('paid')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  fitFilter === 'paid'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                <Zap size={13} className="shrink-0" /> PRO PASS / Paid ({premiumFitCount})
              </button>
              <button
                onClick={() => setFitFilter('unpaid')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  fitFilter === 'unpaid'
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30'
                }`}
              >
                <Clock size={13} className="shrink-0" /> Free / Unpaid ({unpaidFitCount})
              </button>
              <button
                onClick={() => setFitFilter('active')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  fitFilter === 'active'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Actively Using ({activeFitCount})
              </button>
              <button
                onClick={() => setFitFilter('inactive')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  fitFilter === 'inactive'
                    ? 'bg-slate-700 text-white shadow-md'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 border border-white/[0.06]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-slate-500 inline-block"></span> Inactive ({inactiveFitCount})
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pr-4">Athlete / Member</th>
                    <th className="pb-3 pr-4">Physiological Profile & Goal</th>
                    <th className="pb-3 pr-4">Plan Status</th>
                    <th className="pb-3 pr-4">Metabolic Blueprint</th>
                    <th className="pb-3 pr-4">Activity Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs">
                  {filteredFitClients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 italic">
                        No members match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredFitClients.map(fit => {
                      const isPaid = fit.plan_status === 'premium';
                      const phys = fit.physiological || fit.assessment_data || {};
                      const bp = fit.generated_plan || {};
                      const prog = fit.progress || {};

                      return (
                        <tr key={fit.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              {fit.avatar ? (
                                <img src={fit.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-white/20" />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
                                  {(fit.name || 'N').charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-white text-sm flex items-center gap-2">
                                  {fit.name || 'Athlete'}
                                  {isPaid && (
                                    <span className="text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-black tracking-wider uppercase">
                                      PRO
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-400 text-[11px] font-mono">{fit.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            {fit.onboarded ? (
                              <div>
                                <div className="font-bold text-white capitalize text-xs flex items-center gap-1.5">
                                  <span>{phys.goal || 'General Fitness'}</span>
                                  {prog.weight_delta ? (
                                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                      prog.weight_delta < 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-sky-500/20 text-sky-300'
                                    }`}>
                                      {prog.weight_delta > 0 ? `+${prog.weight_delta}` : prog.weight_delta} kg
                                    </span>
                                  ) : null}
                                </div>
                                <div className="text-slate-400 text-[11px]">
                                  {phys.gender && phys.gender !== '—' && phys.gender !== 'Not specified' ? `${phys.gender} · ` : ''}
                                  {phys.age && phys.age !== '—' ? `${phys.age}y · ` : ''}
                                  {phys.weight && phys.weight !== '—' ? `${phys.weight}kg` : ''}
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-0.5">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/25">
                                  <Clock size={10} /> Onboarding Pending
                                </span>
                                <div className="text-[10px] text-slate-500">Google sign-in completed</div>
                              </div>
                            )}
                          </td>
                          <td className="py-4 pr-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black rounded-full uppercase tracking-wider border ${
                              isPaid 
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 shadow-sm shadow-amber-500/10' 
                                : 'bg-slate-800/80 text-slate-400 border-slate-700'
                            }`}>
                              {isPaid && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                              {isPaid ? 'PRO PASS' : 'FREE'}
                            </span>
                          </td>
                          <td className="py-4 pr-4">
                            {bp.kcal ? (
                              <div className="space-y-0.5">
                                <div className="font-bold text-emerald-400">{bp.kcal} kcal/day</div>
                                <div className="text-[11px] text-slate-400">
                                  <span className="text-sky-400 font-semibold">{bp.protein}g protein</span>
                                  {bp.creatine && bp.creatine !== '—' && <span className="text-amber-400 font-semibold"> · {bp.creatine} creatine</span>}
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-500 italic text-[11px]">Intake pending</span>
                            )}
                          </td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${fit.is_active ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
                              <span className={`font-semibold text-xs ${fit.is_active ? 'text-emerald-300' : 'text-slate-400'}`}>
                                {fit.active_label || fmtDate(fit.last_active_at || fit.created_at)}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {prog.workouts_count > 0 || prog.checkins_count > 0 ? (
                                <span className="text-slate-400 font-medium">
                                  {prog.workouts_count} workouts · {prog.checkins_count} check-ins
                                </span>
                              ) : (
                                `Joined ${fmtDate(fit.created_at)}`
                              )}
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex gap-1.5 justify-end">
                              <button
                                onClick={() => setViewFitClientDetails(fit)}
                                className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-sky-500/20 active:scale-95 flex items-center gap-1.5"
                              >
                                <Activity size={12} /> Progress &amp; Plan
                              </button>
                              <button
                                onClick={() => {
                                  setManageFitStatus(fit);
                                  setNewFitStatus(fit.plan_status || 'free');
                                }}
                                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-amber-500/20 active:scale-95"
                              >
                                Manage
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
                    { id: 'instagram', label: 'Instagram Reels', icon: Instagram },
                    { id: 'youtube', label: 'YouTube Shorts', icon: Video },
                    { id: 'both', label: 'IG + YT Sync', icon: Share2 },
                    ...((pubProfile === 'socialninja' || pubProfile === 'nazim_ninja') ? [
                      { id: 'linkedin_carousel', label: 'LinkedIn Carousel', icon: Layers },
                      { id: 'linkedin_article', label: 'LinkedIn Article', icon: FileText },
                    ] : []),
                  ].map(pl => {
                    const PlIcon = pl.icon;
                    return (
                      <button
                        key={pl.id}
                        onClick={() => setPubPlatform(pl.id)}
                        className={`p-3 rounded-xl border text-left font-bold text-xs flex items-center gap-2.5 transition-all ${
                          pubPlatform === pl.id
                            ? 'border-sky-500 bg-sky-500/10 text-white shadow-md shadow-sky-500/20'
                            : 'border-white/[0.06] bg-[#121929] text-slate-400 hover:border-white/[0.15]'
                        }`}
                      >
                        <PlIcon size={16} className={pubPlatform === pl.id ? 'text-sky-400' : 'text-slate-400'} />
                        <span>{pl.label}</span>
                      </button>
                    );
                  })}
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
                  <div className="text-xs font-bold text-white flex items-center gap-1.5"><CalendarIcon size={13} className="text-sky-400" /> Future Slot Scheduling</div>
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
                className="w-full bg-gradient-to-r from-brand-primary via-orange-500 to-amber-500 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-brand-primary/25 hover:opacity-95 transition-opacity text-xs flex items-center justify-center gap-2"
              >
                {pubStatus === 'posting' ? 'Dispatching...' : pubStatus === 'done' ? 'Logged to Queue' : pubSchedMode ? 'Schedule Post Entry' : 'Dispatch to Publisher'}
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

              <div data-lenis-prevent="true" className="space-y-2.5 max-h-[500px] overflow-y-auto overscroll-contain pr-1">
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
                            {p.scheduled_for ? new Date(p.scheduled_for).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : fmtDate(p.created_at)}
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
                                  alert('Dispatched! Check your Telegram group in ~30s.');
                                  await loadAllData();
                                } catch (e) {
                                  alert('Error: ' + (e as Error).message);
                                }
                              }}
                              className="text-[9px] font-extrabold text-white bg-purple-600 hover:bg-purple-500 px-2 py-0.5 rounded shadow transition-all"
                            >
                              Publish Now
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
        {activeTab === 'scripts' && (() => {
          const filteredScripts = scriptFilter === 'all'
            ? scripts
            : scripts.filter(sc => {
                const p = (sc.profile || '').toLowerCase();
                const f = scriptFilter.toLowerCase();
                const profileObj = PROFILES.find(pr => pr.id.toLowerCase() === f || pr.label.toLowerCase() === f);
                return p === f || (profileObj && (p === profileObj.id.toLowerCase() || p === profileObj.label.toLowerCase()));
              });

          return (
            <div className="bg-[#0e1424] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.06] pb-4 gap-4">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <FileText size={18} className="text-purple-400" /> Viral Short-Form Video Script Vault
                  </h2>
                  <p className="text-xs text-slate-400">Pre-hooked scripts and captions for YouTube Shorts & Instagram Reels</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => loadAllData()}
                    className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl border border-white/[0.06] transition-all flex items-center gap-1.5 text-xs font-semibold"
                    title="Reload scripts from database"
                  >
                    <RefreshCw size={13} className={refreshing ? 'animate-spin text-purple-400' : ''} />
                    <span>Sync Vault</span>
                  </button>
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/30">
                    {filteredScripts.length} Scripts Ready
                  </span>
                </div>
              </div>

              {/* Brand Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setScriptFilter('all')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                    scriptFilter === 'all'
                      ? 'bg-purple-600/20 text-purple-300 border-purple-500/40'
                      : 'bg-[#121929] text-slate-400 border-white/[0.06] hover:text-white hover:border-white/[0.12]'
                  }`}
                >
                  All Brands ({scripts.length})
                </button>
                {PROFILES.map(p => {
                  const count = scripts.filter(sc => {
                    const sp = (sc.profile || '').toLowerCase();
                    return sp === p.id.toLowerCase() || sp === p.label.toLowerCase();
                  }).length;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setScriptFilter(p.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                        scriptFilter === p.id
                          ? 'bg-white/[0.08] text-white border-white/[0.25]'
                          : 'bg-[#121929] text-slate-400 border-white/[0.06] hover:text-white hover:border-white/[0.12]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      <span>{p.label}</span>
                      <span className="text-[10px] opacity-60">({count})</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredScripts.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-slate-500 italic">
                    {scripts.length === 0
                      ? 'No scripts in vault. New automated scripts will populate automatically from research flows.'
                      : 'No scripts found for this brand filter.'}
                  </div>
                ) : (
                  filteredScripts.map(sc => (
                    <div key={sc.id} className="bg-[#121929] border border-white/[0.06] rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-white/[0.15] transition-all">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border" style={{ backgroundColor: `${pc(sc.profile)}15`, color: pc(sc.profile), borderColor: `${pc(sc.profile)}30` }}>
                            {pl(sc.profile)}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-slate-400">{sc.status || 'Ready'}</span>
                            <button
                              onClick={() => handleDeleteScript(sc.id, sc.topic)}
                              className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                              title="Delete script after use"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-bold text-white text-sm">{sc.topic}</h3>
                        {sc.yt_title && (
                          <p className="text-xs text-sky-400 font-semibold flex items-center gap-1.5"><Video size={13} className="shrink-0" /> {sc.yt_title}</p>
                        )}
                        {sc.hook && (
                          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.05] text-xs text-slate-300">
                            <span className="text-amber-400 font-bold">Hook: </span>{sc.hook}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                        <button
                          onClick={() => setOpenScriptId(openScriptId === sc.id ? null : sc.id)}
                          className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg"
                        >
                          {openScriptId === sc.id ? 'Hide' : 'Full Script'}
                        </button>
                        <div className="flex items-center gap-1.5">
                          {sc.hook && (
                            <button
                              onClick={() => copyToClipboard(sc.hook, `hook-${sc.id}`)}
                              className="text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20"
                              title="Copy only the hook"
                            >
                              {copiedText === `hook-${sc.id}` ? 'Copied' : 'Hook'}
                            </button>
                          )}
                          <button
                            onClick={() => copyToClipboard(sc.caption || sc.hook, sc.id)}
                            className="text-xs font-bold text-brand-primary hover:opacity-90 bg-brand-primary/10 px-3 py-1.5 rounded-lg border border-brand-primary/20"
                          >
                            {copiedText === sc.id ? 'Copied' : 'Caption'}
                          </button>
                          <button
                            onClick={() => {
                              const targetProfile = PROFILES.find(p => p.id.toLowerCase() === (sc.profile || '').toLowerCase() || p.label.toLowerCase() === (sc.profile || '').toLowerCase())?.id || 'socialninja';
                              setPubProfile(targetProfile);
                              setPubTopic(sc.yt_title || sc.topic);
                              setActiveTab('publish');
                            }}
                            className="p-1.5 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg border border-white/[0.06] hover:border-purple-500/30 transition-all flex items-center justify-center"
                            title="Send to Fast Publisher"
                          >
                            <Share2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteScript(sc.id, sc.topic)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg border border-white/[0.06] hover:border-rose-500/30 transition-all flex items-center justify-center"
                            title="Delete script after use"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {openScriptId === sc.id && (
                        <div data-lenis-prevent="true" className="mt-3 pt-3 border-t border-white/[0.06] text-xs text-slate-300 space-y-2 max-h-60 overflow-y-auto overscroll-contain">
                          {sc.section1 && <div><strong className="text-slate-400">Section 1:</strong> {sc.section1}</div>}
                          {sc.section2 && <div><strong className="text-slate-400">Section 2:</strong> {sc.section2}</div>}
                          {sc.section3 && <div><strong className="text-slate-400">Section 3:</strong> {sc.section3}</div>}
                          {sc.cta && <div><strong className="text-slate-400">CTA:</strong> {sc.cta}</div>}
                          {sc.caption && (
                            <div className="pt-2 border-t border-white/[0.04]">
                              <strong className="text-slate-400 block mb-1">Full Caption:</strong>
                              <p className="whitespace-pre-line text-slate-400 text-[11px] bg-slate-950/60 p-2.5 rounded-lg border border-white/[0.04]">{sc.caption}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })()}

        {/* 7. BRAND RADAR MONITOR */}
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
                        <strong className="text-sky-400 block mb-1">Suggested Reply:</strong>
                        {m.suggested_reply}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button onClick={() => copyToClipboard(m.suggested_reply || m.body, m.id)} className="text-xs font-bold text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded-lg">
                        {copiedText === m.id ? 'Copied' : 'Copy Reply'}
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
                        <List size={13} /> List View
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
                                  <FileText size={12} className="text-slate-500 shrink-0" />
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
                                        alert('Dispatched! Post will appear on LinkedIn in ~30s.');
                                        await loadAllData();
                                      } catch (e) {
                                        alert('Trigger error: ' + (e as Error).message);
                                      }
                                    }}
                                    className="text-[11px] font-medium text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/[0.2] px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5"
                                  >
                                    <Send size={12} className="text-slate-200" /> Publish Now
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
                                          alert('Dispatched to LinkedIn!');
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
          </div>
        )}

        {/* 10. MEETINGS & SCHEDULED CALLS CALENDAR */}
        {activeTab === 'meetings' && (
          <div className="bg-[#0b0f19] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/[0.06] pb-5 gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock size={16} className="text-purple-400" /> Meetings & Discovery Calls Calendar
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Track prospect discovery calls, client demo walkthroughs, and revenue follow-ups</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  {followupsToday.length} Action Required Today
                </span>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus size={13} /> + Schedule Call
                </button>
              </div>
            </div>

            {/* Scheduled Calls List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-300">
                  Upcoming Client Discovery Calls ({leads.filter(l => l.next_follow_up).length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leads.filter(l => l.next_follow_up).length === 0 ? (
                  <div className="col-span-full py-16 text-center text-slate-500 italic text-xs bg-[#101522] rounded-xl border border-white/[0.05]">
                    No discovery calls scheduled. Click "+ Schedule Call" to add a new prospect meeting.
                  </div>
                ) : (
                  leads.filter(l => l.next_follow_up).map((l, idx) => (
                    <div key={l.id || idx} className="bg-[#101522] border border-white/[0.06] hover:border-purple-500/30 rounded-xl p-4 flex flex-col justify-between gap-3 transition-all">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                            <CalendarIcon size={11} /> {fmtDate(l.next_follow_up)}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                            {l.status || 'PROSPECT'}
                          </span>
                        </div>

                        <div>
                          <div className="font-bold text-white text-sm">{l.name}</div>
                          <div className="text-xs text-slate-400">{l.company || 'Direct Founder'}</div>
                        </div>

                        {l.email && (
                          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 truncate">
                            <Mail size={12} className="text-slate-400 shrink-0" />
                            <span className="truncate">{l.email}</span>
                          </div>
                        )}

                        {l.phone && (
                          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                            <Phone size={12} className="text-slate-400 shrink-0" />
                            <span>{l.phone}</span>
                          </div>
                        )}

                        {l.follow_up_notes && (
                          <div className="text-xs text-slate-300 bg-black/30 p-2.5 rounded-lg border border-white/[0.04] italic">
                            "{l.follow_up_notes}"
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.05]">
                        <button
                          onClick={() => {
                            if (l.phone) window.open(`tel:${l.phone}`);
                            else if (l.email) window.open(`mailto:${l.email}`);
                            else alert('No contact details available');
                          }}
                          className="text-[11px] font-medium text-slate-300 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <Phone size={11} /> Connect
                        </button>
                        <button
                          onClick={async () => {
                            await updateLeadData(l.id, { next_follow_up: null, follow_up_notes: 'Completed' });
                          }}
                          className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <Check size={11} strokeWidth={2.5} /> Mark Done
                        </button>
                      </div>
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
        <div data-lenis-prevent="true" className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div data-lenis-prevent="true" className="bg-[#0e1424] border border-white/[0.1] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto overscroll-contain">
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
        <div data-lenis-prevent="true" className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div data-lenis-prevent="true" className="bg-[#0e1424] border border-white/[0.1] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto overscroll-contain">
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

      {/* LEAD DETAIL MODAL */}
      {selectedLead && (() => {
        const lead = selectedLead;
        const currentStatus = normalizeLeadStatus(lead.status);
        const conf = LEAD_STATUS_CONFIG[currentStatus] || LEAD_STATUS_CONFIG['New Inbound'];
        const parsed = parseLeadNotes(lead.notes);
        const isPlaceholderEmail = (lead.email || '').includes('@instagram.lead') || (lead.email || '').includes('@reddit.lead');

        return (
          <div data-lenis-prevent="true" className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain">
            <div data-lenis-prevent="true" className="bg-[#0e1424] border border-white/[0.1] rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="p-5 border-b border-white/[0.08] flex items-start justify-between gap-4 bg-[#121929]/70">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-lg font-black text-white truncate">
                      {lead.name || 'Anonymous Prospect'}
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.1]">
                      {lead.source || 'Inbound'}
                    </span>
                    {parsed.icpScore && (
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow-sm">
                        <Sparkles size={11} /> ICP Score: {parsed.icpScore}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-medium truncate">
                    {lead.company || lead.website || 'Prospect Profile'}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
                  title="Close Detail View"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div data-lenis-prevent="true" className="p-5 overflow-y-auto space-y-5 text-xs overscroll-contain">
                
                {/* Status Selector Banner */}
                <div className="p-3.5 rounded-xl bg-[#121929] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Current Stage:
                    </span>
                    <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border uppercase ${conf.bg} ${conf.color} ${conf.border}`}>
                      {conf.label}
                    </span>
                    {saveLeadStatusFeedback === 'saving' && (
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 animate-pulse flex items-center gap-1">
                        <RefreshCw size={10} className="animate-spin" /> Saving changes...
                      </span>
                    )}
                    {saveLeadStatusFeedback === 'saved' && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                        <Check size={11} /> Saved to Database
                      </span>
                    )}
                    {saveLeadStatusFeedback === 'error' && (
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 flex items-center gap-1">
                        <AlertCircle size={11} /> Sync error, retrying...
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-slate-400">Move to:</label>
                    <select
                      value={currentStatus}
                      onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                      className="bg-[#070b14] border border-white/[0.15] text-white rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                    >
                      {PIPELINE_STAGES.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact & Source Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#121929] border border-white/[0.05] space-y-1.5">
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe size={12} className="text-sky-400" /> Source Profile / URL
                    </div>
                    {lead.website ? (
                      <a
                        href={lead.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300 font-semibold break-all flex items-center gap-1 text-xs hover:underline"
                      >
                        <span className="truncate">{lead.website}</span>
                        <ExternalLink size={12} className="shrink-0" />
                      </a>
                    ) : (
                      <span className="text-slate-500 italic">No link available</span>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#121929] border border-white/[0.05] space-y-1.5">
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail size={12} className="text-indigo-400" /> Contact Email
                    </div>
                    <div className="text-slate-200 font-medium break-all">{lead.email || 'None on file'}</div>
                    {isPlaceholderEmail && (
                      <div className="text-[9px] text-amber-400/90 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block">
                        System placeholder · DM directly on platform
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio / Inquiry Description */}
                {lead.message && (
                  <div className="p-3.5 rounded-xl bg-[#121929] border border-white/[0.05] space-y-1.5">
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare size={12} className="text-emerald-400" /> Bio / Profile Description
                    </div>
                    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed italic bg-[#070b14]/50 p-2.5 rounded-lg border border-white/[0.03]">
                      "{lead.message}"
                    </p>
                  </div>
                )}

                {/* AI Intelligence Breakdown (Signal & Reasoning) */}
                {(parsed.signal || parsed.reasoning) && (
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#131b2e] to-[#0e1424] border border-sky-500/20 space-y-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-black text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={13} /> AI Intelligence & Qualification Signal
                      </div>
                      {parsed.signal && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/30">
                          {parsed.signal}
                        </span>
                      )}
                    </div>

                    {parsed.reasoning && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Analysis:</div>
                        <p className="text-slate-200 leading-relaxed text-xs">
                          {parsed.reasoning}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Suggested Opener (Editable + Copy Button) */}
                <div className="p-4 rounded-xl bg-[#121929] border border-amber-500/30 space-y-2.5 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Send size={12} /> Suggested DM Opener (Editable)
                    </div>
                    <div className="flex items-center gap-2">
                      {savedOpenerFeedback && (
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          <Check size={12} /> Saved to notes!
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={handleCopyOpener}
                        disabled={!editedOpener}
                        className={`px-3 py-1 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                          copiedOpener
                            ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                            : 'bg-brand-primary hover:opacity-90 text-white shadow-brand-primary/20'
                        }`}
                      >
                        {copiedOpener ? (
                          <>
                            <Check size={13} /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={13} /> Copy Opener
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={editedOpener}
                    onChange={(e) => setEditedOpener(e.target.value)}
                    rows={3}
                    placeholder="Enter or edit outreach DM opener..."
                    className="w-full bg-[#070b14] border border-white/[0.1] rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 leading-relaxed font-sans"
                  />

                  <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleSaveOpener(lead.id)}
                        className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        💾 Save changes to notes
                      </button>

                      {lead.website && (
                        <a
                          href={lead.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 hover:underline"
                        >
                          Open Profile to Send DM →
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSendAndProgress(lead.id)}
                      className="px-3 py-1 rounded-lg text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                      title="Record outreach and automatically move stage to In Dialogue"
                    >
                      <ArrowRight size={13} /> Mark Sent → Advance to In Dialogue
                    </button>
                  </div>
                </div>

                {/* Outreach & Sent Messages Log Section */}
                <div className="p-4 rounded-xl bg-[#121929] border border-indigo-500/25 space-y-3.5 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare size={13} /> Outreach & Messages Log
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {(parsed.activityLog || []).length} logged interactions
                    </span>
                  </div>

                  {/* Quick message logger */}
                  <div className="bg-[#070b14] p-3 rounded-xl border border-white/[0.08] space-y-2.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Channel:</label>
                        <select
                          value={logChannel}
                          onChange={(e) => setLogChannel(e.target.value)}
                          className="bg-[#121929] border border-white/[0.1] text-white text-[11px] rounded-lg px-2.5 py-1 font-semibold focus:outline-none cursor-pointer"
                        >
                          <option value="instagram">Instagram DM</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="email">Email</option>
                          <option value="linkedin">LinkedIn DM</option>
                          <option value="phone">Phone Call</option>
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={() => setLogMessageText(editedOpener)}
                        className="text-[10px] text-sky-400 hover:text-sky-300 font-bold underline cursor-pointer"
                      >
                        Paste Current Opener
                      </button>
                    </div>

                    <textarea
                      value={logMessageText}
                      onChange={(e) => setLogMessageText(e.target.value)}
                      rows={2}
                      placeholder="Type the message you sent to this prospect or notes on the conversation..."
                      className="w-full bg-[#0e1424] border border-white/[0.08] rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50 leading-relaxed font-sans"
                    />

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[9px] text-slate-500 italic">
                        Logging records the message with timestamp and persists immediately to database
                      </span>
                      <button
                        type="button"
                        onClick={() => handleLogSentMessage(lead.id)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send size={12} /> Log Sent Message
                      </button>
                    </div>
                  </div>

                  {/* History of messages & activities */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Conversation & Outreach History:
                    </div>

                    {(parsed.activityLog || []).length === 0 ? (
                      <div className="p-3 rounded-lg bg-[#070b14]/50 border border-white/[0.04] text-center text-slate-500 italic text-[11px]">
                        No outreach logged yet. Send a message on Instagram or WhatsApp, then log it above or click "Mark Sent".
                      </div>
                    ) : (
                      <div data-lenis-prevent="true" className="space-y-2 max-h-48 overflow-y-auto overscroll-contain pr-1">
                        {parsed.activityLog.map((log, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg bg-[#070b14] border border-indigo-500/20 text-xs text-slate-200 space-y-1"
                          >
                            <div className="text-[10px] font-bold text-indigo-400 flex items-center gap-1.5">
                              <span>💬</span> {log.replace(/^\[Outreach\s*·\s*/i, '').replace(/\]:.*$/, '')}
                            </div>
                            <p className="text-slate-300 text-[11px] leading-relaxed font-mono whitespace-pre-wrap bg-white/[0.02] p-2 rounded border border-white/[0.03]">
                              {log.includes(']: "')
                                ? log.replace(/^.*\]:\s*"/, '').replace(/"\s*$/, '')
                                : log.replace(/^\[.*?\]:\s*/, '')}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Follow-up Scheduler Section */}
                <div className="p-4 rounded-xl bg-[#121929] border border-white/[0.06] space-y-3">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarIcon size={12} className="text-purple-400" /> Schedule Next Follow-Up Call
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 block mb-1">CALL DATE</label>
                      <input
                        type="date"
                        value={detailFollowUpDate}
                        onChange={(e) => setDetailFollowUpDate(e.target.value)}
                        className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 block mb-1">AGENDA / CALL NOTES</label>
                      <input
                        type="text"
                        value={detailFollowUpNotes}
                        onChange={(e) => setDetailFollowUpNotes(e.target.value)}
                        placeholder="e.g. 15-min growth audit review"
                        className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    {lead.next_follow_up && (
                      <button
                        type="button"
                        onClick={() => {
                          setDetailFollowUpDate('');
                          setDetailFollowUpNotes('');
                          handleUpdateLeadFollowUp(lead.id, null, null);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-rose-400 bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
                      >
                        Clear Date
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleSaveDetailFollowUp(lead.id)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20 transition-colors cursor-pointer"
                    >
                      Save Follow-Up
                    </button>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/[0.08] bg-[#121929]/70 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDeleteLead(lead.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={13} /> Delete Lead
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* FIT NINJA MANAGE MODAL */}
      {manageFitStatus && (
        <div data-lenis-prevent="true" className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto overscroll-contain">
          <div data-lenis-prevent="true" className="bg-[#0e1424] border border-white/[0.1] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto overscroll-contain">
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
      {viewFitClientDetails && (() => {
        const fit = viewFitClientDetails;
        const isPaid = fit.plan_status === 'premium';
        const phys = fit.physiological || fit.assessment_data || {};
        const bp = fit.generated_plan || {};
        const prog = fit.progress || {};
        const checkins = prog.recent_checkins || [];
        const healthConditions = Array.isArray(phys.health_conditions) ? phys.health_conditions : [];

        return (
          <div data-lenis-prevent="true" className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto overscroll-contain">
            <div data-lenis-prevent="true" className="bg-[#0b0f19] border border-white/[0.12] rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto overscroll-contain p-6 space-y-5 shadow-2xl text-xs text-white">
              
              {/* Athlete Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    {fit.avatar ? (
                      <img src={fit.avatar} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-md" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center font-black text-slate-950 text-lg shadow-md border-2 border-white/20">
                        {(fit.name || 'N').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0b0f19] ${
                      fit.is_active ? 'bg-emerald-400' : 'bg-slate-500'
                    }`}></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-white">{fit.name || 'Athlete'}</h3>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded tracking-wider uppercase border ${
                        isPaid 
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm' 
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {isPaid ? 'PRO PASS' : 'FREE TIER'}
                      </span>
                      {fit.onboarded ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Onboarded
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          Onboarding Pending
                        </span>
                      )}
                    </div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      <span>{fit.email}</span> • <span className="text-emerald-400 font-semibold">{fit.active_label || 'Active Protocol'}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setViewFitClientDetails(null)} 
                  className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Onboarding Pending Banner */}
              {!fit.onboarded && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-3 text-amber-200">
                  <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-amber-300">Intake Questionnaire Pending</div>
                    <p className="text-[11px] text-amber-200/80 leading-relaxed">
                      This athlete has signed in with Google but hasn't completed their onboarding fitness quiz yet. Their exact age, bodyweight, medical guardrails, and metabolic plan will sync here automatically once submitted.
                    </p>
                  </div>
                </div>
              )}

              {/* Physiological Identity Card */}
              <div className="bg-[#121929] border border-white/[0.08] rounded-2xl p-4 space-y-3">
                <div className="text-[10.5px] font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Dumbbell size={13} className="text-amber-400" /> Physiological Profile &amp; Onboarding
                </div>
                
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Biological Sex</span>
                      <div className="bg-[#0b0f19] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-bold text-slate-200 capitalize">
                        {phys.gender || '—'}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Age</span>
                      <div className="bg-[#0b0f19] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-bold text-white text-center">
                        {phys.age !== '—' && phys.age ? `${phys.age} yrs` : '—'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Current Bodyweight</span>
                      <div className="bg-[#0b0f19] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-bold text-white text-center">
                        {phys.weight !== '—' && phys.weight ? `${phys.weight} kg` : '—'}
                        {phys.starting_weight && phys.starting_weight !== '—' && phys.starting_weight !== phys.weight ? (
                          <span className="text-[10px] text-slate-400 block font-normal mt-0.5">
                            Started: {phys.starting_weight} kg
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Height</span>
                      <div className="bg-[#0b0f19] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-bold text-white text-center">
                        {phys.height !== '—' && phys.height ? `${phys.height} cm` : '—'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Primary Goal</span>
                      <div className="bg-[#0b0f19] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-bold text-amber-300 capitalize">
                        {phys.goal || 'General Fitness'}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Target WT Goal</span>
                      <div className="bg-[#0b0f19] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-bold text-white text-center">
                        {phys.goal_weight !== '—' && phys.goal_weight ? `${phys.goal_weight} kg` : '—'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Training Frequency</span>
                      <div className="bg-[#0b0f19] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-semibold text-slate-300">
                        {phys.days_per_week !== '—' && phys.days_per_week ? `${phys.days_per_week} days / week` : '—'}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Workout Split</span>
                      <div className="bg-[#0b0f19] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 capitalize">
                        {phys.split_preference || 'Coach Decides'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Clinical Health Guardrails</span>
                    <div className="bg-[#0b0f19] border border-white/[0.08] rounded-xl px-3 py-2 text-xs">
                      {healthConditions.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {healthConditions.map((cond, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 text-[10px] font-bold capitalize">
                              🛡️ {cond.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-emerald-400 font-semibold text-[11px]">✓ No medical restrictions active (Optimal Health)</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Progress & Check-in Audit (The requested tracking section) */}
              <div className="bg-[#121929] border border-white/[0.08] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[10.5px] font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp size={13} className="text-emerald-400" /> Weekly Progress &amp; Check-ins
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {prog.checkins_count || 0} check-ins • {prog.workouts_count || 0} workouts
                  </span>
                </div>

                {/* Progress Metric Highlights */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-white/[0.08]">
                    <div className="text-sm font-black text-white">{prog.starting_weight ? `${prog.starting_weight}kg` : '—'}</div>
                    <div className="text-[8px] font-extrabold text-slate-400 mt-0.5 uppercase">Starting WT</div>
                  </div>
                  <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-white/[0.08]">
                    <div className="text-sm font-black text-white">{prog.current_weight ? `${prog.current_weight}kg` : '—'}</div>
                    <div className="text-[8px] font-extrabold text-slate-400 mt-0.5 uppercase">Current WT</div>
                  </div>
                  <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-white/[0.08]">
                    <div className={`text-sm font-black ${
                      prog.weight_delta < 0 ? 'text-emerald-400' : prog.weight_delta > 0 ? 'text-sky-400' : 'text-slate-300'
                    }`}>
                      {prog.weight_delta > 0 ? `+${prog.weight_delta}` : (prog.weight_delta || '0.0')}kg
                    </div>
                    <div className="text-[8px] font-extrabold text-slate-400 mt-0.5 uppercase">Net Change</div>
                  </div>
                  <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-white/[0.08]">
                    <div className="text-sm font-black text-amber-400">{prog.workouts_count || 0}</div>
                    <div className="text-[8px] font-extrabold text-slate-400 mt-0.5 uppercase">Sessions</div>
                  </div>
                </div>

                {/* Check-ins Timeline / List */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Recent Weekly Check-ins</div>
                  {checkins.length === 0 ? (
                    <div className="bg-[#0b0f19] rounded-xl p-3.5 text-center text-slate-500 italic text-[11px] border border-white/[0.04]">
                      No weekly check-ins recorded yet. When this athlete completes their weekly check-in, their logged weights, soreness, and progress notes will appear here.
                    </div>
                  ) : (
                    <div data-lenis-prevent="true" className="space-y-2 max-h-48 overflow-y-auto overscroll-contain pr-1">
                      {checkins.map((chk, idx) => (
                        <div key={chk.id || idx} className="bg-[#0b0f19] border border-white/[0.06] rounded-xl p-3 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white flex items-center gap-1.5">
                              <CalendarIcon size={12} className="text-sky-400" />
                              {fmtDate(chk.date)}
                            </span>
                            <span className="font-black text-emerald-400 text-sm">
                              {chk.weight} kg
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 flex-wrap">
                            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06] capitalize">
                              Difficulty: <b className="text-slate-200">{chk.difficulty}</b>
                            </span>
                            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06] capitalize">
                              Soreness: <b className="text-slate-200">{chk.soreness}</b>
                            </span>
                            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06] capitalize">
                              Diet: <b className="text-slate-200">{chk.diet_rating?.replace('_', ' ')}</b>
                            </span>
                          </div>
                          {chk.notes && (
                            <div className="text-[11px] text-slate-300 italic bg-white/[0.02] p-2 rounded-lg border border-white/[0.04] mt-1">
                              "{chk.notes}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Active Metabolic & Ergogenic Blueprint */}
              <div className="bg-[#121929] border border-white/[0.08] rounded-2xl p-4 space-y-3">
                <div className="text-[10.5px] font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={13} className="text-sky-400" /> Active Metabolic &amp; Ergogenic Blueprint
                </div>
                {bp.kcal ? (
                  <div className="grid grid-cols-5 gap-1.5 text-center">
                    <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-white/[0.08]">
                      <div className="text-sm font-black text-white">{bp.kcal}</div>
                      <div className="text-[8px] font-extrabold text-slate-400 mt-1 uppercase">Kcal/Day</div>
                    </div>
                    <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-white/[0.08]">
                      <div className="text-sm font-black text-sky-400">{bp.protein || '—'}g</div>
                      <div className="text-[8px] font-extrabold text-sky-400 mt-1 uppercase">Protein</div>
                    </div>
                    <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-white/[0.08]">
                      <div className="text-sm font-black text-amber-400">{bp.creatine || '5g'}</div>
                      <div className="text-[8px] font-extrabold text-amber-400 mt-1 uppercase">Creatine</div>
                    </div>
                    <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-white/[0.08]">
                      <div className="text-sm font-black text-slate-300">{bp.bmr || '—'}</div>
                      <div className="text-[8px] font-extrabold text-slate-400 mt-1 uppercase">BMR Kcal</div>
                    </div>
                    <div className="bg-[#0b0f19] p-2.5 rounded-xl border border-white/[0.08]">
                      <div className="text-sm font-black text-emerald-400">{bp.bmi || '—'}</div>
                      <div className="text-[8px] font-extrabold text-emerald-400 mt-1 uppercase">BMI</div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#0b0f19] p-3 rounded-xl border border-white/[0.06] text-center text-slate-500 italic text-[11px]">
                    Blueprint pending athlete onboarding assessment.
                  </div>
                )}
              </div>

              {/* Telemetry & Account Information */}
              <div className="bg-[#121929] border border-white/[0.08] rounded-2xl p-4 space-y-2">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Account Telemetry</div>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div><span className="text-slate-500">Last Seen / Synced:</span> <b className="text-emerald-400">{fit.active_label || fmtDate(fit.last_active_at)}</b></div>
                  <div><span className="text-slate-500">Joined:</span> <b className="text-slate-300">{fmtDate(fit.created_at)}</b></div>
                  <div className="col-span-2 text-slate-500 font-mono text-[10px]">ID: {fit.id}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end pt-1">
                <button
                  onClick={async () => {
                    const nextStatus = isPaid ? 'free' : 'premium';
                    await fetch(getApiUrl('/api/fit-clients'), {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ id: fit.id, plan_status: nextStatus })
                    });
                    setViewFitClientDetails({ ...fit, plan_status: nextStatus });
                    await loadAllData();
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isPaid
                      ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  }`}
                >
                  {isPaid ? 'Downgrade to Free Tier' : 'Upgrade to PRO PASS Active'}
                </button>
                <button
                  onClick={() => setViewFitClientDetails(null)}
                  className="px-4 py-2.5 bg-white/[0.08] hover:bg-white/[0.14] text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ADD TEAM MEMBER MODAL */}
      {showAddMember && (
        <div data-lenis-prevent="true" className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto overscroll-contain">
          <div data-lenis-prevent="true" className="bg-[#0e1424] border border-white/[0.1] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto overscroll-contain">
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
