/**
 * Pruebas para Product Recommender
 * Ejecutar con: npm test exercises/46-product-recommender
 */

const {
  jaccardSimilarity,
  getUserSimilarities,
  getRecommendations,
  getPopularProducts,
} = require('./buggy-code.js');

describe('Product Recommender', () => {
  describe('jaccardSimilarity - similitud entre conjuntos', () => {
    test('debe retornar 1 para conjuntos idénticos', () => {
      expect(jaccardSimilarity([1, 2, 3], [1, 2, 3])).toBe(1);
    });

    test('debe retornar 0 para conjuntos sin elementos comunes', () => {
      expect(jaccardSimilarity([1, 2], [3, 4])).toBe(0);
    });

    test('debe calcular similitud correctamente con intersección parcial', () => {
      // intersección={2,3}, unión={1,2,3,4} → 2/4 = 0.5
      expect(jaccardSimilarity([1, 2, 3], [2, 3, 4])).toBeCloseTo(0.5);
    });

    test('debe retornar 0.25 para una intersección de 1 elemento sobre 4 en la unión', () => {
      // intersección={3}, unión={1,2,3,4,5} → 1/5 = 0.2
      expect(jaccardSimilarity([1, 2, 3], [3, 4, 5])).toBeCloseTo(0.2);
    });

    test('debe manejar arreglos vacíos retornando 0', () => {
      expect(jaccardSimilarity([], [])).toBe(0);
    });
  });

  describe('getUserSimilarities - similitudes con otros usuarios', () => {
    const users = [
      { id: 'U1', purchases: [1, 2, 3] },
      { id: 'U2', purchases: [2, 3, 4] },
      { id: 'U3', purchases: [5, 6, 7] },
    ];

    test('debe retornar similitudes ordenadas de mayor a menor', () => {
      const sims = getUserSimilarities('U1', users);
      expect(sims[0].similarity).toBeGreaterThanOrEqual(sims[1].similarity);
    });

    test('debe excluir al propio usuario de las similitudes', () => {
      const sims = getUserSimilarities('U1', users);
      expect(sims.every(s => s.userId !== 'U1')).toBe(true);
    });

    test('U1 y U2 deben tener similitud 0.5 (2 comunes de 4 en unión)', () => {
      const sims = getUserSimilarities('U1', users);
      const u2sim = sims.find(s => s.userId === 'U2');
      expect(u2sim.similarity).toBeCloseTo(0.5);
    });
  });

  describe('getRecommendations - recomendaciones personalizadas', () => {
    const users = [
      { id: 'U1', purchases: [1, 2, 3] },
      { id: 'U2', purchases: [2, 3, 4, 5] },
      { id: 'U3', purchases: [1, 2, 6] },
    ];

    const products = [
      { id: 1, name: 'Laptop', stock: 5 },
      { id: 2, name: 'Mouse', stock: 10 },
      { id: 3, name: 'Keyboard', stock: 0 },
      { id: 4, name: 'Monitor', stock: 3 },
      { id: 5, name: 'Headphones', stock: 7 },
      { id: 6, name: 'Webcam', stock: 2 },
    ];

    test('debe recomendar productos que el usuario no ha comprado', () => {
      const recs = getRecommendations('U1', users, products);
      const recIds = recs.map(r => r.id);
      expect(recIds).not.toContain(1);
      expect(recIds).not.toContain(2);
      expect(recIds).not.toContain(3);
    });

    test('debe excluir productos sin stock', () => {
      const recs = getRecommendations('U1', users, products);
      expect(recs.every(r => r.stock > 0)).toBe(true);
    });

    test('debe retornar al menos un producto recomendado para U1', () => {
      const recs = getRecommendations('U1', users, products);
      expect(recs.length).toBeGreaterThan(0);
    });
  });

  describe('getPopularProducts - productos más comprados', () => {
    const users = [
      { id: 'U1', purchases: [1, 2, 3] },
      { id: 'U2', purchases: [2, 3, 4] },
      { id: 'U3', purchases: [2, 5] },
    ];

    test('debe retornar los productos ordenados por popularidad', () => {
      const popular = getPopularProducts(users, 3);
      expect(popular[0].productId).toBe(2); // aparece 3 veces
      expect(popular[0].count).toBe(3);
    });

    test('debe limitar el resultado a N productos', () => {
      const popular = getPopularProducts(users, 2);
      expect(popular.length).toBe(2);
    });
  });
});
