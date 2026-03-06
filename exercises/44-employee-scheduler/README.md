# Employee Scheduler

**Tipo**: Error Lógico

## 📋 Historia de Usuario

Como gerente de recursos humanos, necesito que el sistema detecte correctamente si dos turnos de trabajo se solapan para poder asignar turnos consecutivos sin errores falsos.

## 🎯 Criterios de Aceptación

- Dos turnos que se solapan en horario (ej. 8-16 y 14-20) deben ser detectados como conflicto
- Dos turnos **consecutivos** (ej. 8-16 y 16-24) **no** deben ser marcados como solapamiento
- Turnos separados (ej. 8-12 y 14-20) no deben marcarse como solapamiento
- El sistema debe permitir asignar turnos consecutivos a un mismo empleado en el mismo día

## 🐛 Problema Reportado

El sistema rechaza la asignación de turnos consecutivos en el mismo día, marcándolos incorrectamente como solapados. Un empleado con turno de mañana (8-12) no puede recibir un turno de tarde que inicia exactamente cuando termina el anterior (12-16).

**Ejemplos del problema**:

- Turno 8:00-16:00 seguido de turno 16:00-24:00 → lanza error de solapamiento (incorrecto)
- Turno 8:00-12:00 seguido de turno 12:00-16:00 → lanza error de solapamiento (incorrecto)
- `overlaps(s1, s2)` retorna `true` cuando los turnos son adyacentes

## 📂 Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/44-employee-scheduler
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-20 minutos
