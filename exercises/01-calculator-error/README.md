# Error de Cálculo en Calculadora

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como usuario de la aplicación de calificaciones estudiantiles, necesito una calculadora que realice operaciones matemáticas básicas (suma, resta, multiplicación, división y promedio) para procesar las notas de los estudiantes de manera precisa.

## 🎯 Criterios de Aceptación

- La calculadora debe sumar dos números correctamente
- La calculadora debe restar dos números correctamente
- La calculadora debe multiplicar dos números correctamente
- La calculadora debe dividir dos números correctamente (con manejo de división por cero)
- La calculadora debe calcular el promedio de un array de números correctamente

## 🐛 Problema Reportado

Un profesor ha reportado que al calcular el promedio de las calificaciones de los estudiantes, la calculadora está devolviendo valores incorrectos.

**Ejemplos del problema**:

- Al calcular el promedio de `[10, 20, 30]`, se espera `20` pero se obtiene `70`
- Al calcular el promedio de `[5, 10, 15, 20]`, se espera `12.5` pero se obtiene `55`
- Al calcular el promedio de `[100]`, se espera `100` pero se obtiene `200`

Las demás operaciones (suma, resta, multiplicación, división) funcionan correctamente. El problema está específicamente en la función de cálculo de promedio.

## 📂 Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/01-calculator-error
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
