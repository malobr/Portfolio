import React, { useState } from "react";
import { ArrowLeft, Download, ExternalLink, Mail, Github, MapPin, Phone, Briefcase, GraduationCap, Code2, Award, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const CV = () => {
  const [lang, setLang] = useState('pt');

  const cvData = {
    pt: {
      title: "Marcelo Tomás Cavalheiro",
      role: "Desenvolvedor Back-end especializado em PHP e Laravel",
      location: "Curitiba - PR",
      summary: "Desenvolvedor Back-end especializado em PHP e Laravel, com experiência em ambientes ágeis e foco em arquiteturas escaláveis e autenticação segura. Atuei em projetos voltados à área da saúde, incluindo o sistema legado Adam Robo A1, um SaaS responsável por gerenciar e apresentar gráficos de desempenho e realizar testes de visão em múltiplos níveis. Quero aprimorar minhas habilidades técnicas e contribuir em todas as etapas do desenvolvimento, da modelagem de dados à entrega final, gosto de priorizar a performance, segurança e qualidade de código. Tenho facilidade em resolver problemas e montar toda a diagramação do projeto.",
      experience: [
        {
          company: "Lar Bom Caminho (ONG)",
          role: "Desenvolvedor Full-Stack",
          period: "Janeiro de 2026 – Março 2026",
          desc: "Desenvolvimento integral da plataforma institucional. Implementei um sistema de Gestão de Conteúdo (CMS) exclusivo com editor WYSIWYG, permitindo que a equipe da ONG gerencie publicações e doações com total autonomia. Estruturei toda a diagramação do projeto, garantindo uma interface moderna e segura para a captação de recursos via PIX e transparência institucional."
        },
        {
            company: "Novo Ingresso / WebPag",
            role: "Desenvolvedor Back-end (PJ)",
            period: "Novembro de 2025 – Fevereiro de 2026",
            desc: "Liderei a transição de processos físicos para digitais através da implementação sistemática da API do Autentique para automação de contratos. Desenvolvi funcionalidades críticas em PHP/Laravel focadas em segurança jurídica e escalabilidade para o gateway de pagamentos e plataforma de eventos, substituindo fluxos manuais por uma infraestrutura 100% automatizada."
        },
        {
          company: "Adam Robo",
          role: "Desenvolvedor Back-end",
          period: "Julho de 2024 – Novembro de 2025",
          desc: "Especialista em desenvolvimento para saúde visual no sistema Adam Robo A1. Desenvolvi módulos inovadores para realização de testes de visão de forma facilitada e geração de relatórios de desempenho em múltiplos níveis. Atuei na manutenção de APIs RESTful robustas com Laravel 10/11/12 e Sanctum, otimizando queries complexas e garantindo a performance de um SaaS que atende clínicas e grandes corporações globalmente."
        }
      ],
      skills: {
        backend: ["PHP", "Laravel", "MySQL", "APIs REST", "Sanctum"],
        frontend: ["HTML", "CSS", "JavaScript", "React", "Vue js", "Tailwind CSS"],
        devops: ["Docker", "CI/CD", "Git", "Terminal/Linux"],
        concepts: ["MVC", "SOLID", "Design Patterns", "Clean Code"]
      },
      education: [
        { school: "Universidade Positivo", course: "Análise e Desenvolvimento de Sistemas", year: "Conclusão prevista: 2026" },
        { school: "Colégio Estadual Pedro Macedo", course: "Ensino Médio Técnico em Informática", year: "Concluído em 2021" }
      ]
    },
    en: {
        title: "Marcelo Tomás Cavalheiro",
        role: "Back-end Developer specialized in PHP and Laravel",
        location: "Curitiba - Brazil",
        summary: "Back-end Developer specialized in PHP and Laravel, experienced in agile environments focusing on scalable architectures and secure authentication. Worked on healthcare projects, including the legacy Adam Robo A1 system, a SaaS managing performance graphics and multi-level vision tests. Committed to code quality, security, and clean architecture.",
        experience: [
            {
                company: "Lar Bom Caminho (NGO)",
                role: "Full-Stack Developer",
                period: "Jan 2026 – Mar 2026",
                desc: "Full project lifecycle responsibility. Implemented a custom CMS with WYSIWYG editor for content and donation management. Built a modern, secure interface for PIX donations and institutional transparency."
            },
            {
                company: "Novo Ingresso / WebPag",
                role: "Back-end Developer (Contractor)",
                period: "Nov 2025 – Feb 2026",
                desc: "Led digital transformation by implementing Autentique API for contract automation. Developed critical PHP/Laravel features for secure payment gateways and event platforms, replacing manual paperwork with 100% automated infrastructure."
            },
            {
                company: "Adam Robo",
                role: "Back-end Developer",
                period: "Jul 2024 – Nov 2025",
                desc: "Specialized in HealthTech development for vision testing systems. Developed innovative modules for vision screening and multi-level performance reporting. Optimized complex SQL queries for a global SaaS platform using Laravel and Sanctum."
            }
        ],
        skills: {
            backend: ["PHP", "Laravel", "MySQL", "REST APIs", "Sanctum"],
            frontend: ["HTML", "CSS", "JavaScript", "React", "Vue js", "Tailwind CSS"],
            devops: ["Docker", "CI/CD", "Git", "Terminal/Linux"],
            concepts: ["MVC", "SOLID", "Design Patterns", "Clean Code"]
        },
        education: [
            { school: "Universidade Positivo", course: "Analysis and Systems Development", year: "Expected 2026" },
            { school: "Pedro Macedo School", course: "IT Technical High School", year: "Completed 2021" }
        ]
    }
  };

  const d = cvData[lang];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <div className="print:hidden">
        <Navigation lang={lang} setLang={setLang} />
      </div>

      <main className="pt-32 pb-20 md:pt-40 print:pt-10 print:pb-0">
        <div className="container-luxury group">
          {/* Header */}
          <div className="mb-16 md:mb-24 print:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
              <div className="max-w-4xl">
                <span className="font-mono text-primary text-xs uppercase tracking-[0.3em] mb-4 block animate-pulse print:animate-none">
                  // dossier:marcelo_tomas_cavalheiro
                </span>
                <h1 className="text-display-xl tracking-tighter mb-6 leading-none">
                  {d.title}
                </h1>
                <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl">
                    {d.role}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 h-fit print:hidden">
                <button 
                  onClick={() => window.print()} 
                  className="btn-luxury inline-flex items-center gap-2 bg-primary text-white border-primary hover:bg-black transition-all cursor-pointer"
                >
                  <Download size={16} />
                  Export PDF
                </button>
              </div>
            </motion.div>

            {/* Quick Contact Bar */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 mt-12 py-8 border-y border-border print:py-4 print:mt-6">
               <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Mail size={14} className="text-primary" />
                  marcelotc1202@gmail.com
               </div>
               <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground">
                  <MapPin size={14} className="text-primary" />
                  {d.location}
               </div>
               <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground">
                  <Phone size={14} className="text-primary" />
                  (41) 98711-5697
               </div>
               <a 
                 href="https://github.com/malobr" 
                 target="_blank" 
                 className="flex items-center gap-3 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
               >
                  <Github size={14} className="text-primary" />
                  github.com/malobr
               </a>
               <a 
                 href="https://www.linkedin.com/in/marcelo-tomás-a92b16231" 
                 target="_blank" 
                 className="flex items-center gap-3 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
               >
                  <Linkedin size={14} className="text-primary" />
                  linkedin.com/in/marcelo-tomás
               </a>
            </div>
          </div>

          {/* Dossiê Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 print:gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-20 print:space-y-10">
              
              {/* Summary */}
              <section>
                <div className="flex items-center gap-4 mb-10 print:mb-6">
                   <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-primary shrink-0">
                      // {lang === 'pt' ? 'resumo' : 'summary'}
                   </h2>
                   <div className="h-px bg-border flex-1" />
                </div>
                <div className="bg-charcoal/30 border border-border p-8 md:p-12 rounded-xl border-l-4 border-l-primary shadow-2xl relative overflow-hidden group print:shadow-none print:p-6 print:bg-transparent">
                   {/* Scanline pattern */}
                   <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] z-10 bg-[length:100%_4px] print:hidden" />
                   <p className="text-lg md:text-xl font-light leading-relaxed text-foreground/90 relative z-20 print:text-black">
                      {d.summary}
                   </p>
                </div>
              </section>

              {/* Experience */}
              <section>
                 <div className="flex items-center gap-4 mb-12 print:mb-6">
                    <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-primary shrink-0">
                       // {lang === 'pt' ? 'experiência' : 'experience'}
                    </h2>
                    <div className="h-px bg-border flex-1" />
                 </div>
                 
                 <div className="space-y-12 print:space-y-8">
                    {d.experience.map((exp, i) => (
                      <div key={i} className="group relative pl-8 border-l border-border transition-all hover:border-primary print:border-black/20">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-border group-hover:bg-primary transition-colors print:bg-black/40" />
                        <span className="text-[10px] font-mono text-primary mb-2 block uppercase tracking-widest">{exp.period}</span>
                        <h3 className="text-2xl font-mono mb-2 text-foreground group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-3 print:text-black">
                           {exp.company}
                           <ArrowLeft size={16} className="text-primary rotate-180 opacity-0 group-hover:opacity-100 transition-all print:hidden" />
                        </h3>
                        <p className="text-sm font-bold text-muted-foreground mb-6 uppercase tracking-wider print:text-black/70">{exp.role}</p>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl bg-secondary/50 p-6 border border-border rounded-lg print:bg-transparent print:border-none print:p-0 print:text-black">
                           {exp.desc}
                        </p>
                      </div>
                    ))}
                 </div>
              </section>
            </div>

            {/* Sidebar Skills & Education */}
            <aside className="lg:col-span-4 space-y-12 print:space-y-8">
               
               {/* Skills */}
               <div className="bg-charcoal p-8 md:p-10 border border-border rounded-xl shadow-xl print:shadow-none print:bg-transparent print:p-0 print:border-none">
                  <div className="flex items-center gap-3 mb-10 print:mb-6">
                     <Code2 size={18} className="text-primary" />
                     <h3 className="font-mono text-xs uppercase tracking-[0.2em] print:text-black">{lang === 'en' ? 'Core Stack' : 'Habilidades'}</h3>
                  </div>

                  <div className="space-y-10 print:space-y-6">
                    <div>
                        <p className="text-[10px] font-mono text-muted-foreground mb-4 uppercase tracking-widest print:text-black/70">Back-end</p>
                        <div className="flex flex-wrap gap-2">
                           {d.skills.backend.map(s => <span key={s} className="px-3 py-1 bg-secondary border border-border text-[11px] font-mono text-foreground hover:border-primary transition-colors print:bg-transparent print:border-black/20 print:text-black">{s}</span>)}
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-mono text-muted-foreground mb-4 uppercase tracking-widest print:text-black/70">Front-end</p>
                        <div className="flex flex-wrap gap-2">
                           {d.skills.frontend.map(s => <span key={s} className="px-3 py-1 bg-secondary border border-border text-[11px] font-mono text-foreground hover:border-primary transition-colors print:bg-transparent print:border-black/20 print:text-black">{s}</span>)}
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-mono text-muted-foreground mb-4 uppercase tracking-widest print:text-black/70">Architectural Concepts</p>
                        <div className="flex flex-wrap gap-2">
                           {d.skills.concepts.map(s => <span key={s} className="px-3 py-1 bg-secondary border border-border text-[11px] font-mono text-foreground hover:border-primary transition-colors print:bg-transparent print:border-black/20 print:text-black">{s}</span>)}
                        </div>
                    </div>
                  </div>
               </div>

               {/* Education */}
               <div className="bg-secondary p-8 border border-border rounded-xl print:bg-transparent print:p-0 print:border-none">
                  <div className="flex items-center gap-3 mb-8 print:mb-4">
                     <GraduationCap size={18} className="text-primary" />
                     <h3 className="font-mono text-xs uppercase tracking-[0.2em] print:text-black">{lang === 'en' ? 'Education' : 'Formação'}</h3>
                  </div>
                  <div className="space-y-8 print:space-y-4">
                    {d.education.map((edu, i) => (
                      <div key={i}>
                        <h4 className="text-sm font-bold text-foreground mb-1 print:text-black">{edu.school}</h4>
                        <p className="text-[13px] text-muted-foreground leading-snug mb-2 print:text-black/80">{edu.course}</p>
                        <span className="text-[10px] font-mono text-primary/60">{edu.year}</span>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Awards/Special */}
               <div className="bg-black text-white p-8 rounded-xl border border-white/10 relative overflow-hidden group print:hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-500">
                     <Award size={60} />
                  </div>
                  <h3 className="font-mono text-[10px] text-primary uppercase mb-4 tracking-widest">// special_notice</h3>
                  <p className="text-xs font-mono leading-relaxed opacity-70">
                    Disponível para novos desafios e arquiteturas complexas. 
                    <br/><br/>
                    Status: <span className="text-primary">Open to Work</span>
                  </p>
               </div>
            </aside>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer lang={lang} />
      </div>
    </div>
  );
};

export default CV;
