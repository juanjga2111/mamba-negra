# Mamba Negra — Sistema Multi-Agente IA

**Fecha**: 13 Marzo 2026
**Version**: 1.0

---

## Que es esto?

Un sistema de 3 agentes de IA especializados que asisten al equipo de Mamba Negra Latam en todo el ciclo de vida de una campana de influencer marketing. Cada agente es un bot de Telegram con su propio dominio de expertise, y pueden consultarse entre si cuando una pregunta cruza dominios.

---

## Los 3 Agentes

### 1. Estratega — Jefe de Estrategia Digital

El cerebro estrategico de la agencia. Entiende briefs, construye propuestas, define criterios de seleccion de influencers y documenta aprendizajes.

| | |
|---|---|
| **Canal** | Bot de Telegram dedicado |
| **Fases que cubre** | 1 (Brief), 2 (Estrategia), 4 (Scouting), 8 (Reporte), 9 (Aprendizajes) |
| **Le preguntas** | "Que perfil de influencer necesitamos para este brief?", "Cuales son los criterios de scoring para campana de awareness?" |
| **No le preguntas** | Cronogramas, estados de tareas, pagos, contratos |

### 2. PM — Project Manager de Campanas

El motor operativo. Lleva cronogramas, asigna tareas, monitorea avance, alerta atrasos y mantiene la documentacion en orden.

| | |
|---|---|
| **Canal** | Bot de Telegram dedicado |
| **Fases que cubre** | 3 (Gantt), 4 (Tracking scouting), 5 (Aprobaciones), 6 (Ejecucion), 8 (Reporte) |
| **Le preguntas** | "Como va la campana X?", "Que campanas tiene Maria?", "Ya se aprobo el contenido?" |
| **No le preguntas** | Estrategia de influencers, pagos, contratos |

### 3. Admin — Asistente Administrativo y Financiero

El guardian de los numeros. Gestiona pagos a proveedores e influencers, contratos, cuentas de cobro y facturacion.

| | |
|---|---|
| **Canal** | Bot de Telegram dedicado |
| **Fases que cubre** | 7 (Base Pago / Costos), apoyo en 4 (contratos) y 6 (pagos durante ejecucion) |
| **Le preguntas** | "Cuanto se le debe al influencer Z?", "Ya se firmo el contrato?", "Que pagos vencen esta semana?" |
| **No le preguntas** | Estrategia, cronogramas, asignacion de tareas |

---

## El Framework: 9 Fases del Ciclo de Campana

Basado en el Manual Maestro del Campaign Manager de MNL. Este framework es el "mapa" que los 3 agentes comparten y entienden.

```
FASE 1          FASE 2            FASE 3           FASE 4
Recepcion  -->  Construccion -->  Cronograma  -->  Scouting +
del Brief       Estrategica       Gantt            Negociacion
[Comercial]     [Strategy]        [CM]             [CM]
 Estratega       Estratega         PM          Estratega + PM

    |               |                |               |
    v               v                v               v

FASE 5          FASE 6            FASE 7           FASE 8          FASE 9
Aprobaciones -> Ejecucion y  -->  Reporte de  -->  Reporte   -->  Aprendizajes
Internas        Seguimiento       Costos           Final
[CM+Strat+Com]  [CM]              [CM+Admin]       [CM+Design]    [CM]
    PM              PM               Admin        PM+Estratega    Estratega
```

### Detalle por Fase

| # | Fase | Objetivo | Owner | Agente(s) | Entregable | Trigger de salida |
|---|------|----------|-------|-----------|------------|-------------------|
| 1 | Recepcion del Brief | Recibir y distribuir el brief del cliente | Comercial | Estratega | Brief compartido a Strategy + CM | Brief distribuido a todos |
| 2 | Construccion Estrategica | Definir objetivo, funnel, rol de influencers, tipo de contenidos | Strategy | Estratega | Estrategia aprobada por comercial | Comercial aprueba estrategia |
| 3 | Cronograma Gantt | Crear timeline operativo con hitos | CM | PM | Cronograma validado con comercial y brand manager | Gantt aprobado |
| 4 | Scouting + Negociacion | Buscar, evaluar y negociar con influencers | CM | Estratega + PM | Shortlist con scoring + estado de negociacion | Influencers confirmados |
| 5 | Aprobaciones Internas | Validar contenido con CM, Strategy, Comercial y Cliente | CM | PM | Contenido aprobado (doble aprobacion MN + Marca) | Cliente aprueba |
| 6 | Ejecucion y Seguimiento | Monitorear publicaciones, calidad y KPIs | CM | PM | KPIs monitoreados, alertas tempranas | Campana ejecutada |
| 7 | Reporte de Costos | Diligenciar Base Pago con valores y fechas | CM + Admin auxiliar | Admin | Documento Base Pago completo | Todos los pagos registrados |
| 8 | Reporte Final | Recolectar data y armar documento visual | CM + Design | PM + Estratega | Reporte presentado al cliente | Reporte entregado |
| 9 | Aprendizajes | Documentar que funciono, que no, insights | CM | Estratega | Documento de aprendizajes por marca | Documentado y archivado |

---

## Como se comunican los agentes entre si

Los agentes no son islas. Cuando uno recibe una pregunta que toca el dominio de otro, puede **consultarlo internamente** via `sessions_send` y responder al usuario con la informacion completa — sin que el usuario tenga que cambiar de bot.

### Ejemplos de consultas cruzadas

| Situacion | Agente que recibe | Consulta interna a | Que pasa |
|-----------|-------------------|-------------------|----------|
| "Como va la campana X? Y cuales eran los criterios de scoring?" | PM | Estratega | PM responde el estado + incluye criterios que le dio el Estratega |
| "Ya se firmo el contrato con Y?" (preguntado al PM) | PM | Admin | PM responde con la info de contrato que le dio Admin |
| "En que fase va la campana X?" (preguntado al Estratega) | Estratega | PM | Estratega responde con info de avance que le dio PM |

### Cuando SI deriva al usuario

Si la consulta requiere una conversacion extendida (no una sola pregunta), el agente dice:

> "Eso requiere trabajo detallado con [PM/Estratega/Admin]. Preguntale directamente en su bot."

---

## Reglas transversales del sistema

Estas reglas vienen del Manual MNL y aplican a los 3 agentes:

| Regla | Descripcion |
|-------|-------------|
| **Doble aprobacion** | Nada sale sin aprobacion de MN + Marca |
| **Alarma temprana** | Si algo falla en ejecucion, escalar al comercial inmediatamente |
| **Gestion de capacidad** | Si la carga compromete calidad, el CM alerta al comercial |
| **Cambios de alcance** | No se aceptan del cliente directo, se escalan al comercial |
| **Confidencialidad** | Toda informacion de marcas, presupuestos e influencers es confidencial |
| **Gestion documental** | Carpetas por marca y campana en Drive/Notion, links centralizados |
| **El silencio es riesgo** | Comunicacion radicalmente clara en todo momento |

---

## Arquitectura tecnica

### Stack

| Componente | Tecnologia |
|------------|-----------|
| Plataforma | OpenClaw v2026.3.11 (nativo, Node.js 22) |
| LLM | Google Gemini 2.5 Pro (fallback: 2.5 Flash) |
| Canal | Telegram (1 bot por agente, dmPolicy: pairing) |
| VM | GCP `openclaw-mambanegra` (e2-medium, Ubuntu 24.04) |
| Comunicacion inter-agente | sessions_send (sincrono) |
| Knowledge compartido | `campaign-framework.md` (markdown local) |
| Futuro | MCP Notion, MCP Google Drive, Mission Control |

### Config multi-agente en openclaw.json (simplificado)

```jsonc
{
  "agents": {
    "defaults": {
      "subagents": { "maxSpawnDepth": 1, "maxChildrenPerAgent": 3 }
    },
    "list": [
      {
        "id": "estratega",
        "workspace": "~/.openclaw/workspace-estratega",
        "subagents": { "allowAgents": ["pm", "admin"] }
      },
      {
        "id": "pm",
        "workspace": "~/.openclaw/workspace-pm",
        "subagents": { "allowAgents": ["estratega", "admin"] }
      },
      {
        "id": "admin",
        "workspace": "~/.openclaw/workspace-admin",
        "subagents": { "allowAgents": ["pm", "estratega"] }
      }
    ]
  },
  "channels": {
    "telegram-estratega": { "botToken": "..." },
    "telegram-pm": { "botToken": "..." },
    "telegram-admin": { "botToken": "..." }
  },
  "bindings": [
    { "agentId": "estratega", "match": { "channel": "telegram-estratega" } },
    { "agentId": "pm", "match": { "channel": "telegram-pm" } },
    { "agentId": "admin", "match": { "channel": "telegram-admin" } }
  ]
}
```

### Estructura de archivos en el repo

```
clients/mamba-negra/
├── STATUS.md                     # Estado general del proyecto
├── MULTI-AGENT-OVERVIEW.md       # Este documento
├── openclaw.json                 # Config de 3 agentes
├── knowledge/
│   ├── campaign-framework.md     # Framework de 9 fases (COMPARTIDO)
│   └── influencer-scoring.md     # Criterios de scoring
├── workspaces/
│   ├── estratega/                # Agente Estratega
│   │   ├── AGENTS.md
│   │   ├── SOUL.md
│   │   └── USER.md
│   ├── pm/                       # Agente PM
│   │   ├── AGENTS.md
│   │   ├── SOUL.md
│   │   └── USER.md
│   └── admin/                    # Agente Admin
│       ├── AGENTS.md
│       ├── SOUL.md
│       └── USER.md
└── n8n-workflows/
    └── README.md
```

---

## Roadmap de implementacion

### Fase 1: Framework + PM (prioridad)
- Crear `campaign-framework.md` (documento compartido de 9 fases)
- Crear workspace del agente PM
- Evolucionar Estratega V0 a V1 (conciencia del framework)
- Actualizar `openclaw.json` con 2 agentes + sessions_send
- Desplegar y probar en VM

### Fase 2: Admin
- Crear workspace del agente Admin
- Agregar tercer agente a `openclaw.json`
- Probar los 3 juntos con sessions_send

### Fase 3: Iteracion con equipo real
- Equipo MNL prueba los 3 bots
- Feedback y refinamiento de AGENTS.md
- Conectar MCP (Notion, Drive)

### Futuro: Growth Path del equipo
- Agente o modulo para trackear desempeno
- Scorecard interno (6 criterios del manual)
- Criterios de decision para promocion

---

## Documentos relacionados

| Documento | Path |
|-----------|------|
| Design doc completo | `docs/plans/2026-03-13-mamba-negra-multi-agent-design.md` |
| Status del proyecto | `clients/mamba-negra/STATUS.md` |
| Manual Maestro CM (fuente) | `C:\Users\juanj\Downloads\MANUAL MAESTRO - CM MNL.pdf` |
| Fase 1A Discovery | `clients/mamba-negra/FASE1A-DISCOVERY.md` |
| Diseno de despliegue | `docs/plans/2026-03-12-mamba-negra-deploy-design.md` |
