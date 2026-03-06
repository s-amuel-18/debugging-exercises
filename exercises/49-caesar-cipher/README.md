# Caesar Cipher

**Tipo**: Error Lógico

## Historia de Usuario

Como desarrollador de herramientas de criptografía educativa, necesito que la función de descifrado del Cifrado César revierta correctamente el proceso de cifrado para recuperar el texto original.

## Criterios de Aceptación

- `decrypt(encrypt(text, n), n)` debe retornar `text` para cualquier desplazamiento
- `decrypt('DEF', 3)` debe retornar `'ABC'`
- `decrypt('ABC', 3)` debe retornar `'XYZ'` (wrap alrededor del alfabeto)
- ROT13 debe ser auto-inverso: `decrypt(encrypt(text, 13), 13) === text`

## Problema Reportado

La función `decrypt` no revierte el cifrado. Al descifrar un texto previamente cifrado se obtiene un texto aún más desplazado en lugar del original.

**Ejemplos del problema**:

- `encrypt('ABC', 3)` → `'DEF'` (correcto)
- `decrypt('DEF', 3)` → `'GHI'` en vez de `'ABC'`
- `decrypt(encrypt('Hello', 13), 13)` → `'Uryyb'` en vez de `'Hello'`

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar

```bash
npm test exercises/49-caesar-cipher
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Principiante

**Tiempo Estimado**: 10-15 minutos
