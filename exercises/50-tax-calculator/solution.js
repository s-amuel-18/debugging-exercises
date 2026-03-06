/**
 * Tax Calculator
 *
 * Calculadora de impuesto progresivo por tramos: cálculo total,
 * desglose por tramo, tasa efectiva y comparación de escenarios fiscales.
 */

// CORREGIDO: el cálculo de cada tramo debe tomar solo el ingreso dentro del rango
// del tramo (min→max), no el ingreso total.
// El bug aplicaba la tasa al ingreso completo por cada tramo alcanzado.
function calculateTax(income, brackets) {
  return brackets.reduce((totalTax, bracket) => {
    if (income <= bracket.min) return totalTax;
    const taxableInBracket = Math.min(income, bracket.max) - bracket.min;
    return totalTax + taxableInBracket * bracket.rate;
  }, 0);
}

function getTaxBreakdown(income, brackets) {
  return brackets
    .filter(bracket => income > bracket.min)
    .map(bracket => {
      const taxableInBracket = Math.min(income, bracket.max) - bracket.min;
      const tax = taxableInBracket * bracket.rate;
      return {
        range: `${bracket.min}-${bracket.max === Infinity ? '∞' : bracket.max}`,
        rate: bracket.rate,
        taxableAmount: taxableInBracket,
        tax: Math.round(tax * 100) / 100,
      };
    });
}

function compareTaxScenarios(scenarios, brackets) {
  const analyzed = scenarios.map(s => ({
    label: s.label,
    income: s.income,
    tax: calculateTax(s.income, brackets),
    effectiveRate: s.income > 0
      ? Math.round((calculateTax(s.income, brackets) / s.income) * 1000) / 1000
      : 0,
  }));

  const sorted = [...analyzed].sort((a, b) => a.tax - b.tax);
  const [best, worst] = [sorted[0], sorted[sorted.length - 1]];

  return {
    scenarios: analyzed,
    recommended: best,
    savings: Math.round((worst.tax - best.tax) * 100) / 100,
  };
}

function getEffectiveRate(income, brackets) {
  if (income === 0) return 0;
  return calculateTax(income, brackets) / income;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateTax, getTaxBreakdown, compareTaxScenarios, getEffectiveRate };
}

if (require.main === module) {
  const brackets = [
    { min: 0,     max: 10000,    rate: 0.10 },
    { min: 10000, max: 40000,    rate: 0.20 },
    { min: 40000, max: 80000,    rate: 0.30 },
    { min: 80000, max: Infinity, rate: 0.40 },
  ];
  console.log('Tax on 50000:', calculateTax(50000, brackets)); // 10000
  console.log('Tax on 100000:', calculateTax(100000, brackets)); // 27000
  console.log('Breakdown 20000:', getTaxBreakdown(20000, brackets));
}
