import React from 'react';
import EditUser from '@/src/components/customer/EditCustomer';
import { UserRoundCheck } from 'lucide-react';

const EditUserPage = () => {

  return (
    <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
      <div className="flex space-y-0 mb-10 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
        <UserRoundCheck className="ml-5 flex text-lg font-bold text-center text-indigo-600"/>
        <h3 className=" space-y-0 text-lg font-semibold">Edit Customer</h3>
      </div>
      <EditUser />
    </div>
  );
};

export default EditUserPage;
