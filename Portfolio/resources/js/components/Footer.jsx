import React from "react";
import { Github, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-charcoal border-t border-border">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="#hero"
            className="font-mono text-2xl font-light tracking-widest text-foreground"
          >
            <span className="text-primary">$</span> malobr
          </a>

          <p className="text-body-sm text-muted-foreground text-center md:text-left font-mono">
            © {new Date().getFullYear()} Marcelo · built with React + Vite · deployed with ❤
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/malobr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <span className="sr-only">GitHub</span>
              <Github size={18} />
            </a>
            <a
              href="https://www.instagram.com/malo_t_c/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <span className="sr-only">Instagram</span>
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
