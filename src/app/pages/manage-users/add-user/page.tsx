"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { AddNewUser } from '@/src/api/users/AddNewUser';
import { UserProps } from '@/src/types';
import { UserPlus } from 'lucide-react';
import Cookies from 'js-cookie';

const { Option } = Select;
const { Title } = Typography;

const AddUser = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    //const token = Cookies.get('access_token');
    //console.log(token);
    //console.log(Cookies.get('access_token'));

    const onFinish = async (values: UserProps) => {
        //const { confirmPassword, ...user } = values; // exclude confirmPassword from the user object
        setLoading(true);
        try {
            await AddNewUser(values);
            message.success('User added successfully');
            // 5 seconds delay
            setTimeout(() => {
                router.push('pages/manage-users/list-users');
            }, 5000);
        
        } catch (error) {
            message.error('Failed to add user');
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = (_: any, value: string) => {
        if (!value || value === form.getFieldValue('password')) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('The two passwords do not match!'));
    };

    const [form] = Form.useForm();

    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">


            <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
                <UserPlus className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
                <Title level={4} className="space-y-0 font-semibold">Add new users</Title>
            </div>
            <div className="container mx-auto my-10">
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    initialValues={{ role: 1 }}
                >
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter the full name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please enter the email' }]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please enter the phone number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter the password' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm the password' },
                            { validator: validatePassword }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please select a role' }]}
                    >
                        <Select>
                            <Option value={1}>STAFF</Option>
                            <Option value={0}>ADMIN</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Add User
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    );
};

export default AddUser;
