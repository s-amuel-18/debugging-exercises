/**
 * Pruebas para: Pronóstico del Tiempo
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/13-weather-forecast
 */

const {
  fetchCityWeather,
  fetchMultipleCities,
  getHottestCity,
  getAverageTemperature,
} = require('./buggy-code.js');
// const { fetchCityWeather, fetchMultipleCities, getHottestCity, getAverageTemperature } = require('./solution.js');

describe('Pronóstico del Tiempo - Error Asíncrono', () => {
  // ─── fetchCityWeather ─────────────────────────────────────────────────────

  describe('fetchCityWeather - Consulta de clima individual', () => {
    test('debe retornar los datos correctos de una ciudad existente', async () => {
      const result = await fetchCityWeather('Madrid');
      expect(result.city).toBe('Madrid');
      expect(result.temperature).toBe(25);
      expect(result.condition).toBe('Soleado');
    });

    test('debe rechazar la promesa con un error si la ciudad no existe', async () => {
      await expect(fetchCityWeather('Atlantis')).rejects.toThrow(
        'Ciudad no encontrada: Atlantis',
      );
    });

    test('debe retornar los datos de Tokio correctamente', async () => {
      const result = await fetchCityWeather('Tokio');
      expect(result.temperature).toBe(28);
    });
  });

  // ─── fetchMultipleCities ──────────────────────────────────────────────────

  describe('fetchMultipleCities - Consulta de múltiples ciudades', () => {
    test('debe retornar un array con los datos de todas las ciudades solicitadas', async () => {
      const results = await fetchMultipleCities(['Madrid', 'Londres']);
      // Debe ser un array real, no una Promise sin resolver
      expect(Array.isArray(results)).toBe(true);
      expect(results).toHaveLength(2);
    });

    test('debe contener los datos correctos de cada ciudad en el array resultante', async () => {
      const results = await fetchMultipleCities(['Madrid', 'Tokio']);
      const cities = results.map((r) => r.city);
      expect(cities).toContain('Madrid');
      expect(cities).toContain('Tokio');
    });

    test('debe retornar array vacío para una lista vacía de ciudades', async () => {
      const results = await fetchMultipleCities([]);
      expect(results).toEqual([]);
    });
  });

  // ─── getHottestCity ───────────────────────────────────────────────────────

  describe('getHottestCity - Ciudad con mayor temperatura', () => {
    test('debe retornar la ciudad con la temperatura más alta', async () => {
      // Madrid=25, Londres=15, Tokio=28 → Tokio es la más caliente
      const result = await getHottestCity(['Madrid', 'Londres', 'Tokio']);
      expect(result.city).toBe('Tokio');
      expect(result.temperature).toBe(28);
    });

    test('debe retornar el único elemento si se pasa una sola ciudad', async () => {
      const result = await getHottestCity(['Paris']);
      expect(result.city).toBe('Paris');
    });

    test('debe retornar un objeto con los datos del clima, no una Promise', async () => {
      const result = await getHottestCity(['Madrid', 'Londres']);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('temperature');
      expect(result).toHaveProperty('city');
    });
  });

  // ─── getAverageTemperature ────────────────────────────────────────────────

  describe('getAverageTemperature - Temperatura promedio', () => {
    test('debe calcular correctamente el promedio de temperaturas', async () => {
      // Madrid=25, Londres=15 → promedio = 20
      const avg = await getAverageTemperature(['Madrid', 'Londres']);
      expect(avg).toBe(20);
    });

    test('debe redondear el promedio a 1 decimal', async () => {
      // Madrid=25, Londres=15, Paris=18 → (25+15+18)/3 = 19.3
      const avg = await getAverageTemperature(['Madrid', 'Londres', 'Paris']);
      expect(avg).toBe(19.3);
    });

    test('debe retornar la temperatura de la única ciudad si solo hay una', async () => {
      const avg = await getAverageTemperature(['Tokio']);
      expect(avg).toBe(28);
    });
  });
});
