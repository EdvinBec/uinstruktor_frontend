import { Copyright } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex w-full justify-between py-2 mt-4">
      <div className="flex gap-2 items-center">
        <Copyright size={18} />
        <p className="text-sm font-medium mr-4">
          UInstruktor{" "}
          <span className="font-bold">{new Date().getFullYear()}</span>
        </p>
        <div className="flex gap-4">
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
        <Button variant="link" className="p-0">
          Privacy Policy
        </Button>
        <Button variant="link" className="p-0">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
