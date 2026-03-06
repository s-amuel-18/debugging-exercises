# Ejercicio 29 - Log Parser

**Tipo:** Error Lógico

## Historia de Usuario

Como desarrollador de sistemas, necesito un módulo que parsee líneas de log con formato estándar para poder analizarlas, filtrarlas por nivel y obtener estadísticas de frecuencia.

## Criterios de Aceptación

- `parseLogLine(line)` recibe una cadena con formato `[LEVEL] TIMESTAMP - message` y devuelve un objeto `{ level, timestamp, message }`, o `null` si la línea no tiene el formato esperado.
- `filterByLevel(lines, level)` recibe un arreglo de cadenas de log y devuelve los objetos parseados cuyo nivel coincida con el solicitado.
- `countByLevel(lines)` devuelve un objeto con el conteo de líneas por cada nivel encontrado.
- Los mensajes que contienen guiones en su contenido deben capturarse completos.

## Problema Reportado

El equipo de operaciones reporta que al filtrar logs por nivel, los resultados son incorrectos: se buscan `ERROR` pero no se encuentran, y al inspeccionar los objetos parseados, el campo `level` contiene el mensaje del log y el campo `message` contiene el nivel.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `buggy-code.js` | Código con el bug a corregir |
| `solution.js` | Solución correcta con comentario `// CORREGIDO:` |
| `test.js` | Pruebas Jest (importa `buggy-code.js` por defecto) |

## Cómo Verificar

```bash
# Ver los errores
npm test exercises/29-log-parser

# Verificar tu solución
# Cambia el import en test.js a solution.js y ejecuta de nuevo
npm test exercises/29-log-parser
```

## Nivel de Dificultad

**Intermedio** — Requiere entender grupos de captura en expresiones regulares y el orden de desestructuración de arreglos.
