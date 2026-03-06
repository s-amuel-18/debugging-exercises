# Stock Portfolio

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como inversor, necesito que el sistema calcule correctamente el retorno anualizado de mi portafolio para comparar rendimientos entre inversiones de distintos horizontes temporales.

## 🎯 Criterios de Aceptación

- El retorno anualizado debe usar la fórmula CAGR: `(1 + retornoTotal)^(1/años) - 1`
- Un retorno total del 100% en 2 años debe dar ~41.4% anualizado, no 50%
- El retorno anualizado compuesto siempre es menor o igual al promedio simple para retornos positivos y múltiples años
- Un retorno del 0% debe dar 0% anualizado en cualquier período

## 🐛 Problema Reportado

El sistema calcula el retorno anualizado dividiendo el retorno total entre los años, usando un promedio aritmético simple en lugar de la fórmula de crecimiento compuesto.

**Ejemplos del problema**:

- Retorno total 100% en 2 años → reporta 50%/año (debería ser ~41.4%)
- Retorno total 200% en 3 años → reporta 66.7%/año (debería ser ~44.2%)
- El error sobreestima el retorno anual para horizontes largos

## 📂 Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/57-stock-portfolio
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
