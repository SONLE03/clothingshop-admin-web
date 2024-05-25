"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, FileText, Users, UserPlus, File, Lock, Wand, MessageSquare, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Menu, Package, PencilRuler, PackageOpen } from 'lucide-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Tags, PersonStanding, Slack } from 'lucide-react';
import { BgColorsOutlined } from '@ant-design/icons';

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
    <div className={` bg-white shadow-2xl border border-slate-200 rounded-2xl text-indigo-500 ${isCollapsed ? 'w-16' : 'w-64'} h-full fixed flex flex-col transition-all duration-300`}>
      <div className="flex justify-between items-center p-4">
        {!isCollapsed && 
        <div className="text-2xl font-bold">
          Clotheshop
        </div>}
        <button onClick={handleCollapseClick} className="text-gray-100 bg-indigo-600 h-8 w-8 rounded-lg shadow-xl">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <nav className="flex-1">
        <ul>

          <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-800">
            <LayoutDashboardIcon className="mr-2" />
            {!isCollapsed && <Link href="/calendar">Dashboard</Link>}
          </li>

          <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
            <Calendar className="mr-2" />
            {!isCollapsed && <Link href="/calendar">Calendar</Link>}
          </li>

          <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('category')}>
            <div className="flex items-center cursor-pointer">
              <Slack className="mr-2" />
              {!isCollapsed && 'Category'}
            </div>
            {!isCollapsed && (
              <div className={`transform transition-transform duration-300 ${openDropdown === 'category' ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDown />
              </div>
            )}
          </li>

          <ul
            className={`pl-8 m-2 transition-max-height duration-300 ease-in-out overflow-hidden ${
              openDropdown === 'category' && !isCollapsed ? 'max-h-64' : 'max-h-0'
            }`}
          >
            <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
              <Tags  className="mr-2" />
              <Link href="/pages/manage-category/branch">Branchs</Link>
            </li>
            <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
              <PersonStanding className="mr-2" />
              <Link href="/pages/manage-category/gender">Genders</Link>
            </li>
            <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
              <Slack className="mr-2" />
              <Link href="/pages/manage-category/category">Category</Link>
            </li>
            
          </ul>

          <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('product')}>
            <div className="flex items-center cursor-pointer">
              <Package className="mr-2" />
              {!isCollapsed && 'Products'}
            </div>
            {!isCollapsed && (
              <div className={`transform transition-transform duration-300 ${openDropdown === 'product' ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDown />
              </div>
            )}
          </li>

          <ul
            className={`pl-8 m-2 transition-max-height duration-300 ease-in-out overflow-hidden ${
              openDropdown === 'product' && !isCollapsed ? 'max-h-64' : 'max-h-0'
            }`}
          >
            <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
              <BgColorsOutlined  className="mr-2" />
              <Link href="/pages/manage-products/colors">Colors</Link>
            </li>
            <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
              <PencilRuler className="mr-2" />
              <Link href="/pages/manage-products/sizes">Sizes</Link>
            </li>
            <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
              <PackageOpen className="mr-2" />
              <Link href="/pages/manage-products/products">Products</Link>
            </li>
            
          </ul>

          <li className="p-4 mb-2 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('users')}>
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
            <li className=" p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-amber-800">
              <FileText className="mr-2 rounded-md" />
              <Link href="/pages/manage-customers/list-customers">List Customers</Link>
            </li>
            
            <li className=" p-2  rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-slate-900">
              <UserPlus className="mr-2" />
              <Link href="/pages/manage-customers/add-customer">Add Customer</Link>
            </li>
          </ul>

          
          <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
            <File className="mr-2" />
            {!isCollapsed && <Link href="/pages">Pages</Link>}
          </li>
          <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
            <Lock className="mr-2" />
            {!isCollapsed && <Link href="/auth-pages">Auth Pages</Link>}
          </li>
          <li className="p-4 mb-2 rounded-lg hover:bg-indigo-700 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
            <Wand className="mr-2" />
            {!isCollapsed && <Link href="/wizard-examples">Wizard Examples</Link>}
          </li>
          <li className="p-4 mb-2 rounded-lg hover:bg-indigo-700 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
            <MessageSquare className="mr-2" />
            {!isCollapsed && <Link href="/dialog-examples">Dialog Examples</Link>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
