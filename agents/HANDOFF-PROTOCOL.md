# Protocolo de Handoff entre Agentes — Mamba Negra

**Version**: V1 (26-Mar-2026)
**Estado**: Listo para onboarding (Semana 3)

> Define como los 3 agentes de Telegram se coordinan entre si y con el equipo humano a lo largo del ciclo de campana.

---

## PRINCIPIO FUNDAMENTAL

El equipo NO necesita saber como funcionan los agentes internamente. Solo necesitan saber **a quien escribirle y cuando**. Los handoffs entre agentes ocurren automaticamente via `sessions_send` o por indicacion al usuario.

---

## FLUJO DE CAMPANA CON AGENTES INTEGRADOS

```
BRIEF (WhatsApp/Reunion)
    |
    v
[ESTRATEGA] <-- CM le pasa el brief
    |  - Clasifica tipo (RAYO/ARCO/PRISMA/MAREA)
    |  - Identifica info faltante
    |  - Genera criterios de scouting por vertical
    |  - Estructura Strategic Thinking
    |
    +--> sessions_send al PM: "Nueva campana [marca], tipo [X], deadline [Y]"
    |
    v
[PM] <-- Recibe aviso del Estratega o CM le escribe directo
    |  - Crea cronograma en Notion (template segun tipo)
    |  - Asigna CM basado en carga y vertical
    |  - Configura hitos y alertas
    |
    v
[ESTRATEGA] <-- CM consulta durante scouting
    |  - Evalua perfiles vs criterios
    |  - Genera shortlist con scoring
    |  - Prepara propuesta estrategica
    |
    v
[PM] <-- Tracking de ejecucion
    |  - Monitorea status de contenidos por creador
    |  - Alerta atrasos
    |  - Compara KPIs reales vs estimados
    |
    v
[ADMIN] <-- Fase financiera
    |  - Base pago actualizada
    |  - Alertas de pagos pendientes
    |  - Rentabilidad de campana
    |
    v
[PM + ESTRATEGA] <-- Reporte final
    |  - PM consolida metricas
    |  - Estratega genera insights y analisis
    |  - PM entrega template pre-llenado al CM
    |
    v
[ESTRATEGA] <-- Aprendizajes
       - Resumen post-campana
       - Actualiza knowledge base por marca/vertical
```

---

## TABLA DE HANDOFFS

| De | A | Trigger | Mensaje via sessions_send | Ejemplo |
|----|---|---------|---------------------------|---------|
| Estratega | PM | Brief clasificado | "Nueva campana [marca], tipo [RAYO/ARCO/PRISMA/MAREA], [N] influencers, deadline [fecha]" | "Nueva campana Detodito, tipo ARCO, 6 influencers, deadline 15 abril" |
| PM | Estratega | Scouting atrasado | "Campana [marca]: scouting lleva [N] dias sin avance. CM: [nombre]" | "Campana Nike: scouting lleva 4 dias. CM: Tatiana" |
| PM | Admin | Influencers confirmados | "Campana [marca]: [N] influencers confirmados, iniciar contratos" | "Campana MK: 4 influencers confirmados, iniciar contratos" |
| Estratega | PM | Propuesta aprobada | "Propuesta [marca] aprobada por cliente. Iniciar ejecucion" | "Propuesta Detodito aprobada. 6 influencers, cronograma arranca lunes" |
| PM | Estratega | Reporte en preparacion | "Campana [marca] en fase de reporte. Necesito insights y analisis" | "Campana Nike cerro. Metricas listas, necesito insights" |
| Admin | PM | Pago procesado | "Pago a [influencer] procesado por [monto]" | "Pago a @influencer1 procesado por $2.5M" |

---

## REGLAS DE DERIVACION AL USUARIO

Los agentes derivan al usuario (no intentan resolver solos) cuando:

| Situacion | Agente | Accion |
|-----------|--------|--------|
| Negociacion de tarifa con influencer | Estratega | "Los rangos para este tipo de perfil son $X-$Y. La negociacion la manejas tu directamente." |
| Decision estrategica sobre concepto creativo | Estratega | "Tengo 3 opciones de insight. La decision final es del equipo de Strategy." |
| Aprobacion de presupuesto | PM/Admin | "El presupuesto total es $X. Necesita aprobacion de [comercial/Carlos]." |
| Conflicto de prioridades entre campanas | PM | "Hay conflicto entre [campana A] y [campana B]. Necesito que [comercial] defina prioridad." |
| Info que no esta en Notion/Drive | Cualquiera | "No tengo esa informacion registrada. Necesito que [persona] actualice [sistema]." |

---

## PATRON DE USO POR ROL

### Para CMs (Tatiana, Camila, Juan Guillermo, Laura)

| Momento del dia | Agente | Que preguntar |
|----------------|--------|---------------|
| Inicio de campana | Estratega | "Tengo brief de [marca]. Que tipo de campana es y que perfil de influencer necesito?" |
| Durante scouting | Estratega | "Evalua este perfil: [link/nombre]. Cumple los criterios para [vertical]?" |
| Setup del proyecto | PM | "Crea cronograma para campana [marca], tipo [X], [N] influencers" |
| Cada dia | PM | "Como van mis campanas activas? Algo atrasado?" |
| Aprobacion de contenido | PM | "El contenido de [influencer] esta aprobado. Actualiza status" |
| Cierre de campana | PM | "Genera reporte de metricas de campana [marca]" |
| Post-campana | Estratega | "Que aprendimos de esta campana? Que funciono?" |

### Para CG (Comercial)

| Momento | Agente | Que preguntar |
|---------|--------|---------------|
| Revision matutina | PM | "Status de todas las campanas activas. Algo en riesgo?" |
| Antes de reunion con cliente | PM | "Dame un resumen rapido de campana [marca]: fase, metricas, pendientes" |
| Fin de semana | Admin | "A quien pagamos esta semana? Hay pagos retrasados?" |
| Planning | PM | "Carga de trabajo del equipo. Quien puede tomar una campana nueva?" |

---

## INTEGRACION CON HERRAMIENTAS

| Herramienta | Agente con acceso | Uso |
|-------------|-------------------|-----|
| **Notion** (19 DBs) | PM | TRAFICO/SOLICITUD boards, tareas, estados, asignaciones |
| **Google Drive** | PM, Estratega | Briefs, propuestas, reportes, cronogramas |
| **Google Sheets** | PM | Metricas, cuadros de costos, tracking |
| **Google Docs** | PM | Reportes narrativos, lineamientos |
| **Modash** | Estratega (criterios), CM (ejecucion manual) | Scouting — el Estratega genera criterios, el CM ejecuta en Modash |

### Nota sobre Modash
Modash no tiene API accesible para los agentes. El flujo es:
1. Estratega genera criterios de busqueda optimizados
2. CM ejecuta la busqueda manualmente en Modash
3. CM comparte resultados con Estratega para evaluar/scoring

---

## METRICAS DE EXITO DEL HANDOFF

| Metrica | Baseline (sin agentes) | Target (con agentes) |
|---------|------------------------|----------------------|
| Tiempo para responder "como va la campana" | 5-30 min | <30 seg |
| Scouting completo | ~2 dias | ~4-6 horas |
| Reporte final | 4-8 horas | 1-2 horas |
| CMs saben que hacen otros CMs | No | Si (via PM bot) |
| Alertas de atraso | Reactivas ("cuando ya es tarde") | Proactivas (>48h sin movimiento) |

---

## ONBOARDING (Semana 3)

### Dia 1: Demo + Pairing
1. Mostrar este documento al equipo (5 min)
2. Demo en vivo: CG le pregunta al PM bot "status de campanas activas" (5 min)
3. Demo en vivo: CM le pregunta al Estratega "criterios de scouting para vertical X" (5 min)
4. Pairing de todo el equipo en los 3 bots (10 min)
5. Cada CM elige 1 campana activa para probar con el PM bot (tarea)

### Dia 2-5: Shadow Mode
- Equipo trabaja normalmente + usa agentes en paralelo
- Canal de feedback (WhatsApp group o Notion) para reportar: que sirvio, que no, que falta
- Juan Jose revisa feedback diariamente y ajusta AGENTS.md

### Semana 4: Primera evaluacion
- Que CMs usaron los bots? Con que frecuencia?
- Que preguntas funcionaron? Cuales no?
- Iterar → V3 de AGENTS.md con feedback real
