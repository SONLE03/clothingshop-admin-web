"use client";

import React, { useState, useEffect } from 'react';
import { Form, Button, Select, notification, Spin } from 'antd';
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
        <div>
            
            {loading ? (
                <Spin />
            ) : (
                <Form layout="vertical" onFinish={handleSubmit}>
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
                    <Form.Item className='mt-8 flex justify-center items-center w-full' >
                        <Button className='flex justify-center items-center space-x-0 h-10 font-semibold' icon={<Plus height={18} width={18}/>} type="primary" htmlType="submit">Add Existed Product</Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default AddExistedProducts;
