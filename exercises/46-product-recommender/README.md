# Product Recommender

**Tipo**: Error Lógico

## Historia de Usuario

Como usuario de una tienda online, necesito recibir recomendaciones personalizadas basadas en los productos que compraron usuarios con gustos similares a los míos.

## Criterios de Aceptación

- La similitud entre usuarios debe calcularse con el índice de Jaccard: `|A ∩ B| / |A ∪ B|`
- Dos usuarios sin compras en común deben tener similitud `0`
- Dos usuarios con compras idénticas deben tener similitud `1`
- Los productos recomendados no deben incluir los ya comprados por el usuario

## Problema Reportado

El motor de recomendación devuelve similitud `1` entre todos los pares de usuarios sin importar sus historiales de compra. Usuarios que no compraron ningún producto en común aparecen como idénticos.

**Ejemplos del problema**:

- `jaccardSimilarity([1,2,3], [2,3,4])` retorna `1.0` en vez de `0.5`
- `jaccardSimilarity([1,2], [3,4])` retorna `1.0` en vez de `0`
- Las recomendaciones son incorrectas porque la similitud no diferencia usuarios

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar

```bash
npm test exercises/46-product-recommender
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-20 minutos
