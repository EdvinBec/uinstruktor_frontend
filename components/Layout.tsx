"use client";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { Toaster } from "./ui/sonner";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex overflow-hidden h-dvh">
        <div className="flex-1 flex flex-col h-screen overflow-hidden items-center">
          <Navbar />
          <div
            className={`overflow-x-hidden overflow-y-auto transition-all h-full w-full`}
          >
            <div className="px-8">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default DefaultLayout;
