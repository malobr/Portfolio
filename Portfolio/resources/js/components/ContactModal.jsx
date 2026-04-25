import React, { useState } from "react";
import { X, Send, CheckCircle, Loader2, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ContactModal = ({ isOpen, onClose, lang }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const response = await fetch("/api/contact/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRF-TOKEN": csrfToken
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setStatus("success");
            setTimeout(() => {
                onClose();
                setStatus("idle");
                setFormData({ name: "", email: "", subject: "", message: "" });
            }, 3000);
        } else {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    } catch (error) {
        console.error("Contact error:", error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const t = {
    pt: {
        title: "Iniciar Projeto",
        subtitle: "Envie uma mensagem direta para minha inbox.",
        name: "Seu Nome",
        email: "Seu Email",
        subject: "Assunto / Titulo",
        message: "Sua mensagem...",
        send: "Enviar Mensagem",
        sending: "Enviando...",
        success: "Mensagem Enviada!",
        success_info: "Obrigado! Entrarei em contato em breve."
    },
    en: {
        title: "Start a Project",
        subtitle: "Send a direct message to my inbox.",
        name: "Your Name",
        email: "Your Email",
        subject: "Subject / Title",
        message: "Your message...",
        send: "Send Message",
        sending: "Sending...",
        success: "Message Sent!",
        success_info: "Thank you! I will get back to you soon."
    }
  }[lang] || {pt: {}};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-charcoal border border-white/10 rounded-2xl shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                        <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold font-mono tracking-tight">{t.title}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{t.subtitle}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="p-8">
                {status === "success" ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                        <CheckCircle size={64} className="text-green-500 mb-6" />
                        <h4 className="text-2xl font-bold mb-2">{t.success}</h4>
                        <p className="text-muted-foreground">{t.success_info}</p>
                    </div>
                ) : status === "error" ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                        <X size={64} className="text-red-500 mb-6" />
                        <h4 className="text-2xl font-bold mb-2">Erro ao enviar</h4>
                        <p className="text-muted-foreground">Ocorreu um problema técnico. Tente novamente mais tarde.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono ml-1">{t.name}</label>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="Ex: Marcelo"
                                    className="w-full bg-background/50 border border-white/5 focus:border-primary/50 rounded-xl px-4 py-3 outline-none transition-all font-mono text-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono ml-1">{t.email}</label>
                                <input 
                                    required
                                    type="email" 
                                    placeholder="Ex: marcelo@email.com"
                                    className="w-full bg-background/50 border border-white/5 focus:border-primary/50 rounded-xl px-4 py-3 outline-none transition-all font-mono text-sm"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono ml-1">{t.subject}</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Assunto do projeto"
                                className="w-full bg-background/50 border border-white/5 focus:border-primary/50 rounded-xl px-4 py-3 outline-none transition-all font-mono text-sm"
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono ml-1">{t.message}</label>
                            <textarea 
                                required
                                rows={4}
                                placeholder="Descreva brevemente sua ideia..."
                                className="w-full bg-background/50 border border-white/5 focus:border-primary/50 rounded-xl px-4 py-3 outline-none transition-all font-mono text-sm resize-none"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                            />
                        </div>

                        <button 
                            disabled={status === "sending"}
                            type="submit" 
                            className="w-full btn-luxury py-4 bg-primary text-white font-mono flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {status === "sending" ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    {t.sending}
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    {t.send}
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>

            {/* Decoration */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
