"use client";

import RoadmapCard from "./roadmapCard";

const RoadmapItem = ({
  title,
  description,
  tags,
  variant,
  side,
  disabled,
}: {
  title: string;
  description: string;
  tags: string[];
  variant: "yellow" | "purple";
  side: "left" | "right";
  disabled: boolean;
}) => {
  return (
    <div className="w-full flex">
      <div className="w-2/5 flex items-center justify-end">
        {side === "left" && (
          <RoadmapCard
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
            <div className="w-[32px] h-[32px] border-[1px] border-white rounded-full flex items-center justify-center">
              <div className="w-[40%] h-[40%] bg-white rounded-full"></div>
            </div>
            <div className="w-[1px] h-[250px] bg-white"></div>
          </div>
        </div>
      </div>
      <div className="w-2/5 flex justify-start items-center">
        {side === "right" && (
          <RoadmapCard
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
