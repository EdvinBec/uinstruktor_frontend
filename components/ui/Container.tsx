import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-between h-full min-h-screen px-4">
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Container;
