import Container from "@/components/ui/Container";

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full px-4 py-2">
      <Container>{children}</Container>
    </div>
  );
};

export default SignupLayout;
