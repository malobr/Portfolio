import React from "react";
import { Github, Instagram, Terminal as TerminalIcon } from "lucide-react";

const Footer = () => {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-24 bg-[#110e1a] border-t border-white/5">
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
              Fullstack Developer focado em arquitetura limpa e infraestrutura escalável.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-6">// sitemap</h4>
            <ul className="space-y-4 font-mono text-sm">
              {[
                { name: "about", href: "#about" },
                { name: "stack", href: "#stack" },
                { name: "trabalhos", href: "#trabalhos" },
                { name: "repositórios", href: "#projects" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    ~/ {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-6">// terminal</h4>
            <div className="p-4 bg-black/40 border border-white/5 rounded-lg border-l-2 border-l-primary">
              <p className="text-xs font-mono text-muted-foreground mb-3 flex items-center gap-2">
                <TerminalIcon size={12} className="text-primary" /> 
                Terminal Navigation
              </p>
              <p className="text-xs font-mono text-foreground leading-relaxed">
                Use <code className="text-primary">cd [seção]</code> para navegar com agilidade. 
                Abra o console no topo da página.
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
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-muted-foreground hover:text-primary transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.instagram.com/malo_t_c/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-muted-foreground hover:text-primary transition-all"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted-foreground">
            © {new Date().getFullYear()} Marcelo · Built with React 19 + Vite 8
          </p>
          <div className="flex gap-8 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <span>Brazil 🇧🇷</span>
            <span>Est. 2020</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
