"use client";

import Greeting from "@/components/Greeting";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import useAuth from "@/hooks/useAuth";

const ExploreLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full h-screen px-4">
        <Navbar />
        <Greeting username={auth?.username!} />
        {children}
      </div>
    </div>
  );
};

export default ExploreLayout;
