"use client";

import React from "react";
import Image from "next/image";
import TitleHeader from "../components/TitleHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CreditCard, User } from "lucide-react";
import { useEffect, useState } from "react";
import { GetAllProducts } from "../api/products/GetAllProducts";
import { GetAllUsers } from "../api/users/GetAllUsers";
import type { AppProps } from 'next/app';
import Sidebar from "../components/SideBar";



export default function Home() {


  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '/auth/login';
    } else {
      const fetchTotalProducts = async () => {
        const total = await GetAllProducts();
        setTotalProducts(total);
      };
      fetchTotalProducts();

      const fetchTotalUsers = async () => {
        try {
          const users = await GetAllUsers()
          setTotalUsers(users.length);
        } catch (error) {
          console.error('Failed to fetch total users:', error);
        }
      };
      fetchTotalUsers();
    }
  }, []);



  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <TitleHeader title="Dashboard" description="Overview of your store" />
      
      <div className="grid gap-4 grid-cols-2">
        <Card className=" bg-slate-100 border-blue-500 border-2 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 space-x-2 pb-4">
            <CardTitle className=" text-[20px] font-medium ">Total products</CardTitle>
            <CreditCard className=" h-10 w-10 text-muted-foreground gap-2 " />
          </CardHeader>
          <CardContent className="pl-6 pb-3">
            <div className="text-2xl font-bold">
              +{totalProducts}
            </div>
          </CardContent>
        </Card>

        <Card className=" bg-slate-100 border-blue-500 border-2 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 space-x-2 pb-4">
            <CardTitle className=" text-[20px] font-medium ">Total Users</CardTitle>
            <User className=" h-10 w-10 text-muted-foreground gap-2 " />
          </CardHeader>
          <CardContent className="pl-6 pb-3">
            <div className="text-2xl font-bold">
              +{totalUsers}
            </div>
          </CardContent>
        </Card>

        <Card className=" bg-slate-100 border-blue-500 border-2 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 space-x-2 pb-4">
            <CardTitle className=" text-[20px] font-medium ">Total products</CardTitle>
            <CreditCard className=" h-10 w-10 text-muted-foreground gap-2 " />
          </CardHeader>
          <CardContent className="pl-6 pb-3">
            <div className="text-2xl font-bold">
              +{totalProducts}
            </div>
          </CardContent>
        </Card>

        <Card className=" bg-slate-100 border-blue-500 border-2 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 space-x-2 pb-4">
            <CardTitle className=" text-[20px] font-medium ">Total products</CardTitle>
            <CreditCard className=" h-10 w-10 text-muted-foreground gap-2 " />
          </CardHeader>
          <CardContent className="pl-6 pb-3">
            <div className="text-2xl font-bold">
              +{totalProducts}
            </div>
          </CardContent>
        </Card>

        
        </div>
    </main>
  );
}
