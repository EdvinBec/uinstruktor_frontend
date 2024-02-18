"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

const LandingNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="p-8 flex flex-row justify-between items-center">
        <h2 className="text-3xl font-bold">uinstruktor.</h2>
        <div className="hidden lg:block self-center">
          <Button variant={"link"}>
            <Link href={""}>Produkt</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={""}>Spremembe</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={""}>O projektu</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={""}>Tečaji</Link>
          </Button>
        </div>
        <div className="lg:flex hidden flex-row items-center justify-center">
          <div
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
            className="p-1 rounded-lg flex justify-center items-center aspect-square max-w-[30px] bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
          >
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
          </div>
          <Button variant={"link"}>
            <Link href={"/login"}>Prijava</Link>
          </Button>
          <Button variant={"landing"} className="rounded-full">
            <Link href={"/login"}>Registracija</Link>
          </Button>
        </div>

        <div className="flex flex-row items-center gap-2 lg:hidden">
          <div
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
            className="p-1  rounded-lg aspect-square bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
          >
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
          </div>
          <div
            className=""
            onClick={() => {
              setIsNavOpen(!isNavOpen);
            }}
          >
            <Menu scale={25} />
          </div>
        </div>
      </div>
      {isNavOpen && (
        <div className="flex animate-fade-in flex-col space-y-2 ">
          <Button variant={"link"}>
            <Link href={""}>Produkt</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={""}>Spremembe</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={""}>O projektu</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={""}>Tečaji</Link>
          </Button>
          <div className="flex flex-row items-center justify-evenly">
            <Button variant={"landing"}>
              <Link href={"/login"}>Prijava</Link>
            </Button>
            <Button variant={"outline"}>
              <Link href={"/login"}>Registracija</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNavbar;
