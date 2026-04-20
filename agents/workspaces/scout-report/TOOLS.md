# TOOLS.md -- Scout Report Worker

## HypeAuditor CLI (v2 con cache local 30d)

### Report completo

```bash
# Primera vez (1 credito, guarda cache automatico 30d)
hypeauditor report @handle --raw

# Si el perfil ya se analizo en los ultimos 30 dias, releer del cache (0 creditos)
hypeauditor report @handle --raw --cached

# Forzar llamada nueva a API (1 credito, actualiza cache)
hypeauditor report @handle --raw --force

# TikTok
hypeauditor report @handle --platform tiktok --raw
```

**CHECKPOINT antes de gastar credito**: corre `hypeauditor network --limit 100` (gratis) para ver si el perfil ya esta en My Network. Si esta unlocked, usa `--cached` en lugar de llamada nueva.

El report --raw retorna TODO en JSON:
- brand_safety: 9 categorias + score + mark
- demography: % hombres/mujeres
- demography_by_age: 7 rangos x genero
- audience_geography: paises, estados, ciudades con %
- audience_sentiments: % pos/neutral/neg
- audience_quality: real vs suspicious vs mass followers
- advertising_data.brands_mentions: marcas + conteo + categoria
- er: historico + comparado con cuentas similares + blogger_rankings (ranking por categoria)
- aqs + aqs_name + aqs_description: audience quality score con interpretacion
- blogger_categories + top3_blogger_topics: categorias recomendadas con nivel
- est_post_price: rango estimado
- growth: anomalias + historico
- audience_ethnicity, audience_income, audience_education, audience_marital_status

### Media cacheado (0 creditos adicionales, solo post-unlock)

Despues de correr `report`, el perfil queda unlocked. Podes pedir sus posts/reels cacheados sin costo extra:

```bash
hypeauditor media @handle                # Default: top 10 recientes
hypeauditor media @handle --limit 0      # Todos los cacheados
hypeauditor media @handle --raw          # JSON completo
```

Retorna por post: fecha, tipo, shortcode, likes_count, comments_count, video_views_count, er, er_mark, caption. Util para validar ER reciente contra el ER promedio del report y detectar caidas o picos.

### PDF oficial de HypeAuditor (0 creditos si perfil unlocked)

Para entregar al cliente/CM como primera aprobacion, si te lo piden:

```bash
hypeauditor pdf @handle --platform ig
hypeauditor pdf @handle --platform tiktok
```

Async — puede tardar 1-2 minutos. Retorna URL del CDN de HA. Solo usar si el task explicitamente lo pide.

### Credits check

```bash
hypeauditor credits
```

## Tavily (Background Check)

```bash
# Polemicas
mcporter call tavily.tavily-search --args '{"query": "@handle influencer polemica controversia escandalo", "search_depth": "basic", "max_results": 5}'

# Competencia
mcporter call tavily.tavily-search --args '{"query": "@handle colaboracion [marca_competidora]", "search_depth": "basic", "max_results": 5}'

# Percepcion
mcporter call tavily.tavily-search --args '{"query": "@handle influencer Colombia opinion", "search_depth": "basic", "max_results": 5}'
```

## NO usar

- `hypeauditor discover` o `hypeauditor search` — eso es scout-discovery
- No busques mas perfiles — tu trabajo es analizar UNO a fondo
- No descargues videos — eso es scout-video
