import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, Lock } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

// ─── Admin Auth Gate ───────────────────────────────────────────────
// Password stored in env var VITE_ADMIN_PASSWORD (fallback: sn@admin2026)
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
            <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-brand-primary/10 border border-brand-primary/20 mx-auto mb-6">
                    <Lock size={24} className="text-brand-primary" />
                </div>
                <h1 className="text-2xl font-bold text-white text-center mb-1">Admin Access</h1>
                <p className="text-white/40 text-sm text-center mb-6">Social Ninja's Control Panel</p>
                <input
                    type="password"
                    value={pw}
                    onChange={e => { setPw(e.target.value); setErr(''); }}
                    onKeyDown={e => e.key === 'Enter' && attempt()}
                    placeholder="Enter admin password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-primary/50 mb-3"
                    autoFocus
                />
                {err && <p className="text-red-400 text-xs mb-3">⚠ {err}</p>}
                <button
                    onClick={attempt}
                    disabled={loading || !pw}
                    className="w-full bg-brand-primary text-black font-bold rounded-xl py-3 text-sm disabled:opacity-40 hover:opacity-90 transition-all"
                >
                    {loading ? 'Checking...' : 'Enter →'}
                </button>
            </div>
        </div>
    );
};
// ──────────────────────────────────────────────────────────────────

const Admin: React.FC = () => {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1');
    const [blogs, setBlogs] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'blogs' | 'clients'>('clients');
    const [isEditing, setIsEditing] = useState(false);
    const [currentBlog, setCurrentBlog] = useState({ id: '', title: '', content: '', excerpt: '', author: 'Admin' });
    const [viewClientHist, setViewClientHist] = useState<any>(null);
    const [clientHistData, setClientHistData] = useState<any[]>([]);

    useEffect(() => {
        fetchBlogs();
        fetchClients();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            setBlogs(data);
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        }
    };

    const fetchClients = async () => {
        try {
            const res = await fetch('/api/clients');
            const data = await res.json();
            setClients(data);
        } catch (error) {
            console.error('Failed to fetch clients', error);
        }
    };

    const handleSave = async () => {
        try {
            const method = currentBlog.id ? 'PUT' : 'POST';
            const url = currentBlog.id 
                ? `/api/blogs/${currentBlog.id}` 
                : '/api/blogs';
            
            // Note: The simple backend currently only supports POST for new, but we can simulate PUT by deleting and re-adding or just adding.
            // For this MVP, we just use POST. If editing, we should ideally add PUT to backend, but usually Claude writes new posts.
            await fetch('/api/blogs', {
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
            await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            fetchBlogs();
        } catch (error) {
            console.error('Failed to delete blog', error);
        }
    };

    const handleViewClient = async (client: any) => {
        setViewClientHist(client);
        setClientHistData([]);
        try {
            const res = await fetch(`/api/history/${client.id}`);
            if(res.ok) {
                const data = await res.json();
                setClientHistData(data);
            }
        } catch(e) { console.error("History fetch error:", e); }
    };

    if (!authed) return <AdminLogin onAuth={() => setAuthed(true)} />;

    return (
        <div className="pt-24 min-h-screen bg-[#020617] text-white p-6">
            <SEO title="Admin Console | Social Ninja's" description="Manage clients and blog posts" />
            <div className="max-w-6xl mx-auto mb-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">🥷 Admin Console</h1>
                <button onClick={() => { sessionStorage.removeItem('sn_admin_auth'); setAuthed(false); }}
                    className="text-xs text-white/30 hover:text-white/60 transition-all border border-white/10 rounded-lg px-3 py-1.5">
                    🔒 Lock Admin
                </button>
            </div>
            <div className="max-w-6xl mx-auto mb-8 flex gap-4">
               <button 
                   onClick={() => setActiveTab('clients')}
                   className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'clients' ? 'bg-brand-primary text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
               >
                   👥 Manage Clients & Leads
               </button>
               <button 
                   onClick={() => setActiveTab('blogs')}
                   className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'blogs' ? 'bg-brand-primary text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
               >
                   📝 Manage Blog Posts
               </button>
            </div>

            <div className="max-w-6xl mx-auto border border-white/10 rounded-2xl p-8 bg-[#050A1F]/50 backdrop-blur-md">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                    <h1 className="text-3xl font-display font-bold text-white">
                        {activeTab === 'clients' ? 'Content Studio Clients' : 'Blog Administrator'}
                    </h1>
                    {activeTab === 'blogs' && !isEditing && (
                        <Button 
                            className="flex items-center gap-2"
                            onClick={() => { setIsEditing(true); setCurrentBlog({ id: '', title: '', content: '', excerpt: '', author: 'Admin' }); }}
                        >
                            <Plus size={18} /> New Post
                        </Button>
                    )}
                </div>

                {activeTab === 'clients' ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-brand-primary text-sm uppercase tracking-wider">
                                    <th className="pb-4 pr-4 font-bold">Brand / Niche</th>
                                    <th className="pb-4 pr-4 font-bold">Contact</th>
                                    <th className="pb-4 pr-4 font-bold">Plan Type</th>
                                    <th className="pb-4 pr-4 font-bold">Joined</th>
                                    <th className="pb-4 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-white/40 italic">No clients or leads recorded yet.</td>
                                    </tr>
                                ) : (
                                    clients.map(client => (
                                        <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="py-4 pr-4">
                                                <div className="font-bold text-white">{client.brandName}</div>
                                                <div className="text-xs text-white/50">{client.niche}</div>
                                            </td>
                                            <td className="py-4 pr-4">
                                                <div className="text-sm text-white/90">{client.email}</div>
                                                <div className="text-xs text-white/50">{client.phone || '—'}</div>
                                            </td>
                                            <td className="py-4 pr-4">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${client.plan === 'trial' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                                                    {client.planName}
                                                </span>
                                            </td>
                                            <td className="py-4 text-sm text-white/60">
                                                {client.joinDate}
                                            </td>
                                            <td className="py-4 text-right">
                                                <button onClick={() => handleViewClient(client)} className="text-brand-primary hover:text-white text-sm font-bold bg-brand-primary/10 hover:bg-brand-primary/20 px-3 py-1.5 rounded-lg transition-colors">
                                                    View History
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : isEditing ? (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-brand-primary mb-2 uppercase tracking-wider">Post Title</label>
                            <input 
                                type="text" 
                                value={currentBlog.title}
                                onChange={(e) => setCurrentBlog({...currentBlog, title: e.target.value})}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary outline-none transition-colors"
                                placeholder="Enter an engaging title..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-primary mb-2 uppercase tracking-wider">Excerpt (Optional)</label>
                            <textarea 
                                value={currentBlog.excerpt}
                                onChange={(e) => setCurrentBlog({...currentBlog, excerpt: e.target.value})}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary outline-none transition-colors h-24"
                                placeholder="Short summary for the blog list..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-primary mb-2 uppercase tracking-wider">Markdown Content</label>
                            <textarea 
                                value={currentBlog.content}
                                onChange={(e) => setCurrentBlog({...currentBlog, content: e.target.value})}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary outline-none transition-colors h-96 font-mono text-sm"
                                placeholder="Write your post content here using Markdown..."
                            />
                        </div>
                        <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 rounded-xl text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
                            >
                                <X size={18} /> Cancel
                            </button>
                            <Button onClick={handleSave} className="flex items-center gap-2">
                                <Save size={18} /> Publish Post
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {blogs.length === 0 ? (
                            <div className="text-center py-12 text-neutral-500 italic">No blog posts found. Create one above.</div>
                        ) : (
                            blogs.map(blog => (
                                <div key={blog.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-primary/30 transition-colors">
                                    <div>
                                        <h3 className="font-bold text-lg text-white mb-1">{blog.title}</h3>
                                        <p className="text-sm text-neutral-400">Published: {new Date(blog.date).toLocaleDateString()}</p>
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
            </div>

            {/* View Client History Modal */}
            {viewClientHist && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#050A1F] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-brand-dark">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{viewClientHist.brandName} <span className="text-brand-primary text-base font-normal ml-2">({viewClientHist.planName})</span></h2>
                                <p className="text-sm text-white/50">{viewClientHist.email} • {viewClientHist.phone}</p>
                            </div>
                            <button onClick={() => setViewClientHist(null)} className="p-2 text-white/50 hover:text-white bg-white/5 rounded-lg transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                <div><b className="text-white/40 text-xs uppercase block mb-1">Niche</b> {viewClientHist.niche || '—'}</div>
                                <div><b className="text-white/40 text-xs uppercase block mb-1">Target Audience</b> {viewClientHist.targetAudience || '—'}</div>
                                <div><b className="text-white/40 text-xs uppercase block mb-1">Tone of Voice</b> {viewClientHist.toneOfVoice || '—'}</div>
                                <div><b className="text-white/40 text-xs uppercase block mb-1">Core Offer / CTA</b> {viewClientHist.callToAction || '—'}</div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-brand-primary border-b border-white/10 pb-2">Generated AI Content History</h3>
                            {clientHistData.length === 0 ? (
                                <p className="text-white/40 italic py-8 text-center bg-black/30 rounded-xl">This client has not generated any content yet.</p>
                            ) : (
                                clientHistData.map((weekData, i) => (
                                    <div key={i} className="mb-6 bg-black/40 rounded-xl border border-white/5 p-4">
                                        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                                            <h4 className="font-bold text-white">Week {weekData.week} Generation</h4>
                                            <span className="text-xs text-brand-primary bg-brand-primary/10 px-2 py-1 rounded">Generated: {weekData.date}</span>
                                        </div>
                                        <div className="space-y-4">
                                            {weekData.posts?.map((post: any, pIdx: number) => (
                                                <div key={pIdx} className="bg-white/5 rounded-lg p-4">
                                                    <div className="flex justify-between gap-4 mb-3">
                                                        <h5 className="font-bold text-brand-secondary">{post.platform}</h5>
                                                        <span className="text-xs text-white/50 bg-black/50 px-2 py-1 rounded">Format: {post.format}</span>
                                                    </div>
                                                    <p className="text-white font-bold mb-2 text-sm">{post.title}</p>
                                                    <div className="text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed bg-black/60 p-3 rounded border border-white/5">
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

        </div>
    );
};

export default Admin;
