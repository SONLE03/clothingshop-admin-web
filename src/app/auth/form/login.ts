"use client";

import envConfig from '@/src/config';

const loginUser = async (username: string, password: string) => {

    const envLogin = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/auth/login"
    //console.log(envLogin)
    try {
      const response = await fetch(envLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Đã xảy ra lỗi khi đăng nhập');
    }
  };
  
  export default loginUser;
  