<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::truncate();

        $posts = [
            [
                'slug' => 'moriarty-offensive-intelligence-osint',
                'title' => [
                    'en' => 'Moriarty: The Silent Intelligence Network & Global IoT Surveillance',
                    'pt' => 'Moriarty: A Rede Silenciosa de Inteligência e Vigilância Global de IoT'
                ],
                'excerpt' => [
                    'en' => 'An exhaustive technical breakdown of the Moriarty OSINT platform, including its stealth layer, database architecture, and tactical surveillance modules.',
                    'pt' => 'Uma análise técnica exaustiva da plataforma Moriarty OSINT, incluindo sua camada de ocultação, arquitetura de banco de dados e módulos de vigilância tática.'
                ],
                'content' => [
                    'en' => <<<'EOD'
# Moriarty: The "Napoleon of Crime" OSINT Engine

Moriarty is a state-of-the-art **Offensive Intelligence** and **Attack Surface Investigation** platform. This article provides a full technical dossier on its architecture, data flow, and current state of development.

## 1. Tactical Philosophy: The Invisible Web
Moriarty mirrors the calculations of its literary namesake. It focuses on **Invisible Reconnaissance**, ensuring that the investigator leaves zero digital footprints while mapping complex infrastructures.

### Key Functionalities:
- **Stealth Discovery (obfs4)**: Utilizes `obfs4proxy` to bridge into the Tor network, obfuscating traffic from Deep Packet Inspection (DPI).
- **IoT Tactical Mapping**: Correlates Shodan/Censys data with real-time RTSP-to-MJPEG transcoders.
- **Identity Synthesis**: Aggregates breach data, social aliases, and phone metadata into a single target profile.
- **Forensic Reporting**: Automates the generation of "Evidence to Conclusion" Markdown dossiers.

## 2. System Architecture & Data Flow

```mermaid
graph TD
    A[Investigator UI] -->|Auth/API| B[Moriarty Core - Go/Laravel]
    B -->|Proxy: obfs4/Tor| C[Target Recon]
    C -->|API: Shodan/Censys| D[IoT Surface]
    C -->|REST: Breach DBs| E[Credential Leaks]
    D -->|RTSP Stream| F[Transcoder Node]
    F -->|MJPEG Relay| A
    B -->|Persist| G[(Malobr-DB)]
```

## 3. Database Architecture (Models & Tables)

The system relies on a high-concurrency relational schema designed for rapid ingestion of large intelligence datasets.

### Core Tables & Models:
| Model | Table | Description |
| :--- | :--- | :--- |
| `Target` | `targets` | Primary record for investigative targets (Individuals or IP ranges). |
| `IntelNode` | `intel_nodes` | Registry of active scanning nodes and proxy circuits. |
| `EvidenceRecord` | `evidence_records` | Forensic findings mapped to a timeline (files, hashes, screenshots). |
| `CameraFeed` | `camera_feeds` | Metadata and access credentials for discovered IoT devices. |
| `SearchLog` | `search_logs` | Audit trail of all reconnaissance activities to prevent duplicate queries. |
| `DorkPattern` | `dork_patterns` | Library of vulnerability search patterns for specific infrastructures. |

## 4. Current Progress: Phase 2 (Hardening)
Moriarty is currently in **Phase 2: Tactical Hardening**. We are focusing on increasing the "Invisibility Score" and stabilizing the 3D Tactical Globe (Marechal) for real-time visualization of global IoT nodes.

*Moriarty remains the invisible spider at the center of the web.*
EOD
,
                    'pt' => <<<'EOD'
# Moriarty: O Motor de Inteligência "Napoleão do Crime"

O Moriarty é uma plataforma de **Inteligência Ofensiva** e **Investigação de Superfície de Ataque** de ponta. Este artigo fornece um dossiê técnico completo sobre sua arquitetura, fluxo de dados e estado atual de desenvolvimento.

## 1. Filosofia Tática: A Teia Invisível
O Moriarty espelha os cálculos de seu homônimo literário. Ele foca em **Reconhecimento Invisível**, garantindo que o investigador deixe zero rastros digitais enquanto mapeia infraestruturas complexas.

### Principais Funcionalidades:
- **Descoberta Furtiva (obfs4)**: Utiliza `obfs4proxy` para fazer a ponte com a rede Tor, ofuscando o tráfego contra a Inspeção Profunda de Pacotes (DPI).
- **Mapeamento Tático IoT**: Correlaciona dados do Shodan/Censys com transcodificadores RTSP-para-MJPEG em tempo real.
- **Síntese de Identidade**: Agrega dados de vazamento, aliases sociais e metadados de telefone em um único perfil de alvo.
- **Relatórios Forenses**: Automatiza a geração de dossiês Markdown no formato "Evidência para Conclusão".

## 2. Arquitetura do Sistema e Fluxo de Dados

```mermaid
graph TD
    A[UI do Investigador] -->|Auth/API| B[Moriarty Core - Go/Laravel]
    B -->|Proxy: obfs4/Tor| C[Reconhecimento de Alvo]
    C -->|API: Shodan/Censys| D[Superfície IoT]
    C -->|REST: Breach DBs| E[Vazamentos de Credenciais]
    D -->|RTSP Stream| F[Nó Transcodificador]
    F -->|MJPEG Relay| A
    B -->|Persistência| G[(Malobr-DB)]
```

## 3. Arquitetura do Banco de Dados (Models & Tables)

O sistema conta com um schema relacional de alta concorrência projetado para a ingestão rápida de grandes conjuntos de dados de inteligência.

### Tabelas e Models Principais:
| Model | Tabela | Descrição |
| :--- | :--- | :--- |
| `Target` | `targets` | Registro primário para alvos de investigação (Indivíduos ou faixas de IP). |
| `IntelNode` | `intel_nodes` | Registro de nós de varredura ativos e circuitos de proxy. |
| `EvidenceRecord` | `evidence_records` | Descobertas forenses mapeadas em uma linha do tempo (arquivos, hashes, capturas). |
| `CameraFeed` | `camera_feeds` | Metadados e credenciais de acesso para dispositivos IoT descobertos. |
| `SearchLog` | `search_logs` | Trilha de auditoria de todas as atividades de reconhecimento para evitar buscas duplicadas. |
| `DorkPattern` | `dork_patterns` | Biblioteca de padrões de busca de vulnerabilidades para infraestruturas específicas. |

## 4. Progresso Atual: Fase 2 (Hardening)
O Moriarty está atualmente na **Fase 2: Endurecimento Tático**. Estamos focando em aumentar o "Invisibility Score" (Índice de Invisibilidade) e estabilizar o Globo Tático 3D (Marechal) para visualização em tempo real de nós de IoT globais.

*Moriarty permanece a aranha invisível no centro da teia.*
EOD
                ],
                'status' => 'Em andamento',
                'publish_date' => '2024-04-22',
                'read_time' => '25 min',
                'tags' => ['OSINT', 'Tor', 'Surveillance', 'Forensics']
            ],
            [
                'slug' => 'formly-saas-engineering-payments',
                'title' => [
                    'en' => 'Formly: Architectural Engineering of a Multi-Tenant SaaS',
                    'pt' => 'Formly: Engenharia Arquitetural de um SaaS Multi-Tenant'
                ],
                'excerpt' => [
                    'en' => 'A deep dive into the MVC architecture, payment integration, and front-end engineering behind the Formly SaaS platform.',
                    'pt' => 'Um mergulho profundo na arquitetura MVC, integração de pagamentos e engenharia front-end por trás da plataforma SaaS Formly.'
                ],
                'content' => [
                    'en' => <<<'EOD'
# Formly: Scaling Forms & Contracts with Laravel 12

Formly is a high-performance SaaS platform designed for the Latin American market. It handles the full lifecycle of form creation, response collection, and contract automation through a robust decoupled architecture.

## 1. Technical Stack & Architecture
- **Backend**: Laravel 12 (PHP 8.4) with focus on Clean Architecture.
- **Frontend**: React 19 + TypeScript + Tailwind CSS 4.
- **Database**: PostgreSQL with multi-tenant data isolation.
- **Payments**: AbacatePay (v1/v2 Hybrid) & Mercado Pago.

## 2. MVC Breakdown (The Backbone)

The system is organized into a modular MVC structure to ensure scalability and ease of maintenance.

### Core Models:
| Model | Description |
| :--- | :--- |
| `Form` | Stores form configuration, custom branding, and state (Active/Draft). |
| `Question` | Schema for individual inputs (Text, Select, File Uploads) with validation rules. |
| `Response` | JSON-based storage for user-submitted data, indexed per form. |
| `Subscription` | Manages user plans and feature access (Limit control). |
| `WebhookEvent` | Audit trail for incoming payment notifications (AbacatePay/MercadoPago). |

### Specialized Controllers:
- **`FormBuilderController`**: Handles the recursive saving of form schemas and drag-and-drop state.
- **`SubmissionController`**: High-throughput controller for handling and validating public responses.
- **`PaymentWebhookController`**: Reconciles AbacatePay v1/v2 payloads to update subscription states.
- **`ContractController`**: Manages the server-side generation of PDF contracts using WebAssembly (Wasm).

## 3. Engineering the Lifecycle

```mermaid
graph LR
    A[Creator] -->|Drag & Drop| B[Form Builder UI]
    B -->|Schema Sync| C[Laravel API]
    C -->|Persist| D[(DB: forms/questions)]
    E[Respondent] -->|Submit| F[Response Logic]
    F -->|Validation| C
    C -->|JSON| G[(DB: responses)]
    G -->|Trigger| H[Automation / Webhook]
```

## 4. Payment Integration: AbacatePay Engineering
A key feature of Formly is its robust payment reconciliation. We implemented a hybrid strategy to handle different API versions:

- **v1 Lifecycle**: Manual `taxId` (CPF/CNPJ) validation and direct checkout control.
- **v2 Lifecycle**: Delegated checkout through AbacatePay's hosted pages, reducing PCI compliance burden.
- **Reconciliation Engine**: A custom middleware that detects `externalId` formats to match webhooks to the correct user subscription regardless of the API version used.

*Formly represents the intersection of technical excellence and regional business needs.*
EOD
,
                    'pt' => <<<'EOD'
# Formly: Engenharia Arquitetural de um SaaS Multi-Tenant

O Formly é uma plataforma SaaS de alta performance projetada para o mercado latino-americano. Ele gerencia o ciclo de vida completo de criação de formulários, coleta de respostas e automação de contratos através de uma arquitetura robusta e desacoplada.

## 1. Stack Técnica e Arquitetura
- **Backend**: Laravel 12 (PHP 8.4) com foco em Clean Architecture.
- **Frontend**: React 19 + TypeScript + Tailwind CSS 4.
- **Banco de Dados**: PostgreSQL com isolamento de dados multi-tenant.
- **Pagamentos**: AbacatePay (Híbrido v1/v2) e Mercado Pago.

## 2. Divisão MVC (A Espinha Dorsal)

O sistema é organizado em uma estrutura MVC modular para garantir escalabilidade e facilidade de manutenção.

### Models Principais:
| Model | Descrição |
| :--- | :--- |
| `Form` | Armazena configurações do formulário, branding personalizado e estado (Ativo/Rascunho). |
| `Question` | Schema para inputs individuais (Texto, Select, Upload de Arquivos) com regras de validação. |
| `Response` | Armazenamento via JSON para dados submetidos por usuários, indexado por formulário. |
| `Subscription` | Gerencia planos de usuários e acesso a recursos (Controle de limites). |
| `WebhookEvent` | Trilha de auditoria para notificações de pagamento recebidas (AbacatePay/MercadoPago). |

### Controllers Especializados:
- **`FormBuilderController`**: Gerencia o salvamento recursivo de schemas de formulários e estados drag-and-drop.
- **`SubmissionController`**: Controller de alto rendimento para lidar com e validar respostas públicas.
- **`PaymentWebhookController`**: Reconcilia payloads do AbacatePay v1/v2 para atualizar estados de assinatura.
- **`ContractController`**: Gerencia a geração de contratos PDF no lado do servidor usando WebAssembly (Wasm).

## 3. Engenharia do Ciclo de Vida

```mermaid
graph LR
    A[Criador] -->|Drag & Drop| B[UI do Construtor]
    B -->|Sincronia de Schema| C[API Laravel]
    C -->|Persistência| D[(DB: forms/questions)]
    E[Respondente] -->|Submit| F[Lógica de Resposta]
    F -->|Validação| C
    C -->|JSON| G[(DB: responses)]
    G -->|Gatilho| H[Automação / Webhook]
```

## 4. Integração de Pagamentos: Engenharia AbacatePay
Um recurso fundamental do Formly é sua robusta reconciliação de pagamentos. Implementamos uma estratégia híbrida para lidar com diferentes versões da API:

- **Ciclo v1**: Validação manual de `taxId` (CPF/CNPJ) e controle direto de checkout.
- **Ciclo v2**: Checkout delegado através das páginas hospedadas do AbacatePay, reduzindo a carga de conformidade PCI.
- **Motor de Reconciliação**: Um middleware customizado que detecta formatos de `externalId` para associar webhooks à assinatura correta do usuário, independentemente da versão da API utilizada.

*O Formly representa a interseção entre excelência técnica e necessidades de negócios regionais.*
EOD
                ],
                'status' => 'Em andamento',
                'publish_date' => '2024-04-18',
                'read_time' => '10 min',
                'tags' => ['SaaS', 'Laravel', 'Fintech', 'React']
            ],
            [
                'slug' => 'malobr-os-terminal-cli-experience',
                'title' => [
                    'en' => 'Malobr-OS: Why I Built a Virtual Terminal into My Portfolio',
                    'pt' => 'Malobr-OS: Por que Construí um Terminal Virtual no meu Portfólio'
                ],
                'excerpt' => [
                    'en' => 'Exploring the technical implementation of a browser-based CLI and how it bridges the gap between UI and pure data.',
                    'pt' => 'Explorando a implementação técnica de uma CLI no navegador e como ela une a interface visual aos dados puros.'
                ],
                'content' => [
                    'en' => <<<'EOD'
# Malobr-OS: The Command Line as a Modern User Interface

In a world dominated by sleek graphical interfaces, the **CLI (Command Line Interface)** remains the ultimate tool for efficiency and control. For my portfolio, I didn't want just a "terminal look"; I wanted a functional **Virtual Filesystem** that allows visitors to explore my work like a sysadmin.

## 1. Technical Philosophy: No Placeholders
Most "portfolio terminals" are just text animations. **Malobr-OS** is different. It's linked directly to the application's backend. When you type `ls /blog`, the system isn't displaying a static list; it's performing a real-time query to the database.

## 2. The Implementation (React + Framer Motion)
The terminal is built as a singleton modal in React.
- **State Management**: Using `useState` to track a virtual directory tree (`fs`) and `history` of commands.
- **Micro-animations**: Powered by `framer-motion` for that snappy, linux-terminal feel during window dragging and command output.

## 3. Key Features & Commands

### A. The Manual System (`man`)
I implemented a full `man` command. Just like in Linux, typing `man cat` or `man ls` will display a detailed manual page explaining the usage and arguments of each command. It's self-documenting code in its purest form.

### B. High-Fidelity Data Extraction (`cat`)
Using the `cat` command, you can bypass the standard blog UI.
```bash
cat /blog/malobr-os-terminal-cli-experience
```
This performs a lookup in the virtual filesystem and outputs the raw Markdown content directly into the terminal window.

### C. System Summary (`neofetch`)
No terminal is complete without `neofetch`. It displays an ASCII logo of the portfolio alongside technical specs:
- **OS**: Malobr-OS v1.6.0
- **Kernel**: React 19 / Laravel 12
- **Uptime**: Real-time session tracking

## 4. Why This Matters
As a Fullstack Developer, my work often happens in the "invisible" layers—databases, APIs, and containers. The terminal serves as a bridge, allowing technically-minded visitors to interact with the backbone of the site in their native environment.

*Next time you visit, try typing `help` and explore the system. Just don't try `sudo`... yet.*
EOD
,
                    'pt' => <<<'EOD'
# Malobr-OS: A Linha de Comando como uma Interface Moderna

Em um mundo dominado por interfaces gráficas polidas, a **CLI (Command Line Interface)** continua sendo a ferramenta definitiva para eficiência e controle. Para o meu portfólio, eu não queria apenas um "visual de terminal"; eu queria um **Filesystem Virtual** funcional que permitisse aos visitantes explorar meu trabalho como um sysadmin.

## 1. Filosofia Técnica: Sem Placeholders
A maioria dos "terminais de portfólio" são apenas animações de texto. O **Malobr-OS** é diferente. Ele está conectado diretamente ao backend da aplicação. Quando você digita `ls /blog`, o sistema não está exibindo uma lista estática; ele está realizando uma consulta em tempo real ao banco de dados.

## 2. A Implementação (React + Framer Motion)
O terminal foi construído como um modal singleton em React.
- **Gerenciamento de Estado**: Usando `useState` para rastrear uma árvore de diretórios virtual (`fs`) e o `history` de comandos.
- **Micro-animações**: Alimentadas por `framer-motion` para aquela sensação ágil de terminal Linux durante o arraste de janelas e saída de comandos.

## 3. Principais Recursos e Comandos

### A. O Sistema de Manual (`man`)
Implementei um comando `man` completo. Assim como no Linux, digitar `man cat` ou `man ls` exibirá uma página de manual detalhada explicando o uso e os argumentos de cada comando. É código autodocumentado em sua forma mais pura.

### B. Extração de Dados de Alta Fidelidade (`cat`)
Usando o comando `cat`, você pode ignorar a interface padrão do blog.
```bash
cat /blog/malobr-os-terminal-cli-experience
```
Isso realiza uma busca no filesystem virtual e exibe o conteúdo Markdown bruto diretamente na janela do terminal.

### C. Resumo do Sistema (`neofetch`)
Nenhum terminal está completo sem o `neofetch`. Ele exibe um logo ASCII do portfólio junto com especificações técnicas:
- **OS**: Malobr-OS v1.6.0
- **Kernel**: React 19 / Laravel 12
- **Uptime**: Rastreamento de sessão em tempo real

## 4. Por que isso importa?
Como Desenvolvedor Fullstack, meu trabalho geralmente acontece nas camadas "invisíveis" — bancos de dados, APIs e containers. O terminal serve como uma ponte, permitindo que visitantes tecnicamente orientados interajam com a espinha dorsal do site em seu ambiente nativo.

*Na próxima vez que visitar, tente digitar `help` e explore o sistema. Só não tente o `sudo`... ainda.*
EOD
                ],
                'status' => 'Concluído',
                'publish_date' => '2024-04-23',
                'read_time' => '12 min',
                'tags' => ['Terminal', 'React', 'DX', 'CLI']
            ]
        ];

        foreach ($posts as $post) {
            Post::create($post);
        }
    }
}
