import React from 'react';

//import MonthlyReport from '@/src/components/reports/MonthlyReport';
import { LineChart } from 'lucide-react';
import dynamic from 'next/dynamic';

const MonthlyReport = dynamic(() => import('@/src/components/reports/MonthlyReport'), { ssr: false });

const MonthlyReportPage: React.FC = () => {
    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
            <MonthlyReport />
        </div>
    );
};

export default MonthlyReportPage;
