import Container from "@/components/ui/Container";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <Container>{children}</Container>
    </div>
  );
};

export default LoginLayout;
