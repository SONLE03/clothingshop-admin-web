"use client";

import React, { useState } from 'react';
import CustomInput from '@/src/components/customUI/CustomInput';
import CustomButton from '@/src/components/customUI/CustomButton';
import CustomToast from '@/components/CustomToast';
import Loader from '@/components/Loader';

import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import { Import } from 'lucide-react';

import { SendOtp } from '@/src/api/auth/SendEmail';
import { VerifyOtp } from '@/src/api/auth/VerifyOTP';



const EmailValidate: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSending, setIsSending] = useState(false);
  //const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) && email.endsWith('@gmail.com');
  };

  const handleSendOtp = async () => {
    if (!validateEmail(email)) {
      setEmailError('Email must contain tag @gmail.com, pls fill it');
      return;
    }

    setIsSending(true);

    try {
      
      await SendOtp(email);
      //setToast({ message: 'Đã gửi OTP, vui lòng kiểm tra email!', type: 'success' });
      toast.success('Đã gửi OTP, vui lòng kiểm tra email!');
      setShowOtpInput(true);
    } catch (error) {
      //setToast({ message: 'Email bạn nhập không tồn tại', type: 'error' });
      toast.error('Email bạn nhập không tồn tại!')
      setIsSending(false);
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await VerifyOtp(otp, email);
      //setToast({ message: 'Correct OTP, you will be redirected to Change Password page', type: 'success' });
      toast.success('Correct OTP, you will be redirected to Change Password page')
      setTimeout(() => {
        // Redirect to forgotPass page
        window.location.href = '/forgotPass';
      }, 1500);
    } catch (error) {
      //setToast({ message: 'OTP không hợp lệ', type: 'error' });
      toast.error('OTP không khớp')
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Toaster/>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Email Validation</h1>
        <div className="mb-4">
          <Input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleEmailChange}
            className={`w-full ${emailError ? 'border-red-500 bg-red-100' : 'border-gray-300'}`}
          />
          {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
        </div>
        {showOtpInput && (
          <div className="mb-4">
            <Input
              type="text"
              value={otp}
              placeholder="Enter OTP"
              onChange={handleOtpChange}
              className="w-full border-gray-300"
            />
          </div>
        )}
        <div className="flex justify-between items-center">
          {!showOtpInput && (
            <Button onClick={handleSendOtp} disabled={isSending}>
              Send OTP
            </Button>
          )}
          {showOtpInput && (
            <>
              <Button onClick={handleSendOtp} disabled={true} className="mr-2">
                Send OTP
              </Button>
              <Button onClick={handleSendOtp} className="bg-red-500">
                Send again
              </Button>
              <Button onClick={handleVerifyOtp} className="ml-2">
                Verify OTP
              </Button>
            </>
          )}
        </div>
        {isSending && <Loader />}
      </div>
      
    </div>
  );
};

export default EmailValidate;