"use client";

//UI Components
import SignOutButton from "../SignOutButton";
import {
  SidebarItem,
  SidebarItems,
  StudentSidebarItems,
  TeacherSidebarItems,
} from "../Sidebar/SidebarConfig";
import NavbarButton from "./NavbarButton";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { Bot, Menu } from "lucide-react";

//Hooks
import useAuth from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/slices/SidebarStatus";
import { RootState } from "@/store";

const Navbar = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.SidebarStatus.isOpen
  );

  const auth = useAuth();
  const dispatch = useDispatch();
  const pathname = usePathname();

  return (
    <nav className={`w-full flex items-center px-4 py-2 justify-between`}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Bot size={32} className="mb-1" />
          <h1 className="hidden md:block font-semibold text-xl tracking-wide">
            UInstruktor
          </h1>
        </div>
        <div>
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
          <div className="hidden md:flex">
            {SidebarItems.map((item: SidebarItem, itemIdx: number) => {
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
            {auth?.role == "teacher" &&
              TeacherSidebarItems.map((item: SidebarItem, itemIdx: number) => {
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
            {auth?.role == "student" &&
              StudentSidebarItems.map((item: SidebarItem, itemIdx: number) => {
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
        </div>
      </div>
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
