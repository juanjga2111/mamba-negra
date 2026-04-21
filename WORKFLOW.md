# MNL — Workflow & Control Room

> **Home vivo del ritmo de trabajo de Mamba Negra.**
> Design doc que lo originó: `docs/plans/2026-04-21-mamba-workflow-roadmap-design.md`
> **Este archivo se actualiza en los rituales** (Lunes / Miércoles / Viernes).

---

## 0. Quick links

| Recurso | Link / Path |
|---|---|
| Sheet cost-attribution | https://docs.google.com/spreadsheets/d/1Vw6u22yl86tXzSqRLcEv3N3WvH8FcIVXZMahLBTzki8/edit |
| STATUS.md (estado general) | `./STATUS.md` |
| Dashboard OpenClaw | https://mamba.opclaworch.online |
| VM SSH directo | `ssh -i ~/.ssh/google_compute_engine juanj@34.176.239.204` |
| Page Notion "Control Room IA" | _(crear Vie 25)_ |

**One-liners de verificación**:
```bash
# Gateway + cron aggregator + cron manifest
ssh -i ~/.ssh/google_compute_engine juanj@34.176.239.204 \
  'ps aux | grep -v grep | grep openclaw | head -3; \
   tail -5 /home/juanj/.openclaw/telemetry/aggregator.log 2>/dev/null; \
   crontab -l | grep -E "aggregator|manifest-snapshot"'
```

---

## 1. Calendario semanal

### 🟢 Lunes AM — Salud + Costos (60-90 min)

Checklist:
- [ ] SSH VM → `ps aux | grep openclaw` → gateway vivo
- [ ] `tail -100 /tmp/openclaw-gw.log` → sin errores rojos
- [ ] Dashboard Gemini AI Studio → consumo ayer/semana
- [ ] **Abrir Sheet cost-attribution** → top 3 campañas + total vs $210/mes
- [ ] `hypeauditor credits` → >100 restantes
- [ ] Ping manual a 1-2 bots Telegram
- [ ] Actualizar columna **Mantener** abajo

### 🟡 Miércoles — Pulso piloto + Learnings agentes (90 min)

Checklist:
- [ ] DM a 2-3 del equipo: ¿qué funcionó / qué no esta semana?
- [ ] Revisar `.learnings/` de los 7 agentes (diff vs semana pasada)
- [ ] Revisar `memory/YYYY-MM-DD-*.md` por agente → ¿calidad OK?
- [ ] Revisar `USER.md` auto-editado → ¿cambios coherentes?
- [ ] Detectar red flags: agente sin escribir 7d, memoria basura, USER.md contradictorio
- [ ] Actualizar columna **Observar** abajo

### 🔴 Viernes PM — Cierre + Push Notion + Pick (60 min)

Checklist:
- [ ] Actualizar columna **Construir** (qué avancé, qué queda)
- [ ] Resumir semana en 1 párrafo (Mantener / Observar / Construir)
- [ ] Push resumen a página Notion "Control Room IA"
- [ ] Pick 1 feature para próxima semana (ver backlog Construir)
- [ ] Si es viernes fin de mes → resumen mensual a Carlos

**Reglas de flex**:
- Semana liviana (2 días): Lunes + Viernes obligatorios. Miércoles opcional.
- Semana heavy (3 días): los 3 rituales.
- Si salta ritual 2 semanas seguidas → revisar diseño.

---

## 2. Matriz viva

### 🟢 MANTENER — lo que ya existe y requiere vigilancia

| Ítem | Check del Lunes | Umbral rojo | Status |
|---|---|---|---|
| Gateway + 7 bots vivos | `ps aux \| grep openclaw` + ping manual | Gateway muerto >12h | 🟢 |
| Cron manifest-snapshot | `tail manifest-snapshot.log` | 0 líneas nuevas en 2h | 🟢 |
| Cron aggregator (01:00 Bogotá) | `tail aggregator.log` | Log sin corrida del día | 🟡 primera corrida mañana |
| Sheet cost-attribution | Top 3 campañas + total vs $210/mes | >80% budget mid-month | 🟢 poblado 21-Abr |
| HypeAuditor credits | `hypeauditor credits` | <100 credits | — |
| Gemini API quotas | Dashboard AI Studio | Cualquier 429 en logs | 🟢 Tier 3 |
| Memoria agentes (7) | `ls memory/` por agente | Agente sin escribir 7d | — |

### 🟡 OBSERVAR — diagnóstico / investigación

| Ítem | Status inicial | Next step |
|---|---|---|
| Razonamiento agentes (thinking low en todos) | Identificado 21-Abr | Auditoría Mié 22 + quick wins Jue 23 |
| Agentes que hagan preguntas antes de ejecutar | Patrón ausente | Adaptar `brainstorming` skill → Orquestador |
| Pulso equipo piloto (Mar, Juangui, Maca, Laura+) | Semanal DM | Registrar quejas/wins cada Miércoles |
| Fine-tuning Vertex / Gemma 4 | Parqueado | Revisitar Q3 2026, no antes |
| Aggregator "uncategorized 94.5%" | Normal por data histórica | Si no baja de 40% en 3 semanas, investigar |

### 🔴 CONSTRUIR — features con fecha / objetivo

| Ítem | Prio | Estimado | Blocker | Owner |
|---|---|---|---|---|
| Auditoría razonamiento agentes | P0 | 2-3h | — | `openclaw-engineer` (Mié 22) |
| Quick wins: thinking "high" en 4 grandes | P0 | 30 min | — | Juan (Jue 23) |
| Topic-registry patches memoria multi-CM | P0 | ~1h | — | `openclaw-engineer` |
| Brainstorming pattern en Orquestador | P1 | 2h | auditoría | `openclaw-engineer` |
| Admin V2 (features reales) | P1 | 4-6h | Carlos entrega Sheet flujo caja | `agent-designer` |
| Gateway systemd estable (B2) | P1 | 2-3h | — | `infra-engineer` |
| Timezone Colombia en 7 agentes | P2 | 30 min | — | Juan manual |
| Fase 6 cost-aggregator (topic audit skill) | P2 | 2h | — | `infra-engineer` |
| Cookies IG para reel-analyzer | P2 | 15 min | Acceso Chrome local | Juan manual |

---

## 3. Mapa agentes / skills (referencia rápida)

### Cuándo invocar qué

| Escenario | Herramienta |
|---|---|
| "Los agentes no están aprendiendo bien" | `openclaw-engineer` teammate |
| "Quiero mejorar un agente existente" | skill `agent-orchestration-improve-agent` + `openclaw-engineer` |
| "Algo se rompió en producción" | skill `superpowers:systematic-debugging` + `infra-engineer` |
| "Necesito reporte a Carlos" | `report-generator` teammate (background) |
| "Quiero construir feature nueva" | SIEMPRE `superpowers:brainstorming` primero → `writing-plans` → ejecutar |
| "Deploy a VM" | `infra-engineer` teammate |
| "Status del proyecto" | `/mamba-status` skill |
| "Reporte trimestral" | `/quarterly-report` skill |
| "Evaluación madurez IA" | `/ai-maturity` skill |

### Agentes (teammates) disponibles

- **`openclaw-engineer`** — agentes MNL, workspaces, memoria, skills, multi-agent
- **`agent-designer`** — diseñar agente nuevo / rediseñar openclaw.json
- **`infra-engineer`** — VM, cron, systemd, scripts, deploys
- **`report-generator`** — reportes para Carlos
- **`workshop-designer`** — onboarding / training del equipo
- **`researcher`** — AI/influencer marketing, competencia
- **`Explore` / `Plan` / `general-purpose`** — utilitarios genéricos

### Skills Mamba

- `/mamba-status` `/ai-maturity` `/quarterly-report` `/prep-discovery` `/drive-sync`

### Skills superpowers clave

- `brainstorming` `writing-plans` `executing-plans` `systematic-debugging` `verification-before-completion` `agent-orchestration-improve-agent`

---

## 4. Registro semanal (append-only)

### Semana 17 (21-27 Abr 2026)

**Mar 21 (noche)**
- Deploy Fases 2-3 cost-aggregator → Sheet poblado, aggregator corriendo cada 01:00 Bogotá
- Diseño workflow & roadmap aprobado (ver `docs/plans/2026-04-21-...`)
- Creado este `WORKFLOW.md` + SCP a workspace Prometeo

**Mié 22** _(pendiente)_
- Auditoría razonamiento agentes (lanzar `openclaw-engineer`)
- Ritual Miércoles light

**Jue 23** _(pendiente)_
- Quick wins: thinking "high" en Orquestador, Radar, Musa, Scout

**Vie 25** _(pendiente)_
- Primer ritual Viernes completo
- Crear página Notion "Control Room IA"
- Pick semana 18

---

## 5. Pick próxima semana

**Semana 18 (26 Abr - 2 May)**: _(se decide Vie 25)_. Candidatos:
1. Topic-registry patches memoria multi-CM (P0, plan listo)
2. Brainstorming pattern → Orquestador (P1, depende de auditoría)
3. Gateway systemd estable (P1)

---

**Última actualización**: 2026-04-21 23:30 UTC
