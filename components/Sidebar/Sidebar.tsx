//Redux
import { toggle } from "@/slices/SidebarStatus";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

//UI Components
import { Button } from "../ui/button";
import SidebarButton from "./SidebarButton";

//Icons
import { Bot, X } from "lucide-react";

//Hooks
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

//Other
import {
  SidebarItem,
  SidebarItems,
  StudentSidebarItems,
  TeacherSidebarItems,
} from "./SidebarConfig";
import Cookies from "universal-cookie";
import SignOutButton from "../SignOutButton";

const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.SidebarStatus.isOpen);

  const dispatch = useDispatch();
  const auth = useAuth();
  const router = useRouter();

  const cookies = new Cookies();

  return (
    <div
      className={`h-full flex transition-all ease-in-out duration-150 flex-col justify-between text-white bg-black ${
        isOpen && "w-2/4"
      } ${!isOpen && "w-0 "}`}
    >
      <div className={`${!isOpen && "hidden"}`}>
        <div className={`w-full flex items-center justify-between pt-2 px-4`}>
          <div className="flex items-center gap-2">
            <Bot />
            <h1 className="text-sm font-bold mt-1">UInstruktor</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              dispatch(toggle());
            }}
          >
            <X size={18} />
          </Button>
        </div>
        <div className={`mt-8 ${!isOpen && "hidden"}`}>
          <div>
            <h1 className="ml-4 text-sm tracking-wide font-medium">Overview</h1>
            {SidebarItems.map((item: SidebarItem, itemIdx: number) => {
              return (
                <SidebarButton
                  key={itemIdx}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                />
              );
            })}
          </div>
          {auth?.role == "teacher" &&
            TeacherSidebarItems.map((item: SidebarItem, itemIdx: number) => {
              return (
                <SidebarButton
                  key={itemIdx}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                />
              );
            })}
          <div>
            <h1 className="ml-4 mt-4 text-sm tracking-wide font-medium">
              Student
            </h1>
            {auth?.role == "student" &&
              StudentSidebarItems.map((item: SidebarItem, itemIdx: number) => {
                return (
                  <SidebarButton
                    key={itemIdx}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <SignOutButton
        variant="secondary"
        classname={`${
          !isOpen && "hidden"
        } mx-4 mb-4 dark:bg-white dark:text-black dark:hover:bg-white dark:hover:opacity-80 transition-all ease-in-out duration-100`}
      />
    </div>
  );
};

export default Sidebar;
