import { Copyright } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "../Logo";

const Footer = () => {
  return (
    <div className="flex justify-between mt-4 w-full lg:min-w-[1100px] bg-white dark:bg-black px-4 py-2 border-[1px] border-gray-200 dark:border-0 border-b-0 rounded-t-md">
      <div className="flex items-center gap-8">
        <Logo classname="w-[125px]" />
        <div className="hidden md:flex gap-4">
          <Button variant="link" className="p-0 h-auto">
            <Link href="/explore">Explore</Link>
          </Button>
          <Button variant="link" className="p-0 h-auto">
            <Link href="/problems">Problems</Link>
          </Button>
          <Button variant="link" className="p-0 h-auto">
            <Link href="/tutorials">Tutorials</Link>
          </Button>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="link" className="p-0 text-xs md:text-sm">
          Privacy Policy
        </Button>
        <Button variant="link" className="p-0 text-xs md:text-sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
