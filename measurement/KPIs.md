# KPIs — Framework de Medicion de Impacto IA

**Version**: V1 (17-Mar-2026)
**Estado**: Estructura definida, baselines pendientes de recoleccion

> Sin medicion, no hay forma de demostrar que la IA aporta valor real. Este framework define QUE medir, COMO medirlo y CUANDO.

---

## 1. Eficiencia Operativa

Mide cuanto tiempo y esfuerzo se ahorra con IA integrada.

| Metrica | Como se mide | Baseline | Target 3m | Target 6m |
|---------|-------------|----------|-----------|-----------|
| Tiempo scouting/campana | Cronometrar desde brief hasta shortlist final | [medir] | -30% | -50% |
| Tiempo reporting/campana | Cronometrar armado de reporte final | [medir] | -30% | -50% |
| Tiempo respuesta "como va X?" | Desde pregunta hasta respuesta con data | [medir] | < 2 min (via PM bot) | < 1 min |
| Tareas admin repetitivas | Horas/semana en tareas manuales repetitivas | [medir] | -20% | -40% |

> PENDIENTE VALIDACION: Recolectar baselines en Semana 1 con encuesta al equipo (ver `measurement/BASELINE.md`)

---

## 2. Calidad de Output

Mide si la IA mejora la calidad de las decisiones y entregables.

| Metrica | Como se mide | Baseline | Target 3m | Target 6m |
|---------|-------------|----------|-----------|-----------|
| Tasa rechazo influencers post-contratacion | # rechazados / # contratados por campana | [medir] | -25% | -50% |
| Creditos Modash desperdiciados | Creditos usados en perfiles no-seleccionados / total | [medir] | -40% | -60% |
| Completitud de reportes | % de campos completos en reporte final | [medir] | 95% | 100% |

---

## 3. Adopcion del Equipo

Mide si el equipo realmente usa las herramientas de IA. Detalle completo en `../adoption/ADOPTION-METRICS.md`.

| Metrica | Como se mide | Target 3m | Target 6m |
|---------|-------------|-----------|-----------|
| % equipo usando agentes semanalmente | Logs de Telegram / OpenClaw | 80% | 90% |
| Usuarios activos unicos/semana | IDs unicos en logs | 6+ de 8 | 7+ de 8 |
| Mensajes/semana por agente | Conteo de mensajes en logs | > 20 | > 40 |
| Satisfaccion con herramientas IA (1-5) | Encuesta trimestral | 3.5+ | 4.0+ |
| "Lo usas sin que te lo pidan?" | Encuesta cualitativa | > 50% dice si | > 75% dice si |
| Tasa de "no sirvio" | Feedback negativo / total interacciones | < 20% | < 10% |

---

## 4. Impacto de Negocio (Fase 2+)

Metricas de mayor nivel que se activan cuando hay suficiente historial de uso.

| Metrica | Cuando medir | Como se mide |
|---------|-------------|-------------|
| Campanas gestionadas por CM | Mes 6+ | Comparar capacidad antes vs despues de IA |
| Tiempo brief → propuesta entregada | Mes 4+ | Cronometrar ciclo completo |
| Servicios IA ofrecidos a clientes | Mes 6+ | Nuevas ofertas de servicio basadas en IA |
| Satisfaccion cliente con reportes | Mes 4+ | Feedback de clientes sobre calidad de entregables |

---

## 5. AI Maturity (Transversal)

Mide la evolucion de MNL en las 5 dimensiones de la transformacion IA. Escala 1-5.

| Dimension | Baseline | Target 3m | Target 6m | Target 12m |
|-----------|:--------:|:---------:|:---------:|:----------:|
| Estrategia | [medir] | 3 | 4 | 4 |
| Operacion | [medir] | 3 | 4 | 5 |
| Contenido | [medir] | 2 | 3 | 4 |
| Reporting | [medir] | 3 | 4 | 4-5 |
| Cultura | [medir] | 3 | 3 | 4 |

**Como se mide**: Assessment con el equipo (preguntas estandarizadas en `adoption/workshops/discovery-sessions.md` Sesion 3). Repetir a los 3, 6 y 12 meses.

**Fuente de baseline**: `measurement/BASELINE.md` seccion "AI Maturity Assessment"

---

## Senales de Alarma

| Senal | Accion |
|-------|--------|
| Nadie usa un agente despues de 2 semanas | Revisar onboarding, sesion de feedback urgente |
| Solo 1-2 personas lo usan | Investigar por que, ajustar capacitacion |
| Muchos "no sirvio" | Agente necesita mas conocimiento, iterar AGENTS.md |
| Metricas no mejoran a los 3 meses | Revisar si el problema es adopcion, herramienta o proceso |
| Equipo lo ve como "tarea extra" | Redisenar integracion al flujo — no deberia ser trabajo adicional |

---

## Calendario de Medicion

| Que | Cuando | Responsable |
|-----|--------|-------------|
| Baseline (pre-IA) | Semana 1 | Juan Jose + equipo |
| Check de adopcion mensual | Dia 1 de cada mes | Juan Jose |
| Medicion 3 meses vs baseline | Semana 12 | Juan Jose |
| Reporte trimestral a Carlos | Fin de Q1, Q2, Q3, Q4 | Juan Jose |
| AI Maturity Assessment | 3m, 6m, 12m | Juan Jose + Carlos |

---

**Proximo paso**: Recolectar baselines en `measurement/BASELINE.md` durante Semana 1 (discovery sessions)
