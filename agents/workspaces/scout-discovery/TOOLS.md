# TOOLS.md -- Scout Discovery Worker

## HypeAuditor CLI

Busqueda de influencers por nombre (gratis, sin limite).

### Search (gratis)

```bash
hypeauditor search "pautips"
hypeauditor search "belleza colombia skincare"
hypeauditor search "fitness influencer"
```

Retorna: lista de perfiles con handle, nombre, plataforma, followers.

### Credits check

```bash
hypeauditor credits
```

### Discovery — ACTIVO (desbloqueado 17-Abr-2026)

```bash
hypeauditor discover \
  --platform ig \
  --country co \
  --followers 10000-200000 \
  --er-min 2 \
  --audience-country co --audience-prc 40 \
  --page 1
```

**Cuota (sin resolver — verificar antes de maratones de Discovery)**: el campo `queries_left` arranca en 1000 y decrementa 1 por pagina. La factura del plan dice "Daily limit: 5000 / Monthly limit: 5000". No esta claro si los 5000 son items (a 20 por pagina = 250 paginas) o si `queries_left` es rate limit diario separado. Usa con moderacion hasta confirmar con Paula. Cada pagina = 20 resultados.

**Filtros soportados**: `--platform` (ig/tiktok/youtube/twitter/twitch), `--country`, `--niche`, `--followers`, `--er-min`, `--gender`, `--gender-prc`, `--age`, `--age-prc`, `--audience-country`, `--audience-prc`, `--aqs-min`, `--sort`, `--order`, `--page`.

**Consejo**: Si los resultados tienen poco matching con el brief, refina con `--audience-country co --audience-prc 40` (audiencia al menos 40% CO) antes de subir `--followers` o bajar `--er-min`.

## Tavily (busqueda web para descubrimiento)

```bash
mcporter call tavily.tavily-search --args '{"query": "mejores influencers belleza Colombia 2026", "search_depth": "basic", "max_results": 10}'
```

## Google Workspace (gog -- shortlists pasadas)

```bash
gog drive search "shortlist [marca]" --max 10
gog sheets get <sheetId> "Tab!A1:Z50" --json
```

## NO usar

- `hypeauditor report` -- eso es del worker scout-report, NO tuyo
- `hypeauditor discover` -- NO DISPONIBLE actualmente (code 4)
- No busques en Notion -- no tienes acceso
- No hagas background check -- eso es del worker scout-report
