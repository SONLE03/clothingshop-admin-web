"use client";
import React from 'react';

interface InputProps {
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CustomInput: React.FC<InputProps> = ({ type, value, placeholder, onChange, className }) => (
  <input
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className={`p-2 border rounded bg-white ${className}`}
  />
);

export default CustomInput;