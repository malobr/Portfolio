import React from "react";
import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Terminal as TerminalIcon, Settings } from "lucide-react";
import { translations } from "../constants/translations";

const Footer = ({ lang }) => {
  const t = translations[lang] || translations.pt;
  const scrollToSection = (e, href) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: t.about.toLowerCase(), href: "#about" },
    { name: t.stack.toLowerCase(), href: "#stack" },
    { name: t.works.toLowerCase(), href: "#trabalhos" },
    { name: t.repos.toLowerCase(), href: "#projects" },
  ];

  return (
    <footer className="py-24 bg-background border-t border-border mt-20">
      <div className="container-luxury">
        {/* Sitemap / Index */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "#hero")}
              className="font-mono text-2xl font-light tracking-widest text-foreground block mb-6"
            >
              <span className="text-primary">$</span> malobr
            </a>
            <p className="text-body-sm text-muted-foreground font-mono leading-relaxed">
                {lang === 'en' ? 'Fullstack Developer focused on clean architecture and scalable infrastructure.' : 'Fullstack Developer focado em arquitetura limpa e infraestrutura escalável.'}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-6">// sitemap</h4>
            <ul className="space-y-4 font-mono text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ~/ {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-6">// terminal</h4>
            <div className="p-4 bg-charcoal/40 border border-border rounded-lg border-l-2 border-l-primary">
              <p className="text-xs font-mono text-muted-foreground mb-3 flex items-center gap-2">
                <TerminalIcon size={12} className="text-primary" /> 
                {lang === 'en' ? 'Terminal Navigation' : 'Navegação via Terminal'}
              </p>
              <p className="text-xs font-mono text-foreground leading-relaxed">
                {lang === 'en' ? 'Use cd [section] to navigate quickly. Open the console at the top of the page.' : 'Use cd [seção] para navegar com agilidade. Abra o console no topo da página.'}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-6">// connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/malobr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full text-muted-foreground hover:text-primary transition-all border border-border/10"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.instagram.com/malo_t_c/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full text-muted-foreground hover:text-primary transition-all border border-border/10"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/marcelo-tomás-a92b16231"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full text-muted-foreground hover:text-primary transition-all border border-border/10"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted-foreground">
            © {new Date().getFullYear()} Marcelo · Built with React 19 + Vite 8
          </p>
          <div className="flex gap-8 text-[10px] font-mono text-muted-foreground uppercase tracking-widest items-center">
            <Link to="/admin" className="hover:text-primary transition-colors flex items-center gap-2 group">
              <Settings size={10} className="group-hover:rotate-90 transition-transform duration-500" />
              cd /admin
            </Link>
            <span className="opacity-20">|</span>
            <span>{lang === 'en' ? 'Brazil' : 'Brasil 🇧🇷'}</span>
            <span>Est. 2020</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
