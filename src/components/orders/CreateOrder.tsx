"use client";

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Table, message } from 'antd';
import { useRouter } from 'next/navigation';

import { GetAllCustomers } from '@/src/api/customers/GetAllCustomers';
import { GetAllProducts } from '@/src/api/products/GetAllProducts';
import { GetDetailProduct } from '@/src/api/products/GetDetailProduct';
import { CreateOrder } from '@/src/api/orders/CreateOrder';
import { UserProps, Product, ProductItem, CreateOrderRequest, OrderItemRequest } from '@/src/types';

const { Option } = Select;

const CreateOrderComponent: React.FC = () => {
    const [form] = Form.useForm();
    const [customers, setCustomers] = useState<UserProps[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [productItems, setProductItems] = useState<ProductItem[]>([]);
    const [orderItems, setOrderItems] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await GetAllCustomers();
                setCustomers(data);
            } catch (error) {
                message.error('Failed to fetch customers');
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await GetAllProducts();
                setProducts(response.data);
            } catch (error) {
                message.error('Failed to fetch products');
            }
        };

        fetchCustomers();
        fetchProducts();
    }, []);

    const handleProductChange = async (productId: string) => {
        try {
            setSelectedProduct(productId);
            const data = await GetDetailProduct(productId);
            setProductItems(data);
        } catch (error) {
            message.error('Failed to fetch product items');
        }
    };

    const handleAddOrderItem = (values: any) => {
        const selectedProduct = products.find(product => product.id === values.productId);
        const selectedProductItem = productItems.find(item => item.id === values.productItemId);

        if (selectedProductItem && selectedProductItem.quantity === 0) {
            message.error('The selected product item is out of stock, please choose another');
            return;
        }

        const newItem = {
            ...values,
            productName: selectedProduct?.product_Name,
            sizeName: selectedProductItem?.sizeName,
            colorName: selectedProductItem?.colorName
        };

        setOrderItems([...orderItems, newItem]);
    };

    const handleRemoveOrderItem = (productItemId: string) => {
        setOrderItems(orderItems.filter(item => item.productItemId !== productItemId));
    };

    const handleFinish = async (values: any) => {
        
        const orderItemsRequest: OrderItemRequest[] = orderItems.map(item => ({
            productItemId: item.productItemId,
            quantity: item.quantity,
        }));

        const order: CreateOrderRequest = {
            customerId: values.customerId,
            paymentMethod: values.paymentMethod,
            orderItemRequestList: orderItemsRequest
        };

        setLoading(true);
        try {
            await CreateOrder(order);
            message.success('Order created successfully');
            form.resetFields();
            setOrderItems([]);
            setLoading(false);
            setTimeout(() => {
                router.push('/pages/orders/list-orders');
            }, 1500);
            
        } catch (error) {
            message.error('Failed to create order');
        }
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Size',
            dataIndex: 'sizeName',
            key: 'sizeName',
        },
        {
            title: 'Color',
            dataIndex: 'colorName',
            key: 'colorName',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Button danger onClick={() => handleRemoveOrderItem(record.productItemId)}>
                    Remove
                </Button>
            ),
        },
    ];

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item className='font-semibold' name="customerId" label="Customer" rules={[{ required: true, message: 'Please select a customer!' }]}>
                <Select className='mb-3' placeholder="Select a customer">
                    {customers.map(customer => (
                        <Option key={customer.id} value={customer.id}>
                            {customer.fullName} - {customer.phone}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item className='font-semibold' label="Add Order Item" rules={[{ required: true }]}>
                <Form.Item name="productId" noStyle rules={[{ required: true, message: 'Please select a product item!' }]}>
                    <Select className='mb-3 mr-2' placeholder="Select a product" style={{ width: '60%' }} onChange={handleProductChange}>
                        {products.map(product => (
                            <Option key={product.id} value={product.id}>
                                {product.product_Name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="productItemId" noStyle >
                    <Select className='mb-3 mr-4' placeholder="Select a product item" style={{ width: '60%' }}>
                        {productItems.map(item => (
                            <Option key={item.id} value={item.id}>
                                {item.sizeName} - {item.colorName} ({item.quantity} available)
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="quantity" noStyle>
                    <Input className='mr-4' placeholder="Quantity" type="number" min={1} style={{ width: '20%' }} />
                </Form.Item>
                <Button type="primary" onClick={() => {
                    form.validateFields(['productId', 'productItemId', 'quantity']).then(values => {
                        handleAddOrderItem(values);
                        form.resetFields(['productItemId', 'quantity']);
                    });
                }}>
                    Add Item
                </Button>
            </Form.Item>
            <Table className=' mt-2 border border-gray-300 rounded-lg' dataSource={orderItems} columns={columns} rowKey="productItemId" />
            <Form.Item className='mt-4 font-semibold' name="paymentMethod" label="Payment Method" rules={[{ required: true, message: 'Please select a payment method!' }]}>
                <Select placeholder="Select a payment method">
                    <Option value={0}>Pay by cash</Option>
                    <Option value={1}>VNPay</Option>
                </Select>
            </Form.Item>
            <Form.Item className='mt-1 flex justify-center items-center w-full'>
                <Button className=' w-full' type="primary" htmlType="submit" loading={loading}>Create Order</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateOrderComponent;
