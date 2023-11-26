const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Function to calculate tax based on income (example with dummy brackets)
function calculateTax(income) {
  // Tax brackets and rates based on South African tax laws (dummy implementation)
  const brackets = [
    { min: 0, max: 50000, rate: 0.18 },
    { min: 50001, max: 200000, rate: 0.26 },
    { min: 200001, max: Infinity, rate: 0.31 }
  ];

  let tax = 0;
  let remainingIncome = income;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const taxableAmountInBracket = Math.min(bracket.max - bracket.min, remainingIncome);
    tax += taxableAmountInBracket * bracket.rate;
    remainingIncome -= taxableAmountInBracket;
  }

  return tax;
}

// Tax and UIF calculation function with additional deductions
function calculateTaxAndUIF(netMonthlyPay, medicalAidDeduction = 0, otherDeductions = 0) {
  if (netMonthlyPay <= 0 || isNaN(netMonthlyPay)) {
    throw new Error('Net monthly pay should be a positive number.');
  }

  const taxableIncome = netMonthlyPay - medicalAidDeduction - otherDeductions;
  if (taxableIncome < 0) {
    throw new Error('Deductions exceed the net monthly pay.');
  }

  const tax = calculateTax(taxableIncome);
  const uif = netMonthlyPay * 0.02; // 2% UIF deduction (example)

  const afterTaxAndUIF = netMonthlyPay - tax - uif - medicalAidDeduction - otherDeductions;
  return { tax, uif, medicalAidDeduction, otherDeductions, afterTaxAndUIF };
}

// API endpoint to calculate tax, UIF, and deductions
app.post('/calculate', (req, res) => {
  try {
    const { netMonthlyPay, medicalAidDeduction = 0, otherDeductions = 0 } = req.body;

    const result = calculateTaxAndUIF(netMonthlyPay, medicalAidDeduction, otherDeductions);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
