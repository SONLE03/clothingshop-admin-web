"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, FileText, Users, UserPlus, File, Lock, Wand, MessageSquare, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Menu, Package, PencilRuler, PackageOpen, TicketPercent, CalendarHeart, BookUser, Scroll, ScrollText, Import, PieChart, Blocks, ListOrdered, FilePlus } from 'lucide-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Tags, PersonStanding, Slack } from 'lucide-react';
import { BgColorsOutlined, OrderedListOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  
  const router = useRouter();
  

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    console.log(storedRole);
    if (storedRole) {
      setRole(JSON.parse(storedRole));
    }
  }, []);

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
    <div className={`fixed left-0 top-0 overflow-y-auto bg-white shadow-2xl border border-slate-200 rounded-2xl text-indigo-500 ${isCollapsed ? 'w-20' : 'w-64'} h-full fixed flex flex-col transition-all duration-300`}>
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
          {/* Only render for ADMIN */}
          {role === 'ADMIN' && (
            <>
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-800">
                <LayoutDashboardIcon className="mr-2" />
                {!isCollapsed && <Link href="/calendar">Dashboard</Link>}
              </li>
              {/*Category Link */}
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
            </>
          )}

          {/* Product Link */}
          {role === 'ADMIN' || role === 'STAFF' ? (
            <>
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
                  <Link href="/pages/manage-products/products/list-products">Products list</Link>
                </li>
              </ul>
            </>
          ) : null}

          {/* Events Link */}
          {role === 'ADMIN' || role === 'STAFF' ? (
            <>
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('events')}>
                <div className="flex items-center cursor-pointer">
                  <CalendarHeart className="mr-2" />
                  {!isCollapsed && 'Events'}
                </div>
                {!isCollapsed && (
                  <div className={`transform transition-transform duration-300 ${openDropdown === 'category' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown />
                  </div>
                )}
              </li>

              <ul
                className={`pl-8 m-2 transition-max-height duration-300 ease-in-out overflow-hidden ${
                  openDropdown === 'events' && !isCollapsed ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-600 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <TicketPercent  className="mr-2" />
                  <Link href="/pages/manage-event">Coupons</Link>
                </li>
              </ul>
            </>
          ) : null}

          {/* Customers Link */}
          {role === 'ADMIN' || role === 'STAFF' ? (
            <>
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('customers')}>
                <div className="flex items-center cursor-pointer">
                  <Users className="mr-2" />
                  {!isCollapsed && 'Customers'}
                </div>
                {!isCollapsed && (
                  <div className={`transform transition-transform duration-300 ${openDropdown === 'customers' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown />
                  </div>
                )}
              </li>
              <ul
                className={`pl-8 m-2 transition-max-height duration-300 ease-in-out overflow-hidden ${
                  openDropdown === 'customers' && !isCollapsed ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <BookUser className="mr-2" />
                  <Link href="/pages/manage-customer">List Customers</Link>
                </li>
              </ul>
            </>
          ) : null}

          {/* Orders Link */}
          {role === 'ADMIN' || role === 'STAFF' ? (
            <>
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('orders')}>
                <div className="flex items-center cursor-pointer">
                  <ListOrdered className="mr-2" />
                  {!isCollapsed && 'Orders'}
                </div>
                {!isCollapsed && (
                  <div className={`transform transition-transform duration-300 ${openDropdown === 'orders' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown />
                  </div>
                )}
              </li>
              <ul
                className={`pl-8 m-2 transition-max-height duration-300 ease-in-out overflow-hidden ${
                  openDropdown === 'orders' && !isCollapsed ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <ScrollText className="mr-2" />
                  <Link href="/pages/manage-orders">List Orders</Link>
                </li>
              </ul>
            </>
          ) : null}

          {/* Reports Link */}
          {role === 'ADMIN' ? (
            <>
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('reports')}>
                <div className="flex items-center cursor-pointer">
                  <PieChart className="mr-2" />
                  {!isCollapsed && 'Reports'}
                </div>
                {!isCollapsed && (
                  <div className={`transform transition-transform duration-300 ${openDropdown === 'reports' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown />
                  </div>
                )}
              </li>
              <ul
                className={`pl-8 m-2 transition-max-height duration-300 ease-in-out overflow-hidden ${
                  openDropdown === 'reports' && !isCollapsed ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <Blocks className="mr-2" />
                  <Link href="/pages/manage-reports/statistic">Statistic</Link>
                </li>
              </ul>
            </>
          ) : null}

          {/* Staffs Link */}
          {role === 'ADMIN' ? (
            <>
              <li className="p-4 mb-2 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center justify-between transition duration-500 ease-out focus:outline-none active:bg-indigo-900" onClick={() => handleDropdownClick('staffs')}>
                <div className="flex items-center cursor-pointer">
                  <UserPlus className="mr-2" />
                  {!isCollapsed && 'Staffs'}
                </div>
                {!isCollapsed && (
                  <div className={`transform transition-transform duration-300 ${openDropdown === 'staffs' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown />
                  </div>
                )}
              </li>
              <ul
                className={`pl-8 m-2 transition-max-height duration-300 ease-in-out overflow-hidden ${
                  openDropdown === 'staffs' && !isCollapsed ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <li className="p-2 mb-2 mt-2 left-3 rounded-lg hover:bg-indigo-500 group hover:text-white font-semibold flex items-center transition duration-500 ease-out focus:outline-none active:bg-indigo-900">
                  <Scroll className="mr-2" />
                  <Link href="/pages/manage-staffs">List Staffs</Link>
                </li>
              </ul>
            </>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
