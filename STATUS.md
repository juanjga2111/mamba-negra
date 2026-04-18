# STATUS — Mamba Negra

**Ultima actualizacion**: 18 Abril 2026 (Scout V2 completo: Discovery API desbloqueado, workers con guardrails, skill `scouting-team`, plantilla Sheets V2 con 3 tabs nuevos integrada al Campaign Strategy Index)

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

## PILOTO ACTIVO (Primera semana de Abril 2026)

> **Estado**: EN CURSO. 3 personas del equipo MNL usando agentes en escenarios reales desde ~01-Abr-2026.

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

### Retro Programada
- **Fecha**: 09-Abr-2026
- **Participantes**: Los 3 usuarios piloto + Juan Jose
- **Objetivos**:
  1. Recoger feedback/retrospectiva de la primera semana
  2. Entender en que fase estamos realmente
  3. Mostrar lo que hay, lo que se planea y hacia donde aspiramos
- **Output esperado**: Lista de fricciones, features pedidos, ajustes a agentes, decision sobre proximos pasos de adopcion

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
- **Tools**: sessions_spawn + sessions_send, Tavily (background check), gog (Sheets/Drive), `hypeauditor` CLI (search/discover/report/media/credits), `reel-analyzer` CLI
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
| modash-playbook.md | V1 | Playbook completo de Modash |
| strategy-workflow.pdf | Creado | Flujo Strategy team: 12 pasos, RAYO/ARCO/PRISMA/MAREA, metodologia investigacion, banco de prompts |
| README.md | V1.1 | Indice actualizado con nuevos archivos |
| verticals/ (5 archivos) | V1 | consumo-masivo, belleza, inmobiliario, calzado, servicios |
| campaign-samples/ (3 archivos) | Creado | Manimoto Chocolate, Detodito Proteina (strategic thinkings), Acetaminofen MK (brief) |
| **brands/_template.md** | **NUEVO** | Template de brand voice profile (29-Mar-2026) |
| **brands/ejemplo-farmaceutico-otc.md** | **NUEVO** | Ejemplo: Noraver Gripa — personalidad, tono, do's/don'ts, tipo de influencer |
| Research/ (4 PDFs) | Referencia | Papers de IA en agencias, KPIs, agentic enterprise |

**Veredicto**: 16 archivos + 4 PDFs + 3 campaign samples. Brand voice profiles agregados (29-Mar-2026).

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
| mcp-servers/modash-mcp/ | Construido | MCP server Modash (7 tools), Node.js. NO desplegado (API tiene 0 creditos) |
| n8n-workflows/README.md | Placeholder | Vacio — workflows planeados para Fase 1C |

**Veredicto**: **Arquitectura V2 con 7 agentes**. Orquestador coordina via sessions_spawn. 3 workers especializados (Research, Creative, Influencer). PM V3, Admin V2, Prometeo. **memorySearch activo**. Tavily MCP activo (1,000/mes gratis). Telegram Groups con Topics configurados. Modash MCP construido, evaluando alternativas.

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

### P0 — Piloto Activo + Multi-Agente V2 (02-Abr-2026)
- [x] **Piloto selectivo en marcha**: 3 personas del equipo (estratega, CM, creativo/a) usando agentes desde ~01-Abr-2026
- [x] **V7.0 y V8.0 iterados con feedback real** del piloto (no mejoras proactivas)
- [ ] **Retro con usuarios piloto**: Programada 09-Abr-2026 — recoger feedback, definir proximos pasos
- [ ] **Test flujo orquestado**: Probar sessions_spawn (Orquestador → Research + Creative + Influencer en paralelo)
- [ ] **Crear grupos personales**: "Mar - Strategy Room" y "Mae - Strategy Room" con Topics
- [ ] **Agregar user IDs**: Mar y Mae a `groupAllowFrom` en openclaw.json
- [ ] **Expandir piloto**: Definir si se incorporan mas personas post-retro del 09-Abr
- [ ] **Revocar tokens de bots**: Generar nuevos tokens en VM (seguridad post-deploy)
- [ ] **Test E2E por agente**: Verificar que cada uno de los 7 bots responde correctamente en Telegram

### P0 — Transformacion IA (completado)
- [x] **Discovery Session 1**: Encuesta Discovery + Baseline aplicada (5 respuestas) — 24-25 Mar 2026
- [x] **Recolectar baseline**: Tiempos reales documentados — 26 Mar 2026
- [x] **AI Maturity baseline validado**: Promedio real 1.8 — 26 Mar 2026
- [x] **Documentos de Strategy team**: Workflow 12 pasos + 4 metodologias — 26 Mar 2026
- [x] **Analisis consolidado**: `adoption/DISCOVERY-FINDINGS.md` — 26 Mar 2026
- [ ] **Validar con Carlos**: Vision, Roadmap, AI Maturity Assessment (ver `strategy/`)
- [ ] **Validar con CMs**: Perfiles por vertical y modash-playbook (ver `knowledge/verticals/`)

### P0 — Tecnico
- [x] Arquitectura V2 desplegada: 7 agentes + sessions_spawn + Telegram Groups — 02-Abr-2026
- [x] SCP todos los workspaces a la VM + restart gateway
- [ ] Migrar gateway de nohup a systemd estable
- [ ] Configurar timezone Colombia (UTC-5) para todos los agentes

### P1 — API de Influencers (Modash o Influencers Club)
- [x] MNL tiene API key de Modash (confirmado 26-Mar)
- [x] Construir MCP server para Modash — 7 tools — 29-Mar-2026
- [ ] **BLOQUEADOR**: Modash API key tiene 0 creditos. Modash cuesta ~$16k USD/ano
- [ ] **Evaluando alternativa**: Influencers Club (~$249/mes). Free tier no da acceso API (403). Requiere plan pago para endpoints.
- [ ] Decision pendiente: Modash (activar creditos) vs Influencers Club (plan pago) vs otra alternativa
- [ ] Cuando se defina: desplegar MCP a VM + registrar en mcporter + actualizar Scout TOOLS.md

### P1 — Pendientes de Carlos (sesion 29-Mar-2026)
- [ ] **Google Sheet flujo de caja**: Carlos lo esta construyendo. Pedirle Sheet ID para conectar al Admin Bot via gog
- [x] **Scouting nivel senior**: Copy comercial con data — migrado a Scout (Influencer agent)
- [x] **Reportes para VPs**: Prompt del PM V3 incorpora framework 4 bloques analisis senior — desplegado 29-Mar
- [ ] **Creditos Modash**: Pedirle a Carlos/equipo que contacten soporte Modash para activar API

### P1 — Alta Prioridad
- [ ] **Workshop 1**: Onboarding equipo ampliado post-retro (depende de resultados del 09-Abr)
- [ ] **Pairing del equipo MNL** en los 7 bots de Telegram
- [x] Configurar HEARTBEAT.md para todos los agentes (V8.0 — checkpoints proactivos al iniciar sesion)
- [ ] Reactivar device auth en dashboard

### P2 — Mejoras
- [x] Activar memorySearch en openclaw.json — provider: gemini, activo 30-Mar-2026
- [x] Activar memoryFlush (compaction) — guarda automaticamente antes de compactar
- [x] Crear MEMORY.md para Estratega y Admin — semillas de memoria desplegadas
- [x] Protocolo de memoria en AGENTS.md de Estratega y Admin — instrucciones de guardar/buscar
- [ ] Agregar variables de entorno de optimizacion al servicio
- [ ] Implementar pipeline de aprobaciones (Funcion 3 — PM-VALUE-ANALYSIS.md)
- [ ] Implementar scoring de salud de campana (Funcion 4 — PM-VALUE-ANALYSIS.md)
- [ ] Evaluar Honcho (memoria por usuario) para Fase 2 cuando equipo completo use los bots

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
- **Impacto**: Reducido — Gemini 3.1 Pro funciona con API keys generadas directamente en Google AI Studio
- **Estado**: Workaround activo (API keys directas)

### B2: Gateway systemd restart loop (P1)
- **Problema**: OpenClaw self-respawn choca con systemd Type=simple — ciclo infinito de restart
- **Workaround**: Gateway corriendo con `nohup` (funcional pero no sobrevive reboot)
- **Fix pendiente**: Configurar `OPENCLAW_NO_RESPAWN=1` correctamente o cambiar Type=forking

---

## NOTAS TECNICAS

### LLM Configurado (actualizado 02-Abr-2026)
- **Orquestador, Radar, Musa, Scout**: `google/gemini-3.1-pro` (thinking: low)
- **PM**: `google/gemini-3-flash` (thinking: off) — optimizado para velocidad y costo
- **Admin**: `google/gemini-3-flash` — optimizado para velocidad y costo
- **Prometeo**: `github-copilot/gemini-3.1-pro-preview`
- **Fallbacks**: gemini-2.5-pro (default), gemini-2.5-flash (PM/Admin)

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

**HypeAuditor — estado verificado 17-Abr-2026 (tras activacion plan via email a support)**

Client ID: **2705001** (corregido — memoria anterior tenia 2840388 mal).

| Endpoint | Status | Notas |
|---|---|---|
| `auditor.suggester` | ✅ Gratis | Baseline de auth |
| `auditor.report?v=2` | ✅ Funciona | 97 Analytical Reports restantes |
| `auditor.tiktok` | ✅ Funciona | — |
| `auditor.reportMedia` | ✅ Post-unlock | Code 15 si el perfil no fue reportado antes |
| `auditor.search` (Discovery) | ✅ **DESBLOQUEADO** | `queries_left` arrancó en 1000. Factura dice 5000 mensual — discrepancia pendiente con Paula |
| `auditor.searchSandbox` | ✅ Funciona | No consume creditos |
| `auditor.tiktokMedia` | ❌ Code 8 "Invalid request" | NO es plan (todo activo), es contrato desconocido del endpoint — 8 variantes probadas, ninguna funciona. Pendiente aclaracion Paula |

**Codigos de error reales (verificados contra doc oficial):**
3=Unknown Method, 4=Invalid Token, 8=Invalid Request, 15=Access Denied, 27=No API Access. La memoria anterior interpretaba "code 4 = plan no incluye" — ERRONEO. Los codigos correctos son 27 (plan) o 15 (recurso no desbloqueado). Detalle: `memory/feedback_hypeauditor_error_codes.md`.

**Bug del CLI corregido**: `hypeauditor.mjs` leia `data.result.list` con shape flat. La doc oficial retorna `data.result.search_results` con items anidados (`basic.username`, `metrics.er.value`). Parser actualizado con fallback legacy. Hubiera fallado silenciosamente al activar Discovery.

**Nuevo comando: `hypeauditor media <username>`**. Llama `auditor.reportMedia` — devuelve 6-10 posts cacheados con likes, comments, views, ER, er_mark, caption, type. 0 creditos adicionales si el perfil ya fue reportado. Usado en Scout V2 para validar ER reciente de finalistas.

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
