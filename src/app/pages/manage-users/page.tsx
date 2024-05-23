"use client";

import { Fragment, useEffect, useState } from 'react';
import { Listbox, Menu, Transition } from '@headlessui/react';
import { Check, ChevronDown, EllipsisVertical, User } from 'lucide-react';
import { UserProps } from '@/src/types';
import { GetAllUsers } from '@/src/api/users/GetAllUsers';
import deleteUser from '@/src/api/users/deleteUser';
import DetailDrawer from '@/src/components/DetailDrawer';
import toast, { Toaster } from 'react-hot-toast';

const roles = [
  { name: 'No Filter', value: null, bgColor: 'bg-gray-200', textColor: 'text-gray-900' },
  { name: 'Customer', value: 'Customer', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  { name: 'Admin', value: 'Admin', bgColor: 'bg-red-100', textColor: 'text-red-800' },
  { name: 'Staff', value: 'Staff', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' }
];

const statuses = [
  { name: 'No Filter', value: null, color: 'text-indigo-500' },
  { name: 'Active', value: true, color: 'text-green-500' },
  { name: 'Inactive', value: false, color: 'text-red-500' }
];

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<boolean | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await GetAllUsers();
      setUsers(usersData);
      setFilteredUsers(usersData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (selectedRole) {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    if (selectedStatus !== null) {
      filtered = filtered.filter(user => user.enabled === selectedStatus);
    }

    setFilteredUsers(filtered);
  }, [selectedRole, selectedStatus, users]);

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      toast.success('Delete user success');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleView = (user: UserProps) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <div className="flex gap-4 mb-4">
        <Listbox value={selectedRole} onChange={setSelectedRole}>
          {({ open }) => (
            <div className="relative w-60">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                <span className="block truncate">
                  {selectedRole || "Select Role"}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className={`w-5 h-5 ${open ? 'transform rotate-180' : ''}`} aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {roles.map(role => (
                    <Listbox.Option key={role.value === null ? 'No Filter' : role.value} className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-gray-900 bg-gray-100' : 'text-gray-900'}`} value={role.value}>
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {role.name}
                          </span>
                          {selected && (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-amber-600' : 'text-amber-600'}`}>
                              <Check className="w-5 h-5" aria-hidden="true" />
                            </span>
                          )}
                          <span className={`absolute inset-y-0 left-1 flex items-center pl-3 bg-transparent rounded-full p-1`}>
                            <User className={`w-5 h-5 ${role.textColor}`} aria-hidden="true" />
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
        <Listbox value={selectedStatus} onChange={setSelectedStatus}>
          {({ open }) => (
            <div className="relative w-60">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                <span className="block truncate">
                  {selectedStatus === null ? "Select Status" : selectedStatus ? "Active" : "Inactive"}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className={`w-5 h-5 ${open ? 'transform rotate-180' : ''}`} aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {statuses.map(status => (
                    <Listbox.Option key={status.name} className={({ active }) =>
                      `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'text-gray-900 bg-gray-100' : 'text-gray-900'}`} value={status.value}>
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {status.name}
                          </span>
                          {selected && (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-amber-600' : 'text-amber-600'}`}>
                              <Check className="w-5 h-5" aria-hidden="true" />
                            </span>
                          )}
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-1 ${status.color} rounded-full p-2`}>
                            <User className="w-5 h-5" aria-hidden="true" />
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>
      <table className="min-w-full divide-y divide-gray-200 shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enabled</th>
            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {user.image ? (
                    <img className="h-10 w-10 rounded-full" src={user.image} alt="" />
                  ) : (
                    <span className="inline-block h-10 w-10 rounded-full bg-gray-200"></span>
                  )}
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.role}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {user.enabled ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <EllipsisVertical className="w-5 h-5" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => handleView(user)}
                              className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                            >
                              View
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                            >
                              Edit
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => handleDelete(user.id)}
                              className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                            >
                              Delete
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DetailDrawer user={selectedUser} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default ManageUsers;
