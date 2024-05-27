"use client";
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import {
    Card, Avatar, Button, Dropdown, Menu, Modal, Drawer, Input, Row, Col, message,
    Typography,
} from 'antd';

import {
    EditOutlined, DeleteOutlined, EyeOutlined, MoreOutlined, PlusOutlined, SearchOutlined,
} from '@ant-design/icons';

import { GetAllStaffs } from '@/src/api/users/GetAllStaffs';
import { DeleteUser } from '@/src/api/users/DeleteUser';
import { GetUserById } from '@/src/api/users/GetUserById';
import { UserProps } from '@/src/types';
import { BookUser } from 'lucide-react';

const { Meta } = Card;
const { confirm } = Modal;
const { Title } = Typography;

const ManageUsers = () => {
    const [users, setUsers] = useState<UserProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
   

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await GetAllStaffs();
            setUsers(data);
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const handleView = async (id : string) => {
        const data = await GetUserById(id);
        setSelectedUser(data);
        setVisible(true);
    };

    const handleEdit = (id : string) => {
        router.push(`/manage-users/edit-user/${id}`);
    };

    const handleDelete = (id : string) => {
        confirm({
            title: 'Are you sure you want to delete this user?',
            onOk: async () => {
                await DeleteUser(id);
                setUsers(users.filter(user => user.id !== id));
                message.success('User deleted successfully');
            },
        });
    };

    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredUsers = users.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm)
    );

    const menu = (user : UserProps) => (
        <Menu>
            <Menu.Item icon={<EyeOutlined />} onClick={() => handleView(user.id)}>
                View
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} onClick={() => handleEdit(user.id)}>
                Edit
            </Menu.Item>
            <Menu.Item icon={<DeleteOutlined />} onClick={() => handleDelete(user.id)}>
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">


            <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
                <BookUser className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
                <Title level={4} className="space-y-0 font-semibold">Manage Users</Title>
            </div>

            <div className="container mx-auto my-10 bg-white rounded-3xl shadow-xl">
                <Row justify="space-between" align="middle" className="mb-5">
                    <Col>
                        <Input
                            placeholder="Search by full name"
                            prefix={<SearchOutlined />}
                            onChange={handleSearch}
                        />
                    </Col>
                    <Col>
                        <Button className=' bg-indigo-600 rounded-lg'
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => router.push('/manage-users/add-user')}
                        >
                            Add New User
                        </Button>
                    </Col>
                </Row>
                <Row gutter={16}>
                    {filteredUsers.map((user) => (
                        <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
                            <Card className='flex flex-col justify-center items-center border border-gray-400 rounded-xl shadow-xl'
                                style={{ marginBottom: 20 }}
                                actions={[
                                    <Dropdown className='flex justify-center items-center bg-black border rounded-xl hover:bg-white hover:text-black hover:border-black border-white border-t-gray-500 p-2' overlay={menu(user)} trigger={['click']}>
                                        <h3 className='text-white'>Actions</h3>
                                    </Dropdown>,
                                ]}
                            >
                                <Meta className='flex flex-col justify-center items-center'
                                    avatar={
                                        <Avatar size={100} src={user.image || '/nextjs-logo.jpg'} />
                                    }
                                    
                                    title={user.fullName}
                                    description={user.email}
                                />
                                <div className="mt-4">
                                    <p className=' font-semibold'>Phone: {user.phone}</p>
                                    <p className=' font-semibold'>Role: <span style={{ color: user.role === 'STAFF' ? 'orange' : 'green' }}>{user.role}</span></p>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {selectedUser && (
                    <Drawer
                        title="User Information"
                        placement="right"
                        onClose={() => setVisible(false)}
                        visible={visible}
                    >
                        
                        <div className="mt-4 flex flex-col items-center">
                            <img className="h-20 w-20 rounded-full border-2 border-gray-700" src={selectedUser.image || '/nextjs-logo.jpg'} alt={selectedUser.fullName} />
                            <div className="mt-4 space-y-2 w-full">

                                <label className="block text-xs font-medium mb-2">Full Name</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                
                                <p className="text-sm">{selectedUser.fullName}</p>
                            </div>

                            <label className="block text-xs font-semibold mb-2">Phone</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedUser.phone}</p>
                            </div>

                            <label className="block text-xs font-semibold mb-2">Email</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                
                                <p className="text-sm">{selectedUser.email}</p>
                            </div>

                            <label className="block text-xs font-medium mb-2">Role</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                
                                <p className="text-sm">{selectedUser.role}</p>
                            </div>

                            <label className="block text-xs font-medium mb-2">Status</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                
                                <p className="text-sm">{selectedUser.enabled ? 'Active' : 'Inactive'}</p>
                            </div>
                            </div>

                            
                        </div>

                        
                    </Drawer>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
