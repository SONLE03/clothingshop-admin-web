"use client";

import React, { useEffect, useState } from 'react';
import { Table, Button, Drawer, Image, Space, Skeleton, Avatar } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

import { GetAllProducts } from '@/src/api/products/GetAllProducts';
import { DeleteProduct } from '@/src/api/products/DeleteProduct';
import { GetDetailProduct } from '@/src/api/products/GetDetailProduct';
import { Product, ProductItem } from '@/src/types';
import { BookmarkPlus, Search } from 'lucide-react';

const ManageProduct: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productItems, setProductItems] = useState<ProductItem[]>([]);
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const showDrawer = async (product: Product) => {
        setVisible(true);
        setSelectedProduct(product);

        // Fetch additional product details
        try {
            const detailResponse = await GetDetailProduct(product.id);
            setProductItems(detailResponse);
        } catch (error) {
            console.error('Failed to fetch product details:', error);
        }
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
                    </Button>
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

    const productItemColumns = [
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
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="p-4">
            <div className="flex flex-row w-full space-x-4 justify-end mb-6">
                <div className="flex w-full justify-start h-10 border border-gray-500 rounded-lg p-2 focus:outline-none hover:border-blue-500 focus:border-transparent shadow-lg">
                    <Search className='text-gray-500 mr-3' />
                    <input
                        className='w-full border-none focus:outline-none'
                        placeholder={"Search by product name"}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button
                    className="flex flex-row text-center items-center space-x-1 text-sm h-10 rounded-lg mb-4 shadow-xl"
                    type="primary"
                    onClick={() => router.push('/pages/manage-products/products/add-new-product')}
                    icon={<BookmarkPlus width={18} height={18} />}
                >
                    Add New Product
                </Button>
                <Button
                    disabled
                    className="flex flex-row text-center items-center space-x-1 text-sm h-10 rounded-lg mb-4 shadow-xl"
                    type="primary"
                    onClick={() => router.push('/pages/manage-products/products/add-existed-product')}
                    icon={<BookmarkPlus width={18} height={18} />}
                >
                    Add Existed Product
                </Button>
            </div>

            {loading ? (
                <Skeleton active />
            ) : (
                <Table
                    className='border border-gray-500 rounded-lg shadow-xl'
                    dataSource={products.filter(product => product.product_Name.includes(searchTerm))}
                    columns={columns}
                    bordered
                    pagination={{ pageSize: 6 }}
                />
            )}

            <Drawer
                title={selectedProduct?.product_Name}
                placement="right"
                onClose={onClose}
                visible={visible}
                width={500}
            >
                {selectedProduct && (
                    <>
                        <div className="flex justify-center items-center w-full"><Avatar src={selectedProduct.image} size={100} /></div>
                        
                        <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Product Name</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.product_Name}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Description</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.description}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Price</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.price}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Category</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.category}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Branch</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.branch}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-xs font-semibold mb-2">Status</label>
                            <div className="p-2 border border-gray-700 rounded-lg">
                                <p className="text-sm">{selectedProduct.productStatus}</p>
                            </div>
                        </div>

                        <Table
                            className="mt-4 border border-gray-400 rounded-md shadow-xl"
                            columns={productItemColumns}
                            dataSource={productItems}
                            pagination={false}
                            bordered
                        />
                    </>
                )}
            </Drawer>
        </div>
    );
};

export default ManageProduct;
