"use client";
//import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import { useSidebarState } from "../hooks/useTransitions";

const inter = Inter({ subsets: ["latin"] });

/*
export const metadata: Metadata = {
  title: "Clothes shop Admin Dashboard",
  description: "Clothes shop Admin Dashboard web",
};*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSidebarCollapsed, toggleSidebar } = useSidebarState();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <aside className={`h-screen bg-white text-white transition-all ${isSidebarCollapsed ? 'w-10' : 'w-48'}`}>
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={toggleSidebar}/>
          </aside>
          <main className={`flex-1 p-4 transition-all ${isSidebarCollapsed ? 'ml-10' : 'ml-52'}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}