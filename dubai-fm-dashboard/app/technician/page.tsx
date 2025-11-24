'use client';

import { useEffect, useState } from 'react';

interface Job {
    id: number;
    description: string;
    status: string;
    property: {
        name: string;
        community: string;
        googleMapsLink: string;
    };
}

export default function TechnicianPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock Login: Hardcoded to Technician ID 1 (John Doe)
    const TECH_ID = 1;

    useEffect(() => {
        // In a real app, we would filter by the logged-in technician
        fetch('http://localhost:3000/jobs')
            .then((res) => res.json())
            .then((data) => {
                // Client-side filter for demo purposes
                const myJobs = data.filter((j: any) => j.technician?.id === TECH_ID && j.status !== 'COMPLETED');
                setJobs(myJobs);
                setLoading(false);
            });
    }, []);

    const completeJob = async (id: number) => {
        if (!confirm('Mark job as completed?')) return;

        // Call API to update status (We need to build this endpoint next)
        await fetch(`http://localhost:3000/jobs/${id}/complete`, { method: 'PATCH' });

        // Remove from list
        setJobs(jobs.filter(j => j.id !== id));
    };

    if (loading) return <div className="p-6 text-center">Loading Assignments...</div>;

    return (
        <div className="min-h-screen bg-gray-100 pb-20">
            <header className="bg-blue-700 text-white p-4 shadow-md sticky top-0 z-10">
                <h1 className="text-lg font-bold">Technician App</h1>
                <p className="text-xs opacity-80">Welcome, John Doe</p>
            </header>

            <div className="p-4 space-y-4">
                {jobs.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">No active jobs. Good job! 🎉</div>
                ) : (
                    jobs.map(job => (
                        <div key={job.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                                    {job.status}
                                </span>
                                <span className="text-gray-400 text-xs">#{job.id}</span>
                            </div>

                            <h3 className="font-bold text-gray-900 text-lg mb-1">{job.description}</h3>

                            <div className="text-sm text-gray-600 mb-4">
                                <p className="font-medium">{job.property?.name}</p>
                                <p>{job.property?.community}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href={job.property?.googleMapsLink || 'https://www.google.com/maps'}
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium text-sm hover:bg-gray-200"
                                >
                                    📍 Navigate
                                </a>
                                {job.status === 'OPEN' ? (
                                    <button
                                        onClick={async () => {
                                            await fetch(`http://localhost:3000/jobs/${job.id}/start`, { method: 'PATCH' });
                                            // Update local state
                                            setJobs(jobs.map(j => j.id === job.id ? { ...j, status: 'IN_PROGRESS' } : j));
                                        }}
                                        className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-700"
                                    >
                                        ▶ Start
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => completeJob(job.id)}
                                        className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-green-700"
                                    >
                                        ✅ Complete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
