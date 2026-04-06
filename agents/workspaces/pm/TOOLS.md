# TOOLS.md — Herramientas del PM

## Google Workspace (gog)

Cuenta: ia@mambanegramkt.com — Servicios: drive, sheets, docs

### Sintaxis rapida

**Drive — buscar:**
```bash
gog drive search "brief pepsi" --max 10
```

**Sheets — leer:**
```bash
gog sheets get <sheetId> "Tab!A1:D10" --json
```

**Sheets — escribir:**
```bash
gog sheets update <sheetId> "Tab!A1:B2" --values-json '[["A","B"],["1","2"]]' --input USER_ENTERED
```

**Sheets — agregar filas:**
```bash
gog sheets append <sheetId> "Tab!A:C" --values-json '[["x","y","z"]]' --insert INSERT_ROWS
```

**Docs — leer:**
```bash
gog docs cat <docId>
```

---

## Notion (mcporter)

Workspace de Mamba Negra Latam. Todos los comandos: `mcporter call notion.<tool> --args '<JSON>'`.

### Tableros TRAFICO (tareas de ejecucion por CM)

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

### Tableros SOLICITUD (requests por CM)

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

### Campos en TRAFICO y SOLICITUD

- Tarea (title), Estado (status: "Sin empezar"/"En curso"/"Listo"), Marca (multi_select), Prioridad (select: "Alta"/"Media"/"Baja"), Fecha limite (date), Asignado por (people), Descripcion (rich_text), Canva (url), Excel (url)

### Directorio del equipo (Notion user IDs)

| Nombre | Notion User ID |
|--------|----------------|
| Maria Camila Skinner | `06d7928a-8a67-443f-9328-7a0becfce023` |
| Mariana Monroy | `31ed872b-594c-815e-80a4-0002189b3a38` |
| Laura Criales | `31ed872b-594c-8180-9f4c-00020e2d7794` |
| Laura Isabel Zapata | `229d872b-594c-81d6-8b82-00024031f023` |
| Camila Benavides | `22cd872b-594c-81a8-ab14-00021e335d5c` |
| Carlos Gonzalez | `232d872b-594c-81b1-95be-000261e92d5e` |
| Juan Guillermo Mejia | `31bd872b-594c-8192-b7cd-0002552fd140` |
| ia ia (bot PM) | `321d872b-594c-81ed-a9cf-00024f9eaca8` |

### Otras bases de datos

| Nombre | Database ID |
|--------|-------------|
| Calendario | `31982aed-93c7-80a2-ad8b-000b5a3e9db8` |
| MAMBA FRIENDS | `31982aed-93c7-80a3-b89d-000b2186b049` |

Pagina raiz MNL (accesible por la integracion): `f9aa451a-eae8-8272-9423-81419cc00592`
Pagina raiz legacy (NO accesible): `31982aed-93c7-8008-82a9-dab06e04aae3`

### Crear bases de datos (databases)

Puedes crear nuevas databases dentro de cualquier pagina de Notion:

```bash
mcporter call notion.API-create-a-database --args '{
  "parent": {"type": "page_id", "page_id": "<PAGE_ID>"},
  "title": [{"text": {"content": "Nombre de la Base de Datos"}}],
  "properties": {
    "Nombre": {"title": {}},
    "Estado": {"status": {"options": [{"name": "Sin empezar", "color": "red"}, {"name": "En curso", "color": "yellow"}, {"name": "Listo", "color": "green"}]}},
    "Prioridad": {"select": {"options": [{"name": "Alta", "color": "red"}, {"name": "Media", "color": "yellow"}, {"name": "Baja", "color": "green"}]}},
    "Fecha": {"date": {}},
    "Responsable": {"people": {}},
    "Notas": {"rich_text": {}}
  }
}'
```

**Tipos de propiedad soportados**: title, rich_text, number, select, multi_select, date, people, checkbox, url, email, phone_number, status, files, relation

**Para crear dentro de la pagina raiz de MNL**, usa `"page_id": "f9aa451a-eae8-8272-9423-81419cc00592"`.

### Consultar y modificar estructura de databases

**Obtener schema de una database:**
```bash
mcporter call notion.API-retrieve-a-database --args '{"database_id": "<DB_ID>"}'
```

**Actualizar schema (agregar/modificar columnas):**
```bash
mcporter call notion.API-update-a-database --args '{"database_id": "<DB_ID>", "properties": {"Nueva Columna": {"rich_text": {}}}}'
```

### Comandos Notion

**Consultar tareas de un CM:**
```bash
mcporter call notion.API-query-data-source --args '{"data_source_id": "<DB_ID>"}'
```

**Filtrar por estado (no terminadas):**
```bash
mcporter call notion.API-query-data-source --args '{"data_source_id": "<DB_ID>", "filter": {"property": "Estado", "status": {"does_not_equal": "Listo"}}}'
```

**Filtrar por marca:**
```bash
mcporter call notion.API-query-data-source --args '{"data_source_id": "<DB_ID>", "filter": {"property": "Marca", "multi_select": {"contains": "Pepsi"}}}'
```

**Crear tarea:**
```bash
mcporter call notion.API-post-page --args '{"parent": {"database_id": "<DB_ID>"}, "properties": {"Tarea": {"title": [{"text": {"content": "Nombre"}}]}, "Estado": {"status": {"name": "Sin empezar"}}, "Prioridad": {"select": {"name": "Alta"}}}}'
```

**Actualizar tarea:**
```bash
mcporter call notion.API-patch-page --args '{"page_id": "<PAGE_ID>", "properties": {"Estado": {"status": {"name": "Listo"}}}}'
```

**Buscar en Notion:**
```bash
mcporter call notion.API-post-search --args '{"query": "nombre a buscar"}'
```

**Leer contenido de pagina:**
```bash
mcporter call notion.API-get-block-children --args '{"block_id": "<PAGE_ID>"}'
```

**Agregar bloques a pagina:**
```bash
mcporter call notion.API-patch-block-children --args '{"block_id": "<PAGE_ID>", "children": [{"object": "block", "type": "paragraph", "paragraph": {"rich_text": [{"text": {"content": "Texto."}}]}}]}'
```

### Errores comunes

- NO inventes IDs de databases — usa SOLO los listados arriba
- NO pases headers manuales — mcporter los maneja
- Si error 400: verificar JSON valido y nombres de propiedades exactos

---

## Comunicacion entre agentes (sessions_send)

Consultar a otros agentes con pregunta puntual:
- **Orquestador** — contexto estrategico, brief, estado general
- **Admin** — contratos, pagos, montos facturados
- **Research** — datos de mercado, competencia
- **Influencer (Scout)** — criterios de scoring, evaluacion de perfil

---

**Version**: V6 — 02-Abr-2026 (optimizado <15K chars, workflows movidos a AGENTS.md)
