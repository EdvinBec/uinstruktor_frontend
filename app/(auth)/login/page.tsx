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
import GoogleLogo from "@/assets/img/GoogleLogo.svg";
import LoginImage from "@/assets/img/loginImage.jpg";
import Image from "next/image";

type LoginResponse = {
  message: string;
  status: string;
  token: string;
};

const LoginPage = () => {
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const cookies = new Cookies();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    setIsLoading(true);

    const SignIn = async () => {
      const response: LoginResponse = await (
        await Login(email, password)
      ).json();

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
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="w-full h-full absolute flex items-center justify-center bg-black bg-opacity-50">
          <Spinner size={32} />
        </div>
      )}
      <div className="flex w-full py-20 items-center justify-center">
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex justify-center lg:block"
          >
            <div className="flex w-[300px] md:w-[450px] flex-col gap-8 items-start">
              <div className="w-full mb-1">
                <h1 className="font-bold text-3xl mb-2">Dobrodošli nazaj!</h1>
                <Label className="text-sm font-light tracking-wide opacity-80">
                  Vnesite svoj e-naslov in geslo da se vpišete v svoj
                  uinstruktor račun.
                </Label>
              </div>
              <div>
                <div>
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
                    <Label className="text-red-500">
                      {errors.email.message}
                    </Label>
                  )}
                </div>
                <div className="mt-6">
                  <Label>Geslo</Label>
                  <Input
                    {...register("password", {
                      required: "Please enter your password",
                    })}
                    type="password"
                    className="w-[300px] md:w-[450px] mt-2"
                  ></Input>
                  {errors.password && (
                    <Label className="text-red-500">
                      {errors.password.message}
                    </Label>
                  )}
                  {}
                </div>
                <Button className="w-[300px] md:w-[450px] mt-6" type="submit">
                  Prijavi se
                </Button>
                {authError && (
                  <Label className="text-red-500">{authError}</Label>
                )}
              </div>
            </div>
          </form>
          <div className="w-full flex flex-col md:flex-row justify-between mt-4">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-light tracking-wide opacity-75">
                Nimate še računa?
              </Label>
              <Button variant="link" className="px-0 text-xs">
                <Link href="/signup">Ustvari račun</Link>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="link" className="px-0 py-0 text-xs">
                Pozabili ste geslo?
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
