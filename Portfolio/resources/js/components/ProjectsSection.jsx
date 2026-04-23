import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, ExternalLink, Loader2, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../constants/translations";

const ProjectsSection = ({ lang }) => {
  const t = translations[lang] || translations.pt;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

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
        const apiRes = await fetch("/api/projects");
        const localProjects = await apiRes.json();
        const requests = localProjects.map(project => 
          fetch(`https://api.github.com/repos/malobr/${project.name}`)
            .then(res => res.ok ? res.json() : null)
        );
        const githubData = await Promise.all(requests);
        const mappedRepos = localProjects.map((local, index) => {
          const github = githubData[index];
          return {
            ...local,
            language: github?.language || local.language,
            year: github ? new Date(github.created_at).getFullYear().toString() : local.year,
            repoUrl: github?.html_url || local.repo_url,
            description: github?.description || local.description,
          };
        });
        setRepos(mappedRepos);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchFixedRepos();
  }, []);

  const filters = useMemo(() => {
    const techs = new Set();
    repos.forEach(repo => repo.technologies.forEach(t => techs.add(t)));
    return ["All", ...Array.from(techs).sort().slice(0, 5)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (activeFilter === "All") return repos;
    return repos.filter(repo => repo.technologies.includes(activeFilter));
  }, [repos, activeFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="projects" className="section-padding bg-charcoal overflow-hidden">
      <div className="container-luxury">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16"
        >
          <div>
            <p className="text-label mb-6 font-mono">// {t.repos.toLowerCase()}</p>
            <h2 className="text-display-lg text-foreground">
              {t.projects_title.split(' ').slice(0, -1).join(' ')}
              <span className="text-primary italic"> {t.projects_title.split(' ').slice(-1)}</span>
            </h2>
          </div>
          <p className="text-body-lg text-muted-foreground max-w-md mt-6 md:mt-0">
            {t.projects_desc}
          </p>
        </motion.div>

        {/* Filters */}
        {!loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-3 mb-12 border-b border-border pb-8"
          >
            <div className="flex items-center gap-2 text-muted-foreground mr-4">
              <Filter size={14} />
              <span className="text-xs font-mono uppercase tracking-widest">{lang === 'en' ? 'Filter' : 'Filtrar'}</span>
            </div>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-mono text-xs transition-all ${
                  activeFilter === filter 
                    ? "bg-primary text-white" 
                    : "bg-background/40 text-muted-foreground hover:text-white hover:bg-background/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary mb-4" size={40} />
            <p className="font-mono text-muted-foreground animate-pulse">{t.projects_loading.toLowerCase()}</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredRepos.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Link
                    to={`/repos/${project.slug}`}
                    className="group h-full border border-border bg-background/40 p-6 md:p-8 transition-all duration-500 hover:border-primary hover:bg-background/60 flex flex-col"
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
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/malobr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury inline-flex items-center gap-3 bg-primary text-white border-primary hover:bg-black"
          >
            <Github size={18} />
            {t.projects_view_more}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
