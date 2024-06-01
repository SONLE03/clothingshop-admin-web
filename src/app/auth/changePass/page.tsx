'use client';
import React, { useState } from 'react';
import { ChangePassword } from '@/src/api/auth/ChangePassword';
import { ParseJSON } from '@/src/api/auth/ParseJSON';



const ChangePasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const email = localStorage.getItem('email');

  if (!email) {
    throw new Error('No email found');
  }

  const parseEmail = ParseJSON(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await ChangePassword(parseEmail, password, repeatPassword);
      alert('Password changed successfully');
    } catch (error) {
      setError('Error changing password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Email</label>
          <input type="text" value={email} disabled className="mb-4 w-full p-2 rounded border border-gray-300" />
          <label className="block mb-2">New Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 w-full p-2 rounded border border-gray-300" />
          <label className="block mb-2">Repeat New Password</label>
          <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} className="mb-4 w-full p-2 rounded border border-gray-300" />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="w-full p-2 rounded bg-blue-500 text-white">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;