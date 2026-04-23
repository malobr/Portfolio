import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    LogOut
} from "lucide-react";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("repos");
    const [repos, setRepos] = useState([]);
    const [liveProjects, setLiveProjects] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        checkAuthAndFetch();
    }, []);

    const checkAuthAndFetch = async () => {
        setIsLoading(true);
        try {
            const authRes = await fetch("/api/check-auth");
            const authData = await authRes.json();
            if (!authData.authenticated) {
                navigate("/login");
                return;
            }
            fetchData();
        } catch (error) {
            navigate("/login");
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
            navigate("/login");
        } catch (error) {
            console.error("Logout error");
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [reposRes, liveRes, postsRes] = await Promise.all([
                fetch("/api/projects"),
                fetch("/api/live-projects"),
                fetch("/api/posts")
            ]);
            setRepos(await reposRes.json());
            setLiveProjects(await liveRes.json());
            setPosts(await postsRes.json());
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        try {
            await fetch(`/api/${type}/${id}`, { method: "DELETE" });
            fetchData();
            setMessage({ type: "success", text: "Excluído com sucesso!" });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: "error", text: "Erro ao excluir." });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        if (data.technologies) data.technologies = data.technologies.split(",").map(s => s.trim()).filter(s => s !== "");
        if (data.features) data.features = data.features.split(",").map(s => s.trim()).filter(s => s !== "");
        if (data.tags) data.tags = data.tags.split(",").map(s => s.trim()).filter(s => s !== "");
        
        // Handle results for live projects
        if (data.results_metrics && data.results_labels) {
            const metrics = data.results_metrics.split(",");
            const labels = data.results_labels.split(",");
            data.results = metrics.map((m, i) => ({ metric: m.trim(), label: (labels[i] || "").trim() }));
            delete data.results_metrics;
            delete data.results_labels;
        }

        // Handle i18n for Blog
        if (activeTab === "blog") {
            data.title = { en: data.title_en, pt: data.title_pt };
            data.excerpt = { en: data.excerpt_en, pt: data.excerpt_pt };
            data.content = { en: data.content_en, pt: data.content_pt };
            delete data.title_en; delete data.title_pt;
            delete data.excerpt_en; delete data.excerpt_pt;
            delete data.content_en; delete data.content_pt;
        }

        const typeMap = { repos: "projects", live: "live-projects", blog: "posts" };
        const endpoint = editingItem?.id 
            ? `/api/${typeMap[activeTab]}/${editingItem.id}`
            : `/api/${typeMap[activeTab]}`;
        
        try {
            const res = await fetch(endpoint, {
                method: editingItem?.id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
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
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                            <LayoutDashboard size={20} className="text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold font-mono tracking-tight">Console Administrativo</h1>
                            <p className="text-xs text-muted-foreground font-mono">v1.1.0 — Root Access</p>
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

                <div className="flex gap-1 bg-charcoal p-1 rounded-xl w-fit mb-12 border border-white/5">
                    <button onClick={() => setActiveTab("repos")} className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono transition-all ${activeTab === "repos" ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/5"}`}>
                        <FolderGit2 size={16} /> Repositórios [{repos.length}]
                    </button>
                    <button onClick={() => setActiveTab("live")} className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono transition-all ${activeTab === "live" ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/5"}`}>
                        <Globe size={16} /> Trabalhos Live [{liveProjects.length}]
                    </button>
                    <button onClick={() => setActiveTab("blog")} className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono transition-all ${activeTab === "blog" ? "bg-primary text-white" : "text-muted-foreground hover:bg-white/5"}`}>
                        <PenTool size={16} /> Blog [{posts.length}]
                    </button>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-mono">
                        {activeTab === "repos" ? "Projetos de Código" : activeTab === "live" ? "Aplicações em Produção" : "Artigos do Blog"}
                    </h2>
                    <button onClick={() => { setEditingItem({}); setIsModalOpen(true); }} className="btn-luxury py-3 px-6 text-xs flex items-center gap-2">
                        <Plus size={16} /> Novo Registro
                    </button>
                </div>

                <div className="bg-charcoal/30 border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                    <table className="w-full text-left border-collapse font-mono">
                        <thead>
                            <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-muted-foreground">
                                <th className="px-6 py-5">id / slug</th>
                                <th className="px-6 py-5">{activeTab === "blog" ? "título (PT)" : "nome"}</th>
                                <th className="px-6 py-5">{activeTab === "blog" ? "status / data" : "techs"}</th>
                                <th className="px-6 py-5 text-right">ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {getItems().map((item) => (
                                <tr key={item.id} className="group hover:bg-primary/[0.02] transition-colors">
                                    <td className="px-6 py-5 text-xs text-muted-foreground">#{item.id} <br/> /{item.slug}</td>
                                    <td className="px-6 py-5 font-bold">
                                        {activeTab === "blog" ? (item.title?.pt || item.title?.en) : item.name}
                                    </td>
                                    <td className="px-6 py-5 text-[10px]">
                                        {activeTab === "blog" ? (
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
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="p-2 text-primary"><Pencil size={16}/></button>
                                            <button onClick={() => handleDelete(activeTab === "repos" ? "projects" : activeTab === "live" ? "live-projects" : "posts", item.id)} className="p-2 text-red-500"><Trash2 size={16}/></button>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input name="slug" defaultValue={editingItem?.slug} placeholder="slug" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                <input name={activeTab === "blog" ? "publish_date" : "year"} defaultValue={editingItem?.publish_date || editingItem?.year} placeholder="date/year" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                <input name={activeTab === "blog" ? "read_time" : "category"} defaultValue={editingItem?.read_time || editingItem?.category} placeholder={activeTab === "blog" ? "read time" : "category"} className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                
                                {activeTab === "blog" && (
                                    <select name="status" defaultValue={editingItem?.status || "Ideia"} className="bg-black/20 border border-white/5 p-3 rounded w-full text-muted-foreground outline-none">
                                        <option value="Ideia">Ideia</option>
                                        <option value="Iniciado">Iniciado</option>
                                        <option value="Em andamento">Em andamento</option>
                                        <option value="Concluído">Concluído</option>
                                    </select>
                                )}
                            </div>

                            {activeTab === "blog" ? (
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
                                        <textarea name="content_pt" defaultValue={editingItem?.content?.pt} placeholder="Conteúdo (Markdown PT)" className="bg-black/20 border border-white/5 p-3 rounded w-full h-64" required />
                                        <textarea name="content_en" defaultValue={editingItem?.content?.en} placeholder="Content (Markdown EN)" className="bg-black/20 border border-white/5 p-3 rounded w-full h-64" required />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <input name="name" defaultValue={editingItem?.name} placeholder="name" className="bg-black/20 border border-white/5 p-3 rounded w-full" required />
                                    <textarea name="tagline" defaultValue={editingItem?.tagline} placeholder="tagline" className="bg-black/20 border border-white/5 p-3 rounded w-full h-24" required />
                                    <textarea name="description" defaultValue={editingItem?.description} placeholder="description" className="bg-black/20 border border-white/5 p-3 rounded w-full h-48" required />
                                </>
                            )}
                            
                            <input name={activeTab === "blog" ? "tags" : "technologies"} defaultValue={(activeTab === "blog" ? editingItem?.tags : editingItem?.technologies)?.join(", ")} placeholder="tags/techs (comma separated)" className="bg-black/20 border border-white/5 p-3 rounded w-full" />
                            
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
