# Playlist Manager

**Tipo**: Error Lógico

## Historia de Usuario

Como usuario de una aplicación de música, necesito gestionar playlists con canciones ordenadas correctamente por duración y BPM para poder reproducirlas en el orden deseado.

## Criterios de Aceptación

- Las canciones deben poder ordenarse por duración de forma ascendente
- Las canciones deben poder ordenarse por BPM de forma ascendente
- Las canciones deben poder ordenarse por título alfabéticamente
- No deben existir canciones duplicadas en una playlist
- La fusión de dos playlists no debe generar duplicados
- Las estadísticas de BPM promedio y top artistas deben ser correctas

## Problema Reportado

El equipo de QA reporta que al ordenar una playlist por duración o por BPM, el resultado llega en orden inverso al esperado: las canciones más largas aparecen primero y las de menor BPM al final.

**Ejemplos del problema**:

- Playlist con canciones de 120s, 200s y 300s ordenada por duración retorna `[300, 200, 120]` en vez de `[120, 200, 300]`
- Playlist con canciones de 80, 110 y 140 BPM ordenada por BPM retorna `[140, 110, 80]` en vez de `[80, 110, 140]`
- El ordenamiento por título sí funciona correctamente

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar

```bash
npm test exercises/39-playlist-manager
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
