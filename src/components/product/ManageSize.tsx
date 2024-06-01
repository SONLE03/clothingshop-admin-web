"use client";
import { GetAllSize } from "@/src/api/products/sizes/GetAllSize";
import { AddSize } from "@/src/api/products/sizes/AddSize";

import { Table, Button, Modal, Input, Space } from "antd";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BookmarkPlus, Pen, Tags, Trash } from "lucide-react";
import { Size } from "@/src/types";
import { SearchOutlined } from "@ant-design/icons";

const ManageSize: React.FC = () => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSizeName, setNewSizeName] = useState("");
  const [editSize, setEditSize] = useState<Size | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await GetAllSize();
      setSizes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Sizes:", error);
      setLoading(false);
    }
  };

  const handleAddSize = async () => {
    
    try {
      await AddSize(newSizeName);
      fetchData();
      setNewSizeName(newSizeName);
      toast.success("Size added successfully");
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Error adding Size");
      console.error("Error adding Size:", error);
    }
  };

  const handleEditSize = async () => {
    if (!editSize) return;
    try {
      //await EditSize(editSize.id, newSizeName);
      fetchData();
      setEditSize(null);
      setIsEditModalVisible(false);
      toast.success("Size updated successfully");
    } catch (error) {
      toast.error("Error updating Size");
      console.error("Error updating Size:", error);
    }
  };

  const handleDeleteSize = async (SizeId: string) => {
    try {
      //await DeleteSize(SizeId);
      fetchData();
      toast.success("Size deleted successfully");
    } catch (error) {
      toast.error("Error deleting Size");
      console.error("Error deleting Size:", error);
    }
  };

  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredSize = sizes.filter(size => {
    return size.name.toLowerCase().includes(searchTerm);
  });


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Edit",
      key: "edit",
      render: (text: any, record: Size) => (
        <Button className="border border-blue-500 flex flex-row text-center items-center"
          icon={<Pen className="mr-2 font-semibold" width={20} height={20}   />}
          onClick={() => {
            setEditSize(record);
            setNewSizeName(record.name);
            setIsEditModalVisible(true);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (text: any, record: Size) => (
        <Button className="border border-red-500 flex flex-row text-center items-center"
          icon={<Trash className="mr-2 font-semibold" width={20} height={20}  />}
          danger
          //onClick={() => handleDeleteSize(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center w-full mb-6">
          <Input className="focus:placeholder-transparent focus:border-blue-500 w-2/3 h-10 border border-gray-400 rounded-lg shadow-lg" 
              placeholder="Search by size name"
              prefix={<SearchOutlined className="mr-2" />}
              onChange={handleSearch}
          />
            <Button className="flex flex-row text-center items-center space-x-1 text-lg h-10 rounded-lg"
              type="primary"
              icon={<BookmarkPlus />}
              onClick={() => setIsModalVisible(true)}
            >
              Add Size
            </Button>
      </div>

      <Table className='border border-gray-500 rounded-lg text-lg font-semibold shadow-lg'
        dataSource={filteredSize}
        columns={columns}
        rowKey="id"
        loading={loading}
        bordered

      />

      <Modal
        title={
          <div className="flex justify-center items-center text-lg font-semibold mb-4 space-x-2">
              <Tags /> 
              <span>Add new Size</span>
          </div>
        }
        visible={isModalVisible}
        onOk={handleAddSize}
        onCancel={() => setIsModalVisible(false)}
        okText="Add"
      >
        <Input
          placeholder="Enter Size name"
          value={newSizeName}
          onChange={(e) => setNewSizeName(e.target.value)}
        />
      </Modal>

      <Modal
        title={
          <div className="flex justify-center items-center text-lg font-semibold mb-4 space-x-2">
              <Tags /> 
              <span>Edit size</span>
          </div>
        }
        visible={isEditModalVisible}
        onOk={handleEditSize}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Save"
      >
        <Input
          placeholder="Enter Size name"
          value={newSizeName}
          onChange={(e) => setNewSizeName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ManageSize;
