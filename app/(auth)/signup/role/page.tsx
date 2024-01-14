"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useContext } from "react";
import { UserContext } from "../layout";
import { Signup } from "@/lib/Services";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

type SignUpResponse = {
  message: string;
  status: string;
  token: string;
};

const RolePage = () => {
  const [isRoleSet, setIsRoleSet] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);

  const cookies = new Cookies();
  const router = useRouter();

  const RegisterUser = async () => {
    {
      const response: SignUpResponse = await (
        await Signup(user.email, user.password, user.username!, user.role!)
      ).json();

      return response;
    }
  };

  const Submit = async () => {
    const res: SignUpResponse = await RegisterUser();

    if (res.token) {
      cookies.set("token", res.token);
      router.push("/explore");
    } else {
      console.log(res);
      if (res.status === "error") {
        setError("There is an issue with the server. Please try again later.");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="flex flex-col gap-2 z-20">
          <Label>Please choose your role</Label>
          <Select
            onValueChange={(e) => {
              setUser({
                username: user.username,
                email: user.email,
                password: user.password,
                role: e,
              });
              setIsRoleSet(true);
            }}
          >
            <SelectTrigger className=" dark:bg-black bg-white w-[300px] mt-2">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-black">
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>
          <Label className=" text-red-500">{error}</Label>
        </div>

        <div className="w-full flex justify-end">
          {isRoleSet && (
            <Button className="w-full z-0 mt-6" onClick={Submit}>
              Finish
            </Button>
          )}
          {!isRoleSet && (
            <Button disabled className="w-full z-0 mt-6" onClick={Submit}>
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolePage;
