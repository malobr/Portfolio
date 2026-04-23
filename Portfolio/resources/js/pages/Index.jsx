import React from 'react';
import { motion } from 'framer-motion';
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import StackSection from "../components/StackSection";
import LiveProjectsSection from "../components/LiveProjectsSection";
import ProjectsSection from "../components/ProjectsSection";
import BlogSection from "../components/BlogSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Index = () => {
  const [lang, setLang] = React.useState('pt');

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navigation lang={lang} setLang={setLang} />
      <main>
        <HeroSection lang={lang} />
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVariants}>
          <AboutSection lang={lang} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVariants}>
          <StackSection lang={lang} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVariants}>
          <LiveProjectsSection lang={lang} />
        </motion.div>

        <ProjectsSection lang={lang} />

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVariants}>
          <BlogSection lang={lang} />
        </motion.div>

        <ContactSection lang={lang} />
        <Footer lang={lang} />
      </main>
    </div>
  );
};

export default Index;

