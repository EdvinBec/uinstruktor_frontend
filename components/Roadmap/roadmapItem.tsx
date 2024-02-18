"use client";

import RoadmapCard from "./roadmapCard";

const RoadmapItem = ({
  title,
  description,
  tags,
  variant,
  side,
  disabled,
  taskID,
  chapterID,
}: {
  title: string;
  description: string;
  tags: string[];
  variant: "yellow" | "purple";
  side: "left" | "right";
  disabled: boolean;
  taskID: string;
  chapterID: string;
}) => {
  return (
    <div className="w-full flex">
      <div className="w-2/5 flex items-center justify-end">
        {side === "left" && (
          <RoadmapCard
            taskID={taskID}
            chapterID={chapterID}
            title={title}
            description={description}
            tags={tags}
            variant={variant}
            disabled={disabled}
          />
        )}
      </div>
      <div className="w-1/5 flex justify-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4">
            <div className="w-[32px] h-[32px] border-[1px] border-black dark:border-white rounded-full flex items-center justify-center">
              <div className="w-[40%] h-[40%] bg-black dark:bg-white rounded-full"></div>
            </div>
            <div className="w-[1px] h-[250px] dark:bg-white bg-black"></div>
          </div>
        </div>
      </div>
      <div className="w-2/5 flex justify-start items-center">
        {side === "right" && (
          <RoadmapCard
            taskID={taskID}
            chapterID={chapterID}
            title={title}
            description={description}
            tags={tags}
            variant={variant}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};

export default RoadmapItem;
