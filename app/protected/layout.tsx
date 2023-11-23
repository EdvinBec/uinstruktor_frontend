"use client";

import { Button } from "@/components/ui/button";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const cookies = new Cookies();
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <nav>
        <Button
          onClick={() => {
            cookies.remove("token");
            router.refresh();
          }}
        >
          Sign Out
        </Button>
      </nav>
      {children}
    </div>
  );
};

export default ProtectedLayout;
