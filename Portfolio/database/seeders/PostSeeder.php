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
                    'en' => 'Moriarty: Offensive Intelligence & Global IoT Surveillance',
                    'pt' => 'Moriarty: Inteligência Ofensiva e Vigilância Global de IoT'
                ],
                'excerpt' => [
                    'en' => 'Explaining the inspiration behind the name and the high-precision surveillance architecture of the Moriarty platform.',
                    'pt' => 'Explicando a inspiração por trás do nome e a arquitetura de vigilância de alta precisão da plataforma Moriarty.'
                ],
                'content' => [
                    'en' => <<<'EOD'
# Moriarty: Technical Architecture & The "Napoleon of Crime" Inspiration

Moriarty is a state-of-the-art **Offensive Intelligence** platform. Beyond its technical capabilities, the platform carries a thematic weight inspired by one of literature's greatest strategic minds.

## 1. The Inspiration: Why "Moriarty"?
The platform is named after **Professor James Moriarty**, the arch-nemesis of Sherlock Holmes. In Sir Arthur Conan Doyle's stories, Holmes describes Moriarty as the **"Napoleon of Crime"** and a "spider at the center of its web."

- **The Spider Web Logic**: Just as the literary Moriarty sat at the center of a vast criminal network, knowing every thread that moved, the **Moriarty Platform** is designed to be the central hub of intelligence. It reaches out into the vast "web" of the internet to pull threads of data—usernames, emails, and IoT nodes—back to a single command center.
- **Strategic Superiority**: The goal of the platform is to mirror Moriarty's calculated and invisible influence. It doesn't just "search"; it correlates, analyzes, and unmasks.

## 2. The Anonymity Layer (Tor & obfs4proxy)
To maintain the stealth required of a modern "Napoleon of Crime," Moriarty uses a sophisticated egress strategy:
- **obfs4 (The Scrambler)**: All traffic is encapsulated using the `obfs4` transport, bypassing **Deep Packet Inspection (DPI)** from ISPs.
- **Rotating Circuits**: Every 10 requests, Moriarty rotates Exit Nodes to avoid IP-based rate limiting.

## 3. Advanced Search Methodology

### A. Identity Reconnaissance (People & Social)
- **Username & Alias Mapping**: Checks 2000+ social platforms to map digital footprints.
- **Email & Breach Intelligence**: Cross-references emails against deep-web leak databases to find plaintext passwords and associated accounts.
- **Phone Number Recon**: Reverse lookup for WhatsApp/Telegram photos and caller ID name correlation.

### B. IoT Surface Reconnaissance
- **Signature Matching**: Identifies devices by "Flags" (e.g., `Server: DVRDVS-Webs`).
- **Metadata Extraction**: Scrapes handshakes for manufacturer firmware and serial numbers.

### C. Vulnerability Dorking
- **Sensitive Files**: Systematic discovery of `.env`, `.git`, and private keys (`id_rsa`) accidentally left public.

### D. Geolocation Correlation
- **Exif Harvesting**: Parses EXIF metadata from live device feeds to find GPS markers, placing targets on the **Tactical Command Center (Map)**.

## 4. The Camera Interception Layer
- **RTSP Transcoding**: Real-time Go-based transcoding into **MJPEG streams** for browser viewing.
- **Credential Testing**: Automated authorization attempts using known default/leaked credential lists.

*Moriarty isn't just a tool; it's the invisible web connecting every fragment of digital evidence.*
EOD
,
                    'pt' => <<<'EOD'
# Moriarty: Arquitetura Técnica e a Inspiração no "Napoleão do Crime"

O Moriarty é uma plataforma de **Inteligência Ofensiva** de última geração. Além de suas capacidades técnicas, a plataforma carrega um peso temático inspirado em uma das mentes mais estratégicas da literatura.

## 1. A Inspiração: Por que "Moriarty"?
A plataforma foi batizada em homenagem ao **Professor James Moriarty**, o nêmesis de Sherlock Holmes. Nas histórias de Sir Arthur Conan Doyle, Holmes descreve Moriarty como o **"Napoleão do Crime"** e como uma "aranha no centro de sua teia".

- **A Lógica da Teia de Aranha**: Assim como o Moriarty literário sentava-se no centro de uma vasta rede, conhecendo cada fio que se movia, a **Plataforma Moriarty** foi projetada para ser o hub central de inteligência. Ela se estende pela vasta "teia" da internet para puxar fios de dados — usuários, e-mails e nós de IoT — de volta para um único centro de comando.
- **Superioridade Estratégica**: O objetivo da plataforma é espelhar a influência calculada e invisível de Moriarty. Ela não apenas "busca"; ela correlaciona, analisa e desmascara.

## 2. Camada de Anonimato (Tor & obfs4proxy)
Para manter o sigilo exigido de um "Napoleão do Crime" moderno, o Moriarty utiliza uma estratégia de saída sofisticada:
- **obfs4 (O Embaralhador)**: Todo o tráfego é encapsulado usando o transporte `obfs4`, ignorando a **Inspeção Profunda de Pacotes (DPI)** dos provedores.
- **Circuitos Rotativos**: A cada 10 requisições, o Moriarty rotaciona os Exit Nodes para evitar bloqueios de IP.

## 3. Metodologia Avançada de Busca

### A. Reconhecimento de Identidade (Pessoas e Social)
- **Mapeamento de Alias**: Verifica mais de 2000 plataformas sociais para mapear pegadas digitais.
- **Inteligência de E-mail**: Cruza e-mails com bases de vazamentos da deep-web para encontrar senhas e contas associadas.
- **Busca de Telefone**: Consulta reversa de fotos do WhatsApp/Telegram e correlação de nomes via identificadores de chamadas.

### B. Reconhecimento de Superfície IoT
- **Assinatura de Hardware**: Identifica dispositivos por "Flags" técnicas (ex: `Server: DVRDVS-Webs`).
- **Extração de Metadados**: Vasculha firmware e números de série em handshakes.

### C. Dorking de Vulnerabilidade
- **Arquivos Sensíveis**: Descoberta sistemática de arquivos `.env`, `.git` e chaves privadas (`id_rsa`) expostos por erro.

### D. Correlação de Geolocalização
- **Colheita de Exif**: Analisa metadados EXIF em tempo real dos feeds de imagem para encontrar marcadores GPS, posicionando alvos no **Centro de Comando Tático (Mapa)**.

## 4. Camada de Interceptação de Câmeras
- **Transcodificação RTSP**: Transcodificação em tempo real via Go para **streams MJPEG**, permitindo visualização no navegador.
- **Testes de Credenciais**: Tentativas automatizadas usando listas de credenciais padrão e vazadas.

*Moriarty não é apenas uma ferramenta; é a teia invisível que conecta cada fragmento de evidência digital.*
EOD
                ],
                'status' => 'Concluído',
                'publish_date' => '2024-04-22',
                'read_time' => '20 min',
                'tags' => ['OSINT', 'Tor', 'Anonymity', 'Sherlock']
            ],
            [
                'slug' => 'formly-saas-engineering-payments',
                'title' => [
                    'en' => 'Formly: Engineering a Scalable SaaS for the Latin American Market',
                    'pt' => 'Formly: Engenharia de um SaaS Escalável para o Mercado Latino-Americano'
                ],
                'excerpt' => [
                    'en' => 'Solving the complexities of multi-tenant form builders and the AbacatePay integration lifecycle.',
                    'pt' => 'Resolvendo as complexidades de construtores de formulários multi-tenant e o ciclo de vida de integração do AbacatePay.'
                ],
                'content' => [
                    'en' => <<<'EOD'
# Formly: Engineering a Scalable SaaS

Building a SaaS platform in the LATAM region presents unique challenges, especially regarding payment localization and contract automation. **Formly** was built to solve these using a modern decoupled architecture.

## The Technical Foundation
Formly utilizes **Laravel 12 (PHP 8.4)** and **React 19** with Vite, creating a snappy, SPA-like experience for end-users while maintaining a robust backend.

### Form Builder Logic
Creating a drag-and-drop builder required a complex state management system to handle:
- **Advanced Control**: Locking form structures after the first response to ensure data integrity.
- **Smart Timers**: Implementing server-side validated countdowns for high-stakes form completion.

## The Payment Engineering Challenge
Integrating **AbacatePay** required deep dives into API versioning logic. 

### AbacatePay v1 vs v2
One of the biggest hurdles was managing the transition between API versions:
- **v1 Mode**: Requires strict validation of the `customer` object, including mandatory `taxId` (CPF/CNPJ). This is ideal for scenarios where the developer wants total control over user data before redirecting.
- **v2 Mode**: Modernizes the flow by delegating data collection to the AbacatePay-hosted page, significantly reducing the surface area for PCI-compliance issues.

### Webhook Reconciliation
To handle multi-version support, we implemented a robust identification strategy:
```php
// Robust detection for v1 and v2 webhooks
$userId = (int) ($event['data']['externalId'] ?? $event['externalId'] ?? 0);
$items = $event['data']['items'] ?? $event['items'] ?? $event['data']['products'] ?? $event['products'] ?? [];
```

*Formly highlights how modern fullstack development isn't just about code, but about handling the business nuances of regional dependencies.*
EOD
,
                    'pt' => <<<'EOD'
# Formly: Arquitetada como um SaaS Escalável

Construir uma plataforma SaaS na região da América Latina apresenta desafios únicos, especialmente em relação à localização de pagamentos e automação de contratos. O **Formly** foi construído para resolver isso usando uma arquitetura moderna e desacoplada.

## A Base Técnica
O Formly utiliza **Laravel 12 (PHP 8.4)** e **React 19** com Vite, criando uma experiência rápida, estilo SPA, para os usuários finais, mantendo um backend robusto.

### Lógica do Construtor de Formulários
Criar um construtor drag-and-drop exigiu um sistema complexo de gerenciamento de estado para lidar com:
- **Controle Avançado**: Bloqueio de estruturas de formulário após a primeira resposta para garantir a integridade dos dados.
- **Timers Inteligentes**: Implementação de contagens regressivas validadas no lado do servidor para preenchimento de formulários de alto risco.

## O Desafio da Engenharia de Pagamentos
A integração com o **AbacatePay** exigiu mergulhos profundos na lógica de versionamento da API.

### AbacatePay v1 vs v2
Um dos maiores obstáculos foi gerenciar a transição entre as versões da API:
- **Modo v1**: Exige validação rigorosa do objeto `customer`, incluindo o `taxId` (CPF/CNPJ) obrigatório. Isso é ideal para cenários onde o desenvolvedor deseja controle total sobre os dados do usuário antes do redirecionamento.
- **Modo v2**: Moderniza o fluxo delegando a coleta de dados para a página hospedada pelo AbacatePay, reduzindo significativamente a área de superfície para questões de conformidade PCI.

### Reconciliação de Webhook
Para lidar com o suporte a múltiplas versões, implementamos uma estratégia de identificação robusta:
```php
// Detecção robusta para webhooks v1 e v2
$userId = (int) ($event['data']['externalId'] ?? $event['externalId'] ?? 0);
$items = $event['data']['items'] ?? $event['items'] ?? $event['data']['products'] ?? $event['products'] ?? [];
```

*O Formly destaca como o desenvolvimento fullstack moderno não é apenas sobre código, mas sobre lidar com as nuances de negócios de dependências regionais.*
EOD
                ],
                'status' => 'Em andamento',
                'publish_date' => '2024-04-18',
                'read_time' => '10 min',
                'tags' => ['SaaS', 'Laravel', 'Fintech', 'React']
            ]
        ];

        foreach ($posts as $post) {
            Post::create($post);
        }
    }
}
