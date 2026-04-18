# TOOLS.md -- Herramientas de Scout (Influencer Analyst)

## Tavily AI Search (MCP via mcporter)

Busqueda web en tiempo real. Tu uso principal: **background check** de influencers -- polemicas, competencia reciente, percepcion publica, controversias.

### Comandos

**Busqueda web** (1 credito, 1000 gratis/mes):
```bash
mcporter call tavily.tavily-search --args '{"query": "tu busqueda aqui", "search_depth": "basic", "max_results": 5}'
```

**Busqueda avanzada** (2 creditos):
```bash
mcporter call tavily.tavily-search --args '{"query": "tu busqueda aqui", "search_depth": "advanced", "max_results": 10}'
```

**Extraer contenido** (1 credito por 5 URLs):
```bash
mcporter call tavily.tavily-extract --args '{"urls": ["https://url-del-articulo.com"]}'
```

### Patrones de busqueda para background check

```bash
# Polemicas o controversias
mcporter call tavily.tavily-search --args '{"query": "@handle influencer polemica controversia escandalo", "search_depth": "basic", "max_results": 5}'

# Colaboraciones con competencia
mcporter call tavily.tavily-search --args '{"query": "@handle colaboracion [marca competidora]", "search_depth": "basic", "max_results": 5}'

# Percepcion general
mcporter call tavily.tavily-search --args '{"query": "@handle influencer Colombia resenas opinion", "search_depth": "basic", "max_results": 5}'
```

### Cuando usar Tavily

- Background check: polemicas, escandalos, controversias
- Competencia: colaboraciones recientes con competidores del cliente
- Percepcion publica: como percibe la audiencia al influencer
- Contexto de categoria: benchmarks de ER y tarifas en vertical

### Cuando NO usar

- Buscar metricas de influencers (Modash/Influencers Club)
- Datos internos de MNL (Drive)
- Investigacion de mercado profunda (Research -- @RadarMambaBot)

### Conservar creditos

- `search_depth: "basic"` por defecto
- Solo `"advanced"` si basic no da resultados
- `max_results: 5` suficiente para la mayoria
- 1,000 creditos/mes

---

## Google Workspace (gog)

Acceso a Drive, Sheets y Docs de Mamba Negra.

- **Cuenta**: ia@mambanegramkt.com
- **Servicios**: drive, sheets, docs

### Drive -- briefs, estrategias, shortlists pasadas

```bash
gog drive search "brief [marca]" --max 10
gog drive search "shortlist [marca]" --max 10
gog drive search "estrategia [campana]" --max 10
```

### Sheets -- datos de campana

```bash
gog sheets get <sheetId> "Tab!A1:D10" --json
```

### Docs -- leer documentos

```bash
gog docs cat <docId>
```

### PDFs desde Drive

```bash
# 1. Buscar
gog drive search "Brief [marca]" --max 5

# 2. Verificar si ya esta descargado
ls /tmp/briefs/

# 3. Descargar si NO existe
mkdir -p /tmp/briefs
gog drive download <fileId> --output /tmp/briefs/brief-[marca].pdf

# 4. Leer
pdf /tmp/briefs/brief-[marca].pdf
```

NO pases un ID de Drive directo a `pdf`. Siempre descarga primero.

Si el equipo comparte PDFs por Telegram, estan en `~/.openclaw/media/inbound/`.

### Cuando usar Drive/Sheets

- Briefs para entender estrategia antes de evaluar perfiles
- Shortlists de campanas pasadas para referencia
- Documentos de estrategia (insight, concepto, criterios)
- Datos de campana en Sheets

---

## Comunicacion entre agentes (sessions_send)

Consultas puntuales:

- **Research** (`research`) -- Datos de mercado, contexto de categoria, tendencias. Ej: "ER promedio en belleza Colombia?" o "Que marcas de skincare estan activas en influencer marketing?"
- **Creative** (`creative`) -- Concepto creativo, insight, ideas de contenido para evaluar fit. Ej: "Cual es el insight de la campana de [marca]?" o "Que tipo de contenido se plantea para fase 1?"

Solo para preguntas puntuales. Si requiere trabajo extenso, deriva al usuario.

---

## HypeAuditor API (CLI)

Acceso a datos verificados de influencers: metricas, demographics, brand safety, audiencia, sentiment, pricing.

**Importante**: Creditos actuales **97 Analytical Reports** (verificado 17-Abr-2026). Usa `search` (gratis) para encontrar perfiles, y `report` SOLO en perfiles finalistas que ya evaluaste cualitativamente.

**NOTA (17-Abr-2026)**: Discovery API **ACTIVO**. El campo `queries_left` arranco en 1000 (factura promete Daily/Monthly limit 5000 — discrepancia pendiente de aclarar con Paula). Cada pagina = 1 decrement = 20 resultados. Usa con moderacion hasta resolver cuota real. Mantiene `search` como baseline gratis para busqueda por nombre.

### Buscar influencer por nombre (GRATIS — sin limite)

```bash
hypeauditor search "pautips"
hypeauditor search "luisitocomunica"
hypeauditor search "belleza colombia"
```

Retorna perfiles cross-platform (IG + TikTok + YT) con seguidores y ER. Usa esto para:
- Encontrar el username exacto antes de pedir un report
- Explorar perfiles relacionados a un nombre o nicho
- Verificar en que plataformas esta un influencer

### Report completo (1 CREDITO por perfil — usar solo en finalistas)

SIEMPRE usa `--raw` para obtener todos los datos en una sola llamada. El report cuesta 1 credito igual — no tiene sentido pedir el resumen primero y luego el raw (serian 2 creditos por el mismo perfil).

```bash
# Instagram (default) — SIEMPRE con --raw
hypeauditor report pautips --raw

# TikTok
hypeauditor report pautips --platform tiktok --raw
```

El report `--raw` retorna TODO en JSON:
- **Brand Safety**: 9 categorias (alcohol, politica, sexo, toxico, ofensivo, crimen, religion, pranks, sentiment negativo)
- **Demographics**: % hombres/mujeres, edad por genero, ubicacion de audiencia (pais + ciudad)
- **Audience Quality**: % audiencia real vs suspicious vs mass followers
- **Sentiment**: % positivo/neutral/negativo en comentarios
- **Pricing**: rango estimado por post y stories, CPM
- **ER con contexto**: comparado con cuentas de tamano similar + ER historico por periodo
- **Rankings**: mundial, por pais, por categoria
- **Growth anomalies**: alertas de crecimiento sospechoso
- **Audience extras**: etnicidad, ingresos, educacion, estado civil
- **Advertising data**: brand mentions con conteo y categoria
- **Hashtag performance**: por periodo 30d/90d/180d
- **Contacto**: email/telefono si disponible

### Media de perfil ya reportado (0 creditos adicionales)

Si ya corriste `report` en un perfil, podes pedir sus posts/reels cacheados sin costo extra:

```bash
# Default: top 10 mas recientes con likes/comments/views/ER
hypeauditor media pautips

# Todos los posts cacheados
hypeauditor media pautips --limit 0

# JSON completo (incluye preview_url, media_ids con performance 30d/90d/180d)
hypeauditor media pautips --raw
```

Retorna por post: fecha, tipo (reel/post/carousel/igtv), shortcode, likes_count, comments_count, video_views_count, er, er_mark (excellent/average/poor/low), caption truncado.

Limitacion: solo los posts que HA cacheo al generar el report original (~5-10 posts cubriendo varios meses), no feed completo. Para analisis de video actual usar `reel-analyzer`.

Util para: validar tarifas contra ER reciente, detectar caida de rendimiento, identificar tipo dominante, ver captions reales para brand fit.

### Cuando usar cada comando

| Situacion | Comando | Costo |
|-----------|---------|-------|
| Buscar perfiles por nombre/nicho | `search` | Gratis |
| Analisis profundo de finalista | `report --raw` | 1 credito |
| Posts/reels cacheados de perfil ya reportado | `media` | 0 (si unlocked) |
| Filtrar universo por metricas | `discover` | 1 query/pagina (1000/mes) |

### Flujo recomendado (mientras no haya Discovery API)

1. Entender estrategia y criterios cualitativos PRIMERO
2. El equipo propone perfiles, o usa `search` para explorar por nombre/nicho
3. Revisar contenido publico de candidatos (cualitativo, manual)
4. `report --raw` SOLO en los 2-3 finalistas que ya pasaron filtro cualitativo
5. Tavily para background check de los finalistas
6. Copy comercial con datos reales del report

### NO hagas

- **NO** gastes `report` en perfiles que no has evaluado cualitativamente primero
- **NO** uses `report` para explorar — usa `search` (gratis) primero
- **NO** gastes mas de 1-2 reports sin consultar con el equipo (creditos limitados ~4)
- **NO** uses `report` sin `--raw` — siempre pide los datos completos en una sola llamada
- **NO** intentes usar `discover` — da error en el plan actual

---

## Reel Analyzer (CLI)

Descarga y analiza reels de Instagram/TikTok con Gemini Video. Genera un **Content Fingerprint** -- perfil cualitativo del creador basado en analisis real de su contenido.

**Cuando usar:** Evaluacion cualitativa profunda de un influencer. Complementa las metricas cuantitativas de HypeAuditor con analisis real del contenido.

### Descargar reels

```bash
# TikTok (no necesita login)
reel-analyzer download @handle --platform tiktok --count 10

# Instagram (requiere cookies -- preguntar a Juanjo si no estan configuradas)
reel-analyzer download @handle --platform instagram --count 10

# URL directa
reel-analyzer download "https://www.tiktok.com/@handle" --count 5
```

### Analizar reels descargados

```bash
# Analisis basico
reel-analyzer analyze /tmp/reels/handle/

# Con brief de campana (evalua alineacion con la campana)
reel-analyzer analyze /tmp/reels/handle/ --brief "campana de skincare para mujeres 25-35, awareness, tono autentico"

# Con modelo especifico (default: gemini-2.5-flash)
reel-analyzer analyze /tmp/reels/handle/ --model gemini-2.5-pro
```

### Download + Analyze en un paso

```bash
# Flujo completo: descarga 10 reels y los analiza
reel-analyzer full @handle --platform tiktok --count 10 --brief "campana skincare awareness"
```

### Que retorna

**Content Fingerprint** (agregado de todos los reels):
- Scores 1-10: hook, edicion, autenticidad, calidad visual, CTA
- Score overall promedio
- Estilo dominante: energia, audio, categoria de contenido
- Top 3 reels destacados
- Alineacion con brief (si se proporciono)

**Analisis individual** por reel:
- Hook: score + tecnica usada
- Edicion: score + estilo
- Autenticidad, product placement, CTA, energia
- Categoria de contenido, tipo de audio
- Resumen en 1 oracion

### Flujo recomendado de scouting con Reel Analyzer

1. HypeAuditor `search` para encontrar candidatos (gratis)
2. `reel-analyzer full @candidato --platform tiktok --count 10 --brief "..."` para los top 5-8 candidatos
3. HypeAuditor `report --raw` SOLO para los 2-3 que pasen el filtro cualitativo
4. Tavily para background check
5. Copy comercial con datos cuantitativos (HypeAuditor) + cualitativos (Reel Analyzer)

### Limitaciones

- **Instagram**: Requiere archivo de cookies (`~/.openclaw/instagram_cookies.txt`). Las cookies expiran cada 30-90 dias. Si falla, pedir a Juanjo que las renueve.
- **TikTok**: Funciona sin login para perfiles publicos. Mas confiable que Instagram.
- **Tiempo**: Cada reel toma ~15-30 segundos de analisis (upload + procesamiento Gemini). 10 reels ≈ 3-5 minutos.
- **Costo**: Usa Gemini API. ~$0.01-0.05 por reel con gemini-2.5-flash.

### Cuando NO usar

- Para metricas cuantitativas (engagement, demographics) -- usa HypeAuditor
- Para background check -- usa Tavily
- Para mas de 20 reels por perfil -- el analisis se vuelve lento. 10 reels es suficiente para un fingerprint solido.

---

## Errores comunes

- **NO** inventes metricas que no tienes verificadas
- **NO** hagas background check sin Tavily -- no te bases solo en tu conocimiento
- **NO** evalues perfiles sin la estrategia clara primero
- **NO** uses Tavily para investigacion de mercado -- territorio de Research
- **NO** inventes IDs de documentos. Si no encuentras algo, dilo

---

## Directorio del Equipo MNL (Telegram)

Usa estos IDs para enviar mensajes directos cuando necesites contactar a alguien del equipo.

| Nombre | Rol | Telegram User ID |
|--------|-----|-------------------|
| Juan José | AI Strategy Lead | 6107170400 |
| Juan Guillermo (Juangui) | Community Manager | 8028819934 |
| Maca | Diseño | 8675003670 |
| Mar (Mariana) | Estratega Senior | 8086667993 |
