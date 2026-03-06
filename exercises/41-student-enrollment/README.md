# Student Enrollment System

**Tipo**: Error Lógico

## Historia de Usuario

Como administrador académico, necesito que el sistema valide correctamente los prerequisitos de cada curso antes de permitir una inscripción, para garantizar que los estudiantes tengan la preparación necesaria.

## Criterios de Aceptación

- Un estudiante solo puede inscribirse si ha completado **todos** los prerequisitos del curso
- Si faltan uno o más prerequisitos, la inscripción debe ser rechazada con error
- Un curso con múltiples prerequisitos requiere que el estudiante haya completado **cada uno** de ellos
- Cursos sin prerequisitos deben estar disponibles para cualquier estudiante

## Problema Reportado

El sistema permite inscripciones incorrectas: un estudiante que solo ha completado **uno de varios prerequisitos** logra inscribirse en cursos que requieren todos ellos.

**Ejemplos del problema**:

- CS401 requiere CS301 y MATH101. Un estudiante que solo completó CS301 logra inscribirse, cuando debería recibir un error por MATH101 faltante
- Un estudiante sin ningún curso aprobado puede inscribirse en CS201 (que requiere CS101) si el arreglo de prerequisitos no está vacío
- `getAvailableCourses` muestra cursos para los que el estudiante no tiene todos los prerequisitos

## Archivos

- `buggy-code.js` - Código con el error
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## Cómo Verificar

```bash
npm test exercises/41-student-enrollment
```

Todas las pruebas deben pasar para considerar el error corregido.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto. Cuando corrijas el error, cambia la línea de importación en `test.js` a `solution.js` para verificar tu solución.

## Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-20 minutos
