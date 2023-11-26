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

// Function to calculate UIF benefit based on months worked
function calculateUIFBenefit(netMonthlyPay, monthsWorked) {
  const totalMonthsInYear = 12;
  const totalYearsWorked = monthsWorked / totalMonthsInYear;

  // UIF calculation (employee contribution)
  const uifEmployeeContribution = netMonthlyPay * 0.01; // 1% of net monthly pay

  // Calculate UIF benefit based on years worked
  let uifBenefit = 0;
  if (totalYearsWorked >= 1 && totalYearsWorked < 2) {
    uifBenefit = netMonthlyPay * 0.3; // Example: 30% of net monthly pay for 1 year worked
  } else if (totalYearsWorked >= 2 && totalYearsWorked < 3) {
    uifBenefit = netMonthlyPay * 0.35; // Example: 35% of net monthly pay for 2 years worked
  } else if (totalYearsWorked >= 3) {
    uifBenefit = netMonthlyPay * 0.45; // Example: 45% of net monthly pay for 3 or more years worked
  }

  return uifBenefit;
}

// API endpoint to calculate tax, UIF benefits, and deductions based on net monthly pay and months worked
app.post('/calculate', (req, res) => {
  const { netMonthlyPay, monthsWorked, medicalAidDeduction = 0, otherDeductions = 0 } = req.body;

  try {
    if (netMonthlyPay <= 0 || isNaN(netMonthlyPay) || monthsWorked <= 0 || isNaN(monthsWorked)) {
      throw new Error('Net monthly pay and months worked should be positive numbers.');
    }

    const taxableIncome = netMonthlyPay - medicalAidDeduction - otherDeductions;
    const tax = calculateTax(taxableIncome);
    const uifBenefit = calculateUIFBenefit(netMonthlyPay, monthsWorked);

    // Return the calculated tax, UIF benefit, and net UIF after deducting tax and deductions
    res.json({
      tax,
      uifBenefit,
      netUIFAfterTaxAndDeductions: uifBenefit - tax // Net UIF after deducting tax
    });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle any errors
  }
});

// Replace '3000' with your desired port number
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
