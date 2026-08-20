import { getApiUrl } from '../services/api';
import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Save, X, Lock, Mail, Phone, Globe, Building, Calendar, 
  Check, Shield, Activity, Dumbbell, Sparkles, User, Search, Filter, 
  Edit3, Clock, ChevronLeft, ChevronRight, UserPlus, FileText, CheckCircle2, AlertCircle, PlusCircle
} from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'sn@admin2026';
const AUTH_KEY = 'sn_admin_auth';

const STATUS_PILLS: Record<string, { label: string, color: string }> = {
  new: { label: 'New Lead', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  contacted: { label: 'Contacted', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  demo_scheduled: { label: 'Demo Scheduled', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  proposal_sent: { label: 'Proposal Sent', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  closed_won: { label: 'Client Won 🎉', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  closed_lost: { label: 'Lost / Closed', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' }
};

const Admin: React.FC = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Data States
  const [blogs, setBlogs] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [fitClients, setFitClients] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Navigation & Filters
  const [activeTab, setActiveTab] = useState<'leads' | 'clients' | 'fit' | 'calendar' | 'blogs'>('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [clientStatusFilter, setClientStatusFilter] = useState<string>('all');
  const [fitStatusFilter, setFitStatusFilter] = useState<string>('all');

  // Calendar State
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleTargetType, setScheduleTargetType] = useState<'lead' | 'client'>('lead');
  const [scheduleTargetId, setScheduleTargetId] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [scheduleNotes, setScheduleNotes] = useState<string>('');

  // Editor & View Modals
  const [editLead, setEditLead] = useState<any>(null);
  const [editClient, setEditClient] = useState<any>(null);
  const [showAddLead, setShowAddLead] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [viewClientHist, setViewClientHist] = useState<any>(null);
  const [clientHistData, setClientHistData] = useState<any[]>([]);
  const [viewFitClientDetails, setViewFitClientDetails] = useState<any>(null);
  const [manageFitStatus, setManageFitStatus] = useState<any>(null);
  const [newFitStatus, setNewFitStatus] = useState<string>('free');

  // Blog Editor State
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ id: '', title: '', content: '', excerpt: '', author: 'Admin' });

  // Add Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '', email: '', phone: '', company: '', website: '', message: '', status: 'new', nextFollowUp: '', followUpNotes: '', notes: ''
  });

  // Add Client Form State
  const [newClientForm, setNewClientForm] = useState({
    brandName: '', niche: '', email: '', phone: '', toneOfVoice: '', targetAudience: '', callToAction: '', planName: 'Growth Plan', paymentStatus: 'verified', active: true, nextFollowUp: '', notes: ''
  });

  useEffect(() => {
    if (authed) loadAllData();
  }, [authed]);

  const loadAllData = async () => {
    setLoadingData(true);
    await Promise.all([
      fetchLeads(),
      fetchClients(),
      fetchFitClients(),
      fetchBlogs()
    ]);
    setLoadingData(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1');
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  // API Fetchers
  const fetchBlogs = async () => {
    try {
      const res = await fetch(getApiUrl('/api/data?resource=blogs'));
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (e) { console.error('Blogs error', e); }
  };

  const fetchLeads = async () => {
    try {
      const res = await fetch(getApiUrl('/api/data?resource=leads'));
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (e) { console.error('Leads error', e); }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch(getApiUrl('/api/data?resource=clients'));
      const data = await res.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (e) { console.error('Clients error', e); }
  };

  const fetchFitClients = async () => {
    try {
      const res = await fetch(getApiUrl('/api/fit-clients'));
      const data = await res.json();
      setFitClients(Array.isArray(data) ? data : []);
    } catch (e) { console.error('Fit clients error', e); }
  };

  // Lead Actions
  const handleSaveLead = async (leadData: any) => {
    setLoadingData(true);
    try {
      const res = await fetch(getApiUrl('/api/data?resource=leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      if (res.ok) {
        setEditLead(null);
        setShowAddLead(false);
        await fetchLeads();
      } else alert('Failed to save lead');
    } catch (e) { console.error(e); alert('Error saving lead'); }
    setLoadingData(false);
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    // Optimistic UI Removal
    setLeads(prev => prev.filter(l => l.id !== id));
    try {
      const res = await fetch(getApiUrl(`/api/data?resource=leads&id=${id}`), { method: 'DELETE' });
      if (!res.ok) await fetchLeads(); // rollback on failure
    } catch (e) { console.error(e); await fetchLeads(); }
  };

  // Client Actions
  const handleSaveClient = async (clientData: any) => {
    setLoadingData(true);
    try {
      const res = await fetch(getApiUrl('/api/data?resource=clients'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      });
      if (res.ok) {
        setEditClient(null);
        setShowAddClient(false);
        await fetchClients();
      } else alert('Failed to save client workspace');
    } catch (e) { console.error(e); alert('Error saving client workspace'); }
    setLoadingData(false);
  };

  const handleDeleteClient = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this client workspace?')) return;
    // Optimistic UI Removal
    setClients(prev => prev.filter(c => c.id !== id));
    try {
      const res = await fetch(getApiUrl(`/api/data?resource=clients&id=${id}`), { method: 'DELETE' });
      if (!res.ok) await fetchClients();
    } catch (e) { console.error(e); await fetchClients(); }
  };

  // Direct Calendar Follow-Up Scheduling Handler
  const handleScheduleSubmit = async () => {
    if (!scheduleTargetId) return alert('Please select a target lead or client');
    setLoadingData(true);
    try {
      if (scheduleTargetType === 'lead') {
        const target = leads.find(l => l.id === scheduleTargetId);
        if (target) {
          await handleSaveLead({
            ...target,
            nextFollowUp: scheduleDate,
            followUpNotes: scheduleNotes || 'Scheduled from Work Calendar'
          });
        }
      } else {
        const target = clients.find(c => c.id === scheduleTargetId);
        if (target) {
          await handleSaveClient({
            ...target,
            nextFollowUp: scheduleDate,
            notes: scheduleNotes || 'Scheduled call from Work Calendar'
          });
        }
      }
      setShowScheduleModal(false);
      setScheduleNotes('');
      setSelectedDate(scheduleDate);
    } catch (e) { console.error(e); }
    setLoadingData(false);
  };

  // Fit Ninja Actions
  const handleSaveFitStatus = async () => {
    if (!manageFitStatus) return;
    setLoadingData(true);
    try {
      const res = await fetch(getApiUrl('/api/fit-clients'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: manageFitStatus.id, plan_status: newFitStatus })
      });
      if (res.ok) {
        setManageFitStatus(null);
        await fetchFitClients();
      } else alert('Failed to update plan status');
    } catch (e) { console.error(e); }
    setLoadingData(false);
  };

  // History Fetcher
  const handleViewClientHist = async (client: any) => {
    setViewClientHist(client);
    try {
      const res = await fetch(getApiUrl('/api/data?resource=history&clientId=') + client.id);
      const data = await res.json();
      setClientHistData(Array.isArray(data) ? data : []);
    } catch (e) { setClientHistData([]); }
  };

  // Filtered Datasets
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (lead.company || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = leadStatusFilter === 'all' || (lead.status || 'new') === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredClients = clients.filter(client => {
    const matchesSearch = (client.brandName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (client.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (client.niche || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = clientStatusFilter === 'all' || 
                          (clientStatusFilter === 'active' && client.active !== false && client.paymentStatus !== 'expired') ||
                          (clientStatusFilter === 'blocked' && (client.active === false || client.paymentStatus === 'expired'));
    return matchesSearch && matchesStatus;
  });

  const filteredFit = fitClients.filter(fit => {
    const matchesSearch = (fit.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (fit.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = fitStatusFilter === 'all' || (fit.plan_status || 'free') === fitStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calendar Event Collectors
  const allFollowUps = [
    ...leads.filter(l => l.next_follow_up || l.nextFollowUp).map(l => ({
      type: 'lead',
      id: l.id,
      title: `Lead Follow-up: ${l.name}`,
      date: (l.next_follow_up || l.nextFollowUp).split('T')[0],
      data: l,
      status: l.status || 'new',
      notes: l.follow_up_notes || l.followUpNotes || l.notes || 'No follow-up notes provided'
    })),
    ...clients.filter(c => c.nextFollowUp || c.next_follow_up).map(c => ({
      type: 'client',
      id: c.id,
      title: `Client Call/Check: ${c.brandName}`,
      date: (c.nextFollowUp || c.next_follow_up).split('T')[0],
      data: c,
      status: c.active !== false ? 'active' : 'expired',
      notes: c.notes || 'Routine client check-in'
    }))
  ];

  const selectedDateFollowups = allFollowUps.filter(item => item.date === selectedDate);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-4">
        <SEO title="CRM Login | Social Ninja's" description="Admin Login Portal" />
        <div className="bg-[#0e121d] border border-neutral-800 p-8 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
          <div className="absolute -left-12 -top-12 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl"></div>
          <div className="flex flex-col items-center mb-6 text-center relative z-10">
            <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-3">
              <Lock size={28} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">SOCIAL NINJA'S CRM</h1>
            <p className="text-xs text-neutral-400 mt-1">Enterprise Agency & User Management Console</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Admin Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-brand-primary transition-colors text-sm"
              />
            </div>
            {authError && <div className="text-red-400 text-xs font-semibold text-center bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">Invalid Security Password</div>}
            <button type="submit" className="w-full bg-gradient-to-r from-brand-primary to-orange-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:opacity-95 transition-opacity text-sm">
              Access Console →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans selection:bg-brand-primary/30">
      <SEO title="Agency CRM Console | Social Ninja's" description="Master Management Dashboard" />

      {/* TOP BAR NAVIGATION */}
      <header className="border-b border-neutral-800/80 bg-[#0b0e17]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-primary to-orange-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
              SN
            </div>
            <div>
              <div className="font-bold text-sm tracking-wide text-white flex items-center gap-2">
                SOCIAL NINJA'S <span className="text-[10px] bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-2 py-0.5 rounded-full uppercase font-bold">CRM 2.0</span>
              </div>
              <p className="text-[10px] text-neutral-400">Live Client & Revenue Engine</p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search size={14} className="absolute left-3 text-neutral-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search leads, brands, emails..."
              className="w-full bg-[#131926] border border-neutral-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-primary"
            />
            {searchTerm && <X size={12} className="absolute right-3 text-neutral-500 cursor-pointer" onClick={() => setSearchTerm('')} />}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => { setScheduleDate(selectedDate); setShowScheduleModal(true); }}
              className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Calendar size={14} /> <span>+ Schedule Call</span>
            </button>
            <button 
              onClick={() => setShowAddLead(true)} 
              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <UserPlus size={14} /> <span>+ Add Lead</span>
            </button>
            <button 
              onClick={() => setShowAddClient(true)} 
              className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus size={14} /> <span>+ Add Client</span>
            </button>
            <button 
              onClick={handleLogout} 
              className="p-2 text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-xl transition-colors text-xs"
              title="Logout"
            >
              <Lock size={14} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* METRICS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0e121d] border border-neutral-800/80 p-4 rounded-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold">
              <span>Leads Inbox</span>
              <Mail size={16} className="text-blue-400" />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">{leads.length}</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {leads.filter(l => l.status === 'closed_won').length} Won
              </span>
            </div>
            <div className="mt-2 text-[10px] text-neutral-500">
              {leads.filter(l => (l.status || 'new') === 'new').length} New Uncontacted Leads
            </div>
          </div>

          <div className="bg-[#0e121d] border border-neutral-800/80 p-4 rounded-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold">
              <span>Client Workspaces</span>
              <Building size={16} className="text-emerald-400" />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">{clients.length}</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {clients.filter(c => c.active !== false).length} Active
              </span>
            </div>
            <div className="mt-2 text-[10px] text-neutral-500">
              {clients.filter(c => c.active === false || c.paymentStatus === 'expired').length} Suspended / Expired
            </div>
          </div>

          <div className="bg-[#0e121d] border border-neutral-800/80 p-4 rounded-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold">
              <span>Fit Ninja Users</span>
              <Dumbbell size={16} className="text-amber-400" />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">{fitClients.length}</span>
              <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
                {fitClients.filter(f => f.plan_status === 'premium').length} Premium
              </span>
            </div>
            <div className="mt-2 text-[10px] text-neutral-500">
              {fitClients.filter(f => !f.plan_status || f.plan_status === 'free').length} Free Members
            </div>
          </div>

          <div className="bg-[#0e121d] border border-neutral-800/80 p-4 rounded-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold">
              <span>Scheduled Follow-ups</span>
              <Calendar size={16} className="text-purple-400" />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">{allFollowUps.length}</span>
              <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded-full">
                {allFollowUps.filter(f => f.date === new Date().toISOString().split('T')[0]).length} Today
              </span>
            </div>
            <div className="mt-2 text-[10px] text-neutral-500">
              Next scheduled call & task items
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="bg-[#0e121d] border border-neutral-800/80 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'leads' ? 'bg-blue-600 text-white shadow-lg' : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'}`}
            >
              <Mail size={14} /> Leads Inbox ({leads.length})
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'clients' ? 'bg-emerald-600 text-white shadow-lg' : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'}`}
            >
              <Building size={14} /> Client Workspaces ({clients.length})
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'calendar' ? 'bg-purple-600 text-white shadow-lg' : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'}`}
            >
              <Calendar size={14} /> Work Calendar ({allFollowUps.length})
            </button>

            <button
              onClick={() => setActiveTab('fit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'fit' ? 'bg-amber-600 text-white shadow-lg' : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'}`}
            >
              <Dumbbell size={14} /> Fit Ninja Users ({fitClients.length})
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'blogs' ? 'bg-brand-primary text-white shadow-lg' : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'}`}
            >
              <FileText size={14} /> Insights & Blogs ({blogs.length})
            </button>
          </div>

          <button onClick={loadAllData} className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors ml-auto">
            <Activity size={12} className={loadingData ? 'animate-spin text-brand-primary' : ''} /> {loadingData ? 'Syncing...' : 'Refresh CRM'}
          </button>
        </div>

        {/* 1. LEADS INBOX TAB */}
        {activeTab === 'leads' && (
          <div className="bg-[#0e121d] border border-neutral-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Mail size={16} className="text-blue-400" /> Inbound Lead Management
                </h2>
                <p className="text-xs text-neutral-400">Track, update, schedule follow-ups, and convert incoming client inquiries</p>
              </div>

              <div className="flex items-center gap-2">
                <Filter size={14} className="text-neutral-500" />
                <select
                  value={leadStatusFilter}
                  onChange={e => setLeadStatusFilter(e.target.value)}
                  className="bg-[#141a29] border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Pipeline Statuses</option>
                  <option value="new">New Leads</option>
                  <option value="contacted">Contacted</option>
                  <option value="demo_scheduled">Demo Scheduled</option>
                  <option value="proposal_sent">Proposal Sent</option>
                  <option value="closed_won">Closed Won 🎉</option>
                  <option value="closed_lost">Closed Lost</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 text-[11px] uppercase tracking-wider font-semibold">
                    <th className="pb-3 pr-4">Lead Name & Email</th>
                    <th className="pb-3 pr-4">Company & Website</th>
                    <th className="pb-3 pr-4">Pipeline Status</th>
                    <th className="pb-3 pr-4">Next Follow-Up</th>
                    <th className="pb-3 pr-4">Received</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50 text-xs">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-neutral-500 italic">No matching leads found.</td>
                    </tr>
                  ) : (
                    filteredLeads.map(lead => {
                      const pill = STATUS_PILLS[lead.status || 'new'] || STATUS_PILLS.new;
                      return (
                        <tr key={lead.id} className="hover:bg-[#131826] transition-colors">
                          <td className="py-3.5 pr-4">
                            <div className="font-bold text-white text-sm">{lead.name}</div>
                            <div className="text-neutral-400 text-[11px]">{lead.email}</div>
                            {lead.phone && <div className="text-neutral-500 text-[10px]">{lead.phone}</div>}
                          </td>
                          <td className="py-3.5 pr-4">
                            <div className="font-semibold text-neutral-300">{lead.company || '-'}</div>
                            {lead.website && (
                              <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noreferrer" className="text-[11px] text-blue-400 hover:underline flex items-center gap-1">
                                <Globe size={10} /> {lead.website.replace(/^https?:\/\//, '')}
                              </a>
                            )}
                          </td>
                          <td className="py-3.5 pr-4">
                            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border border-neutral-700/50 uppercase ${pill.color}`}>
                              {pill.label}
                            </span>
                          </td>
                          <td className="py-3.5 pr-4">
                            {lead.next_follow_up || lead.nextFollowUp ? (
                              <div className="text-purple-400 font-semibold flex items-center gap-1">
                                <Clock size={12} /> {(lead.next_follow_up || lead.nextFollowUp).split('T')[0]}
                              </div>
                            ) : (
                              <span className="text-neutral-600 italic">Not set</span>
                            )}
                          </td>
                          <td className="py-3.5 pr-4 text-neutral-400">
                            {lead.date || (lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-IN') : '-')}
                          </td>
                          <td className="py-3.5 text-right">
                            <div className="flex gap-1.5 justify-end">
                              <button 
                                onClick={() => { setScheduleTargetType('lead'); setScheduleTargetId(lead.id); setShowScheduleModal(true); }} 
                                className="bg-purple-500/10 hover:bg-purple-600 text-purple-400 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                                title="Schedule Call Date"
                              >
                                <Calendar size={12} /> Call
                              </button>
                              <button onClick={() => setEditLead(lead)} className="bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
                                <Edit3 size={12} /> Edit
                              </button>
                              <button onClick={() => handleDeleteLead(lead.id)} className="bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white p-1.5 rounded-lg text-xs transition-colors" title="Delete Lead">
                                <Trash2 size={12} />
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

        {/* 2. CLIENT WORKSPACES TAB */}
        {activeTab === 'clients' && (
          <div className="bg-[#0e121d] border border-neutral-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Building size={16} className="text-emerald-400" /> Content Studio Client Workspaces
                </h2>
                <p className="text-xs text-neutral-400">Manage brand accounts, active subscriptions, and generation limits</p>
              </div>

              <div className="flex items-center gap-2">
                <Filter size={14} className="text-neutral-500" />
                <select
                  value={clientStatusFilter}
                  onChange={e => setClientStatusFilter(e.target.value)}
                  className="bg-[#141a29] border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">All Access States</option>
                  <option value="active">Active Members Only</option>
                  <option value="blocked">Blocked / Expired Only</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 text-[11px] uppercase tracking-wider font-semibold">
                    <th className="pb-3 pr-4">Brand & Niche</th>
                    <th className="pb-3 pr-4">Contact Person</th>
                    <th className="pb-3 pr-4">Plan & Status</th>
                    <th className="pb-3 pr-4">Next Follow-Up</th>
                    <th className="pb-3 pr-4">Joined</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50 text-xs">
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-neutral-500 italic">No matching client workspaces found.</td>
                    </tr>
                  ) : (
                    filteredClients.map(client => (
                      <tr key={client.id} className="hover:bg-[#131826] transition-colors">
                        <td className="py-3.5 pr-4">
                          <div className="font-bold text-white text-sm">{client.brandName}</div>
                          <div className="text-neutral-400 text-[11px]">{client.niche}</div>
                        </td>
                        <td className="py-3.5 pr-4">
                          <div className="text-neutral-200">{client.email}</div>
                          <div className="text-neutral-400 text-[11px]">{client.phone || '-'}</div>
                        </td>
                        <td className="py-3.5 pr-4">
                          <div className="flex flex-col gap-1 items-start">
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {client.planName || 'Agency Plan'}
                            </span>
                            <span className={`text-[10px] font-bold ${client.paymentStatus === 'expired' || client.active === false ? 'text-rose-400' : 'text-emerald-400'}`}>
                              ● {client.paymentStatus === 'expired' || client.active === false ? 'Blocked / Expired' : 'Active'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 pr-4">
                          {client.nextFollowUp || client.next_follow_up ? (
                            <div className="text-purple-400 font-semibold flex items-center gap-1">
                              <Clock size={12} /> {(client.nextFollowUp || client.next_follow_up).split('T')[0]}
                            </div>
                          ) : (
                            <span className="text-neutral-600 italic">Not set</span>
                          )}
                        </td>
                        <td className="py-3.5 pr-4 text-neutral-400">
                          {client.joinDate || (client.created_at ? new Date(client.created_at).toLocaleDateString('en-IN') : '-')}
                        </td>
                        <td className="py-3.5 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button onClick={() => handleViewClientHist(client)} className="bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors">
                              History
                            </button>
                            <button onClick={() => setEditClient(client)} className="bg-emerald-500/10 hover:bg-emerald-600 text-emerald-400 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
                              <Edit3 size={12} /> Manage
                            </button>
                            <button onClick={() => handleDeleteClient(client.id)} className="bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white p-1.5 rounded-lg text-xs transition-colors" title="Delete Workspace">
                              <Trash2 size={12} />
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

        {/* 3. WORK CALENDAR TAB */}
        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#0e121d] border border-neutral-800/80 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar size={16} className="text-purple-400" /> Work & Task Calendar
                  </h2>
                  <p className="text-xs text-neutral-400">Scheduled client calls, demos, and follow-up deadlines</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}
                    className="p-1.5 bg-[#141a29] hover:bg-neutral-800 text-neutral-300 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm font-bold text-white min-w-[120px] text-center">
                    {calendarMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <button 
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
                    className="p-1.5 bg-[#141a29] hover:bg-neutral-800 text-neutral-300 rounded-lg transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Monthly Grid */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="font-bold text-neutral-500 uppercase text-[10px] py-1">{day}</div>
                ))}
                {Array.from({ length: 35 }).map((_, idx) => {
                  const firstDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay();
                  const dayNum = idx - firstDay + 1;
                  const totalDays = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
                  const isValid = dayNum > 0 && dayNum <= totalDays;
                  
                  const dateStr = isValid ? `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}` : '';
                  const hasEvents = isValid && allFollowUps.some(item => item.date === dateStr);
                  const isSelected = dateStr === selectedDate;

                  return (
                    <button
                      key={idx}
                      disabled={!isValid}
                      onClick={() => isValid && setSelectedDate(dateStr)}
                      className={`h-12 rounded-xl p-1 flex flex-col justify-between items-center transition-all text-xs relative ${
                        !isValid ? 'opacity-20 cursor-default' : 
                        isSelected ? 'bg-purple-600 text-white font-bold shadow-lg ring-2 ring-purple-400' :
                        hasEvents ? 'bg-[#182033] border border-purple-500/40 text-purple-300 hover:bg-[#202a42]' :
                        'bg-[#131926] hover:bg-[#1b2336] text-neutral-300'
                      }`}
                    >
                      <span>{isValid ? dayNum : ''}</span>
                      {hasEvents && (
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-purple-400 animate-pulse'}`}></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Date Tasks */}
            <div className="bg-[#0e121d] border border-neutral-800/80 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock size={14} className="text-purple-400" /> Agenda for {selectedDate}
                  </h3>
                  <p className="text-xs text-neutral-400">{selectedDateFollowups.length} task(s) scheduled</p>
                </div>
                <button 
                  onClick={() => { setScheduleDate(selectedDate); setShowScheduleModal(true); }}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  + Add Call
                </button>
              </div>

              <div className="space-y-3">
                {selectedDateFollowups.length === 0 ? (
                  <div className="py-12 text-center text-neutral-500 italic text-xs space-y-3">
                    <div>No follow-ups or calls scheduled for this date.</div>
                    <button 
                      onClick={() => { setScheduleDate(selectedDate); setShowScheduleModal(true); }}
                      className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-purple-500/30 transition-colors"
                    >
                      + Schedule Follow-up for {selectedDate}
                    </button>
                  </div>
                ) : (
                  selectedDateFollowups.map((item, idx) => (
                    <div key={idx} className="bg-[#131926] border border-neutral-800 p-3.5 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.type === 'lead' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                          {item.type}
                        </span>
                        <button 
                          onClick={() => item.type === 'lead' ? setEditLead(item.data) : setEditClient(item.data)}
                          className="text-[11px] text-purple-400 hover:underline font-bold"
                        >
                          Open Editor →
                        </button>
                      </div>
                      <div className="font-bold text-sm text-white">{item.title}</div>
                      <p className="text-xs text-neutral-400 italic">"{item.notes}"</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. FIT NINJA USERS TAB */}
        {activeTab === 'fit' && (
          <div className="bg-[#0e121d] border border-neutral-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Dumbbell size={16} className="text-amber-400" /> Fit Ninja App Subscribers
                </h2>
                <p className="text-xs text-neutral-400">View user assessments, calorie goals, and manage app access</p>
              </div>

              <div className="flex items-center gap-2">
                <Filter size={14} className="text-neutral-500" />
                <select
                  value={fitStatusFilter}
                  onChange={e => setFitStatusFilter(e.target.value)}
                  className="bg-[#141a29] border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Plans</option>
                  <option value="premium">Premium Only</option>
                  <option value="free">Free Only</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 text-[11px] uppercase tracking-wider font-semibold">
                    <th className="pb-3 pr-4">User</th>
                    <th className="pb-3 pr-4">Fitness Goals</th>
                    <th className="pb-3 pr-4">Plan Status</th>
                    <th className="pb-3 pr-4">Daily Targets</th>
                    <th className="pb-3 pr-4">Joined</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50 text-xs">
                  {filteredFit.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-neutral-500 italic">No Fit Ninja profiles found.</td>
                    </tr>
                  ) : (
                    filteredFit.map(fit => (
                      <tr key={fit.id} className="hover:bg-[#131826] transition-colors">
                        <td className="py-3.5 pr-4">
                          <div className="font-bold text-white text-sm">{fit.name || 'Anonymous'}</div>
                          <div className="text-neutral-400 text-[11px]">{fit.email}</div>
                        </td>
                        <td className="py-3.5 pr-4 font-semibold text-neutral-300 capitalize">
                          {fit.assessment_data?.goal?.replace('_', ' ') || 'General Fitness'}
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase ${fit.plan_status === 'premium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-neutral-800 text-neutral-400'}`}>
                            {fit.plan_status || 'free'}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 text-neutral-300">
                          {fit.generated_plan ? `${fit.generated_plan.kcal} kcal` : <span className="text-neutral-600 italic">Not generated</span>}
                        </td>
                        <td className="py-3.5 pr-4 text-neutral-400">
                          {fit.created_at ? new Date(fit.created_at).toLocaleDateString('en-IN') : '-'}
                        </td>
                        <td className="py-3.5 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button onClick={() => setViewFitClientDetails(fit)} className="bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors">
                              Details
                            </button>
                            <button onClick={() => { setManageFitStatus(fit); setNewFitStatus(fit.plan_status || 'free'); }} className="bg-amber-500/10 hover:bg-amber-600 text-amber-400 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors">
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

        {/* 5. BLOGS & INSIGHTS TAB */}
        {activeTab === 'blogs' && (
          <div className="bg-[#0e121d] border border-neutral-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText size={16} className="text-brand-primary" /> Agency Insights & Articles
                </h2>
                <p className="text-xs text-neutral-400">Publish performance marketing case studies and guides</p>
              </div>
              <button onClick={() => { setCurrentBlog({ id: '', title: '', content: '', excerpt: '', author: 'Admin' }); setIsEditingBlog(true); }} className="bg-brand-primary hover:opacity-90 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-opacity flex items-center gap-1.5">
                <Plus size={14} /> New Post
              </button>
            </div>

            {isEditingBlog ? (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Post Title"
                  value={currentBlog.title}
                  onChange={e => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                  className="w-full bg-[#131926] border border-neutral-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-primary"
                />
                <textarea
                  placeholder="Excerpt summary..."
                  value={currentBlog.excerpt}
                  onChange={e => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                  rows={2}
                  className="w-full bg-[#131926] border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-primary"
                />
                <textarea
                  placeholder="Markdown content..."
                  value={currentBlog.content}
                  onChange={e => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                  rows={10}
                  className="w-full bg-[#131926] border border-neutral-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-brand-primary"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setIsEditingBlog(false)} className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold">Cancel</button>
                  <button onClick={async () => {
                    await fetch(getApiUrl('/api/data?resource=blogs'), {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(currentBlog)
                    });
                    setIsEditingBlog(false);
                    fetchBlogs();
                  }} className="px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-bold">Save Post</button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {blogs.map(blog => (
                  <div key={blog.id} className="bg-[#131926] border border-neutral-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{blog.title}</div>
                      <div className="text-xs text-neutral-400 mt-1">{blog.excerpt}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setCurrentBlog(blog); setIsEditingBlog(true); }} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold">Edit</button>
                      <button onClick={async () => {
                        if (window.confirm('Delete blog post?')) {
                          await fetch(getApiUrl(`/api/data?resource=blogs&id=${blog.id}`), { method: 'DELETE' });
                          fetchBlogs();
                        }
                      }} className="p-2 bg-rose-500/10 text-rose-400 rounded-lg text-xs"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ── MODALS ──────────────────────────────────────────────── */}

      {/* SCHEDULE CALL / TASK MODAL */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar size={16} className="text-purple-400" /> Schedule Call / Task
              </h3>
              <button onClick={() => setShowScheduleModal(false)} className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"><X size={16} /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Target Type</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setScheduleTargetType('lead'); setScheduleTargetId(leads[0]?.id || ''); }}
                    className={`flex-1 py-2 rounded-xl border text-xs font-bold ${scheduleTargetType === 'lead' ? 'bg-blue-600 text-white border-blue-500' : 'bg-[#141a29] text-neutral-400 border-neutral-800'}`}
                  >
                    Lead
                  </button>
                  <button 
                    onClick={() => { setScheduleTargetType('client'); setScheduleTargetId(clients[0]?.id || ''); }}
                    className={`flex-1 py-2 rounded-xl border text-xs font-bold ${scheduleTargetType === 'client' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-[#141a29] text-neutral-400 border-neutral-800'}`}
                  >
                    Client Workspace
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Select {scheduleTargetType === 'lead' ? 'Lead' : 'Client Workspace'}</label>
                <select 
                  value={scheduleTargetId} 
                  onChange={e => setScheduleTargetId(e.target.value)}
                  className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">-- Choose Target --</option>
                  {scheduleTargetType === 'lead' ? (
                    leads.map(l => <option key={l.id} value={l.id}>{l.name} ({l.company || l.email})</option>)
                  ) : (
                    clients.map(c => <option key={c.id} value={c.id}>{c.brandName} ({c.niche})</option>)
                  )}
                </select>
              </div>

              <div>
                <label className="block font-bold text-purple-400 uppercase tracking-wider mb-1">Follow-Up Date</label>
                <input 
                  type="date" 
                  value={scheduleDate} 
                  onChange={e => setScheduleDate(e.target.value)}
                  className="w-full bg-[#141a29] border border-purple-500/40 rounded-xl p-3 text-purple-300 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Call / Task Notes</label>
                <textarea 
                  rows={3} 
                  value={scheduleNotes} 
                  onChange={e => setScheduleNotes(e.target.value)}
                  placeholder="e.g. Discuss Q3 growth retainer, send audit slides..."
                  className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button onClick={() => setShowScheduleModal(false)} className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold">Cancel</button>
              <button onClick={handleScheduleSubmit} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">Save Event</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT LEAD MODAL */}
      {editLead && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 size={16} className="text-blue-400" /> Edit Lead Details
              </h3>
              <button onClick={() => setEditLead(null)} className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"><X size={16} /></button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Lead Name</label>
                <input type="text" value={editLead.name || ''} onChange={e => setEditLead({ ...editLead, name: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Email</label>
                <input type="email" value={editLead.email || ''} onChange={e => setEditLead({ ...editLead, email: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Phone</label>
                <input type="text" value={editLead.phone || ''} onChange={e => setEditLead({ ...editLead, phone: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Company / Brand</label>
                <input type="text" value={editLead.company || ''} onChange={e => setEditLead({ ...editLead, company: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Pipeline Status</label>
                <select value={editLead.status || 'new'} onChange={e => setEditLead({ ...editLead, status: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white">
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="demo_scheduled">Demo Scheduled</option>
                  <option value="proposal_sent">Proposal Sent</option>
                  <option value="closed_won">Closed Won 🎉</option>
                  <option value="closed_lost">Closed Lost</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-purple-400 uppercase tracking-wider mb-1">Next Follow-Up Date</label>
                <input type="date" value={(editLead.next_follow_up || editLead.nextFollowUp || '').split('T')[0]} onChange={e => setEditLead({ ...editLead, nextFollowUp: e.target.value, next_follow_up: e.target.value })} className="w-full bg-[#141a29] border border-purple-500/40 rounded-xl p-2.5 text-purple-300" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">Follow-Up & Call Notes</label>
              <textarea rows={3} value={editLead.follow_up_notes || editLead.followUpNotes || ''} onChange={e => setEditLead({ ...editLead, followUpNotes: e.target.value })} placeholder="Log call notes or follow-up details..." className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3 text-xs text-white" />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button onClick={() => setEditLead(null)} className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold">Cancel</button>
              <button onClick={() => handleSaveLead(editLead)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold">Save Lead</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CLIENT MODAL */}
      {editClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 size={16} className="text-emerald-400" /> Manage Client Workspace
              </h3>
              <button onClick={() => setEditClient(null)} className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"><X size={16} /></button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Brand Name</label>
                <input type="text" value={editClient.brandName || ''} onChange={e => setEditClient({ ...editClient, brandName: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Niche</label>
                <input type="text" value={editClient.niche || ''} onChange={e => setEditClient({ ...editClient, niche: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Email</label>
                <input type="email" value={editClient.email || ''} onChange={e => setEditClient({ ...editClient, email: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Access Status</label>
                <select value={editClient.active !== false ? 'active' : 'blocked'} onChange={e => setEditClient({ ...editClient, active: e.target.value === 'active' })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white">
                  <option value="active">Active (Access Allowed)</option>
                  <option value="blocked">Blocked / Suspended</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase tracking-wider mb-1">Plan Name</label>
                <input type="text" value={editClient.planName || ''} onChange={e => setEditClient({ ...editClient, planName: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="block font-bold text-purple-400 uppercase tracking-wider mb-1">Next Follow-Up / Call Date</label>
                <input type="date" value={(editClient.nextFollowUp || editClient.next_follow_up || '').split('T')[0]} onChange={e => setEditClient({ ...editClient, nextFollowUp: e.target.value, next_follow_up: e.target.value })} className="w-full bg-[#141a29] border border-purple-500/40 rounded-xl p-2.5 text-purple-300" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Tone of Voice & AI Profile</label>
              <input type="text" value={editClient.toneOfVoice || ''} onChange={e => setEditClient({ ...editClient, toneOfVoice: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-xs text-white" />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Client Notes</label>
              <textarea rows={3} value={editClient.notes || ''} onChange={e => setEditClient({ ...editClient, notes: e.target.value })} placeholder="Account notes..." className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3 text-xs text-white" />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button onClick={() => setEditClient(null)} className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold">Cancel</button>
              <button onClick={() => handleSaveClient(editClient)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold">Save Workspace</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD LEAD MODAL */}
      {showAddLead && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-neutral-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus size={16} className="text-blue-400" /> Add Manual Lead
              </h3>
              <button onClick={() => setShowAddLead(false)} className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"><X size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-400 uppercase mb-1">Lead Name *</label>
                <input type="text" value={newLeadForm.name} onChange={e => setNewLeadForm({ ...newLeadForm, name: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase mb-1">Email *</label>
                <input type="email" value={newLeadForm.email} onChange={e => setNewLeadForm({ ...newLeadForm, email: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase mb-1">Phone</label>
                <input type="text" value={newLeadForm.phone} onChange={e => setNewLeadForm({ ...newLeadForm, phone: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" placeholder="+91..." />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase mb-1">Company</label>
                <input type="text" value={newLeadForm.company} onChange={e => setNewLeadForm({ ...newLeadForm, company: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" placeholder="Acme Inc" />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button onClick={() => setShowAddLead(false)} className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold">Cancel</button>
              <button onClick={() => {
                if (!newLeadForm.name || !newLeadForm.email) return alert('Name and Email required');
                handleSaveLead({ ...newLeadForm, id: `lead_${Date.now()}` });
              }} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">Create Lead</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD CLIENT MODAL */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-neutral-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus size={16} className="text-emerald-400" /> Create Client Workspace
              </h3>
              <button onClick={() => setShowAddClient(false)} className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"><X size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-400 uppercase mb-1">Brand Name *</label>
                <input type="text" value={newClientForm.brandName} onChange={e => setNewClientForm({ ...newClientForm, brandName: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" placeholder="Gym Brand" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase mb-1">Niche *</label>
                <input type="text" value={newClientForm.niche} onChange={e => setNewClientForm({ ...newClientForm, niche: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" placeholder="Fitness" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase mb-1">Email *</label>
                <input type="email" value={newClientForm.email} onChange={e => setNewClientForm({ ...newClientForm, email: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" placeholder="info@brand.com" />
              </div>
              <div>
                <label className="block font-bold text-neutral-400 uppercase mb-1">Phone</label>
                <input type="text" value={newClientForm.phone} onChange={e => setNewClientForm({ ...newClientForm, phone: e.target.value })} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-2.5 text-white" placeholder="+91..." />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button onClick={() => setShowAddClient(false)} className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold">Cancel</button>
              <button onClick={() => {
                if (!newClientForm.brandName || !newClientForm.email) return alert('Brand name and Email required');
                handleSaveClient({ ...newClientForm, id: `client_${Date.now()}` });
              }} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">Create Workspace</button>
            </div>
          </div>
        </div>
      )}

      {/* FIT NINJA MANAGE MODAL */}
      {manageFitStatus && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-neutral-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Dumbbell size={16} className="text-amber-400" /> Manage Fit Ninja Access
              </h3>
              <button onClick={() => setManageFitStatus(null)} className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"><X size={16} /></button>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Membership Status</label>
              <select value={newFitStatus} onChange={e => setNewFitStatus(e.target.value)} className="w-full bg-[#141a29] border border-neutral-800 rounded-xl p-3 text-sm text-white">
                <option value="premium">Premium (Full Access)</option>
                <option value="free">Free (Locked Onboarding)</option>
                <option value="blocked">Blocked / Suspended</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button onClick={() => setManageFitStatus(null)} className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold">Cancel</button>
              <button onClick={handleSaveFitStatus} className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold">Save Status</button>
            </div>
          </div>
        </div>
      )}

      {/* FIT NINJA DETAILS MODAL */}
      {viewFitClientDetails && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white">{viewFitClientDetails.name || 'Anonymous'}</h3>
              <button onClick={() => setViewFitClientDetails(null)} className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"><X size={16} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><span className="text-neutral-500">Email:</span> <b className="text-white">{viewFitClientDetails.email}</b></div>
              <div><span className="text-neutral-500">Goal:</span> <b className="text-white capitalize">{viewFitClientDetails.assessment_data?.goal || '-'}</b></div>
              <div><span className="text-neutral-500">Calories:</span> <b className="text-emerald-400">{viewFitClientDetails.generated_plan?.kcal || '-'} kcal</b></div>
              <div><span className="text-neutral-500">Protein:</span> <b className="text-amber-400">{viewFitClientDetails.generated_plan?.protein || '-'}g</b></div>
            </div>
          </div>
        </div>
      )}

      {/* CLIENT HISTORY MODAL */}
      {viewClientHist && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e121d] border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white">{viewClientHist.brandName} - Generation History</h3>
              <button onClick={() => setViewClientHist(null)} className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              {clientHistData.length === 0 ? (
                <div className="text-neutral-500 italic text-center py-6">No historical generation logs found for this client.</div>
              ) : (
                clientHistData.map((h: any, idx: number) => (
                  <div key={idx} className="bg-[#131926] p-3 rounded-xl border border-neutral-800 space-y-1">
                    <div className="font-bold text-white">Week {h.week || idx + 1} - {h.date}</div>
                    <div className="text-neutral-400 text-[11px] font-mono whitespace-pre-wrap">{JSON.stringify(h.posts || h, null, 2)}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
