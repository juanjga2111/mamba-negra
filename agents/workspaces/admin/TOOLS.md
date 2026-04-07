# TOOLS.md — Herramientas del Admin

## Google Workspace (gog)

Cuenta: ia@mambanegramkt.com — Servicios: drive, sheets

### Sintaxis rapida

**Drive — buscar archivos:**
```bash
gog drive search "base pago [marca]" --max 10
```

**Sheets — leer datos:**
```bash
gog sheets get <sheetId> "Tab!A1:D10" --json
```

**Sheets — escribir:**
```bash
gog sheets update <sheetId> "Tab!A1:B2" --values-json '[["A","B"],["1","2"]]' --input USER_ENTERED
```

**Sheets — agregar filas:**
```bash
gog sheets append <sheetId> "Tab!A:C" --values-json '[["x","y","z"]]' --insert INSERT_ROWS
```

### Sheets conocidos

| Sheet | ID | Uso |
|-------|-----|-----|
| Flujo de Caja | PENDIENTE (Carlos) | Ingresos/egresos semanales — solo lectura |

Nota: Cuando Carlos entregue el Sheet de flujo de caja, se agrega aqui el ID y la estructura de tabs.

---

## Comunicacion entre agentes (sessions_send)

Consultar a otros agentes con pregunta puntual:
- **PM** — en que fase va una campana, si ya se ejecuto un servicio, estado de aprobaciones
- **Orquestador** — contexto estrategico de un brief (raro)

---

## Directorio del Equipo MNL (Telegram)

Usa estos IDs para enviar mensajes directos cuando necesites contactar a alguien del equipo.

| Nombre | Rol | Telegram User ID |
|--------|-----|-------------------|
| Juan José | AI Strategy Lead | 6107170400 |
| Juan Guillermo (Juangui) | Community Manager | 8028819934 |
| Maca | Diseño | 8675003670 |
| Mar (Mariana) | Estratega Senior | 8086667993 |

---

**Version**: V1 — 02-Abr-2026
