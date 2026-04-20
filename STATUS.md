# STATUS — Mamba Negra

**Ultima actualizacion**: 20 Abril 2026 (HypeAuditor CLI v2 desplegado: cache local automatico 30d, comandos `network` + `pdf` + `cache`, parser `--cached`/`--force`. Endpoints `auditor.creators` y `auditor.{platform}Pdf` verificados gratis post-unlock. Mini Reports confirmado NO expuesto en API — 11 variantes probadas. 94 Analytical Reports restantes. TOOLS.md del Scout actualizado)

---

## PROYECTO DE TRANSFORMACION IA

> **Pivot 17-Mar-2026**: El proyecto evoluciono de un despliegue de agentes a una transformacion integral del negocio con IA en 7 capas.

**Design doc**: `docs/plans/2026-03-17-mamba-negra-ai-transformation-design.md`

### Estructura de 7 Capas
| Capa | Directorio | Contenido |
|------|-----------|-----------|
| 1. Estrategia | `strategy/` | Vision, AI Maturity, Roadmap, OKRs, Process-AI Map, Services |
| 2. Conocimiento | `knowledge/` | Modash playbook, 5 perfiles verticales, scoring, frameworks |
| 3. Adopcion | `adoption/` | Alfabetizacion IA, plan de capacitacion, metricas, rediseno procesos |
| 4. Agentes | `agents/` | openclaw.json, workspaces (Estratega, PM, Admin), n8n workflows |
| 5. Medicion | `measurement/` | KPIs, baseline, reportes |
| 6. Mi Toolkit | `my-toolkit/` | Metodologia, 6 templates reutilizables |
| 7. Drive Sync | `drive-sync/` | Distribucion de docs al equipo via Google Drive |

### Horizonte
- **Meses 1-3**: Cimientos (discovery, adopcion, baseline)
- **Meses 4-6**: Eficiencia (optimizacion medible, servicios IA)
- **Meses 7-12**: Ecosistema (consolidacion, ROI documentado)

---

## DATOS DEL CLIENTE

- **Nombre**: Mamba Negra Latam
- **Tipo**: Agencia de Influencer Marketing
- **Ubicacion**: Colombia
- **Director**: Carlos
- **Proyecto**: Transformacion integral con IA — de agentes a las 5 dimensiones (Estrategia, Operacion, Contenido, Reporting, Cultura)
- **Sistema multi-agente**: 7 agentes (4 estrategia + PM + Admin + Prometeo) — arquitectura V2 desplegada 02-Abr-2026

---

## VM GCP

- **Nombre**: `openclaw-mambanegra`
- **Zona**: `southamerica-west1-a`
- **Tipo**: `e2-medium` (1 vCPU, 4GB RAM)
- **IP externa**: `34.176.239.204`
- **IP interna**: `10.194.0.3`
- **OS**: Ubuntu 24.04 LTS
- **Disco**: 20GB
- **Estado**: **RUNNING** (creada 12-Mar-2026)
- **Proyecto GCP**: `ia-agent-490002` (org: mambanegramkt.com)
- **gcloud config**: `mambanegra` (cuenta: ia@mambanegramkt.com)
- **Dominio**: `mamba.opclaworch.online` (DNS A record → 34.176.239.204)
- **SSH directo**: `ssh -i ~/.ssh/google_compute_engine juanj@34.176.239.204`

### Software instalado en VM
- Node.js v22.22.1 (via fnm)
- npm 10.9.4
- OpenClaw **2026.4.1** (instalacion nativa, sin Docker) — auto-actualizado ~1-Abr-2026. **BREAKING CHANGE**: `tools.exec.security` default cambio a `allowlist`. Fix aplicado: `security: "full"`, `ask: "off"`
- Caddy v2.11.2 (reverse proxy HTTPS)
- gog v0.12.0 (Google Workspace CLI — Drive, Sheets, Docs)
- mcporter v0.7.3 (MCP server manager)
- **hypeauditor CLI v2** (desplegado 14-17 Abr, actualizado 20-Abr-2026) — `/usr/local/bin/hypeauditor` wrapper + `/usr/local/bin/hypeauditor.mjs` Node script. Comandos: search, report (con cache 30d automatico), media, discover, **network** (My Network gratis), **pdf** (PDF oficial HA, 0 creditos si unlocked), **cache** (stats/prune/clear), credits. Cache local en `~/.openclaw/hypeauditor-cache/`. Fuente en repo: `clients/mamba-negra/tools/hypeauditor.mjs`
- **gtrends CLI** (desplegado 11-Abr-2026) — `~/.local/bin/gtrends`. Comandos: interest, compare, related, suggestions. Usado por Radar
- **reel-analyzer CLI** (desplegado 11-Abr-2026) — `~/.local/bin/reel-analyzer`. Comandos: download, analyze, full. Usado por Scout
- **Chromium Playwright** (desplegado 11-Abr-2026) — `~/.cache/ms-playwright/chromium-1217/`. Para OpenClaw browser tool

### Firewall GCP
- `allow-http` — TCP:80 (tag: https-server)
- `allow-https` — TCP:443 (tag: https-server)
- `default-allow-ssh` — TCP:22

### Creditos GCP
- $1,113,530 COP restantes, 90 dias de prueba gratuita
- **BLOQUEADOR**: No se puede "Activar cuenta completa" — `ia@mambanegramkt.com` no tiene `billing.admin` sobre la billing account `014F71-A0D12D-983B50`. Solo `l.zapata@mambanegramkt.com` tiene ese rol. Ver seccion BLOQUEADORES.

---

## SISTEMA MULTI-AGENTE V2 — EN PRODUCCION

> **V1 desplegado**: 16-Mar-2026 (3 agentes). **V2 desplegado**: 02-Abr-2026 (7 agentes).
> **Design doc V1**: `docs/plans/2026-03-13-mamba-negra-multi-agent-design.md`
> **Design doc V2**: `docs/plans/2026-04-02-multi-agent-teams-design.md`

### Arquitectura V2

- **Patron**: Orquestador (hub) + 3 workers especializados (Research, Creative, Influencer) + PM + Admin + Prometeo
- **Comunicacion**: `sessions_spawn` (asincrono, Orquestador lanza workers en paralelo) + `sessions_send` (sincrono, consultas puntuales entre cualquier agente)
- **Subagents config**: `maxSpawnDepth: 1`, `maxChildrenPerAgent: 5`, `maxConcurrent: 12`
- **Principio clave**: Agentes son especialistas por **capacidad**, no por fase. Pueden ser invocados en cualquier momento del proceso.
- **Framework compartido**: `knowledge/campaign-framework.md` (9 fases del ciclo de campana)
- **Knowledge distribuido**: mnl-bible.md (Manual Maestro Carlos), verticals/, scoring, campaign samples — distribuidos a todos los agentes
- **LLM por defecto**: `google/gemini-3.1-pro` con fallback a `google/gemini-2.5-pro`
- **LLM PM y Admin**: `google/gemini-3-flash` con fallback a `google/gemini-2.5-flash`
- **Thinking**: Nivel `low` global. PM tiene `thinkingDefault: off`
- **Dashboard**: https://mamba.opclaworch.online

### Topologia de Comunicacion

```
                    Orquestador
                   /     |     \        (sessions_spawn)
            Research <-> Creative <-> Influencer  (sessions_send)
```

- Orquestador puede spawnear Research, Creative, Influencer en paralelo
- Workers se consultan entre si via sessions_send
- PM, Admin, Prometeo accesibles via sessions_send desde cualquier agente

---

## PILOTO + ONBOARDING AMPLIADO (Abril 2026)

> **Estado**: Piloto inicial CERRADO con retro exitosa. Onboarding equipo ampliado programado 20-Abr-2026.

### Participantes del Piloto
| Rol | Agentes que usa | Notas |
|-----|----------------|-------|
| Estratega (strategist) | Orquestador, Radar, Musa | Flujo de brief → estrategia → contenido |
| CM (Community Manager) | PM, Orquestador | Gestion de tareas, feedback de videos |
| Creativo/a | Musa, Scout | Conceptos creativos, scouting |

### Contexto
- **NO fue un rollout completo** del equipo — fue un despliegue selectivo para 3 personas clave
- Las mejoras V7.0 (04-Abr) y V8.0 (06-07 Abr) fueron **impulsadas por feedback real** de este piloto:
  - V7.0: thinking visible en Telegram, output muy corto, sin modo iterativo, skills no declarados
  - V8.0: agentes sin memoria persistente, LEARNINGS vacios, thinking leak, agentes 100% reactivos
- El piloto funciona como **shadow mode informal**: el equipo usa los agentes en paralelo a su proceso normal

### Retro Piloto (COMPLETADA 09-Abr-2026)
- **Participantes**: 3 usuarios piloto + Juan Jose
- **Resultado**: OK — feedback recogido, fase validada, ajustes a agentes consolidados en V8.0/Scout V2
- **Docs**: `docs/2026-04-09-retro-piloto-agenda.md`, `docs/2026-04-09-resumen-proyecto-piloto.md`

### Sesion Carlos + Memo (13-Abr-2026) — COMPLETADA
- **Resultado**: Presupuesto aprobado. HypeAuditor Starter $762 autorizado (ejecutado 14-Abr). Gemini Tier 2 encuadrado (posteriormente Google subio a **Tier 3** — 19-Abr)
- **Docs**: `docs/2026-04-13-memo-carlos.md`, `docs/2026-04-13-guion-carlos.md`, `docs/2026-04-13-talking-points-equipo.md`
- **3 palancas validadas**: (1) propuesta diferenciada con demographics+brand safety, (2) velocidad comercial brief→propuesta en horas, (3) escalamiento sin romper al equipo

### Sesion CMs de Expectativa (previa onboarding) — COMPLETADA
- **Objetivo**: Alinear expectativas antes del onboarding formal
- **Resultado**: OK — CMs entraron en expectativa positiva

### Onboarding Equipo Ampliado (PROGRAMADO 20-Abr-2026)
- **Objetivo**: Presentar los 7 agentes + flujos de trabajo propuestos al equipo ampliado
- **Docs**: `docs/2026-04-16-presentacion-equipo-v3.md`, `docs/TELEGRAM-GROUPS-ONBOARDING.md`
- **Output esperado**: Pairing equipo en bots, primeros casos de uso reales fuera del piloto

---

### AGENTES (7)

| ID | Nombre | Bot Telegram | Modelo | Rol |
|----|--------|-------------|--------|-----|
| orquestador | Orquestador (ex-Estratega) | @StrategyMambabot | google/gemini-3.1-pro | Coordinacion, briefs, entregas (pasos 1-3, 10-12). Usa sessions_spawn |
| research | Radar | @RadarMambaBot | google/gemini-3.1-pro | Investigacion de mercado, datos, analisis competitivo |
| creative | Musa | @CreativeMambaBot | google/gemini-3.1-pro | Insights, conceptos, ideas de contenido |
| influencer | Scout | @ScoutMambaBot | google/gemini-3.1-pro | Busqueda de influencers, scoring, copy comercial |
| pm | PM | @PMMambabot | google/gemini-3-flash | Timelines, tareas, entregas |
| admin | Admin | @AdmonMambaBot | google/gemini-3-flash | Contratos, pagos |
| prometeo | Prometeo | @PrometeoMNBot | google/gemini-3.1-pro | Tecnico/dev |

### Bots de Telegram

| Agente | Bot | Token var | Estado |
|--------|-----|-----------|--------|
| Orquestador | @StrategyMambabot | `TELEGRAM_BOT_TOKEN_ESTRATEGA` | ACTIVO, pareado |
| Radar (Research) | @RadarMambaBot | `TELEGRAM_BOT_TOKEN_RESEARCH` | ACTIVO |
| Musa (Creative) | @CreativeMambaBot | `TELEGRAM_BOT_TOKEN_CREATIVE` | ACTIVO |
| Scout (Influencer) | @ScoutMambaBot | `TELEGRAM_BOT_TOKEN_INFLUENCER` | ACTIVO |
| PM | @PMMambabot | `TELEGRAM_BOT_TOKEN_PM` | ACTIVO, pareado |
| Admin | @AdmonMambaBot | `TELEGRAM_BOT_TOKEN_ADMIN` | ACTIVO, pareado |
| Prometeo | @PrometeoMNBot | `TELEGRAM_BOT_TOKEN_PROMETEO` | ACTIVO |

**Usuario pareado**: Juan Jose (Telegram ID: 6107170400)

### TELEGRAM GROUPS

- **Modo**: Forum (Topics) — cada campana = un topic nuevo
- **Grupo activo**: "MNL Strategy Team" (compartido) — Mar + Mae + 7 bots + Carlos (opcional)
- **Grupos pendientes**: "Mar - Strategy Room" (personal), "Mae - Strategy Room" (personal)
- **Routing**: @mencion va al bot correcto. Sin @mencion → Orquestador responde (es default)
- **Config**: `groupPolicy: "open"`, `groupAllowFrom: ["6107170400"]`, `groups: { "*": { "requireMention": true } }`
- **Requisito**: `/setprivacy` Disable en BotFather para cada bot antes de agregarlo a grupos. Si se cambio privacy despues de agregar, remover y re-agregar el bot al grupo.

### Tools y Skills por Agente

| Agente | Tools | Skills |
|--------|-------|--------|
| Orquestador | sessions_spawn, sessions_send, gog, Notion, Tavily (5 tools) | brief-to-strategy, competitor-analysis, challenge-diagnostic, self-improving-agent, agent-team-orchestration, skill-vetter, mcporter |
| Radar (Research) | sessions_send, gog, Tavily (5 tools: search, research, extract, crawl, map) | competitor-analysis, market-research, mcporter |
| Musa (Creative) | sessions_send, gog | insight-builder, concept-builder, content-guidelines, brand-voice-builder, event-concept, methodology-selector, mcporter |
| Scout (Influencer) | sessions_send, gog, Tavily | scouting-shortlist, mcporter |
| PM | sessions_send, gog, Notion (mcporter — DB creation habilitado v1.9.1) | healthcheck, skill-creator, tmux, weather, mcporter |
| Admin | sessions_send, gog | mcporter |
| Prometeo | sessions_send | mcporter |

### Tavily Tools (5 — documentados en TOOLS.md de cada agente que los tiene)

| Tool | Funcion |
|------|---------|
| tavily-search | Busqueda web con IA |
| tavily-extract | Extraccion de contenido de URLs |
| tavily-crawl | Crawl de sitios web |
| tavily-map | Mapa de sitio |
| tavily-research | Investigacion profunda con IA |

### Gemini API Keys (Google AI Studio, proyecto 922302496243)

| Nombre | Agente/Uso |
|--------|------------|
| Mambabot Agent | Gateway principal (en .env como GEMINI_API_KEY) |
| PM Mamba | Respaldo |
| Admin Mamba | Respaldo |

**Tier**: **Gemini API Tier 3 aprobado por Google** (19-Abr-2026). Limites superiores a Tier 2, habilita volumen de uso del equipo ampliado post-onboarding.

### HypeAuditor (aprobado + activo)

- **Plan**: Customer Starter Monthly + Story Tracking
- **Precio**: $762 USD/mes
- **Aprobado por Carlos**: 14-Abr-2026 | **API activa**: 17-Abr-2026 tarde (post soporte)
- **Account ID**: `2705001`
- **Credenciales VM**: `~/.openclaw/.env` (`HYPEAUDITOR_ID` + `HYPEAUDITOR_TOKEN`) — fuente de verdad
- **Asesora comercial**: Paula (florez-estrada@hypeauditor.com)
- **Limites mensuales**:
  - 100 Analytical Reports + 1500 Mini Reports + 3000 Emails
  - 5000 Discovery results + 5 AI Scout searches (API comparte creditos con web)
  - 25 campanas activas + 500 influencers + 3000 My Network
  - 30 exports x 300 rows
- **API verificada (20-Abr)**: `auditor.suggester` (gratis), `auditor.report v=2` (**94 creditos restantes**), `auditor.tiktok`, `auditor.reportMedia` (post-unlock), `auditor.search` Discovery (1000 queries), **`auditor.creators`** (gratis — My Network CRM metadata), **`auditor.{instagram/tiktok/youtube/twitter/twitch/snapchat}Pdf`** (0 creditos post-unlock, async)
- **Mini Reports NO en API**: 11 variantes de endpoint probadas (miniReport, reportMini, quickReport, liteReport, etc.) — todas `code 3 Unknown method`. Params `type=mini`/`mini=1` se ignoran. Los 1500/mes del plan son solo feature UI web.
- **Pendiente aclarar con Paula**: contrato `auditor.tiktokMedia` (code 8), discrepancia queries_left=1000 vs factura 5000/mes, confirmar oficialmente que Mini Reports no tiene endpoint REST

### Agente 1: Orquestador (ex-Estratega)

- **Rol**: Coordinador central — interpreta briefs, decide que agentes invocar, sintetiza resultados, compila entregas
- **Bot Telegram**: @StrategyMambabot
- **Fases**: 1-3 (Brief, Estrategia, Research dispatch), 10-12 (Compilacion, Feedback, Entrega)
- **Workspace repo**: `workspaces/estratega/`
- **Workspace VM**: `~/.openclaw/workspace/estratega/`
- **sessions_spawn a**: Research, Creative, Influencer (paralelo)
- **sessions_send a**: PM, Admin, Prometeo
- **Google Sheets (gog)**: Lee briefs de campana del Google Form via Sheet `1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw`
- **Skills**: brief-to-strategy (rediseñado — coordina en vez de ejecutar todo), mcporter
- **Tools**: sessions_spawn, sessions_send, gog (Drive/Sheets/Docs), Notion (mcporter), Tavily (5 tools)
- **Es default**: Si nadie es mencionado en un grupo, responde el

### Agente 2: Radar (Research)

- **Rol**: Especialista en investigacion, datos, contexto de mercado, analisis competitivo
- **Bot Telegram**: @RadarMambaBot
- **Workspace repo**: `workspaces/research/`
- **Workspace VM**: `~/.openclaw/workspace/research/`
- **sessions_send a**: Creative, Influencer
- **Skills**: competitor-analysis (migrado de Estratega), market-research, mcporter
- **Tools**: sessions_send, Tavily (5 tools), gog (Drive)
- **NO tiene**: sessions_spawn (es worker)

### Agente 3: Musa (Creative)

- **Rol**: Especialista en pensamiento creativo, insights, conceptos, ideas de contenido
- **Bot Telegram**: @CreativeMambaBot
- **Workspace repo**: `workspaces/creative/`
- **Workspace VM**: `~/.openclaw/workspace/creative/`
- **sessions_send a**: Research, Influencer
- **Skills**: insight-builder, concept-builder, mcporter
- **Tools**: sessions_send, gog (Drive)
- **NO tiene**: sessions_spawn, Tavily

### Agente 4: Scout (Influencer)

- **Rol**: Especialista en busqueda, scoring, evaluacion y copy comercial de influencers. Orquesta 3 workers para flujos de scouting end-to-end (Scout V2 desplegado 18-Abr).
- **Bot Telegram**: @ScoutMambaBot
- **Workspace repo**: `workspaces/influencer/`
- **Workspace VM**: `~/.openclaw/workspaces/influencer/`
- **sessions_send a**: Research, Creative
- **sessions_spawn a**: scout-discovery, scout-report, scout-video (workers V2)
- **Skills**: `scouting-shortlist` (V2 — evaluacion individual cuando ya hay perfiles), `scouting-team` (V1.0 — Flujo Z completo desde brief con workers paralelos, desplegado 18-Abr), mcporter
- **Tools**: sessions_spawn + sessions_send, Tavily (background check), gog (Sheets/Drive), `hypeauditor` CLI v2 (search/discover/report/media/**network**/**pdf**/**cache**/credits — con cache local 30d), `reel-analyzer` CLI
- **Plantilla Sheets V2**: ID `1cIcbnvb6IXqEb76p4ezgzvcBrtOL3KTwk1uDQjUjk3E` — copia por campaña, 3 tabs nuevos (ESTRATEGIA & CRITERIOS SCOUT, DISCOVERY, FINALISTAS DEEP DIVE) + los 5 tabs originales de propuesta comercial. Integrada con Campaign Strategy Index (actualiza cols I Criterios Scouting + J Shortlist al cierre).

#### Workers del equipo Scout V2 (desplegados 02-Abr, reforzados 18-Abr)

| Worker ID | Rol | Modelo | Guardrails |
|---|---|---|---|
| `scout-discovery` | Búsqueda masiva + rankeo preliminar | Flash | `cm_approved_by` obligatorio en task, max 2 páginas default, abort si `queries_left < 50`, filtros mínimos obligatorios |
| `scout-report` | Deep dive de 1 perfil + BGC + copy comercial | Pro | 1 Analytical Report + 3 Tavily. `hypeauditor media` opcional (0 cred) para validar ER reciente |
| `scout-video` | Análisis de 1 video vs brief | Pro | 0 créditos HA (solo Gemini Video) |

#### Flujo Z — skill `scouting-team`

1. **STEP 0 (gate)**: verifica Campaign Strategy Index col D = "Aprobada". Si no, aborta y escala a Estratega
2. **STEP 1**: lee doc consolidado de Drive (MAMBA TRACK / Strategic-Thinking / Estrategia), hereda al BLOQUE 1 del Tab ESTRATEGIA & CRITERIOS SCOUT. Deriva criterios cuantitativos. **CHECKPOINT 1** humano (CM valida criterios, no la estrategia)
3. **STEP 2**: spawnea `scout-discovery`. Escribe resultados en Tab DISCOVERY. **CHECKPOINT 2** humano (CM llena cols K/L/M: ¿Finalista?, Fit cualitativo, Notas)
4. **STEP 3**: spawnea N×`scout-report` + M×`scout-video` en paralelo. Consolida en Tab FINALISTAS DEEP DIVE
5. **STEP 4**: entrega copy comercial al CM + actualiza Campaign Strategy Index

**Regla dura**: el "Fit cualitativo" NO se auto-calcula. Lo llena el CM abriendo los perfiles — expertise humana que se facilita con data cuantitativa, no se reemplaza.

### Agente 5: PM — Project Manager

- **Rol**: Asistente IA de gestion de proyectos
- **Bot Telegram**: @PMMambabot
- **Workspace repo**: `workspaces/pm/` (7 archivos: AGENTS.md V3, SOUL.md V1.2, USER.md, IDENTITY.md, TOOLS.md V4, MEMORY.md, HEARTBEAT.md)
- **Workspace VM**: `~/.openclaw/workspace/pm/`
- **sessions_send a**: Orquestador, Research, Creative, Influencer, Admin, Prometeo
- **Notion MCP**: Configurado via mcporter — workspace personal Juan Jose (temporal)
- **Google Drive/Sheets/Docs**: gog con OAuth ia@mambanegramkt.com
- **Skills**: mcporter, gog, healthcheck, skill-creator, tmux, weather
- **Memoria**: Instruccion de guardar/consultar memoria entre sesiones

### Agente 6: Admin — Asistente Administrativo

- **Rol**: Asistente IA de gestion financiera y administrativa
- **Bot Telegram**: @AdmonMambaBot
- **Workspace repo**: `workspaces/admin/` (AGENTS.md V2, SOUL.md V1.1, USER.md, MEMORY.md)
- **Workspace VM**: `~/.openclaw/workspace/admin/`
- **sessions_send a**: Orquestador, PM, Research, Creative, Influencer, Prometeo

### Agente 7: Prometeo — Tecnico/Dev

- **Rol**: Asistente tecnico y de desarrollo
- **Bot Telegram**: @PrometeoMNBot
- **Workspace repo**: `workspaces/prometeo/` (AGENTS.md V1, SOUL.md, USER.md, IDENTITY.md, TOOLS.md, MEMORY.md, HEARTBEAT.md)
- **Workspace VM**: `~/.openclaw/workspace/prometeo/`
- **sessions_send a**: Orquestador, PM, Admin, Research, Creative, Influencer

---

## DASHBOARD WEB

- **URL**: https://mamba.opclaworch.online
- **Autenticacion**: Token via URL fragment (`#token=...`)
- **Gateway token**: En `.env` de la VM como `OPENCLAW_GATEWAY_TOKEN`
- **Reverse proxy**: Caddy v2.11.2 (HTTPS automatico con Let's Encrypt)
- **Device auth**: `dangerouslyDisableDeviceAuth: true` (temporal — reactivar con pairing correcto)
- **Caddyfile**: `/etc/caddy/Caddyfile`

---

## ESTRUCTURA EN VM

```
~/.openclaw/
├── openclaw.json          # Config central (7 agentes, plugins, bindings, subagents)
├── .env                   # Tokens (7 bots) y API keys (chmod 600)
├── openclaw.json.bak      # Backup del doctor
├── workspace/
│   ├── estratega/         # Orquestador (ex-Estratega)
│   │   ├── AGENTS.md      # Coordinacion + pasos 1-3, 10-12
│   │   ├── SOUL.md        # Directo, estrategico, colombiano
│   │   ├── USER.md
│   │   ├── TOOLS.md       # sessions_spawn + gog + Notion + Tavily
│   │   ├── MEMORY.md      # Semilla de memoria
│   │   └── knowledge/     # campaign-framework.md, mnl-bible.md
│   ├── research/          # Radar — Investigacion
│   │   ├── AGENTS.md      # Especialista investigacion
│   │   ├── SOUL.md        # Analitico, riguroso, cita fuentes
│   │   ├── TOOLS.md       # Tavily + gog + sessions_send
│   │   └── skills/        # competitor-analysis, market-research
│   ├── creative/          # Musa — Creatividad
│   │   ├── AGENTS.md      # Especialista creativo
│   │   ├── SOUL.md        # Propositivo, opinado
│   │   ├── TOOLS.md       # gog + sessions_send
│   │   ├── knowledge/     # campaign-framework.md, brands/
│   │   └── skills/        # insight-builder, concept-builder
│   ├── influencer/        # Scout — Influencers
│   │   ├── AGENTS.md      # Especialista influencers
│   │   ├── SOUL.md        # Data-driven, criterio cualitativo
│   │   ├── TOOLS.md       # Tavily + gog + sessions_send
│   │   └── skills/        # scouting-shortlist
│   ├── pm/
│   │   ├── AGENTS.md      # V3 — reportes VP + feedback videos
│   │   ├── SOUL.md        # V1.2 — regla no-razonamiento
│   │   ├── USER.md
│   │   ├── IDENTITY.md    # PM, 📋
│   │   ├── TOOLS.md       # Guia gog + Notion + sessions_send
│   │   ├── MEMORY.md      # Semilla de memoria
│   │   ├── HEARTBEAT.md   # Checkpoints proactivos al iniciar sesion (V8.0)
│   │   └── memory/        # Logs diarios (auto-creado)
│   ├── admin/
│   │   ├── AGENTS.md      # V2 — flujo de caja + memoria
│   │   ├── SOUL.md        # V1.1
│   │   ├── USER.md
│   │   └── MEMORY.md
│   ├── prometeo/
│   │   ├── AGENTS.md      # V1
│   │   ├── SOUL.md
│   │   ├── USER.md
│   │   ├── IDENTITY.md
│   │   ├── TOOLS.md
│   │   ├── MEMORY.md
│   │   └── HEARTBEAT.md
│   └── knowledge/
│       └── campaign-framework.md  # 9 fases compartidas
├── agents/                # Sessions y estado (auto-creado por OpenClaw)
├── credentials/           # Pairing data (auto-creado)
└── canvas/                # Dashboard assets (auto-creado)
```

---

## PROGRESO — CHECKLIST COMPLETO

**Infraestructura (completado 12-Mar-2026)**:

1. [x] Configurar gcloud CLI con cuenta mambanegra
2. [x] Habilitar Compute Engine API en proyecto `ia-agent-490002`
3. [x] Crear VM GCP `openclaw-mambanegra` (e2-medium, 4GB RAM, Ubuntu 24.04)
4. [x] Instalar Node.js v22 via fnm en la VM
5. [x] Instalar OpenClaw globalmente via npm
6. [x] Crear bot de Telegram (Estratega) via BotFather
7. [x] Generar Gemini API Key en Google AI Studio
8. [x] Diseno de despliegue aprobado

**Multi-Agente — Diseño (completado 13-Mar-2026)**:

9. [x] Reunion con MNL — definicion de 3 agentes y prioridades
10. [x] Design doc multi-agente aprobado
11. [x] Documento informativo creado (MULTI-AGENT-OVERVIEW.md)
12. [x] Crear `campaign-framework.md` (9 fases, documento compartido)
13. [x] Crear workspace PM (AGENTS.md, SOUL.md, USER.md)
14. [x] Evolucionar Estratega V0 → V1 (framework awareness + sessions_send)
15. [x] Crear workspace Admin (AGENTS.md, SOUL.md, USER.md)
16. [x] Actualizar `openclaw.json` con 3 agentes + bindings + subagents

**Despliegue (completado 16-Mar-2026)**:

17. [x] Crear bot Telegram para PM (@PMMambabot)
18. [x] Crear bot Telegram para Admin (@AdmonMambaBot)
19. [x] Crear .env con tokens en la VM
20. [x] Subir openclaw.json + 3 workspaces + knowledge a la VM
21. [x] Arrancar gateway (nohup, pendiente migrar a systemd estable)
22. [x] Verificar con `openclaw doctor`
23. [x] Pairing de Juan Jose en los 3 bots (Telegram ID: 6107170400)
24. [x] Test basico: los 3 bots responden en Telegram
25. [x] Cambiar modelo a `google/gemini-3.1-pro`
26. [x] Corregir rol Estratega: "asistente IA" (no "jefe")
27. [x] Configurar thinking level `low` + regla no-mostrar-razonamiento
28. [x] Configurar dominio `mamba.opclaworch.online` con Caddy HTTPS
29. [x] Abrir puertos 80/443 en firewall GCP
30. [x] Dashboard web accesible y funcional
31. [x] Actualizar OpenClaw a v2026.3.13
    [x] Actualizar OpenClaw a v2026.3.28 (30-Mar-2026)

**Setup PM completo (16-Mar-2026)**:

32. [x] Instalar gog v0.12.0 (Google Workspace CLI) en VM
33. [x] Configurar OAuth Desktop App en GCP (proyecto 922302496243)
34. [x] Autenticar gog con ia@mambanegramkt.com (drive, sheets, docs)
35. [x] Configurar Notion MCP via mcporter (workspace personal Juan Jose)
36. [x] Configurar skills.entries.gog en openclaw.json (env vars GOG_KEYRING_PASSWORD, GOG_ACCOUNT)
37. [x] Crear IDENTITY.md, TOOLS.md, MEMORY.md, HEARTBEAT.md para PM
38. [x] Actualizar SOUL.md PM V1.1 (regla no-razonamiento + formato Telegram)
39. [x] Actualizar AGENTS.md PM V1.1 (gestion de memoria entre sesiones)
40. [x] Desplegar todos los workspace files a la VM
41. [x] Fix: remover providerOverride github-copilot de sesion PM (causaba loop de error)

**Integracion Notion workspace real MNL (16-Mar-2026)**:

42. [x] Obtener token de integracion interna del workspace de Maria Camila Skinner
43. [x] Actualizar mcporter.json con token del workspace MNL (ntn_35079...)
44. [x] Verificar acceso API — pagina raiz "Mamba Negra Latam" accesible
45. [x] Mapear 19 databases: 9 TRAFICO + 9 SOLICITUD + Calendario
46. [x] Verificar queries funcionales contra todas las databases
47. [x] Extraer directorio del equipo (8 user IDs de Notion) desde tareas asignadas
48. [x] Reescribir TOOLS.md V2: IDs verificados, tipos de campos corregidos (people, no select), comandos mcporter exactos, directorio del equipo
49. [x] Desplegar TOOLS.md V2 a la VM
50. [x] Test E2E: PM crea tarea en SOLICITUD Creative con asignacion a persona — FUNCIONAL
51. [x] Crear PM-VALUE-ANALYSIS.md (5 funciones de valor, metricas, roadmap)

**Video Feedback Tracker (30-Mar-2026)**:

52. [x] Disenar sistema de feedback de videos (design doc: `docs/plans/2026-03-29-video-feedback-tracker-design.md`)
53. [x] Crear carpeta "Content FeedBack" en Drive (folder ID: `1qKtpII3ngIRurQx8Gnk-_XxNhjyMDDJc`)
54. [x] Crear Feedback Index MNL (Sheet ID: `1i2ZiPau3dZF1WZJdwmd3F4nO_676_7Npx1KBQRruQO0`)
55. [x] Crear Sheet "Feedback - PepsiCo Copa Sabores" (Sheet ID: `1DkBsfzXYCPR4oACD3KxR-Q6aA7buEt3BL9oWVZPSmWk`)
56. [x] Actualizar AGENTS.md PM V3: dominio 8 (Gestion Feedback Videos) + caso de uso 4
57. [x] Actualizar TOOLS.md PM V4: Workflow 6 (feedback videos, Index-first pattern)
58. [x] Actualizar SOUL.md PM V1.2: instruccion reforzada anti-thinking en texto
59. [x] Deploy a VM + restart gateway — PM Bot responde correctamente
60. [x] Test E2E: feedback registrado y consultado por Telegram — FUNCIONAL

**Optimizacion de modelos (30-Mar-2026)**:

61. [x] PM y Admin: modelo cambiado a `google/gemini-3-flash` (ahorro API)
62. [x] PM: thinkingDefault set to `off` (requiere OpenClaw >= 2026.3.28)
63. [x] AGENTS.md PM: instruccion de minimizar tool calls agregada
64. [ ] Pendiente: configurar timezone Colombia (UTC-5) para todos los agentes

**V7.0 Upgrade (04-Abr-2026)**:

71. [x] Thinking fix: OUTPUT FORMAT section en 7 SOUL.md (bloquea `<think>`, XML tags)
72. [x] MODO RAPIDO vs MODO ENTREGA en 4 AGENTS.md (estratega, creative, research, influencer)
73. [x] Modo iterativo con checkpoints humanos (seccion 2.10 en Orquestador)
74. [x] 14 skills custom declarados por agente en openclaw.json
75. [x] 5 skills enriquecidos con prompts del Notion "Banco de Prompts"
76. [x] 5 skills nuevos creados (challenge-diagnostic, content-guidelines, brand-voice-builder, event-concept, methodology-selector)
77. [x] Research TOOLS.md: 5 herramientas Tavily documentadas (tavily_research = modo Perplexity)
78. [x] Drive consolidation protocol distribuido a 6 agentes
79. [x] campaign-corrections.md (12 reglas de Mar) como knowledge del Orquestador
80. [x] contextTokens reducido a 500K + compaction.memoryFlush + contextPruning cache-ttl + userTimezone
81. [x] Manual del equipo: docs/MANUAL-AGENTES-MNL.md
82. [x] NotebookLM: "Manual de Agentes — Mamba Negra Latam" (5 fuentes)

**Notion DB Creation + Self-Improvement + USER.md (05-06 Abr 2026)**:

83. [x] mcporter.json: pin @notionhq/notion-mcp-server@1.9.1 (v2.x bloquea create-a-database)
84. [x] PM TOOLS.md: documentacion API-create-a-database + page_id raiz corregido
85. [x] Self-improving agent: .learnings/ creados + instrucciones en 7 AGENTS.md
86. [x] USER.md self-editing: instrucciones en 7 AGENTS.md para modificar preferencias
87. [x] Sync VM → local → mamba-negra repo + push a GitHub (commit bc10e61)
88. [x] STATUS.md actualizado con V7.0 + sesion 05-06 Abr

**V8.0 Upgrade (06-07 Abr 2026)**:

89. [x] P1: Memoria inmediata — agentes guardan en memory/ DURANTE la conversacion con tags destilados
90. [x] P2: OUTPUT FORMAT anti-thinking-leak reforzado en 7 SOUL.md
91. [x] P3: LEARNINGS write-then-confirm — protocolo fusionado con promocion (3+ → SOUL/AGENTS/TOOLS)
92. [x] P4: Cierre proactivo de sesion — resumen + memoria + pendientes + proximo paso
93. [x] P5: Team-directory en TOOLS.md — IDs de Telegram del equipo en cada agente
94. [x] P6: HEARTBEAT.md universal — checkpoints proactivos para los 7 agentes (antes solo PM)
95. [x] P7: Cross-notification — Orquestador notifica a otros agentes con info estrategica nueva
96. [x] P8: Neutralizar memory flush — PM ignora conversation dumps automaticos
97. [x] Code review fixes: numeracion duplicada, LEARNINGS viejo eliminado, boilerplate limpiado

**Tavily + Competitor Analysis + Google Form Briefs (30-Mar-2026)**:

65. [x] Registrar Tavily MCP en mcporter.json (search, extract, map, crawl — 1,000 creditos/mes gratis)
66. [x] Crear skill `competitor-analysis` para Estratega (Tavily + SWOT + 5 pasos)
67. [x] Actualizar TOOLS.md Estratega V2: Tavily + Google Form briefs (Sheet ID, mapeo 29 cols, 3 comandos gog)
68. [x] Actualizar brief-to-strategy SKILL.md: nuevo input "revisa el ultimo brief del formulario" (listar A:D → leer fila)
69. [x] Deploy TOOLS.md + SKILL.md + competitor-analysis a VM + restart gateway
70. [ ] Pendiente: test E2E — enviar "Revisa el ultimo brief del formulario" al Estratega por Telegram

---

## INVENTARIO DE 7 CAPAS (Post-Review 17-Mar-2026)

### Capa 1: Estrategia (`strategy/`)
| Archivo | Estado | Notas |
|---------|--------|-------|
| VISION.md | Creado | Norte a 12 meses, pendiente validacion Carlos |
| AI-MATURITY.md | Creado | Assessment 5 dimensiones, pendiente baseline real |
| ROADMAP.md | Creado | 3 fases (3m/6m/12m), pendiente validacion Carlos |
| OBJECTIVES.md | Creado | OKRs por trimestre |
| PROCESS-AI-MAP.md | Creado | 9 fases mapeadas: hoy vs 3m vs 6m |
| SERVICES.md | Creado | Servicios IA para clientes (Fase 2+) |

**Veredicto**: 6/6 archivos. Contenido solido, pendiente validacion con Carlos.

### Capa 2: Conocimiento (`knowledge/`)
| Archivo | Estado | Notas |
|---------|--------|-------|
| campaign-framework.md | V1 | 9 fases del ciclo de campana |
| campaign-process.md | V1 | Flujo operacional — pendiente actualizar con 2 flujos reales (Strategy + CM) |
| influencer-scoring.md | V1 | Criterios cuanti/cuali — pendiente actualizar con criterios reales de encuesta |
| modash-playbook.md | V1 | Referencia historica — Modash descartado, plataforma actual es HypeAuditor |
| strategy-workflow.pdf | Creado | Flujo Strategy team: 12 pasos, RAYO/ARCO/PRISMA/MAREA, metodologia investigacion, banco de prompts |
| README.md | V1.1 | Indice actualizado con nuevos archivos |
| verticals/ (5 archivos) | V1 | consumo-masivo, belleza, inmobiliario, calzado, servicios |
| campaign-samples/ (3 archivos) | Creado | Manimoto Chocolate, Detodito Proteina (strategic thinkings), Acetaminofen MK (brief) |
| brands/_template.md | Creado 29-Mar | Template de brand voice profile |
| brands/ejemplo-farmaceutico-otc.md | Creado 29-Mar | Ejemplo: Noraver Gripa |
| Research/ (4 PDFs) | Referencia | Papers de IA en agencias, KPIs, agentic enterprise |
| **Plantilla Scouting V2 (Google Sheets)** | **NUEVO 18-Abr** | ID `1cIcbnvb6IX...` — copia por campana con 3 tabs nuevos (ESTRATEGIA & CRITERIOS, DISCOVERY, FINALISTAS DEEP DIVE) + 5 tabs originales propuesta comercial |

**Veredicto**: 16 archivos + 4 PDFs + 3 campaign samples + 2 brand voice + plantilla scouting V2. Pendiente migrar playbook de Modash → HypeAuditor.

### Capa 3: Adopcion (`adoption/`)
| Archivo | Estado | Notas |
|---------|--------|-------|
| AI-LITERACY.md | Creado | Programa 3 niveles por rol |
| TRAINING-PLAN.md | Creado | Plan de capacitacion diferenciado |
| ADOPTION-METRICS.md | Creado | Metricas de adopcion y senales de alarma |
| PROCESS-REORG.md | Creado | Rediseno de procesos con IA |
| **DISCOVERY-FINDINGS.md** | **NUEVO** | Analisis consolidado: encuesta (5 resp) + docs Strategy + baseline validado |
| workshops/discovery-sessions.md | Creado | Guia de discovery (migrado de FASE1A-DISCOVERY.md) |

**Veredicto**: 6 archivos. Discovery COMPLETADO (26-Mar-2026). Baseline validado. Pendiente ejecutar workshops con el equipo.

### Capa 4: Agentes (`agents/`)
| Archivo | Estado | Notas |
|---------|--------|-------|
| openclaw.json | Desplegado | **7 agentes**, memorySearch + memoryFlush activos, sessions_spawn + sessions_send, Telegram Groups |
| .env.example | Actualizado | 7 bot tokens documentados con bot handles y fechas |
| HANDOFF-PROTOCOL.md | Creado | Protocolo de handoff entre agentes: flujo de campana, tabla de handoffs |
| ONBOARDING-NORAVER.md | Creado | Caso practico onboarding con Noraver Gripa (script para Semana 4) |
| workspaces/estratega/ | Refactorizado | **Orquestador**: coordinacion + sessions_spawn + brief-to-strategy rediseñado |
| workspaces/research/ | **NUEVO** | **Radar**: investigacion, Tavily, competitor-analysis (migrado), market-research |
| workspaces/creative/ | **NUEVO** | **Musa**: creatividad, insight-builder, concept-builder, brand voice |
| workspaces/influencer/ | **NUEVO** | **Scout**: influencers, scouting-shortlist, scoring, copy comercial |
| workspaces/pm/ | 7 archivos | **AGENTS.md V3** (reportes VP + feedback videos), **SOUL.md V1.2**, USER.md, IDENTITY.md, **TOOLS.md V4**, MEMORY.md, HEARTBEAT.md |
| workspaces/admin/ | 4 archivos | **AGENTS.md V2** (flujo de caja + memoria), SOUL.md V1.1, USER.md, **MEMORY.md** |
| workspaces/prometeo/ | 7 archivos | AGENTS.md V1, SOUL.md, USER.md, IDENTITY.md, TOOLS.md, MEMORY.md, HEARTBEAT.md |
| mcp-servers/modash-mcp/ | Archivado | MCP server construido pero descartado — plataforma actual es HypeAuditor |
| **tools/hypeauditor.mjs** | **v2 — 20 Abr** | CLI con 9 comandos: search/report/media/discover/**network**/**pdf**/**cache**/credits. Cache local automatico 30d (`~/.openclaw/hypeauditor-cache/`). Relecturas 0 creditos. PDF oficial 0 creditos post-unlock. Desplegado en `/usr/local/bin/hypeauditor` |
| **tools/gtrends.py** | **NUEVO 11-Abr** | CLI Google Trends. Desplegado en `~/.local/bin/gtrends`. Usado por Radar |
| **tools/reel-analyzer.py** | **NUEVO 11-Abr** | CLI yt-dlp + Gemini Video. Desplegado en `~/.local/bin/reel-analyzer`. Usado por Scout |
| **Scout V2 workers** | **NUEVO 18-Abr** | scout-discovery, scout-report, scout-video — spawneados por skill `scouting-team` |
| n8n-workflows/README.md | Placeholder | Vacio — workflows planeados para Fase 1C |

**Veredicto**: **Arquitectura V2 con 7 agentes + Scout V2 con sub-workers**. Orquestador coordina via sessions_spawn. 3 workers estrategia (Research, Creative, Influencer) + 3 workers scouting (discovery/report/video). PM V3, Admin V2, Prometeo. **memorySearch activo**. Tavily MCP (1,000/mes gratis). **HypeAuditor CLI activo** con 100 reports + 5000 discovery/mes. gtrends + reel-analyzer + browser tool desplegados. Telegram Groups con Topics configurados.

### Capa 5: Medicion (`measurement/`)
| Archivo | Estado | Notas |
|---------|--------|-------|
| KPIs.md | Creado | Framework de 4 categorias de impacto |
| BASELINE.md | Creado | Template para encuesta pre-IA al equipo |
| reports/ | Vacio | Se llena despues de primer ciclo de medicion |

**Veredicto**: 2 archivos + directorio. Framework listo, pendiente recolectar baseline real.

### Capa 6: Mi Toolkit (`my-toolkit/`)
| Archivo | Estado | Notas |
|---------|--------|-------|
| METHODOLOGY.md | Creado | Discovery > Design > Build > Adopt > Measure |
| agents/researcher.agent.md | Creado | Investiga tendencias IA en marketing |
| agents/report-generator.agent.md | Creado | Genera reportes de avance para Carlos |
| agents/workshop-designer.agent.md | Creado | Disena sesiones de capacitacion |
| skills/mamba-status.md | Creado | Skill para dashboard rapido del proyecto |
| templates/ (6 archivos) | Creados | discovery-session-guide, workshop-agenda, carlos-update, quarterly-review, agent-design-brief, adoption-feedback-survey |

**Veredicto**: 10 archivos. Toolkit completo con 3 agentes + 1 skill + 6 templates. Skills adicionales pendientes (drive-sync, ai-maturity, prep-discovery, quarterly-report).

### Capa 7: Drive Sync (`drive-sync/`)
| Archivo | Estado | Notas |
|---------|--------|-------|
| README.md | V1 | Regla de oro, mapeo repo-to-Drive, frecuencia, formato, proceso |
| exports/ | Vacio | Directorio listo para PDFs temporales pre-subida |

**Veredicto**: Estructura completa. Proceso manual definido (Markdown > PDF > Drive). Pendiente crear carpetas en Google Drive de MNL y primera exportacion.

---

## REVIEW SESSION LOG (17-Mar-2026)

Revision completa del repositorio post-reestructuracion en 7 capas.

### Cambios realizados en esta sesion
1. **Admin SOUL.md V1 > V1.1**: Agregada regla no-mostrar-razonamiento y reglas de formato Telegram (consistencia con PM y Estratega)
2. **.env.example actualizado**: Bot tokens ya no dicen "PENDING" — documentan handles (@StrategyMambabot, @PMMambabot, @AdmonMambaBot) y fechas de creacion
3. **STATUS.md ampliado**: Agregado inventario completo de 7 capas con veredicto por capa, review session log, y P0 tecnico para desplegar Admin SOUL.md V1.1

### Hallazgos de la revision
- **openclaw.json**: Correcto. 3 agentes, Gemini 3.1 Pro, Telegram plugin habilitado, bindings correctos, gog skill configurado
- **PM workspace**: El mas completo (7 archivos). TOOLS.md V2 con IDs verificados de Notion, directorio del equipo, comandos mcporter exactos
- **Estratega/Admin workspaces**: Funcionales para V1. USER.md son placeholders (esperado para pre-discovery)
- **drive-sync/README.md**: Bien documentado — regla de oro, mapeo repo>Drive, frecuencia, formato de exportacion, proceso manual
- **drive-sync/exports/**: Directorio ya existia (creado previamente)
- **n8n-workflows/**: Placeholder correcto para Fase 1C

### Acciones pendientes post-review
- [ ] Desplegar Admin SOUL.md V1.1 a la VM via SCP
- [ ] Reiniciar gateway para que tome los cambios del Admin

---

## PENDIENTES INMEDIATOS

### P0 — Onboarding equipo ampliado (20-Abr-2026)
- [ ] **Ejecutar onboarding**: Presentacion de 7 agentes + flujos de trabajo al equipo (mañana, 20-Abr)
- [ ] **Pairing del equipo MNL** en los 7 bots de Telegram (post-onboarding)
- [ ] **Agregar user IDs del equipo** a `groupAllowFrom` en openclaw.json segun se vayan parehando
- [ ] **Capturar feedback inicial** del equipo ampliado primer uso real

### P0 — HypeAuditor integracion completa (en curso)
- [x] Plan Starter $762 comprado — 14-Abr-2026
- [x] API activa + Account ID 2705001 — 17-Abr-2026
- [x] CLI desplegado en VM con 5 comandos (search/report/media/discover/credits)
- [x] Discovery API desbloqueada (1000 queries iniciales)
- [x] Scout V2 desplegado 18-Abr con skill `scouting-team` + 3 workers usando el CLI
- [x] **CLI v2 — 20-Abr**: cache local automatico 30d + comandos `network`, `pdf`, `cache stats/prune/clear`. TOOLS.md del Scout actualizado
- [x] **Confirmado**: Mini Reports NO tiene endpoint REST — 11 variantes probadas
- [ ] **Aclarar con Paula**: contrato exacto `auditor.tiktokMedia` (code 8, 8 variantes probadas)
- [ ] **Aclarar con Paula**: discrepancia queries_left=1000 vs factura "5000/mes"
- [ ] **Aclarar con Paula**: confirmar oficialmente que Mini Reports solo vive en UI web
- [ ] **Evaluar con CMs**: diseño de card MNL-branded (primera aprobacion cliente) — parqueado hasta hablar flujo real con CMs
- [ ] Test E2E completo del flujo Scout V2 con campana real post-onboarding

### P1 — Pendientes tecnicos
- [ ] **Configurar cookies Instagram** (`~/.openclaw/instagram_cookies.txt`) — reel-analyzer requiere para IG (manual, exportar de Chrome local)
- [ ] **Migrar gateway de nohup a systemd estable** (B2 — no sobrevive reboot actualmente)
- [ ] **Configurar timezone Colombia (UTC-5)** para todos los agentes (VM en UTC)
- [ ] **Reactivar device auth** en dashboard (actualmente `dangerouslyDisableDeviceAuth: true`)
- [ ] **Revocar tokens de bots**: Generar nuevos tokens en VM (seguridad post-deploy)

### P1 — Pendientes de Carlos
- [ ] **Google Sheet flujo de caja**: Sheet ID sigue pendiente — Admin Bot espera para conectar via gog
- [ ] **Validar con Carlos**: Vision + Roadmap + AI Maturity Assessment (docs en `strategy/`)
- [x] **Scouting nivel senior**: Scout V2 desplegado 18-Abr — skill scouting-team con workers
- [x] **Reportes para VPs**: PM V3 con framework 4 bloques — desplegado 29-Mar
- [x] **Presupuesto aprobado**: HypeAuditor $762 + Gemini Tier 3 (upgrade Google)

### P1 — Validaciones con equipo
- [ ] **Validar con CMs**: Perfiles por vertical y modash-playbook (despues del onboarding)
- [ ] **Primer reporte asistido por IA**: Target Mes 3 (Mayo) — pendiente campana real con ciclo completo

### P2 — Mejoras
- [ ] Agregar variables de entorno de optimizacion al servicio
- [ ] Implementar pipeline de aprobaciones (Funcion 3 — PM-VALUE-ANALYSIS.md)
- [ ] Implementar scoring de salud de campana (Funcion 4 — PM-VALUE-ANALYSIS.md)
- [ ] Evaluar Honcho (memoria por usuario) para Fase 2 cuando equipo completo use los bots
- [ ] Primera exportacion real a Drive Sync (Capa 7 sigue con `exports/` vacio)

### Completados recientes (referencia)
- [x] Retro piloto 09-Abr — OK
- [x] Memo + sesion Carlos 13-Abr — presupuesto aprobado
- [x] Sesion CMs de expectativa — OK
- [x] Gemini Tier 3 aprobado por Google — 19-Abr
- [x] gtrends + reel-analyzer CLIs desplegados — 11-12 Abr
- [x] OpenClaw browser tool habilitado con Playwright — 11-Abr
- [x] V8.0 desplegado con memoria inmediata + HEARTBEAT universal — 06-07 Abr
- [x] V7.0 desplegado con skills architecture + thinking fix — 04-Abr
- [x] Plantilla Sheets V2 scouting con 3 tabs nuevos (BRIEF, DISCOVERY, FINALISTAS)
- [x] Arquitectura multi-agente V2: 7 agentes + sessions_spawn + Telegram Groups — 02-Abr
- [x] Scout V2 con skill scouting-team + 3 workers — 18-Abr

### Descartados (cerrados definitivamente)
- [~] ~~Modash~~ — descartado en favor de HypeAuditor. MCP server construido queda como referencia pero sin creditos
- [~] ~~Influencers Club~~ — descartado por no tener demographics ni brand safety

---

## ROADMAP — TRANSFORMACION IA (3 Fases, 12 Meses)

> Roadmap detallado: `strategy/ROADMAP.md` | OKRs: `strategy/OBJECTIVES.md`

### FASE 1: CIMIENTOS (Meses 1-3 / Marzo-Mayo 2026)

**Mes 1 — Diseno + Discovery + Knowledge**
- [x] Infraestructura VM + OpenClaw + 3 bots Telegram
- [x] Despliegue multi-agente (Estratega, PM, Admin) — 16-Mar-2026
- [x] PM conectado a Notion real de MNL (19 DBs) + Google Workspace
- [x] Reestructurar repo en 7 capas de transformacion — 17-Mar-2026
- [x] Crear knowledge base V1: Modash playbook + 5 verticales + scoring
- [x] Discovery via encuesta + documentos estratega (24-26 Mar 2026)
- [x] Recolectar baseline de metricas via encuesta (24-25 Mar 2026)
- [ ] Validar vision + roadmap con Carlos (Semana 2)
- [ ] Workshop 1: Onboarding PM Bot (Semana 3)

**Mes 2 — Adopcion + Agentes V3**
- [ ] Shadow mode: equipo usa agentes en paralelo a proceso normal
- [ ] Workshop 2: Modash + IA (cuando Estratega tenga Modash MCP activo)
- [x] Agentes V3 con directivas de Carlos incorporadas (scouting senior, reportes VP, flujo caja) — 29-Mar-2026
- [x] Modash MCP server construido (7 tools) — 29-Mar. Pendiente: creditos API
- [ ] Configurar MCP Modash para Estratega (cuando creditos activos) y gog para Admin

**Mes 3 — Consolidacion + Primera Medicion**
- [ ] Primer reporte asistido por IA
- [ ] AI Maturity Assessment 3m vs baseline
- [ ] Reporte trimestral a Carlos

### FASE 2: EFICIENCIA (Meses 4-6 / Junio-Agosto 2026)
- [ ] Optimizar 9 fases con datos reales
- [ ] Modash como motor de inteligencia completo
- [ ] Primer piloto de servicio IA para clientes
- [ ] AI Maturity Assessment 6m

### FASE 3: ECOSISTEMA (Meses 7-12 / Sep 2026 - Mar 2027)
- [ ] Sistema consolidado en mantenimiento evolutivo
- [ ] Servicios IA como diferenciador comercial
- [ ] ROI documentado a 12 meses
- [ ] AI Maturity Assessment 12m (target: promedio 4+)

---

## BLOQUEADORES

### B1: Billing Account GCP (P2 — ya no critico)
- **Problema**: `ia@mambanegramkt.com` no puede "Activar cuenta completa" en GCP
- **Causa**: Solo `l.zapata@mambanegramkt.com` tiene `roles/billing.admin`
- **Impacto**: Reducido — Gemini 3.1 Pro funciona con API keys directas (ahora Tier 3 aprobado por Google el 19-Abr-2026)
- **Estado**: Workaround activo (API keys directas)

### B2: Gateway systemd restart loop (P1)
- **Problema**: OpenClaw self-respawn choca con systemd Type=simple — ciclo infinito de restart
- **Workaround**: Gateway corriendo con `nohup` (funcional pero no sobrevive reboot)
- **Fix pendiente**: Configurar `OPENCLAW_NO_RESPAWN=1` correctamente o cambiar Type=forking

### B3: Sheet flujo de caja pendiente de Carlos (P2)
- **Problema**: Admin Bot tiene seccion "Flujo de Caja Semanal" en AGENTS.md V2 pero sin Sheet ID
- **Estado**: Carlos lo esta construyendo desde 29-Mar-2026, sin fecha de entrega

---

## NOTAS TECNICAS

### LLM Configurado (actualizado 19-Abr-2026)
- **Orquestador, Radar, Musa, Scout**: `google/gemini-3.1-pro` (thinking: low)
- **PM**: `google/gemini-3-flash` (thinking: off) — optimizado para velocidad y costo
- **Admin**: `google/gemini-3-flash` — optimizado para velocidad y costo
- **Prometeo**: `github-copilot/gemini-3.1-pro-preview`
- **Fallbacks**: gemini-2.5-pro (default), gemini-2.5-flash (PM/Admin)
- **Tier Gemini API**: **Tier 3 aprobado por Google** (19-Abr-2026) — limites mas altos, habilita volumen del equipo ampliado post-onboarding

### Sistema de Memoria (activado 30-Mar-2026)
- **memorySearch**: provider "gemini" (embeddings via GEMINI_API_KEY existente, free tier)
- **memoryFlush**: activo, softThresholdTokens 6000, prompt en espanol
- **MEMORY.md**: Estratega, PM, Admin, Prometeo (los 4 agentes)
- **Busqueda**: hibrida (vector + keywords), temporal decay 30 dias, MEMORY.md inmune a decay
- **Backend**: builtin (SQLite por agente)
- **Evaluacion futura**: Honcho (memoria por usuario) para Fase 2

### Proceso de despliegue (para referencia futura)
1. Editar archivos localmente en `clients/mamba-negra/`
2. SCP a la VM: `scp -i ~/.ssh/google_compute_engine <archivo> juanj@34.176.239.204:~/.openclaw/<destino>`
3. Reiniciar gateway: SSH → pkill openclaw → nohup openclaw gateway
4. Verificar: `ps aux | grep openclaw-gateway` + revisar `/tmp/openclaw-gateway.log`

### Arquitectura de Contexto (Workspace Files)
- **AGENTS.md**: Conocimiento destilado, siempre cargado (frameworks, criterios, procesos)
- **SOUL.md**: Personalidad y tono del agente
- **USER.md**: Perfil del equipo que interactua
- **IDENTITY.md**: Nombre, emoji, criatura, vibe del agente
- **TOOLS.md**: Guia de herramientas disponibles (no controla disponibilidad, solo documenta)
- **MEMORY.md**: Memoria semilla persistente
- **HEARTBEAT.md**: Checklist para runs periodicos (vacio = desactivado)
- **memory/YYYY-MM-DD.md**: Logs diarios automaticos (auto-creados por OpenClaw)
- **knowledge/**: Documentos de referencia compartidos

### MCP Servers en mcporter (actualizado 05-Abr-2026)
- **Config**: `~/.mcporter/mcporter.json` (backup: `mcporter.json.bak`)
- **Notion**: `@notionhq/notion-mcp-server@1.9.1` (pineado — v2.x bloquea DB creation). 19 tools incl. API-create-a-database
- **Tavily**: `tavily-mcp@latest`. 5 tools (search, research, extract, crawl, map). 1,000 creditos/mes gratis
- **Pagina raiz MNL accesible**: `f9aa451a-eae8-8272-9423-81419cc00592` (la antigua `31982aed...` no es accesible por la integracion)

### Google Workspace (gog)
- **Google Drive/Sheets/Docs**: via gog skill, OAuth en `~/.config/gogcli/`, env GOG_KEYRING_PASSWORD + GOG_ACCOUNT en openclaw.json skills.entries
- **OAuth credentials**: `~/.openclaw/gog-oauth.json` (Desktop App, proyecto GCP 922302496243)
- **Auth headless**: `gog auth add --remote --step 1` → copiar URL → autorizar → `--step 2 --auth-url <callback>`

### Self-Improvement (activado 05-Abr-2026)
- **Skill ClawHub**: `self-improving-agent` instalado en Orquestador
- **Instrucciones**: Seccion "AUTO-MEJORA Y PERSONALIZACION" en AGENTS.md de los 7 agentes
- **Directorios**: `.learnings/` con LEARNINGS.md, ERRORS.md, FEATURE_REQUESTS.md en los 7 workspaces
- **Triggers**: correcciones de usuario, fallos de herramientas, feature requests, knowledge gaps, best practices
- **Promocion**: patrones recurrentes (3+) se escalan a SOUL.md, AGENTS.md o TOOLS.md

### USER.md Self-Editing (activado 05-Abr-2026)
- Los 7 agentes pueden modificar USER.md cuando un usuario pide recordar preferencias
- Triggers: "recuerda que prefiero...", "configurame el tono...", "a mi me gusta que..."
- USER.md se carga en CADA sesion nueva — cambios son permanentes

### gcloud CLI
- Config `mambanegra` creada para este proyecto
- Cambiar: `export CLOUDSDK_ACTIVE_CONFIG_NAME=mambanegra`
- SSH directo (mas estable que gcloud ssh desde Windows): `ssh -i ~/.ssh/google_compute_engine juanj@34.176.239.204`

---

## DOCUMENTOS DE REFERENCIA

| Documento | Path |
|-----------|------|
| Diseno inicial del cliente | `docs/plans/2026-03-09-mamba-negra-client-setup-design.md` |
| Diseno de despliegue | `docs/plans/2026-03-12-mamba-negra-deploy-design.md` |
| Design doc multi-agente | `docs/plans/2026-03-13-mamba-negra-multi-agent-design.md` |
| Plan implementacion multi-agente | `docs/plans/2026-03-13-mamba-negra-multi-agent-implementation.md` |
| **Design doc multi-agente V2** | `docs/plans/2026-04-02-multi-agent-teams-design.md` |
| **Design doc transformacion IA** | `docs/plans/2026-03-17-mamba-negra-ai-transformation-design.md` |
| **Plan implementacion transformacion** | `docs/plans/2026-03-17-mamba-negra-ai-transformation-implementation.md` |
| Overview multi-agente | `clients/mamba-negra/MULTI-AGENT-OVERVIEW.md` |
| Discovery (legacy) | `clients/mamba-negra/FASE1A-DISCOVERY.md` → migrado a `adoption/workshops/` |
| openclaw.json | `clients/mamba-negra/agents/openclaw.json` |
| Workspaces | `clients/mamba-negra/agents/workspaces/` |
| Campaign Framework | `clients/mamba-negra/knowledge/campaign-framework.md` |
| **Modash Playbook** | `clients/mamba-negra/knowledge/modash-playbook.md` |
| **Analisis de valor PM** | `clients/mamba-negra/PM-VALUE-ANALYSIS.md` |

---

## SESSION LOG (29-Mar-2026) — Directivas de Carlos + Deploy V3 + Modash MCP

### Contexto
Sesion de planeacion con Carlos (29-Mar). Carlos se define como "retador": pone la vision AI FIRST, nosotros traducimos a tareas tecnicas.

### 3 Requerimientos de Carlos
1. **Scouting Nivel Senior** (Estratega): Leer toda la estrategia, entregar shortlist con copy comercial justificado con data real por cada perfil
2. **Reportes para VPs** (PM): Insights de altisimo nivel cuanti+cuali, explicar POR QUE funciono un formato, recomendaciones directas
3. **Flujo de Caja** (Admin): Conectar Google Sheet maestro de flujo de caja semanal (Carlos lo esta construyendo)

### Cambios realizados
1. **Estratega AGENTS.md V2 → V3**: Nueva seccion "Scouting Nivel Senior — Copy Comercial con Data" con proceso obligatorio, formato de copy por perfil, tabla resumen
2. **PM AGENTS.md V2 → V3**: Caso 2 reescrito como "Reportes para VPs — Nivel Analista Senior" con 4 bloques: Executive Summary, Performance con analisis causal, Analisis por Formato/Plataforma, Recomendaciones accionables
3. **Admin AGENTS.md V1 → V2**: Nueva seccion "Flujo de Caja Semanal" con formato de respuesta. Pendiente Sheet ID de Carlos
4. **Deploy a VM**: SCP de los 3 AGENTS.md + restart gateway. Verificado con grep Version
5. **Modash MCP Server construido**: 7 tools (account_info, search_instagram, search_tiktok, profile_report, ai_text_search, lookalikes, locations). Node.js + MCP SDK. En `agents/mcp-servers/modash-mcp/`
6. **Modash API verificada**: Token valido pero cuenta con 0 creditos. MNL debe contactar soporte Modash

---

---

## SESSION LOG (29-30 Mar 2026, continuacion) — Brand Voice + Skill + Memoria + Modash MCP

### Cambios realizados (continuacion de sesion 29-Mar)
1. **Modash MCP Server construido**: 7 tools (account_info, search_instagram, search_tiktok, profile_report, ai_text_search, lookalikes, locations). Node.js + MCP SDK. API key verificada pero 0 creditos — MNL debe contactar soporte Modash.
2. **Brand voice profiles**: Template + ejemplo (Noraver Gripa) en `knowledge/brands/`. Desplegados a VM.
3. **Skill `brief-to-strategy`**: Flujo de 8 pasos incluyendo co-creacion de voz de marca con Mar. En `estratega/skills/brief-to-strategy/SKILL.md`. Desplegado a VM.
4. **Estratega AGENTS.md V3 → V3.1**: Seccion "Perfiles de Voz de Marca" + "Gestion de Memoria". MEMORY.md creado.
5. **Admin AGENTS.md V2**: Seccion "Gestion de Memoria" agregada. MEMORY.md creado.
6. **memorySearch activado** en openclaw.json: provider "gemini", builtin SQLite. Todos los agentes pueden buscar semanticamente en sus logs.
7. **memoryFlush activado**: antes de compaction, el agente guarda automaticamente a memory/YYYY-MM-DD.md.
8. **Gateway reiniciado** para tomar config de memoria.

### Investigacion realizada
- Modash API v1.5.0: 60+ endpoints documentados (Discovery, AI Search, Raw API)
- OpenClaw skills ecosystem: 13,729 skills en ClawHub, evaluacion de relevancia para MNL
- OpenClaw memory system: 3 backends (builtin, QMD, Honcho), configuracion documentada

---

---

## SESSION LOG (30-Mar-2026, sesion 2) — Tavily + Competitor Analysis + Google Form Briefs

### Cambios realizados
1. **Tavily MCP registrado** en mcporter.json: `tavily-search`, `tavily-extract`, `tavily-map`, `tavily-crawl`. API key: tvly-dev-*. Free tier: 1,000 creditos/mes.
2. **Skill `competitor-analysis`** creado: combina Tavily (busqueda web) con estructura SWOT. 5 pasos: definir alcance → buscar con Tavily → integrar datos manuales → estructurar (panorama + SWOT + gaps + recomendaciones) → conectar con campana.
3. **TOOLS.md Estratega V2**: Seccion Tavily agregada + seccion Google Form briefs (Sheet ID: `1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw`, 29 columnas A-AC).
4. **Skill `brief-to-strategy` actualizado**: Nuevo path "revisa el ultimo brief del formulario" — lee Google Form Sheet, lista primero (A:D), luego fila especifica (A<N>:AC<N>).
5. **Investigacion Influencers Club**: Alternativa a Modash (~$249/mes vs ~$16k/ano). Free tier no da acceso API (403). Evaluacion en curso.

### MCP Servers activos en mcporter.json (VM)
| Server | Tools | Estado |
|--------|-------|--------|
| Notion | search, query, create, read pages/DBs | Activo |
| Tavily | search, extract, map, crawl | Activo (1,000 creditos/mes gratis) |

### Skills del Estratega (3 activos)
| Skill | Trigger | Descripcion |
|-------|---------|-------------|
| `brief-to-strategy` | Brief nuevo, "arranca propuesta" | 8 pasos: brief → brand voice → metodologia → Strategic Thinking → contenido → scouting |
| `competitor-analysis` | "Analiza competencia de [marca]" | Tavily search + estructura SWOT + gaps + recomendaciones |
| `mcporter` | Infraestructura MCP | Puente a Notion y Tavily |

### Fuentes de briefs del Estratega
| Fuente | Como accede |
|--------|-------------|
| Google Form → Sheet | `gog sheets get 1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw` (29 columnas) |
| Google Drive | `gog drive search "[marca] brief"` |
| Notion | `mcporter call notion.API-post-search` |
| Chat directo | El usuario pega el brief en Telegram |

---

## SESSION LOG (04-Abr-2026) — V7.0 Upgrade: Skills Architecture + Thinking Fix + Drive Consolidation

### Problemas resueltos
1. **Thinking visible en Telegram**: Agentes mostraban `<think>`, XML tags. Fix: OUTPUT FORMAT section en 7 SOUL.md
2. **Output muy corto**: SOUL.md incentivaba brevedad para TODO. Fix: MODO RAPIDO vs MODO ENTREGA en 4 AGENTS.md + contextual depth en SOUL.md
3. **Sin modo iterativo**: Orquestador lanzaba equipo completo sin checkpoints. Fix: seccion 2.10 con checkpoints humanos
4. **Correcciones perdidas**: Workers spawneados no recibian contexto. Fix: `campaign-corrections.md` como knowledge persistente
5. **Skills no declarados**: 14 skills existian en VM pero solo "mcporter" en openclaw.json. Fix: skills declarados por agente
6. **Tavily subutilizado**: Research solo conocia 2 de 5 herramientas. Fix: TOOLS.md actualizado con tavily_research (modo Perplexity)
7. **Sin consolidacion progresiva**: Entregables solo al final. Fix: drive-consolidation-protocol.md compartido a 6 agentes

### Skills enriquecidos con prompts del Notion
- insight-builder, concept-builder, market-research, brief-to-strategy, competitor-analysis
- Fuente: "Banco de Prompts | Strategy Team" en Notion (7 etapas, ~18 tipos)

### Skills nuevos creados
- challenge-diagnostic (Orquestador), content-guidelines (Creative), brand-voice-builder (Creative), event-concept (Creative), methodology-selector (Creative)

### Config changes (openclaw.json)
- contextTokens: 1M → 500K, compaction.memoryFlush.enabled, contextPruning: cache-ttl, userTimezone: America/Bogota, bootstrapMaxChars: 25000

### Documentacion
- Manual: `docs/MANUAL-AGENTES-MNL.md` (para Mar, Carlos, CMs)
- NotebookLM: "Manual de Agentes — Mamba Negra Latam" (5 fuentes, cuenta ia@mambanegramkt.com)

---

## SESSION LOG (05-06 Abr 2026) — Notion DB Creation + Self-Improvement + USER.md Editing

### Cambios realizados
1. **Notion DB creation habilitado**: PM no podia crear databases — Notion API v2025-09-03 (v2.x del MCP server) bloquea el endpoint. Fix: pinear `@notionhq/notion-mcp-server@1.9.1` en mcporter.json. Test exitoso (database creada y verificada)
2. **PM TOOLS.md actualizado**: Documentacion de `API-create-a-database`, `API-retrieve-a-database`, `API-update-a-database`. Page ID raiz corregido a `f9aa451a-eae8-8272-9423-81419cc00592`
3. **Self-improving agent activado**: `.learnings/` creados para 7 agentes + instrucciones en AGENTS.md. Triggers: correcciones, errores, feature requests, knowledge gaps
4. **USER.md self-editing**: 7 agentes pueden modificar USER.md cuando usuario pide recordar preferencias (tono, formato, nivel detalle). Cambios permanentes entre sesiones
5. **Sync completo**: VM → local → mamba-negra repo. Commit `bc10e61` pusheado a GitHub
6. **Skill ClawHub `dimagious/notion-skill`**: Evaluado y descartado — es wrapper de documentacion, redundante con mcporter

### Investigacion sobre creacion visual en Notion
- Agents CAN: crear databases, pages, tablas, bloques, imagenes (URL externa), embeds
- Agents CANNOT: crear chart views (solo via UI de Notion), board/calendar/timeline views

---

## SESSION LOG (06-07 Abr 2026) — V8.0 Upgrade: Memoria Inmediata + Cierre Proactivo + HEARTBEAT Universal

### Contexto
Analisis de sesiones del 6-Abr-2026 revelo deficiencias criticas:
- 3 agentes tenian CERO memoria persistente (Research, Influencer, Orquestador)
- LEARNINGS.md vacio en todos (Creative decia "ya guarde" pero no lo hacia)
- PM guardaba conversation dumps crudos en vez de informacion destilada
- Thinking leak visible en respuestas (Orquestador en ingles, Research con `<think>`)
- Agentes 100% reactivos — no proponian flujos ni guardaban info por iniciativa propia
- No podian enviar DMs (no tenian IDs de Telegram del equipo)
- Orquestador no compartia info estrategica con otros agentes

### Alcance del cambio
**SOLO workspace files** (AGENTS.md, SOUL.md, TOOLS.md, HEARTBEAT.md). NO se cambio openclaw.json, modelos, thinking settings, ni arquitectura de comunicacion.

### 8 Mejoras implementadas

**P1 — Memoria inmediata**: Los agentes ahora guardan en memory/ DURANTE la conversacion (no "al final"). Formato destilado con tags [DECISION], [CORRECCION], [ENTREGABLE], [PENDIENTE].

**P2 — OUTPUT FORMAT anti-thinking-leak**: Seccion en SOUL.md que previene filtracion de `<think>` y razonamiento en ingles en respuestas.

**P3 — LEARNINGS write-then-confirm**: Protocolo de escritura primero, confirmacion despues. Fusionado con concepto de promocion (3+ repeticiones se escalan a SOUL/AGENTS/TOOLS). Tags adicionales: [ERROR], [FEATURE], [DATO-ERRONEO], [MEJORA].

**P4 — Cierre proactivo de sesion**: Cuando la conversacion concluye, el agente automaticamente hace resumen, guarda memoria, lista pendientes, sugiere proximo paso.

**P5 — Team-directory en TOOLS.md**: IDs de Telegram del equipo (Juan Jose, Juangui, Maca, Mar) en cada agente para envio de DMs.

**P6 — HEARTBEAT.md para todos**: Checkpoints proactivos al iniciar sesion — lee memory, consulta Campaign Strategy Index, consulta Drive consolidation. Adaptado por rol. Ahora los 7 agentes lo tienen (antes solo PM).

**P7 — Cross-notification**: Orquestador notifica a otros agentes cuando recibe informacion estrategica nueva.

**P8 — Neutralizar memory flush**: PM ignora conversation dumps automaticos del sistema.

### Fixes adicionales del code review
- Numeracion duplicada "3.4" corregida en Estratega AGENTS.md
- LEARNINGS viejo (formato LRN-YYYYMMDD-XXX) eliminado y fusionado con P3
- "Texto en ingles" agregado a Creative SOUL.md OUTPUT FORMAT
- Boilerplate limpiado en Prometeo TOOLS.md
- Trigger ">5 min sin mensaje" cambiado a "el contexto sugiere que concluyo"
- HEARTBEAT actualizado con Drive consolidation + Campaign Strategy Index Sheet

---

**Estado general (08-Abr-2026)**: Proyecto de **TRANSFORMACION INTEGRAL CON IA** en 7 capas. **PILOTO ACTIVO** con 3 personas del equipo MNL (estratega, CM, creativo/a) desde ~01-Abr-2026. V7.0 y V8.0 iterados con feedback real del piloto. **Retro programada 09-Abr-2026**. V8.0 DESPLEGADO: 8 mejoras en workspace files de los 7 agentes — memoria inmediata, cierre proactivo, HEARTBEAT universal, LEARNINGS write-then-confirm, team directory, cross-notification, anti-thinking-leak, memory flush neutralizado. **Bloqueadores**: (1) API de influencers, (2) Sheet flujo de caja de Carlos. **Proximo paso**: Retro con usuarios piloto (09-Abr) → definir expansion del piloto.

---

## SESSION LOG (11-12 Abr 2026) — Nuevas Capacidades: gtrends + reel-analyzer + browser tool

### Contexto
Sesion enfocada en analizar Gemma 4 de Google como potencial modelo para los agentes, y en responder a Mar (estratega senior) sobre la posibilidad de que los agentes accedan a Google Trends, Answer The Public, e Instagram/TikTok para social listening.

### Decisiones estrategicas

**Gemma 4 — NO migrar agentes actuales**
- Analisis critico: Gemini 3.1 Pro supera a Gemma 4 en GPQA (94.3% vs 84.3%), tiene 1M context vs 256K, y video nativo vs frames extraidos
- VM sin GPU → self-hosting no viable
- Batch API de Gemini (50% descuento) es la oportunidad real — mismo modelo, mismas capacidades, solo async
- Gemma 4 en watchlist para volumen masivo futuro (>1000 calls/dia batch)
- Detalle: `memory/reference_gemma4_analysis.md`

### Nuevas capacidades desplegadas

**1. gtrends.py — Google Trends CLI (para Radar)**
- Ubicacion VM: `~/.openclaw/tools/gtrends.py` + symlink `~/.local/bin/gtrends`
- Comandos: `interest`, `compare`, `related`, `suggestions` (trending tiene bug, no usar)
- Dependencia: `pytrends 4.9.2` + `urllib3<2` (pytrends no soporta urllib3 v2)
- Test E2E: exitoso con keywords en CO (influencer marketing, marketing digital, skincare)
- Integrado en Radar TOOLS.md + AGENTS.md (seccion Social Data)

**2. reel-analyzer.py — Reel Analyzer CLI (para Scout)**
- Ubicacion VM: `~/.openclaw/tools/reel-analyzer.py` + symlink
- Comandos: `download`, `analyze`, `full`
- Dependencias: `yt-dlp 2026.3.17` + `google-genai 1.72.0` (NO `google-generativeai`, deprecated)
- Modelo default: `gemini-2.5-flash` (video nativo, barato, ~$0.01-0.05 por reel)
- Output: **Content Fingerprint** — scores 1-10 agregados (hook, editing, authenticity, visual, CTA) + dominant style + top reels + alineacion con brief
- Test E2E: exitoso con @charlidamelio (2 reels TikTok descargados y analizados)
- Gotcha TikTok: URLs directas de video funcionan 100%, handles de perfil ~50% (yt-dlp extractor bugs)
- Gotcha Instagram: requiere cookies — **NO configuradas, pendiente**
- Integrado en Scout TOOLS.md + AGENTS.md (seccion Scoring Cualitativo)

**3. OpenClaw browser tool — Habilitado**
- Plugin `browser` agregado a `openclaw.json` (`plugins.allow: ["telegram", "browser"]`)
- Config top-level `browser`: `noSandbox: true`, `headless: true`, `executablePath` apuntando a Playwright Chromium
- **Gotcha critico**: Chromium de Ubuntu 24.04 es un snap → bloquea con "Permission denied" en SingletonLock. Solucion: usar Chromium de Playwright (`~/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`)
- Dependencias instaladas: `libxcomposite1`, `libxdamage1`, y otras libs X11 (necesarias incluso en headless)
- Capacidades: navegar URLs, fill forms, click, snapshot accessibility tree, screenshots
- **Limitacion real**: anti-bot en sitios grandes. Probado: Google search → CAPTCHA, TikTok Creative Center → 403, ATP → requiere login. Funcionan: hypeauditor.com (marketing), AnswerSocrates, Wikipedia, sitios informacionales
- Detalle: `memory/reference_openclaw_browser_tool.md`

### Investigacion sobre APIs de data

**HypeAuditor — estado verificado 20-Abr-2026**

Client ID: **2705001**. Analytical Reports restantes: **94** (3 gastados en tests API 20-Abr).

| Endpoint | Status | Costo | Notas |
|---|---|---|---|
| `auditor.suggester` | ✅ | Gratis | Baseline de auth |
| `auditor.report?v=2` | ✅ | 1 cred (siempre) | Retorna 64 keys — demografia, aqs, brand_safety, blogger_rankings, audience_geography, est_post_price, etc. Cache local 30d en CLI v2 |
| `auditor.tiktok` | ✅ | 1 cred | Param `channel` (no `username`) |
| `auditor.reportMedia` | ✅ post-unlock | 0 post-unlock | Code 15 pre-unlock |
| `auditor.search` (Discovery) | ✅ | 1 query/pagina | `queries_left` = 1000. Factura dice 5000 — discrepancia pendiente con Paula |
| `auditor.searchSandbox` | ✅ | Gratis | — |
| **`auditor.creators`** | ✅ | **Gratis** | **My Network — lista perfiles unlocked con metadata CRM (emails, phones, contract_status, network_status). Filtros: limit, cursor, report_unlocked_from/to (formato YYYY-MM-DD, no ISO)** |
| **`auditor.{instagram/tiktok/youtube/twitter/twitch/snapchat}Pdf`** | ✅ | **0 post-unlock**, 1 pre-unlock | **PDF oficial HA async. Retorna `pdfUrl` (CDN), `retryTtl`. CLI reintenta hasta 8x. Ideal entregable cliente** |
| `auditor.tiktokMedia` | ❌ Code 8 | — | Contrato desconocido — 8 variantes probadas. Pendiente Paula |
| `auditor.miniReport` (+ 10 variantes) | ❌ Code 3 | — | Mini Reports **NO existe** en API REST. Solo feature UI web. Params `mini=1`/`type=mini` se ignoran silenciosamente |

**Codigos de error reales (verificados contra doc oficial):**
3=Unknown Method, 4=Invalid Token, 8=Invalid Request, 15=Access Denied, 27=No API Access. Los codigos correctos son 27 (plan) o 15 (recurso no desbloqueado). Detalle: `memory/feedback_hypeauditor_error_codes.md`.

**CLI v2 (20-Abr-2026)**: agrega cache local automatico + `network` + `pdf` + `cache`. El cache guarda el JSON completo del report en `~/.openclaw/hypeauditor-cache/<platform>-<username>.json`. Relecturas en < 30 dias cuestan 0 creditos. Flag `--cached` lee solo cache, `--force` bypass cache (1 credito). Umbral de aviso 500 MB. Proyeccion anual: ~200 MB con uso normal (100 reports/mes × 12 × ~170 KB).

**Nota sobre data "tipo Modash" (rankings por categoria, ER nivel bajo/promedio/alto):** ya esta incluida en `auditor.report --raw` en los campos `blogger_categories`, `blogger_rankings`, `aqs` + `aqs_name` + `aqs_description`. No requiere endpoint extra. Pendiente diseñar card MNL-branded con CMs.

**Situacion comercial**: la propuesta Custom firmada marca ✅ Discovery API incluida en Starter. La factura emitida listaba "Reports API access" — producto distinto. Email a support + Paula resolvió la activacion el 17-Abr tarde. Ver `memory/reference_hypeauditor_api.md` para el estado completo.

Detalle: `memory/reference_hypeauditor_api.md` + `memory/feedback_hypeauditor_error_codes.md`

**APIs alternativas investigadas pero descartadas (no usar):**
- Apify Instagram/TikTok scrapers — $3-5/mes pero el equipo prefiere HypeAuditor que ya tiene
- SerpApi Google Trends ($25/mes) — pytrends gratis funciona bien
- AlsoAsked API ($29/mes) — no justifica costo vs Tavily

### Flujo de uso recomendado (Mar + equipo)

**Analisis cualitativo de influencers TikTok:**
1. `hypeauditor search "nombre"` → encuentra perfil (gratis)
2. Mar/equipo pasa URLs directas de 5-10 videos al Scout
3. `reel-analyzer download <urls>` → yt-dlp descarga
4. `reel-analyzer analyze /tmp/reels/<handle>/ --brief "..."` → Gemini genera Fingerprint
5. `hypeauditor report --raw` SOLO en los 2-3 finalistas (1 credito c/u)

**Investigacion de tendencias (Radar):**
- `gtrends interest "tema" --geo CO` → valida interes real
- `gtrends related "categoria" --geo CO` → rising queries = insights emergentes

### Pendientes

- [ ] Configurar cookies de Instagram (`~/.openclaw/instagram_cookies.txt`) — manual, usuario debe exportar de Chrome local
- [ ] Test E2E completo del flujo combinado via Telegram con Scout
- [ ] Evaluar upgrade HypeAuditor Starter+API ($599/mes) post-trial si el flujo cualitativo se vuelve diario

### Archivos modificados/creados

**Locales (`C:\openclaw-agency\clients\mamba-negra\`):**
- `tools/gtrends.py` (nuevo)
- `tools/reel-analyzer.py` (nuevo)
- `tools/deploy-tools.sh` (nuevo)
- `agents/openclaw.json` (agregado plugin browser + config)
- `agents/workspaces/influencer/TOOLS.md` (seccion Reel Analyzer)
- `agents/workspaces/influencer/AGENTS.md` (referencia a Content Fingerprint)
- `agents/workspaces/research/TOOLS.md` (seccion Google Trends)
- `agents/workspaces/research/AGENTS.md` (gtrends en Social Data)

**VM (`~/.openclaw/`):**
- `tools/gtrends.py`, `tools/reel-analyzer.py`, `tools/deploy-tools.sh`
- `workspace/influencer/TOOLS.md`, `workspace/influencer/AGENTS.md`
- `workspace/research/TOOLS.md`, `workspace/research/AGENTS.md`
- `openclaw.json` (con browser plugin)
- `~/.cache/ms-playwright/chromium-1217/` (Chromium)
- Symlinks: `~/.local/bin/gtrends`, `~/.local/bin/reel-analyzer`

**Memoria del proyecto (nuevas):**
- `memory/project_gtrends_reel_analyzer.md`
- `memory/reference_openclaw_browser_tool.md`
- `memory/reference_gemma4_analysis.md`
- `memory/feedback_ubuntu_chromium_snap.md`
- `memory/feedback_hypeauditor_error_codes.md`
- `memory/reference_hypeauditor_api.md` (actualizada con endpoints descubiertos)

---

## SESSION LOG (13-19 Abr 2026) — Carlos + Retro + Compra HypeAuditor + Scout V2 + Tier 3

### Cronologia

**09-Abr**: Retro piloto con los 3 usuarios (estratega, CM, creativo/a) — OK. Feedback recogido y consolidado en V8.0 (ya desplegado 06-07 Abr).

**13-Abr**: Sesion Carlos con memo presupuestal. Presupuesto encuadrado:
- Baseline actual: $322/mes (Modash $300 + Tavily + Notion)
- Propuesto: HypeAuditor $762 + Gemini API $155-$210 + Tavily/Notion/VM — total ~$954-$1,019/mes
- Delta: +$632-$697/mes (~$2.5M-$2.8M COP)
- Carlos aprobo HypeAuditor ese dia. Gemini Tier 2 encuadrado.
- Docs: `docs/2026-04-13-memo-carlos.md`, `docs/2026-04-13-guion-carlos.md`, `docs/2026-04-13-talking-points-equipo.md`

**14-Abr**: Compra HypeAuditor Starter Monthly + Story Tracking ($762/mes) ejecutada.

**16-Abr**: Presentacion equipo V3 preparada (`docs/2026-04-16-presentacion-equipo-v3.md`) + onboarding Telegram Groups documentado (`docs/TELEGRAM-GROUPS-ONBOARDING.md`).

**17-Abr**: API HypeAuditor verificada. Account ID 2705001. Primeros endpoints probados. Discovery bloqueado por propuesta vs factura — email a support + Paula. Resuelto misma tarde: Discovery desbloqueada con 1000 queries iniciales. 97 Analytical Reports restantes.

**17-Abr tarde**: Bug del CLI `hypeauditor.mjs` corregido (shape flat → anidada `search_results` con basic/metrics/features). Fallback legacy agregado.

**18-Abr**: Scout V2 desplegado. Workers `scout-discovery`, `scout-report`, `scout-video` con guardrails. Skill `scouting-team` (Flujo Z) con 4 steps y 2 checkpoints humanos. Plantilla Sheets V2 (ID `1cIcbnvb6IX...`) con 3 tabs nuevos (ESTRATEGIA & CRITERIOS, DISCOVERY, FINALISTAS DEEP DIVE) integrada al Campaign Strategy Index.

**~18-19 Abr**: Sesion de expectativa con CMs — OK. Equipo entro en expectativa positiva para onboarding.

**19-Abr**: **Gemini API Tier 3 aprobado por Google** (upgrade desde Tier 1/2). Habilita volumen de uso del equipo ampliado.

**20-Abr**: **HypeAuditor CLI v2**. Investigacion empirica de endpoints de Mini Report: 11 variantes probadas (miniReport, reportMini, quickReport, liteReport, previewReport, etc.) — todas retornan `code 3 Unknown method`. Parametros `type=mini` y `mini=1` se aceptan sin error pero retornan payload completo de 64 keys + cobran 1 credito normal. **Conclusion**: Mini Reports es feature exclusiva UI web, no expuesta en API REST. Descubiertos 2 endpoints nuevos gratis post-unlock: `auditor.creators` (My Network — lista perfiles desbloqueados con metadata tipo CRM: emails, phones, contract_status) y `auditor.{platform}Pdf` (6 variantes — PDF oficial de HA async, retorna URL CDN). CLI v2 desplegado con: (1) cache local automatico 30d de reports en `~/.openclaw/hypeauditor-cache/`, (2) flags `--cached` (0 creditos) y `--force` (bypass), (3) comando `network` con filtros `--since/--until` (formato YYYY-MM-DD), (4) comando `pdf` con retry 8x automatico, (5) comandos `cache stats/prune/clear`. TOOLS.md del Scout actualizado con los nuevos comandos y flujo recomendado. Tests verdes: network lista 6 creators, report westcol → cache 382 KB → `--cached` OK, pdf westcol → URL CDN con 94 creditos intactos. Proyeccion cache: ~200 MB/año con uso normal (trivial vs 4.4 GB libres en VM). Costo real de investigacion: 3 creditos (97→94). Pendiente con Paula: confirmar oficialmente que Mini Reports solo vive en UI web, contrato `auditor.tiktokMedia`, discrepancia queries_left 1000 vs factura 5000/mes. Diseño de card MNL-branded (primera aprobacion cliente) parqueado hasta hablar flujo real con CMs.

### Decisiones estrategicas

- **Modash descartado definitivamente** — MCP server construido queda como referencia, sin creditos. No se activara.
- **Influencers Club descartado** — sin demographics ni brand safety, rompe la palanca 1 de diferenciacion.
- **HypeAuditor como pilar de data** — habilita las 3 palancas: propuesta diferenciada, velocidad comercial, escalamiento.
- **Scout V2 con workers** como blueprint de capacidad: orquestacion + checkpoints humanos + guardrails de creditos. Patron replicable a otros agentes.

### Proximo hito

**20-Abr-2026 — Onboarding equipo ampliado**
- Presentacion de 7 agentes + flujos de trabajo
- Pairing en bots de Telegram
- Primeros casos de uso reales con equipo completo
- Captura de feedback post-onboarding para iterar

---

**Estado general (19-Abr-2026)**: Proyecto en **Mes 2 de Fase 1 (Cimientos)**. Infraestructura de datos completa (HypeAuditor activo + Gemini Tier 3 + Tavily + Sheets + Notion). 7 agentes V8.0 + Scout V2 con orquestacion propia. Presupuesto aprobado y encuadrado. Piloto cerrado con retro OK. Onboarding al equipo ampliado mañana (20-Abr). **Bloqueadores residuales**: (1) systemd gateway, (2) Sheet flujo de caja de Carlos, (3) cookies IG, (4) endpoints HypeAuditor pendientes con Paula (tiktokMedia + discrepancia queries). **Proximo paso**: ejecutar onboarding → captar feedback real → iterar agentes → primer reporte asistido por IA en campana real (target Mes 3, Mayo).

---

## SESSION LOG (19-Abr-2026 noche) — Agent Team prep onboarding CMs

### Contexto
Previo al onboarding de CMs del 20-Abr, se ejecuto un Agent Team (`mnl-onboarding-20abr`, experimental Claude Code v2.1.32+) con 4 agentes trabajando en paralelo mientras Juan dormia. Autonomia total con checkpoint humano para el deploy en VM.

### Team members
- `team-lead` — Drive sync, NotebookLM, Slides, handoff, STATUS update
- `content-writer` (workshop-designer) — Guia CMs + storyboard deck
- `flow-designer` (general-purpose) — Flujo prueba Scout E2E
- `memory-engineer` (openclaw-engineer) — Topic-registry prep + auditoria memoria multi-CM

### Entregables (9 tasks)

| Task | Output | Ubicacion |
|---|---|---|
| 1 | SKILL.md topic-registry + manifest-snapshot.sh + deploy checklist | `agents/workspaces/estratega/skills/topic-registry/`, `tools/cost-aggregator/`, `docs/2026-04-19-deploy-checklist-topic-registry.md` |
| 2 | 34 Google Docs + 1 Google Slides a Drive Mambalabs | Capacitacion / Estrategia / Playbooks / Reportes |
| 3 | Guia CMs Scout (19KB, 307 lineas) | `docs/2026-04-19-guia-scout-cms.md` + Drive `1OmJok5Id3cIZgN0UoRDmLHMvEhvSESYIBxSrCWfaxto` |
| 4 | Storyboard deck 15 slides | `docs/2026-04-19-deck-scout-storyboard.md` |
| 5 | Flujo prueba Scout E2E (31KB, 740 lineas) | `docs/2026-04-19-flujo-prueba-scout.md` + Drive `1YoG5pduAUoHk_C3ZbEHDtYh9Tin-MK4rXccdzJHAO64` |
| 6 | Auditoria memoria multi-CM (20KB, 348 lineas) | `docs/2026-04-19-auditoria-memoria-multi-cm.md` + Drive `1pLkdBUe1sXYlir6kiC9OpwpvHS2LZHf4aMWGVGGGOjc` |
| 7 | NotebookLM con 6 sources + briefing doc | `https://notebooklm.google.com/notebook/bde2c37a-78b4-4a70-8552-bdd96e2ef7e0` |
| 8 | Deck Onboarding Scout (Google Slides, 15 slides) | `1gpx03TKpHgkJDN978TRtQHPup-MJ3GqyqUAoEMHz4No` |
| 9 | Handoff consolidado | `docs/2026-04-19-handoff.md` + Drive `1ynWq0V7JnVjNL9DpMAdkkIvrRItpbBMe5_Bk0fz6I8U` |

### Hallazgos criticos (auditoria memoria multi-CM — P0)

1. **Sin `campaign_id` canonico en memoria diaria** — cada agente guarda `memory/YYYY-MM-DD-<tema>.md` con tema libre. Sin topic-registry + tag canonico, CMs distintos fragmentan la misma campana.
2. **`memory_search` es global al agente** — queries devuelven hits de cualquier CM sin distinguir contexto.
3. **Scout tiene 0 archivos en `memory/`** — pese a estar en produccion desde 16-Mar. Todo vive como Excels sueltos en root. Critico porque Scout es el protagonista del onboarding.
4. **Admin memoria vacia** (esperado, sin Sheet de Carlos aun) y **Prometeo memoria vacia** (esperado, es tecnico/dev).

### Solucion arquitectural
La auditoria demuestra que el **topic-registry** (plan 2026-04-15) es la solucion canonica al problema multi-CM que el usuario planteo. Los patches concretos estan en la auditoria seccion 4-5: cada AGENTS.md incorpora el campaign_id como tag obligatorio al escribir memoria + filtro opcional en memory_search.

### Deploy pendiente (checkpoint humano mañana)
- Fases 0-3 del cost-attribution plan (30 min + 1h + 3h + 30 min = ~5h)
- Patches P0 de memoria (~1h: SCP + restart + validacion)
- Todo preparado localmente, checklist en `docs/2026-04-19-deploy-checklist-topic-registry.md`

### Observaciones de proceso
- Agent Teams funciono bien: 4 agentes paralelos entregaron 8/9 tasks en ~30 min
- DNS issue intermitente con `slides.googleapis.com` resuelto con fallback pandoc pptx → upload Slides nativo
- Permisos pre-configurados en `settings.local.json` evitaron bloqueos por prompts mientras Juan dormia
- Memoria VM auditada via SSH directo (gcloud ssh tenia DNS roto, SSH a IP 34.176.239.204 funciona)
