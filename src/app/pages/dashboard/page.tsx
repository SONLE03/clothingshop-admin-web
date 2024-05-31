import React from 'react';
import Dashboard from '@/src/components/dashboard/Dashboard';

const DashboardPage: React.FC = () => {
    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
            <h1>Dashboard</h1>
            <Dashboard />
        </div>
    );
};

export default DashboardPage;
