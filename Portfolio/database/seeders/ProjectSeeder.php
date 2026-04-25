<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\LiveProject;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // Limpar dados para garantir a ordem e visibilidade exclusivas conforme solicitado
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Project::truncate();
        LiveProject::truncate();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 1. malobr
        Project::create([
            'slug' => 'malobr',
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
            'is_visible' => true,
        ]);

        // 2. CatPaws
        Project::create([
            'slug' => 'catpaws',
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
            'is_visible' => true,
        ]);

        // 3. Library-Manage
        Project::create([
            'slug' => 'library-manage',
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
            'is_visible' => true,
        ]);

        // 4. Chapeu-Seletor-De-Hogwarts
        Project::create([
            'slug' => 'chapeu-seletor',
            'name' => 'Chapeu-Seletor-De-Hogwarts',
            'year' => '2024',
            'language' => 'PHP',
            'category' => ['pt' => 'Algoritmos & Gamificação', 'en' => 'Algorithms & Gamification'],
            'tagline' => [
                'pt' => 'Experiência interativa de classificação inspirada no universo Harry Potter.',
                'en' => 'Interactive sorting experience inspired by the Harry Potter universe.'
            ],
            'description' => [
                'pt' => 'Aplicação PHP pura que utiliza lógica de pontuação ponderada para classificar usuários em uma das quatro casas de Hogwarts baseado em algoritmos de decisão comportamental.',
                'en' => 'Pure PHP application utilizing weighted scoring logic to classify users into one of the four Hogwarts houses based on behavioral decision algorithms.'
            ],
            'role' => ['pt' => 'Desenvolvedor Backend', 'en' => 'Backend Developer'],
            'repo_url' => 'https://github.com/malobr/Chapeu-Seletor-De-Hogwarts',
            'technologies' => ['PHP', 'HTML5', 'CSS3', 'Logic Algorithms'],
            'problem' => [
                'pt' => 'Classificar perfis de forma binária falha em capturar a complexidade de traços de personality em sistemas de quiz.',
                'en' => 'Binary classification of profiles fails to capture the complexity of personality traits in quiz systems.'
            ],
            'solution' => [
                'pt' => 'Desenvolvimento de uma matriz de pesos onde cada resposta influencia dinamicamente o score de múltiplas categorias, resultando em uma classificação precisa e divertida.',
                'en' => 'Development of a weight matrix where every answer dynamically influences the score of multiple categories, resulting in an accurate and fun classification.'
            ],
            'features' => [
                ['pt' => 'Lógica de Pontuação Ponderada', 'en' => 'Weighted Scoring Logic'],
                ['pt' => 'Interface Temática Imersiva', 'en' => 'Immersive Themed Interface'],
                ['pt' => 'Processamento de Dados Server-side', 'en' => 'Server-side Data Processing'],
                ['pt' => 'Resultados Dinâmicos por Perfil', 'en' => 'Dynamic Results per Profile']
            ],
            'is_visible' => true,
        ]);

        // 5. Permission-Laravel
        Project::create([
            'slug' => 'permission-laravel',
            'name' => 'Permission-Laravel',
            'year' => '2024',
            'language' => 'Blade',
            'category' => ['pt' => 'Arquitetura de Segurança', 'en' => 'Security Architecture'],
            'tagline' => [
                'pt' => 'Sistema FullStack de gestão de permissões e controle de acesso robusto.',
                'en' => 'FullStack permission management and robust access control system.'
            ],
            'description' => [
                'pt' => 'Desenvolvido com Laravel 11 e Dockerizado, este projeto foca na implementação de RBAC (Role-Based Access Control) complexo, garantindo que cada endpoint e componente de UI respeite as políticas de autorização do sistema.',
                'en' => 'Built with Laravel 11 and Dockerized, this project focuses on complex RBAC (Role-Based Access Control) implementation, ensuring every endpoint and UI component respects system authorization policies.'
            ],
            'role' => ['pt' => 'Desenvolvedor Backend Lead', 'en' => 'Lead Backend Developer'],
            'repo_url' => 'https://github.com/malobr/Permission-Laravel',
            'technologies' => ['Laravel 11', 'Blade', 'Docker', 'MySQL', 'RBAC'],
            'problem' => [
                'pt' => 'Gestão de acessos em aplicações enterprise costuma ser negligenciada, gerando falhas de segurança e exposição de dados sensíveis.',
                'en' => 'Access management in enterprise applications is often neglected, leading to security flaws and sensitive data exposure.'
            ],
            'solution' => [
                'pt' => 'Implementação de uma camada de autenticação stateful com middlewares de autorização customizados e uma interface administrativa para gestão dinâmica de papéis.',
                'en' => 'Implementation of a stateful authentication layer with custom authorization middlewares and an administrative interface for dynamic role management.'
            ],
            'features' => [
                ['pt' => 'Gestão de Papéis e Permissões (Dynamic)', 'en' => 'Dynamic Role & Permission Management'],
                ['pt' => 'Ambiente 100% Dockerizado', 'en' => '100% Dockerized Environment'],
                ['pt' => 'Interface Reativa com Blade/Livewire', 'en' => 'Reactive Interface with Blade/Livewire'],
                ['pt' => 'Logs de Auditoria de Acesso', 'en' => 'Access Audit Logging']
            ],
            'is_visible' => true,
        ]);

        // 6. Consume-Contries-API
        Project::create([
            'slug' => 'consume-countries',
            'name' => 'Consume-Contries-API',
            'year' => '2024',
            'language' => 'PHP',
            'category' => ['pt' => 'Integração de APIs', 'en' => 'API Integration'],
            'tagline' => [
                'pt' => 'Explorador de dados globais consumindo a REST Countries API.',
                'en' => 'Global data explorer consuming the REST Countries API.'
            ],
            'description' => [
                'pt' => 'Sistema desenvolvido em PHP puro para consumo eficiente e exibição de dados geopolíticos, focado em tratamento de JSON e renderização dinâmica sem frameworks.',
                'en' => 'System developed in pure PHP for efficient geopolitical data consumption and display, focused on JSON handling and dynamic rendering without frameworks.'
            ],
            'role' => ['pt' => 'Desenvolvedor Backend', 'en' => 'Backend Developer'],
            'repo_url' => 'https://github.com/malobr/Consume-Contries-API',
            'technologies' => ['PHP', 'cURL', 'REST APIs', 'JSON Processing'],
            'problem' => [
                'pt' => 'Consumir APIs externas de forma eficiente exige uma gestão correta de requisições HTTP e tratamento de exceções em tempo real.',
                'en' => 'Consuming external APIs efficiently requires correct HTTP request management and real-time exception handling.'
            ],
            'solution' => [
                'pt' => 'Implementação de um motor cURL robusto que processa dados de centenas de países, filtrando informações essenciais e entregando-as em uma interface limpa.',
                'en' => 'Implementation of a robust cURL engine that processes data from hundreds of countries, filtering essential information and delivering it in a clean interface.'
            ],
            'features' => [
                ['pt' => 'Consumo via cURL Nativo', 'en' => 'Native cURL Consumption'],
                ['pt' => 'Motor de Busca Geopolítico', 'en' => 'Geopolitical Search Engine'],
                ['pt' => 'Tratamento de Dados JSON Complexos', 'en' => 'Complex JSON Data Handling'],
                ['pt' => 'Zero-Framework Architecture', 'en' => 'Zero-Framework Architecture']
            ],
            'is_visible' => true,
        ]);

        // Live Projects
        LiveProject::create([
            'slug' => 'lar-bom-caminho',
            'name' => 'Lar Bom Caminho',
            'client' => 'Lar o Bom Caminho — ONG',
            'tagline' => [
                'pt' => 'Transformação digital para uma instituição filantrópica com 50 anos de história.',
                'en' => 'Digital transformation for a philanthropic institution with 50 years of history.'
            ],
            'description' => [
                'pt' => 'Uma plataforma institucional de alta fidelidade e ecossistema de gestão desenhada para amplificar o impacto social, modernizar a transparência financeira e engajar novos doadores.',
                'en' => 'A high-fidelity institutional platform and management ecosystem designed to amplify social impact, modernize financial transparency, and engage new donors.'
            ],
            'year' => '2025',
            'role' => ['pt' => 'Arquiteto de Soluções & Engenheiro Fullstack', 'en' => 'Solutions Architect & Fullstack Engineer'],
            'category' => ['pt' => 'Social & Institutional CMS', 'en' => 'Social & Institutional CMS'],
            'live_url' => 'https://larobomcaminho.org/',
            'technologies' => ['Laravel Ecosystem', 'Blade UI', 'TailwindCSS 4', 'MySQL', 'WYSIWYG Integration'],
            'problem' => [
                'pt' => 'A ausência de uma presença digital moderna e a dificuldade técnica de manter o site atualizado impediam a comunicação da seriedade do trabalho.',
                'en' => 'The lack of a modern digital presence and technical difficulty keeping the site updated hindered communication.'
            ],
            'solution' => [
                'pt' => 'Criação de uma experiência web "Premium UX" integrada a um backoffice robusto.',
                'en' => 'Creating a "Premium UX" web experience integrated with a robust backoffice.'
            ],
            'features' => [
                ['pt' => 'Narrativa Visual Impactante', 'en' => 'Mission-First Visual Storytelling'],
                ['pt' => 'Dashboard de Transparência Financeira', 'en' => 'Financial Transparency Dashboard']
            ],
            'results' => [
                ['metric' => '52+', 'label' => ['pt' => 'Anos de Impacto', 'en' => 'Years of Impact']],
                ['metric' => '100%', 'label' => ['pt' => 'Transparência Digital', 'en' => 'Digital Transparency']],
            ],
            'is_visible' => true,
        ]);

        LiveProject::create([
            'slug' => 'formly',
            'name' => 'Formly',
            'client' => 'Formly — SaaS Ecosystem',
            'tagline' => [
                'pt' => 'SaaS unificado para automação de contratos legais, formulários e gestão de fotos.',
                'en' => 'Unified SaaS for legal contracts, forms automation, and photo management.'
            ],
            'description' => [
                'pt' => 'O Formly é uma plataforma B2B robusta construída com Laravel 12, React 19 e Tailwind CSS 4.',
                'en' => 'Formly is a robust B2B platform built with Laravel 12, React 19, and Tailwind CSS 4.'
            ],
            'year' => '2025',
            'role' => ['pt' => 'Arquiteto de Software & CTO', 'en' => 'Software Architect & CTO'],
            'category' => ['pt' => 'Enterprise SaaS / Fintech', 'en' => 'Enterprise SaaS / Fintech'],
            'live_url' => 'https://formly.net.br/',
            'technologies' => ['Laravel 12', 'React 19', 'Tailwind CSS 4', 'Mercado Pago API'],
            'problem' => [
                'pt' => 'Empresas perdem produtividade fragmentando processos.',
                'en' => 'Companies lose productivity by fragmenting processes.'
            ],
            'solution' => [
                'pt' => 'Uma solução "Single-Point" integrada.',
                'en' => 'An integrated "Single-Point" solution.'
            ],
            'features' => [
                ['pt' => 'Gerador de Assinaturas com Validade Jurídica', 'en' => 'Legally Binding Signature Generator'],
                ['pt' => 'Builder de Formulários Drag-and-Drop', 'en' => 'Drag-and-Drop Form Builder']
            ],
            'results' => [
                ['metric' => 'v2.0', 'label' => ['pt' => 'Core Engine Tech', 'en' => 'Core Engine Tech']],
                ['metric' => '100%', 'label' => ['pt' => 'Legal Compliance', 'en' => 'Legal Compliance']],
            ],
            'is_visible' => true,
        ]);

        LiveProject::create([
            'slug' => 'caminho-da-vida',
            'name' => 'Caminho da Vida',
            'client' => 'Comunidade Cristã Caminho da Vida',
            'tagline' => [
                'pt' => 'Solução integrada de gestão e digitalização para comunidades de fé.',
                'en' => 'Integrated management and digitalization solution for faith communities.'
            ],
            'description' => [
                'pt' => 'Plataforma que centraliza a comunicação institucional e fluxos de contribuição.',
                'en' => 'Platform centralizing institutional communication and contribution flows.'
            ],
            'year' => '2024',
            'role' => ['pt' => 'Arquiteto Fullstack Lead', 'en' => 'Lead Fullstack Architect'],
            'category' => ['pt' => 'Management Platform', 'en' => 'Management Platform'],
            'live_url' => 'https://mediumaquamarine-gaur-323782.hostingersite.com/',
            'technologies' => ['Laravel', 'Custom Blade Components', 'TailwindCSS'],
            'problem' => [
                'pt' => 'Instituições tradicionais costumam ter dificuldades em manter uma comunicação ágil.',
                'en' => 'Traditional institutions often struggle to maintain agile communication.'
            ],
            'solution' => [
                'pt' => 'Implementação de uma agenda ministerial dinâmica e dashboard de Giving estilizado.',
                'en' => 'Implementation of a dynamic ministry agenda and styled Giving dashboard.'
            ],
            'features' => [
                ['pt' => 'Agendamento Ministerial Dinâmico', 'en' => 'Dynamic Ministry Scheduler'],
                ['pt' => 'Interface de Doação Premium', 'en' => 'Premium Giving Interface']
            ],
            'results' => [
                ['metric' => '24/7', 'label' => ['pt' => 'Disponibilidade Ativa', 'en' => 'Active Availability']],
                ['metric' => '100%', 'label' => ['pt' => 'Canais Digitalizados', 'en' => 'Digitized Channels']],
            ],
            'is_visible' => true,
        ]);
    }
}
