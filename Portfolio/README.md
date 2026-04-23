# 🚀 malobr — Premium React Portfolio & Terminal OS

<p align="center">
  <img src="https://img.shields.io/badge/Status-Online-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/UI-Deep_Purple-a855f7?style=for-the-badge" alt="UI Theme">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License">
</p>

---

## 📌 Sumário
- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🖥️ Terminal Funcional](#-terminal-funcional)
- [🛠️ Tecnologias](#-tecnologias)
- [🎨 Estética de Design](#-estética-de-design)
- [📂 Estrutura](#-estrutura)
- [⚙️ Instalação](#️-instalação)
- [🚀 Deployment (Hostinger)](#-deployment-hostinger)

---

## 📖 Sobre o Projeto

Este projeto é um **portfólio de nova geração** focado em demonstrar competências Fullstack de forma interativa. Desenvolvido sobre o ecossistema **Laravel 12** e **React 19**, ele transcende o conceito de "página estática" ao oferecer uma interface que se comporta como um ambiente de terminal real.

O objetivo principal é centralizar lançamentos (sites no ar) e repositórios técnicos em uma única experiência de luxo, unindo agilidade de comando com design visual de ponta.

---

## ✨ Funcionalidades

- **Navegação Híbrida**: Navegue pelo fluxo normal de cliques ou utilize o terminal para saltar entre seções e páginas.
- **API GitHub Live Sync**: Repositórios são alimentados em tempo real pela API oficial do GitHub, garantindo estatísticas sempre precisas.
- **Markdown Render Pro**: Leitura de arquivos `README.md` externos com suporte total a HTML, GFM e tabelas dentro do site.
- **Sitemap Dinâmico**: Rodapé inteligente que atua como um hub de exploração e guia de atalhos.
- **Detalhes Profundos**: Páginas dedicadas que explicam o *Desafio* vs a *Solução* de cada software desenvolvido.

---

## 🖥️ Terminal Funcional (`zsh-sim`)

A peça central é um console **arrastável e móvel** que permite uma navegação imersiva:

- **Path Awareness**: O prompt reflete sua posição real (ex: `~/trabalhos/lar-bom-caminho`).
- **Comandos Reais**:
  - `ls`: Lista conteúdos dinamicamente baseado na sua pasta atual.
  - `cd [path]`: Navegação profunda (ex: `cd repos/catpaws`).
  - `cd ..`: Sobe um nível de diretório virtual.
  - `neofetch`: Estatísticas visuais da stack e do desenvolvedor.
  - `whoami`, `skills`, `social`, `clear`, `reset`.

---

## 🛠️ Tecnologias

### Core Engine
| Tecnologia | Versão | Função |
| :--- | :--- | :--- |
| **Laravel** | 12.x | Backend, API Gateway & Routing |
| **React** | 19.x | State Management & UI Components |
| **Vite** | 8.x | Build Tooling & HMR |
| **PHP** | 8.4 | Server-side Logic & Modern Syntax |

### UI & UX
- **Tailwind CSS 4**: Otimização de performance e estilos luxo.
- **Lucide React**: Iconografia minimalista.
- **React Markdown**: Parseador de documentação técnica.

### Infraestrutura
- **Docker**: Ambiente isolado e reproduzível.
- **MySQL**: Persistência de dados estruturados.

---

## 🎨 Estética de Design

O projeto utiliza o conceito **Deep Purple Terminal**:
- **Background**: `#18141f` — Um preto arroxeado profundo e sofisticado.
- **Accent**: `#a855f7` — Roxo elétrico para destaques de comandos e botões.
- **Typography**: Mescla de `Instrument Sans` para leitura fluida e `JetBrains Mono` para comandos técnicos.

---

## 📂 Estrutura

```bash
Portfolio/
├── .docker/             # Configurações de container (PHP/Nginx)
├── resources/
│   ├── css/app.css      # Design System & Custom Prose
│   ├── js/
│   │   ├── components/  # Nav, Terminal, Section Hooks
│   │   ├── pages/       # LiveProjectDetail, ProjectDetail
│   │   └── data/        # "Source of Truth" de projetos
└── README.md            # Você está aqui
```

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/malobr/Portfolio.git

# No diretório do projeto, suba o Docker
./vendor/bin/sail up -d

# Instale as dependências e compile os assets
docker exec Portfolio-app composer install
docker exec Portfolio-app npm install
docker exec Portfolio-app npm run build
```

---

## 🚀 Deployment (Hostinger)

Este projeto está otimizado para deploy em ambientes **Hostinger**, seja via VPS ou Hospedagem Compartilhada (Shared Hosting).

### 🖥️ Opção 1: VPS (Recomendado)
Ideal para manter a estrutura de **Docker** e isolamento:
1. Clone o projeto e aponte seu domínio para o IP da VPS.
2. Execute o setup inicial:
   ```bash
   docker compose up -d --build
   docker exec Portfolio-app php artisan key:generate
   ```

### ☁️ Opção 2: Hospedagem Compartilhada
Para planos sem suporte a Docker (Business/Premium):
1. Faça o upload via **Git Deployment** no hPanel da Hostinger.
2. Configure o seu domínio para apontar para a pasta `/public`.
3. No terminal SSH da Hostinger:
   ```bash
   composer install --no-dev --optimize-autoloader
   npm install && npm run build
   php artisan storage:link
   php artisan migrate --seed --force
   ```
4. Certifique-se de que a versão do PHP no hPanel esteja em **8.4**.

---

## ✒️ Autor

**Marcelo (malobr)** — [LinkedIn](https://linkedin.com/in/malobr) | [GitHub](https://github.com/malobr)

*"Transformando código complexo em interfaces de luxo."*
