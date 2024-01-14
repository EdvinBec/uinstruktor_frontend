"use client";

import Container from "@/components/ui/Container";
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
      <UserContext.Provider value={value}>
        <Container>{children}</Container>
      </UserContext.Provider>
    </div>
  );
};

export default SignupLayout;
