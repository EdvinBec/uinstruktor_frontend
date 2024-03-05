import {
  NavbarItem,
  NavbarItems,
  StudentNavbarItems,
  TeacherNavbarItems,
} from "./NavbarConfig";
import NavbarDrawerButton from "./NavbarDrawerButton";

const NavbarDrawer = ({
  permissions,
}: {
  permissions: { isAdmin: boolean; isTeacher: boolean };
}) => {
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
      {permissions.isTeacher && (
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
      {!permissions.isTeacher && (
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
