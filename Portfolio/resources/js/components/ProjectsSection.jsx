import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, ExternalLink, Loader2 } from "lucide-react";
import { projects as localProjects } from "@/data/projects";

const ProjectsSection = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const langColor = (lang) => {
    const map = {
      PHP: "bg-[hsl(240_60%_70%)]",
      Blade: "bg-[hsl(20_80%_55%)]",
      CSS: "bg-[hsl(220_80%_60%)]",
      TypeScript: "bg-[hsl(210_80%_55%)]",
      JavaScript: "bg-[hsl(50_90%_50%)]",
      HTML: "bg-[hsl(15_100%_60%)]",
      Markdown: "bg-foreground/60",
    };
    return map[lang] || "bg-muted-foreground";
  };

  useEffect(() => {
    const fetchFixedRepos = async () => {
      try {
        setLoading(true);
        
        // Fetch each "fixed" repository defined in our local data
        const requests = localProjects.map(project => 
          fetch(`https://api.github.com/repos/malobr/${project.name}`)
            .then(res => res.ok ? res.json() : null)
        );

        const githubData = await Promise.all(requests);
        
        const mappedRepos = localProjects.map((local, index) => {
          const github = githubData[index];
          
          return {
            ...local,
            // Prioritize GitHub data if fetch was successful, otherwise fallback to local
            language: github?.language || local.language,
            year: github ? new Date(github.created_at).getFullYear().toString() : local.year,
            liveUrl: github?.homepage || local.liveUrl,
            repoUrl: github?.html_url || local.repoUrl,
            description: github?.description || local.description,
            // Keep local tagline and slug for our detail pages
          };
        });

        setRepos(mappedRepos);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar dados do GitHub.");
        setRepos(localProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchFixedRepos();
  }, []);

  return (
    <section id="projects" className="section-padding bg-charcoal">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div>
            <p className="text-label mb-6 font-mono">// repositórios</p>
            <h2 className="text-display-lg text-foreground">
              Projetos no
              <span className="text-primary italic"> GitHub</span>
            </h2>
          </div>
          <p className="text-body-lg text-muted-foreground max-w-md mt-6 md:mt-0">
            Destaques selecionados buscados diretamente da API do GitHub. 
            Clique para ver a resolução completa do problema.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary mb-4" size={40} />
            <p className="font-mono text-muted-foreground animate-pulse">syncing with github...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((project) => (
              <Link
                key={project.slug}
                to={`/repos/${project.slug}`}
                className="group border border-border bg-background/40 p-6 md:p-8 transition-all duration-500 hover:border-primary hover:bg-background/60 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Github size={18} />
                    <span className="font-mono text-sm">malobr/</span>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                  />
                </div>

                <h3 className="font-mono text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>

                <p className="text-body text-muted-foreground mb-6 flex-1">
                  {project.tagline}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer meta */}
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${langColor(project.language)}`} />
                    <span>{project.language}</span>
                    <span className="mx-2 opacity-40">·</span>
                    <span>{project.year}</span>
                  </div>
                  {project.liveUrl && (
                    <span className="flex items-center gap-1 text-primary">
                      <ExternalLink size={12} />
                      live
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA to GitHub */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/malobr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury inline-flex items-center gap-3 bg-primary text-white border-primary hover:bg-black"
          >
            <Github size={18} />
            Ver todos no GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
