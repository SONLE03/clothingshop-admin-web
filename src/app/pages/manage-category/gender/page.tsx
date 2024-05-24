"use client";
import { GetAllGender } from "@/src/api/category/gender/GetAllGender";
import { AddPG } from "@/src/api/category/gender/AddPGender";
import { EditPG } from "@/src/api/category/gender/EditPGender";
import { DeletePG } from "@/src/api/category/gender/DeletePGender";

import { Card, Modal } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Gender } from "@/src/types";
import toast, { Toaster } from "react-hot-toast";
import { BookmarkPlus, Pen, PersonStanding, Plus, Slack, Trash } from "lucide-react";

const ManagePGPage: React.FC = () => {
  const [genders, setGenders] = useState<Gender[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGenderName, setNewGenderName] = useState("");
  const [editGender, setEditGender] = useState<Gender | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect (() => {
    fetchData();
  }) ;

  const fetchData = async () => {
    try {
      const data = await GetAllGender();
      setGenders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Genderes:", error);
      setLoading(false);
    }
  };
  const handleAddGender = async () => {
    try {
      await AddPG(newGenderName);
      fetchData();
      setNewGenderName("");
      toast.success("Gender added successfully");
    } catch (error) {
        toast.error("Error adding Gender");
      console.error("Error adding Gender:", error);
    }
  };

  const handleEditGender = (Gender: Gender) => {
    setEditGender(Gender);
    setNewGenderName(Gender.name);
    setIsModalOpen(true);
  };

  const handleSaveGender = async () => {
    if (!editGender) {
      return;
    }
    try {
      await EditPG(editGender.id, newGenderName);
      fetchData();
      setEditGender(null);
      toast.success("Gender updated successfully");
    } catch (error) {
      toast.error("Error updating Gender");
      console.error("Error updating Gender:", error);
    }
  };

  const handleCancelGender = () => {
    setEditGender(null);
    setIsModalOpen(false);
    setNewGenderName("");
  };

  const handleDeleteGender = async (Gender: string) => {
    try {
      await DeletePG(Gender);
      fetchData();
      toast.success("Gender deleted successfully");
    } catch (error) {
      toast.error("Error deleting Gender");
      console.error("Error deleting Gender:", error);
    }
  };

  return (
    <div className="flex bg-white border border-gray-200 rounded-3xl h-full shadow-2xl">
        <Toaster/>
        <div className="w-2/3">
            <div className="flex space-y-0 mb-6 border border-gray-300 space-x-2 items-center m-4 bg-white rounded-xl shadow-xl w-1/3 h-14"> 
            <PersonStanding className="ml-5 flex text-lg font-bold text-center text-indigo-600"/>
            <h2 className=" space-y-0 text-xl font-semibold">Manage Gender</h2>
            </div>
            <table className=" m-4 w-full border-collapse rounded-3xl shadow-xl mt-2">
            <thead className="bg-indigo-500 text-white rounded-xl text-start">
                <tr className="border border-gray-300 rounded-xl ">
                <th className="px-4 py-2 bg-indigo-500 text-white font-semibold text-start rounded-l-lg hover:bg-indigo-300">Name</th>
                <th className="px-4 py-2 bg-indigo-500 text-white font-semibold text-start hover:bg-indigo-300 ">Edit</th>
                <th className="px-4 py-2 bg-indigo-500 text-white font-semibold text-start rounded-r-lg hover:bg-indigo-300">Delete</th>
                </tr>
            </thead>
            <tbody>
                {genders.map((gender) => (
                <tr key={gender.id} className="border-b border-gray-300">
                    <td className="px-4 py-2">{gender.name}</td>
                    <td className="px-4 py-2 items-center justify-center">
                    <button
                        className="flex space-x-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={() => handleEditGender(gender)}
                    >
                        <Pen className="mr-3 h-5 w-5 text-white" aria-hidden="true"/>
                        Edit
                    </button>
                    </td>
                    <td className="px-4 py-2">
                    <button
                        className="flex space-x-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={() => handleDeleteGender(gender.id)}
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
                    <h1 className=" m-6 text-lg font-semibold mb-4">Add Product Gender</h1>
                </div>
                    <div className="mb-4 justify-center">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="GenderName">
                        Gender Name
                    </label>
                    <input
                        className="mb-8 shadow appearance-none border border-gray-500 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        id="GenderName"
                        placeholder="Enter Gender name"
                        type="text"
                        value={newGenderName}
                        onChange={(e) => setNewGenderName(e.target.value)}
                    />
                    </div>
                    <div className="flex justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddGender}
                    >
                        Add
                    </button>
                    </div>
            </div>
        </div>
        {editGender && (
            <Modal
                visible={isModalOpen}
                onCancel={handleCancelGender}
                getContainer={() => modalRef.current || document.body}
            >
            <div className="w-1/2 ">

                <h1 className="text-2xl font-bold mb-4">Edit Gender</h1>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="GenderName"
                    >
                        Gender Name
                    </label>
                    <input
                        className="shadow appearance-none border border-b-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        id="GenderName"
                        placeholder="Enter Gender name..."
                        type="text"
                        value={newGenderName}
                        onChange={(e) => setNewGenderName(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-8"
                    onClick={handleSaveGender}
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

export default ManagePGPage;
