"use client";
import { GetAllSize } from "@/src/api/products/sizes/GetAllSize";
import { AddSize } from "@/src/api/products/sizes/AddSize";

import { Table, Button, Modal, Input, Space, Typography } from "antd";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BookmarkPlus, Pen, Plus, Slack, Tags, Trash } from "lucide-react";
import { Size } from "@/src/types";

const { Title } = Typography;

const ManageSizePage: React.FC = () => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSizeName, setNewSizeName] = useState("");
  const [editSize, setEditSize] = useState<Size | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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
        <Button className="border border-blue-500 flex flex-row text-center items-center  text-lg"
          icon={<Pen />}
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
        <Button className="border border-red-500 flex flex-row text-center items-center  text-lg"
          icon={<Trash />}
          danger
          //onClick={() => handleDeleteSize(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
      <Toaster />
      <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
        <Tags className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
        <Title level={4} className="space-y-0 font-semibold">Manage Size</Title>
      </div>

      <Space style={{ marginBottom: 16 }}>
        <Button className="flex flex-row text-center items-center space-x-1 text-lg h-10 rounded-lg mb-2"
          type="primary"
          icon={<BookmarkPlus />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Size
        </Button>
      </Space>

      <Table className="text-lg font-semibold"
        dataSource={sizes}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="Add Size"
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
        title="Edit Size"
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

export default ManageSizePage;
