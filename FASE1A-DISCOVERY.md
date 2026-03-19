# FASE 1A — DISCOVERY MAMBA NEGRA

> **DEPRECADO** (17-Mar-2026): Este documento ha sido migrado y ampliado en `adoption/workshops/discovery-sessions.md` como parte de la reestructuracion de 7 capas. Usar la nueva ubicacion.

**Objetivo**: Extraer el conocimiento tacito y operacional del equipo para alimentar el agente Estratega con el ADN real de Mamba Negra.

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

## SESION 3 — CO-CONSTRUCCION (1h, OPCIONAL)

**Objetivo**: Mostrar el agente V0 al equipo y refinarlo en vivo.

### Dinamica de la Sesion

1. **Demo del agente**: Conectarse al bot de Telegram y mostrar respuestas a preguntas tipicas
2. **Test en vivo**: Pedirles que hagan preguntas al agente sobre sus procesos
3. **Evaluacion**: Que falta? Que respuesta sono rara o generica? Que deberia saber que aun no sabe?
4. **Ajuste rapido**: Actualizar AGENTS.md en tiempo real con feedback del equipo

### Output de la Sesion

- **AGENTS.md V1 validado** por el equipo
- Lista de **gaps de conocimiento** para Fase 1C (ej: "necesita saber sobre tarifas de influencers", "falta contexto de regulacion en campanas farmaceuticas")

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

## CHECKLIST DE SALIDA DE FASE 1A

- [ ] 2-3 sesiones discovery completadas
- [ ] 3 briefs historicos recibidos
- [ ] Acceso a Google Sheet master de proyectos configurado
- [ ] `knowledge/campaign-process.md` documentado con flujo real
- [ ] `knowledge/influencer-scoring.md` con umbrales y criterios del equipo
- [ ] `AGENTS.md` enriquecido con frameworks propios
- [ ] `SOUL.md` ajustado con tono validado
- [ ] `USER.md` con perfiles del equipo
- [ ] Decision final sobre LLM a usar (Gemini vs OpenAI API)
- [ ] 2-3 casos de uso prioritarios identificados para Fase 1C

**Proximo paso**: Fase 1B — Despliegue de infraestructura (VM GCP, OpenClaw Gateway, MCP Drive, bot Telegram).
