/**
 * Sistema bancario orientado a objetos.
 *
 * Modela cuentas bancarias con historial de transacciones, transferencias
 * entre cuentas y una cuenta de ahorros con tasa de interés configurable.
 */

// ─────────────────────────────────────────────
// Clase Transaction
// ─────────────────────────────────────────────

class Transaction {
  /**
   * @param {'deposit'|'withdrawal'|'transfer'} type
   * @param {number} amount - Siempre positivo
   * @param {string} description
   */
  constructor(type, amount, description = '') {
    if (amount <= 0) {
      throw new Error('El monto de la transacción debe ser un número positivo');
    }
    this.type = type;
    this.amount = amount;
    this.description = description;
    this.date = new Date();
  }

  /**
   * Retorna el impacto neto de la transacción sobre el balance.
   * Depósitos son positivos, retiros y transferencias son negativos.
   * @returns {number}
   */
  getNetEffect() {
    // CORREGIDO: Los depósitos suman, los retiros/transferencias restan.
    return this.type === 'deposit' ? this.amount : -this.amount;
  }

  toString() {
    const sign = this.type === 'deposit' ? '+' : '-';
    return `[${this.type.toUpperCase()}] ${sign}$${this.amount.toFixed(2)} — ${this.description}`;
  }
}

// ─────────────────────────────────────────────
// Clase BankAccount
// ─────────────────────────────────────────────

class BankAccount {
  /**
   * @param {string} owner - Nombre del titular
   * @param {number} initialBalance - Saldo inicial (debe ser >= 0)
   */
  constructor(owner, initialBalance = 0) {
    if (typeof owner !== 'string' || owner.trim() === '') {
      throw new Error('El titular de la cuenta debe ser un texto válido');
    }
    if (initialBalance < 0) {
      throw new Error('El saldo inicial no puede ser negativo');
    }

    this.owner = owner;
    this._balance = initialBalance;
    this._transactions = [];
  }

  /** @returns {number} Saldo actual */
  get balance() {
    return this._balance;
  }

  /**
   * Deposita dinero en la cuenta.
   * @param {number} amount - Monto a depositar (debe ser > 0)
   * @param {string} description
   * @returns {number} Nuevo saldo
   */
  deposit(amount, description = 'Depósito') {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('El monto del depósito debe ser un número positivo');
    }
    // CORREGIDO: Se suma el amount al balance, no se resta.
    this._balance += amount;
    this._transactions.push(new Transaction('deposit', amount, description));
    return this._balance;
  }

  /**
   * Retira dinero de la cuenta.
   * @param {number} amount - Monto a retirar (debe ser > 0)
   * @param {string} description
   * @returns {number} Nuevo saldo
   */
  withdraw(amount, description = 'Retiro') {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('El monto del retiro debe ser un número positivo');
    }
    // CORREGIDO: La condición correcta es > (no >=) para permitir retirar
    // exactamente el saldo disponible.
    if (amount > this._balance) {
      throw new Error('Fondos insuficientes');
    }
    this._balance -= amount;
    this._transactions.push(new Transaction('withdrawal', amount, description));
    return this._balance;
  }

  /**
   * Transfiere dinero hacia otra cuenta.
   * @param {BankAccount} targetAccount - Cuenta destino
   * @param {number} amount
   */
  transfer(targetAccount, amount) {
    if (!(targetAccount instanceof BankAccount)) {
      throw new Error(
        'La cuenta destino debe ser una instancia de BankAccount',
      );
    }
    // CORREGIDO: El orden correcto es: primero retirar, luego depositar.
    this.withdraw(amount, `Transferencia hacia ${targetAccount.owner}`);
    targetAccount.deposit(amount, `Transferencia desde ${this.owner}`);
  }

  /**
   * Retorna una copia defensiva del historial de transacciones.
   * @returns {Transaction[]}
   */
  getTransactionHistory() {
    // CORREGIDO: Se retorna una copia del array (spread) para evitar que
    // el exterior mute el historial interno de la cuenta.
    return [...this._transactions];
  }

  /**
   * Calcula el balance reconstruido sumando todos los efectos netos.
   * Debe coincidir con this._balance.
   * @returns {number}
   */
  getCalculatedBalance() {
    // CORREGIDO: Se pasa el valor inicial 0 al reduce y se usa getNetEffect()
    return this._transactions.reduce((acc, tx) => acc + tx.getNetEffect(), 0);
  }

  /**
   * Retorna el número total de depósitos realizados.
   * @returns {number}
   */
  countDeposits() {
    return this._transactions.filter((tx) => tx.type === 'deposit').length;
  }

  /**
   * Retorna el número total de retiros realizados.
   * @returns {number}
   */
  countWithdrawals() {
    return this._transactions.filter(
      (tx) => tx.type === 'withdrawal' || tx.type === 'transfer',
    ).length;
  }

  toString() {
    return `Cuenta de ${this.owner} | Saldo: $${this._balance.toFixed(2)}`;
  }
}

// ─────────────────────────────────────────────
// Clase SavingsAccount  (extiende BankAccount)
// ─────────────────────────────────────────────

class SavingsAccount extends BankAccount {
  /**
   * @param {string} owner
   * @param {number} initialBalance
   * @param {number} interestRate - Tasa anual en porcentaje (ej. 5 para 5%)
   * @param {number} minimumBalance - Saldo mínimo que debe mantenerse
   */
  constructor(
    owner,
    initialBalance = 0,
    interestRate = 3,
    minimumBalance = 100,
  ) {
    super(owner, initialBalance);
    if (interestRate < 0) {
      throw new Error('La tasa de interés no puede ser negativa');
    }
    if (minimumBalance < 0) {
      throw new Error('El saldo mínimo no puede ser negativo');
    }
    // CORREGIDO: La tasa se almacena como decimal para el cálculo.
    this.interestRate = interestRate / 100;
    this.minimumBalance = minimumBalance;
  }

  /**
   * Aplica un período de interés al saldo actual.
   * Registra el interés ganado como un depósito.
   * @returns {number} Monto de interés ganado
   */
  applyInterest() {
    // CORREGIDO: El interés es saldo × tasa. Se redondea a 2 decimales.
    const interest = parseFloat((this._balance * this.interestRate).toFixed(2));
    this.deposit(interest, 'Interés periódico');
    return interest;
  }

  /**
   * Sobreescribe el retiro para respetar el saldo mínimo requerido.
   * @param {number} amount
   * @param {string} description
   * @returns {number} Nuevo saldo
   */
  withdraw(amount, description = 'Retiro') {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('El monto del retiro debe ser un número positivo');
    }
    // CORREGIDO: Se verifica que el saldo resultante no caiga por debajo del mínimo.
    if (this._balance - amount < this.minimumBalance) {
      throw new Error(
        `El retiro dejaría el saldo por debajo del mínimo requerido de $${this.minimumBalance}`,
      );
    }
    this._balance -= amount;
    this._transactions.push(new Transaction('withdrawal', amount, description));
    return this._balance;
  }

  toString() {
    return `Cuenta Ahorros de ${this.owner} | Saldo: $${this._balance.toFixed(2)} | Tasa: ${(this.interestRate * 100).toFixed(1)}%`;
  }
}

// Exportar para pruebas
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Transaction, BankAccount, SavingsAccount };
}
