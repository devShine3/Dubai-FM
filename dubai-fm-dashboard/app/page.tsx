'use client';

import { useEffect, useState } from 'react';

interface Job {
  id: number;
  jobType: string;
  description: string;
  status: string;
  priority: string;
  technician: {
    name: string;
  };
  property: {
    name: string;
    community: string;
  };
}

export default function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => console.error('Failed to fetch jobs:', err));
  }, []);

  if (loading) return <div className="p-10">Loading Jobs...</div>;

  if (loading) return <div className="flex items-center justify-center h-screen text-blue-600 animate-pulse">Loading Dashboard...</div>;

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Job Board</h2>
          <p className="text-gray-500 mt-1">Manage and track all active maintenance requests.</p>
        </div>
        <a href="/jobs/new" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2 font-medium">
          <span>+</span> Create Job
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: OPEN */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <h2 className="font-semibold text-gray-500 mb-4 uppercase tracking-wider">Open Jobs</h2>
          <div className="space-y-4">
            {jobs.filter(j => j.status === 'OPEN').map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Column 2: IN PROGRESS */}
        <div className="bg-blue-50 p-4 rounded-xl">
          <h2 className="font-semibold text-blue-500 mb-4 uppercase tracking-wider">In Progress</h2>
          <div className="space-y-4">
            {jobs.filter(j => j.status === 'IN_PROGRESS').map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Column 3: COMPLETED */}
        <div className="bg-green-50 p-4 rounded-xl">
          <h2 className="font-semibold text-green-500 mb-4 uppercase tracking-wider">Completed</h2>
          <div className="space-y-4">
            {jobs.filter(j => j.status === 'COMPLETED').map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full tracking-wide ${job.priority === 'HIGH' || job.priority === 'URGENT'
          ? 'bg-red-50 text-red-600 border border-red-100'
          : 'bg-blue-50 text-blue-600 border border-blue-100'
          }`}>
          {job.priority}
        </span>
        <span className="text-xs text-gray-400 font-mono">#{job.id}</span>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
        {job.description}
      </h3>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="text-gray-400">📍</span>
        <span className="truncate">{job.property?.name}, {job.property?.community}</span>
      </div>

      <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 border border-white shadow-sm">
            {job.technician?.name.charAt(0)}
          </div>
          <span className="text-xs font-medium text-gray-600">{job.technician?.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {job.status === 'COMPLETED' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Generate Invoice for this job?')) {
                  fetch(`http://localhost:3000/jobs/${job.id}/invoice`, { method: 'POST' })
                    .then(() => {
                      alert('Invoice Generated! Check the Invoices tab.');
                      window.location.href = '/invoices';
                    });
                }
              }}
              className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded hover:bg-green-100 transition-colors"
              title="Generate Invoice"
            >
              $ Invoice
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Delete this job?')) {
                fetch(`http://localhost:3000/jobs/${job.id}`, { method: 'DELETE' })
                  .then(() => window.location.reload());
              }
            }}
            className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
            title="Delete Job"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
