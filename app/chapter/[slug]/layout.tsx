import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/ui/Container";

const ChapterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <Container>
        <Navbar />
        {children}
        <Footer />
      </Container>
    </div>
  );
};

export default ChapterLayout;