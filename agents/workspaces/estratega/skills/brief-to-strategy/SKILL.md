---
name: brief-to-strategy
description: Activa cuando compartan un brief de cliente, pidan armar una propuesta estrategica, iniciar el pensamiento estrategico de una campana, o digan "arranca propuesta". Coordina el flujo completo de brief a entrega final en 12 pasos, despachando trabajo a agentes especializados.
---

# Brief-to-Strategy — Flujo Orquestado de 12 Pasos

Este skill guia el proceso de transformar un brief de cliente en una propuesta estrategica completa, **coordinando agentes especializados** en cada fase.

**ANTES DE EMPEZAR**: Lee `knowledge/campaign-framework.md` para tener el contexto completo del proceso, las metodologias y la metodologia de investigacion.

El flujo es una guia, no una camisa de fuerza — hay proyectos que comprimiran pasos, otros que los expandiran. Lo esencial es respetar la logica: investigar antes de concluir, construir sobre verdades humanas, y alinear internamente antes de entregar.

---

## FASE 1: ANALISIS INICIAL (Orquestador ejecuta directamente)

### PASO 01: RECEPCION DEL BRIEF

Momento de alineacion inicial. Aqui se entiende el encargo del cliente, sus expectativas y los plazos.

#### Si te pegan el brief en el chat:
Leelo completo y extrae:
- Marca y producto
- Objetivo de la campana (awareness, conversion, brand building, lanzamiento)
- Target descrito por el cliente
- Presupuesto (si lo mencionan)
- Timeline / fechas clave
- Plataformas solicitadas
- Cantidad de influencers (si lo mencionan)
- Restricciones o mandatorios

#### Si te dicen "busca el brief en Drive":
```bash
gog drive search "[nombre marca] brief" --max 5
```

#### Si te dicen "revisa el ultimo brief del formulario" o "revisa el brief de [marca]":
1. Lista los briefs disponibles (solo timestamp + email + marca):
```bash
gog sheets get 1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw 'A:D' --json
```
2. Identifica la fila correcta.
3. Lee esa fila completa (reemplaza N con el numero de fila):
```bash
gog sheets get 1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw 'A<N>:AC<N>' --json
```

#### Entregable del Paso 01:
Presenta un **resumen ejecutivo del brief**:

```
BRIEF — [MARCA]
Objetivo: [1 linea]
Target: [descripcion]
Presupuesto: [monto o "no especificado"]
Timeline: [fechas o "no especificado"]
Plataformas: [IG / TikTok / YouTube / etc.]
Influencers: [cantidad o "no especificado"]
Restricciones: [do's y don'ts mencionados]
```

Luego identifica **info faltante para el contra-brief**.

**Pregunta al equipo**: "Este es mi resumen del brief. Falta algo? Listo para avanzar?"

---

### PASO 02: IDENTIFICACION DE RETOS Y OBJETIVO

Mapea con claridad el **problema real del cliente**, separando sintomas de causas.

#### Entregable:
```
RETOS ESTRATEGICOS — [MARCA]

Problema del cliente (lo que pide): [1-2 lineas]
Problema real (lo que necesita): [1-2 lineas]

Reto 1: [reto de ejecucion estrategica, no del cliente]
Reto 2: [reto de ejecucion estrategica]

Objetivo norte: [el norte que guia la campana]
```

**IMPORTANTE**: Los retos son de EJECUCION ESTRATEGICA de Mamba Negra como agencia. Enfocate en: como traducir el problema en contenido relevante, como lograr conexion real con la audiencia, como usar influencers mas alla de lo superficial.

#### Guia de calidad (Banco de Prompts MNL):

**Para retos**: Identifica tensiones estrategicas reales, no sintomas. Para cada reto explica que esta pasando realmente (mas alla de lo evidente), por que es un problema para la marca, y que lo hace dificil de resolver. Evita cosas obvias. Output esperado: retos con filo (tensiones), no listas de sintomas.

**Para objetivo**: Construye un objetivo que vaya mas alla de "posicionar" o "dar a conocer". Debe responder al problema real del cliente, integrar el rol de los influencers como medio principal, y tener una intencion estrategica clara (que cambio queremos generar en la audiencia). Si ya tienes insights y retos, el objetivo debe conectar los tres niveles: problema del cliente + verdad del consumidor + solucion desde influencer marketing.

**Pregunta al equipo**: "Estos son los retos que identifico. Se alinean con lo que ven ustedes?"

---

### PASO 03: SESION DE EXPLORACION DE IDEAS (10 min)

Detecta oportunidades y comunica al equipo que tipo de influencers imaginas para la campana.

#### Entregable:
- 3-5 direcciones iniciales de como podria verse la campana
- Tipo de influencers que imaginas (tier, nicho, tono, plataforma)
- Angulos iniciales a explorar en la investigacion

Si necesitas un dato rapido para fundamentar alguna direccion, usa `sessions_send` a Research:
```
sessions_send("research", "Dato rapido: cual es el tamano del mercado de [categoria] en Colombia? Hay alguna tendencia relevante reciente?")
```

**Pregunta al equipo**: "Estas son mis primeras direcciones. Alguna les resuena mas? Hay algo que ya tengan en mente?"

---

## FASE 2: DESPACHO A ESPECIALISTAS (Orquestador coordina)

### PASO 04: INVESTIGACION — sessions_spawn → Research Agent

Lanza Research Agent para la investigacion profunda. Opcionalmente, lanza Influencer Analyst en paralelo para explorar perfiles disponibles.

#### Spawn Research:
```
sessions_spawn("research", "Investiga la marca [MARCA] en el mercado [CATEGORIA] de Colombia. Contexto del brief: [resumen ejecutivo del paso 01]. Retos identificados: [del paso 02]. Direcciones iniciales: [del paso 03]. Necesito: Hard Data (papers, reportes, estudios de mercado) + Social Data (tendencias, conversaciones en redes, percepcion). Enfocate en: [angulos especificos que surgieron en paso 03].")
```

#### Spawn Influencer (opcional, en paralelo):
```
sessions_spawn("influencer", "Explora que perfiles de influencers hay disponibles para una campana de [MARCA]. Categoria: [categoria]. Target: [descripcion]. Plataformas: [IG/TikTok]. Tipo imaginado: [del paso 03]. NO armes shortlist final todavia — solo un mapeo inicial de que hay en el mercado.")
```

**Reportar al equipo**: "Lance Research para la investigacion profunda y Influencer para un mapeo inicial de perfiles. Cuando terminen, sigo con Creative."

**Espera resultados de Research antes de avanzar a Paso 05.**

---

### PASO 05-09: CREATIVIDAD — sessions_spawn → Creative Strategist

Con los hallazgos de Research, lanza Creative Strategist para los pasos creativos.

#### Spawn Creative:
```
sessions_spawn("creative", "Construye propuesta creativa completa para [MARCA].

Brief resumido: [del paso 01]
Retos identificados: [del paso 02]
Direcciones iniciales: [del paso 03]
Research completo: [pegar hallazgos clave de Research]

Necesito que ejecutes:
- Paso 05: Hallazgo del insight (3-4 opciones en lenguaje coloquial)
- Paso 06: Identificativo de marca (2-3 propuestas)
- Paso 07: Construccion del concepto (minimo 3 proposiciones)
- Paso 08: Definicion de metodologia (RAYO/ARCO/PRISMA/MAREA con justificacion)
- Paso 09: Ideas de contenido por fase (con referencias visuales si es posible)

Brand voice: [si existe perfil, incluir resumen. Si no, mencionar que no hay y que proponga uno.]")
```

**Reportar al equipo**: "Lance Creative con todo el research. Esta trabajando en insight, concepto, metodologia e ideas de contenido."

Si Creative necesita datos adicionales durante su trabajo, usara `sessions_send` a Research internamente.

---

## FASE 3: SINTESIS Y ENTREGA (Orquestador ejecuta directamente)

### PASO 10: ENTREGA PARCIAL — Orquestador compila

Sintetiza los resultados de Research + Creative + Influencer (si se lanzo) en un entregable consolidado.

**NO pegues los outputs crudos de los workers**. Sintetiza, conecta y presenta con estructura.

#### Entregable:
```
STRATEGIC THINKING — [MARCA] — Resumen para alineacion

Retos: [resumen, del paso 02]
Research clave: [sintesis de hallazgos de Research — 3-5 puntos]
Insight: "[el propuesto por Creative]"
Identificativo: [el propuesto por Creative]
Concepto: "[proposicion elegida por Creative]"
Metodologia: [RAYO/ARCO/PRISMA/MAREA — justificacion de Creative]
Fases: [resumen con timeline]
Ideas de contenido: [resumen por fase]
Perfiles disponibles: [si Influencer mapeo, resumen de lo que hay]
```

**Pregunta**: "Estamos alineados para avanzar? Algo que ajustar?"

---

### PASO 11: FEEDBACK Y CORRECCIONES — Orquestador gestiona

Incorpora los ajustes derivados de la revision del equipo.

- Si el feedback afecta la investigacion → re-spawn Research con la nueva direccion
- Si el feedback afecta el concepto/insight → re-spawn Creative con los ajustes
- Si el feedback afecta perfiles de influencers → re-spawn Influencer con nuevos criterios
- Si es un ajuste menor → hazlo tu directamente

El proceso no termina hasta que el equipo este alineado.

---

### PASO 12: ENTREGA FINAL + GUARDAR EN DRIVE

Cierre formal. Documento completo, alineado y listo para el cliente.

#### Guardar en Drive y actualizar Index

- **Campaign Strategy Index Sheet**: `1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c`
- **Carpeta Campanas**: `1YFzhxdq0cZ2b6nIOpLrrtY6rxONGK63Z`

**12.1 — Verificar si la campana ya existe en el Index:**
```bash
gog sheets get 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!A:L" --json
```

**12.2 — Crear Google Docs con las conclusiones:**
```bash
gog docs create "01-Brief-Analysis — [MARCA]"
gog docs append <docId> "contenido"
```

Nombrar docs: `01-Brief-Analysis`, `02-Retos`, `03-Strategic-Thinking`, `04-Criterios-Scouting`, `05-Ideas-Contenido`

**12.3 — Actualizar el Index Sheet:**
```bash
gog sheets append 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!A:L" --values-json '[["[CAMPANA]","[MARCA]","[FOLDER_ID]","Entregada","Done","Done","Done","Done","Done","","","2026-04-02"]]' --insert INSERT_ROWS
```

#### Resumen final:
```
STRATEGIC THINKING — [MARCA] — Entrega Final

Metodologia: [RAYO/ARCO/PRISMA/MAREA]
Insight: "[el elegido]"
Identificativo: [el elegido]
Concepto: "[proposicion elegida]"
Fases: [resumen con timeline]
Criterios de scouting: [resumen]

Documentos en Drive: [links]
Index actualizado: [estado]

Proximos pasos:
1. [siguiente accion — ej: "Influencer arma shortlist final"]
2. [siguiente accion — ej: "PM crea cronograma"]
```

---

## PASO EXTRA: CRITERIOS DE SCOUTING

Cuando el equipo necesite bajar la estrategia a criterios de busqueda para el CM, spawna Influencer Analyst:

```
sessions_spawn("influencer", "Arma shortlist final para [MARCA]. Estrategia completa: [pegar resumen del paso 10]. Insight: [insight]. Concepto: [concepto]. Plataformas: [IG/TikTok]. Target: [descripcion]. Necesito: shortlist con copy comercial por perfil (directiva Carlos) + criterios de scouting para CMs + tabla resumen.")
```

---

## PASO EXTRA: VOZ DE MARCA — VERIFICAR O CO-CREAR

Ejecutar cuando se necesite definir la voz de marca (puede ir entre el paso 01 y 04):

### Buscar perfil existente:
```bash
gog drive search "brand voice [marca]" --max 5
```

### Si NO existe perfil de voz:
Dile a Mar: "No tenemos perfil de voz para [marca]. Voy a proponer uno basado en el brief."

Genera un borrador: personalidad (3 adjetivos), tono, frases SI/NO, audiencia core, look & feel, do's/don'ts.

**Pregunta a Mar**: "Que ajustarias? Hay algo del tono que yo no pueda saber solo con el brief?"

---

## REGLAS DEL FLUJO

1. **No te saltes pasos** — cada paso depende del anterior
2. **Espera validacion** — no avances sin que Mar o el equipo confirmen
3. **Research antes de Creative** — no spawnes Creative sin tener investigacion
4. **Mar decide** — tu propones y coordinas, ella elige. No impongas opciones
5. **Si falta info, pregunta** — no inventes datos
6. **Guarda en Drive despues del paso 12** — documenta la entrega completa
7. **Consulta el Index antes de empezar** — si alguien ya trabajo en esta campana, lee los docs existentes
8. **Lee knowledge/campaign-framework.md** — es tu fuente de verdad para el proceso completo
9. **Siempre da contexto a los workers** — incluye brief, retos y lo que necesitas en cada spawn
10. **Sintetiza, no copies** — cuando reportes resultados de workers, extrae lo importante
