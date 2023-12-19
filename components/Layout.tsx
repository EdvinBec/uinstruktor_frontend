"use client";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.SidebarStatus.isOpen,
  );

  return (
    <div className="flex overflow-hidden min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden items-center">
        <Navbar />
        <div
          className={`overflow-x-hidden overflow-y-auto transition-all h-full w-full ${
            isSidebarOpen && "w-[250%] ml-[90%]"
          }`}
        >
          <div className="px-8">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
