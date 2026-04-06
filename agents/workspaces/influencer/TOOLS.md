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

## Nota: API de Influencers (pendiente)

Cuando se integre API (Influencers Club o HypeAuditor), se agregara para busqueda automatizada, metricas verificadas y deteccion de audiencia falsa.

Por ahora, metricas se obtienen del equipo o herramientas externas. Tu valor: **criterio de evaluacion y copy comercial**, no extraccion de datos.

---

## Errores comunes

- **NO** inventes metricas que no tienes verificadas
- **NO** hagas background check sin Tavily -- no te bases solo en tu conocimiento
- **NO** evalues perfiles sin la estrategia clara primero
- **NO** uses Tavily para investigacion de mercado -- territorio de Research
- **NO** inventes IDs de documentos. Si no encuentras algo, dilo
