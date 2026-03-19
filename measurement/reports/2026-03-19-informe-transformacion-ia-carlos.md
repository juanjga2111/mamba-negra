# Transformacion IA — Mamba Negra Latam
## Informe Ejecutivo para Carlos

**Fecha**: 19 de Marzo, 2026
**Preparado por**: Juan Jose — AI Strategy Lead
**Periodo cubierto**: 9 Mar — 19 Mar 2026

---

## 1. RESUMEN EJECUTIVO

En 10 dias, el proyecto paso de **"desplegar 3 bots de Telegram"** a convertirse en un **plan integral de transformacion del negocio con IA** en 5 dimensiones y 7 capas de trabajo.

**Lo que existe hoy:**
- 3 agentes de IA operativos en Telegram (Estratega, PM, Admin)
- PM conectado al Notion real de MNL (19 bases de datos, 8 miembros del equipo mapeados)
- PM conectado a Google Drive/Sheets/Docs
- Knowledge base completo: framework de 9 fases, playbook Modash, 5 perfiles de vertical, scoring de influencers
- Plan de medicion de impacto con KPIs definidos
- Infraestructura en la nube funcionando 24/7 (servidor GCP, dominio propio, dashboard web)

**Lo que viene:**
- Discovery con el equipo (validar procesos y capturar conocimiento real)
- Medicion de baseline (para poder demostrar ROI despues)
- Workshop de onboarding del PM Bot
- Configurar herramientas para Estratega y Admin

---

## 2. COMO EVOLUCIONO EL PROYECTO

```
Semana 1 (9-12 Mar)          Semana 2 (13-16 Mar)          Semana 3 (17-19 Mar)
--------------------          ----------------------          ----------------------
Infraestructura:              Multi-Agente:                   Transformacion:
- Servidor GCP creado         - 3 bots de Telegram creados    - Pivot: de bots a
- OpenClaw instalado          - Framework 9 fases definido      transformacion integral
- Primer bot (Estratega)      - PM conectado a Notion real    - 7 capas de trabajo
  respondiendo en Telegram    - Los 3 bots operativos           definidas
                              - Dashboard web en               - Plan de medicion creado
                                mamba.opclaworch.online        - Roadmap a 12 meses
```

**El catalizador del pivot**: La retro con Carlos, donde compartio la vision de IA en 5 dimensiones del negocio (Estrategia, Operacion, Contenido, Reporting, Cultura) y el playbook detallado de Modash con criterios por vertical. Eso demostro que los agentes son solo UNA capa de algo mas grande.

---

## 3. EL SISTEMA MULTI-AGENTE

Tres asistentes de IA especializados, accesibles desde Telegram, que cubren las 9 fases del ciclo de campana de MNL.

### Los 3 Agentes

| Agente | Bot de Telegram | Dominio | Estado |
|--------|----------------|---------|--------|
| **Estratega** | @StrategyMambabot | Briefs, propuestas, scouting, scoring | Operativo (sin herramientas externas aun) |
| **PM** | @PMMambabot | Cronogramas, tareas, seguimiento, reportes | **Completo** — Notion + Google Workspace |
| **Admin** | @AdmonMambaBot | Pagos, contratos, costos, facturacion | Operativo (sin herramientas externas aun) |

### Que puede hacer el PM hoy (ejemplo real)

El PM ya tiene acceso a las **19 bases de datos** del workspace de MNL en Notion:
- 9 tableros de TRAFICO (uno por CM)
- 9 tableros de SOLICITUD (uno por CM)
- Calendario

**Ejemplo de interaccion:**
```
CM: "Crea una tarea de tipo SOLICITUD Creative para la campana Bivien,
     asignada a Laura Zapata"

PM: Listo. Tarea creada en SOLICITUD Creative:
    - Campana: Bivien
    - Asignada a: Laura Zapata
    - Estado: Por hacer
```

### Las 9 Fases y que agente cubre cada una

| # | Fase | Agente(s) | Impacto esperado |
|---|------|-----------|-----------------|
| 1 | Recepcion del Brief | Estratega | Medio |
| 2 | Construccion Estrategica | Estratega | Alto |
| 3 | Cronograma Gantt | PM | Alto |
| 4 | Scouting + Negociacion | Estratega + PM | **Muy Alto** |
| 5 | Aprobaciones Internas | PM | Medio |
| 6 | Ejecucion y Seguimiento | PM | Alto |
| 7 | Reporte de Costos | Admin | Medio |
| 8 | Reporte Final | PM + Estratega | Alto |
| 9 | Aprendizajes | Estratega | Medio |

### Comunicacion entre agentes

Los agentes pueden consultarse entre si internamente. Si le preguntas al PM algo que es dominio del Estratega, el PM consulta al Estratega y te da la respuesta completa, sin que tengas que cambiar de bot.

---

## 4. LA VISION: 5 DIMENSIONES DE TRANSFORMACION

Basado en la vision de Carlos: IA integrada en cada capa del negocio. No se trata de reemplazar al equipo. Se trata de que cada persona en MNL tenga un copiloto de IA.

| Dimension | Hoy | Con IA integrada (6-12 meses) |
|-----------|-----|-------------------------------|
| **Estrategia** | Criterios de seleccion dependen del "ojo clinico" de cada CM | Perfiles por vertical estandarizados, scoring automatico, propuestas con benchmarks |
| **Operacion** | Tracking manual en Notion, coordinacion por WhatsApp | PM bot gestiona cronogramas, alerta atrasos, coordina equipo automaticamente |
| **Contenido** | Reportes se arman desde cero cada vez | Templates pre-llenados con data real, insights automaticos post-campana |
| **Reporting** | Excel al final de la campana, data recolectada a mano | Dashboard en tiempo real, alertas tempranas de bajo rendimiento |
| **Cultura** | "Uso ChatGPT a veces" | "No puedo trabajar sin mis agentes, y propongo mejoras al sistema" |

---

## 5. DONDE ESTAMOS HOY: MADUREZ IA

Evaluacion en escala 1-5:

| Nivel | Significado |
|-------|-------------|
| 1 - Manual | Todo se hace a mano, sin IA |
| 2 - Asistido | IA se usa puntualmente (ChatGPT para textos) |
| 3 - Integrado | IA esta en el proceso formal (agentes activos) |
| 4 - Optimizado | IA mejora metricas medibles vs proceso manual |
| 5 - Autonomo | IA opera con supervision minima |

### Assessment actual (estimado — pendiente validar con equipo)

| Dimension | HOY | 3 meses | 6 meses | 12 meses |
|-----------|:---:|:-------:|:-------:|:--------:|
| Estrategia | **2** | 3 | 4 | 4 |
| Operacion | **1** | 3 | 4 | 5 |
| Contenido | **2** | 2 | 3 | 4 |
| Reporting | **1** | 3 | 4 | 4-5 |
| Cultura | **2** | 3 | 3 | 4 |
| **Promedio** | **1.6** | **2.8** | **3.6** | **4.3** |

> **Nota**: Los valores "HOY" son estimaciones. Se validan en la sesion de discovery con el equipo. Este baseline es fundamental para poder demostrar progreso despues.

### Lo que significa el salto de 1.6 a 2.8 en 3 meses

- El equipo pasa de usar IA esporadicamente a tener agentes como parte del flujo formal
- PM bot con Daily Digest diario (hoy nadie cruza las 20 campanas a diario)
- Estratega con perfiles por vertical cargados y checklist pre-Modash
- 80% del equipo usando agentes semanalmente

---

## 6. COMO SE INTEGRA LA IA EN CADA FASE (Ejemplo: Fase 4 - Scouting)

> Fase 4 tiene el **mayor potencial de impacto** porque combina Modash + IA + conocimiento del equipo.

| Actividad | Hoy (manual) | 3 meses (asistido) | 6 meses (integrado) |
|-----------|-------------|-------------------|---------------------|
| Definir criterios de busqueda | Cada CM a su manera | Checklist pre-Modash obligatorio | Auto-generado desde brief + perfil de vertical |
| Busqueda en Modash | Filtros basicos | Saved searches por vertical + criterios ICP | Busquedas inteligentes con scoring automatico |
| Vetting (audiencia, fakes, brand safety) | Uno por uno, manual | Checklist de vetting estandarizado | Pre-filtro IA antes de abrir perfil |
| Scoring de candidatos | "Ojo clinico" | Score por vertical con pesos definidos | Ranking automatico con justificacion |
| Optimizacion de creditos Modash | Abren perfiles sin filtro | Regla: solo abrir post-filtros minimos | Sistema sugiere "abrir si/no" |

Este mismo analisis existe para las 9 fases, con el detalle de que cambia y cuando.

---

## 7. PLAN DE MEDICION DE IMPACTO

### Por que medimos

Sin medicion, no hay forma de demostrar que la IA aporta valor real. "El scouting es mas rapido" no vale nada si no sabemos cuanto tardaba antes.

### 4 categorias de KPIs

#### 7.1 Eficiencia Operativa (lo que mas le importa al equipo)

| Metrica | Baseline | Target 3m | Target 6m |
|---------|----------|-----------|-----------|
| Horas de scouting por campana | [medir en discovery] | -30% | -50% |
| Horas de reporting por campana | [medir en discovery] | -30% | -50% |
| Tiempo respuesta "como va X?" | [medir en discovery] | < 2 min (via PM) | < 1 min |
| Horas/semana en tareas admin repetitivas | [medir en discovery] | -20% | -40% |

#### 7.2 Calidad de Output

| Metrica | Baseline | Target 3m | Target 6m |
|---------|----------|-----------|-----------|
| Tasa rechazo influencers post-contratacion | [medir] | -25% | -50% |
| Creditos Modash desperdiciados | [medir] | -40% | -60% |
| Completitud de reportes (% campos llenos) | [medir] | 95% | 100% |

#### 7.3 Adopcion del Equipo

| Metrica | Target 3m | Target 6m |
|---------|-----------|-----------|
| % equipo usando agentes semanalmente | 80% | 90% |
| Satisfaccion con herramientas IA (1-5) | 3.5+ | 4.0+ |
| "Lo usas sin que te lo pidan?" | > 50% dice si | > 75% dice si |

#### 7.4 Impacto de Negocio (Fase 2+)

| Metrica | Cuando medir |
|---------|-------------|
| Campanas gestionadas por CM (capacidad) | Mes 6+ |
| Tiempo brief a propuesta entregada | Mes 4+ |
| Servicios IA ofrecidos a clientes | Mes 6+ |

### Calendario de medicion

| Que | Cuando | Quien |
|-----|--------|-------|
| **Baseline (pre-IA)** | **Semana 1 (URGENTE)** | Juan Jose + equipo |
| Check de adopcion mensual | Dia 1 de cada mes | Juan Jose |
| Medicion 3 meses vs baseline | Semana 12 | Juan Jose |
| Reporte trimestral a Carlos | Fin de Q1 | Juan Jose |
| AI Maturity Re-Assessment | 3m, 6m, 12m | Juan Jose + Carlos |

### Senales de alarma

| Si pasa esto... | Hacemos esto |
|-----------------|-------------|
| Nadie usa un agente despues de 2 semanas | Sesion de feedback urgente, revisar onboarding |
| Solo 1-2 personas lo usan | Investigar por que, ajustar capacitacion |
| Metricas no mejoran a los 3 meses | Revisar si el problema es adopcion, herramienta o proceso |
| Equipo lo ve como "tarea extra" | Redisenar — la IA no debe ser trabajo adicional |

---

## 8. 5 FUNCIONES DE VALOR DEL PM (Prioridad de Implementacion)

Cada funcion fue evaluada con un filtro estricto: **si la apagas y nadie se queja en 1 semana, era vanidad**.

| # | Funcion | Estado | Por que importa |
|---|---------|--------|----------------|
| 1 | **Daily Digest** | Pendiente (P0) | Hoy nadie cruza las 20 campanas diariamente. El PM lo hace en 30 seg. |
| 2 | **Registro por conversacion** | Parcial | El CM le escribe al bot y el bot actualiza Notion. Proceso de 2 pasos baja a 1. |
| 3 | **Pipeline de aprobaciones** | Pendiente | Fase 5 es donde mas se atoran las campanas. Alerta de atrasos antes de que sea tarde. |
| 4 | **Scoring de salud** | Pendiente | Score 0-100 por campana. "Cuales estan en riesgo?" respondido en 5 seg. |
| 5 | **Retrospectiva automatica** | Pendiente | Fase 9 siempre se salta. El PM la genera automaticamente al cerrar campana. |

### Ejemplo: Daily Digest (Funcion 1)

```
Lunes 17 Mar — 18 campanas activas

REQUIERE ACCION:
- Campana Pepsi: lleva 4 dias sin movimiento en aprobacion
- Maria: 4 campanas en fase 5-6 simultaneamente (carga critica)

ESTA SEMANA:
- 3 deadlines de entrega (Nike mar, Samsung jue, Rappi vie)
- 2 campanas entrando a scouting

SIN NOVEDAD: 13 campanas en track
```

**Impacto**: Hoy obtener esta informacion toma 30-45 min de revision manual (si alguien lo hace). Con el PM, toma 30 segundos y llega automaticamente cada manana.

---

## 9. ROADMAP: 3 FASES, 12 MESES

### FASE 1: CIMIENTOS (Meses 1-3 / Marzo - Mayo 2026)

**Meta**: Agentes integrados en el flujo de trabajo, baseline medido, equipo capacitado.

| Semana | Actividad clave |
|--------|----------------|
| Sem 1 | Discovery sessions + recolectar baseline |
| Sem 2 | Validar vision y roadmap con Carlos |
| Sem 3 | Workshop 1: Onboarding PM Bot con equipo |
| Sem 4+ | Shadow mode (equipo usa agentes en paralelo a proceso normal) |
| Mes 2 | Workshop Modash+IA, agentes V2 con feedback incorporado |
| Mes 3 | Primer reporte asistido por IA, medicion 3m vs baseline |

**Entregables al cierre del Mes 3:**
- Agentes en uso por el equipo
- Knowledge base con procesos reales del equipo
- Scoring por vertical operativo
- Primer reporte de campana asistido por IA
- Baseline + primera medicion de progreso
- Reporte trimestral a Carlos

### FASE 2: EFICIENCIA (Meses 4-6 / Junio - Agosto 2026)

| Objetivo | Target |
|----------|--------|
| Reduccion tiempo scouting | -40% |
| Reduccion tiempo reporting | -50% |
| Creator Library Modash organizada | 5 verticales |
| Primer piloto servicio IA para cliente | 1 piloto |
| AI Maturity promedio | 3.6 |

### FASE 3: ECOSISTEMA (Meses 7-12 / Sep 2026 - Mar 2027)

| Objetivo | Target |
|----------|--------|
| Sistema en mantenimiento evolutivo | No construir mas |
| Servicios IA como oferta comercial | 1+ servicio activo |
| ROI documentado | 12 meses de datos |
| Equipo autonomo | Opera sin soporte tecnico externo |
| AI Maturity promedio | 4.3 |

---

## 10. PRINCIPIOS GUIA

1. **Proceso antes que tecnologia** — No automatizar procesos rotos. Primero entender, luego optimizar, despues automatizar.
2. **Adopcion gradual** — Cada agente entra cuando aporta valor real, no por calendario.
3. **Medicion obligatoria** — Si no podemos medir el impacto, no vale la pena.
4. **El equipo manda** — Si el equipo no lo usa, no funciona. El feedback define la evolucion.
5. **Modash como motor, no como buscador** — De buscar influencers a tener inteligencia de creadores.

---

## 11. PROXIMOS PASOS INMEDIATOS

| # | Accion | Cuando | Necesita |
|---|--------|--------|----------|
| 1 | **Discovery Session 1** con equipo | Esta semana | 1 hora con CMs + Strategy |
| 2 | **Recolectar baseline** (5 preguntas, 15 min/persona) | Esta semana | Acceso a cada CM |
| 3 | **Validar vision y roadmap** con Carlos | Semana 2 | 30-45 min con Carlos |
| 4 | **Workshop PM Bot** con equipo | Semana 3 | 1 hora, equipo con Telegram |
| 5 | Parear equipo MNL en los 3 bots | Post-workshop | Telefono de cada miembro |

---

## 12. DECISIONES PENDIENTES DE CARLOS

- [ ] **Validar el AI Maturity Assessment** — Los niveles actuales (1-2) son correctos?
- [ ] **Agendar espacio para discovery** con el equipo (1 hora, esta semana o la proxima)
- [ ] **Agendar espacio para Workshop 1** del PM Bot (45-60 min, Semana 3)
- [ ] **Confirmar prioridades** — El roadmap esta correcto o hay algo que deba ir primero?
- [ ] **Data historica** — Hay datos de tasa de rechazo de influencers y creditos Modash gastados? (sirven como baseline)

---

## INFRAESTRUCTURA TECNICA (Resumen)

| Componente | Detalle |
|------------|---------|
| Servidor | Google Cloud Platform (GCP), Cali, Colombia |
| Dominio | mamba.opclaworch.online |
| Dashboard | https://mamba.opclaworch.online |
| IA (LLM) | Google Gemini 3.1 Pro |
| Canal | Telegram (3 bots independientes) |
| Integraciones PM | Notion (19 DBs) + Google Drive/Sheets/Docs |
| Disponibilidad | 24/7 (arranca automaticamente si se reinicia el servidor) |
| Costo infra | ~$0 COP (creditos GCP gratuitos por 90 dias, Gemini API gratuita) |

---

*Este documento se actualiza mensualmente. Proxima version: post-discovery (Semana 2).*

*Preparado por Juan Jose — AI Strategy Lead, Mamba Negra Latam*
