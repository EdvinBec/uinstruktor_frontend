"use client";

import useAuth from "@/hooks/useAuth";

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      {auth?.token && "you are logged in"}
      {!auth?.token && "uinstruktor"}
    </div>
  );
}
