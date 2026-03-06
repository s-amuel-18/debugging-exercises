# Tax Calculator

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como contribuyente, necesito que la calculadora aplique correctamente los tramos del impuesto progresivo para saber cuánto impuesto pago en cada tramo y cuál es mi tasa efectiva real.

## 🎯 Criterios de Aceptación

- Cada tramo solo grava el ingreso que cae dentro de ese rango
- Un ingreso de $20,000 debe pagar: $10,000×10% + $10,000×20% = $3,000
- Un ingreso de $50,000 debe pagar: $10,000×10% + $30,000×20% + $10,000×30% = $10,000
- El impuesto en cada tramo nunca debe superar `(max_tramo - min_tramo) × tasa`

## 🐛 Problema Reportado

El sistema calcula impuestos muy superiores a los correctos. Para un ingreso de $20,000 retorna $6,000 en lugar de $3,000.

**Ejemplos del problema**:

- Ingreso $20,000 → impuesto reportado: $6,000 (debería ser $3,000)
- Ingreso $50,000 → impuesto reportado: $35,000 (debería ser $10,000)
- El sistema aplica la tasa de cada tramo al ingreso completo en lugar de al monto dentro del tramo

## 📂 Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/50-tax-calculator
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
