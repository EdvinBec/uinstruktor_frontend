"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Inputs } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password, username, repeatPassword } = data;

    console.log(email, password, username);

    if (password !== repeatPassword) {
      setAuthError("Passwords don't match. Please enter them again.");
    } else {
      if (!isChecked) {
        setAuthError("You have to accept the terms and conditions.");
      } else {
        setUser({
          email: email,
          password: password,
          username: username!,
        });

        const res: SignUpResponse = await RegisterUser({
          email,
          password,
          username,
        });
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

  const RegisterUser = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username?: string;
  }) => {
    {
      const response: SignUpResponse = await (
        await Signup(email, password, username!)
      ).json();

      return response;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex justify-center py-8"
    >
      <div className="flex w-[300px] md:w-[450px] flex-col gap-8 items-start">
        <div className="w-full">
          <h1 className="font-bold text-3xl mb-2">Začni zdaj!</h1>
          <Label className="text-sm font-light tracking-wide opacity-80">
            Dobrodošli na našo platformo, ustvari račun in začni svojo avanturo!
          </Label>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-blue-300">
            {authMessage}
          </h2>
          <div>
            <Label>Uporabniško ime</Label>
            <Input
              defaultValue=""
              {...register("username", {
                required: "Prosim vnesite uporabniško ime",
              })}
              type="text"
              className="w-[300px] md:w-[450px] mt-2"
            ></Input>
            {errors.username && (
              <Label className="text-red-500">{errors.username.message}</Label>
            )}
          </div>
          <div className="mt-6">
            <Label>Email</Label>
            <Input
              defaultValue=""
              {...register("email", {
                required: "Prosim vnesite vaš e-naslov",
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
              <Label>Geslo</Label>
              <Input
                {...register("password", {
                  required: "Prosim vnesite geslo",
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
              <Label>Ponovi geslo</Label>
              <Input
                {...register("repeatPassword", {
                  required: "Prosim ponovno vnesite svoje geslo",
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
              Sprejmi{" "}
              <Button variant="link" className="p-0">
                <Link href="/terms">pogoje zasebnosti</Link>
              </Button>
            </label>
          </div>
          <Button className="w-[300px] md:w-[450px] mt-6">Ustvari račun</Button>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-xs font-light tracking-wide opacity-75">
              Že imate račun?
            </Label>
            <Button variant="link" className="px-0 text-xs">
              <Link href="/login">Prijavi se</Link>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpPage;
