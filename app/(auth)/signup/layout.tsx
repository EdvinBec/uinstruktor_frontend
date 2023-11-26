import Navbar from "@/components/ui/Navbar";

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen px-4 py-2">
      <Navbar />
      <div className="h-[90%]">{children}</div>
    </div>
  );
};

export default SignupLayout;
