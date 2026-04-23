import { translations } from "../constants/translations";
import heroImage from "../assets/hero-image.png";
import cohibaImage from "../assets/cohiba-ashtray.png";
import { motion } from "framer-motion";

const HeroSection = ({ lang }) => {
  const t = translations[lang] || translations.pt;
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </div>

      {/* Cohiba Ashtray Background Asset */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-0 right-0 w-[400px] md:w-[600px] pointer-events-none z-0"
        style={{
           maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
           WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
           maskComposite: 'intersect',
           WebkitMaskComposite: 'source-in'
        }}
      >
        <img 
          src={cohibaImage} 
          alt="Luxury Cohiba Ashtray" 
          className="w-full h-auto grayscale-[40%] contrast-125 brightness-75"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container-luxury h-full flex flex-col justify-end pb-20 md:pb-32">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
        style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
      >
        <span className="text-label text-xs font-mono">{t.scroll}</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
