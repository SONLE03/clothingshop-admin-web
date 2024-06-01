// src/components/LoginForm.tsx
"use client";

import React, { useState } from 'react';
import loginUser from '../../../api/auth/login';
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import { SafetyOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { totalmem } from 'os';
//import Cookies from 'js-cookie';


const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(!emailRegex.test(e.target.value));
  };

  const handleLogin = async () => {
    if (emailError) {
      toast.error("Please enter a valid email address");
      return;
    }
  
    try {
      const data = await loginUser(email, password);
      
      console.log(data);
      localStorage.setItem('access_token', JSON.stringify(data.access));
      localStorage.setItem('refresh_token', JSON.stringify(data.refresh));
      localStorage.setItem('user_id', JSON.stringify(data.id));
      localStorage.setItem('login_time', JSON.stringify(new Date().toISOString()));
      localStorage.setItem('role', JSON.stringify(data.role));
      localStorage.setItem('revenue', JSON.stringify(0));

      //const role = localStorage.getItem('role');
      //console.log(role);
      //console.log(data.role);
  
      toast.success("Login success");
      if (data.role === 'ADMIN') {
        router.push("/pages/manage-customers/list-customers");
      } else if (data.role === 'STAFF') {
        window.location.href = "/pages/manage-customers/list-customers";
      } else {
        window.location.href = "/noAuth";
      }
    } catch (error) {
      toast.error("Incorrect Email or Password, please try again!");
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState('CapsLock')) {
      setCapsLockOn(true);
    } else {
      setCapsLockOn(false);
    }
  };
  


  return (
    <div className='flex flex-row-reverse justify-center h-screen pt-20 bg-gray-100 ' >
      
      <div className='flex justify-end w-2/3 h-3/4 backdrop-blur-md bg-[url("/bg-logins.jpg")] bg-cover bg-no-repeat rounded-2xl shadow-2xl border border-gray-300'>
        <Toaster />
        <div className=" bg-transparent justify-end items-center p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-0 text-center">Welcome to Clotheshop! 👋🏻 </h2> <br/>
          <h2 className="text-xl font-semibold mb-3 text-center"> Please sign-in to your account and start the adventure </h2>
          <div className="mb-4 mt-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <div className="flex space-x-1 space-y-0 mt-2">
              <UserOutlined/>
              
              <input
                type="email"
                id="email"
                placeholder='Type your email...'
                className={`mt-1 block w-full px-3 py-2 border-b-2 ${emailError ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            
            {emailError && (
              <div className=" bg-red-50 mt-2 rounded-lg items-center text-center"><p className="text-red-500 text-sm mt-1 transition-opacity duration-500 ease-in-out">The email format must include @gmail.com, please fill it correctly!</p></div>
              
            )}
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <div className="flex space-x-1 space-y-0 mt-1">
              <SafetyOutlined/>
              <input
                type="password"
                id="password"
                placeholder='Type your password...'
                className="mt-1 block w-full px-3 py-2 border-b-2 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={handleKeyUp}
              />
            </div>


            {capsLockOn && 
                    <div className="flex gap-2 mt-2">
                        <Image src="/warning.png" alt="warning" width={20} height={17}/>
                        <p className="text-red-500 font-semibold">Caps Lock is on!</p> 
                    </div>
          }

            <div className="flex justify-end items-end w-full mt-1">
              <a href="/auth/emailValidate" className="text-red-500 underline font-semibold mt-0">Forgot Password?</a>
            </div>
            
          </div>
          
          <div className="flex justify-center items-center w-full mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 w-1/3 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mt-6"
              onClick={handleLogin}
            >
              Login
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
