"use client";
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Table, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AddProduct } from '@/src/api/products/AddProduct';
import { GetAllBranch } from '@/src/api/category/branch/GetAllBranch';
import { GetAllCategory } from '@/src/api/category/categories/GetAllCategory';
import { GetAllColor } from '@/src/api/products/colors/GetAllColor';
import { GetAllSize } from '@/src/api/products/sizes/GetAllSize';
import { Branch, Category, Color, Size,ProductRequest, ProductItemRequest, CreateProductForm } from '@/src/types';

import toast, { Toaster } from 'react-hot-toast';
import { ImagePlus, PackageOpen } from 'lucide-react';

const { Option } = Select;

const AddProductPage: React.FC = () => {
  const [form] = Form.useForm();

  const [categories, setCategories] = useState<Category[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [productItems, setProductItems] = useState<ProductItemRequest[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetAllCategory().then(setCategories);
    GetAllBranch().then(setBranches);
    GetAllSize().then(setSizes);
    GetAllColor().then(setColors);
  }, []);

  const handleAddProductItem = (values: { size: number; color: number }) => {
    const { size, color } = values;
    if (productItems.some(item => item.size === size && item.color === color)) {
      message.error("You can't select the same Color or Size twice! Please select again!");
    } else {
      setProductItems([...productItems, { size, color }]);
    }
  };

  const handleRemoveProductItem = (size: number, color: number) => {
    setProductItems(productItems.filter(item => item.size !== size || item.color !== color));
  };

  const handleFileChange = ({ fileList }: { fileList: File[] }) => {
    if (fileList.length > 4) {
      message.error('You can only upload up to 4 files.');
      return;
    }
    setSelectedFiles(fileList.map(file => file as File));
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    const { product_Name, description, price, category, branch } = values;
    const productRequest: ProductRequest = {
      product_Name,
      description,
      price: parseFloat(price),
      category,
      branch,
      productItemRequests: productItems,
    };
    const createProductForm: CreateProductForm = {
      productRequest,
      images: selectedFiles as unknown as FileList,
    };
    try {
      await AddProduct(createProductForm);
      toast.success('Product created successfully!');
      form.resetFields();
      setProductItems([]);
      setSelectedFiles([]);
      setLoading(false);
    } catch (error) {
      toast.error('Error creating product!');
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: ProductItemRequest) => (
        <Button onClick={() => handleRemoveProductItem(record.size, record.color)}>Remove</Button>
      ),
    },
  ];

  return (
    <div className=" flex p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
      <Toaster />
      <div style={{ flex: 2 }}>
        <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/2 h-12"> 
            <PackageOpen  className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
            <h3 className="space-y-0 font-semibold">Add product information</h3>
        </div>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Product Name" name="product_Name" rules={[{ required: true, message: 'Please enter product name' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select category' }]}>
            <Select>
              {categories.map((category: any) => (
                <Option key={category.id} value={category.id}>{category.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Branch" name="branch" rules={[{ required: true, message: 'Please select branch' }]}>
            <Select>
              {branches.map((branch: any) => (
                <Option key={branch.id} value={branch.id}>{branch.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter description' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter price' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Form.Item label="Size" name="size" rules={[{ required: true, message: 'Please select size' }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '8px' }}>
              <Select>
                {sizes.map((size: any) => (
                  <Option key={size.id} value={size.id}>{size.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Color" name="color" rules={[{ required: true, message: 'Please select color' }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
              <Select>
                {colors.map((color: any) => (
                  <Option key={color.id} value={color.id}>{color.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Button type="dashed" onClick={() => form.validateFields(['size', 'color']).then(handleAddProductItem)}>Add</Button>
          </Form.Item>
          <Table dataSource={productItems} columns={columns} rowKey={record => `${record.size}-${record.color}`} pagination={false} />
          <Form.Item>
            <Button 
                className='mt-4'
                type="primary" 
                htmlType="submit"
                loading={loading}
                >Add Product</Button>
          </Form.Item>
        </Form>
      </div>
      <div className=' flex flex-col ml-2 w-1/3 border border-l-black justify-center items-center'>
        <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/2 h-12"> 
            <ImagePlus  className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
            <h3 className="space-y-0 font-semibold">Add Images</h3>
        </div>
        <Upload className='flex justify-center m-4'
          listType="picture-card"
          fileList={selectedFiles.map((file, index) => ({ uid: index.toString(), name: file.name, url: URL.createObjectURL(file) }))}
          beforeUpload={(file) => {
            handleFileChange({ fileList: [...selectedFiles, file] });
            return false;
          }}
          onRemove={(file) => {
            handleFileChange({ fileList: selectedFiles.filter((f) => f.name !== file.name) });
          }}
        >
          {selectedFiles.length < 4 && (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </div>
      
    </div>
  );
};

export default AddProductPage;
