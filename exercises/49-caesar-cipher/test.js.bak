/**
 * Pruebas para Caesar Cipher
 * Ejecutar con: npm test exercises/49-caesar-cipher
 */

const { encrypt, decrypt, crackCipher, analyzeFrequency } = require('./buggy-code.js');

describe('Caesar Cipher', () => {
  describe('encrypt - cifrado', () => {
    test('debe cifrar texto con desplazamiento 3 (A→D)', () => {
      expect(encrypt('ABC', 3)).toBe('DEF');
    });

    test('debe hacer wrap alrededor del alfabeto (X→A con desplazamiento 3)', () => {
      expect(encrypt('XYZ', 3)).toBe('ABC');
    });

    test('debe preservar mayúsculas y minúsculas', () => {
      expect(encrypt('Hello', 3)).toBe('Khoor');
    });

    test('debe preservar espacios y caracteres no alfabéticos', () => {
      expect(encrypt('Hello, World!', 3)).toBe('Khoor, Zruog!');
    });

    test('desplazamiento 0 no debe cambiar el texto', () => {
      expect(encrypt('ABC', 0)).toBe('ABC');
    });
  });

  describe('decrypt - descifrado', () => {
    test('debe descifrar correctamente con el mismo desplazamiento', () => {
      expect(decrypt('DEF', 3)).toBe('ABC');
    });

    test('decrypt(encrypt(text)) debe devolver el texto original', () => {
      const original = 'Hello World';
      expect(decrypt(encrypt(original, 13), 13)).toBe(original);
    });

    test('debe descifrar con wrap alrededor del alfabeto', () => {
      expect(decrypt('ABC', 3)).toBe('XYZ');
    });

    test('ROT13 debe ser auto-inverso', () => {
      expect(decrypt(encrypt('Secret', 13), 13)).toBe('Secret');
    });
  });

  describe('analyzeFrequency - frecuencia de letras', () => {
    test('debe retornar la letra más frecuente del texto', () => {
      const freq = analyzeFrequency('AABBBCCCC');
      expect(freq[0].letter).toBe('C');
      expect(freq[0].count).toBe(4);
    });

    test('debe ordenar por frecuencia descendente', () => {
      const freq = analyzeFrequency('AAABBC');
      expect(freq[0].count).toBeGreaterThanOrEqual(freq[1].count);
      expect(freq[1].count).toBeGreaterThanOrEqual(freq[2].count);
    });

    test('debe ignorar espacios y caracteres no alfabéticos', () => {
      const freq = analyzeFrequency('A B! C, A');
      expect(freq.every(f => /[A-Z]/.test(f.letter))).toBe(true);
    });
  });

  describe('crackCipher - descifrado por frecuencia', () => {
    test('debe identificar el desplazamiento más probable asumiendo E como letra más frecuente', () => {
      // Ciframos un texto con muchas E, el crack debería detectar desplazamiento 3
      const plaintext = 'THESE EVENTS ARE EVERY EXCELLENT ELEMENT ELSE';
      const encrypted = encrypt(plaintext, 3);
      const result = crackCipher(encrypted);
      expect(result.likelyShift).toBe(3);
    });
  });
});
