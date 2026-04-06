# Manual de Agentes IA — Mamba Negra Latam

**Version**: 1.0
**Fecha**: 04 Abril 2026
**Para**: Equipo MNL (Mar, Mae, Carlos, CMs)

---

## 1. Introduccion

### Que es el equipo de agentes

Mamba Negra cuenta con **7 agentes de inteligencia artificial** especializados que asisten al equipo en todo el ciclo de vida de una campana de influencer marketing. Cada agente es experto en un area: investigacion, creatividad, scouting de influencers, operaciones, administracion, coordinacion y soporte tecnico.

No son reemplazos del equipo humano. Son asistentes que aceleran el trabajo, traen data, proponen ideas, organizan tareas y mantienen la memoria de cada campana.

### Como funcionan

Cada agente es un **bot de Telegram**. El equipo interactua con ellos igual que con un colega: enviando mensajes de texto, archivos, links o PDFs.

- En el grupo **"MNL Strategy Team"** (modo foro con topics), se usa **@mencion** para hablar con un agente especifico
- **Sin @mencion**, responde el Orquestador (el coordinador central)
- Cada **campana tiene su propio topic** dentro del grupo — asi cada hilo mantiene su contexto separado

### Principio clave

Los agentes son especialistas por **capacidad**, no por fase. Pueden ser invocados en cualquier momento del proceso cuando se necesite su expertise.

---

## 2. Los 7 Agentes — Roles y Capacidades

### Orquestador (Mamba)
**Bot**: @StrategyMambabot

El cerebro coordinador de la agencia. Recibe briefs, decide que agentes invocar, sintetiza resultados y compila entregas. Es el punto de entrada para iniciar cualquier campana.

| | |
|---|---|
| **Cuando usarlo** | Siempre es el punto de entrada. Hablar con el para iniciar campana, pedir status, coordinar trabajo, o cuando no sabes a quien preguntarle |
| **Que hace** | Interpreta briefs, identifica retos, coordina a los demas agentes, compila propuestas, gestiona feedback, guarda entregas en Drive |
| **Que NO hace** | Investigacion profunda, busqueda de influencers, creacion de insights, cronogramas |

---

### Radar (Research)
**Bot**: @RadarMambaBot

El investigador del equipo. Se sumerge en datos duros (estudios de mercado, reportes de industria), datos sociales (tendencias, conversaciones, percepcion de marca) y analisis competitivo. Siempre aterrizado al contexto de Colombia y LATAM.

| | |
|---|---|
| **Cuando usarlo** | Cuando necesitas data, contexto de mercado, validar una hipotesis con datos reales, saber que hace la competencia |
| **Que hace** | Investigacion de mercado, analisis competitivo (SWOT, gaps, benchmarks), datos de tendencias, busqueda de campanas pasadas en Drive |
| **Que NO hace** | Ideas creativas, busqueda de influencers, cronogramas, pagos |

---

### Musa (Creative)
**Bot**: @CreativeMambaBot

La chispa creativa. Transforma investigacion en insights humanos, construye conceptos de campana, selecciona la metodologia (RAYO, ARCO, PRISMA o MAREA), propone ideas de contenido con referencias visuales y mantiene el brand voice de cada cliente.

| | |
|---|---|
| **Cuando usarlo** | Cuando necesitas propuestas creativas, redaccion de metodologia, bajada a guion, insights, conceptos, ideas de contenido |
| **Que hace** | Insights de campana, conceptos creativos, seleccion de metodologia, lineamientos de comunicacion, ideas de contenido, brand voice |
| **Que NO hace** | Datos de mercado, busqueda de influencers, cronogramas, pagos |

---

### Scout (Influencer)
**Bot**: @ScoutMambaBot

El especialista en influencers. Busca y filtra perfiles, aplica scoring cuantitativo y cualitativo, ejecuta background check (brand safety), genera copy comercial por perfil con vision senior, y define criterios de scouting para CMs.

| | |
|---|---|
| **Cuando usarlo** | Cuando necesitas encontrar perfiles, evaluar influencers, armar propuesta de casting, shortlists con copy comercial |
| **Que hace** | Busqueda de influencers, scoring (ER, audiencia, afinidad), background check, shortlists, copy comercial, criterios de scouting para CMs |
| **Que NO hace** | Estrategia creativa, cronogramas, pagos, investigacion general de mercado |

---

### PM (Project Manager)
**Bot**: @PMMambabot

El motor operativo. Lleva cronogramas, asigna tareas, monitorea avance, alerta atrasos, genera reportes de metricas y trackea feedback de videos por influencer.

| | |
|---|---|
| **Cuando usarlo** | Cuando necesitas saber estado de tareas, crear cronograma, tracking de entregas, feedback de videos, estado operativo de campanas |
| **Que hace** | Timelines, cronogramas Gantt, seguimiento de entregas, alertas de atrasos, tracking de feedback de videos, reportes operativos |
| **Que NO hace** | Estrategia, investigacion, creatividad, pagos |

---

### Admin (Administracion)
**Bot**: @AdmonMambaBot

El guardian de los numeros. Gestiona contratos, pagos a influencers y proveedores, base pago, cuentas de cobro y facturacion.

| | |
|---|---|
| **Cuando usarlo** | Cuando necesitas gestionar pagos a influencers, contratos, facturacion, o saber que pagos vencen |
| **Que hace** | Contratos, pagos, facturacion, base pago, cuentas de cobro, tracking financiero |
| **Que NO hace** | Estrategia, cronogramas, investigacion, creatividad |

---

### Prometeo (Tecnico)
**Bot**: @PrometeoMNBot

El agente tecnico. Soporte de desarrollo, infraestructura y configuracion del sistema.

| | |
|---|---|
| **Cuando usarlo** | Para temas tecnicos del sistema |
| **Que hace** | Soporte tecnico, infraestructura, desarrollo |

---

### Resumen rapido

```
Que necesitas?                              A quien le hablas?
---------------------------------------------------------------
Procesar un brief completo                   @StrategyMambabot
(el coordina todo)

Investigar marca/mercado/tendencia           @RadarMambaBot

Ideas creativas, conceptos, insights,        @CreativeMambaBot
metodologia de campana

Buscar/evaluar influencers,                  @ScoutMambaBot
shortlist con copy comercial

Timeline, estado de tareas, entregas         @PMMambabot

Contratos, pagos, facturacion                @AdmonMambaBot

No se a quien preguntarle                    @StrategyMambabot
(el decide y redirige)
```

---

## 3. Flujo Estrategico de 12 Pasos

Este es el proceso completo para desarrollar una campana, desde que llega el brief hasta la entrega final. Cada paso indica que agente lo ejecuta, que skill usa, que produce, y si necesita aprobacion del equipo antes de avanzar.

### Paso 01 — Recepcion del brief
| | |
|---|---|
| **Agente** | Orquestador (@StrategyMambabot) |
| **Skill** | `brief-to-strategy` |
| **Que produce** | Brief estructurado con el objetivo de campana extraido y variables clave identificadas |
| **Checkpoint** | No — es automatico. El Orquestador recibe el brief y lo procesa |

El Orquestador lee el brief (puede venir del Google Form, un PDF, o un mensaje), extrae el objetivo real, la audiencia, el timeline y las restricciones.

---

### Paso 02 — Identificar retos y objetivo
| | |
|---|---|
| **Agente** | Orquestador (@StrategyMambabot) |
| **Skill** | `challenge-diagnostic` |
| **Que produce** | Retos diagnosticados, objetivo real separado de sintomas, preguntas clave para investigacion |
| **Checkpoint** | Si — presentar al equipo antes de investigar. El equipo valida que el reto esta bien definido |

El Orquestador separa lo que el cliente dice que necesita de lo que realmente necesita. Identifica tensiones, gaps y preguntas que deben resolverse con investigacion.

---

### Paso 03 — Exploracion de ideas
| | |
|---|---|
| **Agente** | Orquestador (@StrategyMambabot) |
| **Skill** | Sesion libre (sin skill formal) |
| **Que produce** | Direcciones iniciales para explorar, hipotesis de trabajo |
| **Checkpoint** | No — es una sesion interna de 10 minutos. Sirve para orientar la investigacion |

---

### Paso 04 — Investigacion + data
| | |
|---|---|
| **Agente** | Radar (@RadarMambaBot) |
| **Skill** | `market-research` + `competitor-analysis` |
| **Que produce** | Hard Data (estudios, reportes, cifras) + Social Data (tendencias, conversaciones, percepcion) + analisis competitivo |
| **Checkpoint** | Si — presentar hallazgos al equipo antes de pasar a Creative. La data fundamenta todo lo que viene despues |

El Orquestador spawna a Radar con todo el contexto del brief. Radar investiga en profundidad y devuelve analisis con fuentes. El equipo revisa y valida antes de avanzar.

---

### Paso 05 — Hallazgo del insight
| | |
|---|---|
| **Agente** | Musa (@CreativeMambaBot) |
| **Skill** | `insight-builder` |
| **Que produce** | La verdad humana que conecta marca con consumidor. Formato: "[El target] siente/piensa/hace [comportamiento] porque [motivacion profunda]" |
| **Checkpoint** | Si — el insight se aprueba con el equipo. Es la pieza mas critica: todo lo demas se construye sobre el |

El insight NO es un dato. Es una revelacion — lo que el target reconoce como propio. Musa lo construye a partir de la investigacion de Radar.

---

### Paso 06 — Identificativo de marca
| | |
|---|---|
| **Agente** | Musa (@CreativeMambaBot) |
| **Skill** | `concept-builder` |
| **Que produce** | El elemento visual, verbal o gestual que identifica la campana. Un sonido, una expresion, un ritual — algo que la audiencia identifica inmediatamente con la marca |
| **Checkpoint** | Se presenta junto con el Paso 07 (concepto) |

---

### Paso 07 — Concepto
| | |
|---|---|
| **Agente** | Musa (@CreativeMambaBot) |
| **Skill** | `concept-builder` |
| **Que produce** | Big Idea + concepto aterrizado. Minimo 3 opciones, cada una con nombre, explicacion, tono, tipo de contenido, y por que funciona |
| **Checkpoint** | Si — aprobar concepto antes de avanzar a metodologia. Es el paraguas creativo de toda la campana |

---

### Paso 08 — Metodologia
| | |
|---|---|
| **Agente** | Musa (@CreativeMambaBot) |
| **Skill** | `methodology-selector` |
| **Que produce** | Metodologia seleccionada entre RAYO, ARCO, PRISMA o MAREA, con justificacion completa |
| **Checkpoint** | Se presenta junto con el Paso 09 |

Las 4 metodologias de Mamba Negra:
- **RAYO** — Campana express, 1-2 semanas. Para timelines apretados y briefs claros
- **ARCO** — Campana por fases con narrativa, 3-6 semanas. Para arcos de contenido
- **PRISMA** — Campana robusta con piramide de distribucion, 4-8 semanas. Para multiples objetivos
- **MAREA** — Always On, 6-12 meses. Para presencia sostenida y embajadores a largo plazo

---

### Paso 09 — Ideas de contenido + lineamientos
| | |
|---|---|
| **Agente** | Musa (@CreativeMambaBot) |
| **Skill** | `content-guidelines` |
| **Que produce** | Lineamientos de comunicacion, ideas concretas de contenido por fase, bajada a guion, do's y don'ts, referencias visuales |
| **Checkpoint** | Si — aprobar antes de armar la entrega. Estas ideas van directo a la propuesta |

---

### Paso 10 — Entrega parcial
| | |
|---|---|
| **Agente** | Orquestador (@StrategyMambabot) |
| **Skill** | `brief-to-strategy` |
| **Que produce** | Propuesta compilada con todo lo producido hasta ahora, lista para revision interna del equipo |
| **Checkpoint** | Si — revision del equipo completo |

El Orquestador recopila todos los outputs de los workers (Research, Creative, Influencer si aplica) y los sintetiza en una propuesta coherente.

---

### Paso 11 — Feedback y correcciones
| | |
|---|---|
| **Agente** | Orquestador (@StrategyMambabot) |
| **Skill** | Modo iterativo |
| **Que produce** | Versiones corregidas basadas en feedback del equipo |
| **Checkpoint** | Tantos ciclos como sean necesarios hasta que el equipo este satisfecho |

Cada correccion se guarda en memoria. El Orquestador incorpora el feedback y re-spawna a los agentes necesarios si hay cambios mayores.

---

### Paso 12 — Entrega final
| | |
|---|---|
| **Agente** | Orquestador (@StrategyMambabot) |
| **Skill** | `brief-to-strategy` |
| **Que produce** | Documento final guardado en Google Drive + Campaign Strategy Index actualizado |
| **Checkpoint** | Si — aprobacion final antes de enviar al cliente |

---

### Skills de soporte

Estas skills no tienen paso fijo — se usan cuando el brief lo requiere:

| Skill | Agente | Cuando se usa |
|-------|--------|---------------|
| `scouting-shortlist` | Scout (@ScoutMambaBot) | Cuando la campana necesita influencers. Produce shortlist con scoring y copy comercial |
| `brand-voice-builder` | Musa (@CreativeMambaBot) | Cuando es un cliente nuevo sin perfil de voz definido |
| `event-concept` | Musa (@CreativeMambaBot) | Cuando el brief incluye un evento presencial |

---

## 4. Herramientas Disponibles por Agente

### Orquestador (@StrategyMambabot)

| Herramienta | Para que sirve |
|-------------|----------------|
| Google Drive (gog) | Leer y guardar documentos, briefs, propuestas en Drive |
| Google Sheets | Consultar y actualizar el Campaign Strategy Index (registro central de campanas) |
| Notion | Gestion de proyectos y documentacion interna |
| Tavily Search | Busqueda web rapida cuando necesita contexto minimo |
| sessions_spawn | Lanzar a Research, Creative o Influencer a trabajar en paralelo |
| sessions_send | Consultar puntualmente a cualquier agente (PM, Admin, etc.) |

### Radar / Research (@RadarMambaBot)

| Herramienta | Para que sirve |
|-------------|----------------|
| **Tavily Search** | Busqueda web rapida — para datos puntuales y noticias |
| **Tavily Research** | Investigacion profunda tipo analista — la herramienta mas poderosa de Radar. Genera reportes completos con multiples fuentes |
| **Tavily Extract** | Leer el contenido completo de una URL especifica |
| **Tavily Crawl** | Analizar un sitio web completo (todas sus paginas) |
| **Tavily Map** | Mapear la estructura de un sitio web |
| Google Drive (gog) | Buscar briefs anteriores, propuestas y reportes en Drive |
| sessions_send | Consultar a Creative o Influencer si necesita cruzar datos |

### Musa / Creative (@CreativeMambaBot)

| Herramienta | Para que sirve |
|-------------|----------------|
| Google Drive (gog) | Acceder a brand voice profiles, briefs y campanas anteriores en Drive |
| sessions_send | Consultar a Research (para datos que alimenten insights) o a Influencer |
| Conocimiento interno | Framework de campana, metodologias (RAYO/ARCO/PRISMA/MAREA), brand voices guardados |

### Scout / Influencer (@ScoutMambaBot)

| Herramienta | Para que sirve |
|-------------|----------------|
| Tavily (busqueda web) | Background check de influencers — buscar polemicas, noticias, colaboraciones recientes |
| Google Drive (gog) | Acceder a Sheets con shortlists, criterios de scouting, historicos |
| sessions_send | Consultar a Creative (alineacion con concepto) o Research (datos de audiencia) |

### PM (@PMMambabot)

| Herramienta | Para que sirve |
|-------------|----------------|
| Google Sheets | Gantt de campanas, tracking de entregas, feedback de videos por influencer |
| Notion (22 herramientas) | Gestion de proyectos, tareas, bases de datos, wikis |
| sessions_send | Consultar a cualquier agente sobre estado de su trabajo |

### Admin (@AdmonMambaBot)

| Herramienta | Para que sirve |
|-------------|----------------|
| Google Drive (gog) | Contratos, base pago, facturas, documentos financieros |
| sessions_send | Consultar a PM (fechas) o al Orquestador (contexto de campana) |
| Memoria activa | Tracking financiero persistente entre sesiones |

---

## 5. Como Interactuar con los Agentes

### Reglas basicas

1. En el grupo "MNL Strategy Team", usar **@mencion** para hablar con un agente especifico
2. Sin @mencion, responde el **Orquestador** (es el default del grupo)
3. Cada campana tiene su **propio topic** en el grupo — asi el contexto no se mezcla
4. Los agentes **recuerdan** el contexto de la conversacion dentro del mismo topic
5. Si un agente da una respuesta que no te gusta, **corregirlo directamente** — el guarda la correccion como regla para no repetir el error
6. El comando `/reset` borra la conversacion actual (pero las memorias guardadas sobreviven)

### Como pedir trabajo

**Para iniciar una campana completa:**
> "Procesa el brief de Nike" → hablar con @StrategyMambabot

**Para investigacion:**
> "Investiga el mercado de harinas en Colombia" → hablar con @RadarMambaBot

**Para influencers:**
> "Arma una shortlist de foodies top en Colombia" → hablar con @ScoutMambaBot

**Para creatividad:**
> "Redacta el concepto creativo basado en este insight" → hablar con @CreativeMambaBot

**Para operaciones:**
> "Como va la campana de Diana?" → hablar con @PMMambabot

**Para pagos:**
> "Que pagos vencen esta semana?" → hablar con @AdmonMambaBot

**Cuando no sabes a quien hablarle:**
> Hablar con @StrategyMambabot — el redirige al agente correcto

### Tips pro

- **Subir PDFs o documentos** por Telegram — los agentes pueden leerlos y procesarlos
- **Compartir links** — Research puede extraer el contenido completo de una pagina web
- **Dar ejemplos** — como hizo Mar con las metodologias de Manimoto y Acetaminofen, los agentes aprenden del ejemplo y lo usan como referencia
- **Ser especifico con correcciones** — "no uses la palabra X" es mejor que "no me gusta". Entre mas especifico el feedback, mejor se ajusta el agente
- **Pedir mas detalle** — si la respuesta es corta, decir "desarrolla mas" o "esto va para la PPT, necesito mas detalle"
- **Subir briefs por el Google Form** — el Orquestador lee briefs directamente del formulario de Google

### Modos de respuesta

Los agentes tienen dos modos de respuesta que se activan automaticamente:

**MODO RAPIDO** — Para preguntas, consultas de estado, confirmaciones
- Respuesta corta y directa
- Ejemplo: "La shortlist esta lista. Faltan 2 perfiles de TikTok."

**MODO ENTREGA** — Para propuestas, investigaciones, shortlists, metodologias
- Respuesta completa y desarrollada, lista para PPT
- Cada seccion con argumentacion completa
- Ejemplo: un insight con tension real, un concepto con justificacion, una shortlist con copy comercial

No hay que activarlos manualmente — el agente detecta el tipo de interaccion. Pero si la respuesta es muy corta cuando necesitas algo completo, solo dile: **"desarrolla mas"** o **"esto va para la PPT"**.

---

## 6. Gestion del Conocimiento por Campana

### Como se acumula el conocimiento

Cada fase produce outputs que se convierten en inputs para la siguiente. El Orquestador es responsable de mantener la cadena completa:

1. **Guarda decisiones clave en memoria** — insight aprobado, concepto elegido, correcciones del equipo. Todo queda registrado para que no se pierda entre sesiones
2. **Pasa contexto completo a cada worker** — cuando spawna a Research o Creative, incluye todo lo decidido hasta el momento. Los workers no tienen acceso automatico al historial de conversacion del grupo
3. **No pierde correcciones** — las reglas del equipo (ejemplo: "no mencionar a Tulio", "no usar terminologia interna") se guardan y se consultan antes de cada tarea
4. **Campaign Strategy Index** — registro central en Google Sheets de todas las campanas con estado, decisiones clave y entregables

### Que pasa si un agente no recuerda algo

- Las memorias de cada agente **sobreviven entre sesiones** — estan guardadas en archivos permanentes
- Si el agente no recuerda algo, pedirle: **"revisa en tu memoria lo que hablamos sobre [tema]"**
- El Orquestador puede consultar el **Campaign Strategy Index** en Sheets para recuperar el estado de cualquier campana
- Si todo lo anterior falla, el equipo puede compartir el contexto nuevamente — el agente lo incorpora de inmediato

### Memoria de correcciones

Cada vez que el equipo corrige a un agente, esa correccion se guarda como regla permanente. Ejemplos:

- "No uses la palabra 'stakeholder'" → el agente nunca la vuelve a usar
- "La marca X tiene tono jovial, no corporativo" → queda en el brand voice profile
- "El insight de la campana Y es este" → queda como referencia para futuras iteraciones

Esto significa que **entre mas usen los agentes, mejor se ajustan** al estilo y preferencias del equipo.

---

## 7. Preguntas Frecuentes

**Se me olvido con quien hablar para X cosa**
> Habla con @StrategyMambabot. El sabe a quien redirigirte.

**El agente no esta respondiendo**
> Verificar que el bot este en el grupo y que se este usando la @mencion correcta. Si persiste, avisar a Juan Jose.

**Quiero empezar una campana nueva**
> Crear un nuevo topic en el grupo y hablar con @StrategyMambabot con el brief o la informacion que tengas.

**El agente dio una respuesta que no me sirve**
> Corregirlo directamente y decirle que estuvo mal. El ajusta y guarda la correccion.

**Necesito que el agente use un documento**
> Subir el PDF o compartir el link directamente en el chat. Los agentes pueden leer ambos.

**Los agentes pueden hablar entre ellos?**
> Si. El Orquestador puede lanzar varios agentes a trabajar en paralelo. Tambien cualquier agente puede consultar a otro si necesita informacion de su area.

---

*Este manual es un documento vivo. Se actualiza conforme evoluciona el sistema de agentes y el equipo da feedback sobre su uso.*
