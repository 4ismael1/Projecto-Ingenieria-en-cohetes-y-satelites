# Historial de uso de IA

## Información general

- Nombre del estudiante:
- Proyecto: Orbital Systems Sizer
- Curso: Ingeniería de Cohetes y Satélites
- Fecha de entrega: 30 de mayo de 2026
- Herramienta de IA utilizada:
- Modelo, si se conoce:
- Fecha(s) de uso:

## Declaración de uso

Esta herramienta fue desarrollada con apoyo de IA generativa para fines académicos en la asignatura Ingeniería de Cohetes y Satélites. Los cálculos implementados corresponden a un dimensionamiento preliminar y no sustituyen análisis detallados de ingeniería.

La IA fue utilizada como herramienta de apoyo para organizar el alcance del proyecto, revisar fórmulas, estructurar la interfaz, implementar cálculos preliminares, preparar documentación técnica y redactar instrucciones de uso. El contenido final debe ser revisado, probado y adaptado por el estudiante.

## Prompts utilizados durante el desarrollo

### Prompt 1: Definición del proyecto y alcance inicial

**Objetivo del prompt:**

Definir el alcance general de la herramienta, sus módulos principales y el tipo de entregable esperado.

**Prompt enviado:**

```text
Necesito desarrollar una herramienta web para la asignatura Ingeniería de Cohetes y Satélites. La herramienta debe permitir dimensionar de forma preliminar dos subsistemas de una misión espacial simple: comunicaciones y potencia eléctrica.

Debe funcionar sin backend, abrirse directamente desde index.html y permitir ingresar parámetros de misión, órbita, enlace de comunicaciones, consumos por subsistema, paneles solares y baterías. También debe mostrar resultados claros, fórmulas utilizadas, advertencias técnicas y una sección de documentación para el usuario.

Quiero que el proyecto tenga una interfaz profesional, moderna y temática espacial, pero manteniendo un enfoque académico e ingenieril.
```

**Respuesta o resumen recibido:**

La IA propuso una aplicación web estática basada en HTML, CSS y JavaScript, organizada en módulos de misión, comunicaciones, potencia, resultados, fórmulas y ayuda. También recomendó evitar dependencias innecesarias para facilitar la entrega offline.

**Cómo se usó en el proyecto:**

- Se definió la estructura principal de pantallas.
- Se decidió implementar una aplicación sin backend.
- Se establecieron los archivos base del entregable.

**Cambios realizados por el estudiante:**

- Se ajustó el alcance para que la herramienta fuera útil como apoyo académico y no como software profesional de diseño espacial.

---

### Prompt 2: Implementación de cálculos de comunicaciones y potencia

**Objetivo del prompt:**

Solicitar la implementación de los cálculos principales del presupuesto de enlace y del sistema eléctrico.

**Prompt enviado:**

```text
Implementa los cálculos principales para el presupuesto de enlace y el sistema eléctrico.

Para comunicaciones necesito calcular potencia transmitida en dBW, longitud de onda, pérdida de espacio libre, potencia recibida, densidad de ruido, C/N0, Eb/N0 y margen de enlace.

Para potencia necesito calcular potencia promedio por subsistema, potencia total, potencia de diseño con margen, energía por órbita, energía durante eclipse, capacidad mínima de batería, capacidad en Ah, potencia solar requerida, área mínima de panel solar y degradación al final de vida.

Incluye validaciones para evitar valores físicamente inválidos y muestra advertencias cuando los datos no sean coherentes.
```

**Respuesta o resumen recibido:**

La IA generó funciones separadas para conversiones, cálculos de comunicaciones, cálculos eléctricos, validaciones y renderizado de resultados. También propuso estados de diseño como adecuado, ajustado y crítico.

**Cómo se usó en el proyecto:**

- Se implementó el cálculo de presupuesto de enlace.
- Se implementó el balance preliminar de potencia.
- Se agregaron validaciones para entradas críticas.

**Cambios realizados por el estudiante:**

- Se revisaron unidades y valores por defecto para que fueran coherentes con ejercicios de satélites pequeños.

---

### Prompt 3: Diseño de interfaz y experiencia de usuario

**Objetivo del prompt:**

Mejorar la presentación visual y hacer que la herramienta fuera entendible para una persona que no conoce el código.

**Prompt enviado:**

```text
Mejora la interfaz para que no parezca un dashboard genérico. Quiero que se sienta como una herramienta técnica de misión espacial, con navegación por pasos, panel de misión, módulos separados para comunicaciones y potencia, sección de resultados y simulación visual del satélite.

La interfaz debe ser responsive, funcionar bien en móvil y escritorio, usar tema oscuro espacial, jerarquía clara, gráficos legibles y botones funcionales para copiar, exportar e imprimir resultados.

Evita depender de librerías externas para que la herramienta pueda abrirse sin conexión.
```

**Respuesta o resumen recibido:**

La IA reorganizó la interfaz en un flujo por pasos, propuso un tema oscuro espacial, paneles técnicos, gráficos SVG generados localmente y controles de exportación sin backend.

**Cómo se usó en el proyecto:**

- Se creó navegación por secciones.
- Se mejoró el diseño responsive.
- Se agregaron gráficos e indicadores visuales.

**Cambios realizados por el estudiante:**

- Se ajustó la composición visual para evitar elementos superpuestos y mejorar la lectura en pantallas pequeñas.

---

### Prompt 4: Presets de misión y simulación visual

**Objetivo del prompt:**

Agregar escenarios de prueba y una representación visual de la misión.

**Prompt enviado:**

```text
Agrega presets de misión realistas para probar diferentes escenarios: CubeSat LEO básico, CubeSat UHF, microsatélite de observación terrestre, SmallSat SAR, satélite GEO, relay lunar y sonda interplanetaria simplificada.

Cada preset debe cargar automáticamente datos de misión, comunicaciones, potencia y consumos por subsistema.

También mejora el widget de simulación para representar de forma clara la Tierra, la órbita, el satélite, el estado de luz/eclipse y el tipo de vehículo seleccionado.
```

**Respuesta o resumen recibido:**

La IA incorporó presets con parámetros distintos de misión, enlace y potencia. También se agregó una simulación visual mediante Canvas para mostrar el vehículo, la Tierra, la órbita y el estado luz/eclipse.

**Cómo se usó en el proyecto:**

- Se agregaron presets seleccionables.
- Se añadieron distintos modelos visuales de vehículos espaciales.
- Se implementó un widget de simulación offline.

**Cambios realizados por el estudiante:**

- Se corrigieron detalles de sincronización visual y se simplificó la representación para que no interfiriera con los resultados técnicos.

---

### Prompt 5: Documentación, fórmulas y entrega final

**Objetivo del prompt:**

Preparar los documentos necesarios para entregar el proyecto.

**Prompt enviado:**

```text
Genera la documentación necesaria para entregar el proyecto.

Incluye un README.md con descripción del proyecto, instrucciones de uso, módulos, presets, limitaciones, créditos, forma de generar PDF y guía para comprimir la carpeta.

Incluye también un archivo formulas.md con las fórmulas usadas y una plantilla prompt_history_template.md para documentar el uso de IA generativa en el desarrollo.

La documentación debe aclarar que la herramienta es de dimensionamiento preliminar y no sustituye análisis profesionales de ingeniería.
```

**Respuesta o resumen recibido:**

La IA preparó documentación del proyecto, explicación de archivos, instrucciones de apertura, ejemplos de prueba, fórmulas utilizadas y advertencias sobre las limitaciones del modelo.

**Cómo se usó en el proyecto:**

- Se creó `README.md`.
- Se creó `formulas.md`.
- Se preparó la plantilla de historial de uso de IA.

**Cambios realizados por el estudiante:**

- Se revisó el lenguaje para mantener un tono académico y comprensible.

---

### Prompt 6: Manual de usuario

**Objetivo del prompt:**

Crear una guía clara para que cualquier persona pueda usar la herramienta sin explicación adicional.

**Prompt enviado:**

```text
Crea un manual de usuario para que una persona sin experiencia previa pueda abrir la herramienta, cargar presets, modificar parámetros, interpretar los resultados y exportar su simulación.

El manual debe explicar cada pantalla, los principales campos de entrada, los resultados de comunicaciones, los resultados de potencia, los estados del diseño, las advertencias y recomendaciones de uso académico.
```

**Respuesta o resumen recibido:**

La IA generó un manual paso a paso con explicación de pantallas, presets, campos de entrada, interpretación de resultados, advertencias, exportación y limitaciones.

**Cómo se usó en el proyecto:**

- Se creó `MANUAL_USUARIO.md`.
- Se enlazó el manual desde el `README.md`.

**Cambios realizados por el estudiante:**

- Se verificó que el manual explicara el flujo completo de simulación y entrega.

## Resumen de cambios generados

- Se creó una aplicación web offline con HTML, CSS y JavaScript.
- Se implementó un módulo de presupuesto de enlace.
- Se implementó un módulo de potencia y energía.
- Se agregaron presets de prueba para distintas misiones.
- Se agregaron validaciones y advertencias técnicas.
- Se implementó una simulación visual mediante Canvas.
- Se incluyó documentación de fórmulas y limitaciones.
- Se agregó un manual de usuario.
- Se agregó exportación de resumen y opción de impresión/PDF.

## Cómo verificar la herramienta

1. Abrir `index.html` en un navegador moderno.
2. Cargar el preset `CubeSat LEO básico`.
3. Presionar `Calcular misión`.
4. Confirmar que se muestran resultados de comunicaciones y potencia.
5. Cargar el preset `Microsatélite de observación terrestre`.
6. Confirmar que cambian los resultados.
7. Cargar el preset `SmallSat SAR demostrador`.
8. Confirmar que aumenta la demanda eléctrica.
9. Ingresar valores inválidos, por ejemplo frecuencia `0`, y verificar que aparece error.
10. Agregar un subsistema personalizado y recalcular.
11. Probar `Copiar resumen`.
12. Probar `Exportar resumen como texto`.
13. Probar `Imprimir / guardar como PDF`.

## Instrucciones finales de uso

- La herramienta funciona sin internet.
- No requiere instalación.
- Los resultados son preliminares.
- Las fórmulas usadas están documentadas en `formulas.md`.
- El manual de uso está disponible en `MANUAL_USUARIO.md`.
- Para entregar, se puede exportar esta plantilla como PDF y adjuntarla junto al proyecto.

## Reflexión final

La IA ayudó principalmente a estructurar el proyecto, organizar los módulos, redactar documentación y acelerar la implementación inicial de la interfaz y los cálculos. Las partes más importantes que deben revisarse manualmente son las fórmulas, unidades, supuestos, valores de presets y coherencia de resultados.

Las decisiones finales del proyecto corresponden al estudiante, especialmente la selección de parámetros de misión, interpretación de resultados y justificación académica. Como mejora futura, se podrían agregar modelos orbitales más detallados, cálculo de geometría de visibilidad, pérdidas atmosféricas avanzadas, exportación en PDF automática y comparación entre múltiples misiones.
