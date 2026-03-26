# AI Maturity Assessment — Mamba Negra Latam

**Version**: V2 (26-Mar-2026) — Baseline validado con discovery real
**Estado**: Baseline confirmado con encuesta a 5 miembros del equipo + documentos de Strategy team

> **ACTUALIZADO 26-Mar-2026**: Baseline validado con data real de encuesta Discovery + Baseline (5 respuestas, 24-25 Mar) y Strategy Team WorkFlow (documento oficial de la estratega). Ver `adoption/DISCOVERY-FINDINGS.md` para analisis completo.

---

## Escala de Madurez IA (1-5)

| Nivel | Nombre | Descripcion |
|-------|--------|-------------|
| 1 | **Manual** | Todo se hace a mano, sin IA |
| 2 | **Asistido** | IA se usa puntualmente (ChatGPT para textos, busquedas basicas) |
| 3 | **Integrado** | IA esta en el proceso formal (agentes activos, workflows definidos) |
| 4 | **Optimizado** | IA mejora metricas medibles vs el proceso manual |
| 5 | **Autonomo** | IA opera con supervision minima, el equipo gestiona excepciones |

---

## Assessment por Dimension

### Tabla Resumen

| Dimension | Baseline (26-Mar) | Target 3m | Target 6m | Target 12m |
|-----------|-------------------|-----------|-----------|------------|
| Estrategia | 2 | 3 | 4 | 4 |
| Operacion | 1 | 3 | 4 | 5 |
| Contenido | 2.5 | 3 | 3.5 | 4 |
| Reporting | 1 | 3 | 4 | 4-5 |
| Cultura | 2.5 | 3 | 3.5 | 4 |

---

### Dimension 1: Estrategia

**Baseline: 2 (Asistido)** — Confirmado 26-Mar-2026
- Strategy team usa Perplexity Pro sistematicamente para investigacion (Answer The Public, Google Trends, Reddit, TikTok)
- Strategy team tiene banco de prompts organizado en Notion
- CMs usan ChatGPT/Gemini ad-hoc para copies e ideas creativas
- Criterios de evaluacion de influencers varian por CM (solo CG tiene ER minimo fijo: 1%)
- 4 metodologias de campana documentadas (RAYO/ARCO/PRISMA/MAREA) pero no integradas con IA

**Target 3m: 3 (Integrado)**
- Estratega bot operativo y siendo usado por el equipo
- Perfiles por vertical definidos y cargados en knowledge base
- Checklist pre-Modash estandarizado en uso

**Target 6m: 4 (Optimizado)**
- Shortlists generadas por IA con scoring automatico por vertical
- Propuestas estrategicas con borrador asistido por Estratega bot
- KPIs sugeridos basados en tipo de campana y vertical

**Target 12m: 4**
- Sistema consolidado, mejoras incrementales basadas en data de campanas

---

### Dimension 2: Operacion

**Baseline: 1 (Manual)** — Confirmado 26-Mar-2026
- Notion existe pero solo 2/5 CMs lo usan activamente (Juan Guillermo, Laura)
- Coordinacion 100% via WhatsApp + reuniones presenciales
- Sin alertas automaticas de atrasos
- CMs reportan no saber que hacen los otros CMs ("no sabemos que hace el otro" — CG, Juan Guillermo)
- Tiempos promedio: scouting ~2 dias, reporte ~1 dia, >8h/semana en tareas repetitivas

**Target 3m: 3 (Integrado)**
- PM bot gestionando cronogramas via Notion
- Alertas automaticas de atrasos y solapamientos
- Daily digest de campanas activas

**Target 6m: 4 (Optimizado)**
- Reduccion medible de tiempo en gestion operativa
- PM bot proactivo: sugiere asignaciones por carga, detecta conflictos
- Pipeline visual de aprobaciones con SLAs

**Target 12m: 5 (Autonomo)**
- PM bot opera con supervision minima en gestion de rutina
- El equipo interviene solo en excepciones y decisiones estrategicas

> NOTA: Operacion parte de nivel 1 pero tiene el mayor potencial de avance porque el PM bot ya esta desplegado con Notion + Google Workspace conectados.

---

### Dimension 3: Contenido

**Baseline: 2.5 (Asistido+)** — Ajustado al alza 26-Mar-2026
- 5/5 usan IA para copies y textos (3 diariamente)
- Strategy team tiene banco de prompts organizado por herramienta y tarea en Notion
- Strategy team usa principios sistematicos de prompt engineering (contexto, audiencia, punto de vista experto, region, seguimiento)
- Reportes se arman manualmente (60-80% copy-paste para 3/5)
- Strategic Thinkings siguen estructura consistente (Target > Insight > Concepto > Propositions)
- No hay templates automatizados ni benchmarks, pero si templates manuales reutilizados

**Target 3m: 2 (se mantiene)**
- Foco en Meses 1-3 esta en operacion y estrategia, contenido avanza despues
- Se documentan patrones de campanas exitosas en knowledge base

**Target 6m: 3 (Integrado)**
- Templates de reportes pre-llenados con data real
- Insights automaticos de performance (top/low performers)
- Propuestas con benchmarks de campanas similares

**Target 12m: 4 (Optimizado)**
- Generacion de insights post-campana automatica
- Comparacion automatica con campanas historicas similares
- Draft de reportes con narrativa generada por IA

---

### Dimension 4: Reporting

**Baseline: 1 (Manual)** — Confirmado 26-Mar-2026
- Reportes se arman en Excel/Sheets al final de la campana (4-8h promedio)
- Composicion: 60-80% copy-paste de metricas, poco analisis propio (3/5 reportan)
- Data recolectada manualmente de cada red social + pedir a cada influencer (10 dias post-publicacion)
- Metricas rastreadas: Alcance, Impresiones, ER (5/5), CPM (3/5), Sentiment (3/5)
- Graficacion del informe final delegada a equipo de diseno (cuello de botella adicional)
- No hay alertas de performance durante campana
- Responder "como va la campana" toma 5-30 minutos (buscar en multiples fuentes)

**Target 3m: 3 (Integrado)**
- PM bot consolida datos de Notion + Modash
- Primer reporte asistido por IA generado
- Alertas tempranas de bajo rendimiento

> NOTA: Reporting arranca con target 3 a 3 meses porque el PM bot ya tiene conexion a Notion y Google Sheets — la infraestructura esta lista.

**Target 6m: 4 (Optimizado)**
- Reportes semi-automaticos con data consolidada
- Dashboard de campanas activas accesible al equipo
- Reduccion de -50% en tiempo de armado de reportes

**Target 12m: 4-5**
- Reportes generados automaticamente, humano valida y ajusta visual
- Data recolectada en tiempo real

---

### Dimension 5: Cultura

**Baseline: 2.5 (Asistido+)** — Ajustado al alza 26-Mar-2026
- **100% del equipo** usa IA (no "algunos"): 3/5 diariamente, 2/5 varias veces por semana
- Comodidad promedio con IA: **3.8/5** (Juan Guillermo: 5, Tatiana y Camila: 4, CG y Laura: 3)
- **5/5 ven IA como "herramienta del dia a dia"** (nadie la ve como amenaza o distraccion)
- Strategy team tiene enfoque sistematico: banco de prompts, principios de prompt engineering
- Sin embargo, no hay nada integrado formalmente al proceso de campana — el uso es por iniciativa propia
- **Zero resistencia cultural** — la barrera no es adopcion, es integracion

**Target 3m: 3 (Integrado)**
- 80% del equipo usa agentes semanalmente
- Workshop de onboarding completado
- Equipo sabe cuando y como usar cada agente

**Target 6m: 3 (se mantiene)**
- Consolidacion del habito
- Feedback continuo del equipo alimenta mejoras

**Target 12m: 4 (Optimizado)**
- Equipo propone mejoras y nuevos casos de uso
- Mentalidad de innovacion continua
- IA es parte natural del trabajo, no "algo extra"

---

## Proceso de Re-Assessment

| Cuando | Que hacer | Quien |
|--------|-----------|-------|
| Semana 1 | ~~Validar assessment actual con el equipo~~ COMPLETADO 26-Mar-2026 via encuesta | Juan Jose + equipo |
| Mes 3 | Primer re-assessment (3m vs baseline) | Juan Jose + Carlos |
| Mes 6 | Segundo re-assessment | Juan Jose + Carlos |
| Mes 12 | Assessment final | Juan Jose + Carlos + equipo completo |

> VALIDADO 26-Mar-2026: Baseline confirmado con encuesta a 5 miembros del equipo + documentos de Strategy team. Contenido y Cultura ajustados al alza (de 2 a 2.5). Promedio real: 1.8 (vs 1.6 estimado). Pendiente: validar con Carlos.
