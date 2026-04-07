# Protocolo de Comunicacion entre Agentes — Mamba Negra V2

**Fecha**: 07 Abril 2026
**Version**: 2.1 — Actualizado con V8.0 (mejoras en persistencia de contexto)

---

## Principio Fundamental

El equipo NO necesita saber como funcionan los agentes internamente. Solo necesitan saber **a quien escribirle**. Los handoffs entre agentes ocurren automaticamente via `sessions_spawn` y `sessions_send`, o por indicacion al usuario cuando corresponde.

### Persistencia de Contexto entre Sesiones (V8.0)

Desde V8.0 (07-Abr-2026), los 7 agentes tienen mecanismos mejorados para mantener contexto:
- **Memoria inmediata**: Los agentes guardan aprendizajes DURANTE la conversacion (no al final), evitando perdida de memoria si la sesion se interrumpe.
- **HEARTBEAT.md**: Cada agente tiene un archivo HEARTBEAT.md con sus prioridades diarias, estado de campanas activas, y Drive consolidation. Esto asegura que al iniciar una nueva sesion, el agente retoma contexto sin que el usuario deba repetir informacion.
- **Cierre proactivo de sesion**: Al cerrar, cada agente genera un resumen con pendientes y proximo paso sugerido — este contexto alimenta la siguiente sesion.
- **Team-directory en TOOLS.md**: Cada agente conoce los IDs de Telegram de sus companeros para comunicacion directa.

---

## Topologia de Comunicacion

```
                Orquestador
               ↗     ↑     ↘        (sessions_spawn)
        Radar  ←→  Musa  ←→  Scout   (sessions_send)
                     ↕
                 PM / Admin
```

- **Orquestador** puede spawnear a Radar, Musa, Scout, PM y Admin
- **Radar, Musa y Scout** pueden consultarse entre si via sessions_send
- **PM y Admin** reciben consultas via sessions_send pero no spawnan a nadie
- **Prometeo** opera de forma independiente

---

## Tres Patrones de Comunicacion

### 1. sessions_spawn (asincrono)

**Quien lo usa**: Solo el Orquestador.
**Para que**: Lanzar workers en paralelo para trabajo pesado. Cada worker corre en una sesion aislada. Consume profundidad (maxSpawnDepth: 1).

```
Orquestador: sessions_spawn → Radar ("investiga marca Nike, mercado deportivo Colombia")
Orquestador: sessions_spawn → Scout ("explora perfiles fitness/lifestyle en Colombia, 50k-200k")
[Radar y Scout trabajan en paralelo]
[Orquestador recibe ambos resultados cuando terminan]
```

### 2. sessions_send (sincrono)

**Quien lo usa**: Cualquier agente.
**Para que**: Consulta puntual a otro agente. Respuesta inmediata. NO consume profundidad.

```
Musa: sessions_send → Radar ("datos de engagement promedio en TikTok Colombia para fitness")
Radar: responde con datos
Musa: continua construyendo el concepto con datos reales
```

### 3. Referencia al usuario (manual)

**Quien lo usa**: Cualquier agente.
**Para que**: Cuando la consulta esta fuera de su especialidad Y requiere trabajo extenso (no una sola pregunta). El agente recomienda al usuario hablar directamente con el bot correspondiente.

> "Eso es trabajo extenso de investigacion. Escribele a @RadarMambaBot directamente para que se sumerja en el tema."

---

## Flujo Orquestado Completo (brief-to-delivery)

Un brief de campana procesado de principio a fin:

```
PASO 1: Mar escribe "@StrategyMambabot procesa el brief de Nike"

PASO 2: Orquestador lee el brief (Drive/Google Form)

PASO 3: Orquestador ejecuta directamente:
        - Clasifica tipo de campana (RAYO/ARCO/PRISMA/MAREA)
        - Identifica info faltante
        - Define alcance y objetivos

PASO 4: Orquestador lanza workers en paralelo:
        sessions_spawn → Radar ("investiga marca Nike, mercado deportivo Colombia")
        sessions_spawn → Scout ("explora perfiles fitness/lifestyle Colombia")
        [Radar y Scout trabajan simultaneamente]

PASO 5: Orquestador recibe resultados de Radar y Scout

PASO 6: Orquestador lanza worker creativo con el research:
        sessions_spawn → Musa ("con este research, construye insight y concepto para Nike")

PASO 7: Musa trabaja. Si necesita datos adicionales:
        sessions_send → Radar ("engagement promedio en Instagram fitness Colombia")

PASO 8: Orquestador recibe resultado creativo de Musa

PASO 9: Orquestador compila entrega parcial:
        - Research + shortlist de influencers + concepto creativo
        - Presenta a Mar en el topic de la campana

PASO 10: Mar da feedback → Orquestador ajusta
         (puede re-spawnear workers si el feedback lo requiere)

PASO 11: Orquestador compila entrega final

PASO 12: Orquestador guarda en Drive + actualiza Index
```

---

## Reglas de Derivacion

### Cuando manejar internamente (sessions_send)

Un agente usa sessions_send para resolver la consulta sin molestar al usuario:

| Agente | Consulta interna a | Ejemplo |
|--------|-------------------|---------|
| Musa | Radar | "Necesito un dato de mercado para fundamentar este insight" |
| Musa | Scout | "Que tipo de perfiles hay disponibles para esta vertical?" |
| Scout | Radar | "Background check: que se dice de esta marca en redes?" |
| Scout | Musa | "Que angulo creativo funciona mejor con este tipo de influencer?" |
| Radar | Musa | "Necesito contexto de brand voice para enfocar la investigacion" |
| Radar | Scout | "Que perfiles usaron los competidores en campanas similares?" |
| PM | Cualquiera | "Necesito status de la parte de [agente] para el reporte" |

### Cuando referir al usuario

Un agente recomienda escribirle a otro bot cuando:

| Situacion | Agente que recibe | Refiere a | Ejemplo de respuesta |
|-----------|-------------------|-----------|---------------------|
| Piden investigacion profunda | Musa o Scout | @RadarMambaBot | "Para una investigacion completa de mercado, escribele a @RadarMambaBot" |
| Piden ideas creativas | Radar o Scout | @CreativeMambaBot | "Para conceptos e insights, @CreativeMambaBot es quien puede ayudarte" |
| Piden shortlist de influencers | Radar o Musa | @InfluencerMambaBot | "Eso es trabajo de scouting. Escribele a @InfluencerMambaBot" |
| Piden cronograma o status | Cualquier worker | @PMMambabot | "Para cronogramas y tracking, habla con @PMMambabot" |
| Piden info financiera | Cualquier worker | @AdmonMambaBot | "Temas de contratos y pagos son de @AdmonMambaBot" |
| No sabe a quien preguntar | Cualquiera | @StrategyMambabot | "No estoy seguro de poder ayudarte con eso. Preguntale a @StrategyMambabot" |

### Nunca intentar (fuera de expertise)

| Agente | NO intenta |
|--------|-----------|
| Radar | Generar conceptos creativos, evaluar influencers, crear cronogramas |
| Musa | Buscar datos de mercado, scoring de influencers, gestion de pagos |
| Scout | Crear estrategias creativas, llevar cronogramas, gestionar contratos |
| PM | Investigacion de mercado, creatividad, scouting de influencers |
| Admin | Estrategia, investigacion, creatividad, scouting |

---

## Configuracion de Subagentes

Que agentes puede contactar cada uno (allowAgents en openclaw.json):

| Agente | allowAgents |
|--------|------------|
| Orquestador | research, creative, influencer, pm, admin |
| Radar (research) | creative, influencer |
| Musa (creative) | research, influencer |
| Scout (influencer) | research, creative |
| PM | — |
| Admin | — |
| Prometeo | — |

```jsonc
{
  "agents": {
    "defaults": {
      "subagents": {
        "maxSpawnDepth": 1,
        "maxChildrenPerAgent": 5,
        "maxConcurrent": 12
      }
    }
  }
}
```

---

## Documentos relacionados

| Documento | Path |
|-----------|------|
| Multi-Agent Overview V2 | `clients/mamba-negra/MULTI-AGENT-OVERVIEW.md` |
| Design doc V2 | `docs/plans/2026-04-02-multi-agent-teams-design.md` |
| Status del proyecto | `clients/mamba-negra/STATUS.md` |
| V8.0 Upgrade (workspace files) | Cambios en AGENTS.md, SOUL.md, TOOLS.md, HEARTBEAT.md de cada agente |
