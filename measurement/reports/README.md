# Reportes de Medicion — Mamba Negra Latam

**Proposito**: Almacenar reportes periodicos de avance de la transformacion IA.

---

## Estructura de Reportes

### Reporte Mensual (Meses 1-3)
Nombre: `YYYY-MM-monthly.md`

Contenido minimo:
1. **Adopcion**: % equipo usando agentes, mensajes/semana, usuarios activos
2. **Eficiencia**: Cambios observados en tiempos (si hay data suficiente)
3. **Alarmas**: Senales de alarma activadas y acciones tomadas
4. **Feedback del equipo**: Resumen de fricciones y sugerencias
5. **Acciones para el proximo mes**

### Reporte Trimestral (Para Carlos)
Nombre: `YYYY-QN-quarterly.md`

Contenido minimo:
1. **Resumen ejecutivo** (3-5 bullets)
2. **AI Maturity Assessment**: Score por dimension vs baseline y target
3. **Eficiencia Operativa**: Metricas vs baseline (tiempo scouting, reporting, admin)
4. **Calidad de Output**: Rechazos, creditos Modash, completitud reportes
5. **Adopcion del Equipo**: Uso, satisfaccion, historias de exito
6. **Impacto de Negocio** (a partir de Q2): Campanas/CM, tiempo brief-propuesta
7. **ROI estimado**: Horas ahorradas x costo/hora
8. **Plan para proximo trimestre**

### AI Maturity Assessment
Nombre: `YYYY-MM-maturity-assessment.md`

Se genera en los meses 3, 6 y 12. Compara las 5 dimensiones contra el baseline.

---

## Calendario

| Reporte | Frecuencia | Primer reporte esperado |
|---------|-----------|------------------------|
| Mensual | Dia 1 de cada mes | Abril 2026 |
| Trimestral | Fin de Q1, Q2, Q3, Q4 | Mayo 2026 (fin Fase 1) |
| AI Maturity Assessment | 3m, 6m, 12m | Mayo 2026 |

---

**Fuentes de datos**:
- `measurement/BASELINE.md` — datos pre-IA
- `measurement/KPIs.md` — framework de medicion
- `adoption/ADOPTION-METRICS.md` — metricas de adopcion
- Logs de OpenClaw — datos cuantitativos de uso
- Encuestas al equipo — datos cualitativos
