import {Sticker } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


const MonthlyReportPage: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
            <h1 className='text-center font-semibold w-full'>Sorry! You have no permission to access these features!</h1>
            <Sticker className='flex font-semibold text-orange-500 mt-4'/>
            <Link className='text-blue-500 font-semibold mt-4 hover:underline' href='/auth/login'>Back to Login</Link>
        </div>
    );
};

export default MonthlyReportPage;
