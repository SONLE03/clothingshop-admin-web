
"use client";

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

import { GetAllOrders } from '@/src/api/orders/GetAllOrders';
import { GetOrderDetails } from '@/src/api/orders/GetOrderDetails';
import { Orders, OrderDetail } from '@/src/types';



const { Search } = Input;

const ManageOrders: React.FC = () => {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Orders[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await GetAllOrders();
                setOrders(data ?? []);
                setFilteredOrders(data ?? []);
            } catch (error) {
                message.error('Failed to fetch orders');
            }
        };
        fetchOrders();
    }, []);

    const handleViewOrder = async (order: Orders) => {
        setSelectedOrder(order);
        try {
            const response = await GetOrderDetails(order.orderId);
            if (response) {
                setOrderDetails(response.data);
                setIsModalVisible(true);
            }
        } catch (error) {
            message.error('Failed to fetch order details');
        }
    };

    const handleSearch = (value: string) => {
        const filtered = orders.filter(order =>
            order.customerPhone.includes(value)
        );
        setFilteredOrders(filtered);
    };

    const columns: ColumnsType<Orders> = [
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (text) => new Date(text).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })
        },
        {
            title: 'Customer',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Customer Phone',
            dataIndex: 'customerPhone',
            key: 'customerPhone',
        },
        {
            title: 'Total Bill',
            dataIndex: 'total',
            key: 'total',
            render: (text) => `${text.toFixed(2)} VNĐ`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={status === 'COMPLETED' ? 'text-green-500' : 'text-red-500'}>
                    {status}
                </span>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => handleViewOrder(record)}
                >
                    View
                </Button>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Search className='border border-gray-500 rounded-lg hover:border-blue-500 mr-4' variant='borderless'
                    placeholder="Search by customer phone"
                    enterButton={<SearchOutlined className='flex justify-center items-center' />}
                    onSearch={handleSearch}
                    type="number"
                />
                <Button type="primary" onClick={() => router.push('/pages/orders/create-order')}>
                    Create New Order
                </Button>
            </div>
            <Table dataSource={filteredOrders} columns={columns} rowKey="orderId" pagination={{ pageSize: 6 }} />
            <Modal className=' text-center'
                title="Order Details"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
            >
                {selectedOrder && (
                    <div>
                        <div className='flex p-2 mb-2 mt-4 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                            <p>Customer: {selectedOrder.customerName}</p>
                        </div>
                        <div className='flex p-2 mb-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                            <p>Customer Phone: {selectedOrder.customerPhone}</p>
                        </div>
                        <div className='flex p-2 mb-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                            <p>Order Date: {new Date(selectedOrder.orderDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                        </div>
                        <div className='flex p-2 mb-2 font-semibold border border-gray-600 rounded-lg h-10 items-center'>
                            <p>Total Bill: {selectedOrder.total.toFixed(2)} VNĐ</p>
                        </div>
                        <Table className="min-w-full rounded-lg shadow-sm border border-gray-400"
                            bordered
                            pagination={{ pageSize: 4 }}
                            dataSource={orderDetails}
                            columns={[
                                {
                                    title: 'Product Item',
                                    dataIndex: 'productItem',
                                    key: 'productItem',
                                    render: (text) => `${text.slice(0, 6)}...`
                                },
                                {
                                    title: 'Product Name',
                                    dataIndex: 'productName',
                                    key: 'productName',
                                },
                                {
                                    title: 'Ordered Quantity',
                                    dataIndex: 'quantity',
                                    key: 'quantity',
                                },
                                {
                                    title: 'Item Price',
                                    dataIndex: 'price',
                                    key: 'price',
                                    render: (text) => `${text.toFixed(2)} VNĐ`
                                },
                                {
                                    title: 'Total Price',
                                    dataIndex: 'total',
                                    key: 'total',
                                    render: (text) => `${text.toFixed(2)} VNĐ`
                                },
                            ]}
                            rowKey="productItem"
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ManageOrders;
