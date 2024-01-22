"use client";

import * as React from "react";
import { Cog, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";

import Avatar from "@/components/ui/Avatar";
import { Switch } from "@/components/ui/switch";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "../SignOutButton";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

function UserMenu() {
  const { setTheme, theme } = useTheme();
  const auth = useAuth();
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {auth?.profilePic ? (
          <Avatar src={`${baseURL}/${auth?.profilePic}`} />
        ) : (
          <Avatar src={undefined} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="px-4 py-2">
        <DropdownMenuItem className="flex gap-4 items-center justify-between">
          <Moon />
          <Switch
            onCheckedChange={(property) => {
              setTheme((property && "light") || "dark");
            }}
            checked={theme === "light" ? true : false}
          />
          <Sun />
        </DropdownMenuItem>
        <DropdownMenuItem className="text-start">
          <Link href={`/user/${auth?.username}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/settings`}>Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-start">
          <SignOutButton classname="m-0 text-start" variant="default" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserMenu;
