import {
  LayoutTemplate,
  LucideIcon,
  ClipboardListIcon,
  HelpCircle,
  PlusCircle,
  Shapes,
} from "lucide-react";

export type NavbarItem = {
  label: string;
  href: string;
  variant: "default" | "active";
  icon: LucideIcon;
};

export const NavbarItems: NavbarItem[] = [
  {
    label: "Razišči",
    href: "/explore",
    variant: "default",
    icon: ClipboardListIcon,
  },
  {
    label: "Vaje",
    href: "/exercises",
    variant: "default",
    icon: HelpCircle,
  },
  {
    label: "Gradivo",
    href: "/tutorials",
    variant: "default",
    icon: HelpCircle,
  },
];

export const TeacherNavbarItems: NavbarItem[] = [
  {
    label: "Moje učilnice",
    href: "/class",
    variant: "default",
    icon: Shapes,
  },
];

export const StudentNavbarItems: NavbarItem[] = [
  {
    label: "Moje učilnice",
    href: "/class",
    variant: "default",
    icon: Shapes,
  },
  {
    label: "Pridruži se učilnici",
    href: "/join-classroom",
    variant: "default",
    icon: PlusCircle,
  },
];
