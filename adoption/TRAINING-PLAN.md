# Plan de Capacitacion por Rol — Mamba Negra Latam

**Version**: V2 (30-Mar-2026)
**Estado**: Modulos 1 y 2 LISTOS para onboarding. Modulo 3 parcialmente listo. Modulo 4 bloqueado por API.

---

## Principio Clave

Los modulos de capacitacion solo se activan cuando el agente correspondiente esta listo para uso real. No hay timeline forzado.

**Estado de activacion**:
- **PM**: LISTO (6 workflows Notion/Sheets, feedback videos, memorySearch)
- **Estratega**: LISTO (gog + Notion + Tavily + Google Form briefs, 3 skills, memorySearch)
- **Admin**: PARCIALMENTE LISTO (gog + memoria activa, pendiente Sheet flujo de caja de Carlos)
- **Modash+IA**: BLOQUEADO (MCP server construido con 7 tools, pero API sin creditos. Evaluando Influencers Club como alternativa)

---

## Asignacion de Modulos por Rol

| Rol | Modulo 1: PM | Modulo 2: Estratega | Modulo 3: Admin | Modulo 4: Modash+IA |
|-----|:---:|:---:|:---:|:---:|
| **Campaign Manager (CM)** | Si | Si | Si | Si |
| **Strategy Jr** | Si | **Profundo** | Basico | Si |
| **Comercial** | Consumidor | No | No | No |

---

## Modulo 1: PM Bot (@PMMambabot)

**Estado**: LISTO para capacitacion (Notion MNL real + Google Workspace + 6 workflows + feedback videos + memorySearch)

### Que aprenden
- Consultar estado de campanas activas en Notion
- Pedir cronograma de una campana
- Verificar tareas pendientes por CM (con directorio del equipo: 8 personas mapeadas)
- Solicitar creacion de tareas en Notion (SOLICITUD o TRAFICO)
- Registrar y consultar feedback de videos por influencer (Video Feedback Tracker)
- Generar reportes de analisis senior (framework 4 bloques para VPs)

### Ejemplo de interacciones
```
BUENO: "Cual es el estado de la campana de Detodito Q1? Que tareas estan pendientes?"
BUENO: "Crea una tarea de tipo SOLICITUD Creative para la campana Bivien, asignada a Laura Zapata"
BUENO: "Registra feedback del video de @influencer_x: buena energia pero el producto no se ve claro"
BUENO: "Que feedback hay pendiente de la campana PepsiCo Copa Sabores?"
MALO: "Dime todo" (sin contexto)
MALO: "Hazme el reporte" (el PM consolida data, no genera reportes visuales)
```

### Errores comunes
- Esperar que el PM genere documentos visuales (consolida data y genera analisis de texto)
- No especificar la campana al preguntar
- Confundir al PM con el Estratega (el PM es operativo, el Estratega es estrategico)

---

## Modulo 2: Estratega Bot (@StrategyMambabot)

**Estado**: LISTO para capacitacion (gog + Notion + Tavily + Google Form briefs, 3 skills activos, memorySearch)

### Que aprenden
- Leer briefs de campana directamente del Google Form ("Revisa el ultimo brief del formulario")
- Flujo completo brief-to-strategy: brief → brand voice → metodologia → Strategic Thinking → contenido → criterios de scouting
- Analisis de competencia con Tavily (busqueda web en tiempo real)
- Consultar criterios de scouting por vertical (genera copy comercial nivel senior)
- Co-crear brand voice profiles para marcas nuevas
- Buscar documentos de campanas pasadas en Drive y Notion

### Ejemplo de interacciones
```
BUENO: "Revisa el ultimo brief del formulario" (lee el brief del Google Form automaticamente)
BUENO: "Arranca propuesta para Jabon Supremo" (activa skill brief-to-strategy completo)
BUENO: "Analiza la competencia de La Pocion en el segmento belleza capilar en Colombia"
BUENO: "Que perfil de influencer necesito para esta campana? Dame criterios para Modash"
BUENO: "Busca en Drive el strategic thinking de Manimoto Chocolate"
MALO: "Busca influencers" (sin brief ni contexto — el Estratega da CRITERIOS, no busca directamente)
MALO: "Es bueno este influencer?" (sin datos ni campana)
```

### Errores comunes
- Esperar que el Estratega busque influencers en Modash (da criterios, la busqueda la hace el CM)
- No dar contexto del cliente/campana
- Saltarse pasos del brief-to-strategy (el skill guia paso a paso, no saltar)
- Esperar que el Estratega negocie tarifas (eso es humano siempre)

---

## Modulo 3: Admin Bot (@AdmonMambaBot)

**Estado**: PARCIALMENTE LISTO (gog + memoria activa). Pendiente: Sheet de flujo de caja de Carlos.

### Que aprenden
- Consultar estado de pagos pendientes
- Registrar fechas de pago y contratos
- Solicitar alertas de vencimientos
- Tracking de base de pago por campana
- Consultar documentos financieros en Drive via gog

### Ejemplo de interacciones
```
BUENO: "Cuales son los pagos pendientes de la campana Melendez que vencen esta semana?"
BUENO: "Registra que el pago a @influencer_x por la campana Bata se realizo el 15-Mar"
BUENO: "Busca en Drive el contrato de la campana Bivien"
MALO: "Pagale" (el bot no ejecuta pagos)
```

### Errores comunes
- Esperar que el Admin ejecute transacciones financieras
- No especificar campana al consultar pagos
- Confundir con el PM (Admin es financiero, PM es operativo)

### Pendiente para funcionalidad completa
- Sheet de flujo de caja que Carlos esta construyendo → cuando lo comparta, se conecta via gog

---

## Modulo 4: Scouting Automatizado (Modash o Influencers Club)

**Estado**: BLOQUEADO — MCP server de Modash construido (7 tools: search IG/TT, profile report, AI text search, lookalikes, locations, account info), pero API tiene 0 creditos. Evaluando Influencers Club (~$249/mes) como alternativa a Modash (~$16k/ano).

### Que aprenderan (cuando se active)
- Flujo completo: Brief → Estratega genera criterios → API busca influencers → Vetting → Shortlist
- Como interpretar el scoring por vertical del Estratega
- Cuando abrir un perfil en Modash/Influencers Club (optimizacion de creditos)
- Como dar feedback sobre scoring para mejorar el sistema

### Pre-requisitos
- Haber completado Modulo 2 (Estratega)
- Haber leido `knowledge/modash-playbook.md`
- Conocer los criterios de su(s) vertical(es) asignada(s)

### Bloqueadores para activacion
- Modash: MNL debe contactar soporte para activar creditos API
- Influencers Club: free tier no da acceso API (403). Requiere plan pago ($249/mes)
- Decision pendiente: cual plataforma usar

---

## Evaluacion de Modulos

Cada modulo se considera **completado** cuando el participante cumple:

| Criterio | Como se verifica |
|----------|-----------------|
| Asistio al workshop | Lista de asistencia |
| Completo 3+ consultas reales durante la sesion | Observacion directa |
| Uso el agente al menos 2 veces en la semana siguiente al workshop | Logs de OpenClaw |
| No tiene dudas bloqueantes sobre como usar el agente | 1:1 de seguimiento (5 min) |

Si un participante no cumple los criterios en 2 semanas post-workshop, agendar sesion de refuerzo individual (15 min).

---

## Formato de Capacitacion

| Aspecto | Detalle |
|---------|---------|
| **Duracion** | 45-60 min por modulo |
| **Formato** | Workshop presencial o por videollamada |
| **Estructura** | 15 min teoria + 30 min practica + 15 min Q&A |
| **Materiales** | Guia de 1 pagina + telefono con Telegram abierto |
| **Practica** | Cada asistente hace 3-5 consultas reales durante la sesion |

---

## Calendario Tentativo

| Semana | Actividad | Estado |
|--------|-----------|--------|
| Semana 4 (Abr S1) | **Sesion grupal**: Modulo 1 (PM) + Modulo 2 (Estratega) — todo el equipo | PLANIFICANDO |
| Semana 5-6 | **Soporte**: Dudas puntuales 1:1, seguimiento de uso | Pendiente |
| Semana 6-7 | **Workshop 3**: Modulo 3 (Admin) — cuando Carlos comparta Sheet flujo de caja | Pendiente |
| Mes 3+ | **Workshop 4**: Modulo 4 (Scouting automatizado) — cuando API de influencers este activa | BLOQUEADO |

**Pre-requisito para la sesion grupal**: Pairing de todo el equipo en Telegram (cada CM debe tener los 3 bots agregados y pareados).

> PENDIENTE: Confirmar fecha exacta de sesion grupal con Carlos
