import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Calendar, User, Tag, FileText, Loader2 } from "lucide-react";
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
  const [nextProject, setNextProject] = useState(null);
  const [readme, setReadme] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);

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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-luxury">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>cd ../repos</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-label mb-4 font-mono">// {getT(project.category)}</p>
              <h1 className="text-display-xl text-foreground mb-6 font-mono tracking-tighter">
                {getT(project.name)}
              </h1>
              <div 
                className="text-body-lg text-muted-foreground max-w-2xl leading-relaxed prose-custom"
                dangerouslySetInnerHTML={{ __html: getT(project.description) }}
              />

              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex items-center gap-3"
                >
                  <Github size={18} />
                  {lang === 'en' ? 'View Code' : 'Ver código'}
                </a>
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury inline-flex items-center gap-3 bg-primary text-white border-primary hover:bg-black"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <aside className="space-y-6 border-l border-white/10 pl-8 lg:pl-10 h-fit">
              <div>
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2">
                  <Calendar size={12} /> {lang === 'en' ? 'year' : 'ano'}
                </p>
                <p className="text-body text-foreground font-mono">{project.year}</p>
              </div>
              <div>
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2">
                  <User size={12} /> {lang === 'en' ? 'role' : 'papel'}
                </p>
                <p className="text-body text-foreground font-mono">{getT(project.role)}</p>
              </div>
              <div>
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2">
                  <Tag size={12} /> {lang === 'en' ? 'category' : 'categoria'}
                </p>
                <p className="text-body text-foreground font-mono">{getT(project.category)}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* README Section */}
      <section className="py-20 bg-[#1c1825]/40">
        <div className="container-luxury">
          <div className="flex items-center gap-4 mb-12 overflow-hidden">
            <p className="text-label font-mono shrink-0 font-bold">// {lang === 'en' ? 'documentation' : 'documentação'}</p>
            <div className="h-px bg-white/5 flex-1" />
          </div>

          <div className="bg-[#1c1825] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="px-6 py-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-primary" />
                <span className="text-xs font-mono text-muted-foreground">README.md</span>
              </div>
              <div className="flex gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
            </div>

            <div className="p-8 md:p-12">
              {isLoadingReadme ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                  <Loader2 className="animate-spin text-primary" size={32} />
                  <p className="font-mono text-xs uppercase tracking-widest">cat README.md...</p>
                </div>
              ) : (
                <div className="prose-custom max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      table: ({node, ...props}) => (
                        <div className="w-full my-8 border border-white/10 rounded-lg overflow-hidden bg-black/20">
                          <table {...props} className="w-full border-collapse" />
                        </div>
                      ),
                      thead: ({node, ...props}) => <thead {...props} className="hidden md:table-header-group" />,
                      tr: ({node, ...props}) => <tr {...props} className="flex flex-col md:table-row border-b border-white/5 last:border-0" />,
                      th: ({node, ...props}) => <th {...props} className="px-4 py-3 md:px-6 md:py-4 text-left font-mono text-primary bg-white/5 text-xs md:text-sm uppercase tracking-wider border-b border-white/10 md:border-0" />,
                      td: ({node, ...props}) => (
                        <td {...props} className="px-4 py-3 md:px-6 md:py-4 text-muted-foreground text-[11px] md:text-sm font-mono flex flex-col md:table-cell">
                          <span className="md:hidden text-[10px] text-primary/50 uppercase mb-1 font-bold">INFO:</span>
                          {props.children}
                        </td>
                      ),
                    }}
                  >
                    {readme}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-24">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <p className="text-label mb-6 font-mono text-primary">// {lang === 'en' ? 'the challenge' : 'o desafio'}</p>
              <h3 className="text-display-md text-foreground mb-8 leading-tight font-mono">
                Overview & <span className="italic">{lang === 'en' ? 'Context' : 'Contexto'}</span>
              </h3>
              <div 
                className="text-body-lg text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-6 prose-custom"
                dangerouslySetInnerHTML={{ __html: getT(project.problem) }}
              />
            </div>
            <div>
              <p className="text-label mb-6 font-mono text-primary">// {lang === 'en' ? 'solution' : 'solução'}</p>
              <h3 className="text-display-md text-foreground mb-8 leading-tight font-mono">
                {lang === 'en' ? 'Software' : 'Engenharia de'} <span className="italic">{lang === 'en' ? 'Engineering' : 'Software'}</span>
              </h3>
              <div 
                className="text-body-lg text-muted-foreground leading-relaxed prose-custom"
                dangerouslySetInnerHTML={{ __html: getT(project.solution) }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <section className="py-16 md:py-24 bg-[#1c1825]/20">
          <div className="container-luxury">
            <p className="text-label mb-6 font-mono font-bold text-primary">// features</p>
            <h2 className="text-display-md text-foreground mb-12 font-mono">
              Key <span className="text-primary italic">Deliverables</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-[#1c1825]/40 p-8 flex items-start gap-4 group hover:bg-black/40 transition-colors"
                >
                  <span className="font-mono text-primary text-sm mt-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-body-lg text-foreground font-mono text-sm md:text-base">{getT(feature)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer Nav */}
      {nextProject && (
        <section className="py-24 bg-[#110e1a]">
          <div className="container-luxury">
            <p className="text-label mb-8 font-mono">// next_project</p>
            <Link to={`/repos/${nextProject.slug}`} className="group inline-block">
              <div className="flex items-center gap-8">
                <h2 className="text-display-lg group-hover:text-primary transition-colors font-mono">
                  {getT(nextProject.name)}
                </h2>
                <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-primary transition-all">
                    <ArrowUpRight size={24} className="group-hover:text-white" />
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
