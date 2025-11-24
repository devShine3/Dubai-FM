'use client';

import { useEffect, useState } from 'react';

interface Job {
    id: number;
    description: string;
    status: string;
    scheduledDate: string;
}

interface Invoice {
    id: number;
    invoiceNumber: string;
    totalAmount: number;
    status: string;
}

export default function CustomerPortal() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'HOME' | 'BOOK' | 'BILLS'>('HOME');

    // Mock Login: Customer ID 1 (Ahmed Al Mansoori)
    const CUSTOMER_ID = 1;
    const PROPERTY_ID = 1; // Hardcoded for demo

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:3000/jobs').then(res => res.json()),
            fetch('http://localhost:3000/invoices').then(res => res.json())
        ]).then(([jobsData, invoicesData]) => {
            const myJobs = jobsData.filter((j: any) => j.property?.customer?.id === CUSTOMER_ID);
            const myInvoices = invoicesData.filter((i: any) => i.customer?.id === CUSTOMER_ID && i.status === 'UNPAID');
            setJobs(myJobs);
            setInvoices(myInvoices);
            setLoading(false);
        });
    }, []);

    const handleBookService = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const description = (form.elements.namedItem('description') as HTMLInputElement).value;

        await fetch('http://localhost:3000/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description,
                jobType: 'REACTIVE',
                priority: 'NORMAL',
                propertyId: PROPERTY_ID,
                technicianId: 1 // Auto-assign for demo
            }),
        });

        alert('Service Booked Successfully!');
        window.location.reload();
    };

    const handlePayBill = async (id: number) => {
        if (!confirm('Pay this bill now?')) return;
        await fetch(`http://localhost:3000/invoices/${id}/pay`, { method: 'PATCH' });
        alert('Payment Successful!');
        setInvoices(invoices.filter(i => i.id !== id));
    };

    if (loading) return <div className="p-10 text-center">Loading Portal...</div>;

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero Section */}
            <div className="bg-indigo-900 text-white p-8 rounded-b-3xl shadow-lg relative">
                <button onClick={() => setView('HOME')} className="absolute top-4 left-4 text-indigo-200">
                    {view !== 'HOME' && '← Back'}
                </button>
                <div className="flex justify-between items-center mb-6 mt-4">
                    <h1 className="text-2xl font-bold">
                        {view === 'HOME' ? 'My Home Services' : view === 'BOOK' ? 'Book Service' : 'My Bills'}
                    </h1>
                    <div className="w-10 h-10 bg-indigo-700 rounded-full flex items-center justify-center">
                        👤
                    </div>
                </div>
                {view === 'HOME' && (
                    <div className="bg-indigo-800/50 p-4 rounded-xl backdrop-blur-sm">
                        <p className="text-indigo-200 text-sm mb-1">Current Property</p>
                        <p className="font-semibold text-lg">Villa 101, Arabian Ranches</p>
                    </div>
                )}
            </div>

            {/* Content Switcher */}
            {view === 'HOME' && (
                <>
                    <div className="p-6 grid grid-cols-2 gap-4 -mt-8">
                        <button onClick={() => setView('BOOK')} className="bg-white p-4 rounded-xl shadow-md text-center hover:bg-gray-50 transition-colors">
                            <div className="text-2xl mb-2">🔧</div>
                            <div className="font-bold text-gray-700 text-sm">Book Service</div>
                        </button>
                        <button onClick={() => setView('BILLS')} className="bg-white p-4 rounded-xl shadow-md text-center hover:bg-gray-50 transition-colors relative">
                            <div className="text-2xl mb-2">💳</div>
                            <div className="font-bold text-gray-700 text-sm">Pay Bills</div>
                            {invoices.length > 0 && (
                                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
                            )}
                        </button>
                    </div>

                    <div className="p-6">
                        <h2 className="font-bold text-gray-800 mb-4 text-lg">Recent Activity</h2>
                        <div className="space-y-4">
                            {jobs.length === 0 ? (
                                <div className="text-gray-400 text-center py-8">No active requests.</div>
                            ) : (
                                jobs.map(job => (
                                    <div key={job.id} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mr-4 ${job.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                            }`}>
                                            {job.status === 'COMPLETED' ? '✅' : '🕒'}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800">{job.description}</h3>
                                            <p className="text-xs text-gray-500">Job #{job.id}</p>
                                        </div>
                                        <div className="text-xs font-bold text-gray-400">
                                            {job.status}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}

            {view === 'BOOK' && (
                <div className="p-6">
                    <form onSubmit={handleBookService} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">What's the issue?</label>
                            <textarea
                                name="description"
                                required
                                placeholder="Describe the problem..."
                                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-4 bg-gray-50 text-gray-900"
                                rows={4}
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200">
                            Submit Request
                        </button>
                    </form>
                </div>
            )}

            {view === 'BILLS' && (
                <div className="p-6 space-y-4">
                    {invoices.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            <div className="text-4xl mb-2">🎉</div>
                            No pending bills!
                        </div>
                    ) : (
                        invoices.map(inv => (
                            <div key={inv.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-xs text-gray-400 font-mono">{inv.invoiceNumber}</p>
                                        <h3 className="text-xl font-bold text-gray-900">AED {Number(inv.totalAmount).toFixed(2)}</h3>
                                    </div>
                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">UNPAID</span>
                                </div>
                                <button
                                    onClick={() => handlePayBill(inv.id)}
                                    className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Pay with Apple Pay 
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
