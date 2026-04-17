import React, { useState, useEffect } from "react";
import { Menu, X, Terminal as TerminalIcon } from "lucide-react";
import TerminalModal from "./TerminalModal";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "~/", href: "#hero" },
    { name: "about", href: "#about" },
    { name: "stack", href: "#stack" },
    { name: "trabalhos", href: "#trabalhos" },
    { name: "repos", href: "#projects" },
    { name: "contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="container-luxury flex items-center justify-between h-20 md:h-24">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="font-mono text-xl md:text-2xl font-light tracking-wider text-foreground"
          >
            <span className="text-primary">$</span> malobr
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="link-underline font-mono text-sm cursor-pointer text-foreground"
              >
                {link.name}
              </a>
            ))}
            
            {/* Terminal Button */}
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="p-2 text-primary hover:text-white hover:bg-primary/20 rounded-lg transition-all duration-300"
              title="Abrir terminal"
            >
              <TerminalIcon size={20} />
            </button>
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="p-2 text-primary"
            >
              <TerminalIcon size={22} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        navLinks={navLinks}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-display-md font-mono text-foreground hover:text-primary transition-colors duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
