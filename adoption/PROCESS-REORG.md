# Rediseno de Procesos con IA — Mamba Negra Latam

**Version**: V1 (17-Mar-2026)
**Estado**: Metodologia definida, fases en diferentes niveles de avance

---

## Principio Fundamental

**No agregar IA a un proceso roto.** Primero entender, luego optimizar, despues automatizar.

Si automatizamos un proceso ineficiente, solo hacemos la ineficiencia mas rapida. El orden correcto es:

```
Entender el proceso actual → Identificar fricciones → Redisenar → Implementar IA → Medir → Iterar
```

---

## Metodologia: 6 Pasos por Fase

Cada una de las 9 fases del ciclo de campana pasa por estos 6 pasos:

### Paso 1: Documentar
- Escribir el proceso actual tal como se hace hoy (no como deberia ser)
- Fuente: observacion directa + entrevistas con el equipo
- Output: descripcion paso a paso en `knowledge/campaign-process.md`

### Paso 2: Identificar Fricciones
- Donde pierde tiempo el equipo?
- Que pasos se repiten manualmente?
- Donde se pierde informacion entre personas?
- Que decisiones dependen de "ojo clinico" sin datos?

### Paso 3: Redisenar
- Proponer flujo mejorado: que hace el humano, que hace la IA
- Validar con el equipo: tiene sentido? es realista?
- No automatizar todo — solo lo que genera valor real

### Paso 4: Implementar
- Configurar el agente/tool correspondiente
- Capacitar al equipo en el nuevo flujo
- Shadow mode: usar en paralelo al proceso actual

### Paso 5: Medir
- Comparar tiempos/calidad antes vs despues
- Recolectar feedback del equipo
- Verificar que la mejora es real, no percibida

### Paso 6: Iterar
- Ajustar basado en datos y feedback
- El proceso nunca esta "terminado" — siempre puede mejorar

---

## Estado por Fase

| # | Fase | Paso 1: Documentar | Paso 2: Fricciones | Paso 3-6: Rediseno+ | Agente Principal |
|---|------|--------------------|--------------------|-----------------------|-----------------|
| 1 | Recepcion del Brief | **Documentado** | **Fricciones ID** | **Implementado** (Google Form → Sheet → Estratega bot) | Estratega |
| 2 | Construccion Estrategica | **Documentado** | **Fricciones ID** | **Implementado** (skill brief-to-strategy, 8 pasos guiados) | Estratega |
| 3 | Cronograma Gantt | Parcial | Pendiente | Pendiente | PM |
| 4 | **Scouting + Negociacion** | **Documentado** | **Fricciones ID** | Pendiente | Estratega + Modash |
| 5 | Aprobaciones Internas | Parcial | Pendiente | Pendiente | PM |
| 6 | Ejecucion y Seguimiento | Parcial | Pendiente | Pendiente | PM |
| 7 | Reporte de Costos | Parcial | Pendiente | Pendiente | Admin |
| 8 | Reporte Final | Parcial | Pendiente | Pendiente | PM + Estratega |
| 9 | Aprendizajes | Parcial | Pendiente | Pendiente | Estratega |

---

## Fase 4: Scouting — Analisis Detallado de Fricciones

> Esta fase tiene el mayor avance gracias al input de Carlos (17-Mar-2026)

### Fricciones Identificadas

| Friccion | Impacto | Solucion propuesta |
|----------|---------|-------------------|
| **Cada CM busca con criterios diferentes** | Inconsistencia en calidad de shortlists | Checklist pre-Modash + perfiles por vertical estandarizados |
| **Se abren perfiles en Modash sin filtro** | Desperdicio de creditos | Regla: solo abrir post-filtros minimos (ver modash-playbook.md) |
| **No hay vetting sistematico** | Influencers malos pasan a shortlist | Flujo de vetting obligatorio de 4 pasos |
| **Scoring es "ojo clinico"** | Subjetivo, no reproducible | Score por vertical con pesos definidos |
| **No hay banco de creadores verificados** | Se empieza de cero cada campana | Creator Library organizada (MNL Verified) |
| **Negociacion sin benchmarks** | Se negocia a ciegas | Estratega sugiere rangos basados en historial |

### Proximos pasos para Fase 4
1. Validar perfiles por vertical con CMs asignados
2. [x] Checklist pre-Modash implementado en Estratega V3.1 (criterios de scouting con copy comercial nivel senior)
3. [x] Estratega tiene tools configurados (gog + Notion + Tavily + Google Form briefs)
4. **BLOQUEADOR**: API de influencers sin acceso (Modash 0 creditos, Influencers Club requiere plan pago)
5. Medir: creditos desperdiciados antes vs despues (cuando API activa)

---

## Discovery para Fases Restantes

Las fases 1-3 y 5-9 necesitan discovery mas profundo. Preguntas clave por fase:

### Fase 1: Brief
- Como llega el brief? (formato, canal, quien lo recibe)
- Que informacion suele faltar?
- Cuanto tiempo pasa entre recibir y empezar?

### Fase 2: Estrategia
- Hay template de propuesta? O se empieza de cero?
- Como definen KPIs esperados?
- Cuanto tiempo tarda armar una propuesta?

### Fase 3: Gantt
- Usan Notion para cronograma? Otro tool?
- Como detectan conflictos de calendario?
- Quien asigna responsables?

### Fase 5: Aprobaciones
- Cuantos niveles de aprobacion hay?
- Donde se atasca mas?
- Cuanto tiempo tarda una aprobacion tipica?

### Fase 6: Ejecucion
- Como monitorean publicaciones durante campana?
- Cada cuanto revisan KPIs?
- Que hacen cuando un influencer no publica?

### Fase 7: Costos
- Quien llena la base de pago?
- Como rastrean pagos pendientes hoy?
- Han tenido problemas de pagos tardios?

### Fase 8: Reporte
- Cuanto tarda armar un reporte final?
- De donde sacan la data (manualmente de cada red)?
- Tienen template de reporte o cada campana es diferente?

### Fase 9: Aprendizajes
- Documentan learnings hoy? Donde?
- Reutilizan insights de campanas pasadas?
- Como se comparten learnings entre CMs?

> COMPLETADO: Discovery sessions realizadas 24-26 Mar 2026 (5 respuestas). Resultados en `adoption/DISCOVERY-FINDINGS.md`. Fases 1, 2 y 4 tienen fricciones identificadas. Estas preguntas sirven para profundizar en las fases restantes.

---

**Referencia**: `strategy/PROCESS-AI-MAP.md` para ver la vision a 3m y 6m de cada fase con IA
