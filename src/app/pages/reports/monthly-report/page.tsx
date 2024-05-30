import React from 'react';
import MonthlyReport from '@/src/components/reports/MonthlyReport';
import { LineChart } from 'lucide-react';

const MonthlyReportPage: React.FC = () => {
    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
            <MonthlyReport />
        </div>
    );
};

export default MonthlyReportPage;
