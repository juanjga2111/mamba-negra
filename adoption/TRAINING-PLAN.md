# Plan de Capacitacion por Rol — Mamba Negra Latam

**Version**: V1 (17-Mar-2026)
**Estado**: Disenado — modulos se activan cuando el agente correspondiente este listo

---

## Principio Clave

Los modulos de capacitacion solo se activan cuando el agente correspondiente esta listo para uso real. No hay timeline forzado — si el Estratega bot no tiene las herramientas configuradas, no se capacita al equipo en el.

**Orden sugerido de activacion**: PM (listo) → Estratega (pendiente MCP) → Admin (pendiente MCP) → Modash+IA (cuando scoring este operativo)

---

## Asignacion de Modulos por Rol

| Rol | Modulo 1: PM | Modulo 2: Estratega | Modulo 3: Admin | Modulo 4: Modash+IA |
|-----|:---:|:---:|:---:|:---:|
| **Campaign Manager (CM)** | Si | Si | Si | Si |
| **Strategy Jr** | Si | **Profundo** | Basico | Si |
| **Comercial** | Consumidor | No | No | No |

---

## Modulo 1: PM Bot (@PMMambabot)

**Estado**: LISTO para capacitacion (bot desplegado, Notion + Google Workspace conectados)

### Que aprenden
- Consultar estado de campanas activas
- Pedir cronograma de una campana
- Verificar tareas pendientes por CM
- Solicitar creacion de tareas en Notion
- Interpretar alertas del PM

### Ejemplo de interacciones
```
BUENO: "Cual es el estado de la campana de Detodito Q1? Que tareas estan pendientes?"
BUENO: "Crea una tarea de tipo SOLICITUD Creative para la campana Bivien, asignada a Laura Zapata"
MALO: "Dime todo" (sin contexto)
MALO: "Hazme el reporte" (el PM consolida data, no genera reportes visuales)
```

### Errores comunes
- Esperar que el PM genere documentos visuales (solo consolida data)
- No especificar la campana al preguntar
- Confundir al PM con el Estratega (el PM es operativo, el Estratega es estrategico)

---

## Modulo 2: Estratega Bot (@StrategyMambabot)

**Estado**: Desplegado pero pendiente configuracion de MCP/tools. Capacitar cuando este listo.

### Que aprenden
- Pedir analisis de brief para definir perfil de influencer
- Consultar criterios de scouting por vertical
- Solicitar evaluacion de un influencer vs criterios
- Pedir borrador de propuesta estrategica
- Usar el checklist pre-Modash

### Ejemplo de interacciones
```
BUENO: "Tengo un brief de PepsiCo para Doritos. Objetivo: awareness en jovenes 18-25 en Colombia. Que perfil de influencer necesito?"
BUENO: "Evalua este influencer para una campana de Bivien: 50K followers, 3.5% ER, 70% audiencia CO, contenido de skincare"
MALO: "Busca influencers" (sin brief ni contexto)
MALO: "Es bueno este influencer?" (sin datos ni campana)
```

### Errores comunes
- Pedir busqueda sin haber completado el checklist pre-Modash
- No dar contexto del cliente/campana
- Esperar que el Estratega negocie tarifas (eso es humano siempre)

---

## Modulo 3: Admin Bot (@AdmonMambaBot)

**Estado**: Desplegado pero pendiente configuracion de MCP/tools. Capacitar cuando este listo.

### Que aprenden
- Consultar estado de pagos pendientes
- Registrar fechas de pago y contratos
- Solicitar alertas de vencimientos
- Tracking de base de pago por campana

### Ejemplo de interacciones
```
BUENO: "Cuales son los pagos pendientes de la campana Melendez que vencen esta semana?"
BUENO: "Registra que el pago a @influencer_x por la campana Bata se realizo el 15-Mar"
MALO: "Pagale" (el bot no ejecuta pagos)
```

### Errores comunes
- Esperar que el Admin ejecute transacciones financieras
- No especificar campana al consultar pagos
- Confundir con el PM (Admin es financiero, PM es operativo)

---

## Modulo 4: Modash + IA (Flujo Integrado de Scouting)

**Estado**: Pendiente — requiere Estratega con tools configurados + scoring por vertical operativo

### Que aprenden
- Flujo completo: Brief → Checklist → Modash → Vetting → Shortlist
- Como interpretar el scoring por vertical del Estratega
- Cuando abrir un perfil en Modash (optimizacion de creditos)
- Como dar feedback sobre scoring para mejorar el sistema

### Pre-requisitos
- Haber completado Modulo 2 (Estratega)
- Haber leido `knowledge/modash-playbook.md`
- Conocer los criterios de su(s) vertical(es) asignada(s)

---

## Evaluacion de Modulos

Cada modulo se considera **completado** cuando el participante cumple:

| Criterio | Como se verifica |
|----------|-----------------|
| Asistio al workshop | Lista de asistencia |
| Completo 3+ consultas reales durante la sesion | Observacion directa |
| Uso el agente al menos 2 veces en la semana siguiente al workshop | Logs de OpenClaw |
| No tiene dudas bloqueantes sobre como usar el agente | 1:1 de seguimiento (5 min) |

Si un participante no cumple los criterios en 2 semanas post-workshop, agendar sesion de refuerzo individual (15 min).

---

## Formato de Capacitacion

| Aspecto | Detalle |
|---------|---------|
| **Duracion** | 45-60 min por modulo |
| **Formato** | Workshop presencial o por videollamada |
| **Estructura** | 15 min teoria + 30 min practica + 15 min Q&A |
| **Materiales** | Guia de 1 pagina + telefono con Telegram abierto |
| **Practica** | Cada asistente hace 3-5 consultas reales durante la sesion |

---

## Calendario Tentativo

| Semana | Actividad |
|--------|-----------|
| Semana 3 | **Workshop 1**: Modulo 1 (PM Bot) — todo el equipo |
| Semana 5-6 | **Workshop 2**: Modulo 2 (Estratega) — cuando este listo |
| Semana 7-8 | **Workshop 3**: Modulo 3 (Admin) — cuando este listo |
| Mes 3+ | **Workshop 4**: Modulo 4 (Modash+IA) — cuando scoring funcione |

> PENDIENTE VALIDACION: Confirmar disponibilidad del equipo para workshops con Carlos
