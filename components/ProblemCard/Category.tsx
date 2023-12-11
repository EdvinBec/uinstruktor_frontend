import { Problem } from "@/types";
import ProblemCard from "./ProblemCard";

type Props = {
  problems: Problem[];
  category: string;
  description: string;
};

const ProblemCategory = ({ problems, category, description }: Props) => {
  return (
    <div>
      <div className="mb-4">
        <h1 className="font-semibold text-2xl tracking-wide capitalize">
          {category}
        </h1>
        <p className="text-sm">{description}</p>
      </div>
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
