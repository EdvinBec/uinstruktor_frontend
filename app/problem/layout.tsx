'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Provider } from 'react-redux';
import { store } from '@/store';
import ReduxProvider from '@/lib/redux-provider';

import Navbar from '@/components/ui/Navbar';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-screen overflow-hidden px-4 py-2">{children}</div>;
};

export default LoginLayout;