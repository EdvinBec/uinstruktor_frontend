import RoadmapItem from "@/components/Roadmap/roadmapItem";
import { Problem } from "@/types";

const ExplorePage = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      {problems.map((item: Problem, itemIdx) => {
        console.log(item);

        return (
          <RoadmapItem
            key={itemIdx}
            title={item.title}
            description="Start your programming journey by mastering the iconic Hello, World!"
            tags={["Strings", "I/O"]}
            variant={itemIdx % 2 === 0 ? "purple" : "yellow"}
            side={itemIdx % 2 === 0 ? "left" : "right"}
            disabled={item.isCompleted!}
          />
        );
      })}
    </div>
  );
};

export default ExplorePage;
