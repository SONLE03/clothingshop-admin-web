"use client";
import React, { useEffect, useState } from 'react';
import { GetUserById } from '@/src/api/users/GetUserById';
import { Avatar, Spin } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import toast, { Toaster } from 'react-hot-toast';
import { UserProps } from '@/src/types';
import { Anchor, Contact } from 'lucide-react';

const ProfilePage = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');
            if (userId) {
                const cleanUserId = userId.replace(/"/g, ''); // Remove any extraneous double quotes
                const data = await GetUserById(cleanUserId);
                setUser(data);
                setLoading(false);
            } else {
                toast.error('No user ID found');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>No user data found</p>
            </div>
        );
    }

    return (
        <div className="p-4 relative bg-white shadow-2xl flex flex-col justify-start items-start border border-gray-200 h-full w-full rounded-3xl">
            <div className='flex overflow-hidden justify-center items-center h-96 w-full bg-[url("/dino-bg.jpg")] bg-cover bg-no-repeat rounded-lg'>
                <div className="flex absolute mt-80 bg-gradient-to-br from-white via-white/30 to-white p-8 rounded-xl items-center space-x-4 shadow-2xl border border-gray-300">
                    <Avatar size={80} src={user.image || '/nextjs-logo.jpg'} icon={<UserOutlined />} />
                    <div>
                        <h2 className="text-xl font-bold">{user.fullName}</h2>
                        <p className="text-sm text-gray-700 font-semibold">{user.role}</p>
                        <p className="text-sm text-gray-700 font-semibold">{user.email}</p>
                    </div>
                </div> 
            </div>
            <div className="max-w-4xl w-1/2 my-20 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <Toaster />
                
                <div className="mt-6">
                    <div className="mb-4">
                        <h3 className="flex flex-row space-x-3 text-lg font-semibold"> <Anchor/> About</h3>
                        <div className="flex items-center space-x-2">
                            <UserOutlined className="text-gray-400" />
                            <span className="text-gray-700">Full Name: {user.fullName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <EnvironmentOutlined className="text-gray-400" />
                            <span className="text-gray-700">Status: {user.enabled ? 'Active' : 'Inactive'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <UserOutlined className="text-gray-400" />
                            <span className="text-gray-700">Role: {user.role}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="flex flex-row space-x-3 text-lg font-semibold"> <Contact/>Contacts</h3>
                        <div className="flex items-center space-x-2">
                            <PhoneOutlined className="text-gray-400" />
                            <span className="text-gray-700">Phone: {user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MailOutlined className="text-gray-400" />
                            <span className="text-gray-700">Email: {user.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
