"use client";

import Navbar from "@/components/Navbar";
import { Inputs } from "@/types";
import { createContext, useState } from "react";

type UserContextProps = {
  user: Inputs;
  setUser: React.Dispatch<React.SetStateAction<Inputs>>;
};

export const UserContext = createContext<UserContextProps>({
  user: {
    username: "",
    password: "",
    email: "",
    role: "",
  },
  setUser: () => {},
});

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Inputs>({
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const value = { user, setUser };

  return (
    <div className="h-screen px-4 py-2">
      <Navbar />
      <div className="h-[90%]">
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
      </div>
    </div>
  );
};

export default SignupLayout;
