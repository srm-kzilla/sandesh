import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen pl-32 pr-4 py-4">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
