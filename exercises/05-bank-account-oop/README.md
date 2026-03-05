# Sistema Bancario Orientado a Objetos

**Tipo**: Error Lógico / Error de Ejecución

## 📋 Historia de Usuario

Como desarrollador de un sistema financiero, necesito implementar un módulo de gestión bancaria utilizando programación orientada a objetos. El módulo debe modelar cuentas bancarias estándar y cuentas de ahorro, con soporte para depósitos, retiros, transferencias entre cuentas y cálculo de intereses, asegurando la integridad del saldo en todo momento.

## 🎯 Criterios de Aceptación

- **`Transaction`**: Debe registrar el tipo, monto y descripción de cada operación. El método `getNetEffect()` debe retornar un valor positivo para depósitos y negativo para retiros/transferencias.
- **`BankAccount`**:
  - `deposit()` suma el monto al saldo; `withdraw()` lo resta.
  - Se permite retirar exactamente el saldo disponible (sin quedar en negativo).
  - `transfer()` descuenta de la cuenta origen y acredita en la destino, en ese orden.
  - `getTransactionHistory()` retorna una **copia** del historial, no el array interno.
  - `getCalculatedBalance()` reconstruye el saldo sumando el efecto neto de cada transacción desde cero.
- **`SavingsAccount`**:
  - La `interestRate` se almacena internamente como decimal (ej. `5` → `0.05`).
  - `applyInterest()` calcula el interés como `saldo × tasa` y lo registra como depósito.
  - `withdraw()` impide que el saldo resultante caiga **por debajo** del `minimumBalance`. Retirar hasta dejarlo exactamente en el mínimo está permitido.

## 🐛 Problema Reportado

El equipo de QA ha bloqueado el release por múltiples fallos críticos detectados:

1. Los depósitos reducen el saldo en lugar de incrementarlo.
2. No se puede retirar exactamente el saldo disponible; la validación tiene un error en el operador de comparación.
3. En una transferencia, el dinero aparece en la cuenta destino antes de que salga de la origen, lo que crea saldos inconsistentes si la cuenta no tiene fondos.
4. El historial de transacciones está expuesto directamente: modificarlo desde fuera afecta los registros internos del banco.
5. El recálculo del balance ignora si la transacción es un débito o crédito, sumando siempre el monto.
6. `getCalculatedBalance()` lanza una excepción para cuentas sin transacciones (reduce sin valor inicial).
7. La tasa de interés de `SavingsAccount` se aplica sin convertir a decimal (5% se trata como 500%).
8. `applyInterest()` termina usando el operador de depósito que está bugueado, amplificando el error.
9. El retiro en `SavingsAccount` usa `<=` en lugar de `<`, bloqueando retiros que deberían ser válidos (ej. retirar hasta dejar exactamente el mínimo).

**Ejemplos del problema**:

- `new BankAccount('Ana', 100); acc.deposit(50)` → el saldo queda en `50` en lugar de `150`.
- `new SavingsAccount('Lucía', 1000, 10, 0); sa.applyInterest()` → el interés es `100` pero el saldo baja en vez de subir.
- `getCalculatedBalance()` lanza: `TypeError: reduce of empty array with no initial value`.
- `sa.withdraw(400)` sobre una cuenta de $500 con mínimo $100 lanza error innecesariamente.

## 📂 Archivos

- `buggy-code.js` - Módulo de clases con 9 bugs distribuidos.
- `test.js` - Suite de 31 pruebas (Jest).
- `solution.js` - Implementación correcta con comentarios `// CORREGIDO:`.

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/05-bank-account-oop
```

## ⚙️ Nivel de Dificultad

**Nivel**: Avanzado

**Tiempo Estimado**: 30-40 minutos
