"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import EditUserComponent from '@/src/components/user/EditUser';
import { UserRoundCog } from 'lucide-react';

const EditUserPage = () => {
    const { id } = useParams();

  if (!id || Array.isArray(id)) {
    return <div>Invalid Customer ID</div>;
  }

  return (
    <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
    <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
        <UserRoundCog className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
        <h3 className="space-y-0 font-semibold">Edit user</h3>
    </div>
      <EditUserComponent customerId={id} />
    </div>
  );
};

export default EditUserPage;
