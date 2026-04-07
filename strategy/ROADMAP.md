# Roadmap — Transformacion IA de Mamba Negra Latam

**Version**: V3 (07-Abr-2026)
**Estado**: Actualizado con progreso real al 07-Abr-2026

---

## FASE 1: CIMIENTOS (Meses 1-3 / Marzo-Mayo 2026)

### Mes 1: Diseno + Discovery + Knowledge (Semanas 1-4, comprimido)

#### Semana 1: Discovery + Knowledge + Baseline — COMPLETADA (26-Mar-2026)
- ~~Discovery sessions con equipo (validar procesos, criterios, fricciones)~~ HECHO
- ~~AI Maturity Assessment inicial (5 dimensiones con el equipo)~~ HECHO
- ~~**Recolectar baseline de metricas**: medir tiempos actuales por fase~~ HECHO (ver `measurement/BASELINE.md`)
- ~~Enriquecer knowledge base con data del equipo~~ HECHO
- ~~Validar modash-playbook.md y perfiles por vertical con CMs~~ HECHO

#### Semana 2: Vision + Roadmap + OKRs + Adopcion — COMPLETADA (29-Mar-2026)
- ~~Presentar VISION.md y ROADMAP.md a Carlos — validar y ajustar~~ HECHO (sesion 29-Mar)
- ~~Definir OKRs del primer trimestre~~ HECHO (ver `strategy/OBJECTIVES.md`)
- ~~Disenar programa de adopcion por rol~~ HECHO (ver `adoption/TRAINING-PLAN.md`)
- ~~Refinar AGENTS.md de agentes con conocimiento real del equipo~~ HECHO (V3.1 desplegado)

#### Semana 3: Primer Workshop + Onboarding — EN PROGRESO
- **02-Abr-2026**: Arquitectura multi-agente V2 desplegada (4 → 7 agentes, Telegram Groups con Topics)
  - Nuevos agentes: Radar (@ResearchMambaBot), Musa (@CreativeMambaBot), Scout (@InfluencerMambaBot)
  - Orquestador refactorizado desde Estratega con sessions_spawn
  - Knowledge distribuido por agente
  - Documentacion de tools (TOOLS.md) para todos los agentes
- Agentes desplegados y en onboarding con primeros casos reales
- Workshop formal con equipo MNL: PENDIENTE
- Pairing del equipo MNL en Telegram Groups: PENDIENTE
- Configurar MCP/tools faltantes: EN PROGRESO

#### Semana 4+: Shadow Mode + Feedback — PENDIENTE
- Equipo usa agentes en paralelo a su proceso normal
- NO se reemplaza el proceso actual — se usa en paralelo para comparar
- Estrategas prueban Radar y Musa directamente (no solo via Orquestador)
- Recolectar feedback: que funciona, que falta, que confunde
- Iterar AGENTS.md y knowledge/ con feedback real

### Mes 2: Adopcion + Iteracion (Semanas 5-8)

> **Nota**: Varias tareas de Mes 2 se adelantaron — la arquitectura multi-agente, distribucion de knowledge, y documentacion de tools ya estan hechas (02-Abr-2026). El foco de Mes 2 sera adopcion real con el equipo y feedback.

#### Semanas 5-6
- **Workshop 2**: Scouting con Scout + Radar integrados
- **Workshop 3**: Creatividad con Musa para propuestas estrategicas
- Seguir en shadow mode con feedback continuo
- Iterar agentes con feedback real del equipo

#### Semanas 7-8
- ~~Implementar HEARTBEAT.md para todos los agentes~~ HECHO (V8.0 desplegado 07-Abr-2026 — HEARTBEAT.md implementado para los 7 agentes, no solo PM. Incluye Drive consolidation y Campaign Strategy Index)
- Evaluar API de influencers para Scout (Influencers Club / HypeAuditor)
- **Principio**: cada agente entra cuando aporta valor real, no por calendario

### Mes 3: Consolidacion + Primera Medicion (Semanas 9-12)

#### Semanas 9-10
- PM genera primer reporte asistido por IA (campana real)
- Estratega genera primer analisis de brief completo con scoring
- Primer ciclo completo de campana con IA integrada

#### Semanas 11-12
- **Primer AI Maturity Assessment de seguimiento** (3m vs baseline)
- Reporte de ROI trimestral a Carlos (tiempo ahorrado, adopcion)
- Documentar aprendizajes del trimestre
- Planificar Fase 2 basado en resultados reales

### Entregables Mes 3
- [x] Arquitectura multi-agente V2 desplegada (7 agentes, Telegram Groups con Topics)
- [x] Knowledge base distribuido por agente con procesos reales
- [x] Documentacion de tools para todos los agentes
- [x] HEARTBEAT.md implementado para los 7 agentes (V8.0, 07-Abr-2026)
- [x] Drive consolidation configurado en HEARTBEAT de cada agente
- [x] Team-directory con IDs Telegram en TOOLS.md de cada agente
- [ ] 7 agentes en uso activo por el equipo
- [ ] Scoring por vertical operativo (Scout)
- [ ] Primer reporte de campana asistido por IA
- [ ] Baseline + primera medicion de progreso
- [ ] Equipo capacitado en 7 agentes
- [ ] Reporte trimestral a Carlos

---

## FASE 2: EFICIENCIA (Meses 4-6 / Junio-Agosto 2026)

### Prioridades
- Optimizar las 9 fases con datos reales de uso
- Evolucionar agentes con patrones aprendidos de campanas reales
- Modash como motor de inteligencia completo (Creator Library, tracking, benchmarks)
- Explorar servicios IA para clientes de MNL
- Disenar estrategia digital propia de MNL con IA

### Hitos Clave
- [ ] Reduccion medible de tiempo en scouting (target: -40%)
- [ ] Reduccion medible de tiempo en reporting (target: -50%)
- [ ] Creator Library organizada por vertical/cliente/tier en Modash
- [ ] Primer piloto de servicio IA para un cliente
- [ ] Estrategia de marketing propio de MNL disenada
- [ ] AI Maturity Assessment 6m

### Entregables Mes 6
- Metricas de eficiencia comparadas con baseline
- Agentes V3 con learnings de 3+ meses de uso real
- Propuesta de al menos 1 servicio IA para clientes
- Segundo reporte trimestral a Carlos

---

## FASE 3: ECOSISTEMA (Meses 7-12 / Sep 2026 - Mar 2027)

### Prioridades
- Sistema en modo mantenimiento evolutivo (no construccion)
- Servicios IA como diferenciador comercial de MNL
- Marketing propio de MNL ejecutandose con IA
- Documentacion para escalabilidad y transferencia
- Preparar el sistema para que personal tecnico lo evolucione

### Hitos Clave
- [ ] Ecosistema IA consolidado en las 5 dimensiones
- [ ] Al menos 1 servicio IA ofrecido a clientes
- [ ] ROI documentado (12 meses de datos comparativos)
- [ ] Equipo autonomo en uso de herramientas
- [ ] Documentacion completa para futuros tecnicos
- [ ] AI Maturity Assessment 12m (target: promedio 4+)

### Entregables Mes 12
- Reporte anual de transformacion IA con ROI
- Plan de mantenimiento y evolucion
- Documentacion de transferencia

---

> **Progreso al 07-Abr-2026**: Semanas 1-2 completadas. Semana 3 en progreso — agentes desplegados (4 → 7), arquitectura multi-agente V2 implementada con Telegram Groups/Topics, knowledge distribuido, tools documentados. **V8.0 desplegado (07-Abr)**: mejoras en workspace files — memoria inmediata, HEARTBEAT.md para los 7 agentes (con Drive consolidation), team-directory, cierre proactivo de sesion, OUTPUT FORMAT anti-thinking-leak. No hubo cambios en openclaw.json ni modelos. Workshop formal con equipo MNL pendiente. El roadmap se mantiene flexible — las semanas se ajustan segun disponibilidad del equipo y prioridades de campanas activas.
