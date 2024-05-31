"use client";
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { UpdateCustomer } from '@/src/api/customers/UpdateCustomer';
import { useParams, useRouter } from 'next/navigation';
import { BadgeCheckIcon } from 'lucide-react';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  enabled: boolean;
}

const EditUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/v1/customers/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          setLoading(false);
        });
    }
  }, [id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : null));
  };

  const handleToggleEnabled = () => {
    setUser((prevUser) => (prevUser ? { ...prevUser, enabled: !prevUser.enabled } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (!user || !id) {
      toast.error('Invalid user data.');
      setSaving(false);
      return;
    }

    try {
      const updatedUser = await UpdateCustomer({ id, email: user.email, fullName: user.fullName, phone: user.phone });

      if (updatedUser) {
        toast.success('User updated successfully.');
        setTimeout(() => {
          router.push('/pages/manage-customers/list-customers'); // Điều hướng sau khi lưu thành công
        }, 1000);
      } else {
        toast.error('Failed to update user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return <div className='flex justify-center items-center h-2/3'>Loading...</div>;
  }

  if (!user) {
    return <div className='flex justify-center items-center h-2/3'>User not found!</div>;
  }

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
            className="mt-1 block w-full border border-gray-500 rounded-xl hover:border-blue-500 shadow-sm p-2"
            required
          />
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
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-500 rounded-xl hover:border-blue-500 shadow-sm p-2"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="enabled"
            checked={user.enabled}
            onChange={() => setUser((prevUser) => (prevUser ? { ...prevUser, enabled: !prevUser.enabled } : null))}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">Enabled</label>
        </div>
        <div className='flex justify-center items-center w-full'>
          <button
            type="submit"
            className="flex justify-center items-center px-4 py-2 border border-transparent text-center w-1/5 h-10 font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 space-x-4"
            disabled={saving}
          >
            <BadgeCheckIcon className='mr-2'/>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
