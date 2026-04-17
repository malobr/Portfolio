export const liveProjects = [
  {
    slug: "lar-bom-caminho",
    name: "Lar Bom Caminho",
    client: "Lar o Bom Caminho — ONG",
    tagline:
      "Site institucional para ONG filantrópica que acolhe crianças desde 1972",
    description:
      "Plataforma institucional completa para uma instituição filantrópica de mais de 50 anos. Conta a história da ONG, apresenta serviços, transparência financeira e canais de doação.",
    year: "2025",
    role: "Fullstack Developer",
    category: "Site Institucional",
    liveUrl: "https://larobomcaminho.org/",
    technologies: [
      "Laravel",
      "Blade",
      "TailwindCSS",
      "JavaScript",
      "MySQL",
      "Vite",
    ],
    problem:
      "A ONG tinha uma presença digital limitada que não comunicava sua história de 50+ anos, dificultava o processo de doação e não dava transparência sobre o uso dos recursos — pontos críticos para captar apoiadores recorrentes.",
    solution:
      "Construí um site institucional moderno em Laravel + Blade, com narrativa visual emotiva, seções claras de 'Quem Somos', 'O Que Fazemos', 'Transparência' e 'Como Ajudar', além de um fluxo direto de doação. Tudo responsivo e otimizado para SEO.",
    features: [
      "Hero impactante com história e estatísticas (52+ anos, 200+ crianças)",
      "Página dedicada de transparência financeira",
      "Fluxo de doação 'Doe Agora' otimizado para conversão",
      "Área administrativa para gestão de conteúdo",
      "100% responsivo e acessível",
      "SEO otimizado para captação orgânica",
    ],
    results: [
      { metric: "52+", label: "Anos de história contados" },
      { metric: "200+", label: "Crianças representadas" },
      { metric: "24h", label: "Atendimento divulgado" },
    ],
  },
  {
    slug: "formly",
    name: "Formly",
    client: "Formly — SaaS próprio",
    tagline:
      "Ecossistema SaaS para formulários dinâmicos, contratos digitais e conversão de mídias",
    description:
      "Plataforma completa que reúne 4 produtos em um só: Form Weaver (editor visual de formulários), Legal Suite (contratos com assinatura digital), QuickConvert (conversor de mídias) e AudioStudio (tratamento de áudio com WebAssembly). Tudo no navegador, com foco em produtividade e privacidade.",
    year: "2025",
    role: "Founder & Fullstack Developer",
    category: "SaaS / Produto",
    liveUrl: "https://formly.net.br/",
    technologies: [
      "Laravel",
      "TypeScript",
      "TailwindCSS",
      "WebAssembly",
      "FFmpeg",
      "PostgreSQL",
      "Docker",
      "Stripe",
    ],
    problem:
      "Equipes precisam de várias ferramentas separadas para criar formulários, gerar contratos com assinatura jurídica e manipular mídias — pagando assinaturas múltiplas e enviando arquivos sensíveis para nuvens de terceiros.",
    solution:
      "Construí um ecossistema SaaS unificado com 4 módulos integrados. Processamento local via WebAssembly garante privacidade (mídias não saem do navegador), enquanto a stack Laravel + TypeScript entrega editor drag-and-drop, lógica condicional, contratos com variáveis dinâmicas e assinatura digital com validade jurídica.",
    features: [
      "Form Weaver: editor drag-and-drop com 18+ tipos de campos e lógica condicional",
      "Legal Suite: contratos dinâmicos com assinatura digital e PDF criptografado",
      "QuickConvert: conversão de imagens, PDFs e remoção de fundo via I.A. local",
      "AudioStudio: tratamento de áudio no navegador com WebAssembly + FFmpeg",
      "Análise em tempo real e temas customizados",
      "Processamento local — privacidade garantida (sem upload pra nuvem)",
      "Planos pagos integrados via Stripe",
    ],
    results: [
      { metric: "4", label: "Produtos integrados" },
      { metric: "18+", label: "Tipos de campo no builder" },
      { metric: "100%", label: "Processamento local de mídia" },
    ],
  },
  {
    slug: "caminho-da-vida",
    name: "Caminho da Vida",
    client: "Comunidade Cristã Caminho da Vida",
    tagline: "Plataforma de gestão e comunicação para comunidade cristã",
    description: "Sistema completo que integra divulgação de eventos, programas de batismo, gestão de dízimos e ofertas e agenda de cultos. Focado em acessibilidade e facilidade de manutenção pela equipe da igreja.",
    year: "2024",
    role: "Fullstack Developer",
    category: "Site Institucional / Gestão",
    liveUrl: "https://mediumaquamarine-gaur-323782.hostingersite.com/",
    technologies: ["Laravel", "Blade", "TailwindCSS", "MySQL", "PHP"],
    problem: "A igreja necessitava de um canal centralizado para divulgar sua programação e facilitar a contribuição financeira da comunidade de forma digital, segura e visualmente atraente.",
    solution: "Desenvolvimento de uma plataforma robusta integrando seções dinâmicas de agenda, blog de notícias, formulários de contato e um módulo refinado de 'Dízimos & Ofertas' com design premium.",
    features: [
      "Agenda de cultos e eventos de fácil atualização",
      "Módulo de Dízimos & Ofertas com estética gold/premium",
      "Página dedicada para programas de Batismo",
      "Seção de notícias e avisos da comunidade",
      "Integração com mapas e canais de contato direto",
    ],
    results: [
      { metric: "100%", label: "Digitalização da agenda" },
      { metric: "Gold", label: "Estética refinada nas ofertas" },
      { metric: "24/7", label: "Disponibilidade de avisos" },
    ],
  },
];

export const getLiveProjectBySlug = (slug) =>
  liveProjects.find((p) => p.slug === slug);

export const getNextLiveProject = (slug) => {
  const idx = liveProjects.findIndex((p) => p.slug === slug);
  return liveProjects[(idx + 1) % liveProjects.length];
};
