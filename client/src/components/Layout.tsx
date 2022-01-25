import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  background?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

const Layout = (props: LayoutProps) => {
  return (
    <div className="min-h-screen pl-12 sm:pl-14 md:pl-20 xl:pl-24 py-4 pr-2 sm:pr-4 md:pr-12 xl:pr-16 text-base md:text-lg ">
      <Sidebar />
      {props.children}
      <div className=" bottom-0 right-0 w-full md:w-1/4 -z-10 fixed">
        {props.background != undefined ? <props.background /> : ''}
      </div>
    </div>
  );
};

export default Layout;
