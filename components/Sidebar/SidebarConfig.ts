import {
  LayoutTemplate,
  LucideIcon,
  ClipboardListIcon,
  HelpCircle,
  PlusCircle,
  Shapes,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  href: string;
  variant: "default" | "active";
  icon: LucideIcon;
};

export const SidebarItems: SidebarItem[] = [
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

export const TeacherSidebarItems: SidebarItem[] = [
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

export const StudentSidebarItems: SidebarItem[] = [
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
