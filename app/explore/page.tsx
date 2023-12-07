import { getProblemsList } from "@/lib/Services";
import ProblemCard from "@/components/ProblemCard/ProblemCard";

type Problem = {
  problemID: number;
  title: string;
  lang: string;
  difficulty: string;
  category: string;
};

const ExplorePage = async () => {
  const problems = await (await getProblemsList()).json();
  const probs: Problem[] = problems.data;

  return (
    <div className="h-full px-4">
      <div className="flex gap-4">
        {probs.map((item: Problem, itemIdx: number) => {
          return (
            <ProblemCard
              key={itemIdx}
              difficulty={item.difficulty}
              title={item.title}
              id={item.problemID}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExplorePage;
