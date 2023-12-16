"use client";

import * as React from "react";
import { Cog, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "../SignOutButton";

function UserMenu() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=" aspect-square" variant="outline">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row items-center justify-between">
          <Moon />
          <Switch
            onCheckedChange={(property) => {
              setTheme((property && "light") || "dark");
            }}
            checked={theme === "light" ? true : false}
          />
          <Sun />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutButton variant="secondary" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserMenu;
