'use client';

import { useEffect, useState } from 'react';

interface Invoice {
    id: number;
    invoiceNumber: string;
    customer: { name: string };
    totalAmount: number;
    status: string;
    issueDate: string;
}

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/invoices')
            .then((res) => res.json())
            .then((data) => {
                setInvoices(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="flex items-center justify-center h-screen text-blue-600 animate-pulse">Loading Invoices...</div>;

    return (
        <div className="p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Financials</h1>
                    <p className="text-gray-500 mt-1">Track payments, invoices, and VAT compliance.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm">
                    <span className="text-gray-500">VAT TRN:</span> <span className="font-mono font-bold text-gray-800">100-200-300</span>
                </div>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="p-5 font-semibold text-xs text-gray-500 uppercase tracking-wider">Invoice #</th>
                            <th className="p-5 font-semibold text-xs text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="p-5 font-semibold text-xs text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="p-5 font-semibold text-xs text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="p-5 font-semibold text-xs text-gray-500 uppercase tracking-wider text-right">Amount (AED)</th>
                            <th className="p-5 font-semibold text-xs text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {invoices.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-12 text-center text-gray-400">
                                    <div className="text-4xl mb-2">🧾</div>
                                    No invoices generated yet.
                                </td>
                            </tr>
                        ) : (
                            invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="p-5 font-medium text-blue-600 font-mono text-sm">{inv.invoiceNumber}</td>
                                    <td className="p-5">
                                        <div className="font-medium text-gray-900">{inv.customer?.name}</div>
                                    </td>
                                    <td className="p-5 text-gray-500 text-sm">{new Date(inv.issueDate).toLocaleDateString()}</td>
                                    <td className="p-5">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full tracking-wide border ${inv.status === 'PAID'
                                            ? 'bg-green-50 text-green-700 border-green-100'
                                            : 'bg-amber-50 text-amber-700 border-amber-100'
                                            }`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right font-bold text-gray-900">{Number(inv.totalAmount).toFixed(2)}</td>
                                    <td className="p-5">
                                        <button className="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                            Download PDF
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
