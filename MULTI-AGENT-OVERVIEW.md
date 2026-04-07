# Mamba Negra — Sistema Multi-Agente IA V2

**Fecha**: 07 Abril 2026
**Version**: 2.1

---

## Que es esto?

Un sistema de **7 agentes de IA especializados por capacidad** que asisten al equipo de Mamba Negra Latam en todo el ciclo de vida de una campana de influencer marketing. Un Orquestador coordina el trabajo y spawna workers especializados en paralelo. Workers ejecutan tareas dentro de su dominio y pueden consultarse entre si.

Cada agente es un bot de Telegram. El equipo interactua con ellos en **Telegram Groups con Topics** — un topic por campana, una @mencion para dirigirse a un agente especifico. Si no mencionas a nadie, el Orquestador responde.

### Mejoras V8.0 (07-Abr-2026) — Workspace Files

La V8.0 mejoro los **workspace files** (AGENTS.md, SOUL.md, TOOLS.md, HEARTBEAT.md) de los 7 agentes sin cambios en la arquitectura, modelos ni comunicacion. Las mejoras principales:

- **Memoria inmediata**: Los agentes guardan informacion clave durante la conversacion (no solo al final)
- **HEARTBEAT universal**: Los 7 agentes ejecutan checkpoints proactivos al iniciar sesion (memoria, Campaign Strategy Index, Drive consolidation)
- **Cierre proactivo**: Al concluir una conversacion, el agente resume, guarda memoria, lista pendientes y sugiere proximo paso
- **LEARNINGS mejorado**: Protocolo write-then-confirm con tags destilados. Patrones recurrentes (3+) se escalan a instrucciones permanentes
- **Team directory**: IDs de Telegram del equipo disponibles para envio de DMs
- **Cross-notification**: El Orquestador notifica a otros agentes cuando recibe informacion estrategica nueva

---

## Los 7 Agentes

### 1. Orquestador — Coordinacion y Entregas
**Bot**: `@StrategyMambabot`

El cerebro coordinador de la agencia. Recibe briefs, decide que agentes invocar, sintetiza resultados y compila entregas. Ejecuta directamente los pasos iniciales (clasificacion, analisis del brief) y finales (compilacion, feedback, entrega). Spawna workers en paralelo para investigacion, creatividad y scouting.

| | |
|---|---|
| **Modelo** | google/gemini-3.1-pro |
| **Tools** | sessions_spawn, sessions_send, gog (Drive/Sheets), Notion |
| **Skills** | brief-to-strategy (orquestado), Google Form Briefs |
| **Es default** | Si — responde cuando nadie es mencionado en un grupo |
| **Le pides** | "Procesa el brief de Nike", "Arma la estrategia completa para esta campana" |
| **No le pides** | Investigacion profunda, busqueda de influencers, cronogramas |

### 2. Radar — Investigacion Profunda
**Bot**: `@RadarMambaBot`

El investigador. Se sumerge en datos duros (papers, reportes, estudios de mercado), datos sociales (tendencias, conversaciones, percepcion de marca), analisis competitivo (SWOT, gaps, benchmarks) y contexto Colombia/LATAM. Busca campanas pasadas en Drive.

| | |
|---|---|
| **Modelo** | google/gemini-3.1-pro |
| **Tools** | Tavily (5 tools incl. research), gog (Drive), sessions_send |
| **Skills** | competitor-analysis, market-research |
| **Le pides** | "Investiga la marca X y su mercado", "Que esta haciendo la competencia en redes?", "Tendencias de fitness en Colombia" |
| **No le pides** | Ideas creativas, busqueda de influencers, cronogramas |

### 3. Musa — Pensamiento Creativo
**Bot**: `@CreativeMambaBot`

La chispa creativa. Genera insights humanos, construye conceptos y proposiciones de marca, selecciona la metodologia de campana (RAYO/ARCO/PRISMA/MAREA), propone ideas de contenido con referencias visuales y mantiene el brand voice.

| | |
|---|---|
| **Modelo** | google/gemini-3.1-pro |
| **Tools** | gog (Drive), sessions_send |
| **Skills** | insight-builder, concept-builder |
| **Le pides** | "Dame un insight para campana de snacks con Gen Z", "Que metodologia usamos para awareness?", "Ideas de contenido para esta marca" |
| **No le pides** | Datos de mercado, busqueda de influencers, cronogramas, pagos |

### 4. Scout — Todo Influencers
**Bot**: `@InfluencerMambaBot`

El especialista en influencers. Busca y filtra perfiles, aplica scoring cuantitativo y cualitativo, ejecuta background check (brand safety), genera copy comercial por perfil con vision senior (directiva de Carlos), y define criterios de scouting para CMs.

| | |
|---|---|
| **Modelo** | google/gemini-3.1-pro |
| **Tools** | Tavily (background check), gog (Sheets/Drive), sessions_send, futura API influencers |
| **Skills** | scouting-shortlist (con copy comercial senior) |
| **Le pides** | "Busca influencers de lifestyle en Colombia 50k-200k", "Evalua este perfil para la campana X", "Shortlist con copy comercial para Nike" |
| **No le pides** | Estrategia creativa, cronogramas, pagos |

### 5. PM — Operaciones
**Bot**: `@PMMambabot`

El motor operativo. Lleva cronogramas, asigna tareas, monitorea avance, alerta atrasos, genera reportes de metricas y trackea feedback de videos por influencer. Conectado a Notion (22 tools) para gestion de proyectos.

| | |
|---|---|
| **Modelo** | google/gemini-3-flash |
| **Tools** | gog (Sheets/Drive), Notion (22 tools), sessions_send |
| **Skills** | 6 workflows (Notion + Sheets + feedback videos) |
| **Le pides** | "Como va la campana X?", "Crea cronograma para Nike", "Que campanas tiene Tatiana?", "Status del feedback de videos" |
| **No le pides** | Estrategia, investigacion, creatividad, pagos |

### 6. Admin — Finanzas
**Bot**: `@AdmonMambaBot`

El guardian de los numeros. Gestiona contratos, pagos a influencers y proveedores, base pago, cuentas de cobro y facturacion. Memoria activa para tracking financiero.

| | |
|---|---|
| **Modelo** | google/gemini-3-flash |
| **Tools** | gog, sessions_send |
| **Le pides** | "Cuanto se le debe al influencer Z?", "Ya se firmo el contrato?", "Que pagos vencen esta semana?" |
| **No le pides** | Estrategia, cronogramas, investigacion, creatividad |

### 7. Prometeo — Tecnico / Dev
**Bot**: `@PrometeoMNBot`

El agente tecnico. Soporte de desarrollo, infraestructura y configuracion.

| | |
|---|---|
| **Modelo** | google/gemini-3.1-pro-preview |
| **Le pides** | Temas tecnicos y de desarrollo |

---

## Como se comunican

Los agentes usan tres patrones de comunicacion:

### 1. sessions_spawn (asincrono, paralelo)

El Orquestador lanza workers en paralelo. Cada worker corre en una sesion aislada. Se usa para trabajo pesado que puede ejecutarse simultaneamente.

```
Orquestador: sessions_spawn → Radar ("investiga marca Nike")
Orquestador: sessions_spawn → Scout ("explora perfiles fitness Colombia")
[Radar y Scout trabajan en paralelo, Orquestador recibe ambos resultados]
```

### 2. sessions_send (sincrono, consulta puntual)

Cualquier agente puede consultar a otro con una pregunta puntual. La respuesta es inmediata. No consume profundidad.

```
Musa: sessions_send → Radar ("necesito datos de engagement en TikTok Colombia")
Radar: responde con datos → Musa continua su trabajo
```

### 3. Referencia al usuario (manual)

Si la consulta requiere trabajo extenso fuera de la especialidad del agente, este recomienda al usuario hablar directamente con el bot correspondiente.

> "Eso es trabajo para @InfluencerMambaBot. Escribele directamente para que te arme la shortlist completa."

---

## Telegram Groups con Topics

El equipo trabaja en **grupos de Telegram con modo foro** (topics habilitados). Esto permite separar campanas en hilos independientes dentro del mismo grupo.

### Como funciona

- **@mencion** para dirigirse a un agente especifico en el grupo
- **Sin @mencion** → el Orquestador responde (es el agente default)
- **Topics** separan campanas — cada campana tiene su propio hilo
- **Nueva campana** = nuevo topic (la estratega lo crea, toma 5 segundos)
- **Nuevo miembro** = nuevo grupo personal + agregar los 7 bots (cero cambios en config)

### Grupos

| Grupo | Tipo | Miembros |
|-------|------|----------|
| "Mar - Strategy Room" | Personal | Mar + 7 bots |
| "Mae - Strategy Room" | Personal | Mae + 7 bots |
| "MNL Strategy Team" | Compartido | Mar + Mae + 7 bots + Carlos (opcional) |

---

## Cheat Sheet

```
Que necesitas?                          A quien le hablas?
------------------------------------------------------------
Procesar un brief completo               @StrategyMambabot
(el coordina todo)

Investigar marca/mercado/tendencia       @RadarMambaBot

Ideas creativas, conceptos, insights,    @CreativeMambaBot
metodologia de campana

Buscar/evaluar influencers,              @InfluencerMambaBot
shortlist con copy comercial

Timeline, estado de tareas, entregas     @PMMambabot

Contratos, pagos, facturacion            @AdmonMambaBot

No se a quien preguntarle                @StrategyMambabot
(el decide y redirige)
```

---

## Arquitectura tecnica

### Stack

| Componente | Tecnologia |
|------------|-----------|
| Plataforma | OpenClaw v2026.4.1 (nativo, Node.js 22 via fnm) |
| LLM | Google Gemini 3.1 Pro / 3 Flash (segun agente) |
| Canal | Telegram (7 bots, groupPolicy: open) |
| VM | GCP `openclaw-mambanegra` (e2-medium, Ubuntu 24.04) |
| Comunicacion | sessions_spawn (async) + sessions_send (sync) |
| Knowledge | campaign-framework.md, brand voice profiles (markdown local) |
| Integraciones | Notion (22 tools), Tavily (5 tools), gog (Drive/Sheets) |

### Config multi-agente en openclaw.json (simplificado)

```jsonc
{
  "agents": {
    "defaults": {
      "subagents": {
        "maxSpawnDepth": 1,
        "maxChildrenPerAgent": 5,
        "maxConcurrent": 12
      }
    },
    "list": [
      {
        "id": "orquestador",
        "default": true,
        "subagents": { "allowAgents": ["research", "creative", "influencer", "pm", "admin"] }
      },
      {
        "id": "research",
        "subagents": { "allowAgents": ["creative", "influencer"] }
      },
      {
        "id": "creative",
        "subagents": { "allowAgents": ["research", "influencer"] }
      },
      {
        "id": "influencer",
        "subagents": { "allowAgents": ["research", "creative"] }
      },
      { "id": "pm" },
      { "id": "admin" },
      { "id": "prometeo" }
    ]
  }
}
```

---

## Documentos relacionados

| Documento | Path |
|-----------|------|
| Design doc V2 | `docs/plans/2026-04-02-multi-agent-teams-design.md` |
| Protocolo de comunicacion | `clients/mamba-negra/agents/HANDOFF-PROTOCOL.md` |
| Status del proyecto | `clients/mamba-negra/STATUS.md` |
| Mapa de proceso con IA | `clients/mamba-negra/agents/PROCESS-AI-MAP.md` |
