import React from 'react';
import { UserPlus } from 'lucide-react';
//import AddNewUsers from '@/src/components/user/AddNewUser';
import dynamic from 'next/dynamic';

//Dynamic import AddNewUsers component
const AddNewUsers = dynamic(() => import('@/src/components/user/AddNewUser'), {
    ssr: false
});

const AddNewUserPage = () => {

    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
            <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
                <UserPlus className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
                <h3 className="space-y-0 font-semibold">Add new users</h3>
            </div>
            <AddNewUsers />

        </div>
    );
};

export default AddNewUserPage;
