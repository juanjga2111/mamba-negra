# TOOLS.md -- Scout Report Worker

## HypeAuditor CLI

### Report completo (1 Analytical Report)

```bash
# Instagram (default)
hypeauditor report @handle --raw

# TikTok
hypeauditor report @handle --platform tiktok --raw
```

El report --raw retorna TODO en JSON:
- brand_safety: 9 categorias + score + mark
- demography: % hombres/mujeres
- demography_by_age: 7 rangos x genero
- audience_geography: paises, estados, ciudades con %
- audience_sentiments: % pos/neutral/neg
- audience_quality: real vs suspicious vs mass followers
- advertising_data.brands_mentions: marcas + conteo + categoria
- er: historico + comparado con cuentas similares
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
