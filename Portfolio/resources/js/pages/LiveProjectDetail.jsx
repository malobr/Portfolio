import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink, Globe, Calendar, User, Tag, Briefcase, Loader2 } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const LiveProjectDetail = () => {
  const { slug } = useParams();
  const [lang, setLang] = React.useState('pt');
  const [project, setProject] = React.useState(null);
  const [nextProject, setNextProject] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/live-projects/slug/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data);
        
        // Fetch next project
        const allRes = await fetch("/api/live-projects");
        const all = await allRes.json();
        const idx = all.findIndex(p => p.slug === slug);
        setNextProject(all[(idx + 1) % all.length]);
      } else {
        setProject(null);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setIsLoading(false);
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
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">cat live_project_data...</p>
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
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-luxury">
          <Link
            to="/#trabalhos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>cd ../trabalhos</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-label mb-4 font-mono">// {getT(project.category)}</p>
              <h1 className="text-display-xl text-foreground mb-6">
                {getT(project.name)}
              </h1>
              <div 
                className="text-body-lg text-muted-foreground max-w-2xl prose-custom"
                dangerouslySetInnerHTML={{ __html: getT(project.description) }}
              />

              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex items-center gap-3 bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                >
                  <span className="font-bold text-lg leading-none">{">_"}</span>
                  {lang === 'en' ? 'Visit live site' : 'Visitar site ao vivo'}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <aside className="space-y-6 border-l border-border/50 pl-8 lg:pl-10 h-fit">
              <div className="pb-6 border-b border-border/30">
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2 text-muted-foreground">
                  <Briefcase size={12} /> {lang === 'en' ? 'client' : 'cliente'}
                </p>
                <p className="text-body text-foreground font-mono">{project.client}</p>
              </div>
              <div className="pb-6 border-b border-border/30">
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2 text-muted-foreground">
                  <Calendar size={12} /> {lang === 'en' ? 'year' : 'ano'}
                </p>
                <p className="text-body text-foreground font-mono">{project.year}</p>
              </div>
              <div className="pb-6 border-b border-border/30">
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2 text-muted-foreground">
                  <User size={12} /> {lang === 'en' ? 'role' : 'papel'}
                </p>
                <p className="text-body text-foreground font-mono">{getT(project.role)}</p>
              </div>
              <div>
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2 text-muted-foreground">
                  <Tag size={12} /> {lang === 'en' ? 'category' : 'categoria'}
                </p>
                <p className="text-body text-foreground font-mono">{getT(project.category)}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Live preview */}
      <section className="pb-16 md:pb-24">
        <div className="container-luxury">
          <div className="border border-border bg-charcoal overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
              <div className="w-3 h-3 rounded-full bg-destructive/70" />
              <div className="w-3 h-3 rounded-full bg-primary/70" />
              <div className="w-3 h-3 rounded-full bg-foreground/30" />
              <div className="ml-4 flex-1 max-w-md">
                <div className="px-3 py-1 bg-background/60 rounded text-xs font-mono text-muted-foreground truncate flex items-center gap-2">
                  <span className="text-primary font-bold">{">_"}</span>
                  {project.live_url?.replace(/^https?:\/\//, "")}
                </div>
              </div>
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground hover:text-primary inline-flex items-center gap-1"
              >
                abrir <ExternalLink size={12} />
              </a>
            </div>
            <div className="aspect-[16/10] bg-background bg-grid-lines">
              <iframe
                src={project.live_url}
                title={`Preview de ${project.name}`}
                className="w-full h-full border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Stack */}
      <section className="py-16 md:py-20 bg-charcoal">
        <div className="container-luxury">
          <p className="text-label mb-6 font-mono">// stack</p>
          <h2 className="text-display-md text-foreground mb-10">
            {lang === 'en' ? 'Core' : 'Tecnologias'} <span className="text-primary italic">{lang === 'en' ? 'Technologies' : 'utilizadas'}</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 border border-border text-foreground font-mono text-sm hover:border-primary hover:text-primary transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 md:py-24">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className="text-label mb-4 font-mono text-destructive">// {lang === 'en' ? 'problem' : 'problema'}</p>
              <h3 className="text-display-md text-foreground mb-6">
                {lang === 'en' ? 'The' : 'O'} <span className="italic">{lang === 'en' ? 'challenge' : 'desafio'}</span>
              </h3>
              <div 
                className="text-body-lg text-muted-foreground prose-custom"
                dangerouslySetInnerHTML={{ __html: getT(project.problem) }}
              />
            </div>
            <div>
              <p className="text-label mb-4 font-mono text-primary">// {lang === 'en' ? 'solution' : 'solução'}</p>
              <h3 className="text-display-md text-foreground mb-6">
                {lang === 'en' ? 'The' : 'A'} <span className="italic text-primary">{lang === 'en' ? 'resolution' : 'resolução'}</span>
              </h3>
              <div 
                className="text-body-lg text-muted-foreground prose-custom"
                dangerouslySetInnerHTML={{ __html: getT(project.solution) }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      {project.results && project.results.length > 0 && (
        <section className="py-16 md:py-20 bg-charcoal">
          <div className="container-luxury">
            <p className="text-label mb-6 font-mono">// {lang === 'en' ? 'results' : 'resultados'}</p>
            <h2 className="text-display-md text-foreground mb-12">
              {lang === 'en' ? 'Project' : 'Números do'} <span className="text-primary italic">{lang === 'en' ? 'metrics' : 'projeto'}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
              {project.results.map((r, idx) => (
                <div key={idx} className="bg-charcoal p-8 md:p-10">
                  <p className="font-mono text-display-lg text-primary mb-3">{r.metric}</p>
                  <p className="text-body text-muted-foreground">{getT(r.label)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container-luxury">
          <p className="text-label mb-6 font-mono">// features</p>
          <h2 className="text-display-md text-foreground mb-12">
            {lang === 'en' ? 'Key' : 'O que foi'} <span className="text-primary italic">{lang === 'en' ? 'deliverables' : 'entregue'}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {project.features?.map((feature, idx) => (
              <div
                key={feature}
                className="bg-background p-8 flex items-start gap-4 group hover:bg-charcoal transition-colors"
              >
                <span className="font-mono text-primary text-sm mt-1">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-body-lg text-foreground">{getT(feature)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next */}
      {nextProject && (
        <section className="py-16 md:py-24 bg-charcoal">
          <div className="container-luxury">
            <p className="text-label mb-8 font-mono">// {lang === 'en' ? 'next work' : 'próximo trabalho'}</p>
            <Link
              to={`/trabalhos/${nextProject.slug}`}
              className="group block"
            >
              <div className="flex items-end justify-between border-b border-border pb-8 transition-colors hover:border-primary">
                <div>
                  <p className="font-mono text-sm text-muted-foreground mb-2">
                    {getT(nextProject.category)}
                  </p>
                  <h2 className="text-display-lg text-foreground group-hover:text-primary transition-colors">
                    {getT(nextProject.name)}
                  </h2>
                  <p className="text-body text-muted-foreground mt-3">
                    {getT(nextProject.tagline)}
                  </p>
                </div>
                <div className="w-14 h-14 border border-foreground/30 flex items-center justify-center
                                transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  <ArrowUpRight size={22} />
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

export default LiveProjectDetail;
