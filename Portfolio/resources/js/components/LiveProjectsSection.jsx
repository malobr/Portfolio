import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink, Globe, Loader2 } from "lucide-react";
import { translations } from "../constants/translations";

const LiveProjectsSection = ({ lang }) => {
  const t = translations[lang] || translations.pt;
  const [liveProjects, setLiveProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/live-projects")
      .then(res => res.json())
      .then(data => {
        setLiveProjects(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching live projects:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="section-padding flex flex-col items-center justify-center gap-4 bg-background border-y border-white/5">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">cat live_projects.json...</p>
      </div>
    );
  }

  return (
    <section id="trabalhos" className="section-padding bg-background">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div>
            <p className="text-label mb-6 font-mono">// {t.works.toLowerCase()}</p>
            <h2 className="text-display-lg text-foreground">
              {t.live_title.split(' ').slice(0, -1).join(' ')}
              <span className="text-primary italic"> {t.live_title.split(' ').slice(-1)}</span>
            </h2>
          </div>
          <p className="text-body-lg text-muted-foreground max-w-md mt-6 md:mt-0">
            {t.live_desc}
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
                      {project.live_url.replace(/^https?:\/\//, "")}
                    </div>
                  </div>
                </div>
                <Link to={`/trabalhos/${project.slug}`} className="block aspect-[3/4] md:aspect-video bg-background overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                  <iframe
                    src={project.live_url}
                    title={`Preview de ${project.name}`}
                    className="w-[125%] h-[125%] md:w-[166.67%] md:h-[166.67%] border-0 pointer-events-none scale-80 md:scale-[0.6] origin-top-left"
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
                    {t.live_view_case}
                  </Link>
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury text-xs px-5 py-3 inline-flex items-center gap-2 bg-primary text-white border-primary hover:bg-black"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Globe size={14} />
                    {t.live_visit}
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
