import React from "react";
import { translations } from "../constants/translations";
import heroImage from "../assets/hero-php-mug.png";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = ({ lang }) => {
  const t = translations[lang] || translations.pt;
  const { scrollY } = useScroll();
  
  // Classic scroll parallax: background moves slower than scroll
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 h-[120vh]" // Extra height for parallax movement
      >
        <img
          src={heroImage}
          alt="Developer workspace with PHP mug"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </motion.div>

      {/* Animated Steam Overlay (Over the mug area in the background image) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute left-[45%] top-[40%] w-[150px] h-[300px]">
           {[...Array(5)].map((_, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
               animate={{ 
                 opacity: [0, 0.4, 0], 
                 y: -200, 
                 x: [0, (i % 2 === 0 ? 30 : -30), 0],
                 scale: [0.5, 1.5, 2] 
               }}
               transition={{ 
                 duration: 4 + i, 
                 repeat: Infinity, 
                 delay: i * 0.8,
                 ease: "easeOut"
               }}
               className="absolute bg-white/20 blur-xl rounded-full"
               style={{ 
                 width: 40 + (i * 10), 
                 height: 40 + (i * 10),
                 filter: "blur(20px)" 
               }}
             />
           ))}
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 container-luxury h-full flex flex-col justify-end pb-20 md:pb-32">
        <div className="max-w-4xl">
          <p
            className="text-label mb-4 md:mb-6 opacity-0 animate-fade-up font-mono"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <span className="text-primary">$</span> {t.hero_whoami}
          </p>
          <h1
            className="text-display-xl text-foreground mb-6 md:mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            {t.hero_build}
            <br />
            <span className="text-primary italic">software</span>
            <br />
            {t.hero_deploy}
          </h1>
          <p
            className="text-body-lg text-muted-foreground max-w-xl mb-8 md:mb-12 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            {t.hero_desc}
          </p>
          <button
            onClick={scrollToProjects}
            className="btn-luxury opacity-0 animate-fade-up"
            style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
          >
            {t.hero_btn}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in z-30"
        style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
      >
        <span className="text-label text-xs font-mono">{t.scroll}</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
