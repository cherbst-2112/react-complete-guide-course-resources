import { calculateInvestmentResults, formatter } from '../util/investment.js';

export default function Results({ userInput }) {
  let totalInterest = 0;
  let investedCapital = userInput.initialInvestment;

  return <table id="result">
    <thead>
    <tr>
      <th>Year</th>
      <th>Investment Value</th>
      <th>Interest (year)</th>
      <th>Total Interest</th>
      <th>Invested Capital</th>
    </tr>
    </thead>
    <tbody>
    {
      calculateInvestmentResults(userInput).map((row) => {
        totalInterest += row.interest;
        investedCapital += row.annualInvestment;

        return <tr key={row.year}>
          <td>{row.year}</td>
          <td>{formatter.format(row.valueEndOfYear)}</td>
          <td>{formatter.format(row.interest)}</td>
          <td>{formatter.format(totalInterest)}</td>
          <td>{formatter.format(investedCapital)}</td>
        </tr>;
      })
    }
    </tbody>
  </table>;
}
