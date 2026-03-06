# Ejercicio 34 - Vending Machine

**Tipo:** Error Lógico

## Historia de Usuario

Como desarrollador del software de una máquina expendedora, necesito un módulo que calcule el vuelto óptimo (menor cantidad de monedas) para una transacción, dado el monto pagado, el precio del producto y las denominaciones de monedas disponibles.

## Criterios de Aceptación

- `calculateChange(paid, price, availableCoins)` devuelve `{ coins: number[], possible: boolean }`.
- Las monedas en `coins` representan el vuelto exacto usando la menor cantidad posible.
- Si no es posible dar el cambio exacto, `possible` es `false` y `coins` es `[]`.
- `canMakeChange(amount, availableCoins)` indica si es posible dar ese monto exacto.
- El orden de las denominaciones de entrada no debe afectar el resultado.

## Problema Reportado

El equipo de hardware reporta que la máquina devuelve vuelto con demasiadas monedas pequeñas. Por ejemplo, para un vuelto de 75 céntimos con monedas `[1, 5, 10, 25, 50, 100]` disponibles, la máquina devuelve 15 monedas en lugar de las 2 óptimas (50 + 25).

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Código con el bug a corregir |
| `solution.js` | Solución correcta con comentario `// CORREGIDO:` |
| `test.js` | Pruebas Jest (importa `buggy-code.js` por defecto) |

## Cómo Verificar

```bash
# Ver los errores
npm test exercises/34-vending-machine

# Verificar tu solución
# Cambia el import en test.js a solution.js y ejecuta de nuevo
npm test exercises/34-vending-machine
```

## Nivel de Dificultad

**Intermedio** — Requiere entender el algoritmo greedy y por qué el orden de iteración sobre las denominaciones determina la optimalidad de la solución.
