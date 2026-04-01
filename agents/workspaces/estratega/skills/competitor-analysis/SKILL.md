---
name: competitor-analysis
description: Activa cuando pidan analisis de competencia, investigar competidores de un cliente, benchmark competitivo, SWOT, o comparar marcas. Usa Tavily para investigar y estructura en formato accionable.
---

# Competitor Analysis — Investigacion + Estructura

Este skill combina busqueda web (Tavily) con analisis estrategico para entregar un brief competitivo accionable. Util para cuando Mar, CG o un CM necesitan entender el panorama competitivo de un cliente o vertical.

---

## CUANDO SE ACTIVA

- "Investiga los competidores de [marca]"
- "Que estan haciendo las marcas de [categoria] en influencer marketing?"
- "Necesito un benchmark de [vertical]"
- "Compara [marca A] vs [marca B]"
- "SWOT de [marca] vs competencia"
- "Que campanas de influencers esta haciendo [competidor]?"

---

## PASO 1: DEFINIR ALCANCE

Antes de buscar, confirma con el usuario:

1. **Marca/cliente**: Para quien es el analisis
2. **Competidores conocidos**: Si el equipo ya sabe quienes son (pedirlos), si no, buscarlos
3. **Enfoque**: Que quieren saber (estrategia de influencers, posicionamiento, contenido, campanas recientes, todo)
4. **Vertical**: Para contextualizar (consumo masivo, belleza, farmaceutico, inmobiliario, calzado, servicios)

Si el usuario da todo el contexto de una vez, no preguntes — avanza directo.

---

## PASO 2: INVESTIGAR CON TAVILY

Usa `mcporter call tavily.tavily-search` para buscar informacion. Estructura tus busquedas asi:

### Busquedas recomendadas (adaptar segun el caso)

**Competidores directos** (si no los conocen):
```bash
mcporter call tavily.tavily-search --args '{"query": "[marca] competidores directos Colombia [categoria]", "search_depth": "basic", "max_results": 10}'
```

**Estrategia de influencer marketing del competidor**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[competidor] influencer marketing campanas Colombia 2025 2026", "search_depth": "basic", "max_results": 10}'
```

**Posicionamiento y diferenciacion**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[competidor] posicionamiento marca target audiencia Colombia", "search_depth": "basic", "max_results": 5}'
```

**Tendencias de la categoria**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[categoria] tendencias influencer marketing Latinoamerica 2026", "search_depth": "basic", "max_results": 5}'
```

**Campanas recientes destacadas**:
```bash
mcporter call tavily.tavily-search --args '{"query": "[competidor] campana reciente Instagram TikTok influencer", "search_depth": "basic", "max_results": 5}'
```

### Para extraer contenido de una pagina especifica:
```bash
mcporter call tavily.tavily-extract --args '{"urls": ["https://url-del-articulo.com"]}'
```

### Notas sobre costos
- Cada busqueda basica = 1 credito (1,000 gratis/mes)
- Usa `search_depth: "basic"` por defecto. Solo usa `"advanced"` si necesitas profundidad extra
- 5-8 busquedas por analisis es suficiente

---

## PASO 3: DATOS MANUALES (opcional, complementa Tavily)

Si Mar o el equipo tienen datos adicionales (de SEMrush, Modash, Perplexity, o experiencia propia), integralos al analisis. Fuentes posibles:

- Data de campanas pasadas en Drive (buscar con gog)
- Perfiles de vertical en `knowledge/verticals/`
- Scoring de influencers en `knowledge/influencer-scoring.md`
- Informacion que el equipo pegue directamente en el chat

**Etiqueta cada dato con su fuente**: [Tavily], [SEMrush], [Drive], [Equipo], [Estimacion].

---

## PASO 4: ESTRUCTURAR EL ANALISIS

Presenta el brief competitivo en este formato:

```
ANALISIS COMPETITIVO — [MARCA] vs [COMPETIDORES]
Fecha: [fecha]
Vertical: [vertical]
Enfoque: [que se analizo]

---

PANORAMA COMPETITIVO

| Competidor | Posicionamiento | Target principal | Presencia IG/TikTok | Enfoque de influencers |
|-----------|----------------|-----------------|--------------------|-----------------------|
| [Comp 1]  | [1 linea]      | [1 linea]       | [seguidores/ER]    | [tipo de campanas]    |
| [Comp 2]  | ...            | ...             | ...                | ...                   |

---

SWOT — [MARCA DEL CLIENTE]

FORTALEZAS (vs competencia):
- [fortaleza 1] — [evidencia, fuente]
- [fortaleza 2] — [evidencia, fuente]

DEBILIDADES (vs competencia):
- [debilidad 1] — [evidencia, fuente]
- [debilidad 2] — [evidencia, fuente]

OPORTUNIDADES:
- [oportunidad 1] — [por que es oportunidad, fuente]
- [oportunidad 2] — [por que, fuente]

AMENAZAS:
- [amenaza 1] — [riesgo concreto, fuente]
- [amenaza 2] — [riesgo, fuente]

---

ESTRATEGIA DE INFLUENCERS — COMPETENCIA

[Para cada competidor relevante, describir]:
- Que tipo de influencers usan (micro, mid, macro)
- Que plataformas priorizan
- Que tipo de contenido generan
- Que tono/estetica manejan
- Campanas recientes destacadas (si hay data)

---

GAPS Y OPORTUNIDADES PARA [MARCA]

1. [Gap 1]: [que no esta haciendo la competencia que nosotros podemos explotar]
2. [Gap 2]: [espacio en el mercado que nadie esta cubriendo]
3. [Gap 3]: [audiencia desatendida por los competidores]

---

RECOMENDACIONES (accionables)

Corto plazo (proxima campana):
- [recomendacion basada en hallazgo especifico]

Mediano plazo (3 meses):
- [recomendacion de posicionamiento]

Diferenciacion:
- [que puede hacer [marca] que la competencia NO esta haciendo]
```

---

## PASO 5: CONECTAR CON CAMPANA ACTIVA

Si el analisis es para una campana en curso, conecta los hallazgos con el flujo del Estratega:

- **Insight**: Los gaps competitivos alimentan opciones de insight para el Strategic Thinking
- **Criterios de scouting**: El tipo de influencer que usa la competencia informa que buscar (o evitar)
- **Brand voice**: Como se diferencia la voz de [marca] vs los competidores
- **Contenido**: Que formatos y angulos estan saturados vs que tiene espacio

---

## REGLAS

1. **Cita la fuente de cada dato**: [Tavily], [Drive], [Equipo], [Estimacion]
2. **No inventes datos**: Si Tavily no encuentra algo, dilo. "No encontre campanas recientes de [competidor] en influencer marketing."
3. **Prioriza Colombia y Latam**: Busca primero en contexto local, luego global
4. **Accionable > Enciclopedico**: El equipo necesita insights que se traduzcan en decisiones, no un ensayo
5. **Guarda en memoria**: Si el analisis tiene hallazgos importantes, guardalos en `memory/YYYY-MM-DD.md` para futuras campanas del mismo cliente
