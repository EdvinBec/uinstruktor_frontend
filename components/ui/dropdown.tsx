import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createContext } from "react";

interface DropdownProps {
  children: React.ReactNode;
}
type DropdownTriggerProps = {
  children: React.ReactNode;
};
type DropdownContentProps = {
  children: React.ReactNode;
};

export const DropdownTrigger = forwardRef(function DropdownTrigger(
  props: DropdownTriggerProps,
  ref,
) {
  const triggerRef = useRef(null);
  const menu = useContext(DropdownContext);

  const handleTriggerClick = () => {
    // Change the value in the context when the trigger is clicked
    ({ isOpen: true });
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        close() {
          console.log("close");
        },
      };
    },
    [],
  );

  return (
    <div
      ref={triggerRef}
      onClick={handleTriggerClick}
      className="rounded-lg bg-neutral-900 text-neutral-50 dark:text-neutral-800 dark:bg-neutral"
    >
      {props.children}
    </div>
  );
});

export const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div>{}</div>;
};

const DropdownContext = createContext();

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Dropdown");
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
};
