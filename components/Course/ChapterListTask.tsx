import { Chapter } from "@/types";
import ChapterListItem from "./ChapterListItem";

const ChapterListTask = ({
  chapters,
}: {
  chapters: Chapter[];
  username: string;
}) => {
  return (
    <div>
      {chapters.map((item: Chapter, itemIdx: number) => {
        return (
          <ChapterListItem
            key={itemIdx}
            name={item.name}
            idx={itemIdx}
            solvedTaskNum={2}
          />
        );
      })}
    </div>
  );
};

export default ChapterListTask;
