import React from 'react';

import { Users } from 'lucide-react';
//import ManageUsers from '@/src/components/customer/ListCustomers';
import dynamic from 'next/dynamic';

//Dynamic import ManageUsers component
const ManageUsers = dynamic(() => import('@/src/components/customer/ListCustomers'), {
  ssr: false
});

const ManageUsersPage: React.FC = () => {
  

  return (
    <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
      <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
        <Users className="ml-5 flex text-lg font-bold text-center text-indigo-600"/>
        <h2 className=" space-y-0 text-xl font-semibold">Manage Customer</h2>
      </div>

      <ManageUsers />
    </div>
  );
};

export default ManageUsersPage;
