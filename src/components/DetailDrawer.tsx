"use client";
import React from 'react';
import { UserProps } from '@/src/types';
import { Transition } from '@headlessui/react';

interface UserDetailDrawerProps {
  user: UserProps | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailDrawer: React.FC<UserDetailDrawerProps> = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  return (
    <Transition show={isOpen}>
      <div className="fixed inset-0 flex z-50">
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" onClick={onClose} />
        </Transition.Child>
        <Transition.Child
          enter="transition-transform ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="relative bg-white text-black w-full max-w-sm ml-auto shadow-xl rounded-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">User Details</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-200 focus:outline-none">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 flex flex-col items-center">
                <img className="h-20 w-20 rounded-full border-2 border-gray-700" src={user.image || '/logo.png'} alt={user.fullName} />
                <div className="mt-4 space-y-2 w-full">

                    <label className="block text-xs font-medium mb-2">Full Name</label>
                  <div className="p-2 border border-gray-700 rounded-lg">
                    
                    <p className="text-sm">{user.fullName}</p>
                  </div>

                  <label className="block text-xs font-semibold mb-2">Phone</label>
                  <div className="p-2 border border-gray-700 rounded-lg">
                    <p className="text-sm">{user.phone}</p>
                  </div>

                  <label className="block text-xs font-semibold mb-2">Email</label>
                  <div className="p-2 border border-gray-700 rounded-lg">
                    
                    <p className="text-sm">{user.email}</p>
                  </div>

                  <label className="block text-xs font-medium mb-2">Role</label>
                  <div className="p-2 border border-gray-700 rounded-lg">
                    
                    <p className="text-sm">Customer</p>
                  </div>

                  <label className="block text-xs font-medium mb-2">Status</label>
                  <div className="p-2 border border-gray-700 rounded-lg">
                    
                    <p className="text-sm">{user.enabled ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={onClose} className="bg-blue-500 hover:bg-blue-800 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                  Close
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default UserDetailDrawer;
