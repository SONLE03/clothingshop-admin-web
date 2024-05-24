"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, FileText, Users,UserPlus, File, Lock, Wand, MessageSquare, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { LayoutDashboardIcon } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  //const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleDropdownClick = (menu: string) => {
    if (openDropdown === menu) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(menu);
    }
  };

  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setOpenDropdown(null); // Close all dropdowns when collapsing sidebar
    }
  };

  return (
    <div className={` bg-slate-900 rounded-2xl text-white ${isCollapsed ? 'w-16' : 'w-64'} h-full fixed flex flex-col transition-all duration-300`}>
      <div className="flex justify-between items-center p-4">
        {!isCollapsed && 
        <div className="text-2xl font-bold">
          Clotheshop
        </div>}
        <button onClick={handleCollapseClick} className="text-black bg-gray-200 h-8 w-8 rounded-lg">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="p-4 hover:bg-indigo-700 flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
            <LayoutDashboardIcon className="mr-2" />
            {!isCollapsed && <Link href="/calendar">Dashboard</Link>}
          </li>

          <li className="p-4 hover:bg-indigo-700 flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
            <Calendar className="mr-2" />
            {!isCollapsed && <Link href="/calendar">Calendar</Link>}
          </li>
          <li className="p-4 hover:bg-indigo-700 flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('invoice')}>
            <div className="flex items-center cursor-pointer">
              <FileText className="mr-2" />
              {!isCollapsed && 'Invoice'}
            </div>
            {!isCollapsed && (
              <div className={`transform transition-transform duration-300 ${openDropdown === 'invoice' ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDown />
              </div>
            )}
          </li>
          <ul
            className={`pl-8 transition-max-height duration-300 ease-in-out overflow-hidden ${
              openDropdown === 'invoice' && !isCollapsed ? 'max-h-64' : 'max-h-0'
            }`}
          >
            <li className="p-2 hover:bg-indigo-700 flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
              <FileText className="mr-2" />
              <Link href="/invoice/list">List</Link>
            </li>
            <li className="p-2 hover:bg-indigo-700 flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
              <FileText className="mr-2" />
              <Link href="/invoice/preview">Preview</Link>
            </li>
            <li className="p-2 hover:bg-indigo-700 flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
              <FileText className="mr-2" />
              <Link href="/invoice/edit">Edit</Link>
            </li>
            <li className="p-2 hover:bg-indigo-700 flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
              <FileText className="mr-2" />
              <Link href="/invoice/add">Add</Link>
            </li>
          </ul>

          <li className="p-4 hover:bg-slate-500 flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('users')}>
            <div className="flex items-center cursor-pointer">
              <Users className="mr-2" />
              {!isCollapsed && 'Customers'}
            </div>
            {!isCollapsed && (
              <div className={`transform transition-transform duration-300 ${openDropdown === 'users' ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDown />
              </div>
            )}
          </li>
          <ul
            className={`pl-8 m-2 transition-max-height duration-300 ease-in-out focus:outline-none  overflow-hidden ${
              openDropdown === 'users' && !isCollapsed ? 'max-h-64' : 'max-h-0'
            }`}
          >
            <li className=" p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-slate-400 flex items-center transition duration-500 ease-out focus:outline-none active:bg-slate-900">
              <FileText className="mr-2 rounded-md" />
              <Link href="/pages/manage-customers/list-customers">List Customers</Link>
            </li>
            
            <li className=" p-2 mb-2 rounded-lg hover:bg-slate-400 flex items-center transition duration-500 ease-out focus:outline-none active:bg-slate-900">
              <FileText className="mr-2" />
              <Link href="/invoice/add">Add Customer</Link>
            </li>
          </ul>

          
          <li className="p-4 hover:bg-indigo-700 flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
            <File className="mr-2" />
            {!isCollapsed && <Link href="/pages">Pages</Link>}
          </li>
          <li className="p-4 hover:bg-indigo-700 flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
            <Lock className="mr-2" />
            {!isCollapsed && <Link href="/auth-pages">Auth Pages</Link>}
          </li>
          <li className="p-4 hover:bg-indigo-700 flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
            <Wand className="mr-2" />
            {!isCollapsed && <Link href="/wizard-examples">Wizard Examples</Link>}
          </li>
          <li className="p-4 hover:bg-indigo-700 flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
            <MessageSquare className="mr-2" />
            {!isCollapsed && <Link href="/dialog-examples">Dialog Examples</Link>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
