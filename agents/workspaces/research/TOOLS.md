# TOOLS.md -- Herramientas de Radar (Research Agent)

## Tavily AI (MCP via mcporter)

Tu motor de investigacion web. Tiene 5 herramientas — elige la correcta segun la tarea.

### Cual herramienta usar

| Necesidad | Herramienta | Cuando |
|-----------|-------------|--------|
| Dato puntual, verificar algo, buscar rapido | `tavily_search` (basic) | "Cuanto vale el mercado de harinas en Colombia?" |
| Investigacion a fondo con multiples fuentes | `tavily_search` (advanced) + `include_raw_content: true` | "Tendencias FOOH en LATAM con ejemplos" |
| **Analisis profundo tipo Perplexity** | **`tavily_research`** | **"Analisis completo del mercado de influencer marketing para CPG en Colombia"** |
| Leer contenido completo de una URL | `tavily_extract` | Tienes el link y necesitas el texto |
| Analizar un sitio completo (competidor) | `tavily_crawl` | "Que contenido tiene el sitio de X competidor" |
| Mapear estructura de un sitio | `tavily_map` | "Que secciones tiene el sitio de X marca" |

### Comandos

**Busqueda basica** (1 credito):
```bash
mcporter call tavily.tavily_search --args '{"query": "tu busqueda aqui", "search_depth": "basic", "max_results": 5}'
```

**Busqueda avanzada con contenido completo** (2 creditos — USAR CUANDO NECESITES PROFUNDIDAD):
```bash
mcporter call tavily.tavily_search --args '{"query": "tu busqueda aqui", "search_depth": "advanced", "max_results": 10, "include_raw_content": true, "country": "Colombia"}'
```

**Investigacion profunda (MODO PERPLEXITY)** — tu arma mas poderosa:
```bash
mcporter call tavily.tavily_research --args '{"input": "Descripcion detallada de lo que necesitas investigar. Incluye contexto, angulos especificos, y que tipo de fuentes buscas.", "model": "pro"}'
```
Usa `"model": "pro"` para investigaciones amplias (multiples subtemas). Usa `"mini"` para temas acotados.
**IMPORTANTE**: Este tool hace lo que hace Perplexity Pro — busca en multiples fuentes, sintetiza y entrega un reporte completo. Usalo para investigaciones serias, no para datos puntuales.

**Extraer contenido de pagina** (1 credito por 5 URLs):
```bash
mcporter call tavily.tavily_extract --args '{"urls": ["https://url-del-articulo.com"], "include_images": false, "format": "markdown"}'
```

**Crawlear sitio de competidor**:
```bash
mcporter call tavily.tavily_crawl --args '{"url": "https://sitio-competidor.com", "max_depth": 2, "limit": 20, "instructions": "Busca paginas sobre estrategia de influencers y campanas recientes"}'
```

**Mapear estructura de sitio**:
```bash
mcporter call tavily.tavily_map --args '{"url": "https://sitio-marca.com", "max_depth": 2, "limit": 30}'
```

### Estrategia de investigacion (como un senior researcher)

Para una investigacion completa, sigue este orden:

1. **Primero `tavily_research`** con `"model": "pro"` — esto te da el panorama general y fuentes clave
2. **Luego `tavily_search`** con `"advanced"` + `"include_raw_content": true` para profundizar en angulos especificos que surgieron
3. **Despues `tavily_extract`** para leer completos los articulos/reportes mas relevantes
4. **Opcional `tavily_crawl`** si necesitas analizar el sitio de un competidor

NO hagas 10 busquedas basicas cuando un `tavily_research` con model "pro" te da mejor resultado en una sola llamada.

### Cuando usar cada nivel

- **Dato puntual** ("cuanto cuesta X", "quien es el lider en Y") → `tavily_search` basic
- **Investigacion de categoria/mercado** → `tavily_research` pro
- **Analisis de competidor** → `tavily_crawl` + `tavily_search` advanced
- **Validar tendencia o formato** → `tavily_search` advanced con `include_raw_content: true`
- **Contexto cultural/social** → `tavily_research` pro con instrucciones especificas

### Cuando NO usar

- Buscar influencers especificos (Modash, territorio de Scout)
- Datos internos de MNL (eso esta en Drive)
- Preguntas que puedes responder con tu conocimiento base

### Conservar creditos

- `tavily_search` basic = 1 credito, advanced = 2 creditos
- `tavily_research` = mas creditos pero vale la pena para investigaciones serias
- `include_raw_content: true` no cuesta extra pero da MUCHO mejor contexto — usalo siempre en busquedas avanzadas
- 1,000 creditos/mes — prioriza `tavily_research` sobre multiples busquedas sueltas

---

## Google Workspace (gog)

Acceso a Drive, Sheets y Docs de Mamba Negra.

- **Cuenta**: ia@mambanegramkt.com
- **Servicios**: drive, sheets, docs

### Drive -- buscar campanas pasadas, reportes, referencias

```bash
gog drive search "propuesta belleza" --max 10
gog drive search "analisis competencia farmaceutico" --max 10
```

### Sheets -- leer datos

```bash
gog sheets get <sheetId> "Tab!A1:D10" --json
```

### Docs -- leer documentos

```bash
gog docs cat <docId>
```

### PDFs desde Drive

Los PDFs requieren descarga primero:

```bash
# 1. Buscar
gog drive search "reporte mercado belleza" --max 5

# 2. Verificar si ya esta descargado
ls /tmp/research/

# 3. Descargar si NO existe
mkdir -p /tmp/research
gog drive download <fileId> --output /tmp/research/reporte-belleza.pdf

# 4. Leer
pdf /tmp/research/reporte-belleza.pdf
```

NO pases un ID de Drive directo a `pdf`. Siempre descarga primero con `gog drive download`.

Reutiliza archivos descargados -- verifica si ya existe en `/tmp/research/` antes de descargar.

Si el equipo comparte PDFs por Telegram, estan en `~/.openclaw/media/inbound/` y se leen directo con `pdf <ruta>`.

### Cuando usar Drive

- Campanas pasadas para referencias
- Reportes y datos de investigacion guardados
- Documentos de mercado y categoria

### Cuando usar Sheets

- Datos de investigacion de mercado o audiencia
- Metricas de campanas pasadas

---

## Comunicacion entre agentes (sessions_send)

Consultas puntuales a otros agentes:

- **Creative** (`creative`) -- contexto del concepto creativo o insight para enfocar investigacion
- **Influencer** (`influencer`) -- datos de perfiles o metricas para complementar analisis competitivo

Solo para preguntas puntuales. Si requiere conversacion extendida, deriva al usuario al bot.

---

## Errores comunes

- **NO** inventes IDs de archivos o sheets. Busca primero con `gog drive search`.
- **NO** uses JSON malformado en mcporter. Copia los ejemplos y cambia solo valores.
- **NO** busques influencers con Tavily -- territorio de Scout.
- **NO** asumas que un documento existe. Si no lo encuentras, dilo.
