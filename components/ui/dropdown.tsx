import { ChevronsUpDown } from "lucide-react";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createContext } from "react";

interface DropdownProps {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  value: string;
}
type DropdownTriggerProps = {
  children: React.ReactNode;
};
type DropdownContentProps = {
  children: React.ReactNode;
};
type DropdownContextProp = {
  state: boolean;
  handleOpen: (value: boolean) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  innerValue: string;
};
type DropdownItemProps = {
  children: React.ReactNode;
};

const DropdownContext = createContext<DropdownContextProp>(
  {} as DropdownContextProp,
);

export const DropdownTrigger = forwardRef(function DropdownTrigger(
  props: DropdownTriggerProps,
  ref,
) {
  const triggerRef = useRef(null);
  const menu = useContext<DropdownContextProp>(DropdownContext);

  const handleTriggerClick = () => {
    menu.handleOpen(!menu.state);
  };

  return (
    <div
      ref={triggerRef}
      onClick={handleTriggerClick}
      className="rounded-lg gap-2 cursor-pointer justify-between flex-row flex items-center bg-neutral-100 border border-neutral-300 px-2 py-1 text-lg dark:text-neutral-100 text-neutral-800"
    >
      {menu.innerValue.length !== 0
        ? menu.innerValue[0].toUpperCase() + menu.innerValue.slice(1)
        : props.children}{" "}
      <ChevronsUpDown />
    </div>
  );
});

export const DropdownItem: React.FC<DropdownItemProps> = ({ children }) => {
  const menu = useContext<DropdownContextProp>(DropdownContext);

  if (!children) return <></>;

  const itemName = children?.toString();

  const handleClick = () => {
    if (itemName === "None") {
      menu.setValue("");
      menu.handleOpen(false);
    }
    menu.setValue(children?.toString().toLowerCase()!);
    menu.handleOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      className="p-2 cursor-pointer text-base hover:bg-neutral-200 m-2 rounded-lg dark:text-neutral-100 text-neutral-900"
    >
      {itemName && itemName[0].toUpperCase() + itemName.slice(1)}
    </div>
  );
};

// ---------
// Wrapper for dropdown content

export const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const menu = useContext<DropdownContextProp>(DropdownContext);
  return (
    menu.state && (
      <div className="absolute animate-open-dropdown delay-[25ms] overflow-hidden left-0 top-12 rounded-lg w-full z-50 bg-neutral-100 border border-neutral-300 dark:bg-neutral-800">
        <DropdownItem>None</DropdownItem>
        {children}
      </div>
    )
  );
};

// ---------
// Contex provider for dropdown

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  onValueChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [innerValue, setValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const handle = (value: boolean) => {
    setIsOpen(value);
  };

  useEffect(() => {
    if (onValueChange) {
      onValueChange(innerValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerValue]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContext.Provider
      value={{ state: isOpen, handleOpen: handle, setValue, innerValue }}
    >
      <div ref={containerRef} className="relative py-2">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};
