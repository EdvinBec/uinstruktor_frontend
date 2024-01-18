"use client";

//UI Components
import {
  NavbarItem,
  NavbarItems,
  StudentNavbarItems,
  TeacherNavbarItems,
} from "./NavbarConfig";
import NavbarButton from "./NavbarButton";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { Bot, Menu } from "lucide-react";

//Hooks
import useAuth from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

//Redux
import UserMenu from "@/components/ui/user-menu";
import { Label } from "../ui/label";
import Link from "next/link";
import { useState } from "react";
import NavbarDrawer from "./NavbarDrawer";

const Navbar = () => {
  const auth = useAuth();
  const pathname = usePathname();

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="w-full mb-2">
      <div className="w-full py-2 flex items-center justify-between">
        <Link href={"/explore"} className="flex gap-3 items-center lg:w-1/6">
          <Bot size={32} />
          <Label className="font-bold text-xl mt-[4px] cursor-pointer">
            UInstruktor
          </Label>
        </Link>
        <div className="lg:flex gap-4 hidden">
          <div className="gap-4 flex">
            {NavbarItems.map((item: NavbarItem, itemIdx: number) => {
              return (
                <NavbarButton
                  key={itemIdx}
                  href={item.href}
                  label={item.label}
                  isActive={pathname == item.href}
                  icon={item.icon}
                />
              );
            })}
          </div>
          {auth?.role === "teacher" && (
            <div className="gap-4 flex">
              {TeacherNavbarItems.map((item: NavbarItem, itemIdx: number) => {
                return (
                  <NavbarButton
                    key={itemIdx}
                    href={item.href}
                    label={item.label}
                    isActive={pathname == item.href}
                    icon={item.icon}
                  />
                );
              })}
            </div>
          )}
          {auth?.role == "student" && (
            <div className="gap-4 flex">
              {StudentNavbarItems.map((item: NavbarItem, itemIdx: number) => {
                return (
                  <NavbarButton
                    key={itemIdx}
                    href={item.href}
                    label={item.label}
                    isActive={pathname == item.href}
                    icon={item.icon}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 lg:w-1/6">
          <Button
            className={`flex justify-center items-center lg:hidden`}
            size="icon"
            variant="outline"
            onClick={() => {
              if (!isNavOpen) {
                setIsNavOpen(true);
              } else {
                setIsNavOpen(false);
              }
            }}
          >
            <Menu size={20} />
          </Button>
          <div className="flex items-center gap-2">
            {auth?.token ? <UserMenu /> : <ModeToggle />}
          </div>
        </div>
      </div>
      {isNavOpen && <NavbarDrawer role={auth?.role!} />}
    </nav>
  );
};

export default Navbar;
