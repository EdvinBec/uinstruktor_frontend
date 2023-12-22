"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Login } from "@/lib/Services";
import Cookies from "universal-cookie";
import { Inputs } from "@/types";
import Link from "next/link";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

type LoginResponse = {
  message: string;
  status: string;
  token: string;
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const cookies = new Cookies();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    const SignIn = async () => {
      setIsLoading(true);
      const response: LoginResponse = await (
        await Login(email, password)
      ).json();

      setIsLoading(false);
      return response;
    };

    const res = await SignIn();

    if (res.token) {
      cookies.set("token", res.token);
      location.reload();
      router.refresh();
    } else {
      console.log(res);
      if (res.message === "auth/wrong-password") {
        setAuthError("Oops! Wrong password. Please try again.");
      } else if (res.message === "auth/wrong-email") {
        setAuthError("Oops! Wrong email. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-2/3 md:w-1/3 lg:w-1/4 h-auto flex flex-col gap-4"
        >
          <h1 className="text-center font-bold text-3xl mb-8">Login</h1>
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
            <Label>Password</Label>
            <Input
              defaultValue=""
              {...register("password", {
                required: "Please enter your password",
              })}
              type="password"
              id="password"
            />
            {errors.password && (
              <Label className="text-red-500">{errors.password.message}</Label>
            )}

            {errors.password?.type === "maxLength" && (
              <Label className="text-red-500">
                Please enter password that is shorter than 32 characters
              </Label>
            )}
            {authError && <Label className="text-red-500">{authError}</Label>}
          </div>

          <Button>Login</Button>
          <div className="flex items-center w-full gap-2">
            <Label>Don{"'"}t have an account yet?</Label>
            <Link
              className="text-xs font-medium text-blue-600 hover:underline"
              href="/signup"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
      {isLoading && <Spinner size={32} />}
    </>
  );
};

export default LoginPage;
