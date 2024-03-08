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
import { Menu } from "lucide-react";

//Hooks
import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

//Redux
import UserMenu from "@/components/ui/user-menu";
import { Label } from "../ui/label";
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
import Logo from "../Logo";

const Navbar = () => {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [code, setCode] = useState("");

  return (
    <nav className="w-full lg:min-w-[1100px] mb-2 border-[1px] border-t-0 border-gray-200 dark:border-0 px-4 py-2 rounded-b-md bg-white dark:bg-black">
      <div className="w-full py-2 flex items-center justify-between">
        <Logo />
        <div className="lg:flex gap-4 hidden">
          <div
            className={`gap-2 md:gap-4 flex ${
              pathname === "/login" && "hidden"
            } ${pathname === "/signup" && "hidden"}`}
          >
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
          <div
            className={`gap-4 hidden ${auth?.permissions?.isTeacher && "flex"}`}
          >
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
          {!auth?.permissions?.isTeacher && auth?.token && (
            <div className="gap-4 flex">
              {StudentNavbarItems.map((item: NavbarItem, itemIdx: number) => {
                if (item.label === "Pridruži se učilnici") {
                  const LucideIcon = item.icon;
                  return (
                    <Dialog key={itemIdx}>
                      <DialogTrigger>
                        <Button className="bg-[#2B44E7] hover:bg-blue-500 dark:bg-[#2B44E7] dark:hover:bg-blue-500 text-white dark:text-white text-sm font-medium tracking-wide p-0 flex gap-2 h-auto py-2 px-4 rounded-2xl hover:opacity-80 transition-all ease-in-out duration-150">
                          <LucideIcon className="text-white" size={18} />
                          {item.label}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black ">
                        <DialogHeader>
                          <DialogTitle>Pridruži se učilnici</DialogTitle>
                          <DialogDescription>
                            Da se pridružiš učilnici, vpiši kodo učilnice, ki si
                            jo dobil od svojega učitelja.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Koda
                            </Label>
                            <Input
                              id="name"
                              placeholder="xxxx-xxxx"
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
                                  title: "Pridružil si se razredu..",
                                  action: (
                                    <ToastAction altText="Okay">
                                      Okej
                                    </ToastAction>
                                  ),
                                });
                                setTimeout(() => {
                                  router.push("/class");
                                }, 1500);
                              } else {
                                toast({
                                  title: "Napačna koda. Poskusi še enkrat.",
                                  action: (
                                    <ToastAction altText="Okay.">
                                      Okej
                                    </ToastAction>
                                  ),
                                });
                              }
                            }}
                            type="submit"
                          >
                            Pridruži se
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
      {isNavOpen && <NavbarDrawer permissions={auth?.permissions!} />}
    </nav>
  );
};

export default Navbar;
