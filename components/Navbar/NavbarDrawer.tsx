import {
  NavbarItem,
  NavbarItems,
  StudentNavbarItems,
  TeacherNavbarItems,
} from "./NavbarConfig";
import NavbarDrawerButton from "./NavbarDrawerButton";

const NavbarDrawer = ({ role }: { role: string }) => {
  return (
    <div className="w-full flex gap-2 flex-col">
      {NavbarItems.map((item: NavbarItem, itemIdx: number) => {
        return (
          <NavbarDrawerButton
            key={itemIdx}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        );
      })}
      {role === "teacher" && (
        <div>
          {TeacherNavbarItems.map((item: NavbarItem, itemIdx: number) => {
            return (
              <NavbarDrawerButton
                key={itemIdx}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            );
          })}
        </div>
      )}
      {role === "student" && (
        <div className="flex flex-col gap-2">
          {StudentNavbarItems.map((item: NavbarItem, itemIdx: number) => {
            return (
              <NavbarDrawerButton
                key={itemIdx}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavbarDrawer;
