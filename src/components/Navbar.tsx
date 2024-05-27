"use client";
import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Menu, Modal, Input, Avatar, notification } from 'antd';
import { SearchOutlined, UserOutlined, SettingOutlined, LogoutOutlined, QuestionCircleOutlined, DashboardOutlined, CalendarOutlined } from '@ant-design/icons';
import { GetUserById } from '../api/users/GetUserById';
import { UserProps } from '../types';
import apiLogout from '../api/auth/logout';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import Title from 'antd/es/typography/Title';
import { Calendar, PackageCheck, PackageOpen, PackagePlus, User, UserSquare, Users } from 'lucide-react';

const Navbar: React.FC = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');
            if (userId) {
                const cleanUserId = userId.replace(/"/g, ''); // Remove any extraneous double quotes
                console.log(cleanUserId); // Debug: Ensure this prints the correct user ID
                const data = await GetUserById(cleanUserId);
                setUser(data);
                
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await apiLogout();
            localStorage.clear();
            window.location.href = "/auth/login";
        } catch (error) {
            notification.error({ message: 'Logout failed' });
        }
    };

    const handleSearch = (value: string) => {
        // Simulate search results based on the input value
        const results = [
            "Manage Users",
            "Add User",
            "Add Product",
            "Manage Products",
            "Manage Customers",
            "Dashboard",
        ].filter(item => item.toLowerCase().includes(value.toLowerCase()));

        setSearchResults(results);
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link href="/pages/profile">Your Profile</Link>
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                <Link href={`/pages/setting/${user?.id}`}>Settings</Link>
            </Menu.Item>
            <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
                <Link href="/help">Help</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Sign out
            </Menu.Item>
        </Menu>
    );

    const shortcutsMenu = (
        <Menu>
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                <Link href="/pages/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="users" icon={<UserOutlined />}>
                <Link href="/pages/manage-users/list-users">Users</Link>
            </Menu.Item>

            <Menu.Item key="calendar" icon={<CalendarOutlined />}>
                <Link href="/pages/calendar">Calendar</Link>
            </Menu.Item>
            {/* Add more shortcut items here */}
        </Menu>
    );

    return (
        <div className="fixed top-0 w-full flex items-start justify-around rounded-xl border border-gray-300 bg-white shadow-md p-4 z-10 h-16">
            <Toaster/>
            <Button className=' mr-96' icon={<SearchOutlined />} onClick={() => setIsModalVisible(true)}>Search</Button>
            <Modal className='flex justify-center items-center text-center text-lg'
                title="QUICK ACCESS"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                
            >

            </Modal>
            <Dropdown overlay={shortcutsMenu} placement="bottomLeft" arrow>
                <Button icon={<DashboardOutlined />} />
            </Dropdown>
            <Dropdown className=' mr-52 border-2 border-gray-500 rounded-full justify-start items-center w-56' overlay={userMenu} placement="bottomLeft" arrow>
                <div className="flex items-center cursor-pointer">
                    <Avatar src={user?.image || "/nextjs-logo.jpg"} />
                    <span className="ml-2">{user?.email}</span>
                </div>
            </Dropdown>
        </div>
    );
};

export default Navbar;
