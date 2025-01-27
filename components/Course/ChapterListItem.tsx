import { Book, Check } from "lucide-react";
import { Label } from "../ui/label";

const ChapterListItem = ({
  idx,
  name,
  solvedTaskNum,
}: {
  idx: number;
  name: string;
  solvedTaskNum?: number;
}) => {
  return (
    <div className="flex items-center w-full py-2">
      <div className="flex items-center gap-12 w-full">
        <div className="flex items-center gap-2 w-1/5">
          <div className="rounded-full p-2 border-[1px] border-white dark:border-black">
            <Book size={18} />
          </div>
          <Label className="text-sm">Chapter {idx + 1}</Label>
        </div>
        <Label className="text-sm font-bold">{name}</Label>
      </div>
      {solvedTaskNum && (
        <div className="flex items-center">
          <Label className="font-bold mr-2 text-xs">{solvedTaskNum}/4</Label>
        </div>
      )}
      <div className="rounded-full p-2 border-[1px] border-white dark:border-black">
        <Check size={12} />
      </div>
    </div>
  );
};

export default ChapterListItem;
