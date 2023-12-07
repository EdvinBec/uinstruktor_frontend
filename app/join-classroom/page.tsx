"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { joinNewClass } from "@/lib/class";
import { decryptAuthToken } from "@/lib/auth";
import { cookies } from "next/headers";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
  classCode: z.string().min(8).max(10),
});

const JoinPage = () => {
  const [error, setError] = useState<string>();
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>();

  const onSubmit: SubmitHandler<{ code: string }> = async (data) => {
    const { code } = data;
    console.log(code);

    const res = await joinNewClass(code, auth?.username!);
    console.log(res);
  };

  return (
    <div className="h-full grid items-center justify-center">
      <div className="space-y-4 w-full">
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.code && <Label className="text-red-500">Invalid code</Label>}
          <Label htmlFor="code">Code:</Label>
          <Input
            {...register("code", {
              required: "Please enter the join code",
              pattern: /[A-Za-z0-9]+-[A-Za-z0-9]+/,
            })}
            id="code"
          />

          <Button className="w-full" type="submit">
            Join
          </Button>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
