# Manual de usuario - Orbital Systems Sizer

## 1. Qué es esta herramienta

**Orbital Systems Sizer** es una herramienta web académica para realizar un dimensionamiento preliminar de dos sistemas principales de un vehículo espacial:

- sistema de comunicaciones,
- sistema eléctrico o de potencia.

La herramienta permite cargar una misión de ejemplo, modificar sus parámetros y observar cómo cambian los resultados. Está pensada para ejercicios de satélites pequeños, CubeSats, microsatélites, sondas o misiones espaciales simplificadas.

Los resultados no reemplazan un análisis profesional de ingeniería. Sirven para entender tendencias, comparar escenarios y justificar decisiones preliminares.

## 2. Cómo abrir la aplicación

1. Abre la carpeta del proyecto.
2. Haz doble clic sobre el archivo `index.html`.
3. La herramienta se abrirá en tu navegador.

No necesitas instalar programas, usar internet, abrir una terminal ni ejecutar un servidor.

Navegadores recomendados:

- Google Chrome,
- Microsoft Edge,
- Firefox,
- Safari.

## 3. Estructura general de la interfaz

La aplicación está dividida en cinco pantallas principales:

1. **Misión**
   Define el tipo de vehículo, órbita, altitud, duración de misión y preset base.

2. **Comunicaciones**
   Permite ingresar los datos del enlace de radiofrecuencia, transmisor, receptor y pérdidas.

3. **Potencia**
   Permite definir duración orbital, tiempos de luz/eclipse, paneles solares, baterías y consumo por subsistema.

4. **Resultados**
   Muestra el resumen general, estado del diseño, simulación visual, gráficas, advertencias y recomendaciones.

5. **Referencia**
   Presenta fórmulas, supuestos, conceptos básicos y limitaciones del modelo.

## 4. Flujo recomendado para generar una simulación

Para usar la herramienta correctamente, sigue este flujo:

1. Entra a la pantalla **Misión**.
2. Selecciona un **preset de misión**.
3. Revisa o ajusta los datos generales de la misión.
4. Entra a **Comunicaciones** y modifica los datos del enlace si lo necesitas.
5. Entra a **Potencia** y revisa consumos, paneles y batería.
6. Presiona **Calcular misión** si quieres forzar el cálculo.
7. Entra a **Resultados**.
8. Revisa el estado del diseño: adecuado, ajustado o crítico.
9. Lee las advertencias y recomendaciones.
10. Copia, exporta o imprime el resumen final.

La herramienta también recalcula automáticamente cuando cambias muchos de los campos.

## 5. Uso de presets de misión

Los presets son escenarios precargados. Sirven para empezar rápido sin tener que llenar todos los datos desde cero.

### CubeSat UHF de telemetría

Úsalo para simular un nanosatélite con enlace UHF de baja tasa de datos. Es útil para estudiar comunicaciones simples y consumos moderados.

### CubeSat LEO básico

Preset base recomendado para comenzar. Representa un CubeSat en órbita baja con downlink en banda S y consumo eléctrico moderado.

### Microsatélite de observación terrestre

Escenario más exigente, con mayor tasa de datos, mayor consumo de payload y antenas con más ganancia.

### SmallSat SAR demostrador

Caso de alta demanda eléctrica. Sirve para observar cómo un payload de radar aumenta la potencia de diseño, energía requerida y área solar.

### Satélite GEO de comunicaciones

Escenario de comunicaciones de larga distancia. Usa una distancia de enlace manual representativa de un satélite geoestacionario.

### Relay lunar simplificado

Escenario para estudiar enlaces más largos, con distancia aproximada Tierra-Luna.

### Sonda interplanetaria

Caso simplificado de espacio profundo. Incluye distancias muy grandes e irradiancia solar reducida.

### Caso personalizado

Úsalo cuando quieras construir tu propia misión desde cero o modificar completamente los valores.

## 6. Pantalla Misión

En esta pantalla defines las condiciones generales.

Campos principales:

- **Nombre de misión**: nombre descriptivo del escenario.
- **Tipo de vehículo**: CubeSat, nanosatélite, microsatélite, satélite pequeño, plataforma GEO, relay lunar, sonda u otro.
- **Tipo de órbita**: LEO, MEO, GEO o personalizada.
- **Altitud orbital**: altura aproximada sobre la superficie terrestre, en kilómetros.
- **Duración de misión**: tiempo de operación esperado, en años.
- **Margen general**: margen de diseño usado para ser conservador.

El widget visual muestra una representación simplificada del satélite, la Tierra, la órbita y el estado de la misión.

## 7. Pantalla Comunicaciones

Esta pantalla calcula el presupuesto de enlace.

### Datos orbitales y de enlace

- **Distancia de enlace**: distancia entre satélite y estación o receptor.
- **Estimar distancia desde altitud**: si está activado, la herramienta estima una distancia aproximada.
- **Frecuencia**: frecuencia de transmisión.
- **Unidad de frecuencia**: MHz o GHz.
- **Tasa de datos**: cantidad de bits transmitidos por segundo.
- **Unidad de tasa**: bps, kbps o Mbps.
- **Tipo de enlace**: downlink, uplink o inter-satélite.
- **Margen requerido**: margen mínimo deseado en dB.

### Transmisor

- **Potencia TX**: potencia transmitida en watts.
- **Ganancia TX**: ganancia de antena transmisora en dBi.
- **Pérdidas de línea TX**: pérdidas entre transmisor y antena.
- **Pérdidas de implementación**: pérdidas adicionales del sistema.

### Receptor

- **Ganancia RX**: ganancia de antena receptora.
- **Pérdidas de línea RX**: pérdidas entre antena y receptor.
- **Temperatura de ruido**: temperatura equivalente del sistema receptor.
- **Eb/N0 requerido**: calidad mínima requerida para demodular.
- **Pérdidas atmosféricas**: atenuación por atmósfera.
- **Pérdidas por apuntamiento**: error de orientación de antenas.
- **Otras pérdidas**: pérdidas adicionales.

## 8. Cómo interpretar comunicaciones

Resultados importantes:

- **FSPL**: pérdida de espacio libre. Aumenta con la distancia y la frecuencia.
- **Potencia recibida**: potencia que llega al receptor.
- **C/N0**: relación portadora a densidad de ruido.
- **Eb/N0 calculado**: calidad energética por bit.
- **Margen de enlace**: diferencia entre Eb/N0 calculado y requerido.

Interpretación:

- Si el margen es alto, el enlace es más robusto.
- Si el margen es bajo, el enlace puede funcionar pero con poco margen.
- Si el margen es negativo, el enlace no cumple el requisito.

Para mejorar el enlace puedes:

- aumentar potencia de transmisión,
- aumentar ganancia de antena,
- reducir tasa de datos,
- reducir pérdidas,
- reducir distancia,
- revisar frecuencia y apuntamiento.

## 9. Pantalla Potencia

Esta pantalla calcula el presupuesto eléctrico.

### Datos orbitales eléctricos

- **Duración de órbita**: tiempo de una vuelta orbital completa.
- **Luz solar**: tiempo disponible para generar energía con paneles.
- **Eclipse**: tiempo sin iluminación solar.
- **Margen de potencia**: margen adicional para diseño.
- **Degradación anual**: pérdida anual de desempeño de paneles solares.
- **Voltaje de bus**: voltaje nominal del sistema eléctrico.

### Consumo por subsistema

Cada subsistema tiene:

- **Potencia activa**: consumo cuando está funcionando.
- **Potencia standby**: consumo en reposo.
- **Duty cycle**: porcentaje de tiempo activo durante la órbita.
- **Duty eclipse**: porcentaje de tiempo activo durante eclipse.

Puedes agregar o eliminar subsistemas para representar tu misión.

Subsistemas típicos:

- comunicaciones,
- OBC,
- ADCS,
- payload,
- sensores,
- telemetría,
- control térmico,
- propulsión,
- otros.

### Paneles solares

La herramienta usa:

- eficiencia del panel,
- irradiancia solar,
- factor de orientación,
- factor de empaquetamiento,
- degradación a fin de vida,
- margen de diseño.

Con esos datos estima la potencia solar requerida y el área mínima de panel.

### Baterías

La batería se dimensiona principalmente para cubrir el eclipse.

Parámetros importantes:

- **DoD**: profundidad máxima de descarga permitida.
- **Eficiencia de batería**: rendimiento del sistema de almacenamiento.
- **Voltaje nominal**: voltaje del bus.
- **Margen de batería**: reserva adicional.
- **Densidad energética**: sirve para estimar masa.

## 10. Cómo interpretar potencia

Resultados importantes:

- **Potencia promedio total**: consumo promedio de todos los subsistemas.
- **Potencia de diseño**: potencia promedio con margen.
- **Energía por órbita**: energía consumida en una órbita completa.
- **Energía en eclipse**: energía que debe cubrir la batería.
- **Batería mínima**: capacidad requerida en Wh y Ah.
- **Área solar mínima**: área estimada de paneles.
- **Factor EOL**: desempeño esperado al final de la misión.

Interpretación:

- Si la generación solar supera la demanda con margen suficiente, el sistema es adecuado.
- Si la generación apenas cumple, el sistema es ajustado.
- Si no cumple, el sistema es crítico.

Para mejorar el sistema eléctrico puedes:

- reducir consumo de subsistemas,
- reducir duty cycle,
- aumentar área de panel solar,
- mejorar eficiencia de paneles,
- aumentar capacidad de batería,
- permitir mayor DoD si la tecnología lo soporta,
- reducir margen solo si está justificado.

## 11. Pantalla Resultados

Esta pantalla resume toda la simulación.

Elementos principales:

- **Simulación visual**: representación de satélite, Tierra, órbita y estado.
- **Estado global**: adecuado, ajustado o crítico.
- **Resumen de misión**: vehículo, régimen orbital y duración.
- **Resumen de comunicaciones**: FSPL, Eb/N0, C/N0 y margen.
- **Resumen de potencia**: área solar, batería y degradación.
- **Gráficos**: comparación de resultados y distribución de consumo.
- **Advertencias**: valores incoherentes o técnicamente riesgosos.
- **Recomendaciones**: acciones sugeridas para mejorar el diseño.

## 12. Estados del diseño

### Adecuado

El diseño cumple los criterios principales y tiene margen razonable.

### Ajustado

El diseño puede funcionar, pero tiene poco margen. Conviene revisarlo.

### Crítico

El diseño no cumple un criterio importante. Debes modificar parámetros.

## 13. Advertencias comunes

La herramienta puede mostrar advertencias si detecta:

- frecuencia igual o menor que cero,
- distancia inválida,
- potencia de transmisión inválida,
- temperatura de ruido inválida,
- tasa de datos inválida,
- luz solar + eclipse incoherente con duración orbital,
- duty cycle fuera de rango,
- eficiencias fuera de rango,
- DoD inválido,
- voltaje menor o igual que cero,
- distancia manual menor que la altitud orbital.

Si aparece una advertencia, revisa el campo indicado antes de usar el resultado final.

## 14. Cómo crear una simulación propia

Ejemplo de flujo para una misión nueva:

1. Selecciona `Caso personalizado`.
2. Escribe un nombre para la misión.
3. Elige el tipo de vehículo.
4. Ingresa altitud y tipo de órbita.
5. En comunicaciones, define frecuencia, tasa de datos, potencia TX y ganancias de antena.
6. Decide si usar distancia estimada o distancia manual.
7. En potencia, ajusta duración orbital, luz solar y eclipse.
8. Edita los subsistemas según tu misión.
9. Ajusta eficiencia de paneles, DoD, voltaje y márgenes.
10. Ve a resultados y revisa el estado final.

## 15. Ejemplos prácticos

### Ejemplo 1: enlace más robusto

Si el margen de enlace es crítico:

1. Entra a **Comunicaciones**.
2. Aumenta la potencia TX.
3. Aumenta la ganancia RX o TX.
4. Reduce la tasa de datos.
5. Revisa nuevamente el margen.

### Ejemplo 2: batería insuficiente

Si la batería aparece crítica:

1. Entra a **Potencia**.
2. Reduce consumos o duty cycles durante eclipse.
3. Aumenta margen o capacidad de batería.
4. Revisa la capacidad en Wh y Ah.

### Ejemplo 3: panel solar demasiado grande

Si el área solar requerida es muy alta:

1. Reduce consumo promedio.
2. Mejora eficiencia del panel.
3. Aumenta factor de orientación si es justificable.
4. Reduce pérdidas o margen si el profesor lo permite.

## 16. Cómo exportar resultados

En la pantalla **Resultados** puedes usar:

- **Copiar resumen**: copia el resumen al portapapeles.
- **Exportar TXT**: descarga un archivo de texto con resultados principales.
- **Imprimir / guardar PDF**: abre el diálogo del navegador para imprimir o guardar como PDF.

Para generar PDF:

1. Haz clic en **Imprimir / guardar PDF**.
2. En destino, selecciona **Guardar como PDF**.
3. Elige la carpeta donde guardar el archivo.
4. Guarda el reporte.

## 17. Consejos para obtener mejores simulaciones

- Usa unidades correctas: MHz/GHz y bps/kbps/Mbps.
- No mezcles tasas de datos sin revisar la unidad.
- Mantén duty cycles entre 0 % y 100 %.
- Usa márgenes razonables, por ejemplo 20 % a 30 % en potencia.
- Revisa si la distancia es estimada o manual.
- No uses una temperatura de ruido irrealmente baja si no puedes justificarla.
- Compara al menos dos presets antes de crear tu caso propio.
- Documenta cualquier suposición que modifiques.

## 18. Limitaciones

La herramienta es preliminar. No modela:

- propagación orbital real,
- apuntamiento dinámico,
- Doppler,
- lluvia o scintillation detallada,
- interferencia,
- geometría exacta Tierra-satélite,
- control térmico detallado,
- degradación compleja de baterías,
- eclipses estacionales reales,
- análisis estructural o térmico.

Úsala como apoyo académico para dimensionamiento inicial, no como software final de diseño espacial.

## 19. Qué entregar junto con la herramienta

Para una entrega académica completa se recomienda incluir:

- carpeta del proyecto comprimida,
- PDF generado desde la herramienta,
- historial de prompts o conversación con IA,
- explicación de fórmulas usadas,
- capturas de resultados principales,
- breve justificación de supuestos,
- manual de usuario.

## 20. Frase de uso académico

Esta herramienta fue desarrollada con apoyo de IA generativa para fines académicos en la asignatura Ingeniería de Cohetes y Satélites. Los cálculos implementados corresponden a un dimensionamiento preliminar y no sustituyen análisis detallados de ingeniería.
