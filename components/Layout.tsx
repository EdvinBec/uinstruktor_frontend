"use client";

import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden items-center">
        <Navbar />
        <div className="overflow-x-hidden overflow-y-auto w-full h-full">
          <div className="px-8">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
