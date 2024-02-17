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
import { usePathname, useRouter } from "next/navigation";

//Redux
import UserMenu from "@/components/ui/user-menu";
import { Label } from "../ui/label";
import Link from "next/link";
import { useState } from "react";
import NavbarDrawer from "./NavbarDrawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { ApiResponse } from "@/types";
import { joinNewClass } from "@/lib/class";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

const Navbar = () => {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [code, setCode] = useState("");

  return (
    <nav className="w-full lg:min-w-[1100px] mb-2">
      <div className="w-full py-2 flex items-center justify-between">
        <Link href={"/explore"} className="flex gap-3 items-center lg:w-1/6">
          <Bot size={32} />
          <Label className="font-bold text-xl mt-1 cursor-pointer">
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
                if (item.label === "Join new classroom") {
                  const LucideIcon = item.icon;
                  return (
                    <Dialog key={itemIdx}>
                      <DialogTrigger>
                        <Button className="bg-[#000] text-white dark:text-black text-sm font-medium tracking-wide p-0 flex gap-2 h-auto dark:bg-[#f6fff8] py-2 px-4 rounded-2xl hover:opacity-80 transition-all ease-in-out duration-150">
                          <LucideIcon
                            className="text-white dark:text-black"
                            size={18}
                          />
                          {item.label}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-black text-white">
                        <DialogHeader>
                          <DialogTitle>Join classroom</DialogTitle>
                          <DialogDescription>
                            To join the classroom, please enter the code, that
                            {"'"}s been provided by your profesor.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Code
                            </Label>
                            <Input
                              id="name"
                              placeholder="xxxxxx"
                              className="col-span-3 text-black dark:text-white"
                              onChange={(e) => setCode(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={async () => {
                              const res: ApiResponse<{}> = await joinNewClass(
                                code,
                                auth?.username!,
                              );

                              if (res.status !== "error") {
                                toast({
                                  title: "Joined new class.",
                                  action: (
                                    <ToastAction altText="Okay">
                                      Okay
                                    </ToastAction>
                                  ),
                                });
                                setTimeout(() => {
                                  router.push("/class");
                                }, 1500);
                              } else {
                                toast({
                                  title: "Incorrect code. Try again",
                                  action: (
                                    <ToastAction altText="Okay.">
                                      Okay
                                    </ToastAction>
                                  ),
                                });
                              }
                            }}
                            type="submit"
                          >
                            Join
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  );
                } else {
                  return (
                    <NavbarButton
                      key={itemIdx}
                      href={item.href}
                      label={item.label}
                      isActive={pathname == item.href}
                      icon={item.icon}
                    />
                  );
                }
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
