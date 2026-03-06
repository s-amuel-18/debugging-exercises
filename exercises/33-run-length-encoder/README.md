# Ejercicio 33 - Run-Length Encoder

**Tipo:** Error Lógico

## Historia de Usuario

Como desarrollador de un sistema de compresión básica, necesito un módulo que implemente Run-Length Encoding (RLE): comprimir cadenas de texto convirtiendo rachas de caracteres repetidos en pares `(conteo)(carácter)`, y descomprimir de vuelta a la cadena original.

## Criterios de Aceptación

- `encode(str)` convierte `"aaabbc"` en `"3a2b1c"` y `"aaaaaaaaaa"` en `"10a"`.
- `decode(str)` invierte la operación: `"3a2b1c"` → `"aaabbc"` y `"10a"` → `"aaaaaaaaaa"`.
- `decode(encode(str))` debe devolver siempre la cadena original.
- Los conteos de dos o más dígitos deben manejarse correctamente.

## Problema Reportado

El equipo de QA reporta que la descompresión falla cuando una racha tiene 10 o más caracteres: `decode("10a")` devuelve `"a"` en lugar de `"aaaaaaaaaa"`.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Código con el bug a corregir |
| `solution.js` | Solución correcta con comentario `// CORREGIDO:` |
| `test.js` | Pruebas Jest (importa `buggy-code.js` por defecto) |

## Cómo Verificar

```bash
# Ver los errores
npm test exercises/33-run-length-encoder

# Verificar tu solución
# Cambia el import en test.js a solution.js y ejecuta de nuevo
npm test exercises/33-run-length-encoder
```

## Nivel de Dificultad

**Intermedio** — Requiere entender la diferencia entre `\d` (un dígito) y `\d+` (uno o más dígitos) en expresiones regulares, y cómo ese detalle rompe el manejo de conteos mayores a 9.
