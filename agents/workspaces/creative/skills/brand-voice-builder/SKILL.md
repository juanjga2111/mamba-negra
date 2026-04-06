---
name: brand-voice-builder
description: Activa cuando necesiten crear o actualizar el perfil de voz de una marca, definir tono y personalidad para campana, digan "arma el brand voice de [marca]", "define la voz de [cliente]", o cuando no exista perfil de voz y sea necesario para avanzar con la propuesta creativa.
---

# Brand Voice Builder — Perfil de Voz de Marca

Este skill guia la creacion o actualizacion de perfiles de voz de marca para los clientes de Mamba Negra. El perfil de voz es el documento que garantiza coherencia entre la estrategia, el concepto y el contenido de influencers.

---

## CUANDO SE ACTIVA

- El Orquestador o el equipo necesitan definir la voz de una marca nueva
- No existe perfil en `knowledge/brands/` y se necesita para avanzar con la propuesta
- El equipo quiere actualizar el perfil de un cliente existente
- Se va a crear contenido y no hay guia de tono clara

---

## PASO 01: VERIFICAR SI YA EXISTE PERFIL

### Buscar en knowledge/:
```
memory_search "brand voice [marca]"
```

### Buscar en Drive:
```bash
gog drive search "brand voice [marca]" --max 5
```

### Si ya existe:
Leelo, valida que este actualizado, y sugiere ajustes si es necesario. Pregunta al equipo si algo cambio.

### Si NO existe:
Avanza al paso 02 para crear uno desde cero.

---

## PASO 02: RECOPILAR INSUMOS

Para construir un buen perfil de voz necesitas:

1. **Brief del cliente** — objetivo, target, tono esperado
2. **Redes de la marca** — como se comunican actualmente (si tienen presencia)
3. **Categoria** — como hablan las marcas de la misma vertical
4. **Target** — como habla y consume contenido la audiencia
5. **Do's/don'ts del cliente** — restricciones o preferencias explicitas

Si tienes el brief, puedes arrancar con eso. Si no, pide lo que necesites.

---

## PASO 03: CONSTRUIR EL PERFIL

### Estructura del perfil de voz:

```
BRAND VOICE PROFILE — [MARCA]
Fecha: [fecha]
Categoria: [vertical]

---

PERSONALIDAD (3 adjetivos):
1. [adjetivo 1] — [que significa en la practica]
2. [adjetivo 2] — [que significa en la practica]
3. [adjetivo 3] — [que significa en la practica]

TONO EN REDES:
[Como suena la marca en redes sociales — 2-3 lineas con ejemplos]

FRASES SI (el tipo de lenguaje que usa):
- "[ejemplo 1]"
- "[ejemplo 2]"
- "[ejemplo 3]"

FRASES NO (el tipo de lenguaje que evita):
- "[ejemplo 1]"
- "[ejemplo 2]"
- "[ejemplo 3]"

AUDIENCIA CORE:
[Descripcion del target principal — demografico + psicografico]

LOOK & FEEL:
[Estetica visual — colores, estilo fotografico, mood]

DO'S:
- [lo que la marca SI hace en comunicacion]
- [lo que SI funciona con su audiencia]

DON'TS:
- [lo que la marca NO hace]
- [lo que NO resuena con su audiencia]

TIPO DE INFLUENCER IDEAL:
[Que tipo de creador encaja con esta voz — tier, nicho, tono, estetica]

REFERENCIA:
[1-2 marcas o cuentas que tienen un tono similar al deseado]
```

---

## PASO 04: VALIDAR CON EL EQUIPO

**Pregunta a Mar**: "Este es el perfil de voz que propongo para [marca]. Que ajustarias? Hay algo del tono que yo no pueda saber solo con el brief?"

Es critico que Mar valide — ella conoce al cliente y sabe como quieren sonar. El perfil puede ajustarse despues de cada campana.

---

## PASO 05: GUARDAR

Una vez aprobado:

1. Guardar en `knowledge/brands/[marca].md`
2. Actualizar memoria si es la primera vez: `memory_search` ya indexara el archivo

Si actualizaste un perfil existente, registra el cambio en `memory/YYYY-MM-DD.md`.

---

## REGLAS

1. **Mar valida** — tu propones, ella ajusta. El perfil no es final sin su OK.
2. **Basado en evidencia** — no inventes la voz. Basate en el brief, las redes de la marca, y la categoria.
3. **Los ejemplos son clave** — "Frases SI" y "Frases NO" son lo que mas usa el equipo al crear contenido. Hazlos concretos.
4. **El influencer ideal conecta** — el tipo de influencer no es generico. Debe reflejar la personalidad de la marca.
5. **Se actualiza** — el perfil de voz evoluciona. Si despues de una campana hay feedback, actualizar el perfil.
6. **Template disponible** — si necesitas la plantilla base, esta en `knowledge/brands/_template.md`.
