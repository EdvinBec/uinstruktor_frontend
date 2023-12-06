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
      className={`text-sm font-normal tracking-wide flex gap-2 ${
        isActive && "font-bold"
      }`}
    >
      {label == "Create new classroom" && <LucideIcon size={18} />}
      {label == "Join new classroom" && <LucideIcon size={18} />}
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default NavbarButton;
