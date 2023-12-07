import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div className="w-full text-white flex justify-between items-center py-2 bg-black mt-4 px-4">
      <p className="text-md font-medium">
        UInstruktor{" "}
        <span className="font-bold">{new Date().getFullYear()}</span>
      </p>
      <div>
        <Button variant="ghost">Privacy Policy</Button>
        <Button variant="ghost">Terms & Conditions</Button>
      </div>
    </div>
  );
};

export default Footer;
