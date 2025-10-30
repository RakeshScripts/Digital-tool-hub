
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTheme } from '../contexts/ThemeContext';


const EmiCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState<number>(1000000);
    const [rate, setRate] = useState<number>(8.5);
    const [tenure, setTenure] = useState<number>(20); // In years
    const { theme } = useTheme();

    const { emi, totalPayable, totalInterest } = useMemo(() => {
        const p = principal;
        const r = rate / 12 / 100; // monthly interest rate
        const n = tenure * 12; // number of months

        if (p > 0 && r > 0 && n > 0) {
            const emiCalc = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalPayableCalc = emiCalc * n;
            const totalInterestCalc = totalPayableCalc - p;
            return {
                emi: emiCalc,
                totalPayable: totalPayableCalc,
                totalInterest: totalInterestCalc
            };
        }
        return { emi: 0, totalPayable: 0, totalInterest: 0 };
    }, [principal, rate, tenure]);
    
    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

    const pieData = [
        { name: 'Principal Amount', value: principal },
        { name: 'Total Interest', value: totalInterest },
    ];
    
    const COLORS = ['#1E3A8A', '#D97706'];

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-1">Loan Amount (₹)</label>
                    <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-1">Interest Rate (% p.a.)</label>
                    <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-1">Loan Tenure (Years)</label>
                    <input type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full px-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
            </div>
             <div className="bg-base-200 dark:bg-gray-700 p-6 rounded-lg text-center">
                <h3 className="text-lg text-text-secondary dark:text-gray-300">Monthly EMI</h3>
                <p className="text-4xl font-bold text-brand-primary dark:text-blue-400 my-2">{formatCurrency(emi)}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">Total Interest</h4>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">{formatCurrency(totalInterest)}</p>
                </div>
                 <div className="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300">Total Payable</h4>
                    <p className="text-2xl font-bold text-amber-900 dark:text-amber-200">{formatCurrency(totalPayable)}</p>
                </div>
            </div>
             <div className="w-full h-64">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                            {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip 
                            formatter={(value: number) => formatCurrency(value)} 
                            contentStyle={{ 
                                backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                                color: theme === 'dark' ? '#F9FAFB' : '#111827',
                                border: '1px solid',
                                borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
                            }}
                        />
                        <Legend wrapperStyle={{ color: theme === 'dark' ? '#F9FAFB' : '#374151' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const EmiInfo: React.FC = () => (
    <div className="prose max-w-none text-text-secondary dark:text-gray-400">
        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mb-4">Understanding the EMI Calculator</h2>
        <p>An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.</p>
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">The Formula Behind EMI Calculation</h3>
        <p>The mathematical formula to calculate EMI is:</p>
        <p className="text-center bg-base-200 dark:bg-gray-700 dark:text-gray-300 p-4 rounded-md font-mono text-sm">EMI = [P × r × (1 + r)ⁿ] / [(1 + r)ⁿ⁻¹]</p>
        <p>Where:</p>
        <ul className="list-disc pl-5">
            <li><strong>P</strong> is the Principal loan amount.</li>
            <li><strong>r</strong> is the monthly rate of interest. It is calculated as (annual rate of interest / 12 / 100).</li>
            <li><strong>n</strong> is the loan tenure in number of months.</li>
        </ul>
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">How to Use This Calculator</h3>
        <p>This tool simplifies complex financial calculations into three easy steps:</p>
        <ol className="list-decimal pl-5">
            <li><strong>Enter Loan Amount:</strong> Input the total principal amount you intend to borrow.</li>
            <li><strong>Enter Interest Rate:</strong> Provide the annual interest rate offered by the lender.</li>
            <li><strong>Enter Loan Tenure:</strong> Specify the duration of the loan in years.</li>
        </ol>
        <p>The calculator will instantly display your monthly EMI, the total interest you'll pay over the loan's lifetime, and the total amount payable (principal + interest). The pie chart provides a clear visual breakdown of the principal versus the interest components of your total repayment.</p>
        <h3 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">Financial Planning</h3>
        <p>Using an EMI calculator is a crucial first step in financial planning. It helps you understand the affordability of a loan and how it will impact your monthly budget. By adjusting the loan amount, interest rate, or tenure, you can see how each variable affects your monthly payment and choose a loan that fits comfortably within your financial means.</p>
    </div>
);


const EmiCalculatorPage: React.FC = () => {
    return (
        <ToolPageLayout
            title="Equated Monthly Installment (EMI) Calculator"
            description="Effortlessly calculate your loan's monthly payments. This tool helps you plan your finances by breaking down your loan repayment into principal and interest components."
            toolComponent={<EmiCalculator />}
            infoComponent={<EmiInfo />}
            toolId="emi-calculator"
        />
    );
};

export default EmiCalculatorPage;
