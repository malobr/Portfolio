import React from "react";
import { Code2, Database, Cloud, Boxes, Terminal, GitBranch } from "lucide-react";

const StackSection = () => {
  const pillars = [
    {
      icon: Code2,
      title: "Frontend",
      desc: "Interfaces rápidas, acessíveis e responsivas com TypeScript no core.",
      tech: ["React", "TypeScript", "Tailwind", "Vite", "Blade"],
    },
    {
      icon: Terminal,
      title: "Backend",
      desc: "APIs RESTful, autenticação, permissões e regras de negócio bem testadas.",
      tech: ["Laravel", "PHP", "Node.js", "REST", "MVC"],
    },
    {
      icon: Database,
      title: "Database",
      desc: "Modelagem relacional, migrations versionadas e queries otimizadas.",
      tech: ["PostgreSQL", "MySQL", "Eloquent", "SQL"],
    },
    {
      icon: Boxes,
      title: "DevOps",
      desc: "Ambientes reproduzíveis, containers e orquestração para dev e prod.",
      tech: ["Docker", "Docker Compose", "Nginx", "Linux"],
    },
    {
      icon: Cloud,
      title: "Deploy & Cloud",
      desc: "Pipelines de deploy contínuo e hospedagem em plataformas modernas.",
      tech: ["Vercel", "GitHub Actions", "VPS", "CI/CD"],
    },
    {
      icon: GitBranch,
      title: "Workflow",
      desc: "Git flow, code review e arquitetura limpa em todo commit.",
      tech: ["Git", "GitHub", "Trunk-based", "Clean Code"],
    },
  ];

  return (
    <section id="stack" className="section-padding bg-charcoal">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div>
            <p className="text-label mb-6 font-mono">// stack</p>
            <h2 className="text-display-lg text-foreground">
              Arquitetura
              <span className="text-primary italic"> end-to-end</span>
            </h2>
          </div>
          <p className="text-body-lg text-muted-foreground max-w-md mt-6 md:mt-0">
            Do schema do banco ao pipeline de deploy — passando por cada camada
            que faz uma aplicação rodar bem em produção.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-charcoal p-8 md:p-10 group transition-colors duration-500 hover:bg-background/40"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 border border-border flex items-center justify-center
                                group-hover:border-primary group-hover:text-primary transition-colors">
                  <p.icon size={20} />
                </div>
                <h3 className="font-mono text-xl text-foreground">{p.title}</h3>
              </div>
              <p className="text-body text-muted-foreground mb-6">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs font-mono border border-border text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackSection;
