'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewJobPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        description: '',
        jobType: 'REACTIVE',
        priority: 'NORMAL',
        propertyId: '',
        technicianId: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('http://localhost:3000/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        router.push('/');
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create New Job</h1>
                        <p className="text-gray-500 text-sm mt-1">Fill in the details to dispatch a technician.</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl">
                        🛠️
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. AC Unit 5 is leaking water"
                            className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 bg-gray-50 text-gray-900"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                            <select
                                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 bg-gray-50 text-gray-900"
                                value={formData.jobType}
                                onChange={e => setFormData({ ...formData, jobType: e.target.value })}
                            >
                                <option value="REACTIVE">Reactive (Call-out)</option>
                                <option value="PPM">PPM (Maintenance)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Priority Level</label>
                            <select
                                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 bg-gray-50 text-gray-900"
                                value={formData.priority}
                                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option value="NORMAL">Normal</option>
                                <option value="HIGH">High Priority</option>
                                <option value="URGENT">Urgent / Emergency</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Property ID</label>
                            <input
                                type="number"
                                required
                                placeholder="e.g. 1"
                                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 bg-gray-50 text-gray-900"
                                value={formData.propertyId}
                                onChange={e => setFormData({ ...formData, propertyId: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Technician ID</label>
                            <input
                                type="number"
                                required
                                placeholder="e.g. 1"
                                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 bg-gray-50 text-gray-900"
                                value={formData.technicianId}
                                onChange={e => setFormData({ ...formData, technicianId: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold shadow-lg shadow-blue-200 transition-all"
                        >
                            Dispatch Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
