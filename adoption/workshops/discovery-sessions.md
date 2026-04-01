# Discovery Sessions — Mamba Negra Latam

> **Migrado desde**: `FASE1A-DISCOVERY.md` (17-Mar-2026)
> **Alcance ampliado**: De discovery centrado en agentes a discovery de las 5 dimensiones de transformacion IA (Estrategia, Operacion, Contenido, Reporting, Cultura)
> **Baseline**: Recolectar metricas actuales durante estas sesiones (ver `measurement/BASELINE.md`)

**Objetivo**: Extraer el conocimiento tacito y operacional del equipo para alimentar la transformacion IA completa de Mamba Negra — no solo los agentes, sino las 5 dimensiones.

**Duracion**: Semanas 1-2 (2-3 sesiones de 1 hora cada una)

**Output esperado**: AGENTS.md V1 validado, knowledge/ enriquecido con procesos y criterios reales, lista de gaps para Fase 1C.

---

## SESION 1 — DIAGNOSTICO OPERACIONAL (1h)

**Objetivo**: Entender el proceso de campana de punta a punta y donde estan las fricciones actuales.

### Preguntas sobre el Proceso de Campana

1. **Flujo completo**: Cuentame el ciclo de una campana desde que llega un brief hasta que entregan el reporte final. Paso a paso.
2. **Friccion critica**: En ese flujo, donde pierden mas tiempo? Que pasos se repiten en cada proyecto de forma manual?
3. **Decision de influencers**: Como deciden a quien buscar? Que informacion del brief usan primero para definir el perfil?
4. **Herramientas actuales**: Modash es la unica herramienta de busqueda? Como guardan los shortlists (Excel, Sheets, Notion)?
5. **Handoffs**: Quien hace que? Estrategia → Busqueda → Outreach → Ejecucion. Donde se rompe la comunicacion?

### Preguntas sobre Busqueda de Influencers

6. **Criterios de busqueda**: Cuando abren Modash, que filtros usan primero? (followers, engagement, ubicacion, niche)
7. **Tiempo promedio**: Cuanto tarda una busqueda completa para una campana tipica? (desde abrir Modash hasta tener shortlist)
8. **Scoring mental**: Como deciden entre dos influencers similares? Que ven primero en el perfil?
9. **Brand safety**: Han tenido casos donde un influencer parecia bien pero despues descubrieron algo problematico? Que miran para evitarlo?

### Output de la Sesion

- Actualizar `knowledge/campaign-process.md` con el flujo real documentado
- Identificar **2-3 casos de uso prioritarios** para el agente (ej: "ayudar a construir criterios de busqueda desde un brief", "evaluar shortlist vs objetivos de campana")
- Lista de fricciones a resolver (para roadmap de automatizaciones)

---

## SESION 2 — CRITERIOS Y CONOCIMIENTO TACITO (1h)

**Objetivo**: Capturar los criterios cuantitativos y cualitativos que el equipo usa para evaluar influencers, y extraer frameworks de trabajo.

### Preguntas sobre Brand Safety y Criterios de Seleccion

1. **Caso de rechazo**: Dame un ejemplo de un influencer que descartaron y por que. Que vieron que no les gusto?
2. **Umbrales cuantitativos**: Tienen reglas de oro? (ej: "engagement rate minimo 3%", "audiencia falsa maximo 10%")
3. **Categorias rechazadas**: Hay nichos o tipos de contenido que nunca tocan? (politica, apuestas, adultos, etc.)
4. **Calidad del contenido**: Como evaluan si un influencer hace buen contenido? Miran estetica, storytelling, frecuencia?
5. **Historial de colaboraciones**: Revisan con que marcas ha trabajado antes? Eso influye en la decision?

### Preguntas sobre Estrategia

6. **Estructura de propuestas**: Como arman una propuesta estrategica para un cliente? Tienen un template o framework?
7. **Tipos de campana**: Awareness, conversion, brand building — cambian los criterios de seleccion segun el objetivo?
8. **Metricas clave**: Que metricas rastrean durante y despues de una campana? Cuales son las que mas valoran?
9. **Briefs historicos**: Pueden compartir 3 briefs de campanas pasadas (anonimizados)? Eso ayuda a entrenar al agente con casos reales.

### Preguntas sobre el Equipo

10. **Quienes usan el agente**: Cuantas personas en el equipo? Roles? (estratega, trafficker, community manager, etc.)
11. **Frecuencia de uso**: Con que frecuencia necesitan consultar procesos o criterios? Diario, semanal, solo en onboarding?
12. **Pregunta ideal**: Si pudieras hacerle una pregunta al agente y obtener respuesta en menos de 30 segundos, cual seria?

### Output de la Sesion

- Actualizar `knowledge/influencer-scoring.md` con umbrales cuantitativos y criterios cualitativos reales
- Enriquecer `AGENTS.md` con frameworks propios de la agencia (estructura de propuestas, scoring por tipo de campana)
- Actualizar `USER.md` con perfiles del equipo y preferencias de uso

---

## SESION 3 — LAS 5 DIMENSIONES + CO-CONSTRUCCION (1h)

**Objetivo**: Evaluar madurez IA en las 5 dimensiones de la transformacion y co-construir con el agente V0.

### Parte A: AI Maturity Assessment (30 min)

Evaluar con el equipo donde esta MNL en cada dimension. Usar escala 1-5 del design doc.

| Dimension | Pregunta clave | Score actual (1-5) |
|-----------|---------------|-------------------|
| **Estrategia** | "Usan IA para definir estrategia de campana o solo para tareas puntuales?" | [ ] |
| **Operacion** | "Que porcentaje de sus procesos diarios involucra alguna herramienta de IA?" | [ ] |
| **Contenido** | "Usan IA para crear o revisar contenido? Con que frecuencia?" | [ ] |
| **Reporting** | "Los reportes se generan con asistencia de IA o 100% manual?" | [ ] |
| **Cultura** | "El equipo ve la IA como herramienta del dia a dia o como algo extra/experimental?" | [ ] |

**Preguntas adicionales por dimension**:

**Estrategia**:
- Cuando definen KPIs para una campana, consultan alguna herramienta de IA?
- Usan datos historicos de forma sistematica para decidir estrategia?

**Operacion**:
- Cuales tareas diarias sienten que podrian automatizarse?
- Que herramientas digitales usan hoy ademas de Notion y Modash?

**Contenido**:
- Usan ChatGPT/Gemini para escribir copies, briefs, o comunicaciones?
- Quien del equipo lo usa mas? Para que tipo de contenido?

**Reporting**:
- Cuanto del reporte final es copiar-pegar data de diferentes fuentes?
- Han intentado usar IA para generar insights de campana?

**Cultura**:
- Si alguien del equipo descubre un uso nuevo de IA, como lo comparte con los demas?
- Hay resistencia a usar IA en el equipo? De parte de quien y por que?

### Parte B: Co-construccion con Agente V0 (30 min)

1. **Demo del agente**: Conectarse al bot de Telegram y mostrar respuestas a preguntas tipicas
2. **Test en vivo**: Pedirles que hagan preguntas al agente sobre sus procesos
3. **Evaluacion**: Que falta? Que respuesta sono rara o generica? Que deberia saber que aun no sabe?
4. **Ajuste rapido**: Actualizar AGENTS.md en tiempo real con feedback del equipo

### Output de la Sesion

- **AI Maturity Assessment baseline** completado (registrar en `measurement/BASELINE.md`)
- **AGENTS.md V1 validado** por el equipo
- Lista de **gaps de conocimiento** para Fase 1C
- Oportunidades de IA identificadas por dimension (para `strategy/PROCESS-AI-MAP.md`)

---

## DOCUMENTOS A SOLICITAR

### Entrega 1 — Para Arrancar (Sem 1)
- **3 briefs historicos** (cualquier formato: PDF, Google Docs, email) — anonimizar nombres de clientes si es necesario
- **Acceso lectura** a Google Sheet master de proyectos (si existe)
- **Nombres y roles del equipo** (para USER.md)

### Entrega 2 — Para Refinar (Sem 2)
- **Brand safety guidelines** (si tienen documento escrito) o lista de categorias rechazadas
- **Ejemplo de shortlist entregada** a un cliente (para ver formato y nivel de detalle)
- **Reporte de campana finalizado** (para entender metricas y formato de entregables)

---

## TABLA DE TRADUCCION: QUE SE APRENDE → DONDE VA

| Lo que descubrimos en Discovery | Donde se documenta en el repo |
|---------------------------------|-------------------------------|
| Flujo de campana paso a paso | `knowledge/campaign-process.md` |
| Criterios de scoring (cuanti + cuali) | `knowledge/influencer-scoring.md` |
| Frameworks de propuestas | `AGENTS.md` seccion "Frameworks de Trabajo" |
| Tono y cultura del equipo | `SOUL.md` |
| Perfiles de usuarios del agente | `USER.md` |
| Casos de uso prioritarios | `STATUS.md` y comentarios en `.env.example` |
| Fricciones operacionales | `knowledge/campaign-process.md` seccion "Mejoras" |
| Preferencias de LLM | `openclaw.json` model config y `.env.example` |

---

## CHECKLIST DE SALIDA DE FASE 1A — COMPLETADO (26-Mar-2026)

- [x] Discovery completado: encuesta (5 respuestas) + docs Strategy team + 2 strategic thinkings + 1 brief
- [x] 3 briefs/docs historicos recibidos (Manimoto Chocolate, Detodito Proteina, Acetaminofen MK)
- [x] Google Sheets configurados (Gantt, Discovery, Feedback, Form Briefs)
- [x] `knowledge/campaign-process.md` documentado con flujo real (2 flujos paralelos: Strategy 12 pasos + CM 18 pasos)
- [x] `knowledge/influencer-scoring.md` con umbrales y criterios del equipo
- [x] `AGENTS.md` enriquecido con frameworks propios (4 metodologias: RAYO/ARCO/PRISMA/MAREA)
- [x] `SOUL.md` ajustado con tono validado
- [x] `USER.md` con perfiles del equipo
- [x] Decision final sobre LLM: Google Gemini (3.1-pro para Estratega, 3-flash para PM/Admin)
- [x] Casos de uso prioritarios: scouting criterios, brief-to-strategy, feedback videos, reportes VP
- [x] Resultados consolidados en `adoption/DISCOVERY-FINDINGS.md`

**Fases completadas**: 1A (Discovery) → 1B (Infraestructura: VM + OpenClaw + 4 bots) → Agentes V3.1 desplegados.
**Proximo paso**: Onboarding grupal del equipo (Modulos 1 + 2 del TRAINING-PLAN.md).
