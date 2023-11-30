"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { useState } from "react";

import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { Loader, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/slices/SidebarStatus";
import { RootState } from "@/store";
import SignOutButton from "./SignOutButton";

const Navbar = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.SidebarStatus.isOpen
  );

  const auth = useAuth();
  const dispatch = useDispatch();

  return (
    <nav className={`w-full flex items-center px-4 py-2 justify-between`}>
      <h1 className="hidden md:block font-semibold text-xl tracking-wide">
        UInstruktor
      </h1>
      <Button
        className={`flex justify-center items-center md:hidden`}
        size="icon"
        disabled={isSidebarOpen && true}
        variant="outline"
        onClick={() => {
          dispatch(toggle());
        }}
      >
        <Menu size={20} />
      </Button>
      <div className="flex items-center gap-2 ">
        <div className="hidden md:block">
          {auth?.token && (
            <>
              <SignOutButton />
            </>
          )}
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
