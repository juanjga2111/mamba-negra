# Gateway Config Audit & Changes — OpenClaw v2026.4.1

**Fecha**: 2026-04-02 (ultima revision: 2026-04-07)
**VM**: openclaw-mambanegra (34.176.239.204)
**Version**: OpenClaw 2026.4.1 (da64a97)

> **Nota V8.0 (07-Abr-2026)**: El upgrade V8.0 NO modifico openclaw.json ni la configuracion del gateway. Todas las mejoras V8.0 fueron a nivel de workspace files (AGENTS.md, SOUL.md, TOOLS.md, HEARTBEAT.md). Los cambios documentados abajo siguen siendo el estado actual de la configuracion del gateway.

---

## Resumen Ejecutivo

Se encontraron **11 problemas** en la configuracion actual. De ellos:
- **3 criticos** (funcionalidad rota)
- **5 importantes** (afectan rendimiento/seguridad)
- **3 mejoras** (optimizacion)

---

## Tabla de Cambios

| # | Prioridad | Problema | Cambio | Impacto |
|---|-----------|----------|--------|---------|
| 1 | CRITICO | extraPaths de memoria rotas — rutas se concatenan mal (`workspace/estratega/~/.openclaw/workspace/...`) | Cambiar a rutas absolutas `/home/juanj/.openclaw/workspace/*/knowledge` | Memoria knowledge/ invisible para TODOS los agentes |
| 2 | CRITICO | `tools.agentToAgent` no configurado — sessions_send entre peers no funciona | Habilitar `tools.agentToAgent.enabled: true` | Agentes no pueden comunicarse entre si via sessions_send |
| 3 | CRITICO | `session.agentToAgent` no configurado — sin limite de ping-pong | Configurar `session.agentToAgent.maxPingPongTurns: 3` | Sin limite, loops infinitos posibles entre agentes |
| 4 | IMPORTANTE | Orquestador sin tool gating — puede hacer todo el trabajo en vez de delegar | Agregar `tools.deny: ["group:fs"]` al orquestador | Forzar delegacion: sin fs, DEBE usar sessions_spawn |
| 5 | IMPORTANTE | 10/14 sesiones activas en 128k context (pre-cambio a 1M) | Ejecutar `sessions cleanup --all-agents --enforce` | Sesiones viejas consumen tokens innecesariamente |
| 6 | IMPORTANTE | Research/Creative/Influencer no pueden sessions_send al Orquestador | Agregar `"orquestador"` a `subagents.allowAgents` de cada worker | Workers no pueden reportar resultados al Orquestador |
| 7 | IMPORTANTE | Admin sin `thinkingDefault: "off"` — usa Flash pero gasta tokens en thinking | Agregar `"thinkingDefault": "off"` al agente Admin | Optimizar costo/velocidad de Flash |
| 8 | IMPORTANTE | Prometeo usa `github-copilot/gemini-3.1-pro-preview` — provider no estandar | Cambiar a `google/gemini-3.1-pro` | Consistencia y fiabilidad del modelo |
| 9 | MEJORA | `maxConcurrent: 4` global puede limitar ejecucion paralela de 7 agentes | Subir a `maxConcurrent: 7` | Permitir que todos los agentes atiendan simultaneamente |
| 10 | MEJORA | Orquestador workspace apunta a `estratega` (nombre legacy) | Renombrar workspace dir de `estratega` a `orquestador` | Consistencia entre agent ID y workspace |
| 11 | MEJORA | Sin per-agent contextTokens para PM/Admin (Flash no usa 1M) | Configurar `contextTokens: 200000` para PM y Admin | Reducir costos de context window para modelos Flash |

---

## Detalle de Cada Cambio

### 1. [CRITICO] Fix extraPaths de memoria

**Problema**: Las rutas en `agents.defaults.memorySearch.extraPaths` usan `~/.openclaw/workspace/*/knowledge` (relative con tilde). OpenClaw resuelve la tilde RELATIVA al workspace del agente, resultando en paths dobles como:
```
~/.openclaw/workspace/estratega/~/.openclaw/workspace/estratega/knowledge
```
Esto causa que `openclaw memory status` reporte "additional memory path missing" para los 7 agentes (35 paths rotos en total).

**Solucion**: Usar rutas absolutas completas.

**Comando**:
```bash
openclaw config set agents.defaults.memorySearch.extraPaths '["/home/juanj/.openclaw/workspace/estratega/knowledge","/home/juanj/.openclaw/workspace/research/knowledge","/home/juanj/.openclaw/workspace/creative/knowledge","/home/juanj/.openclaw/workspace/influencer/knowledge","/home/juanj/.openclaw/workspace/pm/knowledge"]' --strict-json
```

**Despues del fix, forzar re-indexacion**:
```bash
openclaw memory index --force
```

---

### 2. [CRITICO] Habilitar tools.agentToAgent

**Problema**: `tools.agentToAgent` no existe en la config. Sin esto, `sessions_send` entre agentes peer (no sub-agentes) no funciona. Los workers no pueden enviar mensajes directos a otros workers.

**Comando**:
```bash
openclaw config set tools.agentToAgent '{"enabled": true}' --strict-json
```

---

### 3. [CRITICO] Configurar session.agentToAgent.maxPingPongTurns

**Problema**: Sin limite de ping-pong turns, dos agentes podrian entrar en un loop infinito de mensajes (especialmente con la delegacion automatica). El default de la documentacion es 5, pero 3 es mas seguro para el caso de uso de MNL (delegacion simple, no conversaciones largas).

**Comando**:
```bash
openclaw config set session.agentToAgent '{"maxPingPongTurns": 3}' --strict-json
```

---

### 4. [IMPORTANTE] Tool gating para Orquestador — forzar delegacion

**Problema**: El Orquestador tiene acceso a TODAS las herramientas (profile default = full). Puede leer/escribir archivos, ejecutar codigo, etc. En la sesion con Mar (02-Abr), el Orquestador escribio la metodologia RAYO en vez de delegarla a Creative.

**Solucion**: Denegar `group:fs` y `group:runtime` al Orquestador. Si no puede escribir archivos ni ejecutar comandos, DEBE delegar via `sessions_spawn`.

**Nota**: Esto requiere editar `openclaw.json` directamente (el orquestador es `agents.list[0]`). No se puede usar `openclaw config set` para arrays indexados facilmente.

**Cambio en openclaw.json** (dentro de `agents.list[0]`, el orquestador):
```json
{
  "id": "orquestador",
  "tools": {
    "deny": ["group:fs", "group:runtime"]
  },
  ...
}
```

**Comando via python3** (edicion directa):
```bash
python3 -c "
import json
with open('/home/juanj/.openclaw/openclaw.json') as f:
    cfg = json.load(f)
for agent in cfg['agents']['list']:
    if agent['id'] == 'orquestador':
        agent['tools'] = {'deny': ['group:fs', 'group:runtime']}
        break
with open('/home/juanj/.openclaw/openclaw.json', 'w') as f:
    json.dump(cfg, f, indent=2)
print('OK: orquestador tools.deny set')
"
```

**Importante**: El Orquestador MANTIENE acceso a:
- `group:sessions` (sessions_spawn, sessions_send, sessions_list)
- `group:memory` (memory_search)
- `group:web` (web_search, web_fetch)
- `group:messaging` (message — para Telegram)
- Skills (gog, mcporter)

---

### 5. [IMPORTANTE] Limpiar sesiones viejas en 128k context

**Problema**: 10 de 14 sesiones activas fueron creadas ANTES de configurar `contextTokens: 1000000`. Estas sesiones estan trabadas en 128k (el default anterior de Gemini). Solo las sesiones nuevas usan 1M.

**Paso 1 — Preview**:
```bash
openclaw sessions cleanup --all-agents --dry-run
```

**Paso 2 — Ejecutar**:
```bash
openclaw sessions cleanup --all-agents --enforce
```

**Nota**: Esto NO borra sesiones activas del dia. Solo limpia sesiones stale. Las sesiones en 128k necesitaran ser re-creadas organicamente (el usuario envia nuevo mensaje, se crea nueva sesion con 1M context).

---

### 6. [IMPORTANTE] Agregar Orquestador a allowAgents de workers

**Problema actual**:
- Research: `allowAgents: ["creative", "influencer"]` — NO puede enviar a Orquestador
- Creative: `allowAgents: ["research", "influencer"]` — NO puede enviar a Orquestador
- Influencer: `allowAgents: ["research", "creative"]` — NO puede enviar a Orquestador

**Solucion**: Agregar `"orquestador"` a los 3 workers para que puedan reportar resultados.

**Comando via python3**:
```bash
python3 -c "
import json
with open('/home/juanj/.openclaw/openclaw.json') as f:
    cfg = json.load(f)
workers = ['research', 'creative', 'influencer']
for agent in cfg['agents']['list']:
    if agent['id'] in workers:
        allowed = agent.get('subagents', {}).get('allowAgents', [])
        if 'orquestador' not in allowed:
            allowed.append('orquestador')
            agent.setdefault('subagents', {})['allowAgents'] = allowed
            print(f'{agent[\"id\"]}: added orquestador to allowAgents')
with open('/home/juanj/.openclaw/openclaw.json', 'w') as f:
    json.dump(cfg, f, indent=2)
print('OK: workers can now send to orquestador')
"
```

---

### 7. [IMPORTANTE] thinkingDefault off para Admin

**Problema**: Admin usa `google/gemini-3-flash` pero no tiene `thinkingDefault: "off"` (a diferencia de PM que si lo tiene). Flash gasta tokens innecesarios en thinking sin beneficio real para tareas administrativas.

**Comando via python3**:
```bash
python3 -c "
import json
with open('/home/juanj/.openclaw/openclaw.json') as f:
    cfg = json.load(f)
for agent in cfg['agents']['list']:
    if agent['id'] == 'admin':
        agent['thinkingDefault'] = 'off'
        print('OK: admin thinkingDefault set to off')
        break
with open('/home/juanj/.openclaw/openclaw.json', 'w') as f:
    json.dump(cfg, f, indent=2)
"
```

---

### 8. [IMPORTANTE] Corregir modelo de Prometeo

**Problema**: Prometeo usa `github-copilot/gemini-3.1-pro-preview` como modelo primario. Este es un provider no estandar que pasa por GitHub Copilot como proxy. Deberia usar directamente `google/gemini-3.1-pro` para consistencia.

**Comando via python3**:
```bash
python3 -c "
import json
with open('/home/juanj/.openclaw/openclaw.json') as f:
    cfg = json.load(f)
for agent in cfg['agents']['list']:
    if agent['id'] == 'prometeo':
        agent['model'] = {
            'primary': 'google/gemini-3.1-pro',
            'fallbacks': ['google/gemini-2.5-pro']
        }
        print('OK: prometeo model set to google/gemini-3.1-pro')
        break
with open('/home/juanj/.openclaw/openclaw.json', 'w') as f:
    json.dump(cfg, f, indent=2)
"
```

---

### 9. [MEJORA] Subir maxConcurrent global de 4 a 7

**Problema**: `agents.defaults.maxConcurrent: 4` limita a 4 sesiones de agente simultaneas. Con 7 agentes, si 5+ usuarios hablan al mismo tiempo, se encolan.

**Comando**:
```bash
openclaw config set agents.defaults.maxConcurrent 7
```

---

### 10. [MEJORA] Renombrar workspace de estratega a orquestador

**Problema**: El workspace del agente `orquestador` apunta a `~/.openclaw/workspace/estratega` (nombre legacy de V1). Esto causa confusion y los extraPaths de memoria usan el nombre viejo.

**Pasos** (ejecutar en la VM):
```bash
# 1. Copiar workspace (NO mover, para rollback)
cp -r /home/juanj/.openclaw/workspace/estratega /home/juanj/.openclaw/workspace/orquestador

# 2. Actualizar openclaw.json (workspace + agentDir)
python3 -c "
import json
with open('/home/juanj/.openclaw/openclaw.json') as f:
    cfg = json.load(f)
for agent in cfg['agents']['list']:
    if agent['id'] == 'orquestador':
        agent['workspace'] = '~/.openclaw/workspace/orquestador'
        agent['agentDir'] = '~/.openclaw/agents/orquestador/agent'
        break
# Update extraPaths too
paths = cfg['agents']['defaults']['memorySearch']['extraPaths']
cfg['agents']['defaults']['memorySearch']['extraPaths'] = [
    p.replace('/estratega/', '/orquestador/') for p in paths
]
with open('/home/juanj/.openclaw/openclaw.json', 'w') as f:
    json.dump(cfg, f, indent=2)
print('OK')
"

# 3. Copiar agentDir
mkdir -p /home/juanj/.openclaw/agents/orquestador/agent
cp -r /home/juanj/.openclaw/agents/estratega/agent/* /home/juanj/.openclaw/agents/orquestador/agent/ 2>/dev/null

# 4. Verificar y luego borrar viejo (despues de confirmar que funciona)
# rm -rf /home/juanj/.openclaw/workspace/estratega
```

**NOTA**: Este cambio es mas invasivo. Recomiendo aplicarlo DESPUES de los demas y verificar que todo funcione primero.

---

### 11. [MEJORA] contextTokens reducido para PM y Admin (Flash)

**Problema**: PM y Admin heredan `contextTokens: 1000000` del default, pero usan Gemini 3 Flash. Flash tiene un context window real menor, y 1M tokens de context es innecesario para tareas administrativas.

**Comando via python3**:
```bash
python3 -c "
import json
with open('/home/juanj/.openclaw/openclaw.json') as f:
    cfg = json.load(f)
for agent in cfg['agents']['list']:
    if agent['id'] in ('pm', 'admin'):
        agent['contextTokens'] = 200000
        print(f'{agent[\"id\"]}: contextTokens set to 200000')
with open('/home/juanj/.openclaw/openclaw.json', 'w') as f:
    json.dump(cfg, f, indent=2)
"
```

---

## Orden de Aplicacion

Los cambios deben aplicarse en este orden (dependencias entre parentesis):

1. **Cambio #1** — Fix extraPaths de memoria (no depende de nada)
2. **Cambio #2** — Habilitar tools.agentToAgent (no depende de nada)
3. **Cambio #3** — Configurar maxPingPongTurns (requiere #2)
4. **Cambio #6** — Agregar orquestador a allowAgents de workers (requiere #2 para ser util)
5. **Cambio #4** — Tool gating del Orquestador (no depende, pero aplicar despues de #6)
6. **Cambio #7** — Admin thinkingDefault off
7. **Cambio #8** — Prometeo model fix
8. **Cambio #9** — maxConcurrent global
9. **Cambio #11** — contextTokens para PM/Admin
10. **Cambio #5** — Limpiar sesiones (ejecutar despues de todo lo demas)
11. **Cambio #10** — Renombrar workspace (ejecutar AL FINAL, requiere restart)

---

## Script Bash Completo

Copiar y ejecutar en la VM despues de SSH:

```bash
#!/bin/bash
set -euo pipefail

# Cargar entorno
export PATH=/home/juanj/.local/share/fnm:$PATH
eval "$(fnm env --shell bash)"

echo "=== [1/11] Fixing memory extraPaths ==="
openclaw config set agents.defaults.memorySearch.extraPaths '["/home/juanj/.openclaw/workspace/estratega/knowledge","/home/juanj/.openclaw/workspace/research/knowledge","/home/juanj/.openclaw/workspace/creative/knowledge","/home/juanj/.openclaw/workspace/influencer/knowledge","/home/juanj/.openclaw/workspace/pm/knowledge"]' --strict-json

echo "=== [2/11] Enabling tools.agentToAgent ==="
openclaw config set tools.agentToAgent '{"enabled": true}' --strict-json

echo "=== [3/11] Setting session.agentToAgent.maxPingPongTurns ==="
openclaw config set session.agentToAgent '{"maxPingPongTurns": 3}' --strict-json

echo "=== [4-8/11] Per-agent config changes (python3 batch) ==="
python3 -c "
import json

with open('/home/juanj/.openclaw/openclaw.json') as f:
    cfg = json.load(f)

changes = []

for agent in cfg['agents']['list']:
    aid = agent['id']

    # Change 4: Tool gating for orquestador
    if aid == 'orquestador':
        agent['tools'] = {'deny': ['group:fs', 'group:runtime']}
        changes.append(f'{aid}: tools.deny = [group:fs, group:runtime]')

    # Change 6: Add orquestador to workers' allowAgents
    if aid in ('research', 'creative', 'influencer'):
        allowed = agent.get('subagents', {}).get('allowAgents', [])
        if 'orquestador' not in allowed:
            allowed.append('orquestador')
            agent.setdefault('subagents', {})['allowAgents'] = allowed
            changes.append(f'{aid}: added orquestador to allowAgents -> {allowed}')

    # Change 7: Admin thinkingDefault
    if aid == 'admin':
        agent['thinkingDefault'] = 'off'
        changes.append(f'{aid}: thinkingDefault = off')

    # Change 8: Prometeo model fix
    if aid == 'prometeo':
        agent['model'] = {
            'primary': 'google/gemini-3.1-pro',
            'fallbacks': ['google/gemini-2.5-pro']
        }
        changes.append(f'{aid}: model = google/gemini-3.1-pro')

    # Change 11: contextTokens for PM/Admin
    if aid in ('pm', 'admin'):
        agent['contextTokens'] = 200000
        changes.append(f'{aid}: contextTokens = 200000')

with open('/home/juanj/.openclaw/openclaw.json', 'w') as f:
    json.dump(cfg, f, indent=2)

for c in changes:
    print(f'  OK: {c}')
"

echo "=== [9/11] Setting maxConcurrent to 7 ==="
openclaw config set agents.defaults.maxConcurrent 7

echo "=== [10/11] Session cleanup (dry-run first) ==="
openclaw sessions cleanup --all-agents --dry-run
echo ""
echo ">>> Review above. To execute: openclaw sessions cleanup --all-agents --enforce"

echo "=== [11/11] Workspace rename (MANUAL STEP) ==="
echo ">>> Run these AFTER restart and verification:"
echo "    cp -r /home/juanj/.openclaw/workspace/estratega /home/juanj/.openclaw/workspace/orquestador"
echo "    # Then update openclaw.json workspace/agentDir paths"
echo "    # Then restart gateway"

echo ""
echo "=== Re-indexing memory ==="
openclaw memory index --force

echo ""
echo "=== Restarting gateway ==="
kill $(ps aux | grep openclaw | grep -v grep | awk '{print $2}') 2>/dev/null || true
sleep 2
set -a && source /home/juanj/.openclaw/.env && set +a
nohup openclaw gateway &>/tmp/openclaw-gw.log & disown
sleep 8

echo ""
echo "=== Health check ==="
openclaw health

echo ""
echo "=== Verifying memory paths ==="
openclaw memory status 2>&1 | grep -E "(Issues:|missing)" | head -10

echo ""
echo "=== DONE ==="
echo "Check gateway logs: tail -30 /tmp/openclaw-gw.log"
```

---

## Verificacion Post-Deploy

Despues de aplicar los cambios, verificar:

1. **Memory paths**: `openclaw memory status` — ya no debe mostrar "additional memory path missing"
2. **Agent-to-agent**: Enviar mensaje al Orquestador pidiendo que delegue a Research — debe usar sessions_spawn
3. **Tool gating**: Verificar que el Orquestador NO puede escribir archivos: `/context tools` en sesion
4. **Sessions**: `openclaw sessions --all-agents --active 60` — nuevas sesiones deben mostrar 1000k context
5. **Gateway logs**: `tail -30 /tmp/openclaw-gw.log` — sin errores de config
6. **Config valid**: `openclaw health` — debe reportar config valida

---

## Config State Summary (Before vs After)

| Setting | Before | After |
|---------|--------|-------|
| `tools.agentToAgent.enabled` | (not set) | `true` |
| `session.agentToAgent.maxPingPongTurns` | (not set) | `3` |
| `agents.defaults.memorySearch.extraPaths` | Relative (~/ paths, broken) | Absolute (/home/juanj/... paths) |
| `agents.defaults.maxConcurrent` | 4 | 7 |
| Orquestador `tools.deny` | (not set) | `["group:fs", "group:runtime"]` |
| Research `subagents.allowAgents` | `[creative, influencer]` | `[creative, influencer, orquestador]` |
| Creative `subagents.allowAgents` | `[research, influencer]` | `[research, influencer, orquestador]` |
| Influencer `subagents.allowAgents` | `[research, creative]` | `[research, creative, orquestador]` |
| Admin `thinkingDefault` | (inherited: low) | `off` |
| Admin `contextTokens` | (inherited: 1000000) | `200000` |
| PM `contextTokens` | (inherited: 1000000) | `200000` |
| Prometeo `model.primary` | `github-copilot/gemini-3.1-pro-preview` | `google/gemini-3.1-pro` |
