"use client";

import Greeting from "@/components/Greeting";
import DefaultLayout from "@/components/Layout";
import Container from "@/components/ui/Container";
import useAuth from "@/hooks/useAuth";

const ExploreLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return (
    <div className="flex flex-col h-full">
      <Container>
        <DefaultLayout>
          <Greeting username={auth?.username!} />
          {children}
        </DefaultLayout>
      </Container>
    </div>
  );
};

export default ExploreLayout;
