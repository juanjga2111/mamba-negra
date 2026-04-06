# Criterios de Scoring de Influencers — Mamba Negra

**Version**: V1 — Enriquecido con input de Carlos (17-Mar-2026), pendiente validacion de umbrales exactos con CMs

> Los criterios cualitativos y de brand safety estan confirmados. Los umbrales cuantitativos (porcentajes exactos) se definen en Sesion 2 de discovery con cada CM.
> Para criterios especificos por vertical, ver `knowledge/verticals/`.

---

## CRITERIOS CUANTITATIVOS

Umbrales numericos para evaluacion de influencers. Los porcentajes exactos se definen por vertical y se validan con CMs en discovery.

| Metrica | Umbral Minimo | Umbral Maximo | Nota |
|---------|---------------|---------------|------|
| **Engagement Rate** | Varia por vertical y tamano | - | Comentarios + Likes + Shares / Followers. Evaluar ER sano vs tamano (no obsesionarse con % absoluto). |
| **Audiencia Falsa** | - | Por definir (sugerido <15%) | Medido en Modash — Audience Quality Score. Verificacion obligatoria en vetting. |
| **% Audiencia Colombia** | Varia por vertical | - | Critico para todas las verticales. Inmobiliario requiere audiencia local (ciudad). |
| **Seguidores Minimos** | Por tier: Micro 10K, Mid 50K, Macro 250K | - | Depende del objetivo de campana. |
| **Frecuencia de Publicacion** | >3 posts/semana (sugerido) | - | Influencers inactivos no generan confianza. |
| **Alcance Promedio** | Por definir | - | Util para campanas de awareness. |
| **Crecimiento de Audiencia** | Organico estable | Picos sospechosos = red flag | Verificar en Modash. Picos raros = posible compra de seguidores. |

> PENDIENTE VALIDACION: Definir umbrales exactos por vertical con cada CM asignado

**Fuente de datos**: Modash (metricas cuantitativas, audience quality, fake follower rate), revision manual de perfiles, verticals/ (criterios por vertical).

---

## CRITERIOS CUALITATIVOS

Estos criterios NO se miden con numeros — requieren evaluacion manual del contenido del influencer.

### 1. Alineacion de Valores
- El influencer comparte valores con la marca del cliente?
- Su audiencia es afin al target de la campana?
- Ha trabajado con competidores directos? (puede ser positivo o negativo segun contexto)

### 2. Tono y Estetica
- El estilo de contenido (formal, casual, humor, educativo) calza con la marca?
- La calidad visual (fotografia, edicion, iluminacion) es consistente?

### 3. Historial de Colaboraciones
- Ha hecho campanas con marcas similares?
- Las colaboraciones pasadas se ven organicas o forzadas?
- Cuantas marcas promociona por mes? (saturacion de contenido patrocinado)

### 4. Calidad de Contenido
- El influencer cuenta historias o solo publica fotos?
- El engagement en comentarios es real (conversaciones) o superficial (emojis)?
- Publica contenido evergreen o solo tendencias del momento?

---

## BRAND SAFETY — CATEGORIAS RECHAZADAS

**CONFIRMADO** por Carlos (17-Mar-2026). Categorias de rechazo absoluto:

- [x] **Contenido politico** — Candidatos, partidos, ideologias divisivas
- [x] **Contenido sexual** — Explicitamente sexual, desnudos, plataformas adultas
- [x] **Apuestas y casinos** — Promocion de juegos de azar
- [x] **Polemicas** — Controversias publicas, cancelaciones, escandalos recientes
- [ ] **Pseudociencia** — Productos milagro, anti-vacunas, dietas extremas (especialmente critico para vertical Belleza)
- [ ] **Drogas y alcohol** — Promocion excesiva o normalizacion de sustancias
- [ ] **Violencia o discurso de odio** — Lenguaje ofensivo, discriminacion

### No-Go List (de Carlos)
Rechazar INMEDIATAMENTE creadores asociados con:
- Polemicas publicas activas
- Contenido sexual explicito
- Posiciones politicas polarizantes
- Apuestas o juegos de azar

### Red flags en revision de perfil
- Controversias publicas recientes (cancelaciones, escandalos)
- Comentarios toxicos en su comunidad (audiencia agresiva, hate speech)
- Cambios bruscos de nicho (indica falta de autenticidad)
- **Picos raros de seguidores** (compra de followers — verificar en Modash)
- **Engagement incoherente** (muchos likes pero cero comentarios reales)
- **Audiencia mayoritariamente fuera de Colombia** (>50% no-CO)

### Criterios por Vertical
Para criterios especificos de brand safety por vertical (ej: claims de salud en Belleza, brand safety extremo en Servicios), ver `knowledge/verticals/`.

---

## SCORING POR TIPO DE CAMPANA

La importancia de cada criterio cambia segun el objetivo de la campana:

### Awareness (Alcance Maximo)
**Prioridad**: Seguidores, Alcance Promedio, Frecuencia de Publicacion
**Secundario**: Engagement Rate, Calidad de Contenido
**Menor peso**: Alineacion de Valores (si la marca es mass market)

### Conversion (Accion Directa)
**Prioridad**: Engagement Rate, Calidad de Contenido, Autenticidad
**Secundario**: Alcance, Seguidores
**Menor peso**: Frecuencia de Publicacion

### Brand Building (Valores y Reputacion)
**Prioridad**: Alineacion de Valores, Calidad de Contenido, Historial de Colaboraciones
**Secundario**: Engagement Rate
**Menor peso**: Alcance (puede ser micro-influencer con audiencia hiper-relevante)

---

## NOTAS TECNICAS

### Donde se Obtienen los Datos

- **Modash**: Metricas cuantitativas (engagement, audiencia falsa, crecimiento)
- **Revision manual de perfil**: Criterios cualitativos (tono, calidad, alineacion)
- **Google Sheets de campanas pasadas**: Historial de colaboraciones exitosas (benchmark interno)

### Como Usa Esto el Agente Estratega

Cuando el equipo pregunta: "Este influencer sirve para campana de [cliente]?", el agente:
1. Revisa metricas cuantitativas (si estan disponibles en Modash o Sheet)
2. Aplica criterios cualitativos segun contexto (brief del cliente, tipo de campana)
3. Valida brand safety (busca red flags en contenido reciente)
4. Retorna recomendacion fundamentada: "SI — engagement alto y alineado con valores" o "NO — audiencia falsa supera umbral"

---

**Version**: V1 — Enriquecido con input de Carlos (17-Mar-2026), pendiente validacion de umbrales cuantitativos con CMs
**Cambios V1**: Brand safety confirmado, no-go list agregada, red flags ampliados, referencia a verticals/, metricas Modash agregadas
