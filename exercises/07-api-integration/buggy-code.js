/**
 * Módulo de integración con JSONPlaceholder
 * 
 * Este módulo se encarga de obtener datos de publicaciones y comentarios
 * utilizando la API de JSONPlaceholder.
 */

const fetch = typeof globalThis.fetch !== 'undefined' ? globalThis.fetch : null;

/**
 * Obtiene una publicación por su ID
 * Endpoint: GET https://jsonplaceholder.typicode.com/posts/:id
 */
async function getPostById(id) {
  if (!id) throw new Error('Se requiere un ID de publicación');
  
  // Intento de obtener datos de la API
  const response = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  
  // Bug: No se verifica response.ok antes de procesar
  const post = response.json(); 
  return post;
}

/**
 * Obtiene los comentarios de una publicación
 * Endpoint: GET https://jsonplaceholder.typicode.com/posts/:id/comments
 */
async function getPostComments(postId) {
  if (!postId) throw new Error('Se requiere un ID de publicación');
  
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  
  // Error de sintaxis intencional o manejo incorrecto del resultado
  const data = await response.json(; 
  return data;
}

/**
 * Crea una nueva publicación (simulado por la API)
 * Endpoint: POST https://jsonplaceholder.typicode.com/posts
 */
async function createPost(postData) {
  // Bug: Faltan los headers obligatorios para que JSONPlaceholder procese el POST como JSON
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error(`Error al crear la publicación: ${response.status}`);
  }

  return response.json();
}

// Exportar para testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getPostById, getPostComments, createPost };
}
