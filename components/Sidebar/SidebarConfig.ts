export type SidebarItem = {
  label: string;
  href: string;
  variant: "default" | "active";
};

export const SidebarItems: SidebarItem[] = [
  {
    label: "Explore",
    href: "/explore",
    variant: "default",
  },
  {
    label: "Problems",
    href: "/explore",
    variant: "default",
  },
  {
    label: "Tutorials",
    href: "/explore",
    variant: "default",
  },
];

export const TeacherSidebarItems: SidebarItem[] = [
  {
    label: "My Classrooms",
    href: "/my-classrooms",
    variant: "default",
  },
  {
    label: "Create new classroom",
    href: "/create-new-classroom",
    variant: "default",
  },
];

export const StudentSidebarItems: SidebarItem[] = [
  {
    label: "My Classrooms",
    href: "/my-classrooms-student",
    variant: "default",
  },
];
