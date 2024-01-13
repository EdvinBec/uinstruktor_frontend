"use client";

import Greeting from "@/components/Greeting";
import DefaultLayout from "@/components/Layout";
import useAuth from "@/hooks/useAuth";

const ExploreLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return (
    <div className="flex flex-col h-full">
      <DefaultLayout>
        <Greeting username={auth?.username!} />
        {children}
      </DefaultLayout>
    </div>
  );
};

export default ExploreLayout;
