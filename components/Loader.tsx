"use client";
import React from 'react';

const Loader: React.FC = () => (
  <div className="w-full h-2 bg-gray-500 rounded">
    <div className="h-full bg-green-500 rounded animate-fill"></div>
  </div>
);

export default Loader;