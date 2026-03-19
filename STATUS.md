# STATUS — Mamba Negra

**Ultima actualizacion**: 17 Marzo 2026 (post-review session)

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
- **Sistema multi-agente**: 3 bots Telegram (Estratega, PM, Admin) — desplegados y operativos desde 16-Mar-2026

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
- OpenClaw **2026.3.13** (instalacion nativa, sin Docker)
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

## SISTEMA MULTI-AGENTE — EN PRODUCCION

> **Desplegado**: 16-Mar-2026. Los 3 agentes estan corriendo en Telegram y accesibles via dashboard web.
> **Design doc**: `docs/plans/2026-03-13-mamba-negra-multi-agent-design.md`

### Arquitectura
- **Patron**: 3 bots independientes + sessions_send (sincrono) entre ellos
- **Framework compartido**: `knowledge/campaign-framework.md` (9 fases del ciclo de campana)
- **LLM**: `google/gemini-3.1-pro` con fallback a `google/gemini-2.5-pro`
- **Thinking**: Nivel `low` (piensa internamente, no muestra razonamiento)
- **MCP/Skills PM**: Notion (mcporter), Google Drive/Sheets/Docs (gog v0.12.0)
- **MCP Estratega/Admin**: Pendiente — configurar segun funciones de cada agente
- **Dashboard**: https://mamba.opclaworch.online

### Bots de Telegram

| Agente | Bot | Token var | Estado |
|--------|-----|-----------|--------|
| Estratega | @StrategyMambabot | `TELEGRAM_BOT_TOKEN_ESTRATEGA` | ACTIVO, pareado |
| PM | @PMMambabot | `TELEGRAM_BOT_TOKEN_PM` | ACTIVO, pareado |
| Admin | @AdmonMambaBot | `TELEGRAM_BOT_TOKEN_ADMIN` | ACTIVO, pareado |

**Usuario pareado**: Juan Jose (Telegram ID: 6107170400)

### Gemini API Keys (Google AI Studio, proyecto 922302496243)

| Nombre | Agente/Uso |
|--------|------------|
| Mambabot Agent | Gateway principal (en .env como GEMINI_API_KEY) |
| PM Mamba | Respaldo |
| Admin Mamba | Respaldo |

### Agente 1: Estratega

- **Rol**: Asistente IA de estrategia digital (NO "jefe" — transparente sobre ser IA)
- **Bot Telegram**: @StrategyMambabot
- **Fases**: 1 (Brief), 2 (Estrategia), 4 (Scouting), 8 (Reporte), 9 (Aprendizajes)
- **Workspace repo**: `workspaces/estratega/` (AGENTS.md V1, SOUL.md V1)
- **Workspace VM**: `~/.openclaw/workspace/estratega/`
- **sessions_send a**: PM, Admin

### Agente 2: PM — Project Manager (SETUP COMPLETO 16-Mar-2026)

- **Rol**: Asistente IA de gestion de proyectos
- **Bot Telegram**: @PMMambabot
- **Fases**: 3 (Gantt), 4 (Tracking), 5 (Aprobaciones), 6 (Ejecucion), 8 (Reporte)
- **Workspace repo**: `workspaces/pm/` (7 archivos: AGENTS.md V1.1, SOUL.md V1.1, USER.md, IDENTITY.md, TOOLS.md, MEMORY.md, HEARTBEAT.md)
- **Workspace VM**: `~/.openclaw/workspace/pm/`
- **sessions_send a**: Estratega, Admin
- **Notion MCP**: Configurado via mcporter — workspace personal Juan Jose (temporal)
- **Google Drive/Sheets/Docs**: gog con OAuth ia@mambanegramkt.com
- **Skills**: mcporter, gog, healthcheck, skill-creator, tmux, weather
- **Memoria**: Instruccion de guardar/consultar memoria entre sesiones (AGENTS.md V1.1)

### Agente 3: Admin — Asistente Administrativo

- **Rol**: Asistente IA de gestion financiera y administrativa
- **Bot Telegram**: @AdmonMambaBot
- **Fases**: 7 (Base Pago/Costos), apoyo en 4 (contratos) y 6 (pagos)
- **Workspace repo**: `workspaces/admin/` (AGENTS.md, SOUL.md V1.1, USER.md)
- **Workspace VM**: `~/.openclaw/workspace/admin/`
- **sessions_send a**: PM, Estratega

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
├── openclaw.json          # Config central (3 agentes, plugins, bindings)
├── .env                   # Tokens y API keys (chmod 600)
├── openclaw.json.bak      # Backup del doctor
├── workspace/
│   ├── estratega/
│   │   ├── AGENTS.md      # V1 — asistente IA estrategia digital
│   │   ├── SOUL.md        # V1 — con regla no-mostrar-razonamiento
│   │   └── USER.md
│   ├── pm/
│   │   ├── AGENTS.md      # V1.1 — con gestion de memoria
│   │   ├── SOUL.md        # V1.1 — regla no-razonamiento
│   │   ├── USER.md
│   │   ├── IDENTITY.md    # PM, 📋
│   │   ├── TOOLS.md       # Guia gog + Notion + sessions_send
│   │   ├── MEMORY.md      # Semilla de memoria
│   │   ├── HEARTBEAT.md   # Vacio (sin heartbeat activo)
│   │   └── memory/        # Logs diarios (auto-creado)
│   ├── admin/
│   │   ├── AGENTS.md
│   │   ├── SOUL.md
│   │   └── USER.md
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
| campaign-process.md | V1 | Flujo operacional |
| influencer-scoring.md | V1 | Criterios cuanti/cuali, pendiente umbrales reales |
| modash-playbook.md | V1 | Playbook completo de Modash |
| README.md | Actualizado | Indice del knowledge base |
| verticals/ (5 archivos) | V1 | consumo-masivo, belleza, inmobiliario, calzado, servicios |
| Research/ (4 PDFs) | Referencia | Papers de IA en agencias, KPIs, agentic enterprise |

**Veredicto**: 10 archivos + 4 PDFs. Knowledge base V1 completo. Pendiente enriquecer con data real en discovery.

### Capa 3: Adopcion (`adoption/`)
| Archivo | Estado | Notas |
|---------|--------|-------|
| AI-LITERACY.md | Creado | Programa 3 niveles por rol |
| TRAINING-PLAN.md | Creado | Plan de capacitacion diferenciado |
| ADOPTION-METRICS.md | Creado | Metricas de adopcion y senales de alarma |
| PROCESS-REORG.md | Creado | Rediseno de procesos con IA |
| workshops/discovery-sessions.md | Creado | Guia de discovery (migrado de FASE1A-DISCOVERY.md) |

**Veredicto**: 5 archivos. Framework de adopcion completo. Pendiente ejecutar con el equipo.

### Capa 4: Agentes (`agents/`)
| Archivo | Estado | Notas |
|---------|--------|-------|
| openclaw.json | Desplegado | 3 agentes, Gemini 3.1 Pro, Telegram plugin, gog skill |
| .env.example | Actualizado | 3 bot tokens documentados con bot handles y fechas |
| workspaces/estratega/ | 3 archivos | AGENTS.md V1, SOUL.md V0, USER.md V0 |
| workspaces/pm/ | 7 archivos | AGENTS.md V1.1, SOUL.md V1.1, USER.md, IDENTITY.md, TOOLS.md V2, MEMORY.md, HEARTBEAT.md |
| workspaces/admin/ | 3 archivos | AGENTS.md V1, SOUL.md V1.1 (actualizado en review), USER.md V1 |
| n8n-workflows/README.md | Placeholder | Vacio — workflows planeados para Fase 1C |

**Veredicto**: Config correcta, coincide con VM desplegada. PM es el agente mas completo. Admin SOUL.md actualizado a V1.1. Pendiente desplegar Admin SOUL.md V1.1 a VM.

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

### P0 — Transformacion IA (Semana 1)
- [ ] **Discovery Session 1**: Diagnostico operacional con equipo (ver `my-toolkit/templates/discovery-session-guide.md`)
- [ ] **Recolectar baseline**: Encuesta de 15 min a cada CM (ver `measurement/BASELINE.md`)
- [ ] **Validar con Carlos**: Vision, Roadmap, AI Maturity Assessment (ver `strategy/`)
- [ ] **Validar con CMs**: Perfiles por vertical y modash-playbook (ver `knowledge/verticals/`)

### P0 — Tecnico (Critico)
- [x] Agregar regla no-mostrar-razonamiento a SOUL.md de Admin (17-Mar-2026, review session)
- [ ] Probar sessions_send entre agentes — pendiente re-test
- [ ] Migrar gateway de nohup a systemd estable
- [ ] Desplegar SOUL.md V1.1 de Admin a la VM (pendiente SCP)

### P1 — Alta Prioridad
- [ ] **Workshop 1**: Onboarding PM Bot con equipo (Semana 3) — ver `adoption/TRAINING-PLAN.md`
- [ ] **Pairing del equipo MNL** en los 3 bots de Telegram
- [ ] Configurar MCP/tools para Estratega
- [ ] Configurar MCP/tools para Admin
- [ ] Configurar HEARTBEAT.md para Daily Digest del PM
- [ ] Reactivar device auth en dashboard

### P2 — Mejoras
- [ ] Activar memorySearch en openclaw.json
- [ ] Agregar variables de entorno de optimizacion al servicio
- [ ] Implementar pipeline de aprobaciones (Funcion 3 — PM-VALUE-ANALYSIS.md)
- [ ] Implementar scoring de salud de campana (Funcion 4 — PM-VALUE-ANALYSIS.md)

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
- [ ] Discovery sessions con equipo (Semana 1)
- [ ] Recolectar baseline de metricas (Semana 1)
- [ ] Validar vision + roadmap con Carlos (Semana 2)
- [ ] Workshop 1: Onboarding PM Bot (Semana 3)

**Mes 2 — Adopcion + Agentes V2**
- [ ] Shadow mode: equipo usa agentes en paralelo a proceso normal
- [ ] Workshop 2: Modash + IA (cuando Estratega tenga tools)
- [ ] Agentes V2 con feedback incorporado
- [ ] Configurar MCP para Estratega y Admin

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

### LLM Configurado
- **Primary**: `google/gemini-3.1-pro`
- **Fallback**: `google/gemini-2.5-pro`
- **Thinking**: `low` (razonamiento interno, no mostrado al usuario)

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

### MCP y Skills configurados (PM)
- **Notion**: via mcporter (`~/.mcporter/mcporter.json`), token en env NOTION_TOKEN
- **Google Drive/Sheets/Docs**: via gog skill, OAuth en `~/.config/gogcli/`, env GOG_KEYRING_PASSWORD + GOG_ACCOUNT en openclaw.json skills.entries
- **OAuth credentials**: `~/.openclaw/gog-oauth.json` (Desktop App, proyecto GCP 922302496243)
- **Auth headless**: `gog auth add --remote --step 1` → copiar URL → autorizar → `--step 2 --auth-url <callback>`

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

**Estado general (17-Mar-2026, post-review)**: Proyecto de **TRANSFORMACION INTEGRAL CON IA** en 7 capas — todas las capas creadas y revisadas. 3 bots Telegram operativos en produccion. PM con Notion (19 DBs) + Google Workspace. Knowledge base V1 completo (10 archivos + 4 PDFs research). Toolkit del AI Strategy Lead operativo (metodologia + 3 agentes + 1 skill + 6 templates). Admin SOUL.md actualizado a V1.1 (pendiente deploy a VM). **Proximo paso**: Discovery sessions con equipo (Semana 1) + validar vision/roadmap con Carlos.
