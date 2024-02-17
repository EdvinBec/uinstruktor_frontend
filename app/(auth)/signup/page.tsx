"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Inputs } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "./layout";
import Image from "next/image";
import LoginImage from "@/assets/img/loginImage.jpg";
import GoogleLogo from "@/assets/img/GoogleLogo.svg";
import { Checkbox } from "@/components/ui/checkbox";
import { Signup } from "@/lib/Services";
import Cookies from "universal-cookie";

type SignUpResponse = {
  message: string;
  status: string;
  token: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const cookies = new Cookies();
  const { user, setUser } = useContext(UserContext);
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password, username, repeatPassword } = data;

    if (password !== repeatPassword) {
      setAuthError("Passwords don't match. Please enter them again.");
    } else {
      if (!isChecked) {
        setAuthError("You have to accept the terms and conditions.");
      } else {
        setUser({
          email: email,
          password: password,
          username: username,
          role: "",
        });

        const res: SignUpResponse = await RegisterUser();
        console.log(res);
        if (res.token) {
          setAuthMessage("You have successfully registered. Redirecting...");
          cookies.set("token", res.token);
          router.push("/explore");
        } else {
          if (res.status === "error") {
            // setError("There is an issue with the server. Please try again later.");
            console.log(
              "There is an issue with the server. Please try again later.",
            );
          }
        }
      }
    }
  };

  const RegisterUser = async () => {
    {
      const response: SignUpResponse = await (
        await Signup(user.email, user.password, user.username!, user.role!)
      ).json();

      return response;
    }
  };

  return (
    <div className="flex gap-16 h-screen items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center lg:block"
      >
        <div className="flex w-[300px] md:w-[450px] flex-col gap-8 items-start">
          <div>
            <div className="w-full mb-8">
              <h1 className="font-bold text-3xl mb-2">Get Started Now</h1>
              <Label className="text-sm font-light tracking-wide opacity-80">
                Welcome to our platform, create account to start your journey.
              </Label>
            </div>
            <Button variant="secondary">
              <Image
                className="text-white mr-2"
                src={GoogleLogo}
                alt="googleLogo"
              />
              Sign up with Google
            </Button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-300">
              {authMessage}
            </h2>
            <div>
              <Label>Username</Label>
              <Input
                defaultValue=""
                {...register("username", {
                  required: "Please enter your username",
                })}
                type="text"
                className="w-[300px] md:w-[450px] mt-2"
              ></Input>
              {errors.username && (
                <Label className="text-red-500">
                  {errors.username.message}
                </Label>
              )}
            </div>
            <div className="mt-6">
              <Label>Email</Label>
              <Input
                defaultValue=""
                {...register("email", {
                  required: "Please enter your email adress",
                })}
                type="email"
                className="w-[300px] md:w-[450px] mt-2"
              ></Input>
              {errors.email && (
                <Label className="text-red-500">{errors.email.message}</Label>
              )}
            </div>
            <div className="flex gap-4">
              <div className="mt-6">
                <Label>Password</Label>
                <Input
                  {...register("password", {
                    required: "Please enter your password",
                  })}
                  type="password"
                  className="w-[142px] md:w-[217px] mt-2"
                ></Input>
                {errors.password && (
                  <Label className="text-red-500">
                    {errors.password.message}
                  </Label>
                )}
                {}
              </div>
              <div className="mt-6">
                <Label>Repeat password</Label>
                <Input
                  {...register("repeatPassword", {
                    required: "Please repeat your password",
                  })}
                  type="password"
                  className="w-[142px] md:w-[216px] mt-2"
                ></Input>
                {errors.password && (
                  <Label className="text-red-500">
                    {errors.password.message}
                  </Label>
                )}
                {}
              </div>
            </div>
            <Label className="text-red-500">{authError}</Label>
            <div className="flex items-center space-x-2 mt-6">
              <Checkbox
                id="terms"
                onClick={() => {
                  if (!isChecked) {
                    setIsChecked(true);
                  } else {
                    setIsChecked(false);
                  }
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept{" "}
                <Button variant="link" className="p-0">
                  <Link href="/terms"> terms and conditions</Link>
                </Button>
              </label>
            </div>
            <Button className="w-[300px] md:w-[450px] mt-6">Sign up</Button>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-light tracking-wide opacity-75">
                Already have an account?
              </Label>
              <Button variant="link" className="px-0 text-xs">
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div className="w-full h-full items-center justify-center hidden lg:flex">
        <Image
          src={LoginImage}
          className="h-[85%] w-auto rounded-lg"
          alt="uinstruktor-male-with-glasses"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
