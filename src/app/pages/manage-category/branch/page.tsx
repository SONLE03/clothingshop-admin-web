"use client";
import { GetAllBranch } from "@/src/api/category/branch/GetAllBranch";
import { AddBranch } from "@/src/api/category/branch/AddBranch";
import { EditBranch } from "@/src/api/category/branch/EditBranch";
import { DeleteBranch } from "@/src/api/category/branch/DeleteBranch";

import { Card, Modal } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Branch } from "@/src/types";
import toast, { Toaster } from "react-hot-toast";
import { BookmarkPlus, Pen, Plus, Slack, Trash } from "lucide-react";

const ManageBranchPage: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBranchName, setNewBranchName] = useState("");
  const [editBranch, setEditBranch] = useState<Branch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect (() => {
    fetchData();
  }) ;

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
    } catch (error) {
        toast.error("Error adding branch");
      console.error("Error adding branch:", error);
    }
  };

  const handleEditBranch = (branch: Branch) => {
    setEditBranch(branch);
    setNewBranchName(branch.name);
    setIsModalOpen(true);
  };

  const handleSaveBranch = async () => {
    if (!editBranch) {
      return;
    }
    try {
      await EditBranch(editBranch.id, newBranchName);
      fetchData();
      setEditBranch(null);
      toast.success("Branch updated successfully");
    } catch (error) {
      toast.error("Error updating branch");
      console.error("Error updating branch:", error);
    }
  };

  const handleCancelBranch = () => {
    setEditBranch(null);
    setIsModalOpen(false);
    setNewBranchName("");
  };

  const handleDeleteBranch = async (branch: string) => {
    try {
      await DeleteBranch(branch);
      fetchData();
      toast.success("Branch deleted successfully");
    } catch (error) {
      toast.error("Error deleting branch");
      console.error("Error deleting branch:", error);
    }
  };

  return (
    <div className="flex bg-white border border-gray-200 rounded-3xl h-full shadow-2xl">
        <Toaster/>
        <div className="w-2/3">
            <div className="flex space-y-0 mb-6 border border-gray-300 space-x-2 items-center m-4 bg-white rounded-xl shadow-xl w-1/3 h-14"> 
            <Slack className="ml-5 flex text-lg font-bold text-center text-indigo-600"/>
            <h2 className=" space-y-0 text-xl font-semibold">Manage Branch</h2>
            </div>
            <table className=" m-4 w-full border-collapse rounded-3xl shadow-xl mt-2">
            <thead className="bg-indigo-500 text-white rounded-xl text-start">
                <tr className="border border-gray-300 rounded-xl ">
                <th className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-l-lg hover:bg-indigo-300">Name</th>
                <th className="px-4 py-2 bg-indigo-500 text-white font-semibold text-start hover:bg-indigo-300 ">Edit</th>
                <th className="px-4 py-2 bg-indigo-500 text-white font-semibold text-start rounded-r-lg hover:bg-indigo-300">Delete</th>
                </tr>
            </thead>
            <tbody>
                {branches.map((branch) => (
                <tr key={branch.id} className="border-b border-gray-300">
                    <td className="px-4 py-2">{branch.name}</td>
                    <td className="px-4 py-2 items-center justify-center">
                    <button
                        className="flex space-x-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={() => handleEditBranch(branch)}
                    >
                        <Pen className="mr-3 h-5 w-5 text-white" aria-hidden="true"/>
                        Edit
                    </button>
                    </td>
                    <td className="px-4 py-2">
                    <button
                        className="flex space-x-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={() => handleDeleteBranch(branch.id)}
                    >       
                        <Trash className="mr-3 h-5 w-5 text-white" aria-hidden="true" />
                        Delete
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        <div className="w-1/3 ml-4 justify-end items-center">
            <div className="flex flex-col mt-24 border border-gray-300 space-y-0 space-x-2 items-center m-4 bg-white rounded-xl shadow-xl w-full h-72"> 
                <div className="flex flex-row space-x-2 space-y-0 mb-6 mt-6">
                    <BookmarkPlus className="text-lg font-bold text-center text-indigo-600"/>
                    <h1 className=" m-6 text-lg font-semibold mb-4">Add Branch</h1>
                </div>
                    <div className="mb-4 justify-center">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="branchName">
                        Branch Name
                    </label>
                    <input
                        className="mb-8 shadow appearance-none border border-gray-500 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        id="branchName"
                        placeholder="Enter branch name"
                        type="text"
                        value={newBranchName}
                        onChange={(e) => setNewBranchName(e.target.value)}
                    />
                    </div>
                    <div className="flex justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddBranch}
                    >
                        Add
                    </button>
                    </div>
            </div>
        </div>
        {editBranch && (
            <Modal
                visible={isModalOpen}
                onCancel={handleCancelBranch}
                getContainer={() => modalRef.current || document.body}
            >
            <div className="w-1/2 ">

                <h1 className="text-2xl font-bold mb-4">Edit Branch</h1>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="branchName"
                    >
                        Branch Name
                    </label>
                    <input
                        className="shadow appearance-none border border-b-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        id="branchName"
                        placeholder="Enter branch name..."
                        type="text"
                        value={newBranchName}
                        onChange={(e) => setNewBranchName(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-8"
                    onClick={handleSaveBranch}
                >
                    Save
                </button>
                </div>
            </div>
            </Modal>
        )}
    </div>
  );
};

export default ManageBranchPage;
