"use client";

import Greeting from "@/components/Greeting";
import useAuth from "@/hooks/useAuth";

const ExploreLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return (
    <div className="flex flex-col">
      <Greeting username={auth?.username!} />
      {children}
    </div>
  );
};

export default ExploreLayout;
