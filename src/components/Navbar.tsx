"use client";

import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import router from "next/router";
//import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import envConfig from "@/src/config";
import { UserOutlined } from "@ant-design/icons";
import { Card } from "antd";
//import { Session } from "inspector";

const Navbar = () => {

    //const {data: session} = useSession();

    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const evnMe = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/auth/me"

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            axios.get(evnMe, {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              })
              .then(response => {
                // Lưu thông tin người dùng vào state
                setUsername(response.data.email);
                setIsLoggedIn(true);
              })
              .catch(error => {
                console.error('Error fetching user data:', error);
              });
            // Lấy username từ access token hoặc từ API
            
            
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/auth/login'; // Điều hướng về trang đăng nhập sau khi đăng xuất
    };

  return (
    <header className="w-full absolute z-10">
        <nav className="max-w-[1500px] mx-auto
        flex justify-between items-center
        sm:px-16 px-6 py-4 shadow-xl">
            <Link href="/" className="flex justify-center items-center">
                <Image 
                    src="/logo.png"
                    alt="Fashion shop logo"
                    width={80}
                    height={18}
                    className=" object-contain"
                />
            </Link>

            <div className="flex justify-center items-center">
                <Link href="/" className="flex mr-8 justify-center items-center transition duration-500 ease-in-out border-b-2 border-b-blue-500 min-h-[50px] min-w-[80px] drop-shadow-xl hover:text-blue-500 hover:border-b-4 hover:font-bold">
                    Dashboard
                </Link>

                <Link href="/" className="flex mr-8 justify-center items-center transition duration-500 ease-in-out border-b-2 border-b-blue-500 min-h-[50px] min-w-[80px] drop-shadow-xl hover:text-blue-500 hover:border-b-4 hover:font-bold">
                    Orders
                </Link>

                <Link href="/" className="flex mr-8 justify-center items-center transition duration-500 ease-in-out border-b-2 border-b-blue-500 min-h-[50px] min-w-[80px] drop-shadow-xl hover:text-blue-500 hover:border-b-4 hover:font-bold">
                    Category
                </Link>

                <Link href="/" className="flex mr-8 justify-center items-center transition duration-500 ease-in-out border-b-2 border-b-blue-500 min-h-[50px] min-w-[80px] drop-shadow-xl hover:text-blue-500 hover:border-b-4 hover:font-bold">
                    Products
                </Link>

                <Link href="/" className="flex mr-8 justify-center items-center transition duration-500 ease-in-out border-b-2 border-b-blue-500 min-h-[50px] min-w-[80px] drop-shadow-xl hover:text-blue-500 hover:border-b-4 hover:font-bold">
                    Sizes
                </Link>

                <Link href="/" className="flex mr-8 justify-center items-center transition duration-500 ease-in-out border-b-2 border-b-blue-500 min-h-[50px] min-w-[80px] drop-shadow-xl hover:text-blue-500 hover:border-b-4 hover:font-bold">
                    Colors
                </Link>

                <Link href="/" className="flex mr-8 justify-center items-center transition duration-500 ease-in-out border-b-2 border-b-blue-500 min-h-[50px] min-w-[80px] drop-shadow-xl hover:text-blue-500 hover:border-b-4 hover:font-bold">
                    Users
                </Link>

                <Link href="/" className="flex mr-8 justify-center items-center transition duration-500 ease-in-out border-b-2 border-b-blue-500 min-h-[50px] min-w-[80px] drop-shadow-xl hover:text-blue-500 hover:border-b-4 hover:font-bold">
                    Settings
                </Link>

            </div>

            <div className="flex justify-center items-center space-x-4">
                
                {username ? ( 
                    <>
                    <Card className=" flex justify-center items-center
                    bg-white rounded-full h-[35px] w-[200px] border-blue-500" >
                        
                        <p className="flex gap-1"> <UserOutlined /> {username}</p>

                    </Card>

                    <button className="flex justify-center items-center text-white py-3 text-center transition duration-500 ease-in-out
                rounded-full border border-white drop-shadow-xl bg-black min-w-[110px] hover:border-black hover:bg-white hover:text-black" onClick={handleLogout}>Log out</button>

                     </>
                ) : (
                    <>
                        <Link className="text-white py-3 text-center transition duration-500 ease-in-out
                        rounded-full border border-white drop-shadow-xl bg-black min-w-[110px] hover:border-black hover:bg-white hover:text-black" href={"/auth/login"}>Sign in</Link>

                       
                    </>
                )}

                
                    
                
            </div>
            
        </nav>
    </header>
  )
}

export default Navbar