import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen md:pl-24 pl-16 pr-4 py-4">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
