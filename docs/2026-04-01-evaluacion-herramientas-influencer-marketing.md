# Evaluacion de Herramientas para Scouting y Background Check de Influencers

**Fecha**: 1 de Abril, 2026
**Preparado por**: Juan Jose — AI Strategy Lead, Mamba Negra Latam
**Para**: Carlos (CG) — Director General
**Proposito**: Evaluar herramientas de influencer marketing para optimizar costos, mejorar el proceso de scouting y automatizar el Background Check (BGC)

---

## 1. CONTEXTO

Carlos propuso evaluar un conjunto de herramientas (extensiones Chrome, plataformas SaaS, herramientas open source) como alternativas a Modash ($16,000 USD/ano) para dos necesidades principales:

1. **Scouting y metricas de influencers**: Buscar perfiles, ver demographics (% hombres/mujeres, edad, ubicacion), engagement, fake followers
2. **Background Check (BGC)**: Verificar que influencers no tengan contenido politico, sexual, escandalos o problemas de reputacion antes de proponerlos a clientes

Adicionalmente, se evaluo la posibilidad de **automatizar estos procesos con IA** para reducir horas manuales del equipo.

---

## 2. HERRAMIENTAS EVALUADAS

### 2.1 Extensiones Chrome (uso manual por el CM)

Las extensiones Chrome son herramientas que el CM instala en su navegador y activa al visitar un perfil de influencer. Son utiles para verificacion rapida pero **NO pueden ser usadas por agentes de IA ni automatizadas**.

#### GRIN Chrome Extension — Gratis
- **Que hace**: Muestra engagement rate, likes promedio, comments, video views, ratio likes:comments, y email del creador
- **Plataformas**: Instagram, TikTok, YouTube, Pinterest
- **Limitacion**: No muestra demographics de audiencia (genero, edad, ubicacion)
- **Veredicto**: Util como herramienta complementaria del CM para ver engagement rapido. No reemplaza nada por si sola.

#### Influencer Hero Chrome Extension — Gratis (15 busquedas/dia)
- **Que hace**: Engagement rate, % de fake followers, tendencia de crecimiento, ubicacion de audiencia, distribucion por genero y edad, EMV estimado
- **Plataformas**: Instagram, TikTok, YouTube
- **Limitacion**: Sin API. Los datos se ven solo en el navegador, uno por uno.
- **Veredicto**: **La mejor extension gratuita del mercado.** Da demographics que GRIN no da. Recomendada como herramienta de verificacion manual para el equipo.

#### HypeAuditor Chrome Extension — Gratis
- **Que hace**: Engagement rate, follower count, audience quality basico
- **Plataformas**: Instagram, TikTok, YouTube
- **Limitacion**: La extension gratis **NO** incluye Brand Safety ni los 9 flags de BGC. Esas funciones son exclusivas de los reportes avanzados de la plataforma paga.
- **Veredicto**: Similar a GRIN. No agrega valor diferencial sobre Influencer Hero.

**Recomendacion extensiones**: Instalar **Influencer Hero** como herramienta estandar del equipo. Es gratis, da la mayor cantidad de datos, y complementa cualquier plataforma paga.

---

### 2.2 Herramientas Web Gratuitas

#### Countik (countik.com) — Gratis
- **Que hace**: Analisis basico de perfiles publicos de TikTok (followers, views, likes, engagement rate, hashtags)
- **Limitacion**: Solo TikTok. No muestra demographics. Sin API.
- **Veredicto**: Util para un vistazo rapido de un TikToker antes de gastar creditos en una plataforma paga. Mantener como herramienta puntual.

---

### 2.3 Herramientas Open Source (GitHub)

#### social-analyzer (github.com/qeeqbox/social-analyzer) — Gratis
- **Que hace**: Busca un username en +1,000 redes sociales y retorna URLs de perfiles encontrados, metadatos y un confidence score
- **Modo**: CLI + API de Python + Web App
- **Mantenimiento**: Activo (897 commits, ultima actividad enero 2026)
- **Utilidad para BGC**: Excelente como **Capa 1 de verificacion** — confirma en que plataformas existe el influencer (consistencia de identidad, detecta cuentas secundarias)
- **Limitacion**: No analiza el CONTENIDO de los perfiles, solo encuentra donde existen
- **Automatizable con IA**: SI. Se puede instalar en servidor y ejecutar programaticamente.

#### Jannah58/Social-Media-Analysis — Descartar
- Proyecto academico abandonado (ultimo commit mayo 2023). No es una herramienta usable.

#### anujeshify / Adiiiicodes — No verificados
- No se encontraron repositorios relevantes de influencer marketing bajo estos nombres. Posiblemente repos privados o nombres incorrectos.

**Recomendacion open source**: Integrar **social-analyzer** como primera capa del flujo de BGC automatizado. Es gratuito, confiable, y puede ser ejecutado por los agentes de IA.

---

### 2.4 Plataformas SaaS con Suscripcion

#### Brand24 — $99-$499/mes
- **Que hace**: Social listening — monitorea menciones de una persona o marca en +25M fuentes (redes sociales, noticias, blogs, foros)
- **API**: Si (desde plan Team $179/mes)
- **Utilidad para BGC**: Potencialmente util para detectar escandalos y controversias publicas. Rastrea lo que OTROS dicen sobre el influencer. No analiza el contenido propio del influencer.
- **Veredicto**: Interesante pero **demasiado caro** para el uso especifico de BGC esporadico de MNL. No recomendado como primera opcion.

#### Hootsuite — $99-$399/mes por usuario
- **Que hace**: Gestion de redes sociales (scheduling, publishing, analytics de cuentas propias)
- **Veredicto**: **No aplica.** MNL no gestiona las cuentas de los influencers, gestiona campanas. No tiene utilidad para scouting ni BGC.

---

## 3. PLATAFORMAS PRINCIPALES EVALUADAS EN PROFUNDIDAD

### 3.1 HypeAuditor

**Probamos el sandbox de la API** con credenciales proporcionadas por Paula (asesora comercial).

#### Que descubrimos:
La API de HypeAuditor retorna el **reporte mas completo del mercado** para un influencer:

| Dato | Disponible | Detalle |
|------|-----------|---------|
| Demographics de audiencia (genero) | SI | % hombres y % mujeres exacto |
| Demographics por edad | SI | Rangos: 13-17, 18-24, 25-34, 35-44, 45-54, 55-64, 65+ |
| Geografia de audiencia | SI | Paises, estados, ciudades con % |
| Fake followers | SI | % real, sospechoso, influencers, mass followers |
| Autenticidad de audiencia | SI | Score numerico vs promedio del mercado |
| Engagement rate | SI | Con historico y performance |
| **Brand Safety (BGC)** | **SI** | **9 flags automaticos: alcohol, sentiment negativo, crimen, toxico, ofensivo, sexual, religion, politica, pranks** |
| **Sentiment de audiencia** | **SI** | % positivo, neutral, negativo |
| **Menciones de marcas** | **SI** | Lista de marcas mencionadas con conteo y categoria |
| Etnicidad de audiencia | SI | African, Asian, Caucasian, Hispanic, Indian, Arabian |
| Ingresos de audiencia | SI | Distribucion por rangos de ingreso |
| Intereses de audiencia | SI | Categorias de interes |
| Precios estimados | SI | Post y stories |
| Contacto | SI | Emails y telefonos |
| Audience Quality Score | SI | Score de 0-100 |

#### Mapeo directo al BGC de MNL:

| Criterio BGC (Excel Tira & Gana) | Campo API HypeAuditor | Automatizado? |
|-----------------------------------|----------------------|---------------|
| Escandalos / Contenido inapropiado | `brand_safety.items` (9 flags) | SI |
| Competencia (marcas rivales) | `advertising_data.brands_mentions` | SI |
| Posiciones politicas | `brand_safety.items.politics` | SI |
| Sentiment positivo | `audience_sentiments` (% positivo/negativo) | SI |

**Los 4 criterios del BGC se cubren con un solo llamado a la API.**

#### Planes y precios:

| Plan | Mensual | Anual (25% dto) | Reportes avanzados | Discovery | API |
|------|---------|-----------------|-------------------|-----------|-----|
| Starter Discovery | $449/mes | $337/mes ($4,041/ano) | 100 | SI (web) | NO |
| Starter Full | $514/mes | $386/mes ($4,626/ano) | 200 | SI (web) | NO |
| Pro | $999/mes | $749/mes ($8,991/ano) | 300 | SI (web) | "A peticion" |

**Limitacion critica**: La API (para automatizacion con IA) solo esta disponible en el plan Pro ($999/mes) y requiere solicitud especial. En los planes Starter, todo se hace desde la plataforma web manualmente.

**Pendiente**: Respuesta de Paula sobre disponibilidad de API en planes menores.

---

### 3.2 Influencers Club

**Probamos la API directamente** con una cuenta de trial (10 creditos gratuitos). La API esta funcional y verificada.

#### Que descubrimos:

| Dato | Disponible | Detalle |
|------|-----------|---------|
| Discovery con AI search | SI | Texto libre ("fitness Colombia"), 340M+ creators |
| Engagement rate | SI | Con promedios y medianas |
| Fake followers / Credibilidad | SI | % real, suspicious, mass followers, influencers |
| Reels analytics | SI | Views, likes, comments promedio |
| Growth tracking | SI | Crecimiento a 3, 6, 9, 12 meses |
| Income estimado | SI | Min-Max por post |
| Posts recientes | SI | Ultimos 12 con engagement individual |
| Hashtags y locations | SI | Top hashtags y ubicaciones geotagged |
| Lookalike search | SI | Encontrar influencers similares |
| Batch enrichment | SI | Enriquecer listas masivas via CSV |
| **API incluida en plan Pro** | **SI** | Con integracion nativa n8n, Zapier, HubSpot |
| Demographics de audiencia | **NO** | No retorna edad, genero, ni ubicacion de seguidores |
| Brand Safety / BGC | **NO** | Sin flags de contenido inapropiado |
| Campaign tracking | **NO** | No tiene modulo de campanas |
| Historial de marcas | **NO** | No muestra colaboraciones pasadas con marcas |

#### Cobertura Colombia (verificada):
- "belleza Colombia" en Instagram: **6,457 resultados**
- "health wellness Colombia" en Instagram: **67,574 resultados**

#### Planes y precios (con 1,000 creditos):

| Plan | Mensual | Creditos | Precio/credito | Profile Views | API |
|------|---------|----------|---------------|---------------|-----|
| Starter | $320/mes | 1,000 | $0.32 | 1,000 | NO |
| **Pro** | **$479/mes** | **1,000** | **$0.48** | **4,000** | **SI** |
| Agency | Custom | Custom | Custom | Custom | SI |

#### Costos por operacion (API):
| Operacion | Creditos | Costo real ($0.48/cr) |
|-----------|----------|----------------------|
| Discovery (busqueda) | 0.03-0.10 | $0.01-$0.05 |
| Perfil basico (Raw) | 0.03 | $0.01 |
| Perfil completo (Full) | 1.00 | $0.48 |
| Discovery API (por perfil listado) | 0.01 | $0.005 |

**Costo estimado por scouting completo**: ~5.1 creditos ($2.45 USD) = 1 discovery + 5 enrich completos

---

## 4. COMPARACION FINAL: HYPEAUDITOR vs INFLUENCERS CLUB

| Criterio | HypeAuditor Starter Disc. | Influencers Club Pro |
|----------|--------------------------|---------------------|
| **Precio mensual** | $449 | $479 |
| **Precio anual** | $337/mes ($4,041/ano) | Sin descuento visible |
| **Discovery** | SI (web) | SI (web + API) |
| **Base de datos** | 205M+ creators | 340M+ creators |
| **Demographics audiencia** | **SI (completo)** | **NO** |
| **Brand Safety / BGC** | **SI (9 flags)** | **NO** |
| **Sentiment analysis** | **SI** | **NO** |
| **Menciones de marcas** | **SI (detallado)** | **NO** |
| **API incluida** | **NO** (solo Pro $999) | **SI** |
| **Integracion n8n** | **NO** | **SI (nativa)** |
| **Credibilidad audiencia** | SI | SI |
| **Income estimado** | SI | SI |
| **Growth tracking** | SI | SI |
| **Reels analytics** | SI | SI |
| **Lookalike search** | SI | SI |
| **Social Listening** | SI | NO |
| **AI Scout** | SI (5 creditos) | SI (AI search) |
| **Seats** | 2 | Ilimitados |
| **Reportes avanzados/mes** | 100 | 1,000 creditos (flexible) |

### Resumen:
- **HypeAuditor gana en profundidad de datos**: Demographics, brand safety, sentiment, brand mentions. Es la unica plataforma que automatiza el BGC completo.
- **Influencers Club gana en automatizacion**: API incluida, integracion n8n, mas creditos, seats ilimitados, base de datos mas grande.

---

## 5. OPCIONES ESTRATEGICAS PARA MNL

### Opcion A: Solo HypeAuditor Starter Discovery — $449/mes ($337 anual)

**Para quien**: El equipo humano (Carlos, Mar, Lina) usa la plataforma web.

| Ventaja | Desventaja |
|---------|-----------|
| Todo en una plataforma | Sin API (todo manual desde web) |
| BGC automatizado en reportes | No se puede integrar con agentes IA ni n8n |
| Demographics completos | Maximo 2 usuarios |
| 100 reportes avanzados/mes | Si necesitan mas de 100, hay que subir de plan |

**Mejor para**: Si la prioridad es reemplazar Modash con una herramienta mas barata y completa, y el equipo esta dispuesto a trabajar manualmente desde la plataforma.

---

### Opcion B: Solo Influencers Club Pro — $479/mes

**Para quien**: Automatizacion con IA + equipo humano.

| Ventaja | Desventaja |
|---------|-----------|
| API incluida para agentes IA | Sin demographics de audiencia |
| Integracion nativa con n8n | Sin brand safety / BGC automatizado |
| 1,000 creditos flexibles | El equipo tendria que hacer BGC manualmente |
| Seats ilimitados | |
| Base de datos mas grande (340M+) | |

**Mejor para**: Si la prioridad es la automatizacion del scouting con IA y se acepta hacer el BGC manualmente como hasta ahora.

---

### Opcion C (Recomendada): HypeAuditor + Influencers Club complementarios

**Uso diferenciado**:
- **Influencers Club Pro ($479/mes)**: Discovery masivo + API para agentes IA + scouting automatizado via n8n
- **HypeAuditor Starter Discovery ($449/mes)**: Reportes avanzados con demographics + BGC de los finalistas (10-20 perfiles/campana)

| Concepto | Costo |
|----------|-------|
| Influencers Club Pro | $479/mes |
| HypeAuditor Starter Discovery | $449/mes ($337 con plan anual) |
| **Total** | **$816-$928/mes** |

**vs Modash solo**: $1,333/mes ($16,000/ano) — **ahorro del 30-38%**

**Flujo de trabajo**:
```
1. Brief de campana llega
2. Agente IA usa Influencers Club API → Discovery → lista de 50-100 candidatos
3. IA filtra top 15-20 por engagement y credibilidad (Influencers Club Full Enrich)
4. Equipo humano abre los top 10 en HypeAuditor → ve demographics + BGC completo
5. Entrega al cliente: shortlist de 5 con BGC aprobado
```

**Ventaja**: Lo mejor de ambos mundos. El discovery masivo y la automatizacion vienen de Influencers Club. La profundidad analitica y el BGC vienen de HypeAuditor. Se usan 10-15 reportes avanzados de HypeAuditor por campana (maximo), lo cual cabe en los 100/mes del plan Starter.

---

### Opcion D: Solo HypeAuditor Pro — $999/mes ($749 anual)

Incluiria todo (API "a peticion" + BGC + demographics), pero el costo es mayor y no esta confirmado que la API este realmente incluida sin sobrecosto. **No recomendada hasta confirmar con Paula.**

---

## 6. HERRAMIENTAS GRATUITAS COMPLEMENTARIAS (para todas las opciones)

Independientemente de la plataforma principal, estas herramientas se pueden usar sin costo:

| Herramienta | Uso | Costo |
|-------------|-----|-------|
| **Influencer Hero** (extension Chrome) | Verificacion rapida de demographics por el CM | Gratis |
| **social-analyzer** (open source) | Capa 1 del BGC — encontrar TODOS los perfiles sociales de un influencer | Gratis |
| **Countik** (web) | Vistazo rapido de engagement en TikTok | Gratis |
| **GRIN** (extension Chrome) | Backup para engagement y email de contacto | Gratis |

---

## 7. HERRAMIENTAS DESCARTADAS

| Herramienta | Razon |
|-------------|-------|
| Hootsuite ($99-399/mes) | No aplica — es gestion de redes propias, no scouting de influencers |
| Brand24 ($99-499/mes) | Demasiado caro para uso esporadico de BGC |
| Jannah58 (GitHub) | Proyecto academico abandonado (2023) |
| anujeshify / Adiiiicodes | No verificados — pedir contexto a Carlos |

---

## 8. RECOMENDACION FINAL

**Opcion C** (HypeAuditor + Influencers Club) es la mas completa, pero depende del presupuesto.

**Si hay que elegir solo una**:
- Prioridad BGC/calidad de datos → **HypeAuditor Starter Discovery** ($449/mes, $337 anual)
- Prioridad automatizacion/volumen → **Influencers Club Pro** ($479/mes)

**Proximos pasos**:
1. Esperar respuesta de Paula (HypeAuditor) sobre API en planes Starter y trial gratuito
2. Decidir si el BGC automatizado justifica pagar HypeAuditor ademas de Influencers Club
3. Si se elige Opcion C: activar Influencers Club Pro primero (ya tenemos API testeada y funcionando) y contratar HypeAuditor anual para maximizar el descuento del 25%

---

**Fin del reporte**
