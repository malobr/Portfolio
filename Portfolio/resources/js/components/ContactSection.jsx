import React, { useState } from "react";
import { ArrowUpRight, Mail, Github, Instagram, MapPin } from "lucide-react";
import { translations } from "../constants/translations";
import ContactModal from "./ContactModal";

const ContactSection = ({ lang }) => {
  const t = translations[lang] || translations.pt;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contato@marcelocavalheiro.com",
      action: () => setIsModalOpen(true),
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/malobr",
      href: "https://github.com/malobr",
    },
    {
      icon: MapPin,
      label: lang === 'en' ? 'Location' : "Localização",
      value: lang === 'en' ? 'Brazil' : "Brasil 🇧🇷",
      href: "#",
    },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/malobr", icon: Github },
    { name: "Instagram", href: "https://www.instagram.com/malo_t_c/", icon: Instagram },
  ];

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <p className="text-label mb-6 font-mono">// {t.contact.toLowerCase()}</p>
            <h2 className="text-display-lg text-foreground mb-8">
              {t.contact_title.split(' ').slice(0, -1).join(' ')}
              <span className="text-primary italic"> {t.contact_title.split(' ').slice(-1)}</span>
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-lg mb-12">
              {t.contact_desc}
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  onClick={item.action || (() => window.open(item.href, '_blank'))}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 border border-border flex items-center justify-center
                                  transition-all duration-300 group-hover:border-primary group-hover:bg-primary/5">
                    <item.icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-label text-xs font-mono">{item.label}</p>
                    <p className="text-body-lg text-foreground font-mono">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between">
            {/* CTA */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="block bg-secondary p-8 md:p-12 relative group cursor-pointer
                         transition-all duration-500 hover:bg-primary/10 border border-border"
            >
              <div className="flex items-start justify-between mb-8">
                <h3 className="text-display-md text-foreground font-mono">
                  {lang === 'en' ? './new-project.sh' : './novo-projeto.sh'}
                </h3>
                <div className="w-12 h-12 border border-foreground/30 flex items-center justify-center
                                transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                  <ArrowUpRight size={20} />
                </div>
              </div>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {lang === 'en' ? 'Have an idea, MVP or system to build? Let\'s architect together — from schema to deploy.' : 'Tem uma ideia, MVP ou sistema pra construir? Vamos arquitetar juntos — do schema ao deploy.'}
                </p>
            </div>

            {/* Social Links */}
            <div className="mt-12 lg:mt-0">
              <p className="text-label mb-6 font-mono">// {lang === 'en' ? 'Socials' : 'Redes'}</p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury text-xs px-6 py-3 inline-flex items-center gap-2"
                  >
                    <link.icon size={14} />
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        lang={lang} 
      />
    </section>
  );
};

export default ContactSection;
