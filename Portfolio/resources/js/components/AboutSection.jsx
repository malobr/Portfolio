import React from 'react';

const AboutSection = () => {
  const stats = [
    { number: "5+", label: "Anos codando" },
    { number: "20+", label: "Repositórios" },
    { number: "∞", label: "Cafés tomados" },
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text */}
          <div>
            <p className="text-label mb-6 font-mono">// sobre</p>
            <h2 className="text-display-lg text-foreground mb-8">
              Código é a arte de
              <span className="text-primary italic"> resolver </span>
              problemas
            </h2>
            <div className="space-y-6">
              <p className="text-body-lg text-muted-foreground">
                Sou Marcelo, dev fullstack do Brasil. Trabalho do banco de dados
                ao pixel — passando por APIs, autenticação, containers e CI/CD.
                Gosto de código limpo, testável e bem arquitetado.
              </p>
              <p className="text-body-lg text-muted-foreground">
                Stack principal: <span className="font-mono text-foreground">PHP/Laravel</span>,{" "}
                <span className="font-mono text-foreground">TypeScript/React</span>,{" "}
                <span className="font-mono text-foreground">Node</span>,{" "}
                <span className="font-mono text-foreground">Docker</span> e{" "}
                <span className="font-mono text-foreground">PostgreSQL</span>.
                Provavelmente tomando café ou fumando um charuto enquanto leio
                um pull request.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index}>
                  <span className="text-display-md text-primary font-mono">{stat.number}</span>
                  <p className="text-body-sm text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Terminal Card */}
          <div className="relative">
            <div className="aspect-[4/5] bg-secondary relative overflow-hidden border border-border">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-primary/70" />
                <div className="w-3 h-3 rounded-full bg-foreground/30" />
                <span className="ml-3 text-xs font-mono text-muted-foreground">
                  ~/malobr — zsh
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-6 font-mono text-sm space-y-3">
                <p className="text-muted-foreground">
                  <span className="text-primary">➜</span> cat profile.json
                </p>
                <pre className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
{`{
  "name": "Marcelo",
  "handle": "malobr",
  "role": "Fullstack Dev",
  "location": "Brazil 🇧🇷",
  "stack": [
    "Laravel",
    "TypeScript",
    "React",
    "Docker",
    "PostgreSQL"
  ],
  "currently": "shipping code",
  "open_to_work": true
}`}
                </pre>
                <p className="text-muted-foreground">
                  <span className="text-primary">➜</span>{" "}
                  <span className="animate-pulse">█</span>
                </p>
              </div>
            </div>
            {/* Decorative borders */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-primary/30 -z-10" />
            <div className="absolute -top-8 -left-8 w-24 h-24 border border-border -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
