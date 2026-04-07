# TOOLS.md -- Herramientas de Musa (Creative Strategist)

## Google Workspace (gog)

Acceso a Drive, Sheets y Docs de Mamba Negra.

- **Cuenta**: ia@mambanegramkt.com
- **Servicios**: drive, sheets, docs

### Drive -- buscar brand voice profiles y referencias creativas

```bash
gog drive search "brand voice [marca]" --max 5
gog drive search "propuesta [marca]" --max 10
gog drive search "concepto [campana]" --max 10
gog drive search "strategic thinking [marca]" --max 5
```

### Docs -- leer y crear documentos creativos

```bash
# Leer
gog docs cat <docId>

# Crear
gog docs create "03-Strategic-Thinking -- [MARCA]"
gog docs append <docId> "contenido"
```

### Sheets -- leer datos

```bash
gog sheets get <sheetId> "Tab!A1:D10" --json
```

### PDFs desde Drive

Los PDFs requieren descarga primero:

```bash
# 1. Buscar
gog drive search "brief [marca]" --max 5

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

### Cuando usar Drive

- Brand voice profiles de clientes
- Propuestas estrategicas y conceptos de campanas pasadas
- Referencias creativas y ejemplos
- Guardar documentos creativos (Strategic Thinking, Brand Voice, Concepto)

### Cuando usar Docs

- Leer briefs completos
- Consultar pensamiento estrategico existente
- Crear documentos creativos nuevos

---

## Comunicacion entre agentes (sessions_send)

### Research (`research`)

Consultalo cuando necesites datos para fundamentar tu trabajo creativo:
- Datos de mercado para construir o validar un insight
- Contexto de categoria o competencia
- Tendencias culturales o de consumo

Ejemplos:
```
"Necesito datos sobre habitos de skincare en mujeres 25-35 en Colombia para el insight de [campana]"
"Que esta haciendo la competencia de [marca] en influencer marketing?"
```

### Influencer (`influencer`)

Consultalo para validar ideas contra perfiles reales:
- Verificar si un tipo de influencer existe en Colombia
- Validar que una idea es realista para perfiles disponibles

Ejemplos:
```
"La idea necesita influencers de cocina saludable en Bogota, tier micro -- hay opciones?"
"El concepto pide tono irreverente y humor negro -- hay perfiles sin riesgo de brand safety?"
```

---

## Errores comunes

- **NO** busques influencers ni hagas scoring -- territorio de Scout
- **NO** hagas investigacion profunda con Tavily -- territorio de Research. Si necesitas datos, consulta via sessions_send
- **NO** inventes IDs de documentos. Si no encuentras algo en Drive, dilo
- **NO** adivines datos de mercado. Sin datos, pide a Research

---

## Directorio del Equipo MNL (Telegram)

Usa estos IDs para enviar mensajes directos cuando necesites contactar a alguien del equipo.

| Nombre | Rol | Telegram User ID |
|--------|-----|-------------------|
| Juan José | AI Strategy Lead | 6107170400 |
| Juan Guillermo (Juangui) | Community Manager | 8028819934 |
| Maca | Diseño | 8675003670 |
| Mar (Mariana) | Estratega Senior | 8086667993 |
