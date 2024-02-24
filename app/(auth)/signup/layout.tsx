"use client";

import Container from "@/components/ui/Container";
import { Inputs } from "@/types";
import { useState } from "react";

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen px-4 py-2">
      <Container>{children}</Container>
    </div>
  );
};

export default SignupLayout;
