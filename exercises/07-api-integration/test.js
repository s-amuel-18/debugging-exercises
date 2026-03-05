/**
 * Pruebas para: Integración con API (JSONPlaceholder)
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 */

// IMPORTANTE: Cambiar esta línea para probar tu solución
const { getPostById, getPostComments, createPost } = require('./buggy-code.js');
// const { getPostById, getPostComments, createPost } = require('./solution.js');

describe('Integración con API - Error Asíncrono / Sintaxis', () => {
  describe('getPostById - Obtener publicación', () => {
    test('debe retornar la publicación con el ID solicitado', async () => {
      const post = await getPostById(1);
      expect(post.id).toBe(1);
      expect(typeof post.title).toBe('string');
    });

    test('debe lanzar error cuando el post no existe (404)', async () => {
      // JSONPlaceholder tiene 100 posts, el 999 debería dar 404
      await expect(getPostById(999)).rejects.toThrow();
    });
  });

  describe('getPostComments - Obtener comentarios', () => {
    test('debe retornar un arreglo de comentarios para un post', async () => {
      const comments = await getPostComments(1);
      expect(Array.isArray(comments)).toBe(true);
      expect(comments.length).toBeGreaterThan(0);
      expect(comments[0]).toHaveProperty('email');
    });
  });

  describe('createPost - Crear publicación', () => {
    test('debe crear exitosamente un post y retornar el objeto con un nuevo ID', async () => {
      const newPost = {
        title: 'Depurando APIs',
        body: 'Contenido de prueba',
        userId: 1,
      };

      const created = await createPost(newPost);
      expect(created.id).toBe(101); // JSONPlaceholder siempre retorna 101 para nuevos
      expect(created.title).toBe(newPost.title);
    });
  });
});
