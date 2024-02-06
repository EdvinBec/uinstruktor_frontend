"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

const LandingNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

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
        <div className="hidden lg:block">
          <Button variant={"link"}>
            <Link href={"/login"}>Prijava</Link>
          </Button>
          <Button variant={"landing"} className="rounded-full">
            <Link href={"/login"} >Registracija</Link>
          </Button>
        </div>
        <div
          className="lg:hidden block"
          onClick={() => {
            setIsNavOpen(!isNavOpen);
          }}
        >
          <Menu scale={25} />
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
            <Button variant={'landing'}>
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
