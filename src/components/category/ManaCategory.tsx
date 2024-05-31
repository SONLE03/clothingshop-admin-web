"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Select, Input, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import axios from 'axios';
import { CreateCategory } from '@/src/api/category/categories/AddNewCategory';
import { EditCategory } from '@/src/api/category/categories/EditCategory';
import { GetAllCategory } from '@/src/api/category/categories/GetAllCategory';
import { GetAllGender } from '@/src/api/category/gender/GetAllGender';
import { Category, Gender } from '@/src/types';
import toast, { Toaster } from 'react-hot-toast';
import { BookmarkPlus, Eye, Slack, Trash } from 'lucide-react';

const { Option } = Select;

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [loading, setLoading] = useState(true);
  //const [pagination, setPagination] = useState({ pageSize: 10, current: 1 });
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('edit');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await GetAllCategory();
      const genderData = await GetAllGender();
      setGenders(genderData);
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    try {
      await axios.delete(`/api/categories/${categoryId}`);
      fetchData();
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error('Failed to delete category');
    }
  };

  const handleAddCategory = async (values: Category) => {
    try {
      await CreateCategory(values);
      fetchData();
      setVisible(false);
      toast.success('Category created successfully');
    } catch (error) {
      console.error('Failed to create category:', error);
      toast.error('Failed to create category');
    }
  };

  const handleUpdateCategory = async (values: Category) => {
    try {
      await EditCategory(values);
      fetchData();
      setVisible(false);
      toast.success('Category updated successfully');
    } catch (error) {
      console.error('Failed to update category:', error);
      toast.error('Failed to update category');
    }
  };

  const showModal = (type: 'add' | 'edit', category: Category | null = null) => {
    setModalType(type);
    setSelectedCategory(category);
    form.resetFields();
    if (type === 'edit' && category) {
      form.setFieldsValue(category);
    }
    setVisible(true);
  };

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Product Gender',
      dataIndex: 'productGender',
      key: 'productGender',
      render: (productGender: Gender) => productGender.name,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: Category) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => showModal('edit', record)}>
                <div className=' flex flex-row justify-start items-center space-y-0 space-x-3'>
                  <Eye className="mr-2 font-semibold" width={20} height={20} /> 
                  <p>View</p>
                </div>
              </Menu.Item>
              <Menu.Item className='mt-2' onClick={() => handleDelete(record.id)}>
                <div className=' flex flex-row justify-start items-center space-y-0 space-x-3'>
                  <Trash className="mr-2 font-semibold" width={20} height={20} /> 
                  <p>Delete</p>
                </div>
              </Menu.Item>
            </Menu>
          }
        >
          <Button>
            Choose Action <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Toaster />
      
      <Button className="flex flex-row text-center items-center space-x-1 text-lg h-10 rounded-lg mb-5"
        type="primary" 
        onClick={() => showModal('add')}
        icon={<BookmarkPlus />}
        >
        Add New Category
      </Button>
      <Table 
        dataSource={categories}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 6 }}
        //onChange={(p) => setPagination(p)}
        className="min-w-full rounded-lg shadow-sm border border-gray-400"
        bordered
      />
      <Modal
        visible={visible}
        title={modalType === 'add' ? 'Add New Category' : 'Edit Category'}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={modalType === 'add' ? handleAddCategory : handleUpdateCategory}
          layout="vertical"
          initialValues={selectedCategory ? selectedCategory : {}}
        >
          {modalType === 'edit' && (
            <Form.Item name="id" label="ID">
              <Input disabled />
            </Form.Item>
          )}
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: 'Please input the category name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="productGender"
            label="Product Gender"
            rules={[{ required: true, message: 'Please select a product gender!' }]}
          >
            <Select>
              {genders.map((gender) => (
                <Option key={gender.id} value={gender.id}>
                  {gender.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManager;
