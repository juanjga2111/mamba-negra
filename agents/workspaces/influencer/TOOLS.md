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

**Creditos actuales (20-Abr-2026)**: 94 Analytical Reports/mes en el pool. Cache local automatico — perfiles ya analizados se releen sin costo.

**Discovery API ACTIVO**: 1000 queries/mes. Cada pagina = 1 decrement = 20 resultados.

### Buscar influencer por nombre (GRATIS — sin limite)

```bash
hypeauditor search "pautips"
hypeauditor search "belleza colombia"
```

Retorna perfiles cross-platform (IG + TikTok + YT) con seguidores y ER. Usa esto para encontrar el username exacto antes de pedir un report.

### Report completo (con cache automatico)

Cada `report` exitoso se guarda en `~/.openclaw/hypeauditor-cache/`. Las relecturas del mismo perfil en < 30 dias leen del cache (0 creditos, instantaneo).

```bash
# Primera vez (1 credito) — guarda cache
hypeauditor report pautips --raw

# Consultas posteriores (0 creditos) — lee cache
hypeauditor report pautips --raw --cached

# Forzar llamada nueva a API (1 credito, actualiza cache)
hypeauditor report pautips --raw --force

# TikTok
hypeauditor report pautips --platform tiktok --raw
```

SIEMPRE usa `--raw` para obtener el JSON completo. El report `--raw` retorna:
- **Brand Safety**: 9 categorias (alcohol, politica, sexo, toxico, ofensivo, crimen, religion, pranks, sentiment negativo)
- **Demographics**: % hombres/mujeres, edad por genero, ubicacion de audiencia
- **Audience Quality (AQS + type)**: % real vs suspicious vs mass followers
- **Sentiment**: % positivo/neutral/negativo en comentarios
- **Pricing**: rango estimado por post y stories, CPM
- **ER con contexto**: comparado con cuentas de tamano similar + historico
- **Rankings**: mundial, por pais, por categoria (blogger_rankings)
- **Categorias recomendadas** (blogger_categories + top3_blogger_topics)
- **Audience extras**: etnicidad, ingresos, educacion, estado civil
- **Advertising data**: brand mentions con conteo y categoria
- **Contacto**: email/telefono si disponible

### My Network — perfiles ya desbloqueados (GRATIS)

Lista todos los perfiles que ya se analizaron, sin costo. Util para auditar el inventario y re-contextualizar sin gastar creditos.

```bash
# Ultimos 100 perfiles unlocked
hypeauditor network --limit 100

# Filtrar por fecha de unlock
hypeauditor network --since 2026-04-01 --until 2026-04-30

# JSON crudo (incluye emails, phones, contract_status, etc)
hypeauditor network --raw
```

Retorna por creator: username, nombre, seguidores, pais, network_status (Prospect/Verified), payment_status, contract_status, fecha de unlock. **No incluye ER ni demografia** — para eso usa `report --cached`.

### PDF oficial de HypeAuditor (0 creditos si unlocked)

Genera el PDF branded de HA con todo el analisis visual. Ideal para enviar al cliente como primera aprobacion.

```bash
hypeauditor pdf margaritagomezderm --platform ig
hypeauditor pdf westcol --platform tiktok
```

Async — el CLI reintenta hasta que el PDF este listo (hasta 8 veces, 1-2 min tipico). Retorna URL del CDN de HA. **Gratis si el perfil ya esta unlocked. Si esta locked, lo unlocka y cuenta 1 credito del pool.**

### Media de perfil ya reportado (0 creditos)

Posts/reels cacheados al momento del report original.

```bash
hypeauditor media pautips
hypeauditor media pautips --limit 0           # todos
hypeauditor media pautips --raw               # JSON completo
```

Limitacion: solo posts del snapshot del report (~5-10 posts). Para analisis de video actual usar `reel-analyzer`.

### Cache management

```bash
hypeauditor cache stats                        # resumen
hypeauditor cache prune --days 90              # borra > 90 dias
hypeauditor cache clear <username> --platform  # borra 1 perfil
```

Cache umbral de aviso: 500 MB. Cache vive en `~/.openclaw/hypeauditor-cache/`.

### Cuando usar cada comando

| Situacion | Comando | Costo |
|-----------|---------|-------|
| Buscar perfiles por nombre/nicho | `search` | Gratis |
| Ver todo lo que ya se desbloqueo | `network` | Gratis |
| Analisis profundo PRIMERA vez | `report --raw` | 1 credito |
| Releer analisis ya cacheado | `report --raw --cached` | 0 creditos |
| Refrescar datos (actualizar cache) | `report --raw --force` | 1 credito |
| Posts/reels | `media` | 0 (si unlocked) |
| PDF para enviar al cliente | `pdf` | 0 (si unlocked) |
| Filtrar universo por metricas | `discover` | 1 query/pagina |

### Flujo recomendado

1. Entender estrategia y criterios cualitativos
2. `search` o `discover` para encontrar candidatos
3. Revisar contenido publico (cualitativo con reel-analyzer)
4. `report --raw` en finalistas (1 credito c/u, cache automatico 30d)
5. Para consultas del mismo perfil en los siguientes 30 dias: `--cached`
6. Para entregar al cliente: `pdf` (0 creditos si ya unlocked)

### NO hagas

- **NO** gastes `report` en perfiles no evaluados cualitativamente primero
- **NO** uses `report --force` sin razon — cada uso = 1 credito, el cache ya tiene data fresca por 30d
- **NO** uses `report` sin `--raw` — siempre pide datos completos
- **NO** consultes el pool via llamadas innecesarias — `report --cached` y `network` son gratis

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
