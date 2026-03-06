# Ejercicio 31 - Slug Generator

**Tipo:** Error Lógico

## Historia de Usuario

Como desarrollador de un CMS, necesito una función que convierta títulos de artículos en slugs URL-friendly para construir las URLs de publicación de forma automática y consistente.

## Criterios de Aceptación

- `generateSlug(title)` convierte cualquier título a minúsculas, elimina acentos, reemplaza caracteres no alfanuméricos por guiones, colapsa guiones consecutivos y elimina guiones en los extremos.
- Títulos con letras mayúsculas como `'Hola Mundo'` producen `'hola-mundo'`.
- Títulos con acentos como `'Cómo Están'` producen `'como-estan'`.
- Títulos con puntuación como `'¡Bienvenidos al 2024!'` producen `'bienvenidos-al-2024'`.
- Una cadena vacía produce una cadena vacía.

## Problema Reportado

El equipo de contenidos reporta que los slugs generados para artículos con títulos en mayúsculas pierden la primera letra de cada palabra. Por ejemplo, `'Hola Mundo'` genera `'ola-undo'` en lugar de `'hola-mundo'`.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Código con el bug a corregir |
| `solution.js` | Solución correcta con comentario `// CORREGIDO:` |
| `test.js` | Pruebas Jest (importa `buggy-code.js` por defecto) |

## Cómo Verificar

```bash
# Ver los errores
npm test exercises/31-slug-generator

# Verificar tu solución
# Cambia el import en test.js a solution.js y ejecuta de nuevo
npm test exercises/31-slug-generator
```

## Nivel de Dificultad

**Intermedio** — Requiere entender el orden de las transformaciones en una cadena de operaciones con regex y por qué el orden importa cuando el patrón es sensible a mayúsculas.
