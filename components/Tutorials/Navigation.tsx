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
  {} as NavigationContextProp
);

export const NavigationItem = ({ children, id }: NavigationItemProps) => {
  const context = useContext(NavigationTreeContext);
  return (
    <a
      href={"#" + id}
      className="hover:opacity-70 transition-all ease-in-out duration-150"
      onClick={() => {
        context.toogle();
        context.setActiveItem(id!);
      }}
    >
      <p
        className={cm(
          "p-2 ml-2 border-l border-l-neutral-200 text-sm",
          id === context.active ? "border-l-neutral-700" : ""
        )}
      >
        {children}
      </p>
    </a>
  );
};

export const NavigationHeading = ({ children }: NavigationItemProps) => {
  return <h3 className="text-base font-bold">{children}</h3>;
};
export const NavigationChapter = ({ children }: NavigationItemProps) => {
  return <div className="mb-6">{children}</div>;
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
      <div className="hidden top-0 mb-8 bg-white dark:bg-neutral-900">
        <div className="flex flex-row justify-between items-center">
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
      <div className="hidden px-8 pt-4 overflow-hidden md:block border-[1px] border-gray-200 dark:border-0 rounded-md bg-white dark:bg-black animate-fade-in flex-col justify-center items-start">
        {children}
      </div>
    </NavigationTreeContext.Provider>
  );
};
