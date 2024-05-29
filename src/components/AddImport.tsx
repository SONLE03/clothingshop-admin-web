"use client";
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, InputNumber, Table } from 'antd';
import { GetAllProducts } from '../api/products/GetAllProducts';
import { GetDetailProduct } from '../api/products/GetDetailProduct';
import { AddNewImport } from '../api/import/AddImport';
import { Product, ProductItem, AddImportItem } from '@/src/types';
import { useRouter } from 'next/navigation';

const { Option } = Select;

const AddImport: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productItems, setProductItems] = useState<ProductItem[]>([]);
    const [selectedProductItem, setSelectedProductItem] = useState<ProductItem | null>(null);
    const [importItems, setImportItems] = useState<AddImportItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();

    //console.log(localStorage.getItem('access_token'));

    console.log(importItems);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await GetAllProducts();
                setProducts(response.data);
            } catch (error) {
                message.error('Failed to fetch products');
            }
        };

        fetchProducts();
    }, []);

    const handleProductChange = async (productId: string) => {
        try {
            const productItems = await GetDetailProduct(productId);
            setProductItems(productItems);
            setSelectedProductItem(null);
            form.resetFields(['productItem', 'quantity', 'price']);
        } catch (error) {
            message.error('Failed to fetch product details');
        }
    };

    const handleAddItem = (values: any) => {
        if (selectedProductItem) {
            const newItem: AddImportItem = {
                productItemId: selectedProductItem.id,
                quantity: values.quantity,
                price: values.price,
                total: values.quantity * values.price
            };
            setImportItems([...importItems, newItem]);
            form.resetFields(['productItem', 'quantity', 'price']);
            setSelectedProductItem(null);
        } else {
            message.error('Please select a product item');
        }
    };

    const handleRemoveItem = (index: number) => {
        const newItems = importItems.filter((_, i) => i !== index);
        setImportItems(newItems);
    };

    const handleFinish = async () => {
        setLoading(true);
        try {
            await AddNewImport(importItems);
            message.success('Import added successfully');
            setTimeout(() => {
                router.push('/pages/imports/list-imports');
            }, 150000);
        } catch (error) {
            message.error('Failed to add import');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Product Item ID',
            dataIndex: 'productItemId',
            key: 'productItemId'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, __: any, index: number) => (
                <Button type="link" onClick={() => handleRemoveItem(index)}>Remove</Button>
            )
        }
    ];

    return (
        <div>
            <Form form={form} layout="vertical" onFinish={handleAddItem}>
                <Form.Item
                    name="product"
                    label="Product"
                    rules={[{ required: true, message: 'Please select a product' }]}
                >
                    <Select onChange={handleProductChange} placeholder="Select a product">
                        {products.map(product => (
                            <Option key={product.id} value={product.id}>
                                {product.product_Name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="productItem"
                    label="Product Item"
                    rules={[{ required: true, message: 'Please select a product item' }]}
                >
                    <Select onChange={(value) => setSelectedProductItem(productItems.find(item => item.id === value) || null)} placeholder="Select a product item">
                        {productItems.map(item => (
                            <Option key={item.id} value={item.id}>
                                {`${item.sizeName} - ${item.colorName}`}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[{ required: true, message: 'Please enter the quantity' }]}
                >
                    <InputNumber type='number' min={1} />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: 'Please enter the price' }]}
                >
                    <InputNumber type='number' min={1} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Item
                    </Button>
                </Form.Item>
            </Form>
            <Table dataSource={importItems} columns={columns} rowKey="productItemId" />
            <Button type="primary" onClick={handleFinish} loading={loading} disabled={!importItems.length}>
                Add Import
            </Button>
        </div>
    );
};

export default AddImport;
