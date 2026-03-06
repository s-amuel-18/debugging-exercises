# Budget Planner

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como usuario de la app de finanzas personales, necesito ver mi tasa de ahorro mensual calculada correctamente para entender qué porcentaje de mis ingresos estoy ahorrando.

## 🎯 Criterios de Aceptación

- La tasa de ahorro se calcula como `(ingresos - gastos) / ingresos`
- Si los ingresos son 4000 y los gastos son 1000, la tasa debe ser `0.75` (75%)
- Si no hay ingresos, la tasa debe ser `0`
- Si no hay gastos, la tasa debe ser `1` (100% de ahorro)

## 🐛 Problema Reportado

La tasa de ahorro retornada es incorrecta. Con ingresos de $4000 y gastos de $1000, el sistema reporta una tasa de `3.0` en lugar de `0.75`. El resumen mensual también muestra el valor incorrecto en `savingsRate`.

**Ejemplos del problema**:

- Ingresos $4000, gastos $1000 → tasa reportada: `3.0` (debería ser `0.75`)
- Ingresos $5000, gastos $500 → tasa reportada: `9.0` (debería ser `0.9`)
- Ingresos $2000, gastos $0 → correcto: `1` (sin gastos, la división no ocurre)

## 📂 Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/45-budget-planner
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
