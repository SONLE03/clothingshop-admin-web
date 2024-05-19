"use client";

import { SafetyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import Image from "next/image";
import { useRef, useState } from "react";
import axios from "axios";
import { cookies, headers } from "next/headers";
import { error } from "console";
import envConfig from "@/src/config";
//import { useRouter } from "next/router";
//import { signIn } from "next-auth/react";
import loginUser from "../form/login";
import { useRouter } from "next/router";





export default function Login()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [capsLockOn, setCapsLockOn] = useState(false);
    //const [error, setError] = useState('');

    //const router = useRouter();

    //const userName = useRef ("");
    //const pass = useRef("");
    //const onSubmit = async () => {
    //  const result = await signIn("credentials", {
    //    username: userName.current,
    //    password: pass.current,
    //    redirect: true,
    //    callbackUrl: "/"
    //    
    //  })
    //}

    //const envLogin = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/auth/login"
    //console.log(envLogin)
    

    //const { toast } = useToast()
    
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState('CapsLock')) {
        setCapsLockOn(true);
      } else {
        setCapsLockOn(false);
      }
    };
    

    const parseMaxAge = (maxAge: string) => {
      const regex = /PT(\d+)H/;
      const matches = maxAge.match(regex);
      if (matches && matches.length === 2) {
        const hours = parseInt(matches[1]);
        return hours * 60 * 60; // Chuyển đổi thành giây
      }
      return 0;
    };
    

    /*const handleLogin = () => {
      let data = JSON.stringify({
        username,
        password,
      });
      

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: envLogin,
        headers: { 
          'Content-Type': 'application/json'

        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const { access_cookie, refresh_cookie } = response.data;
        //console.log(access_cookie.maxAge);
        //document.cookie = `${refresh_cookie.name}=${refresh_cookie.value}; max-age=${refresh_cookie.maxAge}; path=${refresh_cookie.path}; secure=${refresh_cookie.secure}; httpOnly=${refresh_cookie.httpOnly}`;
        const maxAgeAccess = parseMaxAge(access_cookie.maxAge)
        const maxAgeRefresh = parseMaxAge(refresh_cookie.maxAge)

      })
      .catch((error) => {
        toast ({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Wrong email or password",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        
      });

          

    }*/

    const handleLogin = async () => {
      try {
        const data = await loginUser(username, password);
        localStorage.setItem('access_token', data.access_cookie.value);
        localStorage.setItem('refresh_token', data.refresh_cookie.value);
        console.log(localStorage.getItem('access_token'))

        window.location.href = "/";
        
      } catch {
        throw new Error('Đã xảy ra lỗi khi đăng nhập');
      }
    };

    


    return (
        <div className="py-12">
            <div className ="grid grid-cols-3 gap-4">
            <Card className="col-start-2 mt-20 bg-white shadow-xl h-96">
                <h1 className=" text-center text-xl font-bold text-blue-500">Sign in</h1>
                <h2 className=" text-center font-semibold mt-1">Welcome back!</h2>

                <div className="mt-4">
                    <Input 
                        className="focus:placeholder-transparent mt-4" 
                        value={username} 
                        onChange={(val) => setUsername(val.target.value)} 
                        size="large" placeholder="Username" 
                        type="username" 
                        prefix={<UserOutlined />} 
                    />
                    <Input.Password 
                        className="focus:placeholder-transparent mt-9" 
                        value={password} 
                        onChange={(val) => setPassword(val.target.value)} 
                        size="large" placeholder="Password" type="password" 
                        prefix={<SafetyOutlined />}
                        onKeyUp={handleKeyUp}
                    />

                    
                </div>

                {capsLockOn && 
                    <div className="flex gap-2 mt-2">
                        <Image src="/warning.png" alt="warning" width={20} height={20}/>
                        <p className="text-red-500 font-semibold">Caps Lock is on!</p> 
                    </div>}

                <div className="flex justify-center items-center mt-9">
                    <Button onClick={handleLogin} type="primary" style={{width: "100%"}} >Log in</Button>
                </div>
            </Card>  
            </div>
        </div>
    )
}

