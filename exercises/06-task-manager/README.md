# Gestión de Tareas (Task Manager)

**Tipo**: Error de Ejecución

## 📋 Historia de Usuario

Como gerente de producto, necesito una herramienta para gestionar tareas de mi equipo que permita agregar pendientes, marcarlos como completados y ver métricas de progreso para tener un seguimiento efectivo del trabajo.

## 🎯 Criterios de Aceptación

- La funcionalidad debe permitir crear nuevas tareas asegurando que el título es válido (un string no vacío)
- La funcionalidad debe marcar como completada una tarea siempre que exista un ID válido, de lo contrario debe informar el incidente claramente
- La funcionalidad debe calcular reportes de tareas (estadísticas) asegurando que el input brindado es efectivamente una lista
- La funcionalidad debe buscar y filtrar tareas por su prioridad, sin detener el sistema en caso de haber alguna tarea malformada en la base de datos que carezca de dicha información

## 🐛 Problema Reportado

La aplicación de gestión de tareas "crashea" (reporta errores inesperados y detiene su ejecución) en diferentes situaciones durante el día. En lugar de manejar los problemas y avisar al usuario, la plataforma se rompe afectando a los demás empleados.

**Ejemplos del problema**:

- Con entrada `addTask(tasks, undefined)` (una tarea enviada sin título por error del frontend), la aplicación muestra el error `TypeError: Cannot read properties of undefined (reading 'trim')`
- Al completar una tarea que ya fue borrada o no existe `completeTask(tasks, 12345)`, la aplicación finaliza con el error `TypeError: Cannot set properties of undefined (setting 'status')`
- Cuando se envían estadísticas sobre datos no inicializados `getTaskStats(null)`, sucede `TypeError: Cannot read properties of null (reading 'length')`
- Al buscar tareas por prioridad `filterByPriority(tasks, 'low')` de una tabla que tiene documentos corruptos sin prioridad estipulada, colapsa detallando `TypeError: Cannot read properties of undefined (reading 'toLowerCase')`

## 📂 Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/06-task-manager
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto.
Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js`
para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
