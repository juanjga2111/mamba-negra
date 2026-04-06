# Playbook Modash — Mamba Negra Latam

**Version**: V1 — basado en input de Carlos (17-Mar-2026)
**Estado**: Pendiente validacion con CMs

> Este documento transforma Modash de un "buscador de influencers" a un **motor de inteligencia de creadores** para la agencia.

---

## 1. Modash como Motor de Inteligencia

Modash NO es solo una herramienta de busqueda. Para MNL, Modash cumple 4 objetivos estrategicos:

| # | Objetivo | Metrica de exito |
|---|----------|-----------------|
| 1 | **Reducir horas de scouting** por campana | De [medir baseline] a -40% en 6 meses |
| 2 | **Bajar tasa de influencers malos** contratados | Menos rechazos post-contratacion |
| 3 | **Subir tasa de exito** en campanas | Mejores metricas de performance |
| 4 | **Acelerar propuestas** con data real | Shortlists mas rapidas y fundamentadas |

> PENDIENTE VALIDACION: Medir baseline de horas actuales de scouting por campana con cada CM

---

## 2. Las 6 Reglas del Playbook MNL

### Regla 1: Definir ICP por Vertical
Antes de buscar, tener claro el **Ideal Creator Profile** de cada vertical. Los perfiles estan en `knowledge/verticals/`.

Minimos por vertical:
- % audiencia en Colombia
- Rango de edad de audiencia
- Engagement Rate minimo
- Tamano del creador (micro/mid/macro)

### Regla 2: Saved Searches por Marca/Industria
Crear y mantener busquedas guardadas en Modash para cada cliente activo y vertical. No empezar de cero cada vez.

- Una saved search por cliente activo
- Una saved search por vertical principal
- Revisar y actualizar trimestralmente

### Regla 3: Score de Seleccion
Cada candidato se evalua con un score basado en los criterios de su vertical (ver `knowledge/verticals/`). Los pesos varian segun vertical y tipo de campana.

Criterios generales:
- Engagement Rate (vs promedio de su tamano)
- % audiencia en Colombia
- Brand fit (alineacion con la marca)
- Red flags (contenido problematico, picos raros, engagement incoherente)

### Regla 4: Lista Maestra de Creadores por Categoria
MNL mantiene un banco propio de creadores — propiedad intelectual de la agencia.

Organizacion:
- Por cliente (Detodito, Doritos, Bivien, Melendez, Bata, Coomeva)
- Por vertical (ver seccion 5 - Creator Library)
- Por formato y tier

### Regla 5: Vetting Obligatorio Antes de Cotizar
NUNCA cotizar un creador que no haya pasado vetting completo. El vetting es el filtro final antes de incluir en shortlist.

Ver seccion 4 (Flujo de Vetting) para el proceso completo.

### Regla 6: Revisar Campanas Activas + Hallazgos
Usar Modash para tracking en tiempo real de campanas activas. Los hallazgos alimentan feedback para el equipo y futuras propuestas.

---

## 3. Checklist Pre-Modash

**OBLIGATORIO** completar antes de abrir Modash. Si no tienes respuesta a estos 8 puntos, no abras la plataforma.

| # | Pregunta | Respuesta |
|---|----------|-----------|
| 1 | **Objetivo de la campana** | Awareness / Consideracion / Trafico / Ventas |
| 2 | **Pais/ciudad foco** | Colombia / ciudad especifica |
| 3 | **Audiencia deseada** | Edad, genero, intereses |
| 4 | **Categoria y tono** | Lifestyle, food, beauty, humor, etc. |
| 5 | **No-go list** | Creadores o categorias prohibidas |
| 6 | **Tamano del creador** | Micro (10-50K) / Mid (50-250K) / Macro (250K+) |
| 7 | **Engagement minimo** | % minimo aceptable |
| 8 | **Numero de creadores buscados** | Cuantos necesitas en shortlist |

> **Fuente**: Brief del cliente + criterios del vertical profile correspondiente

---

## 4. Flujo de Vetting

Despues de la busqueda preliminar en Modash, CADA candidato pasa por este flujo antes de entrar a shortlist:

### Paso 1: Audience Quality / Fake Followers
- Verificar en Modash: porcentaje de audiencia falsa
- Threshold: audiencia falsa debe estar por debajo del umbral del vertical
- Verificar: demografia real de la audiencia (pais, edad, genero)

> PENDIENTE VALIDACION: Definir umbral exacto de fake followers con el equipo (sugerido: <15%)

### Paso 2: Demografia Real
- % audiencia en Colombia (obligatorio que supere minimo del vertical)
- Rango de edad alineado con target de la campana
- Genero alineado con producto/marca

### Paso 3: Historial de Contenido / Brand Fit
- Revisar ultimas 20-30 publicaciones
- Verificar que el contenido es consistente con la marca
- Evaluar calidad visual y narrativa
- Verificar frecuencia de publicacion

### Paso 4: Red Flags
Descalificar inmediatamente si se detecta:
- **Audiencia fuera de Colombia** mayoritariamente (>50% no-CO)
- **Picos raros de seguidores** (compra de followers)
- **Engagement incoherente** (muchos likes, cero comentarios reales)
- **Contenido politico, sexual, apuestas o polemicas**
- **Saturacion de contenido patrocinado** (>50% de posts son ads)

### Decision Final
- **PASA** → Entra a shortlist, puede cotizarse
- **NO PASA** → Documentar razon, no incluir
- **DUDA** → Escalar a Strategy para segunda opinion

---

## 5. Creator Library — Organizacion de Bancos

### Por Cliente
| Cliente | Vertical | CM Responsable |
|---------|----------|----------------|
| PepsiCo (Detodito, Margarita, Doritos) | Consumo Masivo | Tatiana Perdomo, Juan Guillermo |
| Bivien | Belleza | Laura Zapata, Camila Benavides, Isabella Cano |
| Constructora Melendez | Inmobiliario | Laura Criales |
| Bata (+ Bubble Gummers) | Calzado | Laura Criales |
| Grupo Coomeva | Servicios | Juan Guillermo |

### Por Vertical
- **Consumo Masivo** — alcance, cultura pop, repeticion
- **Belleza** — confianza, piel real, tutoriales, credibilidad
- **Inmobiliario** — intencion, confianza, claridad
- **Calzado** — moda, familia, conversion a retail
- **Servicios** — credibilidad, claridad, conversion

Ver perfiles completos en `knowledge/verticals/`

### Por Formato
| Formato | Descripcion | Uso tipico |
|---------|-------------|------------|
| **UGC ads-ready** | Contenido listo para pauta | Conversion, trafico |
| **Storytellers** | Narrativa larga, conexion emocional | Brand building |
| **Humor** | Comedia, sketch, cultura pop | Awareness masivo |
| **Food** | Recetas, reseñas, experiencias gastronomicas | Consumo masivo |
| **Fashion** | Moda, outfits, styling | Calzado, belleza |

### Por Tier
| Tier | Seguidores | Uso tipico |
|------|-----------|------------|
| **Micro** | 10K - 50K | Engagement alto, nicho, conversion |
| **Mid** | 50K - 250K | Balance alcance + engagement |
| **Macro** | 250K+ | Awareness masivo, reach |

### Banco Transversal: "MNL Verified — Colombia"
Solo perfiles que han pasado vetting completo (Seccion 4). Este es el banco premium de la agencia.

Criterios para entrar al banco transversal:
- Vetting completo aprobado
- Al menos 1 campana exitosa con MNL
- Sin red flags en los ultimos 6 meses
- Audiencia verificada CO

---

## 6. Tracking de Campanas en Modash

### Que trackear
| Elemento | Frecuencia | Responsable |
|----------|-----------|-------------|
| **Cronogramas de salidas** | Diario durante campana | CM asignado |
| **Contenidos pendientes de publicar** | Diario durante campana | CM asignado |
| **Performance quick scan** | Semanal | CM + Strategy |
| **Top 3 / Low 3 performers** | Mitad de campana + cierre | Strategy |
| **Data para propuestas e informes** | Al cierre | Strategy + CM |

### Performance Quick Scan
Revision rapida semanal durante campana activa:
1. Que publicaciones salieron vs planificadas
2. Top 3 creadores por engagement
3. Low 3 creadores por engagement
4. Alertas: alguien no publico? Algo se escalo?

---

## 7. Optimizacion de Creditos

Los creditos de Modash son limitados. Reglas para no desperdiciarlos:

| Regla | Descripcion |
|-------|-------------|
| **NO abrir perfiles "por curiosidad"** | Solo abrir cuando cumple filtros minimos del checklist |
| **NO trackear creadores fuera de campana** | Solo trackear creadores activos en campanas actuales |
| **NO desbloquear emails sin vetting** | El email se desbloquea DESPUES del vetting, no antes |
| **Regla de oro** | Solo desbloquear contacto cuando el perfil es "shortlist viable" |

### Flujo de Decision de Creditos
```
Busqueda con filtros → Resultados → Revisar preview (GRATIS)
→ Cumple filtros minimos? → SI → Abrir perfil completo (1 credito)
→ Pasa vetting? → SI → Desbloquear email (1 credito)
→ NO en cualquier paso → No gastar credito
```

---

**Version**: V1 — Input de Carlos (17-Mar-2026)
**Proximo paso**: Validar con CMs asignados a cada vertical. Ajustar pesos y umbrales con datos reales de campanas pasadas.
