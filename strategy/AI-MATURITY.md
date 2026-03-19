# AI Maturity Assessment — Mamba Negra Latam

**Version**: V1 (17-Mar-2026)
**Estado**: Estimaciones iniciales — validar con Carlos y el equipo en Semana 1

> **IMPORTANTE**: Los valores de este assessment son estimaciones basadas en el conocimiento actual del proyecto. Deben validarse con el equipo durante la primera semana de discovery.

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

| Dimension | Actual | Target 3m | Target 6m | Target 12m |
|-----------|--------|-----------|-----------|------------|
| Estrategia | 2 | 3 | 4 | 4 |
| Operacion | 1 | 3 | 4 | 5 |
| Contenido | 2 | 2 | 3 | 4 |
| Reporting | 1 | 3 | 4 | 4-5 |
| Cultura | 2 | 3 | 3 | 4 |

---

### Dimension 1: Estrategia

**Actual: 2 (Asistido)**
- Algunos miembros usan ChatGPT/Gemini para redactar textos o buscar ideas
- Los criterios de seleccion de influencers dependen del "ojo clinico" de cada CM
- No hay framework estandarizado por vertical

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

**Actual: 1 (Manual)**
- Tracking en Notion pero actualizado manualmente
- Coordinacion via WhatsApp
- Sin alertas automaticas de atrasos

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

**Actual: 2 (Asistido)**
- Se usa IA para redactar textos puntuales
- Reportes se arman manualmente desde cero cada vez
- No hay templates ni benchmarks automatizados

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

**Actual: 1 (Manual)**
- Reportes se arman en Excel/Docs al final de la campana
- Data se recolecta manualmente de cada red social
- No hay alertas de performance durante campana

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

**Actual: 2 (Asistido)**
- Algunos usan ChatGPT/Gemini por iniciativa propia
- No hay nada sistematizado ni integrado a procesos formales
- IA se percibe como "herramienta extra" no como parte del flujo

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
| Semana 1 | Validar assessment actual con el equipo | Juan Jose + equipo |
| Mes 3 | Primer re-assessment (3m vs baseline) | Juan Jose + Carlos |
| Mes 6 | Segundo re-assessment | Juan Jose + Carlos |
| Mes 12 | Assessment final | Juan Jose + Carlos + equipo completo |

> PENDIENTE VALIDACION: Validar todos los niveles actuales con Carlos y el equipo en Semana 1. Los valores pueden cambiar segun la realidad del equipo.
