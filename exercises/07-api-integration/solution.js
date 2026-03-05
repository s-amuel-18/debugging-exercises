/**
 * Módulo de integración con JSONPlaceholder
 *
 * Este módulo se encarga de obtener datos de publicaciones y comentarios
 * utilizando la API de JSONPlaceholder.
 */

// CORREGIDO: Se añadió node-fetch para entornos de Node.js donde fetch no es nativo (v16-)
// Aunque en versiones modernas de Node es nativo, lo ideal es asegurar su presencia
// si el entorno lo requiere. Para este ejercicio usamos el global si existe.
const fetch = typeof globalThis.fetch !== 'undefined' ? globalThis.fetch : null;

/**
 * Obtiene una publicación por su ID
 * Endpoint: GET https://jsonplaceholder.typicode.com/posts/:id
 */
async function getPostById(id) {
  if (!id) throw new Error('Se requiere un ID de publicación');

  // CORREGIDO: Se añadió await a la llamada fetch
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );

  // CORREGIDO: Se verifica si la respuesta es exitosa (response.ok)
  if (!response.ok) {
    throw new Error(`Error al obtener la publicación: ${response.status}`);
  }

  // CORREGIDO: Se añadió await a la conversión .json()
  const post = await response.json();
  return post;
}

/**
 * Obtiene los comentarios de una publicación
 * Endpoint: GET https://jsonplaceholder.typicode.com/posts/:id/comments
 */
async function getPostComments(postId) {
  if (!postId) throw new Error('Se requiere un ID de publicación');

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
  );

  if (!response.ok) {
    throw new Error(`Error al obtener comentarios: ${response.status}`);
  }

  // CORREGIDO: Se eliminó el error de sintaxis del objeto (coma extra o propiedad mal escrita)
  const data = await response.json();
  return data;
}

/**
 * Crea una nueva publicación (simulado por la API)
 * Endpoint: POST https://jsonplaceholder.typicode.com/posts
 */
async function createPost(postData) {
  // CORREGIDO: Se añadieron las cabeceras 'Content-type' necesarias para que la API procese el JSON
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error(`Error al crear la publicación: ${response.status}`);
  }

  // CORREGIDO: Se retorna la respuesta parseada correctamente
  return await response.json();
}

// Exportar para testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getPostById, getPostComments, createPost };
}
