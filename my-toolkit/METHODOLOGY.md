# Metodologia del AI Strategy Lead

**Version**: V1 (17-Mar-2026)
**Para**: Juan Jose — uso personal para gestionar la transformacion IA de MNL

---

## El Ciclo de 5 Pasos

```
Discovery → Design → Build → Adopt → Measure
    ↑                                    |
    └────────────────────────────────────┘
```

Cada agente, cada optimizacion de proceso, y cada fase de la transformacion pasa por este ciclo. No se salta ningun paso.

---

### 1. Discovery (Descubrir)

**Que haces**: Entender el problema real antes de proponer soluciones.

| Aspecto | Detalle |
|---------|---------|
| **Actividades** | Sesiones con el equipo, observacion de procesos, analisis de data existente |
| **Herramientas** | Template discovery-session-guide, grabacion de notas, FASE1A-DISCOVERY.md |
| **Output** | Fricciones documentadas, oportunidades identificadas, baseline medido |
| **Duracion tipica** | 1-2 semanas por fase/agente |

**Pregunta clave**: "Que problema estamos resolviendo y para quien?"

### 2. Design (Disenar)

**Que haces**: Disenar la solucion antes de construirla.

| Aspecto | Detalle |
|---------|---------|
| **Actividades** | Escribir specs, definir alcance, validar con Carlos |
| **Herramientas** | Template agent-design-brief, design docs, PROCESS-AI-MAP |
| **Output** | Design doc aprobado, plan de implementacion |
| **Duracion tipica** | 3-5 dias |

**Pregunta clave**: "Es esta la solucion correcta para el problema que encontramos?"

### 3. Build (Construir)

**Que haces**: Implementar la solucion tecnica.

| Aspecto | Detalle |
|---------|---------|
| **Actividades** | Configurar agentes, escribir AGENTS.md, conectar MCP/tools, desplegar |
| **Herramientas** | Claude Code, OpenClaw, VM GCP, n8n (si aplica) |
| **Output** | Agente/workflow desplegado y funcional |
| **Duracion tipica** | 1-2 semanas |

**Pregunta clave**: "Funciona tecnicamente y resuelve lo que disenamos?"

### 4. Adopt (Adoptar)

**Que haces**: Lograr que el equipo realmente use la solucion.

| Aspecto | Detalle |
|---------|---------|
| **Actividades** | Workshops, shadow mode, recoleccion de feedback, iteracion |
| **Herramientas** | Template workshop-agenda, adoption-feedback-survey, TRAINING-PLAN |
| **Output** | Equipo capacitado y usando la herramienta |
| **Duracion tipica** | 2-4 semanas |

**Pregunta clave**: "El equipo lo usa sin que se lo pidan?"

### 5. Measure (Medir)

**Que haces**: Verificar que la solucion genera valor real.

| Aspecto | Detalle |
|---------|---------|
| **Actividades** | Comparar metricas vs baseline, encuestas, analisis de adopcion |
| **Herramientas** | KPIs.md, BASELINE.md, quarterly-review template |
| **Output** | Reporte con datos: funciono o no, que ajustar |
| **Duracion tipica** | Continuo, con checkpoints trimestrales |

**Pregunta clave**: "Podemos demostrar con datos que esto aporta valor?"

---

## Principios No Negociables

1. **Sin caso de uso claro, no hay agente** — No construir agentes "porque se puede". Cada agente resuelve un problema real del equipo.

2. **No forzar adopcion** — Si el equipo no lo usa, el problema es la herramienta o la integracion, no la gente.

3. **Proceso antes que tecnologia** — Primero entender y optimizar el proceso, despues agregar IA. Automatizar un proceso roto solo hace el problema mas rapido.

4. **Si no puedes medirlo, no lo hiciste** — Toda intervencion necesita baseline + medicion posterior. Sin datos, es anecdota.

5. **Feedback del equipo manda** — El equipo es quien usa las herramientas. Su feedback tiene mas peso que cualquier design doc.

---

## Cuando Aplicar el Ciclo

| Escenario | Empieza en |
|-----------|-----------|
| Nuevo agente | Discovery |
| Optimizar proceso existente | Discovery |
| Agente desplegado pero nadie lo usa | Adopt (re-evaluar) |
| Metricas no mejoran | Measure → Discovery (entender por que) |
| Carlos pide algo nuevo | Discovery (entender que necesita realmente) |

---

**Templates relacionados**: Ver `my-toolkit/templates/` para guias de cada paso del ciclo.
