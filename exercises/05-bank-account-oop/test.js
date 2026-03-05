/**
 * Pruebas para: Sistema Bancario Orientado a Objetos
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/05-bank-account-oop
 */

// IMPORTANTE: Cambiar esta línea para probar tu solución
const { Transaction, BankAccount, SavingsAccount } = require('./buggy-code.js');
// const { Transaction, BankAccount, SavingsAccount } = require('./solution.js');

// ─────────────────────────────────────────────
// Transaction
// ─────────────────────────────────────────────

describe('Sistema Bancario OOP', () => {
  describe('Transaction - Clase de transacción', () => {
    test('debe crear una transacción con los datos correctos', () => {
      const tx = new Transaction('deposit', 100, 'Salario');
      expect(tx.type).toBe('deposit');
      expect(tx.amount).toBe(100);
      expect(tx.description).toBe('Salario');
    });

    test('debe lanzar error si el monto es cero o negativo', () => {
      expect(() => new Transaction('deposit', 0)).toThrow();
      expect(() => new Transaction('deposit', -50)).toThrow();
    });

    test('getNetEffect() debe retornar positivo para depósitos', () => {
      const tx = new Transaction('deposit', 200);
      expect(tx.getNetEffect()).toBe(200);
    });

    test('getNetEffect() debe retornar negativo para retiros', () => {
      const tx = new Transaction('withdrawal', 50);
      expect(tx.getNetEffect()).toBe(-50);
    });
  });

  // ─────────────────────────────────────────────
  // BankAccount — constructor y balance
  // ─────────────────────────────────────────────

  describe('BankAccount - Constructor y balance inicial', () => {
    test('debe crear correctamente una cuenta con saldo inicial', () => {
      const acc = new BankAccount('Ana', 500);
      expect(acc.owner).toBe('Ana');
      expect(acc.balance).toBe(500);
    });

    test('debe iniciar con saldo 0 si no se pasa argumento', () => {
      const acc = new BankAccount('Bob');
      expect(acc.balance).toBe(0);
    });

    test('debe lanzar error si el owner no es texto válido', () => {
      expect(() => new BankAccount('')).toThrow();
      expect(() => new BankAccount(123)).toThrow();
    });

    test('debe lanzar error si el saldo inicial es negativo', () => {
      expect(() => new BankAccount('Carlos', -100)).toThrow();
    });
  });

  // ─────────────────────────────────────────────
  // BankAccount — deposit
  // ─────────────────────────────────────────────

  describe('BankAccount - deposit()', () => {
    test('debe incrementar el saldo al depositar', () => {
      const acc = new BankAccount('Ana', 100);
      acc.deposit(50);
      expect(acc.balance).toBe(150);
    });

    test('debe retornar el nuevo saldo', () => {
      const acc = new BankAccount('Ana', 100);
      expect(acc.deposit(200)).toBe(300);
    });

    test('debe lanzar error si el monto es negativo o cero', () => {
      const acc = new BankAccount('Ana', 100);
      expect(() => acc.deposit(-10)).toThrow();
      expect(() => acc.deposit(0)).toThrow();
    });

    test('debe registrar la transacción correctamente', () => {
      const acc = new BankAccount('Ana', 0);
      acc.deposit(100, 'Bono');
      expect(acc.getTransactionHistory()).toHaveLength(1);
      expect(acc.getTransactionHistory()[0].type).toBe('deposit');
    });
  });

  // ─────────────────────────────────────────────
  // BankAccount — withdraw
  // ─────────────────────────────────────────────

  describe('BankAccount - withdraw()', () => {
    test('debe decrementar el saldo al retirar', () => {
      const acc = new BankAccount('Ana', 200);
      acc.withdraw(80);
      expect(acc.balance).toBe(120);
    });

    test('debe permitir retirar exactamente el saldo disponible', () => {
      const acc = new BankAccount('Ana', 100);
      expect(() => acc.withdraw(100)).not.toThrow();
      expect(acc.balance).toBe(0);
    });

    test('debe lanzar error si no hay fondos suficientes', () => {
      const acc = new BankAccount('Ana', 100);
      expect(() => acc.withdraw(101)).toThrow('Fondos insuficientes');
    });

    test('debe lanzar error si el monto es negativo o cero', () => {
      const acc = new BankAccount('Ana', 100);
      expect(() => acc.withdraw(-20)).toThrow();
      expect(() => acc.withdraw(0)).toThrow();
    });
  });

  // ─────────────────────────────────────────────
  // BankAccount — transfer
  // ─────────────────────────────────────────────

  describe('BankAccount - transfer()', () => {
    test('debe mover el dinero de la cuenta origen a la destino', () => {
      const source = new BankAccount('Ana', 500);
      const target = new BankAccount('Bob', 100);
      source.transfer(target, 200);
      expect(source.balance).toBe(300);
      expect(target.balance).toBe(300);
    });

    test('debe fallar si la cuenta origen no tiene fondos suficientes', () => {
      const source = new BankAccount('Ana', 50);
      const target = new BankAccount('Bob', 0);
      expect(() => source.transfer(target, 100)).toThrow();
    });

    test('debe lanzar error si el destino no es una BankAccount', () => {
      const source = new BankAccount('Ana', 500);
      expect(() => source.transfer({}, 100)).toThrow();
    });
  });

  // ─────────────────────────────────────────────
  // BankAccount — historial e inmutabilidad
  // ─────────────────────────────────────────────

  describe('BankAccount - getTransactionHistory()', () => {
    test('debe retornar todas las transacciones registradas', () => {
      const acc = new BankAccount('Ana', 0);
      acc.deposit(100);
      acc.deposit(50);
      expect(acc.getTransactionHistory()).toHaveLength(2);
    });

    test('NO debe exponer el array interno (inmutabilidad)', () => {
      const acc = new BankAccount('Ana', 0);
      acc.deposit(100);
      const history = acc.getTransactionHistory();
      history.push('intruso');
      // El historial interno no debe haber sido modificado
      expect(acc.getTransactionHistory()).toHaveLength(1);
    });
  });

  // ─────────────────────────────────────────────
  // BankAccount — getCalculatedBalance
  // ─────────────────────────────────────────────

  describe('BankAccount - getCalculatedBalance()', () => {
    test('debe reconstruir el balance a partir de las transacciones', () => {
      const acc = new BankAccount('Ana', 0);
      acc.deposit(300);
      acc.withdraw(100);
      acc.deposit(50);
      expect(acc.getCalculatedBalance()).toBe(250);
    });

    test('debe devolver 0 para una cuenta sin transacciones', () => {
      const acc = new BankAccount('Ana', 0);
      expect(acc.getCalculatedBalance()).toBe(0);
    });
  });

  // ─────────────────────────────────────────────
  // SavingsAccount — constructor
  // ─────────────────────────────────────────────

  describe('SavingsAccount - Constructor', () => {
    test('debe almacenar la tasa de interés como decimal (5% → 0.05)', () => {
      const sa = new SavingsAccount('Lucía', 1000, 5, 100);
      expect(sa.interestRate).toBe(0.05);
    });

    test('debe establecer el saldo mínimo correctamente', () => {
      const sa = new SavingsAccount('Lucía', 1000, 5, 200);
      expect(sa.minimumBalance).toBe(200);
    });

    test('debe lanzar error si la tasa es negativa', () => {
      expect(() => new SavingsAccount('Lucía', 1000, -1, 100)).toThrow();
    });
  });

  // ─────────────────────────────────────────────
  // SavingsAccount — applyInterest
  // ─────────────────────────────────────────────

  describe('SavingsAccount - applyInterest()', () => {
    test('debe calcular el interés correctamente (saldo × tasa/100)', () => {
      const sa = new SavingsAccount('Lucía', 1000, 10, 0);
      const interest = sa.applyInterest();
      expect(interest).toBeCloseTo(100);
      expect(sa.balance).toBeCloseTo(1100);
    });

    test('debe registrar el interés como un depósito en el historial', () => {
      const sa = new SavingsAccount('Lucía', 1000, 5, 0);
      sa.applyInterest();
      const history = sa.getTransactionHistory();
      expect(history[history.length - 1].type).toBe('deposit');
      expect(history[history.length - 1].description).toBe('Interés periódico');
    });
  });

  // ─────────────────────────────────────────────
  // SavingsAccount — withdraw con saldo mínimo
  // ─────────────────────────────────────────────

  describe('SavingsAccount - withdraw() con saldo mínimo', () => {
    test('debe permitir retirar hasta el límite disponible sobre el mínimo', () => {
      const sa = new SavingsAccount('Lucía', 500, 5, 100);
      expect(() => sa.withdraw(400)).not.toThrow();
      expect(sa.balance).toBe(100);
    });

    test('debe lanzar error si el retiro viola el saldo mínimo', () => {
      const sa = new SavingsAccount('Lucía', 500, 5, 100);
      expect(() => sa.withdraw(401)).toThrow();
    });

    test('debe lanzar error incluso si hay fondos pero se viola el mínimo', () => {
      const sa = new SavingsAccount('María', 200, 5, 100);
      // Tiene 200, mínimo 100. Retirar 150 dejaría 50 < 100
      expect(() => sa.withdraw(150)).toThrow();
    });
  });
});
