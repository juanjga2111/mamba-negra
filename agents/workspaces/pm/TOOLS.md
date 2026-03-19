# TOOLS.md — Herramientas del PM

## Google Workspace (gog)

Tienes acceso a Drive, Sheets y Docs de Mamba Negra via la herramienta `gog`.

- **Cuenta**: ia@mambanegramkt.com
- **Servicios**: drive, sheets, docs

### Comandos frecuentes

**Drive** — buscar archivos:
```bash
gog drive search "brief pepsi" --max 10
```

**Sheets** — leer datos de un sheet:
```bash
gog sheets get <sheetId> "Tab!A1:D10" --json
```

**Sheets** — escribir datos:
```bash
gog sheets update <sheetId> "Tab!A1:B2" --values-json '[["A","B"],["1","2"]]' --input USER_ENTERED
```

**Sheets** — agregar filas:
```bash
gog sheets append <sheetId> "Tab!A:C" --values-json '[["x","y","z"]]' --insert INSERT_ROWS
```

**Docs** — leer un documento:
```bash
gog docs cat <docId>
```

### Cuando usar Drive
- Buscar briefs de clientes o campanas
- Acceder a cronogramas, contratos, reportes
- Verificar que las carpetas de campana esten completas

### Cuando usar Sheets
- Consultar el sheet master de proyectos/campanas
- Actualizar estado de tareas o tracking
- Leer datos de KPIs o metricas

---

## Notion (MCP via mcporter)

Tienes acceso al workspace de Notion de Mamba Negra Latam.

### IMPORTANTE — Sintaxis de mcporter

Todos los comandos Notion se ejecutan con `mcporter call notion.<tool>`. Los argumentos se pasan con `--args` y un JSON string. **NO inventes parametros** — usa exactamente los ejemplos de abajo.

### Bases de datos disponibles (IDs verificados)

#### Tableros de TRAFICO (tareas de ejecucion por CM)

| CM | Database ID |
|----|-------------|
| Creative | `31982aed-93c7-81f1-aa3e-000bd49f95d3` |
| Mar | `31e82aed-93c7-817a-91e0-000bbe2f663a` |
| Juan G | `31982aed-93c7-814c-9c3a-000b5f26f191` |
| Aleja | `31e82aed-93c7-81be-acd0-000b834ee4a4` |
| Isa | `31e82aed-93c7-8127-a10d-000b93d3de86` |
| C.G | `31a82aed-93c7-8146-bf1b-000b372363d2` |
| Cami | `31982aed-93c7-8148-bd5e-000bb15e8796` |
| Lau Criales | `31982aed-93c7-8109-bbb7-000bb6590ee6` |
| Lau Reyes | `31982aed-93c7-8151-b2af-000b490e6b8d` |

**Campos en TRAFICO y SOLICITUD**:
- Tarea (title)
- Estado (status) — valores: "Sin empezar", "En curso", "Listo"
- Marca (multi_select)
- Prioridad (select) — valores: "Alta", "Media", "Baja"
- Fecha limite (date)
- Asignado por (people) — **requiere user ID de Notion, ver directorio abajo**
- Descripcion (rich_text)
- Canva (url)
- Excel (url)

#### Tableros de SOLICITUD (requests por CM)

| CM | Database ID |
|----|-------------|
| Creative | `31982aed-93c7-8133-99e1-000bb95b379a` |
| Mar | `31e82aed-93c7-813f-aece-000bfd1713b6` |
| Juan G | `31982aed-93c7-81a9-858c-000b51700c74` |
| Aleja | `31e82aed-93c7-818f-96b9-000bfc23d8ea` |
| Isa | `31e82aed-93c7-817f-a47b-000b9a254733` |
| Cami | `31982aed-93c7-810e-8379-000b91690d29` |
| Lau Criales | `31982aed-93c7-81d1-bb55-000b21cbec20` |
| Lau Reyes | `31982aed-93c7-81e1-af7a-000bfe0a1041` |

#### Directorio del equipo (Notion user IDs)

Para asignar personas en el campo "Asignado por" (tipo people), necesitas el user ID:

| Nombre | Email | Notion User ID |
|--------|-------|----------------|
| María Camila Skinner | m.skinner@mambanegramkt.com | `06d7928a-8a67-443f-9328-7a0becfce023` |
| Mariana Monroy | m.monroy@mambanegramkt.com | `31ed872b-594c-815e-80a4-0002189b3a38` |
| Laura Criales | l.criales@mambanegramkt.com | `31ed872b-594c-8180-9f4c-00020e2d7794` |
| Laura Isabel Zapata | l.zapata@mambanegramkt.com | `229d872b-594c-81d6-8b82-00024031f023` |
| Camila Benavides | c.benavides@mambanegramkt.com | `22cd872b-594c-81a8-ab14-00021e335d5c` |
| Carlos Gonzalez | c.gonzalez@mambanegramkt.com | `232d872b-594c-81b1-95be-000261e92d5e` |
| Juan Guillermo Mejia | j.mejia@mambanegramkt.com | `31bd872b-594c-8192-b7cd-0002552fd140` |
| ia ia (bot PM) | ia@mambanegramkt.com | `321d872b-594c-81ed-a9cf-00024f9eaca8` |

**Ejemplo — crear tarea asignada a Laura Criales en SOLICITUD Creative:**

```bash
mcporter call notion.API-post-page --args '{"parent": {"database_id": "31982aed-93c7-8133-99e1-000bb95b379a"}, "properties": {"Tarea": {"title": [{"text": {"content": "Nombre de la tarea"}}]}, "Asignado por": {"people": [{"id": "31ed872b-594c-8180-9f4c-00020e2d7794"}]}, "Estado": {"status": {"name": "Sin empezar"}}, "Prioridad": {"select": {"name": "Alta"}}}}'
```

#### Otras bases de datos

| Nombre | Database ID | Campos |
|--------|-------------|--------|
| Calendario | `31982aed-93c7-80a2-ad8b-000b5a3e9db8` | Nombre (title), Fecha (date), Etiquetas (multi_select) |
| MAMBA FRIENDS | `31982aed-93c7-80a3-b89d-000b2186b049` | Nombre (title), Estado (status), Etiquetas (multi_select) |

#### Pagina raiz

- **Mamba Negra Latam**: `31982aed-93c7-8008-82a9-dab06e04aae3`

### Comandos de mcporter para Notion — COPIAR EXACTO

**Buscar paginas y databases:**
```bash
mcporter call notion.API-post-search --args '{"query": "nombre a buscar"}'
```

**Consultar TODAS las tareas de un CM (ejemplo: Mar):**
```bash
mcporter call notion.API-query-data-source --args '{"data_source_id": "31e82aed-93c7-817a-91e0-000bbe2f663a"}'
```

**Consultar tareas filtradas por Estado (ejemplo: tareas no terminadas de Mar):**
```bash
mcporter call notion.API-query-data-source --args '{"data_source_id": "31e82aed-93c7-817a-91e0-000bbe2f663a", "filter": {"property": "Estado", "status": {"does_not_equal": "Done"}}}'
```

**Consultar tareas filtradas por Marca (ejemplo: tareas de Pepsi en TRAFICO Creative):**
```bash
mcporter call notion.API-query-data-source --args '{"data_source_id": "31982aed-93c7-81f1-aa3e-000bd49f95d3", "filter": {"property": "Marca", "select": {"equals": "Pepsi"}}}'
```

**Leer contenido de una pagina:**
```bash
mcporter call notion.API-get-block-children --args '{"block_id": "PAGE_ID_AQUI"}'
```

**Leer propiedades de una pagina:**
```bash
mcporter call notion.API-retrieve-a-page --args '{"page_id": "PAGE_ID_AQUI"}'
```

### Patron para consultas cross-CM

Para responder "que tareas estan atrasadas en todo el equipo", consulta TODOS los tableros de TRAFICO uno por uno. Son 9 tableros — ejecuta los 9 queries y consolida.

### Errores comunes — NO hacer

- **NO** inventes IDs de databases. Usa SOLO los IDs listados arriba.
- **NO** pases parametros como `Notion-Version` o headers manuales — mcporter los maneja.
- **NO** uses JSON malformado. Copia los ejemplos de arriba y cambia solo los valores.
- Si un query retorna error 400, revisa que el JSON sea valido y los nombres de propiedades sean exactos.

---

## Comunicacion entre agentes (sessions_send)

Puedes consultar a otros agentes con `sessions_send`:

- **Estratega** — criterios de scoring, contexto estrategico del brief, evaluacion de perfiles
- **Admin** — estado de contratos, pagos pendientes, montos facturados

Usa `sessions_send` solo para preguntas puntuales. Si la consulta requiere conversacion extendida, deriva al usuario al bot correspondiente.
