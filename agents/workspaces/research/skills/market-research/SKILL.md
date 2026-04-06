---
name: market-research
description: Activa cuando pidan investigar un mercado, marca, tendencia o sector. Combina Hard Data (papers, reportes, estudios) con Social Data (tendencias, Reddit, TikTok, conversaciones) para entregar datos accionables.
---

# Market Research — Hard Data + Social Data

Este skill estructura la investigacion de mercado siguiendo la metodologia de Mamba Negra: cruzar datos duros con comportamiento social para construir una vision completa y accionable.

---

## CUANDO SE ACTIVA

- "Investiga [marca/mercado/tendencia]"
- "Necesito datos de [sector]"
- "Hard data de [tema]"
- "Social data de [tema]"
- "Que esta pasando en [categoria] en Colombia?"
- "Busca informacion sobre [industria/vertical]"
- "Datos de mercado de [producto/servicio]"
- "Tendencias de [categoria] en LATAM"

---

## PASO 1: DEFINIR ALCANCE

Antes de investigar, define con claridad:

1. **Tema/marca**: Que se esta investigando
2. **Mercado**: Colombia, LATAM, global — anclar siempre a region
3. **Pregunta central**: Que quiere saber el equipo (tamano de mercado, tendencias, comportamiento del consumidor, percepcion de marca)
4. **Audiencia**: Perfil del consumidor relevante (si aplica)
5. **Para que**: Propuesta de campana, pitch a cliente, contexto general

Si el usuario da todo el contexto de una vez, no preguntes — avanza directo.

---

## PASO 2: HARD DATA — Lo que la gente hace

Informacion estructurada, verificable y basada en estudios.

### Busquedas con Tavily

**Tamano de mercado y crecimiento**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[categoria] market size Colombia 2025 2026", "search_depth": "basic", "max_results": 5}'
```

**Reportes de industria**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[categoria] industry report Latin America trends", "search_depth": "basic", "max_results": 5}'
```

**Comportamiento del consumidor**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[categoria] consumer behavior Colombia demographics", "search_depth": "basic", "max_results": 5}'
```

**Papers y estudios especificos**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[tema] research study paper 2024 2025", "search_depth": "advanced", "max_results": 5}'
```

### Fuentes prioritarias de Hard Data
- Papers e investigaciones recientes
- Reportes de industria (Nielsen, Kantar, Statista, GWI)
- Articulos especializados y publicaciones academicas
- Estudios de mercado del sector

### Complementar con Drive
Busca investigaciones previas de Mamba Negra:
```bash
gog drive search "[vertical] investigacion mercado" --max 5
```

---

## PASO 3: SOCIAL DATA — Lo que la gente dice y siente

Insights culturales, espontaneos, que revelan percepciones reales.

### Busquedas con Tavily

**Conversaciones en Reddit**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[marca/categoria] reddit opinion experience Colombia", "search_depth": "basic", "max_results": 5}'
```

**Tendencias en TikTok**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[categoria] TikTok trends Colombia Latin America 2026", "search_depth": "basic", "max_results": 5}'
```

**Percepcion en redes sociales**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[marca] Instagram comments perception Colombia", "search_depth": "basic", "max_results": 5}'
```

**Preguntas del consumidor (Answer The Public style)**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[categoria] preguntas frecuentes consumidores Colombia", "search_depth": "basic", "max_results": 5}'
```

### Fuentes prioritarias de Social Data
- Reddit (foros especializados, sin filtro)
- TikTok for Business (tendencias de contenido y formatos)
- Comentarios y resenas en Instagram, YouTube, X
- Google Trends (evolucion de interes por region y tiempo)
- Answer The Public (preguntas reales del consumidor)

---

## PASO 4: CRUZAR Y PRESENTAR

Estructura la entrega en formato accionable:

```
INVESTIGACION DE MERCADO — [TEMA]
Fecha: [fecha]
Mercado: [Colombia/LATAM/Global]
Pregunta central: [que se investigo]

---

HARD DATA — Lo que la gente hace

[Datos estructurados, cada uno con fuente]

| Dato | Valor | Fuente |
|------|-------|--------|
| Tamano de mercado | $X | [Tavily] — [reporte] |
| Crecimiento anual | X% | [Tavily] — [fuente] |
| Penetracion | X% | [Drive] — [documento] |

Hallazgos clave:
- [hallazgo 1] — [fuente]
- [hallazgo 2] — [fuente]

---

SOCIAL DATA — Lo que la gente dice

[Insights culturales y de percepcion]

Conversaciones dominantes:
- [tema 1]: [que dice la gente, donde] — [fuente]
- [tema 2]: [percepcion, sentimiento] — [fuente]

Tendencias relevantes:
- [tendencia 1] — [plataforma, contexto] — [fuente]
- [tendencia 2] — [fuente]

Tensiones detectadas:
- [tension entre lo que la gente dice vs lo que hace]
- [contradiccion entre percepcion y datos]

---

CRUCE — Donde se encuentran los datos

[Lo mas valioso: que dice el cruce entre Hard Data y Social Data]

- [insight accionable 1]: Hard Data muestra [X], Social Data muestra [Y] — juntos significan [Z]
- [insight accionable 2]: ...

---

IMPLICACIONES PARA CAMPANA

- [que significa esto para la estrategia de influencers]
- [que tipo de contenido resuena segun los datos]
- [que gaps o oportunidades hay]

---

FUENTES
- [lista de fuentes consultadas con URLs cuando disponibles]
```

---

## PASO 5: GUARDAR EN MEMORIA

Si la investigacion produjo hallazgos valiosos para futuras campanas:

1. Guarda resumen en `memory/YYYY-MM-DD.md`
2. Incluye: tema investigado, datos clave, fuentes utiles, vertical/mercado
3. No guardes datos triviales — solo hallazgos que el equipo reutilizaria

---

## PROMPTS DE REFERENCIA (Banco de Prompts MNL — Notion)

Usa estos como guia de calidad para tu enfoque de investigacion. Internaliza su logica.

### Investigacion Tipo 1: Entendimiento profundo del consumidor

**Cuando usarlo**: cuando necesitas meterte en la cabeza del usuario real (verdades humanas, tensiones y habitos).

**Logica**: Identificar insights reales, no obvios, sobre el consumidor en Colombia/LATAM. Buscar tensiones (lo que hace vs lo que piensa), comportamientos normalizados pero curiosos, verdades incomodas o no verbalizadas, deseos aspiracionales ocultos. Evitar generalidades. Hablar en lenguaje humano, no tecnico.

**Output esperado**: lenguaje humano + tension. Evita listas "de manual".

### Investigacion Tipo 2: Validacion / soporte estrategico

**Cuando usarlo**: cuando ya tienes un concepto o idea y necesitas data que lo respalde o lo tensione (anti-sesgo de confirmacion).

**Logica**: Encontrar datos, estudios o comportamientos reales que puedan respaldar O tensionar un concepto. Incluir tendencias culturales relacionadas y ejemplos reales. Si el concepto es debil, decirlo sin suavizar. Priorizar informacion reciente y relevante para Colombia/LATAM.

**Output esperado**: evidencia + contraargumentos. Evita "validacion ciega".

### Investigacion Tipo 3: Contexto de mercado / benchmark

**Cuando usarlo**: cuando necesitas entender el terreno de la categoria (competencia, habitos de compra, oportunidades).

**Logica**: Analisis estrategico (no descriptivo) sobre principales competidores (quien domina y por que), comportamiento del consumidor en la categoria, oportunidades no aprovechadas en comunicacion o producto, y como estan entrando marcas nuevas. Priorizar insights accionables, no listas largas.

**Output esperado**: lectura estrategica (porques + oportunidades), no dump de info.

### Investigacion Tipo 4: Interpretacion de senales culturales

**Cuando usarlo**: cuando ya tienes data/hallazgos y necesitas entender que significan y como se vuelven oportunidad.

**Logica**: Interpretar un hallazgo/dato/tendencia. Que revela realmente sobre el consumidor, que tension o necesidad hay detras, por que esta pasando ahora, y como se podria convertir en oportunidad de comunicacion. No describir el dato — interpretarlo.

**Output esperado**: interpretacion + oportunidad. Evita repetir el dato con otras palabras.

---

## REGLAS

1. **Cita la fuente de cada dato**: [Tavily], [Drive], [Equipo], [Estimacion]
2. **No inventes datos**: Si no encuentras algo, dilo. "No hay datos publicos de [tema] en Colombia."
3. **Colombia/LATAM primero**: Siempre busca en contexto local. Solo usa datos globales como referencia cuando no hay locales.
4. **Hard Data + Social Data**: No entregues solo uno. El valor esta en el cruce.
5. **Accionable**: El equipo no necesita un ensayo academico. Necesita datos que se traduzcan en decisiones de campana.
6. **Conserva creditos Tavily**: Planifica tus busquedas. 5-8 queries por investigacion es suficiente. Usa `basic` por defecto.
7. **Marca la incertidumbre**: Si extrapolas o estimas, marcalo como [Estimacion]. El equipo debe saber que es dato duro y que es proyeccion.
8. **Desarrolla a fondo**: Cada hallazgo con minimo 3-5 lineas — no solo el dato, sino que significa y por que importa para la campana
