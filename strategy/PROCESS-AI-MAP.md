# Process-AI Map — Flujo de Campana con Agentes Integrados

**Version**: V2 (26-Mar-2026) — Actualizado con data real de discovery
**Estado**: Basado en encuesta a 5 miembros del equipo + Strategy Team WorkFlow

> Este documento muestra, para cada fase del ciclo de campana MNL, que se hace hoy (real, validado), como se hara con los agentes de Telegram integrados, y el ahorro estimado.

---

## CAMBIO FUNDAMENTAL

**Hoy**: El equipo usa ChatGPT/Gemini de forma ad-hoc (cada quien por su cuenta, sin contexto compartido).

**Con agentes**: Los 3 bots de Telegram (@StrategyMambabot, @PMMambabot, @AdmonMambaBot) son parte del flujo. Tienen contexto permanente: framework de campana, perfiles por vertical, playbook Modash, datos de Notion, y aprenden de cada interaccion.

**La diferencia clave**: ChatGPT no sabe nada de MNL. Los agentes SI — tienen el knowledge base, las metodologias RAYO/ARCO/PRISMA/MAREA, los criterios de scoring, y acceso a Notion con las 19 DBs.

---

## Leyenda

| Nivel | Descripcion | Color |
|-------|-------------|-------|
| **MANUAL** | El equipo lo hace 100% a mano | Rojo |
| **ASISTIDO** | IA ayuda pero humano lidera y decide | Amarillo |
| **INTEGRADO** | IA lidera la tarea, humano supervisa y aprueba | Verde |

---

## FASE 1: RECEPCION DEL BRIEF

**Hoy (real)**: Brief llega por WhatsApp o en reunion. 3/5 CMs reportan que frecuentemente falta info y deben pedirla. No hay formato estandar.

| Actividad | Hoy (real) | Con agentes (3m) | Futuro (6m) |
|-----------|------------|-------------------|-------------|
| Recibir brief | MANUAL — WhatsApp, info incompleta | ASISTIDO — CM le pasa el brief al Estratega bot, que identifica que info falta | INTEGRADO — Formulario estructurado, Estratega parsea y valida completitud |
| Clasificar tipo de campana | MANUAL — Estratega decide | ASISTIDO — Estratega bot sugiere RAYO/ARCO/PRISMA/MAREA segun alcance y objetivos | INTEGRADO — Auto-clasificacion + template apropiado |
| Distribuir al equipo | MANUAL — WhatsApp + reunion | ASISTIDO — PM bot notifica al equipo via Notion + alerta en Telegram | INTEGRADO — Auto-distribucion con checklist por rol |

**Interaccion practica**: CM le escribe al @StrategyMambabot: *"Recibi este brief de [marca]. Objetivo: awareness. Presupuesto: $15M. Necesito que me ayudes a identificar que info falta y que tipo de campana es."*

---

## FASE 2: CONSTRUCCION ESTRATEGICA

**Hoy (real)**: Strategy team tiene flujo sofisticado de 12 pasos (Perplexity, Answer The Public, Google Trends). CMs participan en scouting paralelo. Strategic Thinkings siguen estructura consistente (Target > Insight > Concepto > Propositions).

| Actividad | Hoy (real) | Con agentes (3m) | Futuro (6m) |
|-----------|------------|-------------------|-------------|
| Investigacion del mercado | MANUAL — Estratega usa Perplexity + Google Trends + Reddit | ASISTIDO — Estratega bot amplifica investigacion: genera preguntas, busca tendencias, cruza con campanas anteriores | INTEGRADO — Research semi-automatico con fuentes consolidadas |
| Hallar insight | MANUAL — Proceso creativo de la estratega | ASISTIDO — Estratega bot propone opciones de insight basado en vertical + target | ASISTIDO — Insight siempre requiere humano, IA sugiere |
| Definir perfil de influencer | MANUAL — "Ojo clinico" de cada CM | ASISTIDO — Estratega bot sugiere perfil basado en vertical profile + criterios estandarizados | INTEGRADO — Perfil + shortlist sugerida de Modash |
| Armar propuesta estrategica | MANUAL — Desde cero o copia anterior (Camila: "desde cero cada vez") | ASISTIDO — Estratega bot genera borrador con estructura Strategic Thinking (Target > Insight > Concepto > Propositions) | INTEGRADO — Borrador + benchmarks de campanas similares |
| Definir KPIs esperados | MANUAL — Estimacion del CM | ASISTIDO — Estratega bot sugiere KPIs segun tipo de campana y vertical | INTEGRADO — KPIs con benchmarks reales por vertical |

**Interaccion practica**: Estratega humana le escribe al @StrategyMambabot: *"Campana ARCO para Detodito Proteina. Target: adultos 18-35 activos. Necesito opciones de insight y propuesta de contenido."*

---

## FASE 3: CRONOGRAMA GANTT

**Hoy (real)**: CM crea el Gantt y grupo de WhatsApp. Notion se usa para tracking pero solo 2/5 CMs lo actualizan activamente. CMs reportan no saber que hacen los otros CMs.

| Actividad | Hoy (real) | Con agentes (3m) | Futuro (6m) |
|-----------|------------|-------------------|-------------|
| Crear timeline | MANUAL — CM crea en Notion | ASISTIDO — PM bot genera cronograma base segun tipo de campana (RAYO=2sem, ARCO=4sem, PRISMA=6sem, MAREA=ongoing) | INTEGRADO — Cronograma auto-calculado con hitos |
| Asignar responsables | MANUAL — WhatsApp | ASISTIDO — PM bot conoce carga de cada CM y sugiere asignacion equilibrada | INTEGRADO — Asignacion optimizada por capacidad real |
| Detectar conflictos | MANUAL — No se hace (CG: "no sabemos que hace el otro") | ASISTIDO — PM bot alerta solapamientos entre campanas activas | INTEGRADO — Deteccion proactiva + alternativas |

**Interaccion practica**: CM le escribe al @PMMambabot: *"Necesito crear cronograma para campana Acetaminofen MK. Es tipo RAYO, 4 influencers, salida en 3 semanas. Quien esta disponible?"*

---

## FASE 4: SCOUTING + NEGOCIACION

**Hoy (real)**: MAYOR PAIN POINT. Scouting toma ~2 dias promedio (CG y Tatiana: 3 dias). CMs buscan en Instagram manual + Modash. Solo CG tiene ER minimo fijo (1%). Criterios principales: ER (4/5), calidad de contenido (3/5), ubicacion (3/5).

| Actividad | Hoy (real) | Con agentes (3m) | Futuro (6m) |
|-----------|------------|-------------------|-------------|
| Definir criterios de busqueda | MANUAL — Cada CM con sus propios criterios | ASISTIDO — Estratega bot genera checklist pre-Modash basado en vertical profile + brief | INTEGRADO — Auto-generado desde brief + vertical |
| Busqueda en Modash | MANUAL — ~2 dias (filtros basicos, Instagram search) | ASISTIDO — Estratega bot prepara parametros de busqueda optimizados para Modash | INTEGRADO — Busquedas inteligentes con scoring |
| Vetting (audiencia, fake, brand safety) | MANUAL — Uno por uno, revision visual | ASISTIDO — Checklist estandar de vetting por vertical (minimos ER, contenido prohibido) | INTEGRADO — Pre-filtro IA antes de abrir perfil |
| Scoring de candidatos | MANUAL — "Ojo clinico", varia por CM | ASISTIDO — Estratega bot evalua perfil vs criterios y genera score con justificacion | INTEGRADO — Ranking automatico + justificacion |
| Pedir media kits y tarifas | MANUAL — CM contacta uno por uno | MANUAL — Se mantiene humano (relacion personal) | ASISTIDO — Template de contacto generado por bot |
| Negociacion de tarifas | MANUAL — CM negocia solo | ASISTIDO — Admin bot sugiere rango basado en historico de pagos | ASISTIDO — Siempre humano lidera negociacion |

**Ahorro estimado**: De ~2 dias a ~4-6 horas (reduccion ~60%)

**Interaccion practica**: Laura le escribe al @StrategyMambabot: *"Busca en Modash 10 perfiles para campana inmobiliaria en Cali. Micro-influencers, ER minimo 2%, audiencia Colombia 60%+, contenido de lifestyle/hogar."*

---

## FASE 5: APROBACIONES INTERNAS

**Hoy (real)**: Flujo: CM revisa PPT → Comercial revisa → se presenta a cliente. Comunicacion entre MNL y cliente es lenta (Tatiana). Tracking informal via WhatsApp.

| Actividad | Hoy (real) | Con agentes (3m) | Futuro (6m) |
|-----------|------------|-------------------|-------------|
| Tracking de aprobaciones | MANUAL — WhatsApp, "se acuerda el CM" | ASISTIDO — PM bot trackea en Notion + alerta si >48h sin movimiento | INTEGRADO — Pipeline visual con SLAs |
| Validar vs brief | MANUAL — CM revisa mentalmente | ASISTIDO — Estratega bot compara propuesta vs brief original y lista gaps | INTEGRADO — Checklist automatico |
| Escalar bloqueos | MANUAL — "Cuando ya es tarde" | ASISTIDO — PM bot alerta al comercial automaticamente | INTEGRADO — Escalamiento automatico |

**Interaccion practica**: CG le escribe al @PMMambabot: *"Cual es el status de aprobaciones de todas las campanas activas? Alguna lleva mas de 2 dias sin respuesta?"*

---

## FASE 6: EJECUCION Y SEGUIMIENTO

**Hoy (real)**: CM coordina salidas de contenido. Filtro Mamba interno antes de enviar a marca. Contenido se revisa manualmente. Metricas se piden a influencers ~10 dias despues.

| Actividad | Hoy (real) | Con agentes (3m) | Futuro (6m) |
|-----------|------------|-------------------|-------------|
| Coordinacion de contenido | MANUAL — CM por WhatsApp con cada influencer | ASISTIDO — PM bot alerta fechas de entrega proximas + status por creador | INTEGRADO — Dashboard de contenido por campana |
| Status de contenidos | MANUAL — CM recuerda de memoria, CG quiere ver "quien esta grabando, revisando, aprobado" | ASISTIDO — PM bot muestra status de cada creador en tiempo real desde Notion | INTEGRADO — Dashboard auto-actualizado |
| KPIs reales vs estimados | MANUAL — No se comparan hasta el final | ASISTIDO — PM bot compara metricas parciales vs estimadas | INTEGRADO — Alertas si KPI < 70% del target |

**Interaccion practica**: Camila le escribe al @PMMambabot: *"Dame actualizacion de como van los videos de la campana SUN PRO: alcance, impresiones e interacciones de cada creador."*

---

## FASE 7: REPORTE DE COSTOS

**Hoy (real)**: CM actualiza base pago manualmente. CG quiere saber "a quien le vamos a pagar este viernes, cuanta plata en cartera, pagos retrasados". No hay alertas.

| Actividad | Hoy (real) | Con agentes (3m) | Futuro (6m) |
|-----------|------------|-------------------|-------------|
| Base pago | MANUAL — CM llena post-campana | ASISTIDO — Admin bot alerta: "hay 3 cuentas de cobro pendientes de esta semana" | INTEGRADO — Pre-llenado desde contratos + Notion |
| Alertas de pagos | MANUAL — No existe | ASISTIDO — Admin bot reporta semanalmente: pagos pendientes, vencidos, cartera | INTEGRADO — Alertas automaticas por fecha |
| Rentabilidad por campana | MANUAL — Se calcula al final | ASISTIDO — Admin bot calcula rentabilidad en tiempo real | INTEGRADO — Dashboard de rentabilidad |

**Interaccion practica**: CG le escribe al @AdmonMambaBot: *"A quien le debemos pagar este viernes? Cuanta plata en cartera tenemos por cobrar? Hay pagos retrasados?"*

---

## FASE 8: REPORTE FINAL

**Hoy (real)**: SEGUNDO MAYOR PAIN POINT. Toma 4-8 horas. 60-80% es copy-paste de metricas de cada red social. Disenador grafica el informe (cuello de botella adicional). Responder "como va la campana" toma 5-30 minutos.

| Actividad | Hoy (real) | Con agentes (3m) | Futuro (6m) |
|-----------|------------|-------------------|-------------|
| Recolectar metricas | MANUAL — De cada red social + pedirle a cada influencer | ASISTIDO — PM bot consolida metricas desde Notion + Modash tracking | INTEGRADO — Recoleccion automatica |
| Generar analisis | MANUAL — CM interpreta datos | ASISTIDO — Estratega bot genera insights: top/low performers, comparacion vs objetivos | INTEGRADO — Narrativa completa generada |
| Armar documento | MANUAL — Excel → disenador grafica PPT (CG: doble cuello de botella) | ASISTIDO — PM bot genera template pre-llenado con data y analisis | INTEGRADO — Draft completo, Design solo ajusta visual |
| Responder "como va la campana" | MANUAL — 5-30 min buscando en multiples fuentes | ASISTIDO — PM bot responde en <30 segundos con data de Notion | INTEGRADO — Respuesta instantanea |

**Ahorro estimado**: De 4-8 horas a 1-2 horas (reduccion ~70%)

**Interaccion practica**: Juan Guillermo le escribe al @PMMambabot: *"Dame status de la campana [marca]. En que parte vamos y que tenemos pendiente con cada influencer."*

---

## FASE 9: APRENDIZAJES

**Hoy (real)**: No se documenta sistematicamente. Conocimiento queda en la memoria del CM. No se comparan campanas similares.

| Actividad | Hoy (real) | Con agentes (3m) | Futuro (6m) |
|-----------|------------|-------------------|-------------|
| Documentar que funciono | MANUAL — "Si sobra tiempo" (nunca) | ASISTIDO — Estratega bot genera resumen post-campana automatico | INTEGRADO — Auto-generado + comparacion con historico |
| Alimentar futuras campanas | MANUAL — Memoria del equipo | ASISTIDO — Knowledge base se actualiza por marca/vertical | INTEGRADO — Estratega consulta historial al recibir brief nuevo |

---

## RESUMEN DE IMPACTO

| Fase | Impacto IA | Agente Principal | Ahorro estimado |
|------|-----------|-----------------|-----------------|
| 1. Brief | Medio | Estratega | Evitar rebote de info |
| 2. Estrategia | Alto | Estratega | -30% tiempo investigacion |
| 3. Gantt | Alto | PM | -50% tiempo setup |
| 4. **Scouting** | **Muy Alto** | **Estratega** | **-60% (~1 dia recuperado)** |
| 5. Aprobaciones | Medio | PM | Menos bloqueos |
| 6. Ejecucion | Alto | PM | Visibilidad instantanea |
| 7. Costos | Medio | Admin | Control financiero |
| 8. **Reporte** | **Muy Alto** | **PM + Estratega** | **-70% (~5h recuperadas)** |
| 9. Aprendizajes | Medio | Estratega | Conocimiento acumulativo |

---

## GUIA PRACTICA: CUANDO HABLAR CON CADA AGENTE

### @StrategyMambabot (Estratega)
**Escribele cuando**:
- Recibes un brief nuevo y necesitas clasificarlo (RAYO/ARCO/PRISMA/MAREA)
- Necesitas criterios de busqueda para scouting por vertical
- Quieres opciones de insight o concepto creativo
- Necesitas evaluar un perfil de influencer vs los criterios
- Quieres generar un borrador de propuesta estrategica
- Al cerrar campana, para generar resumen de aprendizajes

**Ejemplo**: *"Tengo brief de Detodito, lanzamiento de producto nuevo. Target jovenes 16-35. Presupuesto $20M. Que tipo de campana recomiendas y que perfil de influencer deberia buscar?"*

### @PMMambabot (PM)
**Escribele cuando**:
- Necesitas crear un cronograma para una campana nueva
- Quieres saber el status de una campana activa
- Necesitas saber la carga de trabajo de los CMs
- Quieres que te genere un reporte parcial o final con metricas
- Necesitas comparar metricas reales vs estimadas
- Quieres saber si hay atrasos o bloqueos en alguna campana

**Ejemplo**: *"Como va la campana de Acetaminofen MK? Que contenidos estan pendientes y cuales ya salieron?"*

### @AdmonMambaBot (Admin)
**Escribele cuando**:
- Necesitas saber a quien hay que pagar esta semana
- Quieres ver el estado de cuentas de cobro pendientes
- Necesitas calcular la rentabilidad de una campana
- Quieres saber la cartera por cobrar
- Necesitas verificar si hay contratos sin firmar

**Ejemplo**: *"Cuales son los pagos programados para esta semana? Hay alguno retrasado?"*

---

## PLAN DE IMPLEMENTACION (Semanas 3-4)

### Semana 3: Workshop Onboarding
1. Presentar este mapa al equipo (discovery findings + proceso propuesto)
2. Demo en vivo de cada agente con casos de uso reales
3. Pairing de todo el equipo en los 3 bots de Telegram
4. Tarea: usar el PM bot para reportar status de 1 campana activa

### Semana 4: Shadow Mode
1. Equipo trabaja normalmente + usa agentes en paralelo
2. NO se reemplaza el proceso actual — se complementa
3. Recoger feedback: que sirvio, que no, que falta
4. Iterar AGENTS.md con feedback real

### Mes 2: Transicion gradual
1. Agentes V2 con feedback incorporado
2. Empezar a depender de PM bot para status (en vez de WhatsApp)
3. Workshop 2: Scouting con Estratega bot

> **Principio**: Cada agente entra cuando aporta valor real, no por calendario. Si el PM bot no resuelve algo mejor que WhatsApp, no se fuerza.

---

> VALIDADO con data real de discovery (26-Mar-2026). Tiempos "Hoy" basados en encuesta a 5 miembros del equipo. Ahorro estimado basado en benchmarks de automatizacion de agencias similares.
