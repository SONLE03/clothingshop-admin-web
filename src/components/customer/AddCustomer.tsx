"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import { CreateCustomer } from '@/src/api/customers/CreateCustomer';
import { Customer } from '@/src/types';

const AddCustomer: React.FC = () => {
  const [user, setUser] = useState<Customer>({ email: '', fullName: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(value)) {
        setEmailError('The email must contain @gmail.com, please correct it.');
      } else {
        setEmailError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError) {
      toast.error(emailError);
      return;
    }

    setSaving(true);

    try {
      await CreateCustomer(user);
      toast.success('Customer created successfully.');
      setTimeout(() => {
        router.push('/pages/manage-customers/list-customers');
      }, 1000);
    } catch (error) {
      toast.error('Failed to create customer.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
        <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className={`mt-1 block w-full border hover:border-blue-500 rounded-xl focus:border-blue-500 ${emailError ? 'border-red-500' : 'border-gray-500'} rounded-md shadow-sm p-2`}
            required
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-500 rounded-xl hover:border-blue-500 shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input 
            type="number"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-500 rounded-xl hover:border-blue-500 shadow-sm p-2"
            required
          />
        </div>
        <div className='flex justify-center items-center w-full'>
          <button
            type="submit"
            className="flex justify-center items-center text-center h-10 w-1/5 px-4 py-2 mt-6 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-500 hover:bg-blue-700"
            disabled={saving || !!emailError}
            
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
