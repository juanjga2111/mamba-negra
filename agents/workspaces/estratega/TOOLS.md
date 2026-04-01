# TOOLS.md — Herramientas del Estratega

## Google Workspace (gog)

Tienes acceso a Drive, Sheets y Docs de Mamba Negra via la herramienta `gog`.

- **Cuenta**: ia@mambanegramkt.com
- **Servicios**: drive, sheets, docs

### Comandos frecuentes

**Drive** — buscar archivos (briefs, propuestas, strategic thinkings):
```bash
gog drive search "brief pepsi" --max 10
```

**Drive** — buscar campanas pasadas para referencias:
```bash
gog drive search "propuesta belleza" --max 10
```

**Sheets** — leer datos de un sheet:
```bash
gog sheets get <sheetId> "Tab!A1:D10" --json
```

**Docs** — leer un documento:
```bash
gog docs cat <docId>
```

### Briefs de Clientes (Google Form → Sheet)

Los briefs de campana llegan por un Google Form y se guardan automaticamente en esta Sheet:

- **Sheet ID**: `1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw`
- **Tab**: `Form Responses 1` (no necesitas especificarlo, el rango sin tab funciona)
- **Columnas**: A-AC (29 columnas)

**Mapeo de columnas clave para estrategia:**

| Col | Campo |
|-----|-------|
| A | Timestamp |
| D | Nombre de Marca/Empresa |
| E | Tiene web? |
| F | URL Web |
| G | Tiene Instagram? |
| H | URL Instagram |
| I | Tiene TikTok? |
| J | URL TikTok |
| K | Categoria producto/servicio |
| L | Producto/servicio foco de campana |
| M | Caracteristicas y beneficios |
| N | Diferenciador vs competencia |
| O | Ciudades |
| P | Rango de edad |
| Q | Generos |
| R | Nivel socioeconomico |
| S | Percepcion de marca deseada |
| T | Experiencia con influencer marketing |
| U | Mensaje de la campana |
| V | Tipo de influencers (Nano/Micro/Macro/Mega) |
| W | Plataformas (IG/TikTok/etc) |
| X | Formatos de contenido |
| Y | Objetivo de campana |
| Z | Tono de comunicacion |
| AA | Emocion/accion a generar |
| AB | Restricciones (Do's and Don'ts) |
| AC | Fecha de lanzamiento |

**Leer headers (para confirmar estructura):**
```bash
gog sheets get 1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw 'A1:AC1' --json
```

**Leer el ultimo brief (reemplaza N con el numero de fila):**
```bash
gog sheets get 1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw 'A<N>:AC<N>' --json
```

**Leer todos los briefs (para saber cuantos hay y elegir uno):**
```bash
gog sheets get 1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw 'A:D' --json
```
Esto retorna solo Timestamp + Email + Marca de cada brief, para que identifiques cual leer completo sin gastar tokens leyendo todo.

### Campaign Strategy Index (Sheet maestro)

Trackea el estado estrategico de cada campana. **Consulta SIEMPRE antes de empezar trabajo en una campana** para saber que ya se hizo.

- **Sheet ID**: `1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c`
- **Carpeta Campanas (Drive)**: `1YFzhxdq0cZ2b6nIOpLrrtY6rxONGK63Z`
- **Columnas**: A=Campana, B=Marca, C=Folder ID, D=Estado General, E=Brief, F=Brand Voice, G=Metodologia, H=Strategic Thinking, I=Criterios Scouting, J=Shortlist, K=Propuesta, L=Ultima Actualizacion

**Leer estado de todas las campanas:**
```bash
gog sheets get 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!A:L" --json
```

**Actualizar un paso (ejemplo: Brief completado, fila 2):**
```bash
gog sheets update 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!E2:E2" --values-json '[["Done"]]' --input USER_ENTERED
```

### Cuando usar Drive

- Buscar briefs de clientes o documentos de campana
- Encontrar propuestas estrategicas y pensamiento estrategico de campanas pasadas
- Acceder a referencias creativas y ejemplos para campanas similares
- Revisar presentaciones y materiales de marca
- **Guardar docs de campana** (Brief Analysis, Brand Voice, Strategic Thinking) en la carpeta de la campana

### Cuando usar Sheets

- **Campaign Strategy Index**: estado de cada campana y que pasos se han completado
- Consultar datos de investigacion de mercado o audiencia
- Revisar metricas de campanas pasadas para informar estrategia

### Cuando usar Docs

- Leer briefs completos de cliente
- Consultar documentos de pensamiento estrategico
- Revisar guias internas o procesos documentados

---

## Notion (MCP via mcporter)

Tienes acceso al workspace de Notion de Mamba Negra Latam. Tu uso principal es **buscar y leer** informacion estrategica: briefs, documentos de campana, calendario, contactos de influencers.

### IMPORTANTE — Sintaxis de mcporter

Todos los comandos Notion se ejecutan con `mcporter call notion.<tool>`. Los argumentos se pasan con `--args` y un JSON string. **NO inventes parametros** — usa exactamente los ejemplos de abajo.

### Bases de datos disponibles (IDs verificados)

| Nombre | Database ID | Campos |
|--------|-------------|--------|
| Calendario | `31982aed-93c7-80a2-ad8b-000b5a3e9db8` | Nombre (title), Fecha (date), Etiquetas (multi_select) |
| MAMBA FRIENDS | `31982aed-93c7-80a3-b89d-000b2186b049` | Nombre (title), Estado (status), Etiquetas (multi_select) |

#### Pagina raiz

- **Mamba Negra Latam**: `31982aed-93c7-8008-82a9-dab06e04aae3`

### Comandos de mcporter para Notion — COPIAR EXACTO

**Buscar paginas y databases (briefs, propuestas, documentos de campana):**
```bash
mcporter call notion.API-post-search --args '{"query": "nombre a buscar"}'
```

**Leer contenido de una pagina (brief, propuesta, documento estrategico):**
```bash
mcporter call notion.API-get-block-children --args '{"block_id": "PAGE_ID_AQUI"}'
```

**Leer propiedades de una pagina:**
```bash
mcporter call notion.API-retrieve-a-page --args '{"page_id": "PAGE_ID_AQUI"}'
```

**Consultar el Calendario (fechas de campana, hitos, deadlines):**
```bash
mcporter call notion.API-query-data-source --args '{"data_source_id": "31982aed-93c7-80a2-ad8b-000b5a3e9db8"}'
```

**Consultar Calendario filtrado por etiqueta (ejemplo: eventos de una marca):**
```bash
mcporter call notion.API-query-data-source --args '{"data_source_id": "31982aed-93c7-80a2-ad8b-000b5a3e9db8", "filter": {"property": "Etiquetas", "multi_select": {"contains": "MARCA"}}}'
```

**Consultar MAMBA FRIENDS (base de influencers y contactos):**
```bash
mcporter call notion.API-query-data-source --args '{"data_source_id": "31982aed-93c7-80a3-b89d-000b2186b049"}'
```

**Consultar MAMBA FRIENDS filtrado por estado:**
```bash
mcporter call notion.API-query-data-source --args '{"data_source_id": "31982aed-93c7-80a3-b89d-000b2186b049", "filter": {"property": "Estado", "status": {"equals": "Activo"}}}'
```

**Consultar MAMBA FRIENDS filtrado por etiqueta (ejemplo: influencers de una categoria):**
```bash
mcporter call notion.API-query-data-source --args '{"data_source_id": "31982aed-93c7-80a3-b89d-000b2186b049", "filter": {"property": "Etiquetas", "multi_select": {"contains": "belleza"}}}'
```

### Cuando buscar en Notion

- **Briefs de cliente**: Buscar por nombre de marca o campana con `API-post-search`
- **Documentos estrategicos**: Propuestas, pensamiento estrategico, conceptos creativos
- **Calendario**: Verificar fechas de campana, deadlines, hitos programados
- **MAMBA FRIENDS**: Consultar influencers con los que la agencia tiene relacion previa
- **Campanas pasadas**: Buscar referencias de campanas anteriores para informar estrategia nueva

### Cuando NO buscar en Notion

- **Tareas de ejecucion por CM** (tableros TRAFICO/SOLICITUD): Eso es territorio del PM. Si necesitas saber el estado operativo de una campana, consulta al PM via `sessions_send`
- **Datos de contratos o pagos**: Consulta al Admin
- **Metricas de influencers en tiempo real**: Eso se verifica en Modash, no en Notion

### Patron de busqueda para estrategia

Cuando te pidan contexto de una campana o cliente, sigue este orden:

1. **Buscar el brief**: `API-post-search` con nombre de marca o campana
2. **Leer el contenido**: `API-get-block-children` con el page_id encontrado
3. **Verificar calendario**: `API-query-data-source` del Calendario filtrando por marca
4. **Revisar influencers previos**: `API-query-data-source` de MAMBA FRIENDS si necesitas historial

---

## Comunicacion entre agentes (sessions_send)

Puedes consultar a otros agentes con `sessions_send`:

- **PM** — estado operativo de una campana, cronograma, quien tiene asignada una tarea, status de contenidos, aprobaciones pendientes
- **Admin** — estado de contratos, pagos pendientes, montos facturados

Usa `sessions_send` solo para preguntas puntuales. Si la consulta requiere conversacion extendida, deriva al usuario al bot correspondiente.

---

## Errores comunes — NO hacer

- **NO** inventes IDs de databases. Usa SOLO los IDs listados arriba.
- **NO** pases parametros como `Notion-Version` o headers manuales — mcporter los maneja.
- **NO** uses JSON malformado. Copia los ejemplos de arriba y cambia solo los valores.
- **NO** intentes crear o editar tareas en tableros de TRAFICO/SOLICITUD — eso es responsabilidad del PM.
- **NO** asumas que un documento existe sin buscarlo primero. Si no lo encuentras con `API-post-search`, dilo.
- Si un query retorna error 400, revisa que el JSON sea valido y los nombres de propiedades sean exactos (case-sensitive).

---

## Tavily AI Search (MCP via mcporter)

Tienes acceso a busqueda web en tiempo real via Tavily. Usa esto para investigar competencia, tendencias, contexto de mercado, y complementar la investigacion de Mar.

### Comandos de mcporter para Tavily

**Busqueda web** (1 credito por busqueda, 1000 gratis/mes):
```bash
mcporter call tavily.tavily-search --args '{"query": "tu busqueda aqui", "search_depth": "basic", "max_results": 5}'
```

**Busqueda avanzada** (2 creditos, mas profunda):
```bash
mcporter call tavily.tavily-search --args '{"query": "tu busqueda aqui", "search_depth": "advanced", "max_results": 10}'
```

**Extraer contenido de una pagina** (1 credito por 5 URLs):
```bash
mcporter call tavily.tavily-extract --args '{"urls": ["https://url-del-articulo.com"]}'
```

### Cuando usar Tavily

- Investigar competidores de un cliente (campanas, posicionamiento, estrategia de influencers)
- Buscar tendencias de una categoria o vertical en Colombia/Latam
- Contexto de mercado para enriquecer un brief o propuesta
- Verificar datos o claims que te compartan
- Complementar la investigacion de Mar (no reemplazar Perplexity — es un complemento)

### Cuando NO usar Tavily

- Para buscar influencers (eso es Modash, cuando este activo)
- Para datos internos de MNL (eso esta en Drive o Notion)
- Para preguntas que puedes responder con tu conocimiento base

### Conservar creditos
- Usa `search_depth: "basic"` por defecto (1 credito)
- Solo usa `"advanced"` si basic no da resultados suficientes
- `max_results: 5` es suficiente para la mayoria de busquedas
- 1,000 creditos/mes gratis — no desperdicies en busquedas triviales

---

## NOTAS

- **Version**: V2 — Actualizado 30-Mar-2026 (Tavily AI Search agregado)
- **Herramientas disponibles**: Google Workspace (gog), Notion (mcporter), Tavily Search (mcporter), sessions_send
- **Skills**: brief-to-strategy, competitor-analysis
