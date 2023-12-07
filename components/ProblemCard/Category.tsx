import { Problem } from "@/types";
import ProblemCard from "./ProblemCard";

type Props = {
  problems: Problem[];
  category: string;
};

const ProblemCategory = ({ problems, category }: Props) => {
  return (
    <div>
      <h1 className="font-medium text-2xl tracking-wide mb-4 capitalize">
        {category}
      </h1>
      <div className="flex gap-4">
        {problems.map((item: Problem, itemIdx: number) => {
          if (item.category == category) {
            return (
              <ProblemCard
                key={itemIdx}
                difficulty={item.difficulty}
                title={item.title}
                id={item.problemID}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProblemCategory;
