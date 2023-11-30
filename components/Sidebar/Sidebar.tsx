import { RootState } from "@/store";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toggle } from "@/slices/SidebarStatus";
import {
  SidebarItem,
  SidebarItems,
  StudentSidebarItems,
  TeacherSidebarItems,
} from "./SidebarConfig";
import useAuth from "@/hooks/useAuth";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.SidebarStatus.isOpen);

  const dispatch = useDispatch();
  const auth = useAuth();
  const cookies = new Cookies();
  const router = useRouter();

  return (
    <div
      className={`h-full flex transition-all ease-in-out duration-150 flex-col justify-between text-white bg-black ${
        isOpen && "w-2/4"
      } ${!isOpen && "w-0 "}`}
    >
      <div>
        <div
          className={`w-full flex items-center justify-between pt-2 px-4 ${
            !isOpen && "hidden"
          }`}
        >
          <h1 className="font-bold text-xl">UInstruktor</h1>
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
          {SidebarItems.map((item: SidebarItem, itemIdx: number) => {
            return (
              <div
                key={itemIdx}
                className="w-full py-2 px-4 hover:bg-white hover:bg-opacity-5 cursor-pointer"
              >
                <Link href={item.href}>{item.label}</Link>
              </div>
            );
          })}
          {auth?.role == "teacher" &&
            TeacherSidebarItems.map((item: SidebarItem, itemIdx: number) => {
              return (
                <div
                  key={itemIdx}
                  className="w-full py-2 px-4 hover:bg-white hover:bg-opacity-5 cursor-pointer"
                >
                  <Link href={item.href}>{item.label}</Link>
                </div>
              );
            })}
          {auth?.role == "student" &&
            StudentSidebarItems.map((item: SidebarItem, itemIdx: number) => {
              return (
                <div
                  key={itemIdx}
                  className="w-full py-2 px-4 hover:bg-white hover:bg-opacity-5 cursor-pointer"
                >
                  <Link href={item.href}>{item.label}</Link>
                </div>
              );
            })}
        </div>
      </div>
      <Button
        variant="secondary"
        className="mx-4 mb-4 dark:bg-white dark:text-black dark:hover:bg-white dark:hover:opacity-80 transition-all ease-in-out duration-100"
        onClick={() => {
          cookies.remove("token");
          router.refresh();
          dispatch(toggle());
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Sidebar;
