# TOOLS.md — Herramientas del Orquestador

## 1. sessions_spawn — Despachar trabajo a workers

Tu herramienta principal. Lanza un agente especializado en sesion aislada para tareas extensas. Es asincrono: el worker corre en background y retorna cuando termina.

**Agentes disponibles:**

| ID | Nombre | Cuando usarlo |
|----|--------|---------------|
| `research` | Research Agent | Investigacion de mercado, datos duros, social data, analisis competitivo |
| `creative` | Creative Strategist | Insight, concepto, metodologia, ideas de contenido |
| `influencer` | Influencer Analyst | Busqueda de perfiles, scoring, shortlists, background check |

**Reglas:**
- SIEMPRE incluye contexto del brief en la tarea — los workers NO tienen tu conversacion
- Puedes lanzar multiples workers en paralelo (Research + Influencer)
- Creative va DESPUES de Research (necesita datos)
- Informa al usuario que lanzaste y que esperar

Ver plantillas completas en AGENTS.md seccion 2.5.

---

## 2. sessions_send — Consultas puntuales entre agentes

Para preguntas rapidas que no necesitan una sesion completa. La respuesta es sincrona.

| ID | Nombre | Tipo de consulta |
|----|--------|-----------------|
| `pm` | PM | Estado de campana, cronograma, tareas asignadas, aprobaciones |
| `admin` | Admin | Contratos, pagos pendientes, facturacion |
| `research` | Research | Dato rapido que no amerita spawn completo |
| `creative` | Creative | Consulta sobre concepto o insight ya trabajado |
| `influencer` | Influencer | Estado de shortlist o consulta puntual sobre perfil |
| `prometeo` | Prometeo | Integraciones, herramientas, infraestructura |

Usa sessions_send SOLO para preguntas puntuales. Si la tarea es extensa, usa sessions_spawn.

---

## 3. Google Workspace (gog)

Acceso a Drive, Sheets y Docs de Mamba Negra. Cuenta: ia@mambanegramkt.com

### Drive — Buscar documentos

```bash
gog drive search "brief [marca]" --max 10
gog drive search "propuesta [categoria]" --max 10
```

### Sheets — Leer datos

```bash
gog sheets get <sheetId> "Tab!A1:D10" --json
```

### Docs — Leer/crear documentos

```bash
gog docs cat <docId>
```

### Sheets clave

| Sheet | ID | Uso |
|-------|-----|-----|
| Briefs (Google Form) | `1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw` | Briefs de campana. Tab: `Form Responses 1`, cols A-AC |
| Campaign Strategy Index | `1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c` | Estado de cada campana (A=Campana...L=Ultima Actualizacion) |
| Gantt MNL 2026 | `196SizGvDWc07zZAmN6_V6lcZ5voD5_v0bleGvQ2e-i0` | Timeline de campanas |

**Columnas del Brief (A-AC):**
A=Timestamp, D=Marca, E-J=Web/IG/TikTok, K=Categoria, L=Producto foco, M=Caracteristicas, N=Diferenciador, O=Ciudades, P=Edad, Q=Generos, R=NSE, S=Percepcion deseada, T=Experiencia influencer mkt, U=Mensaje, V=Tipo influencers, W=Plataformas, X=Formatos, Y=Objetivo, Z=Tono, AA=Emocion, AB=Restricciones, AC=Fecha lanzamiento.

**Leer ultimo brief:**
```bash
gog sheets get 1dvdlmMCJuNgHNtNQobkqA7O1M7tWJnQdM2mV_fJZ6Bw 'A:D' --json
```
Identifica la fila y luego lee completa: `'A<N>:AC<N>'`

**Actualizar Campaign Strategy Index:**
```bash
gog sheets update 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!E2:E2" --values-json '[["Done"]]' --input USER_ENTERED
```

### PDFs desde Drive

Los PDFs no se leen directo. Descarga primero:
```bash
mkdir -p /tmp/briefs
gog drive download <fileId> --output /tmp/briefs/nombre.pdf
pdf /tmp/briefs/nombre.pdf
```

Antes de descargar, verifica si ya existe en `/tmp/briefs/`.

---

## 4. Notion (mcporter)

Acceso al workspace de Notion de MNL. Uso principal: buscar y leer informacion estrategica.

### Bases de datos

| Nombre | ID | Campos |
|--------|-----|--------|
| Calendario | `31982aed-93c7-80a2-ad8b-000b5a3e9db8` | Nombre, Fecha, Etiquetas |
| MAMBA FRIENDS | `31982aed-93c7-80a3-b89d-000b2186b049` | Nombre, Estado, Etiquetas |

### Comandos

```bash
# Buscar paginas
mcporter call notion.API-post-search --args '{"query": "nombre"}'

# Leer pagina
mcporter call notion.API-get-block-children --args '{"block_id": "PAGE_ID"}'

# Consultar Calendario
mcporter call notion.API-query-data-source --args '{"data_source_id": "31982aed-93c7-80a2-ad8b-000b5a3e9db8"}'

# Filtrar Calendario por marca
mcporter call notion.API-query-data-source --args '{"data_source_id": "31982aed-93c7-80a2-ad8b-000b5a3e9db8", "filter": {"property": "Etiquetas", "multi_select": {"contains": "MARCA"}}}'

# Consultar MAMBA FRIENDS
mcporter call notion.API-query-data-source --args '{"data_source_id": "31982aed-93c7-80a3-b89d-000b2186b049"}'
```

NO inventes IDs de databases. Usa SOLO los listados arriba.

---

## 5. memory_search — Buscar en knowledge/

Los archivos `.md` de `knowledge/` (campaign-framework, mnl-bible, brand voices, campaign-samples-index) estan indexados en el sistema de memoria:

```bash
memory_search "flujo estrategico 12 pasos"
memory_search "metodologia RAYO ARCO PRISMA MAREA"
memory_search "brand voice [marca]"
memory_search "manual mamba negra scouting"
memory_search "campanas de ejemplo strategic thinking"
```

USA memory_search SIEMPRE antes de responder preguntas sobre metodologias, flujos, criterios o ejemplos de campanas.

---

## 6. Leer archivos locales (PDFs, DOCX, campanas de ejemplo)

Tienes archivos de campanas reales en `knowledge/campaign-samples/`. Estos NO se indexan en memory_search porque son PDF/DOCX, pero puedes leerlos directamente.

### PDFs locales
```bash
pdf knowledge/campaign-samples/brief-acetaminofen-mk-rd.pdf
```

### DOCX locales
```bash
read knowledge/campaign-samples/strategic-thinking-manimoto-chocolate.docx
read knowledge/campaign-samples/strategic-thinking-detodito-proteina.docx
```

### Archivos disponibles
Busca `memory_search "campaign samples index"` para ver el indice completo de archivos disponibles con descripcion.

### PDFs desde Google Drive
Los briefs y propuestas de clientes estan en Drive. Para leerlos:
```bash
# 1. Buscar el archivo
gog drive search "brief [marca]" --max 10

# 2. Verificar si ya lo tienes descargado
ls /tmp/briefs/

# 3. Descargar si no existe
mkdir -p /tmp/briefs
gog drive download <fileId> --output /tmp/briefs/nombre.pdf

# 4. Leer
pdf /tmp/briefs/nombre.pdf
```

**Reutiliza archivos descargados**: Verifica `/tmp/briefs/` antes de descargar de nuevo.
**PDFs por Telegram**: Si el equipo te comparte PDFs por chat, se guardan en `~/.openclaw/media/inbound/`. Leelos con `pdf <ruta>`.

**Carpeta de campanas en Drive**: `1YFzhxdq0cZ2b6nIOpLrrtY6rxONGK63Z`

---

**Version**: V6.0 — 03-Abr-2026
