# Library Fines

**Tipo**: Error Lógico

## Historia de Usuario

Como bibliotecario, necesito que el sistema calcule correctamente las multas por retraso para cobrar a los usuarios que devuelven libros después de la fecha límite.

## Criterios de Aceptación

- Multa = `Math.max(0, díasDeAtraso) × tarifaDiaria`
- `díasDeAtraso = fechaDevolucion - fechaVencimiento` (en días)
- Devolver 5 días tarde con tarifa $0.50/día debe generar una multa de $2.50
- Devolver a tiempo o antes debe generar una multa de $0
- Una multa nunca debe ser negativa

## Problema Reportado

El sistema no cobra multas cuando se devuelve tarde y genera multas incorrectas cuando se devuelve antes del vencimiento.

**Ejemplos del problema**:

- Vence el 10/03, devuelto el 15/03 (5 días tarde) → multa reportada: $0 (debería ser $2.50)
- Vence el 10/03, devuelto el 07/03 (3 días antes) → multa reportada: $1.50 (debería ser $0)
- El cálculo de días de atraso tiene el signo invertido

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar

```bash
npm test exercises/56-library-fines
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
