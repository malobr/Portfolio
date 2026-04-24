<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\LiveProject;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // GitHub Repositories
        Project::updateOrCreate(['slug' => 'malobr-profile'], [
            'name' => 'malobr',
            'year' => '2024',
            'language' => 'Markdown',
            'category' => ['pt' => 'Identidade Digital', 'en' => 'Digital Identity'],
            'tagline' => [
                'pt' => 'Engenharia de perfil dinâmico com automação de estatísticas em tempo real.',
                'en' => 'Dynamic profile engineering with real-time stats automation.'
            ],
            'description' => [
                'pt' => 'Um hub centralizado que utiliza GitHub Actions e APIs REST para sintetizar competências técnicas e atividades em um dashboard interativo e visualmente impactante.',
                'en' => 'A centralized hub utilizing GitHub Actions and REST APIs to synthesize technical skills and activities into an interactive and visually impactful dashboard.'
            ],
            'role' => ['pt' => 'Desenvolvedor & Arquiteto', 'en' => 'Developer & Architect'],
            'repo_url' => 'https://github.com/malobr/malobr',
            'technologies' => ['Markdown', 'GitHub Actions', 'Vercel', 'SVG Rendering'],
            'problem' => [
                'pt' => 'Perfis estáticos falham em comunicar a evolução constante de um desenvolvedor, resultando em dados obsoletos e falta de engajamento visual.',
                'en' => 'Static profiles fail to communicate a developer\'s constant evolution, resulting in obsolete data and a lack of visual engagement.'
            ],
            'solution' => [
                'pt' => 'Implementação de workflows automatizados que atualizam métricas de produtividade e stack tecnológica a cada commit, integrando badges dinâmicos e cards sociais customizados.',
                'en' => 'Implementation of automated workflows that update productivity metrics and tech stack with every commit, integrating dynamic badges and custom social cards.'
            ],
            'features' => [
                ['pt' => 'Integração Real-time com Stats do GitHub', 'en' => 'Real-time GitHub Stats Integration'],
                ['pt' => 'Sincronização Automática de Skills', 'en' => 'Automated Skill Matrix Synchronization'],
                ['pt' => 'Geração de Header Social Dinâmico', 'en' => 'Dynamic Social Media Header Generation'],
                ['pt' => 'Visualização Analítica de Produtividade', 'en' => 'Productivity Metric Analytics Visualization']
            ],
        ]);

        Project::updateOrCreate(['slug' => 'catpaws'], [
            'name' => 'CatPaws',
            'year' => '2024',
            'language' => 'Kotlin',
            'category' => ['pt' => 'Desenvolvimento Mobile', 'en' => 'Mobile Development'],
            'tagline' => [
                'pt' => 'Interface mobile imersiva para curadoria e exploração de APIs visuais.',
                'en' => 'Immersive mobile interface for curation and visual API exploration.'
            ],
            'description' => [
                'pt' => 'Aplicativo nativo Android desenvolvido com Jetpack Compose, focado em performance de renderização de imagem, persistência reativa e UX fluída.',
                'en' => 'Native Android application built with Jetpack Compose, focused on image rendering performance, reactive persistence, and fluid UX.'
            ],
            'role' => ['pt' => 'Engenheiro de Software Mobile', 'en' => 'Mobile Software Engineer'],
            'repo_url' => 'https://github.com/malobr/CatPaws',
            'technologies' => ['Kotlin', 'Jetpack Compose', 'MVI Architecture', 'Room DB', 'Coil'],
            'problem' => [
                'pt' => 'Consumo de grandes volumes de mídia em dispositivos móveis costuma causar gargalos de memória e latência de interface.',
                'en' => 'Consuming high volumes of media on mobile devices often causes memory bottlenecks and interface latency.'
            ],
            'solution' => [
                'pt' => 'Utilização de arquitetura baseada em Clean Architecture com processamento assíncrono de imagens e cache multinível via Room e Coil para garantir navegação a 60fps.',
                'en' => 'Utilizing Clean Architecture-based patterns with asynchronous image processing and multi-level caching via Room and Coil to ensure 60fps scrolling.'
            ],
            'features' => [
                ['pt' => 'Camada de Carregamento Assíncrono', 'en' => 'Asynchronous Image Loading Layer'],
                ['pt' => 'Gestão de Favoritos Local (Room)', 'en' => 'Local Favorite Management (Room Persistence)'],
                ['pt' => 'UI Declarativa com Jetpack Compose', 'en' => 'Declarative UI with Jetpack Compose'],
                ['pt' => 'Estratégia Adaptativa de Memória', 'en' => 'Adaptive Memory Management Strategy']
            ],
        ]);

        Project::updateOrCreate(['slug' => 'library-manage'], [
            'name' => 'Library-Manage',
            'year' => '2024',
            'language' => 'PHP',
            'category' => ['pt' => 'Sistemas Distribuídos', 'en' => 'Distributed Systems'],
            'tagline' => [
                'pt' => 'Ecossistema Enterprise para gestão de ativos e automação de fluxos operacionais.',
                'en' => 'Enterprise ecosystem for asset management and operational flow automation.'
            ],
            'description' => [
                'pt' => 'Sistema robusto que integra uma API RESTful escalável em Laravel com um frontend reativo em React, isolado via Docker para consistência ambiental.',
                'en' => 'Robust system integrating a scalable Laravel RESTful API with a reactive React frontend, isolated via Docker for environment consistency.'
            ],
            'role' => ['pt' => 'Desenvolvedor Fullstack Lead', 'en' => 'Lead Fullstack Developer'],
            'repo_url' => 'https://github.com/malobr/Library-Manage',
            'technologies' => ['Laravel 11', 'React 18', 'Docker Compose', 'PostgreSQL', 'Sanctum'],
            'problem' => [
                'pt' => 'Processos manuais de inventário e circulação geram inconsistências de dados e dificultam a tomada de decisão em tempo real.',
                'en' => 'Manual inventory and circulation processes generate data inconsistencies and hinder real-time decision making.'
            ],
            'solution' => [
                'pt' => 'Desenvolvimento de uma plataforma centralizada com controle de acesso granular (RBAC), validação automatizada de disponibilidade e dashboards analíticos.',
                'en' => 'Development of a centralized platform with granular access control (RBAC), automated availability validation, and analytical dashboards.'
            ],
            'features' => [
                ['pt' => 'Autenticação Stateful Secura', 'en' => 'Stateful Authentication (Sanctum)'],
                ['pt' => 'Conciliação de Inventário Automatizada', 'en' => 'Automated Inventory Reconciliation'],
                ['pt' => 'Cálculos de Disponibilidade Real-time', 'en' => 'Real-time Availability Calculations'],
                ['pt' => 'Deploy em Infraestrutura Containerizada', 'en' => 'Containerized Infrastructure Deployment']
            ],
        ]);

        // Live Projects
        LiveProject::updateOrCreate(['slug' => 'lar-bom-caminho'], [
            'name' => 'Lar Bom Caminho',
            'client' => 'Lar o Bom Caminho — ONG',
            'tagline' => [
                'pt' => 'Transformação digital para uma instituição filantrópica com 50 anos de história.',
                'en' => 'Digital transformation for a philanthropic institution with 50 years of history.'
            ],
            'description' => [
                'pt' => 'Uma plataforma institucional de alta fidelidade e ecossistema de gestão desenhada para amplificar o impacto social, modernizar a transparência financeira e engajar novos doadores. O diferencial tecnológico reside na implementação de um sistema de gerenciamento de conteúdo (CMS) proprietário com um editor WYSIWYG (What You See Is What You Get) avançado, permitindo que a equipe da ONG publique notícias, relatórios de transparência e histórias de impacto com total autonomia, mantendo a integridade visual e a performance da plataforma.',
                'en' => 'A high-fidelity institutional platform and management ecosystem designed to amplify social impact, modernize financial transparency, and engage new donors. The technical edge lies in the implementation of a proprietary Content Management System (CMS) with an advanced WYSIWYG editor, allowing the NGO staff to publish news, transparency reports, and impact stories with full autonomy, while maintaining the platform\'s visual integrity and performance.'
            ],
            'year' => '2025',
            'role' => ['pt' => 'Arquiteto de Soluções & Engenheiro Fullstack', 'en' => 'Solutions Architect & Fullstack Engineer'],
            'category' => ['pt' => 'Social & Institutional CMS', 'en' => 'Social & Institutional CMS'],
            'live_url' => 'https://larobomcaminho.org/',
            'technologies' => ['Laravel Ecosystem', 'Blade UI', 'TailwindCSS 4', 'MySQL', 'WYSIWYG Integration'],
            'problem' => [
                'pt' => 'A ausência de uma presença digital moderna e a dificuldade técnica de manter o site atualizado impediam a comunicação da seriedade do trabalho e a captação recorrente de recursos. A ONG dependia de desenvolvedores para qualquer alteração mínima de conteúdo.',
                'en' => 'The lack of a modern digital presence and the technical difficulty of keeping the site updated hindered the communication of their work\'s seriousness and recurring resource attraction. The NGO relied on developers for even minimal content changes.'
            ],
            'solution' => [
                'pt' => 'Criação de uma experiência web "Premium UX" integrada a um backoffice robusto. Desenvolvi um motor de edição WYSIWYG customizado que processa HTML sanitizado nativamente, garantindo que usuários leigos possam criar layouts ricos de notícias sem quebrar o design. Isso democratizou a produção de conteúdo interno, permitindo que a história da instituição seja contada em tempo real por quem a vive.',
                'en' => 'Creating a "Premium UX" web experience integrated with a robust backoffice. I developed a custom WYSIWYG editing engine that processes sanitized HTML natively, ensuring lay users can create rich news layouts without breaking the design. This democratized internal content production, allowing the institution\'s story to be told in real-time by those who live it.'
            ],
            'features' => [
                ['pt' => 'Narrativa Visual Impactante', 'en' => 'Mission-First Visual Storytelling'],
                ['pt' => 'Dashboard de Transparência Financeira', 'en' => 'Financial Transparency Dashboard'],
                ['pt' => 'Funil de Doação Otimizado', 'en' => 'Conversion-Focused Donation Funnel'],
                ['pt' => 'Navegação Histórica Dinâmica', 'en' => 'Dynamic History Timeline Navigation']
            ],
            'results' => [
                ['metric' => '52+', 'label' => ['pt' => 'Anos de Impacto', 'en' => 'Years of Impact']],
                ['metric' => '200+', 'label' => ['pt' => 'Famílias Apoiadas', 'en' => 'Families Supported']],
                ['metric' => '100%', 'label' => ['pt' => 'Transparência Digital', 'en' => 'Digital Transparency']],
            ],
        ]);

        LiveProject::updateOrCreate(['slug' => 'formly'], [
            'name' => 'Formly',
            'client' => 'Formly — SaaS Ecosystem',
            'tagline' => [
                'pt' => 'Ecossistema SaaS unificado para automação de fluxos de documentos e coleta de dados.',
                'en' => 'Unified SaaS ecosystem for document flow automation and data collection.'
            ],
            'description' => [
                'pt' => 'Uma suíte modular de produtividade empresarial que combina ferramentas de formulários dinâmicos, contratos digitais e estúdio de mídia em uma única interface coerente.',
                'en' => 'A modular business productivity suite combining dynamic forms, digital contracts, and media studio tools into a single coherent interface.'
            ],
            'year' => '2025',
            'role' => ['pt' => 'Fundador & CTO', 'en' => 'Founder & CTO'],
            'category' => ['pt' => 'SaaS / B2B Product', 'en' => 'SaaS / B2B Product'],
            'live_url' => 'https://formly.net.br/',
            'technologies' => ['Laravel', 'React', 'TypeScript', 'WebAssembly', 'Node.js'],
            'problem' => [
                'pt' => 'Pequenas e médias empresas sofrem com a fragmentação de ferramentas, elevando custos e complicando fluxos de trabalho simples.',
                'en' => 'SMEs suffer from tool fragmentation, increasing costs and complicating simple workflows.'
            ],
            'solution' => [
                'pt' => 'Desenvolvimento de uma arquitetura "All-in-One" processada localmente via WebAssembly, garantindo privacidade máxima e custo de infraestrutura otimizado.',
                'en' => 'Development of an "All-in-One" architecture processed locally via WebAssembly, ensuring maximum privacy and optimized infrastructure cost.'
            ],
            'features' => [
                ['pt' => 'Motor de Formulários Dinâmicos', 'en' => 'Dynamic Form Weaver Engine'],
                ['pt' => 'Assinatura Digital Legalizada', 'en' => 'E-Signature Legal Framework'],
                ['pt' => 'Processamento de Áudio in-Browser', 'en' => 'Browser-Side Audio Processing'],
                ['pt' => 'Analytics de Workspace Unificado', 'en' => 'Unified Workspace Analytics']
            ],
            'results' => [
                ['metric' => '4', 'label' => ['pt' => 'Produtos Modulares', 'en' => 'Modular Products']],
                ['metric' => '< 50ms', 'label' => ['pt' => 'Latência de Processamento', 'en' => 'Processing Latency']],
            ],
        ]);

        LiveProject::updateOrCreate(['slug' => 'caminho-da-vida'], [
            'name' => 'Caminho da Vida',
            'client' => 'Comunidade Cristã Caminho da Vida',
            'tagline' => [
                'pt' => 'Solução integrada de gestão e digitalização para comunidades de fé.',
                'en' => 'Integrated management and digitalization solution for faith communities.'
            ],
            'description' => [
                'pt' => 'Plataforma que centraliza a comunicação institucional, gestão de eventos e fluxos de contribuição em um ambiente digital esteticamente refinado e acessível.',
                'en' => 'Platform centralizing institutional communication, event management, and contribution flows in an aesthetically refined and accessible digital environment.'
            ],
            'year' => '2024',
            'role' => ['pt' => 'Arquiteto Fullstack Lead', 'en' => 'Lead Fullstack Architect'],
            'category' => ['pt' => 'Management Platform', 'en' => 'Management Platform'],
            'live_url' => 'https://mediumaquamarine-gaur-323782.hostingersite.com/',
            'technologies' => ['Laravel', 'Custom Blade Components', 'TailwindCSS', 'MySQL'],
            'problem' => [
                'pt' => 'Instituições tradicionais costumam ter dificuldades em manter uma comunicação ágil e organizada com seus membros no ambiente digital.',
                'en' => 'Traditional institutions often struggle to maintain agile and organized communication with their members in the digital environment.'
            ],
            'solution' => [
                'pt' => 'Implementação de uma agenda ministerial dinâmica, sistema de notícias "feed-first" e dashboard de Giving estilizado para máxima conversão e engajamento.',
                'en' => 'Implementation of a dynamic ministry agenda, "feed-first" news system, and styled Giving dashboard for maximum conversion and engagement.'
            ],
            'features' => [
                ['pt' => 'Agendamento Ministerial Dinâmico', 'en' => 'Dynamic Ministry Scheduler'],
                ['pt' => 'Interface de Doação Premium', 'en' => 'Premium Giving Interface'],
                ['pt' => 'Arquivamento Inteligente de Notícias', 'en' => 'Smart News Archiving'],
                ['pt' => 'Acesso Mobile-First', 'en' => 'Mobile-First Community Access']
            ],
            'results' => [
                ['metric' => '24/7', 'label' => ['pt' => 'Disponibilidade Ativa', 'en' => 'Active Availability']],
                ['metric' => '100%', 'label' => ['pt' => 'Canais Digitalizados', 'en' => 'Digitized Channels']],
            ],
        ]);
    }
}
