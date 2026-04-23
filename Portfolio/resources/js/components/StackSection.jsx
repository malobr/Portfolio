import React from "react";
import { Code2, Database, Cloud, Boxes, Terminal, GitBranch, GraduationCap } from "lucide-react";
import { translations } from "../constants/translations";

const StackSection = ({ lang }) => {
  const t = translations[lang] || translations.pt;
  const pillars = [
    {
      icon: Code2,
      title: "Frontend",
      desc: t.frontend_desc,
      tech: ["React", "Vue", "JavaScript", "TypeScript", "Blade"],
    },
    {
      icon: Terminal,
      title: "Backend",
      desc: t.backend_desc,
      tech: ["Laravel", "PHP", "REST", "MVC"],
    },
    {
      icon: Database,
      title: "Database",
      desc: t.db_desc,
      tech: ["MongoDB", "MySQL", "Eloquent", "SQL"],
    },
    {
      icon: Boxes,
      title: "DevOps",
      desc: t.devops_desc,
      tech: ["Docker", "Docker Compose", "Nginx", "Linux"],
    },
    {
      icon: Cloud,
      title: "Deploy & Cloud",
      desc: t.cloud_desc,
      tech: ["Hostinger", "Vercel", "GitHub Actions", "VPS", "CI/CD"],
    },
    {
      icon: GitBranch,
      title: "Workflow",
      desc: t.workflow_desc,
      tech: ["SOLID", "Git", "GitHub", "Trunk-based", "Clean Code"],
    },
    {
      icon: GraduationCap,
      title: lang === "pt" ? "Em Aprendizado" : "In Training",
      desc: lang === "pt" ? "Novas fronteiras e conceitos em evolução." : "New frontiers and evolving concepts.",
      tech: ["SOLID", "Java", "Kotlin", "Microservices", "Design Patterns"],
      fullWidth: true,
    },
  ];

  return (
    <section id="stack" className="section-padding bg-charcoal">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div>
            <p className="text-label mb-6 font-mono">// {t.stack.toLowerCase()}</p>
            <h2 className="text-display-lg text-foreground">
              {t.stack_title.split(' ')[0]}
              <span className="text-primary italic"> {t.stack_title.split(' ').slice(1).join(' ')}</span>
            </h2>
          </div>
          <p className="text-body-lg text-muted-foreground max-w-md mt-6 md:mt-0">
            {t.stack_desc}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {pillars.map((p) => (
            <div
              key={p.title}
              className={`bg-charcoal p-8 md:p-10 group transition-colors duration-500 hover:bg-background/40
                          ${p.fullWidth ? "md:col-span-2 lg:col-span-3" : ""}`}
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
