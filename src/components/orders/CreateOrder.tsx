"use client";

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Table, message, InputNumber } from 'antd';
import { useRouter } from 'next/navigation';

import { GetAllCustomers } from '@/src/api/customers/GetAllCustomers';
import { GetAllProducts } from '@/src/api/products/GetAllProducts';
import { GetDetailProduct } from '@/src/api/products/GetDetailProduct';
import { CreateOrder } from '@/src/api/orders/CreateOrder';
import { GetVNPayUrl } from '@/src/api/orders/VNPay';
import { GetAllCoupons } from '@/src/api/events/coupons/GetAllCoupons';
import { UserProps, Product, ProductItem, CreateOrderRequest, OrderItemRequest, ExistedCoupon } from '@/src/types';
import { BadgeCheckIcon } from 'lucide-react';

const { Option } = Select;

const CreateOrderComponent: React.FC = () => {
    const [form] = Form.useForm();
    const [customers, setCustomers] = useState<UserProps[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [productItems, setProductItems] = useState<ProductItem[]>([]);
    const [orderItems, setOrderItems] = useState<any[]>([]);
    const [coupons, setCoupons] = useState<ExistedCoupon[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
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

        const fetchCoupons = async () => {
            try {
                const data = await GetAllCoupons();
                setCoupons(data);
            } catch (error) {
                message.error('Failed to fetch coupons');
            }
        };

        fetchCustomers();
        fetchProducts();
        fetchCoupons();
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
            colorName: selectedProductItem?.colorName,
            price: selectedProductItem?.price 
        };

        setOrderItems([...orderItems, newItem]);
        form.resetFields(['productItemId', 'quantity']);
    };

    const handleRemoveOrderItem = (productItemId: string) => {
        setOrderItems(orderItems.filter(item => item.productItemId !== productItemId));
    };

    const calculateTotalAmount = () => {
        return orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    };

    const getFilteredCoupons = () => {
        const totalAmount = calculateTotalAmount();
        const today = new Date();
        return coupons.filter(coupon => 
            coupon.eventStatus === 'ACTIVE' &&
            new Date(coupon.endDate) > today &&
            coupon.quantity > 0 &&
            coupon.minimumBill <= totalAmount
        );
    };

    const getSelectedCoupon = () => {
        return coupons.find(coupon => coupon.id === selectedCoupon);
    };

    const handleFinish = async (values: any) => {
        const orderItemsRequest: OrderItemRequest[] = orderItems.map(item => ({
            productItemId: item.productItemId,
            quantity: item.quantity,
        }));

        const totalAmount = calculateTotalAmount();
        const selectedCouponData = getSelectedCoupon();
        const discount = selectedCouponData ? (selectedCouponData.discountValue / 100) * totalAmount : 0;
        const finalTotal = totalAmount - discount;

        const order: CreateOrderRequest = {
            customerId: values.customerId,
            paymentMethod: values.paymentMethod,
            orderItemRequestList: orderItemsRequest,
            total: finalTotal
        };

        setLoading(true);
        try {
            const orderResponse = await CreateOrder(order);
            const orderId = orderResponse;

            if (values.paymentMethod === 1) {
                const vnpayUrl = await GetVNPayUrl(finalTotal, 'Thanh toán hóa đơn mua hàng', orderId);
                window.open(vnpayUrl, '_blank');
            }

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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
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

    const totalAmount = calculateTotalAmount();
    const selectedCouponData = getSelectedCoupon();
    const discount = selectedCouponData ? (selectedCouponData.discountValue / 100) * totalAmount : 0;
    const finalTotal = totalAmount - discount;

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item className='font-semibold' name="customerId" label="Customer" rules={[{ required: true, message: 'Please select a customer!' }]}>
                <Select className='border border-gray-500 rounded-lg hover:border-blue-500 mb-3' variant='borderless' placeholder="Select a customer">
                    {customers.map(customer => (
                        <Option key={customer.id} value={customer.id}>
                            {customer.fullName} - {customer.phone}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item className='font-semibold' label="Add Order Item" rules={[{ required: true }]}>
                <Form.Item name="productId" noStyle rules={[{ required: true, message: 'Please select a product item!' }]}>
                    <Select className='border border-gray-500 rounded-lg hover:border-blue-500 mr-4 mb-3' variant='borderless' placeholder="Select a product" style={{ width: '60%' }} onChange={handleProductChange}>
                        {products.map(product => (
                            <Option key={product.id} value={product.id}>
                                {product.product_Name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="productItemId" noStyle >
                    <Select className='border border-gray-500 rounded-lg hover:border-blue-500 mr-6 mb-3' variant='borderless' placeholder="Select a product item" style={{ width: '60%' }}>
                        {productItems.map(item => (
                            <Option key={item.id} value={item.id}>
                                {item.sizeName} - {item.colorName} ({item.quantity} available)
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="quantity" noStyle>
                    <Input className='mr-4 border border-gray-500 rounded-md' placeholder="Quantity" type="number" min={1} style={{ width: '20%' }} />
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
            <Table className=' mt-2 border border-gray-400 rounded-lg' dataSource={orderItems} bordered columns={columns} rowKey="productItemId" />

            <Form.Item className='mt-4 font-semibold' name="discountCoupon" label="Discount Coupon">
                <Select className='border border-gray-500 rounded-lg hover:border-blue-500' variant='borderless' placeholder="Select a discount coupon" onChange={value => setSelectedCoupon(value)}>
                    {getFilteredCoupons().map(coupon => (
                        <Option key={coupon.id} value={coupon.id}>
                            {coupon.name} ({coupon.discountValue}% off)
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item className='mt-4 font-semibold' name="paymentMethod" label="Payment Method" rules={[{ required: true, message: 'Please select a payment method!' }]}>
                <Select className='border border-gray-500 rounded-lg hover:border-blue-500' variant='borderless' placeholder="Select a payment method">
                    <Option value={0}>Pay by cash</Option>
                    <Option value={1}>VNPay</Option>
                </Select>
            </Form.Item>
            
            <div className='flex justify-end'>
                <div className='text-right'>
                    <div className='font-semibold'>Total Amount (no discount): ${totalAmount.toFixed(2)}VNĐ</div>
                    <div className='text-red-600 font-semibold'>Discount: -{discount.toFixed(2)}VNĐ</div>
                    <div className='text-green-600 text-lg font-semibold mt-2'>Total Bill: ${finalTotal.toFixed(2)}VNĐ</div>
                </div>
            </div>

            <Form.Item className='mt-1 flex justify-center items-center w-full'>
                <Button className=' w-full flex justify-center items-center text-center h-10 font-semibold' type="primary" htmlType="submit" icon={<BadgeCheckIcon className='mr-1'/>} loading={loading}>Create Order</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateOrderComponent;
