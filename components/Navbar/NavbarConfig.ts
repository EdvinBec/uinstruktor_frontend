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
    label: "Explore",
    href: "/explore",
    variant: "default",
    icon: LayoutTemplate,
  },
  {
    label: "Problems",
    href: "/problems",
    variant: "default",
    icon: ClipboardListIcon,
  },
  {
    label: "Tutorials",
    href: "/tutorials",
    variant: "default",
    icon: HelpCircle,
  },
];

export const TeacherNavbarItems: NavbarItem[] = [
  {
    label: "My Classrooms",
    href: "/class",
    variant: "default",
    icon: Shapes,
  },
  {
    label: "Create new classroom",
    href: "/create-new-classroom",
    variant: "default",
    icon: PlusCircle,
  },
];

export const StudentNavbarItems: NavbarItem[] = [
  {
    label: "My Classrooms",
    href: "/class",
    variant: "default",
    icon: Shapes,
  },
  {
    label: "Join new classroom",
    href: "/join-classroom",
    variant: "default",
    icon: PlusCircle,
  },
];
