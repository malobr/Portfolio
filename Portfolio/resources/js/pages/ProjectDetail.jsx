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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">cat project_data...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-label mb-4 font-mono">// 404</p>
          <h1 className="text-display-lg text-foreground mb-6">Projeto não encontrado</h1>
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
              <p className="text-label mb-4 font-mono">// {project.category}</p>
              <h1 className="text-display-xl text-foreground mb-6 font-mono tracking-tighter">
                {project.name}
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-2xl leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex items-center gap-3"
                >
                  <Github size={18} />
                  Ver código
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
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
                  <Calendar size={12} /> ano
                </p>
                <p className="text-body text-foreground font-mono">{project.year}</p>
              </div>
              <div>
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2">
                  <User size={12} /> papel
                </p>
                <p className="text-body text-foreground font-mono">{project.role}</p>
              </div>
              <div>
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2">
                  <Tag size={12} /> categoria
                </p>
                <p className="text-body text-foreground font-mono">{project.category}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* README Section */}
      <section className="py-20 bg-[#1c1825]/40">
        <div className="container-luxury">
          <div className="flex items-center gap-4 mb-12 overflow-hidden">
            <p className="text-label font-mono shrink-0 font-bold">// documentation</p>
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
              <p className="text-label mb-6 font-mono text-primary">// o desafio</p>
              <h3 className="text-display-md text-foreground mb-8 leading-tight font-mono">
                Overview & <span className="italic">Contexto</span>
              </h3>
              <p className="text-body-lg text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-6">
                {project.problem}
              </p>
            </div>
            <div>
              <p className="text-label mb-6 font-mono text-primary">// solução</p>
              <h3 className="text-display-md text-foreground mb-8 leading-tight font-mono">
                Engenharia de <span className="italic">Software</span>
              </h3>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="py-24 bg-[#110e1a]">
        <div className="container-luxury">
           <p className="text-label mb-8 font-mono">// next_project</p>
           <Link to={`/repos/${nextProject.slug}`} className="group inline-block">
             <div className="flex items-center gap-8">
               <h2 className="text-display-lg group-hover:text-primary transition-colors font-mono">
                 {nextProject.name}
               </h2>
               <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-primary transition-all">
                  <ArrowUpRight size={24} className="group-hover:text-white" />
               </div>
             </div>
           </Link>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
};

export default ProjectDetail;
