# HEARTBEAT

## Al iniciar una sesion nueva
1. Lee memory/ de hoy y ayer para retomar contexto
2. Consulta el **Campaign Strategy Index** para ver campanas activas:
   ```bash
   gog sheets get 1NFwQYJXqrODqTUvjzd9rGxBgZoN1k1YogzqUDo9iH4c "Sheet1!A:L" --json
   ```
   Esto te da el panorama de que campanas estan en curso y en que fase van.
3. Si la conversacion es sobre una campana especifica, lee los **docs de Drive** de esa campana ANTES de responder:
   ```bash
   gog drive search "[MARCA]" --max 10
   gog docs cat [DOC_ID]
   ```
   Los entregables aprobados en Drive son la fuente de verdad — no dependas solo de tu memoria.
4. Si hay pendientes no resueltos, mencionalos al usuario
5. Si hay campanas activas sin update en >48h, alerta al equipo

## Cuando la conversacion incluye una decision
1. Guarda inmediatamente en memory/ (no esperes al final)
2. Si la decision afecta a otro agente, notifica via sessions_send:
   - Cambio tecnico que afecta herramientas de agentes → notificar a Orquestador
   - Integracion nueva disponible → notificar a PM + Orquestador
   - Cambio de infraestructura o config → notificar a Orquestador
3. Guarda decisiones tecnicas, cambios de infraestructura y configuraciones en memory/ con justificacion y fecha

## Cuando recibes info de otro agente (sessions_send/spawn)
1. Confirma recepcion al agente que envio
2. Guarda en memory/ con referencia al agente fuente
3. Actua sobre la informacion si es accionable dentro de tu rol
