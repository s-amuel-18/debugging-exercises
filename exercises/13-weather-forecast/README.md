# Pronóstico del Tiempo

**Tipo**: Error Asíncrono

## Historia de Usuario

Como desarrollador de una app meteorológica, necesito un módulo que consulte datos climáticos de múltiples ciudades en paralelo para mostrar comparativas de temperatura y encontrar la ciudad más cálida del día.

## Criterios de Aceptación

- `fetchMultipleCities` debe retornar un array resuelto con los datos de cada ciudad, no una Promise sin resolver
- `getHottestCity` debe recibir y operar sobre los datos climáticos reales (no sobre una Promise pendiente)
- `getAverageTemperature` debe calcular correctamente el promedio usando los datos resueltos
- Todas las funciones deben poder encadenarse con `await` sin producir resultados inesperados

## Problema Reportado

El módulo falla silenciosamente: en lugar de retornar los datos del clima, las funciones retornan objetos Promise sin resolver, lo que provoca que las operaciones subsecuentes fallen o produzcan resultados incorrectos.

**Ejemplos del problema**:

- `fetchMultipleCities(['Madrid', 'Londres'])` retorna una `Promise` en lugar de un array con los datos de las ciudades
- `getHottestCity(['Madrid', 'Tokio'])` lanza `TypeError: weatherData.reduce is not a function` porque recibe una Promise en lugar de un array
- El código se ejecuta sin lanzar errores explícitos pero los valores procesados son objetos Promise, no datos reales

## Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Como Verificar la Solución

```bash
npm test exercises/13-weather-forecast
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
