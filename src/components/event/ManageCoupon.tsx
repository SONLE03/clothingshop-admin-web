"use client";

import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Drawer, Form, Input, DatePicker, notification, Skeleton } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { AddCoupon } from '@/src/api/events/coupons/AddCoupon';
import { EditCoupon } from '@/src/api/events/coupons/EditCoupon';
import { DeleteCoupon } from '@/src/api/events/coupons/DeleteCoupon';
import { GetDetailCoupon } from '@/src/api/events/coupons/GetDetailCoupon';
import { GetAllCoupons } from '@/src/api/events/coupons/GetAllCoupons';

import { ExistedCoupon, Coupon } from '@/src/types';
import { Ticket, TicketPlus } from 'lucide-react';

const { RangePicker } = DatePicker;
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const ManageCoupon: React.FC = () => {

  const [coupons, setCoupons] = useState<ExistedCoupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<ExistedCoupon | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(true); // loading state

  const fetchCoupons = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const data = await GetAllCoupons();
      setCoupons(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCardClick = async (couponId: string) => {
    try {
      const data = await GetDetailCoupon(couponId);
      setSelectedCoupon(data);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCoupon = async (couponId: string) => {
    try {
      await DeleteCoupon(couponId);
      fetchCoupons();
      notification.success({ message: 'Coupon deleted successfully' });
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Failed to delete coupon' });
    }
  };

  const handleEditCoupon = async (values: any) => {
    if (selectedCoupon) {
      const updatedCoupon: ExistedCoupon = {
        ...selectedCoupon,
        ...values,
        startDate: values.dateRange[0].format('YYYY-MM-DD'),
        endDate: values.dateRange[1].format('YYYY-MM-DD')
      };
      try {
        await EditCoupon(selectedCoupon.id, updatedCoupon);
        fetchCoupons();
        setIsDrawerVisible(false);
        setIsModalVisible(false);
        notification.success({ message: 'Coupon updated successfully' });
      } catch (error) {
        console.error(error);
        notification.error({ message: 'Failed to update coupon' });
      }
    }
  };

  const handleAddCoupon = async (values: any) => {
    const newCoupon: Coupon = {
      ...values,
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD')
    };
    try {
      await AddCoupon(newCoupon);
      fetchCoupons();
      setIsAddDrawerVisible(false);
      notification.success({ message: 'Coupon added successfully' });
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Failed to add coupon' });
    }
  };

  const validateDates = (rule: any, value: any, callback: any) => {
    if (value && (value[0].isBefore(dayjs(), 'day') || value[1].isSameOrBefore(value[0], 'day'))) {
      callback('Start date must be today or in the future, and end date must be after the start date.');
    } else {
      callback();
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: 'Discount Value',
      dataIndex: 'discountValue',
      key: 'discountValue',
    },
    {
      title: 'Minimum Bill',
      dataIndex: 'minimumBill',
      key: 'minimumBill',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      dataIndex: 'eventStatus',
      key: 'eventStatus',
      render: (text: string) => (
        <span style={{ color: text === 'ACTIVE' ? 'green' : 'orange' }}>
          {text}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: ExistedCoupon) => (
        <div>
          <Button className='mr-1' icon={<EyeOutlined />} onClick={() => handleCardClick(record.id)} />
          <Button className='mr-1' icon={<EditOutlined />} onClick={() => {
            setSelectedCoupon(record);
            setIsDrawerVisible(true);
          }} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCoupon(record.id)} />
        </div>
      )
    }
  ];

  return (
    <div>  
      <Button className="flex flex-row text-center items-center space-x-1 text-lg h-10 rounded-lg mb-4"
        type="primary" icon={<TicketPlus />} onClick={() => setIsAddDrawerVisible(true)}>Add New Coupon</Button>
      {loading ? (
        <Skeleton active />
      ) : (
        <Table columns={columns} dataSource={coupons} rowKey="id" pagination={{ pageSize: 6 }} className="min-w-full rounded-lg shadow-sm border border-gray-400"
        bordered />
      )}
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>Close</Button>,
        ]}
      >
        {selectedCoupon && (
          <div className='flex flex-col space-y-4'>
            <div className='flex space-x-2 justify-center  mr-2 font-bold text-lg rounded-lg h-10 items-center'>
                <Ticket/>
                <p>Coupon Detail</p>
            </div>

            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Name: {selectedCoupon.name}</p>
            </div>
            
            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Start Date: {dayjs(selectedCoupon.startDate).format('DD-MM-YYYY')}</p>
            </div>
            
            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>End Date: {dayjs(selectedCoupon.endDate).format('DD-MM-YYYY')}</p>
            </div>

            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Discount Type: {selectedCoupon.discountValue}</p>
            </div>
            
            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Minimum Bill: {selectedCoupon.minimumBill}</p>
            </div>

            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Quantity: {selectedCoupon.quantity}</p>
            </div>
            
            <div className='flex p-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                <p>Status: {selectedCoupon.eventStatus}</p>
            </div>
          </div>
        )}
      </Modal>
      <Drawer
        title="Edit Coupon"
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        width={400}
      >
        {selectedCoupon && (
          <Form
            layout="vertical"
            initialValues={{
              ...selectedCoupon,
              dateRange: [dayjs(selectedCoupon.startDate), dayjs(selectedCoupon.endDate)]
            }}
            onFinish={handleEditCoupon}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the coupon name!' }]}>
              <Input className='border border-gray-500 rounded-lg hover:border-blue-500' />
            </Form.Item>
            <Form.Item name="dateRange" label="Date Range" rules={[{ required: true, validator: validateDates }]}>
              <RangePicker className='border border-gray-500 rounded-lg hover:border-blue-500' />
            </Form.Item>
            <Form.Item name="discountValue" label="Discount Value" rules={[{ required: true, message: 'Please input the discount value!' }]}>
              <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="number" min={1} />
            </Form.Item>
            <Form.Item name="minimumBill" label="Minimum Bill" rules={[{ required: true, message: 'Please input the minimum bill!' }]}>
              <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="number" min={1} />
            </Form.Item>
            <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
              <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="number" min={1} />
            </Form.Item>
            <Button type="primary" htmlType="submit">Update Coupon</Button>
          </Form>
        )}
      </Drawer>
      <Drawer
        title="Add new Coupon"
        visible={isAddDrawerVisible}
        onClose={() => setIsAddDrawerVisible(false)}
        width={400}
      >
        <Form layout="vertical" onFinish={handleAddCoupon}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the coupon name!' }]}>
            <Input className='border border-gray-500 rounded-lg hover:border-blue-500' />
          </Form.Item>
          <Form.Item name="dateRange" label="Date Range" rules={[{ required: true, validator: validateDates }]}>
            <RangePicker className='border border-gray-500 rounded-lg hover:border-blue-500 h-full' />
          </Form.Item>
          <Form.Item name="discountValue" label="Discount Value" rules={[{ required: true, message: 'Please input the discount value!' }]}>
            <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="number" min={1} />
          </Form.Item>
          <Form.Item name="minimumBill" label="Minimum Bill" rules={[{ required: true, message: 'Please input the minimum bill!' }]}>
            <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="number" min={1} />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
            <Input className='border border-gray-500 rounded-lg hover:border-blue-500' type="number" min={1} />
          </Form.Item>
          <Button type="primary" htmlType="submit">Add Coupon</Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default ManageCoupon;
