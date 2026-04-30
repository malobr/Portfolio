# malobr — Premium React Portfolio & Terminal OS

<p align="center">
  <img src="https://img.shields.io/badge/Status-Online-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/UI-Deep_Purple-a855f7?style=for-the-badge" alt="UI Theme">
  <img src="https://img.shields.io/badge/Backend-Laravel_12-ff2d20?style=for-the-badge" alt="Laravel">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License">
</p>



## Sumário

- [ Sobre o Projeto](#-sobre-o-projeto)
- [ Funcionalidades](#-funcionalidades)
- [ Terminal Funcional](#-terminal-funcional)
- [ Tecnologias](#-tecnologias)
- [ Estética de Design](#-estética-de-design)
- [ Estrutura](#-estrutura)
- [ Instalação](#-instalacao)
- [ Deployment (Hostinger)](#-deployment-hostinger)
- [ Autor](#-autor)




## <a name="-sobre-o-projeto"></a> Sobre o Projeto

Este projeto é um **portfólio de nova geração** focado em demonstrar competências Fullstack de forma interativa. Desenvolvido sobre o ecossistema **Laravel 12** e **React 19**, ele transcende o conceito de "página estática" ao oferecer uma interface que se comporta como um ambiente de terminal real e imersivo.

O objetivo principal é centralizar lançamentos (sites no ar) e ferramentas de segurança (OSINT) em uma única experiência de luxo, unindo agilidade de comando com design visual de ponta.



## <a name="-funcionalidades"></a> Funcionalidades 

- **Navegação Híbrida**: Navegue pelo fluxo tradicional de UI ou utilize o terminal integrado para saltar entre seções e páginas de forma instantânea.
- **API GitHub Live Sync**: Repositórios são alimentados em tempo real pela API oficial do GitHub, garantindo que suas contribuições e estatísticas estejam sempre atualizadas.
- **Markdown Render Pro**: Leitura de arquivos `README.md` externos com suporte total a HTML, GFM e tabelas dentro do site, permitindo documentação técnica fluida.
- **Case Studies Detalhados**: Páginas dedicadas que explicam o *Desafio* vs a *Solução* de cada software desenvolvido (como o projeto Lar O Bom Caminho).
- **Performance de Elite**: Otimizado para Core Web Vitals, garantindo carregamento rápido mesmo com a robustez do backend.



## <a name="-terminal-funcional"></a> Terminal Funcional (`zsh-sim`)

A peça central é um console **arrastável e móvel** que permite uma navegação técnica imersiva:

- **Path Awareness**: O prompt reflete sua posição real (ex: `~/trabalhos/lar-bom-caminho`).
- **Comandos Reais**:
    - `ls`: Lista conteúdos dinamicamente baseado na sua pasta atual.
    - `cd [path]`: Navegação profunda entre projetos.
    - `neofetch`: Estatísticas visuais da stack e do desenvolvedor.
    - `whoami`, `skills`, `social`, `clear`, `reset`.



## <a name="-tecnologias"></a> Tecnologias

### Core Engine

| Tecnologia  | Versão | Função                                |
| :---------- | :----- | :------------------------------------ |
| **Laravel** | 12.x   | Backend, API Gateway & Routing        |
| **React** | 19.x   | UI Moderna & State Management         |
| **Vite** | 8.x    | Build Tooling & HMR                   |
| **PHP** | 8.4    | Modern Syntax & Server-side Logic     |

### UI & UX

- **Tailwind CSS 4**: Otimização de performance e estilização sofisticada.
- **Lucide React**: Iconografia minimalista.
- **Framer Motion**: Micro-interações e transições fluidas.

### Infraestrutura

- **Docker**: Ambiente isolado com Nginx, PHP 8.4 e MySQL.
- **MySQL 8.0**: Persistência de dados estruturados.



## <a name="-estetica-e-design"></a> Estética de Design

O projeto segue o conceito de **Interface de Alta Fidelidade (Hi-Fi)**, alinhado ao site oficial:
- **Background**: `#0a0a0a` — Um preto profundo e sóbrio para foco total no conteúdo.
- **Accent**: `#a855f7` — Roxo elétrico para destaques cirúrgicos de comandos e feedbacks.
- **Typography**: Mescla de `Instrument Sans` para leitura fluida e `JetBrains Mono` para o contexto técnico do terminal.


## <a name="-estrutura"></a> Estrutura

```bash
Portfolio/
├── .docker/              # Configurações de container (PHP/Nginx)
├── app/                  # Logic Providers & API Resources
├── bootstrap/            # Scripts de inicialização do framework
├── config/               # Arquivos de configuração da aplicação
├── database/             # Migrations, Seeders e Factories
├── public/               # Entry point (index.php) e assets compilados
├── resources/
│   ├── css/app.css       # Design System & Custom Prose
│   └── js/
│       ├── components/   # Nav, Terminal, Section Hooks
│       └── pages/        # LiveProjectDetail, CaseStudies
├── routes/               # Definições de rotas (Web, API, Console)
├── storage/              # Logs, cache e arquivos de upload
├── tests/                # Testes automatizados (Feature & Unit)
├── .env.example          # Modelo de variáveis de ambiente
├── artisan               # CLI do Laravel para comandos de desenvolvimento
├── composer.json         # Dependências do PHP (Backend)
├── docker-compose.yml    # Orquestração dos serviços Docker
├── package.json          # Dependências do Node.js (Frontend)
├── vite.config.js        # Configuração do Vite para build do frontend
└── README.md             # Você está aqui
```



## <a name="-instalacao"></a> Instalação (Ambiente Docker)

```bash
# Clone o repositório
git clone [https://github.com/malobr/Portfolio.git](https://github.com/malobr/Portfolio.git) && cd Portfolio

# Suba os containers (PHP-FPM, Nginx, MySQL)
docker compose up -d

# Instale dependências e configure o ambiente
docker exec php-zero-app composer install
docker exec php-zero-app php artisan key:generate
docker exec php-zero-app npm install
docker exec php-zero-app npm run build
```



## <a name="-deployment-hostinger"></a> Deployment (Hostinger)

Este projeto está otimizado para ambientes **Hostinger**, suportando tanto VPS quanto Hospedagem Compartilhada (Shared).

- **PHP Version**: 8.4
- **Build**: Vite production build.
- **Root**: Apontar o domínio para a pasta `/public`.



## <a name="-autor"></a> Autor

**Marcelo (malobr)** — [LinkedIn](www.linkedin.com/in/marcelo-tomás-a92b16231
) | [GitHub](https://github.com/malobr) | [Email](mailto:contato@marcelocavalheiro.com)

