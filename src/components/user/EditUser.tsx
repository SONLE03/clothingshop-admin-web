"use client";

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, notification, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { EditUser } from '@/src/api/users/EditUser';
import { GetUserById } from '@/src/api/users/GetUserById';
import { BadgeCheckIcon, Ban } from 'lucide-react';

const { Option } = Select;

interface Props {
  customerId: string;
}

const EditUserComponent: React.FC<Props> = ({ customerId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [customerData, setCustomerData] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customer = await GetUserById(customerId);
        setCustomerData(customer);
        setLoading(false);
      } catch (error) {
        console.error(error);
        notification.error({ message: 'Failed to load customer data' });
      }
    };

    fetchCustomer();
  }, [customerId]);

  useEffect(() => {
    if (customerData) {
      form.setFieldsValue({
        email: customerData.email,
        fullname: customerData.fullName,
        phone: customerData.phone,
        password: customerData.password,
        enabled: customerData.enabled,
        role: customerData.role.toString(),
      });
    }
  }, [customerData, form]);

  const handleSubmit = async (values: any) => {
    try {
      await EditUser(
        customerId,
        values.email,
        values.fullname,
        values.phone,
        values.password,
        parseInt(values.enabled, 10),
        parseInt(values.role, 10)
      );
      notification.success({ message: 'Customer updated successfully' });
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Failed to update customer' });
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email' }]}>
        <Input className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' />
      </Form.Item>
      <Form.Item name="fullname" label="Full Name" rules={[{ required: true, message: 'Please input the full name' }]}>
        <Input className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input the phone number' }]}>
        <Input className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' type='number' min={0} />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input the new password' }]}>
        <Input.Password className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' />
      </Form.Item>
      <Form.Item name="enabled" label="Enabled" valuePropName="checked">
        <Select className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' variant='borderless'>
          <Option value="1"> <text className=' text-green-600'>Enable</text></Option>
          <Option value="0"><text className=' text-red-500'>Disabled</text></Option>
        </Select>
      </Form.Item>
      <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role' }]}>
        <Select className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' variant='borderless'>
          <Option value="0"><text className=' text-blue-500'>ADMIN</text></Option>
          <Option value="1"><text className=' text-orange-500'>STAFF</text></Option>
        </Select>
      </Form.Item>

      <Form.Item className=' flex flex-row justify-center w-full space-y-0'>
        <div className="flex w-full justify-center items-center mt-5">
            <Button className="flex justify-center items-center px-4 py-2 border border-transparent text-center h-10 font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 space-x-1"
            type="primary" htmlType="submit">
                <BadgeCheckIcon className='mr-1'/>
                <text>Save</text></Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default EditUserComponent;
