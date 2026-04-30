import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    AreaChart, 
    Area 
} from 'recharts';
import { 
    LayoutDashboard, 
    FolderGit2, 
    Globe, 
    PenTool,
    Plus, 
    Pencil, 
    Trash2, 
    ArrowLeft,
    Check,
    X,
    Loader2,
    LogOut,
    Users,
    TrendingUp,
    Calendar,
    Activity,
    Eye,
    EyeOff
} from "lucide-react";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("repos");
    const [repos, setRepos] = useState([]);
    const [liveProjects, setLiveProjects] = useState([]);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Enhanced Quill settings for a full Visual Experience
    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }, { 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    useEffect(() => {
        checkAuthAndFetch();
    }, []);

    const apiFetch = async (url, options = {}) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        
        const defaultOptions = {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRF-TOKEN": csrfToken
            }
        };

        const mergedOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...(options.headers || {})
            }
        };

        return fetch(url, mergedOptions);
    };

    const checkAuthAndFetch = async () => {
        setIsLoading(true);
        try {
            const authRes = await apiFetch("/api/check-auth");
            const authData = await authRes.json();
            if (!authData.authenticated) {
                navigate("/login");
                return;
            }
            fetchData();
            fetchStats();
        } catch (error) {
            navigate("/login");
        }
    };

    const handleLogout = async () => {
        try {
            await apiFetch("/api/logout", { method: "POST" });
            navigate("/login");
        } catch (error) {
            console.error("Logout error");
        }
    };

    const fetchData = async () => {
        try {
            const [reposRes, liveRes, postsRes, usersRes] = await Promise.all([
                apiFetch("/api/projects/admin"),
                apiFetch("/api/live-projects/admin"),
                apiFetch("/api/posts"),
                apiFetch("/api/users")
            ]);
            setRepos(await reposRes.json());
            setLiveProjects(await liveRes.json());
            setPosts(await postsRes.json());
            setUsers(await usersRes.json());
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await apiFetch("/api/dashboard/stats");
            setStats(await res.json());
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const handleDelete = async (type, id) => {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        try {
            await apiFetch(`/api/${type}/${id}`, { method: "DELETE" });
            fetchData();
            fetchStats();
            setMessage({ type: "success", text: "Excluído com sucesso!" });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: "error", text: "Erro ao excluir." });
        }
    };

    const handleToggleVisibility = async (type, item) => {
        const typeMap = { repos: "projects", live: "live-projects" };
        const endpoint = `/api/${typeMap[type]}/${item.id}`;
        
        try {
            const res = await apiFetch(endpoint, {
                method: "PUT",
                body: JSON.stringify({ ...item, is_visible: !item.is_visible })
            });
            if (res.ok) {
                fetchData();
                setMessage({ type: "success", text: "Visibilidade atualizada!" });
                setTimeout(() => setMessage(null), 2000);
            }
        } catch (error) {
            console.error("Error toggling visibility:", error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Manual collection of Quill fields if any
        if (activeTab === "blog") {
            data.content_pt = editingItem.content_pt || editingItem.content?.pt;
            data.content_en = editingItem.content_en || editingItem.content?.en;
        } else {
            data.description_pt = editingItem.description_pt || editingItem.description?.pt;
            data.description_en = editingItem.description_en || editingItem.description?.en;
            data.problem_pt = editingItem.problem_pt || editingItem.problem?.pt;
            data.problem_en = editingItem.problem_en || editingItem.problem?.en;
            data.solution_pt = editingItem.solution_pt || editingItem.solution?.pt;
            data.solution_en = editingItem.solution_en || editingItem.solution?.en;
        }

        if (data.technologies) data.technologies = data.technologies.split(",").map(s => s.trim()).filter(s => s !== "");
        if (data.features) data.features = data.features.split(",").map(s => s.trim()).filter(s => s !== "");
        if (data.tags) data.tags = data.tags.split(",").map(s => s.trim()).filter(s => s !== "");
        
        if (data.results_metrics && data.results_labels) {
            const metrics = data.results_metrics.split(",");
            const labels = data.results_labels.split(",");
            data.results = metrics.map((m, i) => ({ 
                metric: m.trim(), 
                label: { pt: (labels[i] || "").trim(), en: (labels[i] || "").trim() } 
            }));
            delete data.results_metrics;
            delete data.results_labels;
        }

        if (activeTab === "blog") {
            data.title = { en: data.title_en, pt: data.title_pt };
            data.excerpt = { en: data.excerpt_en, pt: data.excerpt_pt };
            data.content = { en: data.content_en, pt: data.content_pt };
            delete data.title_en; delete data.title_pt;
            delete data.excerpt_en; delete data.excerpt_pt;
            delete data.content_en; delete data.content_pt;
        } else {
            data.description = { en: data.description_en, pt: data.description_pt };
            data.problem = { en: data.problem_en, pt: data.problem_pt };
            data.solution = { en: data.solution_en, pt: data.solution_pt };
            delete data.description_en; delete data.description_pt;
            delete data.problem_en; delete data.problem_pt;
            delete data.solution_en; delete data.solution_pt;

            data.tagline = { en: data.tagline_en, pt: data.tagline_pt };
            delete data.tagline_en; delete data.tagline_pt;
            data.role = { en: data.role_en, pt: data.role_pt };
            delete data.role_en; delete data.role_pt;
            data.category = { en: data.category_en, pt: data.category_pt };
            delete data.category_en; delete data.category_pt;
        }

        const typeMap = { repos: "projects", live: "live-projects", blog: "posts", users: "users" };
        const endpoint = editingItem?.id 
            ? `/api/${typeMap[activeTab]}/${editingItem.id}`
            : `/api/${typeMap[activeTab]}`;
        
        try {
            const res = await apiFetch(endpoint, {
                method: editingItem?.id ? "PUT" : "POST",
                body: JSON.stringify(data)
            });
            if (res.ok) {
                fetchData();
                setIsModalOpen(false);
                setEditingItem(null);
                setMessage({ type: "success", text: "Dados salvos com sucesso!" });
                setTimeout(() => setMessage(null), 3000);
            } else {
                const err = await res.json();
                alert("Erro ao salvar: " + JSON.stringify(err.errors));
            }
        } catch (error) {
            alert("Erro de conexão.");
        } finally {
            setIsSaving(false);
        }
    };

    const getItems = () => {
        if (activeTab === "repos") return repos;
        if (activeTab === "live") return liveProjects;
        if (activeTab === "users") return users;
        return posts;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Aguardando sistema...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <header className="bg-charcoal/50 border-b border-white/5 backdrop-blur-xl sticky top-0 z-50">
                <div className="container-luxury py-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                                <LayoutDashboard size={24} className="text-primary relative z-10" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Console Administrativo</h1>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">v1.6.0 — Linked to Malobr-OS</p>
                                </div>
                            </div>
                        </div>
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 text-sm font-mono group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            voltar_ao_site
                        </Link>
                        <div className="w-px h-6 bg-white/10" />
                        <button onClick={handleLogout} className="text-muted-foreground hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-mono group">
                            <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                            exit_session
                        </button>
                    </div>
                </div>
            </header>

            <main className="container-luxury py-12">
                {message && (
                    <div className={`mb-8 p-4 rounded-lg flex items-center gap-3 animate-fade-up ${message.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-current" />
                        <span className="text-sm font-mono">{message.text}</span>
                    </div>
                )}

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-charcoal/30 border border-white/5 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                                <Users size={20} className="text-primary" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Total de Visitas</span>
                        </div>
                        <h3 className="text-4xl font-bold font-mono tracking-tighter">{stats?.total_visits || 0}</h3>
                        <p className="text-[10px] text-muted-foreground mt-2 font-mono">lifetime_traffic</p>
                    </div>
                    <div className="bg-charcoal/30 border border-white/5 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                                <TrendingUp size={20} className="text-blue-500" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Visitantes Únicos</span>
                        </div>
                        <h3 className="text-4xl font-bold font-mono tracking-tighter">{stats?.unique_visitors || 0}</h3>
                        <p className="text-[10px] text-muted-foreground mt-2 font-mono">unique_ip_nodes</p>
                    </div>
                    <div className="bg-charcoal/30 border border-white/5 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
                                <Calendar size={20} className="text-green-500" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Visitas Hoje</span>
                        </div>
                        <h3 className="text-4xl font-bold font-mono tracking-tighter">{stats?.visits_today || 0}</h3>
                        <p className="text-[10px] text-muted-foreground mt-2 font-mono">daily_active_sessions</p>
                    </div>
                    <div className="bg-charcoal/30 border border-white/5 p-6 rounded-2xl backdrop-blur-sm shadow-xl flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Status da Rede</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] text-green-500 font-mono">ONLINE</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-muted-foreground">Projetos</span>
                                <span>{stats?.counts?.projects || 0}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-muted-foreground">Live Apps</span>
                                <span>{stats?.counts?.live_projects || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Traffic Flow Chart */}
                    <div className="lg:col-span-2 bg-charcoal/30 border border-white/5 p-8 rounded-2xl backdrop-blur-md shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Activity size={120} className="text-primary" />
                        </div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                                    <TrendingUp size={16} className="text-primary" />
                                </div>
                                <h3 className="text-lg font-bold font-mono tracking-tight uppercase">Fluxo de Tráfego</h3>
                            </div>
                            <span className="text-[10px] text-muted-foreground font-mono opacity-50 uppercase tracking-widest">7_day_sync</span>
                        </div>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats?.chart_data || []}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis 
                                        dataKey="date" 
                                        stroke="rgba(255,255,255,0.3)" 
                                        fontSize={10} 
                                        tickLine={false} 
                                        axisLine={false}
                                        tickFormatter={(str) => {
                                            try {
                                                return new Date(str).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
                                            } catch(e) { return str; }
                                        }}
                                    />
                                    <YAxis 
                                        stroke="rgba(255,255,255,0.3)" 
                                        fontSize={10} 
                                        tickLine={false} 
                                        axisLine={false}
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1c1825', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                                        itemStyle={{ color: '#a855f7' }}
                                    />
                                    <Area type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Pages */}
                    <div className="bg-charcoal/30 border border-white/5 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                                <Globe size={16} className="text-blue-400" />
                            </div>
                            <h3 className="text-sm font-bold font-mono tracking-tight uppercase">Top Nodes</h3>
                        </div>
                        <div className="space-y-4">
                            {stats?.top_pages?.map((page, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="flex justify-between text-[10px] font-mono mb-1">
                                        <span className="text-muted-foreground truncate max-w-[150px]">{page.page_url.replace(window.location.origin, '') || '/home'}</span>
                                        <span className="text-blue-400">{page.count} hits</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(page.count / stats.total_visits) * 100}%` }}
                                            className="h-full bg-blue-500/40"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity Live Feed */}
                <div className="bg-charcoal/30 border border-white/5 p-8 rounded-2xl backdrop-blur-md shadow-2xl mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                                <Activity size={16} className="text-green-400" />
                            </div>
                            <h3 className="text-lg font-bold font-mono tracking-tight uppercase">Live Activity Intelligence</h3>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                             <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">listening_to_incoming_data...</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stats?.recent_visits?.map((visit, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-black/20 border border-white/5 rounded-xl hover:border-primary/30 transition-all group">
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground font-mono text-[10px] group-hover:border-primary/20 transition-colors">
                                    {visit.ip_address.substring(0, 4)}...
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-mono text-foreground truncate">{visit.page_url.split('/').pop() || 'HOME'}</p>
                                    <p className="text-[9px] font-mono text-muted-foreground uppercase">{visit.ip_address} — {new Date(visit.created_at).toLocaleTimeString()}</p>
                                </div>
                                <div className="text-primary/40 group-hover:text-primary transition-colors">
                                    <ArrowUpRight size={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-1 bg-charcoal/50 p-1.5 rounded-xl w-fit mb-12 border border-white/5 shadow-inner">
                    <button onClick={() => setActiveTab("repos")} className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono transition-all duration-300 ${activeTab === "repos" ? "bg-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]" : "text-muted-foreground hover:bg-white/5"}`}>
                        <FolderGit2 size={16} /> Repositórios <span className="opacity-40 text-[10px]">[{repos.length}]</span>
                    </button>
                    <button onClick={() => setActiveTab("live")} className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono transition-all duration-300 ${activeTab === "live" ? "bg-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]" : "text-muted-foreground hover:bg-white/5"}`}>
                        <span className="font-bold text-primary">{">_"}</span> Trabalhos Live <span className="opacity-40 text-[10px]">[{liveProjects.length}]</span>
                    </button>
                    <button onClick={() => setActiveTab("blog")} className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono transition-all duration-300 ${activeTab === "blog" ? "bg-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]" : "text-muted-foreground hover:bg-white/5"}`}>
                        <PenTool size={16} /> Blog <span className="opacity-40 text-[10px]">[{posts.length}]</span>
                    </button>
                    <button onClick={() => setActiveTab("users")} className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono transition-all duration-300 ${activeTab === "users" ? "bg-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]" : "text-muted-foreground hover:bg-white/5"}`}>
                        <Users size={16} /> Usuários <span className="opacity-40 text-[10px]">[{users.length}]</span>
                    </button>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <p className="text-label mb-2 font-mono">// management_panel</p>
                        <h2 className="text-3xl font-bold font-mono tracking-tighter">
                            {activeTab === "repos" ? "Projetos de Código" : activeTab === "live" ? "Aplicações em Produção" : activeTab === "users" ? "Usuários" : "Artigos do Blog"}
                        </h2>
                    </div>
                    <button onClick={() => { setEditingItem({}); setIsModalOpen(true); }} className="btn-luxury py-4 px-8 text-xs flex items-center gap-3 bg-primary/10 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20">
                        <Plus size={18} /> Novo Registro
                    </button>
                </div>

                <div className="bg-charcoal/30 border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                    <table className="w-full text-left border-collapse font-mono">
                        <thead>
                            <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-muted-foreground">
                                <th className="px-6 py-5">id / slug</th>
                                <th className="px-6 py-5">{activeTab === "users" ? "nome / email" : activeTab === "blog" ? "título (PT)" : "nome"}</th>
                                <th className="px-6 py-5">{activeTab === "users" ? "telefone" : activeTab === "blog" ? "status / data" : "techs"}</th>
                                <th className="px-6 py-5">visibilidade</th>
                                <th className="px-6 py-5 text-right">ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {getItems().map((item) => (
                                <tr key={item.id} className="group hover:bg-primary/[0.02] transition-colors">
                                    <td className="px-6 py-5 text-xs text-muted-foreground">#{item.id} <br/> {activeTab === "users" ? "" : "/" + item.slug}</td>
                                    <td className="px-6 py-5 font-bold">
                                        {activeTab === "users" ? item.name + " (" + item.email + ")" : activeTab === "blog" ? (item.title?.pt || item.title?.en) : item.name}
                                    </td>
                                    <td className="px-6 py-5 text-[10px]">
                                        {activeTab === "users" ? item.phone : activeTab === "blog" ? (
                                            <span className={`px-2 py-0.5 rounded border ${
                                                item.status === 'Concluído' ? 'border-green-500/20 text-green-400' :
                                                item.status === 'Em andamento' ? 'border-yellow-500/20 text-yellow-500' :
                                                'border-white/10 text-muted-foreground'
                                            }`}>
                                                {item.status}
                                            </span>
                                        ) : item.technologies?.slice(0, 2).join(", ")}
                                        <br/>
                                        <span className="opacity-50">{activeTab === "blog" ? item.publish_date : ""}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        {activeTab !== "blog" && activeTab !== "users" && (
                                            <button 
                                                onClick={() => handleToggleVisibility(activeTab, item)}
                                                className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-mono border transition-all ${
                                                    item.is_visible 
                                                        ? "border-green-500/20 text-green-400 bg-green-500/5 hover:bg-green-500/10" 
                                                        : "border-red-500/20 text-red-400 bg-red-500/5 hover:bg-red-500/10"
                                                }`}
                                            >
                                                {item.is_visible ? <Eye size={10} /> : <EyeOff size={10} />}
                                                {item.is_visible ? "VISÍVEL" : "OCULTO"}
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {activeTab !== "users" && <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="p-2 text-primary"><Pencil size={16}/></button>}
                                            <button onClick={() => handleDelete(activeTab === "repos" ? "projects" : activeTab === "live" ? "live-projects" : activeTab === "users" ? "users" : "posts", item.id)} className="p-2 text-red-500"><Trash2 size={16}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/40">
                    <div className="bg-charcoal border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                            <h3 className="text-xl font-bold font-mono">{editingItem?.id ? "Editar" : "Novo"} {activeTab}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X size={20}/></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-6 font-mono text-sm">
                            {activeTab === "users" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input name="name" placeholder="Nome do usuário" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                    <input name="email" type="email" placeholder="E-mail de acesso" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                    <input name="password" type="password" placeholder="Nova Senha" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                    <input name="phone" placeholder="Telefone" className="bg-black/20 border border-white/5 p-3 rounded w-full" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input name="slug" defaultValue={editingItem?.slug} placeholder="slug" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                    <input name={activeTab === "blog" ? "publish_date" : "year"} defaultValue={editingItem?.publish_date || editingItem?.year} placeholder="date/year" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                    
                                    {activeTab === "blog" ? (
                                        <input name="read_time" defaultValue={editingItem?.read_time} placeholder="read time" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                    ) : (
                                        <>
                                            <input name="category_pt" defaultValue={editingItem?.category?.pt} placeholder="Categoria (PT)" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                            <input name="category_en" defaultValue={editingItem?.category?.en} placeholder="Category (EN)" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                            <input name="role_pt" defaultValue={editingItem?.role?.pt} placeholder="Papel / Role (PT)" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                            <input name="role_en" defaultValue={editingItem?.role?.en} placeholder="Role (EN)" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                        </>
                                    )}

                                    {activeTab === "blog" && (
                                        <select name="status" defaultValue={editingItem?.status || "Ideia"} className="bg-black/20 border border-white/5 p-3 rounded w-full text-muted-foreground outline-none">
                                            <option value="Ideia">Ideia</option>
                                            <option value="Iniciado">Iniciado</option>
                                            <option value="Em andamento">Em andamento</option>
                                            <option value="Concluído">Concluído</option>
                                        </select>
                                    )}

                                    {activeTab !== "blog" && activeTab !== "users" && (
                                        <div className="flex items-center gap-4 bg-black/20 border border-white/5 p-3 rounded w-full h-fit">
                                            <span className="text-xs text-muted-foreground uppercase tracking-widest">Visibilidade no Site</span>
                                            <button 
                                                type="button"
                                                onClick={() => setEditingItem(prev => ({...prev, is_visible: !prev.is_visible}))}
                                                className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${editingItem?.is_visible !== false ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-100 border border-red-500/30"}`}
                                            >
                                                {editingItem?.is_visible !== false ? <Eye size={14}/> : <EyeOff size={14}/>}
                                                {editingItem?.is_visible !== false ? "Visível" : "Oculto"}
                                            </button>
                                            <input type="hidden" name="is_visible" value={editingItem?.is_visible !== false ? "1" : "0"} />
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "users" ? null : activeTab === "blog" ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input name="title_pt" defaultValue={editingItem?.title?.pt} placeholder="Título (Português)" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                        <input name="title_en" defaultValue={editingItem?.title?.en} placeholder="Title (English)" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <textarea name="excerpt_pt" defaultValue={editingItem?.excerpt?.pt} placeholder="Resumo (Português)" className="bg-black/20 border border-white/5 p-3 rounded w-full h-24" required />
                                        <textarea name="excerpt_en" defaultValue={editingItem?.excerpt?.en} placeholder="Excerpt (English)" className="bg-black/20 border border-white/5 p-3 rounded w-full h-24" required />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Conteúdo (PT)</label>
                                            <div className="bg-black/20 rounded-xl overflow-hidden border border-white/5 text-foreground quill-container">
                                                <ReactQuill 
                                                    theme="snow" 
                                                    value={editingItem?.content_pt || editingItem?.content?.pt || ""} 
                                                    onChange={(val) => setEditingItem(prev => ({...prev, content_pt: val}))}
                                                    modules={quillModules}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Content (EN)</label>
                                            <div className="bg-black/20 rounded-xl overflow-hidden border border-white/5 text-foreground quill-container">
                                                <ReactQuill 
                                                    theme="snow" 
                                                    value={editingItem?.content_en || editingItem?.content?.en || ""} 
                                                    onChange={(val) => setEditingItem(prev => ({...prev, content_en: val}))}
                                                    modules={quillModules}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <input name="name" defaultValue={editingItem?.name} placeholder="name" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <textarea name="tagline_pt" defaultValue={editingItem?.tagline?.pt} placeholder="Tagline (PT)" className="bg-black/20 border border-white/5 p-3 rounded w-full h-20" required />
                                        <textarea name="tagline_en" defaultValue={editingItem?.tagline?.en} placeholder="Tagline (EN)" className="bg-black/20 border border-white/5 p-3 rounded w-full h-20" required />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Descrição (PT)</label>
                                            <div className="bg-black/20 rounded-xl overflow-hidden border border-white/5 text-foreground quill-container">
                                                <ReactQuill 
                                                    theme="snow" 
                                                    value={editingItem?.description_pt || editingItem?.description?.pt || ""} 
                                                    onChange={(val) => setEditingItem(prev => ({...prev, description_pt: val}))}
                                                    modules={quillModules}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Description (EN)</label>
                                            <div className="bg-black/20 rounded-xl overflow-hidden border border-white/5 text-foreground quill-container">
                                                <ReactQuill 
                                                    theme="snow" 
                                                    value={editingItem?.description_en || editingItem?.description?.en || ""} 
                                                    onChange={(val) => setEditingItem(prev => ({...prev, description_en: val}))}
                                                    modules={quillModules}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">O Problema / Desafio (PT)</label>
                                            <div className="bg-black/20 rounded-xl overflow-hidden border border-white/5 text-foreground quill-container">
                                                <ReactQuill 
                                                    theme="snow" 
                                                    value={editingItem?.problem_pt || editingItem?.problem?.pt || ""} 
                                                    onChange={(val) => setEditingItem(prev => ({...prev, problem_pt: val}))}
                                                    modules={quillModules}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">The Challenge (EN)</label>
                                            <div className="bg-black/20 rounded-xl overflow-hidden border border-white/5 text-foreground quill-container">
                                                <ReactQuill 
                                                    theme="snow" 
                                                    value={editingItem?.problem_en || editingItem?.problem?.en || ""} 
                                                    onChange={(val) => setEditingItem(prev => ({...prev, problem_en: val}))}
                                                    modules={quillModules}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">A Solução / Engenharia (PT)</label>
                                            <div className="bg-black/20 rounded-xl overflow-hidden border border-white/5 text-foreground quill-container">
                                                <ReactQuill 
                                                    theme="snow" 
                                                    value={editingItem?.solution_pt || editingItem?.solution?.pt || ""} 
                                                    onChange={(val) => setEditingItem(prev => ({...prev, solution_pt: val}))}
                                                    modules={quillModules}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Engineering Solution (EN)</label>
                                            <div className="bg-black/20 rounded-xl overflow-hidden border border-white/5 text-foreground quill-container">
                                                <ReactQuill 
                                                    theme="snow" 
                                                    value={editingItem?.solution_en || editingItem?.solution?.en || ""} 
                                                    onChange={(val) => setEditingItem(prev => ({...prev, solution_en: val}))}
                                                    modules={quillModules}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {activeTab === "live" && (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <input name="live_url" defaultValue={editingItem?.live_url} placeholder="Live URL" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                                <input name="client" defaultValue={editingItem?.client} placeholder="Client" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <input name="results_metrics" defaultValue={editingItem?.results?.map(r => r.metric).join(", ")} placeholder="Metrics (e.g., 200+, 52+)" className="bg-black/20 border border-white/5 p-3 rounded w-full" />
                                                <input name="results_labels" defaultValue={editingItem?.results?.map(r => r.label?.pt || r.label).join(", ")} placeholder="Metric Labels PT (e.g., Famílias, Anos)" className="bg-black/20 border border-white/5 p-3 rounded w-full" />
                                            </div>
                                        </>
                                    )}
                                    <input name="repo_url" defaultValue={editingItem?.repo_url} placeholder="Repo URL" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                    {activeTab === "repos" && <input name="language" defaultValue={editingItem?.language} placeholder="Primary Language" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />}
                                </div>
                            )}
                            
                            {activeTab !== "users" && <input name={activeTab === "blog" ? "tags" : "technologies"} defaultValue={(activeTab === "blog" ? editingItem?.tags : editingItem?.technologies)?.map(t => typeof t === 'object' ? JSON.stringify(t) : t).join(", ")} placeholder="tags/techs (comma separated)" className="bg-black/20 border border-white/5 p-3 rounded w-full" />}
                            {activeTab !== "blog" && activeTab !== "users" && <input name="features" defaultValue={editingItem?.features?.map(f => typeof f === 'object' ? f.pt : f).join(", ")} placeholder="Features (comma separated, will be saved as PT)" className="bg-black/20 border border-white/5 p-3 rounded w-full" />}
                            
                            <div className="flex justify-end gap-4 mt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2">Cancelar</button>
                                <button type="submit" className="btn-luxury px-10 py-3 bg-primary text-white" disabled={isSaving}>
                                    {isSaving ? "Salvando..." : "Salvar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
