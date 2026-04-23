<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Project::create([
            'slug' => 'malobr-profile',
            'name' => 'malobr',
            'year' => '2024',
            'language' => 'Markdown',
            'category' => 'Profile Identity',
            'tagline' => 'Centralização de identidade técnica e portfólio dinâmico.',
            'description' => 'Hub central de presença profisisonal no GitHub, utilizando automação para manter estatísticas e stack sempre atualizadas.',
            'role' => 'Original Creator',
            'repo_url' => 'https://github.com/malobr/malobr',
            'technologies' => ['Markdown', 'GitHub Actions', 'Vercel'],
            'problem' => 'A dispersão de informações sobre competências e projetos entre múltiplos repositórios dificulta a análise rápida por recrutadores.',
            'solution' => 'Desenvolvimento de um README dinâmico que atua como dashboard, integrando APIs de estatísticas do GitHub e Actions para build automatizado.',
            'features' => [
                'Integração com GitHub Readme Stats',
                'Listagem automática de linguagens mais utilizadas',
                'Social cards dinâmicos para links externos',
                'Layout otimizado para legibilidade técnica',
            ],
        ]);

        \App\Models\Project::create([
            'slug' => 'catpaws',
            'name' => 'CatPaws',
            'year' => '2024',
            'language' => 'Kotlin',
            'category' => 'Mobile App',
            'tagline' => 'Experiência mobile nativa para curadoria e interação pet.',
            'description' => 'Aplicativo Android nativo de alta performance que combina consumo de APIs externas com persistência de dados local avançada.',
            'role' => 'Lead Mobile Developer',
            'repo_url' => 'https://github.com/malobr/CatPaws',
            'technologies' => ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Room', 'Coil'],
            'problem' => 'A necessidade de uma interface fluida para lidar com grandes volumes de imagens em rede sem comprometer a performance ou o consumo de dados do usuário.',
            'solution' => 'Implementação de arquitetura MVVM com Jetpack Compose, utilizando Retrofit para consumo assíncrono da The Cat API e Room para gestão de cache e anotações locais.',
            'features' => [
                'Processamento de imagem otimizado com Coil',
                'CRUD local completo para anotações e favoritos',
                'Interface moderna baseada em Material Design 3',
                'Injeção de dependências e Clean Architecture',
            ],
        ]);

        \App\Models\Project::create([
            'slug' => 'library-manage',
            'name' => 'Library-Manage',
            'year' => '2024',
            'language' => 'PHP',
            'category' => 'Enterprise System',
            'tagline' => 'Gestão inteligente de acervos com arquitetura desacoplada.',
            'description' => 'Sistema de gerenciamento de bibliotecas que automatiza o ciclo completo de empréstimos, inventário e autenticação de usuários.',
            'role' => 'Fullstack Architect',
            'repo_url' => 'https://github.com/malobr/Library-Manage',
            'technologies' => ['Laravel 11', 'React', 'MySQL', 'JWT', 'Docker'],
            'problem' => 'Sistemas legados de gestão de livros costumam ser lentos, centralizados e propensos a erros de estoque ou conflitos de reserva.',
            'solution' => 'API REST robusta em Laravel 11 com autenticação Sanctum/JWT, integrada a um frontend em React para operações em tempo real e controle de inventário.',
            'features' => [
                'Sistema de autenticação modular e seguro',
                'Verificação de disponibilidade e prazos automática',
                'Dashboard administrativo para controle de usuários',
                'Ambiente reproduzível via Docker Compose',
            ],
        ]);

        \App\Models\Project::create([
            'slug' => 'chapeu-seletor',
            'name' => 'Chapeu-Seletor-De-Hogwarts',
            'year' => '2024',
            'language' => 'PHP',
            'category' => 'Interactive Quiz',
            'tagline' => 'Algoritmo de tomada de decisão com interface lúdica.',
            'description' => 'Aplicação interativa que utiliza lógica ponderada para processar respostas e retornar resultados personalizados.',
            'role' => 'Developer',
            'repo_url' => 'https://github.com/malobr/Chapeu-Seletor-De-Hogwarts',
            'technologies' => ['Laravel 10', 'Blade', 'MySQL', 'JavaScript'],
            'problem' => 'Migrar lógicas complexas de aplicações desktop para a web mantendo a interatividade e o engajamento do usuário.',
            'solution' => 'Tradução de uma lógica original em Java para PHP/Laravel, implementando um motor de regras que avalia pesos de critérios em tempo real.',
            'features' => [
                'Fluxo de formulário com transições dinâmicas',
                'Lógica de sorteio baseada em perfis psicológicos',
                'Persistência de resultados por sessão de usuário',
                'Design temático e responsivo',
            ],
        ]);

        \App\Models\Project::create([
            'slug' => 'permission-laravel',
            'name' => 'Permission-Laravel',
            'year' => '2025',
            'language' => 'PHP',
            'category' => 'Security & ACL',
            'tagline' => 'Controle de acesso granular baseado em papéis (RBAC).',
            'description' => 'Módulo escalável de segurança para Laravel que permite a gestão dinâmica de permissões sem necessidade de refatoração de código.',
            'role' => 'Backend Engineer',
            'repo_url' => 'https://github.com/malobr/Permission-Laravel',
            'technologies' => ['Laravel 11', 'PHP 8.2+', 'Middleware', 'MySQL'],
            'problem' => 'O gerenciamento manual de permissões via código (hardcoded) torna a manutenção de sistemas corporativos lenta e propensa a falhas de segurança.',
            'solution' => 'Sistema de Role-Based Access Control (RBAC) com camadas de Middleware e Helpers que centralizam a lógica de autorização em banco de dados.',
            'features' => [
                'Gestão de Roles e Permissions via interface',
                'Atribuição dinâmica de papéis a usuários',
                'Proteção de rotas e componentes Blade nativa',
                'Compatibilidade total com o ecossistema Laravel 11',
            ],
        ]);

        \App\Models\Project::create([
            'slug' => 'consume-countries',
            'name' => 'Consume-Contries-API',
            'year' => '2025',
            'language' => 'PHP',
            'category' => 'API Integration',
            'tagline' => 'Dashboard geográfico com processamento de dados remoto.',
            'description' => 'Explorador de dados globais que demonstra a eficiência do processamento de APIs externas em PHP Vanilla.',
            'role' => 'Original Creator',
            'repo_url' => 'https://github.com/malobr/Consume-Contries-API',
            'technologies' => ['Vanilla PHP', 'Rest Countries API', 'CSS Grid/Flexbox'],
            'problem' => 'Muitos dashboards de dados dependem excessivamente de bibliotecas pesadas de frontend para visualizações simples de API.',
            'solution' => 'Criação de um agregador de dados geográficos performático, focado em manipulação direta de JSON e renderização eficiente no servidor.',
            'features' => [
                'Busca e filtragem instantânea por continentes',
                'Exibição detalhada de indicadores demográficos',
                'Interface Mobile-First totalmente responsiva',
                'Implementação limpa sem dependências externas',
            ],
        ]);

        // Live Projects
        \App\Models\LiveProject::create([
            'slug' => 'lar-bom-caminho',
            'name' => 'Lar Bom Caminho',
            'client' => 'Lar o Bom Caminho — ONG',
            'tagline' => 'Site institucional para ONG filantrópica que acolhe crianças desde 1972',
            'description' => 'Plataforma institucional completa para uma instituição filantrópica de mais de 50 anos.',
            'year' => '2025',
            'role' => 'Fullstack Developer',
            'category' => 'Site Institucional',
            'live_url' => 'https://larobomcaminho.org/',
            'technologies' => ['Laravel', 'Blade', 'TailwindCSS', 'JavaScript', 'MySQL', 'Vite'],
            'problem' => 'A ONG tinha uma presença digital limitada.',
            'solution' => 'Construí um site institucional moderno em Laravel + Blade.',
            'features' => ['Hero impactante', 'Transparência financeira', 'Fluxo de doação'],
            'results' => [
                ['metric' => '52+', 'label' => 'Anos de história contados'],
                ['metric' => '200+', 'label' => 'Crianças representadas'],
            ],
        ]);

        \App\Models\LiveProject::create([
            'slug' => 'formly',
            'name' => 'Formly',
            'client' => 'Formly — SaaS próprio',
            'tagline' => 'Ecossistema SaaS para formulários dinâmicos.',
            'description' => 'Plataforma completa que reúne 4 produtos em um só.',
            'year' => '2025',
            'role' => 'Founder & Fullstack Developer',
            'category' => 'SaaS / Produto',
            'live_url' => 'https://formly.net.br/',
            'technologies' => ['Laravel', 'TypeScript', 'TailwindCSS', 'WebAssembly'],
            'problem' => 'Equipes precisam de várias ferramentas separadas.',
            'solution' => 'Construí um ecossistema SaaS unificado.',
            'features' => ['Form Weaver', 'Legal Suite', 'QuickConvert', 'AudioStudio'],
            'results' => [
                ['metric' => '4', 'label' => 'Produtos integrados'],
                ['metric' => '100%', 'label' => 'Processamento local'],
            ],
        ]);

        \App\Models\LiveProject::create([
            'slug' => 'caminho-da-vida',
            'name' => 'Caminho da Vida',
            'client' => 'Comunidade Cristã Caminho da Vida',
            'tagline' => 'Plataforma de gestão comunicaçăo para igreja.',
            'description' => 'Sistema completo que integra divulgação de eventos.',
            'year' => '2024',
            'role' => 'Fullstack Developer',
            'category' => 'Site Institucional / Gestão',
            'live_url' => 'https://mediumaquamarine-gaur-323782.hostingersite.com/',
            'technologies' => ['Laravel', 'Blade', 'TailwindCSS', 'MySQL'],
            'problem' => 'A igreja necessitava de um canal centralizado.',
            'solution' => 'Plataforma com agenda e dízimos.',
            'features' => ['Agenda editável', 'Dízimos Gold', 'Notícias'],
            'results' => [
                ['metric' => '100%', 'label' => 'Digitalização'],
                ['metric' => '24/7', 'label' => 'Avisos'],
            ],
        ]);
    }
}
