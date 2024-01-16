//UI Components
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

//Other
import Link from "next/link";

type Props = {
  href: string;
  label: string;
  isActive: boolean;
  icon: LucideIcon;
};

const NavbarButton = ({ href, label, isActive, icon }: Props) => {
  const LucideIcon = icon;
  return (
    <Button
      variant="link"
      className={`text-sm font-normal tracking-wide p-0 flex gap-2 h-auto ${
        isActive && "font-bold"
      } ${
        label === "Join new classroom" &&
        "bg-[#000] dark:bg-[#f6fff8] py-2 px-4 rounded-2xl hover:opacity-80 transition-all ease-in-out duration-150"
      } ${
        label === "Create new classroom" &&
        "bg-[#000] dark:bg-[#f6fff8] py-2 px-4 rounded-2xl hover:opacity-80 transition-all ease-in-out duration-150"
      }`}
    >
      {label == "Create new classroom" && (
        <LucideIcon className="text-white dark:text-black" size={18} />
      )}
      {label == "Join new classroom" && (
        <LucideIcon className="text-white dark:text-black" size={18} />
      )}
      <Link
        className={`text-sm ${
          label === "Join new classroom" &&
          "text-white dark:text-black font-medium"
        } ${
          label === "Create new classroom" &&
          "text-white dark:text-black font-medium"
        }`}
        href={href}
      >
        {label}
      </Link>
    </Button>
  );
};

export default NavbarButton;
