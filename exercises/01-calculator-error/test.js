/**
 * Pruebas para: Error de Cálculo en Calculadora
 *
 * Estas pruebas verifican la funcionalidad de la calculadora.
 * Por defecto, prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/01-calculator-error
 */

// IMPORTANTE: Cambiar esta línea para probar tu solución
const calculator = require('./buggy-code.js');
// const calculator = require('./solution.js');

describe('🧮 Calculadora - Operaciones Básicas', () => {
  describe('Suma', () => {
    test('debe sumar 5 + 3 correctamente', () => {
      expect(calculator.add(5, 3)).toBe(8);
    });

    test('debe sumar 100 + 250 correctamente', () => {
      expect(calculator.add(100, 250)).toBe(350);
    });

    test('debe sumar números negativos', () => {
      expect(calculator.add(-5, -3)).toBe(-8);
    });
  });

  describe('Resta', () => {
    test('debe restar 10 - 4 correctamente', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });

    test('debe restar 0 - 5 correctamente', () => {
      expect(calculator.subtract(0, 5)).toBe(-5);
    });

    test('debe manejar restas con resultado negativo', () => {
      expect(calculator.subtract(3, 10)).toBe(-7);
    });
  });

  describe('Multiplicación', () => {
    test('debe multiplicar 6 × 7 correctamente', () => {
      expect(calculator.multiply(6, 7)).toBe(42);
    });

    test('debe multiplicar 12 × 0 correctamente', () => {
      expect(calculator.multiply(12, 0)).toBe(0);
    });

    test('debe multiplicar números negativos', () => {
      expect(calculator.multiply(-5, 3)).toBe(-15);
    });
  });

  describe('División', () => {
    test('debe dividir 20 ÷ 4 correctamente', () => {
      expect(calculator.divide(20, 4)).toBe(5);
    });

    test('debe dividir 100 ÷ 10 correctamente', () => {
      expect(calculator.divide(100, 10)).toBe(10);
    });

    test('debe lanzar error al dividir por cero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Cannot divide by zero');
    });

    test('debe manejar división con resultado decimal', () => {
      expect(calculator.divide(10, 4)).toBe(2.5);
    });
  });
});

describe('📊 Calculadora - Cálculo de Promedio', () => {
  test('debe calcular el promedio de [10, 20, 30] correctamente', () => {
    expect(calculator.average([10, 20, 30])).toBe(20);
  });

  test('debe calcular el promedio de [5, 10, 15, 20] correctamente', () => {
    expect(calculator.average([5, 10, 15, 20])).toBe(12.5);
  });

  test('debe calcular el promedio de un solo elemento [100]', () => {
    expect(calculator.average([100])).toBe(100);
  });

  test('debe calcular el promedio de [0, 0, 0] correctamente', () => {
    expect(calculator.average([0, 0, 0])).toBe(0);
  });

  test('debe calcular el promedio de [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', () => {
    expect(calculator.average([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(5.5);
  });

  test('debe devolver 0 para un array vacío', () => {
    expect(calculator.average([])).toBe(0);
  });

  test('debe calcular el promedio de [50, 60, 70, 80, 90]', () => {
    expect(calculator.average([50, 60, 70, 80, 90])).toBe(70);
  });

  test('debe manejar números decimales en el array', () => {
    expect(calculator.average([1.5, 2.5, 3.5])).toBeCloseTo(2.5, 1);
  });

  test('debe manejar números negativos', () => {
    expect(calculator.average([-10, 0, 10])).toBe(0);
  });
});
