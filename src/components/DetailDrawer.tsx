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
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        </Transition.Child>
        <Transition.Child
          enter="transition-transform ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="relative bg-white w-full max-w-md ml-auto shadow-xl">
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">User Details</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <img className="h-24 w-24 rounded-full mx-auto" src={user.image || '/logo.png'} alt={user.fullName} />
                <div className="mt-4">
                  <p><strong>Full Name:</strong> {user.fullName}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Status:</strong> {user.enabled ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default UserDetailDrawer;
