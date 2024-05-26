"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Select, Input, Typography } from 'antd';
import { BookmarkPlus, Eye, Tags, Trash } from 'lucide-react';
import { SketchPicker } from 'react-color';

import { GetAllColor } from '@/src/api/products/colors/GetAllColor';
import { AddColors } from '@/src/api/products/colors/AddColor';
import { Color } from '@/src/types';
import toast, { Toaster } from 'react-hot-toast';
import { BgColorsOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ManageColorPage: React.FC = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editColor, setEditColor] = useState<Color | null>(null);
  const [currentColor, setCurrentColor] = useState('#ffffff');

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
    <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl" >
        <Toaster/>

        <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
        <BgColorsOutlined  className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
        <Title level={4} className="space-y-0 font-semibold">Manage Color</Title>
      </div>

      <Button className="flex flex-row text-center items-center space-x-1 text-lg h-10 rounded-lg mb-5"
        type="primary" 
        onClick={() => setVisible(true)}>
        {<BookmarkPlus />}
        Add New Color
        </Button>
      <Table columns={columns} dataSource={colors} rowKey="id" pagination={{ pageSize: 5 }} />
      <Modal className='flex flex-col justify-center items-center'
        title={editMode ? 'Edit Color' : 'Add Color'}
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

export default ManageColorPage;
