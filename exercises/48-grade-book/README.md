# Grade Book

**Tipo**: Error Lógico

## Historia de Usuario

Como profesor, necesito que el sistema calcule correctamente la nota final ponderada de cada estudiante según el peso de cada categoría (exámenes, tareas, participación) para asignar calificaciones justas.

## Criterios de Aceptación

- La nota ponderada es: `suma(nota_categoría × peso_categoría)` para todas las categorías
- Los pesos de las categorías suman exactamente `1.0`
- Una nota de 90 en exámenes (50%), 80 en tareas (30%) y 70 en participación (20%) debe dar `83`
- La letra de calificación y el ranking del grupo deben basarse en la nota ponderada correcta

## Problema Reportado

Las notas finales son incorrectamente bajas. Un estudiante con 90 en exámenes, 80 en tareas y 70 en participación recibe un promedio de `27.67` en lugar de `83`.

**Ejemplos del problema**:

- Exámenes=90 (50%), Tareas=80 (30%), Participación=70 (20%) → retorna `~27.67` en vez de `83`
- Nota perfecta (100 en todas) → retorna `~33.3` en vez de `100`
- Todos los estudiantes quedan clasificados como 'F' por sus notas artificialmente bajas

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar

```bash
npm test exercises/48-grade-book
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
