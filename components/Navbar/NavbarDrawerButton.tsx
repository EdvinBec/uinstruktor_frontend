import Link from "next/link";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

const NavbarDrawerButton = ({
  icon,
  key,
  label,
  href,
}: {
  href: string;
  label: string;
  key: number;
  icon: LucideIcon;
}) => {
  const LucideIcon = icon;

  return (
    <Link key={key} href={href}>
      <Button
        variant={
          label === "Create new classroom" || label === "Join new classroom"
            ? "default"
            : "ghost"
        }
        className="flex gap-4 h-auto py-3 px-2 w-full justify-start "
      >
        <LucideIcon size={18} />
        {label}
      </Button>
    </Link>
  );
};

export default NavbarDrawerButton;
