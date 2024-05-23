"use client";
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const CustomButton: React.FC<ButtonProps> = ({ children, onClick, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded ${disabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white ${className}`}
  >
    {children}
  </button>
);

export default CustomButton;