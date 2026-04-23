import React, { useState, useEffect } from "react";
import { Menu, X, Terminal as TerminalIcon } from "lucide-react";
import TerminalModal from "./TerminalModal";
import { translations } from "../constants/translations";

const Navigation = ({ 
    forceTerminalOpen, 
    onTerminalClose, 
    forceCalendarOpen, 
    onCalendarClose, 
    lang,
    setLang
}) => {
  const t = translations[lang] || translations.pt;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [userFolders, setUserFolders] = useState([]);

  useEffect(() => {
    if (forceTerminalOpen !== undefined) setIsTerminalOpen(forceTerminalOpen);
  }, [forceTerminalOpen]);

  const handleTerminalClose = () => {
    setIsTerminalOpen(false);
    if (onTerminalClose) onTerminalClose();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const loadUserFolders = () => {
      const folders = JSON.parse(localStorage.getItem("user_folders") || "[]");
      setUserFolders(folders);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("userFoldersUpdated", loadUserFolders);
    loadUserFolders();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("userFoldersUpdated", loadUserFolders);
    };
  }, []);

  const navLinks = [
    { name: "~/", href: "#hero" },
    { name: t.about, href: "#about" },
    { name: t.stack, href: "#stack" },
    { name: t.works, href: "#trabalhos" },
    { name: t.repos, href: "#projects" },
    { name: lang === 'en' ? 'Blog' : 'Artigos', href: "#blog" },
    { name: t.contact, href: "#contact" },
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
            <div className="flex items-center gap-6">
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
            </div>

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

                {/* Custom User Folders */}
                {userFolders.map((folder) => (
                <span
                    key={folder}
                    className="font-mono text-sm text-primary/60 hover:text-primary transition-colors cursor-help animate-fade-in"
                    title={lang === 'pt' ? "Diretório criado via terminal" : "Directory created via terminal"}
                >
                    usr/{folder}
                </span>
                ))}
                
                <div className="flex items-center gap-4 ml-4">
                    {/* Language Selector */}
                    <div className="flex bg-white/5 rounded-lg overflow-hidden border border-border/50 mr-2">
                        {['pt', 'en'].map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-2 py-1 text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => setIsTerminalOpen(true)}
                        className="p-2 text-primary hover:text-white hover:bg-primary/20 rounded-lg transition-all"
                    >
                        <TerminalIcon size={18} />
                    </button>
                </div>
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
        onClose={handleTerminalClose} 
        navLinks={navLinks}
        lang={lang}
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
          {userFolders.map((folder) => (
            <span
              key={folder}
              className="text-display-sm font-mono text-primary/40"
            >
              usr/{folder}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
