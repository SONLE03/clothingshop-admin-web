"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import envConfig from '@/src/config';
import { Table, Button, Drawer, Image, Space, Skeleton } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

import { GetAllProducts } from '@/src/api/products/GetAllProducts';
import { DeleteProduct } from '@/src/api/products/DeleteProduct';
import { Product } from '@/src/types';
import { PackageOpen } from 'lucide-react';



const ManageProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showDrawer = (product: Product) => {
    setVisible(true);
    setSelectedProduct(product);
  };

  const onClose = () => {
    setVisible(false);
  };

  const deleteProduct = async (id: string) => {
    try {
      await DeleteProduct(id);
      fetchData();
      toast.success('Product deleted successfully');
      
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-product/${id}`);
};

const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (image: string) => <Image src={image} alt="product image" width={50} />,
  },
  {
    title: 'Name',
    dataIndex: 'product_Name',
    key: 'product_Name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Branch',
    dataIndex: 'branch',
    key: 'branch',
  },
  {
    title: 'Status',
    dataIndex: 'productStatus',
    key: 'productStatus',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: Product) => (
      <Space size="middle">
        <Button className='flex justify-center items-center' onClick={() => showDrawer(record)}>
          <EyeOutlined />
        </Button >
        <Button className='flex justify-center items-center' onClick={() => handleEdit(record.id)}>
          <EditOutlined />
        </Button>
        <Button className='flex justify-center items-center' onClick={() => deleteProduct(record.id)}>
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];

const fetchData = async () => {
    const response = await GetAllProducts();
    setProducts(response.data);
    setLoading(false);
};

useEffect(() => {
  setLoading(true);
  try {
    
    fetchData();
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
  finally {
    setLoading(false);
  }
}, []);

return (
  <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
    <Toaster />
    <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
        <PackageOpen className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
        <h3 className="space-y-0 font-semibold">Manage products</h3>
    </div>
    <div className="flex flex-row w-full space-x-8">
        <Button className="flex flex-row text-center items-center space-x-1 text-sm h-10 rounded-lg mb-4" type="primary" onClick={() => router.push('/pages/manage-products/products/add-new-product')}>
            Add New Product
        </Button>
        <Button className="flex flex-row text-center items-center space-x-1 text-sm h-10 rounded-lg mb-4" type="primary" onClick={() => router.push('/pages/manage-products/products/add-existed-product')}>
        Add Existed Product
        </Button>
    </div>
    {loading ? (
        <Skeleton active />
    ) : (
        <Table dataSource={products} columns={columns} />  
    )}

    <Drawer
      title={selectedProduct?.product_Name}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={500}
    >
      {/* Render details of the selected product here */}
    </Drawer>

  </div>
);
};

export default ManageProductPage;