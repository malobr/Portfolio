import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink, Globe, Calendar, User, Tag, Briefcase } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getLiveProjectBySlug, getNextLiveProject } from "@/data/liveProjects";

const LiveProjectDetail = () => {
  const { slug } = useParams();
  const project = getLiveProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

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

  const nextProject = getNextLiveProject(project.slug);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-luxury">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-mono text-sm"
          >
            <ArrowLeft size={16} />
            cd ../trabalhos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-label mb-4 font-mono">// {project.category}</p>
              <h1 className="text-display-xl text-foreground mb-6">
                {project.name}
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-2xl">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex items-center gap-3 bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                >
                  <Globe size={18} />
                  Visitar site ao vivo
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <aside className="space-y-6 border-l border-border pl-8 lg:pl-10">
              <div>
                <p className="text-label text-xs font-mono mb-2 flex items-center gap-2">
                  <Briefcase size={12} /> cliente
                </p>
                <p className="text-body text-foreground font-mono">{project.client}</p>
              </div>
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

      {/* Live preview */}
      <section className="pb-16 md:pb-24">
        <div className="container-luxury">
          <div className="border border-border bg-charcoal overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
              <div className="w-3 h-3 rounded-full bg-destructive/70" />
              <div className="w-3 h-3 rounded-full bg-primary/70" />
              <div className="w-3 h-3 rounded-full bg-foreground/30" />
              <div className="ml-4 flex-1 max-w-md">
                <div className="px-3 py-1 bg-background/60 rounded text-xs font-mono text-muted-foreground truncate">
                  {project.liveUrl}
                </div>
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground hover:text-primary inline-flex items-center gap-1"
              >
                abrir <ExternalLink size={12} />
              </a>
            </div>
            <div className="aspect-[16/10] bg-background">
              <iframe
                src={project.liveUrl}
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
            Tecnologias <span className="text-primary italic">utilizadas</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
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
              <p className="text-label mb-4 font-mono text-destructive">// problema</p>
              <h3 className="text-display-md text-foreground mb-6">
                O <span className="italic">desafio</span>
              </h3>
              <p className="text-body-lg text-muted-foreground">{project.problem}</p>
            </div>
            <div>
              <p className="text-label mb-4 font-mono text-primary">// solução</p>
              <h3 className="text-display-md text-foreground mb-6">
                A <span className="italic text-primary">resolução</span>
              </h3>
              <p className="text-body-lg text-muted-foreground">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      {project.results && project.results.length > 0 && (
        <section className="py-16 md:py-20 bg-charcoal">
          <div className="container-luxury">
            <p className="text-label mb-6 font-mono">// resultados</p>
            <h2 className="text-display-md text-foreground mb-12">
              Números do <span className="text-primary italic">projeto</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
              {project.results.map((r) => (
                <div key={r.label} className="bg-charcoal p-8 md:p-10">
                  <p className="font-mono text-display-lg text-primary mb-3">{r.metric}</p>
                  <p className="text-body text-muted-foreground">{r.label}</p>
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
            O que foi <span className="text-primary italic">entregue</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {project.features.map((feature, idx) => (
              <div
                key={feature}
                className="bg-background p-8 flex items-start gap-4 group hover:bg-charcoal transition-colors"
              >
                <span className="font-mono text-primary text-sm mt-1">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-body-lg text-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="py-16 md:py-24 bg-charcoal">
        <div className="container-luxury">
          <p className="text-label mb-8 font-mono">// próximo trabalho</p>
          <Link
            to={`/trabalhos/${nextProject.slug}`}
            className="group block"
          >
            <div className="flex items-end justify-between border-b border-border pb-8 transition-colors hover:border-primary">
              <div>
                <p className="font-mono text-sm text-muted-foreground mb-2">
                  {nextProject.category}
                </p>
                <h2 className="text-display-lg text-foreground group-hover:text-primary transition-colors">
                  {nextProject.name}
                </h2>
                <p className="text-body text-muted-foreground mt-3">
                  {nextProject.tagline}
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

      <Footer />
    </div>
  );
};

export default LiveProjectDetail;
