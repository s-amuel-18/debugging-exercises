# Leaderboard

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como administrador de una competencia, necesito que la tabla de posiciones muestre el mejor puntaje de cada jugador para que las mejoras entre rondas se reflejen correctamente en el ranking.

## 🎯 Criterios de Aceptación

- Si un jugador envía puntajes 50 y 90, su mejor puntaje debe ser 90
- El ranking debe ordenarse por el mejor puntaje de cada jugador
- Jugadores con el mismo mejor puntaje deben compartir el mismo rango
- El rango después de un empate debe saltar posiciones (1-2-2-4, no 1-2-3-4)

## 🐛 Problema Reportado

Al enviar múltiples puntajes, el sistema siempre muestra el primero en lugar del máximo. Un jugador que mejora su puntaje de 50 a 90 sigue apareciendo con 50 en el ranking.

**Ejemplos del problema**:

- Alice envía 50 y luego 90 → el sistema reporta 50 (debería ser 90)
- Alice debería aparecer en primer lugar, pero por el error queda por debajo de Bob (80)
- El promedio general también queda distorsionado al usar puntajes desactualizados

## 📂 Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/54-leaderboard
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
