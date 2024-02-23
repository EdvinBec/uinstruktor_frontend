import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader, Play } from "lucide-react";

type Props = {
  onClick: () => {};
  isLoading: boolean;
};

const RunCodeButton = ({ onClick, isLoading }: Props) => {
  return (
    <Button
      className="text-xl bg-[#2B44E7] hover:bg-blue-500 dark:bg-[#2B44E7] dark:hover:bg-blue-500 dark:text-white"
      size={"lg"}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader size={18} className="animate-spin" />
      ) : (
        <Label className="flex items-center gap-2 font-semibold">
          Zaženi
          <Play size={18} />
        </Label>
      )}
    </Button>
  );
};

export default RunCodeButton;
