"use client";

import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/ui/Container";

const ClassLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <Container>
        <Navbar />
        {children}
      </Container>
    </div>
  );
};

export default ClassLayout;
