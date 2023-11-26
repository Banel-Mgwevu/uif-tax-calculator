# South African UIF and Tax Calculator API

This Node.js API calculates UIF (Unemployment Insurance Fund) deductions and taxes based on a user's net monthly pay in South Africa. It also allows for additional deductions like medical aid and other expenses.

## Features

- Calculates UIF deductions.
- Calculates income tax based on the net monthly pay, considering tax brackets and rates.
- Supports deductions for medical aid and other expenses.
- Error handling for invalid inputs and deductions exceeding the net monthly pay.

## Getting Started

To use this API, follow these steps:

1. Clone this repository: `git clone https://github.com/Banel-Mgwevu/uif-tax-calculator.git`
2. Install dependencies: `npm install`
3. Start the server: `node index.js`
4. Access the API using HTTP requests (e.g., Postman).

## Usage

### API Endpoint

- **POST** `/calculate`
  - Request Body:
    ```json
    {
      "netMonthlyPay": 5000,
      "medicalAidDeduction": 1000,
      "otherDeductions": 500
    }
    ```
  - Response:
    ```json
    {
      "tax": 800,
      "uif": 100,
      "medicalAidDeduction": 1000,
      "otherDeductions": 500,
      "afterTaxAndUIF": 3600
    }
    ```

Adjust the input values (`netMonthlyPay`, `medicalAidDeduction`, `otherDeductions`) as per your requirements.

## Additional Notes

- Replace the dummy tax brackets and rates in the `calculateTax` function with accurate data based on South African tax laws for precise tax calculations.
- Ensure the API runs on a secure server in production environments.
- Handle sensitive data appropriately, considering encryption and secure data storage.

## Contributions

Contributions to improve and expand the functionality of this API are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
