import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/ui/Container";

const WideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <Container>
        <Navbar />
      </Container>
      {children}
      <Container>
        <Footer />
      </Container>
    </div>
  );
};

export default WideLayout;
