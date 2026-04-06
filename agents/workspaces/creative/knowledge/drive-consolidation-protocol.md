# Protocolo de Consolidacion en Drive — Mamba Negra

> Cada entregable aprobado por el equipo se guarda inmediatamente en la carpeta de Drive de la campana.
> TODOS los agentes deben seguir este protocolo. No se espera al final de la campana para guardar.

---

## Carpeta raiz de campanas

**Folder ID**: `1YFzhxdq0cZ2b6nIOpLrrtY6rxONGK63Z`

Cada campana tiene su propia subcarpeta dentro de esta raiz. Si no existe, crearla:

```bash
gog drive create-folder "[MARCA] — [Nombre Campana]" --parent 1YFzhxdq0cZ2b6nIOpLrrtY6rxONGK63Z
```

---

## Cuando guardar

**Regla**: Cada vez que el equipo humano aprueba un entregable en un checkpoint, guardarlo en Drive INMEDIATAMENTE. No esperar a que termine toda la campana.

| Fase completada | Quien guarda | Nombre del Doc | Contenido |
|-----------------|-------------|----------------|-----------|
| Brief analizado (Paso 01-02) | Orquestador | `01-Brief-y-Retos — [MARCA]` | Resumen del brief + retos diagnosticados + objetivo real |
| Investigacion (Paso 04) | Research | `02-Research — [MARCA]` | Hard data + social data + hallazgos clave + fuentes |
| Insight aprobado (Paso 05) | Creative | `03-Insight — [MARCA]` | Insight con argumentacion + tension identificada |
| Concepto aprobado (Pasos 06-07) | Creative | `04-Concepto — [MARCA]` | Identificativo de marca + concepto + big idea |
| Metodologia + ideas (Pasos 08-09) | Creative | `05-Metodologia-Ideas — [MARCA]` | Metodologia elegida + lineamientos + ideas de contenido + bajada a guion |
| Shortlist de influencers | Influencer | `06-Scouting — [MARCA]` | Shortlist con scoring, copy comercial, background check, criterios para CMs |
| Entrega final (Paso 12) | Orquestador | `07-Entrega-Final — [MARCA]` | Compilacion completa + actualizar Campaign Strategy Index |

---

## Como guardar

### 1. Buscar si ya existe la carpeta de la campana

```bash
gog drive search "[MARCA] campana" --max 5
```

Si no existe, crearla dentro de la carpeta raiz:

```bash
gog drive create-folder "[MARCA] — [Nombre Campana]" --parent 1YFzhxdq0cZ2b6nIOpLrrtY6rxONGK63Z
```

### 2. Crear el Google Doc en la carpeta

```bash
gog docs create "[NOMBRE-DOC]" --parent [FOLDER_ID]
```

### 3. Escribir el contenido

```bash
gog docs append [DOC_ID] "contenido del entregable aqui"
```

### 4. Confirmar al equipo

Despues de guardar, informar:
"Entregable guardado en Drive: [nombre del doc]. Link: [si lo tienes]"

---

## Como leer entregables de fases anteriores

Antes de ejecutar tu fase, verifica que tienes el contexto de lo ya aprobado:

```bash
gog drive search "[MARCA]" --max 10
gog docs cat [DOC_ID]
```

Esto es ESPECIALMENTE importante si:
- Eres un worker spawneado y no tienes el contexto completo de la conversacion
- La sesion se reseteo y necesitas recuperar lo que ya estaba aprobado
- Otro agente hizo una fase anterior y necesitas construir sobre su trabajo

---

## Campaign Strategy Index

**Sheet ID**: `1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c`

TODOS los agentes que producen entregables pueden leer Y actualizar el Index Sheet. Si el equipo te aprueba un entregable directamente (sin pasar por el Orquestador), TU eres responsable de marcar esa fase como completada.

### Leer el estado de una campana:

```bash
gog sheets get 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!A:L" --json
```

### Marcar una fase como completada:

Despues de guardar el entregable en Drive, actualiza la columna correspondiente en el Index:

| Agente | Columnas que puede actualizar |
|--------|------------------------------|
| Orquestador | Todas (Brief, Retos, Status general, Entrega Final) |
| Research | Research (columna E) |
| Creative | Insight (columna F), Concepto (columna G), Metodologia (columna H) |
| Influencer | Scouting (columna I) |
| PM | Timeline (columna J) |

```bash
gog sheets update 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1![COLUMNA][FILA]" --values-json '[["Done"]]'
```

**IMPORTANTE**: Antes de actualizar, lee el Sheet primero para encontrar la fila correcta de la campana. No escribas a ciegas.

---

## Buenas practicas

1. **Guardar INMEDIATAMENTE despues de la aprobacion** — no esperar a que el equipo pida el doc
2. **Nombrar consistentemente** — siempre con el prefijo numerico (01, 02, 03...) para mantener el orden
3. **Incluir la fecha** al final del contenido del doc para saber cuando se aprobo
4. **No sobreescribir** — si hay una iteracion, agregar al doc existente con una seccion "ITERACION [fecha]" en lugar de borrar lo anterior
5. **Si no sabes el Folder ID**, buscar con `gog drive search` antes de crear duplicados
6. **Sugerir al equipo guardar** — si el equipo aprueba algo pero no dices nada, propone: "Quedo aprobado. Lo guardo en la carpeta de Drive de [marca]?"
