# Metricas de Adopcion — Mamba Negra Latam

**Version**: V1 (17-Mar-2026)
**Estado**: Framework definido — empezar a medir desde Workshop 1

---

## Indicadores Cuantitativos

| Metrica | Como se mide | Target 3m | Target 6m |
|---------|-------------|-----------|-----------|
| **% equipo usando agentes semanalmente** | Logs de Telegram / OpenClaw | 80% | 90% |
| **Mensajes/semana por agente** | Conteo en logs | > 20 | > 40 |
| **Usuarios activos unicos/semana** | IDs unicos en logs | 6+ de 8 | 7+ de 8 |
| **Consultas repetidas** | Misma pregunta por diferentes personas | Identificar FAQ | FAQ documentadas en agente |
| **Tasa de "no sirvio"** | Feedback negativo / total interacciones | < 20% | < 10% |

### Como recolectar
- **Logs de OpenClaw**: El gateway registra cada interaccion. Revisar mensualmente.
- **Feedback directo**: Preguntar en 1:1 o encuesta rapida (ver `my-toolkit/templates/adoption-feedback-survey.md`)
- **Observacion**: Durante campanas activas, observar si el equipo consulta agentes o no

---

## Indicadores Cualitativos

| Indicador | Metodo | Frecuencia |
|-----------|--------|-----------|
| **Satisfaccion con herramientas IA (1-5)** | Encuesta trimestral | Cada 3 meses |
| **"Lo usas sin que te lo pidan?"** | Pregunta directa en 1:1 | Mensual |
| **Fricciones reportadas** | Canal de feedback o 1:1 | Continuo |
| **Sugerencias de mejora** | Registro en doc compartido | Continuo |
| **Historias de exito** | "Cuentame un momento donde el agente te ayudo" | Trimestral |

---

## Senales de Alarma y Acciones

| Senal | Que significa | Accion inmediata |
|-------|--------------|-----------------|
| **Nadie usa un agente despues de 2 semanas** | Onboarding fallo o el agente no resuelve algo util | Sesion de feedback urgente: que necesitan? que esperaban? |
| **Solo 1-2 personas lo usan** | Adopcion no se expandio — puede ser problema de access o de percepcion | Investigar con no-users: no saben, no quieren, o no pueden? |
| **Muchos "no sirvio"** | El agente no tiene suficiente conocimiento o la pregunta esta mal formulada | Revisar logs de "no sirvio", actualizar AGENTS.md/knowledge |
| **Equipo lo ve como "tarea extra"** | La integracion al flujo fallo — sigue siendo algo separado del trabajo | Redisenar la integracion: el agente debe estar EN el flujo, no al lado |
| **Uso decae despues del mes 1** | Novedad paso, no se convirtio en habito | Identificar momento de friccion, reforzar con caso de uso ganador |

---

## Targets por Periodo

### A 3 meses (fin Fase 1)
- [ ] 80% del equipo usa al menos 1 agente semanalmente
- [ ] Satisfaccion promedio >= 3.5/5
- [ ] > 50% dice "lo uso sin que me lo pidan"
- [ ] Al menos 2 "historias de exito" documentadas
- [ ] Tasa de "no sirvio" < 20%

### A 6 meses (fin Fase 2)
- [ ] 90% del equipo usa agentes semanalmente
- [ ] Satisfaccion promedio >= 4.0/5
- [ ] > 75% dice "lo uso sin que me lo pidan"
- [ ] Equipo propone mejoras activamente
- [ ] Tasa de "no sirvio" < 10%

---

## Calendario de Recoleccion

| Que | Cuando | Responsable |
|-----|--------|-------------|
| Logs de uso (cuantitativo) | Revision mensual | Juan Jose |
| Encuesta de adopcion | Trimestral (Mes 3, 6, 9, 12) | Juan Jose |
| 1:1 con equipo | Mensual en Mes 1-3, luego trimestral | Juan Jose |
| Check de alarmas | Cada 2 semanas en Mes 1-2 | Juan Jose |

---

**Referencia**: `measurement/KPIs.md` para framework completo de medicion (incluye eficiencia, calidad, impacto de negocio)
