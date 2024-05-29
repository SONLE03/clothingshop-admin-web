import React from 'react';
import DailyReport from '@/src/components/reports/DailyReport';
import { LineChart } from 'lucide-react';

const DailyReportPage: React.FC = () => {
    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
            <DailyReport />
        </div>
    );
};

export default DailyReportPage;
