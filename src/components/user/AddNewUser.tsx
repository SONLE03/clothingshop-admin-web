"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { AddNewUser } from '@/src/api/users/AddNewUser';
import { UserProps } from '@/src/types';
import { BadgeCheck } from 'lucide-react';

const { Option } = Select;

const AddNewUsers = () => {
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
        <div>
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
                        <Input className='border border-gray-500 rounded-lg hover:border-blue-500' />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please enter the email' }]}
                    >
                        <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="email" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please enter the phone number' }]}
                    >
                        <Input className='border border-gray-500 rounded-lg hover:border-blue-500'type='number' min={0} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter the password' }]}
                    >
                        <Input.Password className='border border-gray-500 rounded-lg hover:border-blue-500' />
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
                        <Input.Password className='border border-gray-500 rounded-lg hover:border-blue-500' />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please select a role' }]}
                    >
                        <Select className='border border-gray-500 rounded-lg hover:border-blue-500 mr-6 mb-3' variant='borderless'>
                            <Option value={1}>STAFF</Option>
                            <Option value={0}>ADMIN</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className='flex justify-center items-center mt-6'>
                        <Button className='flex justify-center items-center text-center w-full h-10' type="primary" htmlType="submit" loading={loading}>
                            <BadgeCheck className='mr-2' height={20} width={20}/>
                            Add User
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    );
};

export default AddNewUsers;
