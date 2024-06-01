"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Select, Input, Typography } from 'antd';
import { BookmarkPlus, Eye, Tags, Trash } from 'lucide-react';
import { SketchPicker } from 'react-color';

import { GetAllColor } from '@/src/api/products/colors/GetAllColor';
import { AddColors } from '@/src/api/products/colors/AddColor';
import { Color } from '@/src/types';
import toast, { Toaster } from 'react-hot-toast';
import { BgColorsOutlined, SearchOutlined } from '@ant-design/icons';


const { Title } = Typography;

const ManageColor: React.FC = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editColor, setEditColor] = useState<Color | null>(null);
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    GetAllColor().then((colors) => setColors(colors));
  }, []);

  const handleCancel = () => {
    setVisible(false);
    setEditMode(false);
    setEditColor(null);
    setCurrentColor('#ffffff');
  };

  const handleAddColor = (color: Color) => {
    try {
        AddColors(color).then(() => {
            GetAllColor().then((colors) => setColors(colors));
            setVisible(false);
        });
        toast.success('Color added successfully');
    } catch (error) {
      console.error('Error adding color:', error);
      toast.error('Error adding color');
    }
    

  };

  const handleEditColor = (color: Color) => {
    setEditMode(true);
    setEditColor(color);
    setCurrentColor(color.name);
    setVisible(true);
  };

  const handleDeleteColor = (color: Color) => {
    // Implement delete logic here
  };

  const handleFinish = () => {
    const newColor: Color = {
      id: editMode && editColor ? editColor.id : Math.random(), // Generate a new ID if not editing
      name: currentColor,
    };
    if (editMode) {
      // Update the color in the state and backend
      setColors(colors.map(c => (c.id === newColor.id ? newColor : c)));
      // Optionally, update the color in the backend here
    } else {
      handleAddColor(newColor);
    }
    setVisible(false);
    setEditMode(false);
    setEditColor(null);
    setCurrentColor('#ffffff');
  };

  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredColor = colors.filter(color => {
    return color.name.toLowerCase().includes(searchTerm);
  });

  const columns = [
    {
      title: 'Color',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <div style={{ backgroundColor: text, width: '30px', height: '30px' , borderRadius: '50%' }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Color) => (
        <div className='flex flex-row space-x-3'>
          <Button type="primary" onClick={() => handleEditColor(record)}>Edit</Button>
          <Button danger onClick={() => handleDeleteColor(record)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
    <Toaster/>
        <div className="flex justify-between items-center w-full mb-6">
          <Input className="focus:placeholder-transparent focus:border-blue-500 w-2/3 h-10 border border-gray-400 rounded-lg shadow-lg" 
              placeholder="Search by color name"
              prefix={<SearchOutlined className="mr-2" />}
              onChange={handleSearch}
          />
          <Button className="flex flex-row text-center items-center space-x-1 text-lg h-10 rounded-lg"
            type="primary" 
            onClick={() => setVisible(true)}>
            {<BookmarkPlus />}
            Add New Color
            </Button>

      </div>
      <Table className='border border-gray-500 rounded-lg text-lg font-semibold' bordered columns={columns} dataSource={filteredColor} rowKey="id" pagination={{ pageSize: 6 }} />
      <Modal className='flex flex-col justify-center items-center'
        title={editMode ? 
        <div className="flex justify-center items-center text-lg font-semibold mb-4 space-x-2">
            <BgColorsOutlined /> 
            <span>Edit Color</span>
        </div>
       : <div className="flex justify-center items-center text-lg font-semibold mb-4 space-x-2">
       <BgColorsOutlined /> 
       <span>Add Color</span>
      </div>}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleFinish}>
          <Form.Item>
            <SketchPicker className='justify-center items-center'
              color={currentColor}
              onChangeComplete={(color) => setCurrentColor(color.hex)}
            />
          </Form.Item>
          <Form.Item className='flex justify-center items-center'>
            <Button type="primary" htmlType="submit">{editMode ? 'Edit' : 'Add'} Color</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageColor;
