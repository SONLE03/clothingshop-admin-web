"use client";

import { GetAllGender } from "@/src/api/category/gender/GetAllGender";
import { AddPG } from "@/src/api/category/gender/AddPGender";
import { EditPG } from "@/src/api/category/gender/EditPGender";
import { DeletePG } from "@/src/api/category/gender/DeletePGender";
import { Gender } from "@/src/types";

import { Table, Button, Modal, Input, Space, Typography } from "antd";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BookmarkPlus, Pen, Trash } from "lucide-react";

const ManagePG: React.FC = () => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGenderName, setNewGenderName] = useState("");
  const [editGender, setEditGender] = useState<Gender | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await GetAllGender();
      setGenders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching genders:", error);
      setLoading(false);
    }
  };

  const handleAddGender = async () => {
    try {
      await AddPG(newGenderName);
      fetchData();
      setNewGenderName("");
      toast.success("Gender added successfully");
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Error adding gender");
      console.error("Error adding gender:", error);
    }
  };

  const handleEditGender = async () => {
    if (!editGender) return;
    try {
      await EditPG(editGender.id, newGenderName);
      fetchData();
      setEditGender(null);
      setIsEditModalVisible(false);
      toast.success("Gender updated successfully");
    } catch (error) {
      toast.error("Error updating gender");
      console.error("Error updating gender:", error);
    }
  };

  const handleDeleteGender = async (genderId: string) => {
    try {
      await DeletePG(genderId);
      fetchData();
      toast.success("Gender deleted successfully");
    } catch (error) {
      toast.error("Error deleting gender");
      console.error("Error deleting gender:", error);
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
      render: (text: any, record: Gender) => (
        <Button className="border border-blue-500 flex flex-row text-center items-center"
          icon={<Pen height={15} width={15} />}
          onClick={() => {
            setEditGender(record);
            setNewGenderName(record.name);
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
      render: (text: any, record: Gender) => (
        <Button className="border border-red-500 flex flex-row text-center items-center"
          icon={<Trash height={15} width={15} />}
          danger
          onClick={() => handleDeleteGender(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Toaster />
      <Space className="flex justify-start" style={{ marginBottom: 16 }}>
        <Button className="flex flex-row text-center items-center space-x-1 text-lg h-10 rounded-lg mb-4"
          type="primary"
          icon={<BookmarkPlus height={18} width={18} />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Gender
        </Button>
      </Space>

      <Table
        dataSource={genders}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 6 }}
        className="min-w-full rounded-lg shadow-sm border border-gray-400"
        bordered
      />

      <Modal
        title="Add Gender"
        visible={isModalVisible}
        onOk={handleAddGender}
        onCancel={() => setIsModalVisible(false)}
        okText="Add"
      >
        <Input
          placeholder="Enter gender name"
          value={newGenderName}
          onChange={(e) => setNewGenderName(e.target.value)}
        />
      </Modal>

      <Modal
        title="Edit Gender"
        visible={isEditModalVisible}
        onOk={handleEditGender}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Save"
      >
        <Input
          placeholder="Enter gender name"
          value={newGenderName}
          onChange={(e) => setNewGenderName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ManagePG;
