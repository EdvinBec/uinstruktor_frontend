import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const TaskLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full px-4">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default TaskLayout;
