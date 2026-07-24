import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, Lock, Mail, Phone, Globe, Building, Calendar, Check, Shield, Activity, Dumbbell, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

// 🔒 Admin Auth Gate 🔒
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'sn@admin2026';
const AUTH_KEY = 'sn_admin_auth';

const AdminLogin: React.FC<{ onAuth: () => void }> = ({ onAuth }) => {
    const [pw, setPw] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const attempt = () => {
        setLoading(true);
        setTimeout(() => {
            if (pw === ADMIN_PASSWORD) {
                sessionStorage.setItem(AUTH_KEY, '1');
                onAuth();
            } else {
                setErr('Incorrect password. Try again.');
                setPw('');
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
            <SEO title="Admin Login | Social Ninja's" description="" />
            <div className="w-full max-w-sm bg-[#0b0f19] border border-neutral-800 rounded-2xl p-8">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 mx-auto mb-6">
                    <Lock size={24} className="text-blue-500" />
                </div>
                <h1 className="text-2xl font-bold text-white text-center mb-1">Admin Access</h1>
                <p className="text-neutral-500 text-sm text-center mb-6">Social Ninja's Control Panel</p>
                <input
                    type="password"
                    value={pw}
                    onChange={e => { setPw(e.target.value); setErr(''); }}
                    onKeyDown={e => e.key === 'Enter' && attempt()}
                    placeholder="Enter admin password"
                    className="w-full bg-[#131926] border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50 mb-3"
                    autoFocus
                />
                {err && <p className="text-amber-500 text-xs mb-3">⚠️ {err}</p>}
                <button
                    onClick={attempt}
                    disabled={loading || !pw}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3 text-sm disabled:opacity-40 transition-all"
                >
                    {loading ? 'Checking...' : 'Enter Console'}
                </button>
            </div>
        </div>
    );
};

const Admin: React.FC = () => {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1');
    const [blogs, setBlogs] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [leads, setLeads] = useState<any[]>([]);
    const [fitClients, setFitClients] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'leads' | 'clients' | 'fit' | 'blogs'>('leads');
    const [isEditing, setIsEditing] = useState(false);
    const [currentBlog, setCurrentBlog] = useState({ id: '', title: '', content: '', excerpt: '', author: 'Admin' });
    
    // View Modals
    const [viewClientHist, setViewClientHist] = useState<any>(null);
    const [clientHistData, setClientHistData] = useState<any[]>([]);
    const [viewLeadDetails, setViewLeadDetails] = useState<any>(null);
    const [viewFitClientDetails, setViewFitClientDetails] = useState<any>(null);

    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        if (authed) {
            loadAllData();
        }
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

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/data?resource=blogs');
            const data = await res.json();
            setBlogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        }
    };

    const fetchLeads = async () => {
        try {
            const res = await fetch('/api/data?resource=leads');
            const data = await res.json();
            setLeads(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch leads', error);
        }
    };

    const fetchClients = async () => {
        try {
            const res = await fetch('/api/data?resource=clients');
            const data = await res.json();
            setClients(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch clients from server', error);
        }
    };

    const fetchFitClients = async () => {
        try {
            const res = await fetch('/api/fit-clients');
            if (res.ok) {
                const data = await res.json();
                setFitClients(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error('Failed to fetch Fit Ninja profiles', error);
        }
    };

    const handleSave = async () => {
        try {
            await fetch('/api/data?resource=blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentBlog)
            });
            setIsEditing(false);
            setCurrentBlog({ id: '', title: '', content: '', excerpt: '', author: 'Admin' });
            fetchBlogs();
        } catch (error) {
            console.error('Failed to save blog', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        try {
            await fetch(`/api/data?resource=blogs&id=${id}`, { method: 'DELETE' });
            fetchBlogs();
        } catch (error) {
            console.error('Failed to delete blog', error);
        }
    };

    const handleViewClient = async (client: any) => {
        setViewClientHist(client);
        setClientHistData([]);
        try {
            // Local history fallback
            const histRaw = localStorage.getItem(`snstudio_hist_${client.id}`);
            if (histRaw) {
                const data = JSON.parse(histRaw);
                setClientHistData(Array.isArray(data) ? data : []);
                return;
            }
            // Fetch from backend History
            const res = await fetch('/api/data?resource=history&clientId=' + client.id);
            if (res.ok) {
                const data = await res.json();
                setClientHistData(data);
            }
        } catch (e) {
            console.error("History fetch error:", e);
        }
    };

    if (!authed) return <AdminLogin onAuth={() => setAuthed(true)} />;

    return (
        <div className="pt-24 min-h-screen bg-[#020617] text-white p-6 font-sans">
            <SEO title="CRM Dashboard | Social Ninja's" description="Agency Admin Control Panel" />
            
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Shield size={20} className="text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold font-display tracking-tight">Social Ninja's CRM</h1>
                        <p className="text-xs text-neutral-400">Control Panel & Live Leads Center</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={loadAllData} className="text-xs bg-[#0b0f19] border border-neutral-800 rounded-lg px-3 py-1.5 hover:bg-neutral-800 transition-colors">
                        🔄 Refresh Data
                    </button>
                    <button onClick={() => { sessionStorage.removeItem('sn_admin_auth'); setAuthed(false); }}
                        className="text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-1.5 transition-all">
                        🔒 Lock Admin
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-6xl mx-auto mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
               {[
                   { id: 'leads', name: '📩 Leads Inbox', count: leads.length },
                   { id: 'clients', name: '✨ Content Studio', count: clients.length },
                   { id: 'fit', name: '💪 Fit Ninja Users', count: fitClients.length },
                   { id: 'blogs', name: '📝 Blog Admin', count: blogs.length }
               ].map(tab => (
                   <button 
                       key={tab.id}
                       onClick={() => { setActiveTab(tab.id as any); setIsEditing(false); }}
                       className={`px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-sm whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/15' : 'bg-[#0b0f19] text-neutral-400 border border-neutral-800 hover:bg-neutral-800'}`}
                   >
                       {tab.name}
                       <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                           {tab.count}
                       </span>
                   </button>
               ))}
            </div>

            {/* Main Panel Card */}
            <div className="max-w-6xl mx-auto border border-neutral-800 rounded-2xl p-8 bg-[#0b0f19]/70 backdrop-blur-md">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-800">
                    <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                        {activeTab === 'leads' && "📩 Main Site Contact Leads"}
                        {activeTab === 'clients' && "✨ Content Studio Workspaces"}
                        {activeTab === 'fit' && "💪 Fit Ninja Premium & Assessment Profiles"}
                        {activeTab === 'blogs' && "📝 Blog Post Management"}
                    </h2>
                    {activeTab === 'blogs' && !isEditing && (
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors"
                            onClick={() => { setIsEditing(true); setCurrentBlog({ id: '', title: '', content: '', excerpt: '', author: 'Admin' }); }}
                        >
                            <Plus size={16} /> New Post
                        </button>
                    )}
                </div>

                {loadingData && (
                    <div className="text-center py-20 text-neutral-400 animate-pulse">Loading database contents...</div>
                )}

                {!loadingData && (
                    <>
                        {/* 1. LEADS TAB */}
                        {activeTab === 'leads' && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
                                            <th className="pb-4 pr-4">Lead Info</th>
                                            <th className="pb-4 pr-4">Company Details</th>
                                            <th className="pb-4 pr-4">Contact Phone</th>
                                            <th className="pb-4 pr-4">Date</th>
                                            <th className="pb-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leads.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center text-neutral-500 italic">No contact form leads recorded yet.</td>
                                            </tr>
                                        ) : (
                                            leads.map(lead => (
                                                <tr key={lead.id} className="border-b border-neutral-800 hover:bg-neutral-800/30 transition-colors">
                                                    <td className="py-4 pr-4">
                                                        <div className="font-bold text-white">{lead.name}</div>
                                                        <div className="text-xs text-neutral-400">{lead.email}</div>
                                                    </td>
                                                    <td className="py-4 pr-4">
                                                        <div className="text-sm font-semibold text-neutral-300">{lead.company || '-'}</div>
                                                        {lead.website && (
                                                            <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                                                                <Globe size={10} /> {lead.website}
                                                            </a>
                                                        )}
                                                    </td>
                                                    <td className="py-4 pr-4 text-sm text-neutral-300">
                                                        {lead.phone || '-'}
                                                    </td>
                                                    <td className="py-4 text-sm text-neutral-400">
                                                        {lead.date || lead.created_at || '-'}
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <button onClick={() => setViewLeadDetails(lead)} className="text-xs text-blue-400 hover:text-white font-bold bg-blue-500/10 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors">
                                                            View Message
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* 2. CONTENT STUDIO CLIENTS TAB */}
                        {activeTab === 'clients' && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
                                            <th className="pb-4 pr-4">Brand / Niche</th>
                                            <th className="pb-4 pr-4">Contact</th>
                                            <th className="pb-4 pr-4">Plan & Status</th>
                                            <th className="pb-4 pr-4">Payment Info</th>
                                            <th className="pb-4 pr-4">Member Since</th>
                                            <th className="pb-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clients.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="py-12 text-center text-neutral-500 italic">No Content Studio clients found.</td>
                                            </tr>
                                        ) : (
                                            clients.map(client => (
                                                <tr key={client.id} className="border-b border-neutral-800 hover:bg-neutral-800/30 transition-colors">
                                                    <td className="py-4 pr-4">
                                                        <div className="font-bold text-white">{client.brandName}</div>
                                                        <div className="text-xs text-neutral-400">{client.niche}</div>
                                                    </td>
                                                    <td className="py-4 pr-4">
                                                        <div className="text-sm text-neutral-200">{client.email}</div>
                                                        <div className="text-xs text-neutral-400">{client.phone || '-'}</div>
                                                    </td>
                                                    <td className="py-4 pr-4">
                                                        <div className="flex flex-col gap-1 items-start">
                                                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${client.plan === 'trial' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                                                                {client.planName || 'Free Trial'}
                                                            </span>
                                                            <span className={`text-[10px] font-bold ${client.paymentStatus === 'expired' || client.active === false ? 'text-red-400' : 'text-emerald-400'}`}>
                                                                ● {client.paymentStatus === 'expired' || client.active === false ? 'Expired' : 'Active'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 pr-4 text-xs">
                                                        <div className="text-neutral-300">PayID: <code className="bg-neutral-800 px-1 py-0.5 rounded text-[10px]">{client.paymentId || 'None'}</code></div>
                                                        {client.subscriptionId && <div className="text-neutral-400 mt-1">SubID: <code className="bg-neutral-800 px-1 py-0.5 rounded text-[10px]">{client.subscriptionId}</code></div>}
                                                    </td>
                                                    <td className="py-4 text-sm text-neutral-400">
                                                        {client.joinDate}
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <button onClick={() => handleViewClient(client)} className="text-xs text-blue-400 hover:text-white font-bold bg-blue-500/10 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors">
                                                            History
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* 3. FIT NINJA CLIENTS TAB */}
                        {activeTab === 'fit' && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
                                            <th className="pb-4 pr-4">User</th>
                                            <th className="pb-4 pr-4">Fitness Goals</th>
                                            <th className="pb-4 pr-4">Plan Status</th>
                                            <th className="pb-4 pr-4">Daily Targets</th>
                                            <th className="pb-4 pr-4">Joined</th>
                                            <th className="pb-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fitClients.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="py-12 text-center text-neutral-500 italic">No Fit Ninja profiles found in Supabase database.</td>
                                            </tr>
                                        ) : (
                                            fitClients.map(fit => (
                                                <tr key={fit.id} className="border-b border-neutral-800 hover:bg-neutral-800/30 transition-colors">
                                                    <td className="py-4 pr-4">
                                                        <div className="font-bold text-white">{fit.name || 'Anonymous'}</div>
                                                        <div className="text-xs text-neutral-400">{fit.email}</div>
                                                        {fit.phone && <div className="text-[10px] text-neutral-500">{fit.phone}</div>}
                                                    </td>
                                                    <td className="py-4 pr-4">
                                                        <div className="text-sm font-semibold text-neutral-300">
                                                            {fit.assessment_data?.goal === 'fat_loss' ? '🔥 Fat Loss' : fit.assessment_data?.goal === 'weight_gain' ? '💪 Weight Gain' : '⚡ Performance'}
                                                        </div>
                                                        <div className="text-xs text-neutral-400 uppercase">{fit.assessment_data?.diet || 'nonveg'} • {fit.assessment_data?.gender}</div>
                                                    </td>
                                                    <td className="py-4 pr-4">
                                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${fit.plan_status === 'premium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-neutral-700 text-neutral-400'}`}>
                                                            {fit.plan_status || 'free'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 pr-4 text-xs text-neutral-300">
                                                        {fit.generated_plan ? (
                                                            <div>
                                                                <div>🔥 {fit.generated_plan.kcal} kcal</div>
                                                                <div className="text-neutral-400 mt-0.5">🥩 {fit.generated_plan.protein}g protein</div>
                                                            </div>
                                                        ) : (
                                                            <span className="text-neutral-500 italic">Plan not generated</span>
                                                        )}
                                                    </td>
                                                    <td className="py-4 text-sm text-neutral-400">
                                                        {fit.created_at ? new Date(fit.created_at).toLocaleDateString('en-IN') : '-'}
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <button onClick={() => setViewFitClientDetails(fit)} className="text-xs text-blue-400 hover:text-white font-bold bg-blue-500/10 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors">
                                                            Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* 4. BLOGS TAB */}
                        {activeTab === 'blogs' && (
                            <>
                                {isEditing ? (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">Post Title</label>
                                            <input 
                                                type="text" 
                                                value={currentBlog.title}
                                                onChange={(e) => setCurrentBlog({...currentBlog, title: e.target.value})}
                                                className="w-full bg-[#131926] border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                                                placeholder="Enter an engaging title..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">Excerpt (Optional)</label>
                                            <textarea 
                                                value={currentBlog.excerpt}
                                                onChange={(e) => setCurrentBlog({...currentBlog, excerpt: e.target.value})}
                                                className="w-full bg-[#131926] border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors h-24"
                                                placeholder="Short summary for the blog list..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">Markdown Content</label>
                                            <textarea 
                                                value={currentBlog.content}
                                                onChange={(e) => setCurrentBlog({...currentBlog, content: e.target.value})}
                                                className="w-full bg-[#131926] border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors h-96 font-mono text-sm"
                                                placeholder="Write your post content here using Markdown..."
                                            />
                                        </div>
                                        <div className="flex justify-end gap-4 pt-4 border-t border-neutral-800">
                                            <button 
                                                onClick={() => setIsEditing(false)}
                                                className="px-6 py-2 rounded-xl text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
                                            >
                                                <X size={18} /> Cancel
                                            </button>
                                            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
                                                <Save size={18} /> Publish Post
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {blogs.length === 0 ? (
                                            <div className="text-center py-12 text-neutral-500 italic">No blog posts found. Create one above.</div>
                                        ) : (
                                            blogs.map(blog => (
                                                <div key={blog.id} className="flex items-center justify-between p-4 rounded-xl bg-[#131926] border border-neutral-800 hover:border-blue-500/30 transition-colors">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-white mb-1">{blog.title}</h3>
                                                        <p className="text-sm text-neutral-400">Published: {new Date(blog.publishedAt || blog.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button 
                                                            onClick={() => handleDelete(blog.id)}
                                                            className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                            title="Delete Post"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>

            {/* 1. View Lead Details Modal */}
            {viewLeadDetails && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0b0f19] border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-[#131926]">
                            <div>
                                <h2 className="text-xl font-bold text-white">📩 Website Lead Brief</h2>
                                <p className="text-xs text-neutral-400 mt-1">Submitted on {viewLeadDetails.date || viewLeadDetails.created_at}</p>
                            </div>
                            <button onClick={() => setViewLeadDetails(null)} className="p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            <div className="grid grid-cols-2 gap-4 bg-[#131926] p-4 rounded-xl border border-neutral-800 text-sm">
                                <div><b className="text-neutral-500 text-xs uppercase block mb-1">Full Name</b> {viewLeadDetails.name}</div>
                                <div><b className="text-neutral-500 text-xs uppercase block mb-1">Email Address</b> {viewLeadDetails.email}</div>
                                <div><b className="text-neutral-500 text-xs uppercase block mb-1">Phone Number</b> {viewLeadDetails.phone || '-'}</div>
                                <div><b className="text-neutral-500 text-xs uppercase block mb-1">Company / Brand</b> {viewLeadDetails.company || '-'}</div>
                                <div className="col-span-2"><b className="text-neutral-500 text-xs uppercase block mb-1">Website URL</b> 
                                    {viewLeadDetails.website ? (
                                        <a href={viewLeadDetails.website.startsWith('http') ? viewLeadDetails.website : `https://${viewLeadDetails.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                            {viewLeadDetails.website}
                                        </a>
                                    ) : '-'}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">Message Brief</h3>
                                <div className="bg-[#131926] rounded-xl p-4 border border-neutral-800 text-neutral-200 text-sm whitespace-pre-wrap leading-relaxed">
                                    {viewLeadDetails.message}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. View Content Studio Client History Modal */}
            {viewClientHist && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0b0f19] border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-[#131926]">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{viewClientHist.brandName} <span className="text-blue-400 text-base font-normal ml-2">({viewClientHist.planName || 'Free Trial'})</span></h2>
                                <p className="text-sm text-neutral-400">{viewClientHist.email}  •  {viewClientHist.phone || 'No phone'}</p>
                            </div>
                            <button onClick={() => setViewClientHist(null)} className="p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm">
                            <div className="grid grid-cols-2 gap-4 bg-[#131926] p-4 rounded-xl border border-neutral-800">
                                <div><b className="text-neutral-500 text-xs uppercase block mb-1">Niche</b> {viewClientHist.niche || '-'}</div>
                                <div><b className="text-neutral-500 text-xs uppercase block mb-1">Target Audience</b> {viewClientHist.targetAudience || '-'}</div>
                                <div><b className="text-neutral-500 text-xs uppercase block mb-1">Tone of Voice</b> {viewClientHist.toneOfVoice || '-'}</div>
                                <div><b className="text-neutral-500 text-xs uppercase block mb-1">Core Offer / CTA</b> {viewClientHist.callToAction || '-'}</div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-blue-400 border-b border-neutral-800 pb-2 flex items-center gap-2">
                                <Sparkles size={18} /> Generated AI Content History
                            </h3>
                            {clientHistData.length === 0 ? (
                                <p className="text-neutral-500 italic py-8 text-center bg-[#131926] border border-neutral-800 rounded-xl">This client has not generated any content yet.</p>
                            ) : (
                                clientHistData.map((weekData, i) => (
                                    <div key={i} className="mb-6 bg-[#131926] rounded-xl border border-neutral-800 p-4">
                                        <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
                                            <h4 className="font-bold text-white">Week {weekData.week || i+1} Generation</h4>
                                            <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Generated: {weekData.date || 'Unknown'}</span>
                                        </div>
                                        <div className="space-y-4">
                                            {weekData.posts?.map((post: any, pIdx: number) => (
                                                <div key={pIdx} className="bg-[#0b0f19] border border-neutral-800 rounded-lg p-4">
                                                    <div className="flex justify-between gap-4 mb-3">
                                                        <h5 className="font-bold text-blue-400">{post.platform}</h5>
                                                        <span className="text-xs text-neutral-400 bg-neutral-800 px-2 py-1 rounded">Format: {post.format}</span>
                                                    </div>
                                                    <p className="text-white font-bold mb-2 text-sm">{post.title}</p>
                                                    <div className="text-xs text-neutral-300 whitespace-pre-wrap font-mono leading-relaxed bg-black/40 p-3 rounded border border-neutral-850">
                                                        {post.caption || post.script || post.carousel_slides?.map((s:any)=>`[Slide]: ${s}`).join('\n')}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 3. View Fit Ninja Client Details Modal */}
            {viewFitClientDetails && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0b0f19] border border-neutral-800 rounded-2xl w-full max-w-3xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-[#131926]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                    <Dumbbell size={18} className="text-amber-500" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{viewFitClientDetails.name || 'Anonymous'}</h2>
                                    <p className="text-xs text-neutral-400">{viewFitClientDetails.email}  •  Joined: {new Date(viewFitClientDetails.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <button onClick={() => setViewFitClientDetails(null)} className="p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm">
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-[#131926] p-4 rounded-xl border border-neutral-800 text-center">
                                    <div className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider mb-1">Plan Status</div>
                                    <div className="text-lg font-bold text-amber-400 capitalize">{viewFitClientDetails.plan_status || 'free'}</div>
                                </div>
                                <div className="bg-[#131926] p-4 rounded-xl border border-neutral-800 text-center">
                                    <div className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider mb-1">Height / Weight</div>
                                    <div className="text-lg font-bold text-white">{viewFitClientDetails.assessment_data?.height || '-'} cm / {viewFitClientDetails.assessment_data?.weight || '-'} kg</div>
                                </div>
                                <div className="bg-[#131926] p-4 rounded-xl border border-neutral-800 text-center">
                                    <div className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider mb-1">Target Calories</div>
                                    <div className="text-lg font-bold text-emerald-400">{viewFitClientDetails.generated_plan?.kcal || 'Not set'} kcal</div>
                                </div>
                            </div>

                            {/* Assessment Answers */}
                            <div>
                                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 border-b border-neutral-800 pb-2">Assessment Information</h3>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-3 bg-[#131926] p-4 rounded-xl border border-neutral-800">
                                    <div><span className="text-neutral-500">Gender:</span> <b className="text-neutral-200 capitalize">{viewFitClientDetails.assessment_data?.gender || '-'}</b></div>
                                    <div><span className="text-neutral-500">Age:</span> <b className="text-neutral-200">{viewFitClientDetails.assessment_data?.age || '-'}</b></div>
                                    <div><span className="text-neutral-500">Goal:</span> <b className="text-neutral-200 capitalize">{viewFitClientDetails.assessment_data?.goal?.replace('_', ' ') || '-'}</b></div>
                                    <div><span className="text-neutral-500">Diet Type:</span> <b className="text-neutral-200 capitalize">{viewFitClientDetails.assessment_data?.diet || '-'}</b></div>
                                    <div><span className="text-neutral-500">Workout Location:</span> <b className="text-neutral-200 capitalize">{viewFitClientDetails.assessment_data?.location || '-'}</b></div>
                                    <div><span className="text-neutral-500">Activity Level:</span> <b className="text-neutral-200 capitalize">{viewFitClientDetails.assessment_data?.activity?.replace('_', ' ') || '-'}</b></div>
                                    <div className="col-span-2 mt-1"><span className="text-neutral-500">Health Conditions:</span> <b className="text-neutral-200 capitalize">{viewFitClientDetails.assessment_data?.health || 'None'}</b></div>
                                </div>
                            </div>

                            {/* Plan targets */}
                            {viewFitClientDetails.generated_plan && (
                                <div>
                                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 border-b border-neutral-800 pb-2">Plan Nutrition Targets</h3>
                                    <div className="grid grid-cols-4 gap-4 bg-[#131926] p-4 rounded-xl border border-neutral-800 text-center font-mono">
                                        <div><div className="text-neutral-400 text-xs">Calories</div><div className="text-sm font-bold text-white mt-1">{viewFitClientDetails.generated_plan.kcal} kcal</div></div>
                                        <div><div className="text-neutral-400 text-xs">Protein</div><div className="text-sm font-bold text-amber-500 mt-1">{viewFitClientDetails.generated_plan.protein}g</div></div>
                                        <div><div className="text-neutral-400 text-xs">Carbs</div><div className="text-sm font-bold text-blue-400 mt-1">{viewFitClientDetails.generated_plan.carbs}g</div></div>
                                        <div><div className="text-neutral-400 text-xs">Fats</div><div className="text-sm font-bold text-emerald-400 mt-1">{viewFitClientDetails.generated_plan.fat}g</div></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Admin;
