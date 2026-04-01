---
name: brief-to-strategy
description: Activa cuando compartan un brief de cliente, pidan armar una propuesta estrategica, iniciar el pensamiento estrategico de una campana, o digan "arranca propuesta". Guia el flujo completo de brief a Strategic Thinking.
---

# Brief-to-Strategy — Flujo Completo

Este skill guia el proceso de transformar un brief de cliente en una propuesta estrategica completa. Sigue los pasos en orden. NO te saltes pasos. Cada paso requiere respuesta del equipo antes de avanzar al siguiente.

---

## PASO 1: RECIBIR Y ANALIZAR EL BRIEF

### Si te pegan el brief en el chat:
Leelo completo y extrae:
- Marca y producto
- Objetivo de la campana (awareness, conversion, brand building, lanzamiento)
- Target descrito por el cliente
- Presupuesto (si lo mencionan)
- Timeline / fechas clave
- Plataformas solicitadas
- Cantidad de influencers (si lo mencionan)
- Restricciones o mandatorios

### Si te dicen "busca el brief en Drive":
Usa gog para buscarlo:
```bash
gog drive search "[nombre marca] brief" --max 5
```
Lee el documento y extrae lo mismo.

### Si te dicen "busca en Notion":
```bash
mcporter call notion.API-post-search --args '{"query": "[nombre marca] brief"}'
```

### Si te dicen "revisa el ultimo brief del formulario" o "revisa el brief de [marca]":
1. Primero lista los briefs disponibles (solo timestamp + email + marca, ahorra tokens):
```bash
gog sheets get 1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw 'A:D' --json
```
2. Identifica la fila correcta (la ultima, o la que coincida con la marca que piden).
3. Lee esa fila completa (reemplaza N con el numero de fila):
```bash
gog sheets get 1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw 'A<N>:AC<N>' --json
```
4. Extrae los campos del brief normalmente y continua con el Paso 1.

**IMPORTANTE**: No leas todas las filas completas de una vez. Primero lista (A:D), luego lee solo la fila que necesitas (A<N>:AC<N>). Esto ahorra tokens.

### Entregable del Paso 1:
Presenta un **resumen ejecutivo del brief** en este formato:

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

Luego identifica **info faltante para el contra-brief** — lo que necesitamos pedirle al cliente. Minimo evalua si falta:
1. Target especifico (edad, genero, ubicacion, NSE, momento de consumo)
2. Plataformas priorizadas
3. Tipo de contenido (organico, pauta, UGC)
4. Do's y Don'ts regulatorios del producto
5. KPIs esperados
6. Referencias de campanas anteriores de la marca
7. Exclusividad (pueden los creadores trabajar con competidores?)

**Pregunta al equipo**: "Este es mi resumen del brief. Falta algo? Listo para armar el checklist de contra-brief?"

---

## PASO 2: VOZ DE MARCA — VERIFICAR O CO-CREAR

### Buscar perfil existente:
Busca en knowledge/brands/ si ya existe un perfil para esta marca. Si tienes acceso a Drive:
```bash
gog drive search "brand voice [marca]" --max 5
```

### Si EXISTE perfil de voz:
Presenta un resumen rapido:
```
VOZ DE MARCA — [MARCA]
Personalidad: [3 adjetivos]
Tono: [registro]
Audiencia core: [1 linea]
Do's y Don'ts clave: [los mas importantes]
```

**Pregunta a Mar**: "Este es el perfil de voz que tenemos para [marca]. Sigue vigente para esta campana o hay algo que ajustar?"

Si Mar confirma, avanza al Paso 3. Si hay ajustes, actualiza y confirma de nuevo.

### Si NO existe perfil de voz:
Dile a Mar: "No tenemos perfil de voz para [marca]. Voy a proponer uno basado en lo que dice el brief. Necesito que lo valides."

Genera un borrador basado en el brief, extrayendo:
- Personalidad probable de la marca (por el tono del brief, la categoria, el target)
- Audiencia descrita
- Restricciones mencionadas
- Tipo de contenido que piden

Presenta el borrador usando la estructura del template (personalidad, tono, frases SI/NO, audiencia, look & feel, do's/don'ts).

**Pregunta a Mar**: "Este es mi borrador de voz de marca para [marca]. Que ajustarias? Hay algo del tono que yo no pueda saber solo con el brief?"

Incorpora el feedback de Mar y confirma el perfil final antes de avanzar.

---

## PASO 3: RECOMENDAR METODOLOGIA

Evalua el brief contra los 4 tipos de campana:

| Factor | RAYO | ARCO | PRISMA | MAREA |
|--------|------|------|--------|-------|
| Timeline < 2 semanas | Si | No | No | No |
| Narrativa en fases | No | Si | Opcional | No |
| Alto volumen de influencers | No | Opcional | Si | Si |
| Presupuesto limitado | Si | Depende | No | No |
| Awareness masivo | No | Depende | Si | Si |
| Presencia sostenida | No | No | No | Si |

Presenta tu recomendacion con la justificacion:

```
METODOLOGIA RECOMENDADA: [RAYO/ARCO/PRISMA/MAREA]
Por que: [2-3 razones basadas en el brief]
Alternativa: [si hay otra viable, mencionala]
Fases sugeridas: [si es ARCO o PRISMA, define las fases]
```

**Pregunta a Mar**: "Te hace sentido esta metodologia o ves otra opcion?"

---

## PASO 4: INVESTIGACION (SPARRING CON MAR)

Mar hace su propia investigacion en Perplexity, Google Trends, Answer The Public. Tu rol aqui es **sparring partner**, no investigador principal.

### Cuando Mar te comparta hallazgos de su investigacion:
1. Analiza lo que encontro — identifica patrones, tensiones culturales, oportunidades
2. Conecta con el brief y el target — que hallazgos son mas relevantes para ESTA campana
3. Sugiere angulos a profundizar — "Esto es interesante, te sugiero explorar [X] porque [razon]"
4. Aporta contexto de campanas similares si hay en Drive

### Cuando Mar te pida ayuda directa:
Apoya con lo que tienes disponible:
- Buscar campanas pasadas similares en Drive
- Consultar MAMBA FRIENDS en Notion para influencers con historial en la categoria
- Analizar tendencias basado en lo que Mar te comparta

**NO pretendas investigar en internet** — si necesitas datos que no tienes, dile a Mar que lo busque en Perplexity y te comparta los hallazgos.

---

## PASO 5: CONSTRUIR EL STRATEGIC THINKING

Guia la construccion paso a paso. Para cada seccion, propone un borrador y espera validacion de Mar.

### 5.1 — Marca
- Marca principal y apellido de marca (si aplica)
- Contexto de la marca en el mercado colombiano

### 5.2 — Target
- Demografico: edad, genero, ubicacion, NSE
- Psicografico: estilo de vida, valores, intereses
- Momento de consumo: cuando y donde

**Usa el perfil de voz** del Paso 2 para alinear el target con la audiencia core de la marca.

### 5.3 — Fuente de Volumen
- De donde vienen los clientes potenciales
- A quien le "quitamos" atencion o consumidores

### 5.4 — Insight
Propone 3-4 opciones de insight con analisis de pros/cons para cada una:

```
OPCION 1: "[insight]"
- Fortaleza: [por que conecta]
- Riesgo: [posible problema]

OPCION 2: "[insight]"
...

OPCION NUEVA (del bot): "[insight que Mar no considero]"
- Fortaleza: ...
```

**Pregunta a Mar**: "Cual te conecta mas? Quieres que profundice alguno?"

### 5.5 — Beneficios
- Mandatorios (lo que el cliente exige comunicar)
- Diferenciales (lo que realmente distingue y puede ser eje creativo)

### 5.6 — Look & Feel
Alinear con el **perfil de voz de marca** del Paso 2:
- Estetica visual coherente con la personalidad de marca
- Tipo de produccion sugerido
- Referentes de contenido

### 5.7 — Producto / Portafolio
- Productos a destacar con prioridades

### 5.8 — Proposiciones
Genera minimo 3 proposiciones (angulos estrategicos):

```
PROPOSICION 1: "[nombre/concepto]"
- Concepto: [explicacion]
- Tono: [como se siente]
- Tipo de contenido: [formatos sugeridos]
- Por que funciona: [conexion con insight + target + marca]

PROPOSICION 2: ...
PROPOSICION 3: ...
```

**Pregunta a Mar**: "Cual resuena mas? Quieres que desarrolle alguna mas a fondo?"

---

## PASO 6: IDEAS DE CONTENIDO POR FASE

Una vez Mar elija el concepto y la metodologia tenga fases definidas, genera ideas de contenido para cada fase:

```
FASE 1: [nombre de la fase] (Semana X-Y)
- Idea A: "[titulo/concepto del contenido]" — formato [Reel/TikTok/Story/Carousel]
- Idea B: ...
- Idea C: ...

FASE 2: [nombre de la fase] (Semana X-Y)
- Idea D: ...
```

Para cada idea, alinear con:
- El insight elegido
- La voz de marca del Paso 2
- Los do's y don'ts regulatorios
- El tipo de influencer ideal (del perfil de voz)

---

## PASO 7: CRITERIOS DE SCOUTING

Con la estrategia definida, genera los criterios de busqueda para el CM:

```
CRITERIOS DE SCOUTING — [MARCA]

Filtros Modash:
- Plataforma: [IG / TikTok / ambas]
- Pais: Colombia
- Seguidores: [rango]
- Engagement Rate: minimo [X]%
- Audiencia: [X]% Colombia, [X]% edad target, [X]% genero target

Tipo de contenido:
- [estilo alineado con la voz de marca]

Background check:
- [competidores especificos a verificar]
- [categorias rechazadas]

Nota para el CM: Cuando tengas candidatos, mandamelos y te los evaluo con copy comercial.
```

---

## PASO 8: GUARDAR EN DRIVE + ACTUALIZAR INDEX

### Campaign Strategy Index
- **Sheet ID**: `1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c`
- **Carpeta Campanas**: `1YFzhxdq0cZ2b6nIOpLrrtY6rxONGK63Z`
- **Columnas**: A=Campana, B=Marca, C=Folder ID, D=Estado General, E=Brief, F=Brand Voice, G=Metodologia, H=Strategic Thinking, I=Criterios Scouting, J=Shortlist, K=Propuesta, L=Ultima Actualizacion

### Al completar cada paso, guarda un Google Doc y actualiza el Index

**8.1 — Verificar si la campana ya existe en el Index:**
```bash
gog sheets get 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!A:L" --json
```

**8.2 — Buscar la carpeta de la campana en Drive:**
```bash
gog drive search "trashed=false and '1YFzhxdq0cZ2b6nIOpLrrtY6rxONGK63Z' in parents and name='[MARCA]'" --max 5
```
Si la carpeta ya existe (como Noraver, Fruco, etc.), usa ese Folder ID. Si no existe, necesitarias que alguien la cree en Drive.

**8.3 — Crear Google Doc con las conclusiones del paso completado:**

Usa `gog docs create` para crear un documento con el contenido del paso. Nombra los docs asi:
- `01-Brief-Analysis — [MARCA]`
- `02-Brand-Voice — [MARCA]`
- `03-Strategic-Thinking — [MARCA]`
- `04-Criterios-Scouting — [MARCA]`
- `05-Ideas-Contenido — [MARCA]`

```bash
gog docs create "01-Brief-Analysis — [MARCA]"
```
Luego escribe el contenido:
```bash
gog docs append <docId> "contenido del analisis"
```

**8.4 — Actualizar el Index Sheet:**

Si es campana nueva (no existe en el Index), agregar fila:
```bash
gog sheets append 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!A:L" --values-json '[["[CAMPANA]","[MARCA]","[FOLDER_ID]","En estrategia","Done","Pendiente","","","","","","2026-03-31"]]' --insert INSERT_ROWS
```

Si ya existe, actualizar las columnas correspondientes:
```bash
gog sheets update 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!E<ROW>:E<ROW>" --values-json '[["Done"]]' --input USER_ENTERED
gog sheets update 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!L<ROW>:L<ROW>" --values-json '[["2026-03-31"]]' --input USER_ENTERED
```

### Valores validos por columna

| Columna | Valores |
|---------|---------|
| E-K (pasos) | `Pendiente` / `En progreso` / `Done` |
| D (Estado General) | `Brief recibido` / `En estrategia` / `Scouting` / `Propuesta` / `Entregada` |

### Resumen final al usuario

Despues de guardar, presenta:

```
STRATEGIC THINKING — [MARCA] — Resumen

Metodologia: [RAYO/ARCO/PRISMA/MAREA]
Insight: "[el elegido]"
Concepto: "[proposicion elegida]"
Voz de marca: [3 adjetivos]
Fases: [resumen de fases con timeline]
Criterios de scouting: [resumen 1 linea]

Documentos guardados en Drive:
- 01-Brief-Analysis: [link o "guardado"]
- 02-Brand-Voice: [link o "guardado"]
- ...

Index actualizado: [MARCA] — Estado: [estado actual]

Proximos pasos:
1. [siguiente accion]
2. [siguiente accion]
```

---

## REGLAS DEL FLUJO

1. **No te saltes pasos** — cada paso depende del anterior
2. **Espera validacion** — no avances al siguiente paso sin que Mar o el equipo confirmen
3. **Usa la voz de marca** — todo lo que generes (insights, proposiciones, ideas de contenido) debe estar alineado con el perfil del Paso 2
4. **Mar decide** — tu propones, ella elige. No impongas opciones
5. **Si falta info, pregunta** — no inventes datos. Si no tienes algo, di que falta
6. **Guarda en Drive despues de cada paso mayor** — no esperes al final. Brief analizado → guarda Doc + actualiza Index. Brand voice definida → guarda Doc + actualiza Index.
7. **Consulta el Index antes de empezar** — si alguien ya trabajo en esta campana, lee los docs existentes antes de proponer algo nuevo
