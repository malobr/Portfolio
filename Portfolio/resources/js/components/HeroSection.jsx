import React from "react";
import heroImage from "../assets/hero-image.png";

const HeroSection = () => {
  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Developer workspace"
          className="w-full h-full object-cover object-center animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury h-full flex flex-col justify-end pb-20 md:pb-32">
        <div className="max-w-4xl">
          <p
            className="text-label mb-4 md:mb-6 opacity-0 animate-fade-up font-mono"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <span className="text-primary">$</span> whoami — Fullstack Developer
          </p>
          <h1
            className="text-display-xl text-foreground mb-6 md:mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            Construindo
            <br />
            <span className="text-primary italic">software</span>
            <br />
            do back ao deploy.
          </h1>
          <p
            className="text-body-lg text-muted-foreground max-w-xl mb-8 md:mb-12 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            Marcelo (malobr) — dev fullstack focado em arquitetura limpa,
            APIs robustas, Docker e deploys que simplesmente funcionam.
          </p>
          <button
            onClick={scrollToProjects}
            className="btn-luxury opacity-0 animate-fade-up"
            style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
          >
            Ver Repositórios
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
        style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
      >
        <span className="text-label text-xs font-mono">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
