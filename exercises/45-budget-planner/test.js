/**
 * Pruebas para Budget Planner
 * Ejecutar con: npm test exercises/45-budget-planner
 */

const { Transaction, Category, BudgetPlanner } = require('./buggy-code.js');

describe('Budget Planner', () => {
  let planner;

  beforeEach(() => {
    planner = new BudgetPlanner();
    planner.addCategory(new Category('food', 'Alimentación', 500));
    planner.addCategory(new Category('transport', 'Transporte', 200));
    planner.addCategory(new Category('entertainment', 'Entretenimiento', 150));
  });

  describe('Transaction - creación', () => {
    test('debe crear una transacción con sus propiedades', () => {
      const tx = new Transaction('T001', 'income', 3000, 'salary', '2024-01');
      expect(tx.id).toBe('T001');
      expect(tx.type).toBe('income');
      expect(tx.amount).toBe(3000);
    });
  });

  describe('BudgetPlanner - ingresos y gastos', () => {
    test('debe calcular el total de ingresos del mes', () => {
      planner.addTransaction(new Transaction('T1', 'income', 3000, 'salary', '2024-01'));
      planner.addTransaction(new Transaction('T2', 'income', 500, 'freelance', '2024-01'));
      planner.addTransaction(new Transaction('T3', 'expense', 200, 'food', '2024-01'));
      expect(planner.getTotalIncome('2024-01')).toBe(3500);
    });

    test('debe calcular el total de gastos del mes', () => {
      planner.addTransaction(new Transaction('T4', 'expense', 300, 'food', '2024-01'));
      planner.addTransaction(new Transaction('T5', 'expense', 100, 'transport', '2024-01'));
      expect(planner.getTotalExpenses('2024-01')).toBe(400);
    });
  });

  describe('BudgetPlanner - tasa de ahorro', () => {
    test('debe calcular la tasa de ahorro como (ingresos - gastos) / ingresos', () => {
      planner.addTransaction(new Transaction('T6', 'income', 4000, 'salary', '2024-02'));
      planner.addTransaction(new Transaction('T7', 'expense', 1000, 'food', '2024-02'));
      // ahorro = 3000, tasa = 3000/4000 = 0.75
      expect(planner.getSavingsRate('2024-02')).toBeCloseTo(0.75);
    });

    test('debe retornar 0 si no hay ingresos', () => {
      planner.addTransaction(new Transaction('T8', 'expense', 500, 'food', '2024-03'));
      expect(planner.getSavingsRate('2024-03')).toBe(0);
    });

    test('debe retornar 1 si no hay gastos', () => {
      planner.addTransaction(new Transaction('T9', 'income', 2000, 'salary', '2024-04'));
      expect(planner.getSavingsRate('2024-04')).toBe(1);
    });
  });

  describe('BudgetPlanner - alertas por categoría', () => {
    test('debe detectar categorías que exceden su presupuesto', () => {
      planner.addTransaction(new Transaction('T10', 'expense', 600, 'food', '2024-05'));
      planner.addTransaction(new Transaction('T11', 'expense', 100, 'transport', '2024-05'));
      const alerts = planner.getBudgetAlerts('2024-05');
      expect(alerts.some(a => a.category === 'food')).toBe(true);
      expect(alerts.some(a => a.category === 'transport')).toBe(false);
    });

    test('debe incluir el porcentaje de uso en la alerta', () => {
      planner.addTransaction(new Transaction('T12', 'expense', 750, 'food', '2024-06'));
      const alerts = planner.getBudgetAlerts('2024-06');
      const foodAlert = alerts.find(a => a.category === 'food');
      expect(foodAlert.usagePercent).toBeCloseTo(150);
    });
  });

  describe('BudgetPlanner - resumen mensual', () => {
    test('debe retornar el resumen correcto del mes', () => {
      planner.addTransaction(new Transaction('T13', 'income', 5000, 'salary', '2024-07'));
      planner.addTransaction(new Transaction('T14', 'expense', 400, 'food', '2024-07'));
      planner.addTransaction(new Transaction('T15', 'expense', 150, 'transport', '2024-07'));
      const summary = planner.getMonthlySummary('2024-07');
      expect(summary.income).toBe(5000);
      expect(summary.expenses).toBe(550);
      expect(summary.savings).toBe(4450);
      expect(summary.savingsRate).toBeCloseTo(0.89);
    });
  });

  describe('BudgetPlanner - proyección de ahorros', () => {
    test('debe proyectar ahorros a N meses con la tasa actual', () => {
      planner.addTransaction(new Transaction('T16', 'income', 4000, 'salary', '2024-08'));
      planner.addTransaction(new Transaction('T17', 'expense', 2000, 'food', '2024-08'));
      // ahorro mensual = 2000, en 3 meses = 6000
      const projection = planner.projectSavings('2024-08', 3);
      expect(projection.totalSavings).toBe(6000);
      expect(projection.months).toBe(3);
    });
  });
});
