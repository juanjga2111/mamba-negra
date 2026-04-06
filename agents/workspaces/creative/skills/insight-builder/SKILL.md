---
name: insight-builder
description: Activa cuando pidan insights, propongan hallazgos para una campana, digan "necesito un insight", "propone insights para [campana]", "hallazgo para [marca]", o compartan investigacion para transformar en insight.
---

# Insight Builder — De Investigacion a Verdad Humana

Este skill guia el proceso de transformar investigacion de mercado en insights accionables para la campana.

**Principio fundamental**: El insight NO es un dato. Es una revelacion. Es lo que el target reconoce como propio, expresado en lenguaje coloquial.

---

## PASO 01: VERIFICAR QUE HAY RESEARCH

Antes de construir insights, necesitas investigacion como materia prima.

### Si te comparten research directamente:
Recibelo y avanza al paso 02.

### Si NO hay research:
Dile al equipo:

```
Para construir un buen insight necesito investigacion — datos duros y datos sociales.
Recomiendo consultar a @ResearchMambaBot primero con el brief de [marca].

Si ya tienen datos sueltos o intuiciones, compartanlos y trabajo con eso,
pero el resultado sera mas fuerte con investigacion completa.
```

### Si hay research parcial:
Trabaja con lo que hay, pero señala los vacios: "Tengo datos de [X] pero me falta [Y]. El insight puede estar incompleto sin esa pieza."

---

## FLUJO RECOMENDADO

Primero ejecuta el Paso 02 con enfoque Tipo 2 (descubrir verdades ocultas e interpretar). Luego usa el Paso 03 con enfoque Tipo 1 (sintetizar en frases de una linea). El descubrimiento alimenta la sintesis.

---

## PASO 02: ANALIZAR LA INVESTIGACION

Lee toda la investigacion disponible buscando:

- **Tensiones**: Contradicciones entre lo que la gente dice y lo que hace
- **Verdades no dichas**: Lo que el target siente pero no expresa abiertamente
- **Patrones culturales**: Comportamientos compartidos que revelan algo mas profundo
- **Frustraciones reales**: Problemas que la categoria no esta resolviendo
- **Deseos ocultos**: Lo que el target quiere pero no pide porque cree que no es posible

Conecta cada hallazgo con:
- El brief (objetivo de la campana)
- El target (quien es, como vive, que le importa)
- La marca (que puede ofrecer de forma autentica)

---

## PASO 03: PROPONER OPCIONES DE INSIGHT

Presenta 3-4 opciones de insight en formato coloquial:

```
INSIGHTS PROPUESTOS — [MARCA]

OPCION 1: "[insight en lenguaje coloquial — como lo diria el target]"
Por que conecta: [relacion con el reto de marca y la realidad de la audiencia]
Riesgo: [posible problema o limitacion]

OPCION 2: "[insight]"
Por que conecta: [argumento]
Riesgo: [si aplica]

OPCION 3: "[insight]"
Por que conecta: [argumento]
Riesgo: [si aplica]

OPCION NUEVA: "[insight que el equipo no considero — tu aporte como creative]"
Por que conecta: [argumento]
Riesgo: [si aplica]
Por que vale la pena explorar: [que lo hace diferente de las opciones esperadas]
```

### Reglas para cada insight:

- **Lenguaje coloquial** — como lo diria una persona real, no un planner
- **Especifico al target** — no verdades universales ("la gente quiere ser feliz")
- **Accionable** — debe poder traducirse en concepto creativo
- **Reconocible** — el target debe sentir "eso me pasa a mi"

### La opcion nueva:

Siempre incluye una opcion que el equipo probablemente no considero. Puede ser:
- Un angulo cultural no explorado
- Una tension que aparecio en los datos pero que nadie conecto con la marca
- Una verdad incomoda que la categoria evita
- Un insight de una categoria adyacente que aplica

---

## PASO 04: ITERAR CON EL EQUIPO

**Pregunta a Mar/equipo**: "Cual te conecta mas? Quieres que profundice alguno?"

Posibles respuestas y como manejarlas:

- **"Me gusta la opcion X"** → Profundiza esa opcion. Desarrolla como se traduce en concepto
- **"Ninguna me convence"** → Pregunta que falta. Pide direccion o datos adicionales. Si necesitas mas research, recomienda @ResearchMambaBot
- **"Mezcla de X e Y"** → Fusiona y presenta version refinada
- **"Tengo otra idea"** → Escucha, evalua, construye encima

---

## PROMPTS DE REFERENCIA (Banco de Prompts MNL — Notion)

Usa estos prompts como guia de calidad para tu proceso. No los ejecutes literalmente — internaliza su logica.

### Tipo 1: Insight como sintesis (unificar hallazgos)

**Cuando usarlo**: cuando tienes multiples hallazgos y necesitas convertirlos en 1-3 insights claros, cortos y usables para campana.

**Logica del prompt**: A partir de hallazgos de investigacion, construir insights que sinteticen la informacion (no la repitan), conecten los distintos hallazgos en una sola verdad, y se puedan usar como base de campana. El insight debe estar escrito en una sola frase, sonar humano y coloquial (como si saliera del consumidor), y tener tension (revelar un comportamiento real, no obvio). Si el insight suena a estudio, no sirve.

**Output esperado**: frases "de consumidor" (una sola linea). Evita insights largos o racionales.

### Tipo 2: Insight como interpretacion (descubrir verdades ocultas)

**Cuando usarlo**: cuando quieres ir mas alla del dato y traducir comportamiento en tensiones humanas reales.

**Logica del prompt**: A partir de la investigacion, identificar insights que revelen verdades humanas ocultas detras del comportamiento. No describir el dato — interpretarlo. Encontrar la tension (lo que la gente hace vs lo que siente/piensa). Escribirlo en lenguaje natural, como si lo dijera el consumidor. Buscar angulos nuevos o no explotados.

**Output esperado**: interpretacion + angulos nuevos. Evita "dato disfrazado de insight".

---

## REGLAS

1. **No propongas insights sin investigacion** — si no hay datos, pidelos primero
2. **Mar decide** — tu propones con conviccion, ella elige
3. **Siempre incluye la opcion nueva** — tu valor es aportar lo que el equipo no ve
4. **Si el insight es debil, dilo** — "Este insight funciona pero no es fuerte porque [razon]"
5. **Conecta con el brief** — un insight brillante que no sirve para la campana no sirve
6. **Desarrolla a fondo** — cada opcion con minimo 3-5 lineas de argumentacion. NO entregues insights sin explicar por que conectan
