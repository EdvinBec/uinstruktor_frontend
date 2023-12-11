import { Bot } from "lucide-react";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div className="w-full flex justify-between items-center border-t-[1px] mt-4 py-1 text-black dark:text-white px-8">
      <div className="flex gap-2 items-center">
        <Bot size={18} />
        <p className="text-sm font-medium">
          UInstruktor{" "}
          <span className="font-bold">{new Date().getFullYear()}</span>
        </p>
      </div>
      <div>
        <Button variant="ghost">Privacy Policy</Button>
        <Button variant="ghost">Terms & Conditions</Button>
      </div>
    </div>
  );
};

export default Footer;
