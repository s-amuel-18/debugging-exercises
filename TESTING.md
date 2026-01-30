# Guía de Testing con Jest

## ¿Por Qué Jest?

Este proyecto usa **Jest** como framework de testing porque:

- ✅ **Sintaxis clara**: Tests fáciles de leer y escribir
- ✅ **Mensajes descriptivos**: Errores claros que ayudan en la depuración
- ✅ **Organización**: `describe()` y `test()` agrupan tests lógicamente
- ✅ **Matchers potentes**: `toBe()`, `toEqual()`, `toThrow()`, etc.
- ✅ **Watch mode**: Re-ejecuta tests automáticamente al guardar cambios
- ✅ **Cobertura**: Puede generar reportes de code coverage

## Comandos Básicos

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests de un ejercicio específico
npm test exercises/01-calculator-error

# Modo watch (re-ejecuta al guardar cambios)
npm run test:watch

# Con más detalles
npm test -- --verbose
```

## Estructura de un Test

```javascript
// Importar el código a probar
const calculator = require('./buggy-code.js');

// Agrupar tests relacionados
describe('Calculadora - Operaciones Básicas', () => {
  // Subgrupo más específico
  describe('Suma', () => {
    // Test individual
    test('debe sumar 5 + 3 correctamente', () => {
      expect(calculator.add(5, 3)).toBe(8);
    });
  });
});
```

## Trabajando con Código Con Bugs

### Por Defecto: Probar el Código Roto

Los tests están configurados para probar `buggy-code.js` por defecto:

```javascript
// En test.js
const calculator = require('./buggy-code.js'); // ← Activo
// const calculator = require('./solution.js');  // ← Comentado
```

**Esto es intencional** para que:

1. Veas los errores inmediatamente
2. Entiendas qué está fallando
3. Puedas validar que tu corrección funciona

### Después de Corregir: Probar tu Solución

Cuando hayas corregido el bug en tu propio código, cambia la importación:

```javascript
// En test.js
// const calculator = require('./buggy-code.js');  // ← Comentado
const calculator = require('./solution.js'); // ← Activo
```

O mejor aún, crea tu propio archivo y cámbialo a:

```javascript
const calculator = require('./mi-solucion.js');
```

## Interpretando Resultados

### Tests Fallando (Esperado con buggy-code.js)

```
 FAIL  exercises/01-calculator-error/test.js
  📊 Calculadora - Cálculo de Promedio
    ✕ debe calcular el promedio de [10, 20, 30] correctamente (3 ms)

    Expected: 20
    Received: 70
```

Esto te dice:

- ❌ El test falló
- 📍 Función: cálculo de promedio
- ✅ Valor esperado: 20
- ❌ Valor obtenido: 70

### Tests Pasando (Esperado con solution.js)

```
 PASS  exercises/01-calculator-error/test.js
  🧮 Calculadora - Operaciones Básicas
    ✓ debe sumar 5 + 3 correctamente (2 ms)
    ✓ debe restar 10 - 4 correctamente (1 ms)

Test Suites: 1 passed, 1 total
Tests:       22 passed, 22 total
```

¡Todos los tests pasan! ✨

## Matchers Comunes de Jest

### Igualdad

```javascript
// Valores primitivos (números, strings, booleans)
expect(resultado).toBe(5);

// Objetos y arrays (comparación profunda)
expect(array).toEqual([1, 2, 3]);

// Verificar que algo sea verdadero/falso
expect(condicion).toBeTruthy();
expect(condicion).toBeFalsy();
```

### Números

```javascript
// Números decimales con precisión
expect(0.1 + 0.2).toBeCloseTo(0.3);

// Comparaciones
expect(valor).toBeGreaterThan(10);
expect(valor).toBeLessThanOrEqual(100);
```

### Errores

```javascript
// Verificar que se lance un error
expect(() => {
  dividir(10, 0);
}).toThrow();

// Con mensaje específico
expect(() => {
  dividir(10, 0);
}).toThrow('Cannot divide by zero');
```

### Nulos e Indefinidos

```javascript
expect(valor).toBeNull();
expect(valor).toBeUndefined();
expect(valor).toBeDefined();
```

## Tips para Escribir Buenos Tests

### 1. Descripciones Claras en Español

```javascript
// ✅ Bueno
test('debe calcular el promedio de un array vacío como 0', () => {
  expect(calculator.average([])).toBe(0);
});

// ❌ Malo
test('test 1', () => {
  expect(calculator.average([])).toBe(0);
});
```

### 2. Agrupar Tests Lógicamente

```javascript
describe('Calculadora', () => {
  describe('Operaciones básicas', () => {
    describe('Suma', () => {
      test('números positivos', () => {
        /* ... */
      });
      test('números negativos', () => {
        /* ... */
      });
    });

    describe('División', () => {
      test('números enteros', () => {
        /* ... */
      });
      test('error por división por cero', () => {
        /* ... */
      });
    });
  });
});
```

### 3. Cubrir Casos Importantes

```javascript
describe('Función procesarArray', () => {
  test('caso normal: array con varios elementos', () => {
    // Test típico
  });

  test('caso límite: array vacío', () => {
    // ¿Qué pasa con []?
  });

  test('caso límite: array con un elemento', () => {
    // ¿Qué pasa con [1]?
  });

  test('caso de error: entrada null', () => {
    // ¿Maneja errores apropiadamente?
  });
});
```

### 4. Tests Independientes

```javascript
// ❌ Malo: Tests dependen uno del otro
let contador = 0;
test('incrementar', () => {
  contador++;
  expect(contador).toBe(1);
});
test('incrementar de nuevo', () => {
  contador++;
  expect(contador).toBe(2); // Depende del test anterior
});

// ✅ Bueno: Cada test es independiente
test('incrementar desde 0', () => {
  let contador = 0;
  contador++;
  expect(contador).toBe(1);
});
test('incrementar desde 5', () => {
  let contador = 5;
  contador++;
  expect(contador).toBe(6);
});
```

## Workflow de Depuración

1. **Ejecutar tests** → Ver qué falla
2. **Leer el mensaje de error** → Entender qué se esperaba vs qué se obtuvo
3. **Examinar buggy-code.js** → Buscar el problema
4. **Agregar console.log** → Ver valores intermedios si es necesario
5. **Corregir el código** → Hacer tu fix
6. **Re-ejecutar tests** → Verificar que pase
7. **Comparar con solution.js** → Ver si hay diferencias

## Recursos Adicionales

- [Documentación oficial de Jest](https://jestjs.io/docs/getting-started)
- [Matchers de Jest](https://jestjs.io/docs/expect)
- [Testing con Jest - MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_testing)

---

¡Feliz testing! Recuerda: Los tests no solo verifican que el código funcione, sino que también documentan cómo DEBERÍA comportarse. 🧪✨
