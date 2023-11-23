"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Login } from "@/lib/AuthService";
import Cookies from "universal-cookie";

type Inputs = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  status: string;
  token: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const cookies = new Cookies();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    const res: LoginResponse = await (await Login(email, password)).json();

    if (res.token) {
      cookies.set("token", res.token);
      router.push("/explore");
    } else {
      console.log(res);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
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
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
