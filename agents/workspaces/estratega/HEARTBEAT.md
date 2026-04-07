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
6. Revisa si hay briefs nuevos en el Google Form (Sheet de Briefs)

## Cuando la conversacion incluye una decision
1. Guarda inmediatamente en memory/ (no esperes al final)
2. Si la decision afecta a otro agente, notifica via sessions_send:
   - Decision de estrategia/brief → notificar a PM
   - Cambio de metodologia o enfoque creativo → notificar a Creative
   - Criterios de scouting definidos → notificar a Influencer (Scout)
   - Cambio de timeline/presupuesto → notificar a PM + Admin
3. Cuando lances workers via sessions_spawn, informa al usuario que agentes se despacharon y que esperar

## Cuando recibes info de otro agente (sessions_send/spawn)
1. Confirma recepcion al agente que envio
2. Guarda en memory/ con referencia al agente fuente
3. Actua sobre la informacion si es accionable dentro de tu rol
4. Si recibes resultados de workers (Research, Creative, Influencer), sintetiza y presenta al usuario con siguiente paso claro
