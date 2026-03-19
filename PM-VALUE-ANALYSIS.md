# PM Agent — Analisis de Valor y Funciones Clave

**Creado**: 16-Mar-2026
**Ultima actualizacion**: 16-Mar-2026
**Proposito**: Documentar las funciones de alto valor del agente PM, criterios de evaluacion, y progreso de implementacion. Este documento evoluciona con cada iteracion.

---

## Principio rector

> El PM no debe ser un add-on cosmético. Cada función debe **eliminar un paso, generar data que no existía, o detectar algo que ningún humano haría manualmente**. Si lo apagas y nadie se queja en 1 semana, era vanidad.

### Filtro de valor (aplicar a cada funcion)

| Criterio | Pregunta |
|----------|----------|
| Elimina un paso? | El proceso tiene MENOS pasos con el agente? |
| Lo haria un humano igual? | Si si, es vanidad. Si no puede, es valor. |
| Genera data nueva? | Crea visibilidad que no existia o repite la existente? |
| Se nota si lo apagas? | Si lo apagas y nadie se queja, era vanidad. |

---

## Contexto operativo de MNL

- **Equipo**: 5+ CMs (Creative/Maca, Mar, Juan G, Aleja, Isa, C.G, Cami, Lau Criales, Lau Reyes)
- **Campanas simultaneas**: 15-20 en paralelo
- **Herramienta actual**: Notion (calendario + tableros TRAFICO/SOLICITUD por CM)
- **Disciplina de actualizacion**: Relativamente buena (Notion actualizado)
- **Comunicacion**: WhatsApp (coordinacion), Telegram (bots IA)
- **Dolor principal**: Nadie tiene vision cross-CM de las 20 campanas simultaneas

---

## Funcion 1: Daily Digest automatico

**Estado**: NO IMPLEMENTADO
**Prioridad**: P0 — Construir primero
**Prerequisitos**: HEARTBEAT.md configurado, Notion conectado (LISTO)

### Que resuelve

Hoy nadie cruza las 20 campanas diariamente. Cada CM ve su tablero. El comercial tiene que perseguir a 3 CMs para saber como van sus cuentas. No existe un reporte consolidado automatico.

### Como funciona

Todos los dias a una hora fija, el PM lee los 9 tableros de TRAFICO, cruza estados, deadlines y carga por CM, y envia un resumen por Telegram.

### Ejemplo de output

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

### Por que es integracion real y no vanidad

Esto NO es "consultar el Notion en formato bonito". Es cruzar 20 campanas + 9 CMs + deadlines + estados y generar un juicio de riesgo. Ningun humano hace esto diariamente porque toma 30-45 minutos revisar todo. El agente lo hace en 30 segundos.

### Test de valor

Si lo apagas, en 3 dias alguien pregunta "y el resumen de la manana?". Eso es valor.

### Metricas de exito

| Metrica | Baseline (sin PM) | Target (con PM) | Como medir |
|---------|-------------------|-----------------|------------|
| Tiempo para obtener status global | 30-45 min manual | 30 seg automatico | Tiempo que toma el digest |
| Frecuencia de revision cross-CM | Semanal (reuniones) | Diaria (automatico) | Dias con digest enviado |
| Tareas vencidas no detectadas | Desconocido | 0 (alertadas el mismo dia) | Conteo en digest vs real |

### Implementacion

1. Configurar HEARTBEAT.md con tarea diaria (ej: 8am COT)
2. Instruccion en AGENTS.md: "Al ejecutar heartbeat, consulta los 9 tableros TRAFICO, filtra por Estado != Listo y Fecha limite <= hoy+3, agrupa por CM, genera resumen"
3. Enviar por Telegram al canal o chat designado
4. Iterar formato con feedback del equipo

---

## Funcion 2: Registro de estado por conversacion

**Estado**: PARCIALMENTE FUNCIONAL (puede crear tareas via chat)
**Prioridad**: P1
**Prerequisitos**: Notion write (LISTO), directorio de equipo (LISTO)

### Que resuelve

Hoy el CM hace algo (confirma un influencer, recibe aprobacion) y tiene que ir a Notion a actualizar el estado. A veces lo hace, a veces se le olvida, a veces lo hace 2 dias despues. Doble trabajo: hacer la tarea + registrar que la hizo.

### Como funciona

El CM le escribe al bot como le escribiria a un colega:

```
CM: "Ya confirme a @influencer_x para Pepsi, quedo en 2M por 3 reels"
PM: Registrado. Campana Pepsi: influencer @influencer_x confirmado
    (2M COP, 3 reels). Van 5/8 confirmados. Faltan 3 para cerrar scouting.
    Actualice el Notion.
```

### Por que es integracion real

El canal de comunicacion natural (chat) SE CONVIERTE en el sistema de registro. El CM deja de tener doble trabajo. El proceso pasa de 2 pasos a 1.

### Test de valor

Si lo apagas, los CMs notan que tienen que volver a actualizar Notion manualmente.

### Metricas de exito

| Metrica | Baseline | Target | Como medir |
|---------|----------|--------|------------|
| Tareas creadas via chat vs manual | 0% via chat | >50% via chat | Conteo de tareas creadas por el PM |
| Tiempo entre evento y registro | Horas/dias | Inmediato | Timestamp de creacion vs evento |
| Tareas sin registrar | Desconocido | Reduccion >50% | Auditoria semanal |

### Implementacion

1. [x] PM puede crear tareas en SOLICITUD con asignacion (verificado 16-Mar)
2. [ ] Agregar instrucciones en AGENTS.md para parsear mensajes naturales
3. [ ] Definir confirmacion antes de escribir ("Voy a registrar X en Notion. Correcto?")
4. [ ] Probar con equipo real

---

## Funcion 3: Pipeline de aprobaciones con escalamiento

**Estado**: NO IMPLEMENTADO
**Prioridad**: P1
**Prerequisitos**: Notion read/write (LISTO), logica de escalamiento en AGENTS.md

### Que resuelve

Fase 5 (Aprobaciones) es donde mas se atoran las campanas. La cadena CM -> Strategy -> Comercial -> Cliente es opaca. Nadie sabe cuanto lleva cada paso. Se enteran que algo esta atrasado cuando ya se paso el deadline.

### Como funciona

El PM trackea cada pieza de contenido en la cadena de aprobacion:

```
Dia 1: CM sube contenido -> PM registra "en revision Strategy"
Dia 2: (sin movimiento)
Dia 3: (sin movimiento) -> PM alerta a Strategy:
       "El contenido de @influencer_x para Pepsi lleva 48h sin revision.
        Deadline de publicacion: jueves. Si no se revisa hoy,
        se compromete la fecha."
Dia 4: Strategy aprueba -> PM mueve a "en revision Comercial"
```

### Por que es integracion real

Convierte un proceso opaco en un pipeline con tiempos visibles y escalamiento automatico. No agrega un paso — elimina la incertidumbre.

### Test de valor

Si lo apagas, la primera semana se atrasa una aprobacion que nadie persiguio.

### Metricas de exito

| Metrica | Baseline | Target | Como medir |
|---------|----------|--------|------------|
| Tiempo promedio en Fase 5 | Desconocido (medir primero) | Reduccion 30% | Duracion en status "aprobacion" |
| Aprobaciones escaladas a tiempo | 0 (todo reactivo) | >80% proactivo | Alertas enviadas vs atrasos |
| Campanas con atraso por aprobacion | Frecuente (anecdotico) | Reduccion medible | Conteo mensual |

### Implementacion

1. [ ] Definir estados de aprobacion en Notion (o usar Estados existentes)
2. [ ] Configurar reglas de escalamiento en AGENTS.md (24h Strategy, 48h Comercial, etc.)
3. [ ] Heartbeat revisa pipeline de aprobaciones cada 6h
4. [ ] Alerta por Telegram cuando se excede tiempo
5. [ ] Probar con 1 campana real

---

## Funcion 4: Scoring de salud de campana

**Estado**: NO IMPLEMENTADO
**Prioridad**: P2
**Prerequisitos**: Datos historicos de tiempos por fase (se acumulan con uso)

### Que resuelve

El estado de una campana hoy es binario: "va bien" o "hay problema". No hay gradientes. No hay prediccion. Nadie puede comparar la salud de 20 campanas de un vistazo.

### Como funciona

Cada campana tiene un score calculado automaticamente:

```
Campana Pepsi — Score: 72/100 (WARN)
- Tareas activas: 8 (3 en curso, 2 sin empezar, 3 listas)
- Tareas vencidas: 1 (-10 pts)
- Proxima deadline: 2 dias (-8 pts)
- Carga del CM (Maria): 4 campanas activas (-10 pts)
```

### Por que es integracion real

Esta metrica NO existe hoy en ningun lado. Ningun CM calcula esto. Es informacion genuinamente nueva que permite tomar decisiones antes de que haya un problema.

### Test de valor

Si un comercial puede preguntar "cuales de mis campanas estan en riesgo?" y recibir respuesta fundamentada en 5 segundos — eso redefine como se gestiona la agencia.

### Metricas de exito

| Metrica | Baseline | Target | Como medir |
|---------|----------|--------|------------|
| Campanas en riesgo detectadas temprano | 0 (deteccion reactiva) | >70% detectadas antes de impacto | Score < 60 vs campanas con atraso real |
| Precision del score | N/A | >80% correlacion con resultado | Score vs resultado final de campana |

### Implementacion

1. [ ] Definir formula de scoring (ponderacion de factores)
2. [ ] Calcular score con data de Notion (tareas vencidas, carga CM, deadlines)
3. [ ] Incluir score en Daily Digest
4. [ ] Calibrar pesos con datos reales despues de 1 mes

---

## Funcion 5: Retrospectiva automatica de campana

**Estado**: NO IMPLEMENTADO
**Prioridad**: P3
**Prerequisitos**: Historico de datos de campana acumulado (minimo 1 mes de uso)

### Que resuelve

Fase 9 (Aprendizajes) es la que siempre se salta. Todos saben que deberian documentar que funciono y que no, pero la siguiente campana ya empezo y nadie tiene tiempo.

### Como funciona

Cuando una campana se marca como completada, el PM genera automaticamente:

```
Retrospectiva — Campana Pepsi Q1 2026

Duracion total: 34 dias (promedio agencia: 28) -> +6 dias
Fase mas lenta: Aprobaciones — 8 dias (promedio: 4)
Cuello de botella: Aprobacion del cliente tomo 5 dias
Tareas totales: 12 (10 completadas a tiempo, 2 atrasadas)

Patron detectado: Las ultimas 3 campanas de Pepsi se
atrasan en aprobacion del cliente. Revisar proceso con comercial?
```

### Por que es integracion real

No es un resumen bonito — es deteccion de patrones across campanas. Algo que un humano solo podria hacer si revisara las ultimas 10 campanas manualmente.

### Test de valor

Si despues de 3 meses puedes decirle a un cliente "nuestro tiempo promedio mejoro 20% porque detectamos que aprobaciones era el cuello de botella" — eso es valor medible, no vanidad.

### Metricas de exito

| Metrica | Baseline | Target | Como medir |
|---------|----------|--------|------------|
| Campanas con retrospectiva documentada | ~10% (se salta) | >90% (automatica) | Conteo de retros generadas |
| Patrones detectados | 0 | 1+ por trimestre | Patrones reportados |
| Mejora en tiempo promedio de campana | Baseline mes 1 | Reduccion 15% en 3 meses | Duracion promedio |

### Implementacion

1. [ ] Definir trigger de finalizacion (estado "Listo" en todas las tareas?)
2. [ ] Acumular historico de tiempos por campana (Google Sheets o memoria del PM)
3. [ ] Template de retrospectiva en AGENTS.md
4. [ ] Generar automaticamente y enviar al CM + comercial
5. [ ] Implementar deteccion de patrones (comparacion con historico)

---

## Lo que NO hacer (funciones vanidad)

| Funcionalidad | Por que es vanidad |
|---------------|--------------------|
| "Preguntale al PM sobre gestion de proyectos" | Google lo hace mejor. Chatbot generico. |
| "El PM te ayuda a crear el cronograma Gantt" | Los CMs ya saben hacer Gantts. |
| "El PM te recuerda tus tareas del dia" | Notion ya tiene recordatorios. Duplica funcionalidad. |
| "El PM responde sobre el framework de 9 fases" | Se lee en 5 minutos. No es un problema. |
| "El PM comunica entre agentes via sessions_send" | Complejidad tecnica impresionante que el usuario no nota. |

---

## Framework de evaluacion (metricas globales)

### Nivel 1 — Adopcion (semana 1-2)

Si nadie lo usa, nada mas importa.

| Metrica | Target | Kill signal |
|---------|--------|-------------|
| Mensajes al bot PM por semana por CM | >5 | < 2 por CM despues de 2 semanas |
| % del equipo que lo usa 3x/semana | >50% | < 30% despues de 2 semanas |
| Sesiones iniciadas por el PM (proactivas) | >3/semana | 0 proactivas = tracker pasivo |

### Nivel 2 — Utilidad percibida (semana 3-4)

Encuesta simple cada 2 semanas:

| Pregunta | Target | Kill signal |
|----------|--------|-------------|
| "El PM te dijo algo que no sabias?" | >60% Si | >70% No |
| "Te ahorro tiempo en algo concreto?" | >50% Si | >70% No |
| "Preferis preguntarle al PM o abrir Notion?" | >40% PM | >80% Notion |

### Nivel 3 — Impacto operativo (mes 2+)

| Metrica | Como medir | Target |
|---------|------------|--------|
| Tiempo promedio por fase | Timestamps en Notion | Reduccion medible |
| Campanas entregadas a tiempo | Deadline vs entrega real | Mejora >10% |
| Escalaciones tardias vs tempranas | Conteo de alertas del PM | >50% tempranas |
| Tareas vencidas no detectadas | Auditoria semanal | Tendencia a 0 |

---

## Roadmap de implementacion

| # | Funcion | Estado | Semana target |
|---|---------|--------|---------------|
| 1 | Notion conectado + TOOLS.md | COMPLETADO | Sem 1 (16-Mar) |
| 2 | Daily Digest (HEARTBEAT) | PENDIENTE | Sem 2 |
| 3 | Registro por conversacion | PARCIAL (crear tareas funciona) | Sem 2-3 |
| 4 | Pipeline aprobaciones | PENDIENTE | Sem 3-4 |
| 5 | Score de salud | PENDIENTE | Sem 4+ |
| 6 | Retrospectiva automatica | PENDIENTE | Mes 2+ (requiere historico) |

---

**Proximo paso**: Configurar HEARTBEAT.md para Daily Digest (Funcion 1).
**Revision**: Este documento se actualiza cada vez que una funcion avanza o se miden metricas.
