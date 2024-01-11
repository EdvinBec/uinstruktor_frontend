import { cm, letterToUpper } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { createContext, useContext, useState } from "react";

type NavigationItemProps = {
  children: React.ReactNode;
  id?: string;
};
type NavigationParentProps = {
  children: React.ReactNode;
  setIsOpen: () => void;
};
interface NavigationContextProp {
  isOpen: boolean;
  toogle: () => void;
  active: string;
  setActiveItem: (id: string) => void;
}

const NavigationTreeContext = createContext<NavigationContextProp>(
  {} as NavigationContextProp,
);

export const NavigationItem = ({ children, id }: NavigationItemProps) => {
  const context = useContext(NavigationTreeContext);
  return (
    <a
      href={"#" + id}
      onClick={() => {
        context.toogle();
        context.setActiveItem(id!);
      }}
    >
      <p
        className={cm(
          "p-2 ml-2 border-l border-l-neutral-200",
          id === context.active ? "border-l-neutral-700" : "",
        )}
      >
        {children}
      </p>
    </a>
  );
};

export const NavigationHeading = ({ children }: NavigationItemProps) => {
  return <h3 className="text-xl">{children}</h3>;
};
export const NavigationChapter = ({ children }: NavigationItemProps) => {
  return <div className="my-2 ml-6">{children}</div>;
};

export const Navigation = ({
  children,
  setIsOpen: toggleMenu,
}: NavigationParentProps) => {
  const NavigationContext = useContext(NavigationTreeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const toogle = () => {
    setIsOpen(!isOpen);
    toggleMenu();
  };
  const setActiveItem = (id: string) => {
    setActive(id);
  };

  return (
    <NavigationTreeContext.Provider
      value={{ isOpen, toogle, active, setActiveItem }}
    >
      <div className="sticky top-0 mb-8 bg-white dark:bg-neutral-900 border-b">
        <div className="flex flexrow justify-between items-center">
          <div
            className="py-2 flex flex-row items-center cursor-pointer"
            onClick={toogle}
          >
            {" "}
            {!isOpen ? <ChevronRight /> : <ChevronDown />} Menu
          </div>
          {active.length !== 0 && (
            <div className=" gap-2 ml-4 flex flex-row items-center">
              <p className="text-stone-500">
                {letterToUpper(active.split("-")[0])}
              </p>
              <p className="text-stone-500"> {">"}</p>
              <p>{letterToUpper(active.split("-")[1])}</p>
            </div>
          )}
        </div>

        {isOpen && (
          <div className="flex bg-white dark:bg-body animate-fade-in absolute top-[45px] w-[200%] left-[-25px] flex-col  justify-start">
            {children}
          </div>
        )}
      </div>
    </NavigationTreeContext.Provider>
  );
};
