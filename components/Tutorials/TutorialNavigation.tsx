"use client";
import { cm } from "@/lib/utils";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { createContext, useContext } from "react";

type ChapterProps = {
  children: React.ReactNode;
  title: string;
};

type TutorialRootProps = {
  children: React.ReactNode;
};

type TutorialListElement = {
  children: React.ReactNode;
  href: string;
};
interface NavigationContextProp {
  // isOpen: boolean;
  // toogle: () => void;
  active: string;
  setActiveItem: (id: string) => void;
}

const NavigationTreeContext = createContext<NavigationContextProp>(
  {} as NavigationContextProp
);

export const TutorialNavigation = ({ children }: TutorialRootProps) => {
  const [active, setActive] = React.useState("");
  const setActiveItem = (id: string) => {
    setActive(id);
  };
  return (
    <NavigationTreeContext.Provider value={{ active, setActiveItem }}>
      <div className="p-6 overflow-hidden md:block border-[1px] border-gray-200 dark:border-0 rounded-md bg-white dark:bg-black animate-fade-in gap-4 flex-col justify-center items-start">
        {children}
      </div>
    </NavigationTreeContext.Provider>
  );
};

export const TutorialLi = ({ children, href }: TutorialListElement) => {
  //const [selected, setSelected] = React.useState(false);
  const context = useContext(NavigationTreeContext);
  return (
    <li
      className={cm(
        "pl-4 border-l py-2",
        context.active === href ? "border-l-blue/50" : ""
      )}
      onClick={() => context.setActiveItem(href)}
    >
      <Link className="text-sm" href={`/tutorials/${href}`}>
        {children}
      </Link>
    </li>
  );
};

export const TutorialChapter = ({ title, children }: ChapterProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  /* const [scope, animate] = useAnimate();

    React.useEffect(() => {
      // This "li" selector will only select children
      // of the element that receives `scope`.
      animate("li", { opacity: 1 });
    }); */

  return (
    <div className="my-2">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex flex-row justify-between"
      >
        <h3 className="font-semibold text-base">{title}</h3>
        {!isOpen ? (
          <ChevronRight size={24} strokeWidth={1.5} />
        ) : (
          <ChevronDown size={24} strokeWidth={1.5} />
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: "0", opacity: 0 }}
            animate={{ height: "max-content", opacity: 1 }}
            exit={{ height: "0.1px", opacity: 0 }}
            className="mt-2"
          >
            <ul>{children}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
