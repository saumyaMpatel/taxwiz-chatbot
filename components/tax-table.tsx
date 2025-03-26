import React from 'react';

interface TaxBreakdownProps {
  income: number;
  deductions: number;
  taxableIncome: number;
  taxRate: number;
  totalTax: number;
}

export const TaxTable: React.FC<TaxBreakdownProps> = ({
  income,
  deductions,
  taxableIncome,
  taxRate,
  totalTax
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left font-semibold">Category</th>
            <th className="p-3 text-right font-semibold">Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border-b">Gross Income</td>
            <td className="p-3 border-b text-right">{income.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="p-3 border-b">Total Deductions</td>
            <td className="p-3 border-b text-right text-green-600">
              -{deductions.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="p-3 border-b">Taxable Income</td>
            <td className="p-3 border-b text-right font-bold">
              {taxableIncome.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="p-3 border-b">Tax Rate</td>
            <td className="p-3 border-b text-right">{(taxRate * 100).toFixed(1)}%</td>
          </tr>
          <tr>
            <td className="p-3 font-semibold">Total Tax Owed</td>
            <td className="p-3 text-right font-bold text-red-600">
              {totalTax.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaxTable;