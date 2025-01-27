import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const WideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-noise">
      <div className="mx-2">
        <Navbar />
      </div>
      {children}
      <div className="mx-2">
        <Footer />
      </div>
    </div>
  );
};

export default WideLayout;
