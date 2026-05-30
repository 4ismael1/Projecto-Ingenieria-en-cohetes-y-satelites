# Fórmulas utilizadas

Este documento resume las fórmulas implementadas en **Orbital Systems Sizer**. Todas las expresiones corresponden a dimensionamiento preliminar y deben interpretarse como apoyo académico.

## Constantes

| Constante | Valor | Unidad | Descripción |
|---|---:|---|---|
| `c` | 299792458 | m/s | Velocidad de la luz |
| `k` | 1.380649e-23 | J/K | Constante de Boltzmann |
| `S` | 1361 | W/m² | Irradiancia solar media usada por defecto |
| `R_e` | 6371 | km | Radio medio terrestre usado como referencia |

## Comunicaciones

### Potencia transmitida

```text
Pt(dBW) = 10 log10(Pt[W])
```

Convierte potencia de transmisión desde watts a dBW.

### Longitud de onda

```text
λ = c / f
```

Donde:

- `λ`: longitud de onda en metros.
- `c`: velocidad de la luz.
- `f`: frecuencia en Hz.

### Pérdida de espacio libre

```text
FSPL(dB) = 20 log10(d[km]) + 20 log10(f[GHz]) + 92.45
```

Donde:

- `d`: distancia de enlace en km.
- `f`: frecuencia en GHz.

La pérdida de espacio libre aumenta con la distancia y la frecuencia.

### Potencia recibida

```text
Pr(dBW) = Pt + Gt + Gr - FSPL - Ltotal
```

Donde:

- `Pt`: potencia transmitida en dBW.
- `Gt`: ganancia de antena transmisora en dBi.
- `Gr`: ganancia de antena receptora en dBi.
- `Ltotal`: suma de pérdidas de línea, atmosféricas, apuntamiento, implementación y otras pérdidas.

### Densidad de ruido

```text
N0(dBW/Hz) = 10 log10(kT)
```

Donde:

- `k`: constante de Boltzmann.
- `T`: temperatura de ruido del sistema en K.

Forma equivalente frecuente:

```text
N0(dBW/Hz) = -228.6 + 10 log10(T)
```

### Relación C/N0

```text
C/N0 = Pr - N0
```

Expresada en dB-Hz.

### Relación Eb/N0

```text
Eb/N0 = C/N0 - 10 log10(Rb)
```

Donde:

- `Rb`: tasa de datos en bps.

Al aumentar la tasa de datos, el Eb/N0 disponible disminuye.

### Margen de enlace

```text
Margen = Eb/N0calculado - Eb/N0requerido
```

Criterio implementado:

- `Margen >= margen requerido`: diseño adecuado.
- `0 <= Margen < margen requerido`: diseño ajustado.
- `Margen < 0`: diseño crítico.

## Potencia

### Potencia promedio por subsistema

```text
Pavg = Pactiva × duty + Pstandby × (1 - duty)
```

Donde:

- `Pactiva`: potencia en modo activo.
- `Pstandby`: potencia en modo espera.
- `duty`: fracción de tiempo activa.

### Potencia total promedio

```text
Ptotal = ΣPavg
```

Suma de todas las potencias promedio de subsistemas.

### Potencia de diseño

```text
Pdesign = Ptotal × (1 + margen)
```

Incluye margen de potencia requerido.

### Energía por órbita

```text
Eorb = Ptotal × torbita
```

Donde `torbita` está en horas.

### Energía durante eclipse

```text
Eeclipse = Peclipse × teclipse
```

Donde:

- `Peclipse`: potencia promedio durante eclipse.
- `teclipse`: duración del eclipse en horas.

### Energía requerida de batería

```text
Ebatt = Eeclipse / (DoD × ηbatería)
```

Donde:

- `DoD`: profundidad máxima de descarga.
- `ηbatería`: eficiencia de batería.

### Capacidad en Ah

```text
CapacidadAh = Ebatt / Vbus
```

Donde:

- `Vbus`: voltaje nominal del bus eléctrico.

### Potencia solar requerida

```text
Psolar = Eorb / tluz
```

La herramienta usa energía de diseño por órbita y tiempo de luz solar.

### Área de panel solar

```text
Área = Psolar / (S × ηpanel × factororientación × factorempaquetamiento)
```

Donde:

- `S`: irradiancia solar.
- `ηpanel`: eficiencia del panel.
- `factororientación`: factor promedio por actitud/incidencia.
- `factorempaquetamiento`: factor por empaquetamiento y aprovechamiento.

### Degradación al final de vida

```text
factorEOL = (1 - degradación_anual)^años
```

La potencia inicial requerida se incrementa para que el sistema todavía cumpla al final de la misión.

### Masa estimada de batería

```text
masa = Ebatt / densidad_energética
```

Solo se muestra si el usuario entrega densidad energética en Wh/kg.

## Supuestos del modelo

- Órbita circular simplificada.
- Enlace de espacio libre.
- Pérdidas atmosféricas y de apuntamiento ingresadas por el usuario.
- Temperatura de ruido constante.
- Sin modelado de Doppler, lluvia, interferencia ni geometría dinámica real.
- Eclipse definido por el usuario.
- Incidencia solar promedio mediante factor de orientación.
- Degradación anual constante.
- Resultados válidos solo para dimensionamiento preliminar.

## Caso de validación manual sugerido

Para el preset CubeSat LEO básico:

1. `Pt = 2 W`
2. `f = 2.2 GHz`
3. `d ≈ 1000 km`
4. `Rb = 9600 bps`
5. `T = 500 K`
6. `Gt = 2 dBi`
7. `Gr = 20 dBi`

Pasos:

```text
Pt(dBW) = 10 log10(2) ≈ 3.01 dBW
FSPL ≈ 20 log10(1000) + 20 log10(2.2) + 92.45
Pr = Pt + Gt + Gr - FSPL - Ltotal
N0 = 10 log10(kT)
C/N0 = Pr - N0
Eb/N0 = C/N0 - 10 log10(9600)
Margen = Eb/N0 - Eb/N0req
```

El resultado de la app debe ser coherente con estos pasos, aceptando pequeñas diferencias por redondeo.

## Referencias recomendadas

- Apuntes de la asignatura Ingeniería de Cohetes y Satélites.
- Wertz, J. R. y Larson, W. J., *Space Mission Analysis and Design*.
- Maral, G. y Bousquet, M., *Satellite Communications Systems*.
- Documentación técnica de NASA/ESA sobre presupuestos de enlace y sistemas eléctricos espaciales.
