import { Button } from "../ui/button";

const RoadmapCard = ({
  title,
  description,
  tags,
  variant,
  disabled,
}: {
  title: string;
  description: string;
  tags: string[];
  variant: "yellow" | "purple";
  disabled: boolean;
}) => {
  if (variant === "yellow") {
    return (
      <div className="w-[350px] rounded-md bg-[#F6C445] px-6 py-4 gap-4 flex flex-col items-center text-black">
        <h1 className="font-extrabold text-center text-2xl tracking-wide">
          {title}
        </h1>
        <p className="text-center text-sm font-medium">{description}</p>
        <div className="flex gap-2">
          {tags.map((item: string, itemIdx: number) => {
            return (
              <div
                key={itemIdx}
                className="bg-[#B07E00] px-4 py-1 text-white text-xs rounded-full w-auto"
              >
                {item}
              </div>
            );
          })}
        </div>
        {disabled ? (
          <Button className="w-full" variant="default">
            Start!
          </Button>
        ) : (
          <Button className="w-full" variant="default" disabled>
            Start!
          </Button>
        )}
      </div>
    );
  } else if (variant === "purple") {
    return (
      <div className="w-[350px] rounded-md bg-[#6610F5] px-6 py-4 gap-4 flex flex-col items-center text-white">
        <h1 className="font-extrabold text-center text-2xl tracking-wide">
          {title}
        </h1>
        <p className="text-center text-sm font-medium">{description}</p>
        <div className="flex gap-2">
          {tags.map((item: string, itemIdx: number) => {
            return (
              <div
                key={itemIdx}
                className="bg-[#985BFF] px-4 py-1 text-white text-xs rounded-full w-auto"
              >
                {item}
              </div>
            );
          })}
        </div>
        {disabled ? (
          <Button className="w-full" variant="default">
            Start!
          </Button>
        ) : (
          <Button className="w-full" variant="default" disabled>
            Start!
          </Button>
        )}
      </div>
    );
  }
};

export default RoadmapCard;
