"use client";

import Footer from "@/components/Footer/Footer";
import Greeting from "@/components/Greeting";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import useAuth from "@/hooks/useAuth";

const ExploreLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full h-full">
        <Navbar />
        <Greeting username={auth?.username!} />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default ExploreLayout;
