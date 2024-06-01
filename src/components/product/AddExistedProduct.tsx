// components/AddExistedProducts.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Form, Button, Select, notification, Spin, Table, Space } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import { GetAllProducts } from '@/src/api/products/GetAllProducts';
import { GetAllColor } from '@/src/api/products/colors/GetAllColor';
import { GetAllSize } from '@/src/api/products/sizes/GetAllSize';
import { AddExistedProduct } from '@/src/api/products/AddExistedProduct';
import { Product, Color, Size } from '@/src/types';
import { Plus } from 'lucide-react';

const { Option } = Select;

const AddExistedProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedItems, setSelectedItems] = useState<{ productId: string, sizeId: string, colorId: string, productName: string, sizeName: string, colorName: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, colorsData, sizesData] = await Promise.all([
                    GetAllProducts(),
                    GetAllColor(),
                    GetAllSize()
                ]);
                setProducts(productsData.data);
                setColors(colorsData);
                setSizes(sizesData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                notification.error({ message: 'Failed to load data' });
            }
        };
        fetchData();
    }, []);

    const handleAdd = (values: any) => {
        const selectedProduct = products.find(product => product.id === values.productId);
        const selectedSize = sizes.find(size => size.id === values.sizeId);
        const selectedColor = colors.find(color => color.id === values.colorId);

        if (selectedProduct && selectedSize && selectedColor) {
            const newItem = {
                productId: values.productId,
                sizeId: values.sizeId,
                colorId: values.colorId,
                productName: selectedProduct.product_Name,
                sizeName: selectedSize.name,
                colorName: selectedColor.name
            };
            setSelectedItems([...selectedItems, newItem]);
        }
    };

    const handleRemove = (index: number) => {
        const newItems = [...selectedItems];
        newItems.splice(index, 1);
        setSelectedItems(newItems);
    };

    const handleSubmit = async () => {
        try {
            const groupedItems = selectedItems.reduce((acc, item) => {
                if (!acc[item.productId]) {
                    acc[item.productId] = [];
                }
                acc[item.productId].push({ size: item.sizeId, color: item.colorId });
                return acc;
            }, {} as Record<string, { size: string, color: string }[]>);

            await Promise.all(Object.keys(groupedItems).map(productId => 
                AddExistedProduct(productId, groupedItems[productId])
            ));

            notification.success({ message: 'Products updated successfully' });
            setSelectedItems([]);
        } catch (error) {
            console.error(error);
            notification.error({ message: 'Failed to update products' });
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
            title: 'Action',
            key: 'action',
            render: (_: any, __: any, index: number) => (
                <Button onClick={() => handleRemove(index)}>Remove</Button>
            ),
        },
    ];

    return (
        <div>
            {loading ? (
                <Spin />
            ) : (
                <Form layout="vertical" onFinish={handleAdd}>
                    <Form.Item className=' font-semibold' name="productId" label="Select Product" rules={[{ required: true, message: 'Please select a product' }]}>
                        <Select className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' variant='borderless' placeholder="Select a product" showSearch>
                            {products.map((product) => (
                                <Option key={product.id} value={product.id}>
                                    <div className="flex items-center">
                                        <img src={product.image} alt={product.product_Name} className="w-6 h-6 rounded-full mr-2" />
                                        {product.product_Name}
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item className=' font-semibold' name="sizeId" label="Select Size" rules={[{ required: true, message: 'Please select a size' }]}>
                        <Select className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' variant='borderless' placeholder="Select a size">
                            {sizes.map((size) => (
                                <Option key={size.id} value={size.id}>
                                    {size.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item className=' font-semibold' name="colorId" label="Select Color" rules={[{ required: true, message: 'Please select a color' }]}>
                        <Select className='border border-gray-500 rounded-lg hover:border-blue-500 h-10' variant='borderless' placeholder="Select a color">
                            {colors.map((color) => (
                                <Option key={color.id} value={color.id}>
                                    {color.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item className='mt-8 flex justify-center items-center w-full'>
                        <Button className='flex justify-center items-center space-x-0 h-10 font-semibold' icon={<Plus height={18} width={18} />} type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>
            )}
            <Table columns={columns} dataSource={selectedItems} rowKey={(_, index) => index.toString()} pagination={false} />
            <div className='mt-8 flex justify-center items-center w-full'>
                <Button type="primary" onClick={handleSubmit}>Save</Button>
            </div>
        </div>
    );
};

export default AddExistedProducts;
