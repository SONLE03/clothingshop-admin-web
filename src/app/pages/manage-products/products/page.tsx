"use client";
import { useEffect, useState } from 'react';
import { Form, Input, Select, Button, message, Upload, Image } from 'antd';
import { AddProducts } from '@/src/api/products/AddProduct';
import { GetAllBranch } from '@/src/api/category/branch/GetAllBranch';
import { GetAllCategory } from '@/src/api/category/categories/GetAllCategory';
import { GetAllColor } from '@/src/api/products/colors/GetAllColor';
import { GetAllSize } from '@/src/api/products/sizes/GetAllSize';
import { Branch, Category, Color, Size } from '@/src/types';


const { Option } = Select;

const AddProductPage = () => {
    const [form] = Form.useForm();
    const [photos, setPhotos] = useState([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);

    const onFinish = async (values: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (key === 'categoryId') {
                formData.set('category', value);
            } else if (key === 'specification') {
                formData.set(key, JSON.stringify(value));
            } else if (key === 'photo') {
                value.forEach((photo) => formData.append('photo', photo));
            } else {
                formData.set(key, value);
            }
        });

        try {
            await AddProducts(formData);
            message.success('Product added successfully');
        } catch (error) {
            message.error('Failed to add product');
        }
    };

    const onChangePhoto = (info) => {
        let fileList = [...info.fileList];

        if (fileList.length > 3) {
            fileList = fileList.slice(-3);
        }

        fileList = fileList.map((file) => {
            if (file.response) {
                const newFile = file.response.file;
                newFile.uid = file.uid;
                return newFile;
            }
            return file;
        });

        setPhotos(fileList);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const branchData = await GetAllBranch();
        const categoryData = await GetAllCategory();
        const colorData = await GetAllColor();
        const sizeData = await GetAllSize();
        setBranches(branchData);
        setCategories(categoryData);
        setColors(colorData);
        setSizes(sizeData);
    };

    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>

                <Form.Item name="categoryId" label="Category">
                    <Select>
                        {categories.map((category) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item name="price" label="Price">
                    <Input type="number" />
                </Form.Item>

                <Form.Item name="unit" label="Unit">
                    <Input />
                </Form.Item>

                <Form.Item name="warantyPeriod" label="Warranty Period">
                    <Input type="number" />
                </Form.Item>

                <Form.Item name="photo" label="Photos">
                    <Upload
                        action="/upload"
                        listType="picture-card"
                        fileList={photos}
                        onChange={onChangePhoto}
                    >
                        + Add Photo
                    </Upload>
                </Form.Item>

                <Form.Item name="specification" label="Specification">
                    {/* Populate with GetAllSize and GetAllColor */}
                    <Select className='mb-4' mode="tags" placeholder="Select or type size/color">
                        {sizes.map((size) => (
                            <Option key={size.id} value={size.id}>
                                {size.name}
                            </Option>
                        ))}
                    </Select>
                    <Select mode="tags" placeholder="Select or type size/color">
                        {colors.map((color) => (
                            <Option key={color.id} value={color.id}>
                                {color.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddProductPage;