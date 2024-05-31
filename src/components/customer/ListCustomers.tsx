"use client";

import { useEffect, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown, Users, RefreshCcw, Eye, Search, PencilIcon, Trash } from 'lucide-react';
import { Table, Button, Menu, Dropdown, Select, Input } from 'antd';

import { UserProps } from '@/src/types';
import { GetAllCustomers } from '@/src/api/customers/GetAllCustomers';
import DeleteCustomer from '@/src/api/customers/DeleteCustomer';
import DetailDrawer from '@/src/components/DetailDrawer';
import toast, { Toaster } from 'react-hot-toast';

const { Option } = Select;

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchCustomer, setSearchCustomer] = useState<string>('');


  useEffect(() => {
    const fetchData = async () => {
      const usersData = await GetAllCustomers();
      setUsers(usersData);
      setFilteredUsers(usersData);
    };

    fetchData();
  }, []);

  const handleDelete = async (userId: string) => {
    try {
      await DeleteCustomer(userId);
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

  const handleEdit = (userId: string) => {
    window.location.href = `/pages/manage-customers/${userId}`;
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCustomer(event.target.value);
    const filtered = users.filter(user => user.fullName.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredUsers(filtered);
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string, user: UserProps) => (
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
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, user: UserProps) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => handleView(user)}>
                <div className='flex flex-row justify-start items-center space-y-0 space-x-1'>
                  <Eye className="mr-2 font-semibold" width={20} height={20} /> 
                  <p>View</p>
                </div>
                
              </Menu.Item>
              <Menu.Item onClick={() => handleEdit(user.id)}>
              <div className='flex flex-row justify-start items-center space-y-0 space-x-1'>
                <PencilIcon className="mr-2 font-semibold" width={20} height={20} /> 
                <p>Edit</p>
              </div>
              </Menu.Item>
              <Menu.Item onClick={() => handleDelete(user.id)}>
              <div className='flex flex-row justify-start items-center space-y-0 space-x-1'>
                <Trash className="mr-2 font-semibold" width={20} height={20} /> 
                <p>Delete</p>
              </div>
              </Menu.Item>
            </Menu>
          }
        >
          <Button className='flex flex-row space-y-0 space-x-1'>
            Actions <ChevronDown />
          </Button>
        </Dropdown>
      )
    }
  ];

  return (
    <div>
      <Toaster />
      <div className=" flex flex-row space-x-2 space-y-0 mt-4">
        <Input 
          className="focus:placeholder-transparent focus:border-blue-500 mb-8 w-1/2 h-10 border border-gray-400 rounded-lg shadow-lg" 
          value={searchCustomer} 
          onChange={handleSearch} 
          placeholder="Search by name"
          size="middle"
          prefix={<Search />}
        />

        
      </div>

      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 6 }}
        className="min-w-full rounded-lg shadow-sm border border-gray-300"
        bordered
      />

      <DetailDrawer user={selectedUser} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default ManageUsers;
