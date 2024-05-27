"use client";

import React, { useState, useEffect } from 'react';
import { Form, Button, Select, notification, Spin } from 'antd';
import toast, { Toaster } from 'react-hot-toast';

import { GetAllProducts } from '@/src/api/products/GetAllProducts';
import { GetAllColor } from '@/src/api/products/colors/GetAllColor';
import { GetAllSize } from '@/src/api/products/sizes/GetAllSize';
import { AddExistedProduct } from '@/src/api/products/AddExistedProduct';
import { Product, Color, Size } from '@/src/types';
import { PackagePlus } from 'lucide-react';

const { Option } = Select;

const AddExistedProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    const handleSubmit = async (values: any) => {
        try {
            await AddExistedProduct(values.productId, values.sizeId, values.colorId);
            notification.success({ message: 'Product updated successfully' });
        } catch (error) {
            console.error(error);
            notification.error({ message: 'Failed to update product' });
        }
    };

    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
            <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12">
                <PackagePlus className="ml-5 flex text-lg font-bold text-center text-indigo-600"/> 
                <h3 className="space-y-0 font-semibold">Add Existed Product</h3>
            </div>
            {loading ? (
                <Spin />
            ) : (
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item name="productId" label="Select Product" rules={[{ required: true, message: 'Please select a product' }]}>
                        <Select placeholder="Select a product" showSearch>
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
                    <Form.Item name="sizeId" label="Select Size" rules={[{ required: true, message: 'Please select a size' }]}>
                        <Select placeholder="Select a size">
                            {sizes.map((size) => (
                                <Option key={size.id} value={size.id}>
                                    {size.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="colorId" label="Select Color" rules={[{ required: true, message: 'Please select a color' }]}>
                        <Select placeholder="Select a color">
                            {colors.map((color) => (
                                <Option key={color.id} value={color.id}>
                                    {color.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Add Existed Product</Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default AddExistedProductPage;
