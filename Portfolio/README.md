# malobr — Premium React Portfolio & Terminal OS

[![Laravel 12](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind--CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

Um portfólio de alta performance projetado com uma estética **Deep Purple Terminal**, unindo o minimalismo profissional da arquitetura moderna à interatividade crua de um console de desenvolvedor. Este não é apenas um site; é um sistema operacional de carreira.

---

## 🚀 Vision & Aesthetic

O conceito visual baseia-se no **"Cyber-Luxury"**: uma paleta de roxos profundos (`#18141f`), contrastes vibrantes em ametista (`#a855f7`) e tipografia mono-espaçada de alta legibilidade. Cada interação foi pensada para "wower" o usuário, utilizando micro-animações, transições de estado suaves e uma interface que respira tecnologia.

### Core Philosophy:
- **Terminal-First**: Navegação via CLI como cidadã de primeira classe.
- **Context Awareness**: O sistema sabe onde você está e adapta o console em tempo real.
- **Luxury Performance**: Renderização instantânea via React 19 e Vite 8.

---

## ⌨️ The Functional Terminal (zsh-sim)

O coração do projeto é o **Terminal Modal**, uma ferramenta de CLI móvel e totalmente funcional que permite explorar o portfólio sem o uso do mouse.

### Funcionalidades do Terminal:
- **Navegação de Diretórios (`cd`)**: Suporte a caminhos reais e virtuais (`cd trabalhos/formly`, `cd repos/permission-laravel`, `cd ..`).
- **Prompt Inteligente**: Reflete o "CWD" (Current Working Directory) em tempo real.
- **FileSystem Virtual**: O comando `ls` lista seções, projetos ou repositórios dependendo do contexto da pasta.
- **Comandos Utilitários**: `whoami`, `neofetch`, `skills`, `social`, `clear`, `reset` e `date`.
- **Draggable UI**: A interface do terminal pode ser movida livremente pela tela, simulando um ambiente de desktop multi-janela.

---

## 🛠️ Key Features

- **GitHub API Integration**: Sincronização em tempo real com repositórios fixos, trazendo linguagens, anos e estatísticas atualizadas.
- **Live README Fetching**: Renderização dinâmica de arquivos `README.md` diretamente do GitHub com suporte a HTML bruto e GFM (GitHub Flavored Markdown).
- **Deep Linking**: Sistema de roteamento inteligente que integra âncoras de página única com páginas de detalhes profundos.
- **Responsive Terminal Chrome**: Janelas com estilo operacional (botões de controle, barra de título) e transparência adaptativa.
- **Luxury Sitemap**: Rodapé expandido com guia de comandos rápidos para o terminal.

---

## 🏗️ Technical Stack

- **Backend**: Laravel 12 (como API/Bridge e Orchestrator).
- **Frontend**: React 19 + Vite 8.
- **Styling**: Tailwind CSS 4 + Vanilla CSS (Custom Prose).
- **Icons**: Lucide React.
- **Markdown Logic**: React-Markdown + Rehype-Raw + Remark-GFM.
- **Infrastructure**: Dockerized environment (PHP 8.4-FPM + Nginx + MySQL).

---

## 📁 Project Structure

```bash
resources/
├── css/             # Custom "Luxury" Design System (app.css)
├── js/
│   ├── components/  # TerminalModal, Navigation, ProjectsSection...
│   ├── pages/       # Next.js-style page structure (Index, Details)
│   ├── data/        # Centralized Projects & Repos database
│   └── app.jsx      # Router & Entry Point
├── views/           # Blade Entry point (app.blade.php)
```

---

## 🛠️ Installation & Build

Para rodar este ambiente em modo de desenvolvimento ou produção:

```bash
# Instalar dependências
composer install
npm install

# Compilar assets (Produção)
npm run build

# Abrir o ambiente (Sail/Docker)
./vendor/bin/sail up
```

---

## ✒️ Author

**Marcelo (malobr)**  
*Fullstack Developer focused on Clean Architecture and Modern UI/UX.*

> "Terminal is not a tool, it's a lifestyle."

---
© 2025 malobr. MIT Licensed.
