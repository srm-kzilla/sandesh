import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen pl-12 sm:pl-14 md:pl-20 xl:pl-24 py-4 pr-2 sm:pr-4 md:pr-12 xl:pr-16 text-base md:text-lg">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
