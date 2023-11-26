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

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password, username } = data;

    setUser({
      email: email,
      password: password,
      username: username,
      role: "",
    });

    router.push("/signup/role");
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2/3 md:w-1/3 lg:w-1/4 h-auto flex flex-col gap-4"
      >
        <h1 className="text-center font-bold text-3xl mb-8">Sign up</h1>
        <div className="flex flex-col gap-2 w-full">
          <Label>Email</Label>
          <Input
            defaultValue=""
            {...register("email", {
              required: "Please enter your email adress",
            })}
            type="email"
            id="email"
          />
          {errors.email && (
            <Label className="text-red-500">{errors.email.message}</Label>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Username</Label>
          <Input
            defaultValue=""
            {...register("username", {
              required: "Please enter your username",
            })}
            type="text"
            id="username"
          />
          {errors.email && (
            <Label className="text-red-500">{errors.email.message}</Label>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Password</Label>
          <Input
            defaultValue=""
            {...register("password", {
              required: "Please enter your password",
              minLength: 8,
              maxLength: 32,
            })}
            type="password"
            id="password"
          />
          {errors.password && (
            <Label className="text-red-500">{errors.password.message}</Label>
          )}
          {errors.password?.type === "minLength" && (
            <Label className="text-red-500">
              Please enter password that is longer than 8 characters
            </Label>
          )}
          {errors.password?.type === "maxLength" && (
            <Label className="text-red-500">
              Please enter password that is shorter than 32 characters
            </Label>
          )}
        </div>
        <Button>Sign Up</Button>
        <div className="flex items-center w-full gap-2">
          <Label>Already have an account?</Label>
          <Link
            className="text-xs font-medium text-blue-600 hover:underline"
            href="/login"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
