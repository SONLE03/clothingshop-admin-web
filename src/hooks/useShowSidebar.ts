"use client";
import { useRouter } from 'next/router';

export const useShowSidebar = (hiddenPaths: string[]): boolean => {
  const router = useRouter();
  return !hiddenPaths.includes(router.pathname);
};


