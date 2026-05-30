# Orbital Systems Sizer

Herramienta de dimensionamiento preliminar para comunicaciones y potencia en vehículos espaciales.

Proyecto académico para la asignatura **Ingeniería de Cohetes y Satélites**. La aplicación permite ingresar parámetros de misión, enlace de comunicaciones y sistema eléctrico para estimar resultados preliminares de un satélite, CubeSat, microsatélite o misión espacial simple.

## Archivos incluidos

- `index.html`: estructura principal de la aplicación.
- `styles.css`: diseño visual, layout responsive y estilos de impresión.
- `script.js`: cálculos, presets, validaciones, gráficos y exportación.
- `formulas.md`: fórmulas, variables, unidades y supuestos.
- `MANUAL_USUARIO.md`: guía paso a paso para usar la herramienta y generar simulaciones.
- `prompt_history_template.md`: plantilla para documentar el uso de IA.
- `assets/`: carpeta para capturas, PDF del historial o recursos opcionales.

## Cómo abrir la herramienta

1. Descomprime la carpeta del proyecto.
2. Abre `index.html` con Chrome, Edge, Firefox o Safari.
3. No se requiere servidor, internet ni instalación de dependencias.

## Cómo usarla

1. Selecciona un preset de misión; la carga es automática al cambiar el selector.
2. Ajusta los datos de misión, comunicaciones y potencia.
3. En potencia, agrega o elimina subsistemas si lo necesitas.
4. Presiona `Calcular misión` si quieres forzar el recalculo manual.
5. Revisa resultados, estado del diseño, advertencias y recomendaciones.
6. Usa `Copiar resumen`, `Exportar resumen como texto` o `Imprimir / guardar como PDF`.

## Módulos

### Sistema de comunicaciones

Calcula un presupuesto de enlace preliminar:

- potencia transmitida en dBW y dBm,
- longitud de onda,
- pérdida de espacio libre,
- pérdidas totales,
- potencia recibida,
- densidad de ruido,
- C/N0,
- Eb/N0,
- margen de enlace,
- estado del enlace.

### Sistema eléctrico / potencia

Calcula un balance preliminar de energía:

- potencia promedio por subsistema,
- potencia total promedio,
- potencia de diseño con margen,
- energía por órbita,
- energía durante eclipse,
- capacidad mínima de batería,
- capacidad en Ah,
- potencia de generación solar requerida,
- área mínima de panel solar,
- degradación a fin de vida,
- masa estimada de batería si se entrega densidad energética.

## Presets incluidos

### CubeSat LEO básico

Valores representativos para un CubeSat en órbita baja:

- altitud: 500 km,
- downlink: 2.2 GHz,
- tasa: 9600 bps,
- potencia TX: 2 W,
- duración orbital: 95 min,
- luz solar: 60 min,
- eclipse: 35 min,
- bus: 12 V.

### Microsatélite de observación terrestre

Caso más exigente:

- altitud: 700 km,
- frecuencia: 8.2 GHz,
- tasa: 10 Mbps,
- potencia TX: 10 W,
- mayor ganancia de antena,
- mayor consumo de payload.

### CubeSat UHF de telemetría

Escenario de baja tasa para revisar enlaces UHF y consumos modestos:

- altitud: 450 km,
- frecuencia: 437 MHz,
- tasa: 1200 bps,
- vehículo: nanosatélite,
- mayor margen requerido para telemetría robusta.

### SmallSat SAR demostrador

Escenario de alta demanda eléctrica:

- altitud: 600 km,
- downlink X-band: 8.4 GHz,
- tasa: 150 Mbps,
- radar SAR con duty cycle bajo,
- potencia y batería más exigentes.

### Satélite GEO de comunicaciones

Escenario de enlace largo con distancia manual:

- altitud: 35.786 km,
- distancia de enlace: 38.000 km,
- frecuencia: 14 GHz,
- plataforma GEO,
- cargas de transponders de alta potencia.

### Relay lunar simplificado

Escenario para practicar enlace de larga distancia:

- distancia de enlace: 384.400 km,
- frecuencia: 8.45 GHz,
- vehículo: relay lunar,
- potencia y batería de misión intermedia.

### Sonda interplanetaria

Escenario de espacio profundo simplificado:

- distancia de enlace: 225.000.000 km,
- frecuencia: 8.4 GHz,
- irradiancia solar reducida,
- antenas de alta ganancia.

### Caso personalizado

Permite editar todos los campos para construir un escenario propio.

## Ejemplos de prueba

| Prueba | Entrada | Resultado esperado |
|---|---|---|
| CubeSat LEO básico | Cargar preset y calcular | Resultados de enlace y potencia sin errores bloqueantes |
| Microsat observación | Cargar preset y calcular | Mayor demanda energética y enlace más exigente |
| SmallSat SAR | Cargar preset `SmallSat SAR` | Alto consumo y mayor área solar requerida |
| GEO comunicaciones | Cargar preset `Satélite GEO` | Distancia manual conservada en 38.000 km |
| Relay lunar | Cargar preset `Relay lunar` | Enlace de larga distancia y estado técnico coherente |
| Frecuencia cero | Ingresar 0 en frecuencia | Error claro sin romper la app |
| Distancia manual baja | Desactivar estimación e ingresar distancia menor a altitud | Advertencia técnica |
| Duty cycle extremo | Ingresar duty superior a 100% | Advertencia o error de rango |
| Eclipse incoherente | Luz + eclipse distinto de duración orbital | Advertencia de coherencia orbital |

## Limitaciones

- Los resultados son preliminares y con fines académicos.
- No se modelan lluvia, scintillation, interferencia, Doppler ni geometría dinámica de apuntamiento.
- La órbita se trata de forma simplificada.
- La distancia de enlace estimada es una aproximación, no una propagación orbital.
- La generación solar usa factores promedio de orientación y empaquetamiento.
- No sustituye software profesional ni análisis detallado de ingeniería.

## IA utilizada

Esta herramienta fue desarrollada con apoyo de IA generativa para fines académicos en la asignatura Ingeniería de Cohetes y Satélites. Los cálculos implementados corresponden a un dimensionamiento preliminar y no sustituyen análisis detallados de ingeniería.

El estudiante debe completar el historial real de uso en `prompt_history_template.md` y generar el PDF correspondiente.

## Cómo generar el PDF del historial

1. Completa `prompt_history_template.md`.
2. Copia su contenido a Word, Google Docs, LibreOffice o un editor Markdown con exportación.
3. Exporta o imprime como PDF.
4. Guarda el archivo como `assets/prompt_history.pdf`.

También puedes abrir la app y usar `Imprimir / guardar como PDF` para generar un reporte del resumen calculado.

## Cómo comprimir para entrega

1. Renombra la carpeta con tu nombre completo:
   `NombreCompleto_OrbitalSystemsSizer`
2. Verifica que incluya:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `formulas.md`
   - `prompt_history_template.md`
   - `assets/`
3. Abre `index.html` y prueba los presets.
4. Agrega `assets/prompt_history.pdf` cuando esté listo.
5. Comprime la carpeta completa en `.zip`.
6. Nombra el archivo:
   `NombreCompleto_OrbitalSystemsSizer.zip`

## Checklist final

- [ ] La carpeta tiene el nombre correcto.
- [ ] La app abre directamente en navegador.
- [ ] Funciona sin internet.
- [ ] Incluye los tres presets.
- [ ] Calcula comunicaciones.
- [ ] Calcula potencia.
- [ ] Muestra advertencias.
- [ ] Permite agregar y eliminar subsistemas.
- [ ] Permite copiar resumen.
- [ ] Permite exportar resumen como texto.
- [ ] Permite imprimir o guardar como PDF.
- [ ] Incluye `formulas.md`.
- [ ] Incluye plantilla de historial de prompts.
- [ ] Incluye PDF del historial en `assets/`.

## Créditos

Proyecto académico preparado para la asignatura Ingeniería de Cohetes y Satélites. El contenido final debe ser revisado y validado por el estudiante antes de la entrega.
