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

**Importante**: Los creditos son MUY limitados (~4 restantes). Usa `search` (gratis) para encontrar perfiles, y `report` SOLO en perfiles finalistas que ya evaluaste cualitativamente.

**NOTA (Abril 2026)**: El Discovery API (`hypeauditor discover`) NO esta disponible en el plan actual (trial). Cuando se active el plan pagado, se habilitara. Por ahora usa `search` + `report`.

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

### Cuando usar cada comando

| Situacion | Comando | Costo |
|-----------|---------|-------|
| Buscar perfiles por nombre/nicho | `search` | Gratis |
| Analisis profundo de finalista | `report --raw` | 1 credito |
| Filtrar universo por metricas | `discover` | NO DISPONIBLE (plan trial) |

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
