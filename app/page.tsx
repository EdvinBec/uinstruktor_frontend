"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth?.isValid === false) {
      router.push("/login");
    }
  }, [auth?.isValid, router]);

  return (
    <div>
      {auth?.token && "you are logged in"}
      {!auth?.token && "uinstruktor"}
    </div>
  );
}
