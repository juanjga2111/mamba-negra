# SKILL: Scouting Shortlist

## Trigger

Activa este skill cuando el usuario diga:
- "arma shortlist para [campana]"
- "evalua estos perfiles"
- "scouting para [marca]"
- "busca influencers para [brief]"
- "shortlist para [cliente]"
- "necesito perfiles para [campana]"

---

## Paso 1: Obtener contexto estrategico

Antes de evaluar cualquier perfil, necesitas la estrategia completa de la campana.

**Si el usuario te da el brief o la estrategia directamente**: Leelo y extrae:
- Insight de la campana
- Objetivos especificos (awareness, conversion, brand building)
- Ideas de contenido definidas
- Plataformas priorizadas y tipo de contenido
- Metodologia elegida (RAYO/ARCO/PRISMA/MAREA) y sus fases
- Target (demografico, psicografico, ubicacion)
- Brand voice del cliente (si existe en knowledge/brands/)

**Si NO tienes la estrategia**:
1. Pregunta al usuario: "Pasame el brief o la estrategia de la campana para armar la shortlist con criterio."
2. O consulta al Orquestador via `sessions_send`: "Necesito la estrategia completa de la campana de [marca] para armar shortlist — insight, objetivos, metodologia, target."
3. Busca en Drive: `gog drive search "estrategia [marca]" --max 5`

**NO avances al paso 2 sin tener la estrategia clara.** Una shortlist sin estrategia es solo una lista de handles.

---

## Paso 2: Definir criterios de filtro

Con base en la estrategia, define los criterios de busqueda:

- **Plataforma**: Instagram, TikTok, YouTube, o combinacion
- **Rango de seguidores**: Nano (<10K), Micro (10-50K), Mid (50-200K), Macro (200K-1M), Mega (>1M)
- **ER minimo**: Segun tipo de campana:
  - Awareness: 1% minimo
  - Conversion: 2-3% minimo
  - Brand Building: Calidad > numeros
- **Ubicacion**: Colombia (ciudad si aplica), LATAM
- **Audiencia target**: Genero, rango de edad, ubicacion de la audiencia
- **Categoria/nicho**: Lifestyle, belleza, fitness, comida, tech, etc.
- **Criterios cualitativos**: Tono, estetica, tipo de contenido

Presenta los criterios al usuario para validacion antes de evaluar perfiles.

---

## Paso 3: Scoring cuantitativo + cualitativo

Para cada perfil que evalues, aplica doble filtro:

### Cuantitativo
- Engagement rate (primer filtro)
- Audiencia real vs falsa
- Alcance (impresiones, followers)
- Demografia de audiencia (% en target)
- Frecuencia de publicacion

### Cualitativo
- Calidad de contenido (estetica, produccion, creatividad)
- Alineacion de valores con la marca
- Tono y estilo — match con el brief
- Autenticidad percibida
- Potencial para ejecutar las ideas de contenido de la campana

### Score final (0-100)
- No es una formula exacta — es un juicio informado que pondera cuantitativo + cualitativo segun el tipo de campana
- Awareness: peso en alcance y volumen
- Conversion: peso en engagement e interaccion
- Brand Building: peso en alineacion y autenticidad

---

## Paso 4: Background check por perfil

Para cada perfil que pase el scoring, realiza background check con Tavily:

```bash
# Polemicas o controversias
mcporter call tavily.tavily-search --args '{"query": "@handle influencer polemica controversia escandalo", "search_depth": "basic", "max_results": 5}'

# Colaboraciones con competencia directa
mcporter call tavily.tavily-search --args '{"query": "@handle colaboracion [marca competidora]", "search_depth": "basic", "max_results": 5}'

# Percepcion general
mcporter call tavily.tavily-search --args '{"query": "@handle influencer Colombia opinion resena", "search_depth": "basic", "max_results": 5}'
```

**Criterios de descarte inmediato**:
- Contenido politico activo
- Contenido para adultos
- Apuestas o gambling
- Colaboracion reciente con competencia directa del cliente
- Escandalo publico sin resolver

Si encuentras algo relevante pero no de descarte, incluyelo en "RIESGO O NOTA" del copy comercial.

---

## Paso 5: Copy comercial por perfil recomendado

Para cada perfil que pase scoring + background check, redacta el copy comercial con el formato de la directiva de Carlos:

```
@handle — [Nombre real si lo tienes]
Seguidores: XXK | ER: X.X% | Plataforma: IG/TikTok
Audiencia: X% Colombia, X% rango de edad target, X% genero target

POR QUE ESTE PERFIL:
[2-3 oraciones que conecten el perfil con la estrategia. No datos sueltos — una narrativa que un comercial pueda copiar y pegar en la propuesta al cliente. Conecta las metricas con el insight, el target, las ideas de contenido.]

RIESGO O NOTA:
[Algo a tener en cuenta — colaboracion reciente con marca similar (no competencia directa), tono que podria necesitar ajuste, frecuencia de publicacion irregular, etc. Si no hay riesgo, omitir esta seccion.]
```

**Regla de oro**: El "POR QUE ESTE PERFIL" debe ser tan claro que un comercial pueda copiarlo directamente en la propuesta al cliente sin editarlo.

---

## Paso 6: Tabla resumen

Despues de todos los perfiles individuales, cierra con una tabla resumen:

```
| # | Perfil | Score | Veredicto | Match con insight |
|---|--------|-------|-----------|-------------------|
| 1 | @perfil1 | 92 | Muy recomendado | [1 linea conectando con insight] |
| 2 | @perfil2 | 85 | Recomendado | [1 linea conectando con insight] |
| 3 | @perfil3 | 78 | Recomendado con nota | [1 linea + nota de riesgo] |
| 4 | @perfil4 | 45 | No recomendado | [razon de descarte] |
```

Incluye perfiles descartados con razon, para que el equipo entienda que fueron evaluados y por que no pasaron.

---

## Paso 7: Criterios de scouting para CM (si aplica)

Si la campana va a requerir que los CMs busquen perfiles adicionales por su cuenta, cierra con una seccion de criterios de scouting:

```
CRITERIOS DE SCOUTING PARA CM:

Buscar en: [Plataforma]
Rango: [Seguidores minimo - maximo]
ER minimo: [X%]
Ubicacion: [Ciudad/Pais]
Nicho: [Categoria]
Tono: [Descripcion del tono deseado]

BUSCAR: [Que caracteristicas priorizar]
EVITAR: [Que categorias o senales descartar]
REFERENCIA: [2-3 perfiles ya aprobados como ejemplo del tipo buscado]
```

---

## Notas

- **Version**: V1.0 — Creado 02-Abr-2026
- **Basado en**: Criterios de Scoring de MNL (discovery), Directiva Carlos 29-Mar-2026 (scouting nivel senior)
- **Dependencias**: Requiere estrategia de campana como input. Si no la tiene, la pide antes de avanzar.
