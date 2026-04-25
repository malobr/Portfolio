import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Calendar, User, Tag, FileText, Loader2, ShieldCheck, Activity, Cpu, Database, Binary } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { getProjectBySlug, getNextProject } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [lang, setLang] = useState('pt');
  const [project, setProject] = useState(null);
  const [githubStats, setGithubStats] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [readme, setReadme] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const [isForensic, setIsForensic] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/slug/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data);
        
        // Fetch Github Telemetry
        fetchGithubData(data.name);

        // Fetch next project for navigation
        const allRes = await fetch("/api/projects");
        const all = await allRes.json();
        const idx = all.findIndex(p => p.slug === slug);
        setNextProject(all[(idx + 1) % all.length]);
        
        fetchReadme(data);
      } else {
        setProject(null);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGithubData = async (repoName) => {
    try {
        const res = await fetch(`https://api.github.com/repos/malobr/${repoName}`);
        if (res.ok) {
            setGithubStats(await res.json());
        }
    } catch (e) { console.error("GH Data Error", e); }
  };

  const fetchReadme = async (projectData) => {
    if (!projectData) return;
    setIsLoadingReadme(true);
    const repoName = projectData.name;
    try {
      const response = await fetch(`https://raw.githubusercontent.com/malobr/${repoName}/main/README.md`);
      if (response.ok) {
        setReadme(await response.text());
      } else {
        const responseMaster = await fetch(`https://raw.githubusercontent.com/malobr/${repoName}/master/README.md`);
        if (responseMaster.ok) {
          setReadme(await responseMaster.text());
        } else {
           setReadme("README não encontrado via API. Verifique se o arquivo README.md existe no repositório.");
        }
      }
    } catch (error) {
      console.error("Error fetching README:", error);
      setReadme("Erro ao carregar README.");
    } finally {
      setIsLoadingReadme(false);
    }
  };

  const getT = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.pt || Object.values(obj)[0] || "";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">cat project_data...</p>
      </div>
    );
  }

  if (!project) {
    const tNotFound = lang === 'en' ? 'Project not found' : 'Projeto não encontrado';
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-label mb-4 font-mono">// 404</p>
          <h1 className="text-display-lg text-foreground mb-6">{tNotFound}</h1>
          <Link to="/" className="btn-luxury inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            cd ../repos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isForensic ? 'bg-[#0a0a0a] text-amber-500/90' : 'bg-background text-foreground'}`}>
      <Navigation lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
            <Link
              to="/#projects"
              className={`inline-flex items-center gap-2 font-mono group ${isForensic ? 'text-amber-500/40 hover:text-amber-500' : 'text-muted-foreground hover:text-primary'}`}
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>cd ../root</span>
            </Link>

            <button 
                onClick={() => setIsForensic(!isForensic)}
                className={`flex items-center gap-3 px-6 py-2 border font-mono text-xs uppercase tracking-[0.2em] transition-all ${
                    isForensic 
                    ? 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                    : 'border-white/10 text-muted-foreground hover:border-primary/50'
                }`}
            >
                {isForensic ? <ShieldCheck size={14} className="animate-pulse" /> : <Activity size={14} />}
                {lang === 'en' ? 'Forensic Mode' : 'Modo Forense'}
                <span className={`ml-2 w-2 h-2 rounded-full ${isForensic ? 'bg-amber-500 animate-ping' : 'bg-white/20'}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className={`text-label mb-4 font-mono ${isForensic ? 'text-amber-500/60' : ''}`}>// {getT(project.category)}</p>
              <h1 className={`text-display-xl mb-6 font-mono tracking-tighter ${isForensic ? 'text-amber-500 uppercase' : 'text-foreground'}`}>
                {getT(project.name)}
              </h1>
              
              <div 
                className={`text-body-lg max-w-2xl leading-relaxed prose-custom ${isForensic ? 'text-amber-500/70 border-l border-amber-500/30 pl-6 italic' : 'text-muted-foreground'}`}
                dangerouslySetInnerHTML={{ __html: getT(project.description) }}
              />

              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-luxury inline-flex items-center gap-3 ${isForensic ? 'border-amber-500 text-amber-500 hover:bg-amber-500/10' : ''}`}
                >
                  <Github size={18} />
                  {lang === 'en' ? 'Verify Source' : 'Ver Código Fonte'}
                </a>
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-luxury inline-flex items-center gap-3 ${isForensic ? 'border-amber-500/50 text-amber-500/50' : 'bg-primary text-white border-primary hover:bg-black'}`}
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <aside className={`space-y-6 border-l pl-8 lg:pl-10 h-fit transition-colors ${isForensic ? 'border-amber-500/20' : 'border-border/50'}`}>
              {[
                { icon: <Calendar size={12} />, label: lang === 'en' ? 'YEAR' : 'ANO', val: project.year },
                { icon: <User size={12} />, label: lang === 'en' ? 'PRINCIPAL' : 'RESPONSÁVEL', val: getT(project.role) },
                { icon: <Tag size={12} />, label: 'DOMAIN', val: getT(project.category) }
              ].map((item, i, arr) => (
                <div key={i} className={`pb-6 ${i !== arr.length - 1 ? 'border-b border-border/30' : ''}`}>
                    <p className={`text-label text-[10px] font-mono mb-1 flex items-center gap-2 ${isForensic ? 'text-amber-500/50' : 'text-muted-foreground'}`}>
                        {item.icon} {item.label}
                    </p>
                    <p className="text-body font-mono font-bold tracking-widest">{item.val}</p>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      {/* Forensic Diagnostic Section */}
      <AnimatePresence>
        {isForensic && (
            <motion.section 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="py-12 border-y border-amber-500/20 bg-amber-500/5 overflow-hidden"
            >
                <div className="container-luxury">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { label: 'REPO_SIZE', val: `${githubStats?.size || '---'} KB`, icon: <Database size={16}/> },
                            { label: 'FORKS_COUNT', val: githubStats?.forks_count || 0, icon: <Activity size={16}/> },
                            { label: 'OPEN_ISSUES', val: githubStats?.open_issues_count || 0, icon: <Binary size={16}/> },
                            { label: 'LAST_PUSH', val: githubStats?.pushed_at?.split('T')[0] || '---', icon: <Cpu size={16}/> }
                        ].map((stat, i) => (
                            <div key={i} className="p-4 border border-amber-500/10 bg-black/40 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                                    {stat.icon}
                                </div>
                                <p className="text-[10px] font-mono text-amber-500/40 mb-2">SYSTEM_VAR_{stat.label}</p>
                                <p className="text-2xl font-mono text-amber-500">{stat.val}</p>
                                <div className="mt-2 h-0.5 bg-amber-500/10 w-full overflow-hidden">
                                    <motion.div 
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                                        className="h-full bg-amber-500/40 w-1/3"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>
        )}
      </AnimatePresence>

      {/* README Section */}
      <section className={`py-20 ${isForensic ? 'bg-black' : 'bg-charcoal/40'}`}>
        <div className="container-luxury">
          <div className="flex items-center gap-4 mb-12 overflow-hidden">
            <p className={`text-label font-mono shrink-0 font-bold ${isForensic ? 'text-amber-500' : ''}`}>// {lang === 'en' ? 'telemetry_readme' : 'leitura_readme'}</p>
            <div className={`h-px flex-1 ${isForensic ? 'bg-amber-500/20' : 'bg-white/5'}`} />
          </div>

          <div className={`border rounded-xl shadow-2xl transition-colors ${isForensic ? 'bg-black border-amber-500/30' : 'bg-charcoal border-border'}`}>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${isForensic ? 'bg-amber-500/10 border-amber-500/20' : 'bg-secondary/80 border-border'}`}>
              <div className="flex items-center gap-3">
                <FileText size={16} className={isForensic ? 'text-amber-500' : 'text-primary'} />
                <span className={`text-xs font-mono uppercase tracking-widest ${isForensic ? 'text-amber-500/60' : 'text-muted-foreground'}`}>raw_buffer:readme.bin</span>
              </div>
            </div>

            <div className={`p-8 md:p-12 bg-grid-lines ${isForensic ? 'prose-forensic' : 'prose-custom'}`}>
              {isLoadingReadme ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                  <Loader2 className="animate-spin text-primary" size={32} />
                  <p className="font-mono text-xs uppercase tracking-widest">decrypting buffer...</p>
                </div>
              ) : (
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                >
                    {readme}
                </ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      {nextProject && (
        <section className={`py-24 ${isForensic ? 'bg-[#050505]' : 'bg-secondary'}`}>
          <div className="container-luxury">
            <p className={`text-label mb-8 font-mono ${isForensic ? 'text-amber-500/40' : 'text-muted-foreground'}`}>// scan_next_node</p>
            <Link to={`/repos/${nextProject.slug}`} className="group inline-block">
              <div className="flex items-center gap-8">
                <h2 className={`text-display-lg transition-colors font-mono ${isForensic ? 'text-amber-500/60 group-hover:text-amber-500' : 'text-foreground group-hover:text-primary'}`}>
                  {getT(nextProject.name)}
                </h2>
                <div className={`w-16 h-16 border rounded-full flex items-center justify-center transition-all ${isForensic ? 'border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black' : 'border-primary/20 group-hover:bg-primary group-hover:text-white'}`}>
                    <ArrowUpRight size={24} />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <Footer lang={lang} />
    </div>
  );
};

export default ProjectDetail;
