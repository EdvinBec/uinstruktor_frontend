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
import Spinner from "@/components/ui/Spinner";

type SignUpResponse = {
  message: string;
  status: string;
  token: string;
};

const RolePage = () => {
  const [isRoleSet, setIsRoleSet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);

  const cookies = new Cookies();
  const router = useRouter();

  const RegisterUser = async () => {
    {
      setIsLoading(true);
      const response: SignUpResponse = await (
        await Signup(user.email, user.password, user.username!, user.role!)
      ).json();

      setIsLoading(false);
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
    <>
      <div className="flex justify-center items-center h-full">
        <div className="w-2/3 md:w-1/3 lg:w-1/4 h-auto flex flex-col gap-4">
          <h1 className="text-center font-bold text-3xl mb-8">
            Choose your role
          </h1>
          <div className="flex flex-col gap-2 z-20">
            <Label>I am a...</Label>
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
              <SelectTrigger className="w-full dark:bg-black bg-white">
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
              <Button className="w-full z-0" onClick={Submit}>
                Finish
              </Button>
            )}
            {!isRoleSet && (
              <Button disabled className="w-full z-0" onClick={Submit}>
                Finish
              </Button>
            )}
          </div>
        </div>
      </div>
      {isLoading && <Spinner size={32} />}
    </>
  );
};

export default RolePage;
