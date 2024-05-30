import React from 'react';
import YearlyReport from '@/src/components/reports/YearlyReport';
import { LineChart } from 'lucide-react';

const YearlyReportPage: React.FC = () => {
    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
            <YearlyReport />
        </div>
    );
};

export default YearlyReportPage;
