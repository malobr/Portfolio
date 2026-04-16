import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink, Globe } from "lucide-react";
import { liveProjects } from "@/data/liveProjects";

const LiveProjectsSection = () => {
  return (
    <section id="trabalhos" className="section-padding bg-background">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div>
            <p className="text-label mb-6 font-mono">// trabalhos lançados</p>
            <h2 className="text-display-lg text-foreground">
              Sites no
              <span className="text-primary italic"> ar</span>
            </h2>
          </div>
          <p className="text-body-lg text-muted-foreground max-w-md mt-6 md:mt-0">
            Projetos reais entregues a clientes — em produção, gerando valor.
            Clique para conhecer o case ou visitar o site.
          </p>
        </div>

        {/* Live Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {liveProjects.map((project) => (
            <article
              key={project.slug}
              className="group border border-border bg-charcoal overflow-hidden flex flex-col transition-all duration-500 hover:border-primary"
            >
              {/* Browser preview */}
              <div className="border-b border-border">
                <div className="flex items-center gap-2 px-4 py-3 bg-background/40 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-primary/70" />
                  <div className="w-3 h-3 rounded-full bg-foreground/30" />
                  <div className="ml-3 flex-1 max-w-xs">
                    <div className="px-3 py-1 bg-background/60 rounded text-xs font-mono text-muted-foreground truncate">
                      {project.liveUrl.replace(/^https?:\/\//, "")}
                    </div>
                  </div>
                </div>
                <Link to={`/trabalhos/${project.slug}`} className="block aspect-video bg-background overflow-hidden">
                  <iframe
                    src={project.liveUrl}
                    title={`Preview de ${project.name}`}
                    className="w-full h-full border-0 pointer-events-none scale-[0.6] origin-top-left"
                    style={{ width: "166.67%", height: "166.67%" }}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </Link>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <p className="text-label font-mono text-xs">
                    {project.category} · {project.year}
                  </p>
                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                  />
                </div>

                <h3 className="text-display-md text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>

                <p className="text-body text-muted-foreground mb-6 flex-1">
                  {project.tagline}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono border border-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-border">
                  <Link
                    to={`/trabalhos/${project.slug}`}
                    className="btn-luxury text-xs px-5 py-3 inline-flex items-center gap-2"
                  >
                    Ver case
                  </Link>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury text-xs px-5 py-3 inline-flex items-center gap-2 bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Globe size={14} />
                    Visitar site
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveProjectsSection;
