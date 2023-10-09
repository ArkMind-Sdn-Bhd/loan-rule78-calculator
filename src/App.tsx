import {useState} from 'react'
import './App.css'

interface AmortizationRow {
    month: number;
    principal: number;
    interest: number;
}
function App() {

    const [loanAmount, setLoanAmount] = useState<number>(10000); // Initial loan amount
    const [annualInterestRate, setAnnualInterestRate] = useState<number>(0.06); // Annual interest rate (6%)
    const [loanTermInMonths, setLoanTermInMonths] = useState<number>(12); // Loan term in months
    const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);

    const calculateAmortization = () => {
        const totalInterest = (loanAmount * annualInterestRate) / 12;
        let remainingLoanAmount = loanAmount;
        let schedule: AmortizationRow[] = [];

        for (let month = 1; month <= loanTermInMonths; month++) {
            const interestFraction = (loanTermInMonths - month + 1) / 78;
            const interestPayment = totalInterest * interestFraction;
            const principalPayment = totalInterest - interestPayment;

            schedule.push({
                month,
                principal: principalPayment,
                interest: interestPayment,
            });

            remainingLoanAmount -= principalPayment;
        }

        setAmortizationSchedule(schedule);
    };

    return (
        <>
            <div>
                <h2>Loan Amortization Calculator</h2>
                <div>
                    <label>Loan Amount:</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Annual Interest Rate (%):</label>
                    <input
                        type="number"
                        value={annualInterestRate * 100}
                        onChange={(e) => setAnnualInterestRate(Number(e.target.value) / 100)}
                    />
                </div>
                <div>
                    <label>Loan Term (Months):</label>
                    <input
                        type="number"
                        value={loanTermInMonths}
                        onChange={(e) => setLoanTermInMonths(Number(e.target.value))}
                    />
                </div>
                <button onClick={calculateAmortization}>Calculate Amortization</button>

                <h3>Amortization Schedule</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Month</th>
                        <th>Principal</th>
                        <th>Interest</th>
                    </tr>
                    </thead>
                    <tbody>
                    {amortizationSchedule.map((row) => (
                        <tr key={row.month}>
                            <td>{row.month}</td>
                            <td>${row.principal.toFixed(2)}</td>
                            <td>${row.interest.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default App
