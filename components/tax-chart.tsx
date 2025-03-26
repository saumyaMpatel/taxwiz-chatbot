import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface TaxChartProps {
  income: number;
  deductions: number;
  taxableIncome: number;
  totalTax: number;
}

export const TaxChart: React.FC<TaxChartProps> = ({
  income,
  deductions,
  taxableIncome,
  totalTax
}) => {
  const data = [
    { name: 'Gross Income', value: income, fill: '#3B82F6' },
    { name: 'Deductions', value: -deductions, fill: '#10B981' },
    { name: 'Taxable Income', value: taxableIncome, fill: '#8B5CF6' },
    { name: 'Total Tax', value: totalTax, fill: '#EF4444' }
  ];

  return (
    <div className="w-full h-64 bg-white shadow-md rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" horizontal />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip
            formatter={(value: number) => [`$${Math.abs(value).toLocaleString()}`, 'Amount']}
          />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaxChart;