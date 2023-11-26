"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const cookies = new Cookies();
  const auth = useAuth();
  const router = useRouter();

  return (
    <nav className="w-full flex justify-between">
      <h1 className=" font-semibold text-xl tracking-wide">UInstruktor</h1>
      <div className="flex items-center gap-2">
        {auth?.token && (
          <Button
            onClick={() => {
              cookies.remove("token");
              router.refresh();
            }}
          >
            Sign out
          </Button>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
