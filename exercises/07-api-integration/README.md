# Integración con API (JSONPlaceholder)

**Tipo**: Error Asíncrono / Error de Sintaxis

## 📋 Historia de Usuario

Como desarrollador web, necesito conectar mi aplicación con un servicio externo (JSONPlaceholder) para consumir y enviar datos de publicaciones y comentarios. Es fundamental que la comunicación sea asíncrona y maneje correctamente las respuestas del servidor.

## 🎯 Criterios de Aceptación

- **getPostById**: Debe obtener una publicación específica. Es obligatorio usar `await` para esperar la respuesta de la red y la conversión a JSON. Si el servidor responde con un error (ej. 404), la función debe lanzar una excepción.
- **getPostComments**: Debe obtener la lista de comentarios asociados a una publicación. El código debe estar libre de errores de sintaxis básicos que impidan la carga del módulo.
- **createPost**: Debe enviar un objeto JSON al servidor mediante el método `POST`. Se deben incluir los encabezados HTTP apropiados (`Content-type: application/json`) para que el servidor reconozca el formato de los datos.

## 🛠️ Endpoints Utilizados

Este ejercicio utiliza los siguientes recursos de [JSONPlaceholder](https://jsonplaceholder.typicode.com/):

1. **GET `/posts/:id`**
   - **Propósito**: Obtener el detalle de una publicación única.
   - **Uso**: Se concatena el ID al final de la URL base.
2. **GET `/posts/:id/comments`**
   - **Propósito**: Listar todos los comentarios de una publicación específica.
   - **Uso**: Útil para secciones de discusión debajo de un post.
3. **POST `/posts`**
   - **Propósito**: Simular la creación de un nuevo recurso en el servidor.
   - **Requisito**: Requiere un cuerpo (body) en formato JSON y el encabezado `application/json`.

## 🐛 Problema Reportado

El equipo de integración reporta que el módulo de API no funciona en absoluto:

1. El código ni siquiera carga en el navegador/consola debido a un error de puntuación.
2. Al intentar obtener una publicación, se reciben objetos vacíos o promesas pendientes en lugar de los datos reales.
3. Al crear publicaciones, el servidor responde pero no parece guardar los campos enviados (posible problema de cabeceras).

**Ejemplos del problema**:

- `getPostById(1)` retorna `Promise { <pending> }` en lugar del objeto de la publicación.
- `createPost(...)` no envía los datos en el formato que el servidor espera, causando que se ignoren los campos.

## 📂 Archivos

- `buggy-code.js` - Código con errores de `async/await`, sintaxis y encabezados.
- `test.js` - Pruebas para validar la comunicación con la API.
- `solution.js` - Implementación correcta para referencia.

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/07-api-integration
```

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio / Avanzado (Debido al uso de fetch real)

**Tiempo Estimado**: 20-30 minutos
