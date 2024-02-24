import { Loader, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type Props = {
  onClick?: () => void;
  icon?: LucideIcon;
  isLoading?: boolean;
  label: string;
  className?: string;
};

const CustomButton = ({
  onClick,
  icon,
  isLoading,
  label,
  className,
}: Props) => {
  const LucideIcon: LucideIcon = icon!;

  return (
    <Button
      onClick={onClick}
      className={`bg-[#2B44E7] hover:bg-blue-500 dark:bg-[#2B44E7] dark:hover:bg-blue-500 text-white dark:text-white ${className}`}
    >
      <Label className="flex gap-2 items-center text-xs cursor-pointer">
        {label}
        {isLoading && <Loader size={16} className="animate-spin" />}
        {icon && !isLoading && <LucideIcon size={16} />}
      </Label>
    </Button>
  );
};

export default CustomButton;
