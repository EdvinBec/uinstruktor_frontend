import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/ui/Container";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-noise">
      <Container>{children}</Container>
    </div>
  );
};

export default DefaultLayout;
