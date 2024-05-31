"use client";
import { GetAllBranch } from "@/src/api/category/branch/GetAllBranch";
import { AddBranch } from "@/src/api/category/branch/AddBranch";
import { EditBranch } from "@/src/api/category/branch/EditBranch";
import { DeleteBranch } from "@/src/api/category/branch/DeleteBranch";
import { Table, Button, Modal, Input, Space, Typography } from "antd";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BookmarkPlus, Pen, Plus, Slack, Tags, Trash } from "lucide-react";
import { Branch } from "@/src/types";

const { Title } = Typography;

const ManageBranch: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBranchName, setNewBranchName] = useState("");
  const [editBranch, setEditBranch] = useState<Branch | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await GetAllBranch();
      setBranches(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching branches:", error);
      setLoading(false);
    }
  };

  const handleAddBranch = async () => {
    try {
      await AddBranch(newBranchName);
      fetchData();
      setNewBranchName("");
      toast.success("Branch added successfully");
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Error adding branch");
      console.error("Error adding branch:", error);
    }
  };

  const handleEditBranch = async () => {
    if (!editBranch) return;
    try {
      await EditBranch(editBranch.id, newBranchName);
      fetchData();
      setEditBranch(null);
      setIsEditModalVisible(false);
      toast.success("Branch updated successfully");
    } catch (error) {
      toast.error("Error updating branch");
      console.error("Error updating branch:", error);
    }
  };

  const handleDeleteBranch = async (branchId: string) => {
    try {
      await DeleteBranch(branchId);
      fetchData();
      toast.success("Branch deleted successfully");
    } catch (error) {
      toast.error("Error deleting branch");
      console.error("Error deleting branch:", error);
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
      render: (text: any, record: Branch) => (
        <Button className="border border-blue-500 flex flex-row text-center items-center"
          icon={<Pen height={15} width={15} />}
          onClick={() => {
            setEditBranch(record);
            setNewBranchName(record.name);
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
      render: (text: any, record: Branch) => (
        <Button className="border border-red-500 flex flex-row text-center items-center"
          icon={<Trash height={15} width={15} />}
          danger
          onClick={() => handleDeleteBranch(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Toaster />
      
      <Space style={{ marginBottom: 16 }}>
        <Button className="flex flex-row text-center items-center space-x-1 text-lg h-10 rounded-lg mb-2"
          type="primary"
          icon={<BookmarkPlus />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Branch
        </Button>
      </Space>

      <Table
        dataSource={branches}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 6 }}
        className="min-w-full rounded-lg shadow-sm border border-gray-400 text-lg font-semibold"
        bordered
      />

      <Modal
        title="Add Branch"
        visible={isModalVisible}
        onOk={handleAddBranch}
        onCancel={() => setIsModalVisible(false)}
        okText="Add"
      >
        <Input
          placeholder="Enter branch name"
          value={newBranchName}
          onChange={(e) => setNewBranchName(e.target.value)}
        />
      </Modal>

      <Modal
        title="Edit Branch"
        visible={isEditModalVisible}
        onOk={handleEditBranch}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Save"
      >
        <Input
          placeholder="Enter branch name"
          value={newBranchName}
          onChange={(e) => setNewBranchName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ManageBranch;
